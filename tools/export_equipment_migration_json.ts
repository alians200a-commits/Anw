import { mkdir, writeFile } from 'node:fs/promises';
import { ANESTHESIA_EQUIPMENT } from '../src/data/equipment';

const duplicateIds = ANESTHESIA_EQUIPMENT
  .map((item) => item.id)
  .filter((id, index, all) => all.indexOf(id) !== index);

if (duplicateIds.length > 0) {
  throw new Error(`Duplicate equipment ids: ${[...new Set(duplicateIds)].join(', ')}`);
}

const invalid = ANESTHESIA_EQUIPMENT.filter((item) =>
  !item.id || !item.nameAr || !item.nameEn || !item.summary || !Array.isArray(item.purpose) || !Array.isArray(item.keyPoints),
).map((item) => item.id || '(missing-id)');

if (invalid.length > 0) {
  throw new Error(`Invalid equipment records: ${invalid.join(', ')}`);
}

const rows = ANESTHESIA_EQUIPMENT.map((equipment) => ({
  content_type: 'equipment',
  slug: equipment.id,
  title_ar: equipment.nameAr,
  title_en: equipment.nameEn,
  status: 'draft',
  payload: {
    schemaVersion: 1,
    equipment,
    media: [],
  },
}));

await mkdir('migration', { recursive: true });
await writeFile(
  'migration/equipment-export.json',
  `${JSON.stringify({ schemaVersion: 1, count: rows.length, rows }, null, 2)}\n`,
  'utf8',
);

console.log(`Exported ${rows.length} equipment records.`);
