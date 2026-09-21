import { Bell, Crown, Settings } from 'lucide-react';

export function KingdomHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-[#CCA039]/10 bg-[#0A2036]/88 backdrop-blur-xl">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
        <button
          className="grid h-10 w-10 place-items-center rounded-2xl border border-[#CCA039]/15 bg-white/[0.035] text-[#EEE8D6] transition hover:border-[#CCA039]/35 hover:text-[#CCA039]"
          aria-label="الإعدادات"
        >
          <Settings className="h-5 w-5" />
        </button>

        <div className="flex items-center gap-3">
          <div className="text-right leading-tight">
            <h1 className="text-lg font-black tracking-tight text-[#EEE8D6]">دليلي</h1>
            <p className="mt-0.5 text-[11px] font-bold tracking-[0.12em] text-[#CCA039]">
              مملكة التخدير
            </p>
          </div>
          <div className="grid h-11 w-11 place-items-center rounded-2xl border border-[#CCA039]/30 bg-[#CCA039]/10 text-[#CCA039] shadow-[0_0_30px_rgba(204,160,57,0.08)]">
            <Crown className="h-6 w-6" />
          </div>
        </div>

        <button
          className="relative grid h-10 w-10 place-items-center rounded-2xl border border-[#CCA039]/15 bg-white/[0.035] text-[#EEE8D6] transition hover:border-[#CCA039]/35 hover:text-[#CCA039]"
          aria-label="الإشعارات"
        >
          <Bell className="h-5 w-5" />
          <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-[#CCA039]" />
        </button>
      </div>
    </header>
  );
}
