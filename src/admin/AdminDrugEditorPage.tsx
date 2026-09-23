import { useEffect, useState } from 'react';
import DrugEditorV2, { type DrugContentRow } from './DrugEditorV2';
import { supabase } from '../lib/supabase';
import './adminDrugEditor.mobile.css';

type AdminRole = 'owner' | 'admin' | 'editor' | 'reviewer';

type AdminProfile = {
  id: string;
  role: AdminRole;
  is_active: boolean;
};

export default function AdminDrugEditorPage() {
  const [profile, setProfile] = useState<AdminProfile | null>(null);
  const [row, setRow] = useState<DrugContentRow | null>(null);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState('');

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

      const id = new URLSearchParams(window.location.search).get('id');
      if (id) {
        const { data: rowData, error: rowError } = await supabase
          .from('content_items')
          .select('id,slug,title_ar,title_en,status,payload')
          .eq('id', id)
          .eq('content_type', 'drug')
          .maybeSingle();

        if (rowError) {
          setError(rowError.message);
        } else if (rowData) {
          setRow(rowData as DrugContentRow);
        }
      }

      setReady(true);
    };

    void load();
    return () => {
      cancelled = true;
    };
  }, []);

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

  return (
    <div className="admin-drug-editor-host">
      <DrugEditorV2
        profileId={profile.id}
        role={profile.role}
        initialRow={row}
        onSaved={() => undefined}
        onClose={() => window.location.assign('/admin')}
      />
    </div>
  );
}
