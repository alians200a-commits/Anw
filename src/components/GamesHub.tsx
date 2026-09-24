import { useState } from 'react';
import { Activity, BrainCircuit, Gamepad2, HeartPulse, Wind } from 'lucide-react';
import { MedicalSiteIcon } from './ui/MedicalSiteIcon';
import { AnesthesiaRescueGame } from './games/AnesthesiaRescueGame';

type GameId = 'rescue' | null;

const upcoming = [
  {
    id: 'airway',
    title: 'تحدي مجرى الهواء',
    description: 'سيناريو حي يتدهور بيه المونيتور حسب قراراتك وتأخيرك.',
    icon: Wind,
  },
  {
    id: 'ventilator',
    title: 'اضبط جهاز التنفس',
    description: 'غيّر الإعدادات وشوف تأثيرها مباشرة على الموجات والعلامات.',
    icon: Activity,
  },
  {
    id: 'drug-response',
    title: 'استجابة المريض للأدوية',
    description: 'محرك استجابة يربط القرار الدوائي بتغيّر حالة المريض.',
    icon: BrainCircuit,
  },
];

export function GamesHub() {
  const [activeGame, setActiveGame] = useState<GameId>(null);

  if (activeGame === 'rescue') {
    return <AnesthesiaRescueGame onExit={() => setActiveGame(null)} />;
  }

  return (
    <div className="space-y-4">
      <section className="overflow-hidden rounded-[24px] border border-[#DCE5EA] bg-[linear-gradient(145deg,#FFFFFF_0%,#F2F6F9_100%)] px-4 py-4 shadow-[0_12px_30px_rgba(16,45,79,0.08)]">
        <div className="flex items-center justify-end gap-3 text-right">
          <div className="min-w-0 flex-1">
            <p className="text-[10px] font-black text-[#9A7122]">ANESTHESIA GAMES</p>
            <h2 className="mt-1 text-lg font-black text-[#183149]">تعلّم واختبر نفسك</h2>
            <p className="mt-1 text-[11px] font-semibold leading-5 text-[#5F7280]">
              محاكاة تفاعلية تخليك تراقب المريض، تختار الإجراء وتشوف تأثير القرار مباشرة.
            </p>
          </div>

          <div className="grid h-12 w-12 shrink-0 place-items-center rounded-[15px] border border-[#D7E2E9] bg-[#EEF3F6] text-[#315672]">
            <MedicalSiteIcon name="learn" size={32} />
          </div>
        </div>
      </section>

      <button
        type="button"
        onClick={() => setActiveGame('rescue')}
        className="group w-full overflow-hidden rounded-[24px] border border-[#D7E2E9] bg-[#0D2846] p-4 text-right shadow-[0_14px_30px_rgba(13,40,70,0.16)] outline-none active:bg-[#102D4F] focus-visible:ring-2 focus-visible:ring-[#D9A441]/60"
      >
        <div className="flex items-start gap-3">
          <div className="grid h-14 w-14 shrink-0 place-items-center rounded-[18px] border border-[#D9A441]/35 bg-[#D9A441]/10 text-[#E6BD61]">
            <HeartPulse size={31} strokeWidth={2.1} />
          </div>
          <div className="min-w-0 flex-1 text-right">
            <div className="flex items-center justify-end gap-2">
              <span className="rounded-full border border-[#D9A441]/25 bg-[#D9A441]/10 px-2 py-1 text-[9px] font-black text-[#E7C46F]">متاحة الآن</span>
              <Gamepad2 size={15} className="text-[#AFC3D6]" />
            </div>
            <h3 className="mt-2 text-base font-black text-white">أنقذ المريض أثناء التخدير</h3>
            <p className="mt-1.5 text-[11px] font-semibold leading-5 text-[#C5D3DE]">
              Monitor متعدد الموجات، Patient strip، أدوات تقييم/سوائل/أدوية/Airway/Vent وDebrief زمني بالنهاية.
            </p>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-3 gap-2 border-t border-white/10 pt-3 text-center">
          <div><div className="text-sm font-black text-white">5</div><div className="text-[9px] font-bold text-[#AFC3D6]">أدوات</div></div>
          <div><div className="text-sm font-black text-white">100</div><div className="text-[9px] font-bold text-[#AFC3D6]">نقطة</div></div>
          <div><div className="text-sm font-black text-white">~75s</div><div className="text-[9px] font-bold text-[#AFC3D6]">سيناريو</div></div>
        </div>
      </button>

      <section>
        <div className="mb-2 flex items-center justify-between px-1">
          <span className="text-[10px] font-bold text-[#8A97A1]">قريباً</span>
          <h3 className="text-[12px] font-black text-[#183149]">الألعاب القادمة</h3>
        </div>

        <div className="space-y-2">
          {upcoming.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.id} className="flex items-center gap-3 rounded-[18px] border border-[#DCE5EA] bg-[#F8FAFB] px-3.5 py-3">
                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-[14px] border border-[#D7E2E9] bg-white text-[#526F85]">
                  <Icon size={22} />
                </div>
                <div className="min-w-0 flex-1 text-right">
                  <h4 className="text-[12px] font-black text-[#183149]">{item.title}</h4>
                  <p className="mt-1 text-[10px] font-semibold leading-5 text-[#66737F]">{item.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
