import {
  ANESTHESIA_EQUIPMENT,
  type AnesthesiaEquipment,
} from './equipment';
import { supabase } from '../lib/supabase';
import type { ContentMediaItem } from '../types/contentMedia';

export type RuntimeEquipmentContent = {
  items: AnesthesiaEquipment[];
  mediaByEquipment: Record<string, ContentMediaItem[]>;
};

type PublishedEquipmentPayload = {
  schemaVersion?: number;
  equipment?: unknown;
  media?: unknown;
};

type PublishedEquipmentRow = {
  slug: string;
  payload: PublishedEquipmentPayload | null;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function isEquipment(value: unknown): value is AnesthesiaEquipment {
  if (!isRecord(value)) return false;
  return (
    typeof value.id === 'string' &&
    typeof value.nameAr === 'string' &&
    typeof value.nameEn === 'string' &&
    typeof value.category === 'string' &&
    typeof value.categoryAr === 'string' &&
    Array.isArray(value.sourcePages) &&
    typeof value.summary === 'string' &&
    Array.isArray(value.purpose) &&
    Array.isArray(value.keyPoints) &&
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

export function localEquipmentContent(): RuntimeEquipmentContent {
  return {
    items: ANESTHESIA_EQUIPMENT,
    mediaByEquipment: {},
  };
}

export async function loadPublishedEquipmentContent(): Promise<RuntimeEquipmentContent> {
  const fallback = localEquipmentContent();

  try {
    const { data, error } = await supabase
      .from('published_content_items')
      .select('slug,payload')
      .eq('content_type', 'equipment');

    if (error || !data?.length) return fallback;

    const rows = data as PublishedEquipmentRow[];
    const publishedById = new Map<string, AnesthesiaEquipment>();
    const publishedMedia: Record<string, ContentMediaItem[]> = {};

    for (const row of rows) {
      const payload = row.payload;
      if (!payload || payload.schemaVersion !== 1 || !isEquipment(payload.equipment)) continue;
      if (payload.equipment.id !== row.slug) continue;
      publishedById.set(row.slug, payload.equipment);
      publishedMedia[row.slug] = validMedia(payload.media);
    }

    if (publishedById.size === 0) return fallback;

    const localIds = new Set(ANESTHESIA_EQUIPMENT.map((item) => item.id));
    const items = ANESTHESIA_EQUIPMENT.map(
      (item) => publishedById.get(item.id) ?? item,
    );
    const newPublished = [...publishedById.values()]
      .filter((item) => !localIds.has(item.id))
      .sort((a, b) => a.nameAr.localeCompare(b.nameAr, 'ar'));

    return {
      items: [...items, ...newPublished],
      mediaByEquipment: publishedMedia,
    };
  } catch {
    return fallback;
  }
}
