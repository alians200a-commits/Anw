export type AdminRole = 'owner' | 'admin';

export type AdminProfile = {
  id: string;
  email?: string;
  display_name?: string | null;
  role: AdminRole;
  is_active: boolean;
};

export function isAdminRole(value: unknown): value is AdminRole {
  return value === 'owner' || value === 'admin';
}

export function adminDisplayName(profile: Pick<AdminProfile, 'display_name' | 'email'> | null | undefined): string {
  const name = profile?.display_name?.trim();
  if (name) return name;
  const email = profile?.email?.trim();
  return email || 'حساب إداري';
}
