import React, { useState } from 'react';
import { X, RotateCw, ChevronRight, ChevronLeft, Volume2, CheckCircle2, AlertCircle, Shuffle } from 'lucide-react';
import { ClinicalTerm } from '../types';
import { speakTerm } from '../utils/speech';

interface FlashcardModalProps {
  terms: ClinicalTerm[];
  onClose: () => void;
}

export const FlashcardModal: React.FC<FlashcardModalProps> = ({ terms, onClose }) => {
  const [deck, setDeck] = useState<ClinicalTerm[]>([...terms]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [masteredIds, setMasteredIds] = useState<Set<string>>(new Set());
  const [reviewIds, setReviewIds] = useState<Set<string>>(new Set());

  const currentTerm = deck[currentIndex];

  const handleNext = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev + 1) % deck.length);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev - 1 + deck.length) % deck.length);
  };

  const handleShuffle = () => {
    setIsFlipped(false);
    const shuffled = [...deck].sort(() => Math.random() - 0.5);
    setDeck(shuffled);
    setCurrentIndex(0);
  };

  const markMastered = () => {
    if (!currentTerm) return;
    setMasteredIds(prev => new Set(prev).add(currentTerm.id));
    setReviewIds(prev => {
      const next = new Set(prev);
      next.delete(currentTerm.id);
      return next;
    });
    handleNext();
  };

  const markReview = () => {
    if (!currentTerm) return;
    setReviewIds(prev => new Set(prev).add(currentTerm.id));
    setMasteredIds(prev => {
      const next = new Set(prev);
      next.delete(currentTerm.id);
      return next;
    });
    handleNext();
  };

  if (!currentTerm) return null;

  const progressPercent = Math.round(((currentIndex + 1) / deck.length) * 100);

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-xl p-6 shadow-2xl relative flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-teal-400"></span>
            <h3 className="font-bold text-white text-lg">بطاقات مراجعة مصطلحات التخدير</h3>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleShuffle}
              title="خلط البطاقات عشوائياً"
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors text-xs flex items-center gap-1 font-medium"
            >
              <Shuffle className="h-4 w-4" />
              <span>خلط</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Progress Stats */}
        <div className="py-3 flex items-center justify-between text-xs text-slate-400">
          <span>بطاقة {currentIndex + 1} من {deck.length} ({progressPercent}%)</span>
          <div className="flex items-center gap-3">
            <span className="text-emerald-400 flex items-center gap-1">
              <CheckCircle2 className="h-3.5 w-3.5" /> تم الحفظ: {masteredIds.size}
            </span>
            <span className="text-amber-400 flex items-center gap-1">
              <AlertCircle className="h-3.5 w-3.5" /> بحاجة مراجعة: {reviewIds.size}
            </span>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden mb-4">
          <div
            className="bg-teal-500 h-full transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          ></div>
        </div>

        {/* The Flip Card Area */}
        <div className="flex-1 min-h-[280px] flex items-center justify-center my-2">
          <div
            id="flashcard-container"
            onClick={() => setIsFlipped(!isFlipped)}
            className="w-full h-full min-h-[280px] bg-slate-950 border-2 border-slate-800 hover:border-teal-500/50 rounded-2xl p-6 cursor-pointer flex flex-col justify-between text-center relative transition-all duration-200 select-none shadow-inner group"
          >
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span className="font-mono bg-slate-900 px-2.5 py-1 rounded-lg border border-slate-800 text-teal-400">
                {currentTerm.category.toUpperCase()}
              </span>
              <span className="flex items-center gap-1 text-slate-400 group-hover:text-teal-400 transition-colors">
                <RotateCw className="h-3.5 w-3.5 animate-spin-hover" />
                {isFlipped ? 'انقر للوجه الإنجليزي' : 'انقر لكشف المعنى العربي'}
              </span>
            </div>

            {/* Front or Back Content */}
            <div className="py-6">
              {!isFlipped ? (
                /* FRONT: Term & Abbreviation */
                <div className="space-y-4">
                  {currentTerm.abbr && (
                    <div className="inline-block px-4 py-1.5 rounded-xl bg-teal-500/20 text-teal-300 border border-teal-500/40 text-2xl font-mono font-black">
                      {currentTerm.abbr}
                    </div>
                  )}
                  <h2 className="text-2xl sm:text-3xl font-black text-white tracking-wide">
                    {currentTerm.en}
                  </h2>
                  <div className="flex justify-center mt-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        speakTerm(currentTerm.en);
                      }}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-800 text-slate-300 hover:text-teal-300 hover:bg-slate-700 text-xs transition-colors"
                    >
                      <Volume2 className="h-4 w-4" />
                      <span>نطق المصطلح</span>
                    </button>
                  </div>
                  <p className="text-xs text-slate-500 mt-4">
                    خمن المعنى والاستخدام السريري ثم انقر للتحقق
                  </p>
                </div>
              ) : (
                /* BACK: Arabic Translation, Definition, Clinical Tip */
                <div className="space-y-3 text-right">
                  <div className="text-center">
                    <h2 className="text-2xl font-bold text-teal-300 mb-1">
                      {currentTerm.ar}
                    </h2>
                    <span className="text-xs text-slate-400 font-mono">
                      {currentTerm.en}
                    </span>
                  </div>

                  <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 text-slate-200 text-sm leading-relaxed">
                    {currentTerm.definition}
                  </div>

                  {currentTerm.clinicalNote && (
                    <div className="bg-teal-950/30 border border-teal-500/20 p-3 rounded-xl text-xs text-teal-200/90 leading-relaxed">
                      <span className="font-bold text-teal-400">💡 نقطة عملية لتقني التخدير: </span>
                      {currentTerm.clinicalNote}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Bottom Status */}
            <div className="text-[11px] text-slate-500 text-center">
              {masteredIds.has(currentTerm.id) ? (
                <span className="text-emerald-400 font-semibold">✓ تم تعليم هذا المصطلح كمحفوظ</span>
              ) : reviewIds.has(currentTerm.id) ? (
                <span className="text-amber-400 font-semibold">⚠ هذا المصطلح بحاجة لمراجعة إضافية</span>
              ) : (
                <span>لم يتم تقييم الحفظ بعد</span>
              )}
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-start">
            <button
              onClick={handlePrev}
              className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs flex items-center gap-1 transition-colors"
            >
              <ChevronRight className="h-4 w-4" />
              <span>السابق</span>
            </button>
            <button
              onClick={() => setIsFlipped(!isFlipped)}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs flex items-center gap-1.5 transition-colors"
            >
              <RotateCw className="h-4 w-4" />
              <span>قلب البطاقة</span>
            </button>
            <button
              onClick={handleNext}
              className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs flex items-center gap-1 transition-colors"
            >
              <span>التالي</span>
              <ChevronLeft className="h-4 w-4" />
            </button>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={markReview}
              className="flex-1 sm:flex-none px-3.5 py-2.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 font-bold text-xs flex items-center justify-center gap-1.5 transition-all"
            >
              <AlertCircle className="h-4 w-4" />
              <span>بحاجة مراجعة</span>
            </button>
            <button
              onClick={markMastered}
              className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-teal-500/20 transition-all"
            >
              <CheckCircle2 className="h-4 w-4" />
              <span>حفظتها بنجاح</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
