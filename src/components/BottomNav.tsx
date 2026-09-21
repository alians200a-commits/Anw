import {
  BookOpenText,
  BookmarkSimple,
  GameController,
  House,
  Pill
} from '@phosphor-icons/react';

export type AppTab = 'home' | 'drugs' | 'terms' | 'games' | 'favorites';

interface BottomNavProps {
  active: AppTab;
  onChange: (tab: AppTab) => void;
}

const items = [
  { id: 'home' as const, label: 'الرئيسية', icon: House },
  { id: 'drugs' as const, label: 'الأدوية', icon: Pill },
  { id: 'terms' as const, label: 'المصطلحات', icon: BookOpenText },
  { id: 'games' as const, label: 'الألعاب', icon: GameController },
  { id: 'favorites' as const, label: 'المحفوظات', icon: BookmarkSimple }
];

export function BottomNav({ active, onChange }: BottomNavProps) {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 border-t border-[#CCA039]/10 bg-[#081B2E]/97 px-2 pb-[max(0.45rem,env(safe-area-inset-bottom))] pt-1.5 backdrop-blur-xl">
      <div className="mx-auto grid max-w-lg grid-cols-5 gap-0.5">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = active === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onChange(item.id)}
              className={
                'flex min-h-[54px] min-w-0 flex-col items-center justify-center gap-0.5 rounded-xl px-0.5 transition ' +
                (isActive
                  ? 'bg-[#CCA039]/10 text-[#CCA039]'
                  : 'text-[#8295A6] active:bg-white/[0.035] active:text-[#EEE8D6]')
              }
            >
              <Icon
                size={22}
                weight={isActive ? 'fill' : 'regular'}
                className="shrink-0"
              />
              <span className="w-full truncate text-[9px] font-bold">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
