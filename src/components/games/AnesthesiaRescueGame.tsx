import { useEffect, useMemo, useState } from 'react';
import {
  Activity,
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  Clock3,
  Droplets,
  HeartPulse,
  LockKeyhole,
  Pill,
  Play,
  RotateCcw,
  ShieldCheck,
  Stethoscope,
  Trophy,
  UserRound,
  Wind,
  X,
} from 'lucide-react';
import {
  ANESTHESIA_SCENARIOS,
  type ActionGroup,
  type AnesthesiaScenario,
  type SimulationAction,
  type SimulationVitals,
  type VitalDelta,
} from '../../data/games/anesthesiaScenarios';

type Stage = 'baseline' | 'crisis' | 'recovering' | 'resolved' | 'failed';

type HistoryEntry = {
  time: number;
  label: string;
  score: number;
  feedback: string;
};

const GROUP_META: Array<{ id: ActionGroup; label: string }> = [
  { id: 'assess', label: 'تقييم' },
  { id: 'fluids', label: 'سوائل' },
  { id: 'drugs', label: 'أدوية' },
  { id: 'airway', label: 'Airway' },
  { id: 'ventilator', label: 'Vent' },
];

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function applyDelta(vitals: SimulationVitals, delta: VitalDelta): SimulationVitals {
  return {
    hr: clamp(vitals.hr + (delta.hr ?? 0), 25, 220),
    sbp: clamp(vitals.sbp + (delta.sbp ?? 0), 40, 240),
    dbp: clamp(vitals.dbp + (delta.dbp ?? 0), 20, 150),
    spo2: clamp(vitals.spo2 + (delta.spo2 ?? 0), 50, 100),
    etco2: clamp(vitals.etco2 + (delta.etco2 ?? 0), 5, 90),
    rr: clamp(vitals.rr + (delta.rr ?? 0), 3, 40),
  };
}

function toward(current: number, target: number, maxStep: number) {
  const diff = target - current;
  if (Math.abs(diff) <= maxStep) return target;
  return Math.round(current + Math.sign(diff) * maxStep);
}

function driftVitals(current: SimulationVitals, target: SimulationVitals): SimulationVitals {
  return {
    hr: toward(current.hr, target.hr, 4),
    sbp: toward(current.sbp, target.sbp, 6),
    dbp: toward(current.dbp, target.dbp, 4),
    spo2: toward(current.spo2, target.spo2, 1),
    etco2: toward(current.etco2, target.etco2, 2),
    rr: toward(current.rr, target.rr, 1),
  };
}

function formatTime(seconds: number) {
  const min = Math.floor(seconds / 60).toString().padStart(2, '0');
  const sec = (seconds % 60).toString().padStart(2, '0');
  return `${min}:${sec}`;
}

function valueTone(kind: keyof SimulationVitals, value: number) {
  if (kind === 'sbp') return value < 90 ? 'text-[#FF6B5E]' : 'text-[#57D18B]';
  if (kind === 'spo2') return value < 92 ? 'text-[#FF6B5E]' : 'text-[#55C8FF]';
  if (kind === 'hr') return value > 115 || value < 50 ? 'text-[#FFB84D]' : 'text-[#57D18B]';
  if (kind === 'etco2') return value < 25 || value > 50 ? 'text-[#FFB84D]' : 'text-[#E4D35B]';
  return 'text-[#DDE8F2]';
}

function difficultyClass(scenario: AnesthesiaScenario) {
  if (scenario.difficulty === 'easy') return 'border-[#3E9B69]/30 bg-[#3E9B69]/10 text-[#2F7A55]';
  if (scenario.difficulty === 'medium') return 'border-[#D9A441]/35 bg-[#D9A441]/10 text-[#9A7122]';
  return 'border-[#B34A3C]/30 bg-[#B34A3C]/10 text-[#B34A3C]';
}

function VitalValue({
  label,
  value,
  suffix,
  kind,
}: {
  label: string;
  value: string | number;
  suffix?: string;
  kind: keyof SimulationVitals;
}) {
  const numeric = typeof value === 'number' ? value : Number(String(value).split('/')[0]);
  return (
    <div className="min-w-0 rounded-[15px] border border-white/10 bg-white/[0.045] px-3 py-3 text-left">
      <div className="text-[10px] font-black tracking-[0.12em] text-[#8EA5B8]">{label}</div>
      <div className={'mt-1.5 flex items-end gap-1 ' + valueTone(kind, numeric)} dir="ltr">
        <span className="truncate text-[28px] font-black tabular-nums leading-none sm:text-[32px]">{value}</span>
        {suffix ? <span className="pb-0.5 text-[9px] font-bold opacity-70">{suffix}</span> : null}
      </div>
    </div>
  );
}

