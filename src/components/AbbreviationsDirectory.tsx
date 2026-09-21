import { useMemo, useState } from 'react';
import { Heart, MagnifyingGlass, SpeakerHigh, TextAa } from '@phosphor-icons/react';
import { CLINICAL_TERMS } from '../data/clinicalTerms';
import { playPronunciation } from '../utils/speech';

interface AbbreviationsDirectoryProps {
  favorites: Set<string>;
  onToggleFavorite: (id: string) => void;
}

export function AbbreviationsDirectory({ favorites, onToggleFavorite }: AbbreviationsDirectoryProps) {
  const [query, setQuery] = useState('');

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
        <MagnifyingGlass size={18} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#CCA039]" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="مثال: MAC، ICP، CBF..."
          className="h-11 w-full rounded-xl border border-[#CCA039]/12 bg-[#0D2741] pr-10 pl-3 text-sm text-[#EEE8D6] outline-none placeholder:text-[#66798A] focus:border-[#CCA039]/40"
        />
      </div>

      <p className="px-1 text-[10px] text-[#71879A]">{filtered.length} اختصار</p>

      <div className="space-y-2">
        {filtered.map((term) => {
          const favoriteId = 'term:' + term.id;
          const isFavorite = favorites.has(favoriteId);
          return (
            <article key={term.id} className="rounded-[17px] border border-[#CCA039]/10 bg-[#0D2741] p-3.5">
              <div className="flex items-start gap-3">
                <div className="flex shrink-0 gap-1">
                  <button
                    onClick={() => playPronunciation('abbreviations', term.id)}
                    className="grid h-8 w-8 place-items-center rounded-lg border border-[#CCA039]/12 bg-[#CCA039]/7 text-[#CCA039]"
                    title="نطق الاسم الإنجليزي"
                  >
                    <SpeakerHigh size={16} />
                  </button>
                  <button
                    onClick={() => onToggleFavorite(favoriteId)}
                    className={
                      'grid h-8 w-8 place-items-center rounded-lg border ' +
                      (isFavorite
                        ? 'border-[#CCA039]/30 bg-[#CCA039]/12 text-[#CCA039]'
                        : 'border-white/5 bg-white/[0.025] text-[#6D8193]')
                    }
                    title="حفظ"
                  >
                    <Heart size={16} weight={isFavorite ? 'fill' : 'regular'} />
                  </button>
                </div>

                <div className="flex-1 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <h3 className="text-base font-black text-[#CCA039]" dir="ltr">{term.abbr}</h3>
                    <TextAa size={18} className="text-[#71879A]" />
                  </div>
                  <p className="mt-1 text-xs font-bold text-[#EEE8D6]" dir="ltr">{term.en}</p>
                  <p className="mt-1 text-[11px] text-[#A3B0BB]">{term.ar}</p>
                  <p className="mt-2 text-[10px] leading-5 text-[#8294A4]">{term.definition}</p>
                  {term.clinicalNote && (
                    <div className="mt-2 border-r-2 border-[#CCA039]/50 pr-2.5">
                      <p className="text-[9px] font-black text-[#CCA039]">ملاحظة تخديرية | Clinical note</p>
                      <p className="mt-1 text-[10px] leading-5 text-[#91A1AE]">{term.clinicalNote}</p>
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
