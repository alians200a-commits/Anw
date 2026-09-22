import { useEffect, useRef, useState } from 'react';

export type MedicalSiteIconName =
  | 'home'
  | 'guide'
  | 'learn'
  | 'saved'
  | 'drugs'
  | 'equipment'
  | 'fluids'
  | 'stages'
  | 'clinical'
  | 'terms'
  | 'abbreviations';

type AssetRecord = {
  iconScoutId?: number;
  iconScoutLabel: string;
  iconScoutPage: string;
  flaticonId: number;
  flaticonPage: string;
  staticSrc: string;
  animatedSrc: string;
};

export const MEDICAL_SITE_ICON_ASSETS: Record<MedicalSiteIconName, AssetRecord> = {
  home: {
    iconScoutId: 7140714,
    iconScoutLabel: 'Mobile Health App',
    iconScoutPage: 'https://iconscout.com/lottie-animation/mobile-health-app-animation_7140714',
    flaticonId: 18997678,
    flaticonPage: 'https://www.flaticon.com/free-animated-icon/home_18997678',
    staticSrc: 'https://cdn-icons-png.flaticon.com/512/18997/18997678.png',
    animatedSrc: 'https://cdn-icons-gif.flaticon.com/18997/18997678.gif'
  },
  guide: {
    iconScoutId: 10435818,
    iconScoutLabel: 'Medical Record',
    iconScoutPage: 'https://iconscout.com/lottie-animation/medical-record-animation_10435818',
    flaticonId: 11880586,
    flaticonPage: 'https://www.flaticon.com/free-animated-icon/medical-history_11880586',
    staticSrc: 'https://cdn-icons-png.flaticon.com/512/11880/11880586.png',
    animatedSrc: 'https://cdn-icons-gif.flaticon.com/11880/11880586.gif'
  },
  learn: {
    iconScoutId: 7140713,
    iconScoutLabel: 'Microscope',
    iconScoutPage: 'https://iconscout.com/lottie-animation/microscope-animation_7140713',
    flaticonId: 19009028,
    flaticonPage: 'https://www.flaticon.com/free-animated-icon/microscope_19009028',
    staticSrc: 'https://cdn-icons-png.flaticon.com/512/19009/19009028.png',
    animatedSrc: 'https://cdn-icons-gif.flaticon.com/19009/19009028.gif'
  },
  saved: {
    iconScoutId: 7140721,
    iconScoutLabel: 'Health Record',
    iconScoutPage: 'https://iconscout.com/lottie-animation/health-record-animation_7140721',
    flaticonId: 18996514,
    flaticonPage: 'https://www.flaticon.com/free-animated-icon/bookmark_18996514',
    staticSrc: 'https://cdn-icons-png.flaticon.com/512/18996/18996514.png',
    animatedSrc: 'https://cdn-icons-gif.flaticon.com/18996/18996514.gif'
  },
  drugs: {
    iconScoutId: 9709030,
    iconScoutLabel: 'Syringe And Bottle',
    iconScoutPage: 'https://iconscout.com/lottie-animation/syringe-and-bottle-animation_9709030',
    flaticonId: 19036725,
    flaticonPage: 'https://www.flaticon.com/free-animated-icon/syringe-injection_19036725',
    staticSrc: 'https://cdn-icons-png.flaticon.com/512/19036/19036725.png',
    animatedSrc: 'https://cdn-icons-gif.flaticon.com/19036/19036725.gif'
  },
  equipment: {
    iconScoutId: 12020193,
    iconScoutLabel: 'Anesthesia Machine',
    iconScoutPage: 'https://iconscout.com/lottie-animation/anesthesia-machine-animation_12020193',
    flaticonId: 18995029,
    flaticonPage: 'https://www.flaticon.com/free-animated-icon/health-monitoring_18995029',
    staticSrc: 'https://cdn-icons-png.flaticon.com/512/18995/18995029.png',
    animatedSrc: 'https://cdn-icons-gif.flaticon.com/18995/18995029.gif'
  },
  fluids: {
    iconScoutLabel: 'IV Bag',
    iconScoutPage: 'https://iconscout.com/lottie-animation/iv-bag-11577392_9449357',
    flaticonId: 19017296,
    flaticonPage: 'https://www.flaticon.com/free-animated-icon/iv-bag_19017296',
    staticSrc: 'https://cdn-icons-png.flaticon.com/512/19017/19017296.png',
    animatedSrc: 'https://cdn-icons-gif.flaticon.com/19017/19017296.gif'
  },
  stages: {
    iconScoutId: 3644300,
    iconScoutLabel: 'Anesthesia Mask',
    iconScoutPage: 'https://iconscout.com/lottie-animation/anesthesia-mask-animation_3644300',
    flaticonId: 6449707,
    flaticonPage: 'https://www.flaticon.com/free-animated-icon/heartbeat_6449707',
    staticSrc: 'https://cdn-icons-png.flaticon.com/512/6449/6449707.png',
    animatedSrc: 'https://cdn-icons-gif.flaticon.com/6449/6449707.gif'
  },
  clinical: {
    iconScoutId: 3277635,
    iconScoutLabel: 'Medical Treatment',
    iconScoutPage: 'https://iconscout.com/lottie-animation/medical-treatment-animation_3277635',
    flaticonId: 19003377,
    flaticonPage: 'https://www.flaticon.com/free-animated-icon/medical-care_19003377',
    staticSrc: 'https://cdn-icons-png.flaticon.com/512/19003/19003377.png',
    animatedSrc: 'https://cdn-icons-gif.flaticon.com/19003/19003377.gif'
  },
  terms: {
    iconScoutId: 7140720,
    iconScoutLabel: 'Health Question',
    iconScoutPage: 'https://iconscout.com/lottie-animation/health-question-animation_7140720',
    flaticonId: 19031946,
    flaticonPage: 'https://www.flaticon.com/free-animated-icon/medical-record_19031946',
    staticSrc: 'https://cdn-icons-png.flaticon.com/512/19031/19031946.png',
    animatedSrc: 'https://cdn-icons-gif.flaticon.com/19031/19031946.gif'
  },
  abbreviations: {
    iconScoutId: 7140721,
    iconScoutLabel: 'Health Record',
    iconScoutPage: 'https://iconscout.com/lottie-animation/health-record-animation_7140721',
    flaticonId: 8800763,
    flaticonPage: 'https://www.flaticon.com/free-animated-icon/text-box_8800763',
    staticSrc: 'https://cdn-icons-png.flaticon.com/512/8800/8800763.png',
    animatedSrc: 'https://cdn-icons-gif.flaticon.com/8800/8800763.gif'
  }
};

