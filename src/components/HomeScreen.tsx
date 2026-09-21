import { AnimatePresence, motion } from 'motion/react';
import {
  ArrowLeft,
  BookOpenText,
  BookmarkSimple,
  GameController,
  Heart,
  MagnifyingGlass,
  Sparkle,
  SpeakerHigh
} from '@phosphor-icons/react';
import { ANESTHESIA_DRUGS } from '../data/drugs';
import { CLINICAL_TERMS } from '../data/clinicalTerms';
import { speakTerm } from '../utils/speech';
import type { AppTab } from './BottomNav';
import { MedicinesHealthIcon } from './MedicalIcons';

interface HomeScreenProps {
  query: string;
  setQuery: (value: string) => void;
  goTo: (tab: AppTab) => void;
  onToggleFavorite: (id: string) => void;
  favorites: Set<string>;
}

const quickActions = [
  { id: 'drugs' as const, title: 'الأدوية', subtitle: 'دليل دوائي سريع', kind: 'drug' as const },
  { id: 'terms' as const, title: 'المصطلحات', subtitle: 'عربي • إنكليزي • اختصارات', icon: BookOpenText },
  { id: 'favorites' as const, title: 'المحفوظات', subtitle: 'ارجع لها بسرعة', icon: BookmarkSimple },
  { id: 'games' as const, title: 'تحدّي التخدير', subtitle: 'تعلم بطريقة تفاعلية', icon: GameController }
];

