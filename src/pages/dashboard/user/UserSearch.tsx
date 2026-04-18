import { useState } from 'react';
import { Search, MapPin } from 'lucide-react';
import { MOCK_BUSINESSES, CATEGORIES } from '@/constants';
import BusinessCard from '@/components/features/BusinessCard';
import Pagination from '@/components/ui/Pagination';
import DashboardTopbar from '@/layouts/DashboardTopbar';

const ITEMS_PER_PAGE = 6;

export default function UserSearch() {
  const [q, setQ] = useState('');
  const [category, setCategory] = useState('All');
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState('rating');

  const filtered = MOCK_BUSINESSES.filter(b => {
    const mq = !q || b.name.toLowerCase().includes(q.toLowerCase()) || b.description.toLowerCase().includes(q.toLowerCase());
    const mc = category === 'All' || b.category.toLowerCase().includes(category.toLowerCase().replace(/s$/, ''));
    return mq && mc;
  }).sort((a, b) => sortBy === 'rating' ? b.rating - a.rating : b.reviewCount - a.reviewCount);

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  return (
    <div className="dark:bg-slate-950 min-h-screen">
      <DashboardTopbar title="Search & Explore" notifPath="/dashboard/user/notifications" />
      <div className="p-6 max-w-6xl">
        {/* Search Bar */}
        <div className="flex gap-3 mb-6">
          <div className="flex-1 flex items-center gap-2 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 px-4 shadow-sm">
            <Search className="w-5 h-5 text-primary-500" />
            <input
              value={q}
              onChange={e => { setQ(e.target.value); setPage(1); }}
              placeholder="Search restaurants, gyms, cafes..."
              className="flex-1 py-3 text-sm bg-transparent text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none"
            />
          </div>
          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value)}
            className="input-field py-3 text-sm w-auto px-4"
          >
            <option value="rating">Top Rated</option>
            <option value="reviews">Most Reviewed</option>
          </select>
        </div>

        {/* Categories */}
        <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2 mb-6">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => { setCategory(cat); setPage(1); }}
              className={`whitespace-nowrap px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                category === cat
                  ? 'bg-primary-500 text-white shadow-md'
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700 hover:border-primary-300'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <p className="text-slate-500 dark:text-slate-400 text-sm mb-5">
          <span className="font-bold text-slate-900 dark:text-white">{filtered.length}</span> businesses found
        </p>

        {paginated.length === 0 ? (
          <div className="text-center py-16">
            <MapPin className="w-10 h-10 text-slate-300 mx-auto mb-3" />
            <p className="text-slate-500 dark:text-slate-400">No results found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {paginated.map(b => <BusinessCard key={b.id} business={b} linkTo={`/dashboard/user/place/${b.id}`} />)}
          </div>
        )}

        <Pagination current={page} total={totalPages} onPage={p => { setPage(p); window.scrollTo({ top: 0, behavior: 'smooth' }); }} />
      </div>
    </div>
  );
}
