import { useEffect, useState, type ReactNode } from 'react';
import { useReducedMotion } from 'motion/react';

interface MedicalAnimatedIconProps {
  src: string;
  play: boolean;
  fallback: ReactNode;
  className?: string;
  durationMs?: number;
}

export function MedicalAnimatedIcon({
  src,
  play,
  fallback,
  className = '',
  durationMs = 1700
}: MedicalAnimatedIconProps) {
  const reduceMotion = useReducedMotion();
  const [showGif, setShowGif] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (!play || reduceMotion || failed) {
      setShowGif(false);
      return;
    }

    setLoaded(false);
    setShowGif(true);
    const timer = window.setTimeout(() => setShowGif(false), durationMs);
    return () => window.clearTimeout(timer);
  }, [play, reduceMotion, failed, durationMs, src]);

  return (
    <span className={'relative inline-grid place-items-center ' + className}>
      <span
        aria-hidden="true"
        className={showGif && loaded ? 'opacity-0' : 'opacity-100'}
      >
        {fallback}
      </span>

      {showGif && !failed ? (
        <img
          key={src + ':' + String(play)}
          src={src}
          alt=""
          aria-hidden="true"
          decoding="async"
          draggable={false}
          onLoad={() => setLoaded(true)}
          onError={() => {
            setFailed(true);
            setShowGif(false);
          }}
          className={
            'pointer-events-none absolute inset-0 h-full w-full object-contain transition-opacity duration-100 ' +
            (loaded ? 'opacity-100' : 'opacity-0')
          }
        />
      ) : null}
    </span>
  );
}
