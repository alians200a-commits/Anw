import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode
} from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { MagnifyingGlass, X } from '@phosphor-icons/react';

export interface MorphingSearchItem {
  id: string;
  title: string;
  titleAr?: string;
  titleEn?: string;
  description?: string;
  keywords?: string[];
  leading?: ReactNode;
  onSelect?: () => void;
}

interface MorphingSearchProps {
  items: MorphingSearchItem[];
  placeholder?: string;
  emptyMessage?: string;
  onQueryChange?: (query: string) => void;
  shortcut?: string;
}

function isEditableTarget(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) return false;
  return (
    target.isContentEditable ||
    target instanceof HTMLInputElement ||
    target instanceof HTMLTextAreaElement ||
    target instanceof HTMLSelectElement
  );
}

export function MorphingSearch({
  items,
  placeholder = 'ابحث في دليلي',
  emptyMessage = 'ماكو نتيجة مطابقة.',
  onQueryChange,
  shortcut = '/'
}: MorphingSearchProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const previousFocus = useRef<HTMLElement | null>(null);
  const reduceMotion = useReducedMotion();

  const filteredItems = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return [];

    return items
      .map((item) => {
        const title = item.title.toLowerCase();
        const titleAr = (item.titleAr ?? '').toLowerCase();
        const titleEn = (item.titleEn ?? '').toLowerCase();
        const description = (item.description ?? '').toLowerCase();
        const keywords = (item.keywords ?? []).map((value) => value.toLowerCase());
        const searchable = [title, titleAr, titleEn, description, ...keywords];

        let score = 0;
        if (
          title === needle ||
          titleAr === needle ||
          titleEn === needle ||
          keywords.includes(needle)
        ) {
          score = 3;
        } else if (
          title.startsWith(needle) ||
          titleAr.startsWith(needle) ||
          titleEn.startsWith(needle) ||
          keywords.some((value) => value.startsWith(needle))
        ) {
          score = 2;
        } else if (searchable.some((value) => value.includes(needle))) {
          score = 1;
        }

        return { item, score };
      })
      .filter((entry) => entry.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 14)
      .map((entry) => entry.item);
  }, [items, query]);

  const updateQuery = useCallback(
    (value: string) => {
      setQuery(value);
      setActiveIndex(0);
      onQueryChange?.(value);
    },
    [onQueryChange]
  );

  const openSearch = useCallback(() => {
    previousFocus.current =
      document.activeElement instanceof HTMLElement ? document.activeElement : null;
    setOpen(true);
  }, []);

  const closeSearch = useCallback(() => {
    setOpen(false);
    updateQuery('');
  }, [updateQuery]);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const frame = requestAnimationFrame(() => inputRef.current?.focus());

    return () => {
      cancelAnimationFrame(frame);
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  useEffect(() => {
    if (open) return;
    const frame = requestAnimationFrame(() => {
      if (previousFocus.current?.isConnected) previousFocus.current.focus();
      else triggerRef.current?.focus();
    });
    return () => cancelAnimationFrame(frame);
  }, [open]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && open) {
        event.preventDefault();
        closeSearch();
        return;
      }

      if (
        !open &&
        shortcut &&
        event.key === shortcut &&
        !event.metaKey &&
        !event.ctrlKey &&
        !event.altKey &&
        !event.shiftKey &&
        !isEditableTarget(event.target)
      ) {
        event.preventDefault();
        openSearch();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [closeSearch, open, openSearch, shortcut]);

  const selectItem = (item: MorphingSearchItem) => {
    item.onSelect?.();
    closeSearch();
  };

  const overlay = open ? (
    <motion.div
      className="fixed inset-0 z-[90] flex items-start justify-center bg-[#0A2037]/48 px-3 pt-[max(1rem,env(safe-area-inset-top))] backdrop-blur-[3px] sm:px-5 sm:pt-10"
      initial={reduceMotion ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={reduceMotion ? undefined : { opacity: 0 }}
      transition={{ duration: reduceMotion ? 0 : 0.18 }}
      onPointerDown={(event) => {
        if (event.target === event.currentTarget) closeSearch();
      }}
    >
      <motion.div
        ref={dialogRef}
        layoutId="daleeli-morph-search"
        role="dialog"
        aria-modal="true"
        aria-label="البحث في دليلي"
        onKeyDown={(event) => {
          if (event.key !== 'Tab') return;

          const focusable = Array.from(
            dialogRef.current?.querySelectorAll<HTMLElement>(
              'input, button, [href], [tabindex]:not([tabindex="-1"])'
            ) ?? []
          ).filter((element) => !element.hasAttribute('disabled'));

          if (!focusable.length) return;
          const first = focusable[0];
          const last = focusable[focusable.length - 1];

          if (event.shiftKey && document.activeElement === first) {
            event.preventDefault();
            last.focus();
          } else if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault();
            first.focus();
          }
        }}
        className="w-full max-w-2xl overflow-hidden rounded-[22px] border border-[#DCE4EA] bg-white shadow-[0_24px_70px_rgba(3,20,34,0.28)]"
        transition={
          reduceMotion
            ? { duration: 0 }
            : { type: 'spring', stiffness: 260, damping: 28, mass: 0.7 }
        }
      >
        <div className="flex min-h-14 items-center gap-2 border-b border-[#E7EDF1] px-3">
          <MagnifyingGlass size={21} weight="bold" className="shrink-0 text-[#B58B2A]" />
          <input
            ref={inputRef}
            value={query}
            dir="auto"
            aria-label="ابحث في دليلي"
            onChange={(event) => updateQuery(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'ArrowDown') {
                event.preventDefault();
                setActiveIndex((current) =>
                  Math.min(current + 1, Math.max(0, filteredItems.length - 1))
                );
              } else if (event.key === 'ArrowUp') {
                event.preventDefault();
                setActiveIndex((current) => Math.max(current - 1, 0));
              } else if (event.key === 'Enter' && filteredItems[activeIndex]) {
                event.preventDefault();
                selectItem(filteredItems[activeIndex]);
              }
            }}
            placeholder="Propofol، بروبوفول، MAC..."
            className="h-12 min-w-0 flex-1 bg-transparent text-sm font-bold text-[#183149] outline-none placeholder:font-medium placeholder:text-[#66737F]"
          />
          <button
            type="button"
            onClick={closeSearch}
            aria-label="إغلاق البحث"
            className="grid h-11 w-11 shrink-0 place-items-center rounded-xl text-[#526675] outline-none transition active:bg-[#EEF3F6] focus-visible:ring-2 focus-visible:ring-[#CCA039]/55"
          >
            <X size={20} weight="bold" />
          </button>
        </div>

        <div
          role="listbox"
          aria-label="نتائج البحث"
          className="max-h-[min(68vh,34rem)] overflow-y-auto p-2"
        >
          {!query.trim() ? (
            <div className="px-4 py-9 text-center">
              <p className="text-xs font-black text-[#405E75]">ابدأ بالكتابة للبحث</p>
              <p className="mt-1.5 text-[11px] font-semibold text-[#66737F]">
                دواء، جهاز، سائل، مصطلح أو إجراء
              </p>
            </div>
          ) : filteredItems.length ? (
            filteredItems.map((item, index) => (
              <button
                key={item.id}
                type="button"
                role="option"
                aria-selected={index === activeIndex}
                onMouseEnter={() => setActiveIndex(index)}
                onFocus={() => setActiveIndex(index)}
                onClick={() => selectItem(item)}
                className={
                  'flex min-h-[64px] w-full items-center gap-3 rounded-[14px] px-3 py-2.5 text-right outline-none transition focus-visible:ring-2 focus-visible:ring-[#CCA039]/55 ' +
                  (index === activeIndex
                    ? 'bg-[#EEF3F6]'
                    : 'bg-white hover:bg-[#F7F9FA] active:bg-[#EEF3F6]')
                }
              >
                {item.leading ? (
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-[#DCE5EA] bg-[#F5F8FA] text-[#315672]">
                    {item.leading}
                  </span>
                ) : null}
                <span className="min-w-0 flex-1">
                  <span
                    dir={item.titleAr ? 'rtl' : 'auto'}
                    className="block truncate text-[13px] font-black text-[#183149]"
                  >
                    {item.titleAr ?? item.title}
                  </span>
                  {item.titleEn ? (
                    <span
                      dir="ltr"
                      className="mt-0.5 block truncate text-[11px] font-bold text-[#526675]"
                    >
                      {item.titleEn}
                    </span>
                  ) : null}
                  {item.description ? (
                    <span
                      dir="auto"
                      className="mt-0.5 block truncate text-[11px] font-medium text-[#5F7280]"
                    >
                      {item.description}
                    </span>
                  ) : null}
                </span>
              </button>
            ))
          ) : (
            <div className="px-4 py-10 text-center text-xs font-semibold text-[#66737F]">
              {emptyMessage}
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  ) : null;

  return (
    <>
      {!open ? (
        <motion.button
          ref={triggerRef}
          layoutId="daleeli-morph-search"
          type="button"
          onClick={openSearch}
          className="flex min-h-12 w-full items-center gap-3 rounded-[16px] border border-[#DCE4EA] bg-white px-3.5 text-right shadow-[0_3px_14px_rgba(10,32,55,0.05)] outline-none transition focus-visible:ring-2 focus-visible:ring-[#CCA039]/60 focus-visible:ring-offset-2"
          transition={
            reduceMotion
              ? { duration: 0 }
              : { type: 'spring', stiffness: 260, damping: 28, mass: 0.7 }
          }
        >
          <MagnifyingGlass size={20} weight="bold" className="shrink-0 text-[#B58B2A]" />
          <span className="min-w-0 flex-1">
            <span className="block text-xs font-black text-[#183149]">{placeholder}</span>
            <span className="mt-0.5 block truncate text-[11px] font-semibold text-[#66737F]">
              دواء، جهاز، مصطلح، إجراء...
            </span>
          </span>
        </motion.button>
      ) : null}

      {typeof document !== 'undefined'
        ? createPortal(
            <AnimatePresence initial={false}>{overlay}</AnimatePresence>,
            document.body
          )
        : null}
    </>
  );
}