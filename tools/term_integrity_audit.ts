import { CLINICAL_TERMS } from '../src/data/clinicalTerms';

const errors: string[] = [];
const arabicPattern = /[\u0600-\u06FF]/;
const latinPattern = /[A-Za-z]/;
const forbidden = ['تحريض', 'محطة التخدير', 'محطات التخدير', 'Anesthesia Workstation'];

function normalize(value: string) {
  return value.trim().toLowerCase().replace(/\s+/g, ' ');
}

function duplicateMap(label: string, values: Array<{ id: string; value?: string }>) {
  const seen = new Map<string, string>();
  for (const item of values) {
    if (!item.value?.trim()) continue;
    const key = normalize(item.value);
    const previous = seen.get(key);
    if (previous) errors.push(`${label}: duplicate "${item.value}" in "${previous}" and "${item.id}"`);
    else seen.set(key, item.id);
  }
}

duplicateMap('id', CLINICAL_TERMS.map((item) => ({ id: item.id, value: item.id })));
duplicateMap('English term', CLINICAL_TERMS.map((item) => ({ id: item.id, value: item.en })));
duplicateMap('Arabic term', CLINICAL_TERMS.map((item) => ({ id: item.id, value: item.ar })));
duplicateMap('abbreviation', CLINICAL_TERMS.map((item) => ({ id: item.id, value: item.abbr })));

for (const term of CLINICAL_TERMS) {
  if (!term.id.trim()) errors.push('term with empty id');
  if (!term.en.trim() || !latinPattern.test(term.en)) errors.push(`${term.id}: invalid/missing English term "${term.en}"`);
  if (!term.ar.trim() || !arabicPattern.test(term.ar)) errors.push(`${term.id}: invalid/missing Arabic term "${term.ar}"`);
  if (term.en.includes('|') || term.ar.includes('|')) errors.push(`${term.id}: raw bilingual pipe belongs in body text, not the name fields`);
  if (!term.definition.trim() || term.definition.trim().length < 12) errors.push(`${term.id}: definition is empty/too short`);
  if (!term.tags.length) errors.push(`${term.id}: no search tags`);

  const localTags = new Set<string>();
  for (const tag of term.tags) {
    if (!tag.trim()) errors.push(`${term.id}: blank tag`);
    const key = normalize(tag);
    if (localTags.has(key)) errors.push(`${term.id}: duplicate tag "${tag}"`);
    localTags.add(key);
  }

  if (term.abbr !== undefined) {
    if (!term.abbr.trim()) errors.push(`${term.id}: blank abbreviation`);
    if (term.abbr.includes('|')) errors.push(`${term.id}: abbreviation contains raw pipe`);
    if (term.abbr.length > 20) errors.push(`${term.id}: suspiciously long abbreviation "${term.abbr}"`);
  }

  if (term.category === 'critical' && !term.clinicalNote?.trim()) {
    errors.push(`${term.id}: critical term missing clinicalNote`);
  }

  const visible = [term.en, term.ar, term.definition, term.clinicalNote ?? '', ...term.tags].join(' ');
  for (const value of forbidden) {
    if (visible.includes(value)) errors.push(`${term.id}: forbidden visible term "${value}"`);
  }
}

const withAbbreviation = CLINICAL_TERMS.filter((term) => term.abbr?.trim()).length;
const withClinicalNote = CLINICAL_TERMS.filter((term) => term.clinicalNote?.trim()).length;
const criticalCount = CLINICAL_TERMS.filter((term) => term.category === 'critical').length;

if (errors.length) {
  console.error('\nTerm integrity audit failed:\n');
  errors.forEach((error) => console.error(`- ${error}`));
  throw new Error(`Term integrity audit failed with ${errors.length} error(s).`);
}

console.log('Term integrity audit passed.');
console.log(`Terms/abbreviations: ${CLINICAL_TERMS.length}`);
console.log(`With abbreviations: ${withAbbreviation}`);
console.log(`With clinical notes: ${withClinicalNote}`);
console.log(`Critical terms: ${criticalCount}`);
