import { useEffect, useMemo, useState } from 'react';
import {
  Activity,
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  Clock3,
  Droplets,
  HeartPulse,
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
  POST_INDUCTION_HYPOTENSION,
  type ActionGroup,
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

const scenario = POST_INDUCTION_HYPOTENSION;

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
    sbp: toward(current.sbp, target.sbp, 7),
    dbp: toward(current.dbp, target.dbp, 4),
    spo2: toward(current.spo2, target.spo2, 1),
    etco2: toward(current.etco2, target.etco2, 1),
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
    <div className="min-w-0 rounded-[12px] border border-white/10 bg-white/[0.04] px-2.5 py-2 text-left">
      <div className="text-[9px] font-black tracking-[0.12em] text-[#8EA5B8]">{label}</div>
      <div className={'mt-1 flex items-end gap-1 ' + valueTone(kind, numeric)} dir="ltr">
        <span className="truncate text-[20px] font-black tabular-nums leading-none sm:text-[23px]">{value}</span>
        {suffix ? <span className="pb-0.5 text-[8px] font-bold opacity-70">{suffix}</span> : null}
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
    <div className="grid grid-cols-[34px_1fr] items-center gap-1.5" dir="ltr">
      <span className="text-[8px] font-black tracking-wider" style={{ color }}>{label}</span>
      <svg viewBox="0 0 520 52" className="h-[38px] w-full" aria-hidden="true">
        <defs>
          <pattern id={`grid-${label}`} width="26" height="13" patternUnits="userSpaceOnUse">
            <path d="M26 0H0V13" fill="none" stroke="rgba(255,255,255,.045)" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="520" height="52" fill={`url(#grid-${label})`} />
        <path d={path} fill="none" stroke={color} strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" />
        <line x1={markerX} x2={markerX} y1="4" y2="48" stroke="rgba(255,255,255,.17)" strokeWidth="1" />
      </svg>
    </div>
  );
}

