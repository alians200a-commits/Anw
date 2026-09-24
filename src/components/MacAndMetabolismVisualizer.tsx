import React, { useState } from 'react';
import { Brain, Droplet, ArrowRight, ArrowLeft, Wind, Gauge, Sparkles, Activity, ShieldCheck } from 'lucide-react';

type GasKey = 'sevo' | 'iso' | 'des' | 'halo';

type GasDefinition = {
  name: string;
  baseMac: number;
  color: string;
  bg: string;
};

const GAS_KEYS: readonly GasKey[] = ['sevo', 'iso', 'des', 'halo'];

const GASES: Record<GasKey, GasDefinition> = {
  sevo: { name: 'Sevoflurane (سيفوفلوران)', baseMac: 2.05, color: 'text-amber-400', bg: 'border-amber-500/30' },
  iso: { name: 'Isoflurane (إيزوفلوران)', baseMac: 1.15, color: 'text-purple-400', bg: 'border-purple-500/30' },
  des: { name: 'Desflurane (ديسفلوران)', baseMac: 6.0, color: 'text-blue-400', bg: 'border-blue-500/30' },
  halo: { name: 'Halothane (هالوثان)', baseMac: 0.75, color: 'text-rose-400', bg: 'border-rose-500/30' },
};

export const MacAndMetabolismVisualizer: React.FC = () => {
  // Metabolism state
  const [metabolismPhase, setMetabolismPhase] = useState<'lipid' | 'liver' | 'water' | 'kidney'>('lipid');

  // MAC slider state (percentage of MAC e.g. 0.5 to 2.0)
  const [macMultiplier, setMacMultiplier] = useState<number>(1.0);
  const [selectedGas, setSelectedGas] = useState<GasKey>('sevo');

  const currentGas = GASES[selectedGas];
  const deliveredConcentration = (currentGas.baseMac * macMultiplier).toFixed(2);

  // Response inhibition rate calculation based on MAC
  let responseInhibition = 50;
  if (macMultiplier <= 0.5) responseInhibition = 15;
  else if (macMultiplier <= 0.8) responseInhibition = 35;
  else if (macMultiplier === 1.0) responseInhibition = 50;
  else if (macMultiplier <= 1.2) responseInhibition = 85;
  else if (macMultiplier >= 1.3) responseInhibition = 95;

  return (
    <div className="space-y-8">
      {/* 1. Drug Metabolism Deep Dive */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-lg">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-3 rounded-2xl bg-teal-500/20 text-teal-400 border border-teal-500/30">
            <Droplet className="h-6 w-6" />
          </div>
          <div>
            <span className="text-xs font-bold text-teal-400 font-mono tracking-wider">
              PHARMACOKINETICS • الحركية الدوائية
            </span>
            <h3 className="text-xl font-black text-white">
              آلية الأيض (Metabolism) في أدوية التخدير
            </h3>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-teal-500/10 border border-teal-500/30 text-teal-200 text-sm leading-relaxed mb-6">
          <strong className="text-white block mb-1">التعريف السريري الدقيق:</strong>
          يقصد به <strong>تحويل الأدوية القابلة لذوبان الدهون (Lipid Solubility)</strong> إلى <strong>أدوية قابلة للذوبان في الماء (Water Solubility)</strong> ليسهل إفرازها والتخلص منها عن طريق الكلى.
        </div>

        {/* Visual Pipeline */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
          {/* Phase 1: Lipid Soluble */}
          <div
            onClick={() => setMetabolismPhase('lipid')}
            className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
              metabolismPhase === 'lipid'
                ? 'bg-amber-500/15 border-amber-500 text-white shadow-lg shadow-amber-500/10'
                : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-amber-400">
                1. المرحلة الأولية
              </span>
              <span className="h-2 w-2 rounded-full bg-amber-400"></span>
            </div>
            <h4 className="font-bold text-white text-sm mb-1">دواء ذائب بالدهون (Lipid Soluble)</h4>
            <p className="text-xs text-slate-300 leading-normal">
              يخترق الدواء الغشاء الخلوي والحاجز الدموي الدماغي (BBB) بسرعة ليحدث التنويم والتسكين.
            </p>
          </div>

          {/* Phase 2: Hepatic Metabolism */}
          <div
            onClick={() => setMetabolismPhase('liver')}
            className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
              metabolismPhase === 'liver'
                ? 'bg-rose-500/15 border-rose-500 text-white shadow-lg shadow-rose-500/10'
                : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-rose-400">
                2. الأيض بالكبد
              </span>
              <span className="h-2 w-2 rounded-full bg-rose-400"></span>
            </div>
            <h4 className="font-bold text-white text-sm mb-1">التحول الحيوي (Metabolism)</h4>
            <p className="text-xs text-slate-300 leading-normal">
              تقوم إنزيمات الكبد (أو الكولينستيراز في البلازما) بتفكيك المركب وأكسدته أو ربطه.
            </p>
          </div>

          {/* Phase 3: Water Soluble */}
          <div
            onClick={() => setMetabolismPhase('water')}
            className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
              metabolismPhase === 'water'
                ? 'bg-cyan-500/15 border-cyan-500 text-white shadow-lg shadow-cyan-500/10'
                : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-cyan-400">
                3. الناتج الأيضي
              </span>
              <span className="h-2 w-2 rounded-full bg-cyan-400"></span>
            </div>
            <h4 className="font-bold text-white text-sm mb-1">دواء ذائب بالماء (Water Soluble)</h4>
            <p className="text-xs text-slate-300 leading-normal">
              يفقد الدواء قدرته على البقاء في الدهون ويصبح قابلاً للذوبان بالدم وسوائل الجسم.
            </p>
          </div>

          {/* Phase 4: Renal Excretion */}
          <div
            onClick={() => setMetabolismPhase('kidney')}
            className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
              metabolismPhase === 'kidney'
                ? 'bg-emerald-500/15 border-emerald-500 text-white shadow-lg shadow-emerald-500/10'
                : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-emerald-400">
                4. الإطراح النهائي
              </span>
              <span className="h-2 w-2 rounded-full bg-emerald-400"></span>
            </div>
            <h4 className="font-bold text-white text-sm mb-1">الإفراز الكلوي (Renal Excretion)</h4>
            <p className="text-xs text-slate-300 leading-normal">
              تقوم الكليتان بتصفية المركب المذاب بالماء بسهولة وطرحه خارج الجسم في البول دون إعادة امتصاصه.
            </p>
          </div>
        </div>

        {/* Phase Details Card */}
        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs sm:text-sm text-slate-300 leading-relaxed flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-2">
            <span className="text-teal-400 font-bold">لماذا نحتاج هذه العملية؟</span>
            <span>
              لو بقي الدواء ذائباً في الدهون (Lipid Soluble)، لأعادت الأنابيب الكلوية امتصاصه إلى الدم مراراً، وتراكم في الجسم مسبباً سمية مستمرة وشللاً ممتداً.
            </span>
          </div>
        </div>
      </div>

      {/* 2. MAC (Minimum Alveolar Concentration) Interactive Simulator */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-lg">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-3 rounded-2xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
            <Gauge className="h-6 w-6" />
          </div>
          <div>
            <span className="text-xs font-bold text-cyan-400 font-mono tracking-wider">
              INHALATIONAL ANESTHESIA • التخدير الاستنشاقي
            </span>
            <h3 className="text-xl font-black text-white">
              محاكي تركيز الغازات: الـ MAC (Minimum Alveolar Concentration)
            </h3>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-200 text-sm leading-relaxed mb-6">
          <strong className="text-white block mb-1">التعريف السريري الدقيق:</strong>
          هو <strong>أقل تركيز لغاز التبخر بالرئة</strong> (الحويصلات الهوائية) الذي يمنع بنسبة <strong>50%</strong> من العوامل الخارجية المؤثرة من ضمنها الاستجابة الحركية للألم أثناء الجراحة، ونستخدمه لقياس فعالية وقوة الغازات التخديرية.
        </div>

        {/* Gas Selector */}
        <div className="space-y-2 mb-6">
          <label className="text-xs font-bold text-slate-400 block">
            اختر غاز التخدير لمقارنة الـ MAC والفعالية:
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {GAS_KEYS.map((key) => {
              const gas = GASES[key];
              return (
              <button
                key={key}
                onClick={() => setSelectedGas(key)}
                className={`p-3 rounded-2xl border-2 text-right transition-all ${
                  selectedGas === key
                    ? 'bg-slate-950 border-cyan-500 text-white shadow-md'
                    : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <span className="text-xs font-bold block">{gas.name}</span>
                <span className="text-[11px] font-mono text-cyan-400 mt-1 block">
                  1.0 MAC = {gas.baseMac}%
                </span>
              </button>
              );
            })}
          </div>
        </div>

        {/* Interactive Slider */}
        <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 mb-6 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-300">
              مضاعف الـ MAC الحالي (MAC Fraction):
            </span>
            <span className="text-xl font-mono font-black text-cyan-400">
              {macMultiplier.toFixed(1)} MAC ({deliveredConcentration}% Vol)
            </span>
          </div>

          <input
            type="range"
            min="0.3"
            max="1.8"
            step="0.1"
            value={macMultiplier}
            onChange={(e) => setMacMultiplier(parseFloat(e.target.value))}
            className="w-full accent-cyan-400 cursor-pointer h-2 bg-slate-800 rounded-lg"
          />

          <div className="flex justify-between text-[11px] font-mono text-slate-500">
            <span>0.3 MAC (سطحي جداً)</span>
            <span className="text-cyan-400 font-bold">1.0 MAC (التعريف: يمنع الألم لـ 50%)</span>
            <span className="text-emerald-400 font-bold">1.3 MAC (العمق الجراحي ED95 لـ 95%)</span>
            <span>1.8 MAC (عميق)</span>
          </div>
        </div>

        {/* Clinical Interpretation Box */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
            <h4 className="text-xs font-bold text-slate-400 mb-2">نسبة منع الاستجابة الحركية للألم الجراحي:</h4>
            <div className="flex items-center gap-3">
              <div className="flex-1 h-2 rounded-full bg-slate-800 overflow-hidden">
                <div
                  className="h-full bg-cyan-400 transition-all duration-500"
                  style={{ width: `${responseInhibition}%` }}
                />
              </div>
              <span className="font-mono font-black text-cyan-400 text-lg">{responseInhibition}%</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
            <h4 className="text-xs font-bold text-slate-400 mb-2">مستوى العمق المتوقع:</h4>
            <p className="text-sm font-bold text-white">
              {macMultiplier < 0.7
                ? 'سطحي جداً — احتمال استجابة عالية للمؤثر الجراحي.'
                : macMultiplier < 1.0
                ? 'عمق متوسط — قد لا يكون كافياً للتحفيز الجراحي المؤلم.'
                : macMultiplier < 1.3
                ? 'تخدير بحدود MAC — يثبط الاستجابة الحركية عند نسبة من المرضى.'
                : 'عمق جراحي مرتفع — يثبط الاستجابة الحركية لدى معظم المرضى.'}
            </p>
          </div>
        </div>

        <div className="mt-4 flex items-start gap-2 rounded-2xl border border-amber-500/30 bg-amber-500/10 p-4 text-xs leading-relaxed text-amber-100">
          <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-amber-300" />
          <p>
            القيم المعروضة تعليمية لتوضيح مفهوم الـ MAC ولا تُستخدم وحدها لتحديد جرعة أو عمق التخدير سريرياً؛ تتأثر قيمة MAC بعمر المريض وحرارته والأدوية المصاحبة وعوامل سريرية أخرى.
          </p>
        </div>
      </div>
    </div>
  );
};
