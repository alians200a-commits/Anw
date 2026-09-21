import { AnimatePresence, motion } from 'motion/react';
import {
  ArrowLeft,
  BookOpenText,
  Gamepad2,
  Heart,
  Pill,
  Search,
  Sparkles,
  Volume2
} from 'lucide-react';
import { ANESTHESIA_DRUGS } from '../data/drugs';
import { CLINICAL_TERMS } from '../data/clinicalTerms';
import type { AppTab } from './BottomNav';

interface HomeScreenProps {
  query: string;
  setQuery: (value: string) => void;
  goTo: (tab: AppTab) => void;
  onToggleFavorite: (id: string) => void;
  favorites: Set<string>;
}

const quickActions = [
  { id: 'drugs' as const, title: 'الأدوية', subtitle: 'دليل دوائي سريع', icon: Pill },
  { id: 'terms' as const, title: 'المصطلحات', subtitle: 'عربي • إنكليزي • اختصارات', icon: BookOpenText },
  { id: 'favorites' as const, title: 'المحفوظات', subtitle: 'ارجع لها بسرعة', icon: Heart },
  { id: 'games' as const, title: 'تحدّي التخدير', subtitle: 'تعلم بطريقة تفاعلية', icon: Gamepad2 }
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
    <div className="space-y-7">
      <section className="relative overflow-hidden rounded-[28px] border border-[#CCA039]/15 bg-gradient-to-br from-[#102C49] via-[#0D2741] to-[#091D31] p-5 shadow-[0_24px_70px_rgba(0,0,0,0.22)]">
        <div className="pointer-events-none absolute -left-12 -top-14 h-40 w-40 rounded-full bg-[#CCA039]/8 blur-3xl" />
        <div className="relative">
          <div className="mb-5 flex items-start justify-between gap-3">
            <div>
              <p className="text-xs font-bold text-[#CCA039]">دليلك السريع في التخدير</p>
              <h2 className="mt-1.5 text-2xl font-black leading-tight text-[#EEE8D6]">
                شنو تريد تبحث اليوم؟
              </h2>
              <p className="mt-2 max-w-md text-sm leading-6 text-[#AEB9C4]">
                ابحث باسم الدواء، المصطلح، الاختصار أو المعنى بالعربي.
              </p>
            </div>
            <div className="rounded-2xl border border-[#CCA039]/20 bg-[#CCA039]/10 p-2.5 text-[#CCA039]">
              <Sparkles className="h-5 w-5" />
            </div>
          </div>

          <div className="relative">
            <Search className="absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#CCA039]" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Propofol، بروبوفول، MAC، ICP..."
              className="h-14 w-full rounded-2xl border border-white/8 bg-[#061827]/85 pr-12 pl-4 text-sm font-semibold text-[#EEE8D6] outline-none transition placeholder:text-[#66798A] focus:border-[#CCA039]/50 focus:ring-4 focus:ring-[#CCA039]/8"
            />
          </div>
        </div>
      </section>

      <AnimatePresence initial={false}>
        {normalized && (
          <motion.section
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="rounded-[24px] border border-[#CCA039]/12 bg-[#0D2741]/80 p-3"
          >
            <div className="mb-2 flex items-center justify-between px-1">
              <h3 className="text-sm font-black text-[#EEE8D6]">نتائج البحث</h3>
              <span className="text-[11px] text-[#8999A9]">
                {drugResults.length + termResults.length} نتيجة
              </span>
            </div>

            <div className="space-y-2">
              {drugResults.map((drug) => (
                <button
                  key={drug.id}
                  onClick={() => goTo('drugs')}
                  className="flex w-full items-center justify-between rounded-2xl border border-white/5 bg-[#081D31] p-3 text-right transition hover:border-[#CCA039]/25"
                >
                  <ArrowLeft className="h-4 w-4 text-[#CCA039]" />
                  <div className="flex-1 px-3">
                    <div className="flex items-center justify-end gap-2">
                      <span className="text-xs text-[#9EADBA]">{drug.ar}</span>
                      <strong className="text-sm text-[#EEE8D6]" dir="ltr">{drug.en}</strong>
                    </div>
                    <p className="mt-1 text-[11px] text-[#718395]">{drug.categoryAr}</p>
                  </div>
                  <div className="grid h-9 w-9 place-items-center rounded-xl bg-[#CCA039]/10 text-[#CCA039]">
                    <Pill className="h-4 w-4" />
                  </div>
                </button>
              ))}

              {termResults.map((term) => (
                <button
                  key={term.id}
                  onClick={() => goTo('terms')}
                  className="flex w-full items-center justify-between rounded-2xl border border-white/5 bg-[#081D31] p-3 text-right transition hover:border-[#CCA039]/25"
                >
                  <ArrowLeft className="h-4 w-4 text-[#CCA039]" />
                  <div className="flex-1 px-3">
                    <div className="flex items-center justify-end gap-2">
                      <span className="text-xs text-[#9EADBA]">{term.ar}</span>
                      <strong className="text-sm text-[#EEE8D6]" dir="ltr">
                        {term.abbr || term.en}
                      </strong>
                    </div>
                    <p className="mt-1 line-clamp-1 text-[11px] text-[#718395]">{term.en}</p>
                  </div>
                  <div className="grid h-9 w-9 place-items-center rounded-xl bg-white/[0.04] text-[#EEE8D6]">
                    <BookOpenText className="h-4 w-4" />
                  </div>
                </button>
              ))}

              {drugResults.length === 0 && termResults.length === 0 && (
                <div className="px-3 py-6 text-center text-sm text-[#7E91A2]">
                  ما لكينا نتيجة مطابقة. جرّب كلمة ثانية.
                </div>
              )}
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      <section>
        <div className="mb-3 flex items-center justify-between">
          <button className="text-xs font-bold text-[#CCA039]">كل الأقسام</button>
          <div>
            <h3 className="text-base font-black text-[#EEE8D6]">الوصول السريع</h3>
            <p className="mt-0.5 text-[11px] text-[#7F91A1]">كلشي مهم قريب من إيدك</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {quickActions.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.button
                key={item.id}
                whileTap={{ scale: 0.98 }}
                onClick={() => goTo(item.id)}
                className="group min-h-32 overflow-hidden rounded-[24px] border border-[#CCA039]/10 bg-[#0D2741] p-4 text-right transition hover:-translate-y-0.5 hover:border-[#CCA039]/30"
              >
                <div className="flex items-start justify-between">
                  <span className="text-[10px] font-black text-[#5F7488]">0{index + 1}</span>
                  <div className="grid h-11 w-11 place-items-center rounded-2xl border border-[#CCA039]/15 bg-[#CCA039]/10 text-[#CCA039] transition group-hover:bg-[#CCA039] group-hover:text-[#0A2036]">
                    <Icon className="h-5 w-5" />
                  </div>
                </div>
                <h4 className="mt-4 text-base font-black text-[#EEE8D6]">{item.title}</h4>
                <p className="mt-1 text-[11px] leading-5 text-[#8192A1]">{item.subtitle}</p>
              </motion.button>
            );
          })}
        </div>
      </section>

      <section>
        <div className="mb-3 text-right">
          <h3 className="text-base font-black text-[#EEE8D6]">راجع بسرعة</h3>
          <p className="mt-0.5 text-[11px] text-[#7F91A1]">أكثر الأدوية استخداماً في المراجعة</p>
        </div>

        <div className="-mx-4 flex snap-x gap-3 overflow-x-auto px-4 pb-1 scrollbar-none">
          {ANESTHESIA_DRUGS.slice(0, 6).map((drug) => {
            const favId = 'drug:' + drug.id;
            const isFavorite = favorites.has(favId);

            return (
              <article
                key={drug.id}
                className="min-w-[235px] snap-start rounded-[24px] border border-[#CCA039]/10 bg-[#0D2741] p-4"
              >
                <div className="flex items-center justify-between">
                  <button
                    onClick={() => onToggleFavorite(favId)}
                    className={
                      'grid h-9 w-9 place-items-center rounded-xl border transition ' +
                      (isFavorite
                        ? 'border-[#CCA039]/30 bg-[#CCA039]/15 text-[#CCA039]'
                        : 'border-white/5 bg-white/[0.03] text-[#718395]')
                    }
                    aria-label="حفظ"
                  >
                    <Heart className="h-4 w-4" fill={isFavorite ? 'currentColor' : 'none'} />
                  </button>

                  <span className="rounded-full bg-[#CCA039]/10 px-2.5 py-1 text-[10px] font-bold text-[#CCA039]">
                    {drug.categoryAr}
                  </span>
                </div>

                <h4 className="mt-4 text-lg font-black text-[#EEE8D6]" dir="ltr">{drug.en}</h4>
                <p className="mt-0.5 text-sm font-bold text-[#B6C0C9]">{drug.ar}</p>
                <p className="mt-3 line-clamp-2 text-xs leading-5 text-[#75899A]">{drug.short}</p>

                <div className="mt-4 flex items-center justify-between border-t border-white/5 pt-3">
                  <button className="flex items-center gap-1.5 text-[11px] font-bold text-[#CCA039]">
                    <Volume2 className="h-3.5 w-3.5" />
                    النطق
                  </button>
                  <button onClick={() => goTo('drugs')} className="text-[11px] font-bold text-[#AEB9C4]">
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
