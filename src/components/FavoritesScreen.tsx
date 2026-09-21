import { BookOpenText, Heart, Pill } from 'lucide-react';
import { ANESTHESIA_DRUGS } from '../data/drugs';
import { CLINICAL_TERMS } from '../data/clinicalTerms';

interface FavoritesScreenProps {
  favorites: Set<string>;
  onToggleFavorite: (id: string) => void;
}

export function FavoritesScreen({ favorites, onToggleFavorite }: FavoritesScreenProps) {
  const drugs = ANESTHESIA_DRUGS.filter((drug) => favorites.has('drug:' + drug.id));
  const terms = CLINICAL_TERMS.filter((term) => favorites.has('term:' + term.id));

  return (
    <div className="space-y-5">
      <section>
        <p className="text-xs font-bold text-[#CCA039]">SAVED</p>
        <h2 className="mt-1 text-2xl font-black text-[#EEE8D6]">المحفوظات</h2>
        <p className="mt-2 text-sm text-[#8EA0B0]">كل العناصر اللي علمت عليها ترجع لها من هنا.</p>
      </section>

      {drugs.length === 0 && terms.length === 0 ? (
        <div className="rounded-[28px] border border-dashed border-[#CCA039]/20 bg-[#0D2741]/50 p-8 text-center">
          <div className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-[#CCA039]/10 text-[#CCA039]">
            <Heart className="h-5 w-5" />
          </div>
          <h3 className="mt-4 font-black text-[#EEE8D6]">بعد ما حفظت أي عنصر</h3>
          <p className="mt-2 text-xs leading-5 text-[#7D90A0]">اضغط على القلب بأي دواء أو مصطلح حتى يظهر هنا.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {drugs.map((drug) => (
            <button
              key={drug.id}
              onClick={() => onToggleFavorite('drug:' + drug.id)}
              className="flex w-full items-center justify-between rounded-[22px] border border-[#CCA039]/10 bg-[#0D2741] p-4 text-right"
            >
              <Heart className="h-4 w-4 text-[#CCA039]" fill="currentColor" />
              <div className="flex flex-1 items-center justify-end gap-3">
                <div>
                  <h3 className="font-black text-[#EEE8D6]" dir="ltr">{drug.en}</h3>
                  <p className="text-xs text-[#889AA9]">{drug.ar}</p>
                </div>
                <Pill className="h-5 w-5 text-[#CCA039]" />
              </div>
            </button>
          ))}

          {terms.map((term) => (
            <button
              key={term.id}
              onClick={() => onToggleFavorite('term:' + term.id)}
              className="flex w-full items-center justify-between rounded-[22px] border border-[#CCA039]/10 bg-[#0D2741] p-4 text-right"
            >
              <Heart className="h-4 w-4 text-[#CCA039]" fill="currentColor" />
              <div className="flex flex-1 items-center justify-end gap-3">
                <div>
                  <h3 className="font-black text-[#EEE8D6]" dir="ltr">{term.abbr || term.en}</h3>
                  <p className="text-xs text-[#889AA9]">{term.ar}</p>
                </div>
                <BookOpenText className="h-5 w-5 text-[#CCA039]" />
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
