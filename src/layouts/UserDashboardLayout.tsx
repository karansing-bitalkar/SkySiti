import { Outlet } from 'react-router-dom';
import { LayoutDashboard, Search, Calendar, Tag, Map, MessageSquare, User, BookOpen, Bell } from 'lucide-react';
import DashboardSidebar from './DashboardSidebar';

const items = [
  { label: 'Dashboard', path: '/dashboard/user', icon: <LayoutDashboard className="w-4 h-4" /> },
  { label: 'Search & Explore', path: '/dashboard/user/search', icon: <Search className="w-4 h-4" /> },
  { label: 'Events', path: '/dashboard/user/events', icon: <Calendar className="w-4 h-4" /> },
  { label: 'Offers', path: '/dashboard/user/offers', icon: <Tag className="w-4 h-4" /> },
  { label: 'Map View', path: '/dashboard/user/map', icon: <Map className="w-4 h-4" /> },
  { label: 'Chat', path: '/dashboard/user/chat', icon: <MessageSquare className="w-4 h-4" /> },
  { label: 'My Bookings', path: '/dashboard/user/bookings', icon: <BookOpen className="w-4 h-4" /> },
  { label: 'Notifications', path: '/dashboard/user/notifications', icon: <Bell className="w-4 h-4" /> },
  { label: 'My Profile', path: '/dashboard/user/profile', icon: <User className="w-4 h-4" /> },
];

export default function UserDashboardLayout() {
  return (
    <div className="flex h-screen overflow-hidden bg-slate-50">
      <DashboardSidebar items={items} role="User" roleColor="bg-primary-100 text-primary-700" />
      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}
