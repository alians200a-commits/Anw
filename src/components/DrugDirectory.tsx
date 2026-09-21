import { motion } from 'motion/react';
import { Heart, Pill, Search } from 'lucide-react';
import { ANESTHESIA_DRUGS, DRUG_CATEGORIES, type DrugCategory } from '../data/drugs';
import { useMemo, useState } from 'react';

interface DrugDirectoryProps {
  favorites: Set<string>;
  onToggleFavorite: (id: string) => void;
}

export function DrugDirectory({ favorites, onToggleFavorite }: DrugDirectoryProps) {
  const [category, setCategory] = useState<'all' | DrugCategory>('all');
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return ANESTHESIA_DRUGS.filter((drug) => {
      const matchesCategory = category === 'all' || drug.category === category;
      const matchesQuery =
        !q ||
        [drug.en, drug.ar, drug.categoryAr, drug.short, ...drug.tags].some((value) =>
          value.toLowerCase().includes(q)
        );
      return matchesCategory && matchesQuery;
    });
  }, [category, query]);

  return (
    <div className="space-y-5">
      <section>
        <p className="text-xs font-bold text-[#CCA039]">DRUG DIRECTORY</p>
        <h2 className="mt-1 text-2xl font-black text-[#EEE8D6]">دليل أدوية التخدير</h2>
        <p className="mt-2 text-sm leading-6 text-[#8EA0B0]">
          وصول سريع ومنظم للأسماء والتصنيفات الأساسية. التفاصيل المتقدمة نضيفها بالمرحلة القادمة.
        </p>
      </section>

      <div className="relative">
        <Search className="absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#CCA039]" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="ابحث عن دواء..."
          className="h-12 w-full rounded-2xl border border-[#CCA039]/12 bg-[#0D2741] pr-11 pl-4 text-sm text-[#EEE8D6] outline-none placeholder:text-[#66798A] focus:border-[#CCA039]/40"
        />
      </div>

      <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 scrollbar-none">
        {DRUG_CATEGORIES.map((item) => {
          const active = category === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setCategory(item.id as 'all' | DrugCategory)}
              className={
                'whitespace-nowrap rounded-full border px-3.5 py-2 text-xs font-bold transition ' +
                (active
                  ? 'border-[#CCA039] bg-[#CCA039] text-[#0A2036]'
                  : 'border-[#CCA039]/12 bg-[#0D2741] text-[#94A4B2]')
              }
            >
              {item.label}
            </button>
          );
        })}
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {filtered.map((drug) => {
          const favoriteId = 'drug:' + drug.id;
          const isFavorite = favorites.has(favoriteId);
          return (
            <motion.article
              layout
              key={drug.id}
              className="rounded-[24px] border border-[#CCA039]/10 bg-[#0D2741] p-4"
            >
              <div className="flex items-start justify-between gap-3">
                <button
                  onClick={() => onToggleFavorite(favoriteId)}
                  className={
                    'grid h-9 w-9 shrink-0 place-items-center rounded-xl border transition ' +
                    (isFavorite
                      ? 'border-[#CCA039]/30 bg-[#CCA039]/15 text-[#CCA039]'
                      : 'border-white/5 bg-white/[0.03] text-[#6D8193]')
                  }
                >
                  <Heart className="h-4 w-4" fill={isFavorite ? 'currentColor' : 'none'} />
                </button>

                <div className="flex flex-1 items-start justify-end gap-3 text-right">
                  <div>
                    <h3 className="text-base font-black text-[#EEE8D6]" dir="ltr">{drug.en}</h3>
                    <p className="mt-0.5 text-sm font-bold text-[#B4BEC7]">{drug.ar}</p>
                    <span className="mt-2 inline-flex rounded-full bg-[#CCA039]/10 px-2.5 py-1 text-[10px] font-bold text-[#CCA039]">
                      {drug.categoryAr}
                    </span>
                  </div>
                  <div className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl border border-[#CCA039]/15 bg-[#CCA039]/10 text-[#CCA039]">
                    <Pill className="h-5 w-5" />
                  </div>
                </div>
              </div>
              <p className="mt-4 text-xs leading-6 text-[#8294A4]">{drug.short}</p>
            </motion.article>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="rounded-[24px] border border-dashed border-[#CCA039]/20 p-8 text-center text-sm text-[#718598]">
          ماكو دواء مطابق للبحث حالياً.
        </div>
      )}
    </div>
  );
}
