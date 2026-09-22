import {
  BookOpenText,
  Drop,
  TextAa,
  Wrench
} from '@phosphor-icons/react';
import { DrugDirectory } from './DrugDirectory';
import { TermsDirectory } from './TermsDirectory';
import { AbbreviationsDirectory } from './AbbreviationsDirectory';
import { EquipmentDirectory } from './EquipmentDirectory';
import { ClinicalGuidesDirectory } from './ClinicalGuidesDirectory';
import { FluidsDirectory } from './FluidsDirectory';
import { AnesthesiaStagesDirectory } from './AnesthesiaStagesDirectory';
import { MedicinesHealthIcon } from './MedicalIcons';
import {
  NotificationStackMenu,
  type StackMenuItem
} from './ui/NotificationStackMenu';
import type { DrugClass } from '../data/drugs';
import { MEDICAL_ANIMATED_GIFS } from '../data/animatedMedicalIcons';

export type GuideSection =
  | 'drugs'
  | 'fluids'
  | 'equipment'
  | 'stages'
  | 'clinical'
  | 'terms'
  | 'abbreviations';

interface GuideScreenProps {
  section: GuideSection;
  onSectionChange: (section: GuideSection) => void;
  favorites: Set<string>;
  onToggleFavorite: (id: string) => void;
  initialDrugClass: 'all' | DrugClass;
  initialQuery: string;
}

const sectionLabels: Record<GuideSection, string> = {
  drugs: 'الأدوية',
  equipment: 'عربة التخدير والمعدات',
  fluids: 'السوائل الوريدية',
  stages: 'مراحل التخدير',
  clinical: 'المفاهيم والإجراءات',
  terms: 'المصطلحات',
  abbreviations: 'الاختصارات'
};

export function GuideScreen({
  section,
  onSectionChange,
  favorites,
  onToggleFavorite,
  initialDrugClass,
  initialQuery
}: GuideScreenProps) {
  const sectionItems: StackMenuItem[] = [
    {
      id: 'drugs',
      title: 'الأدوية',
      description: 'Drug Reference',
      leading: <MedicinesHealthIcon className="h-5 w-5" />,
      onSelect: () => onSectionChange('drugs')
    },
    {
      id: 'equipment',
      title: 'عربة التخدير والمعدات',
      description: 'Machine • Airway • Monitoring',
      leading: <Wrench size={19} weight="bold" />,
      onSelect: () => onSectionChange('equipment')
    },
    {
      id: 'fluids',
      title: 'السوائل الوريدية',
      description: 'IV Fluids',
      leading: <Drop size={19} weight="fill" />,
      onSelect: () => onSectionChange('fluids')
    },
    {
      id: 'stages',
      title: 'مراحل التخدير',
      description: 'Stages of Anesthesia',
      leading: <BookOpenText size={19} />,
      onSelect: () => onSectionChange('stages')
    },
    {
      id: 'clinical',
      title: 'المفاهيم والإجراءات',
      description: 'Clinical Guides',
      leading: <BookOpenText size={19} />,
      onSelect: () => onSectionChange('clinical')
    },
    {
      id: 'terms',
      title: 'المصطلحات',
      description: 'Clinical Terms',
      leading: <BookOpenText size={19} />,
      onSelect: () => onSectionChange('terms')
    },
    {
      id: 'abbreviations',
      title: 'الاختصارات',
      description: 'Abbreviations',
      leading: <TextAa size={19} weight="bold" />,
      onSelect: () => onSectionChange('abbreviations')
    }
  ];

  return (
    <div className="space-y-4">
      <section>
        <div className="mb-1 px-1 text-right">
          <h2 className="text-lg font-black text-[#183149]">الدليل التخديري</h2>
        </div>

        <NotificationStackMenu
          title={sectionLabels[section]}
          description="اضغط لتغيير قسم الدليل"
          icon={<BookOpenText size={22} weight="bold" />}
          animatedIconSrc={MEDICAL_ANIMATED_GIFS[section]}
          items={sectionItems}
          selectedId={section}
        />
      </section>

      {section === 'drugs' && (
        <DrugDirectory
          favorites={favorites}
          onToggleFavorite={onToggleFavorite}
          initialClassification={initialDrugClass}
          initialQuery={initialQuery}
        />
      )}
      {section === 'fluids' && (
        <FluidsDirectory initialQuery={initialQuery} />
      )}
      {section === 'equipment' && (
        <EquipmentDirectory initialQuery={initialQuery} />
      )}
      {section === 'stages' && (
        <AnesthesiaStagesDirectory initialQuery={initialQuery} />
      )}
      {section === 'clinical' && (
        <ClinicalGuidesDirectory initialQuery={initialQuery} />
      )}
      {section === 'terms' && (
        <TermsDirectory
          favorites={favorites}
          onToggleFavorite={onToggleFavorite}
          initialQuery={initialQuery}
        />
      )}
      {section === 'abbreviations' && (
        <AbbreviationsDirectory
          favorites={favorites}
          onToggleFavorite={onToggleFavorite}
          initialQuery={initialQuery}
        />
      )}
    </div>
  );
}