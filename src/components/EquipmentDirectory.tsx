import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { CaretDown, MagnifyingGlass, X } from '@phosphor-icons/react';
import {
  ANESTHESIA_EQUIPMENT,
  EQUIPMENT_FILTERS,
  type AnesthesiaEquipment,
  type EquipmentCategory
} from '../data/equipment';

function SoftList({
  title,
  items,
  tone = 'blue'
}: {
  title: string;
  items: string[];
  tone?: 'blue' | 'green';
}) {
  const box =
    tone === 'green'
      ? 'border-[#D9EADF] bg-[#F2F8F4]'
      : 'border-[#DCE7F0] bg-[#F2F7FB]';
  const titleClass = tone === 'green' ? 'text-[#4F765F]' : 'text-[#567594]';
  const dot = tone === 'green' ? 'bg-[#6FA382]' : 'bg-[#7895AF]';

  const body = (
    <div className="space-y-2">
      {items.map((text, index) => (
        <div key={index} className="flex items-start justify-end gap-2">
          <p className="flex-1 text-right text-[11px] leading-5 text-[#4E5660]">{text}</p>
          <span className={'mt-2 h-1.5 w-1.5 shrink-0 rounded-full ' + dot} />
        </div>
      ))}
    </div>
  );

  if (items.length <= 1) {
    return (
      <section className={'rounded-2xl border px-3.5 py-3 ' + box}>
        <p className={'text-[10px] font-black ' + titleClass}>{title}</p>
        <div className="mt-2">{body}</div>
      </section>
    );
  }

  return (
    <details className={'group rounded-2xl border px-3.5 py-3 ' + box}>
      <summary className="flex cursor-pointer list-none items-center justify-between gap-3">
        <CaretDown size={15} weight="bold" className="text-[#718297] transition group-open:rotate-180" />
        <div className="flex items-center gap-2">
          <span className="rounded-full bg-white/75 px-2 py-0.5 text-[9px] font-black text-[#647486]">
            {items.length}
          </span>
          <span className={'text-[10px] font-black ' + titleClass}>{title}</span>
        </div>
      </summary>
      <div className="mt-3 border-t border-black/[0.05] pt-3">{body}</div>
    </details>
  );
}

function EquipmentSheet({
  item,
  onClose
}: {
  item: AnesthesiaEquipment;
  onClose: () => void;
}) {
  return (
    <motion.div
      className="fixed inset-0 z-[85] bg-[#2F2145]/35 backdrop-blur-[2px]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="absolute inset-x-0 bottom-0 mx-auto max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-t-[28px] border-t border-[#DCE7F0] bg-white shadow-2xl"
        initial={{ y: 38, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 32, opacity: 0 }}
        transition={{ duration: 0.18 }}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="sticky top-0 z-10 border-b border-[#E4ECF3] bg-[#F2F7FB]/95 px-4 pb-3 pt-3 backdrop-blur-xl">
          <div className="mx-auto mb-3 h-1 w-10 rounded-full bg-[#ADC1D2]" />
          <div className="flex items-start justify-between gap-3">
            <button
              onClick={onClose}
              className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-[#D6E1EA] bg-white text-[#607487]"
              aria-label="إغلاق"
            >
              <X size={17} weight="bold" />
            </button>
            <div className="flex-1 text-right">
              <p className="text-[10px] font-black text-[#5B7896]">{item.categoryAr}</p>
              <h3 className="mt-0.5 text-lg font-black text-[#2F3945]">{item.nameAr}</h3>
              <p className="mt-0.5 text-sm font-bold text-[#687684]" dir="ltr">{item.nameEn}</p>
            </div>
          </div>
        </div>

        <div className="space-y-3 px-4 pb-7 pt-4">
          <section className="rounded-2xl border border-[#DCE7F0] bg-[#F8FBFD] px-3.5 py-3">
            <p className="text-[10px] font-black text-[#567594]">ما هو؟ | What is it?</p>
            <p className="mt-1.5 text-[12px] leading-6 text-[#44505B]">{item.summary}</p>
          </section>

          <SoftList title="الوظيفة | Purpose" items={item.purpose} tone="green" />
          <SoftList title="نقاط مهمة | Key points" items={item.keyPoints} tone="blue" />

          {item.correction && (
            <section className="rounded-2xl border border-[#F0E1BA] bg-[#FFF9EC] px-3.5 py-3">
              <p className="text-[10px] font-black text-[#966A22]">تصحيح علمي | Scientific correction</p>
              <p className="mt-2 text-[11px] leading-5 text-[#5F533D]">{item.correction}</p>
            </section>
          )}

          <p className="border-t border-[#E8EEF3] pt-3 text-center text-[9px] text-[#84919C]">
            من المصدر المرفوع: الصفحات {item.sourcePages.join('، ')}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function EquipmentDirectory() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<'all' | EquipmentCategory>('all');
  const [selected, setSelected] = useState<AnesthesiaEquipment | null>(null);

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return ANESTHESIA_EQUIPMENT.filter((item) => {
      const categoryMatch = category === 'all' || item.category === category;
      const queryMatch =
        !normalized ||
        [
          item.nameAr,
          item.nameEn,
          item.categoryAr,
          item.summary,
          ...item.purpose,
          ...item.keyPoints,
          item.correction ?? '',
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
          className="absolute right-3 top-1/2 -translate-y-1/2 text-[#5B7896]"
        />
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Laryngoscope، منظار الحنجرة، OPA..."
          className="h-11 w-full rounded-xl border border-[#D9E4ED] bg-white pr-10 pl-3 text-xs font-semibold text-[#33404C] outline-none placeholder:text-[#98A5B0] focus:border-[#9FB5C8]"
        />
      </div>

      <div className="flex gap-1.5 overflow-x-auto pb-1 [scrollbar-width:none]">
        {EQUIPMENT_FILTERS.map((item) => {
          const active = category === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setCategory(item.id)}
              className={
                'shrink-0 rounded-full border px-3 py-1.5 text-[10px] font-black transition ' +
                (active
                  ? 'border-[#9FB5C8] bg-[#EAF2F8] text-[#4D6D89]'
                  : 'border-[#E2E8ED] bg-white text-[#778693]')
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
            className="w-full rounded-[18px] border border-[#DDE7F0] bg-[#F2F7FB] px-3.5 py-3 text-right active:bg-[#EAF2F8]"
          >
            <div className="flex items-start justify-between gap-3">
              <span className="shrink-0 rounded-full bg-white/80 px-2.5 py-1 text-[9px] font-black text-[#557491]">
                {item.categoryAr}
              </span>
              <div className="min-w-0 flex-1">
                <h3 className="text-[13px] font-black text-[#2E3944]">{item.nameAr}</h3>
                <p className="mt-0.5 truncate text-[10px] font-bold text-[#6C7A87]" dir="ltr">
                  {item.nameEn}
                </p>
              </div>
            </div>
            <p className="mt-2 line-clamp-2 text-[10px] leading-5 text-[#687784]">{item.summary}</p>
            <div className="mt-2 border-t border-[#DCE6EE] pt-2 text-[9px] font-black text-[#557491]">
              التفاصيل | Details
            </div>
          </motion.button>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="rounded-[18px] border border-dashed border-[#C5D5E2] bg-[#F8FBFD] p-7 text-center text-xs text-[#7C8B97]">
          ماكو جهاز أو أداة مطابقة للبحث.
        </div>
      )}

      <AnimatePresence>
        {selected && <EquipmentSheet item={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </div>
  );
}
