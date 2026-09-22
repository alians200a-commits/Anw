import { readFileSync } from 'node:fs';
import { ANESTHESIA_DRUGS } from '../src/data/drugs';
import { DRUG_DETAILS } from '../src/data/drugDetails';
import { CLINICAL_GUIDES } from '../src/data/clinicalGuides';
import { ANESTHESIA_STAGES } from '../src/data/anesthesiaStages';
import { ANESTHESIA_EQUIPMENT } from '../src/data/equipment';
import { INTRAVENOUS_FLUIDS } from '../src/data/fluids';
import { CLINICAL_TERMS } from '../src/data/clinicalTerms';

const errors: string[] = [];
const warnings: string[] = [];

const arabicPattern = /[\u0600-\u06FF]/;
const latinPattern = /[A-Za-z]/;
const forbiddenVisibleTerms = ['تحريض', 'محطة التخدير', 'محطات التخدير', 'Anesthesia Workstation'];

function nonEmpty(value: string | undefined): boolean {
  return Boolean(value?.trim());
}

function checkUnique<T extends { id: string }>(label: string, items: T[]) {
  const seen = new Set<string>();
  for (const item of items) {
    if (!nonEmpty(item.id)) errors.push(`${label}: empty id`);
    if (seen.has(item.id)) errors.push(`${label}: duplicate id "${item.id}"`);
    seen.add(item.id);
  }
}

function checkBilingualStored(label: string, context: string) {
  if (!label.includes('|')) return;
  const [first, ...rest] = label.split('|').map((part) => part.trim());
  const second = rest.join(' | ').trim();
  if (!arabicPattern.test(first) || !latinPattern.test(second)) {
    errors.push(`${context}: expected "العربي | English", got "${label}"`);
  }
}

function walkStrings(value: unknown, visit: (text: string) => void): void {
  if (typeof value === 'string') {
    visit(value);
    return;
  }
  if (Array.isArray(value)) {
    for (const item of value) walkStrings(item, visit);
    return;
  }
  if (value && typeof value === 'object') {
    for (const item of Object.values(value as Record<string, unknown>)) walkStrings(item, visit);
  }
}

checkUnique('drugs', ANESTHESIA_DRUGS);
checkUnique('clinical guides', CLINICAL_GUIDES);
checkUnique('anesthesia stages', ANESTHESIA_STAGES);
checkUnique('equipment', ANESTHESIA_EQUIPMENT);
checkUnique('fluids', INTRAVENOUS_FLUIDS);
checkUnique('clinical terms', CLINICAL_TERMS);

// Drugs: cross-layer identity only. Detailed pharmacology is enforced by drug_integrity_audit.ts.
const drugIds = new Set(ANESTHESIA_DRUGS.map((item) => item.id));
const detailIds = new Set(Object.keys(DRUG_DETAILS));
for (const drug of ANESTHESIA_DRUGS) {
  if (!nonEmpty(drug.ar) || !nonEmpty(drug.en)) errors.push(`drug "${drug.id}": missing Arabic/English name`);
  if (!nonEmpty(drug.short)) errors.push(`drug "${drug.id}": empty short description`);
  if (!drug.classes.length) errors.push(`drug "${drug.id}": no classes`);
  if (!drug.tags.length) errors.push(`drug "${drug.id}": no tags`);
  if (!detailIds.has(drug.id)) errors.push(`drug "${drug.id}": missing DrugDetail`);
}
for (const id of detailIds) {
  if (!drugIds.has(id)) errors.push(`orphan DrugDetail "${id}"`);
}

const REVIEWED_STAGE_GUIDES = new Set([
  'preoperative-assessment',
  'anesthesia-room-check',
  'premedication',
  'anesthesia-induction',
  'intravenous-induction',
  'inhalational-induction',
  'rapid-sequence-induction',
  'anesthesia-maintenance',
  'intraoperative-monitoring',
  'unconscious-patient-care',
  'anesthesia-recovery',
  'modified-aldrete',
  'extubation-readiness',
  'delayed-emergence'
]);

