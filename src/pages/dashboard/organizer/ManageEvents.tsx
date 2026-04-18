import { useState } from 'react';
import { Edit2, Trash2, Users, Calendar, Eye, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { MOCK_EVENTS } from '@/constants';
import { Event } from '@/types';
import Modal from '@/components/ui/Modal';
import ConfirmDialog from '@/components/ui/ConfirmDialog';
import DashboardTopbar from '@/layouts/DashboardTopbar';
import { toast } from 'sonner';

export default function ManageEvents() {
  const [events, setEvents] = useState(MOCK_EVENTS);
  const [editEvent, setEditEvent] = useState<Event | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const deleteEvent = (id: string) => { setEvents(prev => prev.filter(e => e.id !== id)); toast.success('Event deleted'); };
  const saveEdit = (updated: Event) => { setEvents(prev => prev.map(e => e.id === updated.id ? updated : e)); setEditEvent(null); toast.success('Event updated!'); };

  const statusColor: Record<string, string> = { upcoming: 'bg-accent-100 text-accent-700', ongoing: 'bg-amber-100 text-amber-700', completed: 'bg-slate-100 text-slate-600', cancelled: 'bg-red-100 text-red-600' };

  return (
    <div>
      <DashboardTopbar title="Manage Events" />
      <div className="p-6 max-w-5xl">
        <div className="flex justify-end mb-6">
          <Link to="/dashboard/organizer/create" className="btn-secondary flex items-center gap-2"><Plus className="w-4 h-4" /> Create Event</Link>
        </div>
        <div className="space-y-4">
          {events.map(e => (
            <div key={e.id} className="card p-5 flex items-center gap-4">
              <img src={e.image} alt={e.title} className="w-16 h-16 rounded-2xl object-cover flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-bold text-slate-900 truncate">{e.title}</h3>
                  <span className={`badge capitalize ${statusColor[e.status]}`}>{e.status}</span>
                  {e.price === 0 ? <span className="badge bg-accent-100 text-accent-700">Free</span> : <span className="badge bg-secondary-100 text-secondary-700">${e.price}</span>}
                </div>
                <div className="flex items-center gap-3 mt-1 text-xs text-slate-400">
                  <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {e.date}</span>
                  <span className="flex items-center gap-1"><Users className="w-3 h-3" /> {e.attendees}/{e.maxAttendees}</span>
                </div>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <Link to="/dashboard/organizer/attendees" className="p-2 text-slate-400 hover:text-accent-600 hover:bg-accent-50 rounded-xl transition-colors"><Eye className="w-4 h-4" /></Link>
                <button onClick={() => setEditEvent(e)} className="p-2 text-slate-400 hover:text-primary-600 hover:bg-primary-50 rounded-xl transition-colors"><Edit2 className="w-4 h-4" /></button>
                <button onClick={() => setDeleteId(e.id)} className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors"><Trash2 className="w-4 h-4" /></button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Modal open={!!editEvent} onClose={() => setEditEvent(null)} title="Edit Event">
        {editEvent && (
          <div className="space-y-4">
            <div><label className="text-sm font-semibold text-slate-700 mb-1.5 block">Title</label><input value={editEvent.title} onChange={e => setEditEvent({ ...editEvent, title: e.target.value })} className="input-field" /></div>
            <div><label className="text-sm font-semibold text-slate-700 mb-1.5 block">Description</label><textarea value={editEvent.description} onChange={e => setEditEvent({ ...editEvent, description: e.target.value })} rows={3} className="input-field resize-none" /></div>
            <div className="grid grid-cols-2 gap-4">
              <div><label className="text-sm font-semibold text-slate-700 mb-1.5 block">Date</label><input type="date" value={editEvent.date} onChange={e => setEditEvent({ ...editEvent, date: e.target.value })} className="input-field" /></div>
              <div><label className="text-sm font-semibold text-slate-700 mb-1.5 block">Status</label>
                <select value={editEvent.status} onChange={e => setEditEvent({ ...editEvent, status: e.target.value as Event['status'] })} className="input-field">
                  <option value="upcoming">Upcoming</option><option value="ongoing">Ongoing</option><option value="completed">Completed</option><option value="cancelled">Cancelled</option>
                </select>
              </div>
            </div>
            <div className="flex gap-3 pt-2">
              <button onClick={() => setEditEvent(null)} className="flex-1 border border-slate-200 rounded-xl py-2.5 font-medium text-slate-700 hover:bg-slate-50">Cancel</button>
              <button onClick={() => saveEdit(editEvent)} className="flex-1 btn-secondary py-2.5">Save Changes</button>
            </div>
          </div>
        )}
      </Modal>
      <ConfirmDialog open={!!deleteId} onClose={() => setDeleteId(null)} onConfirm={() => deleteId && deleteEvent(deleteId)} title="Delete Event?" message="This will permanently remove the event and all registrations." confirmLabel="Delete" variant="danger" />
    </div>
  );
}
