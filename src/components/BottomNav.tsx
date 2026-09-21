import {
  BookOpenText,
  BookmarkSimple,
  GameController,
  House
} from '@phosphor-icons/react';

export type AppTab = 'home' | 'guide' | 'games' | 'favorites';

interface BottomNavProps {
  active: AppTab;
  onChange: (tab: AppTab) => void;
}

const items = [
  { id: 'home' as const, label: 'الرئيسية', icon: House },
  { id: 'guide' as const, label: 'الدليل', icon: BookOpenText },
  { id: 'games' as const, label: 'الألعاب', icon: GameController },
  { id: 'favorites' as const, label: 'المحفوظات', icon: BookmarkSimple }
];

export function BottomNav({ active, onChange }: BottomNavProps) {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 border-t border-[#0A2037] bg-[#0A2037] px-3 pb-[max(0.45rem,env(safe-area-inset-bottom))] pt-1.5 backdrop-blur-xl">
      <div className="mx-auto grid max-w-md grid-cols-4 gap-1">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = active === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onChange(item.id)}
              className={
                'flex min-h-[54px] flex-col items-center justify-center gap-0.5 rounded-xl px-1 transition ' +
                (isActive
                  ? 'bg-[#CCA039]/12 text-[#CCA039]'
                   : 'text-[#A9B7C4] active:bg-white/8 active:text-white')
              }
            >
              <Icon size={22} weight={isActive ? 'fill' : 'regular'} />
              <span className="text-[9px] font-bold">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
