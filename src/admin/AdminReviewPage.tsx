import { useCallback, useEffect, useMemo, useState } from 'react';
import { ArrowRight, CheckCircle2, Eye, RefreshCw, RotateCcw, ShieldCheck } from 'lucide-react';
import type { AnesthesiaDrug } from '../data/drugs';
import type { DrugDetail } from '../data/drugDetails';
import type { AnesthesiaEquipment } from '../data/equipment';
import type { ContentMediaItem } from '../types/contentMedia';
import { DrugDetailSheet } from '../components/DrugDetailSheet';
import { EquipmentSheet } from '../components/EquipmentDirectory';
import { supabase } from '../lib/supabase';

type AdminRole = 'owner' | 'admin' | 'editor' | 'reviewer';
type SupportedContentType = 'drug' | 'equipment';

type AdminProfile = {
  id: string;
  email: string;
  role: AdminRole;
  is_active: boolean;
};

type ReviewRow = {
  id: string;
  content_type: string;
  slug: string;
  title_ar: string | null;
  title_en: string | null;
  status: 'review';
  version: number;
  payload: unknown;
  updated_at: string;
};

type ParsedDrug = {
  kind: 'drug';
  drug: AnesthesiaDrug;
  details: DrugDetail;
  media: ContentMediaItem[];
};

type ParsedEquipment = {
  kind: 'equipment';
  equipment: AnesthesiaEquipment;
  media: ContentMediaItem[];
};

type ParsedPreview = ParsedDrug | ParsedEquipment;

