import { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { BookOpenText, CaretDown, X } from '@phosphor-icons/react';
import {
  ANESTHESIA_STAGES,
  getStageGuides
} from '../data/anesthesiaStages';
import type { ClinicalGuide } from '../data/clinicalGuides';
import { BilingualLabel } from './BilingualLabel';
import { MixedDirectionText } from './MixedDirectionText';
import { useModalSheetA11y } from '../hooks/useModalSheetA11y';
import {
  NotificationStackMenu,
  type StackMenuItem
} from './ui/NotificationStackMenu';

function StageSection({
  title,
  items
}: {
  title: string;
  items: string[];
}) {
  if (items.length === 1) {
    return (
      <section className="rounded-2xl border border-[#DCE5EA] bg-[#F7F9FA] px-3.5 py-3">
        <BilingualLabel
          label={title}
          className="text-[11px] font-black text-[#405E75]"
        />
        <p className="mt-2 text-[11px] leading-5 text-[#526675]">
          <MixedDirectionText text={items[0]} />
        </p>
      </section>
    );
  }

  return (
    <details className="group rounded-2xl border border-[#DCE5EA] bg-[#F7F9FA] px-3.5 py-2">
      <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-3">
        <CaretDown
          size={15}
          weight="bold"
          className="shrink-0 text-[#526F85] transition group-open:rotate-180"
        />
        <div className="flex items-center gap-2">
          <span className="rounded-full bg-[#EAF0F4] px-2 py-1 text-[11px] font-black text-[#405E75]">
            {items.length}
          </span>
          <BilingualLabel
            label={title}
            className="text-[11px] font-black text-[#405E75]"
          />
        </div>
      </summary>

      <div className="space-y-2 border-t border-[#E2E9EE] pb-1 pt-3">
        {items.map((item, index) => (
          <div key={index} className="flex items-start justify-end gap-2">
            <p className="flex-1 text-right text-[11px] leading-5 text-[#526675]">
              <MixedDirectionText text={item} />
            </p>
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#5F7E95]" />
          </div>
        ))}
      </div>
    </details>
  );
}

function StageGuideSheet({
  guide,
  onClose
}: {
  guide: ClinicalGuide;
  onClose: () => void;
}) {


  const dialogRef = useRef<HTMLDivElement>(null);
  useModalSheetA11y(dialogRef, onClose);

  return (
    <motion.div
      className="fixed inset-0 z-[88] bg-[#0A2037]/42 backdrop-blur-[2px]"
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
        aria-label={`تفاصيل ${guide.titleAr}`}
        className="absolute inset-x-0 bottom-0 mx-auto max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-t-[28px] border-t border-[#DCE5EA] bg-white shadow-2xl"
        initial={{ y: 38, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 32, opacity: 0 }}
        transition={{ duration: 0.18 }}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="sticky top-0 z-10 border-b border-[#E3EAF0] bg-[#F5F8FA]/95 px-4 pb-3 pt-3 backdrop-blur-xl">
          <div className="mx-auto mb-3 h-1 w-10 rounded-full bg-[#AFC0CC]" />
          <div className="flex items-start justify-between gap-3">
            <button
              type="button"
              onClick={onClose}
              aria-label="إغلاق"
              className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-[#D6E1EA] bg-white text-[#526675] outline-none focus-visible:ring-2 focus-visible:ring-[#CCA039]/55"
            >
              <X size={18} weight="bold" />
            </button>

            <div className="min-w-0 flex-1 text-right">
              <p className="text-[11px] font-black text-[#526F85]">
                {guide.categoryAr}
              </p>
              <h3 className="mt-0.5 text-lg font-black text-[#183149]">
                {guide.titleAr}
              </h3>
              <p
                className="mt-0.5 text-sm font-bold text-[#526675]"
                dir="ltr"
              >
                {guide.titleEn}
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-3 px-4 pb-[max(1.75rem,env(safe-area-inset-bottom))] pt-4">
          <section className="rounded-2xl border border-[#DCE5EA] bg-[#F7F9FA] px-3.5 py-3">
            <BilingualLabel
              label="الخلاصة | Summary"
              className="text-[11px] font-black text-[#405E75]"
            />
            <p className="mt-1.5 text-[12px] leading-6 text-[#465866]">
              <MixedDirectionText text={guide.summary} />
            </p>
          </section>

          {guide.clinicalNote && (
            <section className="rounded-2xl border border-[#E8DFC9] bg-[#FFF9EE] px-3.5 py-3">
              <BilingualLabel
                label="ملاحظة سريرية | Clinical note"
                className="text-[11px] font-black text-[#8A6426]"
              />
              <p className="mt-1.5 text-[11px] leading-5 text-[#5B5142]">
                <MixedDirectionText text={guide.clinicalNote} />
              </p>
            </section>
          )}

          {guide.sections.map((section) => (
            <StageSection
              key={section.title}
              title={section.title}
              items={section.items}
            />
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

export function AnesthesiaStagesDirectory({
  initialQuery = ''
}: {
  initialQuery?: string;
}) {
  const stageEntries = useMemo(
    () =>
      ANESTHESIA_STAGES.map((stage) => ({
        stage,
        guides: getStageGuides(stage)
      })),
    []
  );

  const [selectedStageId, setSelectedStageId] = useState(
    stageEntries[0]?.stage.id ?? ''
  );
  const [selectedGuide, setSelectedGuide] = useState<ClinicalGuide | null>(null);

  useEffect(() => {
    const normalized = initialQuery.trim().toLowerCase();
    if (!normalized) return;

    for (const entry of stageEntries) {
      const match = entry.guides.find((guide) =>
        [
          guide.titleAr,
          guide.titleEn,
          guide.categoryAr,
          guide.summary,
          guide.clinicalNote ?? '',
          ...guide.sections.flatMap((section) => [
            section.title,
            ...section.items
          ]),
          ...guide.tags
        ].some((value) => value.toLowerCase().includes(normalized))
      );

      if (match) {
        setSelectedStageId(entry.stage.id);
        setSelectedGuide(match);
        return;
      }
    }
  }, [initialQuery, stageEntries]);

  const currentEntry =
    stageEntries.find((entry) => entry.stage.id === selectedStageId) ??
    stageEntries[0];

  const stageItems: StackMenuItem[] = stageEntries.map(({ stage, guides }) => ({
    id: stage.id,
    title: stage.titleAr,
    description: stage.titleEn,
    trailing: stage.number,
    leading: <BookOpenText size={19} />,
    onSelect: () => {
      setSelectedStageId(stage.id);
      setSelectedGuide(null);
    }
  }));

  if (!currentEntry) return null;

  return (
    <div className="space-y-3">
      <section className="px-1 text-right">
        <h2 className="text-base font-black text-[#183149]">مراحل التخدير</h2>
        <p className="mt-1 text-[11px] font-semibold text-[#5F7280]" dir="ltr">
          Stages of Anesthesia
        </p>
      </section>

      <NotificationStackMenu
        title={currentEntry.stage.titleAr}
        description={currentEntry.stage.titleEn}
        icon={
          <span className="text-[11px] font-black text-[#315672]">
            {currentEntry.stage.number}
          </span>
        }
        items={stageItems}
        selectedId={selectedStageId}
      />

      <div className="px-1 text-left">
        <span className="rounded-full border border-[#DCE5EA] bg-[#EEF3F6] px-2.5 py-1 text-[11px] font-black text-[#405E75]">
          {currentEntry.guides.length} موضوع
        </span>
      </div>

      <div className="space-y-2">
        {currentEntry.guides.map((guide, index) => (
          <motion.button
            key={guide.id}
            type="button"
            onClick={() => setSelectedGuide(guide)}
            className="flex min-h-[68px] w-full items-center gap-3 rounded-[18px] border border-[#DCE5EA] bg-[#F7F9FA] px-3.5 py-3 text-right outline-none transition active:bg-[#EEF3F6] focus-visible:ring-2 focus-visible:ring-[#CCA039]/50"
          >
            <div className="grid h-11 w-11 shrink-0 place-items-center rounded-[14px] border border-[#D7E2E9] bg-[#EEF3F6] text-[#315672]">
              <BookOpenText size={21} />
            </div>

            <div className="min-w-0 flex-1">
              <h3 className="text-[13px] font-black text-[#183149]">
                {guide.titleAr}
              </h3>
              <p
                className="mt-0.5 truncate text-[11px] font-bold text-[#526675]"
                dir="ltr"
              >
                {guide.titleEn}
              </p>
              <p className="mt-1 line-clamp-1 text-[11px] leading-4 text-[#71808B]">
                <MixedDirectionText text={guide.summary} />
              </p>
            </div>
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {selectedGuide && (
          <StageGuideSheet
            guide={selectedGuide}
            onClose={() => setSelectedGuide(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}