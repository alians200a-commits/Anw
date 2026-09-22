import { CLINICAL_TERMS, SUX_APNOEA_DATA, QUIZ_QUESTIONS, CLINICAL_SCENARIO } from '../src/data/clinicalTerms';

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

// Quiz / scenario / Suxamethonium-apnoea integrity.
const quizIds = new Set<string>();
for (const question of QUIZ_QUESTIONS) {
  if (!question.id.trim()) errors.push('quiz: empty question id');
  if (quizIds.has(question.id)) errors.push(`quiz: duplicate question id "${question.id}"`);
  quizIds.add(question.id);
  if (!question.question.trim()) errors.push(`quiz "${question.id}": empty question`);
  if (question.options.length < 2) errors.push(`quiz "${question.id}": fewer than 2 options`);
  if (question.correctIndex < 0 || question.correctIndex >= question.options.length) {
    errors.push(`quiz "${question.id}": correctIndex out of range`);
  }
  if (question.options.some((option) => !option.trim())) errors.push(`quiz "${question.id}": blank option`);
  if (!question.explanation.trim()) errors.push(`quiz "${question.id}": empty explanation`);
}

const macQuestion = QUIZ_QUESTIONS.find((question) => question.id === 'q5');
if (!macQuestion?.explanation.includes('يمنع الحركة لدى 50%')) {
  errors.push('quiz q5: MAC definition must describe prevention of movement in 50% of patients');
}
const suxQuestion = QUIZ_QUESTIONS.find((question) => question.id === 'q3');
if (!suxQuestion?.explanation.includes('وراثيًا') || !suxQuestion.explanation.includes('مكتسبًا')) {
  errors.push('quiz q3: prolonged Suxamethonium block must allow inherited or acquired Butyrylcholinesterase deficiency');
}
const cbfQuestion = QUIZ_QUESTIONS.find((question) => question.id === 'q6');
if (!cbfQuestion?.explanation.includes('تدفق الدم الدماغي')) {
  errors.push('quiz q6: CBF Arabic meaning must be cerebral blood flow');
}

const scenarioSteps = new Set<number>();
for (const step of CLINICAL_SCENARIO) {
  if (scenarioSteps.has(step.stepNumber)) errors.push(`scenario: duplicate step ${step.stepNumber}`);
  scenarioSteps.add(step.stepNumber);
  if (!step.title.trim() || !step.situation.trim() || !step.question.trim()) {
    errors.push(`scenario step ${step.stepNumber}: missing title/situation/question`);
  }
  if (step.options.length < 2) errors.push(`scenario step ${step.stepNumber}: fewer than 2 options`);
  const correctCount = step.options.filter((option) => option.isCorrect).length;
  if (correctCount !== 1) errors.push(`scenario step ${step.stepNumber}: expected exactly 1 correct option, got ${correctCount}`);
  for (const option of step.options) {
    if (!option.text.trim() || !option.feedback.trim()) errors.push(`scenario step ${step.stepNumber}: blank option/feedback`);
  }
}

if (!SUX_APNOEA_DATA.clinicalDetection.immediateAction.includes('التهوية') ||
    !SUX_APNOEA_DATA.clinicalDetection.immediateAction.includes('تهدئة')) {
  errors.push('Sux apnoea protocol: immediate action must preserve ventilation and sedation');
}
const supportiveCare = SUX_APNOEA_DATA.treatmentProtocol.find((step) => step.id === 'supportive-care');
const diagnosisFollowup = SUX_APNOEA_DATA.treatmentProtocol.find((step) => step.id === 'diagnosis-followup');
if (!supportiveCare?.details.includes('التهوية الميكانيكية') || !supportiveCare.details.includes('التهدئة')) {
  errors.push('Sux apnoea protocol: supportive care must include mechanical ventilation and sedation');
}
if (!diagnosisFollowup?.crucialRule.includes('ليس علاجًا روتينيًا')) {
  errors.push('Sux apnoea protocol: FFP must not be presented as routine reversal treatment');
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
