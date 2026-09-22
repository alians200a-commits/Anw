import { AnimatePresence } from 'motion/react';
import { Heart, MagnifyingGlass, SpeakerHigh } from '@phosphor-icons/react';
import {
  ANESTHESIA_DRUGS,
  DRUG_CLASS_LABELS,
  DRUG_FILTERS,
  type DrugClass
} from '../data/drugs';
import { DRUG_DETAILS } from '../data/drugDetails';
import { DrugDetailSheet } from './DrugDetailSheet';
import { MixedDirectionText } from './MixedDirectionText';
import { useEffect, useMemo, useState } from 'react';
import { MedicinesHealthIcon } from './MedicalIcons';
import { playPronunciation } from '../utils/speech';
import { MEDICAL_ANIMATED_GIFS } from '../data/animatedMedicalIcons';
import {
  NotificationStackMenu,
  type StackMenuItem
} from './ui/NotificationStackMenu';
import { AnimatedIcon } from './ui/AnimatedIcon';

interface DrugDirectoryProps {
  favorites: Set<string>;
  onToggleFavorite: (id: string) => void;
  initialClassification?: 'all' | DrugClass;
  initialQuery?: string;
}

export function DrugDirectory({
  favorites,
  onToggleFavorite,
  initialClassification = 'all',
  initialQuery = ''
}: DrugDirectoryProps) {
  const [classification, setClassification] = useState<'all' | DrugClass>(
    initialClassification
  );
  const [query, setQuery] = useState(initialQuery);
  const [selectedDrugId, setSelectedDrugId] = useState<string | null>(null);

  useEffect(() => {
    setClassification(initialClassification);
  }, [initialClassification]);

  useEffect(() => {
    setQuery(initialQuery);

    const normalized = initialQuery.trim().toLowerCase();
    if (!normalized) {
      setSelectedDrugId(null);
      return;
    }

    const exact = ANESTHESIA_DRUGS.find(
      (drug) =>
        drug.en.toLowerCase() === normalized ||
        drug.ar.toLowerCase() === normalized
    );

    if (exact && DRUG_DETAILS[exact.id]) setSelectedDrugId(exact.id);
  }, [initialQuery]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return ANESTHESIA_DRUGS.filter((drug) => {
      const matchesCategory =
        classification === 'all' || drug.classes.includes(classification);
      const matchesQuery =
        !q ||
        [drug.en, drug.ar, drug.categoryAr, drug.short, ...drug.tags].some(
          (value) => value.toLowerCase().includes(q)
        );
      return matchesCategory && matchesQuery;
    });
  }, [classification, query]);

  const currentFilter =
    DRUG_FILTERS.find((item) => item.id === classification)?.label ?? 'الكل';

  const filterItems: StackMenuItem[] = DRUG_FILTERS.map((item) => ({