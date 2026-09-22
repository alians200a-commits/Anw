import { useMemo, useState } from 'react';
import {
  BookOpenText,
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

interface HomeScreenProps {
  query: string;
  setQuery: (value: string) => void;
  openGuide: (
    section: GuideSection,
    drugClass?: 'all' | DrugClass,
    initialQuery?: string
  ) => void;
  goTo: (tab: AppTab) => void;
}

export function HomeScreen({
  setQuery,
  openGuide
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

    const guides: MorphingSearchItem[] = CLINICAL_GUIDES.map((guide) => {
      const isStage = ANESTHESIA_STAGE_GUIDE_IDS.has(guide.id);
      return {
        id: (isStage ? 'stage:' : 'clinical:') + guide.id,
        title: guide.titleAr + ' | ' + guide.titleEn,
        description: isStage ? 'مراحل التخدير' : guide.categoryAr,
        keywords: [
          guide.titleAr,
          guide.titleEn,
          guide.categoryAr,
          guide.summary,
          ...guide.tags
        ],
        leading: <BookOpenText size={19} />,
        onSelect: () =>
          openGuide(isStage ? 'stages' : 'clinical', 'all', guide.titleEn)
      };
    });

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

    return [...drugs, ...fluids, ...equipment, ...guides, ...terms];
  }, [openGuide]);

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

      <section>
        <NotificationStackMenu
          title="الدليل التخديري"
          description="أدوية، سوائل، معدات، مراحل التخدير، إجراءات ومصطلحات"
          icon={<BookOpenText size={22} weight="bold" />}
          items={guideItems}
          defaultExpanded
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

      <section
        aria-label="ملاحظة التنقل"
        className="rounded-[16px] border border-[#E0E7EC] bg-[#F6F8FA] px-3.5 py-3"
      >
        <p className="text-[10px] font-semibold leading-5 text-[#657784]">
          التعلّم والمحفوظات موجودان في شريط التنقل السفلي حتى تبقى الرئيسية نظيفة بدون تكرار.
        </p>
      </section>
    </div>
  );
}
