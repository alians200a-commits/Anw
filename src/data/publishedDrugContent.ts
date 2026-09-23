import { ANESTHESIA_DRUGS, type AnesthesiaDrug } from './drugs';
import { DRUG_DETAILS, type DrugDetail } from './drugDetails';
import { supabase } from '../lib/supabase';
import type { ContentMediaItem } from '../types/contentMedia';

export type RuntimeDrugContent = {
  drugs: AnesthesiaDrug[];
  details: Record<string, DrugDetail>;
  mediaByDrug: Record<string, ContentMediaItem[]>;
};

type PublishedDrugPayload = {
  schemaVersion?: number;
  drug?: unknown;
  details?: unknown;
  media?: unknown;
};

type PublishedDrugRow = {
  slug: string;
  payload: PublishedDrugPayload | null;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function isDrug(value: unknown): value is AnesthesiaDrug {
  if (!isRecord(value)) return false;
  return (
    typeof value.id === 'string' &&
    typeof value.en === 'string' &&
    typeof value.ar === 'string' &&
    typeof value.category === 'string' &&
    typeof value.categoryAr === 'string' &&
    Array.isArray(value.classes) &&
    typeof value.short === 'string' &&
    Array.isArray(value.tags)
  );
}

function isDetail(value: unknown): value is DrugDetail {
  if (!isRecord(value)) return false;
  return (
    typeof value.feature === 'string' &&
    Array.isArray(value.uses) &&
    Array.isArray(value.contraindications) &&
    Array.isArray(value.warnings) &&
    Array.isArray(value.adverseEffects)
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

export function localDrugContent(): RuntimeDrugContent {
  return {
    drugs: ANESTHESIA_DRUGS,
    details: DRUG_DETAILS,
    mediaByDrug: {},
  };
}

export async function loadPublishedDrugContent(): Promise<RuntimeDrugContent> {
  const fallback = localDrugContent();

  try {
    const { data, error } = await supabase
      .from('content_items')
      .select('slug,payload')
      .eq('content_type', 'drug')
      .eq('status', 'published');

    if (error || !data?.length) return fallback;

    const rows = data as PublishedDrugRow[];
    const publishedById = new Map<string, AnesthesiaDrug>();
    const publishedDetails: Record<string, DrugDetail> = {};
    const publishedMedia: Record<string, ContentMediaItem[]> = {};

    for (const row of rows) {
      const payload = row.payload;
      if (!payload || !isDrug(payload.drug) || !isDetail(payload.details)) continue;
      if (payload.drug.id !== row.slug) continue;

      publishedById.set(row.slug, payload.drug);
      publishedDetails[row.slug] = payload.details;
      publishedMedia[row.slug] = validMedia(payload.media);
    }

    if (publishedById.size === 0) return fallback;

    const localIds = new Set(ANESTHESIA_DRUGS.map((drug) => drug.id));
    const drugs = ANESTHESIA_DRUGS.map(
      (drug) => publishedById.get(drug.id) ?? drug,
    );

    const newPublished = [...publishedById.values()]
      .filter((drug) => !localIds.has(drug.id))
      .sort((a, b) => a.ar.localeCompare(b.ar, 'ar'));

    return {
      drugs: [...drugs, ...newPublished],
      details: { ...DRUG_DETAILS, ...publishedDetails },
      mediaByDrug: publishedMedia,
    };
  } catch {
    return fallback;
  }
}
