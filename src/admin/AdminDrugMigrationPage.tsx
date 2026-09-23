import { useCallback, useEffect, useMemo, useState } from 'react';
import { ArrowLeft, CheckCircle2, Database, RefreshCw, ShieldCheck, TriangleAlert } from 'lucide-react';
import { ANESTHESIA_DRUGS } from '../data/drugs';
import { DRUG_DETAILS } from '../data/drugDetails';
import { supabase } from '../lib/supabase';

type AdminRole = 'owner' | 'admin' | 'editor' | 'reviewer';

type AdminProfile = {
  id: string;
  role: AdminRole;
  is_active: boolean;
};

type ExistingDrugRow = {
  id: string;
  slug: string;
  payload?: unknown;
};

type MigrationResult = {
  inserted: number;
  skipped: number;
  verified: number;
  mismatches: string[];
};

const BATCH_SIZE = 10;

function stable(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(stable);
  if (value && typeof value === 'object') {
    return Object.keys(value as Record<string, unknown>)
      .sort()
      .reduce<Record<string, unknown>>((acc, key) => {
        acc[key] = stable((value as Record<string, unknown>)[key]);
        return acc;
      }, {});
  }
  return value;
}

function sameJson(a: unknown, b: unknown) {
  return JSON.stringify(stable(a)) === JSON.stringify(stable(b));
}

function chunk<T>(items: T[], size: number) {
  const result: T[][] = [];
  for (let index = 0; index < items.length; index += size) {
    result.push(items.slice(index, index + size));
  }
  return result;
}

