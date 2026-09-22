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

  if (name === 'home') {
    return (
      <svg aria-hidden="true" viewBox="0 0 64 64" width={size} height={size} className={'pointer-events-none shrink-0 overflow-visible ' + className}>
        <g fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path d="M10 30L32 11l22 19v21a4 4 0 0 1-4 4H14a4 4 0 0 1-4-4z" stroke="#173A63" strokeWidth="3.2"/>
          <path d="M24 55V38h16v17" stroke="#2F69A8" strokeWidth="3"/>
          <path d="M27 27h10M32 22v10" stroke="#D9A441" strokeWidth="3.2">
            {play && loop ? <animate attributeName="opacity" values="1;.35;1" dur="1.4s" repeatCount="indefinite"/> : null}
          </path>
        </g>
      </svg>
    );
  }

  if (name === 'guide') {
    return (
      <svg aria-hidden="true" viewBox="0 0 64 64" width={size} height={size} className={'pointer-events-none shrink-0 overflow-visible ' + className}>
        <g fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 9h25l8 8v38H17a4 4 0 0 1-4-4V13a4 4 0 0 1 4-4z" stroke="#173A63" strokeWidth="3"/>
          <path d="M42 9v10h8" stroke="#2F69A8" strokeWidth="3"/>
          <path d="M22 29h18M22 36h18M22 43h12" stroke="#2F69A8" strokeWidth="2.6">
            {play && loop ? <animate attributeName="stroke-dasharray" values="2 24;24 2;2 24" dur="2s" repeatCount="indefinite"/> : null}
          </path>
          <path d="M19 19h9M23.5 14.5v9" stroke="#D9A441" strokeWidth="3"/>
        </g>
      </svg>
    );
  }

  if (name === 'learn') {
    return (
      <svg
        aria-hidden="true"
        viewBox="0 0 64 64"
        width={size}
        height={size}
        className={'pointer-events-none shrink-0 overflow-visible ' + className}
      >
        <g fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path d="M8 17c8-3 15-1 24 5v31c-9-6-16-8-24-5z" fill="#EEF3F8" stroke="#173A63" strokeWidth="3"/>
          <path d="M56 17c-8-3-15-1-24 5v31c9-6 16-8 24-5z" fill="#EEF3F8" stroke="#173A63" strokeWidth="3"/>
          <path d="M16 27c5 0 9 1 12 3M16 34c5 0 9 1 12 3M48 27c-5 0-9 1-12 3M48 34c-5 0-9 1-12 3" stroke="#2F69A8" strokeWidth="2.5">
            {play && loop ? <animate attributeName="opacity" values=".45;1;.45" dur="1.6s" repeatCount="indefinite"/> : null}
          </path>
          <path d="M32 22v31" stroke="#173A63" strokeWidth="2.4"/>
          <path d="M43 10l2 5 5 2-5 2-2 5-2-5-5-2 5-2z" fill="#D9A441" stroke="#173A63" strokeWidth="1.8">
            {play && loop ? <animateTransform attributeName="transform" type="scale" values=".8;1.15;.8" additive="sum" dur="1.4s" repeatCount="indefinite"/> : null}
          </path>
        </g>
      </svg>
    );
  }

  if (name === 'saved') {
    return (
      <svg aria-hidden="true" viewBox="0 0 64 64" width={size} height={size} className={'pointer-events-none shrink-0 overflow-visible ' + className}>
        <g fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 10h28v45L32 46 18 55z" stroke="#173A63" strokeWidth="3.2"/>
          <path d="M23 24h18" stroke="#2F69A8" strokeWidth="3"/>
          <path d="M32 18v12" stroke="#D9A441" strokeWidth="3">
            {play && loop ? <animate attributeName="opacity" values="1;.3;1" dur="1.3s" repeatCount="indefinite"/> : null}
          </path>
        </g>
      </svg>
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
    return (
      <svg
        aria-hidden="true"
        viewBox="0 0 86 86"
        width={size}
        height={size}
        className={'pointer-events-none shrink-0 overflow-visible ' + className}
      >
        <g fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 17h38a5 5 0 0 1 5 5v50H17V22a5 5 0 0 1 5-5z" stroke="#173A63" strokeWidth="3"/>
          <rect x="24" y="7" width="32" height="18" rx="3.5" stroke="#173A63" strokeWidth="3" fill="#EEF3F8"/>
          <path d="M28 17h5l3-6 4 11 3-6h9" stroke="#D9A441" strokeWidth="2.5" strokeDasharray="18 6">
            {play && loop ? <animate attributeName="stroke-dashoffset" from="24" to="0" dur="1.1s" repeatCount="indefinite"/> : null}
          </path>

          <rect x="22" y="30" width="8" height="21" rx="3" stroke="#2F69A8" strokeWidth="2.6" fill="#F8FBFD"/>
          <rect x="33" y="30" width="8" height="21" rx="3" stroke="#2F69A8" strokeWidth="2.6" fill="#F8FBFD"/>
          <rect x="44" y="30" width="8" height="21" rx="3" stroke="#2F69A8" strokeWidth="2.6" fill="#F8FBFD"/>
          <circle cx="26" cy="43" r="2.1" fill="#D9A441">
            {play && loop ? <animate attributeName="cy" values="43;35;43" dur="1.8s" repeatCount="indefinite"/> : null}
          </circle>
          <circle cx="37" cy="39" r="2.1" fill="#D9A441">
            {play && loop ? <animate attributeName="cy" values="39;47;39" dur="1.5s" repeatCount="indefinite"/> : null}
          </circle>
          <circle cx="48" cy="45" r="2.1" fill="#D9A441">
            {play && loop ? <animate attributeName="cy" values="45;36;45" dur="2s" repeatCount="indefinite"/> : null}
          </circle>

          <rect x="55" y="31" width="7" height="12" rx="2" stroke="#173A63" strokeWidth="2.4" fill="#D9E6F2"/>
          <circle cx="58.5" cy="48" r="3" stroke="#173A63" strokeWidth="2.2" fill="#EEF3F8"/>
          <path d="M65 39c8 0 12 3 12 9v4" stroke="#2F69A8" strokeWidth="2.6"/>
          <path d="M77 52c0 5-3 9-7 9s-7-4-7-9c0-4 3-7 7-7s7 3 7 7z" stroke="#173A63" strokeWidth="2.6" fill="#EEF3F8">
            {play && loop ? <animate attributeName="d" dur="1.5s" repeatCount="indefinite"
              values="M77 52c0 5-3 9-7 9s-7-4-7-9c0-4 3-7 7-7s7 3 7 7z;M78 52c0 6-3.5 10-8 10s-8-4-8-10c0-3.5 3.5-6 8-6s8 2.5 8 6z;M77 52c0 5-3 9-7 9s-7-4-7-9c0-4 3-7 7-7s7 3 7 7z"/>
              : null}
          </path>

          <path d="M21 56h40M21 63h40" stroke="#AFC3D6" strokeWidth="2.4"/>
          <path d="M29 56v16M49 56v16" stroke="#173A63" strokeWidth="2.8"/>
          <path d="M18 72h46" stroke="#173A63" strokeWidth="3"/>
          <circle cx="24" cy="77" r="4" stroke="#173A63" strokeWidth="2.6" fill="#F8FBFD">
            {play && loop ? <animateTransform attributeName="transform" type="rotate" from="0 24 77" to="360 24 77" dur="2s" repeatCount="indefinite"/> : null}
          </circle>
          <circle cx="58" cy="77" r="4" stroke="#173A63" strokeWidth="2.6" fill="#F8FBFD">
            {play && loop ? <animateTransform attributeName="transform" type="rotate" from="0 58 77" to="360 58 77" dur="2s" repeatCount="indefinite"/> : null}
          </circle>
        </g>
      </svg>
    );
  }

  if (name === 'stages') {
    return (
      <svg
        aria-hidden="true"
        viewBox="0 0 72 72"
        width={size}
        height={size}
        className={'pointer-events-none shrink-0 overflow-visible ' + className}
      >
        <g fill="none" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="27" cy="21" r="10" fill="#EEF3F8" stroke="#173A63" strokeWidth="2.8"/>
          <path d="M18 48c2-10 7-16 14-16s12 6 14 16" stroke="#173A63" strokeWidth="3"/>
          <path d="M22 20c2 2 8 2 10 0" stroke="#2F69A8" strokeWidth="2.4"/>
          <path d="M18 20c3-5 7-8 12-8" stroke="#173A63" strokeWidth="2.4"/>

          <path d="M21 22c2-4 10-4 12 0l-2 7c-2 2-6 2-8 0z" fill="#D9E6F2" stroke="#2F69A8" strokeWidth="2.5">
            {play && loop ? <animateTransform attributeName="transform" type="scale" values="1;1.06;1" additive="sum" dur="1.6s" repeatCount="indefinite"/> : null}
          </path>
          <path d="M33 26c8 0 11 5 11 10" stroke="#2F69A8" strokeWidth="2.5"/>
          <path d="M44 36c4 0 7 2 8 5" stroke="#2F69A8" strokeWidth="2.5"/>

          <path d="M10 56h10l4-7 5 14 5-9 4 5h8l4-6 4 6h8" stroke="#D9A441" strokeWidth="2.8" strokeDasharray="18 7">
            {play && loop ? <animate attributeName="stroke-dashoffset" from="25" to="0" dur="1.05s" repeatCount="indefinite"/> : null}
          </path>

          <circle cx="56" cy="18" r="5" fill="#EEF3F8" stroke="#173A63" strokeWidth="2.4"/>
          <path d="M56 14v8M52 18h8" stroke="#2F69A8" strokeWidth="2.2">
            {play && loop ? <animate attributeName="opacity" values="1;.35;1" dur="1.2s" repeatCount="indefinite"/> : null}
          </path>
        </g>
      </svg>
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