const REVIEWED_REGIONAL_GUIDES = new Set([
  'local-anesthesia',
  'last',
  'bier-block',
  'spinal-anesthesia',
  'epidural-anesthesia',
  'spinal-vs-epidural'
]);

const REVIEWED_AIRWAY_GUIDES = new Set([
  'vomiting-regurgitation-aspiration',
  'laryngospasm',
  'airway-obstruction',
  'apnea',
  'hypoxemia-cyanosis',
  'tracheal-intubation',
  'ett-placement-confirmation',
  'tracheal-intubation-complications'
]);

const REVIEWED_PERIOPERATIVE_GUIDES = new Set([
  'perioperative-blood-loss',
  'blood-transfusion-complications',
  'massive-transfusion',
  'acute-transfusion-reaction',
  'perioperative-hypotension',
  'perioperative-hypertension',
  'perioperative-arrhythmias',
  'heart-failure-anesthesia',
  'shock',
  'liver-disease-anesthesia'
]);

const REVIEWED_FOUNDATION_GUIDES = new Set([
  'types-of-anesthesia',
  'general-anesthesia-components',
  'guedel-stages',
  'neuromuscular-blocking-drugs',
  'benzodiazepines-in-anesthesia',
  'opioids-in-anesthesia',
  'pharmacokinetics',
  'pharmacodynamics',
  'anesthesia-history',
  'general-anesthesia-mechanisms',
  'minimum-alveolar-concentration',
  'respiratory-muscle-mechanics',
  'lung-volumes-capacities',
  'perioperative-fluid-calculations'
]);

const REVIEWED_CLINICAL_GUIDES = new Set([
  ...REVIEWED_STAGE_GUIDES,
  ...REVIEWED_REGIONAL_GUIDES,
  ...REVIEWED_AIRWAY_GUIDES,
  ...REVIEWED_PERIOPERATIVE_GUIDES,
  ...REVIEWED_FOUNDATION_GUIDES
]);

// Clinical guides.
const guideIds = new Set(CLINICAL_GUIDES.map((guide) => guide.id));
for (const guide of CLINICAL_GUIDES) {
  if (!nonEmpty(guide.titleAr) || !nonEmpty(guide.titleEn)) errors.push(`guide "${guide.id}": missing bilingual title`);
  if (!nonEmpty(guide.categoryAr)) errors.push(`guide "${guide.id}": missing categoryAr`);
  if (!nonEmpty(guide.summary)) errors.push(`guide "${guide.id}": empty summary`);
  if (!guide.sourcePages.length) errors.push(`guide "${guide.id}": missing internal sourcePages`);
  if (!guide.tags.length) errors.push(`guide "${guide.id}": no tags`);
  if (REVIEWED_CLINICAL_GUIDES.has(guide.id) && guide.correction?.trim() && !nonEmpty(guide.clinicalNote)) {
    errors.push(`clinical guide "${guide.id}": reviewed correction missing clinicalNote`);
  }
  if (['neuromuscular-blocking-drugs','benzodiazepines-in-anesthesia','opioids-in-anesthesia','minimum-alveolar-concentration','perioperative-fluid-calculations'].includes(guide.id) && !nonEmpty(guide.clinicalNote)) {
    errors.push(`clinical guide "${guide.id}": reviewed foundation safety guide missing clinicalNote`);
  }
  if (REVIEWED_AIRWAY_GUIDES.has(guide.id) && !nonEmpty(guide.clinicalNote)) {
    errors.push(`clinical guide "${guide.id}": reviewed airway guide missing clinicalNote`);
  }
  if (REVIEWED_PERIOPERATIVE_GUIDES.has(guide.id) && !nonEmpty(guide.clinicalNote)) {
    errors.push(`clinical guide "${guide.id}": reviewed perioperative guide missing clinicalNote`);
  }
  if (!guide.sections.length) errors.push(`guide "${guide.id}": no sections`);

  for (const section of guide.sections) {
    if (!nonEmpty(section.title)) errors.push(`guide "${guide.id}": empty section title`);
    checkBilingualStored(section.title, `guide "${guide.id}" section`);
    if (!section.items.length) errors.push(`guide "${guide.id}" / "${section.title}": no items`);
    section.items.forEach((item, index) => {
      if (!nonEmpty(item)) errors.push(`guide "${guide.id}" / "${section.title}": empty item #${index + 1}`);
    });
  }
}

