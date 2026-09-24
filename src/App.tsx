import { useEffect, useState } from 'react';
import { MotionConfig } from 'motion/react';
import { BottomNav, type AppTab } from './components/BottomNav';
import { AboutSheet } from './components/AboutSheet';
import { FavoritesScreen } from './components/FavoritesScreen';
import { GamesHub } from './components/GamesHub';
import { GuideScreen, type GuideSection } from './components/GuideScreen';
import { HomeScreen } from './components/HomeScreen';
import { KingdomHeader } from './components/KingdomHeader';
import type { DrugClass } from './data/drugs';
import { reportRuntimeIssue } from './utils/runtimeDiagnostics';

const FAVORITES_KEY = 'kingdom-anesthesia:favorites';

function loadFavorites() {
  try {
    const raw = localStorage.getItem(FAVORITES_KEY);
    const values = raw ? JSON.parse(raw) : [];
    const safeValues = Array.isArray(values)
      ? values.filter((value): value is string => typeof value === 'string' && value.length <= 200)
      : [];
    return new Set<string>(safeValues);
  } catch (error) {
    reportRuntimeIssue('favorites-storage', error);
    return new Set<string>();
  }
}

export default function App() {
  const [activeTab, setActiveTab] = useState<AppTab>('home');
  const [guideSection, setGuideSection] = useState<GuideSection>('drugs');
  const [guideDrugClass, setGuideDrugClass] = useState<'all' | DrugClass>('all');
  const [guideQuery, setGuideQuery] = useState('');
  const [favorites, setFavorites] = useState<Set<string>>(() => loadFavorites());
  const [aboutOpen, setAboutOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(Array.from(favorites)));
    } catch (error) {
      reportRuntimeIssue('favorites-storage', error);
    }
  }, [favorites]);

  const handleTabChange = (tab: AppTab) => {
    if (tab === 'guide' && activeTab !== 'guide') {
      setGuideQuery('');
    }
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'auto' });
  };

  const handleGuideSectionChange = (section: GuideSection) => {
    setGuideSection(section);
    setGuideQuery('');
    if (section === 'drugs') setGuideDrugClass('all');
  };

  const openGuide = (
    section: GuideSection,
    drugClass: 'all' | DrugClass = 'all',
    initialQuery = ''
  ) => {
    setGuideSection(section);
    setGuideQuery(initialQuery);
    if (section === 'drugs') setGuideDrugClass(drugClass);
    setActiveTab('guide');
    window.scrollTo({ top: 0, behavior: 'auto' });
  };

  const toggleFavorite = (id: string) => {
    setFavorites((current) => {
      const next = new Set(current);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  let screen;
  if (activeTab === 'guide') {
    screen = (
      <GuideScreen
        section={guideSection}
        onSectionChange={handleGuideSectionChange}
        favorites={favorites}
        onToggleFavorite={toggleFavorite}
        initialDrugClass={guideDrugClass}
        initialQuery={guideQuery}
      />
    );
  } else if (activeTab === 'games') {
    screen = <GamesHub />;
  } else if (activeTab === 'favorites') {
    screen = (
      <FavoritesScreen
        favorites={favorites}
        onToggleFavorite={toggleFavorite}
      />
    );
  } else {
    screen = <HomeScreen openGuide={openGuide} onOpenAbout={() => setAboutOpen(true)} />;
  }

  return (
    <MotionConfig reducedMotion="user">
      <div
        dir="rtl"
        className="min-h-screen bg-white text-[#183149] selection:bg-[#CCA039]/30 selection:text-[#0A2037]"
      >
      <KingdomHeader />

      <main className="relative mx-auto w-full max-w-3xl px-4 pb-24 pt-4 sm:px-6 sm:pt-5">
        <div
          key={activeTab}
          className={activeTab === 'guide' ? 'readable-guide-content' : undefined}
        >
          {screen}
        </div>
      </main>

        <BottomNav active={activeTab} onChange={handleTabChange} />
        {aboutOpen ? <AboutSheet onClose={() => setAboutOpen(false)} /> : null}
      </div>
    </MotionConfig>
  );
}