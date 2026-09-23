import { mkdir, writeFile } from 'node:fs/promises';
import { ANESTHESIA_DRUGS } from '../src/data/drugs';
import { DRUG_DETAILS } from '../src/data/drugDetails';

const duplicateIds = ANESTHESIA_DRUGS.map((drug) => drug.id).filter((id, index, all) => all.indexOf(id) !== index);
if (duplicateIds.length > 0) {
  throw new Error(`Duplicate drug ids: ${[...new Set(duplicateIds)].join(', ')}`);
}

const missingDetails = ANESTHESIA_DRUGS.filter((drug) => !DRUG_DETAILS[drug.id]).map((drug) => drug.id);
if (missingDetails.length > 0) {
  throw new Error(`Drugs missing details: ${missingDetails.join(', ')}`);
}

const rows = ANESTHESIA_DRUGS.map((drug) => ({
  content_type: 'drug',
  slug: drug.id,
  title_ar: drug.ar,
  title_en: drug.en,
  status: 'draft',
  payload: {
    schemaVersion: 1,
    drug,
    details: DRUG_DETAILS[drug.id],
    media: [],
  },
}));

await mkdir('migration', { recursive: true });
await writeFile(
  'migration/drugs-export.json',
  `${JSON.stringify({ schemaVersion: 1, count: rows.length, rows }, null, 2)}\n`,
  'utf8',
);

console.log(`Exported ${rows.length} drug records.`);
