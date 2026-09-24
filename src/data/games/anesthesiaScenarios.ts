export type SimulationVitals = {
  hr: number;
  sbp: number;
  dbp: number;
  spo2: number;
  etco2: number;
  rr: number;
};

export type VitalDelta = Partial<Record<keyof SimulationVitals, number>>;

export type ActionGroup = 'assess' | 'fluids' | 'drugs' | 'airway' | 'ventilator';

export type SimulationAction = {
  id: string;
  group: ActionGroup;
  labelAr: string;
  labelEn?: string;
  detail: string;
  score: number;
  partialScore?: number;
  requires?: string[];
  feedback: string;
  unorderedFeedback?: string;
  effect: VitalDelta;
};

export type AnesthesiaScenario = {
  id: string;
  titleAr: string;
  titleEn: string;
  summary: string;
  estimatedSeconds: number;
  patient: {
    age: number;
    sexAr: string;
    weightKg: number;
    asa: string;
    procedureAr: string;
    fastingAr: string;
  };
  baselineVitals: SimulationVitals;
  crisisAtSec: number;
  crisisVitals: SimulationVitals;
  severeAtSec: number;
  severeVitals: SimulationVitals;
  recoveryVitals: SimulationVitals;
  resolution: {
    requiredAll: string[];
    requiredAny: string[];
  };
  actions: SimulationAction[];
  learningObjectives: string[];
};

