import { Calendar, Users, TrendingUp, DollarSign, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import StatCard from '@/components/features/StatCard';
import { MOCK_EVENTS } from '@/constants';
import EventCard from '@/components/features/EventCard';
import DashboardTopbar from '@/layouts/DashboardTopbar';
import { useAuth } from '@/hooks/useAuth';

export default function OrganizerHome() {
  const { user } = useAuth();
  const myEvents = MOCK_EVENTS.slice(0, 4);

  return (
    <div>
      <DashboardTopbar title="Organizer Dashboard" />
      <div className="p-6 max-w-6xl space-y-6">
        {/* Welcome */}
        <div className="bg-gradient-to-r from-secondary-600 to-primary-600 rounded-3xl p-6 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-grid opacity-10" />
          <div className="relative">
            <p className="text-secondary-100">Welcome back,</p>
            <h2 className="text-2xl font-display font-black">{user?.name} 🎉</h2>
            <p className="text-secondary-100 mt-1 text-sm">You have {myEvents.filter(e => e.status === 'upcoming').length} upcoming events</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard title="Total Events" value={myEvents.length} change="+2 this month" positive icon={<Calendar className="w-6 h-6 text-secondary-600" />} color="bg-secondary-100" />
          <StatCard title="Total Attendees" value="3,840" change="+15% this month" positive icon={<Users className="w-6 h-6 text-primary-600" />} color="bg-primary-100" />
          <StatCard title="Revenue" value="$12,400" change="+$2.3K this week" positive icon={<DollarSign className="w-6 h-6 text-accent-600" />} color="bg-accent-100" />
          <StatCard title="Avg Attendance" value="87%" change="+5% improvement" positive icon={<TrendingUp className="w-6 h-6 text-amber-600" />} color="bg-amber-100" />
        </div>

        {/* Events Preview */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-slate-900 text-lg">My Events</h3>
            <Link to="/dashboard/organizer/manage" className="text-sm text-secondary-600 font-medium flex items-center gap-1">View All <ChevronRight className="w-4 h-4" /></Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {myEvents.slice(0, 3).map(e => <EventCard key={e.id} event={e} />)}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Create Event', path: '/dashboard/organizer/create', color: 'from-secondary-500 to-secondary-600' },
            { label: 'View Attendees', path: '/dashboard/organizer/attendees', color: 'from-primary-500 to-primary-600' },
            { label: 'Analytics', path: '/dashboard/organizer/analytics', color: 'from-accent-500 to-accent-600' },
            { label: 'Manage Events', path: '/dashboard/organizer/manage', color: 'from-amber-500 to-orange-500' },
          ].map(a => (
            <Link key={a.label} to={a.path} className={`bg-gradient-to-br ${a.color} rounded-2xl p-5 text-white font-bold text-sm hover:opacity-90 transition-opacity shadow-lg`}>
              {a.label} →
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
