import {
  BookOpenText,
  BookmarkSimple,
  GameController,
  House
} from '@phosphor-icons/react';
import { Dock, DockIcon } from './ui/MagicDock';

export type AppTab = 'home' | 'guide' | 'games' | 'favorites';

interface BottomNavProps {
  active: AppTab;
  onChange: (tab: AppTab) => void;
}

const items = [
  { id: 'home' as const, label: 'الرئيسية', icon: House },
  { id: 'guide' as const, label: 'الدليل', icon: BookOpenText },
  { id: 'games' as const, label: 'تعلّم', icon: GameController },
  { id: 'favorites' as const, label: 'المحفوظات', icon: BookmarkSimple }
];

export function BottomNav({ active, onChange }: BottomNavProps) {
  return (
    <nav
      aria-label="التنقل الرئيسي"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-[#0A2037] bg-[#0A2037] px-3 pb-[max(0.45rem,env(safe-area-inset-bottom))] pt-1.5"
    >
      <Dock
        iconSize={52}
        iconMagnification={60}
        iconDistance={92}
        className="mx-auto flex h-[58px] max-w-md items-center justify-around gap-1"
      >
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = active === item.id;

          return (
            <DockIcon key={item.id} className="rounded-2xl">
              <button
                type="button"
                onClick={() => onChange(item.id)}
                aria-current={isActive ? 'page' : undefined}
                aria-label={item.label}
                className={
                  'flex h-full w-full min-w-[48px] flex-col items-center justify-center gap-0.5 rounded-2xl px-1 outline-none transition focus-visible:ring-2 focus-visible:ring-[#CCA039]/70 ' +
                  (isActive
                    ? 'bg-[#CCA039]/12 text-[#CCA039]'
                    : 'text-[#A9B7C4] active:bg-white/8 active:text-white')
                }
              >
                <Icon size={22} weight={isActive ? 'fill' : 'regular'} />
                <span className="text-[9px] font-bold leading-none">{item.label}</span>
              </button>
            </DockIcon>
          );
        })}
      </Dock>
    </nav>
  );
}
