import { ANESTHESIA_DRUGS } from '../src/data/drugs';
import { DRUG_DETAILS } from '../src/data/drugDetails';
import { CLINICAL_GUIDES } from '../src/data/clinicalGuides';
import { ANESTHESIA_STAGES } from '../src/data/anesthesiaStages';
import { ANESTHESIA_EQUIPMENT } from '../src/data/equipment';
import { INTRAVENOUS_FLUIDS } from '../src/data/fluids';
import { CLINICAL_TERMS } from '../src/data/clinicalTerms';

type Named = { id: string };

const errors: string[] = [];

function checkUnique(label: string, items: Named[]) {
  const seen = new Set<string>();
  for (const item of items) {
    if (!item.id.trim()) errors.push(`${label}: empty id`);
    if (seen.has(item.id)) errors.push(`${label}: duplicate id "${item.id}"`);
    seen.add(item.id);
  }
}

function walkStrings(value: unknown, visit: (text: string) => void): void {
  if (typeof value === 'string') {
    visit(value);
    return;
  }
  if (Array.isArray(value)) {
    value.forEach((item) => walkStrings(item, visit));
    return;
  }
  if (value && typeof value === 'object') {
    Object.values(value as Record<string, unknown>).forEach((item) => walkStrings(item, visit));
  }
}

const arabicPattern = /[\u0600-\u06FF]/;
const latinPattern = /[A-Za-z]/;

function checkBilingualTitle(label: string, context: string) {
  if (!label.includes('|')) return;

  const [first, ...rest] = label.split('|').map((part) => part.trim());
  const second = rest.join(' | ').trim();

  if (!arabicPattern.test(first) || !latinPattern.test(second)) {
    errors.push(
      `${context}: bilingual title must be stored as "العربي | English", got "${label}"`
    );
  }
}

checkUnique('drugs', ANESTHESIA_DRUGS);
checkUnique('clinical guides', CLINICAL_GUIDES);
checkUnique('equipment', ANESTHESIA_EQUIPMENT);
checkUnique('fluids', INTRAVENOUS_FLUIDS);
checkUnique('clinical terms', CLINICAL_TERMS);

const drugIds = new Set(ANESTHESIA_DRUGS.map((drug) => drug.id));
const detailIds = new Set(Object.keys(DRUG_DETAILS));

for (const id of drugIds) {
  const detail = DRUG_DETAILS[id];
  if (!detail) {
    errors.push(`drug "${id}" has no DRUG_DETAILS entry`);
    continue;
  }

  if (!detail.feature.trim()) errors.push(`drug "${id}" has empty feature`);
  if (!detail.uses.length) errors.push(`drug "${id}" has no uses`);
  if (!detail.contraindications.length) errors.push(`drug "${id}" has no contraindications`);
  if (!detail.warnings.length) errors.push(`drug "${id}" has no warnings`);
  if (!detail.adverseEffects.length) errors.push(`drug "${id}" has no adverse effects`);
  if (!detail.sourcePages?.length) errors.push(`drug "${id}" has no sourcePages`);

  const sourceRequiresDose =
    detail.sourceLabel?.includes('ملف كتابة أدوية التخدير') ||
    detail.sourceLabel?.includes('أدوية الطوارئ');
  if (sourceRequiresDose && !detail.educationalDoses?.length) {
    errors.push(`drug "${id}" is sourced from an anesthesia/emergency drug file but has no educationalDoses`);
  }

  const routeText = (detail.routes ?? []).join(' ').toLowerCase();
  const hasIvRoute = /وريدي|intravenous|\biv\b/.test(routeText);
  const hasNonIvRoute = /استنشاق|inhal|فموي|oral|عضلي|intramuscular|im\b|موضعي|topical|neuraxial|epidural|spinal/.test(routeText);
  const featureLooksInhalational = /عامل\s+استنشاقي|inhalational\s+anesthetic|inhaled\s+anesthetic/.test(detail.feature.toLowerCase());

  if (hasIvRoute && !hasNonIvRoute && featureLooksInhalational) {
    errors.push(`drug "${id}" is IV-only but its feature describes it as inhalational`);
  }
}

for (const id of detailIds) {
  if (!drugIds.has(id)) errors.push(`orphan DRUG_DETAILS entry "${id}"`);
}

const guideIds = new Set(CLINICAL_GUIDES.map((guide) => guide.id));
const stageRefs = new Set<string>();

for (const stage of ANESTHESIA_STAGES) {
  if (!stage.guideIds.length) errors.push(`anesthesia stage "${stage.id}" has no guideIds`);
  for (const guideId of stage.guideIds) {
    if (!guideIds.has(guideId)) {
      errors.push(`anesthesia stage "${stage.id}" references missing guide "${guideId}"`);
    }
    if (stageRefs.has(guideId)) {
      errors.push(`guide "${guideId}" is assigned to more than one anesthesia stage`);
    }
    stageRefs.add(guideId);
  }
}

for (const guide of CLINICAL_GUIDES) {
  if (!guide.sourcePages.length) errors.push(`clinical guide "${guide.id}" has no sourcePages`);
  if (!guide.sections.length) errors.push(`clinical guide "${guide.id}" has no sections`);
  for (const section of guide.sections) {
    if (!section.title.trim()) errors.push(`clinical guide "${guide.id}" has a section with empty title`);
    checkBilingualTitle(section.title, `clinical guide "${guide.id}" section title`);
    if (!section.items.length) errors.push(`clinical guide "${guide.id}" section "${section.title}" has no items`);
  }
}

for (const item of ANESTHESIA_EQUIPMENT) {
  if (!item.sourcePages.length) errors.push(`equipment "${item.id}" has no sourcePages`);
  if (!item.purpose.length) errors.push(`equipment "${item.id}" has no purpose`);
  if (!item.keyPoints.length) errors.push(`equipment "${item.id}" has no keyPoints`);
}

for (const fluid of INTRAVENOUS_FLUIDS) {
  if (!fluid.sourcePages.length) errors.push(`fluid "${fluid.id}" has no sourcePages`);
  if (!fluid.role.length) errors.push(`fluid "${fluid.id}" has no role items`);
  if (!fluid.cautions.length) errors.push(`fluid "${fluid.id}" has no cautions`);
}

const forbiddenArabic = ['تحريض', 'محطة التخدير', 'محطات التخدير'];
const visibleCollections = [
  ANESTHESIA_DRUGS,
  DRUG_DETAILS,
  CLINICAL_GUIDES,
  ANESTHESIA_STAGES,
  ANESTHESIA_EQUIPMENT,
  INTRAVENOUS_FLUIDS,
  CLINICAL_TERMS
];

walkStrings(visibleCollections, (text) => {
  for (const term of forbiddenArabic) {
    if (text.includes(term)) errors.push(`forbidden Arabic term "${term}" found in visible content: "${text}"`);
  }
});

if (errors.length) {
  console.error('\nContent audit failed:\n');
  for (const error of errors) console.error(`- ${error}`);
  throw new Error(`Content audit failed with ${errors.length} error(s).`);
}

console.log('Content audit passed.');
console.log(`Drugs: ${ANESTHESIA_DRUGS.length} / details: ${detailIds.size}`);
console.log(`Clinical guides: ${CLINICAL_GUIDES.length}`);
console.log(`Anesthesia stage references: ${stageRefs.size}`);
console.log(`Equipment: ${ANESTHESIA_EQUIPMENT.length}`);
console.log(`Fluids: ${INTRAVENOUS_FLUIDS.length}`);
console.log(`Clinical terms: ${CLINICAL_TERMS.length}`);
