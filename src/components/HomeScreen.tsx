import { useMemo } from 'react';
import {
  ANESTHESIA_DRUGS,
  DRUG_CLASS_LABELS,
  type DrugClass
} from '../data/drugs';
import { CLINICAL_TERMS } from '../data/clinicalTerms';
import { ANESTHESIA_EQUIPMENT, type EquipmentCategory } from '../data/equipment';
import { CLINICAL_GUIDES } from '../data/clinicalGuides';
import { ANESTHESIA_STAGE_GUIDE_IDS } from '../data/anesthesiaStages';
import { INTRAVENOUS_FLUIDS } from '../data/fluids';
import type { GuideSection } from './GuideScreen';
import {
  MorphingSearch,
  type MorphingSearchItem
} from './ui/MorphingSearch';
import {
  NotificationStackMenu,
  type StackMenuItem
} from './ui/NotificationStackMenu';
import { MedicalSiteIcon, type MedicalSiteIconName } from './ui/MedicalSiteIcon';

interface HomeScreenProps {
  openGuide: (
    section: GuideSection,
    drugClass?: 'all' | DrugClass,
    initialQuery?: string
  ) => void;
  onOpenAbout: () => void;
}

const guideIcon: Record<GuideSection, MedicalSiteIconName> = {
  drugs: 'drugs',
  fluids: 'fluids',
  equipment: 'equipment',
  stages: 'stages',
  clinical: 'clinical',
  terms: 'terms',
  abbreviations: 'abbreviations'
};

function drugSearchIcon(classes: DrugClass[]): MedicalSiteIconName {
  if (classes.includes('inhalational')) return 'inhalational';
  if (
    classes.includes('cardiovascular') ||
    classes.includes('vasopressor') ||
    classes.includes('emergency')
  ) {
    return 'monitoring';
  }
  return 'drugs';
}

const equipmentSearchIcon: Record<EquipmentCategory, MedicalSiteIconName> = {
  machine: 'equipment',
  'gas-supply': 'gas',
  breathing: 'breathing',
  airway: 'airway',
  monitoring: 'monitoring',
  tools: 'tools'
};

function searchIconPair(name: MedicalSiteIconName) {
  return {
    leading: <MedicalSiteIcon name={name} size={24} />,
    leadingActive: <MedicalSiteIcon name={name} play loop size={24} />
  };
}

