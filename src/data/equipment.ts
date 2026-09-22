export type EquipmentCategory =
  | 'machine'
  | 'gas-supply'
  | 'breathing'
  | 'airway'
  | 'monitoring'
  | 'tools';

export interface AnesthesiaEquipment {
  id: string;
  nameAr: string;
  nameEn: string;
  category: EquipmentCategory;
  categoryAr: string;
  sourcePages: number[];
  summary: string;
  purpose: string[];
  keyPoints: string[];
  correction?: string;
  tags: string[];
}

export const EQUIPMENT_CATEGORY_LABELS: Record<EquipmentCategory, string> = {
  machine: 'عربة التخدير',
  'gas-supply': 'الغازات والضغط',
  breathing: 'دائرة التنفس',
  airway: 'مجرى الهواء',
  monitoring: 'المراقبة',
  tools: 'أدوات'
};

export const EQUIPMENT_FILTERS: Array<{ id: 'all' | EquipmentCategory; label: string }> = [
  { id: 'all', label: 'الكل' },
  { id: 'machine', label: 'عربة التخدير' },
  { id: 'gas-supply', label: 'الغازات والضغط' },
  { id: 'breathing', label: 'دائرة التنفس' },
  { id: 'airway', label: 'مجرى الهواء' },
  { id: 'monitoring', label: 'المراقبة' },
  { id: 'tools', label: 'أدوات' }
];

