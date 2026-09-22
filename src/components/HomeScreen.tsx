import { useState } from 'react';
import {
  BookmarkSimple,
  BookOpenText,
  CaretDown,
  CaretLeft,
  GameController,
  MagnifyingGlass,
  Pill,
  TextAa,
  Wrench,
  Drop
} from '@phosphor-icons/react';
import { ANESTHESIA_DRUGS, DRUG_CLASS_LABELS, DRUG_FILTERS, type DrugClass } from '../data/drugs';
import { CLINICAL_TERMS } from '../data/clinicalTerms';
import { ANESTHESIA_EQUIPMENT } from '../data/equipment';
import { CLINICAL_GUIDES } from '../data/clinicalGuides';
import { ANESTHESIA_STAGE_GUIDE_IDS } from '../data/anesthesiaStages';
import { INTRAVENOUS_FLUIDS } from '../data/fluids';
import type { AppTab } from './BottomNav';
import type { GuideSection } from './GuideScreen';
import { MedicinesHealthIcon } from './MedicalIcons';

interface HomeScreenProps {
  query: string;
  setQuery: (value: string) => void;
  openGuide: (section: GuideSection, drugClass?: 'all' | DrugClass, initialQuery?: string) => void;
  goTo: (tab: AppTab) => void;
}

