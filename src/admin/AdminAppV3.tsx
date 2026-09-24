import { FormEvent, useCallback, useEffect, useMemo, useState } from 'react';
import {
  CheckCircle2,
  Database,
  FileClock,
  History,
  LogOut,
  Pencil,
  Pill,
  Plus,
  Search,
  Send,
  ShieldCheck,
  Trash2,
  UserCheck,
  UserPlus,
  UserX,
  Users,
} from 'lucide-react';
import { supabase } from '../lib/supabase';
import MobileSelectSheet from './MobileSelectSheet';
import type { AdminRole } from './adminTypes';
import { adminDisplayName, isAdminRole } from './adminTypes';

type ContentStatus = 'draft' | 'review' | 'approved' | 'published' | 'rejected' | 'archived';
type StatusFilter = 'all' | ContentStatus;

type AdminProfile = {
  id: string;
  email: string;
  display_name: string | null;
  role: AdminRole;
  is_active: boolean;
};

type AdminInvite = {
  id: number;
  email: string;
  display_name: string | null;
  role: AdminRole;
  is_active: boolean;
  accepted_at: string | null;
};

type ContentRow = {
  id: string;
  content_type: string;
  slug: string;
  title_ar: string | null;
  title_en: string | null;
  status: ContentStatus;
  version: number;
  updated_at: string;
  created_by: string | null;
  updated_by: string | null;
  published_by: string | null;
};

const ROLE_LABELS: Record<AdminRole, string> = { owner: 'المالك', admin: 'مدير' };

const STATUS_LABELS: Record<ContentStatus, string> = {
  draft: 'مسودة',
  review: 'بانتظار المراجعة',
  approved: 'مُعتمد',
  published: 'منشور',
  rejected: 'يحتاج تعديل',
  archived: 'محذوف',
};

const STATUS_CLASSES: Record<ContentStatus, string> = {
  draft: 'bg-slate-100 text-slate-650 ring-slate-200',
  review: 'bg-amber-50 text-amber-800 ring-amber-200',
  approved: 'bg-blue-50 text-blue-700 ring-blue-200',
  published: 'bg-emerald-50 text-emerald-700 ring-emerald-200',
  rejected: 'bg-red-50 text-red-700 ring-red-200',
  archived: 'bg-slate-100 text-slate-500 ring-slate-200',
};

const FILTERS: Array<{ id: StatusFilter; label: string }> = [
  { id: 'all', label: 'الكل' },
  { id: 'draft', label: 'مسودات' },
  { id: 'review', label: 'مراجعة' },
  { id: 'approved', label: 'معتمد' },
  { id: 'published', label: 'منشور' },
  { id: 'rejected', label: 'يحتاج تعديل' },
  { id: 'archived', label: 'محذوف' },
];

