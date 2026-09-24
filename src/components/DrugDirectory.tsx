import { AnimatePresence } from 'motion/react';
import { MagnifyingGlass, SpeakerHigh } from '@phosphor-icons/react';
import {
  DRUG_CLASS_LABELS,
  DRUG_FILTERS,
  type DrugClass
} from '../data/drugs';
import {
  loadPublishedDrugContent,
  localDrugContent,
  type RuntimeDrugContent
} from '../data/publishedDrugContent';
import { DrugDetailSheet } from './DrugDetailSheet';
import { MixedDirectionText } from './MixedDirectionText';
import { useEffect, useMemo, useState } from 'react';
import { playPronunciation } from '../utils/speech';
import {
  NotificationStackMenu,
  type StackMenuItem
} from './ui/NotificationStackMenu';
import { MedicalSiteIcon, type MedicalSiteIconName } from './ui/MedicalSiteIcon';
import { VaporizerIcon } from './ui/VaporizerIcon';

const drugClassIcon: Record<'all' | DrugClass, MedicalSiteIconName> = {
  all: 'drugs',
  intravenous: 'drugs',
  inhalational: 'inhalational',
  hypnotic: 'drugs',
  analgesic: 'drugs',
  sedative: 'drugs',
  'muscle-relaxant': 'drugs',
  antiemetic: 'drugs',
  emergency: 'monitoring',
  'local-anesthetic': 'drugs',
  reversal: 'drugs',
  vasopressor: 'monitoring',
  cardiovascular: 'monitoring',
  adjunct: 'drugs'
};

const visibleDrugFilters = DRUG_FILTERS.filter(
  (item) => item.id !== 'vasopressor'
);

function normalizeClassification(
  value: 'all' | DrugClass
): 'all' | DrugClass {
  return value === 'vasopressor' ? 'cardiovascular' : value;
}

