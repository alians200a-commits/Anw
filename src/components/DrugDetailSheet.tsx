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
import { BilingualLabel } from './BilingualLabel';
import { MixedDirectionText } from './MixedDirectionText';

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
    title: 'text-[#405E75]',
    dot: 'bg-[#5F7E95]',
    box: 'border-[#DCE5EA] bg-[#F7F9FA]'
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
    title: 'text-[#405E75]',
    dot: 'bg-[#5F7E95]',
    box: 'border-[#DCE5EA] bg-[#F7F9FA]'
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
    if (match.index > lastIndex) {
      const plain = text.slice(lastIndex, match.index);
      parts.push(<MixedDirectionText key={`plain-${key++}`} text={plain} />);
    }

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

  if (lastIndex < text.length) {
    parts.push(<MixedDirectionText key={`plain-${key++}`} text={text.slice(lastIndex)} />);
  }
  return <>{parts}</>;
}

function BilingualToken({ arabic, english }: { arabic: string; english: string }) {
  return (
    <BilingualLabel
      label={`${arabic} | ${english}`}
      className="inline-flex align-baseline"
      englishClassName="font-semibold text-[#315672]"
    />
  );
}

function ListBody({ items, dot = 'bg-[#5F7E95]' }: { items: string[]; dot?: string }) {
  return (
    <div className="space-y-2">
      {items.map((item, index) => (
        <div key={index} className="flex items-start justify-end gap-2 text-right">
          <p className="flex-1 text-[11px] leading-5 text-[#526675]">
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
      <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-3">
        <CaretDown size={15} weight="bold" className="text-[#526F85] transition group-open:rotate-180" />
        <div className="flex items-center gap-2">
          <span className="rounded-full bg-white/70 px-2 py-0.5 text-[11px] font-black text-[#5F7280]">
            {items.length}
          </span>
          <BilingualLabel label={title} className={'text-[11px] font-black ' + titleClass} />
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
        className="border-[#DCE5EA] bg-[#F7F9FA]"
        titleClass="text-[#405E75]"
        dot="bg-[#5F7E95]"
      />
    );
  }

  return (
    <section className="rounded-2xl border border-[#DCE5EA] bg-[#F7F9FA] px-3.5 py-3">
      <BilingualLabel label={title} className="text-[11px] font-black text-[#405E75]" />
      {text && (
        <p className="mt-1.5 text-[11px] leading-5 text-[#526675]">
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
      <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-3">
        <CaretDown size={15} weight="bold" className="text-[#526F85] transition group-open:rotate-180" />
        <div className="flex items-center gap-2">
          <span className="rounded-full bg-white/70 px-2 py-0.5 text-[11px] font-black text-[#5F7280]">
            {items.length}
          </span>
          <BilingualLabel label={title} className={'text-[11px] font-black ' + config.title} />
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

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-[80] bg-[#0A2037]/42 backdrop-blur-[2px]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label={`تفاصيل ${drug.ar}`}
        className="absolute inset-x-0 bottom-0 mx-auto max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-t-[28px] border-t border-[#DCE5EA] bg-white shadow-2xl"
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 35, opacity: 0 }}
        transition={{ duration: 0.18 }}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="sticky top-0 z-10 border-b border-[#E3EAF0] bg-[#F5F8FA]/95 px-4 pb-3 pt-3 backdrop-blur-xl">
          <div className="mx-auto mb-3 h-1 w-10 rounded-full bg-[#AFC0CC]" />
          <div className="flex items-start justify-between gap-3">
            <button
              type="button"
              onClick={onClose}
              className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-[#D6E1EA] bg-white text-[#526675] outline-none focus-visible:ring-2 focus-visible:ring-[#CCA039]/55"
              aria-label="إغلاق"
            >
              <X size={17} weight="bold" />
            </button>

            <div className="flex-1 text-right">
              <p className="text-[11px] font-black text-[#526F85]">{drug.categoryAr}</p>
              <h3 className="mt-0.5 text-xl font-black text-[#183149]">{drug.ar}</h3>
              <p className="mt-0.5 text-sm font-bold text-[#526675]" dir="ltr">{drug.en}</p>
            </div>
          </div>

          <div className="mt-3 flex flex-wrap justify-end gap-1.5">
            {drug.classes.map((item) => (
              <span
                key={item}
                className="rounded-full border border-[#D7E2E9] bg-white px-2.5 py-1 text-[11px] font-bold text-[#315672]"
              >
                {DRUG_CLASS_LABELS[item]}
              </span>
            ))}
          </div>
        </div>

        <div className="space-y-3 px-4 pb-[max(1.75rem,env(safe-area-inset-bottom))] pt-4">
          <section className="rounded-2xl border border-[#DCE5EA] bg-[#F7F9FA] px-3.5 py-3">
            <div className="flex items-center justify-end gap-2">
              <BilingualLabel label="ميزة الدواء | Key feature" className="text-[11px] font-black text-[#315672]" />
              <Sparkle size={16} weight="fill" className="text-[#B58B2A]" />
            </div>
            <p className="mt-1.5 text-[12px] leading-6 text-[#465866]">
              <BilingualMedicalText text={detail.feature} />
            </p>
          </section>

          {detail.clinicalNote && (
            <section className="rounded-2xl border border-[#E8DFC9] bg-[#FFF9EE] px-3.5 py-3">
              <BilingualLabel label="ملاحظة سريرية | Clinical note" className="text-[11px] font-black text-[#8A6426]" />
              <p className="mt-1.5 text-[11px] leading-5 text-[#5B5142]">
                <BilingualMedicalText text={detail.clinicalNote} />
              </p>
            </section>
          )}

          <DetailSection title="الاستخدامات | Uses" items={detail.uses} tone="use" />
          <ReferenceBlock title="آلية العمل | Mechanism" text={detail.mechanism} />
          <ReferenceBlock title="طرق الإعطاء | Routes" items={detail.routes} />
          <ReferenceBlock title="الجرعات المرجعية | Reference doses" items={detail.educationalDoses} />
          <ReferenceBlock title="بداية ومدة التأثير | Onset & duration" items={detail.onsetDuration} />
          <DetailSection title="موانع الاستعمال | Contraindications" items={detail.contraindications} tone="contra" />
          <DetailSection title="التحذيرات | Warnings" items={detail.warnings} tone="warning" />
          <DetailSection title="الآثار الجانبية | Adverse effects" items={detail.adverseEffects} tone="effect" />
          <ReferenceBlock title="الأسماء التجارية | Trade names" items={detail.tradeNames} />

        </div>
      </motion.div>
    </motion.div>
  );
}