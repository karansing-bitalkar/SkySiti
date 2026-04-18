import { TrendingUp, Users, DollarSign, Calendar, BarChart2 } from 'lucide-react';
import StatCard from '@/components/features/StatCard';
import DashboardTopbar from '@/layouts/DashboardTopbar';
import { MOCK_EVENTS } from '@/constants';

const monthlyData = [
  { month: 'Jan', revenue: 1800, attendees: 240 }, { month: 'Feb', revenue: 2200, attendees: 310 },
  { month: 'Mar', revenue: 3100, attendees: 430 }, { month: 'Apr', revenue: 2800, attendees: 390 },
  { month: 'May', revenue: 4200, attendees: 560 }, { month: 'Jun', revenue: 3800, attendees: 510 },
];
const maxRev = Math.max(...monthlyData.map(d => d.revenue));

const topEvents = MOCK_EVENTS.slice(0, 4).map(e => ({ ...e, revenue: e.price * e.attendees }));

export default function OrganizerAnalytics() {
  return (
    <div>
      <DashboardTopbar title="Analytics" />
      <div className="p-6 max-w-6xl space-y-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard title="Total Revenue" value="$12,400" change="+22% this month" positive icon={<DollarSign className="w-6 h-6 text-accent-600" />} color="bg-accent-100" />
          <StatCard title="Total Attendees" value="3,840" change="+15% growth" positive icon={<Users className="w-6 h-6 text-primary-600" />} color="bg-primary-100" />
          <StatCard title="Events Hosted" value={MOCK_EVENTS.length.toString()} change="+2 this month" positive icon={<Calendar className="w-6 h-6 text-secondary-600" />} color="bg-secondary-100" />
          <StatCard title="Avg Ticket Value" value="$38.50" change="+$4.20 vs last mo" positive icon={<TrendingUp className="w-6 h-6 text-amber-600" />} color="bg-amber-100" />
        </div>

        {/* Revenue Chart */}
        <div className="card p-6">
          <h3 className="font-bold text-slate-900 text-lg mb-6 flex items-center gap-2"><BarChart2 className="w-5 h-5 text-secondary-500" /> Monthly Revenue & Attendance</h3>
          <div className="flex items-end gap-4 h-40 mb-2">
            {monthlyData.map(d => (
              <div key={d.month} className="flex-1 flex flex-col items-center gap-1">
                <div className="w-full flex flex-col items-center gap-1">
                  <div className="w-full bg-secondary-100 rounded-t-lg relative" style={{ height: `${(d.revenue / maxRev) * 130}px` }}>
                    <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-secondary-600 to-secondary-400 rounded-t-lg" style={{ height: '100%' }} />
                  </div>
                </div>
                <p className="text-xs text-slate-400">{d.month}</p>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-slate-100">
            {[{ label: 'Best Month', value: 'May', sub: '$4,200 revenue' }, { label: 'Avg Monthly', value: '$3,150', sub: 'Revenue average' }, { label: 'Growth Rate', value: '+22%', sub: 'Month over month' }].map(s => (
              <div key={s.label} className="text-center">
                <p className="text-xs text-slate-400">{s.label}</p>
                <p className="text-xl font-bold text-slate-900">{s.value}</p>
                <p className="text-xs text-slate-400">{s.sub}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Top Events */}
        <div className="card p-6">
          <h3 className="font-bold text-slate-900 text-lg mb-4">Top Performing Events</h3>
          <div className="space-y-3">
            {topEvents.map((e, i) => {
              const pct = Math.round((e.attendees / e.maxAttendees) * 100);
              return (
                <div key={e.id} className="flex items-center gap-4 p-3 rounded-2xl hover:bg-slate-50 transition-colors">
                  <span className={`w-7 h-7 rounded-xl flex items-center justify-center text-sm font-bold text-white ${i === 0 ? 'bg-amber-400' : i === 1 ? 'bg-slate-400' : 'bg-orange-400'}`}>{i + 1}</span>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-slate-900 text-sm truncate">{e.title}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden max-w-[120px]">
                        <div className="h-full bg-secondary-500 rounded-full" style={{ width: `${pct}%` }} />
                      </div>
                      <span className="text-xs text-slate-400">{pct}% sold</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-accent-600 text-sm">${e.revenue.toLocaleString()}</p>
                    <p className="text-xs text-slate-400">{e.attendees} attendees</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
