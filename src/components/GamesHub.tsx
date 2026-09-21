import { Brain, Clock3, Gamepad2, Layers3, Sparkles } from 'lucide-react';

const games = [
  {
    title: 'تحدّي 60 ثانية',
    subtitle: 'أسئلة سريعة ونقاط متتالية',
    icon: Clock3,
    status: 'قريباً'
  },
  {
    title: 'طابق البطاقات',
    subtitle: 'اربط الدواء أو المصطلح بمعناه',
    icon: Layers3,
    status: 'قريباً'
  },
  {
    title: 'من أنا؟',
    subtitle: 'اقرأ التلميحات وخمّن الدواء',
    icon: Brain,
    status: 'قريباً'
  }
];

export function GamesHub() {
  return (
    <div className="space-y-5">
      <section className="rounded-[28px] border border-[#CCA039]/15 bg-gradient-to-br from-[#102C49] to-[#0B2239] p-5">
        <div className="flex items-center justify-between gap-4">
          <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[#CCA039] text-[#0A2036]">
            <Gamepad2 className="h-6 w-6" />
          </div>
          <div className="text-right">
            <p className="text-xs font-bold text-[#CCA039]">LEARN BY PLAYING</p>
            <h2 className="mt-1 text-2xl font-black text-[#EEE8D6]">ألعاب مملكة التخدير</h2>
          </div>
        </div>
        <p className="mt-4 text-sm leading-6 text-[#8EA0B0]">
          هذا القسم جهزناه بالواجهة فقط. بالمرحلة التالية نربط ألعاب جاهزة ونحوّل محتواها إلى أدوية ومصطلحات التخدير.
        </p>
      </section>

      <div className="grid gap-3 sm:grid-cols-2">
        {games.map((game) => {
          const Icon = game.icon;
          return (
            <button
              key={game.title}
              className="rounded-[24px] border border-[#CCA039]/10 bg-[#0D2741] p-4 text-right transition hover:border-[#CCA039]/25"
            >
              <div className="flex items-start justify-between">
                <span className="rounded-full border border-[#CCA039]/15 bg-[#CCA039]/8 px-2.5 py-1 text-[10px] font-bold text-[#CCA039]">
                  {game.status}
                </span>
                <div className="grid h-11 w-11 place-items-center rounded-2xl bg-[#CCA039]/10 text-[#CCA039]">
                  <Icon className="h-5 w-5" />
                </div>
              </div>
              <h3 className="mt-4 text-base font-black text-[#EEE8D6]">{game.title}</h3>
              <p className="mt-1 text-xs leading-5 text-[#8092A2]">{game.subtitle}</p>
            </button>
          );
        })}
      </div>

      <div className="flex items-center gap-3 rounded-[20px] border border-[#CCA039]/10 bg-[#CCA039]/5 p-4">
        <Sparkles className="h-5 w-5 shrink-0 text-[#CCA039]" />
        <p className="text-xs leading-5 text-[#A8B3BD]">
          بعد تثبيت الواجهة نبدأ بنقل أفضل لعبة Memory Match ثم نضيف الاختبار السريع.
        </p>
      </div>
    </div>
  );
}
