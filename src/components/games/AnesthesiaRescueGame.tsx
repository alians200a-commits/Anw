import { useMemo, useState } from 'react';
import {
  Activity,
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  HeartPulse,
  Play,
  RotateCcw,
  ShieldCheck,
  Trophy,
  Waves,
} from 'lucide-react';

type Vitals = {
  hr: number;
  sbp: number;
  dbp: number;
  spo2: number;
  etco2: number;
};

type VitalDelta = Partial<Record<keyof Vitals, number>>;

type Choice = {
  id: string;
  label: string;
  feedback: string;
  score: number;
  delta: VitalDelta;
};

type ScenarioStep = {
  title: string;
  prompt: string;
  cue: string;
  choices: Choice[];
};

const INITIAL_VITALS: Vitals = {
  hr: 106,
  sbp: 78,
  dbp: 42,
  spo2: 96,
  etco2: 35,
};

const STEPS: ScenarioStep[] = [
  {
    title: 'هبوط ضغط بعد البدء بالتخدير',
    prompt: 'الضغط نزل مباشرة بعد البدء بالتخدير. شنو أول تصرّف منطقي؟',
    cue: 'راقب الصورة كاملة قبل ما تتصرف على رقم واحد.',
    choices: [
      {
        id: 'assess',
        label: 'أراجع عمق التخدير، النبض، خط الـ IV وباقي العلامات بسرعة',
        feedback: 'بداية صحيحة: التقييم السريع يحدد إذا المشكلة من العمق، الدوران، الخط أو سبب آخر.',
        score: 25,
        delta: { hr: -4, sbp: 4, dbp: 2 },
      },
      {
        id: 'increase-agent',
        label: 'أزيد المخدر مباشرة بدون تقييم',
        feedback: 'هذا قد يفاقم هبوط الضغط إذا كان العمق الزائد جزءاً من المشكلة.',
        score: 0,
        delta: { hr: 5, sbp: -8, dbp: -5 },
      },
      {
        id: 'wait',
        label: 'أنتظر بدون إعادة تقييم',
        feedback: 'الانتظار مع هبوط ضغط مستمر يضيّع وقت مهم في المحاكاة.',
        score: 5,
        delta: { hr: 4, sbp: -5, dbp: -3 },
      },
    ],
  },
  {
    title: 'الضغط بعده منخفض',
    prompt: 'بعد التقييم، الضغط بعده واطي. شنو الاتجاه الأفضل؟',
    cue: 'عالج السبب وادعم الدوران حسب بروتوكول المكان، بدون جرعات عشوائية.',
    choices: [
      {
        id: 'circulation-support',
        label: 'أدعم الدوران حسب السبب والبروتوكول وأعيد القياس',
        feedback: 'قرار مناسب: دعم الدوران وإعادة التقييم أهم من الاستجابة العشوائية.',
        score: 25,
        delta: { hr: -8, sbp: 24, dbp: 14 },
      },
      {
        id: 'random-dose',
        label: 'أعطي دواء بجرعة عشوائية بدون ربطه بالسبب',
        feedback: 'المحاكاة تعتبر هذا خطأ: القرار الدوائي لازم يكون مرتبط بالسبب وبروتوكول واضح.',
        score: 0,
        delta: { hr: 12, sbp: 3, dbp: 1 },
      },
      {
        id: 'ignore-bp',
        label: 'أركز على باقي الشاشة وأهمل الضغط',
        feedback: 'الضغط جزء أساسي من صورة المريض ولا ينترك بدون متابعة.',
        score: 0,
        delta: { hr: 8, sbp: -10, dbp: -6 },
      },
    ],
  },
  {
    title: 'هبوط SpO₂ مفاجئ',
    prompt: 'هسه التشبع بدا ينزل. شنو أول مسار تتأكد منه؟',
    cue: 'Airway + breathing + circuit قبل القفز لاستنتاجات بعيدة.',
    choices: [
      {
        id: 'airway-check',
        label: 'أتحقق من مجرى الهواء، التهوية، الدائرة ومصدر الأكسجين',
        feedback: 'صحيح: ابدأ بأسباب مجرى الهواء والتهوية والدائرة القابلة للتصحيح سريعاً.',
        score: 25,
        delta: { spo2: 3, etco2: 2, hr: -4 },
      },
      {
        id: 'more-agent',
        label: 'أزيد العامل الاستنشاقي وأنتظر',
        feedback: 'هذا ما يعالج سبب نقص الأكسجة وقد يفاقم عدم الاستقرار.',
        score: 0,
        delta: { spo2: -5, sbp: -7, dbp: -4 },
      },
      {
        id: 'silence-only',
        label: 'أسكّت الإنذار فقط',
        feedback: 'إسكات الإنذار ما يعالج السبب. لازم تتعامل ويا الحالة نفسها.',
        score: 0,
        delta: { spo2: -4, hr: 7 },
      },
    ],
  },
  {
    title: 'استقرار الحالة',
    prompt: 'العلامات رجعت تتحسن. شنو آخر خطوة صحيحة؟',
    cue: 'الاستقرار مو نهاية المتابعة.',
    choices: [
      {
        id: 'reassess',
        label: 'أستمر بالمراقبة وأعيد تقييم السبب والاستجابة',
        feedback: 'ممتاز: إعادة التقييم بعد التحسن تثبت أن التدخل نجح وأن الحالة مستقرة.',
        score: 25,
        delta: { hr: -6, sbp: 8, dbp: 5, spo2: 1, etco2: 1 },
      },
      {
        id: 'stop-monitoring',
        label: 'أوقف المراقبة لأن الأرقام تحسنت',
        feedback: 'التحسن يحتاج متابعة حتى تتأكد أن الاستقرار مستمر.',
        score: 0,
        delta: {},
      },
      {
        id: 'move-on',
        label: 'أتجاهل سبب المشكلة وأكمل بدون مراجعة',
        feedback: 'الـDebrief يعتمد على فهم السبب، مو فقط رجوع الرقم للمجال المقبول.',
        score: 5,
        delta: {},
      },
    ],
  },
];

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function applyDelta(vitals: Vitals, delta: VitalDelta): Vitals {
  return {
    hr: clamp(vitals.hr + (delta.hr ?? 0), 25, 220),
    sbp: clamp(vitals.sbp + (delta.sbp ?? 0), 40, 240),
    dbp: clamp(vitals.dbp + (delta.dbp ?? 0), 20, 150),
    spo2: clamp(vitals.spo2 + (delta.spo2 ?? 0), 50, 100),
    etco2: clamp(vitals.etco2 + (delta.etco2 ?? 0), 5, 90),
  };
}

