import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { CaretDown, Drop, MagnifyingGlass, X } from '@phosphor-icons/react';
import {
  FLUID_FILTERS,
  INTRAVENOUS_FLUIDS,
  type FluidCategory,
  type IntravenousFluid
} from '../data/fluids';
import { BilingualLabel } from './BilingualLabel';
import { MixedDirectionText } from './MixedDirectionText';
import {
  NotificationStackMenu,
  type StackMenuItem
} from './ui/NotificationStackMenu';

function FluidList({
  title,
  items,
  tone
}: {
  title: string;
  items: string[];
  tone: 'use' | 'caution';
}) {
  const box = tone === 'use'
    ? 'border-[#DCE5EA] bg-[#F7F9FA]'
    : 'border-[#F0DDE1] bg-[#FFF5F6]';
  const titleClass = tone === 'use' ? 'text-[#405E75]' : 'text-[#A15C68]';
  const dot = tone === 'use' ? 'bg-[#5F7E95]' : 'bg-[#C77A88]';

  const body = (
    <div className="space-y-2">
      {items.map((text, index) => (
        <div key={index} className="flex items-start justify-end gap-2">
          <p className="flex-1 text-right text-[11px] leading-5 text-[#526675]">{text}</p>
          <span className={'mt-2 h-1.5 w-1.5 shrink-0 rounded-full ' + dot} />
        </div>
      ))}
    </div>
  );

  return (
    <details className={'group rounded-2xl border px-3.5 py-3 ' + box}>
      <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-3">
        <CaretDown size={15} weight="bold" className="text-[#526F85] transition group-open:rotate-180" />
        <div className="flex items-center gap-2">
          <span className="rounded-full bg-white/75 px-2 py-0.5 text-[9px] font-black text-[#5F7280]">{items.length}</span>
          <BilingualLabel label={title} className={'text-[10px] font-black ' + titleClass} />
        </div>
      </summary>
      <div className="mt-3 border-t border-black/[0.05] pt-3">{body}</div>
    </details>
  );
}

