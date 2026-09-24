import { useEffect, useState } from 'react';
import FluidEditor, { type FluidContentRow } from './FluidEditor';
import MobileSelectSheet from './MobileSelectSheet';
import { supabase } from '../lib/supabase';
import { isAdminRole } from './adminTypes';
import './adminDrugEditor.mobile.css';

type AdminRole = 'owner' | 'admin';
type AdminProfile = { id: string; role: AdminRole; is_active: boolean };

export default function AdminFluidEditorPage() {
  const [profile, setProfile] = useState<AdminProfile | null>(null);
  const [row, setRow] = useState<FluidContentRow | null>(null);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) { window.location.replace('/admin'); return; }
      const { data: profileData, error: profileError } = await supabase.from('admin_profiles').select('id,role,is_active').eq('id', session.user.id).maybeSingle();
      if (cancelled) return;
      if (profileError || !profileData?.is_active || !isAdminRole(profileData.role)) { setError('هذا الحساب لا يملك صلاحية إدارة دليلي.'); setReady(true); return; }
      setProfile(profileData as AdminProfile);
      const id = new URLSearchParams(window.location.search).get('id');
      if (id) {
        const { data: rowData, error: rowError } = await supabase.from('content_items').select('id,slug,title_ar,title_en,status,payload').eq('id', id).eq('content_type', 'fluid').maybeSingle();
        if (rowError) setError(rowError.message);
        else if (rowData) setRow(rowData as FluidContentRow);
        else setError('السائل المطلوب غير موجود.');
      }
      setReady(true);
    };
    void load();
    return () => { cancelled = true; };
  }, []);

  if (!ready) return <div className="flex min-h-screen items-center justify-center bg-[#07182c] text-sm font-bold text-white">جاري فتح محرر السوائل…</div>;
  if (error || !profile) return <div dir="rtl" className="flex min-h-screen items-center justify-center bg-[#07182c] p-5"><div className="max-w-md rounded-3xl bg-white p-6 text-center shadow-2xl"><h1 className="font-black text-[#0a2037]">تعذر فتح المحرر</h1><p className="mt-3 text-sm leading-6 text-red-700">{error || 'الحساب غير مخوّل.'}</p><a href="/admin" className="mt-5 inline-block rounded-2xl bg-[#173a63] px-5 py-3 font-black text-white">الرجوع للوحة الإدارة</a></div></div>;

  return <div className="admin-drug-editor-host"><FluidEditor profileId={profile.id} role={profile.role} initialRow={row} onSaved={() => undefined} onClose={() => window.location.assign('/admin/fluids/manage')} /><MobileSelectSheet /></div>;
}
