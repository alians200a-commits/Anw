export type ContentMediaPlacement = 'cover' | 'gallery' | 'section';

export type DrugMediaSection =
  | 'feature'
  | 'clinicalNote'
  | 'uses'
  | 'mechanism'
  | 'routes'
  | 'educationalDoses'
  | 'onsetDuration'
  | 'contraindications'
  | 'warnings'
  | 'adverseEffects'
  | 'tradeNames';

export interface ContentMediaItem {
  id: string;
  path: string;
  url: string;
  alt: string;
  caption?: string;
  placement: ContentMediaPlacement;
  sectionKey?: DrugMediaSection;
  hidden?: boolean;
  order: number;
}
