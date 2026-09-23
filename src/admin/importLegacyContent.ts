import { DRUG_DETAILS } from '../data/drugDetails';
import { ANESTHESIA_DRUGS } from '../data/drugs';
import { supabase } from '../lib/supabase';

export async function importLegacyDrugs() {
  const rows = ANESTHESIA_DRUGS.map((drug) => ({
    content_type: 'drug',
    slug: drug.id,
    title_ar: drug.ar,
    title_en: drug.en,
    status: 'published' as const,
    payload: {
      ...drug,
      details: DRUG_DETAILS[drug.id] ?? null,
      migrationSource: 'legacy-typescript',
    },
  }));

  const { data, error } = await supabase
    .from('content_items')
    .upsert(rows, { onConflict: 'content_type,slug' })
    .select('id,slug,version,status');

  if (error) throw error;

  return {
    expected: rows.length,
    imported: data?.length ?? 0,
  };
}
