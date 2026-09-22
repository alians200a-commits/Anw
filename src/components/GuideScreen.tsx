import { DrugDirectory } from './DrugDirectory';
import { TermsDirectory } from './TermsDirectory';
import { AbbreviationsDirectory } from './AbbreviationsDirectory';
import { EquipmentDirectory } from './EquipmentDirectory';
import { ClinicalGuidesDirectory } from './ClinicalGuidesDirectory';
import { FluidsDirectory } from './FluidsDirectory';
import { AnesthesiaStagesDirectory } from './AnesthesiaStagesDirectory';
import type { DrugClass } from '../data/drugs';

export type GuideSection = 'drugs' | 'fluids' | 'equipment' | 'stages' | 'clinical' | 'terms' | 'abbreviations';

interface GuideScreenProps {
  section: GuideSection;
  onSectionChange: (section: GuideSection) => void;
  favorites: Set<string>;
  onToggleFavorite: (id: string) => void;
  initialDrugClass: 'all' | DrugClass;
  initialQuery: string;
}

export function GuideScreen({
  section,
  onSectionChange,
  favorites,
  onToggleFavorite,
  initialDrugClass,
  initialQuery
}: GuideScreenProps) {
  return (
    <div className="space-y-4">
      <div className="rounded-[18px] border border-[#E5DCEF] bg-[#FAF8FC] p-3.5">
        <div className="mb-2.5 text-right">
          <h2 className="text-lg font-black text-[#34293F]">الدليل التخديري</h2>
          <p className="mt-0.5 text-[10px] text-[#81758A]">اختار القسم، وبعدها التصنيف من داخل القسم</p>
        </div>
        <select
          value={section}
          onChange={(e) => onSectionChange(e.target.value as GuideSection)}
          className="h-11 w-full rounded-xl border border-[#DCCFEB] bg-white px-3 text-xs font-bold text-[#463653] outline-none"
          aria-label="اختيار قسم الدليل"
        >
          <option value="drugs">الأدوية</option>
          <option value="equipment">الأجهزة والأدوات</option>
          <option value="fluids">السوائل الوريدية</option>
          <option value="stages">مراحل التخدير | Stages of Anesthesia</option>
          <option value="clinical">المفاهيم والإجراءات</option>
          <option value="terms">المصطلحات</option>
          <option value="abbreviations">الاختصارات</option>
        </select>
      </div>

      {section === 'drugs' && (
        <DrugDirectory
          favorites={favorites}
          onToggleFavorite={onToggleFavorite}
          initialClassification={initialDrugClass}
          initialQuery={initialQuery}
        />
      )}
      {section === 'fluids' && <FluidsDirectory initialQuery={initialQuery} />}
      {section === 'equipment' && <EquipmentDirectory initialQuery={initialQuery} />}
      {section === 'stages' && <AnesthesiaStagesDirectory initialQuery={initialQuery} />}
      {section === 'clinical' && <ClinicalGuidesDirectory initialQuery={initialQuery} />}
      {section === 'terms' && (
        <TermsDirectory favorites={favorites} onToggleFavorite={onToggleFavorite} initialQuery={initialQuery} />
      )}
      {section === 'abbreviations' && (
        <AbbreviationsDirectory favorites={favorites} onToggleFavorite={onToggleFavorite} initialQuery={initialQuery} />
      )}
    </div>
  );
}
