import { ChangeEvent, useEffect, useMemo, useRef, useState } from 'react';
import {
  ArrowDown,
  ArrowUp,
  CircleHelp,
  Eye,
  EyeOff,
  ImagePlus,
  Plus,
  Save,
  Send,
  Trash2,
  Upload,
  X,
} from 'lucide-react';
import {
  DRUG_CLASS_LABELS,
  type AnesthesiaDrug,
  type DrugCategory,
  type DrugClass,
} from '../data/drugs';
import type { DrugDetail } from '../data/drugDetails';
import { DrugDetailSheet } from '../components/DrugDetailSheet';
import { supabase } from '../lib/supabase';
import type { AdminRole } from './adminTypes';
import { cleanupPromotedDraftMedia, hydrateAdminMedia, promoteMediaForPublish, removeAdminMedia, rollbackPromotedPublicMedia, uploadDraftMedia } from '../lib/contentMediaStorage';
import type {
  ContentMediaItem,
  ContentMediaPlacement,
  DrugMediaSection,
} from '../types/contentMedia';

type ContentStatus = 'draft' | 'review' | 'approved' | 'published' | 'rejected' | 'archived';

export type DrugContentRow = {
  id: string;
  slug: string;
  title_ar: string | null;
  title_en: string | null;
  status: ContentStatus;
  payload: unknown;
};

type DrugPayload = {
  schemaVersion: 1;
  drug: AnesthesiaDrug;
  details: DrugDetail;
  media: ContentMediaItem[];
};

type Props = {
  profileId: string;
  role: AdminRole;
  initialRow?: DrugContentRow | null;
  onSaved: () => void | Promise<void>;
  onClose: () => void;
};

type HelpInfo = { help: string; example: string };

const HELP: Record<string, HelpInfo> = {
  slug: {
    help: 'معرّف داخلي ثابت للدواء يستخدمه النظام والروابط. يكتب بالإنكليزي الصغير وبدون مسافات.',
    example: 'propofol أو succinylcholine',
  },
  englishName: {
    help: 'الاسم العلمي للدواء باللغة الإنكليزية كما تريد ظهوره داخل التطبيق.',
    example: 'Propofol',
  },
  arabicName: {
    help: 'اسم الدواء بالعربية كما سيظهر للطالب أو المستخدم.',
    example: 'بروبوفول',
  },
  category: {
    help: 'القسم الرئيسي الذي سيظهر الدواء تحته داخل دليل الأدوية.',
    example: 'منومات وريدية',
  },
  categoryAr: {
    help: 'الاسم العربي الظاهر للتصنيف. يتعبأ تلقائيًا عند اختيار التصنيف ويمكن تعديله عند الحاجة.',
    example: 'منومات وريدية',
  },
  short: {
    help: 'جملة قصيرة جدًا تعرف بالدواء وتظهر في بطاقة الدواء قبل فتح التفاصيل.',
    example: 'عامل تخدير وريدي سريع البدء يستخدم لبدء التخدير والتهدئة.',
  },
  tags: {
    help: 'كلمات تساعد البحث داخل التطبيق. كل كلمة أو عبارة تكون عنصرًا منفصلًا.',
    example: 'IV، induction، sedation، منوم',
  },
  classes: {
    help: 'صفات دوائية يمكن أن ينتمي الدواء لأكثر من واحدة منها، وتظهر كوسوم قرب اسم الدواء.',
    example: 'وريدي + منوم + مهدئ',
  },
  feature: {
    help: 'أهم نقطة تميز هذا الدواء والتي تريد أن يلاحظها المستخدم مباشرة عند فتح التفاصيل.',
    example: 'سريع البدء وقصير المفعول نسبيًا مع إفاقة سريعة.',
  },
  clinicalNote: {
    help: 'ملاحظة تطبيقية أو سريرية مهمة تساعد على فهم الاستعمال الصحيح أو تمنع التباسًا شائعًا.',
    example: 'بروبوفول عامل تخدير وريدي وليس استنشاقيًا.',
  },
  mechanism: {
    help: 'كيف يعمل الدواء على المستقبلات أو الجهاز المستهدف لإحداث تأثيره.',
    example: 'يعزز النقل المثبط عبر مستقبلات GABA-A.',
  },
  uses: {
    help: 'الحالات أو الأغراض التي يستخدم فيها الدواء. أضف كل استعمال كسطر مستقل.',
    example: 'بدء التخدير العام',
  },
  routes: {
    help: 'طرق إعطاء الدواء للمريض.',
    example: 'وريدي | Intravenous (IV)',
  },
  educationalDoses: {
    help: 'جرعات مرجعية تعليمية مرتبطة بالسياق والفئة. كل جرعة أو سيناريو في سطر مستقل.',
    example: 'لبدء التخدير في البالغ السليم: 2–2.5 mg/kg IV مع المعايرة للاستجابة.',
  },
  onsetDuration: {
    help: 'وقت بدء تأثير الدواء ومدة التأثير أو التنويم/التسكين حسب السياق.',
    example: 'بدء سريع خلال عشرات الثواني، ومدة التنويم بعد جرعة مفردة نحو 5–10 دقائق.',
  },
  contraindications: {
    help: 'حالات يمنع فيها استخدام الدواء أو يجب تجنبه فيها بسبب خطر واضح.',
    example: 'فرط التحسس المعروف للدواء أو لمكونات المستحضر.',
  },
  warnings: {
    help: 'مخاطر مهمة تستلزم الانتباه والمراقبة لكنها ليست بالضرورة مانع استعمال مطلق.',
    example: 'قد يسبب هبوط الضغط أو تثبيط التنفس.',
  },
  adverseEffects: {
    help: 'الآثار الجانبية أو غير المرغوبة المعروفة للدواء.',
    example: 'ألم مكان الحقن، هبوط الضغط، انقطاع النفس.',
  },
  tradeNames: {
    help: 'الأسماء التجارية الشائعة للمستحضرات التي تحتوي على هذا الدواء.',
    example: 'Diprivan',
  },
  correction: {
    help: 'ملاحظة داخلية لفريق التحرير لتصحيح معلومة قديمة أو توضيح قرار التحرير. لا يلزم عرضها للمستخدم النهائي.',
    example: 'تم تحديث صياغة مانع الاستعمال وفق المصدر الأحدث.',
  },
  sourceLabel: {
    help: 'اسم الكتاب أو الدليل أو الملف المرجعي الذي اعتمدت عليه المعلومة.',
    example: 'مبادئ التخدير + ملف كتابة أدوية التخدير',
  },
  sourcePages: {
    help: 'أرقام الصفحات التي تدعم هذه المعلومات داخل المصدر. افصل الأرقام بفواصل.',
    example: '8, 64, 65',
  },
  imageUpload: {
    help: 'ارفع صورة رئيسية أو عدة صور. أول صورة تصبح رئيسية تلقائيًا إذا لم توجد صورة رئيسية.',
    example: 'صورة أمبولة Propofol أو رسم يوضح آلية العمل.',
  },
  imagePlacement: {
    help: 'حدد مكان ظهور الصورة داخل صفحة الدواء.',
    example: 'صورة رئيسية قرب العنوان، معرض صور، أو داخل قسم آلية العمل.',
  },
  imageSection: {
    help: 'إذا اخترت «داخل قسم من الشرح» حدد القسم الذي يجب أن تظهر الصورة بعده.',
    example: 'آلية العمل أو الجرعات المرجعية.',
  },
  imageAlt: {
    help: 'وصف قصير للصورة يفيد الوصول ويظهر إذا تعذر تحميل الصورة.',
    example: 'أمبولة بروبوفول 1%',
  },
  imageCaption: {
    help: 'شرح اختياري يظهر أسفل الصورة للمستخدم.',
    example: 'مثال على مستحضر بروبوفول المستخدم سريريًا.',
  },
};

