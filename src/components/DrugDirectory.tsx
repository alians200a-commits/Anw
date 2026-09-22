import { AnimatePresence, motion } from 'motion/react';
import { Heart, MagnifyingGlass, SpeakerHigh } from '@phosphor-icons/react';
import {
  ANESTHESIA_DRUGS,
  DRUG_CLASS_LABELS,
  DRUG_FILTERS,
  type DrugClass
} from '../data/drugs';
import { DRUG_DETAILS } from '../data/drugDetails';
import { DrugDetailSheet } from './DrugDetailSheet';
import { MixedDirectionText } from './MixedDirectionText';
import { useEffect, useMemo, useState } from 'react';
import { MedicinesHealthIcon } from './MedicalIcons';
import { playPronunciation } from '../utils/speech';
import {
  NotificationStackMenu,
  type StackMenuItem
} from './ui/NotificationStackMenu';
import { AnimatedIcon } from './ui/AnimatedIcon';
import { DALEELI_ANIMATED_ASSETS } from './ui/RemoteAnimatedAssetIcon';

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
  const [classification, setClassification] = useState<'all' | DrugClass>(
    initialClassification
  );
  const [query, setQuery] = useState(initialQuery);
  const [selectedDrugId, setSelectedDrugId] = useState<string | null>(null);

  useEffect(() => {
    setClassification(initialClassification);
  }, [initialClassification]);

  useEffect(() => {
    setQuery(initialQuery);

    const normalized = initialQuery.trim().toLowerCase();
    if (!normalized) {
      setSelectedDrugId(null);
      return;
    }

    const exact = ANESTHESIA_DRUGS.find(
      (drug) =>
        drug.en.toLowerCase() === normalized ||
        drug.ar.toLowerCase() === normalized
    );

    if (exact && DRUG_DETAILS[exact.id]) setSelectedDrugId(exact.id);
  }, [initialQuery]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return ANESTHESIA_DRUGS.filter((drug) => {
      const matchesCategory =
        classification === 'all' || drug.classes.includes(classification);
      const matchesQuery =
        !q ||
        [drug.en, drug.ar, drug.categoryAr, drug.short, ...drug.tags].some(
          (value) => value.toLowerCase().includes(q)
        );
      return matchesCategory && matchesQuery;
    });
  }, [classification, query]);

  const currentFilter =
    DRUG_FILTERS.find((item) => item.id === classification)?.label ?? 'الكل';

  const filterItems: StackMenuItem[] = DRUG_FILTERS.map((item) => ({
    id: item.id,
    title: item.label,
    description: item.id === 'all' ? 'جميع الأدوية' : 'تصفية حسب هذا التصنيف',
    leading: <MedicinesHealthIcon className="h-5 w-5" />,
    onSelect: () => setClassification(item.id as 'all' | DrugClass)
  }));

  return (
    <div className="space-y-3">
      <div className="relative">
        <MagnifyingGlass
          size={18}
          weight="bold"
          className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#526F85]"
        />
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          aria-label="البحث في الأدوية"
          dir="auto"
          placeholder="ابحث عن دواء..."
          className="h-11 w-full rounded-xl border border-[#DCE4EA] bg-white pr-10 pl-3 text-sm font-semibold text-[#183149] outline-none placeholder:text-[#66737F] focus:border-[#B58B2A] focus:ring-2 focus:ring-[#CCA039]/15"
        />
      </div>

      <NotificationStackMenu
        title={currentFilter}
        description="تصنيف الأدوية"
        icon={<MedicinesHealthIcon className="h-[22px] w-[22px]" />}
        animatedIconSrc={DALEELI_ANIMATED_ASSETS.medicine}
        items={filterItems}
        selectedId={classification}
      />

      <div className="px-1 text-left">
        <p className="text-[11px] font-semibold text-[#5F7280]">{filtered.length} دواء</p>
      </div>

      <div className="space-y-2">
        {filtered.map((drug) => {
          const favoriteId = 'drug:' + drug.id;
          const isFavorite = favorites.has(favoriteId);

          return (
            <motion.article
              layout
              key={drug.id}
              className="rounded-[18px] border border-[#DCE5EA] bg-[#F7F9FA] p-3.5"
            >
              <div className="flex items-start gap-3">
                <div className="flex shrink-0 gap-1.5">
                  <button
                    type="button"
                    onClick={() => playPronunciation('drugs', drug.id)}
                    className="group grid h-11 w-11 place-items-center rounded-xl border border-[#D7E2E9] bg-white text-[#315672] outline-none transition active:bg-[#EEF3F6] focus-visible:ring-2 focus-visible:ring-[#CCA039]/55"
                    title="نطق اسم الدواء"
                    aria-label={'نطق اسم ' + drug.ar}
                  >
                    <AnimatedIcon variant="tilt"><SpeakerHigh size={19} /></AnimatedIcon>
                  </button>
                  <button
                    type="button"
                    onClick={() => onToggleFavorite(favoriteId)}
                    className={
                      'group grid h-11 w-11 place-items-center rounded-xl border outline-none transition focus-visible:ring-2 focus-visible:ring-[#CCA039]/55 ' +
                      (isFavorite
                        ? 'border-[#CCA039]/45 bg-[#CCA039]/12 text-[#9B7420]'
                        : 'border-[#D7E2E9] bg-white text-[#5F7280] active:bg-[#EEF3F6]')
                    }
                    title="حفظ"
                    aria-label={isFavorite ? 'إزالة من المحفوظات' : 'حفظ الدواء'}
                  >
                    <AnimatedIcon active={isFavorite} variant="pulse"><Heart size={19} weight={isFavorite ? 'fill' : 'regular'} /></AnimatedIcon>
                  </button>
                </div>

                <div className="flex flex-1 items-start justify-end gap-3 text-right">
                  <div className="min-w-0">
                    <h3 className="text-sm font-black text-[#183149]">{drug.ar}</h3>
                    <p className="mt-0.5 text-xs font-bold text-[#526675]" dir="ltr">{drug.en}</p>
                    <span className="mt-2 inline-flex max-w-full rounded-full bg-[#EAF0F4] px-2.5 py-1 text-[11px] font-bold leading-4 text-[#405E75]">
                      {drug.classes
                        .map((item) => DRUG_CLASS_LABELS[item])
                        .join(' • ')}
                    </span>
                  </div>
                  <div className="grid h-11 w-11 shrink-0 place-items-center rounded-[14px] border border-[#D7E2E9] bg-[#EEF3F6] text-[#315672]">
                    <AnimatedIcon variant="pop"><MedicinesHealthIcon className="h-6 w-6" /></AnimatedIcon>
                  </div>
                </div>
              </div>

              <p className="mt-3 text-[11px] leading-5 text-[#526675]">
                <MixedDirectionText text={drug.short} />
              </p>

              {DRUG_DETAILS[drug.id] && (
                <button
                  type="button"
                  onClick={() => setSelectedDrugId(drug.id)}
                  className="mt-2 flex min-h-11 w-full items-center justify-between border-t border-[#DDE6EB] pt-2 text-[11px] font-black text-[#315672] outline-none focus-visible:ring-2 focus-visible:ring-[#CCA039]/50"
                >
                  <span className="text-[#5F7280]">الاستخدام • الموانع • التحذيرات</span>
                  <span>التفاصيل الدوائية</span>
                </button>
              )}
            </motion.article>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="rounded-[18px] border border-dashed border-[#C9D6DF] bg-[#F8FAFB] p-7 text-center text-xs font-semibold text-[#5F7280]">
          ماكو دواء مطابق للبحث حالياً.
        </div>
      )}

      <AnimatePresence>
        {selectedDrugId &&
          (() => {
            const selectedDrug = ANESTHESIA_DRUGS.find(
              (item) => item.id === selectedDrugId
            );
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