export function HomeScreen({ query, setQuery, openGuide, goTo }: HomeScreenProps) {
  const [openMenu, setOpenMenu] = useState<'guide' | 'learn' | null>('guide');
  const [openGuideSubmenu, setOpenGuideSubmenu] = useState<'drugs' | null>(null);
  const normalized = query.trim().toLowerCase();

  const drugResults = normalized
    ? ANESTHESIA_DRUGS.filter((drug) =>
        [drug.en, drug.ar, drug.categoryAr, ...drug.classes.map((item) => DRUG_CLASS_LABELS[item]), ...drug.tags].some((value) =>
          value.toLowerCase().includes(normalized)
        )
      ).slice(0, 3)
    : [];

  const fluidResults = normalized
    ? INTRAVENOUS_FLUIDS.filter((item) =>
        [
          item.nameAr,
          item.nameEn,
          item.categoryAr,
          item.composition,
          ...item.tags
        ].some((value) => value.toLowerCase().includes(normalized))
      ).slice(0, 3)
    : [];

  const equipmentResults = normalized
    ? ANESTHESIA_EQUIPMENT.filter((item) =>
        [
          item.nameAr,
          item.nameEn,
          item.categoryAr,
          item.summary,
          ...item.tags
        ].some((value) => value.toLowerCase().includes(normalized))
      ).slice(0, 3)
    : [];

  const stageResults = normalized
    ? CLINICAL_GUIDES.filter(
        (guide) =>
          ANESTHESIA_STAGE_GUIDE_IDS.has(guide.id) &&
          [
            guide.titleAr,
            guide.titleEn,
            guide.categoryAr,
            guide.summary,
            ...guide.tags
          ].some((value) => value.toLowerCase().includes(normalized))
      ).slice(0, 3)
    : [];

  const clinicalResults = normalized
    ? CLINICAL_GUIDES.filter(
        (guide) =>
          !ANESTHESIA_STAGE_GUIDE_IDS.has(guide.id) &&
          [
            guide.titleAr,
            guide.titleEn,
            guide.categoryAr,
            guide.summary,
            ...guide.tags
          ].some((value) => value.toLowerCase().includes(normalized))
      ).slice(0, 3)
    : [];

  const abbreviationResults = normalized
    ? CLINICAL_TERMS.filter((term) =>
        Boolean(term.abbr) &&
        [term.en, term.ar, term.abbr ?? '', term.definition, ...term.tags].some((value) =>
          value.toLowerCase().includes(normalized)
        )
      ).slice(0, 3)
    : [];

  const termResults = normalized
    ? CLINICAL_TERMS.filter((term) =>
        !term.abbr &&
        [term.en, term.ar, term.definition, ...term.tags].some((value) =>
          value.toLowerCase().includes(normalized)
        )
      ).slice(0, 3)
    : [];

  const resultCount = drugResults.length + fluidResults.length + equipmentResults.length + stageResults.length + clinicalResults.length + abbreviationResults.length + termResults.length;

  return (
    <div className="space-y-4">
      <section>
        <p className="text-[11px] font-bold text-[#6C4AA5]">دليلك السريع في التخدير</p>
        <h2 className="mt-1 text-xl font-black text-[#34293F]">ابحث أو اختار القسم</h2>

        <div className="relative mt-3">
          <MagnifyingGlass
            size={19}
            weight="bold"
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#6C4AA5]"
          />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Propofol، بروبوفول، MAC..."
            className="h-12 w-full rounded-xl border border-[#DCCFEB] bg-white pr-11 pl-3 text-sm font-semibold text-[#3D3348] outline-none placeholder:text-[#9B91A3] focus:border-[#A78AC8]"
          />
        </div>

        {normalized && (
          <div className="mt-2 overflow-hidden rounded-xl border border-[#E5DAEF] bg-[#FBF9FD]">
            <div className="flex items-center justify-between border-b border-[#EAE3F0] px-3 py-2">
              <span className="text-[10px] text-[#7B7382]">{resultCount} نتيجة سريعة</span>
              <span className="text-xs font-bold text-[#34293F]">نتائج البحث</span>
            </div>

            {drugResults.map((drug) => (
              <button
                key={drug.id}
                onClick={() => openGuide('drugs', 'all', drug.en)}
                className="flex w-full items-center gap-3 border-b border-[#EAE3F0] px-3 py-2.5 text-right last:border-0"
              >
                <div className="grid h-8 w-8 place-items-center rounded-lg bg-[#EEE6F6] text-[#6C4AA5]">
                  <MedicinesHealthIcon className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <div className="text-xs font-black text-[#34293F]">{drug.ar}</div>
                  <div className="mt-0.5 text-[10px] text-[#756E7C]" dir="ltr">{drug.en}</div>
                </div>
                <CaretLeft size={14} className="text-[#8B7D97]" />
              </button>
            ))}

            {fluidResults.map((item) => (
              <button
                key={item.id}
                onClick={() => openGuide('fluids', 'all', item.nameEn)}
                className="flex w-full items-center gap-3 border-b border-[#EAE3F0] px-3 py-2.5 text-right last:border-0"
              >
                <div className="grid h-8 w-8 place-items-center rounded-lg bg-[#EEE6F6] text-[#6C4AA5]">
                  <Drop size={18} weight="fill" />
                </div>
                <div className="flex-1">
                  <div className="text-xs font-black text-[#34293F]">{item.nameAr}</div>
                  <div className="mt-0.5 text-[10px] text-[#756E7C]" dir="ltr">{item.nameEn}</div>
                </div>
                <CaretLeft size={14} className="text-[#8B7D97]" />
              </button>
            ))}

            {equipmentResults.map((item) => (
              <button
                key={item.id}
                onClick={() => openGuide('equipment', 'all', item.nameEn)}
                className="flex w-full items-center gap-3 border-b border-[#EAE3F0] px-3 py-2.5 text-right last:border-0"
              >
                <div className="grid h-8 w-8 place-items-center rounded-lg bg-[#EEE6F6] text-[#6C4AA5]">
                  <Wrench size={18} weight="bold" />
                </div>
                <div className="flex-1">
                  <div className="text-xs font-black text-[#34293F]">{item.nameAr}</div>
                  <div className="mt-0.5 text-[10px] text-[#756E7C]" dir="ltr">{item.nameEn}</div>
                </div>
                <CaretLeft size={14} className="text-[#8B7D97]" />
              </button>
            ))}

            {stageResults.map((guide) => (
              <button
                key={guide.id}
                onClick={() => openGuide('stages', 'all', guide.titleEn)}
                className="flex w-full items-center gap-3 border-b border-[#EAE3F0] px-3 py-2.5 text-right last:border-0"
              >
                <div className="grid h-8 w-8 place-items-center rounded-lg bg-[#F3ECF8] text-[#6C4AA5]">
                  <BookOpenText size={18} />
                </div>
                <div className="flex-1">
                  <div className="text-xs font-black text-[#34293F]">{guide.titleAr}</div>
                  <div className="mt-0.5 text-[10px] text-[#756E7C]" dir="ltr">{guide.titleEn}</div>
                  <div className="mt-0.5 text-[9px] font-bold text-[#8A7B96]">مراحل التخدير</div>
                </div>
                <CaretLeft size={14} className="text-[#8B7D97]" />
              </button>
            ))}

            {clinicalResults.map((guide) => (
              <button
                key={guide.id}
                onClick={() => openGuide('clinical', 'all', guide.titleEn)}
                className="flex w-full items-center gap-3 border-b border-[#EAE3F0] px-3 py-2.5 text-right last:border-0"
              >
                <div className="grid h-8 w-8 place-items-center rounded-lg bg-[#EEE6F6] text-[#6C4AA5]">
                  <BookOpenText size={18} />
                </div>
                <div className="flex-1">
                  <div className="text-xs font-black text-[#34293F]">{guide.titleAr}</div>
                  <div className="mt-0.5 text-[10px] text-[#756E7C]" dir="ltr">{guide.titleEn}</div>
                </div>
                <CaretLeft size={14} className="text-[#8B7D97]" />
              </button>
            ))}

            {abbreviationResults.map((term) => (
              <button
                key={term.id}
                onClick={() => openGuide('abbreviations', 'all', term.abbr ?? term.en)}
                className="flex w-full items-center gap-3 border-b border-[#EAE3F0] px-3 py-2.5 text-right last:border-0"
              >
                <div className="grid h-8 w-8 place-items-center rounded-lg bg-[#EEE6F6] text-[#6C4AA5]">
                  <TextAa size={18} weight="bold" />
                </div>
                <div className="flex-1">
                  <div className="text-xs font-black text-[#34293F]" dir="ltr">{term.abbr}</div>
                  <div className="mt-0.5 text-[10px] text-[#756E7C]">{term.ar}</div>
                  <div className="mt-0.5 text-[9px] text-[#8A8190]" dir="ltr">{term.en}</div>
                </div>
                <CaretLeft size={14} className="text-[#8B7D97]" />
              </button>
            ))}

            {termResults.map((term) => (
              <button
                key={term.id}
                onClick={() => openGuide('terms', 'all', term.en)}
                className="flex w-full items-center gap-3 border-b border-[#EAE3F0] px-3 py-2.5 text-right last:border-0"
              >
                <div className="grid h-8 w-8 place-items-center rounded-lg bg-[#EEE6F6] text-[#6C4AA5]">
                  <BookOpenText size={18} />
                </div>
                <div className="flex-1">
                  <div className="text-xs font-black text-[#34293F]">{term.ar}</div>
                  <div className="mt-0.5 text-[10px] text-[#756E7C]" dir="ltr">{term.en}</div>
                </div>
                <CaretLeft size={14} className="text-[#8B7D97]" />
              </button>
            ))}

            {resultCount === 0 && (
              <div className="px-3 py-5 text-center text-xs text-[#83798A]">ماكو نتيجة مطابقة.</div>
            )}
          </div>
        )}
      </section>

      <section className="space-y-2">
        <div className="overflow-hidden rounded-[18px] border border-[#E3D8EE] bg-[#F7F2FB]">
          <button
            onClick={() => setOpenMenu(openMenu === 'guide' ? null : 'guide')}
            className="flex w-full items-center justify-between px-4 py-3.5"
          >
            <CaretDown
              size={18}
              className={'text-[#7B6F88] transition ' + (openMenu === 'guide' ? 'rotate-180' : '')}
            />
            <div className="flex items-center gap-3">
              <div>
                <h3 className="text-sm font-black text-[#34293F]">الدليل التخديري</h3>
                <p className="mt-0.5 text-[10px] text-[#81758A]">أدوية، سوائل، أجهزة، مراحل التخدير، إجراءات، مصطلحات، اختصارات</p>
              </div>
              <div className="grid h-9 w-9 place-items-center rounded-xl bg-[#EEE6F6] text-[#6C4AA5]">
                <BookOpenText size={20} />
              </div>
            </div>
          </button>

          {openMenu === 'guide' && (
            <div className="space-y-1.5 border-t border-black/[0.05] p-2">
              <div className="overflow-hidden rounded-xl border border-[#E3D8EE] bg-[#FBF8FD]">
                <button
                  type="button"
                  onClick={() => setOpenGuideSubmenu(openGuideSubmenu === 'drugs' ? null : 'drugs')}
                  className="flex w-full items-center justify-between px-3 py-2.5"
                >
                  <CaretDown
                    size={15}
                    className={'text-[#806D94] transition ' + (openGuideSubmenu === 'drugs' ? 'rotate-180' : '')}
                  />
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <span className="block text-xs font-black text-[#493A58]">الأدوية</span>
                      <span className="mt-0.5 block text-[9px] text-[#8A7B96]">حسب التصنيف</span>
                    </div>
                    <div className="grid h-8 w-8 place-items-center rounded-lg bg-[#EEE6F6] text-[#6C4AA5]">
                      <MedicinesHealthIcon className="h-5 w-5" />
                    </div>
                  </div>
                </button>

                {openGuideSubmenu === 'drugs' && (
                  <div className="grid grid-cols-2 gap-1.5 border-t border-[#E9E0F0] p-2.5">
                    {DRUG_FILTERS.map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => openGuide('drugs', item.id as 'all' | DrugClass)}
                        className="rounded-lg border border-[#E6DCEE] bg-white px-2.5 py-2 text-[10px] font-bold text-[#66566F] active:bg-[#F1EAF7]"
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <button
                onClick={() => openGuide('equipment')}
                className="flex w-full items-center justify-between rounded-xl border border-[#DCE8F2] bg-[#F6FAFD] px-3 py-2.5 active:bg-[#EEF5FA]"
              >
                <CaretLeft size={15} className="text-[#71869A]" />
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-[#40515F]">الأجهزة والأدوات</span>
                  <div className="grid h-8 w-8 place-items-center rounded-lg bg-[#EAF2F8] text-[#557491]">
                    <Wrench size={18} weight="bold" />
                  </div>
                </div>
              </button>

              <button
                onClick={() => openGuide('fluids')}
                className="flex w-full items-center justify-between rounded-xl border border-[#D7EAE7] bg-[#F4FAF9] px-3 py-2.5 active:bg-[#EAF5F3]"
              >
                <CaretLeft size={15} className="text-[#6B8984]" />
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-[#405957]">السوائل الوريدية</span>
                  <div className="grid h-8 w-8 place-items-center rounded-lg bg-[#E5F2EF] text-[#4E7D77]">
                    <Drop size={18} weight="fill" />
                  </div>
                </div>
              </button>

              <button
                onClick={() => openGuide('stages')}
                className="flex w-full items-center justify-between rounded-xl border border-[#E5DCEF] bg-[#FAF8FC] px-3 py-2.5 active:bg-[#F3ECF8]"
              >
                <CaretLeft size={15} className="text-[#806D94]" />
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <span className="block text-xs font-bold text-[#493A58]">مراحل التخدير</span>
                    <span className="mt-0.5 block text-[9px] text-[#8A7B96]" dir="ltr">Stages of Anesthesia</span>
                  </div>
                  <div className="grid h-8 w-8 place-items-center rounded-lg bg-[#EEE6F6] text-[#6C4AA5]">
                    <BookOpenText size={18} />
                  </div>
                </div>
              </button>

              <button
                onClick={() => openGuide('clinical')}
                className="flex w-full items-center justify-between rounded-xl border border-[#DCEADF] bg-[#F5FAF6] px-3 py-2.5 active:bg-[#ECF6EF]"
              >
                <CaretLeft size={15} className="text-[#6D8774]" />
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-[#415449]">المفاهيم والإجراءات</span>
                  <div className="grid h-8 w-8 place-items-center rounded-lg bg-[#E8F3EA] text-[#557761]">
                    <BookOpenText size={18} />
                  </div>
                </div>
              </button>

              <button
                onClick={() => openGuide('terms')}
                className="flex w-full items-center justify-between rounded-xl border border-[#F0E1D3] bg-[#FFF9F3] px-3 py-2.5 active:bg-[#FFF3E8]"
              >
                <CaretLeft size={15} className="text-[#907665]" />
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-[#56473E]">المصطلحات</span>
                  <div className="grid h-8 w-8 place-items-center rounded-lg bg-[#F8EBDD] text-[#9A6B45]">
                    <BookOpenText size={18} />
                  </div>
                </div>
              </button>

              <button
                onClick={() => openGuide('abbreviations')}
                className="flex w-full items-center justify-between rounded-xl border border-[#E4DCF0] bg-[#F8F5FC] px-3 py-2.5 active:bg-[#F1EBF8]"
              >
                <CaretLeft size={15} className="text-[#806F94]" />
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-[#4F415E]">الاختصارات</span>
                  <div className="grid h-8 w-8 place-items-center rounded-lg bg-[#EEE8F6] text-[#6C4AA5]">
                    <TextAa size={18} weight="bold" />
                  </div>
                </div>
              </button>
            </div>
          )}
        </div>

        <div className="overflow-hidden rounded-[18px] border border-[#DCE8F2] bg-[#F2F7FB]">
          <button
            onClick={() => setOpenMenu(openMenu === 'learn' ? null : 'learn')}
            className="flex w-full items-center justify-between px-4 py-3.5"
          >
            <CaretDown
              size={18}
              className={'text-[#7B6F88] transition ' + (openMenu === 'learn' ? 'rotate-180' : '')}
            />
            <div className="flex items-center gap-3">
              <div>
                <h3 className="text-sm font-black text-[#34293F]">تعلّم واختبر نفسك</h3>
                <p className="mt-0.5 text-[10px] text-[#81758A]">الألعاب والتحديات التفاعلية</p>
              </div>
              <div className="grid h-9 w-9 place-items-center rounded-xl bg-[#EEE6F6] text-[#6C4AA5]">
                <GameController size={20} />
              </div>
            </div>
          </button>

          {openMenu === 'learn' && (
            <div className="border-t border-black/[0.05] px-2 py-2">
              <button onClick={() => goTo('games')} className="flex w-full items-center justify-between rounded-xl px-2.5 py-2.5 active:bg-black/[0.025]">
                <CaretLeft size={15} className="text-[#887B94]" />
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-[#43384D]">ألعاب مملكة التخدير</span>
                  <GameController size={20} className="text-[#6C4AA5]" />
                </div>
              </button>
            </div>
          )}
        </div>

        <button
          onClick={() => goTo('favorites')}
          className="flex w-full items-center justify-between rounded-[18px] border border-[#DCEADF] bg-[#F2F8F4] px-4 py-3.5"
        >
          <CaretLeft size={18} className="text-[#7B6F88]" />
          <div className="flex items-center gap-3">
            <div>
              <h3 className="text-sm font-black text-[#34293F]">المحفوظات</h3>
              <p className="mt-0.5 text-[10px] text-[#81758A]">العناصر اللي حفظتها فقط</p>
            </div>
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-[#EEE6F6] text-[#6C4AA5]">
              <BookmarkSimple size={20} />
            </div>
          </div>
        </button>
      </section>
    </div>
  );
}
