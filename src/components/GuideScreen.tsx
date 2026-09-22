import { DrugDirectory } from './DrugDirectory';
import { TermsDirectory } from './TermsDirectory';
import { AbbreviationsDirectory } from './AbbreviationsDirectory';
import { EquipmentDirectory } from './EquipmentDirectory';
import { ClinicalGuidesDirectory } from './ClinicalGuidesDirectory';
import { FluidsDirectory } from './FluidsDirectory';
import { AnesthesiaStagesDirectory } from './AnesthesiaStagesDirectory';
import {
  NotificationStackMenu,
  type StackMenuItem
} from './ui/NotificationStackMenu';
import { MedicalSiteIcon, type MedicalSiteIconName } from './ui/MedicalSiteIcon';
import type { DrugClass } from '../data/drugs';

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

const sectionIcons: Record<GuideSection, MedicalSiteIconName> = {
  drugs: 'drugs',
  equipment: 'equipment',
  fluids: 'fluids',
  stages: 'stages',
  clinical: 'clinical',
  terms: 'terms',
  abbreviations: 'abbreviations'
};

export function GuideScreen({
  section,
  onSectionChange,
  favorites,
  onToggleFavorite,
  initialDrugClass,
  initialQuery
}: GuideScreenProps) {
  const sectionItems: StackMenuItem[] = (
    Object.keys(sectionLabels) as GuideSection[]
  ).map((id) => ({
    id,
    title: sectionLabels[id],
    description:
      id === 'drugs'
        ? 'Drug Reference'
        : id === 'equipment'
          ? 'Machine • Airway • Monitoring'
          : id === 'fluids'
            ? 'IV Fluids'
            : id === 'stages'
              ? 'Stages of Anesthesia'
              : id === 'clinical'
                ? 'Clinical Guides'
                : id === 'terms'
                  ? 'Clinical Terms'
                  : 'Abbreviations',
    leading: <MedicalSiteIcon name={sectionIcons[id]} play loop size={25} />,
    onSelect: () => onSectionChange(id)
  }));

  return (
    <div className="space-y-4">
      <section>
        <div className="mb-1 px-1 text-right">
          <h2 className="text-lg font-black text-[#183149]">الدليل التخديري</h2>
        </div>

        <NotificationStackMenu
          title={sectionLabels[section]}
          description="اضغط لتغيير قسم الدليل"
          icon={<MedicalSiteIcon name={sectionIcons[section]} play loop size={27} />}
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
