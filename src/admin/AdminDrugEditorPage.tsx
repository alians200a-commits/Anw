import { useEffect, useState } from 'react';
import { Copy } from 'lucide-react';
import DrugEditorV2, { type DrugContentRow } from './DrugEditorV2';
import MobileSelectSheet from './MobileSelectSheet';
import { supabase } from '../lib/supabase';
import './adminDrugEditor.mobile.css';

type AdminRole = 'owner' | 'admin' | 'editor' | 'reviewer';

type AdminProfile = {
  id: string;
  role: AdminRole;
  is_active: boolean;
};

type UnknownRecord = Record<string, unknown>;

function isRecord(value: unknown): value is UnknownRecord {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function cloneDrugRow(source: DrugContentRow): DrugContentRow {
  const nextSlug = `${source.slug}-copy`;
  const raw = typeof structuredClone === 'function'
    ? structuredClone(source.payload)
    : JSON.parse(JSON.stringify(source.payload));

  let payload = raw;
  if (isRecord(raw)) {
    const next: UnknownRecord = { ...raw, media: [] };
    if (isRecord(raw.drug)) {
      next.drug = { ...raw.drug, id: nextSlug };
    } else if ('id' in raw) {
      next.id = nextSlug;
    }
    payload = next;
  }

  return {
    id: '',
    slug: nextSlug,
    title_ar: source.title_ar,
    title_en: source.title_en,
    status: 'draft',
    payload,
  };
}

export default function AdminDrugEditorPage() {
  const [profile, setProfile] = useState<AdminProfile | null>(null);
  const [row, setRow] = useState<DrugContentRow | null>(null);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState('');
  const params = new URLSearchParams(window.location.search);
  const duplicateSourceId = params.get('duplicate');
  const editingId = params.get('id');
  const isDuplicate = Boolean(duplicateSourceId);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
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

      if (cancelled) return;
      if (profileError || !profileData?.is_active) {
        setError('هذا الحساب لا يملك صلاحية إدارة دليلي.');
        setReady(true);
        return;
      }

      const typedProfile = profileData as AdminProfile;
      setProfile(typedProfile);

      const sourceId = duplicateSourceId || editingId;
      if (sourceId) {
        const { data: rowData, error: rowError } = await supabase
          .from('content_items')
          .select('id,slug,title_ar,title_en,status,payload')
          .eq('id', sourceId)
          .eq('content_type', 'drug')
          .maybeSingle();

        if (rowError) {
          setError(rowError.message);
        } else if (rowData) {
          const typed = rowData as DrugContentRow;
          setRow(duplicateSourceId ? cloneDrugRow(typed) : typed);
        } else {
          setError('الدواء المطلوب غير موجود.');
        }
      }

      setReady(true);
    };

    void load();
    return () => {
      cancelled = true;
    };
  }, [duplicateSourceId, editingId]);

  if (!ready) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#07182c] text-sm font-bold text-white">
        جاري فتح محرر الأدوية…
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div dir="rtl" className="flex min-h-screen items-center justify-center bg-[#07182c] p-5">
        <div className="max-w-md rounded-3xl bg-white p-6 text-center shadow-2xl">
          <h1 className="font-black text-[#0a2037]">تعذر فتح المحرر</h1>
          <p className="mt-3 text-sm leading-6 text-red-700">{error || 'الحساب غير مخوّل.'}</p>
          <a href="/admin" className="mt-5 inline-block rounded-2xl bg-[#173a63] px-5 py-3 font-black text-white">الرجوع للوحة الإدارة</a>
        </div>
      </div>
    );
  }

  const canDuplicate = !isDuplicate && Boolean(row?.id) && profile.role !== 'reviewer';

  return (
    <div className="admin-drug-editor-host">
      <DrugEditorV2
        profileId={profile.id}
        role={profile.role}
        initialRow={row}
        onSaved={() => undefined}
        onClose={() => window.location.assign('/admin')}
      />

      {canDuplicate && (
        <a
          href={`/admin/drugs?duplicate=${encodeURIComponent(row!.id)}`}
          className="fixed bottom-[max(16px,env(safe-area-inset-bottom))] left-4 z-[95] inline-flex min-h-11 items-center gap-2 rounded-2xl bg-[#d9a441] px-4 py-3 text-xs font-black text-[#07182c] shadow-xl ring-1 ring-black/5 sm:bottom-6 sm:left-6 sm:text-sm"
          title="ينسخ النصوص والتفاصيل بدون مشاركة ملفات الصور مع الأصل"
        >
          <Copy size={17} /> نسخ كدواء جديد
        </a>
      )}

      {isDuplicate && (
        <div className="fixed bottom-[max(16px,env(safe-area-inset-bottom))] left-4 right-4 z-[94] rounded-2xl border border-[#d9a441]/30 bg-[#fff8e6] px-4 py-3 text-center text-xs font-bold leading-5 text-[#795b17] shadow-lg sm:left-1/2 sm:right-auto sm:w-fit sm:-translate-x-1/2">
          هذه نسخة جديدة: غيّر الـSlug إذا احتجت. الصور لا تُنسخ حتى تبقى ملفات الأصل مستقلة وآمنة.
        </div>
      )}

      <MobileSelectSheet />
    </div>
  );
}
