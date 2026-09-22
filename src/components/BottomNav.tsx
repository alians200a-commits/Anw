import { Dock, DockIcon } from './ui/MagicDock';
import { MedicalSiteIcon, type MedicalSiteIconName } from './ui/MedicalSiteIcon';

export type AppTab = 'home' | 'guide' | 'games' | 'favorites';

interface BottomNavProps {
  active: AppTab;
  onChange: (tab: AppTab) => void;
}

const items: Array<{
  id: AppTab;
  label: string;
  siteIcon: MedicalSiteIconName;
}> = [
  { id: 'home', label: 'الرئيسية', siteIcon: 'home' },
  { id: 'guide', label: 'الدليل', siteIcon: 'guide' },
  { id: 'games', label: 'تعلّم', siteIcon: 'learn' },
  { id: 'favorites', label: 'المحفوظات', siteIcon: 'saved' }
];

export function BottomNav({ active, onChange }: BottomNavProps) {
  return (
    <nav
      aria-label="التنقل الرئيسي"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-[#0A2037] bg-[#0A2037] px-3 pb-[max(0.55rem,env(safe-area-inset-bottom))] pt-2"
    >
      <Dock
        iconSize={52}
        iconMagnification={60}
        iconDistance={92}
        className="mx-auto flex h-[62px] max-w-md items-center justify-around gap-1 rounded-[22px] border border-white/70 bg-white/95 px-1.5 shadow-[0_10px_30px_rgba(0,0,0,0.22)] backdrop-blur-xl"
      >
        {items.map((item) => {
          const isActive = active === item.id;

          return (
            <DockIcon key={item.id} className="rounded-2xl">
              <button
                type="button"
                onClick={() => onChange(item.id)}
                aria-current={isActive ? 'page' : undefined}
                aria-label={item.label}
                className="flex h-full w-full min-w-[48px] flex-col items-center justify-center gap-1 rounded-2xl px-1 text-[#183149] outline-none transition focus-visible:ring-2 focus-visible:ring-[#CCA039]/70"
              >
                <span
                  className={
                    'grid h-9 w-9 place-items-center rounded-xl transition ' +
                    (isActive
                      ? 'bg-[#CCA039]/18 shadow-[0_4px_12px_rgba(204,160,57,0.18)]'
                      : 'bg-[#EEF3F6]')
                  }
                >
                  <MedicalSiteIcon
                    name={item.siteIcon}
                    play={isActive}
                    size={27}
                  />
                </span>
                <span className="text-[11px] font-black leading-none text-[#183149]">
                  {item.label}
                </span>
              </button>
            </DockIcon>
          );
        })}
      </Dock>

      <a
        href="https://www.flaticon.com/free-animated-icons/medical"
        target="_blank"
        rel="noreferrer"
        className="mx-auto mt-1 block w-fit text-[9px] font-semibold leading-none text-white/55 underline-offset-2 hover:text-white/80 hover:underline"
      >
        Animated medical icons · Flaticon
      </a>
    </nav>
  );
}
