import { useEffect } from 'react';
import { motion } from 'motion/react';
import {
  FirstAid,
  Prohibit,
  ShieldWarning,
  Sparkle,
  Target,
  X
} from '@phosphor-icons/react';
import { DRUG_CLASS_LABELS, type AnesthesiaDrug } from '../data/drugs';
import type { DrugDetail } from '../data/drugDetails';

interface DrugDetailSheetProps {
  drug: AnesthesiaDrug;
  detail: DrugDetail;
  onClose: () => void;
}

interface DetailSectionProps {
  title: string;
  items: string[];
  tone: 'use' | 'contra' | 'warning' | 'effect';
}

const toneMap = {
  use: { icon: Target, label: 'text-[#7FB69B]', line: 'border-r-[#4E8F70]' },
  contra: { icon: Prohibit, label: 'text-[#D48A8A]', line: 'border-r-[#9C5656]' },
  warning: { icon: ShieldWarning, label: 'text-[#D9A441]', line: 'border-r-[#D9A441]' },
  effect: { icon: FirstAid, label: 'text-[#9BAEC0]', line: 'border-r-[#6E879C]' }
} as const;

function DetailSection({ title, items, tone }: DetailSectionProps) {
  const config = toneMap[tone];
  const Icon = config.icon;

  return (
    <section className={'border-r-2 py-1 pr-3 ' + config.line}>
      <div className="flex items-center justify-end gap-2">
        <h4 className={'text-xs font-black ' + config.label}>{title}</h4>
        <Icon size={17} weight="bold" className={config.label} />
      </div>
      <div className="mt-2 space-y-1.5">
        {items.map((item, index) => (
          <div key={index} className="flex items-start justify-end gap-2 text-right">
            <p className="flex-1 text-[11px] leading-5 text-[#A9B5BE]">{item}</p>
            <span className="mt-[8px] h-1 w-1 shrink-0 rounded-full bg-[#50697C]" />
          </div>
        ))}
      </div>
    </section>
  );
}

export function DrugDetailSheet({ drug, detail, onClose }: DrugDetailSheetProps) {
  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-[80] bg-black/55 backdrop-blur-[2px]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="absolute inset-x-0 bottom-0 mx-auto max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-t-[28px] border-t border-[#CCA039]/20 bg-[#0A2036] shadow-2xl"
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 35, opacity: 0 }}
        transition={{ duration: 0.18 }}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="sticky top-0 z-10 border-b border-white/5 bg-[#0A2036]/95 px-4 pb-3 pt-3 backdrop-blur-xl">
          <div className="mx-auto mb-3 h-1 w-10 rounded-full bg-[#41566A]" />
          <div className="flex items-start justify-between gap-3">
            <button
              onClick={onClose}
              className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-white/7 bg-white/[0.025] text-[#8296A8]"
              aria-label="إغلاق"
            >
              <X size={17} weight="bold" />
            </button>

            <div className="flex-1 text-right">
              <p className="text-[10px] font-black text-[#CCA039]">{drug.categoryAr}</p>
              <h3 className="mt-0.5 text-xl font-black text-[#EEE8D6]" dir="ltr">{drug.en}</h3>
              <p className="mt-0.5 text-sm font-bold text-[#AEB9C2]">{drug.ar}</p>
            </div>
          </div>

          <div className="mt-3 flex flex-wrap justify-end gap-1.5">
            {drug.classes.map((item) => (
              <span
                key={item}
                className="rounded-full border border-[#CCA039]/12 bg-[#CCA039]/[0.055] px-2.5 py-1 text-[9px] font-bold text-[#C9AE6D]"
              >
                {DRUG_CLASS_LABELS[item]}
              </span>
            ))}
          </div>
        </div>

        <div className="space-y-5 px-4 pb-7 pt-4">
          <div className="border-r-[3px] border-[#CCA039] pr-3">
            <div className="flex items-center justify-end gap-2">
              <span className="text-[10px] font-black text-[#CCA039]">ميزة الدواء</span>
              <Sparkle size={16} weight="fill" className="text-[#CCA039]" />
            </div>
            <p className="mt-1.5 text-[12px] leading-6 text-[#D7DBDE]">{detail.feature}</p>
          </div>

          <div className="h-px bg-white/5" />

          <DetailSection title="غرض الاستعمال" items={detail.uses} tone="use" />
          <DetailSection title="موانع الاستعمال" items={detail.contraindications} tone="contra" />
          <DetailSection title="تحذيرات واحتياطات" items={detail.warnings} tone="warning" />
          <DetailSection title="آثار جانبية مهمة" items={detail.adverseEffects} tone="effect" />

          <p className="border-t border-white/5 pt-3 text-center text-[9px] leading-4 text-[#61788A]">
            مرجع تعليمي مختصر؛ المعلومات الدوائية تُفسَّر ضمن السياق السريري وبروتوكول المؤسسة.
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}
