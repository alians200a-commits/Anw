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
        <p className="text-[10px] font-bold text-[#CCA039]">LEARN BY PLAYING</p>
        <h2 className="mt-1 text-lg font-black text-[#EEE8D6]">ألعاب مملكة التخدير</h2>
        <p className="mt-1.5 text-xs leading-5 text-[#8EA0B0]">
          هذه معاينة للألعاب اللي راح نركبها بعد تثبيت الواجهة.
        </p>
      </section>

      <div className="space-y-2">
        {games.map((game) => {
          const Icon = game.icon;
          return (
            <div
              key={game.title}
              className="flex items-center justify-between rounded-[17px] border border-[#CCA039]/10 bg-[#0D2741] p-3.5"
            >
              <span className="rounded-full border border-[#CCA039]/14 bg-[#CCA039]/7 px-2.5 py-1 text-[9px] font-bold text-[#CCA039]">
                قريباً
              </span>
              <div className="flex items-center gap-3 text-right">
                <div>
                  <h3 className="text-sm font-black text-[#EEE8D6]">{game.title}</h3>
                  <p className="mt-0.5 text-[10px] text-[#8092A2]">{game.subtitle}</p>
                </div>
                <div className="grid h-9 w-9 place-items-center rounded-xl bg-[#CCA039]/8 text-[#CCA039]">
                  <Icon size={20} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex items-center gap-3 rounded-[16px] border border-[#CCA039]/10 bg-[#CCA039]/5 p-3.5">
        <Sparkles className="h-[18px] w-[18px] shrink-0 text-[#CCA039]" />
        <p className="text-[10px] leading-5 text-[#A8B3BD]">
          ماكو زر وهمي هنا؛ اللعبة تصير قابلة للضغط فقط من نربطها فعلياً.
        </p>
      </div>
    </div>
  );
}
