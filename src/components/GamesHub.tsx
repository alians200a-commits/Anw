import { useState } from 'react';
import {
  Activity,
  BrainCircuit,
  ChevronLeft,
  Gamepad2,
  HeartPulse,
  ShieldCheck,
  Stethoscope,
  Wind,
} from 'lucide-react';
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

const levels = [
  {
    id: 'easy',
    title: 'سهل',
    subtitle: 'تدخلات مباشرة ومنظمة',
    detail: 'تقييم أساسي، IV، عمق التخدير ودعم الدورة الدموية.',
    tone: 'border-[#CFDFC4] bg-[#EFF4E9] text-[#5D7047]',
  },
  {
    id: 'medium',
    title: 'متوسط',
    subtitle: 'أكثر من سبب محتمل',
    detail: 'اقرأ SpO₂ وEtCO₂ وافحص الأنبوب والدائرة قبل التصعيد.',
    tone: 'border-[#E7D7AE] bg-[#FAF5E8] text-[#8A6426]',
  },
  {
    id: 'hard',
    title: 'صعب',
    subtitle: 'تدهور متعدد المحاور',
    detail: 'Airway + ventilation + circulation مع قرارات مترابطة وإعادة تقييم.',
    tone: 'border-[#E6C8C5] bg-[#FAEEEE] text-[#9A4D4D]',
  },
];

export function GamesHub() {
  const [activeGame, setActiveGame] = useState<GameId>(null);

  if (activeGame === 'rescue') {
    return <AnesthesiaRescueGame onExit={() => setActiveGame(null)} />;
  }

  return (
    <div className="space-y-5">
      <section className="overflow-hidden rounded-[26px] border border-[#DCE5EA] bg-[linear-gradient(105deg,#F7F0DE_0%,#F5F8FA_54%,#E7EEF3_100%)] shadow-[0_14px_32px_rgba(16,45,79,0.08)]">
        <div className="grid min-h-[200px] grid-cols-[1.25fr_.75fr] items-stretch">
          <div className="flex flex-col justify-between p-4 text-right">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/80 bg-white/80 px-2.5 py-1 text-[9px] font-black text-[#8A6426]">
                <Gamepad2 size={12} /> محاكاة سريرية
              </span>
              <h2 className="mt-3 text-[19px] font-black leading-7 text-[#183149]">أنقذ المريض أثناء التخدير</h2>
              <p className="mt-1.5 text-[11px] font-semibold leading-5 text-[#5F7280]">
                راقب المونيتور، افهم المشكلة، واختَر التدخل المناسب ضمن 3 مراحل علمية متدرجة.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setActiveGame('rescue')}
              className="mt-4 inline-flex min-h-10 w-fit items-center gap-2 rounded-[14px] bg-[#173A63] px-3.5 text-[10px] font-black text-white shadow-[0_7px_16px_rgba(23,58,99,0.16)] active:bg-[#102D4F]"
            >
              ابدأ المسار <ChevronLeft size={15} />
            </button>
          </div>

          <div className="relative grid place-items-center overflow-hidden border-r border-white/70 bg-[#173A63]/[0.035]">
            <div className="absolute -left-6 top-4 h-28 w-28 rounded-full bg-white/55 blur-2xl" />
            <div className="relative grid h-24 w-24 place-items-center rounded-[28px] border border-white/80 bg-white/75 text-[#173A63] shadow-[0_16px_30px_rgba(23,58,99,0.10)]">
              <HeartPulse size={48} strokeWidth={1.8} />
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-[22px] border border-[#DCE5EA] bg-[#F8FAFB] p-3.5">
        <div className="mb-3 flex items-center justify-between gap-3">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-2.5 py-1 text-[9px] font-black text-[#526675]">
            <ShieldCheck size={13} /> 3 مراحل
          </span>
          <div className="text-right">
            <h3 className="text-[13px] font-black text-[#183149]">مسار المحاكاة</h3>
            <p className="mt-0.5 text-[9px] font-semibold text-[#7A8995]">كل مرحلة تضيف تداخلات أكثر وتعطي تلميحات أقل.</p>
          </div>
        </div>

        <div className="space-y-2">
          {levels.map((level, index) => (
            <div key={level.id} className={`rounded-[18px] border p-3.5 ${level.tone}`}>
              <div className="flex items-start gap-3">
                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-[14px] border border-current/10 bg-white/70 text-[14px] font-black">
                  {index + 1}
                </div>
                <div className="min-w-0 flex-1 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <span className="text-[9px] font-bold opacity-75">{level.subtitle}</span>
                    <h4 className="text-[13px] font-black">{level.title}</h4>
                  </div>
                  <p className="mt-1.5 text-[10px] font-semibold leading-5 text-[#526675]">{level.detail}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="grid grid-cols-3 gap-2 rounded-[22px] border border-[#DCE5EA] bg-white p-3 text-center shadow-[0_8px_20px_rgba(16,45,79,0.05)]">
        <div>
          <div className="mx-auto grid h-9 w-9 place-items-center rounded-[12px] bg-[#E8EEF3] text-[#315672]"><Activity size={18} /></div>
          <div className="mt-2 text-[13px] font-black text-[#173A63]">Monitor</div>
          <div className="mt-0.5 text-[8px] font-bold text-[#7A8995]">موجات حية</div>
        </div>
        <div>
          <div className="mx-auto grid h-9 w-9 place-items-center rounded-[12px] bg-[#EFF4E9] text-[#5D7047]"><Stethoscope size={18} /></div>
          <div className="mt-2 text-[13px] font-black text-[#173A63]">5</div>
          <div className="mt-0.5 text-[8px] font-bold text-[#7A8995]">مجموعات أدوات</div>
        </div>
        <div>
          <div className="mx-auto grid h-9 w-9 place-items-center rounded-[12px] bg-[#FAF5E8] text-[#8A6426]"><BrainCircuit size={18} /></div>
          <div className="mt-2 text-[13px] font-black text-[#173A63]">Debrief</div>
          <div className="mt-0.5 text-[8px] font-bold text-[#7A8995]">مراجعة القرار</div>
        </div>
      </section>

      <section>
        <div className="mb-2.5 flex items-center justify-between px-1">
          <span className="text-[10px] font-bold text-[#8A97A1]">قريباً</span>
          <h3 className="text-[13px] font-black text-[#183149]">ألعاب ومحاكاة إضافية</h3>
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

      <section className="rounded-[20px] border border-[#DCE5EA] bg-white p-4 text-right">
        <div className="flex items-center justify-end gap-3">
          <div>
            <h3 className="text-[12px] font-black text-[#183149]">تعلم بالقرار، مو بالحفظ فقط</h3>
            <p className="mt-1 text-[10px] font-semibold leading-5 text-[#5F7280]">التقييم يعتمد على ترتيب التدخلات، الاستجابة للمونيتور، وإعادة التقييم بعد كل خطوة.</p>
          </div>
          <div className="grid h-11 w-11 shrink-0 place-items-center rounded-[14px] bg-[#E8EEF3] text-[#315672]">
            <MedicalSiteIcon name="learn" size={26} />
          </div>
        </div>
      </section>
    </div>
  );
}
