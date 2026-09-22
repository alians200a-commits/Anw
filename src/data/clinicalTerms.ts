import { ClinicalTerm, QuizQuestion, SimulationStep } from '../types';

export const CLINICAL_TERMS: ClinicalTerm[] = [
  {
    id: 'metabolism',
    en: 'Metabolism',
    ar: 'الأيض / الاستقلاب',
    category: 'pharmacology',
    definition: 'التحول الكيميائي للدواء داخل الجسم بواسطة الإنزيمات | Biotransformation، وغالبًا يحدث بدرجة مهمة في الكبد.',
    clinicalNote: 'قد ينتج عن الاستقلاب مركبات أكثر أو أقل نشاطًا أو أسهل في الإطراح؛ وليس معناه دائمًا تحويل الدواء من ذائب بالدهون إلى ذائب بالماء.',
    tags: ['أدوية', 'كبد', 'pharmacokinetics']
  },
  {
    id: 'cbf',
    en: 'Cerebral Blood Flow',
    ar: 'تدفق الدم الدماغي',
    abbr: 'CBF',
    category: 'abbreviations',
    definition: 'تدفق الدم الذي يصل إلى أنسجة الدماغ | Cerebral perfusion.',
    clinicalNote: 'يتأثر CBF بعوامل منها PaCO₂ وضغط التروية الدماغية والأدوية التخديرية.',
    tags: ['دماغ', 'أعصاب', 'تدفق دم']
  },
  {
    id: 'icp',
    en: 'Intracranial Pressure',
    ar: 'الضغط داخل القحف',
    abbr: 'ICP',
    category: 'abbreviations',
    definition: 'الضغط داخل الجمجمة الناتج عن الدماغ والدم وCSF ضمن الحيز القحفي.',
    clinicalNote: 'ارتفاع ICP قد يهدد التروية الدماغية؛ تفسيره وتدبيره يعتمد على السبب وCPP والتهوية والديناميكا الدموية.',
    tags: ['جمجمة', 'ضغط', 'جراحة أعصاب']
  },
  {
    id: 'mh',
    en: 'Malignant Hyperthermia',
    ar: 'فرط الحرارة الخبيث',
    abbr: 'MH',
    category: 'critical',
    definition: 'متلازمة فرط استقلاب عضلي مهددة للحياة لدى أشخاص قابلين وراثيًا، تُحفزها العوامل الاستنشاقية المتطايرة و/أو Suxamethonium.',
    clinicalNote: 'قد يظهر ارتفاع EtCO₂ وتسرع القلب والتيبس العضلي قبل ارتفاع الحرارة الشديد. التدبير الإسعافي يشمل إيقاف العوامل المحفزة، 100% O₂ وDantrolene مع العلاج الداعم.',
    tags: ['حرارة', 'طوارئ', 'Suxamethonium', 'وراثة']
  },
  {
    id: 'premedication',
    en: 'Premedication',
    ar: 'مرحلة ما قبل التخدير',
    category: 'surgical',
    definition: 'المرحلة التي تسبق بدء التخدير، وتشمل التقييم والتحضير النفسي والدوائي وتجهيز المريض والخطة بحسب حالته.',
    clinicalNote: 'ليست معناها إعطاء أدوية ثابتة لكل مريض؛ اختيار الأدوية يعتمد على القلق والألم وخطر PONV والاستنشاق والأمراض المصاحبة.',
    tags: ['ما قبل التخدير', 'Premedication', 'تحضير']
  },
  {
    id: 'induction',
    en: 'Induction',
    ar: 'البدء في التخدير',
    category: 'surgical',
    definition: 'المرحلة التي ينتقل فيها المريض من اليقظة إلى حالة التخدير المناسبة لبدء الإجراء.',
    clinicalNote: 'يمكن أن يكون البدء في التخدير وريديًا | Intravenous أو استنشاقيًا | Inhalational بحسب المريض والخطة؛ التسمية العربية المعتمدة في التطبيق هي «البدء في التخدير».',
    tags: ['بدء التخدير', 'Induction', 'وريدي', 'استنشاقي']
  },
  {
    id: 'maintenance',
    en: 'Maintenance',
    ar: 'إدامة التخدير',
    category: 'surgical',
    definition: 'مرحلة المحافظة على التنويم والتسكين والاستقرار الفيزيولوجي أثناء العملية، مع إضافة ارتخاء العضلات عند الحاجة.',
    clinicalNote: 'تتم الإدامة بعوامل استنشاقية أو تخدير وريدي كلي | TIVA أو مزيج متوازن، مع المراقبة المستمرة وتعديل الجرعات حسب الاستجابة.',
    tags: ['إدامة التخدير', 'Maintenance', 'TIVA', 'غازات']
  },
  {
    id: 'iv',
    en: 'Intravenous',
    ar: 'وريدي',
    abbr: 'IV',
    category: 'abbreviations',
    definition: 'إعطاء الدواء مباشرة داخل الوريد | Intravenous administration، ويعطي توافرًا حيويًا 100%.',
    clinicalNote: 'بدء التأثير غالبًا سريع، لكنه يختلف حسب الدواء والدورة الدموية وموقع الحقن.',
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
    ar: 'انخفاض / تقليل',
    category: 'cardio',
    definition: 'انخفاض قيمة أو وظيفة مقارنة بخط الأساس.',
    clinicalNote: 'يُفسر حسب المتغير المكتوب معه مثل BP أو HR أو RR، ولا يعني أن جميع أدوية التخدير تخفض هذه القيم بالطريقة نفسها.',
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
    ar: 'التركيز السنخي الأدنى',
    abbr: 'MAC',
    category: 'pharmacology',
    definition: 'التركيز السنخي لعامل تخدير استنشاقي الذي يمنع الحركة استجابةً لمحفز جراحي في 50% من الأشخاص.',
    clinicalNote: 'MAC مقياس لقوة العامل الاستنشاقي؛ كلما كان MAC أقل كان العامل أكثر قوة عادةً، وينخفض مع التقدم بالعمر. قيم مرجعية تقريبية محسوبة للعمر 1 / 40 / 80 سنة: Halothane 0.95 / 0.75 / 0.58%، Isoflurane 1.49 / 1.17 / 0.91%، Enflurane 2.08 / 1.63 / 1.27%، Sevoflurane 2.29 / 1.80 / 1.40%، Desflurane 8.3 / 6.6 / 5.1%، Xenon 92 / 72 / 57%، Nitrous oxide 133 / 104 / 81%. هذه قيم مرجعية عمرية وليست بديلًا عن بيانات المستحضر أو معايرة التخدير حسب المريض.',
    tags: ['غازات', 'رئة', 'فعالية']
  },
  {
    id: 'hypnotic',
    en: 'Hypnotic',
    ar: 'منوّم',
    category: 'pharmacology',
    definition: 'دواء يسبب التنويم وفقدان الوعي بدرجات تعتمد على الجرعة.',
    clinicalNote: 'التنويم لا يعني تسكين الألم تلقائيًا؛ بعض Hypnotics مثل Propofol لا توفر Analgesia مهمة.',
    tags: ['تنويم', 'وعي']
  },
  {
    id: 'sedative',
    en: 'Sedative',
    ar: 'مهدئ',
    category: 'pharmacology',
    definition: 'دواء يقلل القلق والاستثارة ومستوى الوعي بدرجة تعتمد على الجرعة.',
    clinicalNote: 'مع زيادة عمق Sedation قد تتأثر التهوية ومجرى الهواء؛ لذلك لا يُفترض بقاء جميع المنعكسات فعالة دائمًا.',
    tags: ['تهدئة', 'قلق']
  },
  {
    id: 'lipid-solubility',
    en: 'Lipid Solubility',
    ar: 'الذوبان في الدهون',
    category: 'pharmacology',
    definition: 'قابلية الدواء للذوبان في الدهون والأغشية الخلوية.',
    clinicalNote: 'تؤثر في عبور الأغشية والوصول إلى CNS، لكن سرعة بدء التأثير تعتمد أيضًا على عوامل أخرى مثل التروية والتأين والارتباط بالبروتين.',
    tags: ['دهون', 'توزيع', 'pharmacokinetics']
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
    ar: 'مضاد الغثيان والقيء',
    category: 'pharmacology',
    definition: 'دواء يُستخدم للوقاية من الغثيان والقيء أو علاجهما.',
    clinicalNote: 'في التخدير تُستخدم مضادات القيء مثل Ondansetron وDexamethasone ضمن الوقاية أو العلاج من PONV حسب عوامل الخطورة.',
    tags: ['تقيؤ', 'غثيان', 'PONV']
  },
  {
    id: 'lacrimation',
    en: 'Lacrimation',
    ar: 'تدميع العين',
    category: 'surgical',
    definition: 'زيادة إفراز الدموع | Tear production.',
    clinicalNote: 'قد ترافق الاستجابة للمنبهات أثناء التخدير لكنها علامة غير نوعية ولا تُستخدم وحدها لتحديد عمق التخدير.',
    tags: ['عين', 'دموع', 'عمق التخدير']
  },
  {
    id: 'salivation',
    en: 'Salivation',
    ar: 'إفراز اللعاب',
    category: 'surgical',
    definition: 'إفراز اللعاب من الغدد اللعابية، وقد يزداد مع بعض الأدوية مثل Ketamine.',
    clinicalNote: 'قد يُستخدم Antisialagogue مثل Glycopyrrolate عند الحاجة، لكنه ليس مطلوبًا تلقائيًا لكل مريض يتلقى Ketamine.',
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
    ar: 'هلوسة',
    category: 'surgical',
    definition: 'إدراك حسي دون وجود منبه خارجي حقيقي.',
    clinicalNote: 'قد تظهر ضمن Emergence reactions بعد Ketamine عند بعض المرضى؛ التدبير يعتمد على الشدة والسياق.',
    tags: ['هلوسة', 'Ketamine', 'إفاقة']
  },
  {
    id: 'apnea',
    en: 'Apnea',
    ar: 'انقطاع النفس',
    category: 'critical',
    definition: 'غياب التنفس التلقائي | Absence of spontaneous breathing.',
    clinicalNote: 'قد ينجم عن أدوية التخدير أو الحصار العصبي العضلي أو أسباب تنفسية/عصبية/استقلابية، ويحتاج دعم التهوية وتحديد السبب.',
    tags: ['تنفس', 'رئة', 'طوارئ']
  },
  {
    id: 'amnesia',
    en: 'Amnesia',
    ar: 'فقدان الذاكرة',
    category: 'pharmacology',
    definition: 'عدم القدرة على تذكر أحداث خلال فترة معينة؛ بعض الأدوية تسبب Anterograde amnesia.',
    clinicalNote: 'Midazolam مثال شائع على دواء يسبب Anterograde amnesia، لكن هذا التأثير منفصل عن Analgesia.',
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
    definition: 'ارتفاع ضغط الدم فوق المستوى المتوقع للمريض والسياق السريري.',
    clinicalNote: 'حول الجراحة قد يرتبط بالألم أو التحفيز الجراحي أو فرط CO₂ أو امتلاء المثانة أو أدوية معينة؛ العلاج يوجّه للسبب.',
    tags: ['ضغط', 'قلب', 'دورة دموية']
  },
  {
    id: 'hypotension',
    en: 'Hypotension',
    ar: 'انخفاض ضغط الدم',
    category: 'cardio',
    definition: 'انخفاض ضغط الدم إلى مستوى قد يهدد تروية الأعضاء بالنسبة لخط الأساس والسياق.',
    clinicalNote: 'يُقيّم السبب أولًا مثل vasodilation أو hypovolemia أو نزف أو ضعف قلبي، ثم يُعالج بالسوائل أو الدم أو vasopressor/inotrope حسب الحاجة.',
    tags: ['ضغط', 'هبوط', 'تروية']
  },
  {
    id: 'cardia',
    en: 'Cardiac',
    ar: 'قلبي',
    category: 'cardio',
    definition: 'مصطلح وصفي يعني متعلق بالقلب | Relating to the heart.',
    clinicalNote: 'لا يُستخدم Cardia كمرادف عام للقلب؛ Cardia قد تشير تشريحيًا إلى الجزء القريب من المعدة عند اتصالها بالمريء.',
    tags: ['cardiac', 'heart', 'قلب']
  },
  {
    id: 'tachycardia',
    en: 'Tachycardia',
    ar: 'تسرع القلب',
    category: 'cardio',
    definition: 'ارتفاع معدل ضربات القلب؛ عند البالغ يُستخدم غالبًا HR >100/min كتعريف وصفي.',
    clinicalNote: 'قد يرتبط بالألم أو نقص الحجم أو hypoxemia أو hypercapnia أو الحمى أو اضطراب نظم؛ التفسير يعتمد على السبب.',
    tags: ['قلب', 'نبض سريع']
  },
  {
    id: 'bradycardia',
    en: 'Bradycardia',
    ar: 'بطء القلب',
    category: 'cardio',
    definition: 'انخفاض معدل ضربات القلب؛ عند البالغ يُستخدم غالبًا HR <60/min كتعريف وصفي.',
    clinicalNote: 'العلاج يعتمد على الأعراض والسبب والاستقرار الديناميكي؛ Atropine أحد الخيارات في symptomatic bradycardia وليس علاجًا تلقائيًا لكل بطء قلب.',
    tags: ['قلب', 'نبض بطيء']
  },
  {
    id: 'arrhythmia',
    en: 'Arrhythmia',
    ar: 'اضطراب نظم القلب',
    category: 'cardio',
    definition: 'اضطراب في توليد أو توصيل النبضات الكهربائية للقلب يؤدي إلى نظم غير طبيعي.',
    clinicalNote: 'حول الجراحة قد تُحفزه hypoxemia أو hypercapnia أو اضطراب الشوارد أو ischemia أو بعض الأدوية؛ العلاج يعتمد على نوع النظم والاستقرار.',
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
    en: 'Myocardial Infarction',
    ar: 'احتشاء عضلة القلب',
    abbr: 'MI',
    category: 'critical',
    definition: 'أذية ونخر في عضلة القلب نتيجة نقص تروية حاد ومستمر مع دليل سريري/مخبري مناسب.',
    clinicalNote: 'في الفترة حول الجراحة يُقيّم عبر الأعراض إن وُجدت وECG وTroponin والسياق الديناميكي والسريري.',
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
    ar: "مؤشر ثنائي الطيف",
    abbr: "BIS",
    category: "abbreviations",
    definition: "مؤشر رقمي مشتق من معالجة إشارات تخطيط الدماغ الجبهي EEG، ويُستخدم كمساعد لتقدير مستوى الوعي والمكوّن المنوِّم أثناء التخدير العام.",
    tags: ["BIS","Bispectral Index","EEG","depth of anesthesia","عمق التخدير","مراقبة الوعي"]
  },
  {
    id: "difficult-intubation-associated-conditions",
    en: "Conditions Associated with Difficult Intubation",
    ar: "الحالات المرتبطة بصعوبة التنبيب",
    category: "surgical",
    definition: "كتل وأورام: Cystic hygroma، Hemangioma، Hematoma.\nالتهابات: Submandibular abscess، Peritonsillar abscess، Epiglottitis.\nتشوهات خلقية وقحفية وجهية: Pierre Robin sequence، Goldenhar syndrome، Craniofacial dysostosis، Laryngeal atresia.\nجسم غريب: Foreign body.\nرضوض وحروق: Laryngeal fracture، Mandibular أو Maxillary fracture، Inhalation burn، Cervical spine injury.\nالسمنة والعنق: Obesity، Large neck circumference، Short neck، Inadequate neck extension.\nمحدودية حركة العمود الرقبي: Rheumatoid arthritis، Ankylosing spondylitis، Halo fixation/traction.\nاختلافات تشريحية: Micrognathia، Retrognathia أو محدودية بروز الفك السفلي، Large tongue (Macroglossia)، High-arched palate.",
    tags: ["difficult intubation","difficult airway","صعوبة التنبيب","Cystic hygroma","Hemangioma","Hematoma","Submandibular abscess","Peritonsillar abscess","Epiglottitis","Pierre Robin sequence","Laryngeal atresia","Goldenhar syndrome","Craniofacial dysostosis","Foreign body","Laryngeal fracture","Mandibular fracture","Maxillary fracture","Inhalation burn","Cervical spine injury","Obesity","large neck circumference","Rheumatoid arthritis","Ankylosing spondylitis","Halo fixation","Micrognathia","Retrognathia","Macroglossia","High-arched palate","Short neck"]
  }
,
  {
    id: "anesthesia",
    en: "Anesthesia",
    ar: "التخدير",
    category: "surgical",
    definition: "حالة دوائية مضبوطة تُستخدم لإجراء العمليات والإجراءات، وقد تشمل فقدان الوعي | Unconsciousness، تسكين الألم | Analgesia، فقدان الذاكرة | Amnesia، وتثبيط المنعكسات أو ارتخاء العضلات حسب نوع التخدير.",
    tags: ["anesthesia","general anesthesia","local anesthesia","تخدير"]
  },
  {
    id: "respiration",
    en: "Respiration",
    ar: "التنفس",
    category: "critical",
    definition: "مصطلح يشمل تبادل الغازات واستخدام الأوكسجين | Oxygen وإنتاج ثاني أوكسيد الكربون | Carbon dioxide في الجسم، وليس مجرد حركة الهواء.",
    tags: ["respiration","gas exchange","تنفس"]
  },
  {
    id: "external-respiration",
    en: "External Respiration",
    ar: "التنفس الخارجي",
    category: "critical",
    definition: "تبادل الأوكسجين | Oxygen وثاني أوكسيد الكربون | Carbon dioxide بين الحويصلات الرئوية | Alveoli والدم في الشعيرات الرئوية.",
    tags: ["external respiration","alveoli","gas exchange","تنفس خارجي"]
  },
  {
    id: "internal-respiration",
    en: "Internal Respiration",
    ar: "التنفس الداخلي",
    category: "critical",
    definition: "تبادل الغازات بين الدم والأنسجة واستخدام الخلايا للأوكسجين | Cellular oxygen utilization مع إنتاج ثاني أوكسيد الكربون | Carbon dioxide.",
    tags: ["internal respiration","cellular respiration","تنفس داخلي"]
  },
  {
    id: "ventilation",
    en: "Ventilation",
    ar: "التهوية",
    category: "critical",
    definition: "حركة الهواء إلى داخل الرئتين وخارجهما | Movement of air into and out of the lungs؛ وهي تختلف عن الأكسجة | Oxygenation وتبادل الغازات | Gas exchange.",
    tags: ["ventilation","breathing","تهوية"]
  },
  {
    id: "respiratory-dead-space",
    en: "Respiratory Dead Space",
    ar: "الحيز التنفسي الميت",
    category: "critical",
    definition: "حجم الغاز الذي لا يشارك في تبادل الغازات | Gas exchange؛ يشمل الحيز التشريحي | Anatomic dead space، ويشمل الحيز الفيزيولوجي أيضًا حويصلات مهواة لكن غير مروّاة بشكل كافٍ.",
    tags: ["dead space","anatomic dead space","physiologic dead space","حيز ميت"]
  },
  {
    id: "irv",
    en: "Inspiratory Reserve Volume",
    ar: "حجم احتياطي الشهيق",
    abbr: "IRV",
    category: "abbreviations",
    definition: "أكبر حجم إضافي يمكن استنشاقه بعد شهيق طبيعي | Maximal additional inspired volume after a normal inspiration.",
    tags: ["IRV","lung volume","شهيق"]
  },
  {
    id: "erv",
    en: "Expiratory Reserve Volume",
    ar: "حجم احتياطي الزفير",
    abbr: "ERV",
    category: "abbreviations",
    definition: "أكبر حجم إضافي يمكن إخراجه بعد زفير طبيعي | Maximal additional expired volume after a normal expiration.",
    tags: ["ERV","lung volume","زفير"]
  },
  {
    id: "rv",
    en: "Residual Volume",
    ar: "الحجم المتبقي",
    abbr: "RV",
    category: "abbreviations",
    definition: "حجم الغاز المتبقي في الرئتين بعد أقصى زفير ممكن | Volume remaining after maximal expiration.",
    tags: ["RV","lung volume","حجم متبقي"]
  },
  {
    id: "tlc",
    en: "Total Lung Capacity",
    ar: "السعة الرئوية الكلية",
    abbr: "TLC",
    category: "abbreviations",
    definition: "إجمالي حجم الغاز في الرئتين بعد أقصى شهيق | Maximum lung volume؛ وتساوي مجموع VT + IRV + ERV + RV.",
    tags: ["TLC","lung capacity","سعة الرئة"]
  },
  {
    id: "vital-capacity",
    en: "Vital Capacity",
    ar: "السعة الحيوية",
    abbr: "VC",
    category: "abbreviations",
    definition: "أكبر حجم يمكن إخراجه بعد أقصى شهيق | Maximum volume expired after full inspiration؛ وتساوي تقريبًا IRV + VT + ERV.",
    tags: ["VC","vital capacity","lung volume","سعة حيوية"]
  },
  {
    id: "frc",
    en: "Functional Residual Capacity",
    ar: "السعة المتبقية الوظيفية",
    abbr: "FRC",
    category: "abbreviations",
    definition: "حجم الغاز المتبقي في الرئتين عند نهاية زفير طبيعي | Volume remaining after a normal tidal expiration؛ وتساوي ERV + RV.",
    clinicalNote: "يقل FRC عادةً عند الاستلقاء | Supine position وبعد بدء التخدير العام | General anesthesia، ما قد يزيد قابلية انغلاق المجرى الهوائي وحدوث عدم تطابق V/Q.",
    tags: ["FRC","functional residual capacity","anesthesia","سعة متبقية"]
  },
  {
    id: "fvc",
    en: "Forced Vital Capacity",
    ar: "السعة الحيوية القسرية",
    abbr: "FVC",
    category: "abbreviations",
    definition: "حجم الهواء الذي يمكن إخراجه بقوة وبأقصى سرعة بعد أخذ أقصى شهيق | Forced exhaled volume after maximal inspiration.",
    tags: ["FVC","spirometry","PFT","سعة حيوية قسرية"]
  },
  {
    id: "fev1",
    en: "Forced Expiratory Volume in One Second",
    ar: "حجم الزفير القسري في ثانية واحدة",
    abbr: "FEV₁",
    category: "abbreviations",
    definition: "حجم الهواء الذي يخرجه المريض خلال أول ثانية من مناورة FVC | First-second forced expiratory volume، ويُستخدم مع FVC لتقييم انسداد مجرى الهواء.",
    tags: ["FEV1","spirometry","obstruction","زفير قسري"]
  },
  {
    id: "rq",
    en: "Respiratory Quotient",
    ar: "الحاصل التنفسي",
    abbr: "RQ",
    category: "abbreviations",
    definition: "نسبة ثاني أوكسيد الكربون المُنتج | CO₂ production إلى الأوكسجين المستهلَك | O₂ consumption أثناء الاستقلاب.",
    tags: ["RQ","metabolism","CO2","O2","حاصل تنفسي"]
  },
  {
    id: "vq-mismatch",
    en: "Ventilation-Perfusion Mismatch",
    ar: "عدم تطابق التهوية والتروية",
    abbr: "V/Q mismatch",
    category: "abbreviations",
    definition: "عدم التوازن بين التهوية السنخية | Alveolar ventilation والتروية الرئوية | Pulmonary perfusion؛ وهو سبب شائع لنقص الأكسجة | Hypoxemia.",
    clinicalNote: "متوسط نسبة V/Q للرئة ككل يقارب 0.8 في الشخص السليم، لكن النسبة تختلف طبيعيًا بين مناطق الرئة.",
    tags: ["VQ","ventilation perfusion","hypoxemia","عدم تطابق التهوية والتروية"]
  }
,
  {
    id: "aspiration",
    en: "Pulmonary Aspiration",
    ar: "الاستنشاق الرئوي",
    category: "critical",
    definition: "دخول محتويات الفم أو المعدة إلى مجرى الهواء والرئتين | Entry of oropharyngeal or gastric contents into the lower respiratory tract.",
    tags: ["aspiration","airway","استنشاق رئوي"]
  },
  {
    id: "regurgitation",
    en: "Regurgitation",
    ar: "القلس / الارتجاع",
    category: "surgical",
    definition: "عودة محتويات المعدة إلى البلعوم أو الفم دون الجهد العضلي المنسق المميز للقيء | Passive return of gastric contents.",
    tags: ["regurgitation","gastric","قلس"]
  },
  {
    id: "laryngospasm",
    en: "Laryngospasm",
    ar: "تشنج الحنجرة",
    category: "critical",
    definition: "انغلاق انعكاسي مستمر للمزمار | Sustained reflex closure of the glottis يسبب انسدادًا جزئيًا أو كاملًا لمجرى الهواء.",
    tags: ["laryngospasm","airway","تشنج الحنجرة"]
  },
  {
    id: "hypoxemia",
    en: "Hypoxemia",
    ar: "نقص أكسجة الدم",
    category: "critical",
    definition: "انخفاض الأوكسجين في الدم الشرياني | Abnormally low arterial blood oxygen.",
    tags: ["hypoxemia","oxygen","PaO2","نقص أكسجة"]
  },
  {
    id: "hypercapnia",
    en: "Hypercapnia",
    ar: "فرط ثاني أوكسيد الكربون في الدم",
    category: "critical",
    definition: "ارتفاع ضغط ثاني أوكسيد الكربون الشرياني | Elevated arterial carbon dioxide tension (PaCO₂).",
    tags: ["hypercapnia","CO2","PaCO2","فرط ثاني اوكسيد الكربون"]
  },
  {
    id: "delayed-emergence",
    en: "Delayed Emergence",
    ar: "تأخر الإفاقة",
    category: "surgical",
    definition: "تأخر عودة الوعي بالمعدل المتوقع بعد إيقاف أدوية التخدير | Delayed recovery of consciousness after anesthesia.",
    tags: ["delayed emergence","recovery","إفاقة"]
  },
  {
    id: "tof",
    en: "Train-of-Four Ratio",
    ar: "نسبة قطار الأربع نبضات",
    abbr: "TOF",
    category: "abbreviations",
    definition: "قياس كمي للتعافي العصبي العضلي | Quantitative neuromuscular recovery assessment؛ نسبة الاستجابة الرابعة إلى الأولى في تحفيز Train-of-Four.",
    tags: ["TOF","neuromuscular monitoring","reversal","مرخيات"]
  },
  {
    id: "massive-transfusion",
    en: "Massive Transfusion",
    ar: "النقل الدموي الكبير",
    category: "critical",
    definition: "إعطاء كميات كبيرة من مكونات الدم بسرعة بسبب نزف شديد | Rapid replacement of a major proportion of blood volume with blood components.",
    tags: ["massive transfusion","blood","hemorrhage","نقل دم"]
  },
  {
    id: "coagulopathy",
    en: "Coagulopathy",
    ar: "اعتلال التخثر",
    category: "critical",
    definition: "اضطراب في قدرة الدم على التخثر بصورة طبيعية | Impaired blood coagulation.",
    tags: ["coagulopathy","bleeding","clotting","تخثر"]
  },
  {
    id: "hypocalcemia",
    en: "Hypocalcemia",
    ar: "نقص كالسيوم الدم",
    category: "critical",
    definition: "انخفاض تركيز الكالسيوم في الدم | Low blood calcium؛ ويُراقب الكالسيوم المتأين | Ionized calcium خصوصًا في النقل الدموي الكبير.",
    tags: ["hypocalcemia","calcium","transfusion","كالسيوم"]
  },
  {
    id: "trali",
    en: "Transfusion-Related Acute Lung Injury",
    ar: "الأذية الرئوية الحادة المرتبطة بنقل الدم",
    abbr: "TRALI",
    category: "abbreviations",
    definition: "وذمة رئوية غير قلبية حادة مرتبطة زمنيًا بنقل الدم | Acute noncardiogenic pulmonary edema associated with transfusion.",
    tags: ["TRALI","transfusion","lung injury","نقل دم"]
  },
  {
    id: "taco",
    en: "Transfusion-Associated Circulatory Overload",
    ar: "الحمل الدوراني الزائد المرتبط بنقل الدم",
    abbr: "TACO",
    category: "abbreviations",
    definition: "حمل حجمي زائد | Volume overload مرتبط بنقل الدم يسبب احتقانًا ووذمة رئوية قلبية المنشأ.",
    tags: ["TACO","transfusion","volume overload","نقل دم"]
  },
  {
    id: "sinus-bradycardia",
    en: "Sinus Bradycardia",
    ar: "بطء القلب الجيبي",
    category: "cardio",
    definition: "نظم جيبي بمعدل قلب منخفض | Sinus rhythm with a low heart rate بالنسبة للعمر والسياق السريري.",
    tags: ["sinus bradycardia","bradycardia","ECG","بطء القلب"]
  },
  {
    id: "sinus-tachycardia",
    en: "Sinus Tachycardia",
    ar: "تسرع القلب الجيبي",
    category: "cardio",
    definition: "نظم جيبي بمعدل قلب مرتفع | Sinus rhythm with an increased heart rate بالنسبة للعمر والسياق السريري.",
    tags: ["sinus tachycardia","tachycardia","ECG","تسرع القلب"]
  },
  {
    id: "shock",
    en: "Circulatory Shock",
    ar: "الصدمة الدورانية",
    category: "critical",
    definition: "فشل دوراني حاد يسبب نقص تروية الأنسجة وعدم كفاية توصيل الأوكسجين | Acute circulatory failure with tissue hypoperfusion.",
    tags: ["shock","perfusion","صدمة"]
  },
  {
    id: "hypovolemic-shock",
    en: "Hypovolemic Shock",
    ar: "صدمة نقص حجم الدم",
    category: "critical",
    definition: "صدمة ناتجة عن نقص الحجم داخل الأوعية | Shock caused by critical loss of intravascular volume.",
    tags: ["hypovolemic shock","hemorrhage","volume","صدمة"]
  },
  {
    id: "distributive-shock",
    en: "Distributive Shock",
    ar: "الصدمة التوزيعية",
    category: "critical",
    definition: "صدمة ناتجة أساسًا عن توسع وعائي وسوء توزيع الجريان | Shock caused by pathologic vasodilation and maldistribution of blood flow.",
    tags: ["distributive shock","sepsis","anaphylaxis","صدمة"]
  },
  {
    id: "cardiogenic-shock",
    en: "Cardiogenic Shock",
    ar: "الصدمة القلبية",
    category: "critical",
    definition: "صدمة ناتجة عن فشل القلب كمضخة | Shock caused by primary failure of cardiac output.",
    tags: ["cardiogenic shock","heart failure","صدمة"]
  },
  {
    id: "obstructive-shock",
    en: "Obstructive Shock",
    ar: "الصدمة الانسدادية",
    category: "critical",
    definition: "صدمة بسبب عائق ميكانيكي أمام امتلاء القلب أو إخراج الدم | Shock from mechanical obstruction to cardiac filling or outflow.",
    tags: ["obstructive shock","tamponade","tension pneumothorax","صدمة"]
  },
  {
    id: "cardiac-tamponade",
    en: "Cardiac Tamponade",
    ar: "اندكاك القلب",
    category: "critical",
    definition: "ضغط السائل أو الدم داخل التامور على القلب بما يعيق امتلاءه | Pericardial pressure impairing cardiac filling.",
    tags: ["cardiac tamponade","pericardium","obstructive shock","اندكاك"]
  },
  {
    id: "tension-pneumothorax",
    en: "Tension Pneumothorax",
    ar: "استرواح الصدر الضاغط",
    category: "critical",
    definition: "تجمع هواء تحت ضغط في الحيز الجنبي يضغط الرئة ويقلل العود الوريدي | Pressurized pleural air causing respiratory and hemodynamic compromise.",
    tags: ["tension pneumothorax","obstructive shock","pleura","استرواح"]
  }
,
  {
    id: "apl",
    en: "Adjustable Pressure-Limiting Valve",
    ar: "صمام تحديد الضغط القابل للضبط",
    abbr: "APL",
    category: "abbreviations",
    definition: "صمام في دائرة التخدير يحدد ضغط الدائرة ويسمح بخروج الغاز الزائد إلى نظام التخلص | Scavenging أثناء الوضع اليدوي/التلقائي.",
    clinicalNote: "يُعرف أيضًا بـ Pop-off valve. وضعه ووظيفته العملية تختلف حسب نمط الجهاز؛ في كثير من المحطات الحديثة يُعزل عن الدائرة أثناء التهوية الميكانيكية.",
    tags: ["APL","pop-off","breathing circuit","صمام"]
  },
  {
    id: "hme",
    en: "Heat and Moisture Exchanger",
    ar: "مبادل الحرارة والرطوبة",
    abbr: "HME",
    category: "abbreviations",
    definition: "جهاز يوضع في دائرة التنفس يحتفظ بجزء من حرارة ورطوبة الزفير ويعيدهما مع الشهيق | Passive humidification.",
    clinicalNote: "قد يزيد المقاومة والحيز الميت | Dead space، لذلك اختيار الحجم والموديل مهم خصوصًا للأطفال.",
    tags: ["HME","humidification","airway","ترطيب"]
  },
  {
    id: "ett",
    en: "Endotracheal Tube",
    ar: "الأنبوب الرغامي",
    abbr: "ETT",
    category: "abbreviations",
    definition: "أنبوب يمر عبر الحنجرة إلى الرغامى لتأمين مجرى الهواء والتهوية وحماية الرئة في الحالات المناسبة.",
    clinicalNote: "تأكيد موضعه يعتمد على waveform capnography المستمرة مع التقييم السريري، وليس على SpO₂ وحده.",
    tags: ["ETT","intubation","airway","انبوب رغامي"]
  },
  {
    id: "opa",
    en: "Oropharyngeal Airway",
    ar: "مجرى هوائي فموي بلعومي",
    abbr: "OPA",
    category: "abbreviations",
    definition: "مجرى هوائي صلب يُستخدم لمنع اللسان من سد البلعوم عند المريض فاقد الوعي المناسب.",
    clinicalNote: "لا يُستخدم عند وجود منعكس قيء فعال | Intact gag reflex لأنه قد يسبب قيئًا أو تشنجًا حنجريًا.",
    tags: ["OPA","Guedel","airway","مجرى هوائي"]
  },
  {
    id: "sga",
    en: "Supraglottic Airway",
    ar: "جهاز مجرى هوائي فوق المزمار",
    abbr: "SGA",
    category: "abbreviations",
    definition: "جهاز مجرى هوائي يستقر فوق المزمار | Above the glottis لتسهيل التهوية، ومن أمثلته LMA.",
    clinicalNote: "قد يكون مجرى هوائي أساسيًا أو إنقاذيًا لكنه لا يساوي الأنبوب الرغامي ذي الكفة في حماية الرئة من الاستنشاق.",
    tags: ["SGA","LMA","airway","supraglottic"]
  },
  {
    id: "bvm",
    en: "Bag-Valve-Mask",
    ar: "كيس-صمام-قناع للتهوية",
    abbr: "BVM",
    category: "abbreviations",
    definition: "جهاز يدوي ذاتي الانتفاخ لتقديم تهوية بالضغط الإيجابي عبر قناع أو مجرى هوائي متقدم.",
    clinicalNote: "نجاحه يعتمد على فتح مجرى الهواء وإحكام القناع ومراقبة ارتفاع الصدر؛ الضغط المفرط قد يزيد نفخ المعدة وخطر aspiration.",
    tags: ["BVM","Ambu","manual ventilation","انعاش"]
  },
  {
    id: "csf",
    en: "Cerebrospinal Fluid",
    ar: "السائل الدماغي الشوكي",
    abbr: "CSF",
    category: "abbreviations",
    definition: "سائل يحيط بالدماغ والحبل الشوكي ويوجد في الحيز تحت العنكبوتية | Subarachnoid space.",
    clinicalNote: "في التخدير النخاعي | Spinal anesthesia تُحقن الأدوية داخل الـCSF في الحيز تحت العنكبوتية.",
    tags: ["CSF","spinal","subarachnoid","سائل شوكي"]
  },
  {
    id: "ippv",
    en: "Intermittent Positive-Pressure Ventilation",
    ar: "التهوية المتقطعة بالضغط الإيجابي",
    abbr: "IPPV",
    category: "abbreviations",
    definition: "تهوية ميكانيكية أو يدوية تُدخل الغاز إلى الرئتين بضغط إيجابي خلال الشهيق.",
    clinicalNote: "المصطلح تاريخي وشائع في المذكرات؛ في الاستخدام الحديث يُوصف نمط التهوية بدقة أكبر حسب جهاز التنفس والإعدادات.",
    tags: ["IPPV","ventilation","positive pressure","تهوية"]
  },
  {
    id: "nibp",
    en: "Non-Invasive Blood Pressure",
    ar: "قياس ضغط الدم غير الباضع",
    abbr: "NIBP",
    category: "abbreviations",
    definition: "قياس ضغط الدم بواسطة كفة خارجية دون قثطار شرياني | Non-invasive cuff blood pressure.",
    clinicalNote: "يجب اختيار كفة بالحجم الصحيح؛ الكفة الصغيرة تميل لقراءات أعلى والكبيرة جدًا قد تعطي قراءات أقل.",
    tags: ["NIBP","blood pressure","monitoring","ضغط"]
  },
  {
    id: "ecg",
    en: "Electrocardiogram / Electrocardiography",
    ar: "تخطيط القلب الكهربائي",
    abbr: "ECG",
    category: "abbreviations",
    definition: "تسجيل النشاط الكهربائي للقلب عبر أقطاب سطحية | Surface electrodes.",
    clinicalNote: "مراقبة ECG مستمرة جزء من المراقبة الأساسية أثناء التخدير العام، لكن ECG لا يقيس النتاج القلبي أو التروية مباشرة.",
    tags: ["ECG","EKG","cardiac monitoring","تخطيط قلب"]
  },
  {
    id: "etco2",
    en: "End-Tidal Carbon Dioxide",
    ar: "ثاني أوكسيد الكربون في نهاية الزفير",
    abbr: "EtCO₂",
    category: "abbreviations",
    definition: "تركيز أو ضغط CO₂ المقاس في نهاية الزفير | End of expiration ويُعرض غالبًا مع موجة capnography.",
    clinicalNote: "مفيد لتقييم التهوية وللتأكيد المستمر على موضع ETT؛ لا يساوي PaCO₂ دائمًا وقد تتسع الفجوة في اضطرابات التروية الرئوية.",
    tags: ["EtCO2","capnography","CO2","monitoring"]
  },
  {
    id: "ponv",
    en: "Postoperative Nausea and Vomiting",
    ar: "الغثيان والقيء بعد العملية",
    abbr: "PONV",
    category: "abbreviations",
    definition: "الغثيان و/أو القيء خلال الفترة بعد الجراحة والتخدير | Postoperative period.",
    clinicalNote: "الوقاية تُبنى على عوامل الخطورة ويُفضّل الجمع بين تدخلات/أدوية من آليات مختلفة عند المرضى عاليي الخطورة.",
    tags: ["PONV","nausea","vomiting","postoperative"]
  },
  {
    id: "rsi",
    en: "Rapid Sequence Induction and Intubation",
    ar: "البدء في التخدير والتنبيب التسلسلي السريع",
    abbr: "RSI",
    category: "abbreviations",
    definition: "طريقة سريعة ومخططة لبدء التخدير باستعمال دواء سريع ومرخٍ عضلي سريع ثم تأمين Cuffed ETT بأقصر وقت ممكن لتقليل خطر aspiration.",
    clinicalNote: "تُستخدم خصوصًا عند الصيام غير الكافي أو غير المعروف وعند ارتفاع خطر aspiration مثل بعض العمليات الطارئة أو انسداد الأمعاء. تشمل عادة preoxygenation وتجهيز suction وخطة مجرى هوائي بديلة؛ Cricoid pressure والتهوية بالقناع وNG tube ليست خطوات ثابتة لكل مريض.",
    tags: ["RSI","rapid sequence","aspiration","intubation"]
  },
  {
    id: "pacu",
    en: "Post-Anesthesia Care Unit",
    ar: "وحدة العناية بعد التخدير / الإفاقة",
    abbr: "PACU",
    category: "abbreviations",
    definition: "منطقة مراقبة وتعافي المريض بعد التخدير حتى استقرار مجرى الهواء والتنفس والدورة الدموية والوعي والألم.",
    clinicalNote: "معايير الخروج تعتمد على بروتوكول المؤسسة وقد تستخدم Modified Aldrete Score مع الحكم السريري.",
    tags: ["PACU","recovery","post anesthesia","افاقة"]
  },
  {
    id: "last",
    en: "Local Anesthetic Systemic Toxicity",
    ar: "السمية الجهازية للمخدر الموضعي",
    abbr: "LAST",
    category: "abbreviations",
    definition: "سمية عصبية و/أو قلبية وعائية نتيجة وصول تركيز سام من المخدر الموضعي إلى الدوران.",
    clinicalNote: "الاشتباه المبكر مهم؛ التدبير يشمل إيقاف الحقن ودعم مجرى الهواء والدورة الدموية وعلاج الاختلاجات واستخدام IV lipid emulsion في الحالات المهمة وفق بروتوكول LAST.",
    tags: ["LAST","local anesthetic","toxicity","lipid emulsion"]
  },
  {
    id: "dic",
    en: "Disseminated Intravascular Coagulation",
    ar: "التخثر المنتشر داخل الأوعية",
    abbr: "DIC",
    category: "abbreviations",
    definition: "اضطراب شديد في التخثر يحدث فيه تنشيط جهازي للتخثر مع استهلاك الصفائح وعوامل التخثر وقد يؤدي إلى نزف وخثرات معًا.",
    clinicalNote: "قد يظهر في الإنتان الشديد أو الرضوض أو المضاعفات التوليدية وغيرها؛ العلاج يركز على السبب ودعم مكونات الدم حسب النزف والاختبارات.",
    tags: ["DIC","coagulopathy","bleeding","تخثر"]
  },
  {
    id: "ga",
    en: "General Anesthesia",
    ar: "التخدير العام",
    abbr: "GA",
    category: "abbreviations",
    definition: "حالة دوائية قابلة للعكس تتضمن فقدان الوعي مع مكونات أخرى حسب الحاجة مثل analgesia وamnesia وimmobility.",
    tags: ["GA","general anesthesia","تخدير عام"]
  },
  {
    id: "ra",
    en: "Regional Anesthesia",
    ar: "التخدير الإقليمي",
    abbr: "RA",
    category: "abbreviations",
    definition: "تخدير منطقة من الجسم عبر حصر عصب أو ضفيرة أو تقنية محورية عصبية مثل spinal أو epidural.",
    tags: ["RA","regional anesthesia","nerve block","spinal","epidural"]
  }
,
  {
    id: "preload",
    en: "Preload",
    ar: "الحمل القبلي",
    category: "cardio",
    definition: "درجة امتلاء وتمدد البطين في نهاية الانبساط قبل الانقباض | Ventricular filling/stretch at end-diastole.",
    clinicalNote: "يتأثر بحجم الدم والعود الوريدي والامتثال البطيني؛ لا يساوي CVP بصورة مباشرة في كل الحالات.",
    tags: ["preload","venous return","cardiac","حمل قبلي"]
  },
  {
    id: "afterload",
    en: "Afterload",
    ar: "الحمل البعدي",
    category: "cardio",
    definition: "المقاومة أو الحمل الذي يجب على البطين التغلب عليه لقذف الدم | Load opposing ventricular ejection.",
    clinicalNote: "في البطين الأيسر يرتبط بمقاومة الأوعية وضغط الأبهر وهندسة البطين، وليس SVR وحدها.",
    tags: ["afterload","SVR","cardiac","حمل بعدي"]
  },
  {
    id: "inotrope",
    en: "Inotrope",
    ar: "دواء مؤثر في قوة انقباض القلب",
    category: "cardio",
    definition: "عامل يزيد أو يقلل قوة انقباض عضلة القلب | Myocardial contractility.",
    clinicalNote: "Dobutamine مثال positive inotrope؛ أما beta-blockers فلها negative inotropic effect.",
    tags: ["inotrope","contractility","dobutamine","قوة الانقباض"]
  },
  {
    id: "chronotrope",
    en: "Chronotrope",
    ar: "عامل مؤثر في معدل القلب",
    category: "cardio",
    definition: "عامل يزيد أو يقلل معدل ضربات القلب | Heart rate.",
    clinicalNote: "Positive chronotropy يرفع HR وnegative chronotropy يخفضه.",
    tags: ["chronotrope","heart rate","HR","نبض"]
  },
  {
    id: "vasopressor",
    en: "Vasopressor",
    ar: "رافع ضغط / قابض وعائي",
    category: "pharmacology",
    definition: "دواء يرفع ضغط التروية غالبًا عبر زيادة التقبض الوعائي، وقد تكون له تأثيرات قلبية إضافية | Drug used to raise arterial pressure.",
    clinicalNote: "اختيار vasopressor يعتمد على آلية الصدمة؛ Norepinephrine ليس مكافئًا آليًا لـPhenylephrine أو Ephedrine.",
    tags: ["vasopressor","shock","blood pressure","رافع ضغط"]
  },
  {
    id: "bronchodilator",
    en: "Bronchodilator",
    ar: "موسع القصبات",
    category: "pharmacology",
    definition: "دواء يرخّي العضلات الملساء في الشعب الهوائية ويقلل bronchoconstriction | Airway smooth-muscle relaxation.",
    clinicalNote: "أمثلة: Salbutamol عبر β2، وIpratropium عبر muscarinic blockade؛ الآليات ليست واحدة.",
    tags: ["bronchodilator","bronchospasm","salbutamol","موسع قصبات"]
  },
  {
    id: "anxiolysis",
    en: "Anxiolysis",
    ar: "إزالة / تخفيف القلق",
    category: "pharmacology",
    definition: "تقليل القلق والتوتر دوائيًا أو بوسائل غير دوائية دون اشتراط فقدان الوعي | Reduction of anxiety.",
    clinicalNote: "Midazolam قد يوفر anxiolysis وamnesia لكنه لا يوفر analgesia.",
    tags: ["anxiolysis","anxiety","midazolam","قلق"]
  },
  {
    id: "premedication-term",
    en: "Premedication",
    ar: "أدوية ما قبل التخدير",
    category: "pharmacology",
    definition: "أدوية أو تدخلات تُعطى قبل التخدير لتحقيق أهداف محددة مثل anxiolysis أو PONV prophylaxis أو تقليل aspiration risk عند المختارين.",
    clinicalNote: "لا توجد قائمة ثابتة يجب إعطاؤها لكل مريض؛ تُفرد حسب عوامل الخطر.",
    tags: ["premedication","preoperative","قبل التخدير"]
  },
  {
    id: "extravasation",
    en: "Extravasation",
    ar: "تسرّب الدواء خارج الوعاء",
    category: "critical",
    definition: "تسرب محلول أو دواء من الوريد إلى الأنسجة المحيطة | Leakage of infusate into surrounding tissue.",
    clinicalNote: "الأهمية تعتمد على الدواء؛ vasopressors وCalcium chloride وبعض الأدوية قد تسبب ischemia أو tissue necrosis.",
    tags: ["extravasation","IV","tissue injury","تسرب"]
  },
  {
    id: "tachyphylaxis",
    en: "Tachyphylaxis",
    ar: "تناقص سريع في الاستجابة للدواء",
    category: "pharmacology",
    definition: "انخفاض سريع في الاستجابة بعد جرعات متكررة خلال مدة قصيرة | Rapidly diminishing drug response.",
    clinicalNote: "قد تُلاحظ مع Ephedrine بسبب استنزاف norepinephrine من النهايات العصبية.",
    tags: ["tachyphylaxis","ephedrine","tolerance","تحمل"]
  },
  {
    id: "mu-opioid-receptor",
    en: "Mu Opioid Receptor",
    ar: "مستقبل ميو الأفيوني",
    abbr: "μ",
    category: "abbreviations",
    definition: "مستقبل أفيوني رئيسي مسؤول عن analgesia ومعه آثار مثل respiratory depression وmiosis وeuphoria وGI hypomotility.",
    clinicalNote: "Morphine وFentanyl وRemifentanil تعمل أساسًا كـμ-opioid agonists.",
    tags: ["mu","opioid receptor","fentanyl","morphine"]
  },
  {
    id: "kappa-opioid-receptor",
    en: "Kappa Opioid Receptor",
    ar: "مستقبل كابا الأفيوني",
    abbr: "κ",
    category: "abbreviations",
    definition: "مستقبل أفيوني يشارك في analgesia والتأثيرات العصبية مثل dysphoria/sedation بحسب الناهض والسياق.",
    tags: ["kappa","opioid receptor","analgesia"]
  },
  {
    id: "delta-opioid-receptor",
    en: "Delta Opioid Receptor",
    ar: "مستقبل دلتا الأفيوني",
    abbr: "δ",
    category: "abbreviations",
    definition: "أحد مستقبلات الأفيونات | Opioid receptors ويشارك في تعديل الألم ووظائف عصبية متعددة.",
    tags: ["delta","opioid receptor","analgesia"]
  },
  {
    id: "dka",
    en: "Diabetic Ketoacidosis",
    ar: "الحماض الكيتوني السكري",
    abbr: "DKA",
    category: "abbreviations",
    definition: "طارئ استقلابي يتميز بفرط كيتونات وحماض استقلابي مع نقص فعالية الإنسولين | Hyperketonemia and metabolic acidosis due to insulin deficiency.",
    clinicalNote: "العلاج يعتمد على fluids + insulin + potassium/electrolyte monitoring ومعالجة السبب.",
    tags: ["DKA","diabetes","ketones","acidosis"]
  },
  {
    id: "hhs",
    en: "Hyperosmolar Hyperglycemic State",
    ar: "حالة فرط سكر الدم مفرطة الأسمولية",
    abbr: "HHS",
    category: "abbreviations",
    definition: "طارئ سكري يتميز بفرط سكر وأسمولية شديدين مع dehydration، عادةً دون ketoacidosis شديد.",
    clinicalNote: "تصحيح السوائل والأسمولية يحتاج تدرجًا؛ جرعة insulin الأولية تختلف عن DKA غير المختلط.",
    tags: ["HHS","diabetes","hyperosmolar","hyperglycemia"]
  },
  {
    id: "svt",
    en: "Supraventricular Tachycardia",
    ar: "تسرع القلب فوق البطيني",
    abbr: "SVT",
    category: "abbreviations",
    definition: "مجموعة من اضطرابات النظم السريعة التي تنشأ فوق البطينين | Tachyarrhythmias originating above the ventricles.",
    clinicalNote: "العلاج يعتمد على نوع النظم والاستقرار؛ Adenosine مناسب فقط لبعض tachycardias المنتظمة المعتمدة على AV node.",
    tags: ["SVT","tachycardia","adenosine","arrhythmia"]
  },
  {
    id: "vf",
    en: "Ventricular Fibrillation",
    ar: "الرجفان البطيني",
    abbr: "VF",
    category: "abbreviations",
    definition: "نشاط بطيني فوضوي دون نتاج قلبي فعال | Chaotic ventricular electrical activity without effective cardiac output.",
    clinicalNote: "VF rhythm قابل للصدمات | Shockable rhythm ويتطلب defibrillation + CPR وفق خوارزمية cardiac arrest.",
    tags: ["VF","ventricular fibrillation","cardiac arrest","defibrillation"]
  },
  {
    id: "af",
    en: "Atrial Fibrillation",
    ar: "الرجفان الأذيني",
    abbr: "AF",
    category: "abbreviations",
    definition: "اضطراب نظم أذيني غير منظم يؤدي عادةً إلى ventricular rhythm غير منتظم | Irregularly irregular rhythm.",
    clinicalNote: "غياب P waves المنتظمة شائع؛ العلاج يعتمد على الاستقرار ومعدل البطين والمدة وخطر الخثار.",
    tags: ["AF","atrial fibrillation","arrhythmia","ECG"]
  },
  {
    id: "av-block",
    en: "Atrioventricular Block",
    ar: "حصار أذيني بطيني",
    abbr: "AV block",
    category: "abbreviations",
    definition: "تأخر أو انقطاع انتقال النبض الكهربائي من الأذين إلى البطين عبر AV conduction system.",
    clinicalNote: "الدرجة الأولى والثانية والثالثة تختلف في الخطورة والعلاج؛ بعض الأدوية مثل Adenosine قد تسبب block عابرًا.",
    tags: ["AV block","heart block","ECG","conduction"]
  },
  {
    id: "pvc",
    en: "Premature Ventricular Complex",
    ar: "ضربة / مركب بطيني مبكر",
    abbr: "PVC",
    category: "abbreviations",
    definition: "نبضة بطينية مبكرة تنشأ من البطين قبل موعد النبضة المتوقعة | Premature ventricular depolarization.",
    clinicalNote: "قد تكون معزولة وحميدة أو علامة على hypoxia/electrolyte disturbance/ischemia حسب السياق.",
    tags: ["PVC","ectopic","ventricular","ECG"]
  },
  {
    id: "nsaid",
    en: "Nonsteroidal Anti-Inflammatory Drug",
    ar: "دواء مضاد للالتهاب غير ستيرويدي",
    abbr: "NSAID",
    category: "abbreviations",
    definition: "فئة مسكنة ومضادة للالتهاب تعمل أساسًا عبر تثبيط cyclooxygenase وتقليل prostaglandins.",
    clinicalNote: "قد تزيد خطر GI bleeding وrenal injury وcardiovascular events؛ الاختيار حول الجراحة يعتمد على المريض.",
    tags: ["NSAID","diclofenac","analgesia","anti-inflammatory"]
  },
  {
    id: "cabg",
    en: "Coronary Artery Bypass Grafting",
    ar: "جراحة مجازة الشريان التاجي",
    abbr: "CABG",
    category: "abbreviations",
    definition: "جراحة إنشاء مسار بديل لتروية عضلة القلب حول تضيق/انسداد الشرايين التاجية | Surgical coronary revascularization.",
    tags: ["CABG","cardiac surgery","coronary","جراحة قلب"]
  }
,
  {
    id: 'topical-anesthesia',
    en: 'Topical Anesthesia',
    ar: 'التخدير السطحي',
    category: 'pharmacology',
    definition: 'وضع المخدر الموضعي مباشرة على الجلد أو الغشاء المخاطي لإحداث فقد إحساس موضعي.',
    tags: ['local anesthesia', 'topical', 'موضعي']
  },
  {
    id: 'local-infiltration',
    en: 'Local Infiltration',
    ar: 'الارتشاح الموضعي',
    category: 'pharmacology',
    definition: 'حقن المخدر الموضعي داخل الأنسجة حول موضع الإجراء لإحداث تخدير محدود.',
    tags: ['local anesthesia', 'infiltration', 'موضعي']
  },
  {
    id: 'peripheral-nerve-block',
    en: 'Peripheral Nerve Block',
    ar: 'حصر العصب المحيطي',
    category: 'pharmacology',
    definition: 'حقن مخدر موضعي قرب عصب أو ضفيرة عصبية لمنع نقل الإحساس في المنطقة التي يغذيها.',
    tags: ['regional anesthesia', 'nerve block', 'إقليمي']
  },
  {
    id: 'redistribution',
    en: 'Redistribution',
    ar: 'إعادة التوزيع',
    category: 'pharmacology',
    definition: 'انتقال الدواء من الأنسجة عالية التروية إلى أنسجة أخرى، وقد يساهم في انتهاء التأثير السريري بعد جرعة وريدية مفردة.',
    tags: ['pharmacokinetics', 'distribution', 'دواء']
  },
  {
    id: 'drug-clearance',
    en: 'Clearance',
    ar: 'التصفية الدوائية',
    category: 'pharmacology',
    definition: 'حجم البلازما الذي يُزال منه الدواء بالكامل لكل وحدة زمن.',
    tags: ['pharmacokinetics', 'clearance', 'دواء']
  },
  {
    id: 'fresh-gas-flow',
    en: 'Fresh Gas Flow',
    ar: 'تدفق الغاز الطازج',
    category: 'surgical',
    definition: 'تدفق خليط الغازات الجديد من عربة التخدير إلى دائرة التنفس.',
    tags: ['anesthesia machine', 'flowmeter', 'breathing circuit']
  }
,
  {
    id: 'npo',
    en: 'Nil Per Os',
    ar: 'صيام عن طريق الفم',
    abbr: 'NPO',
    category: 'abbreviations',
    definition: 'تعليمات بعدم تناول الطعام أو الشراب عن طريق الفم خلال فترة محددة قبل الإجراء.',
    clinicalNote: 'مدة الصيام تختلف حسب نوع المادة المتناولة وعمر المريض وتعليمات المؤسسة؛ NPO ليس مدة ثابتة واحدة لكل الحالات.',
    tags: ['NPO', 'fasting', 'preoperative']
  },
  {
    id: 'neuraxial-anesthesia',
    en: 'Neuraxial Anesthesia',
    ar: 'التخدير المحوري العصبي',
    category: 'pharmacology',
    definition: 'تقنيات تخدير أو تسكين حول القناة الشوكية مثل Spinal وEpidural.',
    tags: ['spinal', 'epidural', 'regional anesthesia']
  },
  {
    id: 'refrigeration-analgesia',
    en: 'Refrigeration Analgesia',
    ar: 'Refrigeration Analgesia',
    category: 'pharmacology',
    definition: 'تقنية تاريخية تعتمد على تبريد الأنسجة لتقليل الإحساس بالألم بصورة مؤقتة.',
    clinicalNote: 'وردت ضمن تصنيفات التخدير الموضعي في المصدر؛ استخدامها الحديث محدود مقارنةً بتقنيات التخدير الموضعي والإقليمي الأخرى.',
    tags: ['local anesthesia', 'cooling', 'analgesia']
  }
,
  {
    id: 'junctional-rhythm',
    en: 'Junctional Rhythm',
    ar: 'نظم وصلي',
    category: 'cardio',
    definition: 'نظم ينشأ من منطقة الوصلة الأذينية البطينية | AV junction بدل العقدة الجيبية.',
    clinicalNote: 'يُفسر حسب معدل القلب والسياق السريري وECG، وقد يظهر أثناء التخدير مع تغير النغمة الذاتية أو الأدوية.',
    tags: ['junctional rhythm', 'ECG', 'arrhythmia']
  },
  {
    id: 'ectopic-beat',
    en: 'Ectopic Beat',
    ar: 'ضربة هاجرة / ضربة مبكرة',
    category: 'cardio',
    definition: 'نبضة تنشأ من بؤرة غير العقدة الجيبية | Ectopic focus، وقد تكون أذينية أو بطينية.',
    clinicalNote: 'قد تكون معزولة أو ترتبط بنقص الأكسجة أو اضطراب الشوارد أو التحفيز أو أدوية معينة حسب السياق.',
    tags: ['ectopic beat', 'PAC', 'PVC', 'arrhythmia']
  },
  {
    id: 'wpw',
    en: 'Wolff–Parkinson–White Syndrome',
    ar: 'متلازمة وولف باركنسون وايت',
    abbr: 'WPW',
    category: 'abbreviations',
    definition: 'متلازمة Pre-excitation ناتجة عن مسار توصيل إضافي بين الأذين والبطين.',
    clinicalNote: 'قد ترتبط بنوبات tachyarrhythmia؛ تفسير ECG والعلاج يعتمد على نوع النظم واستقرار المريض.',
    tags: ['WPW', 'pre-excitation', 'arrhythmia', 'ECG']
  },
  {
    id: 'oliguria',
    en: 'Oliguria',
    ar: 'قلة البول',
    category: 'critical',
    definition: 'انخفاض إخراج البول عن المتوقع بالنسبة للوزن والمدة والسياق السريري.',
    clinicalNote: 'لا تُفسر قراءة بول واحدة بمعزل عن volume status، perfusion، renal function، الأدوية ومدة الجراحة.',
    tags: ['oliguria', 'urine output', 'renal', 'shock']
  },
  {
    id: 'cheyne-stokes',
    en: 'Cheyne–Stokes Respiration',
    ar: 'تنفس تشاين–ستوكس',
    category: 'critical',
    definition: 'نمط تنفس دوري يتزايد فيه عمق التنفس تدريجيًا ثم يتناقص ويتبعه توقف تنفس مؤقت | Apnea.',
    tags: ['Cheyne-Stokes', 'respiration', 'apnea']
  },
  {
    id: 'thyrotoxicosis',
    en: 'Thyrotoxicosis',
    ar: 'التسمم الدرقي',
    category: 'critical',
    definition: 'حالة زيادة تأثير هرمونات الغدة الدرقية في الأنسجة، وقد تترافق مع Tachycardia وArrhythmias.',
    tags: ['thyrotoxicosis', 'thyroid', 'tachycardia', 'arrhythmia']
  },
  {
    id: 'subarachnoid-haemorrhage',
    en: 'Subarachnoid Haemorrhage',
    ar: 'نزف تحت العنكبوتية',
    abbr: 'SAH',
    category: 'abbreviations',
    definition: 'نزف في الحيز تحت العنكبوتية حول الدماغ | Subarachnoid space.',
    clinicalNote: 'قد ترافقه تغيرات ECG واضطرابات نظم بسبب الشدة العصبية والكاتيكولامينات.',
    tags: ['SAH', 'subarachnoid hemorrhage', 'neurosurgery', 'arrhythmia']
  }
,
  {
    id: 'pacemaker',
    en: 'Cardiac Pacemaker',
    ar: 'منظم ضربات القلب',
    category: 'cardio',
    definition: 'جهاز يولد نبضات كهربائية للمحافظة على معدل أو نظم القلب عند وجود اضطراب توصيل أو بطء قلب مناسب للاستطباب.',
    clinicalNote: 'في غرفة العمليات يجب الانتباه إلى وظيفة الجهاز والتداخل الكهرومغناطيسي حسب نوع الجراحة والمعدة.',
    tags: ['pacemaker', 'cardiac device', 'bradycardia', 'conduction']
  },
  {
    id: 'catecholamine',
    en: 'Catecholamine',
    ar: 'كاتيكولامين',
    category: 'pharmacology',
    definition: 'مجموعة مواد تشمل Adrenaline وNoradrenaline وDopamine وتؤثر في القلب والأوعية عبر المستقبلات الأدرينرجية.',
    tags: ['catecholamine', 'adrenaline', 'noradrenaline', 'dopamine']
  },
  {
    id: 'electrolyte-imbalance',
    en: 'Electrolyte Imbalance',
    ar: 'اضطراب الشوارد',
    category: 'critical',
    definition: 'اختلال تركيز الشوارد مثل Potassium أو Magnesium أو Calcium، وقد يؤثر في القلب والعضلات والجهاز العصبي.',
    clinicalNote: 'اضطرابات K⁺ وMg²⁺ من الأسباب المهمة القابلة للتصحيح لبعض Arrhythmias حول الجراحة.',
    tags: ['electrolytes', 'potassium', 'magnesium', 'arrhythmia']
  },
  {
    id: 'acid-base-disturbance',
    en: 'Acid–Base Disturbance',
    ar: 'اضطراب التوازن الحمضي القاعدي',
    category: 'critical',
    definition: 'اختلال في pH بسبب اضطراب تنفسي أو استقلابي | Respiratory / metabolic acid–base disorder.',
    clinicalNote: 'قد يؤثر في الاستجابة للأدوية والشوارد ووظيفة القلب، ويُفسر مع غازات الدم والسياق السريري.',
    tags: ['acid base', 'pH', 'ABG', 'arrhythmia']
  }
,
  {
    id: 'septic-shock',
    en: 'Septic Shock',
    ar: 'الصدمة الإنتانية',
    category: 'critical',
    definition: 'شكل شديد من Sepsis يتميز باضطراب دوراني واستقلابي مستمر يؤدي إلى نقص تروية الأنسجة.',
    clinicalNote: 'تُصنف ضمن Distributive shock، ويعتمد التدبير على علاج العدوى ودعم التروية والديناميكا الدموية.',
    tags: ['septic shock', 'sepsis', 'distributive shock']
  },
  {
    id: 'neurogenic-shock',
    en: 'Neurogenic Shock',
    ar: 'الصدمة العصبية',
    category: 'critical',
    definition: 'صدمة توزيعية ناتجة عن فقدان النغمة الودية، وقد تحدث بعد أذية عالية للحبل الشوكي.',
    clinicalNote: 'قد تترافق مع Hypotension وBradycardia بدل التسرع المعتاد في أنواع أخرى من الصدمة.',
    tags: ['neurogenic shock', 'spinal cord injury', 'distributive shock']
  },
  {
    id: 'massive-pulmonary-embolism',
    en: 'Massive Pulmonary Embolism',
    ar: 'انصمام رئوي ضخم',
    category: 'critical',
    definition: 'انسداد مهم في الدوران الرئوي بسبب خثرة يؤدي إلى إجهاد البطين الأيمن واضطراب ديناميكي دموي.',
    clinicalNote: 'قد يسبب Obstructive shock ويحتاج تقييمًا وعلاجًا إسعافيًا حسب الاستقرار.',
    tags: ['pulmonary embolism', 'PE', 'obstructive shock']
  },
  {
    id: 'cardiac-valve-disease',
    en: 'Valvular Heart Disease',
    ar: 'مرض صمامات القلب',
    category: 'cardio',
    definition: 'تضيق أو قصور في صمام قلبي يغير تدفق الدم والتحميل القلبي.',
    clinicalNote: 'الأهداف التخديرية تختلف باختلاف الصمام وشدة الآفة ووظيفة البطين.',
    tags: ['valvular heart disease', 'cardiac', 'valve']
  }
,
  {
    id: 'aspiration-pneumonitis',
    en: 'Aspiration Pneumonitis',
    ar: 'التهاب رئوي كيميائي بسبب الاستنشاق',
    category: 'critical',
    definition: 'أذية التهابية كيميائية للرئة بعد دخول محتويات معدية إلى المجرى التنفسي.',
    clinicalNote: 'التدبير الأساسي داعم لمجرى الهواء والأكسجة والتهوية؛ Antibiotics لا تُعطى روتينيًا ما لم توجد دلائل عدوى أو تطور مناسب لـAspiration pneumonia.',
    tags: ['aspiration pneumonitis', 'aspiration', 'airway', 'lung']
  },
  {
    id: 'airway-obstruction',
    en: 'Airway Obstruction',
    ar: 'انسداد مجرى الهواء',
    category: 'critical',
    definition: 'انسداد جزئي أو كامل يمنع مرور الهواء عبر مجرى التنفس.',
    clinicalNote: 'قد يبقى جهد التنفس موجودًا رغم غياب تدفق الهواء، لذلك Airway obstruction لا يساوي Apnea.',
    tags: ['airway obstruction', 'airway', 'ventilation']
  },
  {
    id: 'cyanosis',
    en: 'Cyanosis',
    ar: 'الزرقة',
    category: 'critical',
    definition: 'تلون مزرق للجلد أو الأغشية المخاطية مرتبط بزيادة الهيموغلوبين غير المؤكسج.',
    clinicalNote: 'علامة متأخرة وغير حساسة لنقص الأكسجة، وقد تكون أقل وضوحًا في Anemia؛ لا تُستخدم بدل Pulse oximetry.',
    tags: ['cyanosis', 'hypoxemia', 'oxygenation']
  }
,
  {
    id: 'cardiac-output',
    en: 'Cardiac Output',
    ar: 'النتاج القلبي',
    abbr: 'CO',
    category: 'cardio',
    definition: 'كمية الدم التي يضخها القلب في الدقيقة | Heart rate × stroke volume.',
    clinicalNote: 'يتأثر بمعدل القلب وPreload وAfterload وContractility، لذلك تفسيره يعتمد على الحالة الديناميكية كاملة.',
    tags: ['cardiac output', 'CO', 'hemodynamics']
  },
  {
    id: 'contractility',
    en: 'Cardiac Contractility',
    ar: 'قوة انقباض القلب',
    category: 'cardio',
    definition: 'قدرة عضلة القلب الذاتية على توليد قوة انقباض عند ظروف تحميل معينة.',
    clinicalNote: 'Positive inotropes مثل Dobutamine قد تزيد Contractility والنتاج القلبي في حالات مختارة.',
    tags: ['contractility', 'inotrope', 'cardiac output']
  },
  {
    id: 'svr',
    en: 'Systemic Vascular Resistance',
    ar: 'المقاومة الوعائية الجهازية',
    abbr: 'SVR',
    category: 'cardio',
    definition: 'المقاومة التي يواجهها تدفق الدم في الدوران الجهازي.',
    clinicalNote: 'تتأثر بتقبض وتوسع الأوعية، وتمثل جزءًا مهمًا من Afterload على البطين الأيسر.',
    tags: ['SVR', 'afterload', 'vascular resistance']
  },
  {
    id: 'hepatic-encephalopathy',
    en: 'Hepatic Encephalopathy',
    ar: 'الاعتلال الدماغي الكبدي',
    category: 'critical',
    definition: 'اضطراب عصبي معرفي مرتبط بخلل كبدي شديد أو تحويلات بابية جهازية.',
    clinicalNote: 'المهدئات والأفيونات قد تطيل أو تفاقم اضطراب الوعي عند بعض مرضى الكبد، لذلك تُعاير بحذر.',
    tags: ['hepatic encephalopathy', 'liver disease', 'CNS']
  },
  {
    id: 'hyperdynamic-circulation',
    en: 'Hyperdynamic Circulation',
    ar: 'الدورة الدموية مفرطة الديناميكية',
    category: 'cardio',
    definition: 'نمط دوري يتميز غالبًا بارتفاع Cardiac output وانخفاض SVR.',
    clinicalNote: 'قد يُشاهد في تليف الكبد المتقدم وبعض حالات Sepsis.',
    tags: ['hyperdynamic circulation', 'cardiac output', 'SVR', 'cirrhosis']
  }

];

