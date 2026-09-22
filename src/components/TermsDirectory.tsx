import { useEffect, useMemo, useState } from 'react';
import { BookOpenText, Heart, MagnifyingGlass, SpeakerHigh } from '@phosphor-icons/react';
import { CLINICAL_TERMS } from '../data/clinicalTerms';
import { playPronunciation } from '../utils/speech';

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
        <MagnifyingGlass size={18} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#9A6B45]" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="ابحث عن مصطلح..."
          className="h-11 w-full rounded-xl border border-[#E9D8C8] bg-white pr-10 pl-3 text-sm text-[#43362F] outline-none placeholder:text-[#A19288] focus:border-[#C9A98C]"
        />
      </div>

      <p className="px-1 text-[10px] text-[#8B7A70]">{filtered.length} مصطلح</p>

      <div className="space-y-2">
        {filtered.map((term) => {
          const favoriteId = 'term:' + term.id;
          const isFavorite = favorites.has(favoriteId);
          return (
            <article key={term.id} className="rounded-[17px] border border-[#EEDFD1] bg-[#FFF7EF] p-3.5">
              <div className="flex items-start gap-3">
                <div className="flex shrink-0 gap-1">
                  <button
                    onClick={() => playPronunciation('terms', term.id)}
                    className="grid h-8 w-8 place-items-center rounded-lg border border-[#9A6B45]/12 bg-[#9A6B45]/7 text-[#9A6B45]"
                    title="نطق المصطلح"
                  >
                    <SpeakerHigh size={16} />
                  </button>
                  <button
                    onClick={() => onToggleFavorite(favoriteId)}
                    className={
                      'grid h-8 w-8 place-items-center rounded-lg border ' +
                      (isFavorite
                        ? 'border-[#9A6B45]/30 bg-[#9A6B45]/12 text-[#9A6B45]'
                        : 'border-[#F0E1D3] bg-white/75 text-[#9A897E]')
                    }
                    title="حفظ"
                  >
                    <Heart size={16} weight={isFavorite ? 'fill' : 'regular'} />
                  </button>
                </div>

                <div className="flex flex-1 items-start justify-end gap-3 text-right">
                  <div>
                    <h3 className="text-sm font-black text-[#3D312B]" dir="ltr">{term.en}</h3>
                    <p className="mt-1 text-xs font-bold text-[#6F625A]">{term.ar}</p>
                  </div>
                  <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-[#9A6B45]/12 bg-[#9A6B45]/7 text-[#9A6B45]">
                    <BookOpenText size={20} weight="regular" />
                  </div>
                </div>
              </div>
              <p className="mt-3 whitespace-pre-line text-[10px] leading-5 text-[#7D7068]">{term.definition}</p>
              {term.clinicalNote && (
                <div className="mt-2 border-r-2 border-[#9A6B45]/50 pr-2.5">
                  <p className="text-[9px] font-black text-[#9A6B45]">ملاحظة تخديرية | Clinical note</p>
                  <p className="mt-1 text-[10px] leading-5 text-[#756A63]">{term.clinicalNote}</p>
                </div>
              )}
            </article>
          );
        })}
      </div>
    </div>
  );
}
