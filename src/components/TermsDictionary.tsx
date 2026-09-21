import React, { useState, useMemo } from 'react';
import { Search, Volume2, Copy, Check, Filter, Layers, Zap, Heart, ShieldAlert, Sparkles, BookOpen } from 'lucide-react';
import { ClinicalTerm, CategoryType } from '../types';
import { speakTerm } from '../utils/speech';

interface TermsDictionaryProps {
  terms: ClinicalTerm[];
  onOpenFlashcards: () => void;
  onSelectSuxApnoea: () => void;
}

export const TermsDictionary: React.FC<TermsDictionaryProps> = ({
  terms,
  onOpenFlashcards,
  onSelectSuxApnoea,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const categories = [
    { id: 'all', label: 'كافة المصطلحات', icon: BookOpen, count: terms.length },
    { id: 'abbreviations', label: 'الاختصارات والمسارات (CBF, ICP, IV...)', icon: Zap, count: terms.filter(t => t.category === 'abbreviations').length },
    { id: 'cardio', label: 'القلب والضغط (Tachy, Brady, BP...)', icon: Heart, count: terms.filter(t => t.category === 'cardio').length },
    { id: 'pharmacology', label: 'الأدوية والأيض (Metabolism, MAC...)', icon: Sparkles, count: terms.filter(t => t.category === 'pharmacology').length },
    { id: 'critical', label: 'الطوارئ والحرجة (MH, Shock, Arrest...)', icon: ShieldAlert, count: terms.filter(t => t.category === 'critical').length },
    { id: 'surgical', label: 'الجراحة والإفاقة (Recovery, Salivation...)', icon: Layers, count: terms.filter(t => t.category === 'surgical').length },
  ];

  const filteredTerms = useMemo(() => {
    return terms.filter((term) => {
      const matchesCategory = selectedCategory === 'all' || term.category === selectedCategory;
      const query = searchQuery.trim().toLowerCase();
      if (!query) return matchesCategory;

      const matchesEn = term.en.toLowerCase().includes(query);
      const matchesAr = term.ar.toLowerCase().includes(query);
      const matchesAbbr = term.abbr ? term.abbr.toLowerCase().includes(query) : false;
      const matchesDef = term.definition.toLowerCase().includes(query);
      const matchesTags = term.tags.some(tag => tag.toLowerCase().includes(query));

      return matchesCategory && (matchesEn || matchesAr || matchesAbbr || matchesDef || matchesTags);
    });
  }, [terms, selectedCategory, searchQuery]);

  const handleCopy = (term: ClinicalTerm) => {
    const text = `${term.abbr ? term.abbr + ' - ' : ''}${term.en} (${term.ar}): ${term.definition}`;
    navigator.clipboard.writeText(text);
    setCopiedId(term.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner Alert for Suxamethonium Apnoea */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-500/15 via-amber-500/10 to-slate-900 border border-amber-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30 shrink-0 mt-0.5">
            <ShieldAlert className="h-6 w-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                حالة سريرية هامة
              </span>
              <h3 className="text-base font-bold text-white">سكولين ابنيه (Suxamethonium Apnoea)</h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              توقف التنفس الممتد من 20 دقيقة إلى يومين بسبب نقص إنزيمات الكولينستيراز الوراثي، وكيفية التعامل الفوري ونقل البلازما (غير الأقارب).
            </p>
          </div>
        </div>
        <button
          id="hero-open-sux-btn"
          onClick={onSelectSuxApnoea}
          className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm transition-all shadow-md shadow-amber-500/20 whitespace-nowrap shrink-0"
        >
          عرض البروتوكول السريري الكامل ←
        </button>
      </div>

      {/* Search & Actions Bar */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 shadow-sm">
        <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
          <div className="relative flex-1">
            <Search className="absolute right-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
            <input
              id="terms-search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ابحث بالإنجليزية أو العربية أو الرمز (مثال: CBF, ICP, MAC, سكولين, أيض...)"
              className="w-full pr-11 pl-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700/80 text-white placeholder-slate-500 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 text-sm"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white px-2 py-0.5 rounded bg-slate-800"
              >
                مسح
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              id="open-flashcards-btn"
              onClick={onOpenFlashcards}
              className="px-4 py-2.5 rounded-xl bg-teal-500/10 hover:bg-teal-500/20 text-teal-300 border border-teal-500/30 text-xs sm:text-sm font-bold transition-all flex items-center gap-2"
            >
              <Sparkles className="h-4 w-4" />
              <span>وضع بطاقات الحفظ (Flashcards)</span>
            </button>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 mt-4 overflow-x-auto pb-1 scrollbar-none">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                id={`cat-btn-${cat.id}`}
                onClick={() => setSelectedCategory(cat.id as CategoryType)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 whitespace-nowrap transition-all ${
                  isSelected
                    ? 'bg-teal-500 text-slate-950 shadow-sm shadow-teal-500/20 font-bold'
                    : 'bg-slate-800/60 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-700/40'
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                <span>{cat.label}</span>
                <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                  isSelected ? 'bg-slate-900/30 text-slate-950 font-bold' : 'bg-slate-700 text-slate-400'
                }`}>
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Terms Count and Status */}
      <div className="flex items-center justify-between text-xs text-slate-400 px-1">
        <span>عرض {filteredTerms.length} من أصل {terms.length} مصطلح واختصار سريري</span>
        {searchQuery && (
          <span className="text-teal-400">تصفية البحث لـ &quot;{searchQuery}&quot;</span>
        )}
      </div>

      {/* Terms Grid */}
      {filteredTerms.length === 0 ? (
        <div className="text-center py-16 bg-slate-900/40 border border-slate-800 rounded-2xl">
          <Filter className="h-10 w-10 text-slate-600 mx-auto mb-3" />
          <p className="text-slate-300 font-semibold text-base">لم يتم العثور على مصطلح يطابق بحثك</p>
          <p className="text-xs text-slate-500 mt-1">جرب البحث بكلمة أخرى أو إعادة تعيين التصنيف</p>
          <button
            onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}
            className="mt-4 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-teal-400 text-xs font-bold"
          >
            إعادة تعيين البحث
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTerms.map((term) => {
            const isCopied = copiedId === term.id;
            return (
              <div
                key={term.id}
                id={`term-card-${term.id}`}
                className="bg-slate-900/90 border border-slate-800 hover:border-teal-500/40 rounded-2xl p-4 transition-all duration-200 hover:shadow-lg hover:shadow-teal-500/5 flex flex-col justify-between group"
              >
                <div>
                  {/* Card Header */}
                  <div className="flex items-start justify-between gap-2 mb-2.5">
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        {term.abbr && (
                          <span className="px-2 py-0.5 rounded-lg bg-teal-500/15 text-teal-300 border border-teal-500/30 text-xs font-mono font-bold">
                            {term.abbr}
                          </span>
                        )}
                        <h4 className="text-base font-bold text-white tracking-wide">
                          {term.en}
                        </h4>
                      </div>
                      <div className="text-sm font-semibold text-teal-400 mt-0.5">
                        {term.ar}
                      </div>
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        title="استمع للنطق الإنجليزي الصحيح"
                        onClick={() => speakTerm(term.en)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-teal-300 hover:bg-slate-800 transition-colors"
                      >
                        <Volume2 className="h-4 w-4" />
                      </button>
                      <button
                        title="نسخ المصطلح والتعريف"
                        onClick={() => handleCopy(term)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-teal-300 hover:bg-slate-800 transition-colors"
                      >
                        {isCopied ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>

                  {/* Definition */}
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mt-2 bg-slate-950/40 p-2.5 rounded-xl border border-slate-800/60">
                    {term.definition}
                  </p>

                  {/* Clinical Tip */}
                  {term.clinicalNote && (
                    <div className="mt-3 p-2.5 rounded-xl bg-slate-800/40 border border-slate-700/40 text-xs text-slate-400 leading-normal">
                      <span className="font-bold text-teal-400 ml-1">💡 ملحوظة سريرية لتقني التخدير:</span>
                      {term.clinicalNote}
                    </div>
                  )}
                </div>

                {/* Tags Footer */}
                <div className="flex items-center gap-1.5 flex-wrap mt-3 pt-2.5 border-t border-slate-800/60">
                  {term.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="text-[11px] px-2 py-0.5 rounded-md bg-slate-800/60 text-slate-400 font-medium"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