export const SUX_APNOEA_DATA = {
  title: 'Suxamethonium Apnoea',
  subtitle: 'التشخيص والتدبير عند إطالة الحصار بسبب نقص Butyrylcholinesterase',
  drugName: 'Suxamethonium / Succinylcholine',
  classification: {
    group: 'Muscle Relaxants',
    depolarizing: 'Depolarizing neuromuscular blocker',
    nonDepolarizing: 'Non-depolarizing neuromuscular blockers',
    drugPosition: 'Suxamethonium هو مرخٍ عضلي مزيل للاستقطاب سريع البدء وقصير المفعول عادةً، ويُستقلب في البلازما بواسطة Butyrylcholinesterase.'
  },
  whatHappens: {
    phenomenon: 'Prolonged neuromuscular blockade after Suxamethonium',
    description: 'عند نقص أو خلل Butyrylcholinesterase قد يطول الشلل العضلي وانقطاع النفس بعد Suxamethonium أو Mivacurium. المدة تختلف حسب شدة النقص ونوعه، وغالبًا تكون لساعات بدل المدة القصيرة المعتادة.'
  },
  theCause: {
    enzyme: 'Butyrylcholinesterase / Pseudocholinesterase',
    role: 'إنزيم بلازمي يُصنّع في الكبد ويسهم في التحلل السريع لـSuxamethonium وMivacurium.',
    reason: 'النقص قد يكون وراثيًا أو مكتسبًا. يُشتبه به عند حدوث حصار مطول غير متوقع، ويمكن دعمه بقياس نشاط الإنزيم وDibucaine number عندما تتوفر الفحوصات.'
  },
  clinicalDetection: {
    when: 'متى نشتبه بالحالة؟',
    signs: [
      'استمرار انقطاع النفس | Apnea أو عدم كفاية التنفس بعد الوقت المتوقع لزوال تأثير Suxamethonium أو Mivacurium.',
      'استمرار الضعف أو الشلل العضلي مع تأخر استعادة الوظيفة العصبية العضلية.',
      'المراقبة العصبية العضلية | Neuromuscular monitoring تساعد على متابعة عودة الاستجابة.'
    ],
    immediateAction: 'الحفاظ على مجرى الهواء والتهوية الميكانيكية مع تهدئة كافية حتى عودة الوظيفة العصبية العضلية والتنفس التلقائي بصورة آمنة.'
  },
  treatmentProtocol: [
    {
      id: 'supportive-care',
      title: '1. التهوية والتهدئة حتى التعافي',
      details: 'التدبير القياسي هو دعم التنفس بالتهوية الميكانيكية ومراقبة الحصار العصبي العضلي مع الحفاظ على التهدئة المناسبة حتى يحدث التعافي التلقائي.',
      crucialRule: 'لا يُنزع الأنبوب الرغامي قبل عودة تهوية وحماية مجرى الهواء وتعافٍ عصبي عضلي كافٍ.',
      ruleReason: 'المريض قد يستعيد الوعي قبل عودة القوة العضلية؛ لذلك يجب منع الوعي أثناء الشلل والمحافظة على الأكسجة والتهوية.'
    },
    {
      id: 'diagnosis-followup',
      title: '2. تأكيد التشخيص والتخطيط للمستقبل',
      details: 'يمكن قياس نشاط Butyrylcholinesterase وDibucaine number، ويجب توثيق الحالة وتجنب Suxamethonium وMivacurium مستقبلًا عند ثبوت النقص.',
      crucialRule: 'FFP أو نقل الدم ليس علاجًا روتينيًا موصى به لعكس الحصار.',
      ruleReason: 'الدعم بالتهوية والتهدئة حتى التعافي أكثر أمانًا عادةً من نقل البلازما، التي تحمل مخاطر نقل الدم ولا توجد جرعة معيارية موثوقة منها لعكس الحصار.'
    }
  ]
};

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'q1',
    question: 'ما هو المقصود بمصطلح Metabolism في علم الأدوية؟',
    options: [
      'التغير الكيميائي للدواء داخل الجسم بواسطة إنزيمات، غالبًا في الكبد',
      'زيادة سرعة دقات القلب فقط',
      'إعطاء الدواء عن طريق الوريد',
      'تخزين الدواء في الأنسجة دون تغيير'
    ],
    correctIndex: 0,
    explanation: 'Metabolism هو التحول الكيميائي للدواء بواسطة إنزيمات الجسم، وغالبًا يحدث في الكبد، وقد ينتج مستقلبات أكثر أو أقل نشاطًا أو أسهل في الإطراح.'
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
    question: 'ما هو التدبير الأساسي عند حدوث حصار عضلي مطول بسبب نقص Butyrylcholinesterase؟',
    options: [
      'نقل FFP بصورة روتينية لكل مريض',
      'التهوية الميكانيكية مع التهدئة والمراقبة حتى التعافي التلقائي',
      'إعطاء جرعة إضافية من Suxamethonium',
      'إعطاء مدر بول لتسريع الإطراح'
    ],
    correctIndex: 1,
    explanation: 'التدبير الأساسي هو دعم التهوية والحفاظ على التهدئة ومراقبة عودة الوظيفة العصبية العضلية حتى التعافي. نقل FFP ليس علاجًا روتينيًا موصى به.'
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
    question: 'أي اختصار يشير إلى Malignant Hyperthermia؟',
    options: [
      'MI',
      'MH',
      'IM',
      'IV'
    ],
    correctIndex: 1,
    explanation: 'MH = Malignant Hyperthermia. التشخيص لا يعتمد على تجاوز درجة حرارة رقمًا واحدًا فقط، بل على مجموعة علامات سريرية واستقلابية أثناء أو بعد التعرض لعوامل محفزة.'
  }
];

