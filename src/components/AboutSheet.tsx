import { useRef } from 'react';
import { BadgeInfo, X } from 'lucide-react';
import { useModalSheetA11y } from '../hooks/useModalSheetA11y';

interface AboutSheetProps {
  onClose: () => void;
}

export function AboutSheet({ onClose }: AboutSheetProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  useModalSheetA11y(dialogRef, onClose);

  return (
    <div
      className="fixed inset-0 z-[90] flex items-end justify-center bg-[#07182c]/68 px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-8 sm:items-center"
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
        className="w-full max-w-md rounded-[28px] border border-[#D7E0E7] bg-white p-5 text-[#183149] shadow-[0_18px_48px_rgba(7,24,44,0.28)] outline-none"
      >
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl border border-[#E5D3A1] bg-[linear-gradient(145deg,#FFFDF7_0%,#F7F0DE_100%)] text-[#A87916] shadow-[0_5px_14px_rgba(24,49,73,0.07)]">
              <BadgeInfo size={22} strokeWidth={2.15} />
            </div>
            <div>
              <p className="text-[11px] font-bold text-[#6B7E8D]">دليلي</p>
              <h2 id="about-title" className="mt-1 text-xl font-black text-[#183149]">
                حول التطبيق
              </h2>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="إغلاق"
            className="grid h-10 w-10 touch-manipulation place-items-center rounded-full border border-[#D8E1E8] bg-[#F7F9FB] text-[#183149] active:bg-[#EEF3F6]"
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

          <details className="rounded-xl border border-[#E0E7EC] bg-white px-3 py-2 text-[11px] text-[#526675]">
            <summary className="cursor-pointer font-bold text-[#315672]">حقوق الأيقونات المتحركة وذكر المصدر</summary>
            <p className="mt-2 leading-5">الأيقونات المجانية من Flaticon، وجميع حقوقها لمصمميها؛ الروابط التالية للائتمان طبقًا لشروط الاستخدام.</p>
            <div className="mt-2 grid grid-cols-2 gap-2">
              <a href="https://www.flaticon.com/free-animated-icon/medical-care_19003377" target="_blank" rel="noopener noreferrer" className="rounded-lg bg-[#F8FAFB] px-2 py-1.5 underline decoration-[#C3CCD3] underline-offset-2">عن الاختصاص</a>
              <a href="https://www.flaticon.com/free-animated-icon/study_19018113" target="_blank" rel="noopener noreferrer" className="rounded-lg bg-[#F8FAFB] px-2 py-1.5 underline decoration-[#C3CCD3] underline-offset-2">الدراسة بالعراق</a>
              <a href="https://www.flaticon.com/free-animated-icon/brigade_16767237" target="_blank" rel="noopener noreferrer" className="rounded-lg bg-[#F8FAFB] px-2 py-1.5 underline decoration-[#C3CCD3] underline-offset-2">كوادر التخدير</a>
              <a href="https://www.flaticon.com/free-animated-icon/medical-assistant_14705080" target="_blank" rel="noopener noreferrer" className="rounded-lg bg-[#F8FAFB] px-2 py-1.5 underline decoration-[#C3CCD3] underline-offset-2">التحضير للتخدير</a>
              <a href="https://www.flaticon.com/free-animated-icon/student_17490060" target="_blank" rel="noopener noreferrer" className="rounded-lg bg-[#F8FAFB] px-2 py-1.5 underline decoration-[#C3CCD3] underline-offset-2">بعد التخرج</a>
              <a href="https://www.flaticon.com/free-animated-icon/medical-kit_14122763" target="_blank" rel="noopener noreferrer" className="rounded-lg bg-[#F8FAFB] px-2 py-1.5 underline decoration-[#C3CCD3] underline-offset-2">الأدوات الطبية</a>
              <a href="https://www.flaticon.com/free-animated-icon/first-aid_11706662" target="_blank" rel="noopener noreferrer" className="rounded-lg bg-[#F8FAFB] px-2 py-1.5 underline decoration-[#C3CCD3] underline-offset-2">المهارات السريرية</a>
              <a href="https://www.flaticon.com/free-animated-icon/anesthesia_19009171" target="_blank" rel="noopener noreferrer" className="rounded-lg bg-[#F8FAFB] px-2 py-1.5 underline decoration-[#C3CCD3] underline-offset-2">أيقونة التخدير</a>
            </div>
          </details>
        </div>
      </div>
    </div>
  );
}
