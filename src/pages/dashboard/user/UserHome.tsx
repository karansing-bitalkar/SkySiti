import { Link } from 'react-router-dom';
import { MapPin, Calendar, Tag, Star, Clock, ChevronRight, Search } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { MOCK_BUSINESSES, MOCK_EVENTS, MOCK_NOTIFICATIONS, MOCK_BOOKINGS } from '@/constants';
import StatCard from '@/components/features/StatCard';
import BusinessCard from '@/components/features/BusinessCard';
import DashboardTopbar from '@/layouts/DashboardTopbar';

export default function UserHome() {
  const { user } = useAuth();
  const unread = MOCK_NOTIFICATIONS.filter(n => !n.read).length;

  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';

  return (
    <div className="dark:bg-slate-950 min-h-screen">
      <DashboardTopbar title="My Dashboard" notifPath="/dashboard/user/notifications" />
      <div className="p-6 space-y-6 max-w-6xl">
        {/* Welcome Banner */}
        <div className="bg-gradient-to-r from-primary-500 to-secondary-600 rounded-3xl p-6 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-grid opacity-10" />
          <div className="relative flex items-center justify-between flex-wrap gap-4">
            <div>
              <p className="text-primary-100 text-sm">{greeting}!</p>
              <h2 className="text-2xl font-display font-black mt-0.5">{user?.name} 👋</h2>
              <p className="text-primary-100 mt-1 text-sm flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" /> {user?.location || 'Downtown, SkySiti'}
              </p>
            </div>
            <Link to="/dashboard/user/search" className="bg-white/20 hover:bg-white/30 text-white font-semibold px-5 py-2.5 rounded-2xl backdrop-blur-sm flex items-center gap-2 transition-all border border-white/20">
              <Search className="w-4 h-4" /> Explore City
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard title="Bookings" value={MOCK_BOOKINGS.length} change="+2 this week" positive icon={<Calendar className="w-6 h-6 text-primary-600 dark:text-primary-400" />} color="bg-primary-100 dark:bg-primary-900/30" />
          <StatCard title="Saved Places" value="12" change="+3 this week" positive icon={<MapPin className="w-6 h-6 text-secondary-600 dark:text-secondary-400" />} color="bg-secondary-100 dark:bg-secondary-900/30" />
          <StatCard title="Active Offers" value="5" icon={<Tag className="w-6 h-6 text-accent-600 dark:text-accent-400" />} color="bg-accent-100 dark:bg-accent-900/30" />
          <StatCard title="Notifications" value={unread} icon={<Star className="w-6 h-6 text-amber-600 dark:text-amber-400" />} color="bg-amber-100 dark:bg-amber-900/30" />
        </div>

        {/* Upcoming Bookings */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm p-6">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-bold text-slate-900 dark:text-white text-lg">Upcoming Bookings</h3>
            <Link to="/dashboard/user/bookings" className="text-sm text-primary-600 dark:text-primary-400 font-medium flex items-center gap-1 hover:gap-2 transition-all">
              View All <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="space-y-3">
            {MOCK_BOOKINGS.map(b => (
              <div key={b.id} className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-700/50 rounded-2xl hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Calendar className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900 dark:text-white text-sm">{b.title}</p>
                    <p className="text-xs text-slate-400 flex items-center gap-1"><Clock className="w-3 h-3" /> {b.date}</p>
                  </div>
                </div>
                <span className={`badge capitalize ${b.status === 'confirmed' ? 'bg-accent-100 dark:bg-accent-900/30 text-accent-700 dark:text-accent-400' : 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400'}`}>{b.status}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Nearby Businesses */}
        <div>
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-bold text-slate-900 dark:text-white text-lg">Nearby Trending</h3>
            <Link to="/dashboard/user/search" className="text-sm text-primary-600 dark:text-primary-400 font-medium flex items-center gap-1 hover:gap-2 transition-all">
              Explore More <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {MOCK_BUSINESSES.slice(0, 3).map(b => (
              <BusinessCard key={b.id} business={b} linkTo={`/dashboard/user/place/${b.id}`} />
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-slate-900 dark:text-white text-lg">Recent Activity</h3>
            <Link to="/dashboard/user/notifications" className="text-sm text-primary-600 dark:text-primary-400 font-medium flex items-center gap-1">
              View All <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="space-y-3">
            {MOCK_NOTIFICATIONS.slice(0, 3).map(n => (
              <div key={n.id} className={`flex items-start gap-3 p-3 rounded-xl transition-colors ${!n.read ? 'bg-primary-50 dark:bg-primary-900/20' : 'hover:bg-slate-50 dark:hover:bg-slate-700/50'}`}>
                <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${!n.read ? 'bg-primary-500' : 'bg-slate-300 dark:bg-slate-600'}`} />
                <div>
                  <p className="text-sm font-medium text-slate-800 dark:text-slate-200">{n.title}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{n.message}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
