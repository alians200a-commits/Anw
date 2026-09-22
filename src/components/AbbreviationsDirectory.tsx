import { useEffect, useMemo, useState } from 'react';
import { Heart, MagnifyingGlass, SpeakerHigh, TextAa } from '@phosphor-icons/react';
import { CLINICAL_TERMS } from '../data/clinicalTerms';
import { playPronunciation } from '../utils/speech';

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
        <MagnifyingGlass size={18} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#6C4AA5]" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="مثال: MAC، ICP، CBF..."
          className="h-11 w-full rounded-xl border border-[#DCCFEB] bg-white pr-10 pl-3 text-sm text-[#3D3348] outline-none placeholder:text-[#9B91A3] focus:border-[#A78AC8]"
        />
      </div>

      <p className="px-1 text-[10px] text-[#81748A]">{filtered.length} اختصار</p>

      <div className="space-y-2">
        {filtered.map((term) => {
          const favoriteId = 'term:' + term.id;
          const isFavorite = favorites.has(favoriteId);
          return (
            <article key={term.id} className="rounded-[17px] border border-[#E3D8EE] bg-[#F5F1FA] p-3.5">
              <div className="flex items-start gap-3">
                <div className="flex shrink-0 gap-1">
                  <button
                    onClick={() => playPronunciation('abbreviations', term.id)}
                    className="grid h-8 w-8 place-items-center rounded-lg border border-[#6C4AA5]/12 bg-[#6C4AA5]/7 text-[#6C4AA5]"
                    title="نطق الاسم الإنجليزي"
                  >
                    <SpeakerHigh size={16} />
                  </button>
                  <button
                    onClick={() => onToggleFavorite(favoriteId)}
                    className={
                      'grid h-8 w-8 place-items-center rounded-lg border ' +
                      (isFavorite
                        ? 'border-[#6C4AA5]/30 bg-[#6C4AA5]/12 text-[#6C4AA5]'
                        : 'border-[#E5DAEE] bg-white/75 text-[#8B7C97]')
                    }
                    title="حفظ"
                  >
                    <Heart size={16} weight={isFavorite ? 'fill' : 'regular'} />
                  </button>
                </div>

                <div className="flex-1 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <h3 className="text-base font-black text-[#6C4AA5]" dir="ltr">{term.abbr}</h3>
                    <TextAa size={18} className="text-[#81748A]" />
                  </div>
                  <p className="mt-1 text-xs font-bold text-[#34293F]" dir="ltr">{term.en}</p>
                  <p className="mt-1 text-[11px] text-[#6E6477]">{term.ar}</p>
                  <p className="mt-2 text-[10px] leading-5 text-[#766D7E]">{term.definition}</p>
                  {term.clinicalNote && (
                    <div className="mt-2 border-r-2 border-[#6C4AA5]/50 pr-2.5">
                      <p className="text-[9px] font-black text-[#6C4AA5]">ملاحظة تخديرية | Clinical note</p>
                      <p className="mt-1 text-[10px] leading-5 text-[#756B7D]">{term.clinicalNote}</p>
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
