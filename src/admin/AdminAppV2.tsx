import { FormEvent, useCallback, useEffect, useMemo, useState } from 'react';
import {
  CheckCircle2,
  Database,
  FileClock,
  LogOut,
  Pencil,
  Pill,
  Plus,
  Search,
  Send,
  ShieldCheck,
  UserPlus,
  Users,
} from 'lucide-react';
import { supabase } from '../lib/supabase';

type AdminRole = 'owner' | 'admin' | 'editor' | 'reviewer';
type ContentStatus = 'draft' | 'review' | 'approved' | 'published' | 'rejected' | 'archived';

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
};

const ROLE_LABELS: Record<AdminRole, string> = {
  owner: 'المالك',
  admin: 'مدير',
  editor: 'محرر',
  reviewer: 'مراجع',
};

const STATUS_LABELS: Record<ContentStatus, string> = {
  draft: 'مسودة',
  review: 'بانتظار المراجعة',
  approved: 'مُعتمد',
  published: 'منشور',
  rejected: 'يحتاج تعديل',
  archived: 'مؤرشف',
};

const STATUS_CLASSES: Record<ContentStatus, string> = {
  draft: 'bg-slate-100 text-slate-600',
  review: 'bg-amber-50 text-amber-800',
  approved: 'bg-blue-50 text-blue-700',
  published: 'bg-emerald-50 text-emerald-700',
  rejected: 'bg-red-50 text-red-700',
  archived: 'bg-slate-100 text-slate-500',
};

