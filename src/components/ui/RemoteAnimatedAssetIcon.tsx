import { useEffect, useState, type ReactNode } from 'react';

interface RemoteAnimatedAssetIconProps {
  src: string;
  play: boolean;
  fallback: ReactNode;
  className?: string;
  durationMs?: number;
}

export function RemoteAnimatedAssetIcon({
  src,
  play,
  fallback,
  className = '',
  durationMs = 900
}: RemoteAnimatedAssetIconProps) {
  const [showAnimated, setShowAnimated] = useState(false);
  const [failed, setFailed] = useState(false);
  const [run, setRun] = useState(0);

  useEffect(() => {
    if (!play || failed) return;

    setRun((value) => value + 1);
    setShowAnimated(true);

    const timer = window.setTimeout(() => {
      setShowAnimated(false);
    }, durationMs);

    return () => window.clearTimeout(timer);
  }, [play, failed, durationMs]);

  if (!showAnimated || failed) return <>{fallback}</>;

  return (
    <img
      key={run}
      src={src}
      alt=""
      aria-hidden="true"
      decoding="async"
      loading="eager"
      draggable={false}
      onError={() => {
        setFailed(true);
        setShowAnimated(false);
      }}
      className={'pointer-events-none object-contain ' + className}
    />
  );
}

export const DALEELI_ANIMATED_ASSETS = {
  home: 'https://cdn-icons-gif.flaticon.com/19010/19010897.gif',
  guide: 'https://cdn-icons-gif.flaticon.com/19017/19017108.gif',
  learn: 'https://cdn-icons-gif.flaticon.com/19016/19016644.gif',
  saved: 'https://cdn-icons-gif.flaticon.com/12743/12743722.gif',
  medicine: 'https://cdn-icons-gif.flaticon.com/19022/19022025.gif'
} as const;
