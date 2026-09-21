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
  sourceLabel?: string;
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
    id: 'anesthesia-recovery',
    titleAr: 'الإفاقة من التخدير',
    titleEn: 'Recovery from Anesthesia',
    category: 'recovery',
    categoryAr: 'الإفاقة',
    sourcePages: [32,33],
    summary: 'فترة الإفاقة تبدأ مع إيقاف أو خفض عوامل التخدير وتمتد حتى استعادة الوعي والتهوية والاستقرار ومنعكسات حماية مجرى الهواء بدرجة مناسبة.',
    sections: [
      {
        title: 'المراقبة أثناء الإفاقة | Recovery monitoring',
        items: [
          'مراقبة مستمرة وقريبة حتى تزول التأثيرات الحادة للتخدير والجراحة.',
          'تقييم مجرى الهواء ومعدل التنفس وتشبع الأوكسجين | Airway / respiratory rate / SpO₂.',
          'مراقبة النبض وضغط الدم، ويكون ECG متاحًا ويُستخدم حسب الحالة.',
          'تقييم الوعي والحرارة والألم والغثيان والقيء | Mental status / temperature / pain / PONV.',
          'تقييم وظيفة العضلات عند استخدام مرخيات غير مزيلة للاستقطاب | Neuromuscular recovery.'
        ]
      },
      {
        title: 'الخطوات العملية | Practical steps',
        items: [
          'إيقاف أو خفض عوامل التخدير عند نهاية الإجراء | Discontinue / reduce anesthetics.',
          'توفير الأوكسجين ومراقبة الأكسجة، مع إعطائه حسب الحاجة السريرية.',
          'الشفط الفموي البلعومي عند الحاجة لإزالة الإفرازات أو الدم | Oropharyngeal suction when indicated.',
          'التأكد من عودة التهوية التلقائية الكافية والاستقرار قبل إزالة جهاز مجرى الهواء.',
          'إزالة ETT أو LMA عندما تتحقق معايير الإزالة المناسبة، مع بقاء خطة إعادة تأمين مجرى الهواء جاهزة.'
        ]
      },
      {
        title: 'بعد المرخيات العضلية | After neuromuscular blockers',
        items: [
          'لا تعتمد جرعة ثابتة من Neostigmine + Atropine لكل مريض.',
          'يُفضّل القياس الكمي للحصار العصبي العضلي | Quantitative neuromuscular monitoring.',
          'قبل نزع الأنبوب بعد الحصار العضلي يُستهدف TOF ratio ≥ 0.9.',
          'اختيار عامل العكس يعتمد على نوع المرخي وعمق الحصار والاستجابة المقاسة.'
        ]
      },
      {
        title: 'جاهزية الخروج | Readiness',
        items: [
          'يجب أن يكون المريض متيقظًا أو مستجيبًا بصورة مناسبة، مع تهوية وأكسجة ودورة دموية مستقرة.',
          'يمكن استخدام Modified Aldrete Score كجزء من قرار الخروج من Phase I PACU مع الحكم السريري وبروتوكول المؤسسة.'
        ]
      }
    ],
    tags: ['recovery','PACU','emergence','extubation','monitoring','TOF','Aldrete']
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
    titleAr: 'فحص صالة وعربة التخدير قبل الحالة',
    titleEn: 'Pre-Anesthesia Room / Workstation Check',
    category: 'general',
    categoryAr: 'التخدير العام',
    sourcePages: [77],
    summary: 'فحص منظم قبل بدء التخدير للتأكد من مصادر الغازات، عربة التخدير، مجرى الهواء، الشفط، المراقبة، الأدوية وخطة الطوارئ.',
    sections: [
      {
        title: 'المحطة والغازات | Workstation & gases',
        items: [
          'تشغيل وفحص عربة التخدير | Anesthesia Machine check.',
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
    correction: 'الفحص الحديث لا يقتصر على قائمة ثابتة عامة؛ يجب اتباع قائمة فحص الشركة/المؤسسة وعربة التخدير نفسها، مع فحص آلي ويدوي حسب الجهاز.',
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
    summary: 'التحضير قبل التخدير قد يكون نفسيًا ودوائيًا، وتُختار الأدوية حسب هدف محدد مثل تخفيف القلق، التسكين، الوقاية من PONV أو تقليل خطر الاستنشاق عند المريض عالي الخطورة؛ لا تُعطى كل الفئات لكل مريض.',
    sections: [
      {
        title: 'الأهداف | Goals',
        items: [
          'تخفيف الخوف والقلق | Anxiolysis مع طمأنة المريض وشرح الخطة.',
          'التهدئة وفقدان الذاكرة عند الحاجة | Sedation / amnesia.',
          'تسكين الألم في حالات مختارة | Analgesia.',
          'تقليل الحاجة لبعض أدوية التحريض | Reduced induction-agent requirement عند اختيار دواء تمهيدي مناسب.',
          'تقليل الإفرازات أو منع بطء القلب الانعكاسي عند وجود استطباب | Antisialagogue / vagolytic effect when indicated.',
          'الوقاية من الغثيان والقيء | PONV prophylaxis للمرضى المعرضين.',
          'رفع pH أو تقليل حجم محتوى المعدة دوائيًا عند ارتفاع خطر الاستنشاق | Aspiration-risk pharmacologic prophylaxis.'
        ]
      },
      {
        title: 'فئات مذكورة بالمصدر | Drug classes in the source',
        items: [
          'بنزوديازيبينات | Benzodiazepines مثل Midazolam أو Diazepam للقلق/التهدئة وفقدان الذاكرة عند الحاجة.',
          'مضادات كولين | Anticholinergics مثل Atropine أو Glycopyrrolate عند استطباب محدد، وليست روتينية لكل مريض.',
          'أفيونات | Opioids مثل Morphine أو Pethidine أو Fentanyl للتسكين في حالات مختارة؛ قد تسبب غثيانًا، حكة، تثبيطًا تنفسيًا أو هبوط ضغط.',
          'مضادات القيء | Antiemetics مثل Ondansetron أو Dexamethasone أو Droperidol حسب خطر PONV.',
          'محفزات حركة المعدة | Prokinetics مثل Metoclopramide في مرضى مختارين.',
          'مضادات مستقبلات H2 أو مثبطات مضخة البروتون | H2 blockers / PPIs عند ارتفاع خطر الاستنشاق، وليس بصورة روتينية لكل مريض.',
          'مضادات الهستامين | Antihistamines مثل Diphenhydramine عند وجود استطباب محدد، وليست وقاية روتينية للجميع.'
        ]
      },
      {
        title: 'نقاط أمان | Safety',
        items: [
          'اختيار الدواء والجرعة يعتمد على العمر، الهشاشة، الأمراض المصاحبة، خطر الاستنشاق وخطر تثبيط التنفس.',
          'كبار السن أكثر عرضة للتهدئة المطولة وتأخر الإفاقة مع بعض المهدئات.',
          'لا تُستخدم عدة أدوية تمهيدية تلقائيًا لمجرد أن المريض سيخضع للتخدير.'
        ]
      }
    ],
    tags: ['premedication','anxiolysis','antiemetic','benzodiazepine','opioid','anticholinergic','aspiration prophylaxis']
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
          'الأوكسجين المستنشق | Inspired O₂ عند استخدام عربة التخدير.',
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
  },
  {
    id: 'vomiting-regurgitation-aspiration',
    titleAr: 'القيء والقلس والاستنشاق الرئوي',
    titleEn: 'Vomiting, Regurgitation and Pulmonary Aspiration',
    category: 'airway',
    categoryAr: 'مجرى الهواء',
    sourcePages: [84,85,86],
    summary: 'القلس | Regurgitation قد يحدث دون الجهد العضلي المميز للقيء | Vomiting، والخطر الأهم أثناء التخدير هو دخول محتويات المعدة إلى الرئة | Pulmonary aspiration.',
    sections: [
      {
        title: 'عوامل الخطورة | Risk factors',
        items: [
          'جراحة طارئة أو صيام غير كافٍ | Emergency surgery / inadequate fasting.',
          'انسداد الأمعاء أو تأخر إفراغ المعدة | Bowel obstruction / delayed gastric emptying.',
          'الحمل والسمنة وحالات زيادة الضغط داخل البطن | Pregnancy / obesity / raised intra-abdominal pressure.',
          'ضعف منعكسات حماية مجرى الهواء تحت التخدير | Depressed airway protective reflexes.'
        ]
      },
      {
        title: 'إذا حدث الاستنشاق | If aspiration occurs',
        items: [
          'إيقاف المنبه وشفط الفم والبلعوم سريعًا | Prompt oropharyngeal suction.',
          'وضعية مناسبة لتقليل دخول المزيد من المادة | Head-down / lateral positioning when feasible.',
          'تأمين مجرى الهواء ودعم الأكسجة والتهوية | Airway protection / oxygenation / ventilation.',
          'شفط الأنبوب الرغامي وقد يلزم تنظير القصبات للجزيئات الكبيرة | Tracheal suction / bronchoscopy for particulate material.'
        ]
      }
    ],
    correction: 'Metoclopramide | ميتوكلوبراميد ليس “مضاد حموضة”؛ هو دواء محفز لحركة المعدة ومضاد للقيء | Prokinetic antiemetic. كما أن المضادات الحيوية | Antibiotics والكورتيكوستيرويدات | Corticosteroids لا تُعطى روتينيًا لكل حالة aspiration pneumonitis؛ معظم الحالات الكيميائية تُعالج دعمياً وتُستخدم المضادات عند وجود دلائل عدوى أو استمرار/تدهور مناسب.',
    tags: ['aspiration','vomiting','regurgitation','Mendelson','قيء','قلس','استنشاق رئوي']
  },
  {
    id: 'laryngospasm',
    titleAr: 'تشنج الحنجرة',
    titleEn: 'Laryngospasm',
    category: 'airway',
    categoryAr: 'مجرى الهواء',
    sourcePages: [87],
    summary: 'انغلاق انعكاسي مستمر للمزمار | Sustained reflex glottic closure قد يسبب انسدادًا جزئيًا أو كاملًا لمجرى الهواء ونقص أكسجة سريعًا.',
    sections: [
      {
        title: 'محفزات شائعة | Common triggers',
        items: [
          'تحفيز مجرى الهواء في تخدير خفيف | Airway stimulation at light anesthesia.',
          'دم أو إفرازات أو قيء حول الحنجرة | Blood / secretions / vomitus.',
          'التنظير أو نزع الأنبوب أو إدخال جهاز مجرى هوائي عند عمق غير مناسب | Laryngoscopy / extubation / airway device stimulation.'
        ]
      },
      {
        title: 'التدبير الفوري | Immediate management',
        items: [
          'إزالة المنبه وطلب المساعدة | Remove stimulus / call for help.',
          'أوكسجين 100% مع ضغط إيجابي مستمر بقناع محكم | 100% O₂ + CPAP.',
          'دفع الفك بقوة | Vigorous jaw thrust وفتح مجرى الهواء.',
          'تعميق التخدير عند الحاجة | Deepen anesthesia.',
          'إذا استمر الانغلاق أو حدث نقص أكسجة: مرخٍ سريع مثل سكساميثونيوم | Succinylcholine وفق الجرعة المناسبة والسياق.'
        ]
      }
    ],
    correction: 'تشنج الحنجرة الكامل حالة طارئة ولا يُنتظر أن “تنتهي خلال 20–30 دقيقة”. الأولوية للعلاج الفوري. إدخال airway فموي وحده لا يفتح الأحبال الصوتية المغلقة، ومحاولة التهوية العنيفة قد تنفخ المعدة.',
    tags: ['laryngospasm','airway obstruction','succinylcholine','CPAP','تشنج الحنجرة']
  },
  {
    id: 'airway-obstruction',
    titleAr: 'انسداد مجرى الهواء',
    titleEn: 'Airway Obstruction',
    category: 'airway',
    categoryAr: 'مجرى الهواء',
    sourcePages: [88,91,92],
    summary: 'قد يكون الانسداد علويًا بسبب اللسان أو الأنسجة الرخوة أو تشنج الحنجرة، أو بسبب جسم غريب/إفرازات، أو مشكلة في الأنبوب أو دائرة التنفس.',
    sections: [
      {
        title: 'علامات | Signs',
        items: [
          'حركة صدر أو كيس خزان قليلة/معدومة | Reduced chest / reservoir-bag movement.',
          'سحب فوق القص وبين الأضلاع | Suprasternal / intercostal retractions.',
          'شخير أو أصوات مجرى هوائي | Snoring / noisy breathing.',
          'صعوبة مرور الغاز وارتفاع مقاومة التهوية | Difficult ventilation / increased resistance.',
          'انخفاض SpO₂ علامة متأخرة نسبيًا حسب احتياطي الأوكسجين | Falling oxygen saturation.'
        ]
      },
      {
        title: 'أسباب ميكانيكية | Mechanical causes',
        items: [
          'انثناء الأنبوب | Kinking.',
          'انسداد الأنبوب بالإفرازات أو الدم | Mucus / blood obstruction.',
          'انفصال الدائرة | Circuit disconnection.',
          'عض الأنبوب | Tube biting.'
        ]
      }
    ],
    correction: 'الزرقة | Cyanosis علامة متأخرة وغير حساسة لنقص الأكسجة، لذلك لا ينبغي انتظار ظهورها؛ المراقبة بـPulse oximetry وCapnography وكشف تغير التهوية أبكر وأكثر فائدة.',
    tags: ['airway obstruction','kinking','disconnection','cyanosis','انسداد مجرى الهواء']
  },
  {
    id: 'delayed-emergence',
    titleAr: 'تأخر الإفاقة من التخدير',
    titleEn: 'Delayed Emergence from Anesthesia',
    category: 'recovery',
    categoryAr: 'الإفاقة',
    sourcePages: [89,90],
    summary: 'عدم عودة الوعي بالمعدل المتوقع بعد إيقاف أدوية التخدير؛ أكثر الأسباب شيوعًا بقايا الأدوية، لكن يجب التفكير أيضًا في أسباب تنفسية واستقلابية وعصبية.',
    sections: [
      {
        title: 'أسباب دوائية | Drug-related',
        items: [
          'بقايا المنومات أو الأفيونات أو المهدئات | Residual hypnotics / opioids / sedatives.',
          'حصار عصبي عضلي متبقٍ | Residual neuromuscular blockade.',
          'جرعة زائدة أو تداخل دوائي | Overdose / drug interaction.',
          'بطء الاستقلاب أو الإطراح في أمراض الكبد أو الكلى | Reduced metabolism / elimination.'
        ]
      },
      {
        title: 'أسباب غير دوائية | Non-drug causes',
        items: [
          'نقص الحرارة | Hypothermia.',
          'نقص أو ارتفاع السكر | Hypoglycemia / hyperglycemia.',
          'اضطراب الصوديوم والكالسيوم والمغنيسيوم أو الحماض | Electrolyte disturbance / acidosis.',
          'نقص الأكسجة أو فرط ثاني أوكسيد الكربون | Hypoxemia / hypercapnia.',
          'أسباب عصبية مثل النزف أو السكتة | Neurologic event.'
        ]
      },
      {
        title: 'التقييم | Assessment',
        items: [
          'ABC: مجرى الهواء والتنفس والدورة الدموية | Airway / Breathing / Circulation.',
          'SpO₂ وEtCO₂ والحرارة والضغط والنبض | Oxygenation / ventilation / temperature / hemodynamics.',
          'مراجعة الأدوية والجرعات والتوقيت | Drug review.',
          'فحص السكر والشوارد/غازات الدم عند الحاجة | Glucose / electrolytes / blood gas.',
          'استخدام مضادات نوعية عند وجود استطباب | Specific antagonists when indicated.'
        ]
      }
    ],
    correction: 'الإدرار القسري | Forced diuresis ليس علاجًا روتينيًا لتأخر الإفاقة من أدوية التخدير. التدبير الصحيح هو دعم الوظائف الحيوية وتحديد السبب وعلاجه.',
    tags: ['delayed emergence','recovery','hypothermia','hypercapnia','تأخر الإفاقة']
  },
  {
    id: 'extubation-readiness',
    titleAr: 'الاستعداد لنزع الأنبوب الرغامي',
    titleEn: 'Readiness for Tracheal Extubation',
    category: 'recovery',
    categoryAr: 'الإفاقة',
    sourcePages: [91],
    summary: 'نزع الأنبوب | Extubation قرار سريري يجمع بين كفاية التنفس والأكسجة، عودة الوعي/منعكسات مجرى الهواء، الاستقرار الدوري، وزوال الحصار العضلي.',
    sections: [
      {
        title: 'قبل النزع | Before extubation',
        items: [
          'تهوية تلقائية كافية | Adequate spontaneous ventilation مع EtCO₂ مناسب للسياق.',
          'أكسجة مناسبة | Adequate oxygenation على FiO₂ معقولة.',
          'قدرة على حماية مجرى الهواء | Airway protective reflexes / appropriate consciousness.',
          'استقرار ديناميكي دموي | Hemodynamic stability.',
          'درجة حرارة مقبولة | Normothermia / adequate temperature.',
          'عكس الحصار العضلي وتأكيد التعافي الكمي | Quantitative neuromuscular recovery.'
        ]
      }
    ],
    correction: 'لا توجد مجموعة أرقام ثابتة مثل VT >6 mL/kg وRR 12–20 وSpO₂ >95% تصلح لكل المرضى. بعد استخدام المرخيات غير المزيلة للاستقطاب، الهدف الحديث هو TOF ratio ≥0.9 بقياس كمي قبل نزع الأنبوب. وعدد وحدات الدم المنقولة ليس معيارًا لنزع الأنبوب.',
    tags: ['extubation','TOF','neuromuscular recovery','airway reflexes','نزع الانبوب']
  },
  {
    id: 'apnea',
    titleAr: 'انقطاع النفس',
    titleEn: 'Apnea',
    category: 'airway',
    categoryAr: 'مجرى الهواء',
    sourcePages: [92],
    summary: 'غياب التنفس التلقائي | Absence of spontaneous breathing، وقد ينتج من الأدوية أو الحصار العضلي أو اضطراب عصبي/استقلابي أو بعد انسداد شديد.',
    sections: [
      {
        title: 'أسباب أثناء التخدير | Perioperative causes',
        items: [
          'المنومات والأفيونات والمهدئات | Hypnotics / opioids / sedatives.',
          'المرخيات العضلية | Neuromuscular blockers.',
          'حصار عضلي متبقٍ أو Suxamethonium apnea | Residual block / prolonged succinylcholine apnea.',
          'تخدير عميق جدًا | Excessive anesthetic depth.',
          'أسباب عصبية أو استقلابية | Neurologic / metabolic causes.'
        ]
      },
      {
        title: 'التدبير | Management',
        items: [
          'تأمين مجرى الهواء | Open / secure airway.',
          'تهوية إيجابية مع أوكسجين حسب الحاجة | Positive-pressure ventilation / oxygen.',
          'فحص EtCO₂ وSpO₂ والدورة الدموية | Ventilation / oxygenation / circulation assessment.',
          'عكس السبب الدوائي عندما يكون هناك مضاد مناسب | Reversal when indicated.'
        ]
      }
    ],
    correction: 'الانسداد | Airway obstruction ليس مرادفًا لانقطاع النفس | Apnea؛ قد يكون المريض يبذل جهدًا تنفسيًا ضد مجرى هوائي مغلق. كذلك فشل مصدر الأوكسجين مشكلة منفصلة عن تعريف apnea.',
    tags: ['apnea','ventilation','respiratory depression','انقطاع النفس']
  },
  {
    id: 'hypoxemia-cyanosis',
    titleAr: 'نقص أكسجة الدم والزرقة',
    titleEn: 'Hypoxemia and Cyanosis',
    category: 'airway',
    categoryAr: 'مجرى الهواء',
    sourcePages: [92,93],
    summary: 'نقص أكسجة الدم | Hypoxemia هو انخفاض الأوكسجين في الدم الشرياني؛ الزرقة | Cyanosis تغير لوني قد يظهر عند زيادة الهيموغلوبين غير المؤكسج لكنها ليست وسيلة حساسة للكشف المبكر.',
    sections: [
      {
        title: 'أسباب حول الجراحة | Perioperative causes',
        items: [
          'انسداد مجرى الهواء | Airway obstruction.',
          'نقص التهوية | Hypoventilation.',
          'عدم تطابق V/Q أو التحويلة | V/Q mismatch / shunt.',
          'انفصال الدائرة أو نقص إمداد الأوكسجين | Circuit disconnection / oxygen supply problem.',
          'تشنج قصبي أو شفط رئوي | Bronchospasm / aspiration.'
        ]
      },
      {
        title: 'التعامل | Response',
        items: [
          'رفع FiO₂ وتقييم مجرى الهواء والتهوية فورًا | Increase inspired oxygen / assess airway and ventilation.',
          'فحص الدائرة والأنبوب ومصدر الغاز | Circuit / tube / gas source check.',
          'استخدام Pulse oximetry وCapnography والتقييم السريري معًا | Multimodal monitoring.'
        ]
      }
    ],
    correction: 'الزرقة قد تكون غائبة رغم نقص أكسجة مهم، وقد تتأخر خصوصًا في فقر الدم. لا تُستخدم وحدها كمؤشر للأكسجة.',
    tags: ['hypoxemia','cyanosis','SpO2','oxygenation','نقص الاكسجة']
  },
  {
    id: 'massive-transfusion',
    titleAr: 'النقل الدموي الكبير ومضاعفاته',
    titleEn: 'Massive Transfusion and Complications',
    category: 'general',
    categoryAr: 'التخدير العام',
    sourcePages: [94],
    summary: 'النقل الكبير للدم | Massive transfusion قد ينقذ الحياة في النزف الشديد، لكنه قد يسبب اضطرابات تخثر وشوارد وحرارة وتوازن حمضي-قاعدي.',
    sections: [
      {
        title: 'مضاعفات مهمة | Important complications',
        items: [
          'اعتلال التخثر التخفيفي والاستهلاكي | Dilutional / consumptive coagulopathy.',
          'قلة الصفيحات | Thrombocytopenia.',
          'نقص الكالسيوم بسبب السيترات | Citrate-related hypocalcemia.',
          'اضطرابات البوتاسيوم | Potassium abnormalities.',
          'انخفاض الحرارة | Hypothermia.',
          'اضطرابات الحمض والقاعدة | Acid-base disturbances.'
        ]
      },
      {
        title: 'المراقبة | Monitoring',
        items: [
          'حرارة المريض وتسخين الدم/السوائل عند الحاجة | Temperature / warming.',
          'Ionized calcium والشوارد وغازات الدم | Electrolytes / blood gas.',
          'الهيموغلوبين والصفائح واختبارات التخثر أو الاختبارات اللزجة المرنة حسب التوفر | CBC / coagulation / viscoelastic testing.'
        ]
      }
    ],
    correction: 'تعريف massive transfusion ليس محصورًا بـ10–20 وحدة دائمًا؛ توجد تعريفات متعددة وتُستخدم بروتوكولات نزف كبير تعتمد على سرعة النزف واحتياجات المريض. العلاج الحديث يوازن مكونات الدم ويراقب الكالسيوم والحرارة والتخثر.',
    tags: ['massive transfusion','coagulopathy','hypocalcemia','blood products','نقل دم']
  },
  {
    id: 'acute-transfusion-reaction',
    titleAr: 'التفاعل الحاد لنقل الدم',
    titleEn: 'Acute Transfusion Reaction',
    category: 'general',
    categoryAr: 'التخدير العام',
    sourcePages: [95,96],
    summary: 'أي تغير غير متوقع أثناء نقل الدم—مثل هبوط الضغط، الحمى، طفح، ضيق نفس، نزف أو ارتفاع ضغط مجرى الهواء—يستدعي التفكير بتفاعل نقل دم.',
    sections: [
      {
        title: 'الإجراء الأول | Immediate actions',
        items: [
          'إيقاف نقل الدم فورًا | Stop the transfusion.',
          'تقييم ABC ودعم الأوكسجة والدورة الدموية | Airway / breathing / circulation support.',
          'إبقاء خط وريدي مفتوح بمحلول مناسب دون إعادة تشغيل وحدة الدم | Maintain IV access.',
          'إعادة التحقق من هوية المريض والوحدة | Clerical / identity check.',
          'إبلاغ بنك الدم والفريق المسؤول وإرسال العينات/الوحدة حسب البروتوكول | Notify blood bank / reaction workup.'
        ]
      },
      {
        title: 'أسباب مهمة | Important causes',
        items: [
          'انحلال دم حاد بسبب عدم توافق ABO | Acute hemolytic transfusion reaction.',
          'تفاعل تحسسي أو تأق | Allergic reaction / anaphylaxis.',
          'تلوث جرثومي | Bacterial contamination.',
          'إصابة رئوية حادة مرتبطة بالنقل | TRALI.',
          'حمل حجمي زائد مرتبط بالنقل | TACO.'
        ]
      }
    ],
    correction: 'لا توجد وصفة واحدة من مضاد هيستامين + ستيرويد + مدر بول لكل تفاعل. بعد إيقاف الدم ودعم ABC، العلاج يعتمد على نوع التفاعل؛ مثلًا TACO يختلف عن TRALI أو الانحلال الدموي.',
    tags: ['transfusion reaction','ABO','TRALI','TACO','hemolysis','نقل الدم']
  },
  {
    id: 'perioperative-hypotension',
    titleAr: 'انخفاض ضغط الدم أثناء التخدير',
    titleEn: 'Perioperative Hypotension',
    category: 'general',
    categoryAr: 'التخدير العام',
    sourcePages: [98],
    summary: 'هبوط الضغط | Hypotension أثناء التخدير ليس رقم SBP واحدًا؛ المهم هو انخفاض ضغط التروية بالنسبة لخط الأساس وحالة المريض ومدته.',
    sections: [
      {
        title: 'أسباب | Causes',
        items: [
          'توسع الأوعية أو تثبيط عضلة القلب بالأدوية | Vasodilation / myocardial depression.',
          'نقص حجم الدم أو النزف | Hypovolemia / hemorrhage.',
          'حساسية مفرطة أو إنتان | Anaphylaxis / sepsis.',
          'اضطراب نظم أو فشل قلبي | Arrhythmia / heart failure.',
          'استرواح صدر ضاغط أو اندكاك قلبي | Tension pneumothorax / cardiac tamponade.'
        ]
      },
      {
        title: 'المعالجة | Management',
        items: [
          'تقييم السبب وتصحيحه | Identify / treat cause.',
          'تقليل عمق التخدير إذا كان زائدًا | Reduce excessive anesthetic depth.',
          'سوائل أو دم عند وجود نقص حجم مناسب | Fluids / blood when volume deficit exists.',
          'رافع ضغط مناسب مثل Phenylephrine أو Ephedrine أو Norepinephrine حسب الآلية | Cause-directed vasopressor.'
        ]
      }
    ],
    correction: 'تعريف SBP <100 mmHg كهبوط ضغط للجميع قديم وغير دقيق. في البالغين يرتبط MAP أقل من نحو 65 mmHg بزيادة أذية الأعضاء في عدة دراسات، لكن الهدف يجب أن يُفرد حسب خط الأساس والأمراض المزمنة مثل Hypertension.',
    tags: ['hypotension','MAP','vasopressor','phenylephrine','ephedrine','هبوط الضغط']
  },
  {
    id: 'perioperative-hypertension',
    titleAr: 'ارتفاع ضغط الدم حول الجراحة',
    titleEn: 'Perioperative Hypertension',
    category: 'general',
    categoryAr: 'التخدير العام',
    sourcePages: [97],
    summary: 'ارتفاع الضغط | Hypertension حول الجراحة قد يكون مزمنًا أو استجابة حادة للألم، القلق، نقص عمق التخدير، امتلاء المثانة، فرط CO₂ أو أدوية معينة.',
    sections: [
      {
        title: 'أثناء التخدير | Intraoperative approach',
        items: [
          'تأكد من عمق التخدير والتسكين | Anesthetic depth / analgesia.',
          'صحح نقص الأكسجة وفرط CO₂ | Hypoxemia / hypercapnia.',
          'عالج الألم أو امتلاء المثانة أو المنبه الجراحي | Pain / bladder / surgical stimulus.',
          'استخدم دواء خافضًا مناسبًا إذا استمر الارتفاع | Cause-directed antihypertensive.'
        ]
      }
    ],
    correction: 'لا يُتعامل مع ضغط الجراحة بجدول أرقام منفصل عن خط الأساس. الأهداف تُفرد حسب المريض، ومرضى ارتفاع الضغط المزمن قد يحتاجون ضغط تروية أعلى من المرضى الأصحاء.',
    tags: ['hypertension','blood pressure','perioperative','ارتفاع الضغط']
  },
  {
    id: 'perioperative-arrhythmias',
    titleAr: 'اضطرابات النظم أثناء التخدير',
    titleEn: 'Perioperative Arrhythmias',
    category: 'general',
    categoryAr: 'التخدير العام',
    sourcePages: [99,100,101],
    summary: 'اضطراب النظم | Arrhythmia هو اضطراب في تكوين النبضة أو توصيلها وقد يظهر قبل التخدير أو أثناءه بسبب مرض قلبي أو عامل قابل للتصحيح.',
    sections: [
      {
        title: 'التصنيف الموجود بالمصدر | Source classification',
        items: [
          'فوق بطيني | Supraventricular: مثل Sinus bradycardia، Sinus tachycardia، Atrial fibrillation والضربات الأذينية الهاجرة.',
          'وصلي | Junctional arrhythmia.',
          'بطيني | Ventricular: مثل Ventricular ectopic beats، Ventricular tachycardia وVentricular fibrillation.',
          'اضطرابات التوصيل | Conduction disorders: مثل Heart block أو مسار توصيل إضافي مثل Wolff-Parkinson-White.'
        ]
      },
      {
        title: 'أسباب ومحفزات مهمة | Important triggers',
        items: [
          'نقص أكسجة الدم | Hypoxemia وفرط ثاني أوكسيد الكربون | Hypercapnia.',
          'اختلال الشوارد أو الحمض-القاعدة | Electrolyte / acid-base disturbance.',
          'نقص تروية عضلة القلب | Myocardial ischemia.',
          'تحفيز المبهم | Vagal stimulation.',
          'الألم أو التحفيز الجراحي والتخدير غير الكافي | Pain / surgical stimulation / light anesthesia.',
          'الأدوية أو السمية الدوائية | Drugs / toxicologic causes.',
          'خلل جهاز تنظيم القلب أو تهيج القثاطر داخل القلب | Pacemaker malfunction / intracardiac catheter irritation.'
        ]
      },
      {
        title: 'بطء وتسرع القلب الجيبي | Sinus bradycardia / tachycardia',
        items: [
          'Sinus bradycardia قد يرتبط بنقص الأكسجة، تحفيز المبهم أو بعض الأدوية مثل β-blockers.',
          'Sinus tachycardia قد يرتبط بالألم، نقص الأكسجة، Hypercapnia، نقص الحجم أو الأدوية الودية/المضادة للكولين.'
        ]
      },
      {
        title: 'التقييم والتعامل | Assessment & management',
        items: [
          'حدد النظم ووجود النبض والاستقرار الديناميكي | Rhythm / pulse / hemodynamic stability.',
          'صحح السبب القابل للعلاج أولًا | Correct reversible causes.',
          'عند وجود عدم استقرار أو اضطراب نظم خطِر تُتبع خوارزمية الإنعاش القلبي المناسبة | ACLS-based management.'
        ]
      }
    ],
    tags: ['arrhythmia','bradycardia','tachycardia','atrial fibrillation','ventricular tachycardia','heart block','WPW','نظم القلب']
  },
  {
    id: 'heart-failure-anesthesia',
    titleAr: 'فشل القلب والتخدير',
    titleEn: 'Heart Failure and Anesthesia',
    category: 'general',
    categoryAr: 'التخدير العام',
    sourcePages: [102],
    summary: 'فشل القلب | Heart failure يزيد خطر المضاعفات حول الجراحة؛ التخطيط يعتمد على شدة الأعراض، وظيفة البطين، السبب، الجراحة والأدوية الحالية.',
    sections: [
      {
        title: 'أهداف التخدير | Anesthetic goals',
        items: [
          'الحفاظ على تروية مناسبة وتجنب هبوط الضغط المطول | Maintain perfusion / avoid prolonged hypotension.',
          'تجنب الحمل الحجمي الزائد | Avoid fluid overload.',
          'المحافظة على معدل ونظم قلب مناسبين | Appropriate heart rate / rhythm.',
          'تجنب الزيادة الكبيرة في afterload أو الانخفاض المفرط في preload حسب نوع الفشل | Tailored preload / afterload.'
        ]
      },
      {
        title: 'التخطيط | Planning',
        items: [
          'تقييم التعويض أو وجود فشل قلب حاد | Compensated vs decompensated HF.',
          'مراجعة Echo والأعراض والأدوية عند الحاجة | Echocardiography / symptoms / medications.',
          'اختيار التقنية والأدوية بالتدرج وبحسب الاحتياطي القلبي | Titrated anesthetic technique.'
        ]
      }
    ],
    correction: 'لا يوجد مخدر واحد “الأفضل” لكل مرضى فشل القلب. الاختيار يعتمد على الفيزيولوجيا؛ Etomidate قد يفيد للتحريض في بعض المرضى غير المستقرين لكن له محاذير، كما أن جرعات Propofol وغيرها تحتاج معايرة حذرة.',
    tags: ['heart failure','cardiac anesthesia','preload','afterload','فشل القلب']
  },
  {
    id: 'shock',
    titleAr: 'الصدمة الدورانية',
    titleEn: 'Circulatory Shock',
    category: 'general',
    categoryAr: 'التخدير العام',
    sourcePages: [103,104,105],
    summary: 'الصدمة | Shock هي فشل دوراني حاد يسبب نقص تروية الأنسجة وعدم كفاية توصيل الأوكسجين؛ انخفاض الضغط قد يحدث لكنه ليس التعريف الوحيد للصدمة.',
    sections: [
      {
        title: 'علامات مبكرة مذكورة بالمصدر | Early features',
        items: [
          'ضعف | Weakness.',
          'تسرع القلب | Tachycardia.',
          'تسرع التنفس | Tachypnea.',
          'تعرق وقلق | Sweating / anxiety.',
          'زيادة العطش | Increased thirst.',
          'هذه العلامات غير نوعية ويجب تفسيرها مع التروية والضغط والوعي والسبب المحتمل.'
        ]
      },
      {
        title: 'الأنواع الأربعة | Four mechanisms',
        items: [
          'نقص حجم | Hypovolemic shock: نزف أو فقد سوائل مثل القيء أو الإسهال الشديد أو الحروق.',
          'توزيعية | Distributive shock: مثل Sepsis أو Anaphylaxis أو Neurogenic shock.',
          'قلبية | Cardiogenic shock: فشل المضخة القلبية مثل الاحتشاء أو فشل القلب الشديد.',
          'انسدادية | Obstructive shock: مثل Tension pneumothorax أو Cardiac tamponade أو Massive pulmonary embolism.'
        ]
      },
      {
        title: 'التعامل الأولي حول العملية | Initial perioperative approach',
        items: [
          'تأمين الأكسجة والتهوية | Oxygenation / ventilation.',
          'الحصول على وصول وريدي مناسب وسريع، وقد نحتاج أكثر من خط واسع عند الإنعاش الحجمي أو النزف.',
          'معايرة جرعات أدوية التخدير بحذر في المريض المصاب بالصدمة بسبب عدم الاستقرار الدوراني.',
          'السيطرة على السبب: النزف، الإنتان، التأق، الانسداد أو المشكلة القلبية | Cause control.'
        ]
      },
      {
        title: 'مبادئ الإنعاش | Resuscitation principles',
        items: [
          'سوائل أو دم عند وجود نقص حجم مناسب | Fluids / blood when indicated.',
          'رافعات ضغط أو مقويات قلب حسب آلية الصدمة | Vasopressors / inotropes according to mechanism.',
          'لا يوجد دواء واحد مثل Adrenaline أو Hydrocortisone يُعطى بصورة افتراضية لكل أنواع الصدمة.',
          'مراقبة التروية والاستجابة: الوعي، البول، اللاكتات والديناميكا الدموية | Mental status / urine / lactate / hemodynamics.'
        ]
      }
    ],
    tags: ['shock','hypovolemic','distributive','cardiogenic','obstructive','صدمة']
  },
  {
    id: 'liver-disease-anesthesia',
    titleAr: 'أمراض الكبد والتخدير',
    titleEn: 'Liver Disease and Anesthesia',
    category: 'general',
    categoryAr: 'التخدير العام',
    sourcePages: [106],
    summary: 'أمراض الكبد | Liver disease قد تغيّر الاستقلاب والارتباط بالبروتين والحجم الظاهري والتخثر والديناميكا الدموية، لذلك تُعاير أدوية التخدير بحسب شدة المرض وتأثيرها.',
    sections: [
      {
        title: 'تغيرات مهمة | Important changes',
        items: [
          'نقص تصنيع بروتينات البلازما | Reduced plasma protein synthesis قد يزيد الجزء الحر لبعض الأدوية.',
          'انخفاض الاستقلاب أو الإطراح الكبدي/الصفراوي | Reduced hepatic metabolism / biliary excretion قد يطيل تأثير بعض الأدوية.',
          'الدوران مفرط الديناميكية | Hyperdynamic circulation مع توسع وعائي | Vasodilation شائع في التليف المتقدم.',
          'اعتلال التخثر ونقص الصفائح | Coagulopathy / thrombocytopenia مهمان قبل الإجراءات المحورية العصبية.'
        ]
      },
      {
        title: 'اختيار الأدوية | Drug selection',
        items: [
          'بروبوفول | Propofol يمكن استخدامه بجرعات معايرة بعناية حسب الاستجابة.',
          'البنزوديازيبينات | Benzodiazepines قد يطول تأثيرها وقد تساهم في الاعتلال الدماغي الكبدي | Hepatic encephalopathy؛ تُستخدم بحذر.',
          'ريميفنتانيل | Remifentanil يعتمد على إستيرازات الأنسجة/الدم وليس الاستقلاب الكبدي، لذلك تأثير مرض الكبد عليه أقل.',
          'أتراكوريوم وسيساتراكوريوم | Atracurium / Cisatracurium مناسبان لأن التخلص منهما لا يعتمد أساسًا على الكبد.',
          'روكورونيوم وفيكورونيوم | Rocuronium / Vecuronium قد يطول حصارهما في المرض الكبدي المتقدم؛ يلزم Neuromuscular monitoring.'
        ]
      },
      {
        title: 'عوامل استنشاقية | Volatile agents',
        items: [
          'سيفوفلوران وإيزوفلوران وديسفلوران | Sevoflurane / Isoflurane / Desflurane ذات استقلاب كبدي منخفض نسبيًا وتُستخدم بحسب الحالة الديناميكية.',
          'هالوثان | Halothane قد يسبب Halothane hepatitis وأصبح نادر الاستخدام؛ يُتجنب خصوصًا عند وجود مرض كبدي أو قصة أذية كبدية مرتبطة به.'
        ]
      }
    ],
    correction: 'القول إن Fentanyl “لا يتأثر إطلاقًا” بخلل الكبد أو أن Isoflurane هو الخيار الوحيد الموصى به مبسّط أكثر من اللازم. الاختيار الحديث يعتمد على شدة المرض والاستجابة؛ Remifentanil أكثر استقلالًا عن الكبد، وAtracurium/Cisatracurium يملكان ميزة واضحة في التخلص غير الكبدي.',
    tags: ['liver disease','cirrhosis','hepatic failure','anesthesia','hepatic encephalopathy']
  },
  {
    id: 'anesthesia-history',
    titleAr: 'محطات من تاريخ التخدير',
    titleEn: 'Milestones in the History of Anesthesia',
    category: 'general',
    categoryAr: 'التخدير العام',
    sourcePages: [4],
    summary: 'المصدر يلخص محطات مبكرة من تطور التخدير؛ أُعيد ترتيبها هنا كخط زمني تعليمي مع تصحيح التواريخ والمصطلحات الأساسية.',
    sections: [
      {
        title: 'محطات رئيسية | Key milestones',
        items: [
          'هوراس ويلز | Horace Wells استخدم Nitrous oxide لخلع سن في ديسمبر 1844، ثم عرض التقنية عام 1845.',
          'ويليام مورتون | William T. G. Morton قدّم العرض العام الناجح الشهير للتخدير بالإيثر | Ether anesthesia في 16 أكتوبر 1846.',
          'أوليفر وندل هولمز | Oliver Wendell Holmes اقترح مصطلحي Anaesthetic وAnaesthesia عام 1846.',
          'جون سنو | John Snow أعطى Chloroform للملكة Victoria أثناء الولادة عام 1853 ثم 1857.',
          'كارل كولر | Karl Koller أدخل Cocaine للتخدير الموضعي العيني سريريًا عام 1884.',
          'هنري بويل | Henry E. G. Boyle طوّر عربة التخدير المستمرة الجريان المعروفة تاريخيًا باسم Boyle machine عام 1917.',
          'Cyclopropane دخل الاستخدام التخديري في بدايات ثلاثينيات القرن العشرين، لكنه تراجع لاحقًا بسبب قابليته الشديدة للاشتعال والانفجار وظهور عوامل أكثر أمانًا.'
        ]
      }
    ],
    correction: 'المصدر يذكر بعض التواريخ بصياغة مختصرة أو غير دقيقة، مثل topical local anesthesia عام 1844 وspinal anesthesia عام 1885. العرض السريري للكوكايين كموضعي عيني كان 1884، والتخدير النخاعي البشري الناجح يُنسب عادةً إلى August Bier عام 1898.',
    tags: ['history','ether','Morton','Wells','John Snow','تاريخ التخدير']
  },
  {
    id: 'general-anesthesia-mechanisms',
    titleAr: 'آليات عمل التخدير العام',
    titleEn: 'Mechanisms of General Anesthesia',
    category: 'pharmacology',
    categoryAr: 'علم الأدوية',
    sourcePages: [5],
    summary: 'لا توجد نظرية واحدة تفسر كل تأثيرات التخدير العام؛ الأدوية المختلفة تؤثر في قنوات ومستقبلات وشبكات عصبية متعددة.',
    sections: [
      {
        title: 'مفاهيم تاريخية | Historical concepts',
        items: [
          'ارتباط القوة بالذوبان الدهني | Meyer-Overton correlation: علاقة تاريخية مهمة بين الذوبان الدهني وقوة كثير من المخدرات.',
          'فرضيات الغشاء الدهني | Lipid membrane hypotheses ساعدت تاريخيًا في تفسير التخدير لكنها لا تفسر كل الظواهر.',
          'فرضية البروتين/المستقبل | Protein / receptor hypothesis اقترحت أن المخدرات تتفاعل مع مواقع كارهة للماء على بروتينات عصبية؛ الفهم الحديث يدعم أهدافًا بروتينية متعددة وليس مستقبلًا واحدًا فقط.'
        ]
      },
      {
        title: 'الفهم الحديث | Modern understanding',
        items: [
          'تعزيز النقل المثبط | Enhanced inhibitory transmission عبر GABA-A وGlycine لبعض العوامل.',
          'تقليل النقل الاستثاري | Reduced excitatory transmission عبر NMDA أو Nicotinic receptors بحسب الدواء.',
          'تنشيط قنوات البوتاسيوم | Potassium-channel activation والمساهمة في فرط استقطاب العصبونات.',
          'فقد الوعي والذاكرة يعتمد أكثر على شبكات الدماغ، بينما عدم الحركة استجابةً للجراحة يعتمد بدرجة كبيرة على الحبل الشوكي | Spinal cord.'
        ]
      }
    ],
    correction: 'النص القديم يوحي بأن “الحجم الحرج في الدهون” أو GABA وحدهما يفسران التخدير. الفهم الحالي متعدد الأهداف | Multi-target؛ مثلًا Nitrous oxide يعمل أساسًا عبر NMDA antagonism ولا يملك تأثيرًا مباشرًا رئيسيًا على GABA-A.',
    tags: ['mechanism','Meyer Overton','GABA','NMDA','general anesthesia']
  },
  {
    id: 'respiratory-muscle-mechanics',
    titleAr: 'عضلات وميكانيكية التنفس',
    titleEn: 'Respiratory Muscles and Mechanics',
    category: 'general',
    categoryAr: 'التخدير العام',
    sourcePages: [6],
    summary: 'الشهيق الهادئ | Quiet inspiration عملية فعالة يقودها الحجاب الحاجز، بينما الزفير الهادئ | Quiet expiration يحدث غالبًا بالارتداد المرن السلبي.',
    sections: [
      {
        title: 'الشهيق | Inspiration',
        items: [
          'الحجاب الحاجز | Diaphragm هو العضلة الرئيسية للشهيق الهادئ، ويسهم تقريبًا بنحو 75% من تغير حجم التنفس أثناء الراحة.',
          'العضلات الوربية الخارجية | External intercostals تساعد على رفع القفص الصدري.',
          'Scalenes وSternocleidomastoid عضلات شهيقية مساعدة | Accessory inspiratory muscles أثناء الجهد.'
        ]
      },
      {
        title: 'الزفير | Expiration',
        items: [
          'الزفير الهادئ | Quiet expiration يعتمد على الارتداد المرن للرئة وجدار الصدر.',
          'الزفير القسري | Forced expiration يستخدم عضلات البطن | Abdominal muscles والوربية الداخلية | Internal intercostals.'
        ]
      }
    ],
    tags: ['diaphragm','intercostal','respiratory muscles','inspiration','expiration']
  },
  {
    id: 'lung-volumes-capacities',
    titleAr: 'أحجام وسعات الرئة',
    titleEn: 'Lung Volumes and Capacities',
    category: 'general',
    categoryAr: 'التخدير العام',
    sourcePages: [7,8,9],
    summary: 'أحجام الرئة | Lung volumes وسعاتها تُستخدم لفهم التهوية والاحتياطي التنفسي وتأثير التخدير والوضعية والمرض الرئوي.',
    sections: [
      {
        title: 'الأحجام | Volumes',
        items: [
          'حجم المد | Tidal Volume (VT): حجم الغاز في نفس طبيعي.',
          'حجم احتياطي الشهيق | Inspiratory Reserve Volume (IRV).',
          'حجم احتياطي الزفير | Expiratory Reserve Volume (ERV).',
          'الحجم المتبقي | Residual Volume (RV).'
        ]
      },
      {
        title: 'السعات | Capacities',
        items: [
          'السعة الرئوية الكلية | Total Lung Capacity (TLC) = VT + IRV + ERV + RV.',
          'السعة الحيوية | Vital Capacity (VC) = IRV + VT + ERV.',
          'السعة المتبقية الوظيفية | Functional Residual Capacity (FRC) = ERV + RV.',
          'السعة الشهيقية | Inspiratory Capacity (IC) = VT + IRV.'
        ]
      },
      {
        title: 'اختبارات الجريان | Spirometry',
        items: [
          'السعة الحيوية القسرية | Forced Vital Capacity (FVC).',
          'حجم الزفير القسري في ثانية | FEV₁.',
          'نسبة FEV₁/FVC تساعد في تقييم الانسداد | Obstructive physiology، وتُفسر باستخدام الحدود المرجعية للعمر والجنس والطول لا رقم 80% وحده.'
        ]
      },
      {
        title: 'قيم تقريبية أثناء الراحة | Typical resting values',
        items: [
          'معدل التنفس عند البالغ الهادئ يقارب 12–15 نفس/دقيقة.',
          'حجم المد | Tidal Volume يقارب 500 mL في البالغ المتوسط، مع اختلافه حسب الحجم والجنس والحالة.',
          'التهوية الدقيقة | Minute Ventilation تقارب 6–8 L/min.',
          'استهلاك الأوكسجين | O₂ consumption يقارب 250 mL/min، وإنتاج CO₂ يقارب 200 mL/min في الراحة.'
        ]
      }
    ],
    correction: 'الأرقام المطلقة مثل TLC=6 L أو RV=1.5 L أو FRC=3 L ليست “طبيعية ثابتة” لكل شخص؛ تختلف مع الطول والعمر والجنس والوضعية. كذلك FEV₁/FVC يُفسر بالحد الأدنى الطبيعي | Lower limit of normal بدل قاعدة 80% لجميع البالغين.',
    tags: ['lung volumes','TLC','FRC','FEV1','FVC','spirometry']
  },
  {
    id: 'tracheal-intubation',
    titleAr: 'التنبيب الرغامي',
    titleEn: 'Tracheal Intubation',
    category: 'airway',
    categoryAr: 'مجرى الهواء',
    sourcePages: [21,22,23],
    summary: 'إدخال أنبوب عبر الحنجرة إلى الرغامى | Trachea لتأمين مجرى الهواء وتسهيل التهوية وحماية الرئة في الحالات المناسبة.',
    sections: [
      {
        title: 'طرق | Routes',
        items: [
          'التنبيب الفموي | Orotracheal intubation هو الأكثر شيوعًا.',
          'التنبيب الأنفي | Nasotracheal intubation يُستخدم في مؤشرات مختارة ويتطلب الانتباه لموانع مثل إصابات قاعدة الجمجمة أو اضطرابات النزف.'
        ]
      },
      {
        title: 'أنواع الأنابيب | Tube types',
        items: [
          'أنبوب ذو كفة | Cuffed endotracheal tube.',
          'أنبوب غير ذي كفة | Uncuffed tube في استخدامات مختارة.',
          'أنبوب مدعم | Reinforced / armoured tube لمقاومة الانثناء.',
          'أنبوب مزدوج اللمعة | Double-lumen tube لعزل الرئتين في جراحات الصدر.'
        ]
      },
      {
        title: 'فوائد | Indications / benefits',
        items: [
          'التحكم بالتهوية بالضغط الإيجابي | Positive-pressure ventilation.',
          'الشفط الرغامي | Tracheal suction.',
          'تقليل خطر الاستنشاق الرئوي باستخدام أنبوب ذي كفة بطريقة مناسبة | Aspiration risk reduction.',
          'تأمين مجرى الهواء في أوضاع وعمليات يتعذر فيها الاعتماد على القناع.'
        ]
      }
    ],
    correction: 'المصدر يقول إن الأنبوب غير ذي الكفة يُستخدم تحت عمر 8 سنوات. هذه قاعدة قديمة؛ الأنابيب ذات الكفة | Cuffed ETTs شائعة وآمنة في الأطفال عند اختيار الحجم الصحيح ومراقبة ضغط الكفة.',
    tags: ['intubation','ETT','cuffed tube','double lumen','تنبيب']
  },
  {
    id: 'ett-placement-confirmation',
    titleAr: 'التأكد من موضع الأنبوب الرغامي',
    titleEn: 'Confirmation of Endotracheal Tube Placement',
    category: 'airway',
    categoryAr: 'مجرى الهواء',
    sourcePages: [25],
    summary: 'التأكيد الموثوق على دخول الأنبوب إلى الرغامى يعتمد على دمج التقييم السريري مع كشف ثاني أوكسيد الكربون الزفيري المستمر.',
    sections: [
      {
        title: 'أفضل دليل روتيني | Key confirmation',
        items: [
          'وجود موجة Capnography مستمرة ومتكررة مع CO₂ زفيري بعد عدة أنفاس | Sustained waveform capnography.',
          'ارتفاع الصدر ثنائيًا | Bilateral chest rise.',
          'سماع أصوات التنفس ثنائيًا وغياب أصوات واضحة فوق المعدة | Bilateral breath sounds / absent gastric insufflation.',
          'تحسن/ثبات الأكسجة | Oxygenation مع بقية العلامات.'
        ]
      },
      {
        title: 'بعد التأكيد | After confirmation',
        items: [
          'تثبيت الأنبوب وتوثيق العمق عند الأسنان/اللثة | Secure / document depth.',
          'مراقبة Capnography باستمرار لكشف الانفصال أو النزع | Continuous confirmation.'
        ]
      }
    ],
    correction: 'تحسس الكفة خارجيًا أو ارتفاع SpO₂ وحدهما لا يكفيان لتأكيد موضع الأنبوب. Capnography الموجي المستمر هو الوسيلة الأساسية لتأكيد ومراقبة وضع الأنبوب في معظم حالات التخدير والإنعاش.',
    tags: ['ETT confirmation','capnography','intubation','EtCO2','تأكيد الانبوب']
  },
  {
    id: 'tracheal-intubation-complications',
    titleAr: 'مضاعفات ومشكلات الأنبوب الرغامي',
    titleEn: 'Tracheal Intubation and ETT Complications',
    category: 'airway',
    categoryAr: 'مجرى الهواء',
    sourcePages: [25],
    summary: 'المشكلات قد تحدث أثناء الإدخال أو بعد التثبيت، ويجب كشفها مبكرًا بمراقبة التهوية والضغط وCapnography.',
    sections: [
      {
        title: 'مشكلات شائعة | Common problems',
        items: [
          'تنبيب المريء | Esophageal intubation.',
          'تنبيب قصبة رئيسية واحدة، غالبًا اليمنى | Endobronchial intubation.',
          'انثناء أو انسداد الأنبوب | Kinking / obstruction.',
          'عض الأنبوب | Tube biting.',
          'انفصال الدائرة | Circuit disconnection.',
          'نزع الأنبوب العرضي | Accidental extubation.'
        ]
      },
      {
        title: 'استجابة | Response',
        items: [
          'عند أي تدهور مفاجئ: أعطِ أوكسجين وقيّم المريض أولًا ثم افحص الأنبوب والدائرة والجهاز | Patient first, then tube/circuit/machine.',
          'راقب waveform Capnography وضغوط مجرى الهواء وحركة الصدر | EtCO₂ / airway pressure / chest movement.'
        ]
      }
    ],
    tags: ['ETT complications','endobronchial','kinking','disconnection','accidental extubation']
  },
  {
    id: 'perioperative-fluid-calculations',
    titleAr: 'حساب السوائل حول العملية: القديم مقابل الحديث',
    titleEn: 'Perioperative Fluid Calculation: Traditional vs Modern Approach',
    category: 'general',
    categoryAr: 'التخدير العام',
    sourcePages: [32],
    sourceLabel: 'ملف كتابة أدوية التخدير — حساب السوائل الوريدية',
    summary: 'المصدر يعرض قواعد تقليدية مثل 4-2-1، تعويض عجز الصيام، 3:1 للبلوريات وتعويض “third-space loss”. هذه مفيدة لفهم ما يُدرّس تاريخيًا، لكنها لا تُستخدم كروشتة ثابتة لكل مريض بالغ أثناء الجراحة.',
    sections: [
      {
        title: 'المذكور في المصدر | Traditional formulas in source',
        items: [
          'قاعدة 4-2-1 لحساب maintenance rate | 4-2-1 maintenance rule.',
          'عجز الصيام = معدل الساعة × ساعات الصيام | Fasting deficit calculation.',
          'تعويض فقد الدم/السوائل بنسبة 3 mL crystalloid لكل 1 mL loss | Traditional 3:1 replacement.',
          'إضافة سوائل ثابتة لما يسمى third-space loss بحسب شدة العملية.'
        ]
      },
      {
        title: 'الفهم الحديث | Modern interpretation',
        items: [
          'لا يُفترض أن كل مريض صائم ناقص حجم | Fasting does not automatically equal hypovolemia.',
          'مفهوم third-space loss التقليدي جرى التخلي عنه بدرجة كبيرة | Traditional third-space replacement is largely abandoned.',
          'الهدف هو الحفاظ على euvolemia وتجنب fluid overload ونقص التروية | Individualized near-zero fluid balance.',
          'تعويض الخسائر يعتمد على نوع السائل المفقود، النزف، العلامات الديناميكية، المختبرات والاستجابة | Cause-directed replacement.',
          'Balanced crystalloids تُفضّل غالبًا على 0.9% saline في كثير من سياقات الإنعاش/الجراحة، مع استثناءات سريرية.',
          'Goal-directed fluid therapy مفيد خصوصًا للمرضى عاليي الخطورة أو الجراحات ذات الخسائر الكبيرة.'
        ]
      },
      {
        title: 'متى تبقى 4-2-1 مفيدة؟ | Where 4-2-1 still helps',
        items: [
          'تُستخدم أساسًا كطريقة تقليدية لتقدير maintenance fluid rate، وخصوصًا في طب الأطفال، وليست هدفًا إلزاميًا للتسريب أثناء التخدير لكل بالغ.',
          'أي حساب أولي يجب تعديله حسب العمر، الكلى والقلب، نوع الجراحة، النزف، البول، الضغط، perfusion والكهارل.'
        ]
      }
    ],
    correction: 'لا تعتمد في التطبيق قاعدة “NPO deficit + third-space + 3:1 crystalloid” كحاسبة تلقائية؛ هذه وصفات قديمة قد تقود إلى إعطاء سوائل زائدة. إذا أضفنا حاسبة مستقبلًا فستكون أداة تعليمية تُظهر الافتراضات وتطلب بيانات المريض بدل إعطاء رقم نهائي بلا سياق.',
    tags: ['fluid calculation','4-2-1','fasting deficit','third space','goal directed fluid','سوائل','حساب السوائل']
  }
];
