import { useEffect, useState } from 'react';
import { MedicalSiteIcon, type MedicalSiteIconName } from './MedicalSiteIcon';

export type EducationIconName = 'intro' | 'study' | 'team' | 'skills' | 'prep' | 'career';

export const FLATICON_EDUCATION_ICONS: Record<EducationIconName, {
  id: number; title: string; slug: string; fallback: MedicalSiteIconName;
}> = {
  intro: { id: 19015898, title: 'Medical Care', slug: 'medical-care', fallback: 'clinical' },
  study: { id: 19015304, title: 'Graduation Cap', slug: 'graduation-cap', fallback: 'learn' },
  team: { id: 19008020, title: 'Teamwork', slug: 'teamwork', fallback: 'monitoring' },
  skills: { id: 19035782, title: 'Syringe', slug: 'syringe', fallback: 'drugs' },
  prep: { id: 19008759, title: 'Checklist', slug: 'checklist', fallback: 'equipment' },
  career: { id: 17204076, title: 'Briefcase', slug: 'briefcase', fallback: 'saved' }
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
  const asset = FLATICON_EDUCATION_ICONS[name];
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
