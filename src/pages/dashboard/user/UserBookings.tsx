import { useState } from 'react';
import { Calendar, Clock, CheckCircle, XCircle, AlertCircle, Plus, X, RefreshCw, MapPin, Users } from 'lucide-react';
import { MOCK_BUSINESSES, MOCK_EVENTS } from '@/constants';
import { Booking } from '@/types';
import ConfirmDialog from '@/components/ui/ConfirmDialog';
import DashboardTopbar from '@/layouts/DashboardTopbar';
import { toast } from 'sonner';

const INITIAL_BOOKINGS: Booking[] = [
  { id: '1', userId: '1', eventId: '1', type: 'event', date: '2026-05-15', status: 'confirmed', title: 'City Music Festival 2026' },
  { id: '2', userId: '1', businessId: '1', type: 'table', date: '2026-04-25', status: 'pending', title: 'Table at The Urban Brew' },
  { id: '3', userId: '1', eventId: '3', type: 'event', date: '2026-05-01', status: 'confirmed', title: 'Street Food Carnival' },
];

interface BookingForm {
  type: 'event' | 'table' | 'service';
  referenceId: string;
  date: string;
  timeSlot: string;
  guests: string;
  notes: string;
}

const emptyForm = (): BookingForm => ({
  type: 'table', referenceId: '', date: '', timeSlot: '12:00 PM',
  guests: '2', notes: '',
});

const TIME_SLOTS = ['9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM', '7:00 PM', '8:00 PM'];

