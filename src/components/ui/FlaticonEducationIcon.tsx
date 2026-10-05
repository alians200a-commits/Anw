import { useEffect, useState } from 'react';
import { MedicalSiteIcon, type MedicalSiteIconName } from './MedicalSiteIcon';

export type EducationIconName = 'intro' | 'study' | 'team' | 'skills' | 'prep' | 'career' | 'tools' | 'clinicalSkill';

export const FLATICON_EDUCATION_ICONS: Record<Exclude<EducationIconName, 'skills'>, {
  id: number; title: string; slug: string; fallback: MedicalSiteIconName;
}> = {
  intro: { id: 19003377, title: 'Medical Care', slug: 'medical-care', fallback: 'clinical' },
  study: { id: 19018113, title: 'Study', slug: 'study', fallback: 'learn' },
  team: { id: 16767237, title: 'Brigade', slug: 'brigade', fallback: 'clinical' },
  // The skills card loads the exact user-provided animated SVG instead of a Flaticon icon.
  tools: { id: 14122763, title: 'Medical Kit', slug: 'medical-kit', fallback: 'tools' },
  clinicalSkill: { id: 11706662, title: 'First Aid', slug: 'first-aid', fallback: 'clinical' },
  prep: { id: 14705080, title: 'Medical Assistant', slug: 'medical-assistant', fallback: 'clinical' },
  career: { id: 17490060, title: 'Student', slug: 'student', fallback: 'learn' }
};

/**
 * Uses the original free Flaticon GIF, not CSS motion on a PNG or an AI icon.
 * No colored backing is applied to the asset itself.
 * Attribution for the free license belongs in AboutSheet.
 * GIF frame timing is defined by each original asset; synchronizing their
 * exact cycle durations would require licensing/local copies and retiming.
 */
export function FlaticonEducationIcon({name, size=42, className=''}: {
  name: EducationIconName; size?: number; className?: string;
}) {
  const [gifFailed, setGifFailed] = useState(false);
  const [pngFailed, setPngFailed] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    setGifFailed(false);
    setPngFailed(false);
  }, [name]);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReducedMotion(media.matches);
    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);

  if (name === 'skills') {
    // This is the exact original SMIL-animated SVG uploaded by the user.
    // Loading it as a local asset preserves its animation and transparent background.
    return <span aria-hidden="true"
      className={'inline-flex shrink-0 items-center justify-center bg-transparent ' + className}
      style={{width:size,height:size}}>
      <img src="/animations/anesthesia-technicians.svg" alt="" draggable={false}
        width={size} height={size}
        className="block h-full w-full bg-transparent object-contain" />
    </span>;
  }

  const asset = FLATICON_EDUCATION_ICONS[name];
  const directory = Math.floor(asset.id / 1000);
  const png = 'https://cdn-icons-png.flaticon.com/512/' + directory + '/' + asset.id + '.png';
  const gif = 'https://cdn-icons-gif.flaticon.com/' + directory + '/' + asset.id + '.gif';
  const showStatic = reducedMotion || gifFailed;

  return <span aria-hidden="true" className={'inline-flex shrink-0 items-center justify-center bg-transparent '+className}
    style={{width:size,height:size}}>
    {!pngFailed ? <img
      key={name+(showStatic ? '-png':'-gif')}
      src={showStatic?png:gif}
      alt=""
      width={size}
      height={size}
      loading="eager"
      decoding="async"
      draggable={false}
      onError={() => showStatic ? setPngFailed(true) : setGifFailed(true)}
      className="block h-full w-full bg-transparent object-contain"
    /> : <MedicalSiteIcon name={asset.fallback} play loop size={size}/>}
  </span>;
}