function toneClass(value: number, kind: keyof Vitals) {
  if (kind === 'spo2') return value < 92 ? 'text-[#B34A3C]' : 'text-[#2F7A55]';
  if (kind === 'sbp') return value < 90 ? 'text-[#B34A3C]' : 'text-[#2F7A55]';
  if (kind === 'hr') return value > 120 || value < 50 ? 'text-[#B34A3C]' : 'text-[#2F7A55]';
  return 'text-[#2F69A8]';
}

function VitalTile({ label, value, suffix, kind }: { label: string; value: string | number; suffix?: string; kind: keyof Vitals }) {
  const numeric = typeof value === 'number' ? value : Number(String(value).split('/')[0]);
  return (
    <div className="rounded-[15px] border border-white/10 bg-white/[0.045] px-3 py-2.5 text-left shadow-inner">
      <div className="text-[10px] font-bold tracking-wide text-[#AFC3D6]">{label}</div>
      <div className={'mt-1 flex items-end gap-1 ' + toneClass(numeric, kind)} dir="ltr">
        <span className="text-[22px] font-black tabular-nums leading-none">{value}</span>
        {suffix ? <span className="pb-0.5 text-[9px] font-bold opacity-70">{suffix}</span> : null}
      </div>
    </div>
  );
}

function Monitor({ vitals }: { vitals: Vitals }) {
  return (
    <section className="overflow-hidden rounded-[22px] border border-[#173A63] bg-[#091A2D] p-3.5 shadow-[0_12px_30px_rgba(9,26,45,0.18)]">
      <div className="mb-3 flex items-center justify-between" dir="ltr">
        <div className="flex items-center gap-2 text-[#D9A441]">
          <Activity size={16} />
          <span className="text-[10px] font-black tracking-[0.18em]">SIM MONITOR</span>
        </div>
        <span className="rounded-full border border-white/10 px-2 py-1 text-[9px] font-bold text-[#AFC3D6]">EDUCATION</span>
      </div>

      <div className="mb-3 rounded-[14px] border border-white/10 bg-black/20 px-2 py-2">
        <svg viewBox="0 0 520 68" className="h-14 w-full" role="img" aria-label="موجة مراقبة تعليمية">
          <path
            d="M0 36 H52 L62 35 L72 11 L82 58 L92 36 H150 L160 35 L170 13 L180 57 L190 36 H248 L258 35 L268 10 L278 59 L288 36 H346 L356 35 L366 12 L376 58 L386 36 H444 L454 35 L464 11 L474 58 L484 36 H520"
            fill="none"
            stroke="#D9A441"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        <VitalTile label="HR" value={vitals.hr} suffix="bpm" kind="hr" />
        <VitalTile label="NIBP" value={`${vitals.sbp}/${vitals.dbp}`} suffix="mmHg" kind="sbp" />
        <VitalTile label="SpO₂" value={vitals.spo2} suffix="%" kind="spo2" />
        <VitalTile label="EtCO₂" value={vitals.etco2} suffix="mmHg" kind="etco2" />
      </div>
    </section>
  );
}

