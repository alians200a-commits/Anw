export type DrugCategory =
  | 'hypnotics'
  | 'inhalational'
  | 'analgesics'
  | 'sedatives'
  | 'muscle-relaxants'
  | 'emergency'
  | 'antiemetics'
  | 'local-anesthetics'
  | 'reversal'
  | 'cardiovascular'
  | 'adjuncts';

export type DrugClass =
  | 'intravenous'
  | 'inhalational'
  | 'hypnotic'
  | 'analgesic'
  | 'sedative'
  | 'muscle-relaxant'
  | 'antiemetic'
  | 'emergency'
  | 'local-anesthetic'
  | 'reversal'
  | 'vasopressor'
  | 'cardiovascular'
  | 'adjunct';

export interface AnesthesiaDrug {
  id: string;
  en: string;
  ar: string;
  category: DrugCategory;
  categoryAr: string;
  classes: DrugClass[];
  short: string;
  tags: string[];
}

export const DRUG_CLASS_LABELS: Record<DrugClass, string> = {
  intravenous: 'وريدي',
  inhalational: 'استنشاقي',
  hypnotic: 'منوم',
  analgesic: 'مسكن',
  sedative: 'مهدئ',
  'muscle-relaxant': 'مرخي عضلي',
  antiemetic: 'مضاد قيء',
  emergency: 'طوارئ',
  'local-anesthetic': 'مخدر موضعي',
  reversal: 'عكس / ترياق',
  vasopressor: 'رافع ضغط',
  cardiovascular: 'قلبي وعائي',
  adjunct: 'مساعد'
};

