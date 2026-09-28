import { useMemo, useRef } from 'react';
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
import type { ContentMediaItem, DrugMediaSection } from '../types/contentMedia';
import { BilingualLabel } from './BilingualLabel';
import { MixedDirectionText } from './MixedDirectionText';
import { useModalSheetA11y } from '../hooks/useModalSheetA11y';

interface DrugDetailSheetProps {
  drug: AnesthesiaDrug;
  detail: DrugDetail;
  media?: ContentMediaItem[];
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
    box: 'border-[#DCE5EA] bg-white'
  },
  contra: {
    icon: Prohibit,
    title: 'text-[#A15C68]',
    dot: 'bg-[#C77A88]',
    box: 'border-[#F0DDE1] bg-[#FFF7F8]'
  },
  warning: {
    icon: ShieldWarning,
    title: 'text-[#8A6426]',
    dot: 'bg-[#9A6B24]',
    box: 'border-[#F1E3C8] bg-[#FFFAF1]'
  },
  effect: {
    icon: FirstAid,
    title: 'text-[#405E75]',
    dot: 'bg-[#5F7E95]',
    box: 'border-[#DCE5EA] bg-white'
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
  value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

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
    <div className="space-y-2.5">
      {items.map((item, index) => (
        <div key={index} className="flex items-start justify-end gap-2.5 text-right">
          <p className="flex-1 text-[11.5px] leading-[1.8] text-[#526675]">
            <BilingualMedicalText text={item} />
          </p>
          <span className={'mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full ' + dot} />
        </div>
      ))}
    </div>
  );
}