function AuthPanel() {
  const [mode, setMode] = useState<'signin' | 'activate'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    setBusy(true);
    setMessage('');
    setError('');

    const normalizedEmail = email.trim().toLowerCase();
    if (!normalizedEmail || password.length < 8) {
      setError('اكتب البريد الإلكتروني وكلمة سر لا تقل عن 8 أحرف.');
      setBusy(false);
      return;
    }

    if (mode === 'signin') {
      const { error: signInError } = await supabase.auth.signInWithPassword({ email: normalizedEmail, password });
      if (signInError) setError('تعذر تسجيل الدخول. تأكد من البريد وكلمة السر وتفعيل البريد.');
    } else {
      const { data, error: signUpError } = await supabase.auth.signUp({
        email: normalizedEmail,
        password,
        options: { emailRedirectTo: `${window.location.origin}/admin` },
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
          <div className="mb-7 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#eef3f8] text-[#173a63]"><ShieldCheck size={30} /></div>
            <h1 className="text-2xl font-black text-[#0a2037]">لوحة إدارة دليلي</h1>
            <p className="mt-2 text-sm leading-6 text-slate-500">هذه الصفحة خاصة بفريق إدارة المحتوى فقط.</p>
          </div>

          <div className="mb-5 grid grid-cols-2 rounded-2xl bg-[#eef3f8] p-1 text-sm font-bold">
            <button type="button" onClick={() => { setMode('signin'); setError(''); setMessage(''); }} className={`rounded-xl px-3 py-2.5 transition ${mode === 'signin' ? 'bg-white text-[#173a63] shadow-sm' : 'text-slate-500'}`}>تسجيل الدخول</button>
            <button type="button" onClick={() => { setMode('activate'); setError(''); setMessage(''); }} className={`rounded-xl px-3 py-2.5 transition ${mode === 'activate' ? 'bg-white text-[#173a63] shadow-sm' : 'text-slate-500'}`}>تفعيل حساب مدعو</button>
          </div>

          <form onSubmit={submit} className="space-y-4">
            <label className="block"><span className="mb-1.5 block text-sm font-bold text-[#24313f]">البريد الإلكتروني</span><input type="email" autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} className="w-full rounded-2xl border border-[#d9e6f2] bg-white px-4 py-3 text-left outline-none focus:border-[#2f69a8] focus:ring-4 focus:ring-[#2f69a8]/10" dir="ltr" placeholder="name@example.com" /></label>
            <label className="block"><span className="mb-1.5 block text-sm font-bold text-[#24313f]">كلمة السر</span><input type="password" autoComplete={mode === 'signin' ? 'current-password' : 'new-password'} value={password} onChange={(event) => setPassword(event.target.value)} className="w-full rounded-2xl border border-[#d9e6f2] bg-white px-4 py-3 text-left outline-none focus:border-[#2f69a8] focus:ring-4 focus:ring-[#2f69a8]/10" dir="ltr" placeholder="••••••••" /></label>
            {error && <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">{error}</div>}
            {message && <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-semibold leading-6 text-emerald-800">{message}</div>}
            <button type="submit" disabled={busy} className="w-full rounded-2xl bg-[#173a63] px-4 py-3.5 font-black text-white shadow-lg shadow-[#173a63]/20 disabled:opacity-60">{busy ? 'جاري التنفيذ…' : mode === 'signin' ? 'دخول' : 'تفعيل الحساب'}</button>
          </form>
          <p className="mt-5 text-center text-xs leading-5 text-slate-400">البريد يجب أن يكون مدعوًا مسبقًا من الإدارة.</p>
        </div>
      </div>
    </div>
  );
}

function AccessDenied() {
  return (
    <div dir="rtl" className="flex min-h-screen items-center justify-center bg-[#07182c] p-5">
      <div className="max-w-md rounded-3xl bg-white p-7 text-center shadow-2xl">
        <ShieldCheck className="mx-auto mb-4 text-amber-600" size={42} />
        <h1 className="text-xl font-black text-[#0a2037]">الحساب غير مخوّل للإدارة</h1>
        <p className="mt-3 text-sm leading-6 text-slate-500">الحساب مسجّل، لكن ما عنده صلاحية فعالة داخل دليلي.</p>
        <button type="button" onClick={() => void supabase.auth.signOut()} className="mt-6 rounded-2xl bg-[#173a63] px-5 py-3 font-bold text-white">تسجيل الخروج</button>
      </div>
    </div>
  );
}

export default function AdminAppV2() {
  const [authReady, setAuthReady] = useState(false);
  const [signedIn, setSignedIn] = useState(false);
  const [profile, setProfile] = useState<AdminProfile | null>(null);
  const [invites, setInvites] = useState<AdminInvite[]>([]);
  const [content, setContent] = useState<ContentRow[]>([]);
  const [query, setQuery] = useState('');
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState<AdminRole>('editor');
  const [busyId, setBusyId] = useState<string | null>(null);
  const [inviteBusy, setInviteBusy] = useState(false);
  const [notice, setNotice] = useState('');
  const [error, setError] = useState('');

  const loadAdminState = useCallback(async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      setSignedIn(false);
      setProfile(null);
      setInvites([]);
      setContent([]);
      setAuthReady(true);
      return;
    }

    setSignedIn(true);
    const { data: profileData, error: profileError } = await supabase
      .from('admin_profiles')
      .select('id,email,display_name,role,is_active')
      .eq('id', session.user.id)
      .maybeSingle();

    if (profileError || !profileData?.is_active) {
      setProfile(null);
      setAuthReady(true);
      return;
    }

    const typedProfile = profileData as AdminProfile;
    setProfile(typedProfile);

    const { data: contentData, error: contentError } = await supabase
      .from('content_items')
      .select('id,content_type,slug,title_ar,title_en,status,version,updated_at')
      .order('updated_at', { ascending: false })
      .limit(200);
    if (contentError) setError(contentError.message);
    setContent((contentData ?? []) as ContentRow[]);

    if (typedProfile.role === 'owner' || typedProfile.role === 'admin') {
      const { data: inviteData } = await supabase
        .from('admin_invites')
        .select('id,email,role,is_active,accepted_at')
        .order('created_at', { ascending: false });
      setInvites((inviteData ?? []) as AdminInvite[]);
    } else setInvites([]);

    setAuthReady(true);
  }, []);

  useEffect(() => {
    void loadAdminState();
    const { data } = supabase.auth.onAuthStateChange(() => window.setTimeout(() => void loadAdminState(), 0));
    return () => data.subscription.unsubscribe();
  }, [loadAdminState]);

  const counts = useMemo(() => {
    const base: Record<ContentStatus, number> = { draft: 0, review: 0, approved: 0, published: 0, rejected: 0, archived: 0 };
    for (const item of content) base[item.status] += 1;
    return base;
  }, [content]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return content;
    return content.filter((item) => [item.slug, item.title_ar ?? '', item.title_en ?? '', STATUS_LABELS[item.status]].some((value) => value.toLowerCase().includes(q)));
  }, [content, query]);

  const inviteUser = async (event: FormEvent) => {
    event.preventDefault();
    if (!profile) return;
    const email = inviteEmail.trim().toLowerCase();
    if (!email) return;
    setInviteBusy(true);
    setNotice('');
    setError('');
    const { error: inviteError } = await supabase.from('admin_invites').upsert({
      email,
      role: inviteRole,
      is_active: true,
      invited_by: profile.id,
      accepted_at: null,
      accepted_user_id: null,
    }, { onConflict: 'email' });
    if (inviteError) setError(inviteError.message);
    else {
      setInviteEmail('');
      setNotice('تمت إضافة الدعوة. الشخص يفتح /admin ويختار «تفعيل حساب مدعو».');
      await loadAdminState();
    }
    setInviteBusy(false);
  };

  const publishApproved = async (item: ContentRow) => {
    setBusyId(item.id);
    setNotice('');
    setError('');
    try {
      const { data, error: updateError } = await supabase
        .from('content_items')
        .update({ status: 'published' })
        .eq('id', item.id)
        .eq('status', 'approved')
        .eq('version', item.version)
        .select('id,status,version');
      if (updateError) throw updateError;
      if (!data || data.length !== 1) throw new Error('العنصر تغيّر من مستخدم آخر. حدّث الصفحة قبل النشر.');
      setNotice(`تم نشر ${item.title_ar || item.title_en || item.slug}.`);
      await loadAdminState();
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : 'تعذر نشر العنصر.');
    } finally {
      setBusyId(null);
    }
  };

  if (!authReady) return <div className="flex min-h-screen items-center justify-center bg-[#07182c] text-sm font-bold text-white">جاري تحميل لوحة الإدارة…</div>;
  if (!signedIn) return <AuthPanel />;
  if (!profile) return <AccessDenied />;

  const canManageTeam = profile.role === 'owner' || profile.role === 'admin';
  const canEdit = profile.role === 'owner' || profile.role === 'admin' || profile.role === 'editor';
  const canReview = profile.role === 'owner' || profile.role === 'admin' || profile.role === 'reviewer';
  const canPublish = profile.role === 'owner' || profile.role === 'admin';

  return (
    <div dir="rtl" className="min-h-screen bg-[#eef3f8] text-[#24313f]">
      <header className="border-b border-white/10 bg-[#07182c] text-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-5 sm:px-6">
          <div><p className="text-xs font-bold text-[#d9a441]">دليلي — مملكة التخدير</p><h1 className="mt-1 text-xl font-black">لوحة إدارة المحتوى</h1></div>
          <div className="flex items-center gap-3">
            <div className="hidden text-left sm:block" dir="ltr"><div className="text-sm font-bold">{profile.email}</div><div className="text-xs text-white/60" dir="rtl">{ROLE_LABELS[profile.role]}</div></div>
            <button type="button" onClick={() => void supabase.auth.signOut()} className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 hover:bg-white/20" aria-label="تسجيل الخروج"><LogOut size={18} /></button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl space-y-6 px-4 py-6 sm:px-6">
        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-200/70"><Database className="mb-4 text-[#2f69a8]" size={25} /><div className="text-3xl font-black text-[#0a2037]">{content.length}</div><div className="mt-1 text-sm font-bold text-slate-500">إجمالي المحتوى</div></div>
          <div className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-200/70"><CheckCircle2 className="mb-4 text-emerald-600" size={25} /><div className="text-3xl font-black text-[#0a2037]">{counts.published}</div><div className="mt-1 text-sm font-bold text-slate-500">منشور للطلاب</div></div>
          <div className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-200/70"><FileClock className="mb-4 text-amber-600" size={25} /><div className="text-3xl font-black text-[#0a2037]">{counts.review + counts.approved}</div><div className="mt-1 text-sm font-bold text-slate-500">مراجعة / اعتماد</div></div>
          <div className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-200/70"><Users className="mb-4 text-[#2f69a8]" size={25} /><div className="text-3xl font-black text-[#0a2037]">{canManageTeam ? invites.length : '—'}</div><div className="mt-1 text-sm font-bold text-slate-500">فريق الإدارة</div></div>
        </section>

        <section className="flex flex-wrap items-center gap-3 rounded-3xl bg-white p-4 shadow-sm ring-1 ring-slate-200/70">
          {canEdit && <a href="/admin/drugs" className="inline-flex items-center gap-2 rounded-2xl bg-[#173a63] px-4 py-3 text-sm font-black text-white"><Plus size={17} /> إضافة دواء جديد</a>}
          {canReview && <a href="/admin/review" className="inline-flex items-center gap-2 rounded-2xl bg-amber-50 px-4 py-3 text-sm font-black text-amber-800 ring-1 ring-amber-200"><ShieldCheck size={17} /> المراجعة ({counts.review})</a>}
          <div className="relative min-w-[220px] flex-1"><Search size={17} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="بحث بالاسم أو الحالة…" className="w-full rounded-2xl border border-[#d9e6f2] bg-[#f8fbfd] py-3 pr-10 pl-4 text-sm outline-none focus:border-[#2f69a8]" /></div>
        </section>

        {canManageTeam && (
          <section className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-200/70 sm:p-6">
            <div className="mb-5 flex items-center gap-3"><div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#eef3f8] text-[#173a63]"><UserPlus size={22} /></div><div><h2 className="font-black text-[#0a2037]">إضافة شخص لفريق الإدارة</h2><p className="text-sm text-slate-500">كل شخص بحسابه وصلاحيته الخاصة.</p></div></div>
            <form onSubmit={inviteUser} className="grid gap-3 md:grid-cols-[1fr_180px_auto]">
              <input type="email" dir="ltr" value={inviteEmail} onChange={(event) => setInviteEmail(event.target.value)} placeholder="editor@example.com" className="rounded-2xl border border-[#d9e6f2] px-4 py-3 outline-none focus:border-[#2f69a8]" />
              <select value={inviteRole} onChange={(event) => setInviteRole(event.target.value as AdminRole)} className="rounded-2xl border border-[#d9e6f2] bg-white px-4 py-3 font-bold outline-none"><option value="editor">محرر محتوى</option><option value="reviewer">مراجع</option>{profile.role === 'owner' && <option value="admin">مدير</option>}</select>
              <button type="submit" disabled={inviteBusy} className="rounded-2xl bg-[#173a63] px-5 py-3 font-black text-white disabled:opacity-60">{inviteBusy ? 'جاري…' : 'إضافة الدعوة'}</button>
            </form>
            {invites.length > 0 && <div className="mt-5 overflow-x-auto rounded-2xl border border-slate-100"><table className="w-full min-w-[560px] text-sm"><thead className="bg-[#eef3f8] text-[#173a63]"><tr><th className="px-4 py-3 text-right">البريد</th><th className="px-4 py-3 text-right">الصلاحية</th><th className="px-4 py-3 text-right">الحالة</th></tr></thead><tbody>{invites.map((invite) => <tr key={invite.id} className="border-t border-slate-100"><td className="px-4 py-3" dir="ltr">{invite.email}</td><td className="px-4 py-3 font-bold">{ROLE_LABELS[invite.role]}</td><td className="px-4 py-3">{invite.accepted_at ? 'مفعّل' : invite.is_active ? 'بانتظار التفعيل' : 'متوقف'}</td></tr>)}</tbody></table></div>}
          </section>
        )}

        {error && <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm font-bold text-red-700">{error}</div>}
        {notice && <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm font-bold text-emerald-800">{notice}</div>}

        <section className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-200/70 sm:p-6">
          <div className="mb-5"><h2 className="font-black text-[#0a2037]">المحتوى</h2><p className="mt-1 text-sm text-slate-500">الأدوية المنقولة تبقى مسودات إلى أن تمر بالمراجعة والنشر.</p></div>
          {filtered.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-[#b9cee2] bg-[#f8fbfd] p-8 text-center"><Pill className="mx-auto mb-3 text-[#2f69a8]" size={28} /><p className="text-sm font-semibold text-slate-500">لا توجد نتائج.</p></div>
          ) : (
            <div className="space-y-2">
              {filtered.map((item) => (
                <div key={item.id} className="flex flex-col gap-3 rounded-2xl border border-slate-100 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex flex-wrap items-center gap-2">
                    {item.content_type === 'drug' && canEdit && <a href={`/admin/drugs?id=${encodeURIComponent(item.id)}`} className="inline-flex items-center gap-1 rounded-xl border border-[#d9e6f2] bg-[#f8fbfd] px-3 py-2 text-xs font-black text-[#173a63]"><Pencil size={14} /> تعديل</a>}
                    {profile.role === 'reviewer' && item.status === 'review' && <a href="/admin/review" className="inline-flex items-center gap-1 rounded-xl bg-amber-50 px-3 py-2 text-xs font-black text-amber-800 ring-1 ring-amber-200"><ShieldCheck size={14} /> مراجعة</a>}
                    {canPublish && item.status === 'approved' && <button type="button" disabled={busyId === item.id} onClick={() => void publishApproved(item)} className="inline-flex items-center gap-1 rounded-xl bg-emerald-600 px-3 py-2 text-xs font-black text-white disabled:opacity-50"><Send size={14} /> نشر</button>}
                    <span className={`rounded-full px-3 py-1 text-xs font-bold ${STATUS_CLASSES[item.status]}`}>{STATUS_LABELS[item.status]}</span>
                  </div>
                  <div className="text-right"><div className="font-bold text-[#0a2037]">{item.title_ar || item.title_en || item.slug}</div><div className="mt-1 text-xs text-slate-400" dir="ltr">{item.title_en || item.slug} · v{item.version}</div></div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
