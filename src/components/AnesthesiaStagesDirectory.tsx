const ANESTHESIA_STAGES = [
  {
    number: '01',
    titleAr: 'مرحلة ما قبل التخدير',
    titleEn: 'Premedication'
  },
  {
    number: '02',
    titleAr: 'البدء في التخدير',
    titleEn: 'Induction'
  },
  {
    number: '03',
    titleAr: 'إدامة التخدير',
    titleEn: 'Maintenance'
  },
  {
    number: '04',
    titleAr: 'الإفاقة',
    titleEn: 'Emergence / Recovery'
  }
] as const;

export function AnesthesiaStagesDirectory() {
  return (
    <div className="space-y-3">
      <section className="rounded-[20px] border border-[#E5DCEF] bg-[#FAF8FC] px-4 py-4 text-right">
        <h2 className="text-base font-black text-[#34293F]">مراحل التخدير</h2>
        <p className="mt-1 text-[11px] font-bold text-[#776B82]" dir="ltr">
          Stages of Anesthesia
        </p>
      </section>

      <div className="relative space-y-2.5">
        <div className="absolute bottom-5 right-[22px] top-5 w-px bg-[#E5DCEF]" aria-hidden="true" />

        {ANESTHESIA_STAGES.map((stage) => (
          <div
            key={stage.number}
            className="relative flex items-center gap-3 rounded-[18px] border border-[#E5DCEF] bg-white px-3.5 py-3.5"
          >
            <div className="relative z-10 grid h-11 w-11 shrink-0 place-items-center rounded-full border border-[#D9C9E8] bg-[#F3ECF8] text-[11px] font-black text-[#6C4AA5]">
              {stage.number}
            </div>

            <div className="min-w-0 flex-1 text-right">
              <h3 className="text-[13px] font-black text-[#34293F]">{stage.titleAr}</h3>
              <p className="mt-1 text-[11px] font-bold text-[#756A7E]" dir="ltr">
                {stage.titleEn}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