function PatientMonitor({ vitals, elapsed, stage }: { vitals: SimulationVitals; elapsed: number; stage: Stage }) {
  const alarm = vitals.sbp < 90 || vitals.spo2 < 92;
  const markerX = 14 + ((elapsed * 31) % 488);

  return (
    <section className="overflow-hidden rounded-[22px] border border-[#173A63] bg-[#071725] p-3 shadow-[0_12px_30px_rgba(7,23,37,0.22)]">
      <div className="mb-2.5 flex items-center justify-between" dir="ltr">
        <div className="flex items-center gap-2 text-[#D9A441]">
          <Activity size={16} />
          <span className="text-[9px] font-black tracking-[0.18em]">OR SIM MONITOR</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="rounded-full border border-white/10 px-2 py-1 text-[8px] font-bold text-[#8EA5B8]">{formatTime(elapsed)}</span>
          {alarm ? (
            <span className="rounded-full border border-[#FF6B5E]/40 bg-[#FF6B5E]/10 px-2 py-1 text-[8px] font-black text-[#FF8176]">ALARM</span>
          ) : (
            <span className="rounded-full border border-[#57D18B]/25 bg-[#57D18B]/10 px-2 py-1 text-[8px] font-black text-[#73DA9B]">MONITORING</span>
          )}
        </div>
      </div>

      <div className="space-y-0.5 rounded-[14px] border border-white/10 bg-black/20 px-2 py-1.5">
        <WaveformRow
          label="ECG"
          color="#57D18B"
          markerX={markerX}
          path="M0 27 H38 L44 25 L50 27 L56 8 L62 43 L69 27 H104 L110 25 L116 27 L122 9 L128 42 L135 27 H170 L176 25 L182 27 L188 8 L194 43 L201 27 H236 L242 25 L248 27 L254 9 L260 42 L267 27 H302 L308 25 L314 27 L320 8 L326 43 L333 27 H368 L374 25 L380 27 L386 9 L392 42 L399 27 H434 L440 25 L446 27 L452 8 L458 43 L465 27 H520"
        />
        <WaveformRow
          label="PLETH"
          color="#55C8FF"
          markerX={markerX}
          path="M0 37 C12 36 18 34 24 27 C31 17 37 12 44 16 C50 20 52 28 57 31 C65 36 76 37 90 37 C102 36 108 34 114 27 C121 17 127 12 134 16 C140 20 142 28 147 31 C155 36 166 37 180 37 C192 36 198 34 204 27 C211 17 217 12 224 16 C230 20 232 28 237 31 C245 36 256 37 270 37 C282 36 288 34 294 27 C301 17 307 12 314 16 C320 20 322 28 327 31 C335 36 346 37 360 37 C372 36 378 34 384 27 C391 17 397 12 404 16 C410 20 412 28 417 31 C425 36 436 37 450 37 C462 36 468 34 474 27 C481 17 487 12 494 16 C500 20 503 29 510 33 C514 35 517 36 520 37"
        />
        <WaveformRow
          label="CO₂"
          color="#E4D35B"
          markerX={markerX}
          path="M0 41 H32 C35 41 37 38 38 33 L42 15 C43 12 46 11 50 11 H76 L83 14 H103 C107 14 109 17 109 21 V41 H142 C145 41 147 38 148 33 L152 15 C153 12 156 11 160 11 H186 L193 14 H213 C217 14 219 17 219 21 V41 H252 C255 41 257 38 258 33 L262 15 C263 12 266 11 270 11 H296 L303 14 H323 C327 14 329 17 329 21 V41 H362 C365 41 367 38 368 33 L372 15 C373 12 376 11 380 11 H406 L413 14 H433 C437 14 439 17 439 21 V41 H472 C475 41 477 38 478 33 L482 15 C483 12 486 11 490 11 H516 L520 13"
        />
      </div>

      <div className="mt-2.5 grid grid-cols-3 gap-1.5">
        <VitalValue label="HR" value={vitals.hr} suffix="bpm" kind="hr" />
        <VitalValue label="NIBP" value={`${vitals.sbp}/${vitals.dbp}`} kind="sbp" />
        <VitalValue label="SpO₂" value={vitals.spo2} suffix="%" kind="spo2" />
        <VitalValue label="EtCO₂" value={vitals.etco2} kind="etco2" />
        <VitalValue label="RR" value={vitals.rr} suffix="/min" kind="rr" />
        <div className="rounded-[12px] border border-white/10 bg-white/[0.04] px-2.5 py-2 text-left">
          <div className="text-[9px] font-black tracking-[0.12em] text-[#8EA5B8]">STATE</div>
          <div className="mt-1 truncate text-[11px] font-black text-[#DDE8F2]">
            {stage === 'baseline' && 'STABLE'}
            {stage === 'crisis' && 'UNSTABLE'}
            {stage === 'recovering' && 'RECOVERING'}
            {stage === 'resolved' && 'STABLE'}
            {stage === 'failed' && 'TIME OUT'}
          </div>
        </div>
      </div>
    </section>
  );
}