export function HomeScreen({
  query,
  setQuery,
  goTo,
  onToggleFavorite,
  favorites
}: HomeScreenProps) {
  const normalized = query.trim().toLowerCase();
  const drugResults = normalized
    ? ANESTHESIA_DRUGS.filter((d) =>
        [d.en, d.ar, d.categoryAr, ...d.tags].some((value) =>
          value.toLowerCase().includes(normalized)
        )
      ).slice(0, 4)
    : [];

  const termResults = normalized
    ? CLINICAL_TERMS.filter((term) =>
        [term.en, term.ar, term.abbr ?? '', term.definition, ...term.tags].some((value) =>
          value.toLowerCase().includes(normalized)
        )
      ).slice(0, 4)
    : [];

  return (
    <div className="space-y-5">
      <section className="relative overflow-hidden rounded-[22px] border border-[#CCA039]/14 bg-[#0D2741] p-4">
        <div className="mb-3 flex items-start justify-between gap-3">
          <div>
            <p className="text-[11px] font-bold text-[#CCA039]">دليلك السريع في التخدير</p>
            <h2 className="mt-1 text-xl font-black leading-tight text-[#EEE8D6]">
              شنو تريد تبحث اليوم؟
            </h2>
            <p className="mt-1.5 text-xs leading-5 text-[#95A5B3]">
              دواء، مصطلح، اختصار أو معنى بالعربي.
            </p>
          </div>
          <div className="rounded-xl border border-[#CCA039]/14 bg-[#CCA039]/8 p-2 text-[#CCA039]">
            <Sparkle size={18} weight="fill" />
          </div>
        </div>

        <div className="relative">
          <MagnifyingGlass
            size={19}
            weight="bold"
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#CCA039]"
          />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Propofol، بروبوفول، MAC..."
            className="h-12 w-full rounded-xl border border-white/7 bg-[#071B2D] pr-11 pl-3 text-sm font-semibold text-[#EEE8D6] outline-none placeholder:text-[#64798B] focus:border-[#CCA039]/45"
          />
        </div>
      </section>

      <AnimatePresence initial={false}>
        {normalized && (
          <motion.section
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            className="rounded-[20px] border border-[#CCA039]/12 bg-[#0D2741]/90 p-3"
          >
            <div className="mb-2 flex items-center justify-between px-1">
              <h3 className="text-sm font-black text-[#EEE8D6]">نتائج البحث</h3>
              <span className="text-[10px] text-[#8999A9]">
                {drugResults.length + termResults.length} نتيجة
              </span>
            </div>

            <div className="space-y-2">
              {drugResults.map((drug) => (
                <button
                  key={drug.id}
                  onClick={() => goTo('drugs')}
                  className="flex w-full items-center justify-between rounded-xl border border-white/5 bg-[#081D31] p-3 text-right"
                >
                  <ArrowLeft size={16} className="text-[#CCA039]" />
                  <div className="flex-1 px-3">
                    <div className="flex items-center justify-end gap-2">
                      <span className="text-xs text-[#9EADBA]">{drug.ar}</span>
                      <strong className="text-sm text-[#EEE8D6]" dir="ltr">{drug.en}</strong>
                    </div>
                    <p className="mt-1 text-[10px] text-[#718395]">{drug.categoryAr}</p>
                  </div>
                  <div className="grid h-9 w-9 place-items-center rounded-xl bg-[#CCA039]/9 text-[#CCA039]">
                    <MedicinesHealthIcon className="h-5 w-5" />
                  </div>
                </button>
              ))}

              {termResults.map((term) => (
                <button
                  key={term.id}
                  onClick={() => goTo('terms')}
                  className="flex w-full items-center justify-between rounded-xl border border-white/5 bg-[#081D31] p-3 text-right"
                >
                  <ArrowLeft size={16} className="text-[#CCA039]" />
                  <div className="flex-1 px-3">
                    <div className="flex items-center justify-end gap-2">
                      <span className="text-xs text-[#9EADBA]">{term.ar}</span>
                      <strong className="text-sm text-[#EEE8D6]" dir="ltr">
                        {term.abbr || term.en}
                      </strong>
                    </div>
                    <p className="mt-1 line-clamp-1 text-[10px] text-[#718395]">{term.en}</p>
                  </div>
                  <div className="grid h-9 w-9 place-items-center rounded-xl bg-white/[0.035] text-[#CCA039]">
                    <BookOpenText size={19} weight="regular" />
                  </div>
                </button>
              ))}

              {drugResults.length === 0 && termResults.length === 0 && (
                <div className="px-3 py-5 text-center text-sm text-[#7E91A2]">
                  ما لكينا نتيجة مطابقة.
                </div>
              )}
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      <section>
        <div className="mb-2.5 flex items-end justify-between">
          <span className="text-[10px] font-bold text-[#6F8496]">4 أقسام</span>
          <div>
            <h3 className="text-base font-black text-[#EEE8D6]">الوصول السريع</h3>
            <p className="mt-0.5 text-[10px] text-[#7F91A1]">كلشي مهم قريب من إيدك</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          {quickActions.map((item, index) => {
            const Icon = 'icon' in item ? item.icon : null;
            return (
              <motion.button
                key={item.id}
                whileTap={{ scale: 0.98 }}
                onClick={() => goTo(item.id)}
                className="min-h-[104px] rounded-[19px] border border-[#CCA039]/10 bg-[#0D2741] p-3 text-right"
              >
                <div className="flex items-start justify-between">
                  <span className="text-[9px] font-black text-[#536A7D]">0{index + 1}</span>
                  <div className="grid h-10 w-10 place-items-center rounded-xl border border-[#CCA039]/13 bg-[#CCA039]/7 text-[#CCA039]">
                    {'kind' in item && item.kind === 'drug'
                      ? <MedicinesHealthIcon className="h-6 w-6" />
                      : Icon && <Icon size={22} weight="regular" />}
                  </div>
                </div>
                <h4 className="mt-3 text-sm font-black text-[#EEE8D6]">{item.title}</h4>
                <p className="mt-1 text-[10px] leading-4 text-[#8192A1]">{item.subtitle}</p>
              </motion.button>
            );
          })}
        </div>
      </section>

      <section>
        <div className="mb-2.5 text-right">
          <h3 className="text-base font-black text-[#EEE8D6]">راجع بسرعة</h3>
          <p className="mt-0.5 text-[10px] text-[#7F91A1]">أدوية شائعة للمراجعة</p>
        </div>

        <div className="-mx-4 flex snap-x gap-2.5 overflow-x-auto px-4 pb-1 scrollbar-none">
          {ANESTHESIA_DRUGS.slice(0, 6).map((drug) => {
            const favId = 'drug:' + drug.id;
            const isFavorite = favorites.has(favId);

            return (
              <article
                key={drug.id}
                className="min-w-[210px] snap-start rounded-[20px] border border-[#CCA039]/10 bg-[#0D2741] p-3.5"
              >
                <div className="flex items-center justify-between">
                  <button
                    onClick={() => onToggleFavorite(favId)}
                    className={
                      'grid h-8 w-8 place-items-center rounded-lg border transition ' +
                      (isFavorite
                        ? 'border-[#CCA039]/30 bg-[#CCA039]/12 text-[#CCA039]'
                        : 'border-white/5 bg-white/[0.025] text-[#718395]')
                    }
                    aria-label="حفظ"
                  >
                    <Heart size={16} weight={isFavorite ? 'fill' : 'regular'} />
                  </button>

                  <span className="rounded-full bg-[#CCA039]/8 px-2.5 py-1 text-[9px] font-bold text-[#CCA039]">
                    {drug.categoryAr}
                  </span>
                </div>

                <h4 className="mt-3 text-base font-black text-[#EEE8D6]" dir="ltr">{drug.en}</h4>
                <p className="mt-0.5 text-xs font-bold text-[#B6C0C9]">{drug.ar}</p>
                <p className="mt-2 line-clamp-2 text-[10px] leading-5 text-[#75899A]">{drug.short}</p>

                <div className="mt-3 flex items-center justify-between border-t border-white/5 pt-2.5">
                  <button
                    onClick={() => speakTerm(drug.en)}
                    className="flex items-center gap-1.5 text-[10px] font-bold text-[#CCA039]"
                  >
                    <SpeakerHigh size={15} weight="regular" />
                    النطق
                  </button>
                  <button onClick={() => goTo('drugs')} className="text-[10px] font-bold text-[#AEB9C4]">
                    عرض الدليل ←
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </div>
  );
}
