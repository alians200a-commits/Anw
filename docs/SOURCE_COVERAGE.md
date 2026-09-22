# Source Coverage Report — دليلي | مملكة التخدير

آخر تحديث: 2026-09-22

## Current verified state
- Drugs: 63
- Drug details: 63 / 63
- Clinical guides: 52
- Anesthesia stage references: 14
- Equipment: 32
- Fluids: 8
- Clinical terms: 221
- TypeScript: PASS
- Content audit: PASS
- Build: PASS

## Principles of Anesthesia
Source: 107-page PDF.

Status: CLOSED for content audit.

Final pass covered the source page-by-page at topic level, including history, physiology, equipment, airway, general/regional anesthesia, pharmacology, perioperative assessment/monitoring, complications, transfusion, cardiovascular topics, shock and liver disease.

Recent final-pass closures included pharmacokinetics, thiopental details, ideal IV-agent properties, ETT sizing/cuff details, maintenance, neuromuscular reversal, heart failure and transfusion complications.

Cover/front-matter, continuation pages, images and tables already represented inside an existing topic do not require a separate app record.

Known standalone content gap: NONE.

## Anesthesia drug-writing file
Source: 33-page PDF.

Status: CLOSED for drug cross-check.

Every represented source drug was cross-checked for:
- route
- uses
- educational/source dose context
- contraindications
- warnings
- adverse effects
- source metadata

Late source pages containing continuation/visual intubation material do not require duplicate drug records. The perioperative fluid-calculation section is represented in the clinical guide.

Known standalone drug gap: NONE.

## Emergency Drugs 2021
Source: 36-page PDF with internal content numbering [1]–[34].

Status: CLOSED for emergency-drug cross-check.

Important page-coverage rule:
- continuation pages are not treated as missing drugs
- [25]–[26] continue Ketamine content
- the following pages around [27]–[29] contain continuation/adjacent material including Labetalol
- [34] has no new standalone drug entry

A content-audit rule now requires educational dose data for every drug record sourced from the anesthesia-drug file or Emergency Drugs source.

Known standalone emergency-drug gap: NONE.

## Source metadata note
Some existing Drug Details merge more than one source in one record, so a single sourcePages array can contain page numbers originating from different source documents.

Coverage decisions in this report therefore use the source content + topic identity + source labels, not a raw union of page numbers.

A future source-reference UI refinement can split merged references into source-specific page groups if exact per-source display is required.

## Remaining before final lock
1. Manual UI/mobile QA.
2. Source-reference display smoke test.
3. Search and Favorites QA.
4. Collapsible sections QA.
5. RTL/mobile-width/header/bottom-nav checks.
6. Final TypeScript + Content Audit + Build after any UI fixes.

Do not mark the base guide 100% locked until the final UI/mobile QA passes.
