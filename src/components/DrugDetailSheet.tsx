import { useEffect } from 'react';
import { motion } from 'motion/react';
import {
  CaretDown,
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
  use: {
    icon: Target,
    title: 'text-[#47745C]',
    dot: 'bg-[#6AA582]',
    box: 'border-[#D8EADF] bg-[#F2F8F4]'
  },
  contra: {
    icon: Prohibit,
    title: 'text-[#A15C68]',
    dot: 'bg-[#C77A88]',
    box: 'border-[#F0DDE1] bg-[#FFF5F6]'
  },
  warning: {
    icon: ShieldWarning,
    title: 'text-[#9A6B24]',
    dot: 'bg-[#C8994B]',
    box: 'border-[#F1E3C8] bg-[#FFF9ED]'
  },
  effect: {
    icon: FirstAid,
    title: 'text-[#586D8E]',
    dot: 'bg-[#7890B5]',
    box: 'border-[#DCE4F0] bg-[#F4F7FB]'
  }
} as const;

const MEDICAL_TERMS: Record<string, string> = {
  'فرط الحرارة الخبيث': 'Malignant hyperthermia',
  'تثبيط الجهاز العصبي': 'CNS depression',
  'تثبيط التنفس': 'Respiratory depression',
  'انقطاع النفس': 'Apnea',
  'هبوط الضغط': 'Hypotension',
  'بطء القلب': 'Bradycardia',
  'تسرع القلب': 'Tachycardia',
  'ارتفاع ضغط الدم': 'Hypertension',
  'اضطرابات النظم': 'Arrhythmias',
  'نقص التروية': 'Ischemia',
  'تشنج قصبي': 'Bronchospasm',
  'فرط البوتاسيوم': 'Hyperkalemia',
  'نقص البوتاسيوم': 'Hypokalemia',
  'الغثيان والقيء': 'Nausea & vomiting',
  'غثيان وقيء': 'Nausea & vomiting',
  'الصداع': 'Headache',
  'صداع': 'Headache',
  'دوخة': 'Dizziness',
  'نعاس': 'Drowsiness',
  'هلاوس': 'Hallucinations',
  'هياج': 'Agitation',
  'احتباس البول': 'Urinary retention',
  'جفاف الفم': 'Dry mouth',
  'تشوش الرؤية': 'Blurred vision',
  'ألم مكان الحقن': 'Injection-site pain',
  'حرقة مكان الحقن': 'Injection-site burning',
  'زيادة الإفرازات': 'Increased secretions',
  'الحكة': 'Pruritus',
  'حكة': 'Pruritus',
  'الإمساك': 'Constipation',
  'إمساك': 'Constipation',
  'الرعشة': 'Tremor',
  'رجفان': 'Tremor',
  'رأرأة': 'Nystagmus',
  'رمع عضلي': 'Myoclonus',
  'شلل مطول': 'Prolonged neuromuscular blockade',
  'ضعف عضلي متبقٍ': 'Residual muscle weakness',
  'تأق': 'Anaphylaxis',
  'تفاعلات تحسسية': 'Allergic reactions',
  'فقدان ذاكرة أمامي': 'Anterograde amnesia',
  'فقدان الوعي': 'Loss of consciousness',
  'تسكين الألم': 'Analgesia',
  'التهدئة': 'Sedation',
  'القلق': 'Anxiety',
  'الاختلاجات': 'Seizures',
  'التشنج العضلي': 'Muscle spasm'
};

const escapeRegExp = (value: string) =>
  value.replace(/[.*+?^$()|[\]{}\\]/g, '\\$&');

const MEDICAL_PATTERN = new RegExp(
  Object.keys(MEDICAL_TERMS)
    .sort((a, b) => b.length - a.length)
    .map(escapeRegExp)
    .join('|'),
  'g'
);

function BilingualMedicalText({ text }: { text: string }) {
  const parts: Array<string | ReturnType<typeof BilingualToken>> = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let key = 0;

  MEDICAL_PATTERN.lastIndex = 0;

  while ((match = MEDICAL_PATTERN.exec(text)) !== null) {
    if (match.index > lastIndex) parts.push(text.slice(lastIndex, match.index));

    const arabic = match[0];
    parts.push(
      <BilingualToken
        key={key++}
        arabic={arabic}
        english={MEDICAL_TERMS[arabic]}
      />
    );
    lastIndex = match.index + arabic.length;
  }

  if (lastIndex < text.length) parts.push(text.slice(lastIndex));
  return <>{parts}</>;
}

function BilingualToken({ arabic, english }: { arabic: string; english: string }) {
  return (
    <span>
      {arabic}
      <span dir="ltr" className="font-semibold text-[#6C4AA5]"> | {english}</span>
    </span>
  );
}

function ListBody({ items, dot = 'bg-[#8E79B4]' }: { items: string[]; dot?: string }) {
  return (
    <div className="space-y-2">
      {items.map((item, index) => (
        <div key={index} className="flex items-start justify-end gap-2 text-right">
          <p className="flex-1 text-[11px] leading-5 text-[#51495D]">
            <BilingualMedicalText text={item} />
          </p>
          <span className={'mt-[8px] h-1.5 w-1.5 shrink-0 rounded-full ' + dot} />
        </div>
      ))}
    </div>
  );
}

