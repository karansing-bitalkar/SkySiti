import { useState } from 'react';
import { Search, Tag, Percent, Clock, Sparkles } from 'lucide-react';
import { MOCK_OFFERS, OFFER_CATEGORIES } from '@/constants';
import OfferCard from '@/components/features/OfferCard';
import Pagination from '@/components/features/Pagination';

const ITEMS_PER_PAGE = 6;

const highlights = [
  { label: 'Total Savings', value: '$24,000+', icon: Percent, color: 'from-primary-500 to-primary-600' },
  { label: 'Active Deals', value: '340+', icon: Tag, color: 'from-secondary-500 to-secondary-600' },
  { label: 'Expiring Soon', value: '28', icon: Clock, color: 'from-amber-500 to-orange-500' },
  { label: 'New This Week', value: '52', icon: Sparkles, color: 'from-accent-500 to-accent-600' },
];

export default function Offers() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const [page, setPage] = useState(1);

  const filtered = MOCK_OFFERS.filter(o => {
    const matchQ = !query || o.title.toLowerCase().includes(query.toLowerCase()) || o.businessName.toLowerCase().includes(query.toLowerCase());
    const matchCat = category === 'All' || o.category === category;
    return matchQ && matchCat;
  });

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  return (
    <div className="pt-16 min-h-screen bg-slate-50">
      {/* Hero */}
      <div className="bg-gradient-to-br from-accent-600 via-primary-600 to-secondary-600 py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-10" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 text-white text-sm px-4 py-2 rounded-full mb-6 border border-white/20">
            <Sparkles className="w-4 h-4 text-yellow-300" /> Exclusive deals just for you
          </div>
          <h1 className="text-4xl md:text-6xl font-display font-black text-white mb-4">Deals & Offers</h1>
          <p className="text-white/80 text-xl mb-8">Save big on restaurants, spas, events and more across the city</p>
          <div className="max-w-xl mx-auto flex gap-2 bg-white rounded-2xl p-2 shadow-xl">
            <div className="flex items-center gap-2 flex-1 px-3">
              <Search className="w-5 h-5 text-accent-500" />
              <input value={query} onChange={e => { setQuery(e.target.value); setPage(1); }} placeholder="Search deals, businesses..." className="flex-1 bg-transparent text-slate-800 placeholder-slate-400 text-sm focus:outline-none" />
            </div>
            <button className="bg-accent-500 hover:bg-accent-600 text-white font-semibold px-6 py-2 rounded-xl transition-colors text-sm">Search</button>
          </div>
        </div>
      </div>

      {/* Highlights */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10 mb-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {highlights.map(h => (
            <div key={h.label} className={`bg-gradient-to-br ${h.color} rounded-2xl p-5 text-white shadow-lg`}>
              <h.icon className="w-6 h-6 mb-3 opacity-80" />
              <p className="text-2xl font-display font-black">{h.value}</p>
              <p className="text-white/80 text-sm mt-0.5">{h.label}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {/* Categories */}
        <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2 mb-6">
          {OFFER_CATEGORIES.map(cat => (
            <button key={cat} onClick={() => { setCategory(cat); setPage(1); }} className={`whitespace-nowrap px-4 py-2 rounded-xl text-sm font-medium transition-all ${category === cat ? 'bg-accent-500 text-white shadow-md' : 'bg-white text-slate-600 hover:bg-accent-50 border border-slate-200'}`}>
              {cat}
            </button>
          ))}
        </div>

        <p className="text-slate-500 text-sm mb-6"><span className="font-bold text-slate-900">{filtered.length}</span> deals available</p>

        {paginated.length === 0 ? (
          <div className="text-center py-20">
            <Tag className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <p className="text-slate-500">No deals found for your search</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginated.map(o => <OfferCard key={o.id} offer={o} />)}
          </div>
        )}

        <Pagination current={page} total={totalPages} onPage={setPage} />
      </div>
    </div>
  );
}
