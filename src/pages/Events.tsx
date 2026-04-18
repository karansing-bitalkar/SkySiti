import { useState } from 'react';
import { Search, Calendar, Filter } from 'lucide-react';
import { MOCK_EVENTS, EVENT_CATEGORIES } from '@/constants';
import EventCard from '@/components/features/EventCard';
import Pagination from '@/components/features/Pagination';
import { toast } from 'sonner';

const ITEMS_PER_PAGE = 6;

export default function Events() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const [page, setPage] = useState(1);
  const [priceFilter, setPriceFilter] = useState<'all' | 'free' | 'paid'>('all');

  const filtered = MOCK_EVENTS.filter(e => {
    const matchQ = !query || e.title.toLowerCase().includes(query.toLowerCase());
    const matchCat = category === 'All' || e.category === category;
    const matchPrice = priceFilter === 'all' || (priceFilter === 'free' && e.price === 0) || (priceFilter === 'paid' && e.price > 0);
    return matchQ && matchCat && matchPrice;
  });

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  return (
    <div className="pt-16 min-h-screen bg-slate-50">
      {/* Hero */}
      <div className="relative overflow-hidden bg-gradient-to-br from-secondary-700 via-secondary-600 to-primary-600 py-20">
        <div className="absolute inset-0 bg-grid opacity-20" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm px-4 py-2 rounded-full mb-6">
            <Calendar className="w-4 h-4" /> {MOCK_EVENTS.length} upcoming events this month
          </div>
          <h1 className="text-4xl md:text-6xl font-display font-black text-white mb-4">City Events</h1>
          <p className="text-secondary-100 text-xl mb-8 max-w-2xl mx-auto">Music, food, art, sports, and more. Something for everyone, every week.</p>
          <div className="max-w-xl mx-auto flex gap-2 bg-white rounded-2xl p-2 shadow-xl">
            <div className="flex items-center gap-2 flex-1 px-3">
              <Search className="w-5 h-5 text-secondary-500" />
              <input value={query} onChange={e => { setQuery(e.target.value); setPage(1); }} placeholder="Search events..." className="flex-1 bg-transparent text-slate-800 placeholder-slate-400 text-sm focus:outline-none" />
            </div>
            <button className="btn-secondary text-sm">Search</button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-6 items-center justify-between">
          <div className="flex gap-2 overflow-x-auto scrollbar-hide">
            {EVENT_CATEGORIES.map(cat => (
              <button key={cat} onClick={() => { setCategory(cat); setPage(1); }} className={`whitespace-nowrap px-4 py-2 rounded-xl text-sm font-medium transition-all ${category === cat ? 'bg-secondary-500 text-white shadow-md' : 'bg-white text-slate-600 hover:bg-secondary-50 border border-slate-200'}`}>
                {cat}
              </button>
            ))}
          </div>
          <div className="flex gap-2">
            {(['all', 'free', 'paid'] as const).map(p => (
              <button key={p} onClick={() => setPriceFilter(p)} className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all capitalize ${priceFilter === p ? 'bg-secondary-500 text-white' : 'bg-white border border-slate-200 text-slate-600 hover:border-secondary-300'}`}>{p}</button>
            ))}
          </div>
        </div>

        <p className="text-slate-500 text-sm mb-6"><span className="font-bold text-slate-900">{filtered.length}</span> events found</p>

        {paginated.length === 0 ? (
          <div className="text-center py-20">
            <Calendar className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <p className="text-slate-500">No events found matching your criteria</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginated.map(e => <EventCard key={e.id} event={e} onBook={() => toast.success(`Booked: ${e.title}!`)} />)}
          </div>
        )}

        <Pagination current={page} total={totalPages} onPage={setPage} />
      </div>

      {/* Featured Banner */}
      <div className="bg-gradient-to-r from-primary-600 to-secondary-600 py-16 mt-10">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-display font-black text-white mb-3">Organize Your Own Event?</h2>
          <p className="text-primary-100 mb-6">Join thousands of organizers using SkySiti to manage and promote events.</p>
          <a href="/register" className="bg-white text-primary-600 font-bold px-8 py-3.5 rounded-2xl hover:bg-primary-50 transition-colors inline-block">
            Become an Organizer
          </a>
        </div>
      </div>
    </div>
  );
}
