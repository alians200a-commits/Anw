import { CaretDown } from '@phosphor-icons/react';
import { ANESTHESIA_STAGES, getStageGuides } from '../data/anesthesiaStages';

export function AnesthesiaStagesDirectory() {
  return (
    <div className="space-y-3">
      <section className="rounded-[20px] border border-[#E5DCEF] bg-[#FAF8FC] px-4 py-4 text-right">
        <h2 className="text-base font-black text-[#34293F]">مراحل التخدير</h2>
        <p className="mt-1 text-[11px] font-bold text-[#776B82]" dir="ltr">
          Stages of Anesthesia
        </p>
      </section>

      <div className="space-y-2.5">
        {ANESTHESIA_STAGES.map((stage) => {
          const guides = getStageGuides(stage);

          return (
            <details
              key={stage.id}
              className="group overflow-hidden rounded-[18px] border border-[#E5DCEF] bg-white"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-3.5 py-3.5">
                <CaretDown
                  size={17}
                  weight="bold"
                  className="shrink-0 text-[#806D94] transition group-open:rotate-180"
                />

                <div className="flex min-w-0 flex-1 items-center justify-end gap-3">
                  <div className="min-w-0 flex-1 text-right">
                    <h3 className="text-[13px] font-black text-[#34293F]">{stage.titleAr}</h3>
                    <p className="mt-1 text-[10px] font-bold text-[#756A7E]" dir="ltr">
                      {stage.titleEn}
                    </p>
                  </div>

                  <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-[#D9C9E8] bg-[#F3ECF8] text-[10px] font-black text-[#6C4AA5]">
                    {stage.number}
                  </div>
                </div>
              </summary>

              <div className="space-y-2 border-t border-[#EEE7F4] bg-[#FCFAFD] p-2.5">
                {guides.map((guide) => (
                  <details
                    key={guide.id}
                    className="group/topic overflow-hidden rounded-xl border border-[#E7DEEF] bg-white"
                  >
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-3 py-2.5">
                      <CaretDown
                        size={14}
                        weight="bold"
                        className="shrink-0 text-[#8B7D97] transition group-open/topic:rotate-180"
                      />

                      <div className="min-w-0 flex-1 text-right">
                        <p className="text-[11px] font-black text-[#463653]">{guide.titleAr}</p>
                        <p className="mt-0.5 text-[9px] font-bold text-[#81758A]" dir="ltr">
                          {guide.titleEn}
                        </p>
                      </div>
                    </summary>

                    <div className="space-y-2 border-t border-[#EEE7F4] px-3 pb-3 pt-2.5">
                      <p className="text-[10px] leading-5 text-[#62596A]">{guide.summary}</p>

                      {guide.sections.map((section) => (
                        <details
                          key={section.title}
                          className="group/section rounded-lg border border-[#EEE7F4] bg-[#FAF8FC]"
                        >
                          <summary className="flex cursor-pointer list-none items-center justify-between gap-2 px-2.5 py-2">
                            <CaretDown
                              size={12}
                              weight="bold"
                              className="shrink-0 text-[#9789A2] transition group-open/section:rotate-180"
                            />
                            <span className="text-[9px] font-black text-[#5A4B66]">
                              {section.title}
                            </span>
                          </summary>

                          <div className="space-y-1.5 border-t border-[#EEE7F4] px-2.5 py-2">
                            {section.items.map((item, index) => (
                              <div key={index} className="flex items-start justify-end gap-2">
                                <p className="flex-1 text-right text-[10px] leading-5 text-[#665D6D]">
                                  {item}
                                </p>
                                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#A58DB8]" />
                              </div>
                            ))}
                          </div>
                        </details>
                      ))}
                    </div>
                  </details>
                ))}
              </div>
            </details>
          );
        })}
      </div>
    </div>
  );
}
