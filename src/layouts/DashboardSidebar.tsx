import { ReactNode, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { MapPin, ChevronLeft, ChevronRight, LogOut, Moon, Sun } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useTheme } from '@/contexts/ThemeContext';
import ConfirmDialog from '@/components/ui/ConfirmDialog';

interface NavItem { label: string; path: string; icon: ReactNode; }
interface DashboardSidebarProps { items: NavItem[]; role: string; roleColor: string; }

export default function DashboardSidebar({ items, role, roleColor }: DashboardSidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [logoutOpen, setLogoutOpen] = useState(false);
  const { user, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => { logout(); navigate('/'); };

  const exactActive = (path: string) => {
    if (path === location.pathname) return true;
    const isIndex = !path.split('/').slice(3).join('/');
    if (isIndex) return location.pathname === path || location.pathname === path + '/';
    return location.pathname.startsWith(path);
  };

  return (
    <>
      <aside className={`bg-white dark:bg-slate-900 border-r border-slate-100 dark:border-slate-800 flex flex-col h-screen sticky top-0 sidebar-transition ${collapsed ? 'w-16' : 'w-64'} flex-shrink-0 shadow-sm z-40`}>
        {/* Header */}
        <div className={`flex items-center h-16 px-4 border-b border-slate-100 dark:border-slate-800 ${collapsed ? 'justify-center' : 'justify-between'}`}>
          {!collapsed && (
            <Link to="/" className="flex items-center gap-2">
              <div className="w-7 h-7 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
                <MapPin className="w-3.5 h-3.5 text-white" />
              </div>
              <span className="font-display font-bold text-gradient text-lg">SkySiti</span>
            </Link>
          )}
          {collapsed ? (
            <div className="w-7 h-7 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
              <MapPin className="w-3.5 h-3.5 text-white" />
            </div>
          ) : (
            <button onClick={() => setCollapsed(true)} className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors text-slate-400">
              <ChevronLeft className="w-4 h-4" />
            </button>
          )}
        </div>

        {collapsed && (
          <button onClick={() => setCollapsed(false)} className="flex items-center justify-center py-2 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </button>
        )}

        {/* User Info */}
        {!collapsed && (
          <div className="px-4 py-4 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-3">
              <img
                src={user?.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop'}
                alt={user?.name || 'User'}
                className="w-10 h-10 rounded-xl object-cover ring-2 ring-primary-100 dark:ring-primary-900/40"
              />
              <div className="min-w-0">
                <p className="text-sm font-semibold text-slate-800 dark:text-white truncate">{user?.name}</p>
                <p className="text-xs text-slate-400 dark:text-slate-500 truncate">{user?.email}</p>
                <span className={`badge text-xs mt-0.5 ${roleColor}`}>{role}</span>
              </div>
            </div>
          </div>
        )}

        {/* Nav Items */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto scrollbar-hide">
          {items.map(item => {
            const active = exactActive(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                title={collapsed ? item.label : undefined}
                className={`sidebar-link ${active ? 'active' : ''} ${collapsed ? 'justify-center px-0' : ''}`}
              >
                <span className="flex-shrink-0">{item.icon}</span>
                {!collapsed && <span className="text-sm truncate">{item.label}</span>}
                {!collapsed && active && <span className="ml-auto w-1.5 h-1.5 bg-primary-500 rounded-full" />}
              </Link>
            );
          })}
        </nav>

        {/* Bottom Actions */}
        <div className="px-3 py-3 border-t border-slate-100 dark:border-slate-800 space-y-1">
          {/* Dark mode toggle */}
          <button
            onClick={toggleTheme}
            title={collapsed ? (isDark ? 'Light mode' : 'Dark mode') : undefined}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all w-full ${collapsed ? 'justify-center' : ''}`}
          >
            {isDark ? <Sun className="w-4 h-4 flex-shrink-0 text-amber-400" /> : <Moon className="w-4 h-4 flex-shrink-0" />}
            {!collapsed && <span className="text-sm font-medium">{isDark ? 'Light Mode' : 'Dark Mode'}</span>}
          </button>

          {/* Logout */}
          <button
            onClick={() => setLogoutOpen(true)}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all w-full ${collapsed ? 'justify-center' : ''}`}
            title={collapsed ? 'Logout' : undefined}
          >
            <LogOut className="w-4 h-4 flex-shrink-0" />
            {!collapsed && <span className="text-sm font-medium">Logout</span>}
          </button>
        </div>
      </aside>

      <ConfirmDialog
        open={logoutOpen}
        onClose={() => setLogoutOpen(false)}
        onConfirm={handleLogout}
        title="Logout?"
        message="Are you sure you want to logout from SkySiti?"
        confirmLabel="Logout"
        variant="danger"
      />
    </>
  );
}
