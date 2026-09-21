import { useMemo, useState } from 'react';
import { BookOpenText, Heart, MagnifyingGlass } from '@phosphor-icons/react';
import { CLINICAL_TERMS } from '../data/clinicalTerms';

interface TermsDirectoryProps {
  favorites: Set<string>;
  onToggleFavorite: (id: string) => void;
}

export function TermsDirectory({ favorites, onToggleFavorite }: TermsDirectoryProps) {
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return CLINICAL_TERMS;
    return CLINICAL_TERMS.filter((term) =>
      [term.en, term.ar, term.abbr ?? '', term.definition, ...term.tags].some((value) =>
        value.toLowerCase().includes(q)
      )
    );
  }, [query]);

  return (
    <div className="space-y-4">
      <section>
        <p className="text-[10px] font-bold text-[#CCA039]">ANESTHESIA TERMS</p>
        <h2 className="mt-1 text-xl font-black text-[#EEE8D6]">مصطلحات التخدير</h2>
        <p className="mt-1.5 text-xs leading-5 text-[#8EA0B0]">عربي وإنكليزي واختصارات بمكان واحد.</p>
      </section>

      <div className="relative">
        <MagnifyingGlass size={18} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#CCA039]" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="MAC، ICP، Bradycardia..."
          className="h-11 w-full rounded-xl border border-[#CCA039]/12 bg-[#0D2741] pr-10 pl-3 text-sm text-[#EEE8D6] outline-none placeholder:text-[#66798A] focus:border-[#CCA039]/40"
        />
      </div>

      <div className="space-y-2.5">
        {filtered.map((term) => {
          const favoriteId = 'term:' + term.id;
          const isFavorite = favorites.has(favoriteId);
          return (
            <article key={term.id} className="rounded-[18px] border border-[#CCA039]/10 bg-[#0D2741] p-3.5">
              <div className="flex items-start justify-between gap-3">
                <button
                  onClick={() => onToggleFavorite(favoriteId)}
                  className={
                    'grid h-8 w-8 shrink-0 place-items-center rounded-lg border transition ' +
                    (isFavorite
                      ? 'border-[#CCA039]/30 bg-[#CCA039]/12 text-[#CCA039]'
                      : 'border-white/5 bg-white/[0.025] text-[#6D8193]')
                  }
                >
                  <Heart size={16} weight={isFavorite ? 'fill' : 'regular'} />
                </button>

                <div className="flex flex-1 items-start justify-end gap-3 text-right">
                  <div>
                    <div className="flex flex-wrap items-center justify-end gap-2">
                      {term.abbr && (
                        <span className="rounded-md bg-[#CCA039]/10 px-2 py-0.5 text-[9px] font-black text-[#CCA039]">
                          {term.abbr}
                        </span>
                      )}
                      <h3 className="text-sm font-black text-[#EEE8D6]" dir="ltr">{term.en}</h3>
                    </div>
                    <p className="mt-1 text-xs font-bold text-[#B4BEC7]">{term.ar}</p>
                  </div>
                  <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-[#CCA039]/12 bg-[#CCA039]/7 text-[#CCA039]">
                    <BookOpenText size={20} weight="regular" />
                  </div>
                </div>
              </div>
              <p className="mt-3 text-[10px] leading-5 text-[#8294A4]">{term.definition}</p>
            </article>
          );
        })}
      </div>
    </div>
  );
}
