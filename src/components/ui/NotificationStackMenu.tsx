import { useEffect, useId, useRef, useState, type ReactNode } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { CaretDown, Check } from '@phosphor-icons/react';
import { AnimatedIcon } from './AnimatedIcon';

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
  selectedId?: string;
  defaultExpanded?: boolean;
  onExpandedChange?: (expanded: boolean) => void;
  className?: string;
}

export function NotificationStackMenu({
  title,
  description,
  icon,
  items,
  selectedId,
  defaultExpanded = false,
  onExpandedChange,
  className = ''
}: NotificationStackMenuProps) {
  const [expanded, setExpanded] = useState(defaultExpanded);
  const rootRef = useRef<HTMLDivElement>(null);
  const listId = useId();
  const reduceMotion = useReducedMotion();

  const setOpen = (next: boolean) => {
    setExpanded(next);
    onExpandedChange?.(next);
  };

  useEffect(() => {
    if (!expanded) return;

    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target;
      if (target instanceof Node && rootRef.current?.contains(target)) return;
      setOpen(false);
    };

    document.addEventListener('pointerdown', handlePointerDown, true);
    return () => document.removeEventListener('pointerdown', handlePointerDown, true);
  }, [expanded]);

  return (
    <div
      ref={rootRef}
      className={'relative ' + className}
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
            ?.querySelector<HTMLButtonElement>('[data-dropdown-trigger]')
            ?.focus();
        }
      }}
    >
      <button
        data-dropdown-trigger
        type="button"
        aria-expanded={expanded}
        aria-haspopup="menu"
        aria-controls={listId}
        onClick={() => setOpen(!expanded)}
        className={
          'group flex min-h-[58px] w-full items-center gap-3 rounded-[16px] border bg-white px-3.5 py-2.5 text-right outline-none transition ' +
          (expanded
            ? 'border-[#B8C7D2] shadow-[0_8px_24px_rgba(10,32,55,0.08)]'
            : 'border-[#DCE4EA] shadow-[0_2px_10px_rgba(10,32,55,0.035)] hover:border-[#C8D4DD]') +
          ' focus-visible:ring-2 focus-visible:ring-[#CCA039]/55'
        }
      >
        {icon ? (
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-[12px] bg-[#EEF3F6] text-[#315672]">
            <AnimatedIcon active={expanded} ambient={expanded} variant="lift">
              {icon}
            </AnimatedIcon>
          </span>
        ) : null}

        <span className="min-w-0 flex-1">
          <span className="block text-[13px] font-black text-[#183149]">
            {title}
          </span>
          {description ? (
            <span
              dir="auto"
              className="mt-0.5 block truncate text-[11px] font-semibold text-[#66737F]"
            >
              {description}
            </span>
          ) : null}
        </span>

        <motion.span
          aria-hidden="true"
          animate={{ rotate: expanded ? 180 : 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.16 }}
          className="grid h-9 w-9 shrink-0 place-items-center rounded-lg text-[#526675]"
        >
          <CaretDown size={18} weight="bold" />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {expanded ? (
          <motion.div
            id={listId}
            role="menu"
            initial={reduceMotion ? false : { opacity: 0, y: -6, scale: 0.99 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: -4, scale: 0.995 }}
            transition={
              reduceMotion
                ? { duration: 0 }
                : { type: 'spring', stiffness: 420, damping: 34, mass: 0.62 }
            }
            className="relative z-30 mt-1.5 overflow-hidden rounded-[16px] border border-[#D7E2E9] bg-white p-1.5 shadow-[0_18px_42px_rgba(10,32,55,0.12)]"
          >
            {items.map((item, index) => {
              const selected = selectedId === item.id;

              return (
                <button
                  key={item.id}
                  type="button"
                  role="menuitem"
                  onClick={() => {
                    item.onSelect?.();
                    setOpen(false);
                  }}
                  className={
                    'group flex min-h-[52px] w-full items-center gap-3 rounded-[11px] px-2.5 py-2 text-right outline-none transition ' +
                    (selected
                      ? 'bg-[#F3F6F8]'
                      : 'bg-white hover:bg-[#F7F9FA] active:bg-[#EEF3F6]') +
                    ' focus-visible:bg-[#F3F6F8] focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#CCA039]/55'
                  }
                >
                  {item.leading ? (
                    <span
                      className={
                        'grid h-9 w-9 shrink-0 place-items-center rounded-[10px] transition ' +
                        (selected
                          ? 'bg-white text-[#315672]'
                          : 'bg-[#F3F6F8] text-[#526F85] group-hover:bg-white')
                      }
                    >
                      <AnimatedIcon active={selected} variant="pop">
                        {item.leading}
                      </AnimatedIcon>
                    </span>
                  ) : null}

                  <span className="min-w-0 flex-1">
                    <span className="block text-[12px] font-black text-[#20394F]">
                      {item.title}
                    </span>
                    {item.description ? (
                      <span
                        dir="auto"
                        className="mt-0.5 block truncate text-[11px] font-semibold text-[#66737F]"
                      >
                        {item.description}
                      </span>
                    ) : null}
                  </span>

                  {item.trailing ? (
                    <span className="shrink-0 text-[11px] font-black text-[#526675]">
                      {item.trailing}
                    </span>
                  ) : selected ? (
                    <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[#CCA039]/15 text-[#8A6426]">
                      <Check size={15} weight="bold" />
                    </span>
                  ) : null}
                </button>
              );
            })}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}