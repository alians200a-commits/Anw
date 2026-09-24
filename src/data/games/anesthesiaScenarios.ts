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
export type ScenarioDifficulty = 'easy' | 'medium' | 'hard';

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
  difficulty: ScenarioDifficulty;
  difficultyAr: string;
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
  clinicalClues: string[];
  resolution: {
    requiredAll: string[];
    requiredAny: string[];
  };
  actions: SimulationAction[];
  learningObjectives: string[];
};

export const EASY_POST_INDUCTION_HYPOTENSION: AnesthesiaScenario = {
  id: 'easy-post-induction-hypotension',
  difficulty: 'easy',
  difficultyAr: 'سهل',
  titleAr: 'هبوط ضغط بعد البدء بالتخدير',
  titleEn: 'Post-induction hypotension',
  summary:
    'حالة تدريبية واضحة: اكتشف هبوط الضغط، قيّم السبب، ثم ادعم الدوران وأعد التقييم.',
  estimatedSeconds: 95,
  patient: {
    age: 46,
    sexAr: 'ذكر',
    weightKg: 78,
    asa: 'II',
    procedureAr: 'استئصال مرارة بالمنظار',
    fastingAr: 'صائم 8 ساعات',
  },
  baselineVitals: { hr: 82, sbp: 124, dbp: 76, spo2: 99, etco2: 36, rr: 14 },
  crisisAtSec: 8,
  crisisVitals: { hr: 98, sbp: 84, dbp: 48, spo2: 99, etco2: 35, rr: 14 },
  severeAtSec: 46,
  severeVitals: { hr: 108, sbp: 70, dbp: 38, spo2: 98, etco2: 34, rr: 13 },
  recoveryVitals: { hr: 86, sbp: 110, dbp: 68, spo2: 99, etco2: 36, rr: 14 },
  clinicalClues: [
    'الأكسجة والتهوية مستقرتان.',
    'المشكلة الأساسية هنا دورانية بعد بدء التخدير.',
    'القرار الأقوى يبدأ بالتقييم ثم معالجة السبب وإعادة القياس.',
  ],
  resolution: {
    requiredAll: ['rapid-assessment', 'iv-check', 'depth-review', 'reassess-bp'],
    requiredAny: ['circulation-support', 'fluid-support'],
  },
  actions: [
    {
      id: 'rapid-assessment',
      group: 'assess',
      labelAr: 'تقييم سريع للصورة كاملة',
      labelEn: 'Rapid assessment',
      detail: 'راجع الضغط، النبض، عمق التخدير، خط الـ IV وأي سبب واضح قابل للتصحيح.',
      score: 16,
      feedback: 'صحيح: لا تعالج رقم الضغط بمعزل عن بقية الصورة.',
      effect: { hr: -2 },
    },
    {
      id: 'iv-check',
      group: 'assess',
      labelAr: 'تأكيد سلامة خط الـ IV',
      labelEn: 'Check IV access',
      detail: 'تأكد أن الخط الوريدي يعمل وأن السوائل أو الأدوية تصل فعلياً.',
      score: 12,
      partialScore: 6,
      requires: ['rapid-assessment'],
      feedback: 'خطوة منطقية ضمن التقييم قبل الاعتماد على أي تدخل وريدي.',
      unorderedFeedback: 'مفيدة، لكن الأفضل ضمن تقييم منظم للصورة كاملة.',
      effect: {},
    },
    {
      id: 'depth-review',
      group: 'assess',
      labelAr: 'مراجعة عمق التخدير',
      labelEn: 'Review anesthetic depth',
      detail: 'راجع إذا كان عمق التخدير أو العامل الاستنشاقي يساهم في هبوط الضغط وعدّل وفق الحالة والبروتوكول.',
      score: 14,
      partialScore: 7,
      requires: ['rapid-assessment'],
      feedback: 'جيد: معالجة السبب أهم من مطاردة الرقم فقط.',
      unorderedFeedback: 'الفكرة مفيدة، لكن تأتي بعد تقييم سريع.',
      effect: { sbp: 5, dbp: 3, hr: -2 },
    },
    {
      id: 'fluid-support',
      group: 'fluids',
      labelAr: 'دعم السوائل إذا كان مناسباً',
      labelEn: 'Fluid support if indicated',
      detail: 'استخدم دعم السوائل إذا كان تقييم الحجم والسياق السريري يدعمان ذلك.',
      score: 16,
      partialScore: 7,
      requires: ['rapid-assessment', 'iv-check'],
      feedback: 'مقبول عندما يكون مبنياً على التقييم، وليس تلقائياً لكل هبوط ضغط.',
      unorderedFeedback: 'السوائل قد تساعد، لكن القرار يجب أن يأتي بعد تقييم السبب وخط الـ IV.',
      effect: { sbp: 12, dbp: 7, hr: -3 },
    },
    {
      id: 'circulation-support',
      group: 'drugs',
      labelAr: 'دعم الدوران حسب السبب والبروتوكول',
      labelEn: 'Protocol-based circulatory support',
      detail: 'إذا بقي الضغط منخفضاً بعد التقييم، استخدم دعم الدوران المناسب وفق سبب الحالة وبروتوكول المكان.',
      score: 22,
      partialScore: 8,
      requires: ['rapid-assessment', 'depth-review'],
      feedback: 'قرار مناسب: الدعم الدوائي يكون مبنياً على السبب ثم يتبعه إعادة تقييم.',
      unorderedFeedback: 'قد يرفع الضغط، لكن إعطاء دعم دوائي قبل فهم السبب يقلل جودة القرار السريري.',
      effect: { sbp: 22, dbp: 13, hr: -5 },
    },
    {
      id: 'reassess-bp',
      group: 'assess',
      labelAr: 'إعادة قياس وتقييم الاستجابة',
      labelEn: 'Reassess response',
      detail: 'أعد تقييم الضغط والنبض وبقية المونيتور بعد التدخل وتأكد أن التحسن مستمر.',
      score: 20,
      partialScore: 8,
      requires: ['rapid-assessment'],
      feedback: 'ممتاز: إعادة التقييم جزء من العلاج، وليست خطوة إضافية اختيارية.',
      unorderedFeedback: 'إعادة التقييم مفيدة، لكن لازم تكون مرتبطة بتدخل أو تقييم سابق.',
      effect: { sbp: 5, dbp: 3, hr: -2 },
    },
  ],
  learningObjectives: [
    'تمييز هبوط الضغط من المونيتور.',
    'البدء بتقييم منظم قبل العلاج.',
    'ربط العمق وخط الـ IV ودعم الدوران بالسبب المحتمل.',
    'إعادة تقييم الاستجابة بعد التدخل.',
  ],
};

