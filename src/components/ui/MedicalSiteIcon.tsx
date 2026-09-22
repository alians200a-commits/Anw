import { useEffect, useRef, useState } from 'react';

export type MedicalSiteIconName =
  | 'home'
  | 'guide'
  | 'learn'
  | 'saved'
  | 'drugs'
  | 'inhalational'
  | 'equipment'
  | 'gas'
  | 'breathing'
  | 'airway'
  | 'monitoring'
  | 'tools'
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
    flaticonId: 17882602,
    flaticonPage: 'https://www.flaticon.com/free-animated-icon/health_17882602',
    staticSrc: 'https://cdn-icons-png.flaticon.com/512/17882/17882602.png',
    animatedSrc: 'https://cdn-icons-gif.flaticon.com/17882/17882602.gif'
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
    flaticonId: 19031946,
    flaticonPage: 'https://www.flaticon.com/free-animated-icon/medical-record_19031946',
    staticSrc: 'https://cdn-icons-png.flaticon.com/512/19031/19031946.png',
    animatedSrc: 'https://cdn-icons-gif.flaticon.com/19031/19031946.gif'
  },
  drugs: {
    iconScoutId: 9709030,
    iconScoutLabel: 'Syringe And Bottle',
    iconScoutPage: 'https://iconscout.com/lottie-animation/syringe-and-bottle-animation_9709030',
    flaticonId: 19035782,
    flaticonPage: 'https://www.flaticon.com/free-animated-icon/syringe_19035782',
    staticSrc: 'https://cdn-icons-png.flaticon.com/512/19035/19035782.png',
    animatedSrc: 'https://cdn-icons-gif.flaticon.com/19035/19035782.gif'
  },
  inhalational: {
    iconScoutId: 3644300,
    iconScoutLabel: 'Anesthesia Mask',
    iconScoutPage: 'https://iconscout.com/lottie-animation/anesthesia-mask-animation_3644300',
    flaticonId: 10823452,
    flaticonPage: 'https://www.flaticon.com/free-animated-icon/face-mask_10823452',
    staticSrc: 'https://cdn-icons-png.flaticon.com/512/10823/10823452.png',
    animatedSrc: 'https://cdn-icons-gif.flaticon.com/10823/10823452.gif'
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
  gas: {
    iconScoutId: 9429418,
    iconScoutLabel: 'Oxygen Cylinder',
    iconScoutPage: 'https://iconscout.com/lottie-animation/oxygen-cylinder-animation_9429418',
    flaticonId: 9859811,
    flaticonPage: 'https://www.flaticon.com/free-animated-icon/oxygen_9859811',
    staticSrc: 'https://cdn-icons-png.flaticon.com/512/9859/9859811.png',
    animatedSrc: 'https://cdn-icons-gif.flaticon.com/9859/9859811.gif'
  },
  breathing: {
    iconScoutId: 8537024,
    iconScoutLabel: 'Ventilator Meter',
    iconScoutPage: 'https://iconscout.com/lottie-animation/ventilator-meter-animation_8537024',
    flaticonId: 12620003,
    flaticonPage: 'https://www.flaticon.com/free-animated-icon/lungs_12620003',
    staticSrc: 'https://cdn-icons-png.flaticon.com/512/12620/12620003.png',
    animatedSrc: 'https://cdn-icons-gif.flaticon.com/12620/12620003.gif'
  },
  airway: {
    iconScoutId: 3644300,
    iconScoutLabel: 'Anesthesia Mask',
    iconScoutPage: 'https://iconscout.com/lottie-animation/anesthesia-mask-animation_3644300',
    flaticonId: 10823452,
    flaticonPage: 'https://www.flaticon.com/free-animated-icon/face-mask_10823452',
    staticSrc: 'https://cdn-icons-png.flaticon.com/512/10823/10823452.png',
    animatedSrc: 'https://cdn-icons-gif.flaticon.com/10823/10823452.gif'
  },
  monitoring: {
    iconScoutId: 9472910,
    iconScoutLabel: 'Monitoring Patient Blood',
    iconScoutPage: 'https://iconscout.com/lottie-animation/monitoring-patient-blood-animation_9472910',
    flaticonId: 18995029,
    flaticonPage: 'https://www.flaticon.com/free-animated-icon/health-monitoring_18995029',
    staticSrc: 'https://cdn-icons-png.flaticon.com/512/18995/18995029.png',
    animatedSrc: 'https://cdn-icons-gif.flaticon.com/18995/18995029.gif'
  },
  tools: {
    iconScoutId: 5950723,
    iconScoutLabel: 'Medical Kit',
    iconScoutPage: 'https://iconscout.com/lottie-animation/medical-kit-animation_5950723',
    flaticonId: 14122763,
    flaticonPage: 'https://www.flaticon.com/free-animated-icon/medical-kit_14122763',
    staticSrc: 'https://cdn-icons-png.flaticon.com/512/14122/14122763.png',
    animatedSrc: 'https://cdn-icons-gif.flaticon.com/14122/14122763.gif'
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
  loop = false,
  size = 24,
  className = ''
}: {
  name: MedicalSiteIconName;
  play?: boolean;
  loop?: boolean;
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

  if (name === 'inhalational') {
    const mask = MEDICAL_SITE_ICON_ASSETS.inhalational;
    const gas = MEDICAL_SITE_ICON_ASSETS.gas;
    const maskSrc = play && !gifFailed ? mask.animatedSrc : mask.staticSrc;
    const gasSrc = play && !gifFailed ? gas.animatedSrc : gas.staticSrc;

    return (
      <span
        aria-hidden="true"
        className={'relative inline-grid shrink-0 place-items-center overflow-visible ' + className}
        style={{ width: size, height: size }}
      >
        <img
          src={maskSrc}
          alt=""
          draggable={false}
          decoding="async"
          loading={play ? 'eager' : 'lazy'}
          className="pointer-events-none absolute h-[78%] w-[78%] object-contain mix-blend-multiply"
        />
        <img
          src={gasSrc}
          alt=""
          draggable={false}
          decoding="async"
          loading={play ? 'eager' : 'lazy'}
          className="pointer-events-none absolute bottom-[-4%] left-[-5%] h-[42%] w-[42%] object-contain mix-blend-multiply"
        />
      </span>
    );
  }

  if (name === 'equipment') {
    const monitor = MEDICAL_SITE_ICON_ASSETS.monitoring;
    const mask = MEDICAL_SITE_ICON_ASSETS.inhalational;
    const monitorSrc = play && !gifFailed ? monitor.animatedSrc : monitor.staticSrc;
    const maskSrc = play && !gifFailed ? mask.animatedSrc : mask.staticSrc;

    return (
      <span
        aria-hidden="true"
        className={'relative inline-grid shrink-0 place-items-center overflow-visible ' + className}
        style={{ width: size, height: size }}
      >
        <img
          src={monitorSrc}
          alt=""
          draggable={false}
          decoding="async"
          loading={play ? 'eager' : 'lazy'}
          className="pointer-events-none absolute h-[82%] w-[82%] object-contain mix-blend-multiply"
        />
        <img
          src={maskSrc}
          alt=""
          draggable={false}
          decoding="async"
          loading={play ? 'eager' : 'lazy'}
          className="pointer-events-none absolute bottom-[-3%] left-[-3%] h-[48%] w-[48%] rounded-full object-contain mix-blend-multiply"
        />
      </span>
    );
  }

  if (name === 'stages') {
    const mask = MEDICAL_SITE_ICON_ASSETS.inhalational;
    const pulse = MEDICAL_SITE_ICON_ASSETS.monitoring;
    const maskSrc = play && !gifFailed ? mask.animatedSrc : mask.staticSrc;
    const pulseSrc = play && !gifFailed ? pulse.animatedSrc : pulse.staticSrc;

    return (
      <span
        aria-hidden="true"
        className={'relative inline-grid shrink-0 place-items-center overflow-visible ' + className}
        style={{ width: size, height: size }}
      >
        <img
          src={maskSrc}
          alt=""
          draggable={false}
          decoding="async"
          loading={play ? 'eager' : 'lazy'}
          className="pointer-events-none absolute h-[82%] w-[82%] object-contain mix-blend-multiply"
        />
        <img
          src={pulseSrc}
          alt=""
          draggable={false}
          decoding="async"
          loading={play ? 'eager' : 'lazy'}
          className="pointer-events-none absolute bottom-[-3%] right-[-4%] h-[42%] w-[42%] rounded-full object-contain mix-blend-multiply"
        />
      </span>
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
      loading={play ? 'eager' : 'lazy'}
      width={size}
      height={size}
      className={'pointer-events-none shrink-0 scale-[0.92] object-contain mix-blend-multiply ' + className}
      onLoad={() => {
        if (!animated || loop) return;

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
