import { useEffect, useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';

/** Presents the approved, locally bundled educational page inside Dalili. */
export function EducationScreen({ onBack }: { onBack: () => void }) {
  const frameRef = useRef<HTMLIFrameElement>(null);
  const [frameHeight, setFrameHeight] = useState(720);

  useEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;
    let observer: ResizeObserver | null = null;

    const measure = () => {
      const shell = frame.contentDocument?.querySelector('.shell') as HTMLElement | null;
      if (!shell) return;
      // The bundled page has a 22px top margin and 32px bottom margin.
      const next = Math.max(500, Math.ceil(shell.scrollHeight + 58));
      setFrameHeight((previous) => Math.abs(previous - next) > 3 ? next : previous);
    };
    const onLoad = () => {
      observer?.disconnect();
      measure();
      const shell = frame.contentDocument?.querySelector('.shell');
      if (shell && typeof ResizeObserver !== 'undefined') {
        observer = new ResizeObserver(measure);
        observer.observe(shell);
      }
    };
    const onNavigation = (event: MessageEvent) => {
      if (event.origin !== window.location.origin || event.source !== frame.contentWindow) return;
      if (event.data?.type === 'dalili-education-scroll-top') {
        window.scrollTo({ top: 0, behavior: 'auto' });
      }
    };
    frame.addEventListener('load', onLoad);
    window.addEventListener('message', onNavigation);
    if (frame.contentDocument?.readyState === 'complete') onLoad();
    return () => {
      observer?.disconnect();
      frame.removeEventListener('load', onLoad);
      window.removeEventListener('message', onNavigation);
    };
  }, []);

  return (
    <section aria-label="عالم التخدير" className="space-y-3">
      <button
        type="button"
        onClick={onBack}
        className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-[#DCE5EA] bg-white px-4 text-sm font-bold text-[#173A63] active:bg-[#EEF3F8]"
      >
        <ArrowRight aria-hidden="true" size={18} /> العودة إلى الرئيسية
      </button>
      <iframe
        ref={frameRef}
        title="عالم التخدير: الدراسة والكوادر والممارسة"
        src="/alam-altakhdir.html"
        loading="eager"
        scrolling="no"
        className="block w-full overflow-hidden rounded-[22px] border border-[#344960] bg-[#05090e]"
        style={{ height: frameHeight }}
      />
    </section>
  );
}
