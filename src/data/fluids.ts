export type FluidCategory = 'crystalloid' | 'colloid';

export interface IntravenousFluid {
  id: string;
  nameAr: string;
  nameEn: string;
  category: FluidCategory;
  categoryAr: string;
  sourcePages: number[];
  composition: string;
  role: string[];
  cautions: string[];
  correction?: string;
  clinicalNote?: string;
  tags: string[];
}

export const FLUID_FILTERS: Array<{ id: 'all' | FluidCategory; label: string }> = [
  { id: 'all', label: 'الكل' },
  { id: 'crystalloid', label: 'بلورية | Crystalloids' },
  { id: 'colloid', label: 'غروانية | Colloids' }
];

export const INTRAVENOUS_FLUIDS: IntravenousFluid[] = [
  {
    id: 'normal-saline',
    nameAr: 'المحلول الملحي الطبيعي',
    nameEn: '0.9% Sodium Chloride / Normal Saline',
    category: 'crystalloid',
    categoryAr: 'سوائل بلورية | Crystalloids',
    sourcePages: [74],
    composition: 'محلول متساوي التوتر تقريبًا يحتوي 154 mmol/L صوديوم | Sodium و154 mmol/L كلوريد | Chloride.',
    role: [
      'تعويض الحجم خارج الخلية | Extracellular volume replacement.',
      'تعويض خسائر غنية بالكلوريد مثل القيء/الشفط المعدي في بعض السياقات | Chloride-rich losses.',
      'متوافق مع نقل كريات الدم الحمراء عبر الخط نفسه وفق الممارسة المعتادة | Blood-product compatible crystalloid.'
    ],
    cautions: [
      'الكميات الكبيرة قد تسبب حماضًا استقلابيًا مفرط الكلوريد | Hyperchloremic metabolic acidosis.',
      'الحذر من فرط الحجم | Fluid overload خصوصًا في فشل القلب أو الكلى.'
    ],
    correction: 'المصدر يصفه بصورة عامة بأنه “يرفع الضغط”. إعطاء السوائل لا يُستخدم لرفع الضغط تلقائيًا؛ الاستطباب يعتمد على حالة الحجم والديناميكا الدموية والسبب.',
    clinicalNote: 'ليس سائلًا يُعطى تلقائيًا لمجرد انخفاض الضغط؛ اختيار السائل يعتمد على حالة الحجم والديناميكا الدموية والسبب. الكميات الكبيرة قد ترفع الكلوريد وتسبب hyperchloremic acidosis، لذلك تُراقب الشوارد والحمض–القاعدة عند الاستخدام الكبير.',
    tags: ['normal saline','0.9 saline','NaCl','crystalloid','محلول ملحي']
  },
  {
    id: 'lactated-ringers',
    nameAr: 'رينغر لاكتات / هارتمان',
    nameEn: 'Lactated Ringer’s / Hartmann’s Solution',
    category: 'crystalloid',
    categoryAr: 'سوائل بلورية | Crystalloids',
    sourcePages: [74],
    composition: 'محلول بلوري متوازن | Balanced crystalloid يحتوي صوديوم وكلوريد وبوتاسيوم وكالسيوم ولاكتات بنسب قريبة من البلازما أكثر من Normal Saline.',
    role: [
      'تعويض الحجم أثناء الجراحة والرضوض وفقد السوائل | Perioperative / trauma fluid replacement.',
      'خيار شائع ضمن السوائل البلورية المتوازنة | Balanced crystalloid.'
    ],
    cautions: [
      'يحتوي كالسيوم | Calcium لذلك توجد اعتبارات توافق دوائي وخط وريدي.',
      'الحذر عند فرط البوتاسيوم الشديد | Hyperkalemia أو الحالات التي تتطلب تقييد مكونات معينة حسب السياق.'
    ],
    correction: 'تفاعل Ceftriaxone مع السوائل المحتوية على الكالسيوم ليس قاعدة “ممنوع دائمًا لكل الأعمار”. عند حديثي الولادة ≤28 يومًا توجد موانع مهمة؛ أما الأكبر سنًا فيمكن إعطاء Ceftriaxone وLactated Ringer’s بالتتابع إذا غُسل الخط جيدًا، وليس بالتزامن في الخط نفسه.',
    clinicalNote: 'محلول بلوري متوازن شائع لتعويض الحجم، لكن اختيار السائل يعتمد على حالة المريض والشوارد. وجود الكالسيوم يفرض الانتباه إلى توافق الأدوية وخطوط التسريب، ولا يُخلط عشوائيًا مع كل دواء.',
    tags: ['Ringer lactate','Hartmann','balanced crystalloid','LR','رينغر']
  },
  {
    id: 'd5w',
    nameAr: 'دكستروز 5% في الماء',
    nameEn: '5% Dextrose in Water (D5W)',
    category: 'crystalloid',
    categoryAr: 'سوائل بلورية | Crystalloids',
    sourcePages: [75],
    composition: 'ماء مع 5% دكستروز | Dextrose؛ يكون متساوي الأسمولية تقريبًا في الكيس، لكن بعد استقلاب الغلوكوز يتصرف كماء حر | Free water.',
    role: [
      'توفير ماء حر | Free-water replacement في سياقات مختارة.',
      'توفير كمية محدودة من الغلوكوز | Glucose supplementation.',
      'يُستخدم ضمن خطط صيانة أو تصحيح محددة وليس كبديل افتراضي للإنعاش الحجمي.'
    ],
    cautions: [
      'قد يسبب أو يفاقم نقص صوديوم الدم | Hyponatremia إذا أُعطي بشكل غير مناسب.',
      'قد يسبب ارتفاع السكر | Hyperglycemia.',
      'ليس مناسبًا كالسائل الأساسي لإنعاش نقص الحجم | Volume resuscitation.'
    ],
    correction: 'المصدر يذكر أنه “يزيد حجم الدم ويرفع الضغط”. هذا غير دقيق كهدف أساسي؛ بعد استقلاب الدكستروز يخرج معظم الماء من الحيز الوعائي، لذلك D5W ليس سائل إنعاش حجمي.',
    clinicalNote: 'بعد استقلاب الغلوكوز يتصرف D5W أساسًا كماء حر، لذلك لا يُستخدم كسائل إنعاش حجمي رئيسي في نقص الحجم أو الصدمة.',
    tags: ['D5W','dextrose','free water','glucose','دكستروز']
  },
  {
    id: 'dextrose-saline',
    nameAr: 'دكستروز مع محلول ملحي',
    nameEn: 'Dextrose-Saline Solutions',
    category: 'crystalloid',
    categoryAr: 'سوائل بلورية | Crystalloids',
    sourcePages: [75],
    composition: 'خليط من دكستروز | Dextrose مع كلوريد الصوديوم | Sodium chloride بتراكيز مختلفة؛ خصائصه تعتمد على التركيبة المحددة.',
    role: [
      'الصيانة | Maintenance في بعض الخطط عندما نحتاج ماءً وشوارد وغلوكوز معًا.',
      'الاختيار يعتمد على الصوديوم، الغلوكوز، حالة المريض وخطة السوائل.'
    ],
    cautions: [
      'لا يمكن اعتبار جميع تركيبات Dextrose-Saline متساوية؛ بعضها يصبح ناقص التوتر وظيفيًا بعد استقلاب الدكستروز.',
      'تحتاج مراقبة الصوديوم | Sodium والغلوكوز | Glucose وحالة الحجم.'
    ],
    correction: 'لا تُستخدم تلقائيًا “لرفع الضغط” أو لكل حالات القيء؛ اختيار السائل يعتمد على العجز الفعلي والشوارد والحالة السريرية.',
    clinicalNote: 'اسم Dextrose-Saline يشمل تراكيب مختلفة، لذلك لا يمكن إعطاء قاعدة واحدة لكل المنتجات. الاستخدام يعتمد على تركيز الصوديوم والغلوكوز وحاجة المريض للصيانة أو التصحيح.',
    tags: ['dextrose saline','maintenance fluid','saline','glucose']
  },
  {
    id: 'dextran',
    nameAr: 'ديكستران',
    nameEn: 'Dextran',
    category: 'colloid',
    categoryAr: 'سوائل غروانية | Colloids',
    sourcePages: [76],
    composition: 'بوليمرات غلوكوز | Glucose polymers استُخدمت تاريخيًا كموسعات للبلازما | Plasma expanders.',
    role: [
      'توسيع الحجم داخل الأوعية | Intravascular volume expansion تاريخيًا.'
    ],
    cautions: [
      'قد يسبب تفاعلات تحسسية شديدة | Anaphylactoid reactions.',
      'قد يؤثر في التخثر | Coagulation ووظيفة الصفائح ويزيد النزف عند الأحجام الكبيرة.',
      'استعمال كميات كبيرة قد يتداخل مع بعض اختبارات فصائل الدم والمطابقة | Blood grouping / cross-matching؛ لذلك يجب إبلاغ بنك الدم عند استخدامه.'
    ],
    correction: 'استخدام Dextran كخيار روتيني للإنعاش أصبح محدودًا جدًا في الممارسة الحديثة بسبب البدائل الأفضل ومخاطر الحساسية والتخثر.',
    clinicalNote: 'استخدام Dextran كموسع بلازما روتيني أصبح محدودًا بسبب مخاطر الحساسية واضطراب التخثر والتداخل مع بعض اختبارات بنك الدم؛ لا يُعامل كخيار أول افتراضي.',
    tags: ['dextran','colloid','plasma expander','غروي']
  },
  {
    id: 'gelatin',
    nameAr: 'محاليل الجيلاتين',
    nameEn: 'Gelatin-based Colloids',
    category: 'colloid',
    categoryAr: 'سوائل غروانية | Colloids',
    sourcePages: [76],
    composition: 'مشتقات جيلاتين | Gelatin مشتقة من الكولاجين، مثل Gelofusine أو بعض المستحضرات القديمة مثل Haemaccel.',
    role: [
      'توسيع الحجم داخل الأوعية | Plasma volume expansion في أنظمة صحية ما زالت تستخدمها.'
    ],
    cautions: [
      'خطر تفاعلات تحسسية | Hypersensitivity / anaphylaxis.',
      'مدة بقاء الحجم أقصر من بعض الغرويات الأخرى.',
      'تركيب مستحضرات الجيلاتين يختلف؛ بعض المستحضرات التاريخية مثل Haemaccel تحتوي كالسيوم، لذلك توافقها مع الدم أو الأدوية في الخط نفسه يعتمد على المستحضر ويجب الرجوع إلى نشرته.'
    ],
    correction: 'توفر وتركيب مستحضرات الجيلاتين يختلفان حسب البلد؛ لا ينبغي حفظ قاعدة ثابتة عن مدة ساعتين أو توافق الدم لكل المنتجات دون الرجوع لنشرة المستحضر.',
    clinicalNote: 'محاليل الجيلاتين تختلف حسب المستحضر والبلد؛ خطر الحساسية موجود، والتوافق مع الدم أو الأدوية ومدة التأثير لا تُفترض من اسم Gelatin وحده.',
    tags: ['gelatin','Gelofusine','Haemaccel','colloid']
  },
  {
    id: 'hes',
    nameAr: 'هيدروكسي إيثيل النشا',
    nameEn: 'Hydroxyethyl Starch (HES)',
    category: 'colloid',
    categoryAr: 'سوائل غروانية | Colloids',
    sourcePages: [76],
    composition: 'غروي صناعي | Synthetic colloid مشتق من النشا ومصمم لتوسيع الحجم داخل الأوعية.',
    role: [
      'استُخدم تاريخيًا لعلاج نقص حجم الدم | Hypovolemia عندما لا تكفي البلوريات.'
    ],
    cautions: [
      'مرتبط بخطر أذية الكلى | Kidney injury واضطرابات التخثر | Coagulopathy في مجموعات مرضى معينة.',
      'غير مناسب لمرضى الإنتان | Sepsis أو المرضى شديدي الخطورة أو الحروق وفق تحذيرات/قيود هيئات دوائية متعددة.'
    ],
    correction: 'المصدر يعرض HES كغروي اعتيادي طويل التأثير. هذا قديم؛ الاتحاد الأوروبي قرر تعليق تراخيص محاليل HES بسبب استمرار مخاطر أذية الكلى والوفاة لدى فئات عالية الخطورة. لا يُعرض كخيار روتيني حديث.',
    clinicalNote: 'HES ليس خيارًا روتينيًا للإنعاش. توجد تحذيرات قوية من زيادة خطر الوفاة، أذية الكلى والنزف، ويُتجنب خصوصًا في المرضى عاليي الخطورة؛ تُفضّل البدائل المناسبة عندما تكون متاحة.',
    tags: ['HES','hydroxyethyl starch','colloid','kidney injury']
  },
  {
    id: 'albumin',
    nameAr: 'الألبومين البشري',
    nameEn: 'Human Albumin',
    category: 'colloid',
    categoryAr: 'سوائل غروانية | Colloids',
    sourcePages: [76],
    composition: 'بروتين ألبومين مشتق من البلازما البشرية | Human plasma-derived albumin ويتوفر بتراكيز مختلفة مثل 5% و20/25%.',
    role: [
      'توسيع الحجم | Volume expansion في استطبابات محددة.',
      'استخدامات خاصة تعتمد على التركيز والحالة مثل بعض حالات نقص الألبومين أو سحب السوائل وفق بروتوكولات محددة.'
    ],
    cautions: [
      'فرط الحجم | Hypervolemia أو الحمل الحجمي الزائد | Cardiovascular overload.',
      'تفاعلات تحسسية | Hypersensitivity / anaphylaxis.',
      'تحتاج مراقبة الشوارد والديناميكا الدموية بحسب الجرعة والحالة.'
    ],
    correction: 'الألبومين ليس بديلًا تلقائيًا للبلوريات في كل نقص حجم، واستخدامه يحدد حسب الاستطباب والتكلفة والحالة السريرية.',
    clinicalNote: 'Albumin ليس بديلًا تلقائيًا للبلوريات في كل نقص حجم. يُستخدم في استطبابات مختارة مع مراقبة خطر فرط الحجم، الحساسية، الشوارد والديناميكا الدموية.',
    tags: ['albumin','human albumin','colloid','plasma']
  }
];
