import React, { useState } from 'react';
import { Header } from './components/Header';
import { TermsDictionary } from './components/TermsDictionary';
import { FlashcardModal } from './components/FlashcardModal';
import { SuxApnoeaProtocol } from './components/SuxApnoeaProtocol';
import { ClinicalSimulator } from './components/ClinicalSimulator';
import { MacAndMetabolismVisualizer } from './components/MacAndMetabolismVisualizer';
import { ClinicalQuiz } from './components/ClinicalQuiz';
import { CLINICAL_TERMS } from './data/clinicalTerms';
import { Activity, ShieldCheck, HeartPulse, Sparkles } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('terms');
  const [showFlashcards, setShowFlashcards] = useState<boolean>(false);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-teal-500/30 selection:text-teal-200">
      {/* App Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        totalTermsCount={CLINICAL_TERMS.length}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {activeTab === 'terms' && (
          <TermsDictionary
            terms={CLINICAL_TERMS}
            onOpenFlashcards={() => setShowFlashcards(true)}
            onSelectSuxApnoea={() => setActiveTab('sux')}
          />
        )}

        {activeTab === 'sux' && (
          <SuxApnoeaProtocol
            onStartSimulation={() => setActiveTab('simulator')}
          />
        )}

        {activeTab === 'simulator' && (
          <ClinicalSimulator />
        )}

        {activeTab === 'concepts' && (
          <MacAndMetabolismVisualizer />
        )}

        {activeTab === 'quiz' && (
          <ClinicalQuiz />
        )}
      </main>

      {/* Flashcards Modal */}
      {showFlashcards && (
        <FlashcardModal
          terms={CLINICAL_TERMS}
          onClose={() => setShowFlashcards(false)}
        />
      )}

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950/80 py-6 mt-12 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <HeartPulse className="h-4 w-4 text-teal-400" />
            <span className="font-bold text-slate-400">دليلي كتقني تخدير • Anesthesia Technician Clinical Handbook</span>
          </div>

          <div className="flex items-center gap-4 text-slate-400">
            <span>Metabolism • CBF • ICP • MAC • Suxamethonium Apnoea</span>
            <span>•</span>
            <span className="text-teal-400 font-medium">للأغراض التعليمية والسريرية</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
