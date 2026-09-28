import { useEffect, useMemo, useState } from 'react';
import { MagnifyingGlass, SpeakerHigh } from '@phosphor-icons/react';
import { CLINICAL_TERMS } from '../data/clinicalTerms';
import { playPronunciation } from '../utils/speech';
import { BilingualLabel } from './BilingualLabel';
import { MixedDirectionText } from './MixedDirectionText';
import { MedicalSiteIcon } from './ui/MedicalSiteIcon';

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

  const allAbbreviations = useMemo(() => CLINICAL_TERMS.filter((term) => Boolean(term.abbr)), []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return allAbbreviations.filter((term) => {
      if (!q) return true;
      return [term.abbr ?? '', term.en, term.ar, term.definition, ...term.tags].some((value) =>
        value.toLowerCase().includes(q)
      );
    });
  }, [query, allAbbreviations]);

  return (
    <div className="space-y-3">
      <section className="rounded-[22px] border border-[#DCE5EA] bg-[#F8FAFB] p-3 shadow-[0_8px_22px_rgba(16,45,79,0.045)]">
        <div className="relative">
          <MagnifyingGlass size={19} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#315672]" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="البحث في الاختصارات"
            dir="auto"
            placeholder="مثال: MAC، ICP، CBF..."
            className="h-12 w-full rounded-[16px] border border-[#D8E2E9] bg-white pr-11 pl-3 text-sm text-[#183149] outline-none placeholder:text-[#7A8995] focus:border-[#B58B2A] focus:ring-2 focus:ring-[#CCA039]/15"
          />
        </div>
        <div className="mt-2.5 flex items-center justify-between px-1 text-[10px] font-bold text-[#66737F]">
          {query ? <button type="button" onClick={() => setQuery('')} className="rounded-full px-2 py-1 text-[#8A6426] active:bg-[#F2E9D5]">مسح البحث</button> : <span />}
          <span>عرض {filtered.length} من {allAbbreviations.length}</span>
        </div>
      </section>

      <div className="space-y-2.5">
        {filtered.map((term) => {
          const favoriteId = 'term:' + term.id;
          const isFavorite = favorites.has(favoriteId);
          return (
            <article key={term.id} className="rounded-[20px] border border-[#DCE5EA] bg-white p-3.5 shadow-[0_5px_16px_rgba(16,45,79,0.045)]">
              <div className="flex items-start gap-3">
                <div className="flex shrink-0 gap-1">
                  <button
                    type="button"
                    onClick={() => playPronunciation('abbreviations', term.id)}
                    className="group grid h-10 w-10 place-items-center rounded-xl border border-[#D7E2E9] bg-[#F8FAFB] text-[#315672] outline-none active:bg-[#EEF3F6] focus-visible:ring-2 focus-visible:ring-[#CCA039]/55"
                    title="نطق الاسم الإنجليزي"
                    aria-label={'نطق ' + (term.abbr ?? term.en)}
                  >
                    <SpeakerHigh size={18} />
                  </button>
                  <button
                    type="button"
                    onClick={() => onToggleFavorite(favoriteId)}
                    className={
                      'group grid h-10 w-10 place-items-center rounded-xl border outline-none focus-visible:ring-2 focus-visible:ring-[#CCA039]/55 ' +
                      (isFavorite
                        ? 'border-[#CCA039]/45 bg-[#CCA039]/12 text-[#9B7420]'
                        : 'border-[#D7E2E9] bg-[#F8FAFB] text-[#5F7280]')
                    }
                    title="حفظ"
                    aria-label={isFavorite ? 'إزالة من المحفوظات' : 'حفظ الاختصار'}
                  >
                    <MedicalSiteIcon name="saved" play={isFavorite} size={23} />
                  </button>
                </div>

                <div className="min-w-0 flex-1 text-right">
                  <h3 className="text-sm font-black text-[#183149]">{term.ar}</h3>
                  <p className="mt-1 truncate text-xs font-bold text-[#315672]" dir="ltr">
                    {term.abbr} — {term.en}
                  </p>
                  <p className="mt-2 text-[11px] leading-5 text-[#526675]"><MixedDirectionText text={term.definition} /></p>
                  {term.clinicalNote && (
                    <div className="mt-2 rounded-[12px] border-r-2 border-[#315672]/50 bg-[#F8FAFB] px-2.5 py-2">
                      <BilingualLabel label="ملاحظة تخديرية | Clinical note" className="text-[11px] font-black text-[#315672]" />
                      <p className="mt-1 text-[11px] leading-5 text-[#5B6770]"><MixedDirectionText text={term.clinicalNote} /></p>
                    </div>
                  )}
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="rounded-[24px] border border-dashed border-[#C9D6DF] bg-[linear-gradient(145deg,#F8FAFB,#F2F6F9)] p-7 text-center">
          <div className="mx-auto grid h-12 w-12 place-items-center rounded-[15px] border border-[#D7E2E9] bg-white"><MedicalSiteIcon name="abbreviations" size={29} /></div>
          <h3 className="mt-3 text-[13px] font-black text-[#183149]">ماكو اختصار مطابق</h3>
          <p className="mt-1.5 text-[10px] font-semibold text-[#66737F]">جرّب الاختصار نفسه أو الاسم الطبي الكامل.</p>
          <button type="button" onClick={() => setQuery('')} className="mt-3 min-h-10 rounded-[13px] bg-[#173A63] px-4 text-[10px] font-black text-white">عرض كل الاختصارات</button>
        </div>
      )}
    </div>
  );
}