// Stages and references.
const stageNumbers = new Set<string>();
const stageGuideRefs = new Set<string>();
for (const stage of ANESTHESIA_STAGES) {
  if (!nonEmpty(stage.titleAr) || !nonEmpty(stage.titleEn)) errors.push(`stage "${stage.id}": missing bilingual title`);
  if (!nonEmpty(stage.number)) errors.push(`stage "${stage.id}": missing number`);
  if (stageNumbers.has(stage.number)) errors.push(`stage: duplicate number "${stage.number}"`);
  stageNumbers.add(stage.number);
  if (!stage.guideIds.length) errors.push(`stage "${stage.id}": no guideIds`);

  for (const guideId of stage.guideIds) {
    if (!guideIds.has(guideId)) errors.push(`stage "${stage.id}": missing guide "${guideId}"`);
    if (stageGuideRefs.has(guideId)) errors.push(`stage guide "${guideId}" assigned more than once`);
    stageGuideRefs.add(guideId);
  }
}

const REVIEWED_EQUIPMENT_BATCH_1 = new Set([
  'anesthesia-workstation',
  'medical-gas-cylinders',
  'oxygen-flush-valve',
  'oxygen-supply-failure-alarm',
  'pressure-regulator',
  'flowmeter',
  'vaporizer',
  'co2-absorber',
  'humidification',
  'corrugated-breathing-tube',
  'reservoir-bag',
  'apl-valve',
  'mapleson-a',
  'ayre-t-piece',
  'anesthesia-ventilator'
]);

const REVIEWED_EQUIPMENT_BATCH_2 = new Set([
  'simple-face-mask',
  'non-rebreather-mask',
  'nasal-cannula',
  'tracheostomy-mask',
  'oropharyngeal-airway',
  'endotracheal-tube',
  'airway-stylet',
  'magill-forceps',
  'laryngoscope',
  'laryngeal-mask-airway',
  'self-inflating-bag',
  'capnograph',
  'ecg-monitor',
  'nibp-monitor',
  'temperature-monitor',
  'pulse-oximeter'
]);

const REVIEWED_EQUIPMENT_BATCH_3 = new Set([
  'suction-apparatus'
]);

const REVIEWED_EQUIPMENT = new Set([
  ...REVIEWED_EQUIPMENT_BATCH_1,
  ...REVIEWED_EQUIPMENT_BATCH_2,
  ...REVIEWED_EQUIPMENT_BATCH_3
]);

// Equipment.
for (const item of ANESTHESIA_EQUIPMENT) {
  if (!nonEmpty(item.nameAr) || !nonEmpty(item.nameEn)) errors.push(`equipment "${item.id}": missing bilingual name`);
  if (!nonEmpty(item.categoryAr)) errors.push(`equipment "${item.id}": missing categoryAr`);
  if (!nonEmpty(item.summary)) errors.push(`equipment "${item.id}": empty summary`);
  if (!item.sourcePages.length) errors.push(`equipment "${item.id}": missing internal sourcePages`);
  if (!item.purpose.length) errors.push(`equipment "${item.id}": no purpose`);
  if (!item.keyPoints.length) errors.push(`equipment "${item.id}": no keyPoints`);
  if (!item.tags.length) errors.push(`equipment "${item.id}": no tags`);
  item.purpose.forEach((value) => checkBilingualStored(value, `equipment "${item.id}" purpose`));
  if (REVIEWED_EQUIPMENT.has(item.id) && item.correction?.trim() && !nonEmpty(item.clinicalNote)) {
    errors.push(`equipment "${item.id}": reviewed correction missing clinicalNote`);
  }
}

