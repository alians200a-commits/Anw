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
            <button
              key={drug.id}
              onClick={() => onToggleFavorite('drug:' + drug.id)}
              className="flex w-full items-center justify-between rounded-[22px] border border-[#E3D8EE] bg-[#F7F2FB] p-4 text-right"
            >
              <Heart className="h-4 w-4 text-[#6C4AA5]" fill="currentColor" />
              <div className="flex flex-1 items-center justify-end gap-3">
                <div>
                  <h3 className="font-black text-[#34293F]" dir="ltr">{drug.en}</h3>
                  <p className="text-xs text-[#746B7A]">{drug.ar}</p>
                </div>
                <Pill className="h-5 w-5 text-[#6C4AA5]" />
              </div>
            </button>
          ))}

          {terms.map((term) => (
            <button
              key={term.id}
              onClick={() => onToggleFavorite('term:' + term.id)}
              className="flex w-full items-center justify-between rounded-[22px] border border-[#E3D8EE] bg-[#F7F2FB] p-4 text-right"
            >
              <Heart className="h-4 w-4 text-[#6C4AA5]" fill="currentColor" />
              <div className="flex flex-1 items-center justify-end gap-3">
                <div>
                  <h3 className="font-black text-[#34293F]" dir="ltr">{term.abbr || term.en}</h3>
                  <p className="text-xs text-[#746B7A]">{term.ar}</p>
                </div>
                <BookOpenText className="h-5 w-5 text-[#6C4AA5]" />
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
