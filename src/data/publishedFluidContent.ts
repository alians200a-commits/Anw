import { INTRAVENOUS_FLUIDS, type IntravenousFluid } from './fluids';
import { supabase } from '../lib/supabase';
import type { ContentMediaItem } from '../types/contentMedia';

export type RuntimeFluidContent = {
  items: IntravenousFluid[];
  mediaByFluid: Record<string, ContentMediaItem[]>;
};

type PublishedFluidPayload = {
  schemaVersion?: number;
  fluid?: unknown;
  media?: unknown;
};

type PublishedFluidRow = {
  slug: string;
  payload: PublishedFluidPayload | null;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function isFluid(value: unknown): value is IntravenousFluid {
  if (!isRecord(value)) return false;
  return (
    typeof value.id === 'string' &&
    typeof value.nameAr === 'string' &&
    typeof value.nameEn === 'string' &&
    typeof value.category === 'string' &&
    typeof value.categoryAr === 'string' &&
    Array.isArray(value.sourcePages) &&
    typeof value.composition === 'string' &&
    Array.isArray(value.role) &&
    Array.isArray(value.cautions) &&
    Array.isArray(value.tags)
  );
}

function validMedia(value: unknown): ContentMediaItem[] {
  if (!Array.isArray(value)) return [];
  return value.filter((item): item is ContentMediaItem => {
    if (!isRecord(item)) return false;
    return (
      typeof item.id === 'string' &&
      typeof item.path === 'string' &&
      typeof item.url === 'string' &&
      typeof item.alt === 'string' &&
      typeof item.placement === 'string' &&
      typeof item.order === 'number'
    );
  });
}

export function localFluidContent(): RuntimeFluidContent {
  return { items: INTRAVENOUS_FLUIDS, mediaByFluid: {} };
}

export async function loadPublishedFluidContent(): Promise<RuntimeFluidContent> {
  const fallback = localFluidContent();
  try {
    const { data, error } = await supabase
      .from('published_content_items')
      .select('slug,payload')
      .eq('content_type', 'fluid');

    if (error || !data?.length) return fallback;

    const publishedById = new Map<string, IntravenousFluid>();
    const publishedMedia: Record<string, ContentMediaItem[]> = {};
    for (const row of data as PublishedFluidRow[]) {
      const payload = row.payload;
      if (!payload || payload.schemaVersion !== 1 || !isFluid(payload.fluid)) continue;
      if (payload.fluid.id !== row.slug) continue;
      publishedById.set(row.slug, payload.fluid);
      publishedMedia[row.slug] = validMedia(payload.media);
    }

    if (publishedById.size === 0) return fallback;

    const localIds = new Set(INTRAVENOUS_FLUIDS.map((item) => item.id));
    const items = INTRAVENOUS_FLUIDS.map((item) => publishedById.get(item.id) ?? item);
    const newPublished = [...publishedById.values()]
      .filter((item) => !localIds.has(item.id))
      .sort((a, b) => a.nameAr.localeCompare(b.nameAr, 'ar'));

    return { items: [...items, ...newPublished], mediaByFluid: publishedMedia };
  } catch {
    return fallback;
  }
}
