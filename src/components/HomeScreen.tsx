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
  Wrench
} from '@phosphor-icons/react';
import { ANESTHESIA_DRUGS, DRUG_CLASS_LABELS } from '../data/drugs';
import { CLINICAL_TERMS } from '../data/clinicalTerms';
import { ANESTHESIA_EQUIPMENT } from '../data/equipment';
import type { AppTab } from './BottomNav';
import type { GuideSection } from './GuideScreen';
import { MedicinesHealthIcon } from './MedicalIcons';

interface HomeScreenProps {
  query: string;
  setQuery: (value: string) => void;
  openGuide: (section: GuideSection) => void;
  goTo: (tab: AppTab) => void;
}

export function HomeScreen({ query, setQuery, openGuide, goTo }: HomeScreenProps) {
  const [openMenu, setOpenMenu] = useState<'guide' | 'learn' | null>('guide');
  const normalized = query.trim().toLowerCase();

  const drugResults = normalized
    ? ANESTHESIA_DRUGS.filter((drug) =>
        [drug.en, drug.ar, drug.categoryAr, ...drug.classes.map((item) => DRUG_CLASS_LABELS[item]), ...drug.tags].some((value) =>
          value.toLowerCase().includes(normalized)
        )
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

  const resultCount = drugResults.length + equipmentResults.length + abbreviationResults.length + termResults.length;

  return (
    <div className="space-y-4">
      <section>
        <p className="text-[11px] font-bold text-[#CCA039]">دليلك السريع في التخدير</p>
        <h2 className="mt-1 text-xl font-black text-[#EEE8D6]">ابحث أو اختار القسم</h2>

        <div className="relative mt-3">
          <MagnifyingGlass
            size={19}
            weight="bold"
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#CCA039]"
          />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Propofol، بروبوفول، MAC..."
            className="h-12 w-full rounded-xl border border-[#CCA039]/12 bg-[#071B2D] pr-11 pl-3 text-sm font-semibold text-[#EEE8D6] outline-none placeholder:text-[#64798B] focus:border-[#CCA039]/45"
          />
        </div>

        {normalized && (
          <div className="mt-2 overflow-hidden rounded-xl border border-[#CCA039]/10 bg-[#0D2741]">
            <div className="flex items-center justify-between border-b border-white/5 px-3 py-2">
              <span className="text-[10px] text-[#8192A1]">{resultCount} نتيجة</span>
              <span className="text-xs font-bold text-[#EEE8D6]">نتائج البحث</span>
            </div>

            {drugResults.map((drug) => (
              <button
                key={drug.id}
                onClick={() => openGuide('drugs')}
                className="flex w-full items-center gap-3 border-b border-white/5 px-3 py-2.5 text-right last:border-0"
              >
                <div className="grid h-8 w-8 place-items-center rounded-lg bg-[#CCA039]/8 text-[#CCA039]">
                  <MedicinesHealthIcon className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <div className="text-xs font-black text-[#EEE8D6]" dir="ltr">{drug.en}</div>
                  <div className="mt-0.5 text-[10px] text-[#8294A4]">{drug.ar}</div>
                </div>
                <CaretLeft size={14} className="text-[#62788B]" />
              </button>
            ))}

            {equipmentResults.map((item) => (
              <button
                key={item.id}
                onClick={() => openGuide('equipment')}
                className="flex w-full items-center gap-3 border-b border-white/5 px-3 py-2.5 text-right last:border-0"
              >
                <div className="grid h-8 w-8 place-items-center rounded-lg bg-[#CCA039]/8 text-[#CCA039]">
                  <Wrench size={18} weight="bold" />
                </div>
                <div className="flex-1">
                  <div className="text-xs font-black text-[#EEE8D6]">{item.nameAr}</div>
                  <div className="mt-0.5 text-[10px] text-[#8294A4]" dir="ltr">{item.nameEn}</div>
                </div>
                <CaretLeft size={14} className="text-[#62788B]" />
              </button>
            ))}

            {abbreviationResults.map((term) => (
              <button
                key={term.id}
                onClick={() => openGuide('abbreviations')}
                className="flex w-full items-center gap-3 border-b border-white/5 px-3 py-2.5 text-right last:border-0"
              >
                <div className="grid h-8 w-8 place-items-center rounded-lg bg-[#CCA039]/8 text-[#CCA039]">
                  <TextAa size={18} weight="bold" />
                </div>
                <div className="flex-1">
                  <div className="text-xs font-black text-[#EEE8D6]" dir="ltr">{term.abbr}</div>
                  <div className="mt-0.5 text-[10px] text-[#8294A4]">{term.en}</div>
                </div>
                <CaretLeft size={14} className="text-[#62788B]" />
              </button>
            ))}

            {termResults.map((term) => (
              <button
                key={term.id}
                onClick={() => openGuide('terms')}
                className="flex w-full items-center gap-3 border-b border-white/5 px-3 py-2.5 text-right last:border-0"
              >
                <div className="grid h-8 w-8 place-items-center rounded-lg bg-[#CCA039]/8 text-[#CCA039]">
                  <BookOpenText size={18} />
                </div>
                <div className="flex-1">
                  <div className="text-xs font-black text-[#EEE8D6]" dir="ltr">{term.en}</div>
                  <div className="mt-0.5 text-[10px] text-[#8294A4]">{term.ar}</div>
                </div>
                <CaretLeft size={14} className="text-[#62788B]" />
              </button>
            ))}

            {resultCount === 0 && (
              <div className="px-3 py-5 text-center text-xs text-[#74889A]">ماكو نتيجة مطابقة.</div>
            )}
          </div>
        )}
      </section>

      <section className="space-y-2">
        <div className="overflow-hidden rounded-[18px] border border-[#CCA039]/10 bg-[#0D2741]">
          <button
            onClick={() => setOpenMenu(openMenu === 'guide' ? null : 'guide')}
            className="flex w-full items-center justify-between px-4 py-3.5"
          >
            <CaretDown
              size={18}
              className={'text-[#71879A] transition ' + (openMenu === 'guide' ? 'rotate-180' : '')}
            />
            <div className="flex items-center gap-3">
              <div>
                <h3 className="text-sm font-black text-[#EEE8D6]">الدليل التخديري</h3>
                <p className="mt-0.5 text-[10px] text-[#7F91A1]">أدوية، أجهزة وأدوات، مصطلحات، اختصارات</p>
              </div>
              <div className="grid h-9 w-9 place-items-center rounded-xl bg-[#CCA039]/8 text-[#CCA039]">
                <BookOpenText size={20} />
              </div>
            </div>
          </button>

          {openMenu === 'guide' && (
            <div className="border-t border-white/5 px-2 py-2">
              <button onClick={() => openGuide('drugs')} className="flex w-full items-center justify-between rounded-xl px-2.5 py-2.5 active:bg-white/[0.03]">
                <CaretLeft size={15} className="text-[#5F7488]" />
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-[#DDE2E6]">الأدوية</span>
                  <MedicinesHealthIcon className="h-5 w-5 text-[#CCA039]" />
                </div>
              </button>
              <button onClick={() => openGuide('equipment')} className="flex w-full items-center justify-between rounded-xl px-2.5 py-2.5 active:bg-white/[0.03]">
                <CaretLeft size={15} className="text-[#5F7488]" />
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-[#DDE2E6]">الأجهزة والأدوات</span>
                  <Wrench size={20} weight="bold" className="text-[#CCA039]" />
                </div>
              </button>
              <button onClick={() => openGuide('terms')} className="flex w-full items-center justify-between rounded-xl px-2.5 py-2.5 active:bg-white/[0.03]">
                <CaretLeft size={15} className="text-[#5F7488]" />
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-[#DDE2E6]">المصطلحات</span>
                  <BookOpenText size={20} className="text-[#CCA039]" />
                </div>
              </button>
              <button onClick={() => openGuide('abbreviations')} className="flex w-full items-center justify-between rounded-xl px-2.5 py-2.5 active:bg-white/[0.03]">
                <CaretLeft size={15} className="text-[#5F7488]" />
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-[#DDE2E6]">الاختصارات</span>
                  <TextAa size={20} weight="bold" className="text-[#CCA039]" />
                </div>
              </button>
            </div>
          )}
        </div>

        <div className="overflow-hidden rounded-[18px] border border-[#CCA039]/10 bg-[#0D2741]">
          <button
            onClick={() => setOpenMenu(openMenu === 'learn' ? null : 'learn')}
            className="flex w-full items-center justify-between px-4 py-3.5"
          >
            <CaretDown
              size={18}
              className={'text-[#71879A] transition ' + (openMenu === 'learn' ? 'rotate-180' : '')}
            />
            <div className="flex items-center gap-3">
              <div>
                <h3 className="text-sm font-black text-[#EEE8D6]">تعلّم واختبر نفسك</h3>
                <p className="mt-0.5 text-[10px] text-[#7F91A1]">الألعاب والتحديات التفاعلية</p>
              </div>
              <div className="grid h-9 w-9 place-items-center rounded-xl bg-[#CCA039]/8 text-[#CCA039]">
                <GameController size={20} />
              </div>
            </div>
          </button>

          {openMenu === 'learn' && (
            <div className="border-t border-white/5 px-2 py-2">
              <button onClick={() => goTo('games')} className="flex w-full items-center justify-between rounded-xl px-2.5 py-2.5 active:bg-white/[0.03]">
                <CaretLeft size={15} className="text-[#5F7488]" />
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-[#DDE2E6]">ألعاب مملكة التخدير</span>
                  <GameController size={20} className="text-[#CCA039]" />
                </div>
              </button>
            </div>
          )}
        </div>

        <button
          onClick={() => goTo('favorites')}
          className="flex w-full items-center justify-between rounded-[18px] border border-[#CCA039]/10 bg-[#0D2741] px-4 py-3.5"
        >
          <CaretLeft size={18} className="text-[#71879A]" />
          <div className="flex items-center gap-3">
            <div>
              <h3 className="text-sm font-black text-[#EEE8D6]">المحفوظات</h3>
              <p className="mt-0.5 text-[10px] text-[#7F91A1]">العناصر اللي حفظتها فقط</p>
            </div>
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-[#CCA039]/8 text-[#CCA039]">
              <BookmarkSimple size={20} />
            </div>
          </div>
        </button>
      </section>
    </div>
  );
}