function iconForDrug(classes: DrugClass[]): MedicalSiteIconName {
  if (
    classes.includes('cardiovascular') ||
    classes.includes('vasopressor') ||
    classes.includes('emergency')
  ) {
    return 'monitoring';
  }
  return 'drugs';
}

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
  const [classification, setClassification] = useState<'all' | DrugClass>(() =>
    normalizeClassification(initialClassification)
  );
  const [query, setQuery] = useState(initialQuery);
  const [selectedDrugId, setSelectedDrugId] = useState<string | null>(null);
  const [drugContent, setDrugContent] = useState<RuntimeDrugContent>(() =>
    localDrugContent()
  );

  useEffect(() => {
    let active = true;
    void loadPublishedDrugContent().then((content) => {
      if (active) setDrugContent(content);
    });
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    setClassification(normalizeClassification(initialClassification));
  }, [initialClassification]);

  useEffect(() => {
    setQuery(initialQuery);

    const normalized = initialQuery.trim().toLowerCase();
    if (!normalized) {
      setSelectedDrugId(null);
      return;
    }

    const exact = drugContent.drugs.find(
      (drug) =>
        drug.en.toLowerCase() === normalized ||
        drug.ar.toLowerCase() === normalized
    );

    if (exact && drugContent.details[exact.id]) setSelectedDrugId(exact.id);
  }, [initialQuery, drugContent]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return drugContent.drugs.filter((drug) => {
      const matchesCategory =
        classification === 'all' ||
        (classification === 'cardiovascular'
          ? drug.classes.includes('cardiovascular') ||
            drug.classes.includes('vasopressor')
          : drug.classes.includes(classification));
      const matchesQuery =
        !q ||
        [drug.en, drug.ar, drug.categoryAr, drug.short, ...drug.tags].some(
          (value) => value.toLowerCase().includes(q)
        );
      return matchesCategory && matchesQuery;
    });
  }, [classification, query, drugContent.drugs]);

  const currentFilter =
    visibleDrugFilters.find((item) => item.id === classification)?.label ?? 'الكل';

  const filterItems: StackMenuItem[] = visibleDrugFilters.map((item) => ({
    id: item.id,
    title: item.label,
    description: item.id === 'all' ? 'جميع الأدوية' : 'تصفية حسب هذا التصنيف',
    leading:
      item.id === 'inhalational' ? (
        <VaporizerIcon size={24} />
      ) : (
        <MedicalSiteIcon
          name={drugClassIcon[item.id as 'all' | DrugClass]}
          size={24}
        />
      ),
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
        icon={
          classification === 'inhalational' ? (
            <VaporizerIcon size={27} play />
          ) : (
            <MedicalSiteIcon
              name={drugClassIcon[classification]}
              size={27}
            />
          )
        }
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
          const coverImage = (drugContent.mediaByDrug[drug.id] ?? [])
            .filter((item) => !item.hidden)
            .sort((a, b) => a.order - b.order)
            .find((item) => item.placement === 'cover');
          const classLabel = drug.classes
            .map((item) => DRUG_CLASS_LABELS[item])
            .join(' • ');
          const isInhalational = drug.classes.includes('inhalational');

          return (
            <article
              key={drug.id}
              className="rounded-[18px] border border-[#DCE5EA] bg-[#F7F9FA] p-3.5"
            >
              <div className="flex items-start gap-2.5">
                <div className="flex shrink-0 gap-1.5">
                  <button
                    type="button"
                    onClick={() => playPronunciation('drugs', drug.id)}
                    className="group grid h-10 w-10 place-items-center rounded-xl border border-[#D7E2E9] bg-white text-[#315672] outline-none transition active:bg-[#EEF3F6] focus-visible:ring-2 focus-visible:ring-[#CCA039]/55"
                    title="نطق اسم الدواء"
                    aria-label={'نطق اسم ' + drug.ar}
                  >
                    <SpeakerHigh size={18} />
                  </button>
                  <button
                    type="button"
                    onClick={() => onToggleFavorite(favoriteId)}
                    className={
                      'group grid h-10 w-10 place-items-center rounded-xl border outline-none transition focus-visible:ring-2 focus-visible:ring-[#CCA039]/55 ' +
                      (isFavorite
                        ? 'border-[#CCA039]/45 bg-[#CCA039]/12 text-[#9B7420]'
                        : 'border-[#D7E2E9] bg-white text-[#5F7280] active:bg-[#EEF3F6]')
                    }
                    title="حفظ"
                    aria-label={isFavorite ? 'إزالة من المحفوظات' : 'حفظ الدواء'}
                  >
                    <MedicalSiteIcon name="saved" play={isFavorite} size={23} />
                  </button>
                </div>

                <div className="flex min-w-0 flex-1 items-start justify-end gap-2.5 text-right">
                  <div className="min-w-0 flex-1 overflow-hidden">
                    <h3 className="truncate whitespace-nowrap text-[13px] font-black leading-5 text-[#183149]">{drug.ar}</h3>
                    <p className="mt-0.5 truncate whitespace-nowrap text-[12px] font-bold leading-5 text-[#526675]" dir="ltr">{drug.en}</p>
                    <span
                      className="mt-1.5 block max-w-full truncate whitespace-nowrap rounded-full bg-[#EAF0F4] px-2.5 py-1 text-[10.5px] font-bold leading-4 text-[#405E75]"
                      title={classLabel}
                    >
                      {classLabel}
                    </span>
                  </div>
                  <div className="grid h-10 w-10 shrink-0 place-items-center overflow-hidden rounded-[13px] border border-[#D7E2E9] bg-[#EEF3F6] text-[#315672]">
                    {coverImage ? (
                      <img
                        src={coverImage.url}
                        alt={coverImage.alt || drug.ar}
                        loading="lazy"
                        decoding="async"
                        className="h-full w-full bg-white object-contain"
                      />
                    ) : isInhalational ? (
                      <VaporizerIcon size={26} />
                    ) : (
                      <MedicalSiteIcon name={iconForDrug(drug.classes)} size={26} />
                    )}
                  </div>
                </div>
              </div>

              <p className="mt-3 text-[11px] leading-5 text-[#526675]">
                <MixedDirectionText text={drug.short} />
              </p>

              {drugContent.details[drug.id] && (
                <button
                  type="button"
                  onClick={() => setSelectedDrugId(drug.id)}
                  className="mt-2 flex min-h-10 w-full items-center justify-between gap-2 border-t border-[#DDE6EB] pt-2 text-[10.5px] font-black text-[#315672] outline-none focus-visible:ring-2 focus-visible:ring-[#CCA039]/50"
                >
                  <span className="min-w-0 flex-1 truncate whitespace-nowrap text-right text-[#5F7280]">
                    الاستخدام • الموانع • التحذيرات
                  </span>
                  <span className="shrink-0 whitespace-nowrap">التفاصيل الدوائية</span>
                </button>
              )}
            </article>
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
            const selectedDrug = drugContent.drugs.find(
              (item) => item.id === selectedDrugId
            );
            const detail = drugContent.details[selectedDrugId];
            if (!selectedDrug || !detail) return null;

            return (
              <DrugDetailSheet
                drug={selectedDrug}
                detail={detail}
                media={drugContent.mediaByDrug[selectedDrugId] ?? []}
                onClose={() => setSelectedDrugId(null)}
              />
            );
          })()}
      </AnimatePresence>
    </div>
  );
}
