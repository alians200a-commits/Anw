import { useMemo, useState } from 'react';
import {
  BookOpenText,
  CaretLeft,
  ClockCounterClockwise,
  Drop,
  TextAa,
  Wrench
} from '@phosphor-icons/react';
import {
  ANESTHESIA_DRUGS,
  DRUG_CLASS_LABELS,
  DRUG_FILTERS,
  type DrugClass
} from '../data/drugs';
import { CLINICAL_TERMS } from '../data/clinicalTerms';
import { ANESTHESIA_EQUIPMENT } from '../data/equipment';
import { CLINICAL_GUIDES } from '../data/clinicalGuides';
import { ANESTHESIA_STAGE_GUIDE_IDS } from '../data/anesthesiaStages';
import { INTRAVENOUS_FLUIDS } from '../data/fluids';
import type { AppTab } from './BottomNav';
import type { GuideSection } from './GuideScreen';
import { MedicinesHealthIcon } from './MedicalIcons';
import {
  MorphingSearch,
  type MorphingSearchItem
} from './ui/MorphingSearch';
import {
  NotificationStackMenu,
  type StackMenuItem
} from './ui/NotificationStackMenu';

export interface RecentGuideItem {
  section: GuideSection;
  query: string;
}

interface HomeScreenProps {
  query: string;
  setQuery: (value: string) => void;
  openGuide: (
    section: GuideSection,
    drugClass?: 'all' | DrugClass,
    initialQuery?: string
  ) => void;
  goTo: (tab: AppTab) => void;
  recentItems: RecentGuideItem[];
}

