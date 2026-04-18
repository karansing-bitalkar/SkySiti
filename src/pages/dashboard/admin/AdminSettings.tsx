import { useState } from 'react';
import { Settings, Bell, Globe, Save, AlertTriangle } from 'lucide-react';
import DashboardTopbar from '@/layouts/DashboardTopbar';
import { toast } from 'sonner';

export default function AdminSettings() {
  const [general, setGeneral] = useState({
    siteName: 'SkySiti',
    tagline: 'Smart City Platform',
    supportEmail: 'support@skysiti.com',
    maxListings: '50',
    timezone: 'UTC-5',
  });
  const [notifs, setNotifs] = useState({
    newUser: true,
    newBusiness: true,
    newEvent: false,
    dailyReport: true,
    weeklyDigest: true,
  });
  const [features, setFeatures] = useState({
    reviews: true,
    events: true,
    offers: true,
    chat: true,
    map: false,
  });
  const [saving, setSaving] = useState(false);

  const save = () => {
    setSaving(true);
    setTimeout(() => { toast.success('Settings saved!'); setSaving(false); }, 600);
  };

  return (
    <div className="dark:bg-slate-950 min-h-screen">
      <DashboardTopbar title="Platform Settings" />
      <div className="p-6 max-w-2xl space-y-6">
        {/* General Settings */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm p-6">
          <h3 className="font-bold text-slate-900 dark:text-white text-lg mb-5 flex items-center gap-2">
            <Settings className="w-5 h-5 text-primary-500" /> General
          </h3>
          <div className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5 block">Platform Name</label>
                <input value={general.siteName} onChange={e => setGeneral(f => ({ ...f, siteName: e.target.value }))} className="input-field" />
              </div>
              <div>
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5 block">Tagline</label>
                <input value={general.tagline} onChange={e => setGeneral(f => ({ ...f, tagline: e.target.value }))} className="input-field" />
              </div>
              <div>
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5 block">Support Email</label>
                <input value={general.supportEmail} onChange={e => setGeneral(f => ({ ...f, supportEmail: e.target.value }))} className="input-field" />
              </div>
              <div>
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5 block">Max Listings / User</label>
                <input type="number" value={general.maxListings} onChange={e => setGeneral(f => ({ ...f, maxListings: e.target.value }))} className="input-field" />
              </div>
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm p-6">
          <h3 className="font-bold text-slate-900 dark:text-white text-lg mb-5 flex items-center gap-2">
            <Bell className="w-5 h-5 text-secondary-500" /> Admin Notifications
          </h3>
          <div className="space-y-4">
            {(Object.entries(notifs) as [keyof typeof notifs, boolean][]).map(([key, val]) => (
              <div key={key} className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-slate-800 dark:text-slate-200 text-sm capitalize">{key.replace(/([A-Z])/g, ' $1')}</p>
                  <p className="text-xs text-slate-400 dark:text-slate-500">Receive admin alerts for {key.toLowerCase().replace(/([A-Z])/g, ' $1')}</p>
                </div>
                <button
                  onClick={() => setNotifs(prev => ({ ...prev, [key]: !val }))}
                  className={`relative w-12 h-6 rounded-full transition-colors ${val ? 'bg-primary-500' : 'bg-slate-200 dark:bg-slate-600'}`}
                >
                  <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all ${val ? 'left-7' : 'left-1'}`} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Feature Flags */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm p-6">
          <h3 className="font-bold text-slate-900 dark:text-white text-lg mb-5 flex items-center gap-2">
            <Globe className="w-5 h-5 text-accent-500" /> Feature Toggles
          </h3>
          <div className="space-y-4">
            {(Object.entries(features) as [keyof typeof features, boolean][]).map(([key, val]) => (
              <div key={key} className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-slate-800 dark:text-slate-200 text-sm capitalize">{key} Module</p>
                  <p className="text-xs text-slate-400 dark:text-slate-500">
                    {val ? 'Currently enabled platform-wide' : 'Currently disabled for all users'}
                  </p>
                </div>
                <button
                  onClick={() => setFeatures(prev => ({ ...prev, [key]: !val }))}
                  className={`relative w-12 h-6 rounded-full transition-colors ${val ? 'bg-accent-500' : 'bg-slate-200 dark:bg-slate-600'}`}
                >
                  <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all ${val ? 'left-7' : 'left-1'}`} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Danger Zone */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-red-100 dark:border-red-900/40 shadow-sm p-6">
          <h3 className="font-bold text-red-600 dark:text-red-400 text-lg mb-4 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5" /> Danger Zone
          </h3>
          <div className="space-y-3">
            <button onClick={() => toast.error('Cache cleared!')} className="w-full text-left p-4 border border-red-100 dark:border-red-900/40 rounded-xl hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
              <p className="font-medium text-red-700 dark:text-red-400 text-sm">Clear Platform Cache</p>
              <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">Force refresh all cached data across the platform</p>
            </button>
            <button onClick={() => toast.error('Maintenance mode toggled')} className="w-full text-left p-4 border border-red-100 dark:border-red-900/40 rounded-xl hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
              <p className="font-medium text-red-700 dark:text-red-400 text-sm">Toggle Maintenance Mode</p>
              <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">Take the platform offline for scheduled maintenance</p>
            </button>
          </div>
        </div>

        <button onClick={save} disabled={saving} className="btn-primary w-full py-3.5 flex items-center justify-center gap-2">
          {saving ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Save className="w-4 h-4" />}
          {saving ? 'Saving...' : 'Save All Settings'}
        </button>
      </div>
    </div>
  );
}
