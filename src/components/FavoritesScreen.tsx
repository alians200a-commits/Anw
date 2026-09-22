import { useState } from 'react';
import { AnimatePresence } from 'motion/react';
import { ANESTHESIA_DRUGS } from '../data/drugs';
import { DRUG_DETAILS } from '../data/drugDetails';
import { CLINICAL_TERMS } from '../data/clinicalTerms';
import { DrugDetailSheet } from './DrugDetailSheet';
import { BilingualLabel } from './BilingualLabel';
import { MixedDirectionText } from './MixedDirectionText';
import { MedicalSiteIcon } from './ui/MedicalSiteIcon';

interface FavoritesScreenProps {
  favorites: Set<string>;
  onToggleFavorite: (id: string) => void;
}

export function FavoritesScreen({ favorites, onToggleFavorite }: FavoritesScreenProps) {
  const [selectedDrugId, setSelectedDrugId] = useState<string | null>(null);
  const drugs = ANESTHESIA_DRUGS.filter((drug) => favorites.has('drug:' + drug.id));
  const terms = CLINICAL_TERMS.filter((term) => favorites.has('term:' + term.id));

  return (
    <div className="space-y-5">
      <section>
        <h2 className="text-2xl font-black text-[#183149]">المحفوظات</h2>
        <p className="mt-2 text-sm text-[#5F7280]">العناصر التي حفظتها تظهر هنا للرجوع إليها بسرعة.</p>
      </section>

      {drugs.length === 0 && terms.length === 0 ? (
        <div className="rounded-[28px] border border-dashed border-[#DCE4EA] bg-[#F8FAFB] p-8 text-center">
          <div className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-[#315672]/10 text-[#315672]">
            <MedicalSiteIcon name="saved" play size={32} />
          </div>
          <h3 className="mt-4 font-black text-[#183149]">لم تحفظ أي عنصر بعد</h3>
          <p className="mt-2 text-xs leading-5 text-[#5F7280]">اضغط على رمز القلب في أي دواء أو مصطلح ليظهر هنا.</p>
        </div>
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
                className="group grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-[#CCA039]/45 bg-[#CCA039]/12 text-[#9B7420] outline-none transition focus-visible:ring-2 focus-visible:ring-[#CCA039]/55"
                aria-label={`إزالة ${drug.ar} من المحفوظات`}
                title="إزالة من المحفوظات"
              >
                <MedicalSiteIcon name="saved" play size={25} />
              </button>

              <button
                type="button"
                onClick={() => setSelectedDrugId(drug.id)}
                className="group flex min-h-11 min-w-0 flex-1 items-center justify-end gap-3 rounded-xl text-right outline-none focus-visible:ring-2 focus-visible:ring-[#CCA039]/55"
              >
                <div className="min-w-0 flex-1">
                  <h3 className="truncate font-black text-[#183149]">{drug.ar}</h3>
                  <p className="mt-0.5 text-xs text-[#526675]" dir="ltr">{drug.en}</p>
                  <p className="mt-1 text-[11px] font-bold text-[#315672]">افتح التفاصيل الدوائية</p>
                </div>
                <MedicalSiteIcon
                  name={drug.classes.includes('inhalational') ? 'inhalational' : 'drugs'}
                  size={26}
                />
              </button>
            </article>
          ))}

          {terms.map((term) => (
            <article
              key={term.id}
              className="rounded-[22px] border border-[#DCE5EA] bg-[#F7F9FA] p-3.5"
            >
              <div className="flex items-start gap-3">
                <button
                  type="button"
                  onClick={() => onToggleFavorite('term:' + term.id)}
                  className="group grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-[#CCA039]/45 bg-[#CCA039]/12 text-[#9B7420] outline-none transition focus-visible:ring-2 focus-visible:ring-[#CCA039]/55"
                  aria-label={`إزالة ${term.ar} من المحفوظات`}
                  title="إزالة من المحفوظات"
                >
                  <MedicalSiteIcon name="saved" play size={25} />
                </button>

                <div className="flex min-w-0 flex-1 items-start justify-end gap-3 text-right">
                  <div className="min-w-0 flex-1">
                    <h3 className="truncate font-black text-[#183149]">{term.ar}</h3>
                    <p className="mt-0.5 text-xs text-[#526675]" dir="ltr">{term.abbr ? `${term.abbr} — ${term.en}` : term.en}</p>
                  </div>
                  <MedicalSiteIcon
                    name={term.abbr ? 'abbreviations' : 'terms'}
                    size={26}
                  />
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