import { useState } from 'react';
import { Calendar, Search } from 'lucide-react';
import { MOCK_EVENTS, EVENT_CATEGORIES } from '@/constants';
import EventCard from '@/components/features/EventCard';
import DashboardTopbar from '@/layouts/DashboardTopbar';
import { toast } from 'sonner';

export default function UserEvents() {
  const [q, setQ] = useState('');
  const [category, setCategory] = useState('All');

  const filtered = MOCK_EVENTS.filter(e => {
    const mq = !q || e.title.toLowerCase().includes(q.toLowerCase());
    const mc = category === 'All' || e.category === category;
    return mq && mc;
  });

  return (
    <div>
      <DashboardTopbar title="Events" notifPath="/dashboard/user/notifications" />
      <div className="p-6 max-w-6xl">
        <div className="flex gap-3 mb-6">
          <div className="flex-1 flex items-center gap-2 bg-white rounded-2xl border border-slate-200 px-4 shadow-sm">
            <Search className="w-5 h-5 text-secondary-500" />
            <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search events..." className="flex-1 py-3 text-sm bg-transparent text-slate-800 placeholder-slate-400 focus:outline-none" />
          </div>
        </div>

        <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2 mb-6">
          {EVENT_CATEGORIES.map(cat => (
            <button key={cat} onClick={() => setCategory(cat)} className={`whitespace-nowrap px-4 py-2 rounded-xl text-sm font-medium transition-all ${category === cat ? 'bg-secondary-500 text-white shadow-md' : 'bg-white text-slate-600 border border-slate-200 hover:border-secondary-300'}`}>
              {cat}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-16">
            <Calendar className="w-10 h-10 text-slate-300 mx-auto mb-3" />
            <p className="text-slate-500">No events found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map(e => <EventCard key={e.id} event={e} onBook={() => toast.success(`Booking confirmed for ${e.title}!`)} />)}
          </div>
        )}
      </div>
    </div>
  );
}
