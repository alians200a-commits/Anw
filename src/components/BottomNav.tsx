import { BookOpenText, Gamepad2, Heart, Home, Pill } from 'lucide-react';

export type AppTab = 'home' | 'drugs' | 'terms' | 'games' | 'favorites';

interface BottomNavProps {
  active: AppTab;
  onChange: (tab: AppTab) => void;
}

const items = [
  { id: 'home' as const, label: 'الرئيسية', icon: Home },
  { id: 'drugs' as const, label: 'الأدوية', icon: Pill },
  { id: 'terms' as const, label: 'المصطلحات', icon: BookOpenText },
  { id: 'games' as const, label: 'الألعاب', icon: Gamepad2 },
  { id: 'favorites' as const, label: 'المحفوظات', icon: Heart }
];

export function BottomNav({ active, onChange }: BottomNavProps) {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 border-t border-[#CCA039]/10 bg-[#081B2E]/95 px-2 pb-[max(0.55rem,env(safe-area-inset-bottom))] pt-2 backdrop-blur-xl">
      <div className="mx-auto grid max-w-lg grid-cols-5 gap-1">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = active === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onChange(item.id)}
              className={
                'group flex min-h-14 flex-col items-center justify-center gap-1 rounded-2xl px-1 text-[10px] font-bold transition ' +
                (isActive
                  ? 'bg-[#CCA039]/12 text-[#CCA039]'
                  : 'text-[#91A0AF] hover:bg-white/[0.035] hover:text-[#EEE8D6]')
              }
            >
              <Icon
                className={'h-5 w-5 transition ' + (isActive ? 'scale-110' : 'group-active:scale-95')}
                strokeWidth={isActive ? 2.5 : 2}
              />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
