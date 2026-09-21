export function KingdomHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-[#CCA039]/10 bg-[#0A2036]/96 backdrop-blur-xl">
      <div className="mx-auto flex max-w-3xl items-center justify-center px-4 py-3.5">
        <div className="flex items-center gap-3.5">
          <div className="text-right leading-tight">
            <h1 className="text-xl font-black tracking-tight text-[#EEE8D6]">دليلي</h1>
            <p className="mt-1 text-xs font-extrabold text-[#CCA039]">مملكة التخدير</p>
          </div>
          <div className="flex h-[72px] w-[72px] items-center justify-center overflow-hidden rounded-2xl bg-[#0A2036]">
            <img
              src="/kingdom-mark.jpg"
              alt="شعار مملكة التخدير"
              className="h-[68px] w-[68px] object-contain"
            />
          </div>
        </div>
      </div>
    </header>
  );
}