// Fluids.
for (const fluid of INTRAVENOUS_FLUIDS) {
  if (!nonEmpty(fluid.nameAr) || !nonEmpty(fluid.nameEn)) errors.push(`fluid "${fluid.id}": missing bilingual name`);
  if (!nonEmpty(fluid.categoryAr)) errors.push(`fluid "${fluid.id}": missing categoryAr`);
  checkBilingualStored(fluid.categoryAr, `fluid "${fluid.id}" categoryAr`);
  if (!nonEmpty(fluid.composition)) errors.push(`fluid "${fluid.id}": empty composition`);
  if (!fluid.sourcePages.length) errors.push(`fluid "${fluid.id}": missing internal sourcePages`);
  if (!fluid.role.length) errors.push(`fluid "${fluid.id}": no role`);
  if (!fluid.cautions.length) errors.push(`fluid "${fluid.id}": no cautions`);
  if (!fluid.tags.length) errors.push(`fluid "${fluid.id}": no tags`);
  if (!nonEmpty(fluid.clinicalNote)) errors.push(`fluid "${fluid.id}": reviewed fluid missing clinicalNote`);
}

// Terms and abbreviations share one dataset.
for (const term of CLINICAL_TERMS) {
  if (!nonEmpty(term.ar) || !nonEmpty(term.en)) errors.push(`term "${term.id}": missing Arabic/English name`);
  if (!nonEmpty(term.definition)) errors.push(`term "${term.id}": empty definition`);
  if (!term.tags.length) errors.push(`term "${term.id}": no tags`);
  if (term.abbr !== undefined && !nonEmpty(term.abbr)) errors.push(`term "${term.id}": blank abbreviation`);
}

// Visible terminology must remain locked across all user-visible datasets.
const visibleData = [
  ANESTHESIA_DRUGS,
  DRUG_DETAILS,
  CLINICAL_GUIDES,
  ANESTHESIA_STAGES,
  ANESTHESIA_EQUIPMENT,
  INTRAVENOUS_FLUIDS,
  CLINICAL_TERMS
];

walkStrings(visibleData, (text) => {
  for (const forbidden of forbiddenVisibleTerms) {
    if (text.includes(forbidden)) errors.push(`forbidden visible term "${forbidden}" found: "${text}"`);
  }
});

// UI contract: source/provenance and raw correction metadata are internal only.
const userFacingComponents = [
  'src/components/DrugDetailSheet.tsx',
  'src/components/ClinicalGuidesDirectory.tsx',
  'src/components/AnesthesiaStagesDirectory.tsx',
  'src/components/EquipmentDirectory.tsx',
  'src/components/FluidsDirectory.tsx',
  'src/components/TermsDirectory.tsx',
  'src/components/AbbreviationsDirectory.tsx',
  'src/components/FavoritesScreen.tsx',
  'src/components/HomeScreen.tsx',
  'src/components/GuideScreen.tsx'
];

for (const path of userFacingComponents) {
  const code = readFileSync(path, 'utf8');
  if (/\.sourceLabel\b|\.sourcePages\b/.test(code)) errors.push(`${path}: renders/reads internal source metadata`);
  if (/\.correction\b/.test(code)) errors.push(`${path}: renders raw internal correction metadata`);
}

const mixedDirectionSurfaces = [
  'src/components/DrugDetailSheet.tsx',
  'src/components/ClinicalGuidesDirectory.tsx',
  'src/components/AnesthesiaStagesDirectory.tsx',
  'src/components/EquipmentDirectory.tsx',
  'src/components/FluidsDirectory.tsx',
  'src/components/TermsDirectory.tsx',
  'src/components/AbbreviationsDirectory.tsx',
  'src/components/FavoritesScreen.tsx'
];

for (const path of mixedDirectionSurfaces) {
  const code = readFileSync(path, 'utf8');
  if (!code.includes('MixedDirectionText')) errors.push(`${path}: mixed Arabic/English body text is not direction-isolated`);
}

// Core detail surfaces must use the bidi-safe bilingual component.
for (const path of [
  'src/components/DrugDetailSheet.tsx',
  'src/components/ClinicalGuidesDirectory.tsx',
  'src/components/AnesthesiaStagesDirectory.tsx',
  'src/components/EquipmentDirectory.tsx',
  'src/components/FluidsDirectory.tsx',
  'src/components/TermsDirectory.tsx',
  'src/components/AbbreviationsDirectory.tsx',
  'src/components/FavoritesScreen.tsx'
]) {
  const code = readFileSync(path, 'utf8');
  if (!code.includes('BilingualLabel')) errors.push(`${path}: missing BilingualLabel integration`);
}