function WaveformRow({
  label,
  color,
  path,
  markerX,
}: {
  label: string;
  color: string;
  path: string;
  markerX: number;
}) {
  return (
    <div className="grid grid-cols-[42px_1fr] items-center gap-2" dir="ltr">
      <span className="text-[9px] font-black tracking-wider" style={{ color }}>{label}</span>
      <svg viewBox="0 0 520 58" className="h-[58px] w-full" aria-hidden="true" preserveAspectRatio="none">
        <defs>
          <pattern id={`grid-${label}`} width="26" height="14.5" patternUnits="userSpaceOnUse">
            <path d="M26 0H0V14.5" fill="none" stroke="rgba(255,255,255,.045)" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="520" height="58" fill={`url(#grid-${label})`} />
        <path d={path} fill="none" stroke={color} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
        <line x1={markerX} x2={markerX} y1="4" y2="54" stroke="rgba(255,255,255,.18)" strokeWidth="1" />
      </svg>
    </div>
  );
}

function PatientMonitor({
  scenario,
  vitals,
  elapsed,
  stage,
}: {
  scenario: AnesthesiaScenario;
  vitals: SimulationVitals;
  elapsed: number;
  stage: Stage;
}) {
  const alarm = vitals.sbp < 90 || vitals.spo2 < 92 || vitals.etco2 > 50 || vitals.etco2 < 25;
  const markerX = 14 + ((elapsed * 31) % 488);

  return (
    <section className="overflow-hidden border-y border-[#173A63] bg-[#061522] px-3 py-3.5 shadow-[0_14px_34px_rgba(7,23,37,0.24)] sm:rounded-[24px] sm:border">
      <div className="mb-3 flex items-center justify-between gap-2" dir="ltr">
        <div className="flex items-center gap-2 text-[#D9A441]">
          <Activity size={18} />
          <span className="text-[10px] font-black tracking-[0.18em]">OR SIM MONITOR</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="rounded-full border border-white/10 px-2.5 py-1.5 text-[9px] font-bold text-[#AFC3D6]">{formatTime(elapsed)}</span>
          <span className={'rounded-full border px-2.5 py-1.5 text-[9px] font-black ' + (alarm ? 'border-[#FF6B5E]/40 bg-[#FF6B5E]/10 text-[#FF8176]' : 'border-[#57D18B]/25 bg-[#57D18B]/10 text-[#73DA9B]')}>
            {alarm ? 'ALARM' : 'MONITORING'}
          </span>
        </div>
      </div>

      <div className="rounded-[16px] border border-white/10 bg-black/25 px-2.5 py-2">
        <WaveformRow
          label="ECG"
          color="#57D18B"
          markerX={markerX}
          path="M0 30 H38 L44 28 L50 30 L56 9 L62 48 L69 30 H104 L110 28 L116 30 L122 10 L128 47 L135 30 H170 L176 28 L182 30 L188 9 L194 48 L201 30 H236 L242 28 L248 30 L254 10 L260 47 L267 30 H302 L308 28 L314 30 L320 9 L326 48 L333 30 H368 L374 28 L380 30 L386 10 L392 47 L399 30 H434 L440 28 L446 30 L452 9 L458 48 L465 30 H520"
        />
        <WaveformRow
          label="PLETH"
          color="#55C8FF"
          markerX={markerX}
          path="M0 42 C12 41 18 38 24 30 C31 18 37 13 44 17 C50 22 52 31 57 35 C65 40 76 42 90 42 C102 41 108 38 114 30 C121 18 127 13 134 17 C140 22 142 31 147 35 C155 40 166 42 180 42 C192 41 198 38 204 30 C211 18 217 13 224 17 C230 22 232 31 237 35 C245 40 256 42 270 42 C282 41 288 38 294 30 C301 18 307 13 314 17 C320 22 322 31 327 35 C335 40 346 42 360 42 C372 41 378 38 384 30 C391 18 397 13 404 17 C410 22 412 31 417 35 C425 40 436 42 450 42 C462 41 468 38 474 30 C481 18 487 13 494 17 C500 22 503 32 510 37 C514 39 517 41 520 42"
        />
        <WaveformRow
          label="CO₂"
          color="#E4D35B"
          markerX={markerX}
          path="M0 46 H32 C35 46 37 42 38 36 L42 16 C43 12 46 11 50 11 H76 L83 14 H103 C107 14 109 18 109 23 V46 H142 C145 46 147 42 148 36 L152 16 C153 12 156 11 160 11 H186 L193 14 H213 C217 14 219 18 219 23 V46 H252 C255 46 257 42 258 36 L262 16 C263 12 266 11 270 11 H296 L303 14 H323 C327 14 329 18 329 23 V46 H362 C365 46 367 42 368 36 L372 16 C373 12 376 11 380 11 H406 L413 14 H433 C437 14 439 18 439 23 V46 H472 C475 46 477 42 478 36 L482 16 C483 12 486 11 490 11 H516 L520 13"
        />
      </div>

      <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3">
        <VitalValue label="HR" value={vitals.hr} suffix="bpm" kind="hr" />
        <VitalValue label="NIBP" value={`${vitals.sbp}/${vitals.dbp}`} kind="sbp" />
        <VitalValue label="SpO₂" value={vitals.spo2} suffix="%" kind="spo2" />
        <VitalValue label="EtCO₂" value={vitals.etco2} suffix="mmHg" kind="etco2" />
        <VitalValue label="RR" value={vitals.rr} suffix="/min" kind="rr" />
        <div className="rounded-[15px] border border-white/10 bg-white/[0.045] px-3 py-3 text-left">
          <div className="text-[10px] font-black tracking-[0.12em] text-[#8EA5B8]">STATE</div>
          <div className="mt-2 text-[14px] font-black text-[#DDE8F2]">
            {stage === 'baseline' && 'STABLE'}
            {stage === 'crisis' && 'UNSTABLE'}
            {stage === 'recovering' && 'RECOVERING'}
            {stage === 'resolved' && 'STABLE'}
            {stage === 'failed' && 'TIME OUT'}
          </div>
          <div className="mt-1 text-[9px] font-bold text-[#8EA5B8]">{scenario.difficultyAr}</div>
        </div>
      </div>
    </section>
  );
}

