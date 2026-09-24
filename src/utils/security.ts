const CONTROL_OR_SPACE = /[\u0000-\u001F\u007F\s]/;

export function isSafeSlug(value: string): boolean {
  return value === value.trim() && /^[a-z0-9][a-z0-9-]{0,127}$/.test(value);
}

export function isSafeStoragePath(path: string): boolean {
  if (!path || path.length > 512 || CONTROL_OR_SPACE.test(path)) return false;
  if (path.startsWith('/') || path.includes('..') || path.includes('\\')) return false;
  return path.split('/').every((segment) => {
    if (!segment || segment === '.' || segment === '..') return false;
    try {
      const decoded = decodeURIComponent(segment);
      if (!decoded || decoded === '.' || decoded === '..' || CONTROL_OR_SPACE.test(decoded)) return false;
      return !decoded.includes('/') && !decoded.includes('\\');
    } catch {
      return false;
    }
  });
}

export function isSafePublishedMediaUrlForBase(raw: string, configuredBase: string): boolean {
  try {
    const url = new URL(raw);
    const projectUrl = new URL(configuredBase);
    if (url.protocol !== 'https:' || projectUrl.protocol !== 'https:') return false;
    if (url.host !== projectUrl.host) return false;
    return url.pathname.startsWith('/storage/v1/object/public/content-media/');
  } catch {
    return false;
  }
}

export function isSafePublishedMediaUrl(raw: string): boolean {
  const configured = import.meta.env.VITE_SUPABASE_URL as string | undefined;
  if (!configured) return false;
  return isSafePublishedMediaUrlForBase(raw, configured);
}
