import { useEffect, useState } from 'react';
import { Droplets, Pill, Wrench } from 'lucide-react';
import AdminAppV3 from './AdminAppV3';
import { supabase } from '../lib/supabase';

type AdminRole = 'owner' | 'admin' | 'editor' | 'reviewer';
type Profile = { role: AdminRole; is_active: boolean };

const sections = [
  { href: '/admin/drugs', label: 'الأدوية', icon: Pill, editorOnly: true },
  { href: '/admin/equipment/manage', label: 'المعدات', icon: Wrench, editorOnly: false },
  { href: '/admin/fluids/manage', label: 'السوائل', icon: Droplets, editorOnly: false },
] as const;

export default function AdminAppV4() {
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    let active = true;
    const load = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) { if (active) setProfile(null); return; }
      const { data } = await supabase.from('admin_profiles').select('role,is_active').eq('id', session.user.id).maybeSingle();
      if (active) setProfile(data?.is_active ? data as Profile : null);
    };
    void load();
    const { data } = supabase.auth.onAuthStateChange(() => window.setTimeout(() => void load(), 0));
    return () => { active = false; data.subscription.unsubscribe(); };
  }, []);

  const canEdit = profile && ['owner', 'admin', 'editor'].includes(profile.role);

  return (
    <div className={profile ? 'pb-24 sm:pb-0' : ''}>
      <AdminAppV3 />
      {profile && (
        <nav aria-label="إدارة أقسام المحتوى" className="fixed inset-x-3 bottom-[max(10px,env(safe-area-inset-bottom))] z-[120] grid grid-cols-3 gap-2 rounded-[22px] border border-white/70 bg-white/95 p-2 shadow-2xl backdrop-blur-xl sm:left-auto sm:right-5 sm:w-[430px]">
          {sections.map(({ href, label, icon: Icon, editorOnly }) => {
            const disabled = editorOnly && !canEdit;
            return disabled ? (
              <span key={href} className="flex min-h-12 items-center justify-center gap-1.5 rounded-2xl bg-slate-50 px-2 text-xs font-black text-slate-300"><Icon size={17} /> {label}</span>
            ) : (
              <a key={href} href={href} className="flex min-h-12 items-center justify-center gap-1.5 rounded-2xl bg-[#eef3f8] px-2 text-xs font-black text-[#173a63] transition active:bg-[#d9e6f2]"><Icon size={17} /> {label}</a>
            );
          })}
        </nav>
      )}
    </div>
  );
}
