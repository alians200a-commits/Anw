export function KingdomHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-[#0A2037] bg-[#0A2037]">
      <div className="mx-auto grid min-h-[104px] max-w-3xl grid-cols-[72px_1fr_72px] items-center px-4 py-3">
        <div aria-hidden="true" />

        <div className="flex flex-col items-center justify-center gap-[8px] text-center">
          <h1
            dir="rtl"
            lang="ar"
            className="font-mohawla-brand whitespace-nowrap text-[27px] leading-none text-white"
          >
            دليلي
          </h1>
          <p
            dir="rtl"
            lang="ar"
            className="font-mohawla-brand whitespace-nowrap text-[22px] leading-none text-[#CCA039]"
          >
            مملكة التخدير
          </p>
        </div>

        <div className="flex justify-end">
          <img
            src="/brand/kingdom-emblem.webp"
            alt="شعار مملكة التخدير"
            className="h-[70px] w-[70px] shrink-0 object-contain"
            draggable={false}
          />
        </div>
      </div>
    </header>
  );
}
