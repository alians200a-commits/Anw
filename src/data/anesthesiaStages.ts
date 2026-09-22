import type { ClinicalGuide } from './clinicalGuides';
import { CLINICAL_GUIDES } from './clinicalGuides';

export type AnesthesiaStageId = 'premedication' | 'induction' | 'maintenance' | 'recovery';

export interface AnesthesiaStage {
  id: AnesthesiaStageId;
  number: string;
  titleAr: string;
  titleEn: string;
  guideIds: string[];
}

export const ANESTHESIA_STAGES: AnesthesiaStage[] = [
  {
    id: 'premedication',
    number: '01',
    titleAr: 'مرحلة ما قبل التخدير',
    titleEn: 'Premedication',
    guideIds: ['preoperative-assessment', 'anesthesia-room-check', 'premedication']
  },
  {
    id: 'induction',
    number: '02',
    titleAr: 'البدء في التخدير',
    titleEn: 'Induction',
    guideIds: ['anesthesia-induction', 'intravenous-induction', 'inhalational-induction', 'rapid-sequence-induction']
  },
  {
    id: 'maintenance',
    number: '03',
    titleAr: 'إدامة التخدير',
    titleEn: 'Maintenance',
    guideIds: ['anesthesia-maintenance', 'intraoperative-monitoring', 'unconscious-patient-care']
  },
  {
    id: 'recovery',
    number: '04',
    titleAr: 'الإفاقة',
    titleEn: 'Emergence / Recovery',
    guideIds: ['anesthesia-recovery', 'modified-aldrete', 'extubation-readiness', 'delayed-emergence']
  }
];

export const ANESTHESIA_STAGE_GUIDE_IDS = new Set(
  ANESTHESIA_STAGES.flatMap((stage) => stage.guideIds)
);

export function getStageGuides(stage: AnesthesiaStage): ClinicalGuide[] {
  return stage.guideIds
    .map((id) => CLINICAL_GUIDES.find((guide) => guide.id === id))
    .filter((guide): guide is ClinicalGuide => Boolean(guide));
}