export function MedicalSiteIcon({
  name,
  play = false,
  size = 24,
  className = ''
}: {
  name: MedicalSiteIconName;
  play?: boolean;
  size?: number;
  className?: string;
}) {
  const asset = MEDICAL_SITE_ICON_ASSETS[name];
  const [animated, setAnimated] = useState(false);
  const [gifFailed, setGifFailed] = useState(false);
  const [pngFailed, setPngFailed] = useState(false);
  const [run, setRun] = useState(0);
  const stopTimerRef = useRef<number | null>(null);

  const clearStopTimer = () => {
    if (stopTimerRef.current !== null) {
      window.clearTimeout(stopTimerRef.current);
      stopTimerRef.current = null;
    }
  };

  useEffect(() => {
    clearStopTimer();
    setGifFailed(false);
    setPngFailed(false);
    return clearStopTimer;
  }, [name]);

  useEffect(() => {
    clearStopTimer();

    if (!play || gifFailed) {
      setAnimated(false);
      return;
    }

    setRun((value) => value + 1);
    setAnimated(true);

    return clearStopTimer;
  }, [play, gifFailed, name]);

  if (pngFailed && (!animated || gifFailed)) {
    return (
      <span
        aria-hidden="true"
        className={'inline-block rounded-full bg-[#DCE5EA] ' + className}
        style={{ width: size, height: size }}
      />
    );
  }

  return (
    <img
      key={animated ? name + '-animated-' + run : name + '-static'}
      src={animated && !gifFailed ? asset.animatedSrc : asset.staticSrc}
      alt=""
      aria-hidden="true"
      draggable={false}
      decoding="async"
      loading="eager"
      width={size}
      height={size}
      className={'pointer-events-none shrink-0 object-contain ' + className}
      onLoad={() => {
        if (!animated) return;

        clearStopTimer();
        stopTimerRef.current = window.setTimeout(() => {
          setAnimated(false);
          stopTimerRef.current = null;
        }, 1400);
      }}
      onError={() => {
        clearStopTimer();

        if (animated) {
          setGifFailed(true);
          setAnimated(false);
        } else {
          setPngFailed(true);
        }
      }}
    />
  );
}
