import { useEffect, useMemo, useState } from 'react';
import { Heart, MagnifyingGlass, SpeakerHigh, TextAa } from '@phosphor-icons/react';
import { CLINICAL_TERMS } from '../data/clinicalTerms';
import { playPronunciation } from '../utils/speech';
import { BilingualLabel } from './BilingualLabel';
import { MixedDirectionText } from './MixedDirectionText';

interface AbbreviationsDirectoryProps {
  favorites: Set<string>;
  onToggleFavorite: (id: string) => void;
  initialQuery?: string;
}

export function AbbreviationsDirectory({ favorites, onToggleFavorite, initialQuery = '' }: AbbreviationsDirectoryProps) {
  const [query, setQuery] = useState(initialQuery);

  useEffect(() => {
    setQuery(initialQuery);
  }, [initialQuery]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return CLINICAL_TERMS.filter((term) => {
      if (!term.abbr) return false;
      if (!q) return true;
      return [term.abbr, term.en, term.ar, term.definition, ...term.tags].some((value) =>
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
          placeholder="مثال: MAC، ICP، CBF..."
          className="h-11 w-full rounded-xl border border-[#DCE4EA] bg-white pr-10 pl-3 text-sm text-[#183149] outline-none placeholder:text-[#83919C] focus:border-[#B58B2A] focus:ring-2 focus:ring-[#CCA039]/15"
        />
      </div>

      <p className="px-1 text-[10px] text-[#657784]">{filtered.length} اختصار</p>

      <div className="space-y-2">
        {filtered.map((term) => {
          const favoriteId = 'term:' + term.id;
          const isFavorite = favorites.has(favoriteId);
          return (
            <article key={term.id} className="rounded-[17px] border border-[#DCE5EA] bg-[#F7F9FA] p-3.5">
              <div className="flex items-start gap-3">
                <div className="flex shrink-0 gap-1">
                  <button
                    onClick={() => playPronunciation('abbreviations', term.id)}
                    className="grid h-11 w-11 place-items-center rounded-xl border border-[#315672]/12 bg-[#315672]/7 text-[#315672]"
                    title="نطق الاسم الإنجليزي"
                  >
                    <SpeakerHigh size={19} />
                  </button>
                  <button
                    onClick={() => onToggleFavorite(favoriteId)}
                    className={
                      'grid h-11 w-11 place-items-center rounded-xl border ' +
                      (isFavorite
                        ? 'border-[#315672]/30 bg-[#315672]/12 text-[#315672]'
                        : 'border-[#D7E2E9] bg-white/75 text-[#5F7280]')
                    }
                    title="حفظ"
                  >
                    <Heart size={19} weight={isFavorite ? 'fill' : 'regular'} />
                  </button>
                </div>

                <div className="flex-1 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <h3 className="text-base font-black text-[#315672]" dir="ltr">{term.abbr}</h3>
                    <TextAa size={20} className="text-[#526675]" />
                  </div>
                  <p className="mt-1 text-[11px] font-bold text-[#183149]">{term.ar}</p>
                  <p className="mt-1 text-xs text-[#526675]" dir="ltr">{term.en}</p>
                  <p className="mt-2 text-[10px] leading-5 text-[#526675]"><MixedDirectionText text={term.definition} /></p>
                  {term.clinicalNote && (
                    <div className="mt-2 border-r-2 border-[#315672]/50 pr-2.5">
                      <BilingualLabel label="ملاحظة تخديرية | Clinical note" className="text-[9px] font-black text-[#315672]" />
                      <p className="mt-1 text-[10px] leading-5 text-[#5B6770]"><MixedDirectionText text={term.clinicalNote} /></p>
                    </div>
                  )}
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}