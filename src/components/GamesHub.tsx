import { GameController } from '@phosphor-icons/react';
import { Brain, Clock3, Layers3, Sparkles } from 'lucide-react';

const games = [
  {
    title: 'تحدّي 60 ثانية',
    subtitle: 'أسئلة سريعة ونقاط متتالية',
    icon: Clock3
  },
  {
    title: 'طابق البطاقات',
    subtitle: 'اربط الدواء أو المصطلح بمعناه',
    icon: Layers3
  },
  {
    title: 'من أنا؟',
    subtitle: 'اقرأ التلميحات وخمّن الدواء',
    icon: Brain
  }
];

export function GamesHub() {
  return (
    <div className="space-y-4">
      <section>
        <p className="text-[10px] font-bold text-[#5D7897]">LEARN BY PLAYING</p>
        <h2 className="mt-1 text-lg font-black text-[#2F3945]">ألعاب مملكة التخدير</h2>
        <p className="mt-1.5 text-xs leading-5 text-[#75818C]">
          هذه معاينة للألعاب اللي راح نركبها بعد تثبيت الواجهة.
        </p>
      </section>

      <div className="space-y-2">
        {games.map((game) => {
          const Icon = game.icon;
          return (
            <div
              key={game.title}
              className="flex items-center justify-between rounded-[17px] border border-[#DCE7F0] bg-[#F2F7FB] p-3.5"
            >
              <span className="rounded-full border border-[#5D7897]/14 bg-[#5D7897]/7 px-2.5 py-1 text-[9px] font-bold text-[#5D7897]">
                قريباً
              </span>
              <div className="flex items-center gap-3 text-right">
                <div>
                  <h3 className="text-sm font-black text-[#2F3945]">{game.title}</h3>
                  <p className="mt-0.5 text-[10px] text-[#74828D]">{game.subtitle}</p>
                </div>
                <div className="grid h-9 w-9 place-items-center rounded-xl bg-[#5D7897]/8 text-[#5D7897]">
                  <Icon size={20} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex items-center gap-3 rounded-[16px] border border-[#DCE7F0] bg-[#F7FAFC] p-3.5">
        <Sparkles className="h-[18px] w-[18px] shrink-0 text-[#5D7897]" />
        <p className="text-[10px] leading-5 text-[#6E7A84]">الألعاب تظهر هنا عند تفعيلها.</p>
      </div>
    </div>
  );
}