function AuthPanel() {
  const [mode, setMode] = useState<'signin' | 'activate'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [activationName, setActivationName] = useState('');
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    setBusy(true); setMessage(''); setError('');
    const normalizedEmail = email.trim().toLowerCase();
    if (!normalizedEmail || password.length < 8) {
      setError('اكتب البريد الإلكتروني وكلمة سر لا تقل عن 8 أحرف.'); setBusy(false); return;
    }
    if (mode === 'activate' && activationName.trim().length < 2) {
      setError('اكتب اسمك حتى يظهر بوضوح في سجل التعديلات.'); setBusy(false); return;
    }

    if (mode === 'signin') {
      const { error: signInError } = await supabase.auth.signInWithPassword({ email: normalizedEmail, password });
      if (signInError) setError('تعذر تسجيل الدخول. تأكد من البريد وكلمة السر وتفعيل البريد.');
    } else {
      const { data, error: signUpError } = await supabase.auth.signUp({
        email: normalizedEmail,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/admin`,
          data: { display_name: activationName.trim() },
        },
      });
      if (signUpError) setError(signUpError.message);
      else setMessage(data.session ? 'تم تفعيل الحساب وتسجيل الدخول.' : 'تم إنشاء الحساب. افتح رسالة التأكيد في بريدك ثم ارجع وسجّل الدخول.');
    }
    setBusy(false);
  };

  return (
    <div dir="rtl" className="min-h-screen bg-[#07182c] px-4 py-10 text-[#173a63]">
      <div className="mx-auto flex min-h-[80vh] max-w-md items-center">
        <div className="w-full rounded-[28px] border border-white/60 bg-white p-6 shadow-2xl shadow-black/20 sm:p-8">
          <div className="mb-7 text-center"><div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#eef3f8] text-[#173a63]"><ShieldCheck size={30} /></div><h1 className="text-2xl font-black text-[#0a2037]">لوحة إدارة دليلي</h1><p className="mt-2 text-sm leading-6 text-slate-500">هذه الصفحة خاصة بالإدارة فقط.</p></div>
          <div className="mb-5 grid grid-cols-2 rounded-2xl bg-[#eef3f8] p-1 text-sm font-bold">
            <button type="button" onClick={() => { setMode('signin'); setError(''); setMessage(''); }} className={`rounded-xl px-3 py-2.5 transition ${mode === 'signin' ? 'bg-white text-[#173a63] shadow-sm' : 'text-slate-500'}`}>تسجيل الدخول</button>
            <button type="button" onClick={() => { setMode('activate'); setError(''); setMessage(''); }} className={`rounded-xl px-3 py-2.5 transition ${mode === 'activate' ? 'bg-white text-[#173a63] shadow-sm' : 'text-slate-500'}`}>تفعيل حساب مدعو</button>
          </div>
          <form onSubmit={submit} className="space-y-4">
            {mode === 'activate' && <label className="block"><span className="mb-1.5 block text-sm font-bold text-[#24313f]">الاسم</span><input type="text" autoComplete="name" value={activationName} onChange={(event) => setActivationName(event.target.value)} className="w-full rounded-2xl border border-[#d9e6f2] bg-white px-4 py-3 text-base outline-none focus:border-[#2f69a8] focus:ring-4 focus:ring-[#2f69a8]/10" placeholder="اسم المدير" /></label>}
            <label className="block"><span className="mb-1.5 block text-sm font-bold text-[#24313f]">البريد الإلكتروني</span><input type="email" autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} className="w-full rounded-2xl border border-[#d9e6f2] bg-white px-4 py-3 text-left text-base outline-none focus:border-[#2f69a8] focus:ring-4 focus:ring-[#2f69a8]/10" dir="ltr" placeholder="name@example.com" /></label>
            <label className="block"><span className="mb-1.5 block text-sm font-bold text-[#24313f]">كلمة السر</span><input type="password" autoComplete={mode === 'signin' ? 'current-password' : 'new-password'} value={password} onChange={(event) => setPassword(event.target.value)} className="w-full rounded-2xl border border-[#d9e6f2] bg-white px-4 py-3 text-left text-base outline-none focus:border-[#2f69a8] focus:ring-4 focus:ring-[#2f69a8]/10" dir="ltr" placeholder="••••••••" /></label>
            {error && <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">{error}</div>}
            {message && <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-semibold leading-6 text-emerald-800">{message}</div>}
            <button type="submit" disabled={busy} className="w-full rounded-2xl bg-[#173a63] px-4 py-3.5 font-black text-white shadow-lg shadow-[#173a63]/20 disabled:opacity-60">{busy ? 'جاري التنفيذ…' : mode === 'signin' ? 'دخول' : 'تفعيل الحساب'}</button>
          </form>
        </div>
      </div>
    </div>
  );
}

function AccessDenied() {
  return <div dir="rtl" className="flex min-h-screen items-center justify-center bg-[#07182c] p-5"><div className="max-w-md rounded-3xl bg-white p-7 text-center shadow-2xl"><ShieldCheck className="mx-auto mb-4 text-amber-600" size={42} /><h1 className="text-xl font-black text-[#0a2037]">الحساب غير مخوّل للإدارة</h1><p className="mt-3 text-sm leading-6 text-slate-500">الحساب مسجّل، لكن ما عنده صلاحية فعالة داخل دليلي.</p><button type="button" onClick={() => void supabase.auth.signOut()} className="mt-6 rounded-2xl bg-[#173a63] px-5 py-3 font-bold text-white">تسجيل الخروج</button></div></div>;
}

export default function AdminAppV3() {
  const [authReady, setAuthReady] = useState(false);
  const [signedIn, setSignedIn] = useState(false);
  const [profile, setProfile] = useState<AdminProfile | null>(null);
  const [team, setTeam] = useState<AdminProfile[]>([]);
  const [invites, setInvites] = useState<AdminInvite[]>([]);
  const [content, setContent] = useState<ContentRow[]>([]);
  const [query, setQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [inviteName, setInviteName] = useState('');
  const [inviteEmail, setInviteEmail] = useState('');
  const [busyId, setBusyId] = useState<string | null>(null);
  const [inviteBusy, setInviteBusy] = useState(false);
  const [notice, setNotice] = useState('');
  const [error, setError] = useState('');

  const loadAdminState = useCallback(async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) { setSignedIn(false); setProfile(null); setTeam([]); setInvites([]); setContent([]); setAuthReady(true); return; }
    setSignedIn(true);

    const { data: profileData, error: profileError } = await supabase.from('admin_profiles').select('id,email,display_name,role,is_active').eq('id', session.user.id).maybeSingle();
    if (profileError || !profileData?.is_active || !isAdminRole(profileData.role)) { setProfile(null); setAuthReady(true); return; }
    const typedProfile = profileData as AdminProfile;
    setProfile(typedProfile);

    const { data: contentData, error: contentError } = await supabase.from('content_items').select('id,content_type,slug,title_ar,title_en,status,version,updated_at,created_by,updated_by,published_by').order('updated_at', { ascending: false }).limit(500);
    if (contentError) setError(contentError.message);
    setContent((contentData ?? []) as ContentRow[]);

    const { data: teamData } = await supabase.from('admin_profiles').select('id,email,display_name,role,is_active').order('created_at', { ascending: true });
    setTeam(((teamData ?? []) as AdminProfile[]).filter((item) => isAdminRole(item.role)));

    if (typedProfile.role === 'owner') {
      const { data: inviteData } = await supabase.from('admin_invites').select('id,email,display_name,role,is_active,accepted_at').order('created_at', { ascending: false });
      setInvites(((inviteData ?? []) as AdminInvite[]).filter((item) => item.role === 'admin'));
    } else setInvites([]);
    setAuthReady(true);
  }, []);

  useEffect(() => {
    void loadAdminState();
    const { data } = supabase.auth.onAuthStateChange(() => window.setTimeout(() => void loadAdminState(), 0));
    return () => data.subscription.unsubscribe();
  }, [loadAdminState]);

  const profileById = useMemo(() => new Map(team.map((item) => [item.id, item])), [team]);
  const actorName = (id: string | null) => id ? adminDisplayName(profileById.get(id)) : '—';

  const counts = useMemo(() => {
    const base: Record<ContentStatus, number> = { draft: 0, review: 0, approved: 0, published: 0, rejected: 0, archived: 0 };
    for (const item of content) base[item.status] += 1;
    return base;
  }, [content]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return content.filter((item) => {
      if (statusFilter !== 'all' && item.status !== statusFilter) return false;
      if (!q) return true;
      return [item.slug, item.title_ar ?? '', item.title_en ?? '', STATUS_LABELS[item.status]].some((value) => value.toLowerCase().includes(q));
    });
  }, [content, query, statusFilter]);

  const inviteUser = async (event: FormEvent) => {
    event.preventDefault();
    if (!profile || profile.role !== 'owner') return;
    const displayName = inviteName.trim();
    const email = inviteEmail.trim().toLowerCase();
    if (displayName.length < 2) { setError('اكتب اسم المدير حتى نعرف من يكتب ويعدّل المحتوى.'); return; }
    if (!email) { setError('اكتب البريد الإلكتروني للمدير.'); return; }
    setInviteBusy(true); setNotice(''); setError('');
    const { error: inviteError } = await supabase.from('admin_invites').upsert({
      email, display_name: displayName, role: 'admin', is_active: true, invited_by: profile.id, accepted_at: null, accepted_user_id: null,
    }, { onConflict: 'email' });
    if (inviteError) setError(inviteError.message);
    else { setInviteName(''); setInviteEmail(''); setNotice('تمت إضافة المدير. يفتح /admin ويختار «تفعيل حساب مدعو».'); await loadAdminState(); }
    setInviteBusy(false);
  };

  const toggleAdmin = async (target: AdminProfile) => {
    if (!profile || profile.role !== 'owner' || target.role !== 'admin') return;
    setBusyId(target.id); setError(''); setNotice('');
    const { error: updateError } = await supabase.from('admin_profiles').update({ is_active: !target.is_active }).eq('id', target.id).eq('role', 'admin');
    if (updateError) setError(updateError.message);
    else { setNotice(target.is_active ? `تمت إزالة صلاحية ${adminDisplayName(target)}.` : `تمت إعادة تفعيل ${adminDisplayName(target)}.`); await loadAdminState(); }
    setBusyId(null);
  };

  const publishApproved = async (item: ContentRow) => {
    setBusyId(item.id); setNotice(''); setError('');
    try {
      const { data, error: updateError } = await supabase.from('content_items').update({ status: 'published' }).eq('id', item.id).eq('status', 'approved').eq('version', item.version).select('id,status,version');
      if (updateError) throw updateError;
      if (!data || data.length !== 1) throw new Error('العنصر تغيّر من مستخدم آخر. حدّث الصفحة قبل النشر.');
      setNotice(`تم نشر ${item.title_ar || item.title_en || item.slug}.`); await loadAdminState();
    } catch (caught) { setError(caught instanceof Error ? caught.message : 'تعذر نشر العنصر.'); }
    finally { setBusyId(null); }
  };

  const archiveItem = async (item: ContentRow) => {
    if (!window.confirm(`حذف «${item.title_ar || item.title_en || item.slug}» من العرض؟ سيبقى محفوظًا في سجل التعديلات.`)) return;
    setBusyId(item.id); setNotice(''); setError('');
    const { error: archiveError } = await supabase.from('content_items').update({ status: 'archived' }).eq('id', item.id).eq('version', item.version);
    if (archiveError) setError(archiveError.message);
    else { setNotice('تم حذف العنصر من العرض مع الاحتفاظ بسجل التعديل.'); await loadAdminState(); }
    setBusyId(null);
  };

  if (!authReady) return <div className="flex min-h-screen items-center justify-center bg-[#07182c] text-sm font-bold text-white">جاري تحميل لوحة الإدارة…</div>;
  if (!signedIn) return <AuthPanel />;
  if (!profile) return <AccessDenied />;

  const canManageTeam = profile.role === 'owner';
  const canEdit = true;
  const canReview = true;
  const canPublish = true;
  const activeTeamCount = team.filter((item) => item.is_active).length;

  return (
    <div dir="rtl" className="admin-mobile-select-scope min-h-screen overflow-x-hidden bg-[#eef3f8] text-[#24313f]">
      <header className="border-b border-white/10 bg-[#07182c] text-white"><div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-4 sm:px-6 sm:py-5"><div className="min-w-0"><p className="text-xs font-bold text-[#d9a441]">دليلي — مملكة التخدير</p><h1 className="mt-1 truncate text-lg font-black sm:text-xl">لوحة إدارة المحتوى</h1></div><div className="flex shrink-0 items-center gap-3"><div className="hidden text-left sm:block"><div className="text-sm font-bold">{adminDisplayName(profile)}</div><div className="text-xs text-white/60">{ROLE_LABELS[profile.role]}</div></div><button type="button" onClick={() => void supabase.auth.signOut()} className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 hover:bg-white/20" aria-label="تسجيل الخروج"><LogOut size={18} /></button></div></div></header>

      <main className="mx-auto max-w-6xl space-y-4 px-3 py-4 sm:space-y-6 sm:px-6 sm:py-6">
        <section className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200/70 sm:rounded-3xl sm:p-5"><Database className="mb-3 text-[#2f69a8]" size={23} /><div className="text-2xl font-black text-[#0a2037] sm:text-3xl">{content.length}</div><div className="mt-1 text-xs font-bold text-slate-500 sm:text-sm">إجمالي المحتوى</div></div>
          <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200/70 sm:rounded-3xl sm:p-5"><CheckCircle2 className="mb-3 text-emerald-600" size={23} /><div className="text-2xl font-black text-[#0a2037] sm:text-3xl">{counts.published}</div><div className="mt-1 text-xs font-bold text-slate-500 sm:text-sm">منشور للطلاب</div></div>
          <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200/70 sm:rounded-3xl sm:p-5"><FileClock className="mb-3 text-amber-600" size={23} /><div className="text-2xl font-black text-[#0a2037] sm:text-3xl">{counts.review + counts.approved}</div><div className="mt-1 text-xs font-bold text-slate-500 sm:text-sm">مراجعة / اعتماد</div></div>
          <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200/70 sm:rounded-3xl sm:p-5"><Users className="mb-3 text-[#2f69a8]" size={23} /><div className="text-2xl font-black text-[#0a2037] sm:text-3xl">{activeTeamCount}</div><div className="mt-1 text-xs font-bold text-slate-500 sm:text-sm">حسابات الإدارة</div></div>
        </section>

        <section className="rounded-2xl bg-white p-3 shadow-sm ring-1 ring-slate-200/70 sm:rounded-3xl sm:p-4">
          <div className="grid gap-2 sm:grid-cols-[auto_auto_auto_1fr] sm:items-center">
            {canEdit && <a href="/admin/drugs" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-2xl bg-[#173a63] px-4 py-3 text-sm font-black text-white"><Plus size={17} /> إضافة دواء جديد</a>}
            {canReview && <a href="/admin/review" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-2xl bg-amber-50 px-4 py-3 text-sm font-black text-amber-800 ring-1 ring-amber-200"><ShieldCheck size={17} /> المراجعة ({counts.review})</a>}
            <a href="/admin/audit" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-2xl bg-[#eef3f8] px-4 py-3 text-sm font-black text-[#173a63] ring-1 ring-[#d9e6f2]"><History size={17} /> سجل التعديلات</a>
            <div className="relative min-w-0"><Search size={17} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="بحث بالاسم أو الحالة…" className="w-full rounded-2xl border border-[#d9e6f2] bg-[#f8fbfd] py-3 pr-10 pl-4 text-base outline-none focus:border-[#2f69a8]" /></div>
          </div>
          <div className="mt-3 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">{FILTERS.map((filter) => { const active = statusFilter === filter.id; const count = filter.id === 'all' ? content.length : counts[filter.id]; return <button key={filter.id} type="button" onClick={() => setStatusFilter(filter.id)} className={`inline-flex min-h-10 shrink-0 items-center gap-2 rounded-full px-3.5 text-xs font-black ring-1 transition ${active ? 'bg-[#173a63] text-white ring-[#173a63]' : 'bg-white text-[#526675] ring-[#d9e6f2]'}`}><span>{filter.label}</span><span className={`rounded-full px-1.5 py-0.5 text-[10px] ${active ? 'bg-white/15 text-white' : 'bg-[#eef3f8] text-[#526675]'}`}>{count}</span></button>; })}</div>
        </section>

        {canManageTeam && <section className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200/70 sm:rounded-3xl sm:p-6"><div className="mb-4 flex items-center gap-3"><div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[#eef3f8] text-[#173a63]"><UserPlus size={21} /></div><div><h2 className="font-black text-[#0a2037]">إضافة مدير</h2><p className="text-xs text-slate-500 sm:text-sm">المالك وحده يضيف أو يزيل المديرين. الاسم إجباري حتى يظهر في سجل التعديلات.</p></div></div><form onSubmit={inviteUser} className="grid gap-3 md:grid-cols-[1fr_1fr_auto]"><input value={inviteName} onChange={(event) => setInviteName(event.target.value)} placeholder="اسم المدير" className="min-h-12 min-w-0 rounded-2xl border border-[#d9e6f2] px-4 py-3 text-base outline-none focus:border-[#2f69a8]" /><input type="email" dir="ltr" value={inviteEmail} onChange={(event) => setInviteEmail(event.target.value)} placeholder="admin@example.com" className="min-h-12 min-w-0 rounded-2xl border border-[#d9e6f2] px-4 py-3 text-base outline-none focus:border-[#2f69a8]" /><button type="submit" disabled={inviteBusy} className="min-h-12 rounded-2xl bg-[#173a63] px-5 py-3 font-black text-white disabled:opacity-60">{inviteBusy ? 'جاري…' : 'إضافة مدير'}</button></form>
          <div className="mt-5 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">{team.filter((item) => item.role === 'admin').map((admin) => <div key={admin.id} className="rounded-2xl border border-slate-100 bg-[#f8fbfd] p-3.5"><div className="font-black text-[#0a2037]">{adminDisplayName(admin)}</div><div dir="ltr" className="mt-1 truncate text-left text-xs text-slate-500">{admin.email}</div><button type="button" disabled={busyId === admin.id} onClick={() => void toggleAdmin(admin)} className={`mt-3 inline-flex min-h-10 w-full items-center justify-center gap-2 rounded-xl px-3 py-2 text-xs font-black ${admin.is_active ? 'bg-red-50 text-red-700 ring-1 ring-red-100' : 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100'}`}>{admin.is_active ? <><UserX size={15}/> إزالة صلاحية المدير</> : <><UserCheck size={15}/> إعادة التفعيل</>}</button></div>)}</div>
          {invites.filter((invite) => !invite.accepted_at && invite.is_active).length > 0 && <div className="mt-4 rounded-2xl bg-[#fff8e6] p-3 text-xs font-bold text-[#795b17]">دعوات بانتظار التفعيل: {invites.filter((invite) => !invite.accepted_at && invite.is_active).map((invite) => invite.display_name || invite.email).join('، ')}</div>}
        </section>}

        {error && <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm font-bold text-red-700">{error}</div>}
        {notice && <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm font-bold text-emerald-800">{notice}</div>}

        <section className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200/70 sm:rounded-3xl sm:p-6"><div className="mb-4 flex items-end justify-between gap-3"><div><h2 className="font-black text-[#0a2037]">المحتوى</h2><p className="mt-1 text-xs text-slate-500 sm:text-sm">النتائج الحالية: {filtered.length}</p></div>{(query || statusFilter !== 'all') && <button type="button" onClick={() => { setQuery(''); setStatusFilter('all'); }} className="shrink-0 rounded-xl bg-[#eef3f8] px-3 py-2 text-xs font-black text-[#173a63]">مسح الفلاتر</button>}</div>
          {filtered.length === 0 ? <div className="rounded-2xl border border-dashed border-[#b9cee2] bg-[#f8fbfd] p-8 text-center"><Pill className="mx-auto mb-3 text-[#2f69a8]" size={28} /><p className="text-sm font-semibold text-slate-500">لا توجد نتائج مطابقة.</p></div> : <div className="space-y-2">{filtered.map((item) => <article key={item.id} className="rounded-2xl border border-slate-100 bg-white p-3.5 sm:p-4"><div className="flex min-w-0 items-start justify-between gap-3"><span className={`shrink-0 rounded-full px-2.5 py-1 text-[11px] font-bold ring-1 ${STATUS_CLASSES[item.status]}`}>{STATUS_LABELS[item.status]}</span><div className="min-w-0 flex-1 text-right"><div className="break-words font-black text-[#0a2037]">{item.title_ar || item.title_en || item.slug}</div><div className="mt-1 truncate text-xs text-slate-400" dir="ltr">{item.title_en || item.slug} · v{item.version}</div></div></div><div className="mt-2 rounded-xl bg-[#f8fbfd] px-3 py-2 text-[11px] leading-5 text-slate-500"><span className="font-bold text-slate-700">أنشأ:</span> {actorName(item.created_by)} <span className="mx-1">•</span> <span className="font-bold text-slate-700">آخر تعديل:</span> {actorName(item.updated_by)}{item.published_by && <><span className="mx-1">•</span><span className="font-bold text-slate-700">نشر:</span> {actorName(item.published_by)}</>}</div><div className="mt-3 flex flex-wrap gap-2 border-t border-slate-100 pt-3">{item.content_type === 'drug' && canEdit && <a href={`/admin/drugs?id=${encodeURIComponent(item.id)}`} className="inline-flex min-h-10 flex-1 items-center justify-center gap-1 rounded-xl border border-[#d9e6f2] bg-[#f8fbfd] px-3 py-2 text-xs font-black text-[#173a63] sm:flex-none"><Pencil size={14} /> تعديل</a>}{canPublish && item.status === 'approved' && <button type="button" disabled={busyId === item.id} onClick={() => void publishApproved(item)} className="inline-flex min-h-10 flex-1 items-center justify-center gap-1 rounded-xl bg-emerald-600 px-3 py-2 text-xs font-black text-white disabled:opacity-50 sm:flex-none"><Send size={14} /> نشر</button>}{item.status !== 'archived' && <button type="button" disabled={busyId === item.id} onClick={() => void archiveItem(item)} className="inline-flex min-h-10 flex-1 items-center justify-center gap-1 rounded-xl bg-red-50 px-3 py-2 text-xs font-black text-red-700 ring-1 ring-red-100 disabled:opacity-50 sm:flex-none"><Trash2 size={14} /> حذف</button>}</div></article>)}</div>}
        </section>
      </main>
      <MobileSelectSheet />
    </div>
  );
}
