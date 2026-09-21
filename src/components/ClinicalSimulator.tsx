import React, { useState } from 'react';
import { Stethoscope, Activity, CheckCircle2, AlertTriangle, RefreshCw, Award, Heart, Wind, ShieldAlert } from 'lucide-react';
import { CLINICAL_SCENARIO } from '../data/clinicalTerms';

export const ClinicalSimulator: React.FC = () => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(null);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  const step = CLINICAL_SCENARIO[currentStepIndex];

  const handleSelectOption = (idx: number) => {
    if (hasSubmitted) return;
    setSelectedOptionIndex(idx);
  };

  const handleConfirmAnswer = () => {
    if (selectedOptionIndex === null) return;
    setHasSubmitted(true);
    if (step.options[selectedOptionIndex].isCorrect) {
      setScore(prev => prev + 1);
    }
  };

  const handleNextStep = () => {
    if (currentStepIndex + 1 < CLINICAL_SCENARIO.length) {
      setCurrentStepIndex(prev => prev + 1);
      setSelectedOptionIndex(null);
      setHasSubmitted(false);
    } else {
      setIsCompleted(true);
    }
  };

  const handleReset = () => {
    setCurrentStepIndex(0);
    setSelectedOptionIndex(null);
    setHasSubmitted(false);
    setScore(0);
    setIsCompleted(false);
  };

  return (
    <div className="space-y-6">
      {/* Scenario header banner */}
      <div className="bg-gradient-to-r from-cyan-950/60 via-slate-900 to-slate-950 border border-cyan-500/30 rounded-3xl p-6 shadow-xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
              <Stethoscope className="h-7 w-7" />
            </div>
            <div>
              <span className="text-xs font-bold text-cyan-400 font-mono tracking-wider">
                OR SIMULATION • محاكاة صالة العمليات
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-white">
                حالة سريرية تفاعلية: سكولين ابنيه (Suxamethonium Apnoea)
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                عش تجربة تقني التخدير في التعامل الفوري مع مريض متوقف التنفس ومرتخٍ بعد نهاية الجراحة
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <span className="text-xs font-mono px-3 py-1.5 rounded-xl bg-slate-800 text-slate-300 border border-slate-700">
              النتيجة الحالية: {score} / {CLINICAL_SCENARIO.length}
            </span>
            <button
              onClick={handleReset}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
              title="إعادة المحاكاة"
            >
              <RefreshCw className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Simulated Patient Monitor */}
      <div className="bg-slate-950 border-2 border-slate-800 rounded-3xl p-4 sm:p-5 shadow-2xl relative overflow-hidden">
        <div className="flex items-center justify-between mb-3 text-xs text-slate-500 border-b border-slate-800 pb-2">
          <span className="font-mono flex items-center gap-1.5 text-emerald-400">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping"></span>
            OR MONITOR • سرير العمليات 03
          </span>
          <span className="text-slate-400">الحالة: مريض تحت المراقبة بعد الجراحة</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {/* HR */}
          <div className="p-3 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-col justify-between">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="flex items-center gap-1"><Heart className="h-3.5 w-3.5 text-red-400" /> HR (النبض)</span>
              <span className="text-[10px] text-slate-500">BPM</span>
            </div>
            <div className="text-2xl sm:text-3xl font-mono font-black text-emerald-400 mt-1">
              78
            </div>
            <span className="text-[10px] text-emerald-500/80">Normal Sinus</span>
          </div>

          {/* SpO2 */}
          <div className="p-3 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-col justify-between">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="flex items-center gap-1"><Wind className="h-3.5 w-3.5 text-cyan-400" /> SpO2</span>
              <span className="text-[10px] text-slate-500">%</span>
            </div>
            <div className="text-2xl sm:text-3xl font-mono font-black text-cyan-400 mt-1">
              99%
            </div>
            <span className="text-[10px] text-cyan-500/80">Mechanical FiO2 40%</span>
          </div>

          {/* BP */}
          <div className="p-3 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-col justify-between">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="flex items-center gap-1"><Activity className="h-3.5 w-3.5 text-amber-400" /> NIBP (الضغط)</span>
              <span className="text-[10px] text-slate-500">mmHg</span>
            </div>
            <div className="text-2xl sm:text-3xl font-mono font-black text-amber-400 mt-1">
              118/74
            </div>
            <span className="text-[10px] text-amber-500/80">MAP: 88 mmHg</span>
          </div>

          {/* TOF / Muscle Response */}
          <div className="p-3 rounded-2xl bg-slate-900/90 border border-red-500/30 flex flex-col justify-between">
            <div className="flex items-center justify-between text-xs text-red-300">
              <span className="flex items-center gap-1"><ShieldAlert className="h-3.5 w-3.5 text-red-400" /> TOF (ارتخاء العضلات)</span>
              <span className="text-[10px] text-red-400">Twitch</span>
            </div>
            <div className="text-2xl sm:text-3xl font-mono font-black text-red-400 mt-1">
              0 / 4
            </div>
            <span className="text-[10px] text-red-400 font-bold">شلل عضلي تام (Apnea)</span>
          </div>
        </div>
      </div>

      {/* Simulator Card or Completion Card */}
      {!isCompleted ? (
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-lg">
          {/* Progress */}
          <div className="flex items-center justify-between text-xs text-slate-400 mb-4 pb-2 border-b border-slate-800">
            <span className="font-bold text-teal-400">المرحلة {currentStepIndex + 1} من {CLINICAL_SCENARIO.length}</span>
            <span>{step.title}</span>
          </div>

          {/* Clinical Situation */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800/80 mb-5">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
              الحالة السريرية الراهنة:
            </h4>
            <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-medium">
              {step.situation}
            </p>
          </div>

          {/* Question */}
          <div className="mb-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-cyan-400"></span>
              <span>{step.question}</span>
            </h3>
          </div>

          {/* Options */}
          <div className="space-y-3 mb-6">
            {step.options.map((option, idx) => {
              const isSelected = selectedOptionIndex === idx;
              let optionClasses = 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700';

              if (hasSubmitted) {
                if (option.isCorrect) {
                  optionClasses = 'bg-emerald-500/15 border-emerald-500 text-emerald-200 font-semibold';
                } else if (isSelected && !option.isCorrect) {
                  optionClasses = 'bg-red-500/15 border-red-500 text-red-200';
                }
              } else if (isSelected) {
                optionClasses = 'bg-cyan-500/15 border-cyan-500 text-white font-semibold';
              }

              return (
                <div
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  className={`p-4 rounded-2xl border-2 cursor-pointer transition-all duration-150 flex items-start gap-3 select-none ${optionClasses}`}
                >
                  <span className={`h-6 w-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 border ${
                    isSelected
                      ? 'bg-cyan-500 text-slate-950 border-cyan-400'
                      : 'bg-slate-900 text-slate-400 border-slate-700'
                  }`}>
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span className="text-sm leading-relaxed flex-1">
                    {option.text}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Feedback after submission */}
          {hasSubmitted && selectedOptionIndex !== null && (
            <div className={`p-4 rounded-2xl mb-6 border ${
              step.options[selectedOptionIndex].isCorrect
                ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-200'
                : 'bg-red-950/40 border-red-500/40 text-red-200'
            }`}>
              <div className="flex items-center gap-2 font-bold mb-1 text-sm">
                {step.options[selectedOptionIndex].isCorrect ? (
                  <>
                    <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                    <span>قرار سريري سليم وصحيح!</span>
                  </>
                ) : (
                  <>
                    <AlertTriangle className="h-5 w-5 text-red-400" />
                    <span>تنبيه سريري هام: هذا الإجراء غير آمن!</span>
                  </>
                )}
              </div>
              <p className="text-xs sm:text-sm leading-relaxed mt-1">
                {step.options[selectedOptionIndex].feedback}
              </p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
            {!hasSubmitted ? (
              <button
                disabled={selectedOptionIndex === null}
                onClick={handleConfirmAnswer}
                className="px-6 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 disabled:opacity-40 text-slate-950 font-bold text-sm transition-all shadow-md shadow-cyan-500/20"
              >
                تأكيد القرار السريري
              </button>
            ) : (
              <button
                onClick={handleNextStep}
                className="px-6 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-sm transition-all shadow-md shadow-teal-500/20"
              >
                {currentStepIndex + 1 < CLINICAL_SCENARIO.length ? 'المرحلة التالية ←' : 'عرض النتيجة النهائية'}
              </button>
            )}
          </div>
        </div>
      ) : (
        /* Completion Certificate Screen */
        <div className="bg-slate-900/95 border border-slate-800 rounded-3xl p-8 text-center space-y-5">
          <div className="h-16 w-16 rounded-3xl bg-teal-500/20 text-teal-400 border border-teal-500/40 flex items-center justify-center mx-auto shadow-lg shadow-teal-500/20">
            <Award className="h-8 w-8" />
          </div>

          <div>
            <h3 className="text-2xl font-black text-white">
              اكتملت المحاكاة السريرية بنجاح!
            </h3>
            <p className="text-sm text-slate-400 mt-1">
              أحسنت! تعاملت مع حالة سكولين ابنيه وفق أحدث المعايير الطبية والتوجيهات السريرية
            </p>
          </div>

          <div className="inline-block p-4 rounded-2xl bg-slate-950 border border-slate-800 text-center">
            <span className="text-xs text-slate-400 block mb-1">النتيجة النهائية لقراراتك:</span>
            <span className="text-3xl font-black text-teal-400 font-mono">
              {score} / {CLINICAL_SCENARIO.length}
            </span>
            <span className="text-xs text-slate-500 block mt-1">
              {score === CLINICAL_SCENARIO.length
                ? 'تقييم ممتاز: قرارات تخديرية دقيقة 100%'
                : 'تقييم جيد: راجع الملاحظات السريرية لتثبيت خطوات الأمان'}
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 max-w-lg mx-auto text-right text-xs text-slate-300 space-y-2">
            <h4 className="font-bold text-teal-400">نقاط الأمان الذهبية:</h4>
            <p>1. عدم نزع الأنبوب مطلقاً في حال استمرار الـ Apnea بعد السكولين.</p>
            <p>2. إبقاء التهوية الميكانيكية والتهدئة لمنع وعي المريض وهو مشلول.</p>
            <p>3. البلازما يجب أن تكون من متبرع غير قريب للمريض لتفادي النقص الوراثي المشترك.</p>
          </div>

          <div className="pt-2">
            <button
              onClick={handleReset}
              className="px-6 py-3 rounded-2xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-sm shadow-md shadow-teal-500/20"
            >
              إعادة خوض المحاكاة
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