function PatientStrip({ scenario }: { scenario: AnesthesiaScenario }) {
  const patient = scenario.patient;
  return (
    <div className="overflow-x-auto border-y border-[#DCE5EA] bg-[#F8FAFB] px-3 py-2.5 [scrollbar-width:none] sm:rounded-[16px] sm:border [&::-webkit-scrollbar]:hidden">
      <div className="flex min-w-max items-center gap-2.5 whitespace-nowrap text-[10px] font-bold text-[#526675]">
        <span className="grid h-8 w-8 place-items-center rounded-[10px] border border-[#D7E2E9] bg-white text-[#315672]"><UserRound size={17} /></span>
        <span>{patient.sexAr} • {patient.age} سنة</span>
        <span className="h-3 w-px bg-[#D6E0E7]" />
        <span>{patient.weightKg} kg</span>
        <span className="h-3 w-px bg-[#D6E0E7]" />
        <span>ASA {patient.asa}</span>
        <span className="h-3 w-px bg-[#D6E0E7]" />
        <span>{patient.procedureAr}</span>
        <span className="h-3 w-px bg-[#D6E0E7]" />
        <span>{patient.fastingAr}</span>
      </div>
    </div>
  );
}

function GroupIcon({ group, size = 19 }: { group: ActionGroup; size?: number }) {
  if (group === 'assess') return <Stethoscope size={size} />;
  if (group === 'fluids') return <Droplets size={size} />;
  if (group === 'drugs') return <Pill size={size} />;
  if (group === 'airway') return <Wind size={size} />;
  return <Activity size={size} />;
}

