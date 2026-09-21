import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { CheckCircle, MagnifyingGlass, WarningCircle, X } from '@phosphor-icons/react';
import {
  CORRECTION_FILTERS,
  SCIENTIFIC_CORRECTIONS,
  type CorrectionCategory,
  type ScientificCorrection
} from '../data/corrections';

function CorrectionSheet({
  item,
  onClose
}: {
  item: ScientificCorrection;
  onClose: () => void;
}) {
  return (
    <motion.div
      className="fixed inset-0 z-[89] bg-black/55 backdrop-blur-[2px]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="absolute inset-x-0 bottom-0 mx-auto max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-t-[28px] border-t border-[#CCA039]/20 bg-[#0A2036] shadow-2xl"
        initial={{ y: 36, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 30, opacity: 0 }}
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
              <p className="text-[10px] font-black text-[#CCA039]">{item.categoryAr}</p>
              <h3 className="mt-0.5 text-lg font-black text-[#EEE8D6]">{item.titleAr}</h3>
              <p className="mt-0.5 text-xs font-bold text-[#98A7B3]" dir="ltr">{item.titleEn}</p>
            </div>
          </div>
        </div>

        <div className="space-y-5 px-4 pb-7 pt-4">
          <section className="border-r-2 border-r-[#9C5656] pr-3">
            <div className="flex items-center justify-end gap-2">
              <p className="text-[10px] font-black text-[#D48A8A]">المعلومة في المصدر | Source statement</p>
              <WarningCircle size={15} weight="bold" className="text-[#D48A8A]" />
            </div>
            <p className="mt-2 text-[11px] leading-5 text-[#AEB8C0]">{item.sourceClaim}</p>
          </section>

          <section className="border-r-[3px] border-r-[#4E8F70] pr-3">
            <div className="flex items-center justify-end gap-2">
              <p className="text-[10px] font-black text-[#7FB69B]">التصحيح | Correction</p>
              <CheckCircle size={15} weight="fill" className="text-[#7FB69B]" />
            </div>
            <p className="mt-2 text-[12px] leading-6 text-[#D7DBDE]">{item.correction}</p>
          </section>

          <section className="border-r-2 border-r-[#607C92] pr-3">
            <p className="text-[10px] font-black text-[#A9B8C3]">ليش مهم؟ | Why it matters</p>
            <p className="mt-2 text-[11px] leading-5 text-[#A9B5BE]">{item.whyItMatters}</p>
          </section>

          <section className="border-r-2 border-r-[#D9A441] pr-3">
            <p className="text-[10px] font-black text-[#D9A441]">أساس التحديث | Evidence basis</p>
            <p className="mt-2 text-[11px] leading-5 text-[#B8B8AE]">{item.evidenceBasis}</p>
          </section>

          <div className="border-t border-white/5 pt-3 text-center text-[9px] leading-4 text-[#607589]">
            <p>المصدر الأصلي | Original source: {item.sourceLabel}</p>
            <p className="mt-1">{item.sourceLocation}</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function CorrectionsDirectory() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<'all' | CorrectionCategory>('all');
  const [selected, setSelected] = useState<ScientificCorrection | null>(null);

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return SCIENTIFIC_CORRECTIONS.filter((item) => {
      const categoryMatch = category === 'all' || item.category === category;
      const queryMatch =
        !normalized ||
        [
          item.titleAr,
          item.titleEn,
          item.categoryAr,
          item.sourceClaim,
          item.correction,
          item.whyItMatters,
          item.evidenceBasis,
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
          className="absolute right-3 top-1/2 -translate-y-1/2 text-[#CCA039]"
        />
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Adenosine، Succinylcholine، السوائل..."
          className="h-11 w-full rounded-xl border border-[#CCA039]/12 bg-[#071B2D] pr-10 pl-3 text-xs font-semibold text-[#EEE8D6] outline-none placeholder:text-[#64798B] focus:border-[#CCA039]/45"
        />
      </div>

      <div className="flex gap-1.5 overflow-x-auto pb-1 [scrollbar-width:none]">
        {CORRECTION_FILTERS.map((item) => {
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
            className="w-full rounded-[18px] border border-[#D9A441]/10 bg-[#0D2741] px-3.5 py-3 text-right active:bg-[#102E4B]"
          >
            <div className="flex items-start justify-between gap-3">
              <span className="shrink-0 rounded-full bg-[#D9A441]/8 px-2.5 py-1 text-[9px] font-black text-[#D9A441]">
                {item.categoryAr}
              </span>
              <div className="min-w-0 flex-1">
                <h3 className="text-[13px] font-black text-[#EEE8D6]">{item.titleAr}</h3>
                <p className="mt-0.5 truncate text-[10px] font-bold text-[#92A2AF]" dir="ltr">
                  {item.titleEn}
                </p>
              </div>
            </div>
            <p className="mt-2 line-clamp-2 text-[10px] leading-5 text-[#8A9BA8]">{item.correction}</p>
            <div className="mt-2 border-t border-white/5 pt-2 text-[9px] font-black text-[#D9A441]">
              شوف الخطأ والتصحيح | Open correction
            </div>
          </motion.button>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="rounded-[18px] border border-dashed border-[#CCA039]/20 p-7 text-center text-xs text-[#718598]">
          ماكو تصحيح مطابق للبحث.
        </div>
      )}

      <AnimatePresence>
        {selected && <CorrectionSheet item={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </div>
  );
}