export function HomeScreen({ openGuide, onOpenAbout }: HomeScreenProps) {
  const searchItems = useMemo<MorphingSearchItem[]>(() => {
    const drugs: MorphingSearchItem[] = ANESTHESIA_DRUGS.map((drug) => ({
      id: 'drug:' + drug.id,
      title: drug.ar,
      titleAr: drug.ar,
      titleEn: drug.en,
      description: drug.categoryAr,
      keywords: [
        drug.en,
        drug.ar,
        drug.categoryAr,
        ...drug.classes.map((item) => DRUG_CLASS_LABELS[item]),
        ...drug.tags
      ],
      ...searchIconPair(drugSearchIcon(drug.classes)),
      onSelect: () => openGuide('drugs', 'all', drug.en)
    }));

    const fluids: MorphingSearchItem[] = INTRAVENOUS_FLUIDS.map((item) => ({
      id: 'fluid:' + item.id,
      title: item.nameAr,
      titleAr: item.nameAr,
      titleEn: item.nameEn,
      description: item.categoryAr,
      keywords: [
        item.nameAr,
        item.nameEn,
        item.categoryAr,
        item.composition,
        ...item.tags
      ],
      ...searchIconPair('fluids'),
      onSelect: () => openGuide('fluids', 'all', item.nameEn)
    }));

    const equipment: MorphingSearchItem[] = ANESTHESIA_EQUIPMENT.map((item) => ({
      id: 'equipment:' + item.id,
      title: item.nameAr,
      titleAr: item.nameAr,
      titleEn: item.nameEn,
      description: item.categoryAr,
      keywords: [
        item.nameAr,
        item.nameEn,
        item.categoryAr,
        item.summary,
        ...item.tags
      ],
      ...searchIconPair(equipmentSearchIcon[item.category]),
      onSelect: () => openGuide('equipment', 'all', item.nameEn)
    }));

    const stageGuides: MorphingSearchItem[] = CLINICAL_GUIDES
      .filter((guide) => ANESTHESIA_STAGE_GUIDE_IDS.has(guide.id))
      .map((guide) => ({
        id: 'stage:' + guide.id,
        title: guide.titleAr,
        titleAr: guide.titleAr,
        titleEn: guide.titleEn,
        description: 'مراحل التخدير',
        keywords: [
          guide.titleAr,
          guide.titleEn,
          guide.categoryAr,
          guide.summary,
          ...guide.tags
        ],
        ...searchIconPair('stages'),
        onSelect: () => openGuide('stages', 'all', guide.titleEn)
      }));

    const clinicalGuides: MorphingSearchItem[] = CLINICAL_GUIDES
      .filter((guide) => !ANESTHESIA_STAGE_GUIDE_IDS.has(guide.id))
      .map((guide) => ({
        id: 'clinical:' + guide.id,
        title: guide.titleAr,
        titleAr: guide.titleAr,
        titleEn: guide.titleEn,
        description: guide.categoryAr,
        keywords: [
          guide.titleAr,
          guide.titleEn,
          guide.categoryAr,
          guide.summary,
          ...guide.tags
        ],
        ...searchIconPair('clinical'),
        onSelect: () => openGuide('clinical', 'all', guide.titleEn)
      }));

    const terms: MorphingSearchItem[] = CLINICAL_TERMS.map((term) => ({
      id: 'term:' + term.id,
      title: term.ar,
      titleAr: term.ar,
      titleEn: term.abbr ? term.abbr + ' — ' + term.en : term.en,
      keywords: [
        term.abbr ?? '',
        term.en,
        term.ar,
        term.definition,
        ...term.tags
      ],
      ...searchIconPair(term.abbr ? 'abbreviations' : 'terms'),
      onSelect: () =>
        openGuide(
          term.abbr ? 'abbreviations' : 'terms',
          'all',
          term.abbr ?? term.en
        )
    }));

    return [
      ...drugs,
      ...fluids,
      ...equipment,
      ...stageGuides,
      ...clinicalGuides,
      ...terms
    ];
  }, [openGuide]);

  const guideItems: StackMenuItem[] = [
    {
      id: 'drugs',
      title: 'الأدوية',
      description: 'Drug Reference',
      leading: <MedicalSiteIcon name="drugs" play loop size={25} />,
      onSelect: () => openGuide('drugs')
    },
    {
      id: 'equipment',
      title: 'عربة التخدير والمعدات',
      description: 'Machine • Airway • Monitoring • Tools',
      leading: <MedicalSiteIcon name="equipment" play loop size={25} />,
      onSelect: () => openGuide('equipment')
    },
    {
      id: 'fluids',
      title: 'السوائل الوريدية',
      description: 'IV Fluids',
      leading: <MedicalSiteIcon name="fluids" play loop size={25} />,
      onSelect: () => openGuide('fluids')
    },
    {
      id: 'stages',
      title: 'مراحل التخدير',
      description: 'Stages of Anesthesia',
      leading: <MedicalSiteIcon name="stages" play loop size={25} />,
      onSelect: () => openGuide('stages')
    },
    {
      id: 'clinical',
      title: 'المفاهيم والإجراءات',
      description: 'Clinical Guides',
      leading: <MedicalSiteIcon name="clinical" play loop size={25} />,
      onSelect: () => openGuide('clinical')
    },
    {
      id: 'terms',
      title: 'المصطلحات',
      description: 'Clinical Terms',
      leading: <MedicalSiteIcon name="terms" play loop size={25} />,
      onSelect: () => openGuide('terms')
    },
    {
      id: 'abbreviations',
      title: 'الاختصارات',
      description: 'Abbreviations',
      leading: <MedicalSiteIcon name="abbreviations" play loop size={25} />,
      onSelect: () => openGuide('abbreviations')
    }
  ];

  return (
    <div className="space-y-5">
      <section>
        <div className="mb-3">
          <p className="text-[11px] font-bold text-[#526675]">
            دليلك السريع في التخدير
          </p>
          <h2 className="mt-1 text-xl font-black text-[#183149]">
            ابحث أو اختر القسم
          </h2>
        </div>

        <MorphingSearch
          items={searchItems}
          placeholder="ابحث في دليلي"
        />
      </section>

      <section>
        <NotificationStackMenu
          title="الدليل التخديري"
          description="أدوية، سوائل، معدات، مراحل التخدير، إجراءات ومصطلحات"
          icon={<MedicalSiteIcon name="guide" play loop size={27} />}
          items={guideItems}
        />
      </section>

      <div className="flex justify-center pt-1">
        <button
          type="button"
          onClick={onOpenAbout}
          className="rounded-full px-4 py-2 text-xs font-black text-[#607487] transition hover:bg-[#F1F5F8] hover:text-[#183149]"
        >
          حول
        </button>
      </div>
    </div>
  );
}
