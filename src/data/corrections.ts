export type CorrectionCategory =
  | 'drug'
  | 'equipment'
  | 'airway'
  | 'monitoring'
  | 'fluids'
  | 'perioperative';

export interface ScientificCorrection {
  id: string;
  titleAr: string;
  titleEn: string;
  category: CorrectionCategory;
  categoryAr: string;
  sourceLabel: string;
  sourceLocation: string;
  sourceClaim: string;
  correction: string;
  whyItMatters: string;
  evidenceBasis: string;
  tags: string[];
}

export const CORRECTION_FILTERS: Array<{ id: 'all' | CorrectionCategory; label: string }> = [
  { id: 'all', label: 'الكل' },
  { id: 'drug', label: 'أدوية' },
  { id: 'equipment', label: 'أجهزة' },
  { id: 'airway', label: 'مجرى الهواء' },
  { id: 'monitoring', label: 'مراقبة' },
  { id: 'fluids', label: 'سوائل' },
  { id: 'perioperative', label: 'حول العملية' }
];

export const SCIENTIFIC_CORRECTIONS: ScientificCorrection[] = [
  {
    id: 'adenosine-receptor-dose',
    titleAr: 'أدينوسين: المستقبل والجرعة',
    titleEn: 'Adenosine receptor and adult ACLS dose',
    category: 'drug',
    categoryAr: 'أدوية',
    sourceLabel: 'أدوية الطوارئ 2021',
    sourceLocation: 'القسم [1]',
    sourceClaim: 'ذُكر أنه يعمل على α1 receptor وأن التسلسل يبدأ بـ3 mg ثم 6 mg ثم 12 mg.',
    correction: 'Adenosine يعمل أساسًا عبر A1 adenosine receptors في AV node. في خوارزمية AHA 2025 للبالغ: 6 mg rapid IV push ثم 12 mg إذا لزم.',
    whyItMatters: 'الخلط بين α1 وA1 يغيّر فهم الآلية، والجرعة القديمة قد تؤخر العلاج أو تسبب ارتباكًا في ACLS.',
    evidenceBasis: 'AHA 2025 Adult Tachyarrhythmia With a Pulse Algorithm.',
    tags: ['adenosine','A1','SVT','ACLS']
  },
  {
    id: 'atropine-bradycardia-dose',
    titleAr: 'أتروبين: جرعة بطء القلب للبالغ',
    titleEn: 'Atropine adult symptomatic bradycardia dose',
    category: 'drug',
    categoryAr: 'أدوية',
    sourceLabel: 'أدوية الطوارئ 2021',
    sourceLocation: 'القسم [7]',
    sourceClaim: 'ذُكرت جرعة 0.5 mg IV للبالغ.',
    correction: 'خوارزمية AHA 2025 تستخدم 1 mg IV bolus، تُكرر كل 3–5 دقائق حتى حد أقصى 3 mg.',
    whyItMatters: 'هذه جرعة إنعاشية متغيرة مع الإرشادات ويجب عدم حفظ رقم قديم.',
    evidenceBasis: 'AHA 2025 Adult Bradycardia With a Pulse Algorithm.',
    tags: ['atropine','bradycardia','ACLS']
  },
  {
    id: 'adrenaline-anaphylaxis-route',
    titleAr: 'أدرينالين في التأق: IM أولًا',
    titleEn: 'Adrenaline in anaphylaxis: IM first-line',
    category: 'drug',
    categoryAr: 'أدوية',
    sourceLabel: 'أدوية الطوارئ 2021',
    sourceLocation: 'القسم [2]',
    sourceClaim: 'عُرض IV adrenaline كجرعة عامة للتأق.',
    correction: 'للبالغ في anaphylaxis: Adrenaline 0.5 mg IM من محلول 1 mg/mL في الفخذ هو الخط الأول، ويُكرر بعد 5 دقائق عند استمرار ABC compromise. IV adrenaline يُحجز لخبراء في بيئة مراقبة للحالات المقاومة.',
    whyItMatters: 'أخطاء الطريق والتركيز في Adrenaline قد تسبب arrhythmia، severe hypertension أو myocardial ischemia.',
    evidenceBasis: 'Resuscitation Council UK 2025 anaphylaxis guidance; current resuscitation practice.',
    tags: ['adrenaline','epinephrine','anaphylaxis','IM']
  },
  {
    id: 'dopamine-renal-dose',
    titleAr: 'دوبامين: لا يوجد “Renal dose” لحماية الكلية',
    titleEn: 'Dopamine: low-dose renal protection is obsolete',
    category: 'drug',
    categoryAr: 'أدوية',
    sourceLabel: 'أدوية الطوارئ 2021',
    sourceLocation: 'القسم [13]',
    sourceClaim: 'ذُكر low-dose dopamine للمحافظة على urine output.',
    correction: 'Low-dose dopamine لا يُستخدم لمنع أو علاج acute kidney injury ولا لتحسين المآل الكلوي. استعماله الحالي يكون لأهداف ديناميكية محددة مثل symptomatic bradycardia أو بعض حالات shock.',
    whyItMatters: 'رفع urine output دوائيًا لا يعني تحسن renal perfusion أو kidney outcome وقد يزيد arrhythmias.',
    evidenceBasis: 'Modern critical-care/AKI guidance and AHA bradycardia use of dopamine infusion.',
    tags: ['dopamine','renal dose','AKI','urine output']
  },
  {
    id: 'hydrocortisone-anaphylaxis',
    titleAr: 'هيدروكورتيزون ليس علاج التأق الأول',
    titleEn: 'Hydrocortisone is not first-line anaphylaxis therapy',
    category: 'drug',
    categoryAr: 'أدوية',
    sourceLabel: 'أدوية الطوارئ 2021',
    sourceLocation: 'القسم [21]',
    sourceClaim: 'أُدرج Hydrocortisone ضمن علاج allergy بصورة توحي بأنه علاج إسعافي أساسي.',
    correction: 'Adrenaline IM هو العلاج الأول للتأق. Steroids لا تعالج airway/circulatory compromise سريعًا ولا تُستخدم بدل Adrenaline.',
    whyItMatters: 'الاعتماد على steroid قد يؤخر الدواء المنقذ للحياة.',
    evidenceBasis: 'Current anaphylaxis resuscitation guidance.',
    tags: ['hydrocortisone','anaphylaxis','steroid','adrenaline']
  },
  {
    id: 'diltiazem-p-wave',
    titleAr: 'AF وSVT: موجة P ليست قاعدة واحدة',
    titleEn: 'AF and SVT ECG distinction',
    category: 'drug',
    categoryAr: 'أدوية',
    sourceLabel: 'أدوية الطوارئ 2021',
    sourceLocation: 'القسم [11]',
    sourceClaim: 'ذُكر أن AF وSVT كلاهما لا توجد فيهما P wave.',
    correction: 'في AF لا توجد P waves منتظمة ويكون rhythm عادة irregularly irregular. أما SVT فهو مصطلح واسع وقد تكون P waves مخفية أو retrograde أو ظاهرة حسب نوع الـSVT.',
    whyItMatters: 'التشخيص والعلاج يعتمدان على نوع rhythm وليس قاعدة “P موجودة/غير موجودة” فقط.',
    evidenceBasis: 'Standard ECG electrophysiology and ACLS rhythm classification.',
    tags: ['AF','SVT','P wave','ECG']
  },
  {
    id: 'rocuronium-vagal-renal',
    titleAr: 'روكورونيوم: لا Vagolysis نموذجية ولا منع مطلق في الفشل الكلوي',
    titleEn: 'Rocuronium cardiovascular and renal-use correction',
    category: 'drug',
    categoryAr: 'أدوية',
    sourceLabel: 'أدوية الطوارئ 2021 + ملف كتابة أدوية التخدير',
    sourceLocation: 'القسم [28] + صفحة 6',
    sourceClaim: 'وُصف بأنه يسبب vagal blockade مع زيادة النبض، وأنه لا يستخدم في renal failure.',
    correction: 'Rocuronium له cardiovascular effects محدودة عادةً وليس vagolytic مثل Pancuronium. Renal failure ليس contraindication مطلقًا، لكن مدة الحصار قد تتغير ويجب استخدام quantitative neuromuscular monitoring.',
    whyItMatters: 'المنع غير المبرر قد يحرم المريض من خيار مناسب، بينما تجاهل طول الحصار قد يؤدي residual paralysis.',
    evidenceBasis: 'Contemporary neuromuscular-blocker pharmacology and monitoring standards.',
    tags: ['rocuronium','renal failure','vagal','NMB']
  },
  {
    id: 'sux-burn-window',
    titleAr: 'سكساميثونيوم والحروق: ليس قانون 24 ساعة دقيقًا',
    titleEn: 'Succinylcholine after burns and denervation',
    category: 'drug',
    categoryAr: 'أدوية',
    sourceLabel: 'أدوية الطوارئ 2021',
    sourceLocation: 'القسم [29]',
    sourceClaim: 'ذُكر أنه مسموح في الحروق فقط خلال أول 24 ساعة.',
    correction: 'الملصق يحظر Succinylcholine بعد المرحلة الحادة من major burns، multiple trauma، extensive denervation أو UMN injury بسبب خطر hyperkalemia. الخطر يزداد مع الزمن ويبلغ ذروته غالبًا 7–10 أيام، وبداية/نهاية فترة الخطر ليست رقمًا ثابتًا.',
    whyItMatters: 'الاعتماد على cutoff زمني صلب قد يكون غير آمن.',
    evidenceBasis: 'Current Succinylcholine prescribing information.',
    tags: ['succinylcholine','suxamethonium','burns','hyperkalemia']
  },
  {
    id: 'metoclopramide-secretions',
    titleAr: 'ميتوكلوبراميد لا “يجفف الإفرازات”',
    titleEn: 'Metoclopramide is not an antisialagogue',
    category: 'drug',
    categoryAr: 'أدوية',
    sourceLabel: 'ملف كتابة أدوية التخدير',
    sourceLocation: 'صفحة 13',
    sourceClaim: 'ذُكر ضمن استعمالاته تجفيف الإفرازات.',
    correction: 'Metoclopramide هو antiemetic/prokinetic وليس antimuscarinic antisialagogue. تجفيف الإفرازات وظيفة أدوية مثل Glycopyrrolate أو Atropine عند وجود indication.',
    whyItMatters: 'الخلط بين الفئات يؤدي إلى اختيار دواء لا يحقق الهدف.',
    evidenceBasis: 'Current Metoclopramide prescribing information and pharmacology.',
    tags: ['metoclopramide','secretions','antiemetic','prokinetic']
  },
  {
    id: 'propofol-asthma',
    titleAr: 'الربو ليس مانعًا روتينيًا للبروبوفول',
    titleEn: 'Asthma is not a routine propofol contraindication',
    category: 'drug',
    categoryAr: 'أدوية',
    sourceLabel: 'ملف كتابة أدوية التخدير',
    sourceLocation: 'صفحة 8',
    sourceClaim: 'ذُكر أن Propofol لا يُستخدم في مرضى الربو لأنه يحرر histamine.',
    correction: 'Asthma ليس contraindication روتينيًا للبروبوفول؛ غالبًا يُستخدم بأمان وقد يخفف airway reactivity مقارنةً بعوامل تحريض أخرى، مع بقاء anaphylaxis نادرة ممكنة.',
    whyItMatters: 'تجنب الدواء دون سبب قد يحد خيارات induction المناسبة.',
    evidenceBasis: 'Contemporary anesthesia pharmacology and propofol safety labeling.',
    tags: ['propofol','asthma','histamine','bronchospasm']
  },
  {
    id: 'remifentanil-receptor-spinal',
    titleAr: 'ريميفنتانيل: μ أساسًا وليس “ممنوعًا مع spinal”',
    titleEn: 'Remifentanil receptor and neuraxial misconception',
    category: 'drug',
    categoryAr: 'أدوية',
    sourceLabel: 'ملف كتابة أدوية التخدير',
    sourceLocation: 'صفحة 21',
    sourceClaim: 'ذُكر أنه يعمل على μ وκ وأن muscle rigidity تعني عدم استخدامه مع spinal anesthesia.',
    correction: 'Remifentanil يعمل أساسًا كـμ-opioid agonist. Muscle/chest-wall rigidity مرتبطة خصوصًا بالجرعات العالية/السريعة، ولا تجعل وجود spinal anesthesia بحد ذاته contraindication.',
    whyItMatters: 'السبب السريري للمحاذير يجب أن يكون respiratory depression/rigidity والمراقبة، لا نوع التخدير الإقليمي وحده.',
    evidenceBasis: 'Contemporary opioid pharmacology.',
    tags: ['remifentanil','mu receptor','spinal','rigidity']
  },
  {
    id: 'ranitidine-status',
    titleAr: 'رانيتيدين: معلومات العبوات القديمة تحتاج تحديثًا',
    titleEn: 'Ranitidine regulatory status changed',
    category: 'drug',
    categoryAr: 'أدوية',
    sourceLabel: 'ملف كتابة أدوية التخدير',
    sourceLocation: 'صفحة 18',
    sourceClaim: 'عُرض Ranitidine injection 50 mg كمستحضر اعتيادي ثابت.',
    correction: 'سُحبت منتجات ranitidine القديمة من السوق الأمريكي في 2020 بسبب NDMA. في نوفمبر 2025 وافقت FDA على reformulated ranitidine tablets بشروط تخزين جديدة؛ لذلك لا تُنقل جرعة أو formulation قديمة تلقائيًا إلى مستحضر حالي.',
    whyItMatters: 'الاسم العلمي نفسه لا يعني أن formulation والتنظيم الحاليين مطابقان للملفات القديمة.',
    evidenceBasis: 'FDA ranitidine safety actions and 2025 reformulated ranitidine approval.',
    tags: ['ranitidine','NDMA','Zantac','regulatory']
  },
  {
    id: 'fluid-deficit-third-space',
    titleAr: 'عجز الصيام وThird space: لا تستخدم الوصفة القديمة تلقائيًا',
    titleEn: 'Fasting deficit and third-space replacement are outdated as fixed recipes',
    category: 'fluids',
    categoryAr: 'سوائل',
    sourceLabel: 'ملف كتابة أدوية التخدير',
    sourceLocation: 'صفحة 32',
    sourceClaim: 'عُرض NPO deficit + تعويض 3:1 بالبلوريات + third-space losses ثابتة حسب نوع العملية.',
    correction: 'الممارسة الحديثة تعتمد individualized euvolemia/near-zero balance؛ لا يُفترض أن الصيام يساوي hypovolemia، ومفهوم fixed third-space replacement تُرك بدرجة كبيرة. تعويض النزف والخسائر يعتمد على السبب والديناميكا الدموية والمختبرات.',
    whyItMatters: 'الوصفات الثابتة قد تسبب fluid overload أو تخفي نقص التروية الحقيقي.',
    evidenceBasis: 'ERAS perioperative fluid recommendations and Fluid Optimization consensus.',
    tags: ['fluids','fasting deficit','third space','3:1','ERAS']
  },
  {
    id: 'd5w-resuscitation',
    titleAr: 'D5W ليس سائل إنعاش حجمي',
    titleEn: 'D5W is not a volume-resuscitation fluid',
    category: 'fluids',
    categoryAr: 'سوائل',
    sourceLabel: 'مبادئ التخدير',
    sourceLocation: 'صفحة 75',
    sourceClaim: 'ذُكر D5W بصورة قد توحي بأنه يزيد حجم الدم ويرفع الضغط كهدف رئيسي.',
    correction: 'بعد استقلاب glucose يتصرف D5W أساسًا كماء حر وينتشر خارج الحيز الوعائي؛ لا يُستخدم كسائل أساسي لإنعاش hypovolemia.',
    whyItMatters: 'اختيار السائل الخطأ قد يفشل في استعادة intravascular volume ويزيد hyponatremia.',
    evidenceBasis: 'Standard IV fluid physiology and current perioperative fluid practice.',
    tags: ['D5W','resuscitation','free water','hypovolemia']
  },
  {
    id: 'hes-modern-use',
    titleAr: 'HES ليس غروانيًا روتينيًا حديثًا',
    titleEn: 'Hydroxyethyl starch is not a routine modern resuscitation colloid',
    category: 'fluids',
    categoryAr: 'سوائل',
    sourceLabel: 'مبادئ التخدير',
    sourceLocation: 'صفحة 76',
    sourceClaim: 'عُرض HES كخيار colloid طويل التأثير بصورة اعتيادية.',
    correction: 'HES ارتبط بأذية الكلى واضطراب التخثر وزيادة المخاطر في مرضى شديدي الخطورة، وخضع لقيود/تعليق تنظيمي في عدة أنظمة صحية.',
    whyItMatters: 'المعلومة التاريخية لا تعكس مكانة HES الحالية في الإنعاش.',
    evidenceBasis: 'Modern safety restrictions and critical-care fluid evidence.',
    tags: ['HES','colloid','kidney injury','coagulopathy']
  },
  {
    id: 'cylinder-colors',
    titleAr: 'لون أسطوانة الغاز ليس وسيلة التعرف الوحيدة',
    titleEn: 'Medical gas cylinder colors are not globally universal',
    category: 'equipment',
    categoryAr: 'أجهزة',
    sourceLabel: 'مبادئ التخدير',
    sourceLocation: 'صفحة 11',
    sourceClaim: 'عُرضت ألوان الأسطوانات كقواعد مباشرة للتعرف على الغاز.',
    correction: 'ألوان الأسطوانات تختلف بين المعايير والبلدان؛ يجب التحقق من label والوصلة المخصصة للغاز مثل Pin Index وليس اللون وحده.',
    whyItMatters: 'الاعتماد على اللون وحده قد يؤدي إلى خطأ غاز خطير.',
    evidenceBasis: 'Modern anesthesia gas-supply safety practice.',
    tags: ['cylinder','gas color','pin index','oxygen']
  },
  {
    id: 'soda-lime-duration',
    titleAr: 'Canister: لا توجد مدة 2/6 ساعات ثابتة',
    titleEn: 'CO₂ absorbent lifespan is not a fixed 2/6-hour rule',
    category: 'equipment',
    categoryAr: 'أجهزة',
    sourceLabel: 'مبادئ التخدير',
    sourceLocation: 'صفحة 15',
    sourceClaim: 'ذُكرت صلاحية 2 ساعات continuous و6 ساعات intermittent.',
    correction: 'عمر absorbent يعتمد على نوع المادة وحجم الحاوية والتهوية وfresh gas flow؛ تُراقب inspired CO₂ وتعليمات الشركة بدل ساعة ثابتة أو اللون وحده.',
    whyItMatters: 'الوقت وحده قد يؤدي إلى تبديل مبكر أو أخطر: الاستمرار بمادة مستنفدة.',
    evidenceBasis: 'Modern circle-system monitoring and manufacturer-specific absorbent guidance.',
    tags: ['soda lime','canister','CO2','capnography']
  },
  {
    id: 'pediatric-cuffed-ett',
    titleAr: 'الأنبوب ذو الكفة عند الأطفال ليس ممنوعًا تحت 8 سنوات',
    titleEn: 'Cuffed ETTs are acceptable in children',
    category: 'airway',
    categoryAr: 'مجرى الهواء',
    sourceLabel: 'مبادئ التخدير',
    sourceLocation: 'الصفحات 21–23',
    sourceClaim: 'عُرضت قاعدة قديمة أن الأطفال دون 8 سنوات يستخدم لهم uncuffed ETT.',
    correction: 'Cuffed pediatric ETTs تُستخدم بأمان وشيوع عند اختيار الحجم المناسب ومراقبة cuff pressure.',
    whyItMatters: 'القواعد العمرية القديمة لا تعكس airway practice الحالية.',
    evidenceBasis: 'Contemporary pediatric airway practice.',
    tags: ['ETT','cuffed','pediatric','intubation']
  },
  {
    id: 'aspiration-antibiotic-steroid',
    titleAr: 'Aspiration pneumonitis: لا Antibiotic/Steroid روتينيًا',
    titleEn: 'Aspiration pneumonitis is primarily supportive',
    category: 'airway',
    categoryAr: 'مجرى الهواء',
    sourceLabel: 'مبادئ التخدير',
    sourceLocation: 'الصفحات 84–85',
    sourceClaim: 'ذُكر إعطاء antibiotics وHydrocortisone بعد aspiration بصورة عامة.',
    correction: 'Chemical aspiration pneumonitis تُعالج أساسًا بدعم airway/oxygenation/ventilation. Antibiotics تُستخدم عند الاشتباه بالعدوى/aspiration pneumonia أو مسار سريري مناسب، والستيرويدات ليست روتينية.',
    whyItMatters: 'العلاج غير الضروري قد يسبب ضررًا ويؤخر دعم التنفس الفعلي.',
    evidenceBasis: 'Current aspiration management guidance.',
    tags: ['aspiration','antibiotics','steroids','pneumonitis']
  },
  {
    id: 'laryngospasm-wait',
    titleAr: 'Laryngospasm لا يُنتظر 20–30 دقيقة',
    titleEn: 'Persistent laryngospasm requires immediate treatment',
    category: 'airway',
    categoryAr: 'مجرى الهواء',
    sourceLabel: 'مبادئ التخدير',
    sourceLocation: 'صفحة 85',
    sourceClaim: 'ورد وصف قد يوحي بأن الحالة قد تستمر 20–30 دقيقة مع التدبير المحافظ.',
    correction: 'Complete/persistent laryngospasm حالة طارئة: إزالة stimulus، 100% O₂، CPAP، jaw thrust، تعميق anesthesia، ثم rapid neuromuscular blocker مثل Succinylcholine إذا لم تنفتح الحنجرة أو بدأ desaturation.',
    whyItMatters: 'التأخير قد يؤدي إلى severe hypoxemia، negative-pressure pulmonary edema أو cardiac arrest.',
    evidenceBasis: 'Current anesthesia airway emergency practice.',
    tags: ['laryngospasm','CPAP','jaw thrust','succinylcholine']
  },
  {
    id: 'extubation-tof',
    titleAr: 'نزع الأنبوب بعد المرخيات: TOF ≥ 0.9',
    titleEn: 'Quantitative neuromuscular recovery before extubation',
    category: 'monitoring',
    categoryAr: 'مراقبة',
    sourceLabel: 'مبادئ التخدير',
    sourceLocation: 'صفحة 91',
    sourceClaim: 'اعتمدت معايير رقمية بسيطة للتنفس دون تأكيد كمي للتعافي العصبي العضلي.',
    correction: 'بعد nondepolarizing neuromuscular blockers يجب استخدام quantitative monitoring والتأكد من TOF ratio ≥0.9 قبل extubation عندما يكون القياس متاحًا.',
    whyItMatters: 'Residual neuromuscular blockade يزيد airway obstruction وhypoxemia ومضاعفات الرئة.',
    evidenceBasis: 'Modern neuromuscular blockade monitoring standards.',
    tags: ['TOF','extubation','neuromuscular block','monitoring']
  }
];