function ActionSheet({
  scenario,
  group,
  usedActions,
  onClose,
  onAction,
}: {
  scenario: AnesthesiaScenario;
  group: ActionGroup;
  usedActions: Set<string>;
  onClose: () => void;
  onAction: (action: SimulationAction) => void;
}) {
  const meta = GROUP_META.find((item) => item.id === group)!;
  const actions = scenario.actions.filter((action) => action.group === group);

  return (
    <>
      <button type="button" aria-label="إغلاق قائمة الإجراءات" className="fixed inset-0 z-[60] bg-[#071725]/40" onClick={onClose} />
      <section
        role="dialog"
        aria-modal="true"
        aria-label={meta.label}
        className="fixed inset-x-0 bottom-[82px] z-[70] mx-auto max-h-[62vh] w-full max-w-3xl overflow-y-auto rounded-t-[26px] border border-b-0 border-[#D8E2E9] bg-white px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-3 shadow-[0_-18px_50px_rgba(7,23,37,0.2)]"
      >
        <div className="mx-auto mb-3 h-1 w-10 rounded-full bg-[#B8C7D2]" />
        <div className="mb-3 flex items-center justify-between gap-3">
          <button type="button" onClick={onClose} className="grid h-9 w-9 place-items-center rounded-full border border-[#D8E2E9] bg-[#F7F9FA] text-[#526675]" aria-label="إغلاق"><X size={17} /></button>
          <div className="flex items-center gap-2 text-right">
            <div>
              <p className="text-[10px] font-bold text-[#7A8995]">اختَر الإجراء</p>
              <h3 className="text-[14px] font-black text-[#183149]">{meta.label}</h3>
            </div>
            <span className="grid h-10 w-10 place-items-center rounded-[12px] border border-[#D7E2E9] bg-[#EEF3F6] text-[#315672]"><GroupIcon group={group} size={21} /></span>
          </div>
        </div>

        {actions.length === 0 ? (
          <div className="rounded-[16px] border border-dashed border-[#D7E2E9] bg-[#F8FAFB] p-4 text-center text-[10px] font-bold text-[#7A8995]">ماكو تدخل مطلوب من هذا القسم بهذي المرحلة.</div>
        ) : (
          <div className="space-y-2">
            {actions.map((action) => {
              const used = usedActions.has(action.id);
              return (
                <button
                  key={action.id}
                  type="button"
                  disabled={used}
                  onClick={() => onAction(action)}
                  className={'w-full rounded-[16px] border px-3.5 py-3 text-right outline-none ' + (used ? 'border-[#DCE5EA] bg-[#F3F6F8] opacity-60' : 'border-[#D7E2E9] bg-white active:bg-[#F3F6F8] focus-visible:ring-2 focus-visible:ring-[#D9A441]/45')}
                >
                  <div className="flex items-start justify-between gap-3">
                    <span className="mt-0.5 shrink-0 rounded-full bg-[#EEF3F6] px-2 py-1 text-[9px] font-black text-[#526675]">{used ? 'تم' : `+${action.score}`}</span>
                    <div className="min-w-0 flex-1">
                      <div className="text-[12px] font-black text-[#183149]">{action.labelAr}</div>
                      {action.labelEn ? <div className="mt-0.5 text-[9px] font-bold text-[#7A8995]" dir="ltr">{action.labelEn}</div> : null}
                      <p className="mt-1.5 text-[10px] font-semibold leading-5 text-[#5F7280]">{action.detail}</p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </section>
    </>
  );
}

export function AnesthesiaRescueGame({ onExit }: { onExit: () => void }) {
  const [scenarioIndex, setScenarioIndex] = useState(0);
  const [highestUnlocked, setHighestUnlocked] = useState(0);
  const scenario = ANESTHESIA_SCENARIOS[scenarioIndex];

  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);
  const [stage, setStage] = useState<Stage>('baseline');
  const [elapsed, setElapsed] = useState(0);
  const [vitals, setVitals] = useState<SimulationVitals>(scenario.baselineVitals);
  const [targetVitals, setTargetVitals] = useState<SimulationVitals>(scenario.baselineVitals);
  const [score, setScore] = useState(0);
  const [usedActions, setUsedActions] = useState<Set<string>>(() => new Set());
  const [activeGroup, setActiveGroup] = useState<ActionGroup | null>(null);
  const [feedback, setFeedback] = useState('راقب المونيتور. الحالة تبدأ مستقرة، وبعدها راح يظهر التغيّر بدون سؤال مباشر.');
  const [history, setHistory] = useState<HistoryEntry[]>([]);

  const prepareScenario = (index: number, autoStart = false) => {
    const next = ANESTHESIA_SCENARIOS[index];
    setScenarioIndex(index);
    setStarted(autoStart);
    setFinished(false);
    setStage('baseline');
    setElapsed(0);
    setVitals(next.baselineVitals);
    setTargetVitals(next.baselineVitals);
    setScore(0);
    setUsedActions(new Set());
    setActiveGroup(null);
    setHistory([]);
    setFeedback('راقب المونيتور. الحالة تبدأ مستقرة، وبعدها راح يظهر التغيّر بدون سؤال مباشر.');
  };

  useEffect(() => {
    if (!started || finished || stage === 'resolved' || stage === 'failed') return;
    const timer = window.setInterval(() => {
      setElapsed((value) => value + 1);
      setVitals((current) => driftVitals(current, targetVitals));
    }, 1000);
    return () => window.clearInterval(timer);
  }, [started, finished, stage, targetVitals]);

  useEffect(() => {
    if (!started || finished) return;

    if (elapsed >= scenario.crisisAtSec && stage === 'baseline') {
      setStage('crisis');
      setTargetVitals(scenario.crisisVitals);
      setFeedback(
        scenario.difficulty === 'easy'
          ? 'صار تغير واضح بالمونيتور. ابدأ بتقييم منظم، وبعدها تدخل حسب السبب.'
          : scenario.difficulty === 'medium'
            ? 'المونيتور تغير. اربط أكثر من مؤشر قبل اختيار التدخل.'
            : 'أزمة متعددة المؤشرات. اشتغل ABC وبالتوازي، بدون افتراض تشخيص قبل استبعاد الأسباب السريعة.'
      );
      return;
    }

    if (elapsed >= scenario.severeAtSec && stage === 'crisis') {
      setTargetVitals(scenario.severeVitals);
      setFeedback('الحالة تتدهور مع الوقت. راجع التسلسل، عالج السبب، وصعّد المساعدة إذا لزم.');
    }

    if (elapsed >= scenario.estimatedSeconds && stage !== 'resolved' && stage !== 'recovering') {
      setStage('failed');
      setFeedback('انتهى وقت المرحلة قبل تحقق شروط الاستقرار. راجع الـDebrief وأعد المحاولة.');
    }
  }, [elapsed, finished, scenario, stage, started]);

  useEffect(() => {
    if (stage !== 'recovering') return;
    const stableEnough = vitals.sbp >= 94 && vitals.spo2 >= 95 && vitals.etco2 >= 28 && vitals.etco2 <= 48;
    if (stableEnough) {
      setStage('resolved');
      setHighestUnlocked((value) => Math.max(value, Math.min(ANESTHESIA_SCENARIOS.length - 1, scenarioIndex + 1)));
      setFeedback('تحققت شروط الاستقرار. راقب الاتجاه النهائي ثم افتح الـDebrief.');
    }
  }, [scenarioIndex, stage, vitals.etco2, vitals.sbp, vitals.spo2]);

  const canAct = started && !finished && stage !== 'baseline' && stage !== 'resolved' && stage !== 'failed';
  const unstable = vitals.sbp < 90 || vitals.spo2 < 92 || vitals.etco2 > 50 || vitals.etco2 < 25;

  const status = useMemo(() => {
    if (stage === 'resolved' && score >= 75) return { label: 'اجتزت المرحلة بإتقان', icon: Trophy };
    if (stage === 'resolved') return { label: 'اجتزت المرحلة', icon: ShieldCheck };
    return { label: 'المرحلة تحتاج إعادة', icon: AlertTriangle };
  }, [score, stage]);

  const reset = () => prepareScenario(scenarioIndex, false);

  const requirementsSatisfied = (nextUsed: Set<string>) => {
    const allReady = scenario.resolution.requiredAll.every((id) => nextUsed.has(id));
    const anyReady = scenario.resolution.requiredAny.some((id) => nextUsed.has(id));
    return allReady && anyReady;
  };

  const performAction = (action: SimulationAction) => {
    if (!canAct || usedActions.has(action.id)) return;

    const ordered = !action.requires || action.requires.every((id) => usedActions.has(id));
    const earned = ordered ? action.score : action.partialScore ?? 0;
    const actionFeedback = ordered ? action.feedback : action.unorderedFeedback ?? action.feedback;
    const nextUsed = new Set(usedActions);
    nextUsed.add(action.id);

    setUsedActions(nextUsed);
    setScore((value) => Math.min(100, value + earned));
    setTargetVitals((current) => applyDelta(current, action.effect));
    setFeedback(actionFeedback);
    setHistory((items) => [...items, { time: elapsed, label: action.labelAr, score: earned, feedback: actionFeedback }]);
    setActiveGroup(null);

    if (requirementsSatisfied(nextUsed)) {
      setStage('recovering');
      setTargetVitals(scenario.recoveryVitals);
    }
  };

  if (!started) {
    return (
      <div className="space-y-4">
        <button type="button" onClick={onExit} className="inline-flex min-h-10 items-center gap-1 text-[11px] font-black text-[#526675]"><ArrowRight size={16} /> رجوع للألعاب</button>

        <section className="rounded-[24px] border border-[#173A63] bg-[#0B223B] p-4 text-white shadow-[0_16px_38px_rgba(11,34,59,0.18)]">
          <p className="text-[9px] font-black tracking-[0.14em] text-[#E6BD61]">3-STAGE CLINICAL SIMULATION</p>
          <h2 className="mt-1.5 text-lg font-black">مسار محاكاة التخدير</h2>
          <p className="mt-2 text-[11px] font-semibold leading-5 text-[#D4DEE7]">تمر بثلاث مراحل: سهل، متوسط، صعب. كل مرحلة بيها أكثر من تدخل، ولا تنفتح المرحلة التالية إلا بعد استقرار الحالة الحالية.</p>
        </section>

        <div className="space-y-2.5">
          {ANESTHESIA_SCENARIOS.map((item, index) => {
            const unlocked = index <= highestUnlocked;
            const selected = index === scenarioIndex;
            return (
              <button
                key={item.id}
                type="button"
                disabled={!unlocked}
                onClick={() => prepareScenario(index, false)}
                className={'w-full rounded-[20px] border p-4 text-right outline-none ' + (selected ? 'border-[#173A63] bg-[#F4F7FA] shadow-[0_8px_20px_rgba(23,58,99,0.08)]' : 'border-[#DCE5EA] bg-white') + (!unlocked ? ' opacity-55' : '')}
              >
                <div className="flex items-start gap-3">
                  <div className={'grid h-12 w-12 shrink-0 place-items-center rounded-[15px] border ' + difficultyClass(item)}>
                    {unlocked ? <span className="text-lg font-black">{index + 1}</span> : <LockKeyhole size={20} />}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-end gap-2">
                      <span className={'rounded-full border px-2 py-1 text-[9px] font-black ' + difficultyClass(item)}>{item.difficultyAr}</span>
                      <span className="text-[9px] font-bold text-[#7A8995]">{item.actions.length} تدخلات محتملة</span>
                    </div>
                    <h3 className="mt-2 text-[13px] font-black text-[#183149]">{item.titleAr}</h3>
                    <p className="mt-1 text-[10px] font-semibold leading-5 text-[#5F7280]">{item.summary}</p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        <PatientStrip scenario={scenario} />

        <section className="rounded-[18px] border border-[#DCE5EA] bg-[#F8FAFB] p-3.5 text-right">
          <div className="flex items-center justify-between gap-3">
            <span className={'rounded-full border px-2.5 py-1 text-[9px] font-black ' + difficultyClass(scenario)}>{scenario.difficultyAr}</span>
            <div>
              <h3 className="text-[12px] font-black text-[#183149]">{scenario.titleAr}</h3>
              <p className="mt-1 text-[9px] font-semibold text-[#7A8995]">الوقت المتوقع ~{scenario.estimatedSeconds} ثانية</p>
            </div>
          </div>
        </section>

        <button type="button" onClick={() => setStarted(true)} className="flex min-h-12 w-full items-center justify-center gap-2 rounded-[16px] bg-[#173A63] px-4 text-[12px] font-black text-white shadow-[0_8px_20px_rgba(23,58,99,0.18)] active:bg-[#102D4F]"><Play size={18} fill="currentColor" /> ابدأ المرحلة {scenario.difficultyAr}</button>
        <p className="text-center text-[9px] font-semibold leading-4 text-[#7A8995]">محاكاة تعليمية فقط. التدخلات عامة ولا تعرض جرعات علاجية، ويظل بروتوكول المؤسسة والمشرف السريري هو المرجع في الواقع.</p>
      </div>
    );
  }

  if (finished) {
    const StatusIcon = status.icon;
    const passed = stage === 'resolved';
    const hasNext = passed && scenarioIndex < ANESTHESIA_SCENARIOS.length - 1;

    return (
      <div className="space-y-4">
        <section className="rounded-[24px] border border-[#DCE5EA] bg-[linear-gradient(145deg,#FFFFFF,#F3F7FA)] p-5 text-center shadow-[0_12px_30px_rgba(16,45,79,0.08)]">
          <div className="mx-auto grid h-14 w-14 place-items-center rounded-full border border-[#D9A441]/35 bg-[#D9A441]/10 text-[#9A7122]"><StatusIcon size={29} /></div>
          <p className="mt-3 text-[10px] font-black text-[#9A7122]">DEBRIEF • {scenario.difficultyAr}</p>
          <h2 className="mt-1 text-xl font-black text-[#183149]">{status.label}</h2>
          <div className="mt-3 text-4xl font-black tabular-nums text-[#173A63]">{score}<span className="text-base text-[#7A8995]">/100</span></div>
          <p className="mt-2 text-[10px] font-semibold text-[#5F7280]">الوقت: {formatTime(elapsed)} • الإجراءات: {history.length}</p>
        </section>

        <section className="rounded-[20px] border border-[#DCE5EA] bg-white p-4">
          <h3 className="text-right text-[13px] font-black text-[#183149]">Timeline القرارات</h3>
          <div className="mt-3 space-y-2">
            {history.length === 0 ? (
              <p className="rounded-[14px] bg-[#F8FAFB] p-3 text-center text-[10px] font-semibold text-[#66737F]">ما تم تسجيل أي تدخل.</p>
            ) : history.map((entry, index) => (
              <div key={`${entry.time}-${index}`} className="rounded-[14px] border border-[#E0E8ED] bg-[#F8FAFB] p-3 text-right">
                <div className="flex items-center justify-between gap-2">
                  <span className="rounded-full bg-white px-2 py-1 text-[9px] font-black text-[#526675]">+{entry.score}</span>
                  <div className="flex items-center gap-1.5 text-[9px] font-bold text-[#7A8995]"><Clock3 size={12} /> {formatTime(entry.time)}</div>
                </div>
                <h4 className="mt-2 text-[11px] font-black text-[#183149]">{entry.label}</h4>
                <p className="mt-1 text-[10px] font-semibold leading-5 text-[#5F7280]">{entry.feedback}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-[20px] border border-[#DCE5EA] bg-[#F8FAFB] p-4 text-right">
          <h3 className="text-[12px] font-black text-[#183149]">ليش هذي المرحلة علمياً؟</h3>
          <div className="mt-2 space-y-2">
            {scenario.learningObjectives.map((item) => (
              <div key={item} className="flex items-start justify-end gap-2 text-[10px] font-semibold leading-5 text-[#526675]">
                <span className="flex-1 text-right">{item}</span>
                <CheckCircle2 size={15} className="mt-0.5 shrink-0 text-[#2F7A55]" />
              </div>
            ))}
          </div>
        </section>

        {hasNext ? (
          <button type="button" onClick={() => prepareScenario(scenarioIndex + 1, false)} className="flex min-h-12 w-full items-center justify-center gap-2 rounded-[16px] bg-[#173A63] text-[12px] font-black text-white">المرحلة التالية: {ANESTHESIA_SCENARIOS[scenarioIndex + 1].difficultyAr} <ArrowRight className="rotate-180" size={17} /></button>
        ) : null}

        <div className="grid grid-cols-2 gap-2">
          <button type="button" onClick={onExit} className="min-h-11 rounded-[14px] border border-[#D7E2E9] bg-white text-[11px] font-black text-[#526675]">رجوع للألعاب</button>
          <button type="button" onClick={reset} className="flex min-h-11 items-center justify-center gap-2 rounded-[14px] bg-[#173A63] text-[11px] font-black text-white"><RotateCcw size={16} /> إعادة المرحلة</button>
        </div>
      </div>
    );
  }

  return (
    <div className="-mx-4 space-y-3 pb-3 sm:-mx-6">
      <div className="flex items-center justify-between gap-3 px-4 sm:px-6">
        <button type="button" onClick={onExit} className="inline-flex min-h-9 items-center gap-1 text-[10px] font-black text-[#526675]"><ArrowRight size={15} /> خروج</button>
        <div className="min-w-0 text-right">
          <div className="flex items-center justify-end gap-2">
            <span className={'rounded-full border px-2 py-1 text-[8px] font-black ' + difficultyClass(scenario)}>{scenario.difficultyAr}</span>
            <p className="truncate text-[12px] font-black text-[#183149]">{scenario.titleAr}</p>
          </div>
          <p className="mt-0.5 text-[9px] font-bold text-[#7A8995]">المرحلة {scenarioIndex + 1}/3 • Score {score}</p>
        </div>
      </div>

      <PatientStrip scenario={scenario} />
      <PatientMonitor scenario={scenario} vitals={vitals} elapsed={elapsed} stage={stage} />

      <section className={'mx-3 rounded-[18px] border px-3.5 py-3 text-right sm:mx-6 ' + (unstable ? 'border-[#E8C3BD] bg-[#FFF4F2]' : 'border-[#DCE5EA] bg-[#F8FAFB]')}>
        <div className="flex items-start justify-end gap-2.5">
          <div className="min-w-0 flex-1">
            <div className="text-[11px] font-black text-[#183149]">
              {stage === 'baseline' && 'راقب قبل الحدث'}
              {stage === 'crisis' && 'الحالة غير مستقرة'}
              {stage === 'recovering' && 'استجابة للتدخلات'}
              {stage === 'resolved' && 'الحالة مستقرة'}
              {stage === 'failed' && 'انتهى الوقت'}
            </div>
            <p className="mt-1 text-[10px] font-semibold leading-5 text-[#5F7280]">{feedback}</p>
            {stage === 'crisis' && scenario.difficulty !== 'hard' ? (
              <div className="mt-2 rounded-[12px] border border-[#DCE5EA] bg-white/70 px-3 py-2 text-[9px] font-bold leading-5 text-[#526675]">
                {scenario.difficulty === 'easy' ? scenario.clinicalClues.slice(0, 2).join(' • ') : scenario.clinicalClues[0]}
              </div>
            ) : null}
          </div>
          <span className={'grid h-9 w-9 shrink-0 place-items-center rounded-[11px] ' + (unstable ? 'bg-[#B34A3C]/10 text-[#B34A3C]' : 'bg-[#315672]/10 text-[#315672]')}>{unstable ? <AlertTriangle size={19} /> : <HeartPulse size={19} />}</span>
        </div>
      </section>

      {(stage === 'resolved' || stage === 'failed') ? (
        <button type="button" onClick={() => setFinished(true)} className="mx-3 flex min-h-12 w-[calc(100%-1.5rem)] items-center justify-center gap-2 rounded-[16px] bg-[#173A63] text-[12px] font-black text-white shadow-[0_8px_20px_rgba(23,58,99,0.16)] sm:mx-6 sm:w-[calc(100%-3rem)]"><CheckCircle2 size={18} /> إنهاء المرحلة وعرض الـDebrief</button>
      ) : null}

      <div className="h-[82px]" aria-hidden="true" />

      <nav className="sticky bottom-[76px] z-30 mx-2 grid grid-cols-5 gap-1 rounded-[18px] border border-[#D7E2E9] bg-white/95 p-1.5 shadow-[0_10px_28px_rgba(7,23,37,0.14)] backdrop-blur-md sm:mx-6" aria-label="أدوات المحاكاة">
        {GROUP_META.map((item) => (
          <button
            key={item.id}
            type="button"
            disabled={!canAct}
            onClick={() => setActiveGroup(item.id)}
            className="flex min-h-[58px] min-w-0 flex-col items-center justify-center gap-1 rounded-[12px] px-1 text-[#315672] outline-none active:bg-[#EEF3F6] disabled:opacity-35"
          >
            <GroupIcon group={item.id} size={20} />
            <span className="truncate text-[9px] font-black">{item.label}</span>
          </button>
        ))}
      </nav>

      {activeGroup ? <ActionSheet scenario={scenario} group={activeGroup} usedActions={usedActions} onClose={() => setActiveGroup(null)} onAction={performAction} /> : null}
    </div>
  );
}
