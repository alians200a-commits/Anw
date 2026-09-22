import { ANESTHESIA_DRUGS } from '../src/data/drugs';
import { DRUG_DETAILS } from '../src/data/drugDetails';

const errors: string[] = [];

const REVIEWED_BATCH_1 = new Set([
  'propofol',
  'thiopental',
  'etomidate',
  'ketamine',
  'sevoflurane',
  'isoflurane',
  'halothane',
  'nitrous-oxide',
  'methohexital',
  'enflurane',
  'desflurane'
]);

const hasIvRoute = (routes: string[] = []) =>
  routes.some((route) => /وريدي|intravenous|\biv\b/i.test(route));

const hasInhalationalRoute = (routes: string[] = []) =>
  routes.some((route) => /استنشاق|inhal/i.test(route));

const hasMeaningfulText = (value?: string) => Boolean(value?.trim());

for (const drug of ANESTHESIA_DRUGS) {
  const detail = DRUG_DETAILS[drug.id];

  if (!detail) {
    errors.push(`${drug.id}: missing DrugDetail`);
    continue;
  }

  if (!hasMeaningfulText(detail.feature)) errors.push(`${drug.id}: empty feature`);
  if (!hasMeaningfulText(detail.mechanism)) errors.push(`${drug.id}: missing mechanism`);
  if (!detail.routes?.length) errors.push(`${drug.id}: missing routes`);
  if (!detail.educationalDoses?.length) errors.push(`${drug.id}: missing educational dose/concentration reference`);
  if (!detail.uses?.length) errors.push(`${drug.id}: missing uses`);
  if (!detail.contraindications?.length) errors.push(`${drug.id}: missing contraindications`);
  if (!detail.warnings?.length) errors.push(`${drug.id}: missing warnings`);
  if (!detail.adverseEffects?.length) errors.push(`${drug.id}: missing adverse effects`);

  if (drug.classes.includes('intravenous') && !hasIvRoute(detail.routes)) {
    errors.push(`${drug.id}: classified intravenous but has no IV route`);
  }

  if (drug.classes.includes('inhalational') && !hasInhalationalRoute(detail.routes)) {
    errors.push(`${drug.id}: classified inhalational but has no inhalational route`);
  }

  if (drug.category === 'inhalational' && !drug.classes.includes('inhalational')) {
    errors.push(`${drug.id}: inhalational category missing inhalational class`);
  }

  const routeText = (detail.routes ?? []).join(' ');
  const ivOnly = hasIvRoute(detail.routes) && !hasInhalationalRoute(detail.routes);
  const inhalationalOnly = hasInhalationalRoute(detail.routes) && !hasIvRoute(detail.routes);

  if (ivOnly && /عامل\s+استنشاقي|inhaled\s+anesthetic|inhalational\s+anesthetic/i.test(detail.feature)) {
    errors.push(`${drug.id}: IV-only route conflicts with inhalational feature`);
  }

  if (inhalationalOnly && /عامل\s+تخدير\s+وريدي|intravenous\s+anesthetic/i.test(detail.feature)) {
    errors.push(`${drug.id}: inhalational route conflicts with IV feature`);
  }

  if (REVIEWED_BATCH_1.has(drug.id)) {
    if (!detail.onsetDuration?.length) {
      errors.push(`${drug.id}: reviewed Batch 1 drug missing onset/duration`);
    }
    if (!hasMeaningfulText(detail.clinicalNote)) {
      errors.push(`${drug.id}: reviewed Batch 1 drug missing clinicalNote`);
    }
  }

  // Keep this variable intentionally used for readable CI diagnostics.
  void routeText;
}

const allIds = new Set(ANESTHESIA_DRUGS.map((drug) => drug.id));
for (const id of Object.keys(DRUG_DETAILS)) {
  if (!allIds.has(id)) errors.push(`${id}: orphan DrugDetail`);
}

const onsetComplete = ANESTHESIA_DRUGS.filter(
  (drug) => DRUG_DETAILS[drug.id]?.onsetDuration?.length
).length;

const notesComplete = ANESTHESIA_DRUGS.filter(
  (drug) => DRUG_DETAILS[drug.id]?.clinicalNote?.trim()
).length;

if (errors.length) {
  console.error('\nDrug integrity audit failed:\n');
  for (const error of errors) console.error(`- ${error}`);
  throw new Error(`Drug integrity audit failed with ${errors.length} error(s).`);
}

console.log('Drug integrity audit passed.');
console.log(`Core completeness: ${ANESTHESIA_DRUGS.length}/${ANESTHESIA_DRUGS.length}`);
console.log(`Reviewed Batch 1: ${REVIEWED_BATCH_1.size}/${REVIEWED_BATCH_1.size}`);
console.log(`Onset/duration coverage: ${onsetComplete}/${ANESTHESIA_DRUGS.length}`);
console.log(`Clinical-note coverage: ${notesComplete}/${ANESTHESIA_DRUGS.length}`);