// Native select options must not contain mixed-direction raw pipe labels.
const guideScreen = readFileSync('src/components/GuideScreen.tsx', 'utf8');
if (/<option[^>]*>[^<]*\|[^<]*<\/option>/.test(guideScreen)) {
  errors.push('GuideScreen: native <option> contains raw bilingual pipe label');
}

// Search and Favorites behavior are protected as functional contracts.
const appCode = readFileSync('src/App.tsx', 'utf8');
const homeCode = readFileSync('src/components/HomeScreen.tsx', 'utf8');
const favoritesCode = readFileSync('src/components/FavoritesScreen.tsx', 'utf8');

if (!appCode.includes('initialQuery={guideQuery}')) errors.push('App: guide deep-link query contract missing');
if (!homeCode.includes("openGuide('drugs', 'all', drug.en)")) errors.push('Home search: drug deep-link missing');
if (!homeCode.includes("openGuide('clinical', 'all', guide.titleEn)")) errors.push('Home search: clinical deep-link missing');
if (!homeCode.includes("openGuide('stages', 'all', guide.titleEn)")) errors.push('Home search: stage deep-link missing');
if (!favoritesCode.includes('<DrugDetailSheet')) errors.push('Favorites: saved drug no longer opens DrugDetailSheet');
if (!favoritesCode.includes("onToggleFavorite('drug:' + drug.id)")) errors.push('Favorites: separate drug remove control missing');

// Track hidden corrections that still require domain-by-domain review.
const hiddenCorrections = {
  clinicalGuides: CLINICAL_GUIDES.filter((item) => item.correction?.trim() && !item.clinicalNote?.trim()).length,
  equipment: ANESTHESIA_EQUIPMENT.filter((item) => item.correction?.trim() && !item.clinicalNote?.trim()).length,
  fluids: INTRAVENOUS_FLUIDS.filter((item) => item.correction?.trim() && !item.clinicalNote?.trim()).length
};
if (hiddenCorrections.clinicalGuides) warnings.push(`Clinical guide corrections awaiting reviewed clinical-note integration: ${hiddenCorrections.clinicalGuides}`);
if (hiddenCorrections.equipment) warnings.push(`Equipment corrections awaiting reviewed clinical-note integration: ${hiddenCorrections.equipment}`);
if (hiddenCorrections.fluids) warnings.push(`Fluid corrections awaiting reviewed clinical-note integration: ${hiddenCorrections.fluids}`);

if (errors.length) {
  console.error('\nApp integrity audit failed:\n');
  errors.forEach((error) => console.error(`- ${error}`));
  throw new Error(`App integrity audit failed with ${errors.length} error(s).`);
}

console.log('App integrity audit passed.');
console.log(`Drugs: ${ANESTHESIA_DRUGS.length}`);
console.log(`Clinical guides: ${CLINICAL_GUIDES.length}`);
console.log(`Reviewed clinical guides: ${REVIEWED_CLINICAL_GUIDES.size}/${CLINICAL_GUIDES.length} (stages: ${REVIEWED_STAGE_GUIDES.size}, regional: ${REVIEWED_REGIONAL_GUIDES.size}, airway: ${REVIEWED_AIRWAY_GUIDES.size}, perioperative: ${REVIEWED_PERIOPERATIVE_GUIDES.size}, foundation: ${REVIEWED_FOUNDATION_GUIDES.size})`);
console.log(`Stage guide references: ${stageGuideRefs.size}`);
console.log(`Equipment: ${ANESTHESIA_EQUIPMENT.length}`);
console.log(`Reviewed equipment: ${REVIEWED_EQUIPMENT.size}/${ANESTHESIA_EQUIPMENT.length}`);
console.log(`Fluids: ${INTRAVENOUS_FLUIDS.length}`);
console.log(`Clinical terms/abbreviations: ${CLINICAL_TERMS.length}`);
warnings.forEach((warning) => console.warn(`WARN: ${warning}`));
