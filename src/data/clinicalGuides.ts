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
  }
];