function FluidSheet({ item, onClose }: { item: IntravenousFluid; onClose: () => void }) {
  return (
    <motion.div
      className="fixed inset-0 z-[87] bg-[#0A2037]/42 backdrop-blur-[2px]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="absolute inset-x-0 bottom-0 mx-auto max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-t-[28px] border-t border-[#DCE5EA] bg-white shadow-2xl"
        initial={{ y: 38, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 32, opacity: 0 }}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="sticky top-0 z-10 border-b border-[#E3EAF0] bg-[#F7F9FA]/95 px-4 pb-3 pt-3 backdrop-blur-xl">
          <div className="mx-auto mb-3 h-1 w-10 rounded-full bg-[#AFC0CC]" />
          <div className="flex items-start justify-between gap-3">
            <button
              onClick={onClose}
              className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-[#D6E1EA] bg-white text-[#526675] outline-none focus-visible:ring-2 focus-visible:ring-[#CCA039]/55"
              aria-label="إغلاق"
            >
              <X size={17} weight="bold" />
            </button>
            <div className="flex-1 text-right">
              <p className="text-[10px] font-black text-[#405E75]">{item.categoryAr}</p>
              <h3 className="mt-0.5 text-lg font-black text-[#183149]">{item.nameAr}</h3>
              <p className="mt-0.5 text-sm font-bold text-[#526675]" dir="ltr">{item.nameEn}</p>
            </div>
          </div>
        </div>

        <div className="space-y-3 px-4 pb-[max(1.75rem,env(safe-area-inset-bottom))] pt-4">
          <section className="rounded-2xl border border-[#DCE5EA] bg-[#F8FAFB] px-3.5 py-3">
            <BilingualLabel label="التركيب | Composition" className="text-[10px] font-black text-[#405E75]" />
            <p className="mt-1.5 text-[12px] leading-6 text-[#465866]"><MixedDirectionText text={item.composition} /></p>
          </section>

          {item.clinicalNote && (
            <section className="rounded-2xl border border-[#E8DFC9] bg-[#FFF9EE] px-3.5 py-3">
              <BilingualLabel label="ملاحظة سريرية | Clinical note" className="text-[10px] font-black text-[#8A6426]" />
              <p className="mt-1.5 text-[11px] leading-5 text-[#5B5142]"><MixedDirectionText text={item.clinicalNote} /></p>
            </section>
          )}

          <FluidList title="الدور والاستخدام | Role" items={item.role} tone="use" />
          <FluidList title="محاذير | Cautions" items={item.cautions} tone="caution" />

        </div>
      </motion.div>
    </motion.div>
  );
}

export function FluidsDirectory({
  initialQuery = '',
  onOpenItem
}: {
  initialQuery?: string;
  onOpenItem?: (query: string) => void;
}) {
  const [query, setQuery] = useState(initialQuery);
  const [category, setCategory] = useState<'all' | FluidCategory>('all');
  const [selected, setSelected] = useState<IntravenousFluid | null>(null);

  useEffect(() => {
    setQuery(initialQuery);

    const normalized = initialQuery.trim().toLowerCase();
    if (!normalized) {
      setSelected(null);
      return;
    }

    const exact = INTRAVENOUS_FLUIDS.find(
      (item) =>
        item.nameEn.toLowerCase() === normalized ||
        item.nameAr.toLowerCase() === normalized
    );

    if (exact) setSelected(exact);
  }, [initialQuery]);

  const currentCategory =
    FLUID_FILTERS.find((item) => item.id === category)?.label ?? 'الكل';

  const categoryItems: StackMenuItem[] = FLUID_FILTERS.map((item) => ({
    id: item.id,
    title: item.label,
    description: item.id === 'all' ? 'كل السوائل الوريدية' : 'تصفية هذا النوع',
    leading: <Drop size={19} weight="fill" />,
    onSelect: () => setCategory(item.id as 'all' | FluidCategory)
  }));

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return INTRAVENOUS_FLUIDS.filter((item) => {
      const categoryMatch = category === 'all' || item.category === category;
      const queryMatch =
        !normalized ||
        [
          item.nameAr,
          item.nameEn,
          item.categoryAr,
          item.composition,
          ...item.role,
          ...item.cautions,
          item.clinicalNote ?? '',
          ...item.tags
        ].some((value) => value.toLowerCase().includes(normalized));
      return categoryMatch && queryMatch;
    });
  }, [category, query]);

  return (
    <div className="space-y-3">
      <div className="relative">
        <MagnifyingGlass
          size={18}
          weight="bold"
          className="absolute right-3 top-1/2 -translate-y-1/2 text-[#526F85]"
        />
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Normal Saline، Ringer، Albumin..."
          className="h-11 w-full rounded-xl border border-[#DCE4EA] bg-white pr-10 pl-3 text-xs font-semibold text-[#183149] outline-none placeholder:text-[#83919C] focus:border-[#B58B2A] focus:ring-2 focus:ring-[#CCA039]/15"
        />
      </div>

      <NotificationStackMenu
        title={currentCategory}
        description="نوع السوائل الوريدية"
        icon={<Drop size={22} weight="fill" />}
        items={categoryItems}
      />

      <div className="space-y-2">
        {filtered.map((item, index) => (
          <motion.button
            key={item.id}
            type="button"
            onClick={() => {
              setSelected(item);
              onOpenItem?.(item.nameEn);
            }}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.12, delay: Math.min(index, 8) * 0.015 }}
            className="w-full rounded-[18px] border border-[#DCE5EA] bg-[#F7F9FA] px-3.5 py-3 text-right active:bg-[#EEF3F6]"
          >
            <div className="flex items-start justify-between gap-3">
              <span className="shrink-0 rounded-full bg-white/80 px-2.5 py-1 text-[9px] font-black text-[#405E75]">
                {item.categoryAr}
              </span>
              <div className="min-w-0 flex-1">
                <h3 className="text-[13px] font-black text-[#183149]">{item.nameAr}</h3>
                <p className="mt-0.5 truncate text-[10px] font-bold text-[#526675]" dir="ltr">
                  {item.nameEn}
                </p>
              </div>
            </div>
            <div className="mt-2 flex items-center justify-between border-t border-[#DDE6EB] pt-2">
              <span className="text-[9px] text-[#657784]">تركيب • استخدام • محاذير</span>
              <Drop size={15} weight="fill" className="text-[#405E75]" />
            </div>
          </motion.button>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="rounded-[18px] border border-dashed border-[#C9D6DF] bg-[#F8FAFB] p-7 text-center text-xs text-[#667A89]">
          ماكو سائل مطابق للبحث.
        </div>
      )}

      <AnimatePresence>
        {selected && <FluidSheet item={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </div>
  );
}