import { ReactNode } from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  change?: string;
  positive?: boolean;
  icon: ReactNode;
  color: string;
}

export default function StatCard({ title, value, change, positive = true, icon, color }: StatCardProps) {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-md transition-all duration-200 group">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">{title}</p>
          <p className="text-2xl font-display font-bold text-slate-900 dark:text-white mt-1">{value}</p>
          {change && (
            <div className={`flex items-center gap-1 mt-2 text-xs font-semibold ${positive ? 'text-accent-600 dark:text-accent-400' : 'text-red-500 dark:text-red-400'}`}>
              {positive ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
              {change}
            </div>
          )}
        </div>
        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${color} dark:opacity-80`}>
          {icon}
        </div>
      </div>
    </div>
  );
}
