import { useEffect, useState } from 'react';
import { MedicalSiteIcon, type MedicalSiteIconName } from './MedicalSiteIcon';

export type EducationIconName = 'intro' | 'study' | 'team' | 'skills' | 'prep' | 'career' | 'tools' | 'clinicalSkill';

export const FLATICON_EDUCATION_ICONS: Record<EducationIconName, {
  id: number; title: string; slug: string; fallback: MedicalSiteIconName;
}> = {
  intro: { id: 19003377, title: 'Medical Care', slug: 'medical-care', fallback: 'clinical' },
  study: { id: 19018113, title: 'Study', slug: 'study', fallback: 'learn' },
  team: { id: 16767237, title: 'Brigade', slug: 'brigade', fallback: 'clinical' },
  // Unapproved preview: visually combine two genuine free Flaticon GIFs from the
  // same Magnific Basic Accent Lineal Color collection into one medical-staff icon.
  skills: { id: 19022017, title: 'Doctor and Nurse preview', slug: 'doctor-and-nurse', fallback: 'clinical' },
  tools: { id: 19010897, title: 'Medical', slug: 'medical', fallback: 'tools' },
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
  const asset = FLATICON_EDUCATION_ICONS[name];
  const [gifFailed, setGifFailed] = useState(false);
  const [pngFailed, setPngFailed] = useState(false);
  const [pairErrors, setPairErrors] = useState<[number,number]>([0,0]);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    setGifFailed(false);
    setPngFailed(false);
    setPairErrors([0,0]);
  }, [name]);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReducedMotion(media.matches);
    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);

  if (name === 'skills') {
    const people = [
      { id: 19022017, label: 'Doctor', fallback: 'clinical' as MedicalSiteIconName },
      { id: 19001025, label: 'Nurse', fallback: 'clinical' as MedicalSiteIconName }
    ] as const;
    return <span aria-hidden="true"
      className={'relative inline-flex shrink-0 overflow-visible bg-transparent ' + className}
      style={{ width: size, height: size }}>
      {people.map((person, index) => {
        const slot = index as 0 | 1;
        const stage = pairErrors[slot];
        const root = Math.floor(person.id / 1000);
        const gif = 'https://cdn-icons-gif.flaticon.com/' + root + '/' + person.id + '.gif';
        const png = 'https://cdn-icons-png.flaticon.com/512/' + root + '/' + person.id + '.png';
        return <span key={person.id} className="absolute top-[8%] h-[84%] w-[72%] bg-transparent"
          style={{ [index === 0 ? 'right' : 'left']: 0, zIndex: index === 0 ? 2 : 1 }}>
          {stage < 2 ? <img key={stage + '-' + (reducedMotion ? 'static' : 'animated')}
            src={reducedMotion || stage === 1 ? png : gif}
            alt="" draggable={false} width={Math.round(size * .72)} height={Math.round(size * .84)}
            onError={() => setPairErrors(prev => slot === 0 ? [Math.min(2,prev[0]+1), prev[1]] : [prev[0],Math.min(2,prev[1]+1)])}
            className="block h-full w-full bg-transparent object-contain" /> :
            <MedicalSiteIcon name={person.fallback} play loop size={Math.round(size * .7)} />}
        </span>;
      })}
    </span>;
  }

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
