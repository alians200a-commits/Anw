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

  const transition = reduceMotion
    ? { duration: 0 }
    : { type: 'spring' as const, stiffness: 260, damping: 26, mass: 0.75 };

  return (
    <div
      ref={rootRef}
      className={'relative pt-3 ' + className}
      onPointerEnter={(event) => {
        if (event.pointerType === 'mouse') setOpen(true);
      }}
      onPointerLeave={(event) => {
        if (event.pointerType !== 'mouse') return;
        const active = document.activeElement;
        if (active instanceof Node && rootRef.current?.contains(active)) return;
        setOpen(false);
      }}
      onFocusCapture={() => {
        setOpen(true);
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
          rootRef.current?.querySelector<HTMLButtonElement>('[data-stack-trigger]')?.focus();
        }
      }}
    >
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-5 top-0 h-[68px] rounded-[18px] border border-[#DFE7EC] bg-[#EDF2F5]"
        animate={
          expanded
            ? { y: 8, scale: 0.985, opacity: 0 }
            : { y: 7, scale: 0.965, opacity: 1 }
        }
        transition={transition}
      />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-9 top-0 h-[68px] rounded-[18px] border border-[#E5EBEF] bg-[#F3F6F8]"
        animate={
          expanded
            ? { y: 12, scale: 0.98, opacity: 0 }
            : { y: 14, scale: 0.93, opacity: 1 }
        }
        transition={transition}
      />

      <motion.div
        layout
        className="relative z-10 overflow-hidden rounded-[20px] border border-[#DCE4EA] bg-white shadow-[0_6px_22px_rgba(10,32,55,0.06)]"
        transition={transition}
      >
        <button
          data-stack-trigger
          type="button"
          aria-expanded={expanded}
          onClick={() => setOpen(!expanded)}
          className="flex min-h-[68px] w-full items-center gap-3 px-3.5 py-3 text-right outline-none transition active:bg-[#F4F7F9] focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#CCA039]/60"
        >
          {icon ? (
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-[14px] border border-[#DDE6EB] bg-[#F1F5F7] text-[#315672]">
              {icon}
            </span>
          ) : null}

          <span className="min-w-0 flex-1">
            <span className="block text-[13px] font-black text-[#183149]">{title}</span>
            {description ? (
              <span className="mt-1 block text-[10px] font-semibold leading-5 text-[#667784]">
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
        </button>

        <AnimatePresence initial={false}>
          {expanded ? (
            <motion.div
              key="stack-items"
              initial={reduceMotion ? false : { height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={reduceMotion ? undefined : { height: 0, opacity: 0 }}
              transition={transition}
              className="overflow-hidden border-t border-[#E8EDF1] bg-[#FAFBFC]"
            >
              <div className="space-y-1.5 p-2">
                {items.map((item, index) => (
                  <motion.button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      item.onSelect?.();
                      setOpen(false);
                    }}
                    initial={reduceMotion ? false : { opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: reduceMotion ? 0 : 0.2,
                      delay: reduceMotion ? 0 : Math.min(index * 0.025, 0.12)
                    }}
                    className="flex min-h-[52px] w-full items-center gap-3 rounded-[14px] border border-[#E1E8ED] bg-white px-3 py-2.5 text-right outline-none transition hover:border-[#CAD7E0] hover:bg-[#F7F9FA] active:scale-[0.995] active:bg-[#EEF3F6] focus-visible:ring-2 focus-visible:ring-[#CCA039]/55"
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
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}