import { useState, useEffect, useCallback } from 'react';

export type NotificationPermission = 'default' | 'granted' | 'denied';

interface PushNotificationOptions {
  title: string;
  body: string;
  icon?: string;
  tag?: string;
  data?: Record<string, unknown>;
  onClick?: () => void;
}

export function usePushNotifications() {
  const [permission, setPermission] = useState<NotificationPermission>('default');
  const [isSupported, setIsSupported] = useState(false);

  useEffect(() => {
    setIsSupported('Notification' in window);
    if ('Notification' in window) {
      setPermission(Notification.permission as NotificationPermission);
    }
  }, []);

  const requestPermission = useCallback(async (): Promise<NotificationPermission> => {
    if (!isSupported) return 'denied';
    const result = await Notification.requestPermission();
    setPermission(result as NotificationPermission);
    return result as NotificationPermission;
  }, [isSupported]);

  const sendNotification = useCallback(async (opts: PushNotificationOptions): Promise<boolean> => {
    if (!isSupported) return false;

    let perm = permission;
    if (perm === 'default') {
      perm = await requestPermission();
    }
    if (perm !== 'granted') return false;

    const notif = new Notification(opts.title, {
      body: opts.body,
      icon: opts.icon || '/favicon.ico',
      tag: opts.tag,
      data: opts.data,
    });

    if (opts.onClick) {
      notif.onclick = () => {
        window.focus();
        opts.onClick!();
        notif.close();
      };
    }

    return true;
  }, [isSupported, permission, requestPermission]);

  // Convenience helpers
  const notifyEventReminder = useCallback((eventName: string, daysLeft: number) => {
    return sendNotification({
      title: '📅 Event Reminder',
      body: `"${eventName}" is in ${daysLeft} day${daysLeft !== 1 ? 's' : ''}! Don't miss it.`,
      tag: `event-${eventName}`,
    });
  }, [sendNotification]);

  const notifyNewOffer = useCallback((businessName: string, discount: string) => {
    return sendNotification({
      title: '🎁 New Offer Available',
      body: `${businessName} is offering ${discount} off. Limited time!`,
      tag: `offer-${businessName}`,
    });
  }, [sendNotification]);

  const notifyBookingConfirmed = useCallback((bookingTitle: string) => {
    return sendNotification({
      title: '✅ Booking Confirmed',
      body: `Your booking for "${bookingTitle}" has been confirmed.`,
      tag: `booking-confirmed`,
    });
  }, [sendNotification]);

  const notifyBookingCancelled = useCallback((bookingTitle: string) => {
    return sendNotification({
      title: '❌ Booking Cancelled',
      body: `Your booking for "${bookingTitle}" has been cancelled.`,
      tag: `booking-cancelled`,
    });
  }, [sendNotification]);

  const notifyNewMessage = useCallback((from: string) => {
    return sendNotification({
      title: '💬 New Message',
      body: `You have a new message from ${from}`,
      tag: `message-${from}`,
    });
  }, [sendNotification]);

  return {
    isSupported,
    permission,
    requestPermission,
    sendNotification,
    notifyEventReminder,
    notifyNewOffer,
    notifyBookingConfirmed,
    notifyBookingCancelled,
    notifyNewMessage,
  };
}
