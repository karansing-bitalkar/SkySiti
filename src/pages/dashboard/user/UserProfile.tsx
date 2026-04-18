import { useState } from 'react';
import { User, Mail, Phone, MapPin, Camera, Save, Shield, Calendar, Star, Edit3, Key, Eye, EyeOff, CheckCircle } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';
import DashboardTopbar from '@/layouts/DashboardTopbar';

const AVATARS = [
  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop',
  'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop',
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop',
];

export default function UserProfile() {
  const { user, supabaseUser, updateUser } = useAuth();
  const [form, setForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    location: user?.location || '',
    bio: user?.bio || '',
    avatar: user?.avatar || AVATARS[0],
  });
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<'profile' | 'security' | 'avatar'>('profile');
  const [showAvatarPicker, setShowAvatarPicker] = useState(false);
  const [pwForm, setPwForm] = useState({ current: '', newPw: '', confirm: '' });
  const [showPw, setShowPw] = useState(false);
  const [pwSaving, setPwSaving] = useState(false);

  const roleColors: Record<string, string> = {
    user: 'bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400',
    business: 'bg-secondary-100 dark:bg-secondary-900/30 text-secondary-700 dark:text-secondary-400',
    organizer: 'bg-accent-100 dark:bg-accent-900/30 text-accent-700 dark:text-accent-400',
    admin: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400',
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    // Update Supabase user metadata if logged in
    if (supabaseUser) {
      const { error } = await supabase.auth.updateUser({
        data: { username: form.name, location: form.location },
      });
      if (error) { toast.error(error.message); setSaving(false); return; }
    }
    updateUser(form);
    toast.success('Profile updated successfully!');
    setSaving(false);
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pwForm.newPw || pwForm.newPw !== pwForm.confirm) { toast.error('Passwords do not match'); return; }
    if (pwForm.newPw.length < 6) { toast.error('Password must be at least 6 characters'); return; }
    setPwSaving(true);
    if (supabaseUser) {
      const { error } = await supabase.auth.updateUser({ password: pwForm.newPw });
      if (error) { toast.error(error.message); setPwSaving(false); return; }
    }
    toast.success('Password changed successfully!');
    setPwForm({ current: '', newPw: '', confirm: '' });
    setPwSaving(false);
  };

  const selectAvatar = (url: string) => {
    setForm(f => ({ ...f, avatar: url }));
    updateUser({ avatar: url });
    setShowAvatarPicker(false);
    toast.success('Avatar updated!');
  };

  const tabs = [
    { key: 'profile' as const, label: 'Personal Info', icon: User },
    { key: 'security' as const, label: 'Security', icon: Shield },
    { key: 'avatar' as const, label: 'Avatar', icon: Camera },
  ];

  return (
    <div className="dark:bg-slate-950 min-h-screen">
      <DashboardTopbar title="My Profile" notifPath="/dashboard/user/notifications" />
      <div className="p-6 max-w-3xl">
        {/* Profile Header */}
        <div className="card dark:bg-slate-800 p-6 mb-6">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
            {/* Avatar */}
            <div className="relative flex-shrink-0">
              <img
                src={form.avatar}
                alt={form.name}
                className="w-24 h-24 rounded-3xl object-cover ring-4 ring-primary-100 dark:ring-primary-900/40"
              />
              <button
                onClick={() => setActiveTab('avatar')}
                className="absolute -bottom-2 -right-2 w-8 h-8 bg-primary-500 text-white rounded-xl flex items-center justify-center hover:bg-primary-600 transition-colors shadow-lg"
              >
                <Camera className="w-4 h-4" />
              </button>
            </div>

            {/* Info */}
            <div className="flex-1 text-center sm:text-left">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{user?.name}</h2>
              <p className="text-slate-500 dark:text-slate-400 text-sm mt-0.5">{user?.email}</p>
              <div className="flex flex-wrap gap-2 mt-3 justify-center sm:justify-start">
                <span className={`badge capitalize ${roleColors[user?.role || 'user']}`}>
                  {user?.role === 'user' ? 'City Explorer' : user?.role}
                </span>
                {supabaseUser && (
                  <span className="badge bg-accent-100 dark:bg-accent-900/30 text-accent-700 dark:text-accent-400">
                    <CheckCircle className="w-3 h-3" /> Verified Account
                  </span>
                )}
                {user?.location && (
                  <span className="badge bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
                    <MapPin className="w-3 h-3" /> {user.location}
                  </span>
                )}
              </div>
            </div>

            {/* Stats */}
            <div className="flex gap-4 sm:gap-6 flex-shrink-0">
              {[
                { label: 'Bookings', value: '12' },
                { label: 'Reviews', value: '8' },
                { label: 'Saved', value: '24' },
              ].map(s => (
                <div key={s.label} className="text-center">
                  <p className="text-xl font-bold text-slate-900 dark:text-white">{s.value}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Meta info */}
          <div className="mt-5 pt-5 border-t border-slate-100 dark:border-slate-700 flex flex-wrap gap-4 text-sm text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-primary-400" />
              Member since {new Date(user?.joinedAt || '').toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </span>
            {user?.phone && (
              <span className="flex items-center gap-1.5">
                <Phone className="w-4 h-4 text-primary-400" /> {user.phone}
              </span>
            )}
            {user?.bio && (
              <span className="flex items-center gap-1.5 italic">
                <Edit3 className="w-4 h-4 text-primary-400" /> {user.bio}
              </span>
            )}
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-2xl mb-6">
          {tabs.map(t => (
            <button
              key={t.key}
              onClick={() => setActiveTab(t.key)}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium transition-all ${activeTab === t.key ? 'bg-white dark:bg-slate-700 text-primary-600 dark:text-primary-400 shadow-sm' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'}`}
            >
              <t.icon className="w-4 h-4" />
              <span className="hidden sm:block">{t.label}</span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === 'profile' && (
          <div className="card dark:bg-slate-800 p-6">
            <h3 className="font-bold text-slate-900 dark:text-white text-lg mb-6 flex items-center gap-2">
              <User className="w-5 h-5 text-primary-500" /> Personal Information
            </h3>
            <form onSubmit={handleSave} className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5 block">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} className="input-field pl-10" placeholder="Your full name" />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5 block">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} className="input-field pl-10" disabled={!!supabaseUser} />
                  </div>
                  {supabaseUser && <p className="text-xs text-slate-400 mt-1">Email cannot be changed here</p>}
                </div>
                <div>
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5 block">Phone Number</label>
                  <div className="relative">
                    <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} className="input-field pl-10" placeholder="+1 555 0000" />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5 block">Location</label>
                  <div className="relative">
                    <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input value={form.location} onChange={e => setForm(f => ({ ...f, location: e.target.value }))} className="input-field pl-10" placeholder="City, Country" />
                  </div>
                </div>
              </div>
              <div>
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5 block">Bio</label>
                <textarea value={form.bio} onChange={e => setForm(f => ({ ...f, bio: e.target.value }))} rows={3} className="input-field resize-none" placeholder="Tell us about yourself..." />
              </div>
              <button type="submit" disabled={saving} className="btn-primary flex items-center gap-2">
                {saving ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Save className="w-4 h-4" />}
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
            </form>
          </div>
        )}

        {activeTab === 'security' && (
          <div className="card dark:bg-slate-800 p-6">
            <h3 className="font-bold text-slate-900 dark:text-white text-lg mb-6 flex items-center gap-2">
              <Key className="w-5 h-5 text-secondary-500" /> Change Password
            </h3>
            <form onSubmit={handlePasswordChange} className="space-y-5 max-w-md">
              {[
                { label: 'New Password', field: 'newPw' as const, placeholder: 'Min 6 characters' },
                { label: 'Confirm Password', field: 'confirm' as const, placeholder: 'Repeat new password' },
              ].map(f => (
                <div key={f.field}>
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5 block">{f.label}</label>
                  <div className="relative">
                    <Key className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type={showPw ? 'text' : 'password'}
                      value={pwForm[f.field]}
                      onChange={e => setPwForm(prev => ({ ...prev, [f.field]: e.target.value }))}
                      className="input-field pl-10 pr-10"
                      placeholder={f.placeholder}
                    />
                    <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                      {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              ))}
              <button type="submit" disabled={pwSaving} className="btn-primary flex items-center gap-2">
                {pwSaving ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Shield className="w-4 h-4" />}
                {pwSaving ? 'Updating...' : 'Update Password'}
              </button>
              {!supabaseUser && (
                <p className="text-xs text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 px-3 py-2 rounded-lg">
                  Password change requires a real account. Using demo mode currently.
                </p>
              )}
            </form>
          </div>
        )}

        {activeTab === 'avatar' && (
          <div className="card dark:bg-slate-800 p-6">
            <h3 className="font-bold text-slate-900 dark:text-white text-lg mb-6 flex items-center gap-2">
              <Camera className="w-5 h-5 text-accent-500" /> Choose Avatar
            </h3>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-4">
              {AVATARS.map(url => (
                <button
                  key={url}
                  onClick={() => selectAvatar(url)}
                  className={`relative rounded-2xl overflow-hidden transition-all hover:scale-105 ${form.avatar === url ? 'ring-4 ring-primary-500 ring-offset-2 dark:ring-offset-slate-800' : 'ring-2 ring-transparent hover:ring-slate-300'}`}
                >
                  <img src={url} alt="Avatar option" className="w-full aspect-square object-cover" />
                  {form.avatar === url && (
                    <div className="absolute inset-0 bg-primary-500/20 flex items-center justify-center">
                      <CheckCircle className="w-6 h-6 text-primary-500 drop-shadow-lg" />
                    </div>
                  )}
                </button>
              ))}
            </div>
            <p className="text-xs text-slate-400 dark:text-slate-500 mt-4">Click any avatar to set it as your profile photo</p>
          </div>
        )}
      </div>
    </div>
  );
}
