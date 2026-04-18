import { BarChart2, TrendingUp, Users, Building2, Calendar, Download } from 'lucide-react';
import StatCard from '@/components/features/StatCard';
import DashboardTopbar from '@/layouts/DashboardTopbar';
import { toast } from 'sonner';

const weekData = [
  { day: 'Mon', users: 320, revenue: 4200 },
  { day: 'Tue', users: 480, revenue: 6100 },
  { day: 'Wed', users: 390, revenue: 5200 },
  { day: 'Thu', users: 560, revenue: 7400 },
  { day: 'Fri', users: 720, revenue: 9100 },
  { day: 'Sat', users: 840, revenue: 10800 },
  { day: 'Sun', users: 610, revenue: 7900 },
];
const maxU = Math.max(...weekData.map(d => d.users));

const categoryData = [
  { cat: 'Restaurants', count: 2840, pct: 48 },
  { cat: 'Retail', count: 1560, pct: 26 },
  { cat: 'Health', count: 980, pct: 16 },
  { cat: 'Entertainment', count: 600, pct: 10 },
];

export default function AdminReports() {
  return (
    <div className="dark:bg-slate-950 min-h-screen">
      <DashboardTopbar title="Reports & Analytics" />
      <div className="p-6 max-w-6xl space-y-6">
        <div className="flex justify-end">
          <button onClick={() => toast.success('Report exported as PDF!')} className="flex items-center gap-2 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium px-4 py-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors text-sm shadow-sm">
            <Download className="w-4 h-4" /> Export Report
          </button>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard title="Monthly Revenue" value="$84,200" change="+22% vs last mo" positive icon={<TrendingUp className="w-6 h-6 text-accent-600 dark:text-accent-400" />} color="bg-accent-100 dark:bg-accent-900/30" />
          <StatCard title="New Users" value="3,284" change="+12% this month" positive icon={<Users className="w-6 h-6 text-primary-600 dark:text-primary-400" />} color="bg-primary-100 dark:bg-primary-900/30" />
          <StatCard title="New Listings" value="284" change="+45 this week" positive icon={<Building2 className="w-6 h-6 text-secondary-600 dark:text-secondary-400" />} color="bg-secondary-100 dark:bg-secondary-900/30" />
          <StatCard title="Events Created" value="48" change="+8 this month" positive icon={<Calendar className="w-6 h-6 text-amber-600 dark:text-amber-400" />} color="bg-amber-100 dark:bg-amber-900/30" />
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Weekly Traffic */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm p-6">
            <h3 className="font-bold text-slate-900 dark:text-white text-lg mb-5 flex items-center gap-2">
              <BarChart2 className="w-5 h-5 text-primary-500" /> Weekly Active Users
            </h3>
            <div className="flex items-end gap-3 h-32 mb-2">
              {weekData.map(d => (
                <div key={d.day} className="flex-1 flex flex-col items-center gap-1">
                  <div
                    className="w-full bg-primary-100 dark:bg-primary-900/30 rounded-t-lg relative overflow-hidden"
                    style={{ height: `${(d.users / maxU) * 110}px` }}
                  >
                    <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-primary-600 to-primary-400 rounded-t-lg" style={{ height: '100%' }} />
                  </div>
                  <p className="text-xs text-slate-400">{d.day}</p>
                </div>
              ))}
            </div>
            <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-700">
              <span>Total this week: <strong className="text-slate-900 dark:text-white">3,920</strong></span>
              <span className="text-accent-600 dark:text-accent-400">↑ 14% vs last week</span>
            </div>
          </div>

          {/* Business Categories */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm p-6">
            <h3 className="font-bold text-slate-900 dark:text-white text-lg mb-5">Business by Category</h3>
            <div className="space-y-4">
              {categoryData.map(c => (
                <div key={c.cat}>
                  <div className="flex justify-between text-sm mb-1.5">
                    <span className="text-slate-700 dark:text-slate-300 font-medium">{c.cat}</span>
                    <span className="text-slate-500 dark:text-slate-400">{c.count.toLocaleString()} ({c.pct}%)</span>
                  </div>
                  <div className="h-2.5 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full" style={{ width: `${c.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
              <span>Total listings: <strong className="text-slate-900 dark:text-white">5,980</strong></span>
              <span className="text-accent-600 dark:text-accent-400">↑ 8% this month</span>
            </div>
          </div>
        </div>

        {/* City Performance */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm p-6">
          <h3 className="font-bold text-slate-900 dark:text-white text-lg mb-5">City Performance</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { city: 'Downtown', users: '18,420', businesses: 3240, growth: '+12%' },
              { city: 'Midtown', users: '12,800', businesses: 2100, growth: '+9%' },
              { city: 'Westside', users: '9,340', businesses: 1560, growth: '+18%' },
              { city: 'Northgate', users: '6,200', businesses: 980, growth: '+22%' },
            ].map(c => (
              <div key={c.city} className="bg-gradient-to-br from-slate-50 to-white dark:from-slate-700/50 dark:to-slate-700 border border-slate-100 dark:border-slate-600 rounded-2xl p-4">
                <p className="font-bold text-slate-900 dark:text-white text-sm">{c.city}</p>
                <p className="text-2xl font-display font-black text-gradient mt-1">{c.users}</p>
                <p className="text-xs text-slate-400 dark:text-slate-500">users</p>
                <div className="flex items-center justify-between mt-2">
                  <p className="text-xs text-slate-500 dark:text-slate-400">{c.businesses} businesses</p>
                  <span className="text-xs text-accent-600 dark:text-accent-400 font-semibold">{c.growth}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
