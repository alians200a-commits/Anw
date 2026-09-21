import { DrugDirectory } from './DrugDirectory';
import { TermsDirectory } from './TermsDirectory';
import { AbbreviationsDirectory } from './AbbreviationsDirectory';
import { EquipmentDirectory } from './EquipmentDirectory';
import { ClinicalGuidesDirectory } from './ClinicalGuidesDirectory';
import { FluidsDirectory } from './FluidsDirectory';

export type GuideSection = 'drugs' | 'fluids' | 'equipment' | 'clinical' | 'terms' | 'abbreviations';

interface GuideScreenProps {
  section: GuideSection;
  onSectionChange: (section: GuideSection) => void;
  favorites: Set<string>;
  onToggleFavorite: (id: string) => void;
}

export function GuideScreen({
  section,
  onSectionChange,
  favorites,
  onToggleFavorite
}: GuideScreenProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <select
          value={section}
          onChange={(e) => onSectionChange(e.target.value as GuideSection)}
          className="h-10 rounded-xl border border-[#DCCFEB] bg-white px-3 text-xs font-bold text-[#463653] outline-none"
          aria-label="اختيار قسم الدليل"
        >
          <option value="drugs">الأدوية</option>
          <option value="fluids">السوائل الوريدية</option>
          <option value="equipment">الأجهزة والأدوات</option>
          <option value="clinical">المفاهيم والإجراءات</option>
          <option value="terms">المصطلحات</option>
          <option value="abbreviations">الاختصارات</option>
        </select>
        <div className="text-right">
          <h2 className="text-lg font-black text-[#34293F]">الدليل التخديري</h2>
          <p className="mt-0.5 text-[10px] text-[#81758A]">أدوية • سوائل • أجهزة • إجراءات • مصطلحات • اختصارات</p>
        </div>
      </div>

      {section === 'drugs' && (
        <DrugDirectory favorites={favorites} onToggleFavorite={onToggleFavorite} />
      )}
      {section === 'fluids' && <FluidsDirectory />}
      {section === 'equipment' && <EquipmentDirectory />}
      {section === 'clinical' && <ClinicalGuidesDirectory />}
      {section === 'terms' && (
        <TermsDirectory favorites={favorites} onToggleFavorite={onToggleFavorite} />
      )}
      {section === 'abbreviations' && (
        <AbbreviationsDirectory favorites={favorites} onToggleFavorite={onToggleFavorite} />
      )}
    </div>
  );
}