const CATEGORY_OPTIONS: Array<{ value: DrugCategory; label: string }> = [
  { value: 'hypnotics', label: 'منومات وريدية' },
  { value: 'inhalational', label: 'مخدرات استنشاقية' },
  { value: 'analgesics', label: 'مسكنات' },
  { value: 'sedatives', label: 'مهدئات' },
  { value: 'muscle-relaxants', label: 'مرخيات عضلية' },
  { value: 'emergency', label: 'أدوية الطوارئ' },
  { value: 'antiemetics', label: 'مضادات القيء' },
  { value: 'local-anesthetics', label: 'مخدرات موضعية' },
  { value: 'reversal', label: 'أدوية العكس / الترياق' },
  { value: 'cardiovascular', label: 'أدوية قلبية وعائية' },
  { value: 'adjuncts', label: 'أدوية مساعدة' },
];

const CLASS_OPTIONS = Object.entries(DRUG_CLASS_LABELS) as Array<[DrugClass, string]>;

const SECTION_OPTIONS: Array<{ value: DrugMediaSection; label: string }> = [
  { value: 'feature', label: 'ميزة الدواء' },
  { value: 'clinicalNote', label: 'الملاحظة السريرية' },
  { value: 'uses', label: 'الاستخدامات' },
  { value: 'mechanism', label: 'آلية العمل' },
  { value: 'routes', label: 'طرق الإعطاء' },
  { value: 'educationalDoses', label: 'الجرعات المرجعية' },
  { value: 'onsetDuration', label: 'بداية ومدة التأثير' },
  { value: 'contraindications', label: 'موانع الاستعمال' },
  { value: 'warnings', label: 'التحذيرات' },
  { value: 'adverseEffects', label: 'الآثار الجانبية' },
  { value: 'tradeNames', label: 'الأسماء التجارية' },
];

