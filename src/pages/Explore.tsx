import { useState, useMemo } from 'react';
import { Search, MapPin, SlidersHorizontal, Grid3X3, List, Star, Clock, CheckCircle, X, ChevronDown } from 'lucide-react';
import { MOCK_BUSINESSES, CATEGORIES } from '@/constants';
import BusinessCard from '@/components/features/BusinessCard';
import Pagination from '@/components/features/Pagination';

const ITEMS_PER_PAGE = 6;
const SORT_OPTIONS = [
  { value: 'rating', label: 'Top Rated' },
  { value: 'reviews', label: 'Most Reviewed' },
  { value: 'newest', label: 'Newest' },
  { value: 'name', label: 'A–Z' },
];
const DISTANCE_OPTIONS = [1, 3, 5, 10, 25];

export default function Explore() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const [sortBy, setSortBy] = useState('rating');
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [page, setPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const [minRating, setMinRating] = useState(0);
  const [maxRating, setMaxRating] = useState(5);
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [openNow, setOpenNow] = useState(false);
  const [maxDistance, setMaxDistance] = useState(25);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  // Collect all unique tags
  const allTags = useMemo(() => {
    const tags = new Set<string>();
    MOCK_BUSINESSES.forEach(b => b.tags.forEach(t => tags.add(t)));
    return Array.from(tags);
  }, []);

  const activeFilterCount = [
    minRating > 0, maxRating < 5, verifiedOnly, openNow,
    maxDistance < 25, selectedTags.length > 0
  ].filter(Boolean).length;

  const filtered = useMemo(() => MOCK_BUSINESSES
    .filter(b => {
      const matchQuery = !query || b.name.toLowerCase().includes(query.toLowerCase()) || b.category.toLowerCase().includes(query.toLowerCase()) || b.description.toLowerCase().includes(query.toLowerCase());
      const matchCat = category === 'All' || b.category.toLowerCase().includes(category.toLowerCase()) || b.tags.some(t => t.toLowerCase().includes(category.toLowerCase()));
      const matchRating = b.rating >= minRating && b.rating <= maxRating;
      const matchVerified = !verifiedOnly || b.verified;
      const matchTags = selectedTags.length === 0 || selectedTags.every(t => b.tags.includes(t));
      return matchQuery && matchCat && matchRating && matchVerified && matchTags;
    })
    .sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'reviews') return b.reviewCount - a.reviewCount;
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      return 0;
    }), [query, category, sortBy, minRating, maxRating, verifiedOnly, openNow, maxDistance, selectedTags]);

  const totalPages = Math.ceil(Math.max(1, filtered.length) / ITEMS_PER_PAGE);
  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  const resetFilters = () => {
    setMinRating(0); setMaxRating(5); setVerifiedOnly(false);
    setOpenNow(false); setMaxDistance(25); setSelectedTags([]);
  };

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]);
    setPage(1);
  };

  return (
    <div className="pt-16 min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Hero */}
      <div className="bg-gradient-to-r from-primary-600 to-secondary-700 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-display font-black text-white mb-4">Explore the City</h1>
          <p className="text-primary-100 text-lg mb-8">Discover {MOCK_BUSINESSES.length * 200}+ verified local businesses and hidden gems</p>
          <div className="max-w-2xl mx-auto flex gap-2 bg-white dark:bg-slate-800 rounded-2xl p-2 shadow-2xl">
            <div className="flex items-center gap-2 flex-1 px-3">
              <Search className="w-5 h-5 text-primary-500 flex-shrink-0" />
              <input
                value={query}
                onChange={e => { setQuery(e.target.value); setPage(1); }}
                placeholder="Search businesses, cafes, gyms..."
                className="flex-1 bg-transparent text-slate-800 dark:text-white placeholder-slate-400 text-sm focus:outline-none"
              />
              {query && (
                <button onClick={() => { setQuery(''); setPage(1); }} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300">
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
            <button className="btn-primary text-sm px-6">Search</button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Category chips */}
        <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2 mb-6">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => { setCategory(cat); setPage(1); }}
              className={`whitespace-nowrap px-4 py-2 rounded-xl text-sm font-medium transition-all ${category === cat ? 'bg-primary-500 text-white shadow-md shadow-primary-500/20' : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-primary-50 dark:hover:bg-primary-900/20 border border-slate-200 dark:border-slate-700'}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Toolbar */}
        <div className="flex items-center justify-between mb-4 gap-4 flex-wrap">
          <div className="flex items-center gap-3">
            <p className="text-slate-600 dark:text-slate-400 text-sm">
              <span className="font-bold text-slate-900 dark:text-white">{filtered.length}</span> businesses
              {category !== 'All' && <span> in <span className="text-primary-600 dark:text-primary-400 font-semibold">{category}</span></span>}
            </p>
            {activeFilterCount > 0 && (
              <span className="badge bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400">
                {activeFilterCount} filter{activeFilterCount > 1 ? 's' : ''} active
              </span>
            )}
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium border transition-all relative ${showFilters ? 'bg-primary-500 text-white border-primary-500' : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-primary-300'}`}
            >
              <SlidersHorizontal className="w-4 h-4" /> Filters
              {activeFilterCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold">{activeFilterCount}</span>
              )}
            </button>
            <div className="relative">
              <select value={sortBy} onChange={e => setSortBy(e.target.value)} className="input-field py-2 text-sm w-auto pr-8 appearance-none">
                {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            </div>
            <div className="flex border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden">
              <button onClick={() => setView('grid')} className={`p-2 ${view === 'grid' ? 'bg-primary-500 text-white' : 'bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700'} transition-colors`}><Grid3X3 className="w-4 h-4" /></button>
              <button onClick={() => setView('list')} className={`p-2 ${view === 'list' ? 'bg-primary-500 text-white' : 'bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700'} transition-colors`}><List className="w-4 h-4" /></button>
            </div>
          </div>
        </div>

        {/* Advanced Filter Panel */}
        {showFilters && (
          <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 mb-6 animate-slide-up shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-slate-900 dark:text-white text-sm">Advanced Filters</h3>
              <button onClick={resetFilters} className="text-xs text-red-500 hover:text-red-600 font-semibold flex items-center gap-1">
                <X className="w-3 h-3" /> Reset all
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Rating range */}
              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-3 flex items-center gap-1.5">
                  <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" /> Rating Range
                </label>
                <div className="space-y-2">
                  <div>
                    <div className="flex justify-between text-xs text-slate-400 mb-1"><span>Min</span><span>{minRating}★</span></div>
                    <input type="range" min={0} max={5} step={0.5} value={minRating} onChange={e => { setMinRating(+e.target.value); setPage(1); }} className="w-full accent-primary-500" />
                  </div>
                  <div>
                    <div className="flex justify-between text-xs text-slate-400 mb-1"><span>Max</span><span>{maxRating}★</span></div>
                    <input type="range" min={0} max={5} step={0.5} value={maxRating} onChange={e => { setMaxRating(+e.target.value); setPage(1); }} className="w-full accent-primary-500" />
                  </div>
                </div>
              </div>

              {/* Distance */}
              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-3 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-primary-500" /> Distance Radius
                </label>
                <div className="flex flex-wrap gap-2">
                  {DISTANCE_OPTIONS.map(d => (
                    <button key={d} onClick={() => { setMaxDistance(d); setPage(1); }} className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${maxDistance === d ? 'bg-primary-500 text-white border-primary-500' : 'border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-400 hover:border-primary-300'}`}>
                      {d}km
                    </button>
                  ))}
                </div>
              </div>

              {/* Toggles */}
              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-3 block">Options</label>
                <div className="space-y-3">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={verifiedOnly} onChange={e => { setVerifiedOnly(e.target.checked); setPage(1); }} className="w-4 h-4 accent-primary-500 rounded" />
                    <div className="flex items-center gap-1.5">
                      <CheckCircle className="w-3.5 h-3.5 text-accent-500" />
                      <span className="text-sm text-slate-700 dark:text-slate-300">Verified only</span>
                    </div>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={openNow} onChange={e => { setOpenNow(e.target.checked); setPage(1); }} className="w-4 h-4 accent-primary-500 rounded" />
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-green-500" />
                      <span className="text-sm text-slate-700 dark:text-slate-300">Open now</span>
                    </div>
                  </label>
                </div>
              </div>

              {/* Tags */}
              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-3 block">Tags</label>
                <div className="flex flex-wrap gap-1.5">
                  {allTags.map(tag => (
                    <button key={tag} onClick={() => toggleTag(tag)} className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${selectedTags.includes(tag) ? 'bg-primary-500 text-white' : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 hover:bg-primary-50 dark:hover:bg-primary-900/20'}`}>
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Active filter pills */}
        {(selectedTags.length > 0 || verifiedOnly || openNow) && (
          <div className="flex flex-wrap gap-2 mb-4">
            {selectedTags.map(tag => (
              <span key={tag} className="flex items-center gap-1 px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400 rounded-full text-xs font-semibold">
                {tag}
                <button onClick={() => toggleTag(tag)}><X className="w-3 h-3" /></button>
              </span>
            ))}
            {verifiedOnly && (
              <span className="flex items-center gap-1 px-3 py-1 bg-accent-100 dark:bg-accent-900/30 text-accent-700 dark:text-accent-400 rounded-full text-xs font-semibold">
                Verified only <button onClick={() => setVerifiedOnly(false)}><X className="w-3 h-3" /></button>
              </span>
            )}
            {openNow && (
              <span className="flex items-center gap-1 px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full text-xs font-semibold">
                Open now <button onClick={() => setOpenNow(false)}><X className="w-3 h-3" /></button>
              </span>
            )}
          </div>
        )}

        {/* Results */}
        {paginated.length === 0 ? (
          <div className="text-center py-20">
            <MapPin className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <p className="text-slate-500 dark:text-slate-400 font-medium">No businesses found</p>
            <p className="text-slate-400 dark:text-slate-500 text-sm">Try adjusting your filters or search term</p>
            <button onClick={() => { setQuery(''); setCategory('All'); resetFilters(); }} className="mt-4 btn-primary text-sm">Clear all filters</button>
          </div>
        ) : (
          <div className={view === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6' : 'flex flex-col gap-4'}>
            {paginated.map(b => <BusinessCard key={b.id} business={b} linkTo="/explore" />)}
          </div>
        )}

        <Pagination current={page} total={totalPages} onPage={p => { setPage(p); window.scrollTo({ top: 0, behavior: 'smooth' }); }} />
      </div>
    </div>
  );
}