export function AnesthesiaRescueGame({ onExit }: { onExit: () => void }) {
  const [started, setStarted] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const [vitals, setVitals] = useState<Vitals>(INITIAL_VITALS);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<Choice | null>(null);
  const [history, setHistory] = useState<Array<{ title: string; choice: string; score: number }>>([]);

  const finished = started && stepIndex >= STEPS.length;
  const step = STEPS[Math.min(stepIndex, STEPS.length - 1)];
  const percent = Math.round((score / 100) * 100);

  const status = useMemo(() => {
    if (percent >= 85) return { label: 'أداء ممتاز', icon: Trophy };
    if (percent >= 60) return { label: 'أداء جيد', icon: ShieldCheck };
    return { label: 'تحتاج جولة ثانية', icon: AlertTriangle };
  }, [percent]);

  const reset = () => {
    setStarted(false);
    setStepIndex(0);
    setVitals(INITIAL_VITALS);
    setScore(0);
    setSelected(null);
    setHistory([]);
  };

  const choose = (choice: Choice) => {
    if (selected) return;
    setSelected(choice);
    setScore((value) => value + choice.score);
    setVitals((current) => applyDelta(current, choice.delta));
    setHistory((items) => [...items, { title: step.title, choice: choice.label, score: choice.score }]);
  };

  const next = () => {
    setSelected(null);
    setStepIndex((value) => value + 1);
  };

  if (!started) {
    return (
      <div className="space-y-4">
        <button type="button" onClick={onExit} className="inline-flex min-h-10 items-center gap-1 text-[11px] font-black text-[#526675]">
          <ArrowRight size={15} /> رجوع للألعاب
        </button>

        <section className="overflow-hidden rounded-[26px] border border-[#DCE5EA] bg-[linear-gradient(145deg,#FFFFFF_0%,#F3F7FA_100%)] p-4 shadow-[0_14px_35px_rgba(16,45,79,0.10)]">
          <div className="flex items-start gap-3">
            <div className="grid h-14 w-14 shrink-0 place-items-center rounded-[18px] border border-[#D9A441]/35 bg-[#FFF8E7] text-[#9A7122]">
              <HeartPulse size={31} strokeWidth={2.1} />
            </div>
            <div className="min-w-0 flex-1 text-right">
              <p className="text-[10px] font-black text-[#9A7122]">محاكاة تعليمية تفاعلية</p>
              <h2 className="mt-1 text-xl font-black text-[#183149]">أنقذ المريض أثناء التخدير</h2>
              <p className="mt-2 text-[11px] font-semibold leading-6 text-[#5F7280]">
                حالة قصيرة فيها Monitor وقرارات متتابعة. كل قرار يغيّر العلامات الحيوية ويأثر على نتيجتك.
              </p>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-3 gap-2 text-center">
            <div className="rounded-xl bg-white px-2 py-2.5 shadow-sm"><div className="text-lg font-black text-[#183149]">4</div><div className="text-[9px] font-bold text-[#66737F]">قرارات</div></div>
            <div className="rounded-xl bg-white px-2 py-2.5 shadow-sm"><div className="text-lg font-black text-[#183149]">100</div><div className="text-[9px] font-bold text-[#66737F]">نقطة</div></div>
            <div className="rounded-xl bg-white px-2 py-2.5 shadow-sm"><div className="text-lg font-black text-[#183149]">~3</div><div className="text-[9px] font-bold text-[#66737F]">دقائق</div></div>
          </div>

          <button
            type="button"
            onClick={() => setStarted(true)}
            className="mt-4 flex min-h-12 w-full items-center justify-center gap-2 rounded-[16px] bg-[#173A63] px-4 text-sm font-black text-white shadow-[0_8px_20px_rgba(23,58,99,0.2)] active:bg-[#102D4F]"
          >
            <Play size={18} fill="currentColor" /> ابدأ الحالة
          </button>
        </section>

        <div className="rounded-[18px] border border-[#E7DFC9] bg-[#FFF9EE] px-3.5 py-3 text-[10px] font-semibold leading-5 text-[#6D6048]">
          هذه محاكاة تعليمية مبسطة وليست جهازاً طبياً أو بديلاً عن بروتوكولات التدريب السريري.
        </div>
      </div>
    );
  }

  if (finished) {
    const StatusIcon = status.icon;
    return (
      <div className="space-y-4">
        <section className="rounded-[26px] border border-[#DCE5EA] bg-white p-4 text-center shadow-[0_14px_35px_rgba(16,45,79,0.10)]">
          <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-[#D9A441]/12 text-[#9A7122]">
            <StatusIcon size={34} />
          </div>
          <p className="mt-3 text-[10px] font-black text-[#8A6426]">DEBRIEF</p>
          <h2 className="mt-1 text-xl font-black text-[#183149]">{status.label}</h2>
          <div className="mt-3 text-4xl font-black tabular-nums text-[#173A63]">{score}<span className="text-base text-[#5F7280]">/100</span></div>
          <div className="mx-auto mt-3 h-2 max-w-xs overflow-hidden rounded-full bg-[#E7EDF1]">
            <div className="h-full rounded-full bg-[#D9A441]" style={{ width: `${percent}%` }} />
          </div>
        </section>

        <section className="space-y-2">
          {history.map((item, index) => (
            <div key={index} className="rounded-[16px] border border-[#DCE5EA] bg-[#F8FAFB] px-3.5 py-3">
              <div className="flex items-center justify-between gap-3">
                <span className={'shrink-0 rounded-full px-2 py-1 text-[10px] font-black ' + (item.score >= 20 ? 'bg-[#E8F5EE] text-[#2F7A55]' : 'bg-[#FBECEA] text-[#A84538]')}>+{item.score}</span>
                <div className="min-w-0 text-right">
                  <p className="text-[11px] font-black text-[#183149]">{item.title}</p>
                  <p className="mt-1 text-[10px] font-semibold leading-5 text-[#5F7280]">{item.choice}</p>
                </div>
              </div>
            </div>
          ))}
        </section>

        <div className="grid grid-cols-2 gap-2">
          <button type="button" onClick={reset} className="flex min-h-11 items-center justify-center gap-2 rounded-[14px] border border-[#DCE5EA] bg-white text-[11px] font-black text-[#315672]">
            <RotateCcw size={16} /> إعادة اللعب
          </button>
          <button type="button" onClick={onExit} className="min-h-11 rounded-[14px] bg-[#173A63] px-3 text-[11px] font-black text-white">رجوع للألعاب</button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between gap-3">
        <button type="button" onClick={onExit} className="inline-flex min-h-10 items-center gap-1 text-[11px] font-black text-[#526675]"><ArrowRight size={15} /> خروج</button>
        <div className="text-left">
          <div className="text-[10px] font-black text-[#8A6426]">القرار {stepIndex + 1} / {STEPS.length}</div>
          <div className="mt-0.5 text-[10px] font-bold text-[#5F7280]">النقاط: {score}</div>
        </div>
      </div>

      <Monitor vitals={vitals} />

      <section className="rounded-[20px] border border-[#DCE5EA] bg-white p-3.5 shadow-[0_8px_22px_rgba(16,45,79,0.07)]">
        <div className="flex items-start gap-2.5">
          <div className="grid h-10 w-10 shrink-0 place-items-center rounded-[13px] bg-[#EEF3F8] text-[#315672]"><Waves size={21} /></div>
          <div className="min-w-0 flex-1 text-right">
            <h3 className="text-sm font-black text-[#183149]">{step.title}</h3>
            <p className="mt-1 text-[11px] font-semibold leading-5 text-[#5F7280]">{step.prompt}</p>
            <p className="mt-2 rounded-xl bg-[#FFF9EE] px-2.5 py-2 text-[10px] font-bold leading-5 text-[#79663F]">{step.cue}</p>
          </div>
        </div>
      </section>

      <div className="space-y-2">
        {step.choices.map((choice) => {
          const isSelected = selected?.id === choice.id;
          return (
            <button
              key={choice.id}
              type="button"
              disabled={Boolean(selected)}
              onClick={() => choose(choice)}
              className={
                'w-full rounded-[16px] border px-3.5 py-3 text-right text-[11px] font-black leading-5 transition-colors ' +
                (isSelected
                  ? choice.score >= 20
                    ? 'border-[#82B79A] bg-[#EAF6EF] text-[#285F45]'
                    : 'border-[#D8A39C] bg-[#FBEFEC] text-[#8A3E35]'
                  : 'border-[#DCE5EA] bg-white text-[#315672] active:bg-[#F3F6F8] disabled:text-[#7E8C96]')
              }
            >
              {choice.label}
            </button>
          );
        })}
      </div>

      {selected ? (
        <section className={'rounded-[18px] border px-3.5 py-3 ' + (selected.score >= 20 ? 'border-[#B9D9C7] bg-[#F0F8F3]' : 'border-[#E4C1BC] bg-[#FFF4F1]')}>
          <div className="flex items-start gap-2.5">
            {selected.score >= 20 ? <CheckCircle2 className="mt-0.5 shrink-0 text-[#2F7A55]" size={19} /> : <AlertTriangle className="mt-0.5 shrink-0 text-[#A84538]" size={19} />}
            <div className="min-w-0 flex-1 text-right">
              <p className="text-[11px] font-black text-[#183149]">{selected.score >= 20 ? 'قرار قوي' : 'راجع القرار'}</p>
              <p className="mt-1 text-[10px] font-semibold leading-5 text-[#5F7280]">{selected.feedback}</p>
            </div>
          </div>
          <button type="button" onClick={next} className="mt-3 min-h-11 w-full rounded-[14px] bg-[#173A63] px-3 text-[11px] font-black text-white active:bg-[#102D4F]">
            {stepIndex === STEPS.length - 1 ? 'شوف النتيجة' : 'القرار التالي'}
          </button>
        </section>
      ) : null}
    </div>
  );
}
