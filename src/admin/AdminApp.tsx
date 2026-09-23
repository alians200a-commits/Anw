import { FormEvent, useCallback, useEffect, useMemo, useState } from 'react';
import {
  CheckCircle2,
  Database,
  FileClock,
  LogOut,
  Pill,
  Plus,
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
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: normalizedEmail,
        password,
      });
      if (signInError) setError('تعذر تسجيل الدخول. تأكد من البريد وكلمة السر وتفعيل البريد.');
    } else {
      const { data, error: signUpError } = await supabase.auth.signUp({
        email: normalizedEmail,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/admin`,
        },
      });
      if (signUpError) {
        setError(signUpError.message);
      } else if (data.session) {
        setMessage('تم تفعيل الحساب وتسجيل الدخول.');
      } else {
        setMessage('تم إنشاء الحساب. افتح رسالة التأكيد في بريدك ثم ارجع وسجّل الدخول.');
      }
    }

    setBusy(false);
  };

  return (
    <div dir="rtl" className="min-h-screen bg-[#07182c] px-4 py-10 text-[#173a63]">
      <div className="mx-auto flex min-h-[80vh] max-w-md items-center">
        <div className="w-full rounded-[28px] border border-white/60 bg-white p-6 shadow-2xl shadow-black/20 sm:p-8">
          <div className="mb-7 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#eef3f8] text-[#173a63]">
              <ShieldCheck size={30} />
            </div>
            <h1 className="text-2xl font-black text-[#0a2037]">لوحة إدارة دليلي</h1>
            <p className="mt-2 text-sm leading-6 text-slate-500">هذه الصفحة خاصة بفريق إدارة المحتوى فقط.</p>
          </div>

          <div className="mb-5 grid grid-cols-2 rounded-2xl bg-[#eef3f8] p-1 text-sm font-bold">
            <button
              type="button"
              onClick={() => { setMode('signin'); setError(''); setMessage(''); }}
              className={`rounded-xl px-3 py-2.5 transition ${mode === 'signin' ? 'bg-white text-[#173a63] shadow-sm' : 'text-slate-500'}`}
            >
              تسجيل الدخول
            </button>
            <button
              type="button"
              onClick={() => { setMode('activate'); setError(''); setMessage(''); }}
              className={`rounded-xl px-3 py-2.5 transition ${mode === 'activate' ? 'bg-white text-[#173a63] shadow-sm' : 'text-slate-500'}`}
            >
              تفعيل حساب مدعو
            </button>
          </div>

          <form onSubmit={submit} className="space-y-4">
            <label className="block">
              <span className="mb-1.5 block text-sm font-bold text-[#24313f]">البريد الإلكتروني</span>
              <input
                type="email"
                autoComplete="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="w-full rounded-2xl border border-[#d9e6f2] bg-white px-4 py-3 text-left outline-none transition focus:border-[#2f69a8] focus:ring-4 focus:ring-[#2f69a8]/10"
                dir="ltr"
                placeholder="name@example.com"
              />
            </label>

            <label className="block">
              <span className="mb-1.5 block text-sm font-bold text-[#24313f]">كلمة السر</span>
              <input
                type="password"
                autoComplete={mode === 'signin' ? 'current-password' : 'new-password'}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="w-full rounded-2xl border border-[#d9e6f2] bg-white px-4 py-3 text-left outline-none transition focus:border-[#2f69a8] focus:ring-4 focus:ring-[#2f69a8]/10"
                dir="ltr"
                placeholder="••••••••"
              />
            </label>

            {error && <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">{error}</div>}
            {message && <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-semibold leading-6 text-emerald-800">{message}</div>}

            <button
              type="submit"
              disabled={busy}
              className="w-full rounded-2xl bg-[#173a63] px-4 py-3.5 font-black text-white shadow-lg shadow-[#173a63]/20 transition hover:bg-[#102e50] disabled:cursor-wait disabled:opacity-60"
            >
              {busy ? 'جاري التنفيذ…' : mode === 'signin' ? 'دخول' : 'تفعيل الحساب'}
            </button>
          </form>

          <p className="mt-5 text-center text-xs leading-5 text-slate-400">تفعيل الحساب لا يمنح صلاحية تلقائيًا؛ البريد يجب أن يكون مدعوًا مسبقًا من الإدارة.</p>
        </div>
      </div>
    </div>
  );
}

function AccessDenied() {
  return (
    <div dir="rtl" className="min-h-screen bg-[#07182c] px-4 py-10">
      <div className="mx-auto flex min-h-[80vh] max-w-md items-center">
        <div className="w-full rounded-[28px] bg-white p-7 text-center shadow-2xl">
          <ShieldCheck className="mx-auto mb-4 text-amber-600" size={42} />
          <h1 className="text-xl font-black text-[#0a2037]">الحساب غير مخوّل للإدارة</h1>
          <p className="mt-3 text-sm leading-6 text-slate-500">الحساب مسجّل في Supabase، لكن ما عنده دعوة وصلاحية داخل دليلي.</p>
          <button type="button" onClick={() => void supabase.auth.signOut()} className="mt-6 rounded-2xl bg-[#173a63] px-5 py-3 font-bold text-white">تسجيل الخروج</button>
        </div>
      </div>
    </div>
  );
}

export default function AdminApp() {
  const [authReady, setAuthReady] = useState(false);
  const [signedIn, setSignedIn] = useState(false);
  const [profile, setProfile] = useState<AdminProfile | null>(null);
  const [invites, setInvites] = useState<AdminInvite[]>([]);
  const [content, setContent] = useState<ContentRow[]>([]);
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState<AdminRole>('editor');
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

    const { data: contentData } = await supabase
      .from('content_items')
      .select('id,content_type,title_ar,title_en,status,version,updated_at')
      .order('updated_at', { ascending: false })
      .limit(100);
    setContent((contentData ?? []) as ContentRow[]);

    if (typedProfile.role === 'owner' || typedProfile.role === 'admin') {
      const { data: inviteData } = await supabase
        .from('admin_invites')
        .select('id,email,role,is_active,accepted_at')
        .order('created_at', { ascending: false });
      setInvites((inviteData ?? []) as AdminInvite[]);
    } else {
      setInvites([]);
    }

    setAuthReady(true);
  }, []);

  useEffect(() => {
    void loadAdminState();
    const { data } = supabase.auth.onAuthStateChange(() => {
      window.setTimeout(() => void loadAdminState(), 0);
    });
    return () => data.subscription.unsubscribe();
  }, [loadAdminState]);

  const statusCounts = useMemo(() => {
    const base: Record<ContentStatus, number> = { draft: 0, review: 0, approved: 0, published: 0, rejected: 0, archived: 0 };
    for (const item of content) base[item.status] += 1;
    return base;
  }, [content]);

  const inviteUser = async (event: FormEvent) => {
    event.preventDefault();
    if (!profile) return;
    const email = inviteEmail.trim().toLowerCase();
    if (!email) return;

    setInviteBusy(true);
    setNotice('');
    setError('');

    const { error: inviteError } = await supabase.from('admin_invites').upsert(
      {
        email,
        role: inviteRole,
        is_active: true,
        invited_by: profile.id,
        accepted_at: null,
        accepted_user_id: null,
      },
      { onConflict: 'email' },
    );

    if (inviteError) {
      setError(inviteError.message);
    } else {
      setInviteEmail('');
      setNotice('تمت إضافة الدعوة. الشخص يفتح /admin ويختار «تفعيل حساب مدعو».');
      await loadAdminState();
    }
    setInviteBusy(false);
  };

  if (!authReady) {
    return <div className="flex min-h-screen items-center justify-center bg-[#07182c] text-sm font-bold text-white">جاري تحميل لوحة الإدارة…</div>;
  }

  if (!signedIn) return <AuthPanel />;
  if (!profile) return <AccessDenied />;

  const canManageTeam = profile.role === 'owner' || profile.role === 'admin';
  const canEditContent = profile.role === 'owner' || profile.role === 'admin' || profile.role === 'editor';

  return (
    <div dir="rtl" className="min-h-screen bg-[#eef3f8] text-[#24313f]">
      <header className="border-b border-white/10 bg-[#07182c] text-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-5 sm:px-6">
          <div>
            <p className="text-xs font-bold text-[#d9a441]">دليلي — مملكة التخدير</p>
            <h1 className="mt-1 text-xl font-black">لوحة إدارة المحتوى</h1>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden text-left sm:block" dir="ltr">
              <div className="text-sm font-bold">{profile.email}</div>
              <div className="text-xs text-white/60" dir="rtl">{ROLE_LABELS[profile.role]}</div>
            </div>
            <button type="button" onClick={() => void supabase.auth.signOut()} className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 transition hover:bg-white/20" aria-label="تسجيل الخروج">
              <LogOut size={18} />
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl space-y-6 px-4 py-6 sm:px-6">
        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-200/70">
            <Database className="mb-4 text-[#2f69a8]" size={25} />
            <div className="text-3xl font-black text-[#0a2037]">{content.length}</div>
            <div className="mt-1 text-sm font-bold text-slate-500">إجمالي عناصر المحتوى</div>
          </div>
          <div className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-200/70">
            <CheckCircle2 className="mb-4 text-emerald-600" size={25} />
            <div className="text-3xl font-black text-[#0a2037]">{statusCounts.published}</div>
            <div className="mt-1 text-sm font-bold text-slate-500">منشور حاليًا</div>
          </div>
          <div className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-200/70">
            <FileClock className="mb-4 text-amber-600" size={25} />
            <div className="text-3xl font-black text-[#0a2037]">{statusCounts.review + statusCounts.approved}</div>
            <div className="mt-1 text-sm font-bold text-slate-500">بانتظار الاعتماد/النشر</div>
          </div>
          <div className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-200/70">
            <Users className="mb-4 text-[#2f69a8]" size={25} />
            <div className="text-3xl font-black text-[#0a2037]">{canManageTeam ? invites.length : '—'}</div>
            <div className="mt-1 text-sm font-bold text-slate-500">دعوات فريق الإدارة</div>
          </div>
        </section>

        {canManageTeam && (
          <section className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-200/70 sm:p-6">
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#eef3f8] text-[#173a63]"><UserPlus size={22} /></div>
              <div>
                <h2 className="font-black text-[#0a2037]">إضافة شخص لفريق الإدارة</h2>
                <p className="text-sm text-slate-500">تحدد صلاحية كل شخص قبل ما يفعّل حسابه.</p>
              </div>
            </div>

            <form onSubmit={inviteUser} className="grid gap-3 md:grid-cols-[1fr_180px_auto]">
              <input type="email" dir="ltr" value={inviteEmail} onChange={(event) => setInviteEmail(event.target.value)} placeholder="editor@example.com" className="rounded-2xl border border-[#d9e6f2] px-4 py-3 outline-none focus:border-[#2f69a8] focus:ring-4 focus:ring-[#2f69a8]/10" />
              <select value={inviteRole} onChange={(event) => setInviteRole(event.target.value as AdminRole)} className="rounded-2xl border border-[#d9e6f2] bg-white px-4 py-3 font-bold outline-none focus:border-[#2f69a8]">
                {profile.role === 'owner' && <option value="admin">مدير</option>}
                <option value="editor">محرر محتوى</option>
                <option value="reviewer">مراجع</option>
              </select>
              <button type="submit" disabled={inviteBusy} className="rounded-2xl bg-[#173a63] px-5 py-3 font-black text-white disabled:opacity-60">{inviteBusy ? 'جاري…' : 'إضافة الدعوة'}</button>
            </form>

            {notice && <p className="mt-3 text-sm font-semibold text-emerald-700">{notice}</p>}
            {error && <p className="mt-3 text-sm font-semibold text-red-700">{error}</p>}

            {invites.length > 0 && (
              <div className="mt-5 overflow-x-auto rounded-2xl border border-slate-100">
                <table className="w-full min-w-[560px] text-sm">
                  <thead className="bg-[#eef3f8] text-[#173a63]"><tr><th className="px-4 py-3 text-right">البريد</th><th className="px-4 py-3 text-right">الصلاحية</th><th className="px-4 py-3 text-right">الحالة</th></tr></thead>
                  <tbody>
                    {invites.map((invite) => (
                      <tr key={invite.id} className="border-t border-slate-100">
                        <td className="px-4 py-3" dir="ltr">{invite.email}</td>
                        <td className="px-4 py-3 font-bold">{ROLE_LABELS[invite.role]}</td>
                        <td className="px-4 py-3">{invite.accepted_at ? 'مفعّل' : invite.is_active ? 'بانتظار التفعيل' : 'متوقف'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        )}

        <section className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-200/70 sm:p-6">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            {canEditContent && (
              <a href="/admin/drugs" className="inline-flex items-center gap-2 rounded-2xl bg-[#173a63] px-4 py-3 text-sm font-black text-white shadow-lg shadow-[#173a63]/15">
                <Plus size={17} /> إضافة دواء جديد
              </a>
            )}
            <div>
              <h2 className="font-black text-[#0a2037]">المحتوى</h2>
              <p className="mt-1 text-sm text-slate-500">محرر الأدوية جاهز قبل نقل البيانات القديمة؛ التطبيق العادي ما زال يعتمد النسخة الحالية.</p>
            </div>
          </div>

          {content.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-[#b9cee2] bg-[#f8fbfd] px-5 py-8 text-center">
              <Pill className="mx-auto mb-3 text-[#2f69a8]" size={28} />
              <p className="text-sm font-semibold text-slate-500">ما تم نقل المحتوى القديم بعد. تقدر هسه تجرب إنشاء دواء جديد من المحرر.</p>
            </div>
          ) : (
            <div className="space-y-2">
              {content.slice(0, 50).map((item) => (
                <div key={item.id} className="flex flex-col gap-2 rounded-2xl border border-slate-100 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-2">
                    {item.content_type === 'drug' && canEditContent && (
                      <a href={`/admin/drugs?id=${encodeURIComponent(item.id)}`} className="rounded-xl border border-[#d9e6f2] bg-[#f8fbfd] px-3 py-2 text-xs font-black text-[#173a63]">تعديل</a>
                    )}
                    <span className="w-fit rounded-full bg-[#eef3f8] px-3 py-1 text-xs font-bold text-[#173a63]">{STATUS_LABELS[item.status]}</span>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-[#0a2037]">{item.title_ar || item.title_en || item.content_type}</div>
                    <div className="mt-1 text-xs text-slate-400">{item.content_type} · نسخة {item.version}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
