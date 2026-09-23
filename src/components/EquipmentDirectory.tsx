import { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { CaretDown, MagnifyingGlass, X } from '@phosphor-icons/react';
import {
  EQUIPMENT_FILTERS,
  type AnesthesiaEquipment,
  type EquipmentCategory,
} from '../data/equipment';
import {
  loadPublishedEquipmentContent,
  localEquipmentContent,
  type RuntimeEquipmentContent,
} from '../data/publishedEquipmentContent';
import type { ContentMediaItem, EquipmentMediaSection } from '../types/contentMedia';
import { BilingualLabel } from './BilingualLabel';
import { MixedDirectionText } from './MixedDirectionText';
import { useModalSheetA11y } from '../hooks/useModalSheetA11y';
import {
  NotificationStackMenu,
  type StackMenuItem,
} from './ui/NotificationStackMenu';
import { MedicalSiteIcon, type MedicalSiteIconName } from './ui/MedicalSiteIcon';

const equipmentCategoryIcon: Record<'all' | EquipmentCategory, MedicalSiteIconName> = {
  all: 'equipment',
  machine: 'equipment',
  'gas-supply': 'gas',
  breathing: 'breathing',
  airway: 'airway',
  monitoring: 'monitoring',
  tools: 'tools',
};

function equipmentIcon(item: AnesthesiaEquipment): MedicalSiteIconName {
  return equipmentCategoryIcon[item.category];
}

function sortedVisible(media: ContentMediaItem[]) {
  return media
    .filter((item) => !item.hidden)
    .sort((a, b) => a.order - b.order);
}

function coverImage(media: ContentMediaItem[]) {
  return sortedVisible(media).find((item) => item.placement === 'cover');
}

function sectionImages(media: ContentMediaItem[], sectionKey: EquipmentMediaSection) {
  return sortedVisible(media).filter(
    (item) => item.placement === 'section' && item.sectionKey === sectionKey,
  );
}

function galleryImages(media: ContentMediaItem[]) {
  return sortedVisible(media).filter((item) => item.placement === 'gallery');
}

function MediaGrid({ items }: { items: ContentMediaItem[] }) {
  if (items.length === 0) return null;
  return (
    <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
      {items.map((image) => (
        <figure key={image.id} className="overflow-hidden rounded-xl border border-[#DCE5EA] bg-white">
          <div className="flex min-h-36 items-center justify-center bg-[#F8FAFB] p-2">
            <img src={image.url} alt={image.alt} loading="lazy" className="max-h-56 w-full object-contain" />
          </div>
          {image.caption && (
            <figcaption className="border-t border-[#E7EDF1] px-3 py-2 text-right text-[10px] leading-5 text-[#526675]">
              {image.caption}
            </figcaption>
          )}
        </figure>
      ))}
    </div>
  );
}

function SoftList({
  title,
  items,
  media = [],
}: {
  title: string;
  items: string[];
  media?: ContentMediaItem[];
}) {
  const body = (
    <div className="space-y-2">
      {items.map((text, index) => (
        <div key={index} className="flex items-start justify-end gap-2">
          <p className="flex-1 text-right text-[11px] leading-5 text-[#526675]">{text}</p>
          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#5F7E95]" />
        </div>
      ))}
      <MediaGrid items={media} />
    </div>
  );

  return (
    <details className="group rounded-2xl border border-[#DCE5EA] bg-[#F7F9FA] px-3.5 py-3">
      <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-3">
        <CaretDown size={15} weight="bold" className="text-[#526F85] transition group-open:rotate-180" />
        <div className="flex items-center gap-2">
          <span className="rounded-full bg-white/75 px-2 py-0.5 text-[11px] font-black text-[#5F7280]">{items.length}</span>
          <BilingualLabel label={title} className="text-[11px] font-black text-[#405E75]" />
        </div>
      </summary>
      <div className="mt-3 border-t border-black/[0.05] pt-3">{body}</div>
    </details>
  );
}

export function EquipmentSheet({
  item,
  media = [],
  onClose,
}: {
  item: AnesthesiaEquipment;
  media?: ContentMediaItem[];
  onClose: () => void;
}) {
  const dialogRef = useRef<HTMLDivElement>(null);
  useModalSheetA11y(dialogRef, onClose);

  const cover = coverImage(media);
  const summaryMedia = sectionImages(media, 'summary');
  const clinicalMedia = sectionImages(media, 'clinicalNote');
  const purposeMedia = sectionImages(media, 'purpose');
  const keyPointsMedia = sectionImages(media, 'keyPoints');
  const gallery = galleryImages(media);

  return (
    <motion.div
      className="fixed inset-0 z-[85] bg-[#0A2037]/42 backdrop-blur-[2px]"
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
        aria-label={`تفاصيل ${item.nameAr}`}
        className="absolute inset-x-0 bottom-0 mx-auto max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-t-[28px] border-t border-[#DCE5EA] bg-white shadow-2xl"
        initial={{ y: 38, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 32, opacity: 0 }}
        transition={{ duration: 0.18 }}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="sticky top-0 z-10 border-b border-[#E3EAF0] bg-[#F7F9FA]/95 px-4 pb-3 pt-3 backdrop-blur-xl">
          <div className="mx-auto mb-3 h-1 w-10 rounded-full bg-[#AFC0CC]" />
          <div className="flex items-start justify-between gap-3">
            <button type="button" onClick={onClose} className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-[#D6E1EA] bg-white text-[#526675] outline-none focus-visible:ring-2 focus-visible:ring-[#CCA039]/55" aria-label="إغلاق">
              <X size={17} weight="bold" />
            </button>
            <div className="flex min-w-0 flex-1 items-start justify-end gap-3">
              <div className="min-w-0 flex-1 text-right">
                <p className="text-[11px] font-black text-[#526F85]">{item.categoryAr}</p>
                <h3 className="mt-0.5 text-lg font-black text-[#183149]">{item.nameAr}</h3>
                <p className="mt-0.5 text-sm font-bold text-[#526675]" dir="ltr">{item.nameEn}</p>
              </div>
              <span className="grid h-11 w-11 shrink-0 place-items-center overflow-hidden rounded-[13px] border border-[#D7E2E9] bg-white">
                {cover ? <img src={cover.url} alt={cover.alt || item.nameAr} className="h-full w-full object-contain" /> : <MedicalSiteIcon name={equipmentIcon(item)} play loop size={28} />}
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-3 px-4 pb-[max(1.75rem,env(safe-area-inset-bottom))] pt-4">
          <section className="rounded-2xl border border-[#DCE5EA] bg-[#F8FAFB] px-3.5 py-3">
            <BilingualLabel label="ما هو؟ | What is it?" className="text-[11px] font-black text-[#405E75]" />
            <p className="mt-1.5 text-[12px] leading-6 text-[#465866]"><MixedDirectionText text={item.summary} /></p>
            <MediaGrid items={summaryMedia} />
          </section>

          {item.clinicalNote && (
            <section className="rounded-2xl border border-[#E8DFC9] bg-[#FFF9EE] px-3.5 py-3">
              <BilingualLabel label="ملاحظة سريرية | Clinical note" className="text-[11px] font-black text-[#8A6426]" />
              <p className="mt-1.5 text-[11px] leading-5 text-[#5B5142]"><MixedDirectionText text={item.clinicalNote} /></p>
              <MediaGrid items={clinicalMedia} />
            </section>
          )}

          <SoftList title="الوظيفة | Purpose" items={item.purpose} media={purposeMedia} />
          <SoftList title="نقاط مهمة | Key points" items={item.keyPoints} media={keyPointsMedia} />

          {gallery.length > 0 && (
            <section className="rounded-2xl border border-[#DCE5EA] bg-[#F8FAFB] px-3.5 py-3">
              <BilingualLabel label="صور توضيحية | Illustrations" className="text-[11px] font-black text-[#405E75]" />
              <MediaGrid items={gallery} />
            </section>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

export function EquipmentDirectory({ initialQuery = '' }: { initialQuery?: string }) {
  const [query, setQuery] = useState(initialQuery);
  const [category, setCategory] = useState<'all' | EquipmentCategory>('all');
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [equipmentContent, setEquipmentContent] = useState<RuntimeEquipmentContent>(() => localEquipmentContent());

  useEffect(() => {
    let active = true;
    void loadPublishedEquipmentContent().then((content) => {
      if (active) setEquipmentContent(content);
    });
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    setQuery(initialQuery);
    const normalized = initialQuery.trim().toLowerCase();
    if (normalized) setCategory('all');
    if (!normalized) {
      setSelectedId(null);
      return;
    }

    const exact = equipmentContent.items.find(
      (item) => item.nameEn.toLowerCase() === normalized || item.nameAr.toLowerCase() === normalized,
    );
    if (exact) setSelectedId(exact.id);
  }, [initialQuery, equipmentContent.items]);

  const currentCategory = EQUIPMENT_FILTERS.find((item) => item.id === category)?.label ?? 'الكل';

  const categoryItems: StackMenuItem[] = EQUIPMENT_FILTERS.map((item) => ({
    id: item.id,
    title: item.label,
    description: item.id === 'all' ? 'كل المعدات والأدوات' : 'تصفية هذا القسم',
    leading: <MedicalSiteIcon name={equipmentCategoryIcon[item.id]} play loop size={24} />,
    onSelect: () => setCategory(item.id as 'all' | EquipmentCategory),
  }));

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return equipmentContent.items.filter((item) => {
      const categoryMatch = category === 'all' || item.category === category;
      const queryMatch = !normalized || [
        item.nameAr,
        item.nameEn,
        item.categoryAr,
        item.summary,
        ...item.purpose,
        ...item.keyPoints,
        item.clinicalNote ?? '',
        ...item.tags,
      ].some((value) => value.toLowerCase().includes(normalized));
      return categoryMatch && queryMatch;
    });
  }, [category, query, equipmentContent.items]);

  const selected = selectedId ? equipmentContent.items.find((item) => item.id === selectedId) ?? null : null;

  return (
    <div className="space-y-3">
      <div className="relative">
        <MagnifyingGlass size={18} weight="bold" className="absolute right-3 top-1/2 -translate-y-1/2 text-[#526F85]" />
        <input value={query} onChange={(event) => setQuery(event.target.value)} aria-label="البحث في عربة التخدير والمعدات" dir="auto" placeholder="Laryngoscope، منظار الحنجرة، OPA..." className="h-11 w-full rounded-xl border border-[#DCE4EA] bg-white pr-10 pl-3 text-xs font-semibold text-[#183149] outline-none placeholder:text-[#66737F] focus:border-[#B58B2A] focus:ring-2 focus:ring-[#CCA039]/15" />
      </div>

      <NotificationStackMenu title={currentCategory} description="قسم عربة التخدير والمعدات" icon={<MedicalSiteIcon name={equipmentCategoryIcon[category]} play loop size={27} />} items={categoryItems} selectedId={category} />

      <div className="space-y-2">
        {filtered.map((item) => {
          const cover = coverImage(equipmentContent.mediaByEquipment[item.id] ?? []);
          return (
            <motion.button key={item.id} type="button" onClick={() => setSelectedId(item.id)} className="w-full rounded-[18px] border border-[#DCE5EA] bg-[#F7F9FA] px-3.5 py-3 text-right outline-none transition active:bg-[#EEF3F6] focus-visible:ring-2 focus-visible:ring-[#CCA039]/55">
              <div className="flex items-start gap-3">
                <span className="shrink-0 rounded-full bg-white/80 px-2.5 py-1 text-[11px] font-black text-[#405E75]">{item.categoryAr}</span>
                <div className="min-w-0 flex-1">
                  <h3 className="text-[13px] font-black text-[#183149]">{item.nameAr}</h3>
                  <p className="mt-0.5 truncate text-[11px] font-bold text-[#526675]" dir="ltr">{item.nameEn}</p>
                </div>
                <span className="grid h-10 w-10 shrink-0 place-items-center overflow-hidden rounded-[12px] border border-[#D7E2E9] bg-white">
                  {cover ? <img src={cover.url} alt={cover.alt || item.nameAr} className="h-full w-full object-contain" /> : <MedicalSiteIcon name={equipmentIcon(item)} size={26} />}
                </span>
              </div>
              <p className="mt-2 line-clamp-2 text-[11px] leading-5 text-[#526675]">{item.summary}</p>
              <div className="mt-2 border-t border-[#DDE6EB] pt-2 text-[11px] font-black text-[#405E75]"><BilingualLabel label="التفاصيل | Details" /></div>
            </motion.button>
          );
        })}
      </div>

      {filtered.length === 0 && <div className="rounded-[18px] border border-dashed border-[#C9D6DF] bg-[#F8FAFB] p-7 text-center text-xs text-[#5F7280]">ماكو جهاز أو أداة مطابقة للبحث.</div>}

      <AnimatePresence>
        {selected && <EquipmentSheet item={selected} media={equipmentContent.mediaByEquipment[selected.id] ?? []} onClose={() => setSelectedId(null)} />}
      </AnimatePresence>
    </div>
  );
}