export function HomeScreen({
  setQuery,
  openGuide,
  recentItems
}: HomeScreenProps) {
  const [openGuideSubmenu, setOpenGuideSubmenu] = useState<'drugs' | null>(null);

  const searchItems = useMemo<MorphingSearchItem[]>(() => {
    const drugs: MorphingSearchItem[] = ANESTHESIA_DRUGS.map((drug) => ({
      id: 'drug:' + drug.id,
      title: drug.ar + ' | ' + drug.en,
      description: drug.categoryAr,
      keywords: [
        drug.en,
        drug.ar,
        drug.categoryAr,
        ...drug.classes.map((item) => DRUG_CLASS_LABELS[item]),
        ...drug.tags
      ],
      leading: <MedicinesHealthIcon className="h-5 w-5" />,
      onSelect: () => openGuide('drugs', 'all', drug.en)
    }));

    const fluids: MorphingSearchItem[] = INTRAVENOUS_FLUIDS.map((item) => ({
      id: 'fluid:' + item.id,
      title: item.nameAr + ' | ' + item.nameEn,
      description: item.categoryAr,
      keywords: [
        item.nameAr,
        item.nameEn,
        item.categoryAr,
        item.composition,
        ...item.tags
      ],
      leading: <Drop size={19} weight="fill" />,
      onSelect: () => openGuide('fluids', 'all', item.nameEn)
    }));

    const equipment: MorphingSearchItem[] = ANESTHESIA_EQUIPMENT.map((item) => ({
      id: 'equipment:' + item.id,
      title: item.nameAr + ' | ' + item.nameEn,
      description: item.categoryAr,
      keywords: [
        item.nameAr,
        item.nameEn,
        item.categoryAr,
        item.summary,
        ...item.tags
      ],
      leading: <Wrench size={19} weight="bold" />,
      onSelect: () => openGuide('equipment', 'all', item.nameEn)
    }));

    const stageGuides: MorphingSearchItem[] = CLINICAL_GUIDES
      .filter((guide) => ANESTHESIA_STAGE_GUIDE_IDS.has(guide.id))
      .map((guide) => ({
        id: 'stage:' + guide.id,
        title: guide.titleAr + ' | ' + guide.titleEn,
        description: 'مراحل التخدير',
        keywords: [
          guide.titleAr,
          guide.titleEn,
          guide.categoryAr,
          guide.summary,
          ...guide.tags
        ],
        leading: <BookOpenText size={19} />,
        onSelect: () => openGuide('stages', 'all', guide.titleEn)
      }));

    const clinicalGuides: MorphingSearchItem[] = CLINICAL_GUIDES
      .filter((guide) => !ANESTHESIA_STAGE_GUIDE_IDS.has(guide.id))
      .map((guide) => ({
        id: 'clinical:' + guide.id,
        title: guide.titleAr + ' | ' + guide.titleEn,
        description: guide.categoryAr,
        keywords: [
          guide.titleAr,
          guide.titleEn,
          guide.categoryAr,
          guide.summary,
          ...guide.tags
        ],
        leading: <BookOpenText size={19} />,
        onSelect: () => openGuide('clinical', 'all', guide.titleEn)
      }));

    const terms: MorphingSearchItem[] = CLINICAL_TERMS.map((term) => ({
      id: 'term:' + term.id,
      title: (term.abbr ? term.abbr + ' — ' : '') + term.ar,
      description: term.en,
      keywords: [
        term.abbr ?? '',
        term.en,
        term.ar,
        term.definition,
        ...term.tags
      ],
      leading: term.abbr ? (
        <TextAa size={19} weight="bold" />
      ) : (
        <BookOpenText size={19} />
      ),
      onSelect: () =>
        openGuide(
          term.abbr ? 'abbreviations' : 'terms',
          'all',
          term.abbr ?? term.en
        )
    }));

    return [...drugs, ...fluids, ...equipment, ...stageGuides, ...clinicalGuides, ...terms];
  }, [openGuide]);

  const recentCards = useMemo(() => {
    return recentItems.slice(0, 3).map((recent) => {
      if (recent.section === 'drugs') {
        const item = ANESTHESIA_DRUGS.find(
          (drug) => drug.en.toLowerCase() === recent.query.toLowerCase()
        );
        return {
          ...recent,
          title: item?.ar ?? recent.query,
          subtitle: item?.en ?? 'دواء',
          icon: <MedicinesHealthIcon className="h-5 w-5" />
        };
      }

      if (recent.section === 'fluids') {
        const item = INTRAVENOUS_FLUIDS.find(
          (fluid) => fluid.nameEn.toLowerCase() === recent.query.toLowerCase()
        );
        return {
          ...recent,
          title: item?.nameAr ?? recent.query,
          subtitle: item?.nameEn ?? 'سائل وريدي',
          icon: <Drop size={19} weight="fill" />
        };
      }

      if (recent.section === 'equipment') {
        const item = ANESTHESIA_EQUIPMENT.find(
          (equipment) =>
            equipment.nameEn.toLowerCase() === recent.query.toLowerCase()
        );
        return {
          ...recent,
          title: item?.nameAr ?? recent.query,
          subtitle: item?.nameEn ?? 'معدات',
          icon: <Wrench size={19} weight="bold" />
        };
      }

      if (recent.section === 'stages' || recent.section === 'clinical') {
        const item = CLINICAL_GUIDES.find(
          (guide) =>
            guide.titleEn.toLowerCase() === recent.query.toLowerCase()
        );
        return {
          ...recent,
          title: item?.titleAr ?? recent.query,
          subtitle: item?.titleEn ?? 'دليل سريري',
          icon: <BookOpenText size={19} />
        };
      }

      const item = CLINICAL_TERMS.find((term) =>
        recent.section === 'abbreviations'
          ? term.abbr?.toLowerCase() === recent.query.toLowerCase()
          : term.en.toLowerCase() === recent.query.toLowerCase()
      );

      return {
        ...recent,
        title: item?.ar ?? recent.query,
        subtitle: item?.abbr
          ? item.abbr + ' — ' + item.en
          : item?.en ?? 'مصطلح',
        icon:
          recent.section === 'abbreviations' ? (
            <TextAa size={19} weight="bold" />
          ) : (
            <BookOpenText size={19} />
          )
      };
    });
  }, [recentItems]);

  const guideItems: StackMenuItem[] = [
    {
      id: 'drugs',
      title: 'الأدوية',
      description: 'Drug Reference',
      leading: <MedicinesHealthIcon className="h-5 w-5" />,
      trailing: 'تصنيفات',
      onSelect: () =>
        setOpenGuideSubmenu((current) => (current === 'drugs' ? null : 'drugs'))
    },
    {
      id: 'equipment',
      title: 'عربة التخدير والمعدات',
      description: 'Machine • Airway • Monitoring • Tools',
      leading: <Wrench size={19} weight="bold" />,
      trailing: '6 أقسام',
      onSelect: () => openGuide('equipment')
    },
    {
      id: 'fluids',
      title: 'السوائل الوريدية',
      description: 'IV Fluids',
      leading: <Drop size={19} weight="fill" />,
      onSelect: () => openGuide('fluids')
    },
    {
      id: 'stages',
      title: 'مراحل التخدير',
      description: 'Stages of Anesthesia',
      leading: <BookOpenText size={19} />,
      onSelect: () => openGuide('stages')
    },
    {
      id: 'clinical',
      title: 'المفاهيم والإجراءات',
      description: 'Clinical Guides',
      leading: <BookOpenText size={19} />,
      onSelect: () => openGuide('clinical')
    },
    {
      id: 'terms',
      title: 'المصطلحات',
      description: 'Clinical Terms',
      leading: <BookOpenText size={19} />,
      onSelect: () => openGuide('terms')
    },
    {
      id: 'abbreviations',
      title: 'الاختصارات',
      description: 'Abbreviations',
      leading: <TextAa size={19} weight="bold" />,
      onSelect: () => openGuide('abbreviations')
    }
  ];

  const drugClassItems: StackMenuItem[] = DRUG_FILTERS.map((item) => ({
    id: item.id,
    title: item.label,
    description: item.id === 'all' ? 'جميع الأدوية' : 'فتح هذا التصنيف',
    leading: <MedicinesHealthIcon className="h-5 w-5" />,
    onSelect: () => openGuide('drugs', item.id as 'all' | DrugClass)
  }));

  return (
    <div className="space-y-5">
      <section>
        <div className="mb-3">
          <p className="text-[11px] font-bold text-[#526675]">دليلك السريع في التخدير</p>
          <h2 className="mt-1 text-xl font-black text-[#183149]">ابحث أو اختار القسم</h2>
        </div>

        <MorphingSearch
          items={searchItems}
          onQueryChange={setQuery}
          placeholder="ابحث في دليلي"
        />
      </section>

      {recentCards.length ? (
        <section aria-label="آخر استخدام">
          <div className="mb-2 flex items-center justify-between px-1">
            <span className="text-[9px] font-black text-[#7A8995]">
              آخر {recentCards.length} عناصر
            </span>
            <div className="flex items-center gap-1.5 text-[#405E75]">
              <span className="text-[11px] font-black">آخر استخدام</span>
              <ClockCounterClockwise size={17} weight="bold" />
            </div>
          </div>

          <div className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none]">
            {recentCards.map((item) => (
              <button
                key={item.section + ':' + item.query}
                type="button"
                onClick={() => openGuide(item.section, 'all', item.query)}
                className="flex min-h-[58px] w-[190px] shrink-0 items-center gap-2.5 rounded-[16px] border border-[#DCE5EA] bg-[#F8FAFB] px-3 py-2.5 text-right outline-none transition active:bg-[#EEF3F6] focus-visible:ring-2 focus-visible:ring-[#CCA039]/50 sm:w-[210px]"
              >
                <CaretLeft
                  size={14}
                  weight="bold"
                  className="shrink-0 text-[#7A8995]"
                />
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-[11px] font-black text-[#183149]">
                    {item.title}
                  </span>
                  <span
                    className="mt-0.5 block truncate text-[9px] font-semibold text-[#657784]"
                    dir="auto"
                  >
                    {item.subtitle}
                  </span>
                </span>
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#EEF3F6] text-[#315672]">
                  {item.icon}
                </span>
              </button>
            ))}
          </div>
        </section>
      ) : null}

      <section>
        <NotificationStackMenu
          title="الدليل التخديري"
          description="أدوية، سوائل، معدات، مراحل التخدير، إجراءات ومصطلحات"
          icon={<BookOpenText size={22} weight="bold" />}
          items={guideItems}
        />

        {openGuideSubmenu === 'drugs' ? (
          <div className="mt-3">
            <NotificationStackMenu
              title="تصنيفات الأدوية"
              description="اختار التصنيف المطلوب"
              icon={<MedicinesHealthIcon className="h-[22px] w-[22px]" />}
              items={drugClassItems}
              defaultExpanded
              onExpandedChange={(expanded) => {
                if (!expanded) setOpenGuideSubmenu(null);
              }}
            />
          </div>
        ) : null}
      </section>

    </div>
  );
}