import { ClinicalTerm, QuizQuestion, SimulationStep } from '../types';

export const CLINICAL_TERMS: ClinicalTerm[] = [
  {
    id: 'metabolism',
    en: 'Metabolism',
    ar: 'الأيض / الاستقلاب',
    category: 'pharmacology',
    definition: 'تحويل الأدوية القابلة لذوبان الدهون إلى أدوية قابلة للذوبان في الماء ليسهل إفرازها والتخلص منها عن طريق الكلى.',
    clinicalNote: 'معظم أدوية التخدير تذوب بالدهون لتخترق الحاجز الدموي الدماغي (BBB)، ثم يحولها الكبد إلى ذائبة بالماء لطرحها كلوياً.',
    tags: ['أدوية', 'كلى', 'كبد', 'pharmacokinetics']
  },
  {
    id: 'cbf',
    en: 'Cerebral Blood Flow',
    ar: 'تدفق الدم في الجمجمة',
    abbr: 'CBF',
    category: 'abbreviations',
    definition: 'معدل تدفق الدم وتروية الدماغ داخل تجويف الجمجمة.',
    clinicalNote: 'مهم جداً مراقبته أثناء تخدير جراحات المخ والأعصاب؛ يتأثر مباشرة بضغط ثاني أكسيد الكربون (PaCO2) وغازات التخدير.',
    tags: ['دماغ', 'أعصاب', 'تدفق دمج']
  },
  {
    id: 'icp',
    en: 'Intracranial Pressure',
    ar: 'الضغط داخل الجمجمة',
    abbr: 'ICP',
    category: 'abbreviations',
    definition: 'الضغط الناجم عن الأنسجة الدماغية والسائل الدماغي الشوكي والدم داخل الجمجمة.',
    clinicalNote: 'ارتفاع الـ ICP يهدد بنقص تروية الدماغ أو فتق دماغي. أدوية معينة مثل الكيتامين قد ترفعه بينما البروبوفول يقلله.',
    tags: ['جمجمة', 'ضغط', 'جراحة أعصاب']
  },
  {
    id: 'mh',
    en: 'Malignant Hyperthermia',
    ar: 'ارتفاع الحرارة الخبيث',
    abbr: 'MH',
    category: 'critical',
    definition: 'حالة وراثية طارئة تؤدي لارتفاع الحرارة بشكل غير طبيعي وشديد لأكثر من 40 درجة مئوية مع تقلص عضلي شديد وحماض استقلابي.',
    clinicalNote: 'يحفزه السكولين (Suxamethonium) والغازات الاستنشاقية المهلجنة. العلاج الطارئ الفوري: إيقاف الغاز فوراً، إعطاء أوكسجين 100%، وحقن Dantrolene.',
    tags: ['حرارة', 'طوارئ', 'سكولين', 'وراثة']
  },
  {
    id: 'iv',
    en: 'Intravenous',
    ar: 'حقن وريدي',
    abbr: 'IV',
    category: 'abbreviations',
    definition: 'إعطاء الدواء مباشرة داخل المجرى الوريدي، مما يعطي بدء تأثير فوري 100% توافر حيوي.',
    clinicalNote: 'المسار الأكثر شيوعاً وحرجاً في صالة العمليات لإعطاء أدوية التنويم والمرخيات والمسكنات.',
    tags: ['وريد', 'مسار إعطاء']
  },
  {
    id: 'im',
    en: 'Intramuscular',
    ar: 'حقن عضلي',
    abbr: 'IM',
    category: 'abbreviations',
    definition: 'إعطاء الدواء بحقنه في النسيج العضلي لامتصاص أبطأ وأطول أمداً مقارنة بالوريدي.',
    clinicalNote: 'يستخدم أحياناً قبل الجراحة (Premedication) أو عند صعوبة الحصول على وريد مثل الأطفال (مثل الكيتامين عضلياً).',
    tags: ['عضل', 'مسار إعطاء']
  },
  {
    id: 'oral',
    en: 'Oral',
    ar: 'فموي',
    category: 'abbreviations',
    definition: 'تناول الدواء عن طريق الفم عبر الجهاز الهضمي.',
    clinicalNote: 'يتطلب مراعاة فترة الصيام (NPO Guideline) للمريض قبل الجراحة لمنع الاستنشاق الرئوي (Aspiration).',
    tags: ['فم', 'معدة', 'صيام']
  },
  {
    id: 'decrease',
    en: 'Decrease',
    ar: 'يقلل / انخفاض',
    category: 'cardio',
    definition: 'تناقص أو هبوط في القيمة الفسيولوجية (مثل الضغط، النبض، معدل التنفس).',
    clinicalNote: 'مثال: معظم أدوية التخدير تسوي Decrease للضغط ونبض القلب والتهوية التلقائية.',
    tags: ['تأثير', 'فسيولوجي']
  },
  {
    id: 'increase',
    en: 'Increase',
    ar: 'يزيد / ارتفاع',
    category: 'cardio',
    definition: 'تزايد أو ارتفاع في المعايير الحيوية.',
    clinicalNote: 'مثال: الإتروبين والتحفيز الجراحي يسوي Increase للـ HR، ونقص التسكين يرفع الضغط.',
    tags: ['تأثير', 'فسيولوجي']
  },
  {
    id: 'hr',
    en: 'Heart Rate',
    ar: 'معدل ضربات القلب',
    abbr: 'HR',
    category: 'cardio',
    definition: 'عدد نبضات القلب في الدقيقة الواحدة (المعدل الطبيعي للبالغين 60 - 100 نبضة/دقيقة).',
    clinicalNote: 'يراقب بشكل مستمر طوال التخدير عبر الـ ECG والـ Pulse Oximeter لكشف أي اضطراب فوري.',
    tags: ['قلب', 'نبض', 'مراقبة']
  },
  {
    id: 'mac',
    en: 'Minimum Alveolar Concentration',
    ar: 'التركيز السنخي الأصغري',
    abbr: 'MAC',
    category: 'pharmacology',
    definition: 'أقل تركيز غاز متبخر بالحويصلات الهوائية (الرئة) يمنع بنسبة 50% الاستجابة الحركية للألم والعوامل الخارجية أثناء الجراحة. ونستخدمه لقياس فعالية وقوة الغازات التخديرية.',
    clinicalNote: 'كلما قل رقم الـ MAC زادت قوة وفعالية الغاز (علاقة عكسية). الـ MAC يتأثر بالعمر والحرارة والأدوية المرافقة.',
    tags: ['غازات', 'رئة', 'فعالية']
  },
  {
    id: 'hypnotic',
    en: 'Hypnotic',
    ar: 'منوم',
    category: 'pharmacology',
    definition: 'دواء يحث على النوم ويدخل المريض في حالة فقدان الوعي التام للأغراض الجراحية.',
    clinicalNote: 'أشهر المنومات التخديرية: البروبوفول (Propofol) والثيوبنتال (Thiopental) والإيتوميدات (Etomidate).',
    tags: ['نوم', 'تنويم', 'وعي']
  },
  {
    id: 'sedative',
    en: 'Sedative',
    ar: 'مهدئ',
    category: 'pharmacology',
    definition: 'دواء يقلل من التوتر والقلق والهياج دون إحداث نوم عميق بمفرده (مثل البنزوديازيبينات).',
    clinicalNote: 'يُعطى غالباً كتهدئة للمريض في صالة العمليات مع بقاء المنعكسات الحيوية فعالة (مثل Midazolam).',
    tags: ['تهدئة', 'قلق']
  },
  {
    id: 'lipid-solubility',
    en: 'Lipid Solubility',
    ar: 'الذوبان في الدهون',
    category: 'pharmacology',
    definition: 'قدرة الدواء على الانحلال والذوبان في الأنسجة الدهنية والأغشية الخلوية.',
    clinicalNote: 'الأدوية ذات الـ Lipid solubility العالية تبدأ مفعولها بشكل سريع جداً لأنها تعبر الدماغ بسرعة، ولكن قد يتراكم تأثيرها في النسيج الدهني.',
    tags: ['دهون', 'امتصاص']
  },
  {
    id: 'anticonvulsant',
    en: 'Anticonvulsant',
    ar: 'مضاد للتشنج أو للصرع',
    category: 'pharmacology',
    definition: 'دواء يمنع أو يوقف النوبات التشنجية العصبية والصرع ويعيد استقرار الإشارات الكهربائية بالدماغ.',
    clinicalNote: 'أدوية مثل الثيوبنتال والديازيبام والبروبوفول تمتلك خواصاً مضادة للتشنجات وتستخدم أحياناً للسيطرة على نوبات الصرع.',
    tags: ['صرع', 'تشنج', 'أعصاب']
  },
  {
    id: 'antiemetic',
    en: 'Antiemetic',
    ar: 'مضاد تقيؤ',
    category: 'pharmacology',
    definition: 'دواء يمنع أو يعالج الغثيان والتقيؤ بعد الجراحة (PONV).',
    clinicalNote: 'من الضروريات لمنع القيء واستنشاقه أثناء الإفاقة؛ مثل Ondansetron (Zofran) و Dexamethasone.',
    tags: ['تقيؤ', 'غثيان', 'معدة']
  },
  {
    id: 'lacrimation',
    en: 'Lacrimation',
    ar: 'تدميع / سيلان الدموع',
    category: 'surgical',
    definition: 'إفراز وسيلان الدموع من العينين.',
    clinicalNote: 'قد يشير سيلان الدموع أثناء التخدير العام إلى نقص عمق التخدير (Light Anesthesia) وتنبيه الجهاز العصبي المستقل نتيجة الألم.',
    tags: ['عين', 'دموع', 'عمق التخدير']
  },
  {
    id: 'salivation',
    en: 'Salivation',
    ar: 'سيلان اللعاب',
    category: 'surgical',
    definition: 'فرط إفراز اللعاب في تجويف الفم والبلعوم.',
    clinicalNote: 'الكيتامين قد يحفز اللعاب بشدة، لذلك يُعطى معه أحياناً الأتروبين أو الجليكوبيرولات لتجفيف الإفرازات وحماية المجرى الهوائي.',
    tags: ['لعاب', 'فم', 'إفرازات']
  },
  {
    id: 'analgesia',
    en: 'Analgesia',
    ar: 'تسكين الألم',
    category: 'pharmacology',
    definition: 'تثبيط أو غياب الإحساس بالألم مع الحفاظ على بقية الحواس أو كجزء من أركان التخدير العام.',
    clinicalNote: 'أشهر المسكنات الأفيونية: الفنتانيل (Fentanyl) والمورفين والميربيدين، وتمنع الاستجابة الودية لشق الجراحة.',
    tags: ['ألم', 'مسكن', 'أفيونات']
  },
  {
    id: 'recovery-emergence',
    en: 'Recovery / Emergence',
    ar: 'الإفاقة / استعادة الوعي',
    category: 'surgical',
    definition: 'مرحلة خروج المريض من تأثير أدوية التخدير واستعادة الوعي والمنعكسات الحيوية والتنفس التلقائي.',
    clinicalNote: 'مرحلة حرجة جداً؛ يجب التأكد من استعادة قوة العضلات وعكس المرخيات واستقرار العلامات الحيوية قبل نزع الأنبوب (Extubation).',
    tags: ['إفاقة', 'عمليات', 'وعي']
  },
  {
    id: 'hallucination',
    en: 'Hallucination',
    ar: 'هلوسة / يهلوس',
    category: 'surgical',
    definition: 'إدراك حسي خاطئ (بصري أو سمعي) لأشياء غير موجودة في الواقع.',
    clinicalNote: 'شائع الحدوث في مرحلة الإفاقة بعد استخدام الكيتامين (Emergence Delirium)، ويُقلل بإعطاء مهدئات مثل Midazolam.',
    tags: ['هلوسة', 'كيتامين', 'إفاقة']
  },
  {
    id: 'apnea',
    en: 'Apnea',
    ar: 'انقطاع النفس',
    category: 'critical',
    definition: 'توقف مؤقت أو دائم لعملية التنفس التلقائي وتدفق الهواء.',
    clinicalNote: 'يحدث بشكل متعمد عند إعطاء المرخيات العضلية والجرعات الحثية، ولكن انقطاعه غير المتوقع بعد العملية يُعد حالة طارئة (مثل Suxamethonium Apnea).',
    tags: ['تنفس', 'رئة', 'طوارئ']
  },
  {
    id: 'amnesia',
    en: 'Amnesia',
    ar: 'فقدان الذاكرة / النسيان',
    category: 'pharmacology',
    definition: 'غياب تذكر الأحداث خلال فترة التخدير أو العملية (فقدان الذاكرة التقدمي Anterograde Amnesia).',
    clinicalNote: 'البنزوديازيبينات (مثل الميدازولام) تسبب نسياناً ممتازاً يمنع تذكر المريض لصدمة صالة العمليات.',
    tags: ['ذاكرة', 'نسيان', 'وعي']
  },
  {
    id: 'dose',
    en: 'Dose',
    ar: 'جرعة الدواء',
    category: 'pharmacology',
    definition: 'الكمية المحددة والمحسوبة من الدواء المراد إعطاؤها للمريض (غالباً تحسب بالملغ أو مكغ لكل كغم).',
    clinicalNote: 'حساب الجرعة الدقيقة أمر أساسي لتقني التخدير لتجنب نقص التخدير أو التسمم الدوائي وتثبيط القلب.',
    tags: ['جرعة', 'حساب']
  },
  {
    id: 'surgery-operation',
    en: 'Surgery / Operation',
    ar: 'عملية جراحية',
    category: 'surgical',
    definition: 'إجراء طبي تداخلي يتم في صالة العمليات لعلاج أو تشخيص أو استئصال نسيج مريض تحت التخدير.',
    clinicalNote: 'دور تقني التخدير حماية حياة المريض واستقراره الفسيولوجي أثناء الشق والتدخل الجراحي.',
    tags: ['جراحة', 'عملية']
  },
  {
    id: 'hypertension',
    en: 'Hypertension',
    ar: 'ارتفاع ضغط الدم',
    category: 'cardio',
    definition: 'ارتفاع ضغط الدم الشرياني فوق المعدلات الطبيعية (> 140/90 mmHg).',
    clinicalNote: 'أسبابه في العمليات: ألم، نقص عمق التخدير، امتلاء المثانة، أو ارتفاع CO2. علاجه بتعميق التخدير والمسكنات أو خافضات الضغط.',
    tags: ['ضغط', 'قلب', 'دورة دموية']
  },
  {
    id: 'hypotension',
    en: 'Hypotension',
    ar: 'انخفاض ضغط الدم',
    category: 'cardio',
    definition: 'هبوط ضغط الدم الشرياني تحت المستويات الكافية لتروية الأعضاء (< 90/60 mmHg أو هبوط > 20%).',
    clinicalNote: 'من أشيع تأثيرات التخدير (توسع الأوعية وتثبيط عضلة القلب). يُعالج بإعطاء سوائل وريدية أو رافعات ضغط كالإفيدرين والنورأدرينالين.',
    tags: ['ضغط', 'هبوط', 'سوائل']
  },
  {
    id: 'cardia',
    en: 'Cardia',
    ar: 'القلب / قلبي',
    category: 'cardio',
    definition: 'مصطلح يرمز لعضلة القلب أو الجزء الفؤادي المرتبط بالجهاز القلبي الوعائي.',
    clinicalNote: 'الجهاز المحوري الذي تدور حوله كل حسابات الحركية الدموية في التخدير.',
    tags: ['قلب', 'تشريح']
  },
  {
    id: 'tachycardia',
    en: 'Tachycardia',
    ar: 'تزايد دقات القلب',
    category: 'cardio',
    definition: 'ارتفاع معدل ضربات القلب لأكثر من 100 نبضة في الدقيقة عند البالغين.',
    clinicalNote: 'قد تكون علامة على الألم الخفيف، نقص السوائل (Hypovolemia)، نقص الأكسجة، أو أولى علامات ارتفاع الحرارة الخبيث (MH).',
    tags: ['قلب', 'نبض سريع']
  },
  {
    id: 'bradycardia',
    en: 'Bradycardia',
    ar: 'تباطؤ دقات القلب',
    category: 'cardio',
    definition: 'انخفاض معدل ضربات القلب لأقل من 60 نبضة في الدقيقة.',
    clinicalNote: 'تسببه أدوية مثل النيوستغمين، الفنتانيل، أو الجرعة الثانية من السكولين خصوصاً عند الأطفال. يُعالج بالأتروبين.',
    tags: ['قلب', 'نبض بطيء']
  },
  {
    id: 'arrhythmia',
    en: 'Arrhythmia',
    ar: 'عدم انتظام دقات القلب',
    category: 'cardio',
    definition: 'اختلال واضطراب في النظم الكهربائي الطبيعي لانقباض القلب (خوارج انقباض، تسرع فوق بطيني، وغيرها).',
    clinicalNote: 'قد ينتج عن نقص الأكسجة، اضطراب الشوارد (بوتاسيوم)، أو حساسية عضلة القلب لغازات التخدير مع الأدرينالين.',
    tags: ['تخطيط', 'نظم', 'اضطراب']
  },
  {
    id: 'cardiac-arrest',
    en: 'Cardiac Arrest',
    ar: 'توقف القلب',
    category: 'critical',
    definition: 'التوقف المفاجئ والكامل للنشاط الميكانيكي الفعال لضخ الدم من القلب.',
    clinicalNote: 'حالة الطوارئ القصوى في صالة العمليات: إيقاف كل غازات التخدير فوراً، البدء بالإنعاش القلبي الرئوي CPR، إعطاء أوكسجين 100%، وحقن الأدرينالين واستخدام مزيل الرجفان.',
    tags: ['إنعاش', 'CPR', 'طوارئ قصوى']
  },
  {
    id: 'anaphylactic-shock',
    en: 'Anaphylactic Shock',
    ar: 'صدمة تحسسية حادة',
    category: 'critical',
    definition: 'تفاعل تحسسي مناعي مفرط وفوري يهدد الحياة، يسبب تضيقاً شديداً بالقصبات، هبوطاً حاداً بالضغط، ووذمة وعائية.',
    clinicalNote: 'في التخدير قد يسببه: المضادات الحيوية، المرخيات العضلية (خاصة السكولين)، أو اللاتكس. العلاج الفوري الأول هو الأدرينالين (Adrenaline).',
    tags: ['حساسية', 'صدمة', 'أدرينالين']
  },
  {
    id: 'mi',
    en: 'Muscle / Myocardial Infarction',
    ar: 'احتشاء العضلة / احتشاء عضلة القلب',
    abbr: 'MI',
    category: 'critical',
    definition: 'موت أو نخر في خلايا النسيج العضلي نتيجة انقطاع مفاجئ وكامل للتروية الدموية والأكسجين (مثل الجلطة القلبية).',
    clinicalNote: 'في التخدير، يجب الحفاظ على توازن عرض وطلب الأكسجين لعضلة القلب لمنع حدوث الـ Perioperative MI.',
    tags: ['جلطة', 'احتشاء', 'قلب']
  },
  {
    id: "5-ht",
    en: "5-Hydroxytryptamine (Serotonin)",
    ar: "5-هيدروكسي تريبتامين (السيروتونين)",
    abbr: "5-HT",
    category: "pharmacology",
    definition: "ناقل عصبي أحادي الأمين يُعرف بالسيروتونين، وله أدوار في الجهاز العصبي والجهاز الهضمي وتنظيم الغثيان والتقيؤ.",
    clinicalNote: "في التخدير، مستقبلات 5-HT3 مهمة في الغثيان والقيء بعد العمليات؛ أدوية مثل Ondansetron تعمل كمضادات لمستقبل 5-HT3.",
    tags: ["serotonin","5-HT3","PONV","سيروتونين"]
  },
  {
    id: "increase-symbol",
    en: "Increase / Facilitation / Stimulation",
    ar: "زيادة / تسهيل / تحفيز",
    abbr: "↑ / ++",
    category: "abbreviations",
    definition: "رموز تُستخدم في الجداول والملاحظات للدلالة على زيادة متغير أو تعزيز تأثير أو تحفيز وظيفة.",
    clinicalNote: "هذه ليست اختصارات طبية معيارية مستقلة؛ معناها النهائي يعتمد على السياق والمتغير المكتوب بجانبها.",
    tags: ["symbol","increase","زيادة"]
  },
  {
    id: "decrease-symbol",
    en: "Decrease / Depression / Inhibition",
    ar: "انخفاض / تثبيط / كبح",
    abbr: "↓ / --",
    category: "abbreviations",
    definition: "رموز تُستخدم للدلالة على انخفاض متغير أو تثبيط تأثير أو كبح وظيفة.",
    clinicalNote: "هذه رموز سياقية وليست اختصارات معيارية مستقلة؛ يجب تفسيرها مع المتغير أو الدواء المرتبط بها.",
    tags: ["symbol","decrease","انخفاض"]
  },
  {
    id: "delta-pyramidal",
    en: "Pyramidal Tract (source-specific symbol)",
    ar: "السبيل الهرمي – حسب رمز المصدر",
    abbr: "Δ",
    category: "abbreviations",
    definition: "السبيل الهرمي يشير إلى المسارات الحركية النازلة، وخصوصًا القشري الشوكي والقشري البصلي، المسؤولة عن التحكم الحركي الإرادي.",
    clinicalNote: "تنبيه: الرمز Δ ليس اختصارًا طبيًا عالميًا معتمدًا للسبيل الهرمي؛ يُفهم بهذه الدلالة فقط إذا عرّفه المرجع أو الجدول صراحة.",
    tags: ["pyramidal tract","motor","رمز"]
  },
  {
    id: "abp",
    en: "Arterial Blood Pressure",
    ar: "ضغط الدم الشرياني",
    abbr: "ABP",
    category: "cardio",
    definition: "الضغط الذي يولده الدم داخل الشرايين، ويُعبّر عنه عادة بالضغط الانقباضي والانبساطي ويمكن قياسه غازيًا أو غير غازي.",
    clinicalNote: "في التخدير تُراقب قيم الضغط بصورة مستمرة أو دورية للحفاظ على تروية الأعضاء وتقييم الاستجابة للأدوية والسوائل.",
    tags: ["blood pressure","arterial","ضغط"]
  },
  {
    id: "ach",
    en: "Acetylcholine",
    ar: "أستيل كولين",
    abbr: "ACh",
    category: "pharmacology",
    definition: "ناقل عصبي يعمل في الوصلة العصبية العضلية وفي الجهاز العصبي الذاتي المركزي والمحيطي.",
    clinicalNote: "له أهمية مباشرة في التخدير لأن الانتقال العصبي العضلي يعتمد على مستقبلات الأستيل كولين النيكوتينية، كما تؤثر المسارات الكولينية في القلب والإفرازات.",
    tags: ["acetylcholine","NMJ","كوليني"]
  },
  {
    id: "bbb",
    en: "Blood–Brain Barrier",
    ar: "الحاجز الدموي الدماغي",
    abbr: "BBB",
    category: "pharmacology",
    definition: "حاجز انتقائي في الأوعية الدقيقة الدماغية يحدّ وينظم انتقال المواد بين الدم والأنسجة العصبية.",
    clinicalNote: "نفاذ الأدوية عبر BBB يتأثر بخصائص منها الذوبان الدهني والحجم الجزيئي ووجود نواقل متخصصة؛ لذلك يؤثر في بدء وتأثير كثير من أدوية التخدير المركزية.",
    tags: ["brain","barrier","CNS","دماغ"]
  },
  {
    id: "beta-blockers",
    en: "Beta-Adrenergic Blockers",
    ar: "حاصرات مستقبلات بيتا الأدرينرجية",
    abbr: "βB",
    category: "cardio",
    definition: "أدوية تثبط مستقبلات بيتا الأدرينرجية بدرجات متفاوتة من الانتقائية، فتقلل تأثير التنبيه الودي على القلب وأعضاء أخرى.",
    clinicalNote: "الرمز βB مختصر تعليمي وغير موحد عالميًا؛ يُفضّل كتابة Beta-blocker أو اسم الدواء في الاستخدام السريري لتجنب الالتباس.",
    tags: ["beta blocker","adrenergic","قلب"]
  },
  {
    id: "bp",
    en: "Blood Pressure",
    ar: "ضغط الدم",
    abbr: "BP",
    category: "cardio",
    definition: "القوة التي يطبقها الدم على جدار الأوعية الدموية، ويُقصد بها سريريًا غالبًا الضغط الشرياني الانقباضي والانبساطي.",
    clinicalNote: "يُعد BP من أهم العلامات الحيوية أثناء التخدير ويُفسر مع MAP والسياق السريري وليس كرقم منفرد.",
    tags: ["blood pressure","ضغط","vital signs"]
  },
  {
    id: "bv-source",
    en: "Blood Vessels (as used in this source)",
    ar: "الأوعية الدموية – حسب المصدر",
    abbr: "BV",
    category: "abbreviations",
    definition: "الأوعية الدموية هي الشرايين والأوردة والشعيرات التي تنقل الدم ضمن الدورة الدموية.",
    clinicalNote: "تنبيه اصطلاحي: BV اختصار شديد الالتباس وقد يُستخدم لمعانٍ أخرى مثل Blood Volume؛ لا يُنصح اعتباره اختصارًا سريريًا ثابتًا لـ Blood Vessels دون سياق.",
    tags: ["blood vessels","ambiguous","أوعية"]
  },
  {
    id: "cic",
    en: "Cardioinhibitory Center",
    ar: "المركز المثبط للقلب",
    abbr: "CIC",
    category: "cardio",
    definition: "مفهوم فسيولوجي يشير إلى دوائر في جذع الدماغ تسهم في زيادة النشاط نظير الودي عبر العصب المبهم، ما قد يؤدي إلى خفض معدل القلب.",
    clinicalNote: "CIC ليس اختصارًا موحدًا في جميع المراجع الحديثة؛ يُستخدم غالبًا في الشرح الفسيولوجي أكثر من التوثيق السريري اليومي.",
    tags: ["vagus","heart rate","brainstem"]
  },
  {
    id: "cns",
    en: "Central Nervous System",
    ar: "الجهاز العصبي المركزي",
    abbr: "CNS",
    category: "abbreviations",
    definition: "يتكون من الدماغ والحبل الشوكي، وهو المسؤول عن دمج ومعالجة الإشارات العصبية والتحكم بوظائف الجسم.",
    clinicalNote: "كثير من أدوية التخدير تعمل أساسًا على CNS لتعديل الوعي والذاكرة والاستجابة للألم والمنعكسات.",
    tags: ["brain","spinal cord","عصبي"]
  },
  {
    id: "cop-source",
    en: "Cardiac Output",
    ar: "النتاج القلبي",
    abbr: "COP",
    category: "cardio",
    definition: "حجم الدم الذي يضخه البطين في الدقيقة، ويُحسب تقريبًا من حاصل ضرب معدل القلب HR في حجم الضربة SV.",
    clinicalNote: "تنبيه: الاختصار القياسي الشائع للنتاج القلبي هو CO، أما COP فيظهر في بعض المذكرات التعليمية لكنه غير مفضل لأنه غير قياسي وقد يسبب التباسًا.",
    tags: ["cardiac output","CO","hemodynamics"]
  },
  {
    id: "ctz",
    en: "Chemoreceptor Trigger Zone",
    ar: "منطقة التحفيز الكيميائي للمستقبلات",
    abbr: "CTZ",
    category: "pharmacology",
    definition: "منطقة مرتبطة بالـ area postrema قرب أرضية البطين الرابع تستشعر مواد مقيئة في الدم والسائل الدماغي الشوكي وتشارك في تحفيز القيء.",
    clinicalNote: "التسمية العلمية الصحيحة هي Chemoreceptor Trigger Zone، وليس Chemical Trigger Zone. وهي هدف مهم لعدد من مضادات القيء.",
    tags: ["vomiting","area postrema","PONV"]
  },
  {
    id: "cvs",
    en: "Cardiovascular System",
    ar: "الجهاز القلبي الوعائي",
    abbr: "CVS",
    category: "cardio",
    definition: "منظومة القلب والأوعية الدموية التي تؤمن دوران الدم ونقل الأكسجين والمواد الغذائية والتخلص من نواتج الاستقلاب.",
    clinicalNote: "في سياق التخدير يُستخدم CVS لوصف الحالة القلبية الوعائية، لكن الاختصار قد يحمل معاني أخرى في تخصصات مختلفة؛ السياق ضروري.",
    tags: ["cardiovascular","heart","circulation"]
  },
  {
    id: "ect",
    en: "Electroconvulsive Therapy",
    ar: "العلاج بالصدمات الكهربائية",
    abbr: "ECT",
    category: "surgical",
    definition: "إجراء علاجي نفسي يُحدث نوبة اختلاجية علاجية مضبوطة بواسطة تحفيز كهربائي تحت التخدير العام القصير مع ارتخاء عضلي.",
    clinicalNote: "للتخدير دور أساسي في ECT لتوفير فقدان الوعي وتقليل الاستجابة الحركية مع المحافظة على سلامة التهوية والدورة الدموية.",
    tags: ["ECT","psychiatry","anesthesia"]
  },
  {
    id: "eeg",
    en: "Electroencephalogram / Electroencephalography",
    ar: "تخطيط كهربائية الدماغ",
    abbr: "EEG",
    category: "abbreviations",
    definition: "تسجيل النشاط الكهربائي الدماغي بواسطة أقطاب على فروة الرأس.",
    clinicalNote: "يمكن استخدام مؤشرات مشتقة من EEG في بعض أجهزة مراقبة عمق التخدير، كما يُستخدم EEG أساسًا في تقييم الاختلاجات ووظيفة الدماغ.",
    tags: ["EEG","brain","monitoring"]
  },
  {
    id: "fb",
    en: "Foreign Body",
    ar: "جسم غريب",
    abbr: "FB",
    category: "surgical",
    definition: "مادة أو جسم موجود داخل الجسم أو مجرى الهواء في موضع غير طبيعي ولا ينتمي تشريحيًا لذلك الموضع.",
    clinicalNote: "في التخدير والطوارئ قد يكون الجسم الغريب في مجرى الهواء سببًا لانسداد جزئي أو كامل ويتطلب تقييمًا سريعًا للمجرى الهوائي.",
    tags: ["foreign body","airway","جسم غريب"]
  },
  {
    id: "gfr",
    en: "Glomerular Filtration Rate",
    ar: "معدل الترشيح الكبيبي",
    abbr: "GFR",
    category: "abbreviations",
    definition: "معدل ترشح البلازما من الشعيرات الكبيبية إلى محفظة بومان خلال وحدة الزمن، ويُعد مؤشرًا رئيسيًا لوظيفة الكلى.",
    clinicalNote: "انخفاض GFR قد يغير التخلص من الأدوية أو مستقلباتها المطروحة كلويًا، لذلك يؤثر في اختيار الجرعات والفواصل لبعض الأدوية.",
    tags: ["kidney","renal","GFR"]
  },
  {
    id: "git",
    en: "Gastrointestinal Tract",
    ar: "السبيل المعدي المعوي / الجهاز الهضمي",
    abbr: "GIT",
    category: "abbreviations",
    definition: "القناة الهضمية من الفم إلى الشرج مع الأعضاء المرتبطة بوظائف الهضم والامتصاص.",
    clinicalNote: "في التخدير يرتبط GIT بالصيام قبل العملية، خطر الاستنشاق الرئوي، الغثيان والقيء، وحركة المعدة.",
    tags: ["GI","gastrointestinal","هضمي"]
  },
  {
    id: "gm",
    en: "Gram",
    ar: "غرام",
    abbr: "gm",
    category: "abbreviations",
    definition: "وحدة كتلة متريّة تساوي 1000 ميليغرام.",
    clinicalNote: "الرمز القياسي وفق SI هو g وليس gm؛ الأفضل استخدام g في التوثيق العلمي والدوائي.",
    tags: ["unit","gram","SI"]
  },
  {
    id: "hf",
    en: "Heart Failure",
    ar: "قصور القلب",
    abbr: "HF",
    category: "cardio",
    definition: "متلازمة سريرية يعجز فيها القلب عن توفير نتاج قلبي كافٍ لاحتياجات الجسم أو لا يفعل ذلك إلا بارتفاع ضغوط الامتلاء.",
    clinicalNote: "وجود HF يؤثر في تقييم الخطورة التخديرية واختيار السوائل والأدوية ومراقبة الديناميكا الدموية.",
    tags: ["heart failure","cardiac","قصور القلب"]
  },
  {
    id: "hour",
    en: "Hour",
    ar: "ساعة",
    abbr: "hr",
    category: "abbreviations",
    definition: "وحدة زمن تساوي 60 دقيقة.",
    clinicalNote: "في الكتابة العلمية رمز SI المقبول للساعة هو h؛ hr شائع لكنه أقل معيارية.",
    tags: ["time","hour","unit"]
  },
  {
    id: "htn",
    en: "Hypertension",
    ar: "ارتفاع ضغط الدم",
    abbr: "Htn",
    category: "cardio",
    definition: "ارتفاع مزمن أو متكرر في ضغط الدم الشرياني فوق الحدود التشخيصية المعتمدة سريريًا.",
    clinicalNote: "الاختصار الشائع سريريًا هو HTN. ضبط الضغط قبل وأثناء التخدير مهم لتقليل اختلال التروية القلبية والدماغية والكلوية.",
    tags: ["hypertension","HTN","ضغط"]
  },
  {
    id: "ihd",
    en: "Ischemic Heart Disease",
    ar: "مرض القلب الإقفاري",
    abbr: "IHD",
    category: "cardio",
    definition: "مرض ينجم عن عدم كفاية تروية عضلة القلب بالأكسجين، وغالبًا يكون بسبب مرض الشرايين التاجية.",
    clinicalNote: "في التخدير يجب تجنب عدم التوازن بين عرض الأكسجين القلبي وطلبه، مع مراقبة الضغط والنبض وعلامات نقص التروية.",
    tags: ["ischemia","coronary","قلب"]
  },
  {
    id: "iop",
    en: "Intraocular Pressure",
    ar: "ضغط العين الداخلي",
    abbr: "IOP",
    category: "abbreviations",
    definition: "الضغط داخل مقلة العين الناتج عن توازن إنتاج وتصريف الخلط المائي وعوامل أخرى.",
    clinicalNote: "قد تتأثر IOP بوضعية المريض والتهوية وبعض الأدوية والتقنيات التخديرية، ولذلك تهم خصوصًا في جراحات العين والحالات ذات الخطورة العينية.",
    tags: ["eye","IOP","عين"]
  },
  {
    id: "kg",
    en: "Kilogram",
    ar: "كيلوغرام",
    abbr: "kg",
    category: "abbreviations",
    definition: "وحدة الكتلة الأساسية في النظام الدولي SI وتساوي 1000 غرام.",
    clinicalNote: "تُستخدم kg بكثرة في حساب الجرعات الوزنية مثل mg/kg أو mcg/kg.",
    tags: ["unit","kilogram","dose"]
  },
  {
    id: "la",
    en: "Local Anesthetic",
    ar: "مخدر موضعي",
    abbr: "LA",
    category: "pharmacology",
    definition: "دواء يحجب التوصيل العصبي بصورة عكوسة عبر تثبيط قنوات الصوديوم المعتمدة على الجهد، فيفقد الإحساس في منطقة محددة دون فقدان الوعي بالضرورة.",
    clinicalNote: "LA قد يُستخدم أيضًا لاختصارات أخرى مثل Left Atrium؛ في التخدير يجب تفسيره من السياق ويفضل كتابة اسم المخدر الموضعي.",
    tags: ["local anesthetic","regional","موضعي"]
  },
  {
    id: "lma",
    en: "Laryngeal Mask Airway",
    ar: "قناع الحنجرة الهوائي",
    abbr: "LMA",
    category: "surgical",
    definition: "جهاز مجرى هوائي فوق المزمار يستقر حول مدخل الحنجرة لتسهيل التهوية دون المرور عبر الأحبال الصوتية كما في الأنبوب الرغامي.",
    clinicalNote: "يُستخدم في التخدير وفي بعض خوارزميات إنقاذ المجرى الهوائي، لكن اختياره يعتمد على المريض والإجراء وخطر الاستنشاق الرئوي.",
    tags: ["airway","supraglottic","LMA"]
  },
  {
    id: "lt",
    en: "Left",
    ar: "يسار",
    abbr: "Lt",
    category: "abbreviations",
    definition: "اختصار وصفي للجهة اليسرى في الملاحظات السريرية.",
    clinicalNote: "ليس اختصارًا دوائيًا أو فسيولوجيًا؛ وفي الوثائق الحرجة يفضّل كتابة Left كاملًا لتقليل سوء القراءة.",
    tags: ["left","direction","يسار"]
  },
  {
    id: "maoi",
    en: "Monoamine Oxidase Inhibitor",
    ar: "مثبط إنزيم أوكسيداز أحادي الأمين",
    abbr: "MAOI",
    category: "pharmacology",
    definition: "فئة أدوية تثبط إنزيم monoamine oxidase فتزيد توافر نواقل أحادية الأمين مثل النورأدرينالين والسيروتونين والدوبامين بدرجات تعتمد على الدواء.",
    clinicalNote: "لها أهمية حول الجراحة بسبب تداخلات دوائية محتملة مع أدوية تؤثر في السيروتونين أو الكاتيكولامينات؛ التقييم يعتمد على الدواء المحدد.",
    tags: ["MAOI","drug interaction","monoamine"]
  },
  {
    id: "map",
    en: "Mean Arterial Pressure",
    ar: "متوسط الضغط الشرياني",
    abbr: "MAP",
    category: "cardio",
    definition: "متوسط الضغط داخل الشرايين خلال دورة قلبية كاملة، ويتأثر بالنتاج القلبي والمقاومة الوعائية الجهازية.",
    clinicalNote: "يُستخدم MAP كمؤشر عملي على ضغط التروية أثناء التخدير، لكن الهدف المناسب يختلف باختلاف حالة المريض والسياق السريري.",
    tags: ["MAP","perfusion","ضغط"]
  },
  {
    id: "mg",
    en: "Milligram",
    ar: "ميليغرام",
    abbr: "mg",
    category: "abbreviations",
    definition: "وحدة كتلة تساوي واحدًا من ألف من الغرام.",
    clinicalNote: "تُستخدم على نطاق واسع لجرعات الأدوية. يجب تجنب الأخطاء العشرية وكتابة الوحدات بوضوح في الأوامر الدوائية.",
    tags: ["unit","milligram","dose"]
  },
  {
    id: "microgram",
    en: "Microgram",
    ar: "ميكروغرام",
    abbr: "µg",
    category: "abbreviations",
    definition: "وحدة كتلة تساوي واحدًا من مليون من الغرام، أو واحدًا من ألف من الميليغرام.",
    clinicalNote: "للسلامة الدوائية توصي ISMP باستخدام mcg بدل الرمز µg لأن µg قد يُساء قراءته على أنه mg.",
    tags: ["unit","microgram","mcg","safety"]
  },
  {
    id: "mw",
    en: "Molecular Weight",
    ar: "الوزن الجزيئي",
    abbr: "MW",
    category: "pharmacology",
    definition: "مصطلح شائع يعبّر عن كتلة الجزيء نسبةً إلى مكوناته الذرية؛ في الاستعمال العلمي الدقيق تُستخدم مفاهيم الكتلة الجزيئية أو الكتلة المولية بحسب السياق.",
    clinicalNote: "الحجم والكتلة الجزيئية من العوامل التي قد تؤثر في الانتشار عبر الأغشية، لكنها ليست العامل الوحيد في حركية الدواء.",
    tags: ["molecular weight","pharmacology","كتلة"]
  },
  {
    id: "pr-source",
    en: "Peripheral Resistance",
    ar: "المقاومة الوعائية المحيطية",
    abbr: "PR",
    category: "cardio",
    definition: "المقاومة التي يواجهها جريان الدم في الدوران الجهازي، وتتأثر أساسًا بقطر الشُرينات ولزوجة الدم وعوامل وعائية أخرى.",
    clinicalNote: "PR اختصار قابل للالتباس وقد يعني Pulse Rate. في الديناميكا الدموية تُستخدم غالبًا TPR أو SVR بصورة أوضح.",
    tags: ["vascular resistance","SVR","TPR"]
  },
  {
    id: "ptn",
    en: "Protein",
    ar: "بروتين",
    abbr: "Ptn",
    category: "abbreviations",
    definition: "جزيئات حيوية مكوّنة من أحماض أمينية تؤدي أدوارًا بنيوية وإنزيمية ونقلية وتنظيمية عديدة.",
    clinicalNote: "Ptn اختصار تعليمي غير موحد؛ في علم الأدوية ترتبط بعض الأدوية ببروتينات البلازما مثل الألبومين، ما يؤثر في الجزء الحر من الدواء.",
    tags: ["protein","albumin","binding"]
  },
  {
    id: "pt-patient",
    en: "Patient",
    ar: "المريض",
    abbr: "Pt",
    category: "abbreviations",
    definition: "اختصار كتابي شائع في بعض الملاحظات للإشارة إلى المريض.",
    clinicalNote: "Pt ليس اختصارًا موحدًا في كل السياقات وقد يلتبس مع PT المستخدم لزمن البروثرومبين؛ الأفضل كتابة Patient في المواضع التي قد يحدث فيها لبس.",
    tags: ["patient","documentation","مريض"]
  },
  {
    id: "ras-reticular",
    en: "Reticular Activating System",
    ar: "الجهاز الشبكي المنشط",
    abbr: "RAS",
    category: "abbreviations",
    definition: "شبكة عصبية ضمن التشكيل الشبكي في جذع الدماغ تسهم في اليقظة والانتباه وتنظيم دورة النوم والاستيقاظ.",
    clinicalNote: "RAS اختصار ملتبس؛ قد يعني أيضًا Renin–Angiotensin System. في علم الأعصاب يُستخدم أحيانًا ARAS لتحديد الجهاز الشبكي المنشط الصاعد.",
    tags: ["wakefulness","brainstem","ARAS"]
  },
  {
    id: "rbf",
    en: "Renal Blood Flow",
    ar: "جريان الدم الكلوي",
    abbr: "RBF",
    category: "abbreviations",
    definition: "كمية الدم التي تصل إلى الكليتين في وحدة الزمن، وهي عنصر أساسي في تروية الكلية ووظيفة الترشيح.",
    clinicalNote: "يتأثر RBF بالضغط الشرياني والمقاومة الوعائية الكلوية والتنظيم الذاتي والهرمونات، وقد يتغير أثناء التخدير والمرض الحرج.",
    tags: ["renal","kidney","blood flow"]
  },
  {
    id: "rr",
    en: "Respiratory Rate",
    ar: "معدل التنفس",
    abbr: "RR",
    category: "abbreviations",
    definition: "عدد دورات التنفس خلال دقيقة واحدة.",
    clinicalNote: "RR علامة حيوية مهمة ويجب تفسيرها مع حجم المدّ VT والتهوية الدقيقة وثاني أكسيد الكربون والأكسجة.",
    tags: ["respiratory rate","breathing","تنفس"]
  },
  {
    id: "rt",
    en: "Right",
    ar: "يمين",
    abbr: "Rt",
    category: "abbreviations",
    definition: "اختصار وصفي للجهة اليمنى في الملاحظات السريرية.",
    clinicalNote: "في الوثائق أو الأوامر التي قد يسبب فيها الالتباس ضررًا يُفضّل كتابة Right كاملًا.",
    tags: ["right","direction","يمين"]
  },
  {
    id: "sbp",
    en: "Systolic Blood Pressure",
    ar: "ضغط الدم الانقباضي",
    abbr: "SBP",
    category: "cardio",
    definition: "أعلى ضغط شرياني يصل إليه الدوران أثناء انقباض البطينين وقذف الدم.",
    clinicalNote: "يُفسر SBP مع DBP وMAP والسياق السريري؛ لا يكفي منفردًا لتقييم التروية.",
    tags: ["SBP","blood pressure","systolic"]
  },
  {
    id: "sch-source",
    en: "Succinylcholine (Suxamethonium)",
    ar: "سكسينيل كولين / سكساميثونيوم",
    abbr: "Sch",
    category: "pharmacology",
    definition: "مرخٍ عضلي مزيل للاستقطاب سريع البدء وقصير المفعول يُستخدم في سياقات محددة لتسهيل التنبيب أو التحكم بالمجرى الهوائي.",
    clinicalNote: "Sch اختصار غير قياسي لاسم الدواء ولا يُفضّل في الأوامر الدوائية؛ كتابة Succinylcholine أو Suxamethonium كاملةً أكثر أمانًا.",
    tags: ["succinylcholine","suxamethonium","muscle relaxant"]
  },
  {
    id: "sc",
    en: "Subcutaneous",
    ar: "تحت الجلد",
    abbr: "SC",
    category: "abbreviations",
    definition: "طريق إعطاء تُحقن فيه المادة داخل النسيج تحت الجلد لامتصاصها تدريجيًا.",
    clinicalNote: "اختصارات طرق الإعطاء قد تختلف بين المؤسسات؛ في الأوامر عالية الخطورة يفضّل كتابة Subcutaneous بوضوح لتجنب الالتباس.",
    tags: ["route","subcutaneous","حقن"]
  },
  {
    id: "svp",
    en: "Saturated Vapor Pressure",
    ar: "ضغط البخار المشبع",
    abbr: "SVP",
    category: "pharmacology",
    definition: "ضغط البخار فوق سائل عندما يكون البخار في توازن مع الطور السائل عند درجة حرارة محددة.",
    clinicalNote: "مهم في فهم العوامل الاستنشاقية المتطايرة؛ لكل عامل تخدير متطاير ضغط بخار مشبع يعتمد على درجة الحرارة ويؤثر في تصميم ومعايرة المبخرات.",
    tags: ["vapor pressure","volatile anesthetic","vaporizers"]
  },
  {
    id: "ttt",
    en: "Treatment",
    ar: "العلاج",
    abbr: "ttt",
    category: "abbreviations",
    definition: "اختصار كتابي غير رسمي لكلمة Treatment ويظهر في بعض الملاحظات التعليمية أو القديمة.",
    clinicalNote: "ليس اختصارًا سريريًا معياريًا موحدًا؛ الأفضل كتابة Treatment أو Therapy كاملًا في الوثائق الرسمية.",
    tags: ["treatment","documentation","علاج"]
  },
  {
    id: "uop",
    en: "Urine Output",
    ar: "إدرار البول / حجم البول المطروح",
    abbr: "UOP",
    category: "abbreviations",
    definition: "حجم البول الذي تنتجه الكليتان وتطرحه المثانة خلال فترة زمنية محددة.",
    clinicalNote: "يُستخدم UOP كأحد مؤشرات التوازن الحجمي ووظيفة الكلية، لكنه لا يفسر منفردًا دون النظر إلى الحالة الدموية والكلوية والأدوية.",
    tags: ["urine output","renal","بول"]
  },
  {
    id: "vc-source",
    en: "Vasoconstriction",
    ar: "تضيّق الأوعية",
    abbr: "VC",
    category: "cardio",
    definition: "انقباض العضلات الملساء الوعائية بما يقلل قطر الوعاء ويزيد المقاومة الوعائية موضعيًا أو جهازيًا بحسب الموقع.",
    clinicalNote: "VC اختصار ملتبس وقد يعني Vital Capacity في الجهاز التنفسي؛ في التوثيق السريري يجب توضيح المقصود.",
    tags: ["vasoconstriction","vascular","تضيق"]
  },
  {
    id: "vd-vasodilation-source",
    en: "Vasodilation",
    ar: "توسّع الأوعية",
    abbr: "VD",
    category: "cardio",
    definition: "ارتخاء العضلات الملساء الوعائية بما يزيد قطر الوعاء ويقلل المقاومة الوعائية.",
    clinicalNote: "VD اختصار غير نوعي وقد يلتبس مع دلالات أخرى؛ لا ينبغي خلطه مع Vd المستخدم لVolume of Distribution.",
    tags: ["vasodilation","vascular","توسع"]
  },
  {
    id: "vmc",
    en: "Vasomotor Center",
    ar: "المركز الوعائي الحركي",
    abbr: "VMC",
    category: "cardio",
    definition: "مصطلح فسيولوجي تقليدي لدوائر في جذع الدماغ تسهم في تنظيم النغمة الودية الوعائية وضغط الدم.",
    clinicalNote: "المفهوم الحديث لتنظيم الضغط موزع على شبكات جذع الدماغ وليس نقطة منفردة؛ VMC اختصار تعليمي أكثر من كونه اختصارًا سريريًا معياريًا.",
    tags: ["vasomotor","brainstem","blood pressure"]
  },
  {
    id: "vt",
    en: "Tidal Volume",
    ar: "حجم المدّ التنفسي",
    abbr: "VT / TV",
    category: "abbreviations",
    definition: "حجم الهواء الداخل أو الخارج من الرئتين مع كل دورة تنفسية.",
    clinicalNote: "في التهوية الميكانيكية يُضبط VT عادة بالاستناد إلى الوزن المثالي/المتنبأ به والسياق الرئوي لتقليل أذية الرئة.",
    tags: ["tidal volume","ventilation","تنفس"]
  },
  {
    id: "vd",
    en: "Volume of Distribution",
    ar: "حجم التوزيع الظاهري",
    abbr: "Vd",
    category: "pharmacology",
    definition: "معامل حركي دوائي يربط كمية الدواء الكلية في الجسم بتركيزه في البلازما؛ وهو حجم ظاهري نظري وليس حيزًا تشريحيًا حقيقيًا.",
    clinicalNote: "ارتفاع Vd يشير عادة إلى انتشار أكبر خارج البلازما، وله أهمية في حساب جرعة التحميل وفهم توزيع الأدوية.",
    tags: ["pharmacokinetics","distribution","Vd"]
  }
,
  {
    id: "minute-ventilation",
    en: "Minute Ventilation",
    ar: "التهوية الدقيقة / حجم الهواء في الدقيقة",
    abbr: "MV / V̇E",
    category: "abbreviations",
    definition: "كمية الهواء المتبادل مع الرئتين خلال دقيقة واحدة، وتساوي تقريبًا VT × RR.",
    tags: ["minute ventilation","ventilator","VT","RR","تهوية"]
  },
  {
    id: "fio2",
    en: "Fraction of Inspired Oxygen",
    ar: "نسبة الأوكسجين في الغاز المستنشق",
    abbr: "FiO₂",
    category: "abbreviations",
    definition: "نسبة الأوكسجين الموجودة في خليط الغاز الذي يستنشقه المريض.",
    tags: ["FiO2","oxygen","ventilator","أوكسجين"]
  },
  {
    id: "peep",
    en: "Positive End-Expiratory Pressure",
    ar: "الضغط الإيجابي في نهاية الزفير",
    abbr: "PEEP",
    category: "abbreviations",
    definition: "ضغط إيجابي يُحافَظ عليه في المجرى الهوائي عند نهاية الزفير.",
    tags: ["PEEP","ventilator","alveoli","oxygenation"]
  },
  {
    id: "ie-ratio",
    en: "Inspiratory-to-Expiratory Ratio",
    ar: "نسبة زمن الشهيق إلى زمن الزفير",
    abbr: "I:E",
    category: "abbreviations",
    definition: "النسبة بين مدة الشهيق ومدة الزفير خلال دورة التنفس.",
    tags: ["I:E","ventilator","inspiration","expiration"]
  },
  {
    id: "pip",
    en: "Peak Inspiratory Pressure",
    ar: "ذروة ضغط الشهيق",
    abbr: "PIP / Ppeak",
    category: "abbreviations",
    definition: "أعلى ضغط يُسجَّل في مجرى الهواء أثناء الشهيق في التهوية الميكانيكية.",
    tags: ["PIP","peak pressure","ventilator"]
  },
  {
    id: "spo2",
    en: "Peripheral Oxygen Saturation",
    ar: "التشبع المحيطي للأوكسجين",
    abbr: "SpO₂",
    category: "abbreviations",
    definition: "تقدير تشبع الهيموغلوبين بالأوكسجين بواسطة جهاز قياس التأكسج النبضي.",
    tags: ["SpO2","pulse oximetry","oxygen saturation"]
  },
  {
    id: "sao2",
    en: "Arterial Oxygen Saturation",
    ar: "تشبع الأوكسجين في الدم الشرياني",
    abbr: "SaO₂",
    category: "abbreviations",
    definition: "نسبة الهيموغلوبين المشبع بالأوكسجين في الدم الشرياني.",
    tags: ["SaO2","arterial blood","oxygen saturation"]
  },
  {
    id: "svo2",
    en: "Mixed Venous Oxygen Saturation",
    ar: "تشبع الأوكسجين في الدم الوريدي المختلط",
    abbr: "SvO₂",
    category: "abbreviations",
    definition: "نسبة الهيموغلوبين المشبع بالأوكسجين في الدم الوريدي المختلط.",
    tags: ["SvO2","mixed venous","oxygen saturation"]
  },
  {
    id: "rso2",
    en: "Regional Oxygen Saturation",
    ar: "التشبع الإقليمي للأوكسجين في الأنسجة",
    abbr: "rSO₂",
    category: "abbreviations",
    definition: "مؤشر لتشبع الأوكسجين ضمن منطقة نسيجية محددة، ويُستخدم كثيرًا لمراقبة الأكسجة الدماغية.",
    tags: ["rSO2","NIRS","cerebral oximetry"]
  },
  {
    id: "cvp",
    en: "Central Venous Pressure",
    ar: "الضغط الوريدي المركزي",
    abbr: "CVP",
    category: "cardio",
    definition: "الضغط المقاس في الأوردة المركزية قرب الأذين الأيمن.",
    tags: ["CVP","central venous","hemodynamics"]
  },
  {
    id: "capnography",
    en: "Capnography",
    ar: "تخطيط ثاني أوكسيد الكربون",
    category: "critical",
    definition: "قياس وعرض ثاني أوكسيد الكربون في غازات التنفس على شكل موجة زمنية.",
    tags: ["capnography","EtCO2","CO2"]
  },
  {
    id: "secretions",
    en: "Secretions",
    ar: "إفرازات",
    category: "surgical",
    definition: "سوائل أو مواد تفرزها الغدد والأنسجة مثل اللعاب والمخاط.",
    tags: ["secretions","إفرازات"]
  },
  {
    id: "properties",
    en: "Properties",
    ar: "خصائص / صفات",
    category: "pharmacology",
    definition: "الصفات أو السمات التي تميز مادة أو دواء.",
    tags: ["properties","خصائص"]
  },
  {
    id: "drug-absorption",
    en: "Drug Absorption",
    ar: "امتصاص الدواء",
    category: "pharmacology",
    definition: "انتقال الدواء من موقع إعطائه إلى الدورة الدموية.",
    tags: ["drug absorption","pharmacokinetics","امتصاص"]
  },
  {
    id: "provision-of-anesthesia",
    en: "Provision of Anesthesia",
    ar: "تقديم / إجراء التخدير",
    category: "surgical",
    definition: "تقديم الرعاية التخديرية للمريض.",
    tags: ["anesthesia","تخدير"]
  },
  {
    id: "neurosurgery",
    en: "Neurosurgery",
    ar: "جراحة الأعصاب",
    category: "surgical",
    definition: "التخصص الجراحي المعني بالجهاز العصبي والعمود الفقري.",
    tags: ["neurosurgery","جراحة الأعصاب"]
  },
  {
    id: "operative",
    en: "Operative",
    ar: "متعلق بالعملية الجراحية / جراحي",
    category: "surgical",
    definition: "صفة تعني متعلقًا بعملية أو إجراء جراحي.",
    tags: ["operative","surgery","جراحة"]
  },
  {
    id: "pre-post",
    en: "Preoperative / Postoperative",
    ar: "قبل العملية / بعد العملية",
    category: "surgical",
    definition: "Preoperative تعني قبل العملية الجراحية، وPostoperative تعني بعد العملية.",
    tags: ["preoperative","postoperative","قبل وبعد"]
  },
  {
    id: "fire-extinguisher",
    en: "Fire Extinguisher",
    ar: "مطفأة حريق",
    category: "surgical",
    definition: "جهاز مخصص لإطفاء الحرائق.",
    tags: ["fire extinguisher","سلامة"]
  },
  {
    id: "quantity",
    en: "Quantity",
    ar: "كمية",
    category: "pharmacology",
    definition: "مقدار أو كمية قابلة للقياس.",
    tags: ["quantity","كمية"]
  }
,
  {
    id: "bis",
    en: "Bispectral Index",
    ar: "مؤشر ثنائي الطيف لعمق التخدير",
    abbr: "BIS",
    category: "abbreviations",
    definition: "مؤشر رقمي مشتق من إشارات تخطيط الدماغ EEG يساعد في تقدير مستوى الوعي وعمق التخدير العام، وتُلتقط الإشارات بواسطة حساس يوضع على الجبهة.",
    tags: ["BIS","Bispectral Index","EEG","depth of anesthesia","عمق التخدير","مراقبة الوعي"]
  },
  {
    id: "difficult-intubation-associated-conditions",
    en: "Conditions Associated with Difficult Intubation",
    ar: "الحالات المرتبطة بصعوبة التنبيب",
    category: "surgical",
    definition: "أورام أو كتل: Cystic hygroma، Hemangioma، Hematoma.\nالتهابات: Submandibular abscess، Peritonsillar abscess، Epiglottitis.\nتشوهات خلقية: Pierre Robin syndrome، Laryngeal atresia، Goldenhar syndrome، Craniofacial dysostosis.\nجسم غريب: Foreign body.\nرضوض وإصابات: Laryngeal fracture، Mandibular أو Maxillary fracture، Inhalation burn، Cervical spine injury.\nالسمنة ومحدودية حركة الرقبة/المفاصل: Obesity، Inadequate neck extension، Rheumatoid arthritis، Ankylosing spondylitis، Halo traction.\nاختلافات تشريحية: Micrognathia، Prognathism، Large tongue (Macroglossia)، High-arched palate، Short neck.",
    tags: ["difficult intubation","difficult airway","صعوبة التنبيب","Cystic hygroma","Hemangioma","Hematoma","Submandibular abscess","Peritonsillar abscess","Epiglottitis","Pierre Robin syndrome","Laryngeal atresia","Goldenhar syndrome","Craniofacial dysostosis","Foreign body","Laryngeal fracture","Mandibular fracture","Maxillary fracture","Inhalation burn","Cervical spine injury","Obesity","Rheumatoid arthritis","Ankylosing spondylitis","Halo traction","Micrognathia","Prognathism","Macroglossia","High-arched palate","Short neck"]
  }

];

