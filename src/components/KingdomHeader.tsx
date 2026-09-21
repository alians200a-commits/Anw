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

          <div className="text-right leading-tight">
            <h1 className="font-vexa-brand text-[30px] leading-none text-white">
              دلـيـلـي
            </h1>
            <p className="font-vexa-brand mt-[10px] text-[18px] leading-none text-[#CCA039]">
              ممـلـكـة الـتـخـديـر
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
