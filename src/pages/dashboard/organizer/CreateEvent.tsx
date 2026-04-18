import { useState } from 'react';
import { Calendar, MapPin, Users, DollarSign, Image, Save, Clock } from 'lucide-react';
import DashboardTopbar from '@/layouts/DashboardTopbar';
import { EVENT_CATEGORIES } from '@/constants';
import { toast } from 'sonner';

export default function CreateEvent() {
  const [form, setForm] = useState({ title: '', description: '', date: '', time: '', location: '', category: '', price: '', maxAttendees: '' });
  const [saving, setSaving] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.date || !form.location) { toast.error('Please fill required fields'); return; }
    setSaving(true);
    setTimeout(() => {
      toast.success('Event created and published!');
      setForm({ title: '', description: '', date: '', time: '', location: '', category: '', price: '', maxAttendees: '' });
      setSaving(false);
    }, 800);
  };

  return (
    <div>
      <DashboardTopbar title="Create New Event" />
      <div className="p-6 max-w-2xl">
        <div className="card p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-secondary-500 to-primary-500 rounded-2xl flex items-center justify-center">
              <Calendar className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900">Event Details</h2>
              <p className="text-slate-500 text-sm">Fill in the details for your event</p>
            </div>
          </div>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="text-sm font-semibold text-slate-700 mb-1.5 block">Event Title *</label>
              <input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} className="input-field" placeholder="e.g. City Music Festival 2026" />
            </div>
            <div>
              <label className="text-sm font-semibold text-slate-700 mb-1.5 block">Description *</label>
              <textarea value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} rows={4} className="input-field resize-none" placeholder="Describe your event..." />
            </div>
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="text-sm font-semibold text-slate-700 mb-1.5 block">Date *</label>
                <div className="relative">
                  <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input type="date" value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))} className="input-field pl-10" />
                </div>
              </div>
              <div>
                <label className="text-sm font-semibold text-slate-700 mb-1.5 block">Time *</label>
                <div className="relative">
                  <Clock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input type="time" value={form.time} onChange={e => setForm(f => ({ ...f, time: e.target.value }))} className="input-field pl-10" />
                </div>
              </div>
            </div>
            <div>
              <label className="text-sm font-semibold text-slate-700 mb-1.5 block">Location *</label>
              <div className="relative">
                <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input value={form.location} onChange={e => setForm(f => ({ ...f, location: e.target.value }))} className="input-field pl-10" placeholder="Venue name and address" />
              </div>
            </div>
            <div className="grid sm:grid-cols-3 gap-5">
              <div>
                <label className="text-sm font-semibold text-slate-700 mb-1.5 block">Category</label>
                <select value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))} className="input-field">
                  <option value="">Select</option>
                  {EVENT_CATEGORIES.filter(c => c !== 'All').map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="text-sm font-semibold text-slate-700 mb-1.5 block">Ticket Price ($)</label>
                <div className="relative">
                  <DollarSign className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input type="number" value={form.price} onChange={e => setForm(f => ({ ...f, price: e.target.value }))} className="input-field pl-10" placeholder="0 = Free" min="0" />
                </div>
              </div>
              <div>
                <label className="text-sm font-semibold text-slate-700 mb-1.5 block">Max Attendees</label>
                <div className="relative">
                  <Users className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input type="number" value={form.maxAttendees} onChange={e => setForm(f => ({ ...f, maxAttendees: e.target.value }))} className="input-field pl-10" placeholder="500" min="1" />
                </div>
              </div>
            </div>
            <div>
              <label className="text-sm font-semibold text-slate-700 mb-1.5 block">Event Banner</label>
              <div className="border-2 border-dashed border-slate-200 rounded-2xl p-8 text-center hover:border-secondary-300 transition-colors cursor-pointer">
                <Image className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                <p className="text-slate-400 text-sm">Upload event banner image</p>
              </div>
            </div>
            <button type="submit" disabled={saving} className="btn-secondary w-full py-3.5 flex items-center justify-center gap-2">
              {saving ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Save className="w-4 h-4" />}
              {saving ? 'Publishing...' : 'Publish Event'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
