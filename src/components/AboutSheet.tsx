import { useRef } from 'react';
import { X } from 'lucide-react';
import { useModalSheetA11y } from '../hooks/useModalSheetA11y';

interface AboutSheetProps {
  onClose: () => void;
}

export function AboutSheet({ onClose }: AboutSheetProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  useModalSheetA11y(dialogRef, onClose);

  return (
    <div
      className="fixed inset-0 z-[90] flex items-end justify-center bg-[#07182c]/65 px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-8 backdrop-blur-sm sm:items-center"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="about-title"
        tabIndex={-1}
        dir="rtl"
        className="w-full max-w-md rounded-[28px] border border-[#D7E0E7] bg-white p-5 text-[#183149] shadow-[0_24px_70px_rgba(7,24,44,0.35)] outline-none"
      >
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-[11px] font-bold text-[#6B7E8D]">دليلي</p>
            <h2 id="about-title" className="mt-1 text-xl font-black text-[#183149]">
              حول التطبيق
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="إغلاق"
            className="grid h-10 w-10 place-items-center rounded-full border border-[#D8E1E8] bg-[#F7F9FB] text-[#183149]"
          >
            <X size={20} />
          </button>
        </div>

        <div className="mt-5 space-y-4">
          <section className="rounded-2xl border border-[#E0E7EC] bg-[#F8FAFB] p-4">
            <p className="text-sm font-black text-[#183149]">مملكة التخدير</p>
            <p className="mt-1 text-xs font-bold leading-6 text-[#526675]">
              كافة الحقوق محفوظة © مملكة التخدير
            </p>
          </section>

          <section className="rounded-2xl border border-[#E0E7EC] bg-white p-4">
            <p className="text-sm font-black text-[#183149]">التواصل</p>
            <div className="mt-3 grid gap-2 text-sm font-bold">
              <a
                href="https://t.me/ans_un"
                target="_blank"
                rel="noreferrer"
                className="rounded-xl border border-[#E2E8ED] bg-[#F8FAFB] px-3 py-2.5 text-[#183149]"
              >
                Telegram: <span dir="ltr">ans_un</span>
              </a>
              <a
                href="https://www.instagram.com/un_0an/"
                target="_blank"
                rel="noreferrer"
                className="rounded-xl border border-[#E2E8ED] bg-[#F8FAFB] px-3 py-2.5 text-[#183149]"
              >
                Instagram: <span dir="ltr">un_0an</span>
              </a>
            </div>
          </section>

          <section className="rounded-2xl border border-[#E0E7EC] bg-white p-4">
            <p className="text-sm font-black text-[#183149]">المصادر والحقوق</p>
            <a
              href="https://www.flaticon.com/free-animated-icons/medical"
              target="_blank"
              rel="noreferrer"
              className="mt-2 inline-block text-xs font-bold text-[#607487] underline underline-offset-2"
            >
              Animated medical icons · Flaticon
            </a>
          </section>
        </div>
      </div>
    </div>
  );
}
