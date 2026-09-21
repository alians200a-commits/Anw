import React from 'react';
import { Activity, BookOpen, Stethoscope, AlertTriangle, Brain, Sparkles, HelpCircle } from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  totalTermsCount: number;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab, totalTermsCount }) => {
  return (
    <header className="border-b border-slate-800 bg-slate-900/90 backdrop-blur-md sticky top-0 z-30 shadow-lg shadow-black/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
          {/* Logo & Identity */}
          <div className="flex items-center gap-3">
            <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-teal-500 to-emerald-600 flex items-center justify-center shadow-md shadow-teal-500/20 text-white font-black text-xl">
              <Activity className="h-6 w-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white flex items-center gap-2">
                  <span>دليلي كتقني تخدير</span>
                  <span className="text-xs font-mono font-normal px-2 py-0.5 rounded-full bg-teal-500/10 text-teal-400 border border-teal-500/30">
                    Anesthesia Tech
                  </span>
                </h1>
              </div>
              <p className="text-xs sm:text-sm text-slate-400 font-medium">
                مرجع المصطلحات السريرية، الصيدلة الحيوية، وبروتوكول سكولين ابنيه (Suxamethonium Apnoea)
              </p>
            </div>
          </div>

          {/* Quick Nav Tabs */}
          <nav className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none">
            <button
              id="nav-terms-btn"
              onClick={() => setActiveTab('terms')}
              className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === 'terms'
                  ? 'bg-teal-500 text-slate-950 shadow-sm shadow-teal-500/30'
                  : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <BookOpen className="h-4 w-4" />
              <span>المعجم السريري ({totalTermsCount})</span>
            </button>

            <button
              id="nav-sux-btn"
              onClick={() => setActiveTab('sux')}
              className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 whitespace-nowrap relative ${
                activeTab === 'sux'
                  ? 'bg-amber-500 text-slate-950 shadow-sm shadow-amber-500/30'
                  : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <AlertTriangle className="h-4 w-4 text-amber-400" />
              <span>سكولين ابنيه (Sux Apnoea)</span>
              <span className="h-2 w-2 rounded-full bg-amber-400 animate-ping absolute -top-0.5 -right-0.5"></span>
            </button>

            <button
              id="nav-sim-btn"
              onClick={() => setActiveTab('simulator')}
              className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === 'simulator'
                  ? 'bg-cyan-500 text-slate-950 shadow-sm shadow-cyan-500/30'
                  : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <Stethoscope className="h-4 w-4" />
              <span>محاكاة الحالة</span>
            </button>

            <button
              id="nav-metabolism-btn"
              onClick={() => setActiveTab('concepts')}
              className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === 'concepts'
                  ? 'bg-emerald-500 text-slate-950 shadow-sm shadow-emerald-500/30'
                  : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <Brain className="h-4 w-4" />
              <span>الأيض & الـ MAC</span>
            </button>

            <button
              id="nav-quiz-btn"
              onClick={() => setActiveTab('quiz')}
              className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === 'quiz'
                  ? 'bg-purple-500 text-slate-950 shadow-sm shadow-purple-500/30'
                  : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <HelpCircle className="h-4 w-4" />
              <span>اختبار التقييم</span>
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};