export default function UserBookings() {
  const [bookings, setBookings] = useState<Booking[]>(INITIAL_BOOKINGS);
  const [cancelId, setCancelId] = useState<string | null>(null);
  const [rescheduleId, setRescheduleId] = useState<string | null>(null);
  const [newDate, setNewDate] = useState('');
  const [filter, setFilter] = useState<'all' | 'confirmed' | 'pending' | 'cancelled'>('all');
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState<BookingForm>(emptyForm());
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<'bookings' | 'new-event' | 'new-table'>('bookings');

  const filtered = bookings.filter(b => filter === 'all' || b.status === filter);

  const cancelBooking = (id: string) => {
    setBookings(prev => prev.map(b => b.id === id ? { ...b, status: 'cancelled' as const } : b));
    toast.success('Booking cancelled successfully');
  };

  const rescheduleBooking = () => {
    if (!newDate || !rescheduleId) { toast.error('Please select a date'); return; }
    setBookings(prev => prev.map(b => b.id === rescheduleId ? { ...b, date: newDate, status: 'pending' as const } : b));
    toast.success('Booking rescheduled — awaiting confirmation');
    setRescheduleId(null);
    setNewDate('');
  };

  const handleBookEvent = (event: typeof MOCK_EVENTS[0]) => {
    setSaving(true);
    setTimeout(() => {
      const newBooking: Booking = {
        id: Date.now().toString(),
        userId: '1', eventId: event.id, type: 'event',
        date: event.date, status: 'confirmed',
        title: event.title,
      };
      setBookings(prev => [...prev, newBooking]);
      toast.success(`Registered for ${event.title}!`);
      setSaving(false);
      setActiveTab('bookings');
    }, 900);
  };

  const handleBookTable = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.referenceId || !form.date) { toast.error('Please fill all required fields'); return; }
    setSaving(true);
    const business = MOCK_BUSINESSES.find(b => b.id === form.referenceId);
    setTimeout(() => {
      const newBooking: Booking = {
        id: Date.now().toString(),
        userId: '1', businessId: form.referenceId, type: 'table',
        date: form.date, status: 'pending',
        title: `Table at ${business?.name || 'Restaurant'}`,
      };
      setBookings(prev => [...prev, newBooking]);
      toast.success('Table booking submitted! Awaiting confirmation.');
      setForm(emptyForm());
      setSaving(false);
      setActiveTab('bookings');
    }, 900);
  };

  const statusIcon: Record<string, React.ReactNode> = {
    confirmed: <CheckCircle className="w-4 h-4 text-accent-500" />,
    pending: <AlertCircle className="w-4 h-4 text-amber-500" />,
    cancelled: <XCircle className="w-4 h-4 text-red-500" />,
  };
  const statusBadge: Record<string, string> = {
    confirmed: 'bg-accent-100 dark:bg-accent-900/30 text-accent-700 dark:text-accent-400',
    pending: 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400',
    cancelled: 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400',
  };
  const typeIcon: Record<string, React.ReactNode> = {
    event: <Calendar className="w-6 h-6 text-white" />,
    table: <Users className="w-6 h-6 text-white" />,
    service: <MapPin className="w-6 h-6 text-white" />,
  };
  const typeBg: Record<string, string> = {
    event: 'from-primary-500 to-secondary-500',
    table: 'from-accent-500 to-primary-500',
    service: 'from-secondary-500 to-accent-500',
  };

  return (
    <div className="dark:bg-slate-950 min-h-screen">
      <DashboardTopbar title="My Bookings" notifPath="/dashboard/user/notifications" />
      <div className="p-6 max-w-4xl">
        {/* Tab navigation */}
        <div className="flex gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-2xl mb-6">
          {[
            { key: 'bookings', label: `All Bookings (${bookings.length})` },
            { key: 'new-event', label: '+ Book Event' },
            { key: 'new-table', label: '+ Book Table' },
          ].map(t => (
            <button key={t.key} onClick={() => setActiveTab(t.key as typeof activeTab)} className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all ${activeTab === t.key ? 'bg-white dark:bg-slate-700 text-primary-600 dark:text-primary-400 shadow-sm' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'}`}>
              {t.label}
            </button>
          ))}
        </div>

        {/* === BOOKINGS LIST === */}
        {activeTab === 'bookings' && (
          <>
            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              {[
                { label: 'Confirmed', value: bookings.filter(b => b.status === 'confirmed').length, color: 'text-accent-600' },
                { label: 'Pending', value: bookings.filter(b => b.status === 'pending').length, color: 'text-amber-500' },
                { label: 'Cancelled', value: bookings.filter(b => b.status === 'cancelled').length, color: 'text-red-500' },
              ].map(s => (
                <div key={s.label} className="card dark:bg-slate-800 p-4 text-center">
                  <p className={`text-2xl font-black ${s.color}`}>{s.value}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{s.label}</p>
                </div>
              ))}
            </div>

            {/* Status filter */}
            <div className="flex gap-2 mb-4 overflow-x-auto scrollbar-hide">
              {(['all', 'confirmed', 'pending', 'cancelled'] as const).map(f => (
                <button key={f} onClick={() => setFilter(f)} className={`whitespace-nowrap px-4 py-2 rounded-xl text-sm font-medium capitalize transition-all ${filter === f ? 'bg-primary-500 text-white' : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-primary-300'}`}>{f}</button>
              ))}
            </div>

            {filtered.length === 0 ? (
              <div className="text-center py-16 card dark:bg-slate-800 p-10">
                <Calendar className="w-10 h-10 text-slate-300 mx-auto mb-3" />
                <p className="text-slate-500 dark:text-slate-400 font-medium">No bookings found</p>
                <p className="text-xs text-slate-400 mt-1 mb-4">Book an event or table to get started</p>
                <button onClick={() => setActiveTab('new-event')} className="btn-primary text-sm">Book an Event</button>
              </div>
            ) : (
              <div className="space-y-3">
                {filtered.map(b => (
                  <div key={b.id} className="card dark:bg-slate-800 p-4 flex items-center gap-4 group">
                    <div className={`w-12 h-12 bg-gradient-to-br ${typeBg[b.type] || 'from-primary-500 to-secondary-500'} rounded-2xl flex items-center justify-center flex-shrink-0`}>
                      {typeIcon[b.type]}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-slate-900 dark:text-white truncate">{b.title}</h3>
                      <div className="flex items-center gap-3 mt-0.5 flex-wrap">
                        <span className="text-xs text-slate-400 flex items-center gap-1"><Clock className="w-3 h-3" /> {b.date}</span>
                        <span className="badge bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 capitalize">{b.type}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <div className="flex items-center gap-1.5">
                        {statusIcon[b.status]}
                        <span className={`badge ${statusBadge[b.status]} capitalize`}>{b.status}</span>
                      </div>
                      {b.status !== 'cancelled' && (
                        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button onClick={() => { setRescheduleId(b.id); setNewDate(b.date); }} title="Reschedule" className="p-1.5 border border-slate-200 dark:border-slate-600 rounded-lg hover:bg-primary-50 dark:hover:bg-primary-900/20 text-slate-500 dark:text-slate-400 hover:text-primary-600 transition-colors">
                            <RefreshCw className="w-3.5 h-3.5" />
                          </button>
                          <button onClick={() => setCancelId(b.id)} title="Cancel" className="p-1.5 border border-red-200 dark:border-red-800 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-red-400 hover:text-red-600 transition-colors">
                            <XCircle className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {/* === BOOK EVENT === */}
        {activeTab === 'new-event' && (
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Available Events</h2>
            <div className="grid gap-4">
              {MOCK_EVENTS.filter(e => e.status === 'upcoming').map(event => {
                const alreadyBooked = bookings.some(b => b.eventId === event.id && b.status !== 'cancelled');
                const spotsLeft = event.maxAttendees - event.attendees;
                return (
                  <div key={event.id} className="card dark:bg-slate-800 p-4 flex gap-4 items-start">
                    <img src={event.image} alt={event.title} className="w-20 h-20 rounded-2xl object-cover flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h3 className="font-bold text-slate-900 dark:text-white">{event.title}</h3>
                          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{event.date} · {event.time}</p>
                          <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1 mt-0.5">
                            <MapPin className="w-3 h-3" /> {event.location}
                          </p>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <p className="text-lg font-black text-primary-600 dark:text-primary-400">{event.price === 0 ? 'Free' : `$${event.price}`}</p>
                          <p className="text-xs text-slate-400">{spotsLeft} spots left</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center gap-2">
                          <span className="badge bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400">{event.category}</span>
                          <div className="w-24 h-1.5 bg-slate-100 dark:bg-slate-700 rounded-full">
                            <div className="h-full bg-primary-500 rounded-full" style={{ width: `${(event.attendees / event.maxAttendees) * 100}%` }} />
                          </div>
                        </div>
                        {alreadyBooked ? (
                          <span className="badge bg-accent-100 dark:bg-accent-900/30 text-accent-700 dark:text-accent-400"><CheckCircle className="w-3 h-3" /> Registered</span>
                        ) : (
                          <button onClick={() => handleBookEvent(event)} disabled={saving || spotsLeft === 0} className="btn-primary text-sm py-2 px-4 disabled:opacity-60">
                            {saving ? '...' : spotsLeft === 0 ? 'Full' : 'Register'}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* === BOOK TABLE === */}
        {activeTab === 'new-table' && (
          <div className="card dark:bg-slate-800 p-6">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
              <Users className="w-5 h-5 text-primary-500" /> Book a Table
            </h2>
            <form onSubmit={handleBookTable} className="space-y-5">
              <div>
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5 block">Select Restaurant *</label>
                <select value={form.referenceId} onChange={e => setForm(f => ({ ...f, referenceId: e.target.value }))} className="input-field" required>
                  <option value="">Choose a restaurant...</option>
                  {MOCK_BUSINESSES.filter(b => ['Restaurant', 'Cafe'].includes(b.category)).map(b => (
                    <option key={b.id} value={b.id}>{b.name} — {b.address}</option>
                  ))}
                </select>
              </div>

              {form.referenceId && (
                <div className="flex gap-3 items-center p-3 bg-primary-50 dark:bg-primary-900/20 rounded-2xl">
                  {(() => {
                    const biz = MOCK_BUSINESSES.find(b => b.id === form.referenceId);
                    return biz ? (
                      <>
                        <img src={biz.image} alt={biz.name} className="w-12 h-12 rounded-xl object-cover" />
                        <div>
                          <p className="font-bold text-slate-900 dark:text-white text-sm">{biz.name}</p>
                          <p className="text-xs text-slate-500 dark:text-slate-400">{biz.hours}</p>
                          <div className="flex items-center gap-1 mt-0.5">
                            <span className="text-amber-400 text-xs">★</span>
                            <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">{biz.rating}</span>
                          </div>
                        </div>
                      </>
                    ) : null;
                  })()}
                </div>
              )}

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5 block">Date *</label>
                  <input type="date" value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))} className="input-field" min={new Date().toISOString().slice(0, 10)} required />
                </div>
                <div>
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5 block">Time Slot</label>
                  <select value={form.timeSlot} onChange={e => setForm(f => ({ ...f, timeSlot: e.target.value }))} className="input-field">
                    {TIME_SLOTS.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
              </div>

              <div>
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5 block">Number of Guests</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5, 6, 7, 8].map(n => (
                    <button key={n} type="button" onClick={() => setForm(f => ({ ...f, guests: String(n) }))} className={`w-10 h-10 rounded-xl text-sm font-bold border-2 transition-all ${form.guests === String(n) ? 'bg-primary-500 text-white border-primary-500' : 'border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-400 hover:border-primary-300'}`}>
                      {n}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5 block">Special Requests</label>
                <textarea value={form.notes} onChange={e => setForm(f => ({ ...f, notes: e.target.value }))} rows={2} className="input-field resize-none" placeholder="Allergies, special occasions, seating preferences..." />
              </div>

              <div className="bg-slate-50 dark:bg-slate-700/50 rounded-2xl p-4 text-sm text-slate-600 dark:text-slate-400">
                <p className="font-semibold text-slate-800 dark:text-slate-200 mb-1">Booking Summary</p>
                <p>{form.referenceId ? MOCK_BUSINESSES.find(b => b.id === form.referenceId)?.name : 'Restaurant not selected'}</p>
                <p>{form.date || 'Date not selected'} at {form.timeSlot}</p>
                <p>{form.guests} guest{Number(form.guests) > 1 ? 's' : ''}</p>
              </div>

              <div className="flex gap-3">
                <button type="button" onClick={() => setForm(emptyForm())} className="flex-1 border-2 border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-300 font-semibold py-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors flex items-center justify-center gap-2">
                  <X className="w-4 h-4" /> Clear
                </button>
                <button type="submit" disabled={saving} className="flex-1 btn-primary py-3 flex items-center justify-center gap-2">
                  {saving ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Calendar className="w-4 h-4" />}
                  {saving ? 'Booking...' : 'Confirm Booking'}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>

      {/* Reschedule Modal */}
      {rescheduleId && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 w-full max-w-sm shadow-2xl animate-slide-up">
            <h3 className="font-bold text-slate-900 dark:text-white text-lg mb-4 flex items-center gap-2">
              <RefreshCw className="w-5 h-5 text-primary-500" /> Reschedule Booking
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">Select a new date for your booking. Status will be set to pending for reconfirmation.</p>
            <input type="date" value={newDate} onChange={e => setNewDate(e.target.value)} className="input-field mb-4" min={new Date().toISOString().slice(0, 10)} />
            <div className="flex gap-3">
              <button onClick={() => setRescheduleId(null)} className="flex-1 border-2 border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-300 font-semibold py-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">Cancel</button>
              <button onClick={rescheduleBooking} className="flex-1 btn-primary py-2.5">Reschedule</button>
            </div>
          </div>
        </div>
      )}

      <ConfirmDialog
        open={!!cancelId}
        onClose={() => setCancelId(null)}
        onConfirm={() => { cancelId && cancelBooking(cancelId); setCancelId(null); }}
        title="Cancel Booking?"
        message="Are you sure you want to cancel this booking? This action cannot be undone."
        confirmLabel="Cancel Booking"
        variant="danger"
      />
    </div>
  );
}