export const CLINICAL_SCENARIO: SimulationStep[] = [
  {
    stepNumber: 1,
    title: 'Prolonged Apnoea بعد Suxamethonium',
    situation: 'انتهت العملية بعد استخدام Suxamethonium للتنبيب، لكن المريض لا يزال في Apnoea مع ضعف/شلل عضلي بعد الوقت المتوقع لزوال تأثير الدواء.',
    question: 'ما الإجراء الفوري الأكثر أمانًا؟',
    options: [
      {
        text: 'نزع الأنبوب الرغامي فورًا',
        isCorrect: false,
        feedback: 'غير صحيح؛ يجب استمرار تأمين مجرى الهواء والتهوية حتى عودة الوظيفة العصبية العضلية بصورة كافية.'
      },
      {
        text: 'استمرار التهوية الميكانيكية مع التهدئة والمراقبة العصبية العضلية',
        isCorrect: true,
        feedback: 'صحيح؛ الدعم التنفسي والتهدئة حتى التعافي التلقائي هما أساس التدبير.'
      },
      {
        text: 'إعطاء جرعة إضافية من Suxamethonium',
        isCorrect: false,
        feedback: 'غير صحيح؛ جرعة إضافية قد تطيل الحصار.'
      }
    ]
  },
  {
    stepNumber: 2,
    title: 'تحديد السبب المحتمل',
    situation: 'تستمر استجابة TOF بالضعف بعد استبعاد أسباب واضحة أخرى مثل جرعة أفيونية زائدة أو hypothermia أو اضطراب شوارد مهم.',
    question: 'ما السبب الذي يجب التفكير به بعد Suxamethonium أو Mivacurium؟',
    options: [
      {
        text: 'Butyrylcholinesterase deficiency',
        isCorrect: true,
        feedback: 'صحيح؛ النقص قد يكون وراثيًا أو مكتسبًا ويؤدي إلى إطالة الحصار العصبي العضلي.'
      },
      {
        text: 'ارتفاع ضغط الدم وحده',
        isCorrect: false,
        feedback: 'لا يفسر استمرار الحصار العصبي العضلي.'
      },
      {
        text: 'نقص الحديد وحده',
        isCorrect: false,
        feedback: 'ليس تفسيرًا نموذجيًا للحصار المطول بعد هذه الأدوية.'
      }
    ]
  },
  {
    stepNumber: 3,
    title: 'التدبير حتى التعافي',
    situation: 'المريض مستقر لكنه لا يزال يحتاج تهوية بسبب استمرار الحصار العصبي العضلي.',
    question: 'ما التدبير الصحيح؟',
    options: [
      {
        text: 'استمرار التهوية والتهدئة ومراقبة عودة القوة والتنفس حتى التعافي',
        isCorrect: true,
        feedback: 'صحيح؛ هذا هو التدبير القياسي. يمكن تأكيد التشخيص لاحقًا بقياس نشاط Butyrylcholinesterase وDibucaine number عند توفرهما.'
      },
      {
        text: 'إعطاء FFP بصورة روتينية لعكس الحصار',
        isCorrect: false,
        feedback: 'غير صحيح كعلاج روتيني؛ نقل البلازما يحمل مخاطر ولا توجد جرعة معيارية موثوقة لعكس الحصار، والدعم حتى التعافي هو النهج المعتاد.'
      },
      {
        text: 'إعطاء مدر بول لتسريع التخلص من Suxamethonium',
        isCorrect: false,
        feedback: 'غير صحيح؛ المشكلة الأساسية هي التحلل الإنزيمي البطيء وليست نقص الإطراح الكلوي.'
      }
    ]
  }
];
