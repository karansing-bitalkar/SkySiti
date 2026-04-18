import { useState } from 'react';
import { User, Mail, Phone, MapPin, Globe, Save, Bell, Shield, Palette } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import DashboardTopbar from '@/layouts/DashboardTopbar';
import { toast } from 'sonner';

export default function BusinessProfile() {
  const { user, updateUser } = useAuth();
  const [form, setForm] = useState({ name: user?.name || '', email: user?.email || '', phone: user?.phone || '', location: user?.location || '', bio: user?.bio || '', website: '' });
  const [notifs, setNotifs] = useState({ messages: true, reviews: true, offers: false, newsletter: true });
  const [saving, setSaving] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setTimeout(() => { updateUser(form); toast.success('Profile updated!'); setSaving(false); }, 600);
  };

  return (
    <div>
      <DashboardTopbar title="Profile Settings" />
      <div className="p-6 max-w-2xl space-y-6">
        <div className="card p-6">
          <h3 className="font-bold text-slate-900 text-lg mb-5 flex items-center gap-2"><User className="w-5 h-5 text-primary-500" /> Account Information</h3>
          <form onSubmit={handleSave} className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-semibold text-slate-700 mb-1.5 block">Full Name</label>
                <input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} className="input-field" />
              </div>
              <div>
                <label className="text-sm font-semibold text-slate-700 mb-1.5 block">Email</label>
                <input type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} className="input-field" />
              </div>
              <div>
                <label className="text-sm font-semibold text-slate-700 mb-1.5 block">Phone</label>
                <input value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} className="input-field" placeholder="+1 555 0000" />
              </div>
              <div>
                <label className="text-sm font-semibold text-slate-700 mb-1.5 block">Website</label>
                <input value={form.website} onChange={e => setForm(f => ({ ...f, website: e.target.value }))} className="input-field" placeholder="https://yourbusiness.com" />
              </div>
            </div>
            <div>
              <label className="text-sm font-semibold text-slate-700 mb-1.5 block">Business Bio</label>
              <textarea value={form.bio} onChange={e => setForm(f => ({ ...f, bio: e.target.value }))} rows={4} className="input-field resize-none" placeholder="Describe your business..." />
            </div>
            <button type="submit" disabled={saving} className="btn-primary flex items-center gap-2">
              {saving ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Save className="w-4 h-4" />}
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </form>
        </div>

        <div className="card p-6">
          <h3 className="font-bold text-slate-900 text-lg mb-5 flex items-center gap-2"><Bell className="w-5 h-5 text-secondary-500" /> Notifications</h3>
          <div className="space-y-4">
            {Object.entries(notifs).map(([key, val]) => (
              <div key={key} className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-slate-800 capitalize">{key.replace(/([A-Z])/g, ' $1')}</p>
                  <p className="text-xs text-slate-400">Receive {key} notifications via email</p>
                </div>
                <button onClick={() => setNotifs(prev => ({ ...prev, [key]: !val }))} className={`relative w-12 h-6 rounded-full transition-colors ${val ? 'bg-primary-500' : 'bg-slate-200'}`}>
                  <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all ${val ? 'left-7' : 'left-1'}`} />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="card p-6">
          <h3 className="font-bold text-slate-900 text-lg mb-5 flex items-center gap-2"><Shield className="w-5 h-5 text-accent-500" /> Security</h3>
          <button onClick={() => toast.success('Password reset email sent!')} className="btn-outline text-sm">Change Password</button>
        </div>
      </div>
    </div>
  );
}
