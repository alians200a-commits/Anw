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
  EQUIPMENT_CATEGORY_LABELS,
  type AnesthesiaEquipment,
  type EquipmentCategory,
} from '../data/equipment';
import { EquipmentSheet } from '../components/EquipmentDirectory';
import { supabase } from '../lib/supabase';
import type { AdminRole } from './adminTypes';
import { cleanupPromotedDraftMedia, hydrateAdminMedia, promoteMediaForPublish, removeAdminMedia, rollbackPromotedPublicMedia, uploadDraftMedia } from '../lib/contentMediaStorage';
import type {
  ContentMediaItem,
  ContentMediaPlacement,
  EquipmentMediaSection,
} from '../types/contentMedia';

type ContentStatus = 'draft' | 'review' | 'approved' | 'published' | 'rejected' | 'archived';

export type EquipmentContentRow = {
  id: string;
  slug: string;
  title_ar: string | null;
  title_en: string | null;
  status: ContentStatus;
  payload: unknown;
};

type EquipmentPayload = {
  schemaVersion: 1;
  equipment: AnesthesiaEquipment;
  media: ContentMediaItem[];
};

type Props = {
  profileId: string;
  role: AdminRole;
  initialRow?: EquipmentContentRow | null;
  onSaved: () => void | Promise<void>;
  onClose: () => void;
};

type HelpInfo = { help: string; example: string };

const HELP: Record<string, HelpInfo> = {
  slug: { help: 'معرّف داخلي ثابت للجهاز يستخدمه النظام والروابط. إنكليزي صغير وبدون مسافات.', example: 'laryngoscope أو anesthesia-workstation' },
  nameEn: { help: 'الاسم العلمي أو الشائع للجهاز باللغة الإنكليزية.', example: 'Laryngoscope' },
  nameAr: { help: 'اسم الجهاز بالعربية كما سيظهر داخل التطبيق.', example: 'منظار الحنجرة' },
  category: { help: 'القسم الرئيسي الذي يظهر الجهاز تحته داخل دليل المعدات.', example: 'مجرى الهواء' },
  categoryAr: { help: 'اسم التصنيف العربي الظاهر. يتعبأ تلقائيًا ويمكن تعديله.', example: 'مجرى الهواء' },
  summary: { help: 'تعريف مختصر: ما هو هذا الجهاز؟', example: 'أداة تستخدم لرؤية مدخل الحنجرة أثناء التنبيب الرغامي.' },
  purpose: { help: 'وظائف الجهاز أو الأغراض التي يستخدم لها. كل وظيفة بسطر مستقل.', example: 'تسهيل رؤية الحبال الصوتية أثناء التنبيب.' },
  keyPoints: { help: 'أهم النقاط العملية أو التقنية التي يجب تذكرها عن الجهاز.', example: 'يجب فحص الإضاءة والبطارية قبل الاستخدام.' },
  clinicalNote: { help: 'ملاحظة تطبيقية أو سريرية مهمة مرتبطة باستخدام الجهاز.', example: 'اختر حجم الشفرة حسب عمر وبنية المريض.' },
  correction: { help: 'ملاحظة داخلية لتصحيح مصطلح أو معلومة قديمة. لا يلزم عرضها للمستخدم.', example: 'اعتمد مصطلح عربة التخدير بدل Boyle machine للأجهزة الحديثة.' },
  tags: { help: 'كلمات تساعد البحث داخل التطبيق. كل كلمة أو عبارة عنصر منفصل.', example: 'airway، intubation، laryngoscope، منظار' },
  sourcePages: { help: 'أرقام صفحات المصدر الداعمة للمعلومة، مفصولة بفواصل.', example: '10, 11, 12' },
  imageUpload: { help: 'ارفع صورة رئيسية أو عدة صور للشرح. أول صورة تصبح رئيسية تلقائيًا.', example: 'صورة منظار حنجرة أو رسم لأجزاء عربة التخدير.' },
  imagePlacement: { help: 'مكان ظهور الصورة داخل صفحة الجهاز.', example: 'صورة رئيسية، معرض صور، أو بعد قسم الوظيفة.' },
  imageSection: { help: 'القسم الذي تظهر الصورة بعده عندما تختار «داخل قسم من الشرح».', example: 'الملخص أو الوظيفة أو النقاط المهمة.' },
  imageAlt: { help: 'وصف قصير للصورة للوصول وحالات تعذر التحميل.', example: 'منظار حنجرة بشفرة Macintosh' },
  imageCaption: { help: 'شرح اختياري يظهر تحت الصورة.', example: 'مثال على منظار الحنجرة المستخدم للتنبيب.' },
};

