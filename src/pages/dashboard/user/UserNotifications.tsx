import { useState } from 'react';
import { Bell, BellOff, Calendar, Tag, Star, CheckCircle, Info, Trash2, Check, BellRing, Smartphone } from 'lucide-react';
import { MOCK_NOTIFICATIONS } from '@/constants';
import { Notification } from '@/types';
import DashboardTopbar from '@/layouts/DashboardTopbar';
import { toast } from 'sonner';
import { usePushNotifications } from '@/hooks/usePushNotifications';

const typeIcon: Record<string, React.ReactNode> = {
  event: <Calendar className="w-4 h-4 text-primary-500" />,
  offer: <Tag className="w-4 h-4 text-secondary-500" />,
  review: <Star className="w-4 h-4 text-amber-500" />,
  booking: <CheckCircle className="w-4 h-4 text-accent-500" />,
  system: <Info className="w-4 h-4 text-slate-400" />,
};
const typeBg: Record<string, string> = {
  event: 'bg-primary-100 dark:bg-primary-900/30',
  offer: 'bg-secondary-100 dark:bg-secondary-900/30',
  review: 'bg-amber-100 dark:bg-amber-900/30',
  booking: 'bg-accent-100 dark:bg-accent-900/30',
  system: 'bg-slate-100 dark:bg-slate-700',
};