export const MEDIUM_AIRWAY_HYPOXEMIA: AnesthesiaScenario = {
  id: 'medium-airway-hypoxemia',
  difficulty: 'medium',
  difficultyAr: 'متوسط',
  titleAr: 'هبوط الأكسجة بعد تأمين مجرى الهواء',
  titleEn: 'Post-airway hypoxemia',
  summary:
    'الأكسجة تبدأ بالهبوط ويضعف EtCO₂. لازم تفرّق بين مشكلة الأكسجين، الدائرة، التهوية وموضع الأنبوب بدل القفز لعلاج واحد.',
  estimatedSeconds: 120,
  patient: {
    age: 39,
    sexAr: 'أنثى',
    weightKg: 67,
    asa: 'II',
    procedureAr: 'عملية بطن اختيارية',
    fastingAr: 'صائمة 8 ساعات',
  },
  baselineVitals: { hr: 86, sbp: 118, dbp: 72, spo2: 99, etco2: 36, rr: 14 },
  crisisAtSec: 10,
  crisisVitals: { hr: 104, sbp: 112, dbp: 70, spo2: 91, etco2: 24, rr: 9 },
  severeAtSec: 42,
  severeVitals: { hr: 122, sbp: 96, dbp: 58, spo2: 82, etco2: 14, rr: 6 },
  recoveryVitals: { hr: 90, sbp: 116, dbp: 70, spo2: 98, etco2: 35, rr: 14 },
  clinicalClues: [
    'هبوط SpO₂ متزامن مع ضعف EtCO₂.',
    'فكّر أولاً في الأكسجين، التهوية، الدائرة ومجرى الهواء.',
    'تأكيد التهوية المستمرة مهم قبل الانتقال لافتراضات أبعد.',
  ],
  resolution: {
    requiredAll: ['global-assessment', 'oxygen-check', 'airway-circuit-check', 'manual-ventilation', 'capno-confirm'],
    requiredAny: ['correct-circuit', 'tube-position-check'],
  },
  actions: [
    {
      id: 'global-assessment',
      group: 'assess',
      labelAr: 'قراءة المونيتور وربط SpO₂ مع EtCO₂',
      labelEn: 'Integrate monitor findings',
      detail: 'اقرأ اتجاه SpO₂ وEtCO₂ والنبض معاً وحدد أن المشكلة تنفسية/مجرى هواء حتى يثبت العكس.',
      score: 12,
      feedback: 'صحيح: ربط المؤشرات يقلل التشخيص المتسرع.',
      effect: {},
    },
    {
      id: 'oxygen-check',
      group: 'airway',
      labelAr: 'تأكيد مصدر الأكسجين ورفع FiO₂ حسب الحاجة',
      labelEn: 'Confirm oxygen delivery',
      detail: 'أكد مصدر الأكسجين وتوصيله واستعمل أكسجيناً مناسباً للأزمة وفق بروتوكول المكان.',
      score: 14,
      partialScore: 6,
      requires: ['global-assessment'],
      feedback: 'خطوة أساسية أثناء نقص الأكسجة: أكد أن الأكسجين يصل فعلياً للمريض.',
      unorderedFeedback: 'صحيحة كاتجاه، لكن الأفضل بالتوازي مع تقييم سريع للمشكلة.',
      effect: { spo2: 3 },
    },
    {
      id: 'airway-circuit-check',
      group: 'airway',
      labelAr: 'فحص مجرى الهواء والدائرة سريعاً',
      labelEn: 'Check airway and circuit',
      detail: 'افحص الوصلات، الدائرة، الأنبوب وأي انسداد أو انفصال واضح.',
      score: 16,
      partialScore: 7,
      requires: ['global-assessment'],
      feedback: 'ممتاز: الأسباب الميكانيكية القابلة للتصحيح لازم تنفحص مبكراً.',
      unorderedFeedback: 'اتجاه جيد، لكن اربطه بقراءة المونيتور والصورة السريرية.',
      effect: { spo2: 3, etco2: 3 },
    },
    {
      id: 'manual-ventilation',
      group: 'ventilator',
      labelAr: 'التحقق من التهوية يدوياً',
      labelEn: 'Assess manual ventilation',
      detail: 'استخدم التهوية اليدوية لتقييم دخول الهواء والمقاومة واستجابة EtCO₂ وفق بروتوكول المكان.',
      score: 18,
      partialScore: 8,
      requires: ['airway-circuit-check'],
      feedback: 'قرار منطقي: التهوية اليدوية تعطيك معلومة مباشرة عن التهوية والمقاومة.',
      unorderedFeedback: 'ممكن تساعد، لكن يفضّل بعد فحص سريع للدائرة والمجرى.',
      effect: { spo2: 5, etco2: 7, rr: 2 },
    },
    {
      id: 'correct-circuit',
      group: 'ventilator',
      labelAr: 'تصحيح أي انفصال أو خلل واضح بالدائرة',
      labelEn: 'Correct circuit fault',
      detail: 'إذا وجدت انفصالاً أو خللاً واضحاً بالدائرة، صححه ثم راقب عودة الموجات.',
      score: 20,
      partialScore: 6,
      requires: ['airway-circuit-check'],
      feedback: 'صحيح: معالجة السبب الميكانيكي تعيد التهوية بدل زيادة إعدادات عشوائية.',
      unorderedFeedback: 'لا تفترض خلل الدائرة قبل فحصها.',
      effect: { spo2: 7, etco2: 10, rr: 3 },
    },
    {
      id: 'tube-position-check',
      group: 'airway',
      labelAr: 'إعادة تأكيد موضع الأنبوب',
      labelEn: 'Reconfirm tube position',
      detail: 'أعد تأكيد الموضع سريرياً وبموجة capnography المستمرة وفق الممارسة الآمنة.',
      score: 20,
      partialScore: 7,
      requires: ['airway-circuit-check'],
      feedback: 'مهم: موجة capnography المستمرة جزء أساسي من تأكيد التهوية بعد وضع الأنبوب.',
      unorderedFeedback: 'اتجاه مهم، لكن الأفضل ضمن فحص منظم للمجرى والدائرة.',
      effect: { spo2: 6, etco2: 8, rr: 2 },
    },
    {
      id: 'capno-confirm',
      group: 'assess',
      labelAr: 'تأكيد عودة موجة EtCO₂ واستقرار SpO₂',
      labelEn: 'Confirm capnography recovery',
      detail: 'بعد التصحيح، راقب عودة موجة EtCO₂ المستمرة وتحسن SpO₂ بدل الاكتفاء بإجراء واحد.',
      score: 20,
      partialScore: 8,
      requires: ['manual-ventilation'],
      feedback: 'ممتاز: النجاح يقاس بعودة التهوية والأكسجة واستمرار الاستقرار.',
      unorderedFeedback: 'المراقبة مهمة، لكن تحتاج تدخل فعلي قبل تقييم الاستجابة.',
      effect: { spo2: 3, etco2: 4, hr: -3 },
    },
  ],
  learningObjectives: [
    'ربط SpO₂ مع capnography بدل الاعتماد على رقم منفرد.',
    'فحص مصدر الأكسجين، المجرى والدائرة مبكراً.',
    'استخدام التهوية اليدوية كمعلومة تشخيصية وعلاجية في الأزمة.',
    'تأكيد استعادة التهوية بموجة EtCO₂ مستمرة.',
  ],
};

