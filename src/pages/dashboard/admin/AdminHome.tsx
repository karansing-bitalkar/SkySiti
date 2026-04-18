import { Users, Building2, CalendarDays, ShieldCheck, TrendingUp, AlertTriangle, CheckCircle, Activity } from 'lucide-react';
import StatCard from '@/components/features/StatCard';
import DashboardTopbar from '@/layouts/DashboardTopbar';

const recentActivity = [
  { action: 'New business listing submitted', detail: 'Bloom Spa & Wellness', time: '5 min ago', type: 'business' },
  { action: 'User registration', detail: 'john.doe@email.com joined', time: '12 min ago', type: 'user' },
  { action: 'Event created', detail: 'Marathon City Run 2026', time: '1 hour ago', type: 'event' },
  { action: 'Listing verification request', detail: 'Metro Bites needs review', time: '2 hours ago', type: 'verify' },
  { action: 'Support ticket opened', detail: 'Payment dispute #1024', time: '3 hours ago', type: 'support' },
];

const typeIcon: Record<string, React.ReactNode> = {
  business: <Building2 className="w-4 h-4 text-secondary-500" />,
  user: <Users className="w-4 h-4 text-primary-500" />,
  event: <CalendarDays className="w-4 h-4 text-accent-600" />,
  verify: <ShieldCheck className="w-4 h-4 text-amber-500" />,
  support: <AlertTriangle className="w-4 h-4 text-red-500" />,
};

export default function AdminHome() {
  return (
    <div className="dark:bg-slate-950 min-h-screen">
      <DashboardTopbar title="Admin Overview" />
      <div className="p-6 max-w-6xl space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard title="Total Users" value="50,284" change="+128 today" positive icon={<Users className="w-6 h-6 text-primary-600 dark:text-primary-400" />} color="bg-primary-100 dark:bg-primary-900/30" />
          <StatCard title="Businesses" value="12,418" change="+23 this week" positive icon={<Building2 className="w-6 h-6 text-secondary-600 dark:text-secondary-400" />} color="bg-secondary-100 dark:bg-secondary-900/30" />
          <StatCard title="Active Events" value="186" change="+12 today" positive icon={<CalendarDays className="w-6 h-6 text-accent-600 dark:text-accent-400" />} color="bg-accent-100 dark:bg-accent-900/30" />
          <StatCard title="Pending Verifications" value="34" change="-5 resolved" positive={false} icon={<ShieldCheck className="w-6 h-6 text-amber-600 dark:text-amber-400" />} color="bg-amber-100 dark:bg-amber-900/30" />
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Platform Health */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm p-6">
            <h3 className="font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <Activity className="w-5 h-5 text-accent-500" /> Platform Health
            </h3>
            <div className="space-y-4">
              {[
                { label: 'Server Uptime', value: '99.9%' },
                { label: 'API Response', value: '< 120ms' },
                { label: 'Error Rate', value: '0.02%' },
                { label: 'Active Sessions', value: '2,847' },
              ].map(s => (
                <div key={s.label} className="flex items-center justify-between">
                  <p className="text-sm text-slate-600 dark:text-slate-400">{s.label}</p>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle className="w-3.5 h-3.5 text-accent-500" />
                    <span className="text-sm font-semibold text-slate-900 dark:text-white">{s.value}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Revenue Overview */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm p-6">
            <h3 className="font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary-500" /> Revenue
            </h3>
            <div className="text-center py-2">
              <p className="text-4xl font-display font-black text-gradient">$84,200</p>
              <p className="text-slate-400 dark:text-slate-500 text-sm mt-1">This month</p>
            </div>
            <div className="mt-4 space-y-2">
              {[
                { label: 'Premium Listings', val: '$42,000', pct: 50 },
                { label: 'Event Fees', val: '$28,400', pct: 34 },
                { label: 'Ads Revenue', val: '$13,800', pct: 16 },
              ].map(r => (
                <div key={r.label}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-500 dark:text-slate-400">{r.label}</span>
                    <span className="font-semibold text-slate-800 dark:text-slate-200">{r.val}</span>
                  </div>
                  <div className="h-1.5 bg-slate-100 dark:bg-slate-700 rounded-full">
                    <div className="h-full bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full" style={{ width: `${r.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm p-6">
            <h3 className="font-bold text-slate-900 dark:text-white mb-4">Recent Activity</h3>
            <div className="space-y-3">
              {recentActivity.map((a, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-slate-50 dark:bg-slate-700 rounded-xl flex items-center justify-center flex-shrink-0">
                    {typeIcon[a.type]}
                  </div>
                  <div>
                    <p className="text-xs font-medium text-slate-800 dark:text-slate-200">{a.action}</p>
                    <p className="text-xs text-slate-400 dark:text-slate-500">{a.detail}</p>
                    <p className="text-xs text-slate-300 dark:text-slate-600 mt-0.5">{a.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
