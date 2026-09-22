import { useRef, useState, type ReactNode } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { CaretDown } from '@phosphor-icons/react';

export interface StackMenuItem {
  id: string;
  title: ReactNode;
  description?: ReactNode;
  leading?: ReactNode;
  trailing?: ReactNode;
  onSelect?: () => void;
}

interface NotificationStackMenuProps {
  title: ReactNode;
  description?: ReactNode;
  icon?: ReactNode;
  items: StackMenuItem[];
  defaultExpanded?: boolean;
  onExpandedChange?: (expanded: boolean) => void;
  className?: string;
}

export function NotificationStackMenu({
  title,
  description,
  icon,
  items,
  defaultExpanded = false,
  onExpandedChange,
  className = ''
}: NotificationStackMenuProps) {
  const [expanded, setExpanded] = useState(defaultExpanded);
  const rootRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  const setOpen = (next: boolean) => {
    setExpanded(next);
    onExpandedChange?.(next);
  };

  const spring = reduceMotion
    ? { duration: 0 }
    : { type: 'spring' as const, stiffness: 330, damping: 30, mass: 0.72 };

  return (
    <div
      ref={rootRef}
      className={'relative ' + className}
      onPointerEnter={(event) => {
        if (event.pointerType === 'mouse') setOpen(true);
      }}
      onPointerLeave={(event) => {
        if (event.pointerType !== 'mouse') return;
        const active = document.activeElement;
        if (active instanceof Node && rootRef.current?.contains(active)) return;
        setOpen(false);
      }}
      onBlurCapture={(event) => {
        const next = event.relatedTarget;
        if (next instanceof Node && rootRef.current?.contains(next)) return;
        setOpen(false);
      }}
      onKeyDown={(event) => {
        if (event.key === 'Escape') {
          event.preventDefault();
          setOpen(false);
          rootRef.current
            ?.querySelector<HTMLButtonElement>('[data-stack-trigger]')
            ?.focus();
        }
      }}
    >
      <div className="relative pt-[14px]">
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-8 top-[2px] h-[60px] rounded-[18px] border border-[#E2E9EE] bg-[#F3F6F8]"
          animate={
            expanded
              ? { y: 6, scale: 0.98, opacity: 0 }
              : { y: 0, scale: 0.94, opacity: 0.95 }
          }
          transition={spring}
        />
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-4 top-[8px] h-[62px] rounded-[18px] border border-[#DEE6EB] bg-[#EDF2F5]"
          animate={
            expanded
              ? { y: 4, scale: 0.99, opacity: 0 }
              : { y: 0, scale: 0.97, opacity: 1 }
          }
          transition={spring}
        />

        <motion.button
          data-stack-trigger
          type="button"
          aria-expanded={expanded}
          onClick={() => setOpen(!expanded)}
          onFocus={() => setOpen(true)}
          className="relative z-20 flex min-h-[66px] w-full items-center gap-3 rounded-[20px] border border-[#DCE4EA] bg-white px-3.5 py-3 text-right shadow-[0_8px_24px_rgba(10,32,55,0.07)] outline-none focus-visible:ring-2 focus-visible:ring-[#CCA039]/60"
          animate={{ y: expanded ? 0 : 0 }}
          transition={spring}
        >
          {icon ? (
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-[14px] border border-[#DDE6EB] bg-[#F1F5F7] text-[#315672]">
              {icon}
            </span>
          ) : null}

          <span className="min-w-0 flex-1">
            <span className="block text-[13px] font-black text-[#183149]">
              {title}
            </span>
            {description ? (
              <span className="mt-0.5 block text-[10px] font-semibold leading-5 text-[#667784]">
                {description}
              </span>
            ) : null}
          </span>

          <motion.span
            aria-hidden="true"
            animate={{ rotate: expanded ? 180 : 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.18 }}
            className="grid h-11 w-11 shrink-0 place-items-center rounded-xl text-[#536A7A]"
          >
            <CaretDown size={19} weight="bold" />
          </motion.span>
        </motion.button>
      </div>

      <AnimatePresence initial={false}>
        {expanded ? (
          <motion.div
            key="stack-list"
            initial={reduceMotion ? false : { opacity: 0, y: -18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: -12 }}
            transition={spring}
            className="relative z-10 mt-2 space-y-2"
          >
            {items.map((item, index) => (
              <motion.button
                key={item.id}
                type="button"
                onClick={() => {
                  item.onSelect?.();
                  setOpen(false);
                }}
                initial={reduceMotion ? false : { opacity: 0, y: -16, scale: 0.985 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={reduceMotion ? undefined : { opacity: 0, y: -10, scale: 0.99 }}
                transition={{
                  ...(reduceMotion
                    ? { duration: 0 }
                    : {
                        type: 'spring' as const,
                        stiffness: 340,
                        damping: 29,
                        mass: 0.68
                      }),
                  delay: reduceMotion ? 0 : Math.min(index * 0.025, 0.1)
                }}
                className="flex min-h-[54px] w-full items-center gap-3 rounded-[16px] border border-[#DCE5EA] bg-white px-3 py-2.5 text-right shadow-[0_5px_18px_rgba(10,32,55,0.045)] outline-none transition active:bg-[#EEF3F6] focus-visible:ring-2 focus-visible:ring-[#CCA039]/55"
              >
                {item.leading ? (
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#EEF3F6] text-[#315672]">
                    {item.leading}
                  </span>
                ) : null}

                <span className="min-w-0 flex-1">
                  <span className="block text-[12px] font-black text-[#20394F]">
                    {item.title}
                  </span>
                  {item.description ? (
                    <span className="mt-0.5 block text-[9px] font-semibold leading-4 text-[#6D7E8A]">
                      {item.description}
                    </span>
                  ) : null}
                </span>

                {item.trailing ? (
                  <span className="shrink-0 rounded-full bg-[#EEF3F6] px-2 py-1 text-[8px] font-black text-[#536A7A]">
                    {item.trailing}
                  </span>
                ) : null}
              </motion.button>
            ))}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
