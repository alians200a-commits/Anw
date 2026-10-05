import { useMemo } from 'react';
import { BadgeInfo, Bookmark, ChevronLeft, HeartPulse, Sparkles } from 'lucide-react';
import { FlaticonEducationIcon } from './ui/FlaticonEducationIcon';
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
  onOpenGames: () => void;
  onOpenEducation: () => void;
  onOpenFavorites: () => void;
  favoritesCount: number;
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

export function HomeScreen({
  openGuide,
  onOpenAbout,
  onOpenGames,
  onOpenEducation,
  onOpenFavorites,
  favoritesCount,
}: HomeScreenProps) {
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

  const quickTools: Array<{
    id: string;
    label: string;
    icon: MedicalSiteIconName;
    tone: string;
    onClick: () => void;
  }> = [
    { id: 'drugs', label: 'الأدوية', icon: 'drugs', tone: 'bg-[#F4E9D2] text-[#8A6426]', onClick: () => openGuide('drugs') },
    { id: 'equipment', label: 'المعدات', icon: 'equipment', tone: 'bg-[#E8EEF3] text-[#315672]', onClick: () => openGuide('equipment') },
    { id: 'stages', label: 'المراحل', icon: 'stages', tone: 'bg-[#EDF1E5] text-[#5D7047]', onClick: () => openGuide('stages') },
    { id: 'learn', label: 'تعلّم', icon: 'learn', tone: 'bg-[#EFE8F4] text-[#66527B]', onClick: onOpenGames },
  ];

  return (
    <div className="space-y-5">
      <section>
        <div className="mb-3 flex items-start justify-between gap-3">
          <div>
            <p className="text-[11px] font-bold text-[#526675]">دليلك السريع في التخدير</p>
            <h2 className="mt-1 text-xl font-black text-[#183149]">وين تحب تبدأ؟</h2>
          </div>

          <button
            type="button"
            onClick={onOpenAbout}
            aria-label="حول تطبيق دليلي"
            title="حول التطبيق"
            className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl border border-[#E5D3A1] bg-[linear-gradient(145deg,#FFFDF7_0%,#F7F0DE_100%)] text-[#A87916] shadow-[0_7px_18px_rgba(24,49,73,0.08)] active:scale-95"
          >
            <BadgeInfo size={22} strokeWidth={2.15} />
          </button>
        </div>

        <MorphingSearch items={searchItems} placeholder="ابحث في دليلي" />
      </section>

      <section className="overflow-hidden rounded-[26px] border border-[#D8E2E9] bg-[linear-gradient(105deg,#F7F0DE_0%,#F5F8FA_54%,#E7EEF3_100%)] shadow-[0_14px_32px_rgba(16,45,79,0.08)]">
        <div className="grid min-h-[190px] grid-cols-[1.25fr_.75fr] items-stretch">
          <div className="flex flex-col justify-between p-4 text-right">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/80 bg-white/80 px-2.5 py-1 text-[9px] font-black text-[#8A6426]">
                <Sparkles size={12} /> حالة اليوم
              </span>
              <h3 className="mt-3 text-[18px] font-black leading-7 text-[#183149]">هبوط الضغط بعد البدء بالتخدير</h3>
              <p className="mt-1.5 text-[11px] font-semibold leading-5 text-[#5F7280]">راقب المونيتور، رتّب التقييم، وتدخل بشكل منطقي حتى تستقر الحالة.</p>
            </div>

            <button
              type="button"
              onClick={onOpenGames}
              className="mt-4 inline-flex min-h-10 w-fit items-center gap-2 rounded-[14px] bg-[#173A63] px-3.5 text-[10px] font-black text-white shadow-[0_7px_16px_rgba(23,58,99,0.16)] active:bg-[#102D4F]"
            >
              ابدأ المحاكاة <ChevronLeft size={15} />
            </button>
          </div>

          <div className="relative grid place-items-center overflow-hidden border-r border-white/70 bg-[#173A63]/[0.035]">
            <div className="absolute -left-8 top-5 h-28 w-28 rounded-full bg-white/55 blur-2xl" />
            <div className="relative grid h-24 w-24 place-items-center rounded-[28px] border border-white/80 bg-white/70 text-[#173A63] shadow-[0_16px_30px_rgba(23,58,99,0.10)]">
              <HeartPulse size={48} strokeWidth={1.8} />
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="mb-2.5 flex items-center justify-between px-1">
          <span className="text-[10px] font-bold text-[#8A97A1]">وصول سريع</span>
          <h3 className="text-[13px] font-black text-[#183149]">الأدوات</h3>
        </div>
        <div className="grid grid-cols-4 gap-2">
          {quickTools.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={item.onClick}
              className="flex min-h-[82px] flex-col items-center justify-center gap-2 rounded-[18px] border border-[#DCE5EA] bg-white px-1.5 text-center shadow-[0_6px_16px_rgba(16,45,79,0.05)] active:bg-[#F6F8F9]"
            >
              <span className={`grid h-11 w-11 place-items-center rounded-[14px] ${item.tone}`}>
                <MedicalSiteIcon name={item.icon} size={25} />
              </span>
              <span className="text-[10px] font-black text-[#183149]">{item.label}</span>
            </button>
          ))}
        </div>
      </section>


      <section aria-label="عالم التخدير">
        <button
          type="button"
          onClick={onOpenEducation}
          className="flex w-full items-center gap-3 rounded-[22px] border border-[#DCE5EA] bg-[linear-gradient(105deg,#F7F0DE_0%,#F5F8FA_54%,#E7EEF3_100%)] p-3.5 text-right shadow-[0_9px_24px_rgba(16,45,79,0.07)] outline-none transition-colors hover:border-[#BED0DC] active:bg-[#EFF4F8] focus-visible:ring-2 focus-visible:ring-[#CCA039]/55"
        >
          <span className="grid h-14 w-14 shrink-0 place-items-center rounded-[17px] border border-white/80 bg-white/85 text-[#315672] shadow-[0_6px_16px_rgba(24,49,73,0.06)]">
            <FlaticonEducationIcon name="intro" size={42} />
          </span>
          <span className="min-w-0 flex-1">
            <span className="text-[10px] font-bold text-[#9A7122]">دليلي | مملكة التخدير</span>
            <span className="mt-1 block text-[16px] font-black text-[#183149]">عالم التخدير</span>
            <span className="mt-1 block text-[11px] font-semibold leading-5 text-[#5F7280]">الدراسة والكوادر والمهارات والتحضير للتخدير</span>
          </span>
          <ChevronLeft size={19} className="shrink-0 text-[#315672]" aria-hidden="true" />
        </button>
      </section>

      <section className="rounded-[22px] border border-[#DCE5EA] bg-[#F8FAFB] p-3.5">
        <div className="mb-3 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={onOpenFavorites}
            className="inline-flex min-h-9 items-center gap-1.5 rounded-[12px] border border-[#DCE5EA] bg-white px-3 text-[10px] font-black text-[#526675]"
          >
            <Bookmark size={14} /> المحفوظات
          </button>
          <div className="text-right">
            <h3 className="text-[12px] font-black text-[#183149]">نظرة سريعة</h3>
            <p className="mt-0.5 text-[9px] font-semibold text-[#7A8995]">محتوى دليلي المتاح حاليًا</p>
          </div>
        </div>

        <div className="grid grid-cols-3 divide-x divide-x-reverse divide-[#DCE5EA] rounded-[16px] border border-[#E1E8ED] bg-white py-3 text-center">
          <div><div className="text-lg font-black tabular-nums text-[#173A63]">{ANESTHESIA_DRUGS.length}</div><div className="mt-0.5 text-[9px] font-bold text-[#7A8995]">دواء</div></div>
          <div><div className="text-lg font-black tabular-nums text-[#173A63]">{ANESTHESIA_EQUIPMENT.length}</div><div className="mt-0.5 text-[9px] font-bold text-[#7A8995]">معدة</div></div>
          <div><div className="text-lg font-black tabular-nums text-[#9A7122]">{favoritesCount}</div><div className="mt-0.5 text-[9px] font-bold text-[#7A8995]">محفوظ</div></div>
        </div>
      </section>

      <section>
        <NotificationStackMenu
          title="الدليل التخديري"
          description="أدوية، سوائل، معدات، مراحل التخدير، إجراءات ومصطلحات"
          icon={<MedicalSiteIcon name="guide" size={27} />}
          items={guideItems}
        />
      </section>
    </div>
  );
}
