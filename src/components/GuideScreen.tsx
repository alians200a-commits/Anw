import { DrugDirectory } from './DrugDirectory';
import { TermsDirectory } from './TermsDirectory';
import { AbbreviationsDirectory } from './AbbreviationsDirectory';
import { EquipmentDirectory } from './EquipmentDirectory';
import { ClinicalGuidesDirectory } from './ClinicalGuidesDirectory';
import { FluidsDirectory } from './FluidsDirectory';
import { AnesthesiaStagesDirectory } from './AnesthesiaStagesDirectory';
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

const sectionMeta: Record<GuideSection, { eyebrow: string; description: string }> = {
  drugs: {
    eyebrow: 'DRUG REFERENCE',
    description: 'مرجع سريع ومنظم للأدوية المستخدمة في التخدير مع التصنيف والتفاصيل السريرية.'
  },
  equipment: {
    eyebrow: 'ANESTHESIA EQUIPMENT',
    description: 'عربة التخدير، مجرى الهواء، المراقبة والأدوات المهمة داخل بيئة التخدير.'
  },
  fluids: {
    eyebrow: 'IV FLUIDS',
    description: 'مراجعة السوائل الوريدية من حيث التركيب، الدور السريري والمحاذير.'
  },
  stages: {
    eyebrow: 'STAGES OF ANESTHESIA',
    description: 'تسلسل مراحل التخدير من التحضير والبدء إلى المحافظة والإفاقة.'
  },
  clinical: {
    eyebrow: 'CLINICAL GUIDES',
    description: 'مفاهيم وإجراءات سريرية مرتبة للرجوع السريع أثناء الدراسة والمراجعة.'
  },
  terms: {
    eyebrow: 'CLINICAL TERMS',
    description: 'المصطلحات الطبية المهمة بصياغة عربية واضحة مع المصطلح الطبي المقابل.'
  },
  abbreviations: {
    eyebrow: 'ABBREVIATIONS',
    description: 'اختصارات شائعة في التخدير والمراقبة والإجراءات السريرية.'
  }
};

const quickSections: GuideSection[] = [
  'drugs',
  'equipment',
  'fluids',
  'stages',
  'clinical',
  'terms',
  'abbreviations'
];

export function GuideScreen({
  section,
  onSectionChange,
  favorites,
  onToggleFavorite,
  initialDrugClass,
  initialQuery
}: GuideScreenProps) {
  const meta = sectionMeta[section];

  return (
    <div className="space-y-4">
      <section className="overflow-hidden rounded-[26px] border border-[#DCE5EA] bg-[linear-gradient(135deg,#FFFFFF_0%,#F2F6F9_58%,#F8F2E5_100%)] shadow-[0_12px_30px_rgba(16,45,79,0.07)]">
        <div className="flex items-start gap-3 px-4 pb-4 pt-4 text-right">
          <div className="min-w-0 flex-1">
            <div className="inline-flex rounded-full border border-[#D9A441]/20 bg-white/80 px-2.5 py-1 text-[9px] font-black tracking-[0.1em] text-[#9A7122]">
              {meta.eyebrow}
            </div>
            <h2 className="mt-2 text-xl font-black text-[#183149]">{sectionLabels[section]}</h2>
            <p className="mt-1.5 max-w-xl text-[11px] font-semibold leading-5 text-[#5F7280]">
              {meta.description}
            </p>
          </div>

          <div className="grid h-16 w-16 shrink-0 place-items-center rounded-[20px] border border-[#D7E2E9] bg-white/85 text-[#315672] shadow-[0_8px_20px_rgba(24,49,73,0.08)]">
            <MedicalSiteIcon name={sectionIcons[section]} size={36} />
          </div>
        </div>

        <div className="border-t border-[#E2E9EE] bg-white/65 px-3 py-2.5">
          <div className="overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <div className="flex min-w-max gap-2">
              {quickSections.map((id) => {
                const active = section === id;
                return (
                  <button
                    key={id}
                    type="button"
                    onClick={() => onSectionChange(id)}
                    aria-current={active ? 'page' : undefined}
                    className={
                      'flex min-h-10 items-center gap-2 rounded-[14px] border px-3 text-[10px] font-black outline-none transition focus-visible:ring-2 focus-visible:ring-[#CCA039]/45 ' +
                      (active
                        ? 'border-[#173A63] bg-[#173A63] text-white shadow-[0_6px_14px_rgba(23,58,99,0.16)]'
                        : 'border-[#DCE5EA] bg-white text-[#526675] active:bg-[#EEF3F6]')
                    }
                  >
                    <MedicalSiteIcon name={sectionIcons[id]} size={20} />
                    <span className="whitespace-nowrap">{sectionLabels[id]}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
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
