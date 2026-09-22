import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { CaretDown, MagnifyingGlass, Wrench, X } from '@phosphor-icons/react';
import {
  ANESTHESIA_EQUIPMENT,
  EQUIPMENT_FILTERS,
  type AnesthesiaEquipment,
  type EquipmentCategory
} from '../data/equipment';
import { BilingualLabel } from './BilingualLabel';
import { MixedDirectionText } from './MixedDirectionText';
import {
  NotificationStackMenu,
  type StackMenuItem
} from './ui/NotificationStackMenu';

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
      ? 'border-[#DCE5EA] bg-[#F7F9FA]'
      : 'border-[#DCE5EA] bg-[#F7F9FA]';
  const titleClass = tone === 'green' ? 'text-[#405E75]' : 'text-[#405E75]';
  const dot = tone === 'green' ? 'bg-[#5F7E95]' : 'bg-[#5F7E95]';

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
          <span className="rounded-full bg-white/75 px-2 py-0.5 text-[11px] font-black text-[#5F7280]">
            {items.length}
          </span>
          <BilingualLabel label={title} className={'text-[11px] font-black ' + titleClass} />
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
      className="fixed inset-0 z-[85] bg-[#0A2037]/42 backdrop-blur-[2px]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
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
            <button
              type="button"
              onClick={onClose}
              className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-[#D6E1EA] bg-white text-[#526675] outline-none focus-visible:ring-2 focus-visible:ring-[#CCA039]/55"
              aria-label="إغلاق"
            >
              <X size={17} weight="bold" />
            </button>
            <div className="flex-1 text-right">
              <p className="text-[11px] font-black text-[#526F85]">{item.categoryAr}</p>
              <h3 className="mt-0.5 text-lg font-black text-[#183149]">{item.nameAr}</h3>
              <p className="mt-0.5 text-sm font-bold text-[#526675]" dir="ltr">{item.nameEn}</p>
            </div>
          </div>
        </div>

        <div className="space-y-3 px-4 pb-[max(1.75rem,env(safe-area-inset-bottom))] pt-4">
          <section className="rounded-2xl border border-[#DCE5EA] bg-[#F8FAFB] px-3.5 py-3">
            <BilingualLabel label="ما هو؟ | What is it?" className="text-[11px] font-black text-[#405E75]" />
            <p className="mt-1.5 text-[12px] leading-6 text-[#465866]"><MixedDirectionText text={item.summary} /></p>
          </section>

          {item.clinicalNote && (
            <section className="rounded-2xl border border-[#E8DFC9] bg-[#FFF9EE] px-3.5 py-3">
              <BilingualLabel label="ملاحظة سريرية | Clinical note" className="text-[11px] font-black text-[#8A6426]" />
              <p className="mt-1.5 text-[11px] leading-5 text-[#5B5142]"><MixedDirectionText text={item.clinicalNote} /></p>
            </section>
          )}

          <SoftList title="الوظيفة | Purpose" items={item.purpose} tone="blue" />
          <SoftList title="نقاط مهمة | Key points" items={item.keyPoints} tone="blue" />

        </div>
      </motion.div>
    </motion.div>
  );
}

export function EquipmentDirectory({
  initialQuery = ''
}: {
  initialQuery?: string;
}) {
  const [query, setQuery] = useState(initialQuery);
  const [category, setCategory] = useState<'all' | EquipmentCategory>('all');
  const [selected, setSelected] = useState<AnesthesiaEquipment | null>(null);

  useEffect(() => {
    setQuery(initialQuery);

    const normalized = initialQuery.trim().toLowerCase();
    if (normalized) setCategory('all');
    if (!normalized) {
      setSelected(null);
      return;
    }

    const exact = ANESTHESIA_EQUIPMENT.find(
      (item) =>
        item.nameEn.toLowerCase() === normalized ||
        item.nameAr.toLowerCase() === normalized
    );

    if (exact) setSelected(exact);
  }, [initialQuery]);

  const currentCategory =
    EQUIPMENT_FILTERS.find((item) => item.id === category)?.label ?? 'الكل';

  const categoryItems: StackMenuItem[] = EQUIPMENT_FILTERS.map((item) => ({
    id: item.id,
    title: item.label,
    description: item.id === 'all' ? 'كل المعدات والأدوات' : 'تصفية هذا القسم',
    leading: <Wrench size={19} weight="bold" />,
    onSelect: () => setCategory(item.id as 'all' | EquipmentCategory)
  }));

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
          aria-label="البحث في عربة التخدير والمعدات"
          dir="auto"
          placeholder="Laryngoscope، منظار الحنجرة، OPA..."
          className="h-11 w-full rounded-xl border border-[#DCE4EA] bg-white pr-10 pl-3 text-xs font-semibold text-[#183149] outline-none placeholder:text-[#83919C] focus:border-[#B58B2A] focus:ring-2 focus:ring-[#CCA039]/15"
        />
      </div>

      <NotificationStackMenu
        title={currentCategory}
        description="قسم عربة التخدير والمعدات"
        icon={<Wrench size={22} weight="bold" />}
        items={categoryItems}
      />

      <div className="space-y-2">
        {filtered.map((item, index) => (
          <motion.button
            key={item.id}
            type="button"
            onClick={() => setSelected(item)}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.12, delay: Math.min(index, 8) * 0.015 }}
            className="w-full rounded-[18px] border border-[#DCE5EA] bg-[#F7F9FA] px-3.5 py-3 text-right active:bg-[#EEF3F6]"
          >
            <div className="flex items-start justify-between gap-3">
              <span className="shrink-0 rounded-full bg-white/80 px-2.5 py-1 text-[11px] font-black text-[#405E75]">
                {item.categoryAr}
              </span>
              <div className="min-w-0 flex-1">
                <h3 className="text-[13px] font-black text-[#183149]">{item.nameAr}</h3>
                <p className="mt-0.5 truncate text-[11px] font-bold text-[#526675]" dir="ltr">
                  {item.nameEn}
                </p>
              </div>
            </div>
            <p className="mt-2 line-clamp-2 text-[11px] leading-5 text-[#526675]">{item.summary}</p>
            <div className="mt-2 border-t border-[#DDE6EB] pt-2 text-[11px] font-black text-[#405E75]">
              <BilingualLabel label="التفاصيل | Details" />
            </div>
          </motion.button>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="rounded-[18px] border border-dashed border-[#C9D6DF] bg-[#F8FAFB] p-7 text-center text-xs text-[#667A89]">
          ماكو جهاز أو أداة مطابقة للبحث.
        </div>
      )}

      <AnimatePresence>
        {selected && <EquipmentSheet item={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </div>
  );
}