export type ContentMediaPlacement = 'cover' | 'gallery' | 'section';
export type ContentMediaBucket = 'content-media-drafts' | 'content-media';

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

export type EquipmentMediaSection =
  | 'summary'
  | 'clinicalNote'
  | 'purpose'
  | 'keyPoints';

export type FluidMediaSection =
  | 'composition'
  | 'clinicalNote'
  | 'role'
  | 'cautions';

export type ContentMediaSection = DrugMediaSection | EquipmentMediaSection | FluidMediaSection;

export interface ContentMediaItem {
  id: string;
  bucket?: ContentMediaBucket;
  path: string;
  url: string;
  alt: string;
  caption?: string;
  placement: ContentMediaPlacement;
  sectionKey?: ContentMediaSection;
  hidden?: boolean;
  order: number;
}
