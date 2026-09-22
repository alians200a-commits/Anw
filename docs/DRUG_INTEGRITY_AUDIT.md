# Drug Integrity Audit — دليلي | مملكة التخدير

آخر تحديث: 2026-09-22

## هدف الجولة

هذه الجولة تختلف عن Content Audit القديم. الهدف ليس التأكد من وجود السجل فقط، بل مراجعة كل دواء سريريًا وبصريًا وفق قواعد ثابتة.

## طبقات التدقيق الإلزامية

لكل دواء:

1. Identity
   - الاسم العربي والإنكليزي.
   - التصنيف والفئة.
   - عدم خلط IV مع inhalational أو العكس.

2. Pharmacology
   - feature.
   - mechanism.
   - route(s).
   - dose/concentration reference.
   - onset/duration.

3. Clinical safety
   - uses.
   - contraindications.
   - warnings.
   - adverse effects.
   - أي correction قديم يجب دمج مع المحتوى المرئي أو تحويله إلى clinicalNote واضحة.

4. UI integrity
   - العربي أولًا.
   - English بعده بعنصر LTR منفصل.
   - الفاصل | لا يُترك للـBiDi rendering الخام.
   - ترتيب بطاقات الدواء ثابت:
     Key feature → Clinical note عند الحاجة → Uses → Mechanism → Routes → Reference doses → Onset & duration → Contraindications → Warnings → Adverse effects → Trade names.

5. Evidence
   - المصدر المرفوع يُستخدم لتغطية المحتوى الأصلي.
   - عند وجود معلومة قديمة/متعارضة/عالية الخطورة تُقارن مع prescribing information أو إرشاد حديث موثوق.
   - source metadata يبقى داخليًا ولا يُعرض للمستخدم.

## Automated gates

### Existing Content Audit
- IDs unique.
- 63/63 Drug Details.
- source metadata.
- forbidden terminology.
- core content arrays.

### Drug Integrity Audit
File: `tools/drug_integrity_audit.ts`

Hard failures:
- missing feature/mechanism/routes/dose reference/uses/contraindications/warnings/adverse effects.
- IV classification without IV route.
- inhalational classification without inhalational route.
- obvious feature-vs-route contradiction.
- any reviewed-batch drug missing onset/duration.
- any reviewed-batch drug missing clinicalNote.

The audit is now part of `Verify Web App`.

## Batch plan

- Batch 1 — IV induction + inhalational anesthetics: 11
- Batch 2 — Benzodiazepines + opioids
- Batch 3 — Neuromuscular blockers + reversal
- Batch 4 — Local anesthetics + antiemetic/adjunct drugs
- Batch 5 — Emergency/cardiovascular drugs
- Batch 6 — final cross-batch semantic and UI pass

## Batch 1 — CLOSED

Drugs:
- Propofol
- Thiopental
- Etomidate
- Ketamine
- Sevoflurane
- Isoflurane
- Halothane
- Nitrous Oxide
- Methohexital
- Enflurane
- Desflurane

### Issues found and fixed

- Propofol feature previously used an unnecessary inhalational comparison; corrected to explicit IV identity.
- Sevoflurane: added low-flow / Compound A renal-risk context.
- Isoflurane: expanded important hepatic/QT/perioperative hyperkalemia/desiccated CO2 absorbent warnings and prior halogenated-anesthetic hepatic contraindication.
- Desflurane: added pediatric induction contraindication, hepatic history, MH/QT/hyperkalemia/desiccated CO2 absorbent and pediatric respiratory limitations; clarified adult induction vs routine mask-induction suitability.
- Halothane / Enflurane / Nitrous Oxide: added dose-equivalent MAC/concentration references rather than leaving the field empty.
- Methohexital: added adult IV dose reference and onset/duration.
- All 63 records now have an educational dose or concentration reference.
- Batch 1 records now have visible clinicalNote text where a modern clarification is needed.
- Arabic/English card rendering was normalized before this batch.

### Batch 1 status

- Identity/classification: PASS
- Route consistency: PASS
- Dose/concentration reference: PASS
- Onset/duration: PASS
- Contraindications/warnings: PASS after fixes
- Clinical-note integration: PASS
- UI order/direction: PASS by component rules
- CI: pending/verified by latest workflow run

## Global gaps discovered

- Onset/duration was historically incomplete in many non-Batch-1 drugs. This is now tracked explicitly and will be closed batch-by-batch.
- 50 records contain internal `correction` notes from earlier source modernization work. These are not treated as complete until each drug is re-reviewed and the clinically important part is represented in the visible fields/clinicalNote.
- The audit will not mark the whole drug module CLOSED until every one of the 63 drugs passes the same checklist.

## Completion rule

The drug module reaches 100% only when:
- all 63 drugs are in reviewed batches,
- all hard audit gates pass,
- onset/duration coverage is 63/63,
- clinically material corrections have been integrated,
- final mobile rendered smoke test passes.


## Batch 2 — CLOSED

Drugs:
- Midazolam
- Diazepam
- Lorazepam
- Fentanyl
- Morphine
- Alfentanil
- Remifentanil
- Pethidine / Meperidine

### Issues found and fixed

- Added missing onset/duration data to Midazolam, Fentanyl, Morphine, Alfentanil, Remifentanil and Pethidine.
- Added visible clinical notes to all eight reviewed drugs.
- Expanded Midazolam contraindications to include acute narrow-angle glaucoma.
- Expanded Diazepam injection contraindications to include glaucoma restrictions.
- Expanded Lorazepam injection contraindications to include vehicle sensitivity, acute narrow-angle glaucoma, sleep apnea and severe respiratory insufficiency context.
- Morphine contraindications were materially incomplete; added significant respiratory depression, severe asthma in an unmonitored setting/no resuscitative equipment, MAOI use within 14 days and GI obstruction/paralytic ileus.
- Pethidine/Meperidine now explicitly includes hypersensitivity and keeps the MAOI/normeperidine safety restrictions.
- Fentanyl onset/duration and rapid/high-dose rigidity risk are now represented visibly.
- Remifentanil rapid offset and need for alternative postoperative analgesia before stopping infusion are represented visibly.

Status:
- Identity/classification: PASS
- Route consistency: PASS
- Dose reference: PASS
- Onset/duration: PASS
- Contraindications/warnings: PASS after fixes
- Clinical-note integration: PASS
- CI gate: PASS

## Batch 3 — IN PROGRESS

Scope:
- Rocuronium
- Suxamethonium
- Atracurium
- Mivacurium
- Vecuronium
- Pancuronium
- Cisatracurium
- Neostigmine
- Sugammadex
- Naloxone

Verified and locked so far:
- Rocuronium
- Suxamethonium
- Atracurium
- Vecuronium
- Cisatracurium
- Neostigmine
- Sugammadex
- Naloxone

Pending stronger source verification before PASS:
- Mivacurium
- Pancuronium

Important changes:
- Added onset/duration and visible clinical notes to the eight verified records.
- Neuromuscular blockers are explicitly framed as paralysis without analgesia/unconsciousness where relevant.
- Neostigmine reversal now ties timing to spontaneous recovery/TOF and records the typical 10–20 minute path to TOF 0.9 under appropriate conditions.
- Sugammadex clinical note emphasizes depth-based dosing and that severe renal impairment (CrCl <30 mL/min) is not recommended in the current label.
- Naloxone records rapid IV onset and the risk of recurrent respiratory depression when the opioid outlasts naloxone.

Current strict lock:
- Reviewed and CI-protected drugs: 27 / 63.
- Remaining drugs are not treated as fully audited until they enter a reviewed batch.
