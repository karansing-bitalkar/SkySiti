import { useEffect, useState } from 'react';
import { CheckCircle, XCircle, AlertCircle, X } from 'lucide-react';

interface ToastProps {
  message: string;
  type?: 'success' | 'error' | 'warning';
  onClose: () => void;
}

export default function Toast({ message, type = 'success', onClose }: ToastProps) {
  useEffect(() => {
    const t = setTimeout(onClose, 3500);
    return () => clearTimeout(t);
  }, [onClose]);

  const config = {
    success: { icon: CheckCircle, bg: 'bg-accent-500', text: 'text-white' },
    error: { icon: XCircle, bg: 'bg-red-500', text: 'text-white' },
    warning: { icon: AlertCircle, bg: 'bg-amber-500', text: 'text-white' },
  }[type];
  const Icon = config.icon;

  return (
    <div className={`fixed top-5 right-5 z-[9999] flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-2xl ${config.bg} ${config.text} animate-slide-up max-w-sm`}>
      <Icon className="w-5 h-5 flex-shrink-0" />
      <p className="text-sm font-medium">{message}</p>
      <button onClick={onClose} className="ml-2 opacity-80 hover:opacity-100"><X className="w-4 h-4" /></button>
    </div>
  );
}
