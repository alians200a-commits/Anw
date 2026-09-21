export type ClinicalGuideCategory =
  | 'general'
  | 'airway'
  | 'regional'
  | 'pharmacology'
  | 'recovery';

export interface ClinicalGuideSection {
  title: string;
  items: string[];
}

export interface ClinicalGuide {
  id: string;
  titleAr: string;
  titleEn: string;
  category: ClinicalGuideCategory;
  categoryAr: string;
  sourcePages: number[];
  summary: string;
  sections: ClinicalGuideSection[];
  correction?: string;
  tags: string[];
}

export const CLINICAL_GUIDE_FILTERS: Array<{ id: 'all' | ClinicalGuideCategory; label: string }> = [
  { id: 'all', label: 'الكل' },
  { id: 'general', label: 'التخدير العام' },
  { id: 'airway', label: 'مجرى الهواء' },
  { id: 'regional', label: 'الموضعي والإقليمي' },
  { id: 'pharmacology', label: 'علم الأدوية' },
  { id: 'recovery', label: 'الإفاقة' }
];

export const CLINICAL_GUIDES: ClinicalGuide[] = [
  {
    id: 'types-of-anesthesia',
    titleAr: 'أنواع التخدير',
    titleEn: 'Types of Anesthesia',
    category: 'general',
    categoryAr: 'التخدير العام',
    sourcePages: [28],
    summary: 'التخدير قد يكون عامًا | General، إقليميًا | Regional، أو موضعيًا | Local بحسب الإجراء وحالة المريض.',
    sections: [
      {
        title: 'الأنواع الرئيسية | Main types',
        items: [
          'التخدير العام | General anesthesia: فقدان وعي دوائي قابل للعكس مع مكونات أخرى حسب الحاجة.',
          'التخدير الإقليمي | Regional anesthesia: حصر الإحساس في منطقة أكبر عبر حصار عصبي أو Neuraxial block.',
          'التخدير الموضعي | Local anesthesia: فقد الإحساس في منطقة محدودة دون فقدان الوعي.'
        ]
      },
      {
        title: 'تقنيات إقليمية/موضعية | Regional / local techniques',
        items: [
          'التخدير السطحي | Topical anesthesia.',
          'الارتشاح الموضعي | Local infiltration.',
          'حصر العصب المحيطي | Peripheral nerve block.',
          'التخدير الإقليمي الوريدي | Intravenous regional anesthesia (Bier block).',
          'التخدير النخاعي | Spinal anesthesia.',
          'التخدير فوق الجافية | Epidural anesthesia.'
        ]
      }
    ],
    tags: ['types','general anesthesia','regional','local','spinal','epidural']
  },
  {
    id: 'general-anesthesia-components',
    titleAr: 'مكونات التخدير العام',
    titleEn: 'Components of General Anesthesia',
    category: 'general',
    categoryAr: 'التخدير العام',
    sourcePages: [28,29],
    summary: 'التخدير العام الحديث غالبًا متوازن | Balanced anesthesia ويجمع أكثر من تأثير دوائي بدل الاعتماد على دواء واحد.',
    sections: [
      {
        title: 'المكونات | Components',
        items: [
          'فقدان الوعي / التنويم | Unconsciousness / Hypnosis.',
          'تسكين الألم | Analgesia.',
          'فقدان الذاكرة | Amnesia.',
          'تثبيط الاستجابة اللاإرادية والضغط الجراحي | Suppression of autonomic / stress responses.',
          'ارتخاء العضلات عند الحاجة | Neuromuscular relaxation when required.'
        ]
      },
      {
        title: 'المراحل العملية | Practical phases',
        items: [
          'التحريض | Induction.',
          'المحافظة على التخدير | Maintenance.',
          'الإفاقة | Emergence / Recovery.',
          'المراقبة المستمرة | Continuous monitoring خلال جميع المراحل.'
        ]
      }
    ],
    tags: ['general anesthesia','balanced anesthesia','induction','maintenance','recovery']
  },
  {
    id: 'guedel-stages',
    titleAr: 'مراحل غيدل للتخدير',
    titleEn: 'Guedel Stages of Anesthesia',
    category: 'general',
    categoryAr: 'التخدير العام',
    sourcePages: [30],
    summary: 'تقسيم تاريخي لعمق التخدير إلى أربع مراحل وُصف أساسًا مع الإيثر | Ether anesthesia.',
    sections: [
      {
        title: 'المراحل | Stages',
        items: [
          'المرحلة I - التسكين | Stage I - Analgesia: من بدء إعطاء المخدر حتى فقد الوعي.',
          'المرحلة II - الإثارة | Stage II - Excitement: من فقد الوعي حتى بداية التنفس المنتظم للتخدير الجراحي.',
          'المرحلة III - التخدير الجراحي | Stage III - Surgical anesthesia.',
          'المرحلة IV - التثبيط النخاعي الشديد | Stage IV - Medullary depression: جرعة تخدير مفرطة مع فشل تنفسي/دوراني محتمل.'
        ]
      }
    ],
    correction: 'هذا التصنيف تاريخي ويصف علامات الإيثر أكثر من التخدير المتوازن الحديث؛ لا يُستخدم وحده لتحديد عمق التخدير الحالي.',
    tags: ['Guedel','stages','depth','ether','عمق التخدير']
  },
  {
    id: 'rapid-sequence-induction',
    titleAr: 'التحريض والتّنبيب التسلسلي السريع',
    titleEn: 'Rapid Sequence Induction and Intubation',
    category: 'airway',
    categoryAr: 'مجرى الهواء',
    sourcePages: [31],
    summary: 'تقنية لتأمين مجرى هوائي ذي كفة بسرعة عند ارتفاع خطر الاستنشاق الرئوي | Pulmonary aspiration.',
    sections: [
      {
        title: 'التحضير | Preparation',
        items: [
          'تقييم مجرى الهواء وخطة بديلة | Airway assessment and backup plan.',
          'الأكسجة المسبقة | Preoxygenation.',
          'اختيار عامل تحريض سريع ومرخٍ عضلي مناسب | Rapid induction agent + neuromuscular blocker.',
          'الاستعداد للشفط | Suction ready.'
        ]
      },
      {
        title: 'الهدف | Goal',
        items: [
          'تقليل الزمن بين فقد منعكسات حماية مجرى الهواء ونفخ كفة الأنبوب الرغامي | Minimize unprotected-airway time.'
        ]
      }
    ],
    correction: 'الضغط الحلقي | Cricoid pressure ما زال موضوعًا جدليًا ويُعدّل أو يُزال إذا أعاق التهوية أو التنبيب. كذلك منع التهوية بالقناع تمامًا ليس قاعدة مطلقة؛ يمكن استخدام تهوية لطيفة منخفضة الضغط عند خطر نقص الأكسجة.',
    tags: ['RSI','rapid sequence','cricoid','aspiration','preoxygenation']
  },
  {
    id: 'inhalational-induction',
    titleAr: 'التحريض الاستنشاقي',
    titleEn: 'Inhalational Induction',
    category: 'general',
    categoryAr: 'التخدير العام',
    sourcePages: [32],
    summary: 'تحريض التخدير العام باستنشاق عامل متطاير | Volatile anesthetic بدل البدء بحقن وريدي.',
    sections: [
      {
        title: 'متى يُفكّر به؟ | Common situations',
        items: [
          'الأطفال أو الخوف الشديد من الإبر | Pediatric / needle phobia.',
          'صعوبة الحصول على مدخل وريدي | Difficult IV access.',
          'حالات مختارة يُراد فيها الحفاظ على التنفس التلقائي | Preserve spontaneous ventilation.'
        ]
      },
      {
        title: 'ملاحظة | Note',
        items: [
          'سيفوفلوران | Sevoflurane شائع للتحريض الاستنشاقي بسبب قلة تهييج مجرى الهواء مقارنةً بعدة عوامل متطايرة أخرى.'
        ]
      }
    ],
    tags: ['inhalational induction','sevoflurane','pediatric','spontaneous ventilation']
  },
  {
    id: 'maintenance-and-emergence',
    titleAr: 'المحافظة على التخدير والإفاقة',
    titleEn: 'Maintenance and Emergence',
    category: 'recovery',
    categoryAr: 'الإفاقة',
    sourcePages: [32,33],
    summary: 'بعد التحريض يجب الحفاظ على التنويم والتسكين والاستقرار ثم إيقاف العوامل تدريجيًا واستعادة الوعي والتهوية والمنعكسات.',
    sections: [
      {
        title: 'المحافظة | Maintenance',
        items: [
          'عامل متطاير | Volatile anesthetic أو تخدير وريدي كلي | Total intravenous anesthesia (TIVA).',
          'تسكين إضافي | Analgesia مثل الأفيونات | Opioids حسب الحاجة.',
          'مرخيات عضلية | Neuromuscular blockers إذا تطلبت الجراحة ذلك.',
          'المراقبة | Monitoring للأكسجة والتهوية والدورة الدموية والحرارة.'
        ]
      },
      {
        title: 'الإفاقة | Emergence',
        items: [
          'إيقاف أو خفض عوامل التخدير | Discontinue / reduce anesthetics.',
          'التأكد من عودة التهوية التلقائية الكافية | Adequate spontaneous ventilation.',
          'عكس الحصار العضلي عند الحاجة | Neuromuscular reversal.',
          'تقييم الوعي ومنعكسات حماية مجرى الهواء | Consciousness and protective airway reflexes.'
        ]
      }
    ],
    correction: 'جرعات عكس المرخيات ليست وصفة ثابتة لكل مريض؛ تعتمد على نوع المرخي ودرجة الحصار المقاسة مثل TOF وعلى عامل العكس المستخدم.',
    tags: ['maintenance','emergence','recovery','TIVA','reversal']
  },
  {
    id: 'local-anesthesia',
    titleAr: 'التخدير الموضعي',
    titleEn: 'Local Anesthesia',
    category: 'regional',
    categoryAr: 'الموضعي والإقليمي',
    sourcePages: [34,35,36,37],
    summary: 'يمنع المخدر الموضعي انتقال الإشارة العصبية بصورة عكوسة أساسًا عبر حجب قنوات الصوديوم المعتمدة على الجهد | Voltage-gated sodium channels.',
    sections: [
      {
        title: 'طرق الاستخدام | Techniques',
        items: [
          'سطحي | Topical.',
          'ارتشاح | Infiltration.',
          'حصر عصب محيطي | Peripheral nerve block.',
          'إقليمي وريدي | Intravenous regional anesthesia.',
          'نخاعي أو فوق الجافية | Spinal / Epidural.'
        ]
      },
      {
        title: 'الأثر | Effect',
        items: [
          'فقد الإحساس | Sensory block مع اختلاف تأثير الألياف العصبية حسب التركيز والدواء والموقع.'
        ]
      }
    ],
    correction: 'إضافة الأدرينالين | Epinephrine إلى المخدر الموضعي ليست ممنوعة تلقائيًا في الأصابع عند كل المرضى؛ الممارسة الحديثة تعتبره آمنًا غالبًا بتركيزات مناسبة مع الحذر الشديد عند وجود قصور وعائي أو نقص تروية.',
    tags: ['local anesthetic','sodium channel','infiltration','nerve block']
  },
  {
    id: 'last',
    titleAr: 'السمية الجهازية للمخدر الموضعي',
    titleEn: 'Local Anesthetic Systemic Toxicity',
    category: 'regional',
    categoryAr: 'الموضعي والإقليمي',
    sourcePages: [35,37],
    summary: 'حالة خطرة | LAST تنتج من وصول تركيز سام من المخدر الموضعي إلى الدوران، غالبًا بعد حقن داخل وعائي أو جرعة/امتصاص مرتفع.',
    sections: [
      {
        title: 'علامات مبكرة | Early features',
        items: [
          'خدر حول الفم | Perioral numbness.',
          'طعم معدني | Metallic taste.',
          'طنين | Tinnitus.',
          'دوار أو اضطراب الرؤية | Dizziness / visual disturbance.',
          'هياج أو اختلاجات | Agitation / seizures.'
        ]
      },
      {
        title: 'سمية قلبية | Cardiovascular toxicity',
        items: [
          'هبوط الضغط | Hypotension.',
          'بطء القلب أو اضطراب النظم | Bradycardia / Arrhythmias.',
          'قد تتطور إلى توقف القلب | Cardiac arrest.'
        ]
      },
      {
        title: 'المبدأ العلاجي الحديث | Modern management principle',
        items: [
          'إيقاف حقن المخدر الموضعي وطلب المساعدة | Stop injection / call for help.',
          'تأمين مجرى الهواء والتهوية ومنع نقص الأكسجة والحماض | Airway / ventilation / oxygenation.',
          'علاج الاختلاجات، وبدء المستحلب الدهني الوريدي | Intravenous lipid emulsion مبكرًا في الحالات المهمة.'
        ]
      }
    ],
    correction: 'العلاج الوارد في بعض المذكرات القديمة بالثيوبنتال وحده لا يمثل خوارزمية LAST الحديثة؛ المستحلب الدهني الوريدي جزء أساسي من الإنقاذ عند السمية الجهازية المهمة.',
    tags: ['LAST','local anesthetic toxicity','lipid emulsion','سمية']
  },
  {
    id: 'bier-block',
    titleAr: 'التخدير الإقليمي الوريدي',
    titleEn: 'Intravenous Regional Anesthesia / Bier Block',
    category: 'regional',
    categoryAr: 'الموضعي والإقليمي',
    sourcePages: [38],
    summary: 'تقنية لتخدير طرف معزول بالدورة بواسطة عاصبة | Tourniquet ثم حقن مخدر موضعي وريدي داخل الطرف.',
    sections: [
      {
        title: 'الفكرة | Principle',
        items: [
          'تفريغ الطرف من الدم | Exsanguination.',
          'نفخ العاصبة لعزل الدورة | Tourniquet isolation.',
          'حقن المخدر الموضعي داخل وريد الطرف | IV local anesthetic.'
        ]
      },
      {
        title: 'أهم خطر | Main risk',
        items: [
          'تسرب كمية كبيرة من المخدر الموضعي للدورة الجهازية قد يسبب LAST | Local Anesthetic Systemic Toxicity.'
        ]
      }
    ],
    correction: 'اختيار الدواء والتركيز والجرعة ومدة العاصبة يجب أن يتبع بروتوكولًا حديثًا؛ لا تُستخدم وصفات حجم ثابتة لكل المرضى.',
    tags: ['Bier block','IVRA','tourniquet','regional anesthesia']
  },
  {
    id: 'spinal-anesthesia',
    titleAr: 'التخدير النخاعي',
    titleEn: 'Spinal Anesthesia',
    category: 'regional',
    categoryAr: 'الموضعي والإقليمي',
    sourcePages: [39,42,43,44,45,46,47],
    summary: 'حقن مخدر موضعي داخل الحيز تحت العنكبوتية | Subarachnoid space للحصول على حصر عصبي سريع وكثيف أسفل مستوى معين.',
    sections: [
      {
        title: 'الموقع | Location',
        items: [
          'ينتهي الحبل الشوكي عند البالغ غالبًا قرب L1-L2.',
          'يُجرى الثقب القطني عادةً تحت هذا المستوى مثل L3-L4 أو L4-L5.'
        ]
      },
      {
        title: 'التأثيرات | Effects',
        items: [
          'حصر ودي | Sympathetic block قد يسبب توسع الأوعية وهبوط الضغط | Hypotension.',
          'بطء القلب | Bradycardia قد يحدث خاصةً مع الحصار المرتفع.',
          'حصر حسي وحركي | Sensory / motor block بحسب مستوى الانتشار.'
        ]
      },
      {
        title: 'موانع مطلقة مهمة | Important absolute contraindications',
        items: [
          'رفض المريض | Patient refusal.',
          'عدوى في موقع الإدخال | Infection at insertion site.',
          'حساسية للمخدر المستخدم | Allergy to intended drug.',
          'اضطراب تخثر شديد | Severe coagulation abnormality.',
          'ارتفاع ضغط داخل القحف في ظروف معينة | Raised intracranial pressure.'
        ]
      }
    ],
    correction: 'ألم الظهر، صغر العمر أو فقر الدم ليست موانع مطلقة بحد ذاتها. التقييم الحديث يفرق بين موانع مطلقة ونسبية ويعتمد على حالة المريض ونوع الجراحة.',
    tags: ['spinal','subarachnoid','neuraxial','L3 L4','L4 L5']
  },
  {
    id: 'epidural-anesthesia',
    titleAr: 'التخدير فوق الجافية',
    titleEn: 'Epidural Anesthesia',
    category: 'regional',
    categoryAr: 'الموضعي والإقليمي',
    sourcePages: [40,41],
    summary: 'إعطاء مخدر أو مسكن في الحيز فوق الجافية | Epidural space، ويمكن وضع قسطرة لإعطاء جرعات متكررة أو تسريب.',
    sections: [
      {
        title: 'التقنية | Technique',
        items: [
          'وضع المريض جالسًا أو جانبيًا | Sitting / lateral.',
          'التعقيم والتخدير الموضعي للجلد | Aseptic preparation / local infiltration.',
          'تحديد الحيز غالبًا بتقنية فقدان المقاومة | Loss of resistance.',
          'إدخال قسطرة فوق الجافية | Epidural catheter عند الحاجة.'
        ]
      },
      {
        title: 'الاستخدام | Uses',
        items: [
          'التخدير أو التسكين في الولادة وبعض جراحات البطن والصدر والأطراف.',
          'تسكين الألم بعد الجراحة | Postoperative analgesia.'
        ]
      }
    ],
    correction: 'جرعة الاختبار التقليدية Lidocaine 1.5% + Epinephrine ليست بروتوكولًا واحدًا عالميًا؛ مكونات وجرعة اختبار القسطرة تختلف حسب السياق والمريض والممارسة المحلية.',
    tags: ['epidural','loss of resistance','Tuohy','catheter']
  },
  {
    id: 'spinal-vs-epidural',
    titleAr: 'الفرق بين النخاعي وفوق الجافية',
    titleEn: 'Spinal vs Epidural Anesthesia',
    category: 'regional',
    categoryAr: 'الموضعي والإقليمي',
    sourcePages: [48],
    summary: 'كلاهما من التخدير المحوري العصبي | Neuraxial anesthesia لكن موضع الحقن وسرعة البدء والجرعة وإمكانية استمرار القسطرة تختلف.',
    sections: [
      {
        title: 'التخدير النخاعي | Spinal',
        items: [
          'الحقن داخل السائل الدماغي الشوكي | Intrathecal / Subarachnoid.',
          'جرعة أصغر وبداية أسرع وحصر كثيف نسبيًا.',
          'غالبًا جرعة واحدة | Single-shot.'
        ]
      },
      {
        title: 'فوق الجافية | Epidural',
        items: [
          'الحقن خارج الأم الجافية | Epidural space.',
          'بداية أبطأ وجرعات أكبر نسبيًا.',
          'إمكانية وضع قسطرة للاستمرار والتعديل | Continuous / titratable catheter.'
        ]
      }
    ],
    tags: ['spinal','epidural','neuraxial','comparison']
  },
  {
    id: 'pharmacokinetics',
    titleAr: 'حركية الدواء',
    titleEn: 'Pharmacokinetics',
    category: 'pharmacology',
    categoryAr: 'علم الأدوية',
    sourcePages: [50,51],
    summary: 'ما يفعله الجسم بالدواء | What the body does to the drug.',
    sections: [
      {
        title: 'ADME',
        items: [
          'الامتصاص | Absorption.',
          'التوزيع | Distribution.',
          'الاستقلاب | Metabolism.',
          'الإطراح | Excretion / Elimination.'
        ]
      },
      {
        title: 'مفاهيم مهمة | Key concepts',
        items: [
          'إعادة التوزيع | Redistribution قد تنهي تأثير بعض أدوية التحريض السريعة قبل التخلص النهائي منها.',
          'التصفية | Clearance هي حجم البلازما الذي يُزال منه الدواء لكل وحدة زمن.',
          'الارتباط بالبروتين | Protein binding، التأين | Ionization، والذوبان الدهني | Lipid solubility تؤثر في توزيع الدواء.'
        ]
      }
    ],
    tags: ['pharmacokinetics','ADME','clearance','distribution','metabolism']
  },
  {
    id: 'pharmacodynamics',
    titleAr: 'الديناميكا الدوائية',
    titleEn: 'Pharmacodynamics',
    category: 'pharmacology',
    categoryAr: 'علم الأدوية',
    sourcePages: [50],
    summary: 'ما يفعله الدواء بالجسم | What the drug does to the body والعلاقة بين التركيز/الجرعة والاستجابة.',
    sections: [
      {
        title: 'المستقبلات | Receptors',
        items: [
          'الناهض | Agonist يرتبط بالمستقبل ويفعّله.',
          'المضاد | Antagonist يرتبط بالمستقبل ويمنع أو يقلل تفعيله.',
          'المضاد التنافسي | Competitive antagonist يمكن التغلب على تأثيره جزئيًا بزيادة تركيز الناهض.'
        ]
      },
      {
        title: 'مثال تخديري | Anesthesia example',
        items: [
          'المرخيات غير المزيلة للاستقطاب | Nondepolarizing neuromuscular blockers تنافس الأستيل كولين | Acetylcholine في المستقبل النيكوتيني بالوصلة العصبية العضلية.'
        ]
      }
    ],
    tags: ['pharmacodynamics','agonist','antagonist','receptor']
  },
  {
    id: 'modified-aldrete',
    titleAr: 'مقياس ألدريت المعدل للإفاقة',
    titleEn: 'Modified Aldrete Score',
    category: 'recovery',
    categoryAr: 'الإفاقة',
    sourcePages: [33],
    summary: 'أداة منظمة لتقييم جاهزية المريض للخروج من المرحلة الأولى في وحدة الإفاقة | PACU.',
    sections: [
      {
        title: 'العناصر | Domains',
        items: [
          'النشاط | Activity.',
          'التنفس | Respiration.',
          'الدورة الدموية | Circulation.',
          'الوعي | Consciousness.',
          'تشبع الأوكسجين | Oxygen saturation.'
        ]
      }
    ],
    correction: 'في النسخة المعدلة الحديثة، درجة 9 أو أكثر من 10 تُستخدم عادةً كأحد معايير الجاهزية للخروج من Phase I PACU، وليس 8 كقاعدة عامة، مع بقاء الحكم السريري وبروتوكول المؤسسة ضروريين.',
    tags: ['Aldrete','PACU','recovery score','إفاقة']
  },
  {
    id: 'anesthesia-room-check',
    titleAr: 'فحص صالة ومحطة التخدير قبل الحالة',
    titleEn: 'Pre-Anesthesia Room / Workstation Check',
    category: 'general',
    categoryAr: 'التخدير العام',
    sourcePages: [77],
    summary: 'فحص منظم قبل بدء التخدير للتأكد من مصادر الغازات، محطة التخدير، مجرى الهواء، الشفط، المراقبة، الأدوية وخطة الطوارئ.',
    sections: [
      {
        title: 'المحطة والغازات | Workstation & gases',
        items: [
          'تشغيل وفحص محطة التخدير | Anesthesia workstation check.',
          'التحقق من مصدر الأوكسجين والغازات | Oxygen / medical gas supply.',
          'التحقق من المبخرات عند الحاجة | Vaporizers.',
          'فحص دائرة التنفس وجهاز التنفس | Breathing circuit / ventilator.'
        ]
      },
      {
        title: 'مجرى الهواء | Airway',
        items: [
          'قناع وجه | Face mask، مجرى هوائي | Oropharyngeal / nasopharyngeal airway، أنابيب رغامي | ETT، وقناع حنجري | SGA/LMA.',
          'منظار حنجرة يعمل | Functional laryngoscope مع خطة صعوبة مجرى الهواء | Difficult airway plan.',
          'جهاز شفط يعمل | Functional suction.'
        ]
      },
      {
        title: 'المراقبة والأدوية | Monitoring & drugs',
        items: [
          'ECG، ضغط الدم | NIBP، مقياس التأكسج | Pulse oximeter، قياس CO₂ الزفيري | Capnography عند التخدير العام/التهوية.',
          'توفر أدوية التخدير والأدوية الإسعافية المناسبة للحالة | Anesthetic / emergency drugs.',
          'وصول وريدي وخطة السوائل/الدم عند الحاجة | IV access / fluids / blood plan.'
        ]
      }
    ],
    correction: 'الفحص الحديث لا يقتصر على قائمة ثابتة عامة؛ يجب اتباع قائمة فحص الشركة/المؤسسة ومحطة التخدير نفسها، مع فحص آلي ويدوي حسب الجهاز.',
    tags: ['machine check','pre anesthesia check','OR checklist','جهاز التخدير','صالة العمليات']
  },
  {
    id: 'unconscious-patient-care',
    titleAr: 'رعاية المريض فاقد الوعي',
    titleEn: 'Care of the Unconscious Anesthetized Patient',
    category: 'general',
    categoryAr: 'التخدير العام',
    sourcePages: [78],
    summary: 'المريض المخدر لا يستطيع حماية نفسه؛ الرعاية تركز على الوضعية، العينين، الأعصاب، الجلد، مجرى الهواء والتهوية.',
    sections: [
      {
        title: 'الحماية من الإصابة | Injury prevention',
        items: [
          'إزالة الأجسام الضاغطة مثل المجوهرات عند الحاجة | Remove constricting items.',
          'تبطيط نقاط الضغط | Pressure-point padding وتجنب شد/ضغط الأعصاب | Peripheral nerve injury.',
          'تثبيت المريض ومنع السقوط مع وضعية جراحية آمنة | Safe positioning.',
          'الوقاية من الحروق الحرارية والكهربائية | Thermal / electrical injury prevention.'
        ]
      },
      {
        title: 'العناية بالعين | Eye care',
        items: [
          'إغلاق الجفنين وحماية القرنية | Eyelid closure / corneal protection.',
          'تجنب الضغط المباشر على العين | Avoid direct ocular pressure.'
        ]
      },
      {
        title: 'التنفس | Respiratory care',
        items: [
          'الحفاظ على مجرى هوائي مفتوح | Patent airway.',
          'التأكد من تهوية وأكسجة كافيتين | Adequate ventilation / oxygenation.',
          'منع واستباق الاستنشاق الرئوي | Aspiration prevention ومراقبة الإفرازات والدم.'
        ]
      }
    ],
    tags: ['unconscious patient','positioning','eye care','nerve injury','airway']
  },
  {
    id: 'preoperative-assessment',
    titleAr: 'التقييم قبل التخدير',
    titleEn: 'Preoperative Anesthesia Assessment',
    category: 'general',
    categoryAr: 'التخدير العام',
    sourcePages: [79,80],
    summary: 'تقييم منظم للتاريخ المرضي والفحص ومجرى الهواء والأدوية والمخاطر، ثم طلب الفحوصات التي ستغيّر الخطة فعليًا.',
    sections: [
      {
        title: 'التاريخ المرضي | History',
        items: [
          'أمراض القلب والرئة والكلى والكبد والسكري | Cardiopulmonary / renal / hepatic / metabolic disease.',
          'الأدوية والحساسية | Medications / allergies.',
          'تخدير سابق ومضاعفاته | Previous anesthesia / complications.',
          'التدخين والكحول والمواد الأخرى | Smoking / alcohol / substance use.',
          'الصيام وخطر الاستنشاق الرئوي | Fasting / aspiration risk.'
        ]
      },
      {
        title: 'الفحص | Examination',
        items: [
          'العلامات الحيوية | Vital signs وحالة الحجم | Volume status.',
          'فحص القلب والرئة حسب الحاجة | Cardiopulmonary examination.',
          'تقييم مجرى الهواء | Airway assessment.',
          'الأسنان والوصول الوريدي | Dentition / IV access.',
          'الوضع الوظيفي والهشاشة عند الحاجة | Functional status / frailty.'
        ]
      },
      {
        title: 'الفحوصات | Investigations',
        items: [
          'تُطلب حسب المرض، الأدوية، نوع الجراحة واحتمال أن تغيّر النتيجة الخطة | Selective testing.',
          'قد تشمل CBC، وظائف الكلى/الشوارد، ECG، اختبارات أخرى عند وجود استطباب.'
        ]
      }
    ],
    correction: 'قاعدة “ECG لكل مريض فوق 40 سنة” وطلب البول/الأشعة/التحاليل بصورة روتينية ليست ممارسة حديثة. الفحوصات قبل الجراحة تُطلب انتقائيًا عندما قد تؤثر النتيجة في التدبير.',
    tags: ['preoperative assessment','preanesthesia','history','airway assessment','testing']
  },
  {
    id: 'premedication',
    titleAr: 'أدوية ما قبل التخدير',
    titleEn: 'Premedication',
    category: 'pharmacology',
    categoryAr: 'علم الأدوية',
    sourcePages: [81,82],
    summary: 'أدوية تُعطى قبل التخدير لتحقيق هدف محدد مثل تخفيف القلق، تقليل PONV أو تقليل خطر الاستنشاق في مريض عالي الخطورة؛ لا تُعطى كل الفئات لكل مريض.',
    sections: [
      {
        title: 'الأهداف المحتملة | Possible goals',
        items: [
          'تخفيف القلق | Anxiolysis والتهدئة | Sedation عند الحاجة.',
          'تسكين الألم | Analgesia في حالات مختارة.',
          'الوقاية من الغثيان والقيء | PONV prophylaxis للمرضى المعرضين.',
          'تقليل حموضة/حجم محتوى المعدة عند خطر الاستنشاق المرتفع | Aspiration-risk pharmacologic prophylaxis.'
        ]
      },
      {
        title: 'فئات مستخدمة | Drug classes',
        items: [
          'بنزوديازيبينات | Benzodiazepines مثل Midazolam.',
          'مضادات القيء | Antiemetics مثل Ondansetron أو Dexamethasone حسب الخطر.',
          'مضادات مستقبلات H2 أو مثبطات مضخة البروتون | H2 blockers / PPIs في سياقات مختارة.',
          'محفزات حركة المعدة | Prokinetics مثل Metoclopramide في بعض المرضى.',
          'مضادات كولين | Anticholinergics عند استطباب محدد، وليست روتينية لكل مريض.'
        ]
      }
    ],
    correction: 'المصدر يعرض فوائد ما قبل التخدير كأنها قائمة ثابتة. الممارسة الحديثة فردية؛ ASA لا توصي بإعطاء مضادات الحموضة أو مضادات الكولين أو عدة أدوية روتينيًا لمريض سليم دون زيادة واضحة في خطر الاستنشاق.',
    tags: ['premedication','antiemetic','benzodiazepine','aspiration prophylaxis']
  },
  {
    id: 'intraoperative-monitoring',
    titleAr: 'المراقبة أثناء التخدير',
    titleEn: 'Intraoperative Monitoring',
    category: 'general',
    categoryAr: 'التخدير العام',
    sourcePages: [83],
    summary: 'المراقبة الأساسية أثناء التخدير تركز باستمرار على الأكسجة | Oxygenation والتهوية | Ventilation والدورة الدموية | Circulation والحرارة | Temperature.',
    sections: [
      {
        title: 'الأكسجة والتهوية | Oxygenation & ventilation',
        items: [
          'تشبع الأوكسجين | SpO₂ بواسطة Pulse oximetry.',
          'الأوكسجين المستنشق | Inspired O₂ عند استخدام محطة التخدير.',
          'ثاني أوكسيد الكربون الزفيري | EtCO₂ / Capnography عند التخدير العام أو التهوية وفق المعيار.',
          'حركة الصدر ودائرة التنفس وضغوط/أحجام جهاز التنفس | Chest movement / ventilator parameters.'
        ]
      },
      {
        title: 'الدورة الدموية | Circulation',
        items: [
          'تخطيط القلب | ECG.',
          'ضغط الدم | Blood pressure بصورة دورية أو مستمرة حسب الحالة.',
          'معدل القلب | Heart rate والتروية السريرية | Perfusion.'
        ]
      },
      {
        title: 'أخرى | Other',
        items: [
          'درجة الحرارة | Temperature عند توقع تغير مهم أو عند الحاجة.',
          'الحصار العصبي العضلي | Neuromuscular monitoring عندما تُستخدم المرخيات.',
          'إخراج البول | Urine output في الحالات المناسبة وليس كمتطلب لكل إجراء قصير.'
        ]
      }
    ],
    correction: '“30 mL/hour طبيعي للجميع” ليس هدفًا ثابتًا. إخراج البول يُفسر بالنسبة للوزن والسياق ومدة الجراحة، كما أن معالجة كل نقص عابر بإعطاء سوائل ليست مدعومة تلقائيًا.',
    tags: ['monitoring','SpO2','EtCO2','ECG','blood pressure','temperature','urine output']
  },
  {
    id: 'perioperative-blood-loss',
    titleAr: 'تقدير فقد الدم أثناء العملية',
    titleEn: 'Perioperative Blood Loss Estimation',
    category: 'general',
    categoryAr: 'التخدير العام',
    sourcePages: [83],
    summary: 'تقدير فقد الدم يعتمد على تجميع عدة مصادر مع طرح سوائل الغسل وربط الرقم بالديناميكا الدموية والتحاليل والسياق.',
    sections: [
      {
        title: 'مصادر التقدير | Sources',
        items: [
          'حجم الدم في جهاز الشفط بعد طرح سوائل الغسل | Suction canister minus irrigation.',
          'وزن الشاش والمواد الماصة قبل/بعد الاستخدام | Gravimetric sponge assessment عندما يُستخدم.',
          'الدم في الحقل الجراحي والستائر | Surgical field / drapes.',
          'الهيموغلوبين والتحاليل المتسلسلة وحالة المريض | Serial labs / clinical context.'
        ]
      }
    ],
    correction: 'قاعدة “الشاش غير الممتلئ = 5 mL، الممتلئ = 10 mL، والـpack = 30 mL” غير موثوقة. التقدير البصري لفقد الدم معروف بعدم الدقة، لذلك لا تُعرض هذه الأرقام كحقائق ثابتة.',
    tags: ['blood loss','EBL','gravimetric','suction','نزف']
  }
];
