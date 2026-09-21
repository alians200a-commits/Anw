import React, { useState } from 'react';
import { HelpCircle, CheckCircle2, XCircle, RotateCcw, Award, ChevronRight, ChevronLeft } from 'lucide-react';
import { QUIZ_QUESTIONS } from '../data/clinicalTerms';

export const ClinicalQuiz: React.FC = () => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [showExplanation, setShowExplanation] = useState<Record<number, boolean>>({});
  const [isFinished, setIsFinished] = useState(false);

  const currentQ = QUIZ_QUESTIONS[currentIdx];
  const selectedAnswer = selectedAnswers[currentIdx];
  const isAnswered = selectedAnswer !== undefined;

  const handleSelectAnswer = (optionIdx: number) => {
    if (selectedAnswers[currentIdx] !== undefined) return;
    setSelectedAnswers(prev => ({ ...prev, [currentIdx]: optionIdx }));
    setShowExplanation(prev => ({ ...prev, [currentIdx]: true }));
  };

  const handleNext = () => {
    if (currentIdx + 1 < QUIZ_QUESTIONS.length) {
      setCurrentIdx(prev => prev + 1);
    } else {
      setIsFinished(true);
    }
  };

  const handlePrev = () => {
    setCurrentIdx(prev => Math.max(0, prev - 1));
  };

  const handleRestart = () => {
    setCurrentIdx(0);
    setSelectedAnswers({});
    setShowExplanation({});
    setIsFinished(false);
  };

  const score = Object.entries(selectedAnswers).reduce((acc, [qIdx, ansIdx]) => {
    return ansIdx === QUIZ_QUESTIONS[parseInt(qIdx)].correctIndex ? acc + 1 : acc;
  }, 0);

  const percentage = Math.round((score / QUIZ_QUESTIONS.length) * 100);

  return (
    <div className="space-y-6">
      {/* Quiz Header */}
      <div className="bg-gradient-to-r from-purple-950/60 via-slate-900 to-slate-950 border border-purple-500/30 rounded-3xl p-6 shadow-xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-purple-500/20 text-purple-400 border border-purple-500/30">
              <HelpCircle className="h-6 w-6" />
            </div>
            <div>
              <span className="text-xs font-bold text-purple-400 font-mono tracking-wider">
                CLINICAL KNOWLEDGE EVALUATION • تقييم المعرفة
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-white">
                اختبار تقني التخدير للمصطلحات والبروتوكولات
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                اختبر استيعابك للمصطلحات، الاختصارات، آلية الأيض، وحالة سكولين ابنيه
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono px-3 py-1.5 rounded-xl bg-slate-800 text-purple-300 border border-slate-700">
              السؤال {currentIdx + 1} / {QUIZ_QUESTIONS.length}
            </span>
          </div>
        </div>
      </div>

      {!isFinished ? (
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-lg">
          {/* Progress Bar */}
          <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden mb-6">
            <div
              className="bg-purple-500 h-full transition-all duration-300"
              style={{ width: `${((currentIdx + 1) / QUIZ_QUESTIONS.length) * 100}%` }}
            ></div>
          </div>

          {/* Question Text */}
          <div className="mb-6">
            <span className="text-xs font-mono font-bold text-purple-400 block mb-1">
              السؤال {currentIdx + 1}:
            </span>
            <h3 className="text-base sm:text-lg font-bold text-white leading-relaxed">
              {currentQ.question}
            </h3>
          </div>

          {/* Options */}
          <div className="space-y-3 mb-6">
            {currentQ.options.map((option, optIdx) => {
              const isSelected = selectedAnswer === optIdx;
              const isCorrect = optIdx === currentQ.correctIndex;
              let optionStyle = 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700';

              if (isAnswered) {
                if (isCorrect) {
                  optionStyle = 'bg-emerald-500/15 border-emerald-500 text-emerald-200 font-semibold';
                } else if (isSelected && !isCorrect) {
                  optionStyle = 'bg-red-500/15 border-red-500 text-red-200';
                }
              }

              return (
                <div
                  key={optIdx}
                  onClick={() => handleSelectAnswer(optIdx)}
                  className={`p-4 rounded-2xl border-2 cursor-pointer transition-all duration-150 flex items-start gap-3 select-none ${optionStyle}`}
                >
                  <span className={`h-6 w-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 border ${
                    isAnswered && isCorrect
                      ? 'bg-emerald-500 text-slate-950 border-emerald-400'
                      : isAnswered && isSelected && !isCorrect
                      ? 'bg-red-500 text-white border-red-400'
                      : 'bg-slate-900 text-slate-400 border-slate-700'
                  }`}>
                    {String.fromCharCode(65 + optIdx)}
                  </span>
                  <span className="text-sm leading-relaxed flex-1">
                    {option}
                  </span>
                  {isAnswered && isCorrect && (
                    <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
                  )}
                  {isAnswered && isSelected && !isCorrect && (
                    <XCircle className="h-5 w-5 text-red-400 shrink-0 mt-0.5" />
                  )}
                </div>
              );
            })}
          </div>

          {/* Explanation Box */}
          {showExplanation[currentIdx] && (
            <div className="p-4 rounded-2xl bg-slate-950 border border-purple-500/30 mb-6 text-xs sm:text-sm text-slate-300 leading-relaxed">
              <span className="font-bold text-purple-400 block mb-1">💡 التفسير السريري:</span>
              {currentQ.explanation}
            </div>
          )}

          {/* Navigation Controls */}
          <div className="flex items-center justify-between pt-3 border-t border-slate-800">
            <button
              disabled={currentIdx === 0}
              onClick={handlePrev}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-30 text-slate-300 font-bold text-xs flex items-center gap-1 transition-colors"
            >
              <ChevronRight className="h-4 w-4" />
              <span>السابق</span>
            </button>

            <button
              disabled={!isAnswered}
              onClick={handleNext}
              className="px-5 py-2 rounded-xl bg-purple-500 hover:bg-purple-400 disabled:opacity-40 text-slate-950 font-bold text-xs sm:text-sm flex items-center gap-1 transition-all shadow-md shadow-purple-500/20"
            >
              <span>{currentIdx + 1 < QUIZ_QUESTIONS.length ? 'السؤال التالي' : 'إنهاء الاختبار'}</span>
              <ChevronLeft className="h-4 w-4" />
            </button>
          </div>
        </div>
      ) : (
        /* Results Screen */
        <div className="bg-slate-900/95 border border-slate-800 rounded-3xl p-8 text-center space-y-6 shadow-2xl">
          <div className="h-20 w-20 rounded-3xl bg-purple-500/20 text-purple-400 border border-purple-500/40 flex items-center justify-center mx-auto shadow-lg shadow-purple-500/20">
            <Award className="h-10 w-10" />
          </div>

          <div>
            <h3 className="text-2xl font-black text-white">
              نتيجة اختبار تقني التخدير
            </h3>
            <p className="text-sm text-slate-400 mt-1">
              تم الانتهاء من الإجابة على جميع الأسئلة السريرية
            </p>
          </div>

          <div className="inline-block p-6 rounded-3xl bg-slate-950 border border-slate-800 text-center">
            <span className="text-xs text-slate-400 block mb-1">الدرجة الإجمالية:</span>
            <span className="text-4xl font-black text-purple-400 font-mono">
              {score} / {QUIZ_QUESTIONS.length}
            </span>
            <span className="text-base font-bold text-slate-300 block mt-2">
              النسبة المئوية: {percentage}%
            </span>
            <span className={`text-xs block mt-1 font-semibold ${percentage >= 80 ? 'text-emerald-400' : 'text-amber-400'}`}>
              {percentage >= 80 ? 'مستوى احترافي ممتاز في مصطلحات التخدير!' : 'أداء جيد، ينصح بمراجعة البطاقات لتثبيت المصطلحات.'}
            </span>
          </div>

          <div className="pt-2 flex justify-center">
            <button
              onClick={handleRestart}
              className="px-6 py-3 rounded-2xl bg-purple-500 hover:bg-purple-400 text-slate-950 font-bold text-sm flex items-center gap-2 shadow-md shadow-purple-500/20"
            >
              <RotateCcw className="h-4 w-4" />
              <span>إعادة الاختبار</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
