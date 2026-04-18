import { Bell, Search, Moon, Sun } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useTheme } from '@/contexts/ThemeContext';

interface TopbarProps { title: string; notifPath?: string; }

export default function DashboardTopbar({ title, notifPath }: TopbarProps) {
  const { user } = useAuth();
  const { isDark, toggleTheme } = useTheme();

  return (
    <header className="h-16 bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between px-6 sticky top-0 z-30">
      <h1 className="text-xl font-display font-bold text-slate-900 dark:text-white">{title}</h1>
      <div className="flex items-center gap-2">
        <button
          onClick={toggleTheme}
          className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
          title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {isDark ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-slate-500" />}
        </button>
        {notifPath && (
          <Link to={notifPath} className="relative p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors">
            <Bell className="w-5 h-5 text-slate-500 dark:text-slate-400" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
          </Link>
        )}
        <div className="flex items-center gap-2 pl-1">
          <img
            src={user?.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop'}
            alt={user?.name}
            className="w-8 h-8 rounded-xl object-cover ring-2 ring-primary-100 dark:ring-primary-900/40"
          />
          <div className="hidden sm:block">
            <p className="text-xs font-semibold text-slate-800 dark:text-white leading-tight">{user?.name?.split(' ')[0]}</p>
            <p className="text-xs text-slate-400 dark:text-slate-500 capitalize">{user?.role}</p>
          </div>
        </div>
      </div>
    </header>
  );
}
