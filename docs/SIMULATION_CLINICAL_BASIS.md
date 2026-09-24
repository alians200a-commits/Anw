# Clinical basis — anesthesia simulation

This document records the scientific design basis for the educational anesthesia simulation. It is internal project documentation; the public UI should stay concise.

## Design principles

1. The simulator teaches recognition, structured assessment, treatment of the presumed cause, and reassessment rather than memorising one-click answers.
2. No therapeutic drug doses are presented in the game. Drug actions are described at the level of protocol-based support because real dosing depends on patient, setting, protocol and supervision.
3. Physiologic values are educational simulation targets, not predictive patient-specific models.
4. Difficulty increases by adding uncertainty, multiple simultaneous abnormalities, sequencing requirements, time pressure and the need to reassess.

## Stage 1 — post-induction hypotension

Clinical logic:
- recognise the blood-pressure trend rather than react to one isolated number;
- assess likely causes, including anaesthetic depth, IV access and volume/circulatory context;
- treat hypotension according to the presumed underlying cause;
- reassess after intervention.

Evidence basis:
- POQI XI international consensus statement on perioperative arterial pressure management, Br J Anaesth 2024, PMID 38839472. It recommends avoiding prolonged low arterial pressure and treating hypotension according to the presumed underlying cause.
- Association of Anaesthetists/British and Irish Hypertension Society updated peri-operative blood-pressure guideline, Anaesthesia 2026, PMID 41532177.

## Stage 2 — hypoxemia after airway instrumentation

Clinical logic:
- integrate SpO2, EtCO2 and the clinical picture;
- confirm oxygen delivery;
- inspect airway/tube/circuit for correctable mechanical causes;
- assess ventilation manually when appropriate;
- confirm restoration of continuous capnography and oxygenation after correction.

Evidence basis:
- Association of Anaesthetists monitoring guideline 2021, PMID 34013531: minimum monitoring standards include capnography where indicated during anaesthesia.
- International consensus guideline on preventing unrecognised oesophageal intubation, Anaesthesia 2022, DOI 10.1111/anae.15817: sustained exhaled carbon dioxide is central to confirming tracheal tube placement and avoiding unrecognised oesophageal intubation.
- WFSA Minimum Capnometer Specifications 2021, PMID 34427566: capnometry is useful for confirming ongoing airway-device placement and detecting airway obstruction, bronchospasm and gas-exchange problems.

## Stage 3 — ventilatory deterioration with haemodynamic instability

Clinical logic:
- structured ABC approach;
- ask for help early in a multi-system crisis;
- exclude mechanical causes of difficult ventilation before fixing on bronchospasm;
- use oxygenation, capnography, airway resistance and haemodynamics as one integrated picture;
- treat suspected bronchospasm according to local protocol after mechanical causes are excluded;
- support circulation if haemodynamic instability persists;
- reassess all systems after interventions.

Evidence basis:
- Contemporary review of perioperative bronchospasm, PMCID PMC11702345 / PMID 39764475: diagnosis should be rapid and management multimodal.
- Perioperative asthma/bronchospasm review, PMID 20007991: acute bronchospasm should be managed promptly and methodically.
- WFSA capnometry guidance, PMID 34427566: capnography can contribute to detecting bronchospasm and airway obstruction.

## Safety boundary

The simulator is an educational decision-training tool. It is not a clinical protocol, does not replace supervision, and must not be used to make real patient-care decisions. Local institutional protocols and qualified clinical supervision take precedence.