export default function AdminDrugMigrationPage() {
  const [ready, setReady] = useState(false);
  const [profile, setProfile] = useState<AdminProfile | null>(null);
  const [existing, setExisting] = useState<ExistingDrugRow[]>([]);
  const [busy, setBusy] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState('');
  const [result, setResult] = useState<MigrationResult | null>(null);

  const localIds = useMemo(() => ANESTHESIA_DRUGS.map((drug) => drug.id), []);
  const duplicateIds = useMemo(() => {
    const seen = new Set<string>();
    const duplicates = new Set<string>();
    for (const id of localIds) {
      if (seen.has(id)) duplicates.add(id);
      seen.add(id);
    }
    return [...duplicates];
  }, [localIds]);

  const missingDetails = useMemo(
    () => ANESTHESIA_DRUGS.filter((drug) => !DRUG_DETAILS[drug.id]).map((drug) => drug.id),
    [],
  );

  const orphanDetails = useMemo(() => {
    const localSet = new Set(localIds);
    return Object.keys(DRUG_DETAILS).filter((id) => !localSet.has(id));
  }, [localIds]);

  const load = useCallback(async () => {
    setError('');
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      window.location.replace('/admin');
      return;
    }

    const { data: profileData, error: profileError } = await supabase
      .from('admin_profiles')
      .select('id,role,is_active')
      .eq('id', session.user.id)
      .maybeSingle();

    if (profileError || !profileData?.is_active) {
      setError('الحساب غير مخوّل لإدارة دليلي.');
      setReady(true);
      return;
    }

    const typedProfile = profileData as AdminProfile;
    if (typedProfile.role !== 'owner' && typedProfile.role !== 'admin') {
      setError('أداة النقل متاحة للمالك أو المدير فقط.');
      setReady(true);
      return;
    }

    setProfile(typedProfile);

    const { data: existingData, error: existingError } = await supabase
      .from('content_items')
      .select('id,slug')
      .eq('content_type', 'drug');

    if (existingError) {
      setError(existingError.message);
    } else {
      setExisting((existingData ?? []) as ExistingDrugRow[]);
    }
    setReady(true);
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const pendingCount = useMemo(() => {
    const existingSlugs = new Set(existing.map((item) => item.slug));
    return ANESTHESIA_DRUGS.filter((drug) => !existingSlugs.has(drug.id)).length;
  }, [existing]);

  const runMigration = async () => {
    if (!profile || busy) return;
    setError('');
    setResult(null);
    setProgress(0);

    if (duplicateIds.length > 0) {
      setError(`توقف النقل: توجد معرفات أدوية مكررة: ${duplicateIds.join(', ')}`);
      return;
    }
    if (missingDetails.length > 0) {
      setError(`توقف النقل: توجد أدوية بدون تفاصيل: ${missingDetails.join(', ')}`);
      return;
    }

    setBusy(true);
    try {
      const { data: beforeData, error: beforeError } = await supabase
        .from('content_items')
        .select('id,slug')
        .eq('content_type', 'drug');
      if (beforeError) throw beforeError;

      const existingSlugs = new Set(((beforeData ?? []) as ExistingDrugRow[]).map((item) => item.slug));
      const pending = ANESTHESIA_DRUGS.filter((drug) => !existingSlugs.has(drug.id));
      let inserted = 0;

      for (const batch of chunk(pending, BATCH_SIZE)) {
        const rows = batch.map((drug) => ({
          content_type: 'drug',
          slug: drug.id,
          title_ar: drug.ar,
          title_en: drug.en,
          status: 'draft',
          payload: {
            schemaVersion: 1,
            drug,
            details: DRUG_DETAILS[drug.id],
            media: [],
          },
        }));

        const { error: insertError } = await supabase.from('content_items').insert(rows);
        if (insertError) throw insertError;
        inserted += rows.length;
        setProgress(inserted);
      }

      const { data: verifyData, error: verifyError } = await supabase
        .from('content_items')
        .select('id,slug,payload')
        .eq('content_type', 'drug');
      if (verifyError) throw verifyError;

      const bySlug = new Map(((verifyData ?? []) as ExistingDrugRow[]).map((row) => [row.slug, row]));
      const mismatches: string[] = [];
      let verified = 0;

      for (const drug of ANESTHESIA_DRUGS) {
        const row = bySlug.get(drug.id);
        if (!row || !row.payload || typeof row.payload !== 'object') {
          mismatches.push(`${drug.id}: missing`);
          continue;
        }
        const payload = row.payload as Record<string, unknown>;
        const drugMatches = sameJson(payload.drug, drug);
        const detailMatches = sameJson(payload.details, DRUG_DETAILS[drug.id]);
        const mediaMatches = Array.isArray(payload.media);
        if (!drugMatches || !detailMatches || !mediaMatches) {
          mismatches.push(drug.id);
          continue;
        }
        verified += 1;
      }

      const finalRows = (verifyData ?? []) as ExistingDrugRow[];
      setExisting(finalRows);
      setResult({
        inserted,
        skipped: ANESTHESIA_DRUGS.length - inserted,
        verified,
        mismatches,
      });
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : 'تعذر نقل الأدوية.');
    } finally {
      setBusy(false);
    }
  };

  if (!ready) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#07182c] text-sm font-bold text-white">
        جاري فحص بيانات النقل…
      </div>
    );
  }

  return (
    <div dir="rtl" className="min-h-screen bg-[#eef3f8] px-4 py-8 text-[#24313f] sm:px-6">
      <div className="mx-auto max-w-4xl space-y-5">
        <div className="flex items-center justify-between gap-3 rounded-3xl bg-[#07182c] p-5 text-white shadow-xl">
          <a href="/admin" className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-3 py-2 text-sm font-black hover:bg-white/15">
            <ArrowLeft size={17} /> رجوع
          </a>
          <div className="text-right">
            <p className="text-xs font-bold text-[#d9a441]">دليلي — أداة نقل آمنة</p>
            <h1 className="mt-1 text-xl font-black">نقل الأدوية الحالية إلى Supabase</h1>
          </div>
        </div>

        <section className="grid gap-3 sm:grid-cols-3">
          <div className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-200/70">
            <Database className="mb-3 text-[#2f69a8]" size={24} />
            <div className="text-3xl font-black text-[#0a2037]">{ANESTHESIA_DRUGS.length}</div>
            <div className="mt-1 text-sm font-bold text-slate-500">أدوية في ملفات التطبيق</div>
          </div>
          <div className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-200/70">
            <CheckCircle2 className="mb-3 text-emerald-600" size={24} />
            <div className="text-3xl font-black text-[#0a2037]">{existing.length}</div>
            <div className="mt-1 text-sm font-bold text-slate-500">موجودة حاليًا في Supabase</div>
          </div>
          <div className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-200/70">
            <RefreshCw className="mb-3 text-amber-600" size={24} />
            <div className="text-3xl font-black text-[#0a2037]">{pendingCount}</div>
            <div className="mt-1 text-sm font-bold text-slate-500">متبقي للنقل</div>
          </div>
        </section>

        <section className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-200/70 sm:p-6">
          <div className="flex items-start gap-3">
            <ShieldCheck className="mt-0.5 shrink-0 text-[#2f69a8]" size={25} />
            <div>
              <h2 className="font-black text-[#0a2037]">قواعد الأمان قبل النقل</h2>
              <p className="mt-2 text-sm leading-7 text-slate-600">
                النقل يقرأ نفس <code>drugs.ts</code> و <code>drugDetails.ts</code> الموجودة داخل دليلي، ويضيفها كمسودات فقط. ما يغير التطبيق العادي وما ينشر أي دواء تلقائيًا، وإذا كان الـSlug موجودًا مسبقًا يتم تخطيه بدل الكتابة فوقه.
              </p>
            </div>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            <div className={`rounded-2xl p-4 ${duplicateIds.length ? 'bg-red-50 text-red-700' : 'bg-emerald-50 text-emerald-800'}`}>
              <div className="text-xs font-black">معرفات مكررة</div>
              <div className="mt-1 text-2xl font-black">{duplicateIds.length}</div>
            </div>
            <div className={`rounded-2xl p-4 ${missingDetails.length ? 'bg-red-50 text-red-700' : 'bg-emerald-50 text-emerald-800'}`}>
              <div className="text-xs font-black">أدوية بدون تفاصيل</div>
              <div className="mt-1 text-2xl font-black">{missingDetails.length}</div>
            </div>
            <div className="rounded-2xl bg-amber-50 p-4 text-amber-800">
              <div className="text-xs font-black">تفاصيل بدون بطاقة دواء</div>
              <div className="mt-1 text-2xl font-black">{orphanDetails.length}</div>
            </div>
          </div>

          {orphanDetails.length > 0 && (
            <div className="mt-3 rounded-2xl border border-amber-200 bg-amber-50 p-3 text-xs leading-6 text-amber-800">
              ملاحظة: توجد تفاصيل إضافية لا تقابل بطاقة حالية، لذلك لن تُنقل ضمن قائمة الأدوية الظاهرة: {orphanDetails.join(', ')}
            </div>
          )}

          {error && (
            <div className="mt-4 flex items-start gap-2 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm font-bold leading-6 text-red-700">
              <TriangleAlert className="mt-0.5 shrink-0" size={19} /> {error}
            </div>
          )}

          {busy && (
            <div className="mt-4 rounded-2xl bg-[#f8fbfd] p-4 text-sm font-bold text-[#173a63]">
              تم نقل {progress} من {pendingCount} حتى الآن…
            </div>
          )}

          {result && (
            <div className={`mt-4 rounded-2xl border p-4 ${result.mismatches.length === 0 ? 'border-emerald-200 bg-emerald-50 text-emerald-800' : 'border-red-200 bg-red-50 text-red-700'}`}>
              <div className="font-black">نتيجة النقل والتحقق</div>
              <div className="mt-2 text-sm leading-7">
                أضيف: {result.inserted} · تم تخطي الموجود: {result.skipped} · مطابق للمصدر: {result.verified}/{ANESTHESIA_DRUGS.length}
              </div>
              {result.mismatches.length > 0 && (
                <div className="mt-2 text-xs leading-6">غير مطابق: {result.mismatches.join(', ')}</div>
              )}
            </div>
          )}

          <button
            type="button"
            onClick={() => void runMigration()}
            disabled={busy || !profile || duplicateIds.length > 0 || missingDetails.length > 0 || pendingCount === 0}
            className="mt-5 w-full rounded-2xl bg-[#173a63] px-5 py-4 font-black text-white shadow-lg shadow-[#173a63]/15 disabled:cursor-not-allowed disabled:opacity-45"
          >
            {busy ? 'جاري النقل والتحقق…' : pendingCount === 0 ? 'كل الأدوية منقولة بالفعل' : `نقل ${pendingCount} دواء كمسودات ثم التحقق`}
          </button>
        </section>
      </div>
    </div>
  );
}
