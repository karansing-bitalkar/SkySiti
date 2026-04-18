import { Outlet } from 'react-router-dom';
import { LayoutDashboard, PlusCircle, CalendarDays, Users, BarChart2 } from 'lucide-react';
import DashboardSidebar from './DashboardSidebar';

const items = [
  { label: 'Dashboard', path: '/dashboard/organizer', icon: <LayoutDashboard className="w-4 h-4" /> },
  { label: 'Create Event', path: '/dashboard/organizer/create', icon: <PlusCircle className="w-4 h-4" /> },
  { label: 'Manage Events', path: '/dashboard/organizer/manage', icon: <CalendarDays className="w-4 h-4" /> },
  { label: 'Attendees', path: '/dashboard/organizer/attendees', icon: <Users className="w-4 h-4" /> },
  { label: 'Analytics', path: '/dashboard/organizer/analytics', icon: <BarChart2 className="w-4 h-4" /> },
];

export default function OrganizerDashboardLayout() {
  return (
    <div className="flex h-screen overflow-hidden bg-slate-50">
      <DashboardSidebar items={items} role="Organizer" roleColor="bg-accent-100 text-accent-700" />
      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}
