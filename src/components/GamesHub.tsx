import { GameController } from '@phosphor-icons/react';
import { Brain, Clock3, Layers3 } from 'lucide-react';

const learningModes = [
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
      <section className="rounded-[20px] border border-[#DCE5EA] bg-[#F8FAFB] px-4 py-4">
        <div className="flex items-center justify-end gap-3 text-right">
          <div className="min-w-0">
            <p className="text-[10px] font-black text-[#7A8995]" dir="ltr">
              LEARN & TEST
            </p>
            <h2 className="mt-1 text-lg font-black text-[#183149]">
              تعلّم واختبر نفسك
            </h2>
            <p className="mt-1 text-[10px] font-semibold leading-5 text-[#657784]">
              مساحة التحديات والأنشطة التعليمية في مملكة التخدير.
            </p>
          </div>
          <div className="grid h-12 w-12 shrink-0 place-items-center rounded-[15px] border border-[#D7E2E9] bg-[#EEF3F6] text-[#315672]">
            <GameController size={25} weight="bold" />
          </div>
        </div>
      </section>

      <section className="space-y-2" aria-label="أنماط التعلّم">
        {learningModes.map((mode) => {
          const Icon = mode.icon;

          return (
            <div
              key={mode.title}
              className="flex min-h-[70px] items-center gap-3 rounded-[18px] border border-[#DCE5EA] bg-white px-3.5 py-3"
            >
              <span className="shrink-0 rounded-full border border-[#DCE5EA] bg-[#F8FAFB] px-2.5 py-1 text-[9px] font-black text-[#657784]">
                قريباً
              </span>

              <div className="min-w-0 flex flex-1 items-center justify-end gap-3 text-right">
                <div className="min-w-0">
                  <h3 className="text-[13px] font-black text-[#183149]">
                    {mode.title}
                  </h3>
                  <p className="mt-0.5 text-[10px] font-semibold leading-5 text-[#657784]">
                    {mode.subtitle}
                  </p>
                </div>

                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-[14px] border border-[#D7E2E9] bg-[#EEF3F6] text-[#315672]">
                  <Icon size={21} />
                </div>
              </div>
            </div>
          );
        })}
      </section>

      <p className="px-1 text-[9px] font-semibold leading-5 text-[#7A8995]">
        ما راح تظهر أي أسئلة تجريبية هنا إلا بعد ربط بنك الأسئلة الفعلي.
      </p>
    </div>
  );
}
