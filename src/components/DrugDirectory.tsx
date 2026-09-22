import { AnimatePresence, motion } from 'motion/react';
import { CaretDown, Heart, MagnifyingGlass, SpeakerHigh } from '@phosphor-icons/react';
import { ANESTHESIA_DRUGS, DRUG_CLASS_LABELS, DRUG_FILTERS, type DrugClass } from '../data/drugs';
import { DRUG_DETAILS } from '../data/drugDetails';
import { DrugDetailSheet } from './DrugDetailSheet';
import { useEffect, useMemo, useState } from 'react';
import { MedicinesHealthIcon } from './MedicalIcons';
import { playPronunciation } from '../utils/speech';

interface DrugDirectoryProps {
  favorites: Set<string>;
  onToggleFavorite: (id: string) => void;
  initialClassification?: 'all' | DrugClass;
  initialQuery?: string;
}

export function DrugDirectory({
  favorites,
  onToggleFavorite,
  initialClassification = 'all',
  initialQuery = ''
}: DrugDirectoryProps) {
  const [classification, setClassification] = useState<'all' | DrugClass>(initialClassification);
  const [filterOpen, setFilterOpen] = useState(false);
  const [query, setQuery] = useState(initialQuery);
  const [selectedDrugId, setSelectedDrugId] = useState<string | null>(null);

  useEffect(() => {
    setClassification(initialClassification);
  }, [initialClassification]);

  useEffect(() => {
    setQuery(initialQuery);
  }, [initialQuery]);

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

      <div className="overflow-hidden rounded-2xl border border-[#E3D8EE] bg-[#F7F2FB]">
        <button
          type="button"
          onClick={() => setFilterOpen((value) => !value)}
          className="flex w-full items-center justify-between px-3.5 py-3"
        >
          <CaretDown
            size={16}
            weight="bold"
            className={'text-[#78658D] transition ' + (filterOpen ? 'rotate-180' : '')}
          />
          <div className="text-right">
            <p className="text-[9px] font-bold text-[#8A7C96]">تصنيف الأدوية</p>
            <p className="mt-0.5 text-xs font-black text-[#4B3B5B]">
              {DRUG_FILTERS.find((item) => item.id === classification)?.label ?? 'الكل'}
            </p>
          </div>
        </button>

        {filterOpen && (
          <div className="grid grid-cols-2 gap-1.5 border-t border-[#E8DEEF] p-2.5 sm:grid-cols-3">
            {DRUG_FILTERS.map((item) => {
              const active = classification === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    setClassification(item.id as 'all' | DrugClass);
                    setFilterOpen(false);
                  }}
                  className={
                    'rounded-xl border px-3 py-2 text-[10px] font-bold transition ' +
                    (active
                      ? 'border-[#6C4AA5] bg-[#6C4AA5] text-white'
                      : 'border-[#E5DAEE] bg-white text-[#675B71] active:bg-[#F0E8F7]')
                  }
                >
                  {item.label}
                </button>
              );
            })}
          </div>
        )}
      </div>

      <div className="flex items-center justify-between px-1">
        <span className="rounded-full bg-[#F3EDF8] px-2 py-0.5 text-[9px] font-bold text-[#6C4AA5]">
          {DRUG_FILTERS.find((item) => item.id === classification)?.label ?? 'الكل'}
        </span>
        <p className="text-[10px] text-[#81748A]">{filtered.length} دواء</p>
      </div>

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
