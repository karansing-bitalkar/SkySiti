import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import { Toaster } from 'sonner';

import { ThemeProvider } from '@/contexts/ThemeContext';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';

// Public Layout
import PublicLayout from '@/layouts/PublicLayout';
import Home from '@/pages/Home';
import Explore from '@/pages/Explore';
import Events from '@/pages/Events';
import Offers from '@/pages/Offers';
import About from '@/pages/About';
import Contact from '@/pages/Contact';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import NotFound from '@/pages/NotFound';

// Dashboard Layouts
import UserDashboardLayout from '@/layouts/UserDashboardLayout';
import BusinessDashboardLayout from '@/layouts/BusinessDashboardLayout';
import OrganizerDashboardLayout from '@/layouts/OrganizerDashboardLayout';
import AdminDashboardLayout from '@/layouts/AdminDashboardLayout';

// User Dashboard Pages
import UserHome from '@/pages/dashboard/user/UserHome';
import UserSearch from '@/pages/dashboard/user/UserSearch';
import UserEvents from '@/pages/dashboard/user/UserEvents';
import UserOffers from '@/pages/dashboard/user/UserOffers';
import UserMap from '@/pages/dashboard/user/UserMap';
import UserChat from '@/pages/dashboard/user/UserChat';
import UserProfile from '@/pages/dashboard/user/UserProfile';
import UserBookings from '@/pages/dashboard/user/UserBookings';
import UserNotifications from '@/pages/dashboard/user/UserNotifications';
import PlaceDetails from '@/pages/dashboard/user/PlaceDetails';

// Business Dashboard Pages
import BusinessHome from '@/pages/dashboard/business/BusinessHome';
import BusinessAdd from '@/pages/dashboard/business/BusinessAdd';
import BusinessListings from '@/pages/dashboard/business/BusinessListings';
import BusinessOffers from '@/pages/dashboard/business/BusinessOffers';
import BusinessMessages from '@/pages/dashboard/business/BusinessMessages';
import BusinessReviews from '@/pages/dashboard/business/BusinessReviews';
import BusinessProfile from '@/pages/dashboard/business/BusinessProfile';

// Organizer Dashboard Pages
import OrganizerHome from '@/pages/dashboard/organizer/OrganizerHome';
import CreateEvent from '@/pages/dashboard/organizer/CreateEvent';
import ManageEvents from '@/pages/dashboard/organizer/ManageEvents';
import Attendees from '@/pages/dashboard/organizer/Attendees';
import OrganizerAnalytics from '@/pages/dashboard/organizer/OrganizerAnalytics';

// Admin Dashboard Pages
import AdminHome from '@/pages/dashboard/admin/AdminHome';
import AdminUsers from '@/pages/dashboard/admin/AdminUsers';
import AdminBusinesses from '@/pages/dashboard/admin/AdminBusinesses';
import AdminEvents from '@/pages/dashboard/admin/AdminEvents';
import AdminVerification from '@/pages/dashboard/admin/AdminVerification';
import AdminReports from '@/pages/dashboard/admin/AdminReports';
import AdminSettings from '@/pages/dashboard/admin/AdminSettings';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'smooth' }); }, [pathname]);
  return null;
}

function ProtectedRoute({ children, allowedRoles }: { children: React.ReactNode; allowedRoles?: string[] }) {
  const { user, loading } = useAuth();
  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-slate-950">
      <div className="text-center">
        <div className="w-10 h-10 border-3 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
        <p className="text-slate-500 dark:text-slate-400 text-sm">Loading...</p>
      </div>
    </div>
  );
  if (!user) return <Navigate to="/login" replace />;
  if (allowedRoles && !allowedRoles.includes(user.role)) return <Navigate to={`/dashboard/${user.role}`} replace />;
  return <>{children}</>;
}

function AppRoutes() {
  return (
    <>
      <ScrollToTop />
      <Toaster position="top-right" richColors closeButton />
      <Routes>
        {/* Public Routes */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/events" element={<Events />} />
          <Route path="/offers" element={<Offers />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Route>

        {/* Auth Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* User Dashboard */}
        <Route path="/dashboard/user" element={<ProtectedRoute allowedRoles={['user']}><UserDashboardLayout /></ProtectedRoute>}>
          <Route index element={<UserHome />} />
          <Route path="search" element={<UserSearch />} />
          <Route path="place/:id" element={<PlaceDetails />} />
          <Route path="events" element={<UserEvents />} />
          <Route path="offers" element={<UserOffers />} />
          <Route path="map" element={<UserMap />} />
          <Route path="chat" element={<UserChat />} />
          <Route path="profile" element={<UserProfile />} />
          <Route path="bookings" element={<UserBookings />} />
          <Route path="notifications" element={<UserNotifications />} />
        </Route>

        {/* Business Dashboard */}
        <Route path="/dashboard/business" element={<ProtectedRoute allowedRoles={['business']}><BusinessDashboardLayout /></ProtectedRoute>}>
          <Route index element={<BusinessHome />} />
          <Route path="add" element={<BusinessAdd />} />
          <Route path="listings" element={<BusinessListings />} />
          <Route path="offers" element={<BusinessOffers />} />
          <Route path="messages" element={<BusinessMessages />} />
          <Route path="reviews" element={<BusinessReviews />} />
          <Route path="profile" element={<BusinessProfile />} />
        </Route>

        {/* Organizer Dashboard */}
        <Route path="/dashboard/organizer" element={<ProtectedRoute allowedRoles={['organizer']}><OrganizerDashboardLayout /></ProtectedRoute>}>
          <Route index element={<OrganizerHome />} />
          <Route path="create" element={<CreateEvent />} />
          <Route path="manage" element={<ManageEvents />} />
          <Route path="attendees" element={<Attendees />} />
          <Route path="analytics" element={<OrganizerAnalytics />} />
        </Route>

        {/* Admin Dashboard */}
        <Route path="/dashboard/admin" element={<ProtectedRoute allowedRoles={['admin']}><AdminDashboardLayout /></ProtectedRoute>}>
          <Route index element={<AdminHome />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="businesses" element={<AdminBusinesses />} />
          <Route path="events" element={<AdminEvents />} />
          <Route path="verification" element={<AdminVerification />} />
          <Route path="reports" element={<AdminReports />} />
          <Route path="settings" element={<AdminSettings />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}