const CATEGORY_OPTIONS = Object.entries(EQUIPMENT_CATEGORY_LABELS) as Array<[EquipmentCategory, string]>;

const SECTION_OPTIONS: Array<{ value: EquipmentMediaSection; label: string }> = [
  { value: 'summary', label: 'ما هو؟ / الملخص' },
  { value: 'clinicalNote', label: 'الملاحظة السريرية' },
  { value: 'purpose', label: 'الوظيفة' },
  { value: 'keyPoints', label: 'النقاط المهمة' },
];

const blankEquipment = (): AnesthesiaEquipment => ({
  id: '',
  nameAr: '',
  nameEn: '',
  category: 'tools',
  categoryAr: EQUIPMENT_CATEGORY_LABELS.tools,
  sourcePages: [],
  summary: '',
  purpose: [],
  keyPoints: [],
  correction: '',
  clinicalNote: '',
  tags: [],
});

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function initialPayload(row?: EquipmentContentRow | null): EquipmentPayload {
  if (!row || !isRecord(row.payload)) return { schemaVersion: 1, equipment: blankEquipment(), media: [] };
  const raw = row.payload;
  const legacy = isRecord(raw.equipment) ? raw.equipment : raw;
  const media = Array.isArray(raw.media) ? (raw.media as ContentMediaItem[]) : [];
  const equipment: AnesthesiaEquipment = {
    ...blankEquipment(),
    ...(legacy as Partial<AnesthesiaEquipment>),
    id: String((legacy as Partial<AnesthesiaEquipment>).id ?? row.slug ?? ''),
    sourcePages: Array.isArray((legacy as Partial<AnesthesiaEquipment>).sourcePages) ? ((legacy as Partial<AnesthesiaEquipment>).sourcePages as number[]) : [],
    purpose: Array.isArray((legacy as Partial<AnesthesiaEquipment>).purpose) ? ((legacy as Partial<AnesthesiaEquipment>).purpose as string[]) : [],
    keyPoints: Array.isArray((legacy as Partial<AnesthesiaEquipment>).keyPoints) ? ((legacy as Partial<AnesthesiaEquipment>).keyPoints as string[]) : [],
    tags: Array.isArray((legacy as Partial<AnesthesiaEquipment>).tags) ? ((legacy as Partial<AnesthesiaEquipment>).tags as string[]) : [],
  };
  return { schemaVersion: 1, equipment, media };
}

function HelpButton({ info }: { info: HelpInfo }) {
  const [open, setOpen] = useState(false);
  return (
    <span className="relative inline-flex" onClick={(event) => event.stopPropagation()}>
      <button type="button" onClick={() => setOpen((value) => !value)} className="grid h-6 w-6 place-items-center rounded-full border border-[#c9d9e7] bg-white text-[#2f69a8]" aria-label="شرح الخانة"><CircleHelp size={14} strokeWidth={2.2} /></button>
      {open && <span className="absolute right-0 top-8 z-50 w-[280px] max-w-[78vw] rounded-2xl border border-[#d9e6f2] bg-white p-3 text-right shadow-xl"><span className="block text-xs font-bold leading-5 text-[#40566a]">{info.help}</span><span className="mt-2 block rounded-xl bg-[#eef3f8] px-3 py-2 text-[11px] leading-5 text-[#173a63]"><strong>مثال:</strong> {info.example}</span></span>}
    </span>
  );
}

function FieldHeading({ label, helpKey, required }: { label: string; helpKey: string; required?: boolean }) {
  return <div className="mb-1.5 flex items-center justify-end gap-2"><HelpButton info={HELP[helpKey]} /><span className="text-xs font-black text-[#24313f]">{label}{required ? ' *' : ''}</span></div>;
}

function TextInput({ label, helpKey, value, onChange, dir = 'rtl', placeholder, required }: { label: string; helpKey: string; value: string; onChange: (value: string) => void; dir?: 'rtl' | 'ltr'; placeholder?: string; required?: boolean }) {
  return <div className="block"><FieldHeading label={label} helpKey={helpKey} required={required} /><input value={value} onChange={(event) => onChange(event.target.value)} dir={dir} placeholder={placeholder} className="w-full rounded-2xl border border-[#d9e6f2] bg-white px-4 py-3 text-sm outline-none focus:border-[#2f69a8] focus:ring-4 focus:ring-[#2f69a8]/10" /></div>;
}