export const SUX_APNOEA_DATA = {
  title: 'سكولين ابنيه (Suxamethonium Apnoea)',
  subtitle: 'البروتوكول السريري التشخيصي والتدبير الطارئ لتقني التخدير',
  drugName: 'Suxamethonium / Succinylcholine (السكولين أو السكساميثانيوم)',
  classification: {
    group: 'المرخيات العضلية (Muscle Relaxants)',
    depolarizing: 'مرخيات مستقطبة (Depolarizing)',
    nonDepolarizing: 'مرخيات غير مستقطبة (Non-Depolarizing)',
    drugPosition: 'السكولين هو المرخي العضلي المستقطب الوحيد المستخدم سريرياً لسرعة مفعوله الخاطفة وقصر مدة عمله الطبيعية (3 - 5 دقائق).'
  },
  whatHappens: {
    phenomenon: 'Suxamethonium Apnoea (توقف التنفس الممتد بعد السكولين)',
    description: 'في الحالة الطبيعية ينتهي مفعول السكولين خلال دقائق معدودة. لكن عند بعض المرضى، يستمر الشلل العضلي وتوقف التنفس (Apnoea) من 20 دقيقة إلى يوم أو حتى يومين كاملين (24 - 48 ساعة) دون استعادة التنفس التلقائي.'
  },
  theCause: {
    enzyme: 'إنزيمات الكولينستيراز الكاذبة (Cholinesterase Enzymes / Pseudocholinesterase)',
    role: 'هذا الإنزيم الذي يُفرزه الكبد مسؤول بشكل أساسي عن تفكيك وأيض (Metabolize) السكولين في بلازما الدم لإنهاء مفعوله العضلي.',
    reason: 'سبب الفقدان أو الخلل هو خلل جيني وراثي (Genetic Deficiency / Atypical enzyme)؛ لذلك لا يمكن التنبؤ به بالفحص الروتيني قبل العملية إلا إذا كان لدى المريض أو عائلته تاريخ سابق مؤكد.'
  },
  clinicalDetection: {
    when: 'كيف يكتشف تقني التخدير وطبيب التخدير الحالة؟',
    signs: [
      'بعد انتهاء العملية الجراحية وإيقاف غازات التخدير، لا يستعيد المريض تنفسه التلقائي ويبقى في حالة انقطاع نفس (Apnea).',
      'المريض غير قادر على رفع رأسه أو فتح عينيه، ويبقى مرتخياً تماماً وغير قادر على التخلص من المرخي العضلي.',
      'اختبار محفز الأعصاب (Peripheral Nerve Stimulator - TOF) يظهر غياب الاستجابة أو نمط الحصار العضلي المستمر.'
    ],
    immediateAction: 'إبقاء المريض موصولاً بعربة التخدير والتهوية الميكانيكية، وتوفير التسكين والتهدئة لمنع وعي المريض وهو مشلول.'
  },
  treatmentProtocol: [
    {
      id: 'plasma',
      title: '1. نقل بلازما طازجة مجمدة (Fresh Frozen Plasma - FFP)',
      details: 'تحتوي البلازما الطبيعية على إنزيمات الكولينستيراز السليمة الجاهزة لتفكيك السكولين المتراكم في جسم المريض واستعادة التنفس.',
      crucialRule: 'شرط حاسم جداً: يجب أن تكون البلازما ليست من أقارب المريض!',
      ruleReason: 'لأن النقص وراثي في العائلة، وأقارب المريض قد يحملون نفس الخلل الجيني للإنزيم فلا تفيد البلازما الخاصة بهم.'
    },
    {
      id: 'mechanical-ventilation',
      title: '2. الاستمرار على التهوية الميكانيكية الحامية (Mechanical Ventilation)',
      details: 'ترك المريض على جهاز التنفس الصناعي حتى يزول تأثير الدواء تدريجياً عبر الإفراز الكلوي والتفكيك الذاتي البطيء.',
      crucialRule: 'شرط أخلاقي وسريري: الحفاظ على التهدئة والتسكين المستمر (Sedation & Analgesia)',
      ruleReason: 'حتى لا يستيقظ المريض ويدرك أنه مشلول عاجز عن التنفس فيصاب بالذعر الشديد والصدمة النفسية الحادة.'
    }
  ]
};

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'q1',
    question: 'ما هو المقصود بمصطلح الأيض (Metabolism) في أدوية التخدير؟',
    options: [
      'تحويل الأدوية الذائبة بالماء إلى دهون لتتراكم بالكبد',
      'تحويل الأدوية القابلة لذوبان الدهون إلى قابلة للذوبان بالماء ليسهل إفرازها بالكلى',
      'زيادة سرعة دقات القلب ورفع الضغط أثناء الجراحة',
      'تثبيط الجهاز المناعي لمنع الصدمة التحسسية'
    ],
    correctIndex: 1,
    explanation: 'الأيض يحول الأدوية القابلة لذوبان الدهون إلى أدوية قابلة للذوبان بالماء ليسهل إفرازها والتخلص منها عن طريق الكلى.'
  },
  {
    id: 'q2',
    question: 'إلى أي نوع من المرخيات العضلية (Muscle Relaxants) ينتمي دواء السكولين (Suxamethonium)؟',
    options: [
      'مرخيات عضلية غير مستقطبة (Non-depolarizing)',
      'مرخيات عضلية مستقطبة (Depolarizing)',
      'مسكنات أفيونية مركزية (Opioids)',
      'غازات استنشاقية مهلجنة'
    ],
    correctIndex: 1,
    explanation: 'السكولين (Suxamethonium) هو المرخي العضلي المستقطب (Depolarizing) الرئيسي المستخدم في التخدير.'
  },
  {
    id: 'q3',
    question: 'ما هو سبب حدوث حالة "سكولين ابنيه" (Suxamethonium Apnoea) وتوقف التنفس المطول؟',
    options: [
      'حساسية مفرطة للبنسلين',
      'نقص وراثي في إنزيمات الكولينستيراز (Cholinesterase enzymes)',
      'تناول المريض للماء قبل العملية مباشرة',
      'زيادة إفراز الأنسولين من البنكرياس'
    ],
    correctIndex: 1,
    explanation: 'تحدث الحالة بسبب نقص وراثي في إنزيم الكولينستيراز المسؤول عن استقلاب وتفكيك السكولين.'
  },
  {
    id: 'q4',
    question: 'عند نقل بلازما لمريض يعاني من سكولين ابنيه لعلاجه، ما هو الشرط الجوهري للبلازما؟',
    options: [
      'أن تكون البلازما مأخوذة من أحد الوالدين أو الإخوة حصراً',
      'أن تكون البلازما من متبرع ليس من أقارب المريض',
      'أن تُعطى دافئة مع جرعة مضاعفة من السكولين',
      'أن يتم خلطها مع الكالسيوم فقط'
    ],
    correctIndex: 1,
    explanation: 'يشترط أن لا تكون البلازما من أقارب المريض لأن نقص الإنزيم وراثي عائلي، وأقاربه قد يحملون نفس النقص الجيني.'
  },
  {
    id: 'q5',
    question: 'ماذا يعني مصطلح MAC في غازات التخدير؟',
    options: [
      'أعلى تركيز يسبب توقف القلب بنسبة 100%',
      'أقل تركيز غاز تبخر بالرئة يمنع بنسبة 50% العوامل الخارجية المؤثرة والألم بالجراحة',
      'معدل جريان الدم في الشرايين التاجية للقلب',
      'وحدة قياس جرعة السوائل الوريدية'
    ],
    correctIndex: 1,
    explanation: 'الـ MAC هو أقل تركيز غاز تبخر بالرئة يمنع بنسبة 50% الاستجابة للألم والمؤثرات الجراحية، ويقيس قوة الغاز.'
  },
  {
    id: 'q6',
    question: 'أي من الاختصارات التالية يشير إلى تدفق الدم في الجمجمة؟',
    options: [
      'ICP',
      'CBF',
      'MAC',
      'HR'
    ],
    correctIndex: 1,
    explanation: 'CBF = Cerebral Blood Flow (تدفق الدم في الجمجمة)، بينما ICP = Intracranial Pressure (الضغط داخل الجمجمة).'
  },
  {
    id: 'q7',
    question: 'ارتفاع حرارة المريض غير الطبيعي لأكثر من 40 سيليزي أثناء التخدير يرمز له بـ:',
    options: [
      'MI (Myocardial Infarction)',
      'MH (Malignant Hyperthermia)',
      'IM (Intramuscular)',
      'IV (Intravenous)'
    ],
    correctIndex: 1,
    explanation: 'MH تعني Malignant Hyperthermia وهي طوارئ خطيرة بارتفاع الحرارة لأكثر من 40 مئوية.'
  }
];

