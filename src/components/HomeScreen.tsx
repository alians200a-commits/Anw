import { useMemo } from 'react';
import { BadgeInfo } from 'lucide-react';
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
import { VaporizerIcon } from './ui/VaporizerIcon';

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
    leadingActive: <MedicalSiteIcon name={name} play size={24} />
  };
}

function drugSearchIconPair(classes: DrugClass[]) {
  if (classes.includes('inhalational')) {
    return {
      leading: <VaporizerIcon size={24} />,
      leadingActive: <VaporizerIcon size={24} play />
    };
  }
  return searchIconPair(drugSearchIcon(classes));
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
      ...drugSearchIconPair(drug.classes),
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
      leading: <MedicalSiteIcon name="drugs" size={25} />,
      onSelect: () => openGuide('drugs')
    },
    {
      id: 'equipment',
      title: 'عربة التخدير والمعدات',
      description: 'Machine • Airway • Monitoring • Tools',
      leading: <MedicalSiteIcon name="equipment" size={25} />,
      onSelect: () => openGuide('equipment')
    },
    {
      id: 'fluids',
      title: 'السوائل الوريدية',
      description: 'IV Fluids',
      leading: <MedicalSiteIcon name="fluids" size={25} />,
      onSelect: () => openGuide('fluids')
    },
    {
      id: 'stages',
      title: 'مراحل التخدير',
      description: 'Stages of Anesthesia',
      leading: <MedicalSiteIcon name="stages" size={25} />,
      onSelect: () => openGuide('stages')
    },
    {
      id: 'clinical',
      title: 'المفاهيم والإجراءات',
      description: 'Clinical Guides',
      leading: <MedicalSiteIcon name="clinical" size={25} />,
      onSelect: () => openGuide('clinical')
    },
    {
      id: 'terms',
      title: 'المصطلحات',
      description: 'Clinical Terms',
      leading: <MedicalSiteIcon name="terms" size={25} />,
      onSelect: () => openGuide('terms')
    },
    {
      id: 'abbreviations',
      title: 'الاختصارات',
      description: 'Abbreviations',
      leading: <MedicalSiteIcon name="abbreviations" size={25} />,
      onSelect: () => openGuide('abbreviations')
    }
  ];

  return (
    <div className="space-y-5">
      <section>
        <div className="mb-3 flex items-start justify-between gap-3">
          <div>
            <p className="text-[11px] font-bold text-[#526675]">
              دليلك السريع في التخدير
            </p>
            <h2 className="mt-1 text-xl font-black text-[#183149]">
              ابحث أو اختر القسم
            </h2>
          </div>

          <button
            type="button"
            onClick={onOpenAbout}
            aria-label="حول تطبيق دليلي"
            title="حول التطبيق"
            className="group grid h-11 w-11 shrink-0 place-items-center rounded-2xl border border-[#E5D3A1] bg-[linear-gradient(145deg,#FFFDF7_0%,#F7F0DE_100%)] text-[#A87916] shadow-[0_7px_18px_rgba(24,49,73,0.08)] transition duration-200 hover:-translate-y-0.5 hover:border-[#D2AE55] hover:text-[#805B0D] hover:shadow-[0_10px_24px_rgba(24,49,73,0.12)] active:translate-y-0 active:scale-95"
          >
            <BadgeInfo size={22} strokeWidth={2.15} />
          </button>
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
          icon={<MedicalSiteIcon name="guide" play size={27} />}
          items={guideItems}
        />
      </section>
    </div>
  );
}