function TextArea({ label, helpKey, value, onChange, rows = 4, required }: { label: string; helpKey: string; value: string; onChange: (value: string) => void; rows?: number; required?: boolean }) {
  return <div className="block"><FieldHeading label={label} helpKey={helpKey} required={required} /><textarea value={value} onChange={(event) => onChange(event.target.value)} rows={rows} className="w-full resize-y rounded-2xl border border-[#d9e6f2] bg-white px-4 py-3 text-sm leading-6 outline-none focus:border-[#2f69a8] focus:ring-4 focus:ring-[#2f69a8]/10" /></div>;
}

function StringListEditor({ label, helpKey, items, onChange }: { label: string; helpKey: string; items: string[]; onChange: (items: string[]) => void }) {
  const move = (index: number, direction: -1 | 1) => {
    const target = index + direction;
    if (target < 0 || target >= items.length) return;
    const next = [...items];
    [next[index], next[target]] = [next[target], next[index]];
    onChange(next);
  };
  return (
    <section className="rounded-2xl border border-[#e3eaf0] bg-[#f8fbfd] p-3.5">
      <div className="mb-3 flex items-center justify-between gap-3"><button type="button" onClick={() => onChange([...items, ''])} className="inline-flex items-center gap-1 rounded-xl bg-white px-3 py-2 text-xs font-black text-[#173a63] ring-1 ring-[#d9e6f2]"><Plus size={14} /> إضافة</button><div className="flex items-center gap-2"><HelpButton info={HELP[helpKey]} /><h3 className="text-xs font-black text-[#24313f]">{label}</h3></div></div>
      {items.length === 0 ? <p className="text-center text-xs text-slate-400">لا توجد عناصر بعد.</p> : <div className="space-y-2">{items.map((item, index) => <div key={index} className="flex items-start gap-2"><div className="flex shrink-0 gap-1 pt-1"><button type="button" onClick={() => move(index, -1)} className="rounded-lg p-2 text-slate-500"><ArrowUp size={14} /></button><button type="button" onClick={() => move(index, 1)} className="rounded-lg p-2 text-slate-500"><ArrowDown size={14} /></button><button type="button" onClick={() => onChange(items.filter((_, i) => i !== index))} className="rounded-lg p-2 text-red-500"><Trash2 size={14} /></button></div><textarea value={item} onChange={(event) => { const next = [...items]; next[index] = event.target.value; onChange(next); }} rows={2} className="min-h-11 flex-1 resize-y rounded-xl border border-[#d9e6f2] bg-white px-3 py-2 text-sm leading-6 outline-none focus:border-[#2f69a8]" /></div>)}</div>}
    </section>
  );
}

