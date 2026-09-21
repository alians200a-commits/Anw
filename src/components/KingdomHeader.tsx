export function KingdomHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-[#173A63] bg-[#0A2036]/98 backdrop-blur-xl">
      <div className="mx-auto flex min-h-[104px] max-w-3xl items-center justify-center px-4 py-3">
        <div className="flex items-center gap-4">
          <img
            src="/brand/kingdom-emblem.webp"
            alt="شعار مملكة التخدير"
            className="h-[78px] w-[78px] shrink-0 object-contain"
            draggable={false}
          />

          <div className="text-right leading-tight">
            <h1 className="text-[22px] font-black tracking-tight text-white">
              دليلي
            </h1>
            <p className="mt-1 text-[12px] font-extrabold text-[#CCA039]">
              مملكة التخدير
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
