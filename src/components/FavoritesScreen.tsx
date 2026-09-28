import { useState } from 'react';
import { AnimatePresence } from 'motion/react';
import { Bookmark, ChevronLeft, Heart } from 'lucide-react';
import { ANESTHESIA_DRUGS } from '../data/drugs';
import { DRUG_DETAILS } from '../data/drugDetails';
import { CLINICAL_TERMS } from '../data/clinicalTerms';
import { DrugDetailSheet } from './DrugDetailSheet';
import { BilingualLabel } from './BilingualLabel';
import { MixedDirectionText } from './MixedDirectionText';
import { MedicalSiteIcon } from './ui/MedicalSiteIcon';
import { VaporizerIcon } from './ui/VaporizerIcon';

interface FavoritesScreenProps {
  favorites: Set<string>;
  onToggleFavorite: (id: string) => void;
  onExplore: () => void;
}

export function FavoritesScreen({ favorites, onToggleFavorite, onExplore }: FavoritesScreenProps) {
  const [selectedDrugId, setSelectedDrugId] = useState<string | null>(null);
  const drugs = ANESTHESIA_DRUGS.filter((drug) => favorites.has('drug:' + drug.id));
  const terms = CLINICAL_TERMS.filter((term) => favorites.has('term:' + term.id));
  const total = drugs.length + terms.length;

  return (
    <div className="space-y-5">
      <section className="overflow-hidden rounded-[26px] border border-[#DCE5EA] bg-[linear-gradient(105deg,#F7F0DE_0%,#F5F8FA_55%,#E8EEF3_100%)] shadow-[0_12px_28px_rgba(16,45,79,0.07)]">
        <div className="grid min-h-[165px] grid-cols-[1.3fr_.7fr]">
          <div className="flex flex-col justify-center p-4 text-right">
            <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-white/80 bg-white/80 px-2.5 py-1 text-[9px] font-black text-[#8A6426]">
              <Bookmark size={12} /> المحفوظات
            </span>
            <h2 className="mt-3 text-xl font-black text-[#183149]">كل المهم بمكان واحد</h2>
            <p className="mt-1.5 text-[11px] font-semibold leading-5 text-[#5F7280]">الأدوية والمصطلحات التي تحفظها تبقى جاهزة للرجوع السريع.</p>
            <div className="mt-3 text-[10px] font-black text-[#315672]">{total} عنصر محفوظ</div>
          </div>

          <div className="relative grid place-items-center border-r border-white/70 bg-white/20">
            <div className="grid h-20 w-20 place-items-center rounded-[24px] border border-white/80 bg-white/75 text-[#173A63] shadow-[0_12px_24px_rgba(23,58,99,0.09)]">
              <Heart size={38} strokeWidth={1.8} />
            </div>
          </div>
        </div>
      </section>

      {drugs.length === 0 && terms.length === 0 ? (
        <section className="overflow-hidden rounded-[24px] border border-[#E4D8C0] bg-[#FAF6EC] p-5 text-center">
          <div className="mx-auto grid h-16 w-16 place-items-center rounded-[20px] border border-white bg-white/90 text-[#9A7122] shadow-[0_9px_20px_rgba(138,100,38,0.08)]">
            <MedicalSiteIcon name="saved" size={34} />
          </div>
          <h3 className="mt-4 text-[15px] font-black text-[#183149]">ما عندك محفوظات بعد</h3>
          <p className="mx-auto mt-2 max-w-sm text-[11px] font-semibold leading-5 text-[#5F7280]">افتح الدليل واحفظ أي دواء أو مصطلح تحتاج ترجعله بسرعة أثناء الدراسة.</p>
          <button
            type="button"
            onClick={onExplore}
            className="mx-auto mt-4 inline-flex min-h-11 items-center gap-2 rounded-[14px] bg-[#173A63] px-4 text-[11px] font-black text-white active:bg-[#102D4F]"
          >
            استكشف الدليل <ChevronLeft size={16} />
          </button>
        </section>
      ) : (
        <div className="space-y-3">
          {drugs.map((drug) => (
            <article
              key={drug.id}
              className="flex w-full items-center gap-3 rounded-[22px] border border-[#DCE5EA] bg-[#F7F9FA] p-3.5"
            >
              <button
                type="button"
                onClick={() => onToggleFavorite('drug:' + drug.id)}
                className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-[#CCA039]/45 bg-[#CCA039]/12 text-[#9B7420] outline-none focus-visible:ring-2 focus-visible:ring-[#CCA039]/55"
                aria-label={`إزالة ${drug.ar} من المحفوظات`}
                title="إزالة من المحفوظات"
              >
                <MedicalSiteIcon name="saved" size={25} />
              </button>

              <button
                type="button"
                onClick={() => setSelectedDrugId(drug.id)}
                className="flex min-h-11 min-w-0 flex-1 items-center justify-end gap-3 rounded-xl text-right outline-none focus-visible:ring-2 focus-visible:ring-[#CCA039]/55"
              >
                <div className="min-w-0 flex-1">
                  <h3 className="truncate font-black text-[#183149]">{drug.ar}</h3>
                  <p className="mt-0.5 truncate text-xs text-[#526675]" dir="ltr">{drug.en}</p>
                  <p className="mt-1 text-[11px] font-bold text-[#315672]">افتح التفاصيل الدوائية</p>
                </div>
                {drug.classes.includes('inhalational') ? (
                  <VaporizerIcon size={26} />
                ) : (
                  <MedicalSiteIcon name="drugs" size={26} />
                )}
              </button>
            </article>
          ))}

          {terms.map((term) => (
            <article key={term.id} className="rounded-[22px] border border-[#DCE5EA] bg-[#F7F9FA] p-3.5">
              <div className="flex items-start gap-3">
                <button
                  type="button"
                  onClick={() => onToggleFavorite('term:' + term.id)}
                  className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-[#CCA039]/45 bg-[#CCA039]/12 text-[#9B7420] outline-none focus-visible:ring-2 focus-visible:ring-[#CCA039]/55"
                  aria-label={`إزالة ${term.ar} من المحفوظات`}
                  title="إزالة من المحفوظات"
                >
                  <MedicalSiteIcon name="saved" size={25} />
                </button>

                <div className="flex min-w-0 flex-1 items-start justify-end gap-3 text-right">
                  <div className="min-w-0 flex-1">
                    <h3 className="truncate font-black text-[#183149]">{term.ar}</h3>
                    <p className="mt-0.5 truncate text-xs text-[#526675]" dir="ltr">{term.abbr ? `${term.abbr} — ${term.en}` : term.en}</p>
                  </div>
                  <MedicalSiteIcon name={term.abbr ? 'abbreviations' : 'terms'} size={26} />
                </div>
              </div>

              <p className="mt-3 whitespace-pre-line text-[11px] leading-5 text-[#526675]">
                <MixedDirectionText text={term.definition} />
              </p>

              {term.clinicalNote && (
                <div className="mt-2 border-r-2 border-[#315672]/40 pr-2.5">
                  <BilingualLabel label="ملاحظة تخديرية | Clinical note" className="text-[11px] font-black text-[#315672]" />
                  <p className="mt-1 text-[11px] leading-5 text-[#5B6770]"><MixedDirectionText text={term.clinicalNote} /></p>
                </div>
              )}
            </article>
          ))}
        </div>
      )}

      <AnimatePresence>
        {selectedDrugId && (() => {
          const selectedDrug = ANESTHESIA_DRUGS.find((item) => item.id === selectedDrugId);
          const detail = DRUG_DETAILS[selectedDrugId];
          if (!selectedDrug || !detail) return null;

          return (
            <DrugDetailSheet
              drug={selectedDrug}
              detail={detail}
              onClose={() => setSelectedDrugId(null)}
            />
          );
        })()}
      </AnimatePresence>
    </div>
  );
}
