import { useState } from 'react';
import { Building2, MapPin, Phone, Mail, Clock, Tag, Image, Save } from 'lucide-react';
import DashboardTopbar from '@/layouts/DashboardTopbar';
import { toast } from 'sonner';
import { CATEGORIES } from '@/constants';

export default function BusinessAdd() {
  const [form, setForm] = useState({ name: '', category: '', description: '', address: '', phone: '', email: '', website: '', hours: '', tags: '' });
  const [saving, setSaving] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.category || !form.description) { toast.error('Please fill required fields'); return; }
    setSaving(true);
    setTimeout(() => {
      toast.success('Business listing created! Pending verification.');
      setForm({ name: '', category: '', description: '', address: '', phone: '', email: '', website: '', hours: '', tags: '' });
      setSaving(false);
    }, 800);
  };

  return (
    <div>
      <DashboardTopbar title="Add New Business" />
      <div className="p-6 max-w-2xl">
        <div className="card p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-2xl flex items-center justify-center">
              <Building2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900">Business Details</h2>
              <p className="text-slate-500 text-sm">Fill in your business information</p>
            </div>
          </div>

          <form onSubmit={handleSave} className="space-y-5">
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="text-sm font-semibold text-slate-700 mb-1.5 block">Business Name *</label>
                <input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} className="input-field" placeholder="Your business name" />
              </div>
              <div>
                <label className="text-sm font-semibold text-slate-700 mb-1.5 block">Category *</label>
                <select value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))} className="input-field">
                  <option value="">Select category</option>
                  {CATEGORIES.filter(c => c !== 'All').map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
            </div>
            <div>
              <label className="text-sm font-semibold text-slate-700 mb-1.5 block">Description *</label>
              <textarea value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} rows={4} className="input-field resize-none" placeholder="Describe your business..." />
            </div>
            <div>
              <label className="text-sm font-semibold text-slate-700 mb-1.5 block">Address</label>
              <div className="relative">
                <MapPin className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
                <input value={form.address} onChange={e => setForm(f => ({ ...f, address: e.target.value }))} className="input-field pl-10" placeholder="Full business address" />
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="text-sm font-semibold text-slate-700 mb-1.5 block">Phone</label>
                <div className="relative">
                  <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} className="input-field pl-10" placeholder="+1 555 0000" />
                </div>
              </div>
              <div>
                <label className="text-sm font-semibold text-slate-700 mb-1.5 block">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} className="input-field pl-10" placeholder="business@email.com" />
                </div>
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="text-sm font-semibold text-slate-700 mb-1.5 block">Business Hours</label>
                <div className="relative">
                  <Clock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input value={form.hours} onChange={e => setForm(f => ({ ...f, hours: e.target.value }))} className="input-field pl-10" placeholder="Mon-Sun 9am-9pm" />
                </div>
              </div>
              <div>
                <label className="text-sm font-semibold text-slate-700 mb-1.5 block">Tags</label>
                <div className="relative">
                  <Tag className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input value={form.tags} onChange={e => setForm(f => ({ ...f, tags: e.target.value }))} className="input-field pl-10" placeholder="WiFi, Parking, Delivery" />
                </div>
              </div>
            </div>
            <div>
              <label className="text-sm font-semibold text-slate-700 mb-1.5 block">Business Photos</label>
              <div className="border-2 border-dashed border-slate-200 rounded-2xl p-8 text-center hover:border-primary-300 transition-colors cursor-pointer">
                <Image className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                <p className="text-slate-400 text-sm">Click to upload photos or drag & drop</p>
                <p className="text-slate-300 text-xs mt-1">PNG, JPG up to 10MB each</p>
              </div>
            </div>
            <button type="submit" disabled={saving} className="btn-primary w-full py-3.5 flex items-center justify-center gap-2">
              {saving ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Save className="w-4 h-4" />}
              {saving ? 'Submitting...' : 'Submit for Verification'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
