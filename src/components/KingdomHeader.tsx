import { KingdomMark } from './KingdomMark';

export function KingdomHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-[#CCA039]/10 bg-[#0A2036]/94 backdrop-blur-xl">
      <div className="mx-auto flex max-w-5xl items-center justify-center px-4 py-2.5">
        <div className="flex items-center gap-2.5">
          <div className="text-right leading-tight">
            <h1 className="text-base font-black tracking-tight text-[#EEE8D6]">دليلي</h1>
            <p className="mt-0.5 text-[10px] font-extrabold text-[#CCA039]">مملكة التخدير</p>
          </div>
          <div className="grid h-10 w-10 place-items-center text-[#CCA039]">
            <KingdomMark className="h-10 w-9" />
          </div>
        </div>
      </div>
    </header>
  );
}
