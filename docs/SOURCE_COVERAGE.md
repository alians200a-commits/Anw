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

## UI / mobile QA status

Static code-path and CI QA completed on 2026-09-22:

- Home search deep-links into the matching guide query instead of opening only the broad section: PASS.
- Stage search narrows to the matching stage topic and opens the matched hierarchy: PASS.
- Favorites: saved drugs open their full drug detail sheet; removing a favorite is a separate control: PASS.
- Saved terms remain readable in Favorites with definition/clinical note and separate remove control: PASS.
- Collapsible detail sections in drugs, clinical guides, equipment and fluids: PASS.
- Root RTL and Arabic document direction: PASS.
- Mobile viewport includes `viewport-fit=cover`: PASS.
- Bottom navigation uses safe-area bottom inset: PASS.
- Drug/clinical/equipment/fluid detail sheets use safe-area bottom padding: PASS.
- Equipment and fluid source names are explicit; mixed drug source page numbers are labeled as combined references: PASS.
- Locked header geometry/branding was not changed: PASS.
- Forbidden visible terms search: 0 matches for `تحريض`, `محطة التخدير`, `محطات التخدير`, and `Anesthesia Workstation`.
- Latest code verification after UI fixes: TypeScript + Content Audit + Build = PASS.

Latest verified UI code commit: `db1374bceda435978667bcd2a77b43909f913bd3`.

## Remaining before final 100% lock

Only a rendered-device/browser visual smoke test remains: inspect the built app at narrow mobile widths and interactively confirm no clipping/overlap in the locked header, bottom navigation, sheets, search transitions and saved-item interactions.

Do not mark the base guide 100% locked until that rendered visual smoke test is completed.
