import { useState } from 'react';
import { Search, Trash2, Edit2, Plus, X, Save, ChevronLeft, ChevronRight, Calendar } from 'lucide-react';
import { MOCK_EVENTS } from '@/constants';
import { Event } from '@/types';
import ConfirmDialog from '@/components/ui/ConfirmDialog';
import DashboardTopbar from '@/layouts/DashboardTopbar';
import { toast } from 'sonner';

const CATEGORIES = ['Music', 'Technology', 'Food', 'Wellness', 'Art', 'Sports', 'Business', 'Community', 'Education', 'Other'];
const STATUSES = ['upcoming', 'ongoing', 'completed', 'cancelled'] as const;
const PER_PAGE = 10;

const statusColor: Record<string, string> = {
  upcoming: 'bg-accent-100 dark:bg-accent-900/30 text-accent-700 dark:text-accent-400',
  ongoing: 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400',
  completed: 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400',
  cancelled: 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400',
};

interface EvForm {
  title: string; category: string; date: string; time: string;
  location: string; description: string; price: string;
  maxAttendees: string; status: typeof STATUSES[number]; organizerName: string;
}

const emptyForm = (): EvForm => ({
  title: '', category: 'Music', date: '', time: '10:00 AM',
  location: '', description: '', price: '0',
  maxAttendees: '100', status: 'upcoming', organizerName: 'Admin',
});

