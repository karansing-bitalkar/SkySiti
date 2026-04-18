import { Outlet } from 'react-router-dom';
import { LayoutDashboard, PlusCircle, List, Tag, MessageSquare, Star, User } from 'lucide-react';
import DashboardSidebar from './DashboardSidebar';

const items = [
  { label: 'Analytics', path: '/dashboard/business', icon: <LayoutDashboard className="w-4 h-4" /> },
  { label: 'Add Business', path: '/dashboard/business/add', icon: <PlusCircle className="w-4 h-4" /> },
  { label: 'My Listings', path: '/dashboard/business/listings', icon: <List className="w-4 h-4" /> },
  { label: 'Offers', path: '/dashboard/business/offers', icon: <Tag className="w-4 h-4" /> },
  { label: 'Messages', path: '/dashboard/business/messages', icon: <MessageSquare className="w-4 h-4" /> },
  { label: 'Reviews', path: '/dashboard/business/reviews', icon: <Star className="w-4 h-4" /> },
  { label: 'Profile Settings', path: '/dashboard/business/profile', icon: <User className="w-4 h-4" /> },
];

export default function BusinessDashboardLayout() {
  return (
    <div className="flex h-screen overflow-hidden bg-slate-50">
      <DashboardSidebar items={items} role="Business" roleColor="bg-secondary-100 text-secondary-700" />
      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}
