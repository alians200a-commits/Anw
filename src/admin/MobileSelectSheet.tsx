import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Check, ChevronDown, X } from 'lucide-react';

type SheetOption = {
  value: string;
  label: string;
  disabled: boolean;
};

type SheetState = {
  select: HTMLSelectElement;
  title: string;
  value: string;
  options: SheetOption[];
};

function fieldTitle(select: HTMLSelectElement) {
  const aria = select.getAttribute('aria-label');
  if (aria) return aria;
  const block = select.closest('.block, div');
  const heading = block?.querySelector('[data-field-heading]');
  const text = heading?.textContent?.replace('?', '').replace('*', '').trim();
  return text || 'اختر من القائمة';
}

export default function MobileSelectSheet() {
  const [sheet, setSheet] = useState<SheetState | null>(null);

  useEffect(() => {
    const onPointerDown = (event: PointerEvent) => {
      if (!window.matchMedia('(max-width: 767px)').matches) return;
      const target = event.target;
      if (!(target instanceof HTMLSelectElement)) return;
      if (!target.closest('.admin-drug-editor-host, .admin-mobile-select-scope')) return;
      if (target.disabled) return;

      event.preventDefault();
      event.stopPropagation();

      const options = Array.from(target.options).map((option) => ({
        value: option.value,
        label: option.textContent?.trim() || option.value,
        disabled: option.disabled,
      }));

      setSheet({
        select: target,
        title: fieldTitle(target),
        value: target.value,
        options,
      });
    };

    document.addEventListener('pointerdown', onPointerDown, true);
    return () => document.removeEventListener('pointerdown', onPointerDown, true);
  }, []);

  useEffect(() => {
    if (!sheet) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  }, [sheet]);

  if (!sheet) return null;

  const choose = (value: string) => {
    const select = sheet.select;
    const descriptor = Object.getOwnPropertyDescriptor(HTMLSelectElement.prototype, 'value');
    descriptor?.set?.call(select, value);
    select.dispatchEvent(new Event('change', { bubbles: true }));
    setSheet(null);
    requestAnimationFrame(() => select.focus({ preventScroll: true }));
  };

  return createPortal(
    <div
      className="fixed inset-0 z-[200] flex items-end bg-[#07182c]/55 backdrop-blur-[2px]"
      dir="rtl"
      role="presentation"
      onClick={() => setSheet(null)}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-label={sheet.title}
        className="w-full max-h-[78dvh] overflow-hidden rounded-t-[28px] bg-white shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <header className="sticky top-0 z-10 flex items-center justify-between gap-3 border-b border-slate-100 bg-white px-4 py-4">
          <button
            type="button"
            onClick={() => setSheet(null)}
            className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-[#eef3f8] text-[#173a63]"
            aria-label="إغلاق القائمة"
          >
            <X size={20} />
          </button>
          <div className="min-w-0 text-right">
            <div className="text-[11px] font-bold text-[#2f69a8]">اختيار</div>
            <h2 className="truncate text-base font-black text-[#0a2037]">{sheet.title}</h2>
          </div>
        </header>

        <div className="max-h-[calc(78dvh-76px)] overflow-y-auto overscroll-contain p-3 pb-[max(16px,env(safe-area-inset-bottom))]">
          <div className="space-y-2">
            {sheet.options.map((option) => {
              const active = option.value === sheet.value;
              return (
                <button
                  key={option.value}
                  type="button"
                  disabled={option.disabled}
                  onClick={() => choose(option.value)}
                  className={`flex min-h-14 w-full items-center justify-between gap-3 rounded-2xl border px-4 py-3 text-right transition disabled:opacity-40 ${
                    active
                      ? 'border-[#2f69a8] bg-[#eef3f8] text-[#173a63]'
                      : 'border-[#e1e8ee] bg-white text-[#24313f] active:bg-slate-50'
                  }`}
                >
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-white ring-1 ring-slate-200">
                    {active ? <Check size={17} strokeWidth={3} /> : <ChevronDown size={15} className="opacity-30" />}
                  </span>
                  <span className="min-w-0 flex-1 break-words text-sm font-bold leading-6">{option.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>
    </div>,
    document.body,
  );
}
