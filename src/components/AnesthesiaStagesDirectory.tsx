import { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { CaretDown, X } from '@phosphor-icons/react';
import {
  ANESTHESIA_STAGES,
  getStageGuides
} from '../data/anesthesiaStages';
import type { ClinicalGuide } from '../data/clinicalGuides';
import { BilingualLabel } from './BilingualLabel';
import { MixedDirectionText } from './MixedDirectionText';
import { useModalSheetA11y } from '../hooks/useModalSheetA11y';
import { MedicalSiteIcon } from './ui/MedicalSiteIcon';

function StageSection({
  title,
  items
}: {
  title: string;
  items: string[];
}) {
  if (items.length === 1) {
    return (
      <section className="rounded-[18px] border border-[#DCE5EA] bg-white px-3.5 py-3.5">
        <BilingualLabel
          label={title}
          className="text-[11px] font-black text-[#405E75]"
        />
        <p className="mt-2.5 text-[11.5px] leading-[1.8] text-[#526675]">
          <MixedDirectionText text={items[0]} />
        </p>
      </section>
    );
  }

  return (
    <details className="group rounded-[18px] border border-[#DCE5EA] bg-white px-3.5 py-3">
      <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-3">
        <CaretDown
          size={15}
          weight="bold"
          className="shrink-0 text-[#526F85] transition group-open:rotate-180"
        />
        <div className="flex items-center gap-2">
          <span className="rounded-full bg-[#EEF3F6] px-2 py-0.5 text-[10px] font-black text-[#405E75]">
            {items.length}
          </span>
          <BilingualLabel
            label={title}
            className="text-[11px] font-black text-[#405E75]"
          />
        </div>
      </summary>

      <div className="space-y-2.5 border-t border-[#E2E9EE] pb-1 pt-3">
        {items.map((item, index) => (
          <div key={index} className="flex items-start justify-end gap-2.5">
            <p className="flex-1 text-right text-[11.5px] leading-[1.8] text-[#526675]">
              <MixedDirectionText text={item} />
            </p>
            <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#5F7E95]" />
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
  const totalItems = guide.sections.reduce((sum, section) => sum + section.items.length, 0);

  return (
    <motion.div
      className="fixed inset-0 z-[88] bg-[#0A2037]/48"
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
        className="absolute inset-x-0 bottom-0 mx-auto max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-t-[30px] border-t border-[#D6E1E8] bg-[#F5F7F9] shadow-[0_-18px_55px_rgba(7,23,37,0.22)]"
        initial={{ y: 28, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 24, opacity: 0 }}
        transition={{ duration: 0.14 }}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="sticky top-0 z-10 border-b border-[#DDE5EA] bg-white px-4 pb-3.5 pt-3">
          <div className="mx-auto mb-3 h-1 w-11 rounded-full bg-[#B7C5CE]" />
          <div className="flex items-start justify-between gap-3">
            <button
              type="button"
              onClick={onClose}
              aria-label="إغلاق"
              className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-[#D6E1EA] bg-[#F7F9FA] text-[#526675] outline-none active:bg-[#EEF3F6] focus-visible:ring-2 focus-visible:ring-[#CCA039]/55"
            >
              <X size={18} weight="bold" />
            </button>

            <div className="flex min-w-0 flex-1 items-start justify-end gap-3">
              <div className="min-w-0 flex-1 text-right">
                <span className="inline-flex rounded-full border border-[#DCE5EA] bg-[#EEF3F6] px-2.5 py-1 text-[10px] font-black text-[#405E75]">
                  {guide.categoryAr}
                </span>
                <h3 className="mt-2 text-[21px] font-black leading-7 text-[#183149]">
                  {guide.titleAr}
                </h3>
                <p className="mt-0.5 truncate text-[13px] font-bold text-[#526675]" dir="ltr">
                  {guide.titleEn}
                </p>
              </div>
              <span className="grid h-[72px] w-[72px] shrink-0 place-items-center rounded-[20px] border border-[#D7E2E9] bg-[linear-gradient(145deg,#F8FBFC,#EEF4F7)] text-[#315672]">
                <MedicalSiteIcon name="stages" size={36} />
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-3 px-4 pb-[max(1.75rem,env(safe-area-inset-bottom))] pt-4">
          <section className="overflow-hidden rounded-[22px] border border-[#DCE5EA] bg-white">
            <div className="grid grid-cols-2 border-b border-[#E3EAF0] bg-[#F8FAFB] text-center">
              <div className="px-2 py-2.5">
                <div className="text-[15px] font-black text-[#183149]">{guide.sections.length}</div>
                <div className="mt-0.5 text-[9px] font-bold text-[#71808B]">محاور</div>
              </div>
              <div className="border-r border-[#E3EAF0] px-2 py-2.5">
                <div className="text-[15px] font-black text-[#183149]">{totalItems}</div>
                <div className="mt-0.5 text-[9px] font-bold text-[#71808B]">نقاط تعليمية</div>
              </div>
            </div>
            <div className="px-3.5 py-3.5">
              <BilingualLabel
                label="الخلاصة | Summary"
                className="text-[11px] font-black text-[#405E75]"
              />
              <p className="mt-2 text-[12px] leading-6 text-[#465866]">
                <MixedDirectionText text={guide.summary} />
              </p>
            </div>
          </section>

          {guide.clinicalNote && (
            <section className="rounded-[18px] border border-[#E8DFC9] bg-[#FFF9EE] px-3.5 py-3.5">
              <div className="flex items-center justify-end gap-2">
                <BilingualLabel
                  label="ملاحظة سريرية | Clinical note"
                  className="text-[11px] font-black text-[#8A6426]"
                />
                <span className="h-2 w-2 rounded-full bg-[#D9A441]" />
              </div>
              <p className="mt-2 text-[11.5px] leading-[1.8] text-[#5B5142]">
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

  if (!currentEntry) return null;

  return (
    <div className="space-y-3">
      <section className="rounded-[22px] border border-[#DCE5EA] bg-[#F8FAFB] p-3 shadow-[0_8px_22px_rgba(16,45,79,0.045)]">
        <div className="overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <div className="flex min-w-max gap-2">
            {stageEntries.map(({ stage, guides }) => {
              const active = stage.id === selectedStageId;
              return (
                <button
                  key={stage.id}
                  type="button"
                  onClick={() => {
                    setSelectedStageId(stage.id);
                    setSelectedGuide(null);
                  }}
                  className={
                    'min-w-[138px] rounded-[16px] border px-3 py-3 text-right outline-none focus-visible:ring-2 focus-visible:ring-[#CCA039]/45 ' +
                    (active
                      ? 'border-[#173A63] bg-[#173A63] text-white shadow-[0_6px_14px_rgba(23,58,99,0.16)]'
                      : 'border-[#DCE5EA] bg-white text-[#183149] active:bg-[#EEF3F6]')
                  }
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className={'grid h-8 w-8 place-items-center rounded-[10px] text-[11px] font-black ' + (active ? 'bg-white/12 text-[#E7C46F]' : 'bg-[#EEF3F6] text-[#526675]')}>
                      {stage.number}
                    </span>
                    <MedicalSiteIcon name="stages" size={21} />
                  </div>
                  <div className="mt-2 text-[11px] font-black">{stage.titleAr}</div>
                  <div className={'mt-1 text-[9px] font-bold ' + (active ? 'text-[#C5D3DE]' : 'text-[#7A8995]')} dir="ltr">{stage.titleEn}</div>
                  <div className={'mt-2 text-[9px] font-bold ' + (active ? 'text-[#E7C46F]' : 'text-[#66737F]')}>{guides.length} موضوع</div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-3 flex items-center justify-between rounded-[14px] border border-[#DCE5EA] bg-white px-3 py-2.5">
          <span className="rounded-full bg-[#EEF3F6] px-2.5 py-1 text-[10px] font-black text-[#405E75]">{currentEntry.guides.length} موضوع</span>
          <div className="min-w-0 flex-1 pr-3 text-right">
            <div className="text-[11px] font-black text-[#183149]">{currentEntry.stage.titleAr}</div>
            <div className="mt-0.5 truncate text-[9px] font-bold text-[#7A8995]" dir="ltr">{currentEntry.stage.titleEn}</div>
          </div>
        </div>
      </section>

      <div className="space-y-2.5">
        {currentEntry.guides.map((guide) => (
          <motion.button
            key={guide.id}
            type="button"
            onClick={() => setSelectedGuide(guide)}
            className="flex min-h-[72px] w-full items-center gap-3 rounded-[20px] border border-[#DCE5EA] bg-white px-3.5 py-3 text-right shadow-[0_5px_16px_rgba(16,45,79,0.045)] outline-none active:bg-[#F8FAFB] focus-visible:ring-2 focus-visible:ring-[#CCA039]/50"
          >
            <div className="grid h-11 w-11 shrink-0 place-items-center rounded-[14px] border border-[#D7E2E9] bg-[#F4F7F9] text-[#315672]">
              <MedicalSiteIcon name="stages" size={27} />
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
