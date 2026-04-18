import { Calendar, MapPin, Users, Clock, Tag } from 'lucide-react';
import { Event } from '@/types';

interface EventCardProps { event: Event; onBook?: () => void; }

export default function EventCard({ event, onBook }: EventCardProps) {
  const pct = Math.round((event.attendees / event.maxAttendees) * 100);
  const statusColor = { upcoming: 'bg-accent-100 text-accent-700', ongoing: 'bg-amber-100 text-amber-700', completed: 'bg-slate-100 text-slate-600', cancelled: 'bg-red-100 text-red-600' }[event.status];

  return (
    <div className="card overflow-hidden group">
      <div className="relative h-44 overflow-hidden">
        <img src={event.image} alt={event.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
        <div className="absolute top-3 left-3 flex gap-2">
          <span className={`badge ${statusColor} capitalize`}>{event.status}</span>
          <span className="badge bg-white/90 text-slate-700">{event.category}</span>
        </div>
        <div className="absolute top-3 right-3">
          <span className="badge bg-secondary-500 text-white">{event.price === 0 ? 'Free' : `$${event.price}`}</span>
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-bold text-slate-900 text-lg leading-tight line-clamp-1">{event.title}</h3>
        <p className="text-slate-500 text-sm mt-1 line-clamp-2">{event.description}</p>
        <div className="grid grid-cols-2 gap-2 mt-3">
          <div className="flex items-center gap-1 text-xs text-slate-500">
            <Calendar className="w-3.5 h-3.5 text-primary-500" /> {event.date}
          </div>
          <div className="flex items-center gap-1 text-xs text-slate-500">
            <Clock className="w-3.5 h-3.5 text-primary-500" /> {event.time}
          </div>
          <div className="flex items-center gap-1 text-xs text-slate-500 col-span-2">
            <MapPin className="w-3.5 h-3.5 text-primary-500" /> {event.location}
          </div>
        </div>
        <div className="mt-3">
          <div className="flex justify-between text-xs text-slate-500 mb-1">
            <span className="flex items-center gap-1"><Users className="w-3 h-3" /> {event.attendees} / {event.maxAttendees}</span>
            <span>{pct}% full</span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-1.5">
            <div className="h-1.5 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500" style={{ width: `${pct}%` }} />
          </div>
        </div>
        {onBook && (
          <button onClick={onBook} className="mt-4 w-full btn-primary text-sm">
            {event.status === 'upcoming' ? 'Book Now' : 'View Details'}
          </button>
        )}
      </div>
    </div>
  );
}
