import { AnimatePresence, motion } from 'motion/react';
import { Heart, MagnifyingGlass, SpeakerHigh } from '@phosphor-icons/react';
import { ANESTHESIA_DRUGS, DRUG_CLASS_LABELS, DRUG_FILTERS, type DrugClass } from '../data/drugs';
import { DRUG_DETAILS } from '../data/drugDetails';
import { DrugDetailSheet } from './DrugDetailSheet';
import { useMemo, useState } from 'react';
import { MedicinesHealthIcon } from './MedicalIcons';
import { playPronunciation } from '../utils/speech';

interface DrugDirectoryProps {
  favorites: Set<string>;
  onToggleFavorite: (id: string) => void;
}

export function DrugDirectory({ favorites, onToggleFavorite }: DrugDirectoryProps) {
  const [classification, setClassification] = useState<'all' | DrugClass>('all');
  const [query, setQuery] = useState('');
  const [selectedDrugId, setSelectedDrugId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return ANESTHESIA_DRUGS.filter((drug) => {
      const matchesCategory = classification === 'all' || drug.classes.includes(classification);
      const matchesQuery =
        !q ||
        [drug.en, drug.ar, drug.categoryAr, drug.short, ...drug.tags].some((value) =>
          value.toLowerCase().includes(q)
        );
      return matchesCategory && matchesQuery;
    });
  }, [classification, query]);

  return (
    <div className="space-y-3">
      <div className="relative">
        <MagnifyingGlass size={18} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#6C4AA5]" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="ابحث عن دواء..."
          className="h-11 w-full rounded-xl border border-[#DCCFEB] bg-white pr-10 pl-3 text-sm text-[#3D3348] outline-none placeholder:text-[#9B90A4] focus:border-[#A78AC8]"
        />
      </div>

      <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 scrollbar-none">
        {DRUG_FILTERS.map((item) => {
          const active = classification === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setClassification(item.id as 'all' | DrugClass)}
              className={
                'whitespace-nowrap rounded-full border px-3 py-1.5 text-[10px] font-bold transition ' +
                (active
                  ? 'border-[#6C4AA5] bg-[#6C4AA5] text-[#0A2036]'
                  : 'border-[#6C4AA5]/12 bg-[#F7F2FB] text-[#94A4B2]')
              }
            >
              {item.label}
            </button>
          );
        })}
      </div>

      <p className="px-1 text-[10px] text-[#81748A]">{filtered.length} دواء</p>

      <div className="space-y-2">
        {filtered.map((drug) => {
          const favoriteId = 'drug:' + drug.id;
          const isFavorite = favorites.has(favoriteId);
          return (
            <motion.article
              layout
              key={drug.id}
              className="rounded-[17px] border border-[#E3D8EE] bg-[#F7F2FB] p-3.5"
            >
              <div className="flex items-start gap-3">
                <div className="flex shrink-0 gap-1">
                  <button
                    onClick={() => playPronunciation('drugs', drug.id)}
                    className="grid h-8 w-8 place-items-center rounded-lg border border-[#6C4AA5]/12 bg-[#6C4AA5]/7 text-[#6C4AA5]"
                    title="نطق اسم الدواء"
                  >
                    <SpeakerHigh size={16} />
                  </button>
                  <button
                    onClick={() => onToggleFavorite(favoriteId)}
                    className={
                      'grid h-8 w-8 place-items-center rounded-lg border ' +
                      (isFavorite
                        ? 'border-[#6C4AA5]/30 bg-[#6C4AA5]/12 text-[#6C4AA5]'
                        : 'border-[#E5DAEE] bg-white/70 text-[#8B7C97]')
                    }
                    title="حفظ"
                  >
                    <Heart size={16} weight={isFavorite ? 'fill' : 'regular'} />
                  </button>
                </div>

                <div className="flex flex-1 items-start justify-end gap-3 text-right">
                  <div>
                    <h3 className="text-sm font-black text-[#34293F]" dir="ltr">{drug.en}</h3>
                    <p className="mt-0.5 text-xs font-bold text-[#655A6F]">{drug.ar}</p>
                    <span className="mt-2 inline-flex rounded-full bg-[#6C4AA5]/8 px-2.5 py-0.5 text-[9px] font-bold text-[#6C4AA5]">
                      {drug.classes.map((item) => DRUG_CLASS_LABELS[item]).join(' • ')}
                    </span>
                  </div>
                  <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-[#6C4AA5]/12 bg-[#6C4AA5]/7 text-[#6C4AA5]">
                    <MedicinesHealthIcon className="h-6 w-6" />
                  </div>
                </div>
              </div>
              <p className="mt-3 text-[10px] leading-5 text-[#766C7E]">{drug.short}</p>
              {DRUG_DETAILS[drug.id] && (
                <button
                  onClick={() => setSelectedDrugId(drug.id)}
                  className="mt-3 flex w-full items-center justify-between border-t border-[#E5DAEE] pt-2.5 text-[10px] font-black text-[#6C4AA5]"
                >
                  <span className="text-[#667C8E]">الاستخدام • الموانع • التحذيرات</span>
                  <span>التفاصيل الدوائية</span>
                </button>
              )}
            </motion.article>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="rounded-[18px] border border-dashed border-[#6C4AA5]/20 p-7 text-center text-xs text-[#718598]">
          ماكو دواء مطابق للبحث حالياً.
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
