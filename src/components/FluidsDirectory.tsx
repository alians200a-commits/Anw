import { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { CaretDown, MagnifyingGlass, X } from '@phosphor-icons/react';
import {
  FLUID_FILTERS,
  type FluidCategory,
  type IntravenousFluid,
} from '../data/fluids';
import {
  loadPublishedFluidContent,
  localFluidContent,
  type RuntimeFluidContent,
} from '../data/publishedFluidContent';
import type { ContentMediaItem, FluidMediaSection } from '../types/contentMedia';
import { BilingualLabel } from './BilingualLabel';
import { MixedDirectionText } from './MixedDirectionText';
import { useModalSheetA11y } from '../hooks/useModalSheetA11y';
import { NotificationStackMenu, type StackMenuItem } from './ui/NotificationStackMenu';
import { MedicalSiteIcon } from './ui/MedicalSiteIcon';

function sortedVisible(media: ContentMediaItem[]) {
  return media.filter((item) => !item.hidden).sort((a, b) => a.order - b.order);
}

function coverImage(media: ContentMediaItem[]) {
  return sortedVisible(media).find((item) => item.placement === 'cover');
}

function sectionImages(media: ContentMediaItem[], sectionKey: FluidMediaSection) {
  return sortedVisible(media).filter((item) => item.placement === 'section' && item.sectionKey === sectionKey);
}

function galleryImages(media: ContentMediaItem[]) {
  return sortedVisible(media).filter((item) => item.placement === 'gallery');
}

function MediaGrid({ items }: { items: ContentMediaItem[] }) {
  if (!items.length) return null;
  return (
    <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
      {items.map((image) => (
        <figure key={image.id} className="overflow-hidden rounded-[18px] border border-[#DCE5EA] bg-white">
          <div className="flex min-h-36 items-center justify-center bg-[#F8FAFB] p-2">
            <img src={image.url} alt={image.alt} loading="lazy" decoding="async" className="max-h-56 w-full object-contain" />
          </div>
          {image.caption && <figcaption className="border-t border-[#E7EDF1] px-3 py-2 text-right text-[10px] leading-5 text-[#526675]">{image.caption}</figcaption>}
        </figure>
      ))}
    </div>
  );
}

function FluidList({ title, items, tone, media = [] }: { title: string; items: string[]; tone: 'use' | 'caution'; media?: ContentMediaItem[] }) {
  if (!items.length) return null;

  const box = tone === 'use' ? 'border-[#DCE5EA] bg-white' : 'border-[#F0DDE1] bg-[#FFF7F8]';
  const titleClass = tone === 'use' ? 'text-[#405E75]' : 'text-[#A15C68]';
  const dot = tone === 'use' ? 'bg-[#5F7E95]' : 'bg-[#C77A88]';
  const body = (
    <div className="space-y-2.5">
      {items.map((text, index) => (
        <div key={index} className="flex items-start justify-end gap-2.5">
          <p className="flex-1 text-right text-[11.5px] leading-[1.8] text-[#526675]">{text}</p>
          <span className={'mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full ' + dot} />
        </div>
      ))}
      <MediaGrid items={media} />
    </div>
  );

  if (items.length === 1) {
    return (
      <section className={'rounded-[18px] border px-3.5 py-3.5 ' + box}>
        <BilingualLabel label={title} className={'text-[11px] font-black ' + titleClass} />
        <div className="mt-2.5">{body}</div>
      </section>
    );
  }

  return (
    <details className={'group rounded-[18px] border px-3.5 py-3 ' + box}>
      <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-3">
        <CaretDown size={15} weight="bold" className="text-[#526F85] transition group-open:rotate-180" />
        <div className="flex items-center gap-2">
          <span className="rounded-full bg-[#EEF3F6] px-2 py-0.5 text-[10px] font-black text-[#5F7280]">{items.length}</span>
          <BilingualLabel label={title} className={'text-[11px] font-black ' + titleClass} />
        </div>
      </summary>
      <div className="mt-3 border-t border-black/[0.05] pt-3">{body}</div>
    </details>
  );
}

export function FluidSheet({ item, media = [], onClose }: { item: IntravenousFluid; media?: ContentMediaItem[]; onClose: () => void }) {
  const dialogRef = useRef<HTMLDivElement>(null);
  useModalSheetA11y(dialogRef, onClose);
  const cover = coverImage(media);
  const compositionMedia = sectionImages(media, 'composition');
  const clinicalMedia = sectionImages(media, 'clinicalNote');
  const roleMedia = sectionImages(media, 'role');
  const cautionsMedia = sectionImages(media, 'cautions');
  const gallery = galleryImages(media);

  return (
    <motion.div className="fixed inset-0 z-[87] bg-[#0A2037]/48" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
      <motion.div ref={dialogRef} tabIndex={-1} role="dialog" aria-modal="true" aria-label={`تفاصيل ${item.nameAr}`} className="absolute inset-x-0 bottom-0 mx-auto max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-t-[30px] border-t border-[#D6E1E8] bg-[#F5F7F9] shadow-[0_-18px_55px_rgba(7,23,37,0.22)]" initial={{ y: 28, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 24, opacity: 0 }} transition={{ duration: 0.14 }} onClick={(event) => event.stopPropagation()}>
        <div className="sticky top-0 z-10 border-b border-[#DDE5EA] bg-white px-4 pb-3.5 pt-3">
          <div className="mx-auto mb-3 h-1 w-11 rounded-full bg-[#B7C5CE]" />
          <div className="flex items-start justify-between gap-3">
            <button type="button" onClick={onClose} className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-[#D6E1EA] bg-[#F7F9FA] text-[#526675] outline-none active:bg-[#EEF3F6] focus-visible:ring-2 focus-visible:ring-[#CCA039]/55" aria-label="إغلاق"><X size={17} weight="bold" /></button>
            <div className="flex min-w-0 flex-1 items-start justify-end gap-3">
              <div className="min-w-0 flex-1 text-right">
                <span className="inline-flex rounded-full border border-[#DCE5EA] bg-[#EEF3F6] px-2.5 py-1 text-[10px] font-black text-[#405E75]">{item.categoryAr}</span>
                <h3 className="mt-2 truncate text-[21px] font-black leading-7 text-[#183149]">{item.nameAr}</h3>
                <p className="mt-0.5 truncate text-[13px] font-bold text-[#526675]" dir="ltr">{item.nameEn}</p>
              </div>
              <span className="grid h-[72px] w-[72px] shrink-0 place-items-center overflow-hidden rounded-[20px] border border-[#D7E2E9] bg-[linear-gradient(145deg,#F8FBFC,#EEF4F7)] text-[#315672]">
                {cover ? <img src={cover.url} alt={cover.alt || item.nameAr} decoding="async" className="h-full w-full bg-white object-contain" /> : <MedicalSiteIcon name="fluids" size={34} />}
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-3 px-4 pb-[max(1.75rem,env(safe-area-inset-bottom))] pt-4">
          <section className="overflow-hidden rounded-[22px] border border-[#DCE5EA] bg-white">
            <div className="grid grid-cols-2 border-b border-[#E3EAF0] bg-[#F8FAFB] text-center">
              <div className="px-2 py-2.5">
                <div className="text-[15px] font-black text-[#183149]">{item.role.length}</div>
                <div className="mt-0.5 text-[9px] font-bold text-[#71808B]">استخدامات</div>
              </div>
              <div className="border-r border-[#E3EAF0] px-2 py-2.5">
                <div className="text-[15px] font-black text-[#183149]">{item.cautions.length}</div>
                <div className="mt-0.5 text-[9px] font-bold text-[#71808B]">محاذير</div>
              </div>
            </div>
            <div className="px-3.5 py-3.5">
              <BilingualLabel label="التركيب | Composition" className="text-[11px] font-black text-[#405E75]" />
              <p className="mt-2 text-[12px] leading-6 text-[#465866]"><MixedDirectionText text={item.composition} /></p>
              <MediaGrid items={compositionMedia} />
            </div>
          </section>

          {item.clinicalNote && (
            <section className="rounded-[18px] border border-[#E8DFC9] bg-[#FFF9EE] px-3.5 py-3.5">
              <div className="flex items-center justify-end gap-2">
                <BilingualLabel label="ملاحظة سريرية | Clinical note" className="text-[11px] font-black text-[#8A6426]" />
                <span className="h-2 w-2 rounded-full bg-[#D9A441]" />
              </div>
              <p className="mt-2 text-[11.5px] leading-[1.8] text-[#5B5142]"><MixedDirectionText text={item.clinicalNote} /></p>
              <MediaGrid items={clinicalMedia} />
            </section>
          )}

          <FluidList title="الدور والاستخدام | Role" items={item.role} tone="use" media={roleMedia} />
          <FluidList title="محاذير | Cautions" items={item.cautions} tone="caution" media={cautionsMedia} />

          {gallery.length > 0 && (
            <section className="rounded-[18px] border border-[#DCE5EA] bg-white px-3.5 py-3.5">
              <BilingualLabel label="صور توضيحية | Illustrations" className="text-[11px] font-black text-[#405E75]" />
              <MediaGrid items={gallery} />
            </section>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

export function FluidsDirectory({ initialQuery = '' }: { initialQuery?: string }) {
  const [query, setQuery] = useState(initialQuery);
  const [category, setCategory] = useState<'all' | FluidCategory>('all');
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [fluidContent, setFluidContent] = useState<RuntimeFluidContent>(() => localFluidContent());

  useEffect(() => {
    let active = true;
    void loadPublishedFluidContent().then((content) => { if (active) setFluidContent(content); });
    return () => { active = false; };
  }, []);

  useEffect(() => {
    setQuery(initialQuery);
    const normalized = initialQuery.trim().toLowerCase();
    if (normalized) setCategory('all');
    if (!normalized) { setSelectedId(null); return; }
    const exact = fluidContent.items.find((item) => item.nameEn.toLowerCase() === normalized || item.nameAr.toLowerCase() === normalized);
    if (exact) setSelectedId(exact.id);
  }, [initialQuery, fluidContent.items]);

  const currentCategory = FLUID_FILTERS.find((item) => item.id === category)?.label ?? 'الكل';
  const categoryItems: StackMenuItem[] = FLUID_FILTERS.map((item) => ({
    id: item.id,
    title: item.label,
    description: item.id === 'all' ? 'كل السوائل الوريدية' : 'تصفية هذا النوع',
    leading: <MedicalSiteIcon name="fluids" size={24} />,
    onSelect: () => setCategory(item.id as 'all' | FluidCategory),
  }));

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return fluidContent.items.filter((item) => {
      const categoryMatch = category === 'all' || item.category === category;
      const queryMatch = !normalized || [item.nameAr, item.nameEn, item.categoryAr, item.composition, ...item.role, ...item.cautions, item.clinicalNote ?? '', ...item.tags].some((value) => value.toLowerCase().includes(normalized));
      return categoryMatch && queryMatch;
    });
  }, [category, query, fluidContent.items]);

  const selected = selectedId ? fluidContent.items.find((item) => item.id === selectedId) ?? null : null;
  const clearFilters = () => { setQuery(''); setCategory('all'); };

  return (
    <div className="space-y-3">
      <section className="rounded-[22px] border border-[#DCE5EA] bg-[#F8FAFB] p-3 shadow-[0_8px_22px_rgba(16,45,79,0.045)]">
        <div className="relative">
          <MagnifyingGlass size={19} weight="bold" className="absolute right-4 top-1/2 -translate-y-1/2 text-[#526F85]" />
          <input value={query} onChange={(event) => setQuery(event.target.value)} aria-label="البحث في السوائل الوريدية" dir="auto" placeholder="Normal Saline، Ringer، Albumin..." className="h-12 w-full rounded-[16px] border border-[#D8E2E9] bg-white pr-11 pl-3 text-xs font-semibold text-[#183149] outline-none placeholder:text-[#7A8995] focus:border-[#B58B2A] focus:ring-2 focus:ring-[#CCA039]/15" />
        </div>

        <div className="mt-2.5">
          <NotificationStackMenu title={currentCategory} description="نوع السوائل الوريدية" icon={<MedicalSiteIcon name="fluids" size={27} />} items={categoryItems} selectedId={category} />
        </div>

        <div className="mt-2.5 flex items-center justify-between px-1 text-[10px] font-bold text-[#66737F]">
          {(query || category !== 'all') ? <button type="button" onClick={clearFilters} className="rounded-full px-2 py-1 text-[#8A6426] active:bg-[#F2E9D5]">مسح التصفية</button> : <span />}
          <span>عرض {filtered.length} من {fluidContent.items.length}</span>
        </div>
      </section>

      <div className="space-y-2.5">
        {filtered.map((item) => {
          const cover = coverImage(fluidContent.mediaByFluid[item.id] ?? []);
          return (
            <motion.button key={item.id} type="button" onClick={() => setSelectedId(item.id)} className="w-full rounded-[20px] border border-[#DCE5EA] bg-white px-3.5 py-3 text-right shadow-[0_5px_16px_rgba(16,45,79,0.045)] outline-none active:bg-[#F8FAFB] focus-visible:ring-2 focus-visible:ring-[#CCA039]/55">
              <div className="flex items-start justify-between gap-3">
                <span className="shrink-0 rounded-full bg-[#EEF3F6] px-2.5 py-1 text-[11px] font-black text-[#405E75]">{item.categoryAr}</span>
                <div className="min-w-0 flex-1"><h3 className="text-[13px] font-black text-[#183149]">{item.nameAr}</h3><p className="mt-0.5 truncate text-[11px] font-bold text-[#526675]" dir="ltr">{item.nameEn}</p></div>
                <span className="grid h-10 w-10 shrink-0 place-items-center overflow-hidden rounded-[12px] border border-[#D7E2E9] bg-[#F4F7F9]">{cover ? <img src={cover.url} alt={cover.alt || item.nameAr} decoding="async" className="h-full w-full object-contain" /> : <MedicalSiteIcon name="fluids" size={22} />}</span>
              </div>
              <div className="mt-2 flex items-center justify-between border-t border-[#DDE6EB] pt-2"><span className="text-[11px] text-[#5F7280]">تركيب • استخدام • محاذير</span><MedicalSiteIcon name="fluids" size={18} /></div>
            </motion.button>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="rounded-[24px] border border-dashed border-[#C9D6DF] bg-[linear-gradient(145deg,#F8FAFB,#F2F6F9)] p-7 text-center">
          <div className="mx-auto grid h-12 w-12 place-items-center rounded-[15px] border border-[#D7E2E9] bg-white"><MedicalSiteIcon name="fluids" size={28} /></div>
          <h3 className="mt-3 text-[13px] font-black text-[#183149]">ماكو سائل مطابق</h3>
          <p className="mt-1.5 text-[10px] font-semibold text-[#66737F]">غيّر كلمة البحث أو اعرض كل الأنواع.</p>
          <button type="button" onClick={clearFilters} className="mt-3 min-h-10 rounded-[13px] bg-[#173A63] px-4 text-[10px] font-black text-white">عرض كل السوائل</button>
        </div>
      )}

      <AnimatePresence>
        {selected && <FluidSheet item={selected} media={fluidContent.mediaByFluid[selected.id] ?? []} onClose={() => setSelectedId(null)} />}
      </AnimatePresence>
    </div>
  );
}
