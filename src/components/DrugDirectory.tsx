import { motion } from 'motion/react';
import { Heart, MagnifyingGlass, SpeakerHigh } from '@phosphor-icons/react';
import { ANESTHESIA_DRUGS, DRUG_CATEGORIES, type DrugCategory } from '../data/drugs';
import { useMemo, useState } from 'react';
import { MedicinesHealthIcon } from './MedicalIcons';
import { speakTerm } from '../utils/speech';

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
    <div className="space-y-3">
      <div className="relative">
        <MagnifyingGlass size={18} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#CCA039]" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="ابحث عن دواء..."
          className="h-11 w-full rounded-xl border border-[#CCA039]/12 bg-[#0D2741] pr-10 pl-3 text-sm text-[#EEE8D6] outline-none placeholder:text-[#66798A] focus:border-[#CCA039]/40"
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
                'whitespace-nowrap rounded-full border px-3 py-1.5 text-[10px] font-bold transition ' +
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

      <p className="px-1 text-[10px] text-[#71879A]">{filtered.length} دواء</p>

      <div className="space-y-2">
        {filtered.map((drug) => {
          const favoriteId = 'drug:' + drug.id;
          const isFavorite = favorites.has(favoriteId);
          return (
            <motion.article
              layout
              key={drug.id}
              className="rounded-[17px] border border-[#CCA039]/10 bg-[#0D2741] p-3.5"
            >
              <div className="flex items-start gap-3">
                <div className="flex shrink-0 gap-1">
                  <button
                    onClick={() => speakTerm(drug.en)}
                    className="grid h-8 w-8 place-items-center rounded-lg border border-[#CCA039]/12 bg-[#CCA039]/7 text-[#CCA039]"
                    title="نطق اسم الدواء"
                  >
                    <SpeakerHigh size={16} />
                  </button>
                  <button
                    onClick={() => onToggleFavorite(favoriteId)}
                    className={
                      'grid h-8 w-8 place-items-center rounded-lg border ' +
                      (isFavorite
                        ? 'border-[#CCA039]/30 bg-[#CCA039]/12 text-[#CCA039]'
                        : 'border-white/5 bg-white/[0.025] text-[#6D8193]')
                    }
                    title="حفظ"
                  >
                    <Heart size={16} weight={isFavorite ? 'fill' : 'regular'} />
                  </button>
                </div>

                <div className="flex flex-1 items-start justify-end gap-3 text-right">
                  <div>
                    <h3 className="text-sm font-black text-[#EEE8D6]" dir="ltr">{drug.en}</h3>
                    <p className="mt-0.5 text-xs font-bold text-[#B4BEC7]">{drug.ar}</p>
                    <span className="mt-2 inline-flex rounded-full bg-[#CCA039]/8 px-2.5 py-0.5 text-[9px] font-bold text-[#CCA039]">
                      {drug.categoryAr}
                    </span>
                  </div>
                  <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-[#CCA039]/12 bg-[#CCA039]/7 text-[#CCA039]">
                    <MedicinesHealthIcon className="h-6 w-6" />
                  </div>
                </div>
              </div>
              <p className="mt-3 text-[10px] leading-5 text-[#8294A4]">{drug.short}</p>
            </motion.article>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="rounded-[18px] border border-dashed border-[#CCA039]/20 p-7 text-center text-xs text-[#718598]">
          ماكو دواء مطابق للبحث حالياً.
        </div>
      )}
    </div>
  );
}
