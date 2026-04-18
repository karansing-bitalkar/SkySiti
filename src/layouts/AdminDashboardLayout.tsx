import { Outlet } from 'react-router-dom';
import { LayoutDashboard, Users, Building2, CalendarDays, ShieldCheck, BarChart2, Settings } from 'lucide-react';
import DashboardSidebar from './DashboardSidebar';

const items = [
  { label: 'Overview', path: '/dashboard/admin', icon: <LayoutDashboard className="w-4 h-4" /> },
  { label: 'User Management', path: '/dashboard/admin/users', icon: <Users className="w-4 h-4" /> },
  { label: 'Businesses', path: '/dashboard/admin/businesses', icon: <Building2 className="w-4 h-4" /> },
  { label: 'Events', path: '/dashboard/admin/events', icon: <CalendarDays className="w-4 h-4" /> },
  { label: 'Verification', path: '/dashboard/admin/verification', icon: <ShieldCheck className="w-4 h-4" /> },
  { label: 'Reports', path: '/dashboard/admin/reports', icon: <BarChart2 className="w-4 h-4" /> },
  { label: 'Settings', path: '/dashboard/admin/settings', icon: <Settings className="w-4 h-4" /> },
];

export default function AdminDashboardLayout() {
  return (
    <div className="flex h-screen overflow-hidden bg-slate-50">
      <DashboardSidebar items={items} role="Admin" roleColor="bg-red-100 text-red-600" />
      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}