export const ANESTHESIA_EQUIPMENT: AnesthesiaEquipment[] = [
  {
    id: 'anesthesia-workstation',
    nameAr: 'عربة التخدير',
    nameEn: 'Anesthesia Machine',
    category: 'machine',
    categoryAr: 'عربة التخدير',
    sourcePages: [10],
    summary: 'منظومة توصيل الغازات والمخدرات الاستنشاقية ودعم التهوية والمراقبة أثناء التخدير.',
    purpose: [
      'توصيل الأوكسجين والغازات الطبية | Medical gas delivery',
      'إعطاء العامل المتطاير بتركيز مضبوط | Volatile anesthetic delivery',
      'التهوية اليدوية أو الميكانيكية | Manual / mechanical ventilation',
      'ربط منظومات المراقبة والشفط | Monitoring / suction integration'
    ],
    keyPoints: [
      'المسار البنائي التقليدي في المصدر: Pipeline / Cylinders → Pressure-reducing valve → Flowmeter → Vaporizer → Anesthetic breathing system.',
      'في المنظومة التقليدية يُخفض ضغط الأسطوانة قبل مقاييس الجريان إلى ضغط عمل يقارب 400 kPa / 4 bar؛ القيمة الفعلية في الأجهزة الحديثة تعتمد على تصميم الشركة والمعيار المحلي.',
      'عربات التخدير الحديثة تجمع دوائر الضغط، جهاز التنفس، المراقبة، أنظمة الإنذار وميزات أمان إلكترونية.',
      'يوجد ضمن منظومة الضغط صمام أمان داخلي | Pressure-relief safety valve لحماية مكونات الجهاز من ارتفاع الضغط. المصدر يصف نموذجًا تقليديًا يفتح قرب 35 kPa في الـback bar، لكن قيمة الفتح تعتمد على تصميم الشركة ولا تُعامل كرقم ثابت لكل الأجهزة.',
      'صمام أمان الجهاز الداخلي يختلف عن صمام APL الموجود في دائرة تنفس المريض.'
    ],
    correction: 'مصطلح عربة بويل | Boyle machine تاريخي؛ الاسم المعتمد هنا للأجهزة الحديثة هو عربة التخدير | Anesthesia Machine.',
    tags: ['machine','workstation','boyle','عربة التخدير','جهاز التخدير']
  },
  {
    id: 'medical-gas-cylinders',
    nameAr: 'أسطوانات الغازات الطبية',
    nameEn: 'Medical Gas Cylinders',
    category: 'gas-supply',
    categoryAr: 'الغازات والضغط',
    sourcePages: [11],
    summary: 'مصدر احتياطي أو مستقل للغازات الطبية مثل الأوكسجين | Oxygen وأوكسيد النيتروز | Nitrous oxide.',
    purpose: [
      'توفير الغاز عند غياب أو فشل شبكة الأنابيب | Pipeline failure backup',
      'تزويد عربة التخدير بغاز طبي مضغوط | Compressed medical gas supply'
    ],
    keyPoints: [
      'المصدر يذكر مخططًا لونيًا/ضغطيًا تقليديًا: O₂ أبيض أو أسود برأس أبيض ≈137 bar عند 15°C، N₂O أزرق ≈54 bar، Medical Air رمادي مع تمييز أبيض/أسود ≈137 bar، Entonox أزرق مع تمييز أبيض/أزرق ≈137 bar، وCO₂ رمادي ≈50 bar.',
      'أسطوانة الأوكسجين E في أنظمة أخرى مثل النظام الأمريكي تكون تقريبًا 2000 psi وتحتوي قرابة 660 L من الأوكسجين، لذلك أرقام الضغط تختلف حسب حجم الأسطوانة والمعيار.',
      'أوكسيد النيتروز | N₂O يُخزن غالبًا كسائل وغاز؛ ضغط الأسطوانة لا يعكس الكمية المتبقية حتى يزول الطور السائل.',
      'ألوان الأسطوانات وضغوط التعبئة ليست معيارًا عالميًا واحدًا؛ التعرف يعتمد على الملصق والموصلات الخاصة بالغاز ولا يعتمد على اللون وحده.',
      'Cyclopropane عامل تخدير تاريخي شديد القابلية للاشتعال والانفجار؛ المصدر يذكره بلون برتقالي وضغط منخفض نسبيًا، لكنه ليس غاز تخدير روتينيًا حديثًا.',
      'نظام فهرس الدبابيس | Pin Index Safety System يقلل خطر تركيب أسطوانة غاز في موضع غاز آخر.'
    ],
    correction: 'ألوان الأسطوانات ليست موحّدة عالميًا. لا تعتمد على اللون وحده؛ تحقق من الملصق ووصلة الغاز الخاصة.',
    tags: ['cylinder','oxygen','nitrous oxide','PISS','اسطوانة','غازات']
  },
  {
    id: 'oxygen-flush-valve',
    nameAr: 'صمام تدفق الأوكسجين السريع',
    nameEn: 'Oxygen Flush Valve',
    category: 'gas-supply',
    categoryAr: 'الغازات والضغط',
    sourcePages: [10],
    summary: 'صمام يمرر تدفقًا عاليًا من الأوكسجين مباشرة إلى مخرج الغاز المشترك متجاوزًا عدادات التدفق والمبخرات.',
    purpose: [
      'إعطاء تدفق أوكسجين مرتفع بسرعة | High-flow oxygen delivery'
    ],
    keyPoints: [
      'يتجاوز Flowmeters وVaporizers عند تشغيله.',
      'في كثير من عربات التخدير يمرر نحو 35–75 L/min من أوكسجين 100% مباشرة إلى دائرة التنفس.'
    ],
    tags: ['oxygen flush', 'oxygen', 'anesthesia machine']
  },
  {
    id: 'oxygen-supply-failure-alarm',
    nameAr: 'إنذار فشل إمداد الأوكسجين',
    nameEn: 'Oxygen Supply Pressure Alarm',
    category: 'gas-supply',
    categoryAr: 'الغازات والضغط',
    sourcePages: [11],
    summary: 'نظام إنذار ينبه عند انخفاض ضغط إمداد الأوكسجين إلى عربة التخدير.',
    purpose: [
      'التحذير المبكر من انخفاض ضغط الأوكسجين | Low O₂ supply pressure',
      'إعطاء الفريق وقتًا للتحول إلى مصدر احتياطي وتصحيح الخلل.'
    ],
    keyPoints: [
      'في التصميم التقليدي الموصوف بالمصدر يجب أن يعتمد التحذير على انخفاض ضغط الأوكسجين نفسه، ويكون مسموعًا وبنغمة مميزة ويعطي إنذارًا قبل الفشل الوشيك.',
      'المصدر القديم يذكر ألا يعتمد الإنذار على البطارية أو الكهرباء الرئيسية؛ عربات التخدير الحديثة قد تستخدم أنظمة إلكترونية مع مصادر طاقة ودوائر أمان احتياطية، لذلك المعيار العملي هو موثوقية الإنذار لا منع الإلكترونيات بحد ذاته.',
      'ترتبط به في عربات التخدير الحديثة منظومات تقلل أو توقف N₂O عند انخفاض ضغط O₂.'
    ],
    correction: 'القول إن جهاز الإنذار يجب ألا يستخدم كهرباء أو بطارية ليس قاعدة عامة للمحطات الحديثة؛ المهم أن يكون نظام الأمان موثوقًا ويكشف انخفاض ضغط الأوكسجين.',
    tags: ['oxygen failure','alarm','fail safe','إنذار','اوكسجين']
  },
  {
    id: 'pressure-regulator',
    nameAr: 'منظم / مخفّض الضغط',
    nameEn: 'Pressure Regulator',
    category: 'gas-supply',
    categoryAr: 'الغازات والضغط',
    sourcePages: [12],
    summary: 'جهاز يخفض الضغط العالي والمتغير من الأسطوانة إلى ضغط عمل أقل وأكثر ثباتًا.',
    purpose: [
      'إعطاء ضغط عمل آمن | Safe working pressure',
      'حماية مكونات عربة التخدير | Equipment protection',
      'تثبيت الضغط لتسهيل التحكم بالتدفق | Stable gas pressure'
    ],
    keyPoints: [
      'يُخفض منظم الأسطوانة ضغط الأوكسجين العالي إلى نحو 45 psi تقريبًا قبل دخوله بقية المنظومة.',
      'ضغط شبكة الأنابيب في كثير من الأنظمة يكون نحو 50-55 psi.'
    ],
    tags: ['regulator','pressure reducing valve','pressure','منظم ضغط']
  },
  {
    id: 'flowmeter',
    nameAr: 'مقياس الجريان',
    nameEn: 'Flowmeter / Rotameter',
    category: 'gas-supply',
    categoryAr: 'الغازات والضغط',
    sourcePages: [13],
    summary: 'يقيس ويضبط تدفق الغاز، تقليديًا بوحدة لتر/دقيقة | L/min.',
    purpose: [
      'ضبط تدفق كل غاز طبي بصورة مستقلة | Gas flow control',
      'تكوين خليط الغاز الطازج | Fresh gas flow mixture'
    ],
    keyPoints: [
      'الروتامتر التقليدي | Rotameter أنبوب مدبب مع عوامة | Float وصمام تحكم.',
      'تُقرأ العوامة من الحافة العلوية للـBobbin، أما العوامة الكروية | Ball فتُقرأ من منتصف الكرة.',
      'يجب أن تكون أنابيب الروتامتر التقليدية عمودية ونظيفة وأن تتحرك العوامة بحرية.',
      'تختلف معايرة مقياس الجريان حسب نوع الغاز بسبب الكثافة | Density واللزوجة | Viscosity.',
      'في التصميم التقليدي تجتمع تدفقات الغازات بعد مقاييس الجريان في مسار مشترك قبل دخول المبخرات.'
    ],
    correction: 'بعض عربات التخدير الحديثة تستخدم حساسات وتحكمًا إلكترونيًا بالتدفق بدل الروتامترات الزجاجية التقليدية.',
    tags: ['flowmeter','rotameter','fresh gas flow','مقياس الجريان']
  },
  {
    id: 'vaporizer',
    nameAr: 'المبخر',
    nameEn: 'Anesthetic Vaporizer',
    category: 'machine',
    categoryAr: 'عربة التخدير',
    sourcePages: [14],
    summary: 'جهاز يحول المخدر المتطاير السائل إلى بخار ويضيف تركيزًا مضبوطًا منه إلى الغاز الطازج.',
    purpose: [
      'إعطاء عوامل التخدير المتطايرة | Volatile anesthetic agents',
      'ضبط تركيز العامل المستنشق | Controlled vapor concentration'
    ],
    keyPoints: [
      'المبخرات الدقيقة التقليدية للعوامل مثل Sevoflurane وIsoflurane غالبًا تكون: Agent-specific، Variable-bypass، Flow-over، Temperature-compensated وOut-of-circuit.',
      'في الـVariable-bypass ينقسم الغاز الطازج بين مسار يتجاوز حجرة التبخير ومسار يمر خلالها ثم يمتزجان من جديد.',
      'Desflurane يحتاج نظام تبخير/مزج خاصًا بسبب ضغط بخاره العالي ونقطة غليانه القريبة من حرارة الغرفة.',
      'التعويض الحراري | Temperature compensation يساعد على ثبات الخرج رغم تغير درجة الحرارة.',
      'الحد الأدنى للتركيز السنخي | Minimum Alveolar Concentration (MAC) مقياس لقوة العامل الاستنشاقي.'
    ],
    correction: 'النسبة التي تمر داخل حجرة التبخير ليست رقمًا ثابتًا مثل 20% لكل المبخرات؛ تتغير باختلاف التصميم والعامل والإعداد والحرارة.',
    tags: ['vaporizer','volatile','MAC','مبخر']
  },
  {
    id: 'co2-absorber',
    nameAr: 'ماص ثاني أوكسيد الكربون',
    nameEn: 'CO₂ Absorber / Canister',
    category: 'breathing',
    categoryAr: 'دائرة التنفس',
    sourcePages: [15],
    summary: 'حاوية تحتوي مادة ماصة لثاني أوكسيد الكربون تسمح بإعادة تنفس الغاز في الدائرة الدائرية بعد إزالة CO₂.',
    purpose: [
      'إزالة ثاني أوكسيد الكربون | CO₂ removal',
      'تقليل هدر الغازات والمخدرات | Reduced gas / anesthetic waste',
      'المساعدة في حفظ الحرارة والرطوبة | Heat / humidity conservation'
    ],
    keyPoints: [
      'جير الصودا التقليدي | Soda lime يتكون أساسًا من هيدروكسيد الكالسيوم | Ca(OH)₂ مع كميات صغيرة من NaOH/KOH وماء ومواد مضافة؛ المصدر يذكر تركيبًا تعليميًا يقارب 90% Ca(OH)₂ ونحو 5% من القلويات، مع Silicates لتقليل تفتت الحبيبات وتحولها إلى غبار.',
      'توجد مواد ماصة حديثة منخفضة القلويات أو خالية من NaOH/KOH لتقليل تفاعلات التحلل مع بعض العوامل الاستنشاقية.',
      'الدليل اللوني | Color indicator مثل Ethyl violet قد يتحول من أبيض إلى بنفسجي مع الاستهلاك.',
      'أفضل علامة عملية على قرب نفاد المادة الماصة هي ارتفاع CO₂ المستنشق | Inspired CO₂ وليس اللون وحده.'
    ],
    correction: 'لا تُحدد صلاحية الـCanister بقاعدة ثابتة مثل ساعتين أو 6 ساعات. العمر يعتمد على نوع المادة، حجمها، التهوية وتدفق الغاز؛ ويجب الاعتماد على مراقبة inspired CO₂ وتعليمات الشركة.',
    tags: ['canister','soda lime','CO2 absorber','جير الصودا']
  },
  {
    id: 'humidification',
    nameAr: 'مرطب غازات التنفس',
    nameEn: 'Humidifier / Heat and Moisture Exchanger',
    category: 'breathing',
    categoryAr: 'دائرة التنفس',
    sourcePages: [16],
    summary: 'وسيلة للمحافظة على رطوبة وحرارة الغاز المستنشق عندما يتم تجاوز وظيفة الأنف الطبيعية.',
    purpose: [
      'تقليل جفاف الإفرازات | Secretion drying',
      'حماية ظهارة المجرى الهوائي | Airway epithelium',
      'تقليل فقد الماء والحرارة | Heat and water loss'
    ],
    keyPoints: [
      'المرطب المسخن | Heated humidifier يضيف بخار الماء للغاز.',
      'مبادل الحرارة والرطوبة | Heat and Moisture Exchanger (HME) يحتفظ بجزء من حرارة ورطوبة الزفير ويعيدها للشهيق.'
    ],
    correction: 'تقطير المحلول الملحي مباشرة داخل الأنبوب الرغامي ليس طريقة روتينية موصى بها لترطيب مجرى الهواء؛ وسائل الترطيب الحديثة هي HME أو المرطب المسخن عند الحاجة.',
    tags: ['humidifier','HME','humidity','ترطيب']
  },
  {
    id: 'simple-face-mask',
    nameAr: 'قناع الوجه البسيط',
    nameEn: 'Simple Face Mask',
    category: 'airway',
    categoryAr: 'مجرى الهواء',
    sourcePages: [17],
    summary: 'قناع أوكسجين منخفض التدفق يوضع على الأنف والفم للمريض الذي يتنفس تلقائيًا.',
    purpose: [
      'إعطاء أوكسجين إضافي | Supplemental oxygen',
      'رفع FiO₂ فوق هواء الغرفة عند المريض القادر على التنفس تلقائيًا.'
    ],
    keyPoints: [
      'يتطلب تدفقًا كافيًا لتقليل إعادة استنشاق CO₂ داخل القناع.',
      'الـFiO₂ الفعلية متغيرة وتعتمد على التدفق ونمط تنفس المريض وتسرب القناع.'
    ],
    tags: ['face mask','oxygen','simple mask','قناع']
  },
  {
    id: 'non-rebreather-mask',
    nameAr: 'قناع عدم إعادة التنفس',
    nameEn: 'Non-Rebreather Mask',
    category: 'airway',
    categoryAr: 'مجرى الهواء',
    sourcePages: [17],
    summary: 'قناع أوكسجين مزود بكيس خزان | Reservoir bag وصمامات تقلل اختلاط الغاز بهواء الغرفة وإعادة استنشاق الزفير.',
    purpose: [
      'إعطاء تركيز مرتفع نسبيًا من الأوكسجين | High-concentration oxygen delivery'
    ],
    keyPoints: [
      'يجب إبقاء كيس الخزان منتفخًا جزئيًا أثناء الاستخدام.',
      'لا يوفر تهوية لمريض متوقف عن التنفس؛ عند غياب التهوية نحتاج دعمًا بالـBag-mask أو مجرى هوائي متقدم.'
    ],
    tags: ['non rebreather','NRB','reservoir mask','قناع عدم اعادة التنفس']
  },
  {
    id: 'nasal-cannula',
    nameAr: 'القنية الأنفية',
    nameEn: 'Nasal Cannula',
    category: 'airway',
    categoryAr: 'مجرى الهواء',
    sourcePages: [17],
    summary: 'وسيلة بسيطة منخفضة التدفق لإعطاء الأوكسجين عبر فتحتي الأنف.',
    purpose: [
      'إعطاء أوكسجين إضافي للمريض المتنفس تلقائيًا | Supplemental oxygen'
    ],
    keyPoints: [
      'الـFiO₂ الناتجة متغيرة وتعتمد على معدل التدفق ونمط التنفس.',
      'تتميز بالراحة وإمكانية الكلام والأكل مقارنةً بالقناع.'
    ],
    tags: ['nasal cannula','oxygen','قنية انفية']
  },
  {
    id: 'tracheostomy-mask',
    nameAr: 'قناع فغر الرغامي',
    nameEn: 'Tracheostomy Mask',
    category: 'airway',
    categoryAr: 'مجرى الهواء',
    sourcePages: [17],
    summary: 'واجهة توصيل أوكسجين ورطوبة توضع فوق فتحة فغر الرغامي | Tracheostomy.',
    purpose: [
      'إعطاء أوكسجين مرطب عبر فغر الرغامي | Humidified oxygen delivery'
    ],
    keyPoints: [
      'الترطيب مهم لأن مجرى الهواء العلوي الطبيعي تم تجاوزه.'
    ],
    tags: ['tracheostomy mask','oxygen','tracheostomy']
  },
  {
    id: 'corrugated-breathing-tube',
    nameAr: 'أنبوب دائرة التنفس المموج',
    nameEn: 'Corrugated Breathing Tube',
    category: 'breathing',
    categoryAr: 'دائرة التنفس',
    sourcePages: [18],
    summary: 'أنبوب مرن يربط أجزاء دائرة التنفس وينقل الغازات بين الجهاز والمريض.',
    purpose: [
      'نقل الغاز في دائرة التخدير | Gas conduction',
      'تقليل الانثناء والانغلاق | Kink resistance'
    ],
    keyPoints: [
      'القطر الشائع في أطراف البالغين نحو 22 mm، وتوجد أحجام أصغر للأطفال.',
      'التعرجات تزيد المرونة وتقلل احتمال انثناء الأنبوب.'
    ],
    correction: 'الطول ليس ثابتًا 100 cm لكل الأنظمة؛ يختلف حسب الدائرة والتصميم.',
    tags: ['corrugated tube','breathing circuit','22 mm','دائرة تنفس']
  },
  {
    id: 'reservoir-bag',
    nameAr: 'كيس الخزان',
    nameEn: 'Reservoir Bag',
    category: 'breathing',
    categoryAr: 'دائرة التنفس',
    sourcePages: [18],
    summary: 'كيس مرن في دائرة التخدير يجمع الغاز ويسمح بمراقبة التنفس والتهوية اليدوية.',
    purpose: [
      'تخزين الغاز الطازج أثناء الزفير | Fresh gas reservoir',
      'المراقبة البصرية للتنفس التلقائي | Visual breathing monitoring',
      'التهوية اليدوية | Manual ventilation'
    ],
    keyPoints: [
      'تتوفر أحجام متعددة؛ كيس 2 L شائع في دوائر البالغين.',
      'الإحساس بحركة الكيس يساعد على تقييم نمط التنفس ومطاوعة الرئة أثناء التهوية اليدوية.'
    ],
    tags: ['reservoir bag','bag','manual ventilation','كيس الخزان']
  },
  {
    id: 'apl-valve',
    nameAr: 'صمام تحديد الضغط القابل للضبط',
    nameEn: 'Adjustable Pressure-Limiting Valve',
    category: 'breathing',
    categoryAr: 'دائرة التنفس',
    sourcePages: [19],
    summary: 'صمام نابضي قابل للضبط يسمح بخروج الغاز ويحدد الضغط المتولد داخل دائرة التخدير أثناء الوضع اليدوي/التلقائي.',
    purpose: [
      'الحد من ضغط الدائرة | Circuit pressure limitation',
      'السماح بخروج الغاز الزائد إلى نظام التخلص | Scavenging'
    ],
    keyPoints: [
      'يُعرف أيضًا بصمام APL أو Pop-off valve.',
      'أثناء التنفس التلقائي يكون عادةً مفتوحًا بدرجة كبيرة ليسمح بخروج الغاز بسهولة؛ المصدر التقليدي يصفه بأنه Fully open.',
      'أثناء التهوية اليدوية يُغلق جزئيًا بالقدر اللازم لتوليد ضغط مناسب مع أقل تسرب ممكن، مع تجنب الضغط الزائد.',
      'أثناء التهوية الميكانيكية في كثير من العربات الحديثة يُعزل APL عن الدائرة تلقائيًا بدل الاعتماد على إغلاقه يدويًا.',
      'APL جزء من دائرة تنفس المريض؛ لا يُخلط مع Pressure-relief safety valve الداخلي لعربة التخدير.'
    ],
    correction: 'عند التهوية الميكانيكية في أجهزة كثيرة يتم عزل APL عن الدائرة بدل اعتباره ببساطة “مغلقًا تمامًا” في كل تصميم.',
    tags: ['APL','pop-off','valve','صمام']
  },
  {
    id: 'mapleson-a',
    nameAr: 'دائرة ماغيل',
    nameEn: 'Mapleson A / Magill Circuit',
    category: 'breathing',
    categoryAr: 'دائرة التنفس',
    sourcePages: [19,20],
    summary: 'دائرة Mapleson A غير معادة للتنفس، وهي من أكثر دوائر Mapleson كفاءة أثناء التنفس التلقائي.',
    purpose: [
      'التخدير مع التنفس التلقائي | Spontaneous ventilation'
    ],
    keyPoints: [
      'يكون صمام APL قريبًا من المريض، بينما مدخل الغاز الطازج والكيس في الطرف الآخر.',
      'لتقليل إعادة استنشاق CO₂ أثناء التنفس التلقائي يحتاج تدفق غاز طازج يقارب التهوية الدقيقة | Minute ventilation.'
    ],
    correction: 'استخدام رقم ثابت مثل 5 L/min لكل مريض غير دقيق؛ المتطلب يرتبط بالتهوية الدقيقة للمريض.',
    tags: ['Mapleson A','Magill','breathing system','دائرة ماغيل']
  },
  {
    id: 'ayre-t-piece',
    nameAr: 'قطعة آير T',
    nameEn: 'Ayre T-Piece / Mapleson E',
    category: 'breathing',
    categoryAr: 'دائرة التنفس',
    sourcePages: [19,20],
    summary: 'دائرة بسيطة منخفضة المقاومة تُستخدم تاريخيًا خصوصًا للأطفال الصغار، ولا تحتوي صمام APL.',
    purpose: [
      'توفير دائرة منخفضة المقاومة | Low-resistance breathing circuit',
      'الاستخدام في الأطفال والرضع في تصاميم مناسبة.'
    ],
    keyPoints: [
      'Mapleson E لا يحتوي كيس خزان أو APL في شكله الأصلي.',
      'أثناء التنفس التلقائي يحتاج Mapleson E/F عادةً Fresh Gas Flow مرتفعًا يقارب 2–3 أضعاف Minute Ventilation لتقليل إعادة استنشاق CO₂.',
      'Jackson-Rees modification يضيف كيسًا مفتوح الذيل ويُصنّف Mapleson F، ويساعد الكيس على مراقبة التنفس وإجراء تهوية مساعدة/مضبوطة.'
    ],
    correction: 'متطلبات تدفق الغاز الطازج تعتمد على نمط التهوية والدائرة؛ لا تُحفظ كرقم واحد ثابت لجميع الحالات.',
    tags: ['Ayre','T-piece','Mapleson E','Jackson Rees','Mapleson F']
  },
  {
    id: 'oropharyngeal-airway',
    nameAr: 'المجرى الهوائي الفموي البلعومي',
    nameEn: 'Oropharyngeal Airway / Guedel Airway',
    category: 'airway',
    categoryAr: 'مجرى الهواء',
    sourcePages: [20],
    summary: 'جهاز صلب منحني يمنع اللسان من سد البلعوم ويساعد على إبقاء المجرى الهوائي مفتوحًا.',
    purpose: [
      'منع انسداد المجرى الهوائي باللسان | Tongue-related airway obstruction',
      'تسهيل التهوية بالقناع والشفط الفموي البلعومي عند المريض المناسب.'
    ],
    keyPoints: [
      'يُستخدم عادةً عند فاقد الوعي أو غياب منعكس البلع/القيء | Gag reflex.',
      'لتقدير الحجم يُمسك الـOPA بجانب الوجه؛ يكون الـFlange عند زاوية الفم ويُفترض أن يصل الطرف تقريبًا إلى زاوية فرع الفك السفلي | Angle of mandibular ramus.',
      'اختيار الحجم الصحيح يقلل خطر دفع اللسان للخلف أو أذية البلعوم.'
    ],
    correction: 'ليس علاجًا لتشنج الحنجرة | Laryngospasm، وقد يثير السعال/القيء أو تشنج الحنجرة إذا استُخدم عند مريض لديه منعكسات مجرى هوائي فعالة.',
    tags: ['OPA','Guedel','airway','مجرى هوائي']
  },
  {
    id: 'endotracheal-tube',
    nameAr: 'الأنبوب الرغامي',
    nameEn: 'Endotracheal Tube',
    category: 'airway',
    categoryAr: 'مجرى الهواء',
    sourcePages: [21,22,23],
    summary: 'أنبوب يمر عبر الحنجرة إلى الرغامى لتأمين مجرى هوائي والتحكم بالتهوية.',
    purpose: [
      'تأمين مجرى هوائي | Definitive airway',
      'التهوية بالضغط الإيجابي | Positive-pressure ventilation',
      'تقليل خطر الاستنشاق الرئوي عند استخدام أنبوب ذي كفة بصورة صحيحة | Aspiration risk reduction',
      'السماح بالشفط الرغامي | Tracheal suction'
    ],
    keyPoints: [
      'الأنواع تشمل: أنبوب ذو كفة | Cuffed ETT، أنبوب غير ذي كفة | Uncuffed ETT، أنبوب مدعم | Reinforced ETT، وأنبوب مزدوج اللمعة | Double-lumen tube.',
      'حجم الأنبوب يُعبّر عنه عادة بالقطر الداخلي | Internal diameter (ID). في البالغ المتوسط تكون أحجام شائعة تقريبًا 7.0–7.5 mm للإناث و7.5–8.5 mm للذكور، مع تعديل الاختيار حسب المريض والإجراء.',
      'الكفة | Cuff توفر إحكامًا للتهوية بالضغط الإيجابي وتقلل تسرب الغاز وتخفض خطر مرور الإفرازات/محتويات المعدة مقارنةً بالأنبوب غير المحكم، لكنها لا تمنع الاستنشاق الرئوي بصورة مطلقة.',
      'التأكيد القياسي المستمر لوضع الأنبوب في الرغامى يعتمد على موجة CO₂ الزفيري المستمرة | Continuous waveform capnography مع التقييم السريري.'
    ],
    correction: 'القاعدة القديمة التي تقول إن الأطفال دون 8 سنوات يجب أن يستخدموا أنبوبًا بدون كفة لم تعد صحيحة؛ الأنابيب ذات الكفة تُستخدم بأمان في الأطفال عند اختيار الحجم وضبط ضغط الكفة بشكل مناسب.',
    tags: ['ETT','endotracheal tube','intubation','cuffed','double lumen','انبوب رغامي']
  },
  {
    id: 'airway-stylet',
    nameAr: 'مشكّل الأنبوب / الستايلت',
    nameEn: 'Endotracheal Tube Stylet',
    category: 'tools',
    categoryAr: 'أدوات',
    sourcePages: [21],
    summary: 'قضيب مرن شبه صلب يُدخل داخل الأنبوب الرغامي لتشكيله وتسهيل توجيهه أثناء التنبيب.',
    purpose: [
      'تشكيل الأنبوب الرغامي | ETT shaping',
      'المساعدة في التنبيب عندما تكون رؤية المزمار محدودة أو زاوية الإدخال صعبة.'
    ],
    keyPoints: [
      'يجب ألا يبرز طرف الـStylet خارج نهاية الأنبوب لتجنب أذية مجرى الهواء.'
    ],
    correction: 'الاسم الصحيح Stylet وليس Stellate.',
    tags: ['stylet','intubation','ETT','ستايلت']
  },
  {
    id: 'magill-forceps',
    nameAr: 'ملقط ماغيل',
    nameEn: 'Magill Forceps',
    category: 'tools',
    categoryAr: 'أدوات',
    sourcePages: [21,24],
    summary: 'ملقط زاوي مصمم للعمل داخل الفم والبلعوم مع بقاء يد المستخدم خارج خط الرؤية.',
    purpose: [
      'توجيه الأنبوب أثناء التنبيب الأنفي | Nasotracheal intubation',
      'إزالة جسم غريب مرئي من الفم أو البلعوم | Foreign body removal',
      'إدخال/إزالة الحشو البلعومي | Pharyngeal packing',
      'المساعدة في توجيه بعض الأنابيب مثل أنبوب المعدة تحت رؤية مباشرة.'
    ],
    keyPoints: [
      'يُستخدم تحت رؤية مباشرة لتقليل أذية الأنسجة.'
    ],
    tags: ['Magill forceps','forceps','nasal intubation','ملقط ماغيل']
  },
  {
    id: 'laryngoscope',
    nameAr: 'منظار الحنجرة',
    nameEn: 'Laryngoscope',
    category: 'airway',
    categoryAr: 'مجرى الهواء',
    sourcePages: [21,24],
    summary: 'أداة لعرض مدخل الحنجرة والمزمار لتسهيل إدخال الأنبوب الرغامي.',
    purpose: [
      'إضاءة وفتح خط الرؤية داخل الفم والبلعوم لرؤية مدخل الحنجرة | Direct laryngoscopy',
      'تسهيل التنبيب الرغامي | Tracheal intubation',
      'تسهيل بعض المناورات داخل البلعوم تحت الرؤية المباشرة.'
    ],
    keyPoints: [
      'يتكون المنظار المباشر التقليدي من مقبض | Handle وشفرة | Blade ومصدر ضوء/مصباح، مع بطارية أو مصدر طاقة داخل المقبض.',
      'الشفرة المنحنية | Curved blade مثل Macintosh والشفرة المستقيمة | Straight blade مثل Miller هما أشهر الأنواع.'
    ],
    tags: ['laryngoscope','Macintosh','Miller','تنبيب','منظار حنجرة']
  },
  {
    id: 'laryngeal-mask-airway',
    nameAr: 'القناع الحنجري',
    nameEn: 'Laryngeal Mask Airway / Supraglottic Airway',
    category: 'airway',
    categoryAr: 'مجرى الهواء',
    sourcePages: [26],
    summary: 'جهاز مجرى هوائي فوق المزمار | Supraglottic airway يستقر أعلى مدخل الحنجرة ولا يدخل داخل الرغامى.',
    purpose: [
      'التهوية في التخدير العام المناسب | Primary airway in selected cases',
      'جهاز إنقاذ عند صعوبة التهوية أو التنبيب | Rescue airway'
    ],
    keyPoints: [
      'تركيبه أسهل عادةً وأقل تحفيزًا من الأنبوب الرغامي.',
      'الأجيال الحديثة قد تحتوي قناة معدية وتحسن إحكام المجرى الهوائي.'
    ],
    correction: 'القناع الحنجري لا يوفر نفس مستوى الحماية من الاستنشاق الرئوي الذي يوفره الأنبوب الرغامي ذو الكفة؛ الاختيار يعتمد على خطر الـAspiration ونوع الإجراء.',
    tags: ['LMA','SGA','supraglottic airway','قناع حنجري']
  },
  {
    id: 'self-inflating-bag',
    nameAr: 'كيس الإنعاش ذاتي الانتفاخ',
    nameEn: 'Self-Inflating Bag / Bag-Valve-Mask',
    category: 'airway',
    categoryAr: 'مجرى الهواء',
    sourcePages: [26],
    summary: 'جهاز يدوي ذاتي الانتفاخ لتقديم تهوية بالضغط الإيجابي للمريض غير المتنفس أو ذي التهوية غير الكافية.',
    purpose: [
      'التهوية اليدوية بالضغط الإيجابي | Manual positive-pressure ventilation.',
      'الإنعاش والطوارئ والنقل | Resuscitation / emergency / transport.',
      'وسيلة احتياطية مستقلة نسبيًا عند فشل جهاز التنفس أو عربة التخدير أو انقطاع مصدر الغاز، مع إمكانية استخدام هواء الغرفة عند عدم توفر O₂.'
    ],
    keyPoints: [
      'يمكن استخدامه مع قناع وجه أو أنبوب رغامي أو جهاز فوق المزمار.',
      'لأنه ذاتي الانتفاخ يستطيع سحب هواء الغرفة إذا لم يتوفر مصدر أوكسجين، لكن يُوصل بالأوكسجين وخزان عند توفرهما لرفع FiO₂.',
      'تحقيق إحكام القناع ومراقبة ارتفاع الصدر أهم من الضغط القوي على الكيس.'
    ],
    tags: ['Ambu','BVM','bag valve mask','انعاش','تهوية يدوية']
  },
  {
    id: 'capnograph',
    nameAr: 'Capnograph',
    nameEn: 'Capnograph / Capnography Monitor',
    category: 'monitoring',
    categoryAr: 'المراقبة',
    sourcePages: [23, 82],
    summary: 'يراقب ثاني أوكسيد الكربون في الزفير ويعرض قيمة EtCO₂ وموجة Capnogram بصورة مستمرة.',
    purpose: [
      'مراقبة التهوية | Ventilation monitoring',
      'تأكيد ومراقبة موضع الأنبوب الرغامي | ETT placement monitoring'
    ],
    keyPoints: [
      'الموجة المستمرة تعطي معلومات عن التهوية والدائرة ومجرى الهواء، وليس رقم EtCO₂ وحده.',
      'تغير شكل الموجة أو اختفاؤها قد يدل على مشكلة في التهوية أو الدائرة أو موضع مجرى الهواء.'
    ],
    tags: ['capnograph', 'capnography', 'EtCO2', 'CO2', 'monitor']
  },
  {
    id: 'ecg-monitor',
    nameAr: 'ECG',
    nameEn: 'Electrocardiography Monitor',
    category: 'monitoring',
    categoryAr: 'المراقبة',
    sourcePages: [82],
    summary: 'مراقبة النشاط الكهربائي للقلب ومعدل النبض أثناء التخدير.',
    purpose: [
      'مراقبة معدل ونظم القلب | Heart rate / rhythm monitoring',
      'كشف اضطرابات النظم | Arrhythmia detection'
    ],
    keyPoints: [
      'اختيار Lead المناسب يعتمد على الهدف السريري.',
      'ECG يراقب النشاط الكهربائي ولا يقيس النتاج القلبي أو التروية مباشرة.'
    ],
    tags: ['ECG', 'EKG', 'cardiac monitor', 'arrhythmia']
  },
  {
    id: 'nibp-monitor',
    nameAr: 'NIBP',
    nameEn: 'Non-Invasive Blood Pressure Monitor',
    category: 'monitoring',
    categoryAr: 'المراقبة',
    sourcePages: [82],
    summary: 'يقيس ضغط الدم بطريقة غير باضعة باستخدام كفة مناسبة للحجم.',
    purpose: [
      'متابعة ضغط الدم أثناء التخدير | Blood pressure monitoring'
    ],
    keyPoints: [
      'اختيار حجم الكفة ووضعها الصحيحان مهمان لدقة القراءة.',
      'تكرار القياس يحدد حسب الحالة ونوع التخدير والإجراء.'
    ],
    tags: ['NIBP', 'blood pressure', 'cuff', 'monitor']
  },
  {
    id: 'temperature-monitor',
    nameAr: 'Temperature Monitor',
    nameEn: 'Temperature Monitor',
    category: 'monitoring',
    categoryAr: 'المراقبة',
    sourcePages: [82],
    summary: 'يراقب حرارة المريض عندما يكون تغير الحرارة متوقعًا أو مهمًا سريريًا أثناء التخدير.',
    purpose: [
      'كشف انخفاض أو ارتفاع الحرارة | Hypothermia / hyperthermia detection'
    ],
    keyPoints: [
      'اختيار موقع القياس يعتمد على نوع الجراحة ومدة التخدير ودقة القياس المطلوبة.'
    ],
    tags: ['temperature', 'monitor', 'hypothermia', 'hyperthermia']
  },
  {
    id: 'anesthesia-ventilator',
    nameAr: 'Ventilator',
    nameEn: 'Anesthesia Ventilator',
    category: 'machine',
    categoryAr: 'عربة التخدير',
    sourcePages: [77, 82],
    summary: 'جزء من عربة التخدير يوفر تهوية ميكانيكية للمريض عند الحاجة.',
    purpose: [
      'التهوية الميكانيكية أثناء التخدير | Mechanical ventilation'
    ],
    keyPoints: [
      'يجب مراقبة حجم وضغط ومعدل التهوية مع إنذارات الفصل أو الضغط غير الطبيعي.',
      'تظل وسيلة تهوية يدوية احتياطية جاهزة عند تعطل الجهاز أو الدائرة.'
    ],
    tags: ['ventilator', 'mechanical ventilation', 'anesthesia machine']
  },
  {
    id: 'pulse-oximeter',
    nameAr: 'مقياس التأكسج النبضي',
    nameEn: 'Pulse Oximeter',
    category: 'monitoring',
    categoryAr: 'المراقبة',
    sourcePages: [27],
    summary: 'جهاز غير باضع يقدّر تشبع الهيموغلوبين المحيطي بالأوكسجين | SpO₂ ويعرض معدل النبض.',
    purpose: [
      'المراقبة المستمرة للأكسجة | Continuous oxygenation monitoring',
      'الكشف المبكر عن نقص الأكسجة | Hypoxemia detection'
    ],
    keyPoints: [
      'يعتمد على امتصاص الضوء الأحمر وتحت الأحمر في الدم الشرياني النابض، ويعرض SpO₂ ومعدل النبض.',
      'في البالغ السليم تكون SpO₂ غالبًا 95–100% عند مستوى سطح البحر، لكن الهدف السريري يختلف حسب المرض والظروف.',
      'قد تتأثر الدقة بضعف التروية أو البرودة، الحركة، طلاء الأظافر، الأصباغ، تلوث موضع القياس، والـDyshemoglobinemias.',
      'SpO₂ لا تقيس التهوية ولا تعوض قياس CO₂ أو تحليل غازات الدم عند الحاجة.'
    ],
    correction: 'لا تُفسر SpO₂ كرقم منفرد ثابت لكل المرضى؛ الهدف يعتمد على الحالة السريرية، كما أن القراءة قد تكون غير دقيقة في بعض الظروف.',
    tags: ['pulse oximeter','SpO2','monitor','hypoxemia','مقياس التأكسج']
  },
  {
    id: 'suction-apparatus',
    nameAr: 'جهاز الشفط',
    nameEn: 'Suction Apparatus',
    category: 'tools',
    categoryAr: 'أدوات',
    sourcePages: [10,21,23],
    summary: 'منظومة تولد ضغطًا سالبًا لشفط الدم واللعاب والإفرازات أو القيء من مجرى الهواء.',
    purpose: [
      'تنظيف مجرى الهواء | Airway clearance',
      'إزالة الإفرازات والدم | Secretion / blood suction',
      'الاستعداد للتعامل مع القلس أو القيء | Regurgitation / vomiting'
    ],
    keyPoints: [
      'يجب التأكد من عمل الشفط قبل بدء التخدير ووجود قسطرة مناسبة.',
      'الشفط المفرط أو العميق قد يسبب رضًا ونقص أكسجة أو استجابة مبهمية.'
    ],
    tags: ['suction','sucker','airway','شفط']
  }
];
