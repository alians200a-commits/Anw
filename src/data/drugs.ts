export type DrugCategory =
  | 'hypnotics'
  | 'analgesics'
  | 'muscle-relaxants'
  | 'emergency'
  | 'antiemetics'
  | 'adjuncts';

export interface AnesthesiaDrug {
  id: string;
  en: string;
  ar: string;
  category: DrugCategory;
  categoryAr: string;
  short: string;
  tags: string[];
}

export const ANESTHESIA_DRUGS: AnesthesiaDrug[] = [
  {
    id: 'propofol',
    en: 'Propofol',
    ar: 'بروبوفول',
    category: 'hypnotics',
    categoryAr: 'منومات وريدية',
    short: 'عامل تخدير وريدي سريع البدء يُستخدم للتحريض والمحافظة على التخدير والتهدئة.',
    tags: ['IV', 'induction', 'sedation', 'منوم']
  },
  {
    id: 'ketamine',
    en: 'Ketamine',
    ar: 'كيتامين',
    category: 'hypnotics',
    categoryAr: 'منومات وريدية',
    short: 'مخدر انفصالي يجمع بين التخدير والتسكين ويُستخدم في سياقات تخديرية متعددة.',
    tags: ['dissociative', 'analgesia', 'تسكين']
  },
  {
    id: 'midazolam',
    en: 'Midazolam',
    ar: 'ميدازولام',
    category: 'adjuncts',
    categoryAr: 'أدوية مساعدة',
    short: 'بنزوديازيبين يُستخدم للتهدئة وتقليل القلق وإحداث فقدان ذاكرة أمامي.',
    tags: ['benzodiazepine', 'sedation', 'تهدئة']
  },
  {
    id: 'fentanyl',
    en: 'Fentanyl',
    ar: 'فنتانيل',
    category: 'analgesics',
    categoryAr: 'مسكنات',
    short: 'مسكن أفيوني قوي يُستخدم ضمن خطط التسكين أثناء التخدير.',
    tags: ['opioid', 'analgesia', 'مسكن']
  },
  {
    id: 'rocuronium',
    en: 'Rocuronium',
    ar: 'روكورونيوم',
    category: 'muscle-relaxants',
    categoryAr: 'مرخيات عضلية',
    short: 'مرخٍ عضلي غير مستقطب يُستخدم لتسهيل التنبيب وتحقيق الارتخاء العضلي.',
    tags: ['NMB', 'non-depolarizing', 'مرخي']
  },
  {
    id: 'suxamethonium',
    en: 'Suxamethonium',
    ar: 'سكساميثونيوم / سكولين',
    category: 'muscle-relaxants',
    categoryAr: 'مرخيات عضلية',
    short: 'مرخٍ عضلي مستقطب سريع البدء وقصير المفعول يُستخدم في مواقف تخديرية محددة.',
    tags: ['succinylcholine', 'depolarizing', 'سكولين']
  },
  {
    id: 'ondansetron',
    en: 'Ondansetron',
    ar: 'أوندانسيترون',
    category: 'antiemetics',
    categoryAr: 'مضادات القيء',
    short: 'مضاد للغثيان والقيء يُستخدم كثيراً في الفترة المحيطة بالجراحة.',
    tags: ['PONV', 'antiemetic', 'غثيان']
  },
  {
    id: 'atropine',
    en: 'Atropine',
    ar: 'أتروبين',
    category: 'emergency',
    categoryAr: 'طوارئ ودعم',
    short: 'دواء مضاد للمسكارين يُستخدم في التخدير لمؤشرات سريرية محددة.',
    tags: ['antimuscarinic', 'bradycardia', 'طوارئ']
  },
  {
    id: 'adrenaline',
    en: 'Adrenaline',
    ar: 'أدرينالين',
    category: 'emergency',
    categoryAr: 'طوارئ ودعم',
    short: 'ناهض أدرينرجي أساسي في عدد من حالات الإنعاش والطوارئ.',
    tags: ['epinephrine', 'resuscitation', 'إنعاش']
  },
  {
    id: 'neostigmine',
    en: 'Neostigmine',
    ar: 'نيوستيغمين',
    category: 'adjuncts',
    categoryAr: 'أدوية مساعدة',
    short: 'مثبط لإنزيم أستيل كولين إستيراز يُستخدم لعكس بعض أنواع الحصار العضلي.',
    tags: ['reversal', 'NMB', 'عكس المرخي']
  }
];

export const DRUG_CATEGORIES = [
  { id: 'all', label: 'الكل' },
  { id: 'hypnotics', label: 'المنومات' },
  { id: 'analgesics', label: 'المسكنات' },
  { id: 'muscle-relaxants', label: 'المرخيات' },
  { id: 'antiemetics', label: 'مضادات القيء' },
  { id: 'emergency', label: 'الطوارئ' },
  { id: 'adjuncts', label: 'مساعدة' }
] as const;
