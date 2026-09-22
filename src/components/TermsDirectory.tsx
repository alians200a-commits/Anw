import { useEffect, useMemo, useState } from 'react';
import { Heart, MagnifyingGlass, SpeakerHigh } from '@phosphor-icons/react';
import { CLINICAL_TERMS } from '../data/clinicalTerms';
import { playPronunciation } from '../utils/speech';
import { BilingualLabel } from './BilingualLabel';
import { MixedDirectionText } from './MixedDirectionText';

interface TermsDirectoryProps {
  favorites: Set<string>;
  onToggleFavorite: (id: string) => void;
  initialQuery?: string;
}

export function TermsDirectory({ favorites, onToggleFavorite, initialQuery = '' }: TermsDirectoryProps) {
  const [query, setQuery] = useState(initialQuery);

  useEffect(() => {
    setQuery(initialQuery);
  }, [initialQuery]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return CLINICAL_TERMS.filter((term) => {
      if (term.abbr) return false;
      if (!q) return true;
      return [term.en, term.ar, term.definition, ...term.tags].some((value) =>
        value.toLowerCase().includes(q)
      );
    });
  }, [query]);

  return (
    <div className="space-y-3">
      <div className="relative">
        <MagnifyingGlass size={18} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#315672]" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="البحث في المصطلحات"
          dir="auto"
          placeholder="ابحث عن مصطلح..."
          className="h-11 w-full rounded-xl border border-[#DCE4EA] bg-white pr-10 pl-3 text-sm text-[#183149] outline-none placeholder:text-[#83919C] focus:border-[#B58B2A] focus:ring-2 focus:ring-[#CCA039]/15"
        />
      </div>

      <p className="px-1 text-[10px] text-[#657784]">{filtered.length} مصطلح</p>

      <div className="space-y-2">
        {filtered.map((term) => {
          const favoriteId = 'term:' + term.id;
          const isFavorite = favorites.has(favoriteId);
          return (
            <article key={term.id} className="rounded-[17px] border border-[#DCE5EA] bg-[#F7F9FA] p-3.5">
              <div className="flex items-start gap-3">
                <div className="flex shrink-0 gap-1">
                  <button
                    type="button"
                    onClick={() => playPronunciation('terms', term.id)}
                    className="grid h-11 w-11 place-items-center rounded-xl border border-[#D7E2E9] bg-white text-[#315672] outline-none transition active:bg-[#EEF3F6] focus-visible:ring-2 focus-visible:ring-[#CCA039]/55"
                    title="نطق المصطلح"
                    aria-label={'نطق ' + term.ar}
                  >
                    <SpeakerHigh size={19} />
                  </button>
                  <button
                    type="button"
                    onClick={() => onToggleFavorite(favoriteId)}
                    className={
                      'grid h-11 w-11 place-items-center rounded-xl border outline-none transition focus-visible:ring-2 focus-visible:ring-[#CCA039]/55 ' +
                      (isFavorite
                        ? 'border-[#CCA039]/45 bg-[#CCA039]/12 text-[#9B7420]'
                        : 'border-[#D7E2E9] bg-white/75 text-[#5F7280]')
                    }
                    title="حفظ"
                    aria-label={isFavorite ? 'إزالة من المحفوظات' : 'حفظ المصطلح'}
                  >
                    <Heart size={19} weight={isFavorite ? 'fill' : 'regular'} />
                  </button>
                </div>

                <div className="min-w-0 flex-1 text-right">
                  <h3 className="text-sm font-black text-[#183149]">{term.ar}</h3>
                  <p className="mt-1 text-xs font-bold text-[#526675]" dir="ltr">{term.en}</p>
                </div>
              </div>
              <p className="mt-3 whitespace-pre-line text-[10px] leading-5 text-[#526675]"><MixedDirectionText text={term.definition} /></p>
              {term.clinicalNote && (
                <div className="mt-2 border-r-2 border-[#315672]/50 pr-2.5">
                  <BilingualLabel label="ملاحظة تخديرية | Clinical note" className="text-[9px] font-black text-[#315672]" />
                  <p className="mt-1 text-[10px] leading-5 text-[#5B6770]"><MixedDirectionText text={term.clinicalNote} /></p>
                </div>
              )}
            </article>
          );
        })}
      </div>
    </div>
  );
}