export const HARD_BRONCHOSPASM_INSTABILITY: AnesthesiaScenario = {
  id: 'hard-bronchospasm-instability',
  difficulty: 'hard',
  difficultyAr: 'صعب',
  titleAr: 'تدهور تهوية مع عدم استقرار دوراني',
  titleEn: 'Ventilatory deterioration with haemodynamic instability',
  summary:
    'حالة متعددة المشاكل: صعوبة بالتهوية، ارتفاع EtCO₂، هبوط أكسجة ثم ضغط. لازم تستبعد الأسباب الميكانيكية وتتعامل مع التهوية والدوران معاً.',
  estimatedSeconds: 150,
  patient: {
    age: 58,
    sexAr: 'ذكر',
    weightKg: 84,
    asa: 'III',
    procedureAr: 'عملية بطن طارئة',
    fastingAr: 'صيام غير مؤكد',
  },
  baselineVitals: { hr: 92, sbp: 126, dbp: 74, spo2: 98, etco2: 37, rr: 14 },
  crisisAtSec: 10,
  crisisVitals: { hr: 114, sbp: 94, dbp: 56, spo2: 92, etco2: 49, rr: 10 },
  severeAtSec: 38,
  severeVitals: { hr: 132, sbp: 72, dbp: 40, spo2: 84, etco2: 60, rr: 7 },
  recoveryVitals: { hr: 96, sbp: 108, dbp: 66, spo2: 97, etco2: 39, rr: 13 },
  clinicalClues: [
    'EtCO₂ يرتفع مع تدهور الأكسجة وصعوبة التهوية.',
    'لا تفترض bronchospasm قبل استبعاد kink/obstruction/disconnection ومشكلة الأنبوب.',
    'الحالة الصعبة تحتاج إدارة التهوية والدوران بالتوازي مع طلب المساعدة.',
  ],
  resolution: {
    requiredAll: ['hard-call-help', 'hard-assessment', 'hard-airway-circuit', 'hard-manual-vent', 'hard-reassess'],
    requiredAny: ['bronchodilator-support', 'hard-depth-review'],
  },
  actions: [
    {
      id: 'hard-call-help',
      group: 'assess',
      labelAr: 'طلب مساعدة مبكراً وتحديد الأزمة',
      labelEn: 'Call for help early',
      detail: 'صعّد المساعدة مبكراً لأن عندك تدهوراً تنفسياً ودورانياً متزامناً.',
      score: 12,
      feedback: 'صحيح: الحالات متعددة الأنظمة تحتاج فريقاً واستجابة منظمة.',
      effect: {},
    },
    {
      id: 'hard-assessment',
      group: 'assess',
      labelAr: 'تقييم ABC وربط المونيتور بالدائرة',
      labelEn: 'Structured ABC assessment',
      detail: 'اربط airway/breathing/circulation مع الموجات والضغط بدل معالجة كل رقم منفرداً.',
      score: 14,
      feedback: 'ممتاز: هذا يمنع فقدان سبب مهم أثناء الأزمة.',
      effect: {},
    },
    {
      id: 'hard-airway-circuit',
      group: 'airway',
      labelAr: 'استبعاد انسداد أو kink أو خلل بالدائرة/الأنبوب',
      labelEn: 'Exclude mechanical airway causes',
      detail: 'افحص الأنبوب، الانثناء، الإفرازات/الانسداد، الوصلات والدائرة قبل تثبيت تشخيص bronchospasm.',
      score: 16,
      partialScore: 7,
      requires: ['hard-assessment'],
      feedback: 'قرار أساسي: التشخيص السريري يأتي بعد استبعاد الأسباب الميكانيكية السريعة.',
      unorderedFeedback: 'الفحص مهم، لكن اجعله ضمن تقييم ABC منظم.',
      effect: { spo2: 2, etco2: -2 },
    },
    {
      id: 'hard-manual-vent',
      group: 'ventilator',
      labelAr: 'التهوية اليدوية وتقييم المقاومة',
      labelEn: 'Manual ventilation and resistance check',
      detail: 'قيّم سهولة دخول الهواء والمقاومة وراقب capnography واستجابة الأكسجة.',
      score: 16,
      partialScore: 7,
      requires: ['hard-airway-circuit'],
      feedback: 'صحيح: يعطيك معلومة مباشرة عن شدة مشكلة التهوية.',
      unorderedFeedback: 'مفيد، لكن الأفضل بعد استبعاد خلل ميكانيكي واضح.',
      effect: { spo2: 4, etco2: -5, rr: 2 },
    },
    {
      id: 'hard-oxygen',
      group: 'airway',
      labelAr: 'تأمين توصيل الأكسجين أثناء الأزمة',
      labelEn: 'Ensure oxygen delivery',
      detail: 'أكد توصيل الأكسجين واستعمل تركيزاً مناسباً للأزمة وفق بروتوكول المكان.',
      score: 12,
      partialScore: 5,
      requires: ['hard-assessment'],
      feedback: 'خطوة داعمة أساسية أثناء نقص الأكسجة.',
      unorderedFeedback: 'مفيدة، لكن لازم تترافق مع معرفة سبب صعوبة التهوية.',
      effect: { spo2: 4 },
    },
    {
      id: 'hard-depth-review',
      group: 'assess',
      labelAr: 'مراجعة عمق التخدير والمحفزات القابلة للتصحيح',
      labelEn: 'Review anesthetic depth and triggers',
      detail: 'راجع عمق التخدير والعوامل التي قد تزيد التفاعل القصبي وفق الحالة.',
      score: 12,
      partialScore: 5,
      requires: ['hard-assessment'],
      feedback: 'مناسب بعد استبعاد الأسباب الميكانيكية وضمن خطة متعددة المحاور.',
      unorderedFeedback: 'لا تجعل تعديل العمق بديلاً عن تقييم المجرى والدائرة.',
      effect: { hr: -3, sbp: 3, etco2: -3 },
    },
    {
      id: 'bronchodilator-support',
      group: 'drugs',
      labelAr: 'علاج التشنج القصبي وفق البروتوكول',
      labelEn: 'Protocol-based bronchospasm treatment',
      detail: 'إذا دعمت الصورة السريرية bronchospasm بعد استبعاد الأسباب الميكانيكية، استخدم العلاج المناسب وفق بروتوكول المكان.',
      score: 18,
      partialScore: 6,
      requires: ['hard-airway-circuit', 'hard-manual-vent'],
      feedback: 'قرار منطقي بعد بناء التشخيص، وليس قبل استبعاد الأسباب الميكانيكية.',
      unorderedFeedback: 'العلاج قد يكون مناسباً، لكن التشخيص يجب أن يسبقه استبعاد الخلل الميكانيكي.',
      effect: { spo2: 7, etco2: -10, rr: 3, hr: -3 },
    },
    {
      id: 'hard-circulation',
      group: 'drugs',
      labelAr: 'دعم الدوران إذا استمر هبوط الضغط',
      labelEn: 'Support circulation if needed',
      detail: 'إذا بقي الضغط منخفضاً أثناء معالجة السبب التنفسي، ادعم الدوران حسب سبب الحالة وبروتوكول المكان.',
      score: 12,
      partialScore: 5,
      requires: ['hard-assessment'],
      feedback: 'جيد: الحالة الصعبة تحتاج معالجة المشكلة التنفسية والدورانية معاً.',
      unorderedFeedback: 'دعم الضغط وحده ما يعالج سبب صعوبة التهوية.',
      effect: { sbp: 16, dbp: 9, hr: -3 },
    },
    {
      id: 'hard-reassess',
      group: 'assess',
      labelAr: 'إعادة تقييم الموجات والأكسجة والضغط',
      labelEn: 'Reassess all systems',
      detail: 'تأكد من تحسن موجة EtCO₂ وSpO₂ والضغط واستمرار الاستجابة بعد التدخلات.',
      score: 18,
      partialScore: 7,
      requires: ['hard-manual-vent'],
      feedback: 'ممتاز: نهاية الأزمة تكون باستقرار الاتجاهات، مو بتحسن رقم واحد للحظة.',
      unorderedFeedback: 'إعادة التقييم لازم تكون بعد تدخلات فعلية موجهة للسبب.',
      effect: { spo2: 3, etco2: -4, sbp: 5, dbp: 3, hr: -3 },
    },
  ],
  learningObjectives: [
    'إدارة أزمة متعددة الأنظمة بطريقة ABC منظمة.',
    'استبعاد الأسباب الميكانيكية قبل تثبيت تشخيص bronchospasm.',
    'استخدام capnography والأكسجة والمقاومة كصورة واحدة.',
    'دعم الدوران بالتوازي عندما يصبح عدم الاستقرار hemodynamic مهماً.',
    'طلب المساعدة وإعادة التقييم كجزء من إدارة الأزمة.',
  ],
};

export const ANESTHESIA_SCENARIOS: AnesthesiaScenario[] = [
  EASY_POST_INDUCTION_HYPOTENSION,
  MEDIUM_AIRWAY_HYPOXEMIA,
  HARD_BRONCHOSPASM_INSTABILITY,
];

// Backward-compatible alias for any older imports.
export const POST_INDUCTION_HYPOTENSION = EASY_POST_INDUCTION_HYPOTENSION;
