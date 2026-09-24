import { supabase } from './supabase';
import type { ContentMediaItem, ContentMediaPlacement } from '../types/contentMedia';
import { isSafeSlug, isSafeStoragePath } from '../utils/security';

export const DRAFT_MEDIA_BUCKET = 'content-media-drafts';
export const PUBLISHED_MEDIA_BUCKET = 'content-media';
const MAX_FILE_BYTES = 5 * 1024 * 1024;
const ALLOWED_MIME = new Set(['image/jpeg', 'image/png', 'image/webp']);

export type UploadDraftMediaArgs = {
  file: File;
  profileId: string;
  contentType: 'drug' | 'equipment' | 'fluid';
  folder: string;
  alt: string;
  placement: ContentMediaPlacement;
  order: number;
};

function extensionFor(file: File): 'jpg' | 'png' | 'webp' {
  if (file.type === 'image/png') return 'png';
  if (file.type === 'image/webp') return 'webp';
  return 'jpg';
}

export function validateImageFile(file: File): void {
  if (!ALLOWED_MIME.has(file.type)) throw new Error(`صيغة الصورة غير مدعومة: ${file.name}`);
  if (file.size <= 0 || file.size > MAX_FILE_BYTES) throw new Error(`الصورة أكبر من 5MB أو فارغة: ${file.name}`);
}

export async function uploadDraftMedia(args: UploadDraftMediaArgs): Promise<ContentMediaItem> {
  validateImageFile(args.file);
  const folder = isSafeSlug(args.folder) ? args.folder : `draft-${crypto.randomUUID()}`;
  const id = crypto.randomUUID();
  const path = `${args.profileId}/${args.contentType}/${folder}/${Date.now()}-${id}.${extensionFor(args.file)}`;
  if (!isSafeStoragePath(path)) throw new Error('مسار رفع الصورة غير صالح.');

  const { error: uploadError } = await supabase.storage
    .from(DRAFT_MEDIA_BUCKET)
    .upload(path, args.file, { contentType: args.file.type, upsert: false });
  if (uploadError) throw uploadError;

  const { data: signed, error: signedError } = await supabase.storage
    .from(DRAFT_MEDIA_BUCKET)
    .createSignedUrl(path, 60 * 60);
  if (signedError || !signed?.signedUrl) {
    await supabase.storage.from(DRAFT_MEDIA_BUCKET).remove([path]);
    throw signedError ?? new Error('تعذر إنشاء رابط معاينة آمن للصورة.');
  }

  return {
    id,
    bucket: DRAFT_MEDIA_BUCKET,
    path,
    url: signed.signedUrl,
    alt: args.alt,
    caption: '',
    placement: args.placement,
    order: args.order,
  };
}

export async function hydrateAdminMedia(items: ContentMediaItem[]): Promise<ContentMediaItem[]> {
  return Promise.all(items.map(async (item) => {
    if (!isSafeStoragePath(item.path)) return { ...item, url: '' };
    const bucket = item.bucket ?? PUBLISHED_MEDIA_BUCKET;
    if (bucket === DRAFT_MEDIA_BUCKET) {
      const { data, error } = await supabase.storage.from(DRAFT_MEDIA_BUCKET).createSignedUrl(item.path, 60 * 60);
      return { ...item, bucket, url: error ? '' : data?.signedUrl ?? '' };
    }
    const { data } = supabase.storage.from(PUBLISHED_MEDIA_BUCKET).getPublicUrl(item.path);
    return { ...item, bucket: PUBLISHED_MEDIA_BUCKET, url: data.publicUrl };
  }));
}

export async function removeAdminMedia(item: ContentMediaItem): Promise<void> {
  const bucket = item.bucket ?? PUBLISHED_MEDIA_BUCKET;
  if (bucket !== DRAFT_MEDIA_BUCKET) return;
  if (!isSafeStoragePath(item.path)) throw new Error('مسار الصورة غير صالح.');
  const { error } = await supabase.storage.from(DRAFT_MEDIA_BUCKET).remove([item.path]);
  if (error) throw error;
}

export type PromotedMediaResult = {
  media: ContentMediaItem[];
  draftPathsToCleanup: string[];
  publicPathsToRollback: string[];
};

export async function promoteMediaForPublish(
  items: ContentMediaItem[],
  profileId: string,
  contentType: 'drug' | 'equipment' | 'fluid',
  slug: string,
): Promise<PromotedMediaResult> {
  if (!isSafeSlug(slug)) throw new Error('المعرّف المختصر غير صالح للنشر.');
  const promoted: ContentMediaItem[] = [];
  const cleanup: string[] = [];
  const rollback: string[] = [];

  for (const item of items) {
    const bucket = item.bucket ?? PUBLISHED_MEDIA_BUCKET;
    if (bucket === PUBLISHED_MEDIA_BUCKET) {
      const { data } = supabase.storage.from(PUBLISHED_MEDIA_BUCKET).getPublicUrl(item.path);
      promoted.push({ ...item, bucket: PUBLISHED_MEDIA_BUCKET, url: data.publicUrl });
      continue;
    }
    if (bucket !== DRAFT_MEDIA_BUCKET || !isSafeStoragePath(item.path)) {
      throw new Error('إحدى الصور تحتوي مسارًا غير موثوق.');
    }

    const { data: blob, error: downloadError } = await supabase.storage.from(DRAFT_MEDIA_BUCKET).download(item.path);
    if (downloadError || !blob) throw downloadError ?? new Error('تعذر قراءة صورة المسودة قبل النشر.');

    const ext = item.path.split('.').pop()?.toLowerCase();
    const safeExt = ext === 'png' || ext === 'webp' ? ext : 'jpg';
    const publicPath = `${profileId}/${contentType}/${slug}/${Date.now()}-${crypto.randomUUID()}.${safeExt}`;
    const contentTypeHeader = safeExt === 'png' ? 'image/png' : safeExt === 'webp' ? 'image/webp' : 'image/jpeg';
    const { error: uploadError } = await supabase.storage
      .from(PUBLISHED_MEDIA_BUCKET)
      .upload(publicPath, blob, { contentType: contentTypeHeader, upsert: false });
    if (uploadError) throw uploadError;

    const { data: publicData } = supabase.storage.from(PUBLISHED_MEDIA_BUCKET).getPublicUrl(publicPath);
    promoted.push({ ...item, bucket: PUBLISHED_MEDIA_BUCKET, path: publicPath, url: publicData.publicUrl });
    cleanup.push(item.path);
    rollback.push(publicPath);
  }

  return { media: promoted, draftPathsToCleanup: cleanup, publicPathsToRollback: rollback };
}

export async function cleanupPromotedDraftMedia(paths: string[]): Promise<void> {
  const safe = paths.filter(isSafeStoragePath);
  if (!safe.length) return;
  await supabase.storage.from(DRAFT_MEDIA_BUCKET).remove(safe);
}

export async function rollbackPromotedPublicMedia(paths: string[]): Promise<void> {
  const safe = paths.filter(isSafeStoragePath);
  if (!safe.length) return;
  await supabase.storage.from(PUBLISHED_MEDIA_BUCKET).remove(safe);
}
