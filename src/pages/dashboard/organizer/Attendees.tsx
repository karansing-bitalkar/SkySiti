import { useState } from 'react';
import { Users, Search, Download, CheckCircle, Clock } from 'lucide-react';
import DashboardTopbar from '@/layouts/DashboardTopbar';
import { toast } from 'sonner';

const MOCK_ATTENDEES = [
  { id: '1', name: 'Alex Johnson', email: 'alex@example.com', event: 'City Music Festival 2026', date: '2026-04-10', status: 'confirmed', ticket: 'VIP-001' },
  { id: '2', name: 'Sarah Wilson', email: 'sarah@example.com', event: 'Tech Summit 2026', date: '2026-04-11', status: 'confirmed', ticket: 'GEN-002' },
  { id: '3', name: 'Mike Chen', email: 'mike@example.com', event: 'Street Food Carnival', date: '2026-04-12', status: 'pending', ticket: 'GEN-003' },
  { id: '4', name: 'Emma Davis', email: 'emma@example.com', event: 'City Music Festival 2026', date: '2026-04-13', status: 'confirmed', ticket: 'VIP-004' },
  { id: '5', name: 'Jordan Lee', email: 'jordan@example.com', event: 'Yoga in the Park', date: '2026-04-14', status: 'confirmed', ticket: 'GEN-005' },
  { id: '6', name: 'Priya Patel', email: 'priya@example.com', event: 'Art & Wine Evening', date: '2026-04-15', status: 'pending', ticket: 'GEN-006' },
];

export default function Attendees() {
  const [q, setQ] = useState('');
  const [eventFilter, setEventFilter] = useState('All');

  const events = ['All', ...new Set(MOCK_ATTENDEES.map(a => a.event))];
  const filtered = MOCK_ATTENDEES.filter(a => {
    const mq = !q || a.name.toLowerCase().includes(q.toLowerCase()) || a.email.toLowerCase().includes(q.toLowerCase());
    const me = eventFilter === 'All' || a.event === eventFilter;
    return mq && me;
  });

  return (
    <div>
      <DashboardTopbar title="Attendees List" />
      <div className="p-6 max-w-5xl">
        <div className="flex flex-wrap gap-3 mb-6 items-center justify-between">
          <div className="flex items-center gap-2 bg-white rounded-2xl border border-slate-200 px-4 py-2.5 shadow-sm">
            <Search className="w-4 h-4 text-slate-400" />
            <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search attendees..." className="bg-transparent text-sm focus:outline-none text-slate-800 placeholder-slate-400 w-48" />
          </div>
          <div className="flex items-center gap-2">
            <select value={eventFilter} onChange={e => setEventFilter(e.target.value)} className="input-field py-2.5 text-sm w-auto">
              {events.map(ev => <option key={ev} value={ev}>{ev}</option>)}
            </select>
            <button onClick={() => toast.success('Attendee list exported!')} className="flex items-center gap-2 border border-slate-200 text-slate-700 font-medium px-4 py-2.5 rounded-xl hover:bg-slate-50 transition-colors text-sm">
              <Download className="w-4 h-4" /> Export
            </button>
          </div>
        </div>

        <div className="card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100">
                  <th className="text-left text-xs font-semibold text-slate-500 px-4 py-3">Attendee</th>
                  <th className="text-left text-xs font-semibold text-slate-500 px-4 py-3">Event</th>
                  <th className="text-left text-xs font-semibold text-slate-500 px-4 py-3">Ticket</th>
                  <th className="text-left text-xs font-semibold text-slate-500 px-4 py-3">Date</th>
                  <th className="text-left text-xs font-semibold text-slate-500 px-4 py-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filtered.map(a => (
                  <tr key={a.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-secondary-400 to-primary-500 rounded-xl flex items-center justify-center text-white text-xs font-bold">
                          {a.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <p className="font-semibold text-slate-900 text-sm">{a.name}</p>
                          <p className="text-xs text-slate-400">{a.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-600 max-w-[180px] truncate">{a.event}</td>
                    <td className="px-4 py-3"><span className="badge bg-slate-100 text-slate-700 font-mono">{a.ticket}</span></td>
                    <td className="px-4 py-3 text-sm text-slate-500">{a.date}</td>
                    <td className="px-4 py-3">
                      <span className={`badge flex items-center gap-1 w-fit ${a.status === 'confirmed' ? 'bg-accent-100 text-accent-700' : 'bg-amber-100 text-amber-700'}`}>
                        {a.status === 'confirmed' ? <CheckCircle className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                        {a.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filtered.length === 0 && (
            <div className="text-center py-12">
              <Users className="w-10 h-10 text-slate-300 mx-auto mb-3" />
              <p className="text-slate-400">No attendees found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
