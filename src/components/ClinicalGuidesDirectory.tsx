import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { CaretDown, MagnifyingGlass, X } from '@phosphor-icons/react';
import {
  CLINICAL_GUIDES,
  CLINICAL_GUIDE_FILTERS,
  type ClinicalGuide,
  type ClinicalGuideCategory
} from '../data/clinicalGuides';

function GuideItems({ title, items }: { title: string; items: string[] }) {
  const body = (
    <div className="space-y-2">
      {items.map((item, index) => (
        <div key={index} className="flex items-start justify-end gap-2">
          <p className="flex-1 text-right text-[11px] leading-5 text-[#4D5A52]">{item}</p>
          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#73A081]" />
        </div>
      ))}
    </div>
  );

  if (items.length <= 1) {
    return (
      <section className="rounded-2xl border border-[#DDEBE1] bg-[#F2F8F4] px-3.5 py-3">
        <p className="text-[10px] font-black text-[#4F765F]">{title}</p>
        <div className="mt-2">{body}</div>
      </section>
    );
  }

  return (
    <details className="group rounded-2xl border border-[#DDEBE1] bg-[#F2F8F4] px-3.5 py-3">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-3">
        <CaretDown size={15} weight="bold" className="text-[#66806E] transition group-open:rotate-180" />
        <div className="flex items-center gap-2">
          <span className="rounded-full bg-white/80 px-2 py-0.5 text-[9px] font-black text-[#607264]">{items.length}</span>
          <span className="text-[10px] font-black text-[#4F765F]">{title}</span>
        </div>
      </summary>
      <div className="mt-3 border-t border-black/[0.05] pt-3">{body}</div>
    </details>
  );
}

function ClinicalGuideSheet({
  guide,
  onClose
}: {
  guide: ClinicalGuide;
  onClose: () => void;
}) {
  return (
    <motion.div
      className="fixed inset-0 z-[86] bg-[#2F2145]/35 backdrop-blur-[2px]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="absolute inset-x-0 bottom-0 mx-auto max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-t-[28px] border-t border-[#DDEBE1] bg-white shadow-2xl"
        initial={{ y: 38, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 32, opacity: 0 }}
        transition={{ duration: 0.18 }}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="sticky top-0 z-10 border-b border-[#E5EEE7] bg-[#F2F8F4]/95 px-4 pb-3 pt-3 backdrop-blur-xl">
          <div className="mx-auto mb-3 h-1 w-10 rounded-full bg-[#AEC8B7]" />
          <div className="flex items-start justify-between gap-3">
            <button
              onClick={onClose}
              className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-[#D7E6DC] bg-white text-[#617468]"
              aria-label="إغلاق"
            >
              <X size={17} weight="bold" />
            </button>
            <div className="flex-1 text-right">
              <p className="text-[10px] font-black text-[#567964]">{guide.categoryAr}</p>
              <h3 className="mt-0.5 text-lg font-black text-[#2F3A33]">{guide.titleAr}</h3>
              <p className="mt-0.5 text-sm font-bold text-[#67756C]" dir="ltr">{guide.titleEn}</p>
            </div>
          </div>
        </div>

        <div className="space-y-3 px-4 pb-7 pt-4">
          <section className="rounded-2xl border border-[#DDEBE1] bg-[#F8FBF9] px-3.5 py-3">
            <p className="text-[10px] font-black text-[#4F765F]">الخلاصة | Summary</p>
            <p className="mt-1.5 text-[12px] leading-6 text-[#465149]">{guide.summary}</p>
          </section>

          {guide.sections.map((section) => (
            <GuideItems key={section.title} title={section.title} items={section.items} />
          ))}

          {guide.correction && (
            <section className="rounded-2xl border border-[#F0E1BA] bg-[#FFF9EC] px-3.5 py-3">
              <p className="text-[10px] font-black text-[#966A22]">تصحيح علمي | Scientific correction</p>
              <p className="mt-2 text-[11px] leading-5 text-[#5F533D]">{guide.correction}</p>
            </section>
          )}

          <div className="border-t border-[#E7EEE8] pt-3 text-center text-[9px] leading-4 text-[#849087]">
            <p>المصدر | Source: {guide.sourceLabel ?? 'مبادئ التخدير'}</p>
            <p className="mt-1">
              صفحات/أقسام المصدر | Source pages/sections: {guide.sourcePages.join('، ')}
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function ClinicalGuidesDirectory() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<'all' | ClinicalGuideCategory>('all');
  const [selected, setSelected] = useState<ClinicalGuide | null>(null);

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return CLINICAL_GUIDES.filter((guide) => {
      const categoryMatch = category === 'all' || guide.category === category;
      const queryMatch =
        !normalized ||
        [
          guide.titleAr,
          guide.titleEn,
          guide.categoryAr,
          guide.summary,
          ...guide.sections.flatMap((section) => [section.title, ...section.items]),
          guide.correction ?? '',
          ...guide.tags
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
          className="absolute right-3 top-1/2 -translate-y-1/2 text-[#567964]"
        />
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="RSI، Spinal، حركية الدواء..."
          className="h-11 w-full rounded-xl border border-[#DDE8E1] bg-white pr-10 pl-3 text-xs font-semibold text-[#344139] outline-none placeholder:text-[#98A59D] focus:border-[#A9C3B2]"
        />
      </div>

      <div className="flex gap-1.5 overflow-x-auto pb-1 [scrollbar-width:none]">
        {CLINICAL_GUIDE_FILTERS.map((item) => {
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
        {filtered.map((guide, index) => (
          <motion.button
            key={guide.id}
            type="button"
            onClick={() => setSelected(guide)}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.12, delay: Math.min(index, 8) * 0.015 }}
            className="w-full rounded-[18px] border border-[#DDEBE1] bg-[#F2F8F4] px-3.5 py-3 text-right active:bg-[#EAF4ED]"
          >
            <div className="flex items-start justify-between gap-3">
              <span className="shrink-0 rounded-full bg-white/80 px-2.5 py-1 text-[9px] font-black text-[#557761]">
                {guide.categoryAr}
              </span>
              <div className="min-w-0 flex-1">
                <h3 className="text-[13px] font-black text-[#2E3A32]">{guide.titleAr}</h3>
                <p className="mt-0.5 truncate text-[10px] font-bold text-[#6C7A70]" dir="ltr">
                  {guide.titleEn}
                </p>
              </div>
            </div>
            <p className="mt-2 line-clamp-2 text-[10px] leading-5 text-[#68766D]">{guide.summary}</p>
            <div className="mt-2 border-t border-[#DDE8E0] pt-2 text-[9px] font-black text-[#557761]">
              افتح المرجع | Open
            </div>
          </motion.button>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="rounded-[18px] border border-dashed border-[#C7D9CC] bg-[#F8FBF9] p-7 text-center text-xs text-[#7B8980]">
          ماكو موضوع مطابق للبحث.
        </div>
      )}

      <AnimatePresence>
        {selected && <ClinicalGuideSheet guide={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </div>
  );
}
