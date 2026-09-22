import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { CaretDown, Drop, MagnifyingGlass, X } from '@phosphor-icons/react';
import {
  FLUID_FILTERS,
  INTRAVENOUS_FLUIDS,
  type FluidCategory,
  type IntravenousFluid
} from '../data/fluids';

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
    ? 'border-[#D7EAE7] bg-[#F0F8F7]'
    : 'border-[#F0DDE1] bg-[#FFF5F6]';
  const titleClass = tone === 'use' ? 'text-[#4E7D77]' : 'text-[#A05D68]';
  const dot = tone === 'use' ? 'bg-[#6DA39C]' : 'bg-[#C47A86]';

  const body = (
    <div className="space-y-2">
      {items.map((text, index) => (
        <div key={index} className="flex items-start justify-end gap-2">
          <p className="flex-1 text-right text-[11px] leading-5 text-[#4E575B]">{text}</p>
          <span className={'mt-2 h-1.5 w-1.5 shrink-0 rounded-full ' + dot} />
        </div>
      ))}
    </div>
  );

  return (
    <details className={'group rounded-2xl border px-3.5 py-3 ' + box}>
      <summary className="flex cursor-pointer list-none items-center justify-between gap-3">
        <CaretDown size={15} weight="bold" className="text-[#708282] transition group-open:rotate-180" />
        <div className="flex items-center gap-2">
          <span className="rounded-full bg-white/75 px-2 py-0.5 text-[9px] font-black text-[#647477]">{items.length}</span>
          <span className={'text-[10px] font-black ' + titleClass}>{title}</span>
        </div>
      </summary>
      <div className="mt-3 border-t border-black/[0.05] pt-3">{body}</div>
    </details>
  );
}

function FluidSheet({ item, onClose }: { item: IntravenousFluid; onClose: () => void }) {
  return (
    <motion.div
      className="fixed inset-0 z-[87] bg-[#2F2145]/35 backdrop-blur-[2px]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="absolute inset-x-0 bottom-0 mx-auto max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-t-[28px] border-t border-[#D7EAE7] bg-white shadow-2xl"
        initial={{ y: 38, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 32, opacity: 0 }}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="sticky top-0 z-10 border-b border-[#E1EEEC] bg-[#F0F8F7]/95 px-4 pb-3 pt-3 backdrop-blur-xl">
          <div className="mx-auto mb-3 h-1 w-10 rounded-full bg-[#AAC9C4]" />
          <div className="flex items-start justify-between gap-3">
            <button
              onClick={onClose}
              className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-[#D3E5E2] bg-white text-[#607B78]"
              aria-label="إغلاق"
            >
              <X size={17} weight="bold" />
            </button>
            <div className="flex-1 text-right">
              <p className="text-[10px] font-black text-[#4E7D77]">{item.categoryAr}</p>
              <h3 className="mt-0.5 text-lg font-black text-[#2F3C3B]">{item.nameAr}</h3>
              <p className="mt-0.5 text-sm font-bold text-[#687876]" dir="ltr">{item.nameEn}</p>
            </div>
          </div>
        </div>

        <div className="space-y-3 px-4 pb-[max(1.75rem,env(safe-area-inset-bottom))] pt-4">
          <section className="rounded-2xl border border-[#D7EAE7] bg-[#F7FBFA] px-3.5 py-3">
            <p className="text-[10px] font-black text-[#4E7D77]">التركيب | Composition</p>
            <p className="mt-1.5 text-[12px] leading-6 text-[#455250]">{item.composition}</p>
          </section>

          <FluidList title="الدور والاستخدام | Role" items={item.role} tone="use" />
          <FluidList title="محاذير | Cautions" items={item.cautions} tone="caution" />

          <div className="border-t border-[#E4ECEA] pt-3 text-center text-[9px] leading-4 text-[#84918F]">
            <p>المصدر | Source: مبادئ التخدير</p>
            <p className="mt-1">صفحات المصدر | Source pages: {item.sourcePages.join('، ')}</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function FluidsDirectory({ initialQuery = '' }: { initialQuery?: string }) {
  const [query, setQuery] = useState(initialQuery);
  const [category, setCategory] = useState<'all' | FluidCategory>('all');
  const [selected, setSelected] = useState<IntravenousFluid | null>(null);

  useEffect(() => {
    setQuery(initialQuery);
  }, [initialQuery]);

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
          className="absolute right-3 top-1/2 -translate-y-1/2 text-[#4E7D77]"
        />
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Normal Saline، Ringer، Albumin..."
          className="h-11 w-full rounded-xl border border-[#D8E8E5] bg-white pr-10 pl-3 text-xs font-semibold text-[#344342] outline-none placeholder:text-[#99A6A4] focus:border-[#A7C6C0]"
        />
      </div>

      <div className="flex gap-1.5 overflow-x-auto pb-1 [scrollbar-width:none]">
        {FLUID_FILTERS.map((item) => {
          const active = category === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setCategory(item.id)}
              className={
                'shrink-0 rounded-full border px-3 py-1.5 text-[10px] font-black transition ' +
                (active
                  ? 'border-[#CCA039]/35 bg-[#CCA039]/12 text-[#E5C979]'
                  : 'border-white/6 bg-white/[0.02] text-[#778B9B]')
              }
            >
              {item.label}
            </button>
          );
        })}
      </div>

      <div className="space-y-2">
        {filtered.map((item, index) => (
          <motion.button
            key={item.id}
            type="button"
            onClick={() => setSelected(item)}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.12, delay: Math.min(index, 8) * 0.015 }}
            className="w-full rounded-[18px] border border-[#D7EAE7] bg-[#F0F8F7] px-3.5 py-3 text-right active:bg-[#E8F4F2]"
          >
            <div className="flex items-start justify-between gap-3">
              <span className="shrink-0 rounded-full bg-white/80 px-2.5 py-1 text-[9px] font-black text-[#4E7D77]">
                {item.categoryAr}
              </span>
              <div className="min-w-0 flex-1">
                <h3 className="text-[13px] font-black text-[#2F3C3B]">{item.nameAr}</h3>
                <p className="mt-0.5 truncate text-[10px] font-bold text-[#6B7B78]" dir="ltr">
                  {item.nameEn}
                </p>
              </div>
            </div>
            <div className="mt-2 flex items-center justify-between border-t border-[#D7E5E2] pt-2">
              <span className="text-[9px] text-[#6B7D79]">تركيب • استخدام • محاذير</span>
              <Drop size={15} weight="fill" className="text-[#4E7D77]" />
            </div>
          </motion.button>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="rounded-[18px] border border-dashed border-[#C6DCD8] bg-[#F7FBFA] p-7 text-center text-xs text-[#7C8D89]">
          ماكو سائل مطابق للبحث.
        </div>
      )}

      <AnimatePresence>
        {selected && <FluidSheet item={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </div>
  );
}