function DirectListSection({
  title,
  items,
  className,
  titleClass,
  dot
}: {
  title: string;
  items: string[];
  className: string;
  titleClass: string;
  dot?: string;
}) {
  return (
    <section className={'rounded-[18px] border px-3.5 py-3.5 ' + className}>
      <BilingualLabel label={title} className={'text-[11px] font-black ' + titleClass} />
      <div className="mt-2.5">
        <ListBody items={items} dot={dot} />
      </div>
    </section>
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

  if (items.length === 1) {
    return (
      <DirectListSection
        title={title}
        items={items}
        className={className}
        titleClass={titleClass}
        dot={dot}
      />
    );
  }

  return (
    <details className={'group rounded-[18px] border px-3.5 py-3 ' + className}>
      <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-3">
        <CaretDown size={15} weight="bold" className="text-[#526F85] transition group-open:rotate-180" />
        <div className="flex items-center gap-2">
          <span className="rounded-full bg-[#EEF3F6] px-2 py-0.5 text-[10px] font-black text-[#5F7280]">
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
        className="border-[#DCE5EA] bg-white"
        titleClass="text-[#405E75]"
        dot="bg-[#5F7E95]"
      />
    );
  }

  return (
    <section className="rounded-[18px] border border-[#DCE5EA] bg-white px-3.5 py-3.5">
      <BilingualLabel label={title} className="text-[11px] font-black text-[#405E75]" />
      {text && (
        <p className="mt-2 text-[11.5px] leading-[1.8] text-[#526675]">
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

  if (items.length === 1) {
    return (
      <section className={'rounded-[18px] border px-3.5 py-3.5 ' + config.box}>
        <div className="flex items-center justify-end gap-2">
          <BilingualLabel label={title} className={'text-[11px] font-black ' + config.title} />
          <Icon size={16} weight="bold" className={config.title} />
        </div>
        <div className="mt-2.5">
          <ListBody items={items} dot={config.dot} />
        </div>
      </section>
    );
  }

  return (
    <details className={'group rounded-[18px] border px-3.5 py-3 ' + config.box}>
      <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-3">
        <CaretDown size={15} weight="bold" className="text-[#526F85] transition group-open:rotate-180" />
        <div className="flex items-center gap-2">
          <span className="rounded-full bg-white/80 px-2 py-0.5 text-[10px] font-black text-[#5F7280]">
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

function MediaGroup({ items }: { items: ContentMediaItem[] }) {
  if (items.length === 0) return null;

  return (
    <section className="grid gap-2 sm:grid-cols-2">
      {items.map((item) => (
        <figure
          key={item.id}
          className="overflow-hidden rounded-[18px] border border-[#DCE5EA] bg-white"
        >
          <img
            src={item.url}
            alt={item.alt || 'صورة توضيحية'}
            loading="lazy"
            decoding="async"
            className="max-h-72 w-full bg-white object-contain"
          />
          {item.caption && (
            <figcaption className="border-t border-[#E3EAF0] px-3 py-2 text-right text-[11px] leading-5 text-[#526675]">
              {item.caption}
            </figcaption>
          )}
        </figure>
      ))}
    </section>
  );
}

function SectionMedia({
  media,
  sectionKey
}: {
  media: ContentMediaItem[];
  sectionKey: DrugMediaSection;
}) {
  const items = media.filter(
    (item) => !item.hidden && item.placement === 'section' && item.sectionKey === sectionKey
  );
  return <MediaGroup items={items} />;
}

export function DrugDetailSheet({ drug, detail, media = [], onClose }: DrugDetailSheetProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  useModalSheetA11y(dialogRef, onClose);

  const sortedMedia = useMemo(
    () => [...media].filter((item) => !item.hidden).sort((a, b) => a.order - b.order),
    [media]
  );
  const coverImage = sortedMedia.find((item) => item.placement === 'cover');
  const galleryImages = sortedMedia.filter((item) => item.placement === 'gallery');

  return (
    <motion.div
      className="fixed inset-0 z-[80] bg-[#0A2037]/48"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        ref={dialogRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-label={`تفاصيل ${drug.ar}`}
        className="absolute inset-x-0 bottom-0 mx-auto max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-t-[30px] border-t border-[#D6E1E8] bg-[#F5F7F9] shadow-[0_-18px_55px_rgba(7,23,37,0.22)]"
        initial={{ y: 28, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 24, opacity: 0 }}
        transition={{ duration: 0.14 }}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="sticky top-0 z-10 border-b border-[#DDE5EA] bg-white px-4 pb-3.5 pt-3">
          <div className="mx-auto mb-3 h-1 w-11 rounded-full bg-[#B7C5CE]" />
          <div className="flex items-start justify-between gap-3">
            <button
              type="button"
              onClick={onClose}
              className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-[#D6E1EA] bg-[#F7F9FA] text-[#526675] outline-none active:bg-[#EEF3F6] focus-visible:ring-2 focus-visible:ring-[#CCA039]/55"
              aria-label="إغلاق"
            >
              <X size={17} weight="bold" />
            </button>

            <div className="flex min-w-0 flex-1 items-start justify-end gap-3">
              <div className="min-w-0 flex-1 text-right">
                <span className="inline-flex rounded-full border border-[#DCE5EA] bg-[#EEF3F6] px-2.5 py-1 text-[10px] font-black text-[#405E75]">
                  {drug.categoryAr}
                </span>
                <h3 className="mt-2 truncate text-[22px] font-black leading-7 text-[#183149]">{drug.ar}</h3>
                <p className="mt-0.5 truncate text-[13px] font-bold text-[#526675]" dir="ltr">{drug.en}</p>
              </div>

              <figure className="grid h-[72px] w-[72px] shrink-0 place-items-center overflow-hidden rounded-[20px] border border-[#E3D6B7] bg-[linear-gradient(145deg,#FFFDF7,#F5EEDC)] text-[#9A7122]">
                {coverImage ? (
                  <img
                    src={coverImage.url}
                    alt={coverImage.alt || drug.ar}
                    decoding="async"
                    className="h-full w-full bg-white object-contain"
                  />
                ) : (
                  <FirstAid size={31} weight="duotone" />
                )}
              </figure>
            </div>
          </div>

          <div className="mt-3 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <div className="flex min-w-max justify-end gap-1.5">
              {drug.classes.map((item) => (
                <span
                  key={item}
                  className="whitespace-nowrap rounded-full border border-[#D7E2E9] bg-white px-2.5 py-1 text-[10px] font-bold text-[#315672]"
                >
                  {DRUG_CLASS_LABELS[item]}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-3 px-4 pb-[max(1.75rem,env(safe-area-inset-bottom))] pt-4">
          <section className="overflow-hidden rounded-[22px] border border-[#DCE5EA] bg-white">
            <div className="grid grid-cols-3 border-b border-[#E3EAF0] bg-[#F8FAFB] text-center">
              <div className="px-2 py-2.5">
                <div className="text-[15px] font-black text-[#183149]">{detail.uses.length}</div>
                <div className="mt-0.5 text-[9px] font-bold text-[#71808B]">استخدامات</div>
              </div>
              <div className="border-x border-[#E3EAF0] px-2 py-2.5">
                <div className="text-[15px] font-black text-[#183149]">{detail.warnings.length}</div>
                <div className="mt-0.5 text-[9px] font-bold text-[#71808B]">تحذيرات</div>
              </div>
              <div className="px-2 py-2.5">
                <div className="text-[15px] font-black text-[#183149]">{detail.contraindications.length}</div>
                <div className="mt-0.5 text-[9px] font-bold text-[#71808B]">موانع</div>
              </div>
            </div>

            <div className="px-3.5 py-3.5">
              <div className="flex items-center justify-end gap-2">
                <BilingualLabel label="ميزة الدواء | Key feature" className="text-[11px] font-black text-[#315672]" />
                <Sparkle size={16} weight="fill" className="text-[#B58B2A]" />
              </div>
              <p className="mt-2 text-[12px] leading-6 text-[#465866]">
                <BilingualMedicalText text={detail.feature} />
              </p>
            </div>
          </section>
          <SectionMedia media={sortedMedia} sectionKey="feature" />

          {detail.clinicalNote && (
            <section className="rounded-[18px] border border-[#E8DFC9] bg-[#FFF9EE] px-3.5 py-3.5">
              <div className="mb-1 flex items-center justify-end gap-2">
                <BilingualLabel label="ملاحظة سريرية | Clinical note" className="text-[11px] font-black text-[#8A6426]" />
                <span className="h-2 w-2 rounded-full bg-[#D9A441]" />
              </div>
              <p className="mt-1.5 text-[11.5px] leading-[1.8] text-[#5B5142]">
                <BilingualMedicalText text={detail.clinicalNote} />
              </p>
            </section>
          )}
          <SectionMedia media={sortedMedia} sectionKey="clinicalNote" />

          <DetailSection title="الاستخدامات | Uses" items={detail.uses} tone="use" />
          <SectionMedia media={sortedMedia} sectionKey="uses" />

          <ReferenceBlock title="آلية العمل | Mechanism" text={detail.mechanism} />
          <SectionMedia media={sortedMedia} sectionKey="mechanism" />

          <ReferenceBlock title="طرق الإعطاء | Routes" items={detail.routes} />
          <SectionMedia media={sortedMedia} sectionKey="routes" />

          <ReferenceBlock title="الجرعات المرجعية | Reference doses" items={detail.educationalDoses} />
          <SectionMedia media={sortedMedia} sectionKey="educationalDoses" />

          <ReferenceBlock title="بداية ومدة التأثير | Onset & duration" items={detail.onsetDuration} />
          <SectionMedia media={sortedMedia} sectionKey="onsetDuration" />

          <DetailSection title="موانع الاستعمال | Contraindications" items={detail.contraindications} tone="contra" />
          <SectionMedia media={sortedMedia} sectionKey="contraindications" />

          <DetailSection title="التحذيرات | Warnings" items={detail.warnings} tone="warning" />
          <SectionMedia media={sortedMedia} sectionKey="warnings" />

          <DetailSection title="الآثار الجانبية | Adverse effects" items={detail.adverseEffects} tone="effect" />
          <SectionMedia media={sortedMedia} sectionKey="adverseEffects" />

          <ReferenceBlock title="الأسماء التجارية | Trade names" items={detail.tradeNames} />
          <SectionMedia media={sortedMedia} sectionKey="tradeNames" />

          <MediaGroup items={galleryImages} />
        </div>
      </motion.div>
    </motion.div>
  );
}