export default function UserNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>(MOCK_NOTIFICATIONS);
  const [filter, setFilter] = useState<'all' | 'unread'>('all');
  const { isSupported, permission, requestPermission, notifyEventReminder, notifyNewOffer, notifyBookingConfirmed } = usePushNotifications();

  const filtered = filter === 'unread' ? notifications.filter(n => !n.read) : notifications;
  const unreadCount = notifications.filter(n => !n.read).length;

  const markRead = (id: string) => setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  const markAllRead = () => { setNotifications(prev => prev.map(n => ({ ...n, read: true }))); toast.success('All notifications marked as read'); };
  const deleteNotif = (id: string) => { setNotifications(prev => prev.filter(n => n.id !== id)); toast.success('Notification removed'); };
  const clearAll = () => { setNotifications([]); toast.success('All notifications cleared'); };

  const handleEnablePush = async () => {
    const perm = await requestPermission();
    if (perm === 'granted') toast.success('Push notifications enabled!');
    else if (perm === 'denied') toast.error('Notifications blocked. Please enable in browser settings.');
    else toast.info('Notifications permission dismissed');
  };

  const handleTestNotification = async (type: string) => {
    let sent = false;
    if (type === 'event') sent = await notifyEventReminder('City Music Festival 2026', 3);
    if (type === 'offer') sent = await notifyNewOffer('The Urban Brew', '30%');
    if (type === 'booking') sent = await notifyBookingConfirmed('Table at Metro Bites');
    if (sent) toast.success('Test notification sent!');
    else toast.error('Could not send — check browser permissions');
  };

  const timeAgo = (ts: string) => {
    const diff = Date.now() - new Date(ts).getTime();
    const mins = Math.floor(diff / 60000);
    const hours = Math.floor(mins / 60);
    const days = Math.floor(hours / 24);
    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    return `${mins}m ago`;
  };

  return (
    <div className="dark:bg-slate-950 min-h-screen">
      <DashboardTopbar title="Notifications" notifPath="/dashboard/user/notifications" />
      <div className="p-6 max-w-3xl">
        {/* Push Notification Banner */}
        {isSupported && permission !== 'granted' && (
          <div className="card dark:bg-slate-800 p-5 mb-6 border-l-4 border-primary-500">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900/30 rounded-xl flex items-center justify-center flex-shrink-0">
                <BellRing className="w-5 h-5 text-primary-600 dark:text-primary-400" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-slate-900 dark:text-white">Enable Push Notifications</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">Get instant alerts for event reminders, new offers, and booking updates — even when you're not on the app.</p>
                {permission === 'denied' && (
                  <p className="text-xs text-red-500 mt-1">Notifications are blocked. Please enable them in your browser settings.</p>
                )}
              </div>
              {permission !== 'denied' && (
                <button onClick={handleEnablePush} className="btn-primary text-sm flex-shrink-0">
                  Enable
                </button>
              )}
            </div>
          </div>
        )}

        {/* Push Notification Controls */}
        {isSupported && permission === 'granted' && (
          <div className="card dark:bg-slate-800 p-5 mb-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-accent-100 dark:bg-accent-900/30 rounded-xl flex items-center justify-center">
                  <Bell className="w-4 h-4 text-accent-600 dark:text-accent-400" />
                </div>
                <div>
                  <p className="font-semibold text-slate-900 dark:text-white text-sm">Push Notifications Active</p>
                  <p className="text-xs text-accent-600 dark:text-accent-400">You'll receive real-time alerts</p>
                </div>
              </div>
              <span className="badge bg-accent-100 dark:bg-accent-900/30 text-accent-700 dark:text-accent-400"><CheckCircle className="w-3 h-3" /> Enabled</span>
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-600 dark:text-slate-400 mb-2 uppercase tracking-wide">Test notifications</p>
              <div className="flex flex-wrap gap-2">
                {[
                  { type: 'event', label: 'Event Reminder', color: 'bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400 hover:bg-primary-200' },
                  { type: 'offer', label: 'New Offer', color: 'bg-secondary-100 dark:bg-secondary-900/30 text-secondary-700 dark:text-secondary-400 hover:bg-secondary-200' },
                  { type: 'booking', label: 'Booking Confirmed', color: 'bg-accent-100 dark:bg-accent-900/30 text-accent-700 dark:text-accent-400 hover:bg-accent-200' },
                ].map(t => (
                  <button key={t.type} onClick={() => handleTestNotification(t.type)} className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors flex items-center gap-1.5 ${t.color}`}>
                    <Smartphone className="w-3 h-3" /> {t.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="flex gap-2">
              {(['all', 'unread'] as const).map(f => (
                <button key={f} onClick={() => setFilter(f)} className={`px-4 py-2 rounded-xl text-sm font-medium capitalize transition-all ${filter === f ? 'bg-primary-500 text-white' : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'}`}>
                  {f} {f === 'unread' && unreadCount > 0 && `(${unreadCount})`}
                </button>
              ))}
            </div>
          </div>
          <div className="flex gap-2">
            {unreadCount > 0 && (
              <button onClick={markAllRead} className="flex items-center gap-1.5 text-xs text-primary-600 dark:text-primary-400 font-semibold hover:text-primary-700 px-3 py-2 rounded-xl hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors">
                <Check className="w-3.5 h-3.5" /> Mark all read
              </button>
            )}
            {notifications.length > 0 && (
              <button onClick={clearAll} className="flex items-center gap-1.5 text-xs text-red-500 font-semibold hover:text-red-600 px-3 py-2 rounded-xl hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
                <Trash2 className="w-3.5 h-3.5" /> Clear all
              </button>
            )}
          </div>
        </div>

        {/* Notification list */}
        {filtered.length === 0 ? (
          <div className="text-center py-20 card dark:bg-slate-800">
            <BellOff className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <p className="text-slate-500 dark:text-slate-400 font-medium">
              {filter === 'unread' ? 'No unread notifications' : 'No notifications yet'}
            </p>
            <p className="text-slate-400 dark:text-slate-500 text-sm">You're all caught up!</p>
          </div>
        ) : (
          <div className="space-y-2">
            {filtered.map(n => (
              <div
                key={n.id}
                onClick={() => markRead(n.id)}
                className={`card dark:bg-slate-800 p-4 flex items-start gap-3 cursor-pointer transition-all group ${!n.read ? 'border-l-4 border-primary-400' : ''}`}
              >
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${typeBg[n.type] || typeBg.system}`}>
                  {typeIcon[n.type] || typeIcon.system}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className={`text-sm font-semibold ${!n.read ? 'text-slate-900 dark:text-white' : 'text-slate-700 dark:text-slate-300'}`}>{n.title}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed">{n.message}</p>
                    </div>
                    <div className="flex items-center gap-1 flex-shrink-0">
                      {!n.read && <span className="w-2 h-2 rounded-full bg-primary-500 flex-shrink-0" />}
                      <span className="text-xs text-slate-400 whitespace-nowrap">{timeAgo(n.timestamp)}</span>
                    </div>
                  </div>
                </div>
                <button onClick={e => { e.stopPropagation(); deleteNotif(n.id); }} className="opacity-0 group-hover:opacity-100 p-1.5 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg text-slate-300 hover:text-red-500 transition-all flex-shrink-0">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
