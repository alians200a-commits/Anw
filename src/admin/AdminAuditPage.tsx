import { useCallback, useEffect, useMemo, useState } from 'react';
import { ArrowRight, History, RefreshCw, Search } from 'lucide-react';
import { supabase } from '../lib/supabase';
import type { AdminRole } from './adminTypes';

type AuditAction = 'create' | 'update' | 'publish' | 'archive' | 'delete';
type AuditRow = {
  id: number;
  actor_id: string | null;
  actor_name: string | null;
  action: AuditAction;
  entity_type: string;
  entity_id: string | null;
  content_type: string | null;
  slug: string | null;
  created_at: string;
};

type Profile = { id: string; role: AdminRole; is_active: boolean };

const ACTION_LABELS: Record<AuditAction, string> = {
  create: 'إنشاء',
  update: 'تعديل',
  publish: 'نشر',
  archive: 'حذف من العرض',
  delete: 'حذف نهائي',
};

export default function AdminAuditPage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [rows, setRows] = useState<AuditRow[]>([]);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState('');
  const [query, setQuery] = useState('');

  const load = useCallback(async () => {
    setError('');
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) { window.location.replace('/admin'); return; }
    const { data: profileData, error: profileError } = await supabase.from('admin_profiles').select('id,role,is_active').eq('id', session.user.id).maybeSingle();
    if (profileError || !profileData?.is_active || (profileData.role !== 'owner' && profileData.role !== 'admin')) {
      setError('هذا الحساب لا يملك صلاحية قراءة سجل التعديلات.'); setReady(true); return;
    }
    setProfile(profileData as Profile);
    const { data, error: auditError } = await supabase.from('admin_audit_log').select('id,actor_id,actor_name,action,entity_type,entity_id,content_type,slug,created_at').order('created_at', { ascending: false }).limit(500);
    if (auditError) setError(auditError.message);
    else setRows((data ?? []) as AuditRow[]);
    setReady(true);
  }, []);

  useEffect(() => { void load(); }, [load]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return rows;
    return rows.filter((row) => [row.actor_name ?? '', row.slug ?? '', row.content_type ?? '', ACTION_LABELS[row.action] ?? row.action].some((value) => value.toLowerCase().includes(q)));
  }, [rows, query]);

  if (!ready) return <div className="flex min-h-screen items-center justify-center bg-[#07182c] text-sm font-bold text-white">جاري تحميل سجل التعديلات…</div>;

  return (
    <div dir="rtl" className="min-h-screen bg-[#eef3f8] px-3 py-4 text-[#24313f] sm:px-6 sm:py-6">
      <div className="mx-auto max-w-5xl space-y-4">
        <header className="flex flex-wrap items-center justify-between gap-3 rounded-3xl bg-[#07182c] p-4 text-white shadow-xl sm:p-5">
          <a href="/admin" className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-white/10 px-3 py-2 text-sm font-black"><ArrowRight size={17} /> لوحة الإدارة</a>
          <div className="text-right"><p className="text-xs font-bold text-[#d9a441]">دليلي — مملكة التخدير</p><h1 className="mt-1 flex items-center justify-end gap-2 text-lg font-black sm:text-xl"><History size={20} /> سجل التعديلات</h1></div>
        </header>

        {error && <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm font-bold text-red-700">{error}</div>}

        {profile && !error && <section className="rounded-3xl bg-white p-4 shadow-sm ring-1 ring-slate-200/70 sm:p-5">
          <div className="grid gap-2 sm:grid-cols-[auto_1fr]">
            <button type="button" onClick={() => void load()} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[#eef3f8] px-4 py-2 text-sm font-black text-[#173a63]"><RefreshCw size={16} /> تحديث</button>
            <div className="relative"><Search size={17} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="بحث بالاسم أو المحتوى…" className="min-h-11 w-full rounded-xl border border-[#d9e6f2] bg-[#f8fbfd] pr-10 pl-4 text-base outline-none focus:border-[#2f69a8]" /></div>
          </div>
          <p className="mt-3 text-xs font-bold text-slate-500">آخر {filtered.length} حركة ظاهرة</p>
        </section>}

        {!error && <section className="space-y-2">
          {filtered.map((row) => (
            <article key={row.id} className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200/70">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <span className="rounded-full bg-[#eef3f8] px-3 py-1 text-xs font-black text-[#173a63]">{ACTION_LABELS[row.action] ?? row.action}</span>
                <div className="min-w-0 flex-1 text-right">
                  <div className="font-black text-[#0a2037]">{row.slug || row.entity_type}</div>
                  <div className="mt-1 text-xs text-slate-500">بواسطة: <span className="font-bold text-slate-700">{row.actor_name || 'حساب إداري'}</span></div>
                </div>
              </div>
              <div className="mt-2 text-[11px] text-slate-400" dir="ltr">{new Date(row.created_at).toLocaleString('en-GB')}</div>
            </article>
          ))}
          {filtered.length === 0 && <div className="rounded-2xl border border-dashed border-[#b9cee2] bg-white p-8 text-center text-sm font-bold text-slate-500">لا توجد حركات مطابقة.</div>}
        </section>}
      </div>
    </div>
  );
}
