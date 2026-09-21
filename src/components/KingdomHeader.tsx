export function KingdomHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-[#0A2037] bg-[#0A2037] backdrop-blur-xl">
      <div className="mx-auto flex min-h-[104px] max-w-3xl items-center justify-center px-4 py-3">
        <div className="flex items-center gap-4">
          <img
            src="/brand/kingdom-emblem.webp"
            alt="شعار مملكة التخدير"
            className="h-[78px] w-[78px] shrink-0 object-contain"
            draggable={false}
          />

          <div className="flex flex-col items-end gap-[8px] text-right">
            <h1
              dir="rtl"
              lang="ar"
              className="font-vexa-brand whitespace-nowrap text-[30px] leading-[1.05] text-white"
            >
              دلـيـلـي
            </h1>
            <p
              dir="rtl"
              lang="ar"
              className="font-vexa-brand whitespace-nowrap text-[18px] leading-[1.05] text-[#CCA039]"
            >
              ممـلـكـة الـتـخـديـر
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
