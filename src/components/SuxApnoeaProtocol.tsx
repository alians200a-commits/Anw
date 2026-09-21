import React, { useState } from 'react';
import { 
  AlertTriangle, 
  Dna, 
  Clock, 
  Wind, 
  Droplet, 
  ShieldCheck, 
  CheckCircle, 
  HelpCircle, 
  Activity, 
  ArrowDown, 
  Stethoscope,
  Volume2
} from 'lucide-react';
import { SUX_APNOEA_DATA } from '../data/clinicalTerms';
import { speakTerm } from '../utils/speech';

interface SuxApnoeaProtocolProps {
  onStartSimulation: () => void;
}

export const SuxApnoeaProtocol: React.FC<SuxApnoeaProtocolProps> = ({ onStartSimulation }) => {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  const toggleCheck = (id: string) => {
    setCheckedItems(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const steps = [
    {
      title: '1. تصنيف الدواء (Muscle Relaxant)',
      badge: 'الفسيولوجيا الدوائية',
      color: 'emerald',
      icon: Activity,
      content: (
        <div className="space-y-3">
          <p className="text-sm text-slate-300 leading-relaxed">
            تنقسم <strong className="text-teal-400">المرخيات العضلية (Muscle Relaxants)</strong> إلى قسمين رئيسيين:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3.5 rounded-xl bg-teal-500/10 border border-teal-500/30">
              <span className="text-xs font-bold text-teal-400 block mb-1">1. مستقطبة (Depolarizing)</span>
              <p className="text-xs text-slate-200">
                أبرزها دواء <strong>السكولين (Suxamethonium / Succinylcholine)</strong>. يرتبط بمستقبلات الأسيتيل كولين ويحدث نزع استقطاب مستمر في الصفيحة الحركية.
              </p>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700/60">
              <span className="text-xs font-bold text-slate-300 block mb-1">2. غير مستقطبة (Non-Depolarizing)</span>
              <p className="text-xs text-slate-400">
                مثل الروكورونيوم والأتراكوريوم؛ تنافس الأسيتيل كولين على المستقبلات ويمكن عكسها بسهولة بالنيوستغمين أو السوجاماديكس.
              </p>
            </div>
          </div>
          <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-400">
            📌 السكولين يتميز ببدء عمل خاطف (خلال 30-60 ثانية) ومدة عمل طبيعية قصيرة جداً (3-5 دقائق فقط) في الأشخاص الطبيعيين.
          </div>
        </div>
      )
    },
    {
      title: '2. المشكلة: انقطاع النفس الممتد (Apnoea)',
      badge: 'الظاهرة السريرية',
      color: 'amber',
      icon: Clock,
      content: (
        <div className="space-y-3">
          <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-sm leading-relaxed">
            السكولين يُحدث عند بعض الأشخاص تأثيراً غير متوقع وهو <strong>توقف التنفس (Apnoea) وشلل عضلي كامل</strong> قد يستمر من <strong>20 دقيقة إلى يوم أو حتى يومين كاملين (24 - 48 ساعة)</strong>!
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            في الحالة الاعتيادية يزول مفعول السكولين سريعاً ويستعيد المريض أنفاسه قبل حتى نقله لغرفة الإفاقة. لكن في هذه الحالة يفشل المريض تماماً في التنفس التلقائي.
          </p>
        </div>
      )
    },
    {
      title: '3. السبب الجذري: نقص إنزيم الكولينستيراز',
      badge: 'الخلل الوراثي',
      color: 'cyan',
      icon: Dna,
      content: (
        <div className="space-y-3">
          <p className="text-sm text-slate-300 leading-relaxed">
            يحدث هذا التأثير عند المرضى الذين يفتقدون أو يمتلكون طفرة في إنزيم:
            <br />
            <strong className="text-cyan-400 text-base">Cholinesterase Enzymes (إنزيمات الكولينستيراز الكاذبة / Pseudocholinesterase)</strong>
          </p>
          <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 space-y-2">
            <div className="flex items-start gap-2">
              <span className="text-cyan-400 font-bold">•</span>
              <span><strong>وظيفة الإنزيم:</strong> مسؤول أساسياً عن أيض (Metabolize) وتفكيك السكولين في بلازما الدم.</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-cyan-400 font-bold">•</span>
              <span><strong>سبب النقص:</strong> سبب وراثي جيني (Atypical gene) ينتقل بالجينات.</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-amber-400 font-bold">•</span>
              <span><strong>المفاجأة السريرية:</strong> لا نستطيع معرفة ما إذا كان المريض مصاباً بهذا النقص مسبقاً بالفحوصات الروتينية، إلا إذا كان هناك سوابق عائلية واضحة.</span>
            </div>
          </div>
        </div>
      )
    },
    {
      title: '4. كيف نكتشف الحالة في صالة العمليات؟',
      badge: 'التشخيص السريري',
      color: 'purple',
      icon: Stethoscope,
      content: (
        <div className="space-y-3">
          <p className="text-sm text-slate-300 leading-relaxed">
            يتم اكتشاف الحالة <strong>بعد انتهاء العملية الجراحية</strong> بالكامل:
          </p>
          <div className="space-y-2">
            {SUX_APNOEA_DATA.clinicalDetection.signs.map((sign, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 flex items-start gap-2.5">
                <span className="h-5 w-5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/40 text-xs flex items-center justify-center shrink-0 mt-0.5 font-mono font-bold">
                  {idx + 1}
                </span>
                <span className="text-xs sm:text-sm text-slate-200 leading-normal">{sign}</span>
              </div>
            ))}
          </div>
          <div className="p-3 rounded-xl bg-purple-950/30 border border-purple-500/30 text-xs text-purple-200">
            🚨 <strong>الواجب الفوري:</strong> إبقاء المريض موصولاً بعربة التخدير والتهوية الميكانيكية وإعطاء مهدئ لحمايته من الهلع.
          </div>
        </div>
      )
    },
    {
      title: '5. بروتوكول العلاج والتدبير السريري',
      badge: 'خطة التدخل',
      color: 'emerald',
      icon: ShieldCheck,
      content: (
        <div className="space-y-4">
          <p className="text-sm font-bold text-white">
            هل يوجد علاج؟ نعم، يتوفر مساران سريريان معتمدان:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Treatment Option 1: Plasma */}
            <div className="p-4 rounded-2xl bg-slate-900 border-2 border-emerald-500/40 relative overflow-hidden">
              <div className="flex items-center gap-2 mb-2">
                <Droplet className="h-5 w-5 text-emerald-400" />
                <h4 className="font-bold text-white text-sm">الحل الأول: نقل بلازما (Plasma)</h4>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed mb-3">
                نقل Fresh Frozen Plasma (بلازما طازجة مجمدة)؛ لأن البلازما غنية بإنزيمات الكولينستيراز الطبيعية فتفكك السكولين فوراً ويستعيد المريض التنفس.
              </p>
              <div className="p-2.5 rounded-xl bg-red-950/40 border border-red-500/40 text-xs text-red-200 font-bold">
                ⚠️ شرط جوهري حاسم:
                <br />
                <span className="font-normal text-slate-200">
                  يشترط أن تكون البلازما <strong>ليست من أقارب المريض</strong>! لأن نقص الإنزيم وراثي، وقد يحمل أقاربه نفس النقص الإنزيمي فلا تفيد بلازماهم.
                </span>
              </div>
            </div>

            {/* Treatment Option 2: Mechanical Ventilation */}
            <div className="p-4 rounded-2xl bg-slate-900 border-2 border-cyan-500/40 relative overflow-hidden">
              <div className="flex items-center gap-2 mb-2">
                <Wind className="h-5 w-5 text-cyan-400" />
                <h4 className="font-bold text-white text-sm">الحل الثاني: التهوية الميكانيكية الحامية</h4>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed mb-3">
                ترك المريض على جهاز التنفس الصناعي والتهوية الميكانيكية في صالة العمليات أو نقله إلى وحدة العناية المركزة (ICU) حتى ينتهي التأثير ذاتياً.
              </p>
              <div className="p-2.5 rounded-xl bg-cyan-950/40 border border-cyan-500/40 text-xs text-cyan-200 font-bold">
                🛡️ شرط المراقبة والأمان:
                <br />
                <span className="font-normal text-slate-200">
                  الحفاظ على التهدئة والتسكين المستمر (Sedation & Analgesia) لمنع استيقاظ المريض وهو مشلول عاجز عن التنفس، ومراقبة الغازات الحيوية حتى يستيقظ تماماً.
                </span>
              </div>
            </div>
          </div>
        </div>
      )
    }
  ];

  const checklistItems = [
    { id: 'c1', label: 'عدم نزع الأنبوب الرغامي (No Extubation) طالما لم يستعد المريض قوته التنفسية' },
    { id: 'c2', label: 'استمرار التهوية الميكانيكية بأكسجين مناسب وضبط المعايير الحيوية' },
    { id: 'c3', label: 'إعطاء مهدئ ومسكن (Sedative) لمنع استيقاظ المريض وهو مشلول (Amnesia & Sedation)' },
    { id: 'c4', label: 'طلب فحص إنزيمات الكولينستيراز وبلازما من بنك الدم (شرط: من متبرع غير قريب للمريض)' },
    { id: 'c5', label: 'مراقبة تحفيز العضلات عبر الـ Peripheral Nerve Stimulator (TOF)' },
    { id: 'c6', label: 'تسجيل الحالة في التقرير الطبي لتبليغ المريض وعائلته بعدم أخذ السكولين مستقبلاً' }
  ];

  return (
    <div className="space-y-6">
      {/* Header card */}
      <div className="bg-gradient-to-br from-amber-500/20 via-slate-900 to-slate-950 border border-amber-500/30 rounded-3xl p-6 shadow-xl relative overflow-hidden">
        <div className="absolute -left-10 -bottom-10 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="flex items-center gap-2 flex-wrap mb-2">
              <span className="px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 font-bold text-xs flex items-center gap-1.5">
                <AlertTriangle className="h-3.5 w-3.5" />
                حالة سريرية كلاسيكية
              </span>
              <button
                onClick={() => speakTerm('Suxamethonium apnoea')}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-800 text-slate-300 hover:text-amber-300 text-xs font-mono"
              >
                <Volume2 className="h-3.5 w-3.5" />
                <span>Suxamethonium Apnoea</span>
              </button>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              {SUX_APNOEA_DATA.title}
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-2xl leading-relaxed">
              {SUX_APNOEA_DATA.subtitle} — الدليل الشامل لآلية الشلل العضلي الممتد، ونقص إنزيمات الكولينستيراز الوراثي، وشروط نقل البلازما الحامية.
            </p>
          </div>

          <button
            id="start-sux-sim-btn"
            onClick={onStartSimulation}
            className="px-5 py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-sm transition-all shadow-lg shadow-amber-500/25 flex items-center gap-2 whitespace-nowrap shrink-0"
          >
            <Stethoscope className="h-4 w-4" />
            <span>خوض محاكاة الحالة السريرية الآن</span>
          </button>
        </div>
      </div>

      {/* Step-by-Step Flowchart & Deep Dive */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6">
        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <span>المسار التعليمي والسريري لسكولين ابنيه</span>
          <span className="text-xs font-normal text-slate-400">(اضغط على أي مرحلة لاستعراض التفاصيل)</span>
        </h3>

        {/* Step Buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 mb-6">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            const isCurrent = activeStep === idx;
            return (
              <button
                key={idx}
                onClick={() => setActiveStep(idx)}
                className={`p-3 rounded-2xl border text-right transition-all flex flex-col justify-between gap-2 ${
                  isCurrent
                    ? 'bg-amber-500/20 border-amber-500 text-white shadow-md shadow-amber-500/10'
                    : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                }`}
              >
                <div className="flex items-center justify-between">
                  <Icon className={`h-4 w-4 ${isCurrent ? 'text-amber-400' : 'text-slate-500'}`} />
                  <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800">
                    مرحلة {idx + 1}
                  </span>
                </div>
                <div className="text-xs font-bold leading-tight line-clamp-2">
                  {step.title}
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Step Detailed Card */}
        <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 shadow-inner">
          <div className="flex items-center justify-between mb-3 border-b border-slate-800 pb-2.5">
            <h4 className="text-base font-bold text-white flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-amber-400"></span>
              <span>{steps[activeStep].title}</span>
            </h4>
            <span className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-amber-400 text-xs font-semibold">
              {steps[activeStep].badge}
            </span>
          </div>

          <div className="py-2">
            {steps[activeStep].content}
          </div>

          {/* Nav arrows between steps */}
          <div className="flex items-center justify-between pt-4 mt-4 border-t border-slate-800">
            <button
              disabled={activeStep === 0}
              onClick={() => setActiveStep(prev => Math.max(0, prev - 1))}
              className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 disabled:opacity-30 text-xs font-bold text-slate-300 transition-colors"
            >
              ← المرحلة السابقة
            </button>
            <span className="text-xs text-slate-500">
              {activeStep + 1} من {steps.length}
            </span>
            <button
              disabled={activeStep === steps.length - 1}
              onClick={() => setActiveStep(prev => Math.min(steps.length - 1, prev + 1))}
              className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 disabled:opacity-30 text-xs font-bold text-slate-300 transition-colors"
            >
              المرحلة التالية →
            </button>
          </div>
        </div>
      </div>

      {/* Interactive Emergency Checklist */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6">
        <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-emerald-400" />
              <span>قائمة التدخل السريري الفوري لتقني التخدير</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              الإجراءات الإلزامية في غرفة العمليات عند الاشتباه بظاهرة سكولين ابنيه
            </p>
          </div>
          <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
            تم إنجاز {Object.values(checkedItems).filter(Boolean).length} من {checklistItems.length}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {checklistItems.map((item) => {
            const isDone = !!checkedItems[item.id];
            return (
              <div
                key={item.id}
                onClick={() => toggleCheck(item.id)}
                className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex items-start gap-3 select-none ${
                  isDone
                    ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-100'
                    : 'bg-slate-950 border-slate-800 hover:border-slate-700 text-slate-300'
                }`}
              >
                <div className={`h-5 w-5 rounded-lg flex items-center justify-center shrink-0 mt-0.5 border transition-all ${
                  isDone
                    ? 'bg-emerald-500 border-emerald-400 text-slate-950'
                    : 'border-slate-700 bg-slate-900'
                }`}>
                  {isDone && <CheckCircle className="h-3.5 w-3.5 stroke-[3]" />}
                </div>
                <span className="text-xs sm:text-sm font-medium leading-relaxed">
                  {item.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Summary Box in Iraqi Style as requested by the user */}
      <div className="p-5 rounded-3xl bg-slate-950 border border-teal-500/30">
        <h4 className="text-sm font-bold text-teal-400 mb-2 flex items-center gap-2">
          <span>ملخص سريع لتقني التخدير:</span>
        </h4>
        <div className="text-xs sm:text-sm text-slate-300 leading-relaxed space-y-2">
          <p>
            • السكولين هو مرخي عضلي مستقطب <strong>(Depolarizing)</strong>.
          </p>
          <p>
            • يسبب عند بعض المرضى توقف تنفس <strong>(Apnoea)</strong> يمتد من 20 دقيقة إلى يوم أو يومين.
          </p>
          <p>
            • السبب: نقص وراثي في إنزيمات <strong>Cholinesterase enzymes</strong> المسؤولة عن تكسير السكولين.
          </p>
          <p>
            • نكتشفه بعد انتهاء العملية عندما يفشل المريض في استعادة تنفسه ويظل مرتخياً.
          </p>
          <p>
            • العلاج: نقل بلازما <strong>(يشترط ألا تكون من أقارب المريض)</strong> أو إبقاء المريض على التهوية الميكانيكية والتهدئة حتى يستيقظ.
          </p>
        </div>
      </div>
    </div>
  );
};
