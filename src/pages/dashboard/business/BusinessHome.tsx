import { TrendingUp, Eye, Users, Star, MessageSquare, ChevronRight, BarChart2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import StatCard from '@/components/features/StatCard';
import DashboardTopbar from '@/layouts/DashboardTopbar';
import { MOCK_REVIEWS } from '@/constants';

const weeklyData = [
  { day: 'Mon', views: 45, leads: 8 }, { day: 'Tue', views: 72, leads: 14 }, { day: 'Wed', views: 58, leads: 10 },
  { day: 'Thu', views: 90, leads: 18 }, { day: 'Fri', views: 105, leads: 22 }, { day: 'Sat', views: 130, leads: 28 }, { day: 'Sun', views: 88, leads: 16 },
];
const maxViews = Math.max(...weeklyData.map(d => d.views));

export default function BusinessHome() {
  return (
    <div>
      <DashboardTopbar title="Business Analytics" />
      <div className="p-6 max-w-6xl space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard title="Total Views" value="2,847" change="+18% this week" positive icon={<Eye className="w-6 h-6 text-primary-600" />} color="bg-primary-100" />
          <StatCard title="Inquiries" value="124" change="+7 this week" positive icon={<MessageSquare className="w-6 h-6 text-secondary-600" />} color="bg-secondary-100" />
          <StatCard title="Reviews" value="48" change="+5 new" positive icon={<Star className="w-6 h-6 text-amber-600" />} color="bg-amber-100" />
          <StatCard title="Avg Rating" value="4.7" change="+0.1 this month" positive icon={<TrendingUp className="w-6 h-6 text-accent-600" />} color="bg-accent-100" />
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Chart */}
          <div className="lg:col-span-2 card p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-slate-900 text-lg">Weekly Performance</h3>
              <div className="flex gap-3 text-xs">
                <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-primary-500" /> Views</span>
                <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-accent-500" /> Leads</span>
              </div>
            </div>
            <div className="flex items-end gap-3 h-36">
              {weeklyData.map(d => (
                <div key={d.day} className="flex-1 flex flex-col items-center gap-1">
                  <div className="w-full flex flex-col items-center gap-1">
                    <div className="w-full rounded-t-lg bg-primary-200 relative overflow-hidden" style={{ height: `${(d.views / maxViews) * 120}px` }}>
                      <div className="absolute bottom-0 inset-x-0 bg-primary-500 rounded-t-lg transition-all" style={{ height: '60%' }} />
                    </div>
                    <div className="w-2/3 bg-accent-200 rounded-t-lg" style={{ height: `${(d.leads / maxViews) * 60}px` }} />
                  </div>
                  <p className="text-xs text-slate-400">{d.day}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Reviews */}
          <div className="card p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-slate-900">Recent Reviews</h3>
              <Link to="/dashboard/business/reviews" className="text-xs text-primary-600 flex items-center gap-1">All <ChevronRight className="w-3.5 h-3.5" /></Link>
            </div>
            <div className="space-y-4">
              {MOCK_REVIEWS.slice(0, 3).map(r => (
                <div key={r.id} className="flex gap-3">
                  <img src={r.avatar} alt={r.userName} className="w-8 h-8 rounded-xl object-cover flex-shrink-0" />
                  <div>
                    <div className="flex items-center gap-1 mb-0.5">
                      <p className="text-xs font-semibold text-slate-900">{r.userName}</p>
                      <div className="flex">{[...Array(r.rating)].map((_, i) => <span key={i} className="text-amber-400 text-xs">★</span>)}</div>
                    </div>
                    <p className="text-xs text-slate-500 line-clamp-2">{r.comment}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Add Listing', path: '/dashboard/business/add', color: 'from-primary-500 to-primary-600' },
            { label: 'Create Offer', path: '/dashboard/business/offers', color: 'from-secondary-500 to-secondary-600' },
            { label: 'View Messages', path: '/dashboard/business/messages', color: 'from-accent-500 to-accent-600' },
            { label: 'Manage Reviews', path: '/dashboard/business/reviews', color: 'from-amber-500 to-orange-500' },
          ].map(a => (
            <Link key={a.label} to={a.path} className={`bg-gradient-to-br ${a.color} rounded-2xl p-5 text-white font-bold text-sm hover:opacity-90 transition-opacity shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all`}>
              {a.label} →
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
