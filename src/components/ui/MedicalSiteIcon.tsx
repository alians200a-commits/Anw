import { useEffect, useState } from 'react';

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
  iconScoutId: number;
  iconScoutPage: string;
  flaticonId: number;
  flaticonPage: string;
  staticSrc: string;
  animatedSrc: string;
};

export const MEDICAL_SITE_ICON_ASSETS: Record<MedicalSiteIconName, AssetRecord> = {
  home: {
    iconScoutId: 7140714,
    iconScoutPage: 'https://iconscout.com/lottie-animation/mobile-health-app-animation_7140714',
    flaticonId: 15968683,
    flaticonPage: 'https://www.flaticon.com/free-animated-icon/medical-cross_15968683',
    staticSrc: 'https://cdn-icons-png.flaticon.com/512/15968/15968683.png',
    animatedSrc: 'https://cdn-icons-gif.flaticon.com/15968/15968683.gif'
  },
  guide: {
    iconScoutId: 7140709,
    iconScoutPage: 'https://iconscout.com/lottie-animation/medical-symbol-animation_7140709',
    flaticonId: 11880586,
    flaticonPage: 'https://www.flaticon.com/free-animated-icon/medical-history_11880586',
    staticSrc: 'https://cdn-icons-png.flaticon.com/512/11880/11880586.png',
    animatedSrc: 'https://cdn-icons-gif.flaticon.com/11880/11880586.gif'
  },
  learn: {
    iconScoutId: 7140713,
    iconScoutPage: 'https://iconscout.com/lottie-animation/microscope-animation_7140713',
    flaticonId: 19009028,
    flaticonPage: 'https://www.flaticon.com/free-animated-icon/microscope_19009028',
    staticSrc: 'https://cdn-icons-png.flaticon.com/512/19009/19009028.png',
    animatedSrc: 'https://cdn-icons-gif.flaticon.com/19009/19009028.gif'
  },
  saved: {
    iconScoutId: 7140721,
    iconScoutPage: 'https://iconscout.com/lottie-animation/health-record-animation_7140721',
    flaticonId: 19036882,
    flaticonPage: 'https://www.flaticon.com/free-animated-icon/heart_19036882',
    staticSrc: 'https://cdn-icons-png.flaticon.com/512/19036/19036882.png',
    animatedSrc: 'https://cdn-icons-gif.flaticon.com/19036/19036882.gif'
  },
  drugs: {
    iconScoutId: 7140711,
    iconScoutPage: 'https://iconscout.com/lottie-animation/medication-animation_7140711',
    flaticonId: 15968752,
    flaticonPage: 'https://www.flaticon.com/free-animated-icon/pill_15968752',
    staticSrc: 'https://cdn-icons-png.flaticon.com/512/15968/15968752.png',
    animatedSrc: 'https://cdn-icons-gif.flaticon.com/15968/15968752.gif'
  },
  equipment: {
    iconScoutId: 7140696,
    iconScoutPage: 'https://iconscout.com/lottie-animation/stethoscope-animation_7140696',
    flaticonId: 14122763,
    flaticonPage: 'https://www.flaticon.com/free-animated-icon/medical-kit_14122763',
    staticSrc: 'https://cdn-icons-png.flaticon.com/512/14122/14122763.png',
    animatedSrc: 'https://cdn-icons-gif.flaticon.com/14122/14122763.gif'
  },
  fluids: {
    iconScoutId: 7140712,
    iconScoutPage: 'https://iconscout.com/lottie-animation/medicine-animation_7140712',
    flaticonId: 19017296,
    flaticonPage: 'https://www.flaticon.com/free-animated-icon/iv-bag_19017296',
    staticSrc: 'https://cdn-icons-png.flaticon.com/512/19017/19017296.png',
    animatedSrc: 'https://cdn-icons-gif.flaticon.com/19017/19017296.gif'
  },
  stages: {
    iconScoutId: 7140725,
    iconScoutPage: 'https://iconscout.com/lottie-animation/heart-rate-animation_7140725',
    flaticonId: 6449707,
    flaticonPage: 'https://www.flaticon.com/free-animated-icon/heartbeat_6449707',
    staticSrc: 'https://cdn-icons-png.flaticon.com/512/6449/6449707.png',
    animatedSrc: 'https://cdn-icons-gif.flaticon.com/6449/6449707.gif'
  },
  clinical: {
    iconScoutId: 7140710,
    iconScoutPage: 'https://iconscout.com/lottie-animation/medical-treatment-animation_7140710',
    flaticonId: 19003377,
    flaticonPage: 'https://www.flaticon.com/free-animated-icon/medical-care_19003377',
    staticSrc: 'https://cdn-icons-png.flaticon.com/512/19003/19003377.png',
    animatedSrc: 'https://cdn-icons-gif.flaticon.com/19003/19003377.gif'
  },
  terms: {
    iconScoutId: 7140720,
    iconScoutPage: 'https://iconscout.com/lottie-animation/health-question-animation_7140720',
    flaticonId: 19031946,
    flaticonPage: 'https://www.flaticon.com/free-animated-icon/medical-record_19031946',
    staticSrc: 'https://cdn-icons-png.flaticon.com/512/19031/19031946.png',
    animatedSrc: 'https://cdn-icons-gif.flaticon.com/19031/19031946.gif'
  },
  abbreviations: {
    iconScoutId: 7140721,
    iconScoutPage: 'https://iconscout.com/lottie-animation/health-record-animation_7140721',
    flaticonId: 19031946,
    flaticonPage: 'https://www.flaticon.com/free-animated-icon/medical-record_19031946',
    staticSrc: 'https://cdn-icons-png.flaticon.com/512/19031/19031946.png',
    animatedSrc: 'https://cdn-icons-gif.flaticon.com/19031/19031946.gif'
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

  useEffect(() => {
    setGifFailed(false);
    setPngFailed(false);
  }, [name]);

  useEffect(() => {
    if (!play || gifFailed) {
      setAnimated(false);
      return;
    }

    setRun((value) => value + 1);
    setAnimated(true);
    const timer = window.setTimeout(() => setAnimated(false), 900);
    return () => window.clearTimeout(timer);
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
      key={animated ? run : 'static'}
      src={animated && !gifFailed ? asset.animatedSrc : asset.staticSrc}
      alt=""
      aria-hidden="true"
      draggable={false}
      decoding="async"
      loading="eager"
      width={size}
      height={size}
      className={'pointer-events-none shrink-0 object-contain ' + className}
      onError={() => {
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
