export type CategoryType = 
  | 'all'
  | 'abbreviations'
  | 'cardio'
  | 'pharmacology'
  | 'critical'
  | 'surgical';

export interface ClinicalTerm {
  id: string;
  en: string;
  ar: string;
  abbr?: string;
  category: 'abbreviations' | 'cardio' | 'pharmacology' | 'critical' | 'surgical';
  definition: string;
  clinicalNote?: string;
  tags: string[];
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface SimulationStep {
  stepNumber: number;
  title: string;
  situation: string;
  question: string;
  options: {
    text: string;
    isCorrect: boolean;
    feedback: string;
  }[];
}