const blankDrug = (): AnesthesiaDrug => ({
  id: '',
  en: '',
  ar: '',
  category: 'hypnotics',
  categoryAr: 'منومات وريدية',
  classes: ['intravenous'],
  short: '',
  tags: [],
});

const blankDetails = (): DrugDetail => ({
  feature: '',
  mechanism: '',
  tradeNames: [],
  routes: [],
  educationalDoses: [],
  onsetDuration: [],
  uses: [],
  contraindications: [],
  warnings: [],
  adverseEffects: [],
  correction: '',
  clinicalNote: '',
  sourcePages: [],
  sourceLabel: '',
});

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function initialPayload(row?: DrugContentRow | null): DrugPayload {
  if (!row || !isRecord(row.payload)) {
    return { schemaVersion: 1, drug: blankDrug(), details: blankDetails(), media: [] };
  }

  const raw = row.payload;
  const legacyDrug = isRecord(raw.drug) ? raw.drug : raw;
  const legacyDetails = isRecord(raw.details) ? raw.details : {};
  const media = Array.isArray(raw.media) ? (raw.media as ContentMediaItem[]) : [];

  const drug: AnesthesiaDrug = {
    ...blankDrug(),
    ...(legacyDrug as Partial<AnesthesiaDrug>),
    id: String((legacyDrug as Partial<AnesthesiaDrug>).id ?? row.slug ?? ''),
    classes: Array.isArray((legacyDrug as Partial<AnesthesiaDrug>).classes)
      ? ((legacyDrug as Partial<AnesthesiaDrug>).classes as DrugClass[])
      : ['intravenous'],
    tags: Array.isArray((legacyDrug as Partial<AnesthesiaDrug>).tags)
      ? ((legacyDrug as Partial<AnesthesiaDrug>).tags as string[])
      : [],
  };

  const arrayValue = <T,>(value: T[] | undefined) => (Array.isArray(value) ? value : []);
  const details: DrugDetail = {
    ...blankDetails(),
    ...(legacyDetails as Partial<DrugDetail>),
    tradeNames: arrayValue((legacyDetails as Partial<DrugDetail>).tradeNames),
    routes: arrayValue((legacyDetails as Partial<DrugDetail>).routes),
    educationalDoses: arrayValue((legacyDetails as Partial<DrugDetail>).educationalDoses),
    onsetDuration: arrayValue((legacyDetails as Partial<DrugDetail>).onsetDuration),
    uses: arrayValue((legacyDetails as Partial<DrugDetail>).uses),
    contraindications: arrayValue((legacyDetails as Partial<DrugDetail>).contraindications),
    warnings: arrayValue((legacyDetails as Partial<DrugDetail>).warnings),
    adverseEffects: arrayValue((legacyDetails as Partial<DrugDetail>).adverseEffects),
  };

  return { schemaVersion: 1, drug, details, media };
}

function HelpButton({ info }: { info: HelpInfo }) {
  const [open, setOpen] = useState(false);
  return (
    <span className="relative inline-flex" onClick={(event) => event.stopPropagation()}>
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="grid h-6 w-6 place-items-center rounded-full border border-[#c9d9e7] bg-white text-[#2f69a8] transition hover:bg-[#eef3f8]"
        aria-label="شرح الخانة"
        title="ما المقصود بهذه الخانة؟"
      >
        <CircleHelp size={14} strokeWidth={2.2} />
      </button>
      {open && (
        <span className="absolute right-0 top-8 z-50 w-[280px] max-w-[78vw] rounded-2xl border border-[#d9e6f2] bg-white p-3 text-right shadow-xl">
          <span className="block text-xs font-bold leading-5 text-[#40566a]">{info.help}</span>
          <span className="mt-2 block rounded-xl bg-[#eef3f8] px-3 py-2 text-[11px] leading-5 text-[#173a63]">
            <strong>مثال:</strong> {info.example}
          </span>
        </span>
      )}
    </span>
  );
}

function FieldHeading({ label, helpKey, required }: { label: string; helpKey: string; required?: boolean }) {
  return (
    <div className="mb-1.5 flex items-center justify-end gap-2">
      <HelpButton info={HELP[helpKey]} />
      <span className="text-xs font-black text-[#24313f]">{label}{required ? ' *' : ''}</span>
    </div>
  );
}

function TextInput({ label, helpKey, value, onChange, dir = 'rtl', placeholder, required }: {
  label: string;
  helpKey: string;
  value: string;
  onChange: (value: string) => void;
  dir?: 'rtl' | 'ltr';
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <div className="block">
      <FieldHeading label={label} helpKey={helpKey} required={required} />
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        dir={dir}
        placeholder={placeholder}
        className="w-full rounded-2xl border border-[#d9e6f2] bg-white px-4 py-3 text-sm outline-none transition focus:border-[#2f69a8] focus:ring-4 focus:ring-[#2f69a8]/10"
      />
    </div>
  );
}