export default function AdminEvents() {
  const [events, setEvents] = useState<Event[]>(MOCK_EVENTS);
  const [q, setQ] = useState('');
  const [catFilter, setCatFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [form, setForm] = useState<EvForm>(emptyForm());
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const filtered = events.filter(e => {
    const mq = !q || e.title.toLowerCase().includes(q.toLowerCase()) || e.category.toLowerCase().includes(q.toLowerCase());
    const mc = catFilter === 'all' || e.category === catFilter;
    const ms = statusFilter === 'all' || e.status === statusFilter;
    return mq && mc && ms;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const openAdd = () => { setEditingEvent(null); setForm(emptyForm()); setShowModal(true); };
  const openEdit = (ev: Event) => {
    setEditingEvent(ev);
    setForm({
      title: ev.title, category: ev.category, date: ev.date, time: ev.time,
      location: ev.location, description: ev.description, price: String(ev.price),
      maxAttendees: String(ev.maxAttendees), status: ev.status, organizerName: ev.organizerName,
    });
    setShowModal(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.date || !form.location) { toast.error('Title, date and location are required'); return; }
    if (editingEvent) {
      setEvents(prev => prev.map(ev => ev.id === editingEvent.id ? {
        ...ev, title: form.title, category: form.category, date: form.date,
        time: form.time, location: form.location, description: form.description,
        price: Number(form.price), maxAttendees: Number(form.maxAttendees),
        status: form.status, organizerName: form.organizerName,
      } : ev));
      toast.success('Event updated successfully');
    } else {
      const newEvent: Event = {
        id: Date.now().toString(), title: form.title, category: form.category, date: form.date,
        time: form.time, location: form.location, description: form.description,
        price: Number(form.price), maxAttendees: Number(form.maxAttendees),
        status: form.status, organizerName: form.organizerName,
        attendees: 0, organizerId: 'admin',
        image: `https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=300&fit=crop&random=${Date.now()}`,
      };
      setEvents(prev => [...prev, newEvent]);
      toast.success('Event added successfully');
    }
    setShowModal(false);
  };

  const deleteEvent = (id: string) => { setEvents(prev => prev.filter(e => e.id !== id)); toast.success('Event removed successfully'); };

  return (
    <div className="dark:bg-slate-950 min-h-screen">
      <DashboardTopbar title="Event Management" />
      <div className="p-6 max-w-7xl">
        {/* Toolbar */}
        <div className="flex flex-wrap gap-3 mb-6 items-center justify-between">
          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex items-center gap-2 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 px-4 py-2.5 shadow-sm">
              <Search className="w-4 h-4 text-slate-400" />
              <input value={q} onChange={e => { setQ(e.target.value); setPage(1); }} placeholder="Search events..." className="bg-transparent text-sm focus:outline-none text-slate-800 dark:text-white placeholder-slate-400 w-44" />
            </div>
            <select value={catFilter} onChange={e => { setCatFilter(e.target.value); setPage(1); }} className="input-field py-2.5 text-sm w-auto">
              <option value="all">All Categories</option>
              {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            <select value={statusFilter} onChange={e => { setStatusFilter(e.target.value); setPage(1); }} className="input-field py-2.5 text-sm w-auto">
              <option value="all">All Status</option>
              {STATUSES.map(s => <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
            </select>
          </div>
          <button onClick={openAdd} className="btn-primary flex items-center gap-2 text-sm">
            <Plus className="w-4 h-4" /> Add Event
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          {[
            { label: 'Total Events', value: events.length, color: 'text-primary-600' },
            { label: 'Upcoming', value: events.filter(e => e.status === 'upcoming').length, color: 'text-accent-600' },
            { label: 'Cancelled', value: events.filter(e => e.status === 'cancelled').length, color: 'text-red-500' },
            { label: 'Total Attendees', value: events.reduce((s, e) => s + e.attendees, 0).toLocaleString(), color: 'text-secondary-600' },
          ].map(s => (
            <div key={s.label} className="card dark:bg-slate-800 p-4 text-center">
              <p className={`text-2xl font-black ${s.color}`}>{s.value}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>

        <div className="card dark:bg-slate-800 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-700/50 border-b border-slate-100 dark:border-slate-700">
                  {['Event', 'Date & Time', 'Location', 'Attendees', 'Status', 'Price', 'Actions'].map(h => (
                    <th key={h} className="text-left text-xs font-semibold text-slate-500 dark:text-slate-400 px-4 py-3">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 dark:divide-slate-700/50">
                {paginated.length === 0 ? (
                  <tr><td colSpan={7} className="text-center py-12 text-slate-400">No events found</td></tr>
                ) : paginated.map(ev => (
                  <tr key={ev.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <img src={ev.image} alt={ev.title} className="w-10 h-10 rounded-xl object-cover flex-shrink-0" />
                        <div>
                          <p className="font-semibold text-slate-900 dark:text-white text-sm truncate max-w-[140px]">{ev.title}</p>
                          <p className="text-xs text-slate-400">{ev.category} · {ev.organizerName}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <p className="text-sm text-slate-700 dark:text-slate-300">{ev.date}</p>
                      <p className="text-xs text-slate-400">{ev.time}</p>
                    </td>
                    <td className="px-4 py-3 text-xs text-slate-500 dark:text-slate-400 max-w-[120px] truncate">{ev.location}</td>
                    <td className="px-4 py-3">
                      <div className="text-sm text-slate-700 dark:text-slate-300">{ev.attendees}/{ev.maxAttendees}</div>
                      <div className="w-20 h-1.5 bg-slate-100 dark:bg-slate-700 rounded-full mt-1">
                        <div className="h-full bg-primary-500 rounded-full" style={{ width: `${Math.min(100, (ev.attendees / ev.maxAttendees) * 100)}%` }} />
                      </div>
                    </td>
                    <td className="px-4 py-3"><span className={`badge capitalize ${statusColor[ev.status]}`}>{ev.status}</span></td>
                    <td className="px-4 py-3"><span className="badge bg-secondary-100 dark:bg-secondary-900/30 text-secondary-700 dark:text-secondary-400">{ev.price === 0 ? 'Free' : `$${ev.price}`}</span></td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        <button onClick={() => openEdit(ev)} title="Edit" className="p-1.5 hover:bg-primary-50 dark:hover:bg-primary-900/20 rounded-lg text-slate-400 hover:text-primary-600 transition-colors">
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button onClick={() => setDeleteId(ev.id)} title="Delete" className="p-1.5 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg text-slate-400 hover:text-red-500 transition-colors">
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {totalPages > 1 && (
            <div className="flex items-center justify-between px-4 py-3 border-t border-slate-100 dark:border-slate-700">
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Showing {(page - 1) * PER_PAGE + 1}–{Math.min(page * PER_PAGE, filtered.length)} of {filtered.length}
              </p>
              <div className="flex items-center gap-1">
                <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors">
                  <ChevronLeft className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                  <button key={p} onClick={() => setPage(p)} className={`w-8 h-8 rounded-lg text-sm font-semibold transition-colors ${page === p ? 'bg-primary-500 text-white' : 'hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-400'}`}>{p}</button>
                ))}
                <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages} className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors">
                  <ChevronRight className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto animate-slide-up">
            <div className="flex items-center justify-between p-6 border-b border-slate-100 dark:border-slate-700 sticky top-0 bg-white dark:bg-slate-800 z-10">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Calendar className="w-5 h-5 text-primary-500" />
                {editingEvent ? 'Edit Event' : 'Add New Event'}
              </h2>
              <button onClick={() => setShowModal(false)} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-xl transition-colors">
                <X className="w-5 h-5 text-slate-500" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5 block">Event Name *</label>
                <input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} className="input-field" placeholder="Enter event name" required />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5 block">Category</label>
                  <select value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))} className="input-field">
                    {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5 block">Status</label>
                  <select value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value as typeof STATUSES[number] }))} className="input-field">
                    {STATUSES.map(s => <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5 block">Date *</label>
                  <input type="date" value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))} className="input-field" required />
                </div>
                <div>
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5 block">Time</label>
                  <input value={form.time} onChange={e => setForm(f => ({ ...f, time: e.target.value }))} className="input-field" placeholder="10:00 AM" />
                </div>
              </div>
              <div>
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5 block">Location *</label>
                <input value={form.location} onChange={e => setForm(f => ({ ...f, location: e.target.value }))} className="input-field" placeholder="Venue name, City" required />
              </div>
              <div>
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5 block">Description</label>
                <textarea value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} rows={2} className="input-field resize-none" placeholder="Event description..." />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5 block">Price ($)</label>
                  <input type="number" min="0" value={form.price} onChange={e => setForm(f => ({ ...f, price: e.target.value }))} className="input-field" placeholder="0 for free" />
                </div>
                <div>
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5 block">Max Attendees</label>
                  <input type="number" min="1" value={form.maxAttendees} onChange={e => setForm(f => ({ ...f, maxAttendees: e.target.value }))} className="input-field" />
                </div>
              </div>
              <div>
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5 block">Organizer Name</label>
                <input value={form.organizerName} onChange={e => setForm(f => ({ ...f, organizerName: e.target.value }))} className="input-field" placeholder="Organizer name" />
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowModal(false)} className="flex-1 border-2 border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-300 font-semibold py-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">Cancel</button>
                <button type="submit" className="flex-1 btn-primary flex items-center justify-center gap-2">
                  <Save className="w-4 h-4" /> {editingEvent ? 'Update Event' : 'Add Event'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <ConfirmDialog open={!!deleteId} onClose={() => setDeleteId(null)} onConfirm={() => { deleteId && deleteEvent(deleteId); setDeleteId(null); }} title="Remove Event?" message="This event will be permanently removed from the platform." confirmLabel="Remove" variant="danger" />
    </div>
  );
}