const TYPE_LABEL: Record<SupportedContentType, string> = {
  drug: 'دواء',
  equipment: 'جهاز / أداة',
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function parseDrugPayload(payload: unknown): ParsedDrug | null {
  if (!isRecord(payload)) return null;
  const drug = payload.drug;
  const details = payload.details;
  const media = Array.isArray(payload.media) ? (payload.media as ContentMediaItem[]) : [];
  if (!isRecord(drug) || !isRecord(details)) return null;
  if (
    typeof drug.id !== 'string' ||
    typeof drug.en !== 'string' ||
    typeof drug.ar !== 'string' ||
    typeof drug.category !== 'string' ||
    typeof drug.categoryAr !== 'string' ||
    !Array.isArray(drug.classes) ||
    typeof drug.short !== 'string' ||
    !Array.isArray(drug.tags) ||
    typeof details.feature !== 'string' ||
    !Array.isArray(details.uses) ||
    !Array.isArray(details.contraindications) ||
    !Array.isArray(details.warnings) ||
    !Array.isArray(details.adverseEffects)
  ) return null;

  return {
    kind: 'drug',
    drug: drug as unknown as AnesthesiaDrug,
    details: details as unknown as DrugDetail,
    media,
  };
}

function parseEquipmentPayload(payload: unknown): ParsedEquipment | null {
  if (!isRecord(payload)) return null;
  const equipment = payload.equipment;
  const media = Array.isArray(payload.media) ? (payload.media as ContentMediaItem[]) : [];
  if (!isRecord(equipment)) return null;
  if (
    typeof equipment.id !== 'string' ||
    typeof equipment.nameAr !== 'string' ||
    typeof equipment.nameEn !== 'string' ||
    typeof equipment.category !== 'string' ||
    typeof equipment.categoryAr !== 'string' ||
    !Array.isArray(equipment.sourcePages) ||
    typeof equipment.summary !== 'string' ||
    !Array.isArray(equipment.purpose) ||
    !Array.isArray(equipment.keyPoints) ||
    !Array.isArray(equipment.tags)
  ) return null;

  return {
    kind: 'equipment',
    equipment: equipment as unknown as AnesthesiaEquipment,
    media,
  };
}

function parsePreview(item: ReviewRow): ParsedPreview | null {
  if (item.content_type === 'drug') return parseDrugPayload(item.payload);
  if (item.content_type === 'equipment') return parseEquipmentPayload(item.payload);
  return null;
}

export default function AdminReviewPage() {
  const [ready, setReady] = useState(false);
  const [profile, setProfile] = useState<AdminProfile | null>(null);
  const [items, setItems] = useState<ReviewRow[]>([]);
  const [selected, setSelected] = useState<ReviewRow | null>(null);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');

  const load = useCallback(async () => {
    setError('');
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      window.location.replace('/admin');
      return;
    }

    const { data: profileData, error: profileError } = await supabase
      .from('admin_profiles')
      .select('id,email,role,is_active')
      .eq('id', session.user.id)
      .maybeSingle();

    if (profileError || !profileData?.is_active) {
      setError('هذا الحساب لا يملك صلاحية مراجعة محتوى دليلي.');
      setReady(true);
      return;
    }

    const typedProfile = profileData as AdminProfile;
    if (!['owner', 'admin', 'reviewer'].includes(typedProfile.role)) {
      setError('صفحة المراجعة متاحة للمراجع أو المدير أو المالك فقط.');
      setReady(true);
      return;
    }
    setProfile(typedProfile);

    const { data, error: listError } = await supabase
      .from('content_items')
      .select('id,content_type,slug,title_ar,title_en,status,version,payload,updated_at')
      .eq('status', 'review')
      .in('content_type', ['drug', 'equipment'])
      .order('updated_at', { ascending: true });

    if (listError) setError(listError.message);
    else setItems((data ?? []) as ReviewRow[]);
    setReady(true);
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const decide = async (item: ReviewRow, status: 'approved' | 'rejected') => {
    setBusyId(item.id);
    setError('');
    setNotice('');
    try {
      const { data, error: updateError } = await supabase
        .from('content_items')
        .update({ status })
        .eq('id', item.id)
        .eq('status', 'review')
        .eq('version', item.version)
        .select('id,status,version');

      if (updateError) throw updateError;
      if (!data || data.length !== 1) {
        throw new Error('هذا العنصر تغيّر من مستخدم آخر. أعد تحميل قائمة المراجعة قبل اتخاذ القرار.');
      }

      setSelected(null);
      setNotice(status === 'approved' ? 'تم اعتماد المحتوى وإرساله للمرحلة التالية.' : 'تم إرجاع المحتوى للمحرر للتعديل.');
      await load();
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : 'تعذر حفظ قرار المراجعة.');
    } finally {
      setBusyId(null);
    }
  };

  const selectedPayload = useMemo(() => selected ? parsePreview(selected) : null, [selected]);

  if (!ready) {
    return <div className="flex min-h-screen items-center justify-center bg-[#07182c] text-sm font-bold text-white">جاري تحميل قائمة المراجعة…</div>;
  }

  return (
    <div dir="rtl" className="min-h-screen overflow-x-hidden bg-[#eef3f8] px-3 py-4 text-[#24313f] sm:px-6 sm:py-6">
      <div className="mx-auto max-w-5xl space-y-4 sm:space-y-5">
        <header className="flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-[#07182c] p-4 text-white shadow-xl sm:rounded-3xl sm:p-5">
          <a href="/admin" className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-white/10 px-3 py-2 text-sm font-black hover:bg-white/15">
            <ArrowRight size={17} /> لوحة الإدارة
          </a>
          <div className="min-w-0 text-right">
            <p className="text-xs font-bold text-[#d9a441]">دليلي — مملكة التخدير</p>
            <h1 className="mt-1 text-lg font-black sm:text-xl">مراجعة المحتوى</h1>
            {profile && <p className="mt-1 truncate text-xs text-white/55" dir="ltr">{profile.email}</p>}
          </div>
        </header>

        {error && <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm font-bold leading-6 text-red-700">{error}</div>}
        {notice && <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm font-bold leading-6 text-emerald-800">{notice}</div>}

        <section className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200/70 sm:rounded-3xl sm:p-6">
          <div className="mb-4 flex items-center justify-between gap-3 sm:mb-5">
            <button type="button" onClick={() => void load()} className="inline-flex min-h-10 items-center gap-2 rounded-xl border border-[#d9e6f2] bg-[#f8fbfd] px-3 py-2 text-xs font-black text-[#173a63]">
              <RefreshCw size={15} /> تحديث
            </button>
            <div>
              <h2 className="font-black text-[#0a2037]">بانتظار المراجعة</h2>
              <p className="mt-1 text-xs text-slate-500 sm:text-sm">{items.length} عنصر</p>
            </div>
          </div>

          {items.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-[#b9cee2] bg-[#f8fbfd] p-8 text-center">
              <ShieldCheck className="mx-auto mb-3 text-emerald-600" size={30} />
              <p className="font-bold text-slate-500">ماكو محتوى بانتظار المراجعة حاليًا.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {items.map((item) => {
                const parsed = parsePreview(item);
                const typeLabel = item.content_type in TYPE_LABEL ? TYPE_LABEL[item.content_type as SupportedContentType] : item.content_type;
                return (
                  <article key={item.id} className="rounded-2xl border border-[#e3eaf0] bg-[#f8fbfd] p-3.5 sm:p-4">
                    <div className="flex min-w-0 items-start justify-between gap-3">
                      <span className="shrink-0 rounded-full bg-white px-2.5 py-1 text-[11px] font-black text-[#173a63] ring-1 ring-[#d9e6f2]">{typeLabel}</span>
                      <div className="min-w-0 flex-1 text-right">
                        <div className="break-words font-black text-[#0a2037]">{item.title_ar || item.title_en || item.slug}</div>
                        <div className="mt-1 truncate text-xs text-slate-500" dir="ltr">{item.title_en || item.slug} · v{item.version}</div>
                      </div>
                    </div>

                    <div className="mt-3 grid grid-cols-1 gap-2 border-t border-slate-200/70 pt-3 sm:flex sm:flex-wrap">
                      <button type="button" disabled={!parsed} onClick={() => setSelected(item)} className="inline-flex min-h-11 items-center justify-center gap-1 rounded-xl bg-white px-3 py-2 text-xs font-black text-[#173a63] ring-1 ring-[#d9e6f2] disabled:opacity-40">
                        <Eye size={15} /> معاينة
                      </button>
                      <button type="button" disabled={busyId === item.id} onClick={() => void decide(item, 'approved')} className="inline-flex min-h-11 items-center justify-center gap-1 rounded-xl bg-emerald-600 px-3 py-2 text-xs font-black text-white disabled:opacity-50">
                        <CheckCircle2 size={15} /> اعتماد
                      </button>
                      <button type="button" disabled={busyId === item.id} onClick={() => void decide(item, 'rejected')} className="inline-flex min-h-11 items-center justify-center gap-1 rounded-xl bg-amber-50 px-3 py-2 text-xs font-black text-amber-800 ring-1 ring-amber-200 disabled:opacity-50">
                        <RotateCcw size={15} /> إرجاع للتعديل
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </section>
      </div>

      {selected && selectedPayload?.kind === 'drug' && (
        <DrugDetailSheet
          drug={selectedPayload.drug}
          detail={selectedPayload.details}
          media={selectedPayload.media}
          onClose={() => setSelected(null)}
        />
      )}

      {selected && selectedPayload?.kind === 'equipment' && (
        <EquipmentSheet
          item={selectedPayload.equipment}
          media={selectedPayload.media}
          onClose={() => setSelected(null)}
        />
      )}
    </div>
  );
}
