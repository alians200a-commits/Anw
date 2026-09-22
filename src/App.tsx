import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { BottomNav, type AppTab } from './components/BottomNav';
import { FavoritesScreen } from './components/FavoritesScreen';
import { GamesHub } from './components/GamesHub';
import { GuideScreen, type GuideSection } from './components/GuideScreen';
import { HomeScreen, type RecentGuideItem } from './components/HomeScreen';
import { KingdomHeader } from './components/KingdomHeader';
import type { DrugClass } from './data/drugs';

const FAVORITES_KEY = 'kingdom-anesthesia:favorites';
const RECENTS_KEY = 'kingdom-anesthesia:recent-guide-items';

function loadFavorites() {
  try {
    const raw = localStorage.getItem(FAVORITES_KEY);
    const values = raw ? JSON.parse(raw) : [];
    return new Set<string>(Array.isArray(values) ? values : []);
  } catch {
    return new Set<string>();
  }
}

function loadRecentGuideItems(): RecentGuideItem[] {
  try {
    const raw = localStorage.getItem(RECENTS_KEY);
    const values = raw ? JSON.parse(raw) : [];
    if (!Array.isArray(values)) return [];

    return values
      .filter(
        (item): item is RecentGuideItem =>
          Boolean(
            item &&
              typeof item === 'object' &&
              typeof item.section === 'string' &&
              typeof item.query === 'string'
          )
      )
      .slice(0, 6);
  } catch {
    return [];
  }
}

export default function App() {
  const [activeTab, setActiveTab] = useState<AppTab>('home');
  const [guideSection, setGuideSection] = useState<GuideSection>('drugs');
  const [guideDrugClass, setGuideDrugClass] = useState<'all' | DrugClass>('all');
  const [guideQuery, setGuideQuery] = useState('');
  const [query, setQuery] = useState('');
  const [favorites, setFavorites] = useState<Set<string>>(() => loadFavorites());
  const [recentGuideItems, setRecentGuideItems] = useState<RecentGuideItem[]>(
    () => loadRecentGuideItems()
  );

  useEffect(() => {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(Array.from(favorites)));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem(RECENTS_KEY, JSON.stringify(recentGuideItems));
  }, [recentGuideItems]);

  const handleTabChange = (tab: AppTab) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleGuideSectionChange = (section: GuideSection) => {
    setGuideSection(section);
    setGuideQuery('');
  };

  const openGuide = (
    section: GuideSection,
    drugClass: 'all' | DrugClass = 'all',
    initialQuery = ''
  ) => {
    setGuideSection(section);
    setGuideQuery(initialQuery);

    const normalizedQuery = initialQuery.trim();
    if (normalizedQuery) {
      setRecentGuideItems((current) => {
        const next = [
          { section, query: normalizedQuery },
          ...current.filter(
            (item) =>
              !(item.section === section && item.query === normalizedQuery)
          )
        ];
        return next.slice(0, 6);
      });
    }

    if (section === 'drugs') setGuideDrugClass(drugClass);
    setActiveTab('guide');
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
    screen = <FavoritesScreen favorites={favorites} onToggleFavorite={toggleFavorite} />;
  } else {
    screen = (
      <HomeScreen
        query={query}
        setQuery={setQuery}
        openGuide={openGuide}
        goTo={handleTabChange}
        recentItems={recentGuideItems}
      />
    );
  }

  return (
    <div
      dir="rtl"
      className="min-h-screen bg-white text-[#183149] selection:bg-[#CCA039]/30 selection:text-[#0A2037]"
    >
      <KingdomHeader />

      <main className="relative mx-auto w-full max-w-3xl px-4 pb-24 pt-4 sm:px-6 sm:pt-5">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={activeTab + ':' + guideSection}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.16 }}
          >
            {screen}
          </motion.div>
        </AnimatePresence>
      </main>

      <BottomNav active={activeTab} onChange={handleTabChange} />
    </div>
  );
}