export const CLINICAL_SCENARIO: SimulationStep[] = [
  {
    stepNumber: 1,
    title: 'نهاية العملية وظاهرة عدم الاستيقاظ',
    situation: 'انتهت عملية استئصال الزائدة لمريض شاب أخذ سكولين (Suxamethonium) لبدء التخدير وإدخال الأنبوب الرغامي. قمت بإيقاف غازات التخدير منذ 15 دقيقة، لكن المريض لا يزال متوقف التنفس (Apnea) ومرتخياً تماماً.',
    question: 'بصفتك تقني التخدير مع الطبيب، ما هو الإجراء الأولي الفوري الأكثر أماناً؟',
    options: [
      {
        text: 'نزع الأنبوب الرغامي فوراً وتشجيع المريض على أخذ نفس عميق',
        isCorrect: false,
        feedback: 'خطأ قاتل! المريض يعاني من شلل تنفسي، ونزع الأنبوب يسبب اختناقاً حاداً وهبوطاً كارثياً في الأكسجين.'
      },
      {
        text: 'إبقاء المريض على عربة التخدير والتهوية الميكانيكية، والتأكد من استمرار التهدئة لحمايته',
        isCorrect: true,
        feedback: 'صحيح وممتاز! يجب تأمين الأكسجين والتهوية الميكانيكية بالكامل مع إعطاء مهدئ حتى لا يشعر المريض بالشلل.'
      },
      {
        text: 'حقن جرعة إضافية من السكولين للتأكد من المفعول',
        isCorrect: false,
        feedback: 'خطأ جسيم! إعطاء مزيد من السكولين سيفاقم الشلل واضطراب نبضات القلب.'
      }
    ]
  },
  {
    stepNumber: 2,
    title: 'تشخيص الحالة السريرية',
    situation: 'بعد 25 دقيقة من نهاية العملية، محفز الأعصاب يوضح استمرار الشلل العضلي التام للمريض مع استمرار الـ Apnea. تم استبعاد التثبيط الأفيوني.',
    question: 'ما هو التشخيص الأرجح لهذه الحالة استناداً لمعلوماتك كتقني تخدير؟',
    options: [
      {
        text: 'جلطة دماغية مفاجئة أثناء العملية',
        isCorrect: false,
        feedback: 'غير مرجح؛ فاستمرار الشلل العضلي بعد السكولين مع وعي جزئي يوجه لخلل دوائي محدد.'
      },
      {
        text: 'سكولين ابنيه (Suxamethonium Apnoea) نتيجة نقص وراثي في إنزيمات الكولينستيراز',
        isCorrect: true,
        feedback: 'تشخيص دقيق 100%! استمرار التوقف التنفسي لأكثر من 20 دقيقة بعد السكولين هو العلامة الكلاسيكية للسكولين ابنيه.'
      },
      {
        text: 'احتشاء عضلي (MI) بسبب هبوط الضغط',
        isCorrect: false,
        feedback: 'الاحتشاء العضلي لا يفسر استمرار الشلل العضلي التام وانقطاع النفس المستمر مع استقرار تخطيط القلب.'
      }
    ]
  },
  {
    stepNumber: 3,
    title: 'اختيار بروتوكول العلاج الصحيح',
    situation: 'قرر الفريق التخديري التدخل لإنهاء الشلل العضلي وتسريع استيقاظ المريض لنقله للعناية أو إفاقته.',
    question: 'أي من القرارات التالية يمثل التدبير الدوائي السريري الصحيح؟',
    options: [
      {
        text: 'طلب تبرع بالدم فوراً من أخ المريض المرافق له في صالة الانتظار',
        isCorrect: false,
        feedback: 'خطير وغير صحيح! لأن الخلل وراثي، فقد يكون شقيقه يحمل نفس نقص الإنزيم فلا تفيد بلازماه.'
      },
      {
        text: 'نقل بلازما طازجة مجمدة (FFP) من بنك الدم (ليست من أقارب المريض) أو الاستمرار على جهاز التنفس حتى التخلص التلقائي',
        isCorrect: true,
        feedback: 'إجابة نموذجية! البلازما تحتوي على إنزيمات الكولينستيراز، ويشترط أن لا تكون من الأقارب لتفادي النقص الوراثي المشترك.'
      },
      {
        text: 'إعطاء مدرات بول قوية مثل الفيروسيميد لإخراج السكولين خلال 5 دقائق',
        isCorrect: false,
        feedback: 'غير صحيح؛ فالسكولين يحتاج إنزيم لتفكيكه أولاً قبل أن تتخلص منه الكلى بصورة ذائبة بالماء.'
      }
    ]
  }
];