function PatientStrip() {
  const patient = scenario.patient;
  return (
    <div className="overflow-x-auto rounded-[16px] border border-[#DCE5EA] bg-[#F8FAFB] px-3 py-2.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
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
  group,
  usedActions,
  onClose,
  onAction,
}: {
  group: ActionGroup;
  usedActions: Set<string>;
  onClose: () => void;
  onAction: (action: SimulationAction) => void;
}) {
  const meta = GROUP_META.find((item) => item.id === group)!;
  const actions = scenario.actions.filter((action) => action.group === group);

  return (
    <>
      <button
        type="button"
        aria-label="إغلاق قائمة الإجراءات"
        className="fixed inset-0 z-[60] bg-[#071725]/35"
        onClick={onClose}
      />
      <section
        role="dialog"
        aria-modal="true"
        aria-label={meta.label}
        className="fixed inset-x-0 bottom-[82px] z-[70] mx-auto max-h-[58vh] w-full max-w-3xl overflow-y-auto rounded-t-[24px] border border-b-0 border-[#D8E2E9] bg-white px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-3 shadow-[0_-18px_50px_rgba(7,23,37,0.18)]"
      >
        <div className="mx-auto mb-3 h-1 w-10 rounded-full bg-[#B8C7D2]" />
        <div className="mb-3 flex items-center justify-between gap-3">
          <button type="button" onClick={onClose} className="grid h-9 w-9 place-items-center rounded-full border border-[#D8E2E9] bg-[#F7F9FA] text-[#526675]" aria-label="إغلاق">
            <X size={17} />
          </button>
          <div className="flex items-center gap-2 text-right">
            <div>
              <p className="text-[10px] font-bold text-[#7A8995]">اختَر الإجراء</p>
              <h3 className="text-[14px] font-black text-[#183149]">{meta.label}</h3>
            </div>
            <span className="grid h-10 w-10 place-items-center rounded-[12px] border border-[#D7E2E9] bg-[#EEF3F6] text-[#315672]">
              <GroupIcon group={group} size={21} />
            </span>
          </div>
        </div>

        <div className="space-y-2">
          {actions.map((action) => {
            const used = usedActions.has(action.id);
            return (
              <button
                key={action.id}
                type="button"
                disabled={used}
                onClick={() => onAction(action)}
                className={
                  'w-full rounded-[16px] border px-3.5 py-3 text-right outline-none ' +
                  (used
                    ? 'border-[#DCE5EA] bg-[#F3F6F8] opacity-60'
                    : 'border-[#D7E2E9] bg-white active:bg-[#F3F6F8] focus-visible:ring-2 focus-visible:ring-[#D9A441]/45')
                }
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
      </section>
    </>
  );
}

export function AnesthesiaRescueGame({ onExit }: { onExit: () => void }) {
  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);
  const [stage, setStage] = useState<Stage>('baseline');
  const [elapsed, setElapsed] = useState(0);
  const [vitals, setVitals] = useState<SimulationVitals>(scenario.baselineVitals);
  const [targetVitals, setTargetVitals] = useState<SimulationVitals>(scenario.baselineVitals);
  const [score, setScore] = useState(0);
  const [usedActions, setUsedActions] = useState<Set<string>>(() => new Set());
  const [activeGroup, setActiveGroup] = useState<ActionGroup | null>(null);
  const [feedback, setFeedback] = useState('راقب المونيتور. الحالة تبدأ مستقرة، والتغيّر راح يظهر بدون سؤال مباشر.');
  const [history, setHistory] = useState<HistoryEntry[]>([]);

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
      setFeedback('تنبيه: الضغط بدأ يهبط. لا يوجد سؤال جاهز؛ اقرأ المونيتور واختَر الإجراء من الشريط السفلي.');
      return;
    }

    if (elapsed >= scenario.severeAtSec && stage === 'crisis') {
      setTargetVitals(scenario.severeVitals);
      setFeedback('الحالة مستمرة بالتدهور. راجع ترتيب قراراتك وصعّد الدعم إذا ما استجابت.');
    }

    if (elapsed >= scenario.estimatedSeconds && stage !== 'resolved' && stage !== 'recovering') {
      setStage('failed');
      setFeedback('انتهى وقت السيناريو قبل استقرار الحالة. افتح الـDebrief حتى تشوف تسلسل قراراتك.');
    }
  }, [elapsed, finished, stage, started]);

  useEffect(() => {
    if (stage !== 'recovering') return;
    if (vitals.sbp >= 96 && vitals.dbp >= 56) {
      setStage('resolved');
      setFeedback('الحالة رجعت مستقرة. راقب الاستجابة ثم افتح الـDebrief لمراجعة تسلسل القرارات.');
    }
  }, [stage, vitals.dbp, vitals.sbp]);

  const canAct = started && !finished && stage !== 'baseline' && stage !== 'resolved' && stage !== 'failed';
  const unstable = vitals.sbp < 90 || vitals.spo2 < 92;

  const status = useMemo(() => {
    if (score >= 80) return { label: 'أداء ممتاز', icon: Trophy };
    if (score >= 55) return { label: 'أداء جيد', icon: ShieldCheck };
    return { label: 'تحتاج جولة ثانية', icon: AlertTriangle };
  }, [score]);

  const reset = () => {
    setStarted(false);
    setFinished(false);
    setStage('baseline');
    setElapsed(0);
    setVitals(scenario.baselineVitals);
    setTargetVitals(scenario.baselineVitals);
    setScore(0);
    setUsedActions(new Set());
    setActiveGroup(null);
    setFeedback('راقب المونيتور. الحالة تبدأ مستقرة، والتغيّر راح يظهر بدون سؤال مباشر.');
    setHistory([]);
  };

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
    setHistory((items) => [
      ...items,
      { time: elapsed, label: action.labelAr, score: earned, feedback: actionFeedback },
    ]);
    setActiveGroup(null);

    if (requirementsSatisfied(nextUsed)) {
      setStage('recovering');
      setTargetVitals(scenario.recoveryVitals);
    }
  };

  if (!started) {
    return (
      <div className="space-y-4">
        <button type="button" onClick={onExit} className="inline-flex min-h-10 items-center gap-1 text-[11px] font-black text-[#526675]">
          <ArrowRight size={16} /> رجوع للألعاب
        </button>

        <section className="overflow-hidden rounded-[24px] border border-[#173A63] bg-[#0B223B] p-4 text-white shadow-[0_16px_38px_rgba(11,34,59,0.18)]">
          <div className="flex items-start gap-3">
            <div className="grid h-14 w-14 shrink-0 place-items-center rounded-[18px] border border-[#D9A441]/35 bg-[#D9A441]/10 text-[#E6BD61]">
              <HeartPulse size={31} />
            </div>
            <div className="min-w-0 flex-1 text-right">
              <p className="text-[9px] font-black tracking-[0.14em] text-[#E6BD61]">LIVE OR SIMULATION</p>
              <h2 className="mt-1.5 text-lg font-black">{scenario.titleAr}</h2>
              <p className="mt-0.5 text-[10px] font-bold text-[#AFC3D6]" dir="ltr">{scenario.titleEn}</p>
              <p className="mt-2 text-[11px] font-semibold leading-5 text-[#D4DEE7]">{scenario.summary}</p>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-3 gap-2 border-t border-white/10 pt-3 text-center">
            <div><div className="text-sm font-black">~{scenario.estimatedSeconds}s</div><div className="text-[9px] font-bold text-[#AFC3D6]">وقت الحالة</div></div>
            <div><div className="text-sm font-black">5</div><div className="text-[9px] font-bold text-[#AFC3D6]">مجموعات أدوات</div></div>
            <div><div className="text-sm font-black">100</div><div className="text-[9px] font-bold text-[#AFC3D6]">نقطة</div></div>
          </div>
        </section>

        <PatientStrip />

        <section className="rounded-[20px] border border-[#DCE5EA] bg-[#F8FAFB] p-4 text-right">
          <div className="flex items-center justify-end gap-2">
            <div>
              <h3 className="text-[13px] font-black text-[#183149]">طريقة اللعب</h3>
              <p className="mt-1 text-[10px] font-semibold leading-5 text-[#5F7280]">المونيتور يتغير مع الوقت. ما راح يطلعلك سؤال يقول شنو المشكلة؛ لازم تلاحظها وتفتح الأدوات المناسبة.</p>
            </div>
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-[12px] border border-[#D7E2E9] bg-white text-[#315672]"><Stethoscope size={21} /></span>
          </div>
        </section>

        <button
          type="button"
          onClick={() => setStarted(true)}
          className="flex min-h-12 w-full items-center justify-center gap-2 rounded-[16px] bg-[#173A63] px-4 text-[12px] font-black text-white shadow-[0_8px_20px_rgba(23,58,99,0.18)] active:bg-[#102D4F]"
        >
          <Play size={18} fill="currentColor" /> ابدأ السيناريو
        </button>
        <p className="text-center text-[9px] font-semibold leading-4 text-[#7A8995]">محاكاة تعليمية فقط. ما تعرض جرعات علاجية ولا تُستخدم لاتخاذ قرار سريري حقيقي.</p>
      </div>
    );
  }

  if (finished) {
    const StatusIcon = status.icon;
    return (
      <div className="space-y-4">
        <section className="rounded-[24px] border border-[#DCE5EA] bg-[linear-gradient(145deg,#FFFFFF,#F3F7FA)] p-5 text-center shadow-[0_12px_30px_rgba(16,45,79,0.08)]">
          <div className="mx-auto grid h-14 w-14 place-items-center rounded-full border border-[#D9A441]/35 bg-[#D9A441]/10 text-[#9A7122]"><StatusIcon size={29} /></div>
          <p className="mt-3 text-[10px] font-black text-[#9A7122]">DEBRIEF</p>
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
          <h3 className="text-[12px] font-black text-[#183149]">أهداف هذا السيناريو</h3>
          <div className="mt-2 space-y-2">
            {scenario.learningObjectives.map((item) => (
              <div key={item} className="flex items-start justify-end gap-2 text-[10px] font-semibold leading-5 text-[#526675]">
                <span className="flex-1 text-right">{item}</span>
                <CheckCircle2 size={15} className="mt-0.5 shrink-0 text-[#2F7A55]" />
              </div>
            ))}
          </div>
        </section>

        <div className="grid grid-cols-2 gap-2">
          <button type="button" onClick={onExit} className="min-h-11 rounded-[14px] border border-[#D7E2E9] bg-white text-[11px] font-black text-[#526675]">رجوع للألعاب</button>
          <button type="button" onClick={reset} className="flex min-h-11 items-center justify-center gap-2 rounded-[14px] bg-[#173A63] text-[11px] font-black text-white"><RotateCcw size={16} /> إعادة الجولة</button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3 pb-3">
      <div className="flex items-center justify-between gap-3">
        <button type="button" onClick={onExit} className="inline-flex min-h-9 items-center gap-1 text-[10px] font-black text-[#526675]"><ArrowRight size={15} /> خروج</button>
        <div className="min-w-0 text-right">
          <p className="truncate text-[12px] font-black text-[#183149]">{scenario.titleAr}</p>
          <p className="mt-0.5 text-[9px] font-bold text-[#7A8995]">Live simulation • Score {score}</p>
        </div>
      </div>

      <PatientStrip />
      <PatientMonitor vitals={vitals} elapsed={elapsed} stage={stage} />

      <section className={'rounded-[16px] border px-3.5 py-3 text-right ' + (unstable ? 'border-[#E8C3BD] bg-[#FFF4F2]' : 'border-[#DCE5EA] bg-[#F8FAFB]')}>
        <div className="flex items-start justify-end gap-2.5">
          <div className="min-w-0 flex-1">
            <div className="text-[10px] font-black text-[#183149]">
              {stage === 'baseline' && 'راقب قبل الحدث'}
              {stage === 'crisis' && 'الحالة غير مستقرة'}
              {stage === 'recovering' && 'استجابة للتدخلات'}
              {stage === 'resolved' && 'الحالة مستقرة'}
              {stage === 'failed' && 'انتهى الوقت'}
            </div>
            <p className="mt-1 text-[10px] font-semibold leading-5 text-[#5F7280]">{feedback}</p>
          </div>
          <span className={'grid h-9 w-9 shrink-0 place-items-center rounded-[11px] ' + (unstable ? 'bg-[#B34A3C]/10 text-[#B34A3C]' : 'bg-[#315672]/10 text-[#315672]')}>
            {unstable ? <AlertTriangle size={19} /> : <HeartPulse size={19} />}
          </span>
        </div>
      </section>

      {(stage === 'resolved' || stage === 'failed') ? (
        <button
          type="button"
          onClick={() => setFinished(true)}
          className="flex min-h-12 w-full items-center justify-center gap-2 rounded-[16px] bg-[#173A63] text-[12px] font-black text-white shadow-[0_8px_20px_rgba(23,58,99,0.16)]"
        >
          <CheckCircle2 size={18} /> إنهاء السيناريو وعرض الـDebrief
        </button>
      ) : null}

      <div className="h-[78px]" aria-hidden="true" />

      <nav className="sticky bottom-[76px] z-30 grid grid-cols-5 gap-1 rounded-[18px] border border-[#D7E2E9] bg-white/95 p-1.5 shadow-[0_10px_28px_rgba(7,23,37,0.14)] backdrop-blur-md" aria-label="أدوات المحاكاة">
        {GROUP_META.map((item) => (
          <button
            key={item.id}
            type="button"
            disabled={!canAct}
            onClick={() => setActiveGroup(item.id)}
            className="flex min-h-[54px] min-w-0 flex-col items-center justify-center gap-1 rounded-[12px] px-1 text-[#315672] outline-none active:bg-[#EEF3F6] disabled:opacity-35"
          >
            <GroupIcon group={item.id} size={19} />
            <span className="truncate text-[9px] font-black">{item.label}</span>
          </button>
        ))}
      </nav>

      {activeGroup ? (
        <ActionSheet
          group={activeGroup}
          usedActions={usedActions}
          onClose={() => setActiveGroup(null)}
          onAction={performAction}
        />
      ) : null}
    </div>
  );
}
