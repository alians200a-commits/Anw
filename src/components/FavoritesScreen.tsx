import { useState } from 'react';
import { AnimatePresence } from 'motion/react';
import { BookOpenText, Heart, Pill } from 'lucide-react';
import { ANESTHESIA_DRUGS } from '../data/drugs';
import { DRUG_DETAILS } from '../data/drugDetails';
import { CLINICAL_TERMS } from '../data/clinicalTerms';
import { DrugDetailSheet } from './DrugDetailSheet';
import { BilingualLabel } from './BilingualLabel';

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
        <p className="text-xs font-bold text-[#6C4AA5]">SAVED</p>
        <h2 className="mt-1 text-2xl font-black text-[#34293F]">المحفوظات</h2>
        <p className="mt-2 text-sm text-[#7B7283]">كل العناصر اللي علمت عليها ترجع لها من هنا.</p>
      </section>

      {drugs.length === 0 && terms.length === 0 ? (
        <div className="rounded-[28px] border border-dashed border-[#DCCFEB] bg-[#FBF9FD] p-8 text-center">
          <div className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-[#6C4AA5]/10 text-[#6C4AA5]">
            <Heart className="h-5 w-5" />
          </div>
          <h3 className="mt-4 font-black text-[#34293F]">بعد ما حفظت أي عنصر</h3>
          <p className="mt-2 text-xs leading-5 text-[#81778A]">اضغط على القلب بأي دواء أو مصطلح حتى يظهر هنا.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {drugs.map((drug) => (
            <article
              key={drug.id}
              className="flex w-full items-center gap-3 rounded-[22px] border border-[#E3D8EE] bg-[#F7F2FB] p-3.5"
            >
              <button
                type="button"
                onClick={() => onToggleFavorite('drug:' + drug.id)}
                className="grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-[#6C4AA5]/20 bg-white/80 text-[#6C4AA5]"
                aria-label={`إزالة ${drug.ar} من المحفوظات`}
                title="إزالة من المحفوظات"
              >
                <Heart className="h-4 w-4" fill="currentColor" />
              </button>

              <button
                type="button"
                onClick={() => setSelectedDrugId(drug.id)}
                className="flex min-w-0 flex-1 items-center justify-end gap-3 text-right"
              >
                <div className="min-w-0 flex-1">
                  <h3 className="truncate font-black text-[#34293F]">{drug.ar}</h3>
                  <p className="mt-0.5 text-xs text-[#746B7A]" dir="ltr">{drug.en}</p>
                  <p className="mt-1 text-[9px] font-bold text-[#6C4AA5]">افتح التفاصيل الدوائية</p>
                </div>
                <Pill className="h-5 w-5 shrink-0 text-[#6C4AA5]" />
              </button>
            </article>
          ))}

          {terms.map((term) => (
            <article
              key={term.id}
              className="rounded-[22px] border border-[#E3D8EE] bg-[#F7F2FB] p-3.5"
            >
              <div className="flex items-start gap-3">
                <button
                  type="button"
                  onClick={() => onToggleFavorite('term:' + term.id)}
                  className="grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-[#6C4AA5]/20 bg-white/80 text-[#6C4AA5]"
                  aria-label={`إزالة ${term.ar} من المحفوظات`}
                  title="إزالة من المحفوظات"
                >
                  <Heart className="h-4 w-4" fill="currentColor" />
                </button>

                <div className="flex min-w-0 flex-1 items-start justify-end gap-3 text-right">
                  <div className="min-w-0 flex-1">
                    <h3 className="truncate font-black text-[#34293F]">{term.ar}</h3>
                    <p className="mt-0.5 text-xs text-[#746B7A]" dir="ltr">{term.abbr ? `${term.abbr} — ${term.en}` : term.en}</p>
                  </div>
                  <BookOpenText className="h-5 w-5 shrink-0 text-[#6C4AA5]" />
                </div>
              </div>

              <p className="mt-3 whitespace-pre-line text-[10px] leading-5 text-[#766D7E]">
                {term.definition}
              </p>

              {term.clinicalNote && (
                <div className="mt-2 border-r-2 border-[#6C4AA5]/40 pr-2.5">
                  <BilingualLabel label="ملاحظة تخديرية | Clinical note" className="text-[9px] font-black text-[#6C4AA5]" />
                  <p className="mt-1 text-[10px] leading-5 text-[#756B7D]">{term.clinicalNote}</p>
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