export default function EquipmentEditor({ profileId, role, initialRow, onSaved, onClose }: Props) {
  const seed = useMemo(() => initialPayload(initialRow), [initialRow]);
  const draftUploadKey = useRef(initialRow?.id ?? crypto.randomUUID());
  const [equipment, setEquipment] = useState<AnesthesiaEquipment>(seed.equipment);
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
  const cleanList = (items: string[]) => items.map((item) => item.trim()).filter(Boolean);

  const validate = () => {
    if (!equipment.id.trim() || !/^[a-z0-9][a-z0-9-]*$/.test(equipment.id.trim())) return 'المعرّف يجب أن يكون إنكليزيًا صغيرًا مثل laryngoscope.';
    if (!equipment.nameAr.trim() || !equipment.nameEn.trim()) return 'الاسم العربي والإنكليزي مطلوبان.';
    if (!equipment.categoryAr.trim()) return 'اسم التصنيف العربي مطلوب.';
    if (!equipment.summary.trim()) return 'الملخص مطلوب.';
    return null;
  };

  const buildPayload = (mediaOverride: ContentMediaItem[] = media): EquipmentPayload => ({
    schemaVersion: 1,
    equipment: {
      ...equipment,
      id: equipment.id.trim(),
      nameAr: equipment.nameAr.trim(),
      nameEn: equipment.nameEn.trim(),
      categoryAr: equipment.categoryAr.trim(),
      summary: equipment.summary.trim(),
      purpose: cleanList(equipment.purpose),
      keyPoints: cleanList(equipment.keyPoints),
      tags: cleanList(equipment.tags),
      clinicalNote: equipment.clinicalNote?.trim() || undefined,
      correction: equipment.correction?.trim() || undefined,
      sourcePages: equipment.sourcePages.filter((page) => Number.isFinite(page) && page > 0),
    },
    media: mediaOverride.map((item, index) => ({ ...item, order: index })),
  });

  const persist = async (targetStatus: ContentStatus) => {
    if (!canEdit) return;
    const validationError = validate();
    if (validationError) { setError(validationError); return; }
    setBusy(true); setError(''); setNotice('');
    let rollbackPublicPaths: string[] = [];
    try {
      let payloadMedia = media;
      let cleanupDraftPaths: string[] = [];
      if (targetStatus === 'published') {
        const promoted = await promoteMediaForPublish(media, profileId, 'equipment', equipment.id.trim());
        payloadMedia = promoted.media;
        cleanupDraftPaths = promoted.draftPathsToCleanup;
        rollbackPublicPaths = promoted.publicPathsToRollback;
      }
      const payload = buildPayload(payloadMedia);
      const baseRecord = { content_type: 'equipment', slug: payload.equipment.id, title_ar: payload.equipment.nameAr, title_en: payload.equipment.nameEn, payload };
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
      setNotice(targetStatus === 'published' ? 'تم حفظ الجهاز ونشره.' : targetStatus === 'review' ? 'تم إرساله للمراجعة.' : 'تم حفظ المسودة.');
      await onSaved();
    } catch (caught) {
      await rollbackPromotedPublicMedia(rollbackPublicPaths);
      setError(caught instanceof Error ? caught.message : 'تعذر حفظ الجهاز.');
    } finally { setBusy(false); }
  };

  const uploadImages = async (event: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files ?? []);
    event.target.value = '';
    if (!files.length) return;
    setUploading(true); setError(''); setNotice('');
    try {
      const uploaded: ContentMediaItem[] = [];
      const hasCover = media.some((item) => item.placement === 'cover' && !item.hidden);
      for (const file of files) {
        const folder = equipment.id.trim() && /^[a-z0-9][a-z0-9-]*$/.test(equipment.id.trim()) ? equipment.id.trim() : `draft-${draftUploadKey.current}`;
        uploaded.push(await uploadDraftMedia({
          file,
          profileId,
          contentType: 'equipment',
          folder,
          alt: equipment.nameAr.trim() || equipment.nameEn.trim() || file.name,
          placement: !hasCover && uploaded.length === 0 ? 'cover' : 'gallery',
          order: media.length + uploaded.length,
        }));
      }
      setMedia((current) => [...current, ...uploaded]);
      setNotice(`تم رفع ${uploaded.length} صورة بشكل خاص للمسودة.`);
      setPreviewOpen(true);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : 'تعذر رفع الصور.');
    } finally { setUploading(false); }
  };

  const updateMedia = (id: string, patch: Partial<ContentMediaItem>) => {
    setMedia((current) => {
      let next = current.map((item) => item.id === id ? { ...item, ...patch } : item);
      if (patch.placement === 'cover') next = next.map((item) => item.id !== id && item.placement === 'cover' ? { ...item, placement: 'gallery' as const, sectionKey: undefined } : item);
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

  return (
    <div className="fixed inset-0 z-[70] overflow-y-auto bg-[#07182c]/65 p-3 backdrop-blur-sm sm:p-6" dir="rtl">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-[30px] bg-[#eef3f8] shadow-2xl">
        <header className="sticky top-0 z-20 flex items-center justify-between gap-3 border-b border-white/10 bg-[#07182c] px-4 py-4 text-white sm:px-6">
          <button type="button" onClick={onClose} className="grid h-10 w-10 place-items-center rounded-xl bg-white/10" aria-label="إغلاق"><X size={19} /></button>
          <div className="text-right"><p className="text-xs font-bold text-[#d9a441]">دليلي — محرر المعدات</p><h2 className="text-lg font-black">{rowId ? `تعديل ${equipment.nameAr || 'جهاز'}` : 'إضافة جهاز جديد'}</h2><p className="mt-0.5 text-xs text-white/55">الحالة: {status}</p></div>
        </header>

        <div className="grid gap-5 p-4 sm:p-6 lg:grid-cols-[1fr_360px]">
          <main className="space-y-5">
            <section className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-200/70">
              <h3 className="mb-4 font-black text-[#0a2037]">المعلومات الأساسية</h3>
              <div className="grid gap-4 md:grid-cols-2">
                <TextInput label="المعرّف Slug" helpKey="slug" value={equipment.id} onChange={(value) => setEquipment({ ...equipment, id: value.toLowerCase().replace(/\s+/g, '-') })} dir="ltr" placeholder="laryngoscope" required />
                <TextInput label="الاسم الإنكليزي" helpKey="nameEn" value={equipment.nameEn} onChange={(value) => setEquipment({ ...equipment, nameEn: value })} dir="ltr" placeholder="Laryngoscope" required />
                <TextInput label="الاسم العربي" helpKey="nameAr" value={equipment.nameAr} onChange={(value) => setEquipment({ ...equipment, nameAr: value })} placeholder="منظار الحنجرة" required />
                <div className="block"><FieldHeading label="التصنيف" helpKey="category" required /><select aria-label="تصنيف الجهاز" value={equipment.category} onChange={(event) => { const value = event.target.value as EquipmentCategory; setEquipment({ ...equipment, category: value, categoryAr: EQUIPMENT_CATEGORY_LABELS[value] }); }} className="w-full rounded-2xl border border-[#d9e6f2] bg-white px-4 py-3 text-sm font-bold">{CATEGORY_OPTIONS.map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select></div>
                <TextInput label="اسم التصنيف العربي" helpKey="categoryAr" value={equipment.categoryAr} onChange={(value) => setEquipment({ ...equipment, categoryAr: value })} required />
                <TextInput label="صفحات المصدر" helpKey="sourcePages" value={equipment.sourcePages.join(', ')} onChange={(value) => setEquipment({ ...equipment, sourcePages: value.split(',').map((part) => Number(part.trim())).filter((number) => Number.isFinite(number) && number > 0) })} dir="ltr" placeholder="10, 11" />
              </div>
              <div className="mt-4"><TextArea label="ما هو؟ / الملخص" helpKey="summary" value={equipment.summary} onChange={(value) => setEquipment({ ...equipment, summary: value })} rows={4} required /></div>
              <div className="mt-4"><StringListEditor label="Tags / كلمات البحث" helpKey="tags" items={equipment.tags} onChange={(tags) => setEquipment({ ...equipment, tags })} /></div>
            </section>

            <section className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-200/70">
              <h3 className="mb-4 font-black text-[#0a2037]">التفاصيل</h3>
              <div className="space-y-4">
                <TextArea label="ملاحظة سريرية" helpKey="clinicalNote" value={equipment.clinicalNote ?? ''} onChange={(value) => setEquipment({ ...equipment, clinicalNote: value })} />
                <StringListEditor label="الوظيفة | Purpose" helpKey="purpose" items={equipment.purpose} onChange={(purpose) => setEquipment({ ...equipment, purpose })} />
                <StringListEditor label="النقاط المهمة | Key points" helpKey="keyPoints" items={equipment.keyPoints} onChange={(keyPoints) => setEquipment({ ...equipment, keyPoints })} />
                <TextArea label="تصحيح/ملاحظة داخلية" helpKey="correction" value={equipment.correction ?? ''} onChange={(value) => setEquipment({ ...equipment, correction: value })} />
              </div>
            </section>

            <section className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-200/70">
              <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                <label className={`inline-flex cursor-pointer items-center gap-2 rounded-2xl bg-[#173a63] px-4 py-3 text-sm font-black text-white ${uploading ? 'pointer-events-none opacity-60' : ''}`}><Upload size={17} /> {uploading ? 'جاري الرفع…' : 'رفع صورة أو عدة صور'}<input type="file" multiple accept="image/jpeg,image/png,image/webp" className="hidden" onChange={uploadImages} disabled={uploading || !canEdit} /></label>
                <div className="flex items-start gap-2"><HelpButton info={HELP.imageUpload} /><div><h3 className="font-black text-[#0a2037]">الصور والشرح البصري</h3><p className="mt-1 text-xs text-slate-500">أول صورة تصبح رئيسية تلقائيًا.</p></div></div>
              </div>
              {media.length === 0 ? <div className="rounded-2xl border border-dashed border-[#b9cee2] bg-[#f8fbfd] p-8 text-center"><ImagePlus className="mx-auto mb-2 text-[#2f69a8]" /><p className="text-sm font-bold text-slate-500">ماكو صور لهذا الجهاز بعد.</p></div> : <div className="space-y-3">{media.map((item, index) => <div key={item.id} className="grid gap-3 rounded-2xl border border-[#e3eaf0] bg-[#f8fbfd] p-3 md:grid-cols-[120px_1fr]"><div className="relative overflow-hidden rounded-xl border border-[#d9e6f2] bg-white"><img src={item.url} alt={item.alt} className="h-28 w-full object-contain" />{item.hidden && <div className="absolute inset-0 grid place-items-center bg-white/80 text-xs font-black text-slate-500">مخفية</div>}</div><div className="space-y-3"><div className="grid gap-2 sm:grid-cols-2"><div><FieldHeading label="مكان الصورة" helpKey="imagePlacement" /><select aria-label="مكان الصورة" value={item.placement} onChange={(event) => updateMedia(item.id, { placement: event.target.value as ContentMediaPlacement, sectionKey: event.target.value === 'section' ? item.sectionKey ?? 'summary' : undefined })} className="w-full rounded-xl border border-[#d9e6f2] bg-white px-3 py-2 text-sm font-bold"><option value="cover">صورة رئيسية قرب العنوان</option><option value="gallery">معرض صور</option><option value="section">داخل قسم من الشرح</option></select></div>{item.placement === 'section' ? <div><FieldHeading label="قسم الشرح" helpKey="imageSection" /><select aria-label="قسم الصورة" value={(item.sectionKey as EquipmentMediaSection) ?? 'summary'} onChange={(event) => updateMedia(item.id, { sectionKey: event.target.value as EquipmentMediaSection })} className="w-full rounded-xl border border-[#d9e6f2] bg-white px-3 py-2 text-sm font-bold">{SECTION_OPTIONS.map((section) => <option key={section.value} value={section.value}>{section.label}</option>)}</select></div> : <div />}</div><TextInput label="النص البديل للصورة" helpKey="imageAlt" value={item.alt} onChange={(value) => updateMedia(item.id, { alt: value })} /><TextArea label="شرح تحت الصورة" helpKey="imageCaption" value={item.caption ?? ''} onChange={(value) => updateMedia(item.id, { caption: value })} rows={2} /><div className="flex flex-wrap gap-1"><button type="button" onClick={() => moveMedia(index, -1)} className="rounded-lg bg-white p-2 text-slate-600 ring-1 ring-slate-200"><ArrowUp size={15} /></button><button type="button" onClick={() => moveMedia(index, 1)} className="rounded-lg bg-white p-2 text-slate-600 ring-1 ring-slate-200"><ArrowDown size={15} /></button><button type="button" onClick={() => updateMedia(item.id, { hidden: !item.hidden })} className="inline-flex items-center gap-1 rounded-lg bg-white px-2.5 py-2 text-xs font-bold text-slate-600 ring-1 ring-slate-200">{item.hidden ? <Eye size={15} /> : <EyeOff size={15} />} {item.hidden ? 'إظهار' : 'إخفاء'}</button><button type="button" onClick={() => void deleteMedia(item)} className="inline-flex items-center gap-1 rounded-lg bg-red-50 px-2.5 py-2 text-xs font-bold text-red-600 ring-1 ring-red-100"><Trash2 size={15} /> حذف</button></div></div></div>)}</div>}
            </section>
          </main>

          <aside className="lg:sticky lg:top-24 lg:self-start"><div className="space-y-3 rounded-3xl bg-white p-4 shadow-sm ring-1 ring-slate-200/70"><button type="button" onClick={() => setPreviewOpen(true)} className="flex w-full items-center justify-center gap-2 rounded-2xl border border-[#d9e6f2] bg-[#f8fbfd] px-4 py-3 font-black text-[#173a63]"><Eye size={18} /> معاينة داخل قالب دليلي</button>{canEdit && <><button type="button" disabled={busy} onClick={() => void persist('draft')} className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#173a63] px-4 py-3 font-black text-white disabled:opacity-60"><Save size={18} /> حفظ كمسودة</button><button type="button" disabled={busy} onClick={() => void persist('review')} className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#eef3f8] px-4 py-3 font-black text-[#173a63] ring-1 ring-[#d9e6f2] disabled:opacity-60"><Send size={18} /> إرسال للمراجعة</button>{canPublish && <button type="button" disabled={busy} onClick={() => void persist('published')} className="w-full rounded-2xl bg-emerald-600 px-4 py-3 font-black text-white disabled:opacity-60">نشر الآن</button>}</>}{error && <div className="rounded-2xl border border-red-200 bg-red-50 p-3 text-xs font-bold leading-5 text-red-700">{error}</div>}{notice && <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-3 text-xs font-bold leading-5 text-emerald-800">{notice}</div>}</div></aside>
        </div>
      </div>
      {previewOpen && <EquipmentSheet item={equipment} media={media} onClose={() => setPreviewOpen(false)} />}
    </div>
  );
}