function TextArea({ label, helpKey, value, onChange, rows = 4, required }: {
  label: string;
  helpKey: string;
  value: string;
  onChange: (value: string) => void;
  rows?: number;
  required?: boolean;
}) {
  return (
    <div className="block">
      <FieldHeading label={label} helpKey={helpKey} required={required} />
      <textarea
        value={value}
        onChange={(event) => onChange(event.target.value)}
        rows={rows}
        className="w-full resize-y rounded-2xl border border-[#d9e6f2] bg-white px-4 py-3 text-sm leading-6 outline-none transition focus:border-[#2f69a8] focus:ring-4 focus:ring-[#2f69a8]/10"
      />
    </div>
  );
}

function StringListEditor({ label, helpKey, items, onChange }: {
  label: string;
  helpKey: string;
  items: string[];
  onChange: (items: string[]) => void;
}) {
  const update = (index: number, value: string) => {
    const next = [...items];
    next[index] = value;
    onChange(next);
  };
  const move = (index: number, direction: -1 | 1) => {
    const target = index + direction;
    if (target < 0 || target >= items.length) return;
    const next = [...items];
    [next[index], next[target]] = [next[target], next[index]];
    onChange(next);
  };

  return (
    <section className="rounded-2xl border border-[#e3eaf0] bg-[#f8fbfd] p-3.5">
      <div className="mb-3 flex items-center justify-between gap-3">
        <button type="button" onClick={() => onChange([...items, ''])} className="inline-flex items-center gap-1 rounded-xl bg-white px-3 py-2 text-xs font-black text-[#173a63] ring-1 ring-[#d9e6f2]">
          <Plus size={14} /> إضافة
        </button>
        <div className="flex items-center gap-2">
          <HelpButton info={HELP[helpKey]} />
          <h3 className="text-xs font-black text-[#24313f]">{label}</h3>
        </div>
      </div>
      {items.length === 0 ? (
        <p className="text-center text-xs text-slate-400">لا توجد عناصر. اضغط «إضافة» لإضافة أول عنصر.</p>
      ) : (
        <div className="space-y-2">
          {items.map((item, index) => (
            <div key={index} className="flex items-start gap-2">
              <div className="flex shrink-0 gap-1 pt-1">
                <button type="button" onClick={() => move(index, -1)} className="rounded-lg p-2 text-slate-500 hover:bg-white" aria-label="تحريك للأعلى"><ArrowUp size={14} /></button>
                <button type="button" onClick={() => move(index, 1)} className="rounded-lg p-2 text-slate-500 hover:bg-white" aria-label="تحريك للأسفل"><ArrowDown size={14} /></button>
                <button type="button" onClick={() => onChange(items.filter((_, itemIndex) => itemIndex !== index))} className="rounded-lg p-2 text-red-500 hover:bg-red-50" aria-label="حذف"><Trash2 size={14} /></button>
              </div>
              <textarea value={item} onChange={(event) => update(index, event.target.value)} rows={2} className="min-h-11 flex-1 resize-y rounded-xl border border-[#d9e6f2] bg-white px-3 py-2 text-sm leading-6 outline-none focus:border-[#2f69a8]" />
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default function DrugEditorV2({ profileId, role, initialRow, onSaved, onClose }: Props) {
  const seed = useMemo(() => initialPayload(initialRow), [initialRow]);
  const draftUploadKey = useRef(initialRow?.id ?? crypto.randomUUID());
  const [drug, setDrug] = useState<AnesthesiaDrug>(seed.drug);
  const [details, setDetails] = useState<DrugDetail>(seed.details);
  const [media, setMedia] = useState<ContentMediaItem[]>(seed.media);
  const [rowId, setRowId] = useState<string | null>(initialRow?.id ?? null);
  const [status, setStatus] = useState<ContentStatus>(initialRow?.status ?? 'draft');
  const [busy, setBusy] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');

  useEffect(() => {
    let active = true;
    void hydrateAdminMedia(seed.media).then((hydrated) => { if (active) setMedia(hydrated); });
    return () => { active = false; };
  }, [seed]);

  const canEdit = role === 'owner' || role === 'admin';
  const canPublish = canEdit;

  const setDetail = <K extends keyof DrugDetail>(key: K, value: DrugDetail[K]) => {
    setDetails((current) => ({ ...current, [key]: value }));
  };

  const validate = () => {
    if (!drug.id.trim() || !/^[a-z0-9][a-z0-9-]*$/.test(drug.id.trim())) return 'المعرّف يجب أن يكون إنكليزيًا صغيرًا مثل propofol أو new-drug.';
    if (!drug.ar.trim() || !drug.en.trim()) return 'الاسم العربي والإنكليزي مطلوبان.';
    if (!drug.categoryAr.trim()) return 'اسم التصنيف العربي مطلوب.';
    if (drug.classes.length === 0) return 'اختر تصنيف دوائي واحد على الأقل.';
    if (!drug.short.trim()) return 'الوصف المختصر مطلوب.';
    if (!details.feature.trim()) return 'ميزة الدواء الأساسية مطلوبة.';
    return null;
  };

  const cleanList = (items?: string[]) => items?.map((item) => item.trim()).filter(Boolean);

  const buildPayload = (mediaOverride: ContentMediaItem[] = media): DrugPayload => ({
    schemaVersion: 1,
    drug: {
      ...drug,
      id: drug.id.trim(),
      en: drug.en.trim(),
      ar: drug.ar.trim(),
      categoryAr: drug.categoryAr.trim(),
      short: drug.short.trim(),
      tags: cleanList(drug.tags) ?? [],
    },
    details: {
      ...details,
      feature: details.feature.trim(),
      mechanism: details.mechanism?.trim() || undefined,
      clinicalNote: details.clinicalNote?.trim() || undefined,
      correction: details.correction?.trim() || undefined,
      sourceLabel: details.sourceLabel?.trim() || undefined,
      sourcePages: details.sourcePages?.filter((page) => Number.isFinite(page)),
      tradeNames: cleanList(details.tradeNames),
      routes: cleanList(details.routes),
      educationalDoses: cleanList(details.educationalDoses),
      onsetDuration: cleanList(details.onsetDuration),
      uses: cleanList(details.uses) ?? [],
      contraindications: cleanList(details.contraindications) ?? [],
      warnings: cleanList(details.warnings) ?? [],
      adverseEffects: cleanList(details.adverseEffects) ?? [],
    },
    media: mediaOverride.map((item, index) => ({ ...item, order: index })),
  });

  const persist = async (targetStatus: ContentStatus) => {
    if (!canEdit) return;
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }
    setBusy(true);
    setError('');
    setNotice('');
    let rollbackPublicPaths: string[] = [];
    try {
      let payloadMedia = media;
      let cleanupDraftPaths: string[] = [];
      if (targetStatus === 'published') {
        const promoted = await promoteMediaForPublish(media, profileId, 'drug', drug.id.trim());
        payloadMedia = promoted.media;
        cleanupDraftPaths = promoted.draftPathsToCleanup;
        rollbackPublicPaths = promoted.publicPathsToRollback;
      }
      const payload = buildPayload(payloadMedia);
      const baseRecord = {
        content_type: 'drug',
        slug: payload.drug.id,
        title_ar: payload.drug.ar,
        title_en: payload.drug.en,
        payload,
      };
      let currentId = rowId;
      if (!currentId) {
        const { data, error: insertError } = await supabase.from('content_items').insert({ ...baseRecord, status: targetStatus }).select('id,status').single();
        if (insertError) throw insertError;
        currentId = data.id as string;
        setRowId(currentId);
        setStatus(data.status as ContentStatus);
      } else {
        const { error: updateError } = await supabase.from('content_items').update({ ...baseRecord, status: targetStatus }).eq('id', currentId);
        if (updateError) throw updateError;
        setStatus(targetStatus);
      }
      if (targetStatus === 'published') {
        setMedia(payloadMedia);
        await cleanupPromotedDraftMedia(cleanupDraftPaths);
        rollbackPublicPaths = [];
      }
      setNotice(targetStatus === 'published' ? 'تم حفظ الدواء ونشره.' : targetStatus === 'review' ? 'تم حفظ الدواء وإرساله للمراجعة.' : 'تم حفظ المسودة.');
      await onSaved();
    } catch (caught) {
      await rollbackPromotedPublicMedia(rollbackPublicPaths);
      setError(caught instanceof Error ? caught.message : 'تعذر حفظ الدواء.');
    } finally {
      setBusy(false);
    }
  };

  const uploadImages = async (event: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files ?? []);
    event.target.value = '';
    if (files.length === 0) return;
    setUploading(true);
    setError('');
    setNotice('');
    try {
      const uploaded: ContentMediaItem[] = [];
      const hasCover = media.some((item) => item.placement === 'cover' && !item.hidden);
      for (const file of files) {
        const folder = drug.id.trim() && /^[a-z0-9][a-z0-9-]*$/.test(drug.id.trim()) ? drug.id.trim() : `draft-${draftUploadKey.current}`;
        uploaded.push(await uploadDraftMedia({
          file,
          profileId,
          contentType: 'drug',
          folder,
          alt: drug.ar.trim() || drug.en.trim() || file.name,
          placement: !hasCover && uploaded.length === 0 ? 'cover' : 'gallery',
          order: media.length + uploaded.length,
        }));
      }
      setMedia((current) => [...current, ...uploaded]);
      setNotice(`تم رفع ${uploaded.length} صورة وظهرت بالمعاينة مباشرة. احفظ المسودة لتثبيت بياناتها.`);
      setPreviewOpen(true);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : 'تعذر رفع الصور.');
    } finally {
      setUploading(false);
    }
  };

  const updateMedia = (id: string, patch: Partial<ContentMediaItem>) => {
    setMedia((current) => {
      let next = current.map((item) => (item.id === id ? { ...item, ...patch } : item));
      if (patch.placement === 'cover') {
        next = next.map((item) => item.id !== id && item.placement === 'cover' ? { ...item, placement: 'gallery' as const, sectionKey: undefined } : item);
      }
      return next;
    });
  };

  const moveMedia = (index: number, direction: -1 | 1) => {
    const target = index + direction;
    if (target < 0 || target >= media.length) return;
    const next = [...media];
    [next[index], next[target]] = [next[target], next[index]];
    setMedia(next);
  };

  const deleteMedia = async (item: ContentMediaItem) => {
    setError('');
    try {
      await removeAdminMedia(item);
      setMedia((current) => current.filter((mediaItem) => mediaItem.id !== item.id));
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : 'تعذر حذف الصورة.');
    }
  };

  const toggleClass = (drugClass: DrugClass) => {
    setDrug((current) => ({
      ...current,
      classes: current.classes.includes(drugClass) ? current.classes.filter((item) => item !== drugClass) : [...current.classes, drugClass],
    }));
  };

  return (
    <div className="fixed inset-0 z-[70] overflow-y-auto bg-[#07182c]/65 p-3 backdrop-blur-sm sm:p-6" dir="rtl">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-[30px] bg-[#eef3f8] shadow-2xl">
        <header className="sticky top-0 z-20 flex items-center justify-between gap-3 border-b border-white/10 bg-[#07182c] px-4 py-4 text-white sm:px-6">
          <button type="button" onClick={onClose} className="grid h-10 w-10 place-items-center rounded-xl bg-white/10 hover:bg-white/20" aria-label="إغلاق"><X size={19} /></button>
          <div className="text-right">
            <p className="text-xs font-bold text-[#d9a441]">دليلي — محرر المحتوى</p>
            <h2 className="text-lg font-black">{rowId ? `تعديل ${drug.ar || 'دواء'}` : 'إضافة دواء جديد'}</h2>
            <p className="mt-0.5 text-xs text-white/55">الحالة: {status}</p>
          </div>
        </header>

        <div className="grid gap-5 p-4 sm:p-6 lg:grid-cols-[1fr_360px]">
          <main className="space-y-5">
            <section className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-200/70">
              <h3 className="mb-4 font-black text-[#0a2037]">المعلومات الأساسية</h3>
              <div className="grid gap-4 md:grid-cols-2">
                <TextInput label="المعرّف Slug" helpKey="slug" value={drug.id} onChange={(value) => setDrug({ ...drug, id: value.toLowerCase().replace(/\s+/g, '-') })} dir="ltr" placeholder="propofol" required />
                <TextInput label="الاسم الإنكليزي" helpKey="englishName" value={drug.en} onChange={(value) => setDrug({ ...drug, en: value })} dir="ltr" placeholder="Propofol" required />
                <TextInput label="الاسم العربي" helpKey="arabicName" value={drug.ar} onChange={(value) => setDrug({ ...drug, ar: value })} placeholder="بروبوفول" required />
                <div className="block">
                  <FieldHeading label="التصنيف" helpKey="category" required />
                  <select value={drug.category} onChange={(event) => {
                    const value = event.target.value as DrugCategory;
                    const selected = CATEGORY_OPTIONS.find((item) => item.value === value);
                    setDrug({ ...drug, category: value, categoryAr: selected?.label ?? drug.categoryAr });
                  }} className="w-full rounded-2xl border border-[#d9e6f2] bg-white px-4 py-3 text-sm font-bold outline-none focus:border-[#2f69a8]">
                    {CATEGORY_OPTIONS.map((item) => <option key={item.value} value={item.value}>{item.label}</option>)}
                  </select>
                </div>
                <TextInput label="اسم التصنيف العربي" helpKey="categoryAr" value={drug.categoryAr} onChange={(value) => setDrug({ ...drug, categoryAr: value })} required />
              </div>
              <div className="mt-4"><TextArea label="الوصف المختصر" helpKey="short" value={drug.short} onChange={(value) => setDrug({ ...drug, short: value })} rows={3} required /></div>
              <div className="mt-4"><StringListEditor label="Tags / كلمات البحث" helpKey="tags" items={drug.tags} onChange={(tags) => setDrug({ ...drug, tags })} /></div>
              <div className="mt-4 rounded-2xl border border-[#e3eaf0] bg-[#f8fbfd] p-3.5">
                <div className="mb-3 flex items-center justify-end gap-2"><HelpButton info={HELP.classes} /><div className="text-xs font-black text-[#24313f]">التصنيفات الدوائية *</div></div>
                <div className="flex flex-wrap gap-2">
                  {CLASS_OPTIONS.map(([value, label]) => (
                    <label key={value} className={`cursor-pointer rounded-full border px-3 py-2 text-xs font-bold transition ${drug.classes.includes(value) ? 'border-[#2f69a8] bg-[#eef3f8] text-[#173a63]' : 'border-slate-200 bg-white text-slate-500'}`}>
                      <input type="checkbox" className="sr-only" checked={drug.classes.includes(value)} onChange={() => toggleClass(value)} />{label}
                    </label>
                  ))}
                </div>
              </div>
            </section>

            <section className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-200/70">
              <h3 className="mb-4 font-black text-[#0a2037]">التفاصيل الطبية</h3>
              <div className="space-y-4">
                <TextArea label="ميزة الدواء | Key feature" helpKey="feature" value={details.feature} onChange={(value) => setDetail('feature', value)} required />
                <TextArea label="ملاحظة سريرية | Clinical note" helpKey="clinicalNote" value={details.clinicalNote ?? ''} onChange={(value) => setDetail('clinicalNote', value)} />
                <TextArea label="آلية العمل | Mechanism" helpKey="mechanism" value={details.mechanism ?? ''} onChange={(value) => setDetail('mechanism', value)} />
                <StringListEditor label="الاستخدامات | Uses" helpKey="uses" items={details.uses} onChange={(value) => setDetail('uses', value)} />
                <StringListEditor label="طرق الإعطاء | Routes" helpKey="routes" items={details.routes ?? []} onChange={(value) => setDetail('routes', value)} />
                <StringListEditor label="الجرعات المرجعية | Reference doses" helpKey="educationalDoses" items={details.educationalDoses ?? []} onChange={(value) => setDetail('educationalDoses', value)} />
                <StringListEditor label="بداية ومدة التأثير | Onset & duration" helpKey="onsetDuration" items={details.onsetDuration ?? []} onChange={(value) => setDetail('onsetDuration', value)} />
                <StringListEditor label="موانع الاستعمال | Contraindications" helpKey="contraindications" items={details.contraindications} onChange={(value) => setDetail('contraindications', value)} />
                <StringListEditor label="التحذيرات | Warnings" helpKey="warnings" items={details.warnings} onChange={(value) => setDetail('warnings', value)} />
                <StringListEditor label="الآثار الجانبية | Adverse effects" helpKey="adverseEffects" items={details.adverseEffects} onChange={(value) => setDetail('adverseEffects', value)} />
                <StringListEditor label="الأسماء التجارية | Trade names" helpKey="tradeNames" items={details.tradeNames ?? []} onChange={(value) => setDetail('tradeNames', value)} />
                <TextArea label="تصحيح/ملاحظة داخلية" helpKey="correction" value={details.correction ?? ''} onChange={(value) => setDetail('correction', value)} />
                <TextInput label="اسم المصدر" helpKey="sourceLabel" value={details.sourceLabel ?? ''} onChange={(value) => setDetail('sourceLabel', value)} />
                <TextInput label="صفحات المصدر — افصل بفواصل" helpKey="sourcePages" value={(details.sourcePages ?? []).join(', ')} onChange={(value) => setDetail('sourcePages', value.split(',').map((part) => Number(part.trim())).filter((number) => Number.isFinite(number) && number > 0))} dir="ltr" placeholder="8, 64, 65" />
              </div>
            </section>

            <section className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-200/70">
              <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                <label className={`inline-flex cursor-pointer items-center gap-2 rounded-2xl bg-[#173a63] px-4 py-3 text-sm font-black text-white ${uploading ? 'pointer-events-none opacity-60' : ''}`}>
                  <Upload size={17} /> {uploading ? 'جاري الرفع…' : 'رفع صورة أو عدة صور'}
                  <input type="file" multiple accept="image/jpeg,image/png,image/webp" className="hidden" onChange={uploadImages} disabled={uploading || !canEdit} />
                </label>
                <div className="flex items-start gap-2">
                  <HelpButton info={HELP.imageUpload} />
                  <div><h3 className="font-black text-[#0a2037]">الصور والشرح البصري</h3><p className="mt-1 text-xs text-slate-500">الرفع يعمل حتى قبل كتابة الـSlug. أول صورة تصبح رئيسية تلقائيًا.</p></div>
                </div>
              </div>

              {media.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-[#b9cee2] bg-[#f8fbfd] p-8 text-center"><ImagePlus className="mx-auto mb-2 text-[#2f69a8]" /><p className="text-sm font-bold text-slate-500">ماكو صور لهذا الدواء بعد.</p></div>
              ) : (
                <div className="space-y-3">
                  {media.map((item, index) => (
                    <div key={item.id} className="grid gap-3 rounded-2xl border border-[#e3eaf0] bg-[#f8fbfd] p-3 md:grid-cols-[120px_1fr]">
                      <div className="relative overflow-hidden rounded-xl border border-[#d9e6f2] bg-white"><img src={item.url} alt={item.alt} className="h-28 w-full object-contain" />{item.hidden && <div className="absolute inset-0 grid place-items-center bg-white/80 text-xs font-black text-slate-500">مخفية</div>}</div>
                      <div className="space-y-3">
                        <div className="grid gap-2 sm:grid-cols-2">
                          <div><FieldHeading label="مكان الصورة" helpKey="imagePlacement" /><select value={item.placement} onChange={(event) => updateMedia(item.id, { placement: event.target.value as ContentMediaPlacement, sectionKey: event.target.value === 'section' ? item.sectionKey ?? 'feature' : undefined })} className="w-full rounded-xl border border-[#d9e6f2] bg-white px-3 py-2 text-sm font-bold"><option value="cover">صورة رئيسية قرب العنوان</option><option value="gallery">معرض صور</option><option value="section">داخل قسم من الشرح</option></select></div>
                          {item.placement === 'section' ? <div><FieldHeading label="قسم الشرح" helpKey="imageSection" /><select value={item.sectionKey ?? 'feature'} onChange={(event) => updateMedia(item.id, { sectionKey: event.target.value as DrugMediaSection })} className="w-full rounded-xl border border-[#d9e6f2] bg-white px-3 py-2 text-sm font-bold">{SECTION_OPTIONS.map((section) => <option key={section.value} value={section.value}>{section.label}</option>)}</select></div> : <div />}
                        </div>
                        <TextInput label="النص البديل للصورة" helpKey="imageAlt" value={item.alt} onChange={(value) => updateMedia(item.id, { alt: value })} placeholder="أمبولة بروبوفول" />
                        <TextArea label="شرح تحت الصورة" helpKey="imageCaption" value={item.caption ?? ''} onChange={(value) => updateMedia(item.id, { caption: value })} rows={2} />
                        <div className="flex flex-wrap gap-1">
                          <button type="button" onClick={() => moveMedia(index, -1)} className="rounded-lg bg-white p-2 text-slate-600 ring-1 ring-slate-200"><ArrowUp size={15} /></button>
                          <button type="button" onClick={() => moveMedia(index, 1)} className="rounded-lg bg-white p-2 text-slate-600 ring-1 ring-slate-200"><ArrowDown size={15} /></button>
                          <button type="button" onClick={() => updateMedia(item.id, { hidden: !item.hidden })} className="inline-flex items-center gap-1 rounded-lg bg-white px-2.5 py-2 text-xs font-bold text-slate-600 ring-1 ring-slate-200">{item.hidden ? <Eye size={15} /> : <EyeOff size={15} />} {item.hidden ? 'إظهار' : 'إخفاء'}</button>
                          <button type="button" onClick={() => void deleteMedia(item)} className="inline-flex items-center gap-1 rounded-lg bg-red-50 px-2.5 py-2 text-xs font-bold text-red-600 ring-1 ring-red-100"><Trash2 size={15} /> حذف</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>
          </main>

          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="space-y-3 rounded-3xl bg-white p-4 shadow-sm ring-1 ring-slate-200/70">
              <button type="button" onClick={() => setPreviewOpen(true)} className="flex w-full items-center justify-center gap-2 rounded-2xl border border-[#d9e6f2] bg-[#f8fbfd] px-4 py-3 font-black text-[#173a63]"><Eye size={18} /> معاينة داخل قالب دليلي</button>
              {canEdit && <>
                <button type="button" disabled={busy} onClick={() => void persist('draft')} className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#173a63] px-4 py-3 font-black text-white disabled:opacity-60"><Save size={18} /> حفظ كمسودة</button>
                <button type="button" disabled={busy} onClick={() => void persist('review')} className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#eef3f8] px-4 py-3 font-black text-[#173a63] ring-1 ring-[#d9e6f2] disabled:opacity-60"><Send size={18} /> إرسال للمراجعة</button>
                {canPublish && <button type="button" disabled={busy} onClick={() => void persist('published')} className="w-full rounded-2xl bg-emerald-600 px-4 py-3 font-black text-white disabled:opacity-60">نشر الآن</button>}
              </>}
              {error && <div className="rounded-2xl border border-red-200 bg-red-50 p-3 text-xs font-bold leading-5 text-red-700">{error}</div>}
              {notice && <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-3 text-xs font-bold leading-5 text-emerald-800">{notice}</div>}
              <div className="rounded-2xl bg-[#f8fbfd] p-3 text-xs leading-6 text-slate-500">كل زر <strong>؟</strong> بجانب الخانة يشرح المقصود منها ويعطي مثالًا. المعاينة تستخدم نفس مكوّن تفاصيل الدواء في التطبيق.</div>
            </div>
          </aside>
        </div>
      </div>

      {previewOpen && <DrugDetailSheet drug={drug} detail={details} media={media} onClose={() => setPreviewOpen(false)} />}
    </div>
  );
}