export const POST_INDUCTION_HYPOTENSION: AnesthesiaScenario = {
  id: 'post-induction-hypotension',
  titleAr: 'هبوط الضغط بعد البدء بالتخدير',
  titleEn: 'Post-induction hypotension',
  summary:
    'راقب المونيتور، اكتشف التدهور، ثم استخدم أدوات التقييم والدعم بالترتيب المناسب حتى تستقر الحالة.',
  estimatedSeconds: 75,
  patient: {
    age: 54,
    sexAr: 'ذكر',
    weightKg: 82,
    asa: 'II',
    procedureAr: 'استئصال مرارة بالمنظار',
    fastingAr: 'صائم 8 ساعات',
  },
  baselineVitals: {
    hr: 82,
    sbp: 122,
    dbp: 76,
    spo2: 99,
    etco2: 36,
    rr: 14,
  },
  crisisAtSec: 5,
  crisisVitals: {
    hr: 104,
    sbp: 78,
    dbp: 42,
    spo2: 98,
    etco2: 35,
    rr: 14,
  },
  severeAtSec: 28,
  severeVitals: {
    hr: 116,
    sbp: 64,
    dbp: 34,
    spo2: 96,
    etco2: 34,
    rr: 13,
  },
  recoveryVitals: {
    hr: 88,
    sbp: 108,
    dbp: 66,
    spo2: 99,
    etco2: 36,
    rr: 14,
  },
  resolution: {
    requiredAll: ['rapid-assessment', 'depth-review'],
    requiredAny: ['circulation-support', 'fluid-support'],
  },
  actions: [
    {
      id: 'rapid-assessment',
      group: 'assess',
      labelAr: 'تقييم سريع للصورة كاملة',
      labelEn: 'Rapid assessment',
      detail: 'راجع النبض، الضغط، عمق التخدير، خط الـ IV وأي علامة واضحة لسبب هبوط الضغط.',
      score: 20,
      feedback: 'بداية صحيحة: التقييم السريع يحدد اتجاه العلاج بدل الاستجابة لرقم واحد فقط.',
      effect: { hr: -2, sbp: 2, dbp: 1 },
    },
    {
      id: 'depth-review',
      group: 'assess',
      labelAr: 'مراجعة عمق التخدير والعامل الاستنشاقي',
      labelEn: 'Review anesthetic depth',
      detail: 'تحقق إذا كان عمق التخدير أو العامل الاستنشاقي جزءًا من هبوط الضغط، وعدّل حسب الحالة والبروتوكول.',
      score: 15,
      partialScore: 7,
      requires: ['rapid-assessment'],
      feedback: 'ترتيب مناسب: ربط عمق التخدير مع الصورة السريرية يساعد على معالجة السبب بدل إخفاء الرقم.',
      unorderedFeedback: 'الفكرة ممكن تكون مفيدة، لكن الأفضل تجي بعد تقييم سريع للصورة كاملة.',
      effect: { hr: -4, sbp: 7, dbp: 4 },
    },
    {
      id: 'call-for-help',
      group: 'assess',
      labelAr: 'طلب مساعدة إذا استمر عدم الاستقرار',
      labelEn: 'Call for help',
      detail: 'صعّد المساعدة مبكرًا إذا كان الضغط يستمر بالهبوط أو الحالة ما تستجيب للتدخلات الأولية.',
      score: 10,
      partialScore: 5,
      requires: ['rapid-assessment'],
      feedback: 'قرار آمن عند استمرار عدم الاستقرار: طلب المساعدة جزء من إدارة الأزمة.',
      unorderedFeedback: 'طلب المساعدة مقبول، لكن لا يبدّل التقييم السريع والتعامل مع السبب القابل للتصحيح.',
      effect: {},
    },
    {
      id: 'fluid-support',
      group: 'fluids',
      labelAr: 'دعم السوائل إذا كان مناسبًا للحالة',
      labelEn: 'Fluid support if indicated',
      detail: 'تحقق من حالة الحجم وخط الـ IV ثم استخدم دعم السوائل إذا كان مناسبًا وفق بروتوكول المكان.',
      score: 15,
      partialScore: 6,
      requires: ['rapid-assessment'],
      feedback: 'جيد: دعم السوائل يكون مرتبطًا بالتقييم، مو استجابة عشوائية لكل هبوط ضغط.',
      unorderedFeedback: 'السوائل قد تكون مناسبة، لكن القرار لازم يتبع تقييم السبب وحالة الحجم.',
      effect: { sbp: 12, dbp: 7, hr: -4 },
    },
    {
      id: 'circulation-support',
      group: 'drugs',
      labelAr: 'دعم الدوران بدواء مناسب حسب البروتوكول',
      labelEn: 'Protocol-based circulatory support',
      detail: 'بعد تقييم السبب، استخدم دعمًا دوائيًا مناسبًا للدوران حسب بروتوكول المكان ثم أعد القياس.',
      score: 25,
      partialScore: 8,
      requires: ['rapid-assessment'],
      feedback: 'قرار قوي: دعم الدوران بعد تقييم السبب ثم إعادة القياس يعالج المشكلة بشكل منظم.',
      unorderedFeedback: 'قد يرفع الضغط، لكن إعطاء دعم دوائي قبل تقييم السبب يقلل جودة القرار السريري.',
      effect: { hr: -8, sbp: 24, dbp: 14 },
    },
    {
      id: 'airway-check',
      group: 'airway',
      labelAr: 'تأكيد مجرى الهواء والأكسجة',
      labelEn: 'Confirm airway and oxygenation',
      detail: 'أكد أن مجرى الهواء، التهوية والأكسجة مستقرة حتى ما تفوت مشكلة مرافقة أثناء الأزمة.',
      score: 10,
      feedback: 'فحص مفيد: استقرار الأكسجة والتهوية جزء من الصورة الكاملة أثناء عدم الاستقرار.',
      effect: { spo2: 1, etco2: 1 },
    },
    {
      id: 'ventilation-check',
      group: 'ventilator',
      labelAr: 'مراجعة الدائرة والتهوية',
      labelEn: 'Check circuit and ventilation',
      detail: 'راجع الدائرة، EtCO₂ ومؤشرات التهوية بدون تغيير إعدادات عشوائية لا ترتبط بالمشكلة.',
      score: 5,
      feedback: 'تأكيد جيد، لكنه مو التدخل الرئيسي لهبوط الضغط إذا كانت التهوية مستقرة.',
      effect: { etco2: 1 },
    },
  ],
  learningObjectives: [
    'اكتشاف هبوط الضغط من المونيتور بدل انتظار سؤال مباشر.',
    'البدء بتقييم منظم قبل إعطاء تدخلات عشوائية.',
    'ربط دعم الدوران والعمق والـ IV بالصورة السريرية كاملة.',
    'إعادة تقييم الاستجابة بعد كل تدخل.',
  ],
};