export const ANESTHESIA_DRUGS: AnesthesiaDrug[] = [
  {
    id: 'propofol',
    en: 'Propofol',
    ar: 'بروبوفول',
    category: 'hypnotics',
    categoryAr: 'منومات وريدية',
    classes: ['intravenous', 'hypnotic', 'sedative'],
    short: 'عامل تخدير وريدي سريع البدء يُستخدم للتحريض والمحافظة على التخدير والتهدئة.',
    tags: ['IV', 'induction', 'maintenance', 'sedation', 'منوم']
  },
  {
    id: 'thiopental',
    en: 'Thiopental',
    ar: 'ثيوبنتال',
    category: 'hypnotics',
    categoryAr: 'منومات وريدية',
    classes: ['intravenous', 'hypnotic'],
    short: 'منوم وريدي من مجموعة الباربيتورات يُستخدم لتحريض التخدير العام.',
    tags: ['IV', 'barbiturate', 'induction', 'منوم']
  },
  {
    id: 'etomidate',
    en: 'Etomidate',
    ar: 'إيتوميديت',
    category: 'hypnotics',
    categoryAr: 'منومات وريدية',
    classes: ['intravenous', 'hypnotic'],
    short: 'عامل منوم وريدي يُستخدم لتحريض التخدير العام.',
    tags: ['IV', 'induction', 'hypnotic', 'منوم']
  },
  {
    id: 'ketamine',
    en: 'Ketamine',
    ar: 'كيتامين',
    category: 'hypnotics',
    categoryAr: 'منومات وريدية',
    classes: ['intravenous', 'hypnotic', 'analgesic', 'sedative'],
    short: 'مخدر انفصالي يجمع بين التخدير والتسكين ويُستخدم في سياقات تخديرية متعددة.',
    tags: ['IV', 'IM', 'dissociative', 'analgesia', 'sedation', 'تسكين']
  },
  {
    id: 'sevoflurane',
    en: 'Sevoflurane',
    ar: 'سيفوفلورين',
    category: 'inhalational',
    categoryAr: 'مخدرات استنشاقية',
    classes: ['inhalational', 'hypnotic'],
    short: 'عامل تخدير استنشاقي متطاير يُستخدم في التحريض أو المحافظة على التخدير العام.',
    tags: ['volatile', 'inhalational', 'maintenance', 'استنشاقي']
  },
  {
    id: 'isoflurane',
    en: 'Isoflurane',
    ar: 'إيزوفلورين',
    category: 'inhalational',
    categoryAr: 'مخدرات استنشاقية',
    classes: ['inhalational', 'hypnotic'],
    short: 'عامل تخدير استنشاقي متطاير يُستخدم للمحافظة على التخدير العام.',
    tags: ['volatile', 'inhalational', 'maintenance', 'استنشاقي']
  },
  {
    id: 'halothane',
    en: 'Halothane',
    ar: 'هالوثين',
    category: 'inhalational',
    categoryAr: 'مخدرات استنشاقية',
    classes: ['inhalational', 'hypnotic'],
    short: 'عامل تخدير استنشاقي متطاير من المخدرات العامة الاستنشاقية.',
    tags: ['volatile', 'inhalational', 'استنشاقي']
  },
  {
    id: 'nitrous-oxide',
    en: 'Nitrous Oxide',
    ar: 'أوكسيد النيتروز',
    category: 'inhalational',
    categoryAr: 'مخدرات استنشاقية',
    classes: ['inhalational', 'analgesic', 'adjunct'],
    short: 'غاز استنشاقي يُستخدم كمكوّن مساعد ضمن التخدير وله تأثير مسكن.',
    tags: ['N2O', 'inhalational', 'analgesia', 'غاز']
  },
  {
    id: 'methohexital',
    en: 'Methohexital',
    ar: 'ميثوهكسيتال',
    category: 'hypnotics',
    categoryAr: 'منومات وريدية',
    classes: ['intravenous', 'hypnotic'],
    short: 'باربيتورات وريدي فائق القصر يُستخدم لتحريض التخدير وفي إجراءات قصيرة مثل العلاج بالصدمات الكهربائية.',
    tags: ['IV', 'barbiturate', 'induction', 'ECT', 'منوم']
  },
  {
    id: 'enflurane',
    en: 'Enflurane',
    ar: 'إنفلوران',
    category: 'inhalational',
    categoryAr: 'مخدرات استنشاقية',
    classes: ['inhalational', 'hypnotic'],
    short: 'عامل تخدير استنشاقي متطاير قديم نسبيًا، ويتميز بإمكانية زيادة النشاط الاختلاجي عند ظروف معينة.',
    tags: ['volatile', 'inhalational', 'seizure', 'استنشاقي']
  },
  {
    id: 'desflurane',
    en: 'Desflurane',
    ar: 'ديسفلوران',
    category: 'inhalational',
    categoryAr: 'مخدرات استنشاقية',
    classes: ['inhalational', 'hypnotic'],
    short: 'عامل استنشاقي قليل الذوبان في الدم يسمح بتغيير سريع لعمق التخدير وإفاقة سريعة، لكنه مهيّج لمجرى الهواء.',
    tags: ['volatile', 'inhalational', 'rapid recovery', 'airway irritant', 'استنشاقي']
  },
  {
    id: 'midazolam',
    en: 'Midazolam',
    ar: 'ميدازولام',
    category: 'sedatives',
    categoryAr: 'مهدئات',
    classes: ['intravenous', 'sedative', 'adjunct'],
    short: 'بنزوديازيبين يُستخدم للتهدئة وتقليل القلق وإحداث فقدان ذاكرة أمامي.',
    tags: ['IV', 'benzodiazepine', 'sedation', 'تهدئة']
  },
  {
    id: 'diazepam',
    en: 'Diazepam',
    ar: 'ديازيبام / فاليوم',
    category: 'sedatives',
    categoryAr: 'مهدئات',
    classes: ['intravenous', 'sedative', 'adjunct'],
    short: 'بنزوديازيبين يُستخدم للتهدئة وتقليل القلق وله استعمالات إضافية مضادة للاختلاجات.',
    tags: ['IV', 'oral', 'benzodiazepine', 'Valium', 'تهدئة']
  },
  {
    id: 'lorazepam',
    en: 'Lorazepam',
    ar: 'لورازيبام / أتيفان',
    category: 'sedatives',
    categoryAr: 'مهدئات',
    classes: ['intravenous', 'sedative', 'adjunct'],
    short: 'بنزوديازيبين مهدئ يُستخدم في سياقات التهدئة وبعض الحالات الإسعافية.',
    tags: ['IV', 'benzodiazepine', 'Ativan', 'تهدئة']
  },
  {
    id: 'fentanyl',
    en: 'Fentanyl',
    ar: 'فنتانيل',
    category: 'analgesics',
    categoryAr: 'مسكنات أفيونية',
    classes: ['intravenous', 'analgesic', 'adjunct'],
    short: 'مسكن أفيوني قوي يُستخدم ضمن خطط التسكين أثناء التخدير.',
    tags: ['IV', 'opioid', 'analgesia', 'مسكن']
  },
  {
    id: 'morphine',
    en: 'Morphine',
    ar: 'مورفين',
    category: 'analgesics',
    categoryAr: 'مسكنات أفيونية',
    classes: ['intravenous', 'analgesic'],
    short: 'مسكن أفيوني يُستخدم لعلاج الألم في الفترة المحيطة بالجراحة وفي سياقات أخرى.',
    tags: ['IV', 'IM', 'opioid', 'analgesia', 'مسكن']
  },
  {
    id: 'alfentanil',
    en: 'Alfentanil',
    ar: 'ألفنتانيل',
    category: 'analgesics',
    categoryAr: 'مسكنات أفيونية',
    classes: ['intravenous', 'analgesic', 'adjunct'],
    short: 'مسكن أفيوني وريدي يُستخدم كجزء من التخدير والتسكين.',
    tags: ['IV', 'opioid', 'analgesia', 'مسكن']
  },
  {
    id: 'remifentanil',
    en: 'Remifentanil',
    ar: 'ريميفنتانيل',
    category: 'analgesics',
    categoryAr: 'مسكنات أفيونية',
    classes: ['intravenous', 'analgesic', 'adjunct'],
    short: 'مسكن أفيوني وريدي قصير التأثير يُستخدم أثناء التخدير.',
    tags: ['IV', 'opioid', 'analgesia', 'مسكن']
  },
  {
    id: 'pethidine',
    en: 'Meperidine (Pethidine)',
    ar: 'ميبيريدين / بيثيدين',
    category: 'analgesics',
    categoryAr: 'مسكنات أفيونية',
    classes: ['intravenous', 'analgesic'],
    short: 'مسكن أفيوني قديم نسبيًا؛ قل استخدامه بسبب تراكم مستقلبه نورميبيريدين وخطر السمية العصبية والتداخل مع مثبطات MAO.',
    tags: ['IV', 'opioid', 'meperidine', 'pethidine', 'analgesia', 'مسكن']
  },
  {
    id: 'rocuronium',
    en: 'Rocuronium',
    ar: 'روكورونيوم / إزميرون',
    category: 'muscle-relaxants',
    categoryAr: 'مرخيات عضلية',
    classes: ['intravenous', 'muscle-relaxant'],
    short: 'مرخٍ عضلي غير مستقطب يُستخدم لتسهيل التنبيب وتحقيق الارتخاء العضلي.',
    tags: ['IV', 'NMB', 'non-depolarizing', 'Esmeron', 'مرخي']
  },
  {
    id: 'suxamethonium',
    en: 'Suxamethonium',
    ar: 'سكساميثونيوم / سكولين',
    category: 'muscle-relaxants',
    categoryAr: 'مرخيات عضلية',
    classes: ['intravenous', 'muscle-relaxant'],
    short: 'مرخٍ عضلي مستقطب سريع البدء وقصير المفعول يُستخدم في مواقف تخديرية محددة.',
    tags: ['IV', 'succinylcholine', 'depolarizing', 'سكولين']
  },
  {
    id: 'atracurium',
    en: 'Atracurium',
    ar: 'أتراكوريوم',
    category: 'muscle-relaxants',
    categoryAr: 'مرخيات عضلية',
    classes: ['intravenous', 'muscle-relaxant'],
    short: 'مرخٍ عضلي غير مستقطب يُستخدم لتحقيق الحصار العصبي العضلي أثناء التخدير.',
    tags: ['IV', 'NMB', 'non-depolarizing', 'مرخي']
  },
  {
    id: 'mivacurium',
    en: 'Mivacurium',
    ar: 'ميفاكوريوم',
    category: 'muscle-relaxants',
    categoryAr: 'مرخيات عضلية',
    classes: ['intravenous', 'muscle-relaxant'],
    short: 'مرخٍ عضلي غير مستقطب يُستخدم للحصار العصبي العضلي.',
    tags: ['IV', 'NMB', 'non-depolarizing', 'مرخي']
  },
  {
    id: 'vecuronium',
    en: 'Vecuronium',
    ar: 'فيكورونيوم',
    category: 'muscle-relaxants',
    categoryAr: 'مرخيات عضلية',
    classes: ['intravenous', 'muscle-relaxant'],
    short: 'مرخٍ عضلي غير مستقطب يُستخدم لتسهيل التنبيب والمحافظة على الارتخاء العضلي.',
    tags: ['IV', 'NMB', 'non-depolarizing', 'مرخي']
  },
  {
    id: 'pancuronium',
    en: 'Pancuronium',
    ar: 'بانكورونيوم',
    category: 'muscle-relaxants',
    categoryAr: 'مرخيات عضلية',
    classes: ['intravenous', 'muscle-relaxant'],
    short: 'مرخٍ عضلي غير مستقطب طويل نسبيًا يُستخدم للحصار العصبي العضلي.',
    tags: ['IV', 'NMB', 'non-depolarizing', 'مرخي']
  },
  {
    id: 'cisatracurium',
    en: 'Cisatracurium',
    ar: 'سيساتراكوريوم / نيمبكس',
    category: 'muscle-relaxants',
    categoryAr: 'مرخيات عضلية',
    classes: ['intravenous', 'muscle-relaxant'],
    short: 'مرخٍ عضلي غير مستقطب متوسط المفعول يتحلل بدرجة مهمة عبر Hofmann elimination ويعتمد قليلًا على الكبد والكلى.',
    tags: ['IV', 'NMB', 'non-depolarizing', 'Nimbex', 'Hofmann', 'مرخي']
  },
  {
    id: 'metoclopramide',
    en: 'Metoclopramide',
    ar: 'ميتوكلوبراميد / بلاسيل',
    category: 'antiemetics',
    categoryAr: 'مضادات القيء ومحفزات الحركة',
    classes: ['intravenous', 'antiemetic', 'adjunct'],
    short: 'مضاد دوبامين ومحفز لحركة المعدة يُستخدم للغثيان والقيء وبعض حالات خزل المعدة، وله محاذير عصبية مهمة.',
    tags: ['Plasil', 'Reglan', 'antiemetic', 'prokinetic', 'PONV', 'metoclopramide']
  },
  {
    id: 'glycopyrrolate',
    en: 'Glycopyrrolate',
    ar: 'غليكوبيرولات',
    category: 'adjuncts',
    categoryAr: 'أدوية مساعدة',
    classes: ['intravenous', 'adjunct'],
    short: 'مضاد مسكاريني يقلل الإفرازات ويعالج بعض التأثيرات المبهمية، ويُستخدم مع Neostigmine عند عكس الحصار العضلي.',
    tags: ['antimuscarinic', 'secretions', 'bradycardia', 'neostigmine', 'reversal']
  },
  {
    id: 'diclofenac',
    en: 'Diclofenac',
    ar: 'ديكلوفيناك / فولتارين',
    category: 'analgesics',
    categoryAr: 'مسكنات غير أفيونية',
    classes: ['analgesic', 'adjunct'],
    short: 'NSAID مسكن ومضاد للالتهاب يمكن أن يدخل ضمن التسكين متعدد الوسائط مع الانتباه لمخاطر الكلى والنزف والجهاز الهضمي والقلب.',
    tags: ['Voltaren', 'NSAID', 'analgesia', 'multimodal analgesia', 'ديكلوفيناك']
  },
  {
    id: 'hyoscine-butylbromide',
    en: 'Hyoscine Butylbromide',
    ar: 'هيوسين بيوتيل بروميد / بوسكوبان',
    category: 'adjuncts',
    categoryAr: 'أدوية مساعدة',
    classes: ['adjunct'],
    short: 'مضاد مسكاريني محيطي مضاد للتشنج يُستخدم لتقلصات العضلات الملساء في الجهاز الهضمي أو البولي في بلدان عديدة.',
    tags: ['Buscopan', 'antispasmodic', 'antimuscarinic', 'colic', 'هيوسين']
  },
  {
    id: 'ranitidine',
    en: 'Ranitidine',
    ar: 'رانيتيدين / زانتاك',
    category: 'adjuncts',
    categoryAr: 'أدوية مساعدة',
    classes: ['adjunct'],
    short: 'حاصر مستقبل H2 يقلل إفراز حمض المعدة؛ وضعه التنظيمي وتوفر المستحضرات تغيرا بسبب شوائب NDMA، لذلك يجب ربط استعماله بالمستحضر المتاح حاليًا.',
    tags: ['Zantac', 'H2 blocker', 'acid suppression', 'ranitidine', 'aspiration prophylaxis']
  },
  {
    id: 'ondansetron',
    en: 'Ondansetron',
    ar: 'أوندانسيترون',
    category: 'antiemetics',
    categoryAr: 'مضادات القيء',
    classes: ['intravenous', 'antiemetic', 'adjunct'],
    short: 'مضاد للغثيان والقيء يُستخدم كثيرًا في الفترة المحيطة بالجراحة.',
    tags: ['IV', 'PONV', 'antiemetic', 'غثيان']
  },
  {
    id: 'lidocaine',
    en: 'Lidocaine',
    ar: 'ليدوكائين / زايلاكين',
    category: 'local-anesthetics',
    categoryAr: 'مخدرات موضعية',
    classes: ['local-anesthetic', 'intravenous', 'adjunct'],
    short: 'مخدر موضعي من نوع الأميد يحجب قنوات الصوديوم ويُستخدم للارتشاح والحصر العصبي وتقنيات إقليمية مختارة.',
    tags: ['local anesthetic', 'amide', 'Xylocaine', 'lidocaine', 'موضعي']
  },
  {
    id: 'bupivacaine',
    en: 'Bupivacaine',
    ar: 'بوبيفاكائين / ماركايين',
    category: 'local-anesthetics',
    categoryAr: 'مخدرات موضعية',
    classes: ['local-anesthetic'],
    short: 'مخدر موضعي أميدي طويل المفعول يُستخدم للحصر العصبي والتخدير فوق الجافية وتقنيات إقليمية أخرى.',
    tags: ['local anesthetic', 'amide', 'Marcaine', 'bupivacaine', 'موضعي']
  },
  {
    id: 'naloxone',
    en: 'Naloxone',
    ar: 'نالوكسون / ناركان',
    category: 'reversal',
    categoryAr: 'عكس وتأثيرات مضادة',
    classes: ['intravenous', 'reversal', 'emergency'],
    short: 'مضاد تنافسي لمستقبلات الأفيونات يُستخدم لعكس التثبيط التنفسي والآثار السمية للأفيونات.',
    tags: ['opioid antagonist', 'Narcan', 'reversal', 'antidote', 'ترياق']
  },
  {
    id: 'sugammadex',
    en: 'Sugammadex',
    ar: 'سوغاماديكس / بريدِيون',
    category: 'reversal',
    categoryAr: 'عكس وتأثيرات مضادة',
    classes: ['intravenous', 'reversal', 'adjunct'],
    short: 'عامل عكس نوعي يحيط بجزيئات الروكورونيوم والفيكورونيوم ويعكس الحصار العصبي العضلي الناجم عنهما.',
    tags: ['Bridion', 'reversal', 'rocuronium', 'vecuronium', 'مرخيات']
  },
  {
    id: 'ephedrine',
    en: 'Ephedrine',
    ar: 'إيفيدرين',
    category: 'cardiovascular',
    categoryAr: 'أدوية قلبية وعائية',
    classes: ['intravenous', 'vasopressor', 'emergency'],
    short: 'ناهض أدرينرجي مباشر وغير مباشر يُستخدم لعلاج انخفاض ضغط الدم المهم سريريًا أثناء التخدير.',
    tags: ['vasopressor', 'hypotension', 'adrenergic', 'رافع ضغط']
  },
  {
    id: 'phenylephrine',
    en: 'Phenylephrine',
    ar: 'فينيليفرين',
    category: 'cardiovascular',
    categoryAr: 'أدوية قلبية وعائية',
    classes: ['intravenous', 'vasopressor', 'emergency'],
    short: 'ناهض α1 أدرينرجي مباشر يرفع المقاومة الوعائية ويُستخدم لعلاج انخفاض الضغط الناتج أساسًا عن توسع الأوعية أثناء التخدير.',
    tags: ['alpha1', 'vasopressor', 'hypotension', 'رافع ضغط']
  },
  {
    id: 'metoprolol',
    en: 'Metoprolol',
    ar: 'ميتوبرولول / لوبريسور',
    category: 'cardiovascular',
    categoryAr: 'أدوية قلبية وعائية',
    classes: ['intravenous', 'cardiovascular', 'adjunct'],
    short: 'حاصر بيتا-1 انتقائي نسبيًا يبطئ معدل القلب ويقلل التأثير الأدرينرجي القلبي.',
    tags: ['beta blocker', 'beta1', 'Lopressor', 'cardiovascular', 'قلب']
  },
  {
    id: 'esmolol',
    en: 'Esmolol',
    ar: 'إسمولول / بريفيبلوك',
    category: 'cardiovascular',
    categoryAr: 'أدوية قلبية وعائية',
    classes: ['intravenous', 'cardiovascular', 'adjunct'],
    short: 'حاصر بيتا-1 وريدي فائق القصر يُستخدم للتحكم السريع بمعدل القلب أو الضغط في سياقات محددة.',
    tags: ['beta blocker', 'beta1', 'Brevibloc', 'tachycardia', 'قلب']
  },
  {
    id: 'adenosine',
    en: 'Adenosine',
    ar: 'أدينوسين / أدينوكور',
    category: 'cardiovascular',
    categoryAr: 'أدوية قلبية وعائية',
    classes: ['intravenous', 'emergency', 'cardiovascular'],
    short: 'دواء فائق القصر يبطئ التوصيل عبر العقدة الأذينية البطينية ويُستخدم في أنواع محددة من تسرع القلب فوق البطيني.',
    tags: ['Adenocor', 'SVT', 'AV node', 'tachycardia', 'طوارئ قلبية']
  },
  {
    id: 'albuterol',
    en: 'Salbutamol (Albuterol)',
    ar: 'سالبوتامول / ألبوتيرول / فنتولين',
    category: 'emergency',
    categoryAr: 'أدوية طوارئ',
    classes: ['emergency', 'adjunct'],
    short: 'ناهض β2 موسع للقصبات يُستخدم في التشنج القصبي، ويمكن أن يساعد مؤقتًا على خفض البوتاسيوم في فرط البوتاسيوم.',
    tags: ['Ventolin', 'salbutamol', 'albuterol', 'beta2', 'bronchospasm', 'hyperkalemia']
  },
  {
    id: 'aminophylline',
    en: 'Aminophylline',
    ar: 'أمينوفيلين',
    category: 'emergency',
    categoryAr: 'أدوية طوارئ',
    classes: ['intravenous', 'emergency', 'adjunct'],
    short: 'مركب ثيوفيلين موسع للقصبات ذو هامش علاجي ضيق؛ أصبح دوره محدودًا مقارنةً بالعلاجات الاستنشاقية الأحدث.',
    tags: ['theophylline', 'PDE inhibitor', 'bronchodilator', 'asthma', 'امينوفيلين']
  },
  {
    id: 'amiodarone',
    en: 'Amiodarone',
    ar: 'أميودارون / كوردارون',
    category: 'cardiovascular',
    categoryAr: 'أدوية قلبية وعائية',
    classes: ['intravenous', 'emergency', 'cardiovascular'],
    short: 'مضاد اضطراب نظم متعدد الخصائص يُستخدم في VF/pulseless VT وبعض التسرعات واسعة المركب وفق الخوارزمية المناسبة.',
    tags: ['Cordarone', 'VF', 'VT', 'wide complex tachycardia', 'antiarrhythmic']
  },
  {
    id: 'alteplase',
    en: 'Alteplase',
    ar: 'ألتيبلاز / tPA',
    category: 'emergency',
    categoryAr: 'أدوية طوارئ',
    classes: ['intravenous', 'emergency', 'adjunct'],
    short: 'عامل حالّ للخثرة يحول البلازمينوجين إلى بلازمين ويُستخدم في استطبابات محددة مثل السكتة الإقفارية واحتشاء القلب والانصمام الرئوي عالي الخطورة.',
    tags: ['tPA', 'rt-PA', 'thrombolytic', 'pulmonary embolism', 'stroke', 'MI']
  },
  {
    id: 'calcium-gluconate',
    en: 'Calcium Gluconate',
    ar: 'غلوكونات الكالسيوم',
    category: 'emergency',
    categoryAr: 'أدوية طوارئ',
    classes: ['intravenous', 'emergency', 'adjunct'],
    short: 'مستحضر كالسيوم وريدي يُستخدم في حالات مثل نقص الكالسيوم وفرط البوتاسيوم مع تغيرات قلبية وفق السياق السريري.',
    tags: ['calcium', 'hyperkalemia', 'hypocalcemia', 'غلوكونات الكالسيوم']
  },
  {
    id: 'calcium-chloride',
    en: 'Calcium Chloride',
    ar: 'كلوريد الكالسيوم',
    category: 'emergency',
    categoryAr: 'أدوية طوارئ',
    classes: ['intravenous', 'emergency', 'adjunct'],
    short: 'مستحضر كالسيوم مركز يوفر كالسيومًا عنصرّيًا أكثر من Calcium gluconate ويحتاج حذرًا شديدًا من التسرب خارج الوريد.',
    tags: ['calcium chloride', 'hyperkalemia', 'hypocalcemia', 'calcium', 'كلوريد الكالسيوم']
  },
  {
    id: 'dexamethasone',
    en: 'Dexamethasone',
    ar: 'ديكساميثازون / ديكادرون',
    category: 'adjuncts',
    categoryAr: 'أدوية مساعدة',
    classes: ['intravenous', 'antiemetic', 'adjunct'],
    short: 'غلوكوكورتيكويد طويل المفعول له استعمالات مضادة للالتهاب والوذمة، ويُستخدم أيضًا للوقاية من PONV ضمن التخدير.',
    tags: ['Decadron', 'steroid', 'PONV', 'cerebral edema', 'laryngeal edema']
  },
  {
    id: 'diltiazem',
    en: 'Diltiazem',
    ar: 'ديلتيازيم',
    category: 'cardiovascular',
    categoryAr: 'أدوية قلبية وعائية',
    classes: ['intravenous', 'emergency', 'cardiovascular'],
    short: 'حاصر قنوات كالسيوم غير ثنائي الهيدروبيريدين يبطئ التوصيل عبر AV node ويُستخدم للتحكم بالمعدل في اضطرابات نظم محددة.',
    tags: ['calcium channel blocker', 'AF', 'SVT', 'AV node', 'rate control']
  },
  {
    id: 'dobutamine',
    en: 'Dobutamine',
    ar: 'دوبوتامين',
    category: 'cardiovascular',
    categoryAr: 'أدوية قلبية وعائية',
    classes: ['intravenous', 'emergency', 'cardiovascular'],
    short: 'دواء إينوتروبي يغلب عليه تنبيه β1 ويزيد قوة انقباض القلب والنتاج القلبي في حالات مختارة من فشل المضخة.',
    tags: ['inotrope', 'beta1', 'cardiac output', 'heart failure', 'dobutamine']
  },
  {
    id: 'dopamine',
    en: 'Dopamine',
    ar: 'دوبامين',
    category: 'cardiovascular',
    categoryAr: 'أدوية قلبية وعائية',
    classes: ['intravenous', 'emergency', 'vasopressor', 'cardiovascular'],
    short: 'كاتيكولامين ذو تأثيرات أدرينرجية ودوبامينية تعتمد على الجرعة؛ له استعمالات محددة في بطء القلب أو الصدمة بحسب السياق.',
    tags: ['dopamine', 'vasopressor', 'inotrope', 'bradycardia', 'shock']
  },
  {
    id: 'esomeprazole',
    en: 'Esomeprazole',
    ar: 'إيزوميبرازول / نيكسيوم',
    category: 'adjuncts',
    categoryAr: 'أدوية مساعدة',
    classes: ['intravenous', 'adjunct'],
    short: 'مثبط لمضخة البروتون يقلل إفراز حمض المعدة ويُستخدم في حالات هضمية محددة مثل النزف الهضمي العلوي ضمن بروتوكول كامل.',
    tags: ['Nexium', 'PPI', 'GI bleed', 'acid suppression', 'esomeprazole']
  },
  {
    id: 'furosemide',
    en: 'Furosemide',
    ar: 'فوروسيميد / لازكس',
    category: 'emergency',
    categoryAr: 'أدوية طوارئ',
    classes: ['intravenous', 'emergency', 'adjunct'],
    short: 'مدرّ بول عروي | Loop diuretic يثبط ناقل Na-K-2Cl ويُستخدم في احتقان السوائل والوذمة الرئوية القلبية وحالات مختارة.',
    tags: ['Lasix', 'loop diuretic', 'pulmonary edema', 'heart failure', 'فوروسيميد']
  },
  {
    id: 'glucagon',
    en: 'Glucagon',
    ar: 'غلوكاغون',
    category: 'emergency',
    categoryAr: 'أدوية طوارئ',
    classes: ['intravenous', 'emergency', 'adjunct'],
    short: 'هرمون مضاد لنقص السكر الشديد، وله دور كعلاج مساعد في تسمم حاصرات بيتا وبعض حالات تسمم حاصرات قنوات الكالسيوم.',
    tags: ['glucagon', 'hypoglycemia', 'beta blocker overdose', 'CCB overdose', 'antidote', 'غلوكاغون']
  },
  {
    id: 'regular-insulin',
    en: 'Regular Insulin',
    ar: 'الإنسولين النظامي / قصير المفعول',
    category: 'emergency',
    categoryAr: 'أدوية طوارئ',
    classes: ['intravenous', 'emergency', 'adjunct'],
    short: 'إنسولين قصير المفعول يُستخدم ضمن بروتوكولات DKA/HHS، ولخفض البوتاسيوم مؤقتًا في فرط البوتاسيوم، وبجرعات عالية في بعض حالات التسمم القلبي.',
    tags: ['regular insulin', 'Actrapid', 'Humulin R', 'DKA', 'HHS', 'hyperkalemia', 'high dose insulin']
  },
  {
    id: 'hydrocortisone',
    en: 'Hydrocortisone',
    ar: 'هيدروكورتيزون / سولو-كورتيف',
    category: 'emergency',
    categoryAr: 'أدوية طوارئ',
    classes: ['intravenous', 'emergency', 'adjunct'],
    short: 'غلوكوكورتيكويد له أيضًا نشاط معدني قشري ويُستخدم في قصور الكظر وبعض حالات الربو والصدمة الإنتانية المقاومة للرافعات حسب البروتوكول.',
    tags: ['Solu-Cortef', 'steroid', 'adrenal crisis', 'asthma', 'septic shock']
  },
  {
    id: 'labetalol',
    en: 'Labetalol',
    ar: 'لابيتالول',
    category: 'cardiovascular',
    categoryAr: 'أدوية قلبية وعائية',
    classes: ['intravenous', 'emergency', 'cardiovascular'],
    short: 'حاصر α1 وβ يُستخدم لخفض ضغط الدم في حالات مختارة من ارتفاع الضغط الحاد وتسرع النبض المصاحب.',
    tags: ['alpha blocker', 'beta blocker', 'hypertension', 'labetalol']
  },
  {
    id: 'nitroglycerin',
    en: 'Nitroglycerin',
    ar: 'نتروغليسرين / GTN',
    category: 'cardiovascular',
    categoryAr: 'أدوية قلبية وعائية',
    classes: ['intravenous', 'emergency', 'cardiovascular'],
    short: 'نترات موسعة للأوعية يغلب تأثيرها الوريدي؛ تقلل preload وتُستخدم في الذبحة/الإقفار وارتفاع الضغط أو الوذمة الرئوية في سياقات مناسبة.',
    tags: ['GTN', 'Angised', 'nitrate', 'angina', 'ischemia', 'pulmonary edema']
  },
  {
    id: 'atropine',
    en: 'Atropine',
    ar: 'أتروبين',
    category: 'emergency',
    categoryAr: 'طوارئ ودعم',
    classes: ['intravenous', 'emergency', 'adjunct'],
    short: 'دواء مضاد للمسكارين يُستخدم في التخدير والطوارئ لمؤشرات سريرية محددة.',
    tags: ['IV', 'antimuscarinic', 'bradycardia', 'طوارئ']
  },
  {
    id: 'adrenaline',
    en: 'Adrenaline',
    ar: 'أدرينالين',
    category: 'emergency',
    categoryAr: 'طوارئ ودعم',
    classes: ['intravenous', 'emergency'],
    short: 'ناهض أدرينرجي أساسي في عدد من حالات الإنعاش والطوارئ.',
    tags: ['IV', 'epinephrine', 'resuscitation', 'إنعاش']
  },
  {
    id: 'neostigmine',
    en: 'Neostigmine',
    ar: 'نيوستيغمين',
    category: 'adjuncts',
    categoryAr: 'أدوية مساعدة',
    classes: ['intravenous', 'adjunct'],
    short: 'مثبط لإنزيم أستيل كولين إستيراز يُستخدم لعكس بعض أنواع الحصار العضلي.',
    tags: ['IV', 'reversal', 'NMB', 'عكس المرخي']
  }
];

export const DRUG_FILTERS: Array<{ id: 'all' | DrugClass; label: string }> = [
  { id: 'all', label: 'الكل' },
  { id: 'intravenous', label: 'وريدي' },
  { id: 'inhalational', label: 'استنشاقي' },
  { id: 'hypnotic', label: 'منوم' },
  { id: 'analgesic', label: 'مسكن' },
  { id: 'sedative', label: 'مهدئ' },
  { id: 'muscle-relaxant', label: 'مرخي عضلي' },
  { id: 'antiemetic', label: 'مضاد قيء' },
  { id: 'emergency', label: 'طوارئ' },
  { id: 'local-anesthetic', label: 'مخدر موضعي' },
  { id: 'reversal', label: 'عكس / ترياق' },
  { id: 'vasopressor', label: 'رافع ضغط' },
  { id: 'cardiovascular', label: 'قلبي وعائي' },
  { id: 'adjunct', label: 'مساعد' }
];