function CollapsibleList({
  title,
  items,
  className,
  titleClass,
  dot
}: {
  title: string;
  items?: string[];
  className: string;
  titleClass: string;
  dot?: string;
}) {
  if (!items || items.length === 0) return null;

  return (
    <details className={'group rounded-2xl border px-3.5 py-3 ' + className}>
      <summary className="flex cursor-pointer list-none items-center justify-between gap-3">
        <CaretDown size={15} weight="bold" className="text-[#7A688F] transition group-open:rotate-180" />
        <div className="flex items-center gap-2">
          <span className="rounded-full bg-white/70 px-2 py-0.5 text-[9px] font-black text-[#6B5A78]">
            {items.length}
          </span>
          <span className={'text-[10px] font-black ' + titleClass}>{title}</span>
        </div>
      </summary>
      <div className="mt-3 border-t border-black/[0.05] pt-3">
        <ListBody items={items} dot={dot} />
      </div>
    </details>
  );
}

function ReferenceBlock({
  title,
  text,
  items
}: {
  title: string;
  text?: string;
  items?: string[];
}) {
  if (!text && (!items || items.length === 0)) return null;

  if (items && items.length > 0) {
    return (
      <CollapsibleList
        title={title}
        items={items}
        className="border-[#E5DDF0] bg-[#F8F4FC]"
        titleClass="text-[#61447F]"
        dot="bg-[#8E6AB0]"
      />
    );
  }

  return (
    <section className="rounded-2xl border border-[#E5DDF0] bg-[#F8F4FC] px-3.5 py-3">
      <p className="text-[10px] font-black text-[#61447F]">{title}</p>
      {text && (
        <p className="mt-1.5 text-[11px] leading-5 text-[#51495D]">
          <BilingualMedicalText text={text} />
        </p>
      )}
    </section>
  );
}

function DetailSection({ title, items, tone }: DetailSectionProps) {
  const config = toneMap[tone];
  const Icon = config.icon;

  if (!items.length) return null;

  return (
    <details className={'group rounded-2xl border px-3.5 py-3 ' + config.box}>
      <summary className="flex cursor-pointer list-none items-center justify-between gap-3">
        <CaretDown size={15} weight="bold" className="text-[#7A688F] transition group-open:rotate-180" />
        <div className="flex items-center gap-2">
          <span className="rounded-full bg-white/70 px-2 py-0.5 text-[9px] font-black text-[#6B5A78]">
            {items.length}
          </span>
          <h4 className={'text-[10px] font-black ' + config.title}>{title}</h4>
          <Icon size={16} weight="bold" className={config.title} />
        </div>
      </summary>
      <div className="mt-3 border-t border-black/[0.05] pt-3">
        <ListBody items={items} dot={config.dot} />
      </div>
    </details>
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
      className="fixed inset-0 z-[80] bg-[#2F2145]/35 backdrop-blur-[2px]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="absolute inset-x-0 bottom-0 mx-auto max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-t-[28px] border-t border-[#E2D5F1] bg-white shadow-2xl"
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 35, opacity: 0 }}
        transition={{ duration: 0.18 }}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="sticky top-0 z-10 border-b border-[#E9E2F1] bg-[#F7F1FB]/95 px-4 pb-3 pt-3 backdrop-blur-xl">
          <div className="mx-auto mb-3 h-1 w-10 rounded-full bg-[#B9A5CF]" />
          <div className="flex items-start justify-between gap-3">
            <button
              onClick={onClose}
              className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-[#DED3EA] bg-white text-[#695A78]"
              aria-label="إغلاق"
            >
              <X size={17} weight="bold" />
            </button>

            <div className="flex-1 text-right">
              <p className="text-[10px] font-black text-[#72519A]">{drug.categoryAr}</p>
              <h3 className="mt-0.5 text-xl font-black text-[#30263F]" dir="ltr">{drug.en}</h3>
              <p className="mt-0.5 text-sm font-bold text-[#655B70]">{drug.ar}</p>
            </div>
          </div>

          <div className="mt-3 flex flex-wrap justify-end gap-1.5">
            {drug.classes.map((item) => (
              <span
                key={item}
                className="rounded-full border border-[#DECEE9] bg-white px-2.5 py-1 text-[9px] font-bold text-[#6C4AA5]"
              >
                {DRUG_CLASS_LABELS[item]}
              </span>
            ))}
          </div>
        </div>

        <div className="space-y-3 px-4 pb-[max(1.75rem,env(safe-area-inset-bottom))] pt-4">
          <section className="rounded-2xl border border-[#E9DFF2] bg-[#FBF8FD] px-3.5 py-3">
            <div className="flex items-center justify-end gap-2">
              <span className="text-[10px] font-black text-[#6C4AA5]">ميزة الدواء</span>
              <Sparkle size={16} weight="fill" className="text-[#8C69B4]" />
            </div>
            <p className="mt-1.5 text-[12px] leading-6 text-[#42384D]">
              <BilingualMedicalText text={detail.feature} />
            </p>
          </section>

          <ReferenceBlock title="آلية العمل | Mechanism" text={detail.mechanism} />
          <ReferenceBlock title="الأسماء التجارية | Trade names" items={detail.tradeNames} />
          <ReferenceBlock title="طرق الإعطاء | Routes" items={detail.routes} />
          <ReferenceBlock title="جرعات مرجعية تعليمية | Educational reference doses" items={detail.educationalDoses} />
          <ReferenceBlock title="بداية ومدة التأثير | Onset / duration" items={detail.onsetDuration} />

          <DetailSection title="غرض الاستعمال | Uses" items={detail.uses} tone="use" />
          <DetailSection title="موانع الاستعمال | Contraindications" items={detail.contraindications} tone="contra" />
          <DetailSection title="تحذيرات واحتياطات | Warnings" items={detail.warnings} tone="warning" />
          <DetailSection title="آثار جانبية مهمة | Important adverse effects" items={detail.adverseEffects} tone="effect" />

        </div>
      </motion.div>
    </motion.div>
  );
}
