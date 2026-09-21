import { DrugDirectory } from './DrugDirectory';
import { TermsDirectory } from './TermsDirectory';
import { AbbreviationsDirectory } from './AbbreviationsDirectory';

export type GuideSection = 'drugs' | 'terms' | 'abbreviations';

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
          className="h-10 rounded-xl border border-[#CCA039]/14 bg-[#0D2741] px-3 text-xs font-bold text-[#EEE8D6] outline-none"
          aria-label="اختيار قسم الدليل"
        >
          <option value="drugs">الأدوية</option>
          <option value="terms">المصطلحات</option>
          <option value="abbreviations">الاختصارات</option>
        </select>
        <div className="text-right">
          <h2 className="text-lg font-black text-[#EEE8D6]">الدليل التخديري</h2>
          <p className="mt-0.5 text-[10px] text-[#7E91A2]">أدوية • مصطلحات • اختصارات</p>
        </div>
      </div>

      {section === 'drugs' && (
        <DrugDirectory favorites={favorites} onToggleFavorite={onToggleFavorite} />
      )}
      {section === 'terms' && (
        <TermsDirectory favorites={favorites} onToggleFavorite={onToggleFavorite} />
      )}
      {section === 'abbreviations' && (
        <AbbreviationsDirectory favorites={favorites} onToggleFavorite={onToggleFavorite} />
      )}
    </div>
  );
}
