import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { BottomNav, type AppTab } from './components/BottomNav';
import { DrugDirectory } from './components/DrugDirectory';
import { FavoritesScreen } from './components/FavoritesScreen';
import { GamesHub } from './components/GamesHub';
import { HomeScreen } from './components/HomeScreen';
import { KingdomHeader } from './components/KingdomHeader';
import { TermsDirectory } from './components/TermsDirectory';

const FAVORITES_KEY = 'kingdom-anesthesia:favorites';

function loadFavorites() {
  try {
    const raw = localStorage.getItem(FAVORITES_KEY);
    const values = raw ? JSON.parse(raw) : [];
    return new Set<string>(Array.isArray(values) ? values : []);
  } catch {
    return new Set<string>();
  }
}

export default function App() {
  const [activeTab, setActiveTab] = useState<AppTab>('home');
  const [query, setQuery] = useState('');
  const [favorites, setFavorites] = useState<Set<string>>(() => loadFavorites());

  useEffect(() => {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(Array.from(favorites)));
  }, [favorites]);

  const handleTabChange = (tab: AppTab) => {
    setActiveTab(tab);
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

  const screen = useMemo(() => {
    switch (activeTab) {
      case 'drugs':
        return <DrugDirectory favorites={favorites} onToggleFavorite={toggleFavorite} />;
      case 'terms':
        return <TermsDirectory favorites={favorites} onToggleFavorite={toggleFavorite} />;
      case 'games':
        return <GamesHub />;
      case 'favorites':
        return <FavoritesScreen favorites={favorites} onToggleFavorite={toggleFavorite} />;
      case 'home':
      default:
        return (
          <HomeScreen
            query={query}
            setQuery={setQuery}
            goTo={handleTabChange}
            favorites={favorites}
            onToggleFavorite={toggleFavorite}
          />
        );
    }
  }, [activeTab, favorites, query]);

  return (
    <div
      dir="rtl"
      className="min-h-screen bg-[#0A2036] text-[#EEE8D6] selection:bg-[#CCA039]/30 selection:text-[#EEE8D6]"
    >
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(204,160,57,0.06),transparent_28%),radial-gradient(circle_at_90%_18%,rgba(255,255,255,0.025),transparent_25%)]" />

      <KingdomHeader />

      <main className="relative mx-auto w-full max-w-5xl px-4 pb-28 pt-5 sm:px-6 sm:pt-7">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18 }}
          >
            {screen}
          </motion.div>
        </AnimatePresence>
      </main>

      <BottomNav active={activeTab} onChange={handleTabChange} />
    </div>
  );
}
