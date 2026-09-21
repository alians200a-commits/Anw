export type DrugCategory =
  | 'hypnotics'
  | 'inhalational'
  | 'analgesics'
  | 'sedatives'
  | 'muscle-relaxants'
  | 'emergency'
  | 'antiemetics'
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
  { id: 'adjunct', label: 'مساعد' }
];
