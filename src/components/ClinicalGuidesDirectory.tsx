import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { BookOpenText, CaretDown, MagnifyingGlass, X } from '@phosphor-icons/react';
import {
  CLINICAL_GUIDES,
  CLINICAL_GUIDE_FILTERS,
  type ClinicalGuide,
  type ClinicalGuideCategory
} from '../data/clinicalGuides';
import { ANESTHESIA_STAGE_GUIDE_IDS } from '../data/anesthesiaStages';
import { BilingualLabel } from './BilingualLabel';
import { MixedDirectionText } from './MixedDirectionText';
import {
  NotificationStackMenu,
  type StackMenuItem
} from './ui/NotificationStackMenu';

function GuideItems({ title, items }: { title: string; items: string[] }) {
  const body = (
    <div className="space-y-2">
      {items.map((item, index) => (
        <div key={index} className="flex items-start justify-end gap-2">
          <p className="flex-1 text-right text-[11px] leading-5 text-[#526675]"><MixedDirectionText text={item} /></p>
          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#5F7E95]" />
        </div>
      ))}
    </div>
  );

  return (
    <details className="group rounded-2xl border border-[#DCE5EA] bg-[#F7F9FA] px-3.5 py-3">
      <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-3">
        <CaretDown size={15} weight="bold" className="text-[#526F85] transition group-open:rotate-180" />
        <div className="flex items-center gap-2">
          <span className="rounded-full bg-white/80 px-2 py-0.5 text-[9px] font-black text-[#5F7280]">{items.length}</span>
          <BilingualLabel label={title} className="text-[10px] font-black text-[#405E75]" />
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
      className="fixed inset-0 z-[86] bg-[#0A2037]/42 backdrop-blur-[2px]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label={`تفاصيل ${guide.titleAr}`}
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
            <button
              type="button"
              onClick={onClose}
              className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-[#D6E1EA] bg-white text-[#526675] outline-none focus-visible:ring-2 focus-visible:ring-[#CCA039]/55"
              aria-label="إغلاق"
            >
              <X size={17} weight="bold" />
            </button>
            <div className="flex-1 text-right">
              <p className="text-[10px] font-black text-[#526F85]">{guide.categoryAr}</p>
              <h3 className="mt-0.5 text-lg font-black text-[#183149]">{guide.titleAr}</h3>
              <p className="mt-0.5 text-sm font-bold text-[#526675]" dir="ltr">{guide.titleEn}</p>
            </div>
          </div>
        </div>

        <div className="space-y-3 px-4 pb-[max(1.75rem,env(safe-area-inset-bottom))] pt-4">
          <section className="rounded-2xl border border-[#DCE5EA] bg-[#F8FAFB] px-3.5 py-3">
            <BilingualLabel label="الخلاصة | Summary" className="text-[10px] font-black text-[#405E75]" />
            <p className="mt-1.5 text-[12px] leading-6 text-[#465866]"><MixedDirectionText text={guide.summary} /></p>
          </section>

          {guide.clinicalNote && (
            <section className="rounded-2xl border border-[#E8DFC9] bg-[#FFF9EE] px-3.5 py-3">
              <BilingualLabel label="ملاحظة سريرية | Clinical note" className="text-[10px] font-black text-[#8A6426]" />
              <p className="mt-1.5 text-[11px] leading-5 text-[#5B5142]"><MixedDirectionText text={guide.clinicalNote} /></p>
            </section>
          )}

          {guide.sections.map((section) => (
            <GuideItems key={section.title} title={section.title} items={section.items} />
          ))}

        </div>
      </motion.div>
    </motion.div>
  );
}

export function ClinicalGuidesDirectory({
  initialQuery = ''
}: {
  initialQuery?: string;
}) {
  const [query, setQuery] = useState(initialQuery);
  const [category, setCategory] = useState<'all' | ClinicalGuideCategory>('all');
  const [selected, setSelected] = useState<ClinicalGuide | null>(null);

  useEffect(() => {
    setQuery(initialQuery);

    const normalized = initialQuery.trim().toLowerCase();
    if (normalized) setCategory('all');
    if (!normalized) {
      setSelected(null);
      return;
    }

    const exact = CLINICAL_GUIDES.find(
      (guide) =>
        !ANESTHESIA_STAGE_GUIDE_IDS.has(guide.id) &&
        (guide.titleEn.toLowerCase() === normalized ||
          guide.titleAr.toLowerCase() === normalized)
    );

    if (exact) setSelected(exact);
  }, [initialQuery]);

  const currentCategory =
    CLINICAL_GUIDE_FILTERS.find((item) => item.id === category)?.label ?? 'الكل';

  const categoryItems: StackMenuItem[] = CLINICAL_GUIDE_FILTERS.map((item) => ({
    id: item.id,
    title: item.label,
    description: item.id === 'all' ? 'كل المفاهيم والإجراءات' : 'تصفية هذا القسم',
    leading: <BookOpenText size={19} />,
    onSelect: () => setCategory(item.id as 'all' | ClinicalGuideCategory)
  }));

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return CLINICAL_GUIDES.filter((guide) => {
      if (ANESTHESIA_STAGE_GUIDE_IDS.has(guide.id)) return false;

      const categoryMatch = category === 'all' || guide.category === category;
      const queryMatch =
        !normalized ||
        [
          guide.titleAr,
          guide.titleEn,
          guide.categoryAr,
          guide.summary,
          guide.clinicalNote ?? '',
          ...guide.sections.flatMap((section) => [section.title, ...section.items]),
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
          className="absolute right-3 top-1/2 -translate-y-1/2 text-[#526F85]"
        />
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          aria-label="البحث في المفاهيم والإجراءات"
          dir="auto"
          placeholder="RSI، Spinal، حركية الدواء..."
          className="h-11 w-full rounded-xl border border-[#DCE4EA] bg-white pr-10 pl-3 text-xs font-semibold text-[#183149] outline-none placeholder:text-[#83919C] focus:border-[#B58B2A] focus:ring-2 focus:ring-[#CCA039]/15"
        />
      </div>

      <NotificationStackMenu
        title={currentCategory}
        description="تصنيف المفاهيم والإجراءات"
        icon={<BookOpenText size={22} weight="bold" />}
        items={categoryItems}
      />

      <div className="space-y-2">
        {filtered.map((guide, index) => (
          <motion.button
            key={guide.id}
            type="button"
            onClick={() => setSelected(guide)}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.12, delay: Math.min(index, 8) * 0.015 }}
            className="w-full rounded-[18px] border border-[#DCE5EA] bg-[#F7F9FA] px-3.5 py-3 text-right active:bg-[#EEF3F6]"
          >
            <div className="flex items-start justify-between gap-3">
              <span className="shrink-0 rounded-full bg-white/80 px-2.5 py-1 text-[9px] font-black text-[#405E75]">
                {guide.categoryAr}
              </span>
              <div className="min-w-0 flex-1">
                <h3 className="text-[13px] font-black text-[#183149]">{guide.titleAr}</h3>
                <p className="mt-0.5 truncate text-[10px] font-bold text-[#526675]" dir="ltr">
                  {guide.titleEn}
                </p>
              </div>
            </div>
            <p className="mt-2 line-clamp-2 text-[10px] leading-5 text-[#526675]">{guide.summary}</p>
            <div className="mt-2 border-t border-[#DDE6EB] pt-2 text-[9px] font-black text-[#405E75]">
              <BilingualLabel label="افتح التفاصيل | Open details" />
            </div>
          </motion.button>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="rounded-[18px] border border-dashed border-[#C9D6DF] bg-[#F8FAFB] p-7 text-center text-xs text-[#667A89]">
          ماكو موضوع مطابق للبحث.
        </div>
      )}

      <AnimatePresence>
        {selected && <ClinicalGuideSheet guide={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </div>
  );
}