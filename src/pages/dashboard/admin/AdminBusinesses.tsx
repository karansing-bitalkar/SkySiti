import { useState } from 'react';
import { Search, CheckCircle, XCircle, Trash2, Plus, Edit2, X, Save, ChevronLeft, ChevronRight } from 'lucide-react';
import { MOCK_BUSINESSES } from '@/constants';
import { Business } from '@/types';
import ConfirmDialog from '@/components/ui/ConfirmDialog';
import DashboardTopbar from '@/layouts/DashboardTopbar';
import { toast } from 'sonner';

const CATEGORIES = ['Cafe', 'Gym', 'Restaurant', 'Coworking', 'Spa', 'Art', 'Shopping', 'Hotel', 'Bar', 'Other'];
const PER_PAGE = 10;

interface BizForm {
  name: string; category: string; address: string; phone: string;
  email: string; description: string; hours: string; verified: boolean;
  image: string; tags: string;
}

const emptyForm = (): BizForm => ({
  name: '', category: 'Cafe', address: '', phone: '', email: '',
  description: '', hours: 'Mon-Sun 9am-9pm', verified: false,
  image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=400&h=300&fit=crop', tags: '',
});

export default function AdminBusinesses() {
  const [businesses, setBusinesses] = useState<Business[]>(MOCK_BUSINESSES);
  const [q, setQ] = useState('');
  const [catFilter, setCatFilter] = useState('all');
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [editingBiz, setEditingBiz] = useState<Business | null>(null);
  const [form, setForm] = useState<BizForm>(emptyForm());
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const filtered = businesses.filter(b => {
    const mq = !q || b.name.toLowerCase().includes(q.toLowerCase()) || b.category.toLowerCase().includes(q.toLowerCase());
    const mc = catFilter === 'all' || b.category === catFilter;
    return mq && mc;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const openAdd = () => { setEditingBiz(null); setForm(emptyForm()); setShowModal(true); };
  const openEdit = (b: Business) => {
    setEditingBiz(b);
    setForm({ name: b.name, category: b.category, address: b.address, phone: b.phone, email: b.email, description: b.description, hours: b.hours, verified: b.verified, image: b.image, tags: b.tags.join(', ') });
    setShowModal(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.address) { toast.error('Name and address are required'); return; }
    if (editingBiz) {
      setBusinesses(prev => prev.map(b => b.id === editingBiz.id ? {
        ...b, name: form.name, category: form.category, address: form.address,
        phone: form.phone, email: form.email, description: form.description,
        hours: form.hours, verified: form.verified, image: form.image,
        tags: form.tags.split(',').map(t => t.trim()).filter(Boolean),
      } : b));
      toast.success('Business updated successfully');
    } else {
      const newBiz: Business = {
        id: Date.now().toString(), name: form.name, category: form.category, address: form.address,
        phone: form.phone, email: form.email, description: form.description,
        hours: form.hours, verified: form.verified, image: form.image,
        tags: form.tags.split(',').map(t => t.trim()).filter(Boolean),
        rating: 0, reviewCount: 0, ownerId: 'admin',
      };
      setBusinesses(prev => [...prev, newBiz]);
      toast.success('Business added successfully');
    }
    setShowModal(false);
  };

  const deleteBiz = (id: string) => { setBusinesses(prev => prev.filter(b => b.id !== id)); toast.success('Business removed successfully'); };
  const toggleVerify = (id: string) => {
    setBusinesses(prev => prev.map(b => b.id === id ? { ...b, verified: !b.verified } : b));
    toast.success('Verification status updated');
  };

  return (
    <div className="dark:bg-slate-950 min-h-screen">
      <DashboardTopbar title="Business Management" />
      <div className="p-6 max-w-7xl">
        {/* Toolbar */}
        <div className="flex flex-wrap gap-3 mb-6 items-center justify-between">
          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex items-center gap-2 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 px-4 py-2.5 shadow-sm">
              <Search className="w-4 h-4 text-slate-400" />
              <input value={q} onChange={e => { setQ(e.target.value); setPage(1); }} placeholder="Search businesses..." className="bg-transparent text-sm focus:outline-none text-slate-800 dark:text-white placeholder-slate-400 w-44" />
            </div>
            <select value={catFilter} onChange={e => { setCatFilter(e.target.value); setPage(1); }} className="input-field py-2.5 text-sm w-auto">
              <option value="all">All Categories</option>
              {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <button onClick={openAdd} className="btn-primary flex items-center gap-2 text-sm">
            <Plus className="w-4 h-4" /> Add Business
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          {[
            { label: 'Total', value: businesses.length, color: 'text-primary-600' },
            { label: 'Verified', value: businesses.filter(b => b.verified).length, color: 'text-accent-600' },
            { label: 'Pending', value: businesses.filter(b => !b.verified).length, color: 'text-amber-500' },
            { label: 'Avg Rating', value: (businesses.reduce((s, b) => s + b.rating, 0) / businesses.length).toFixed(1), color: 'text-secondary-600' },
          ].map(s => (
            <div key={s.label} className="card dark:bg-slate-800 p-4 text-center">
              <p className={`text-2xl font-black ${s.color}`}>{s.value}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>

        <div className="card dark:bg-slate-800 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-700/50 border-b border-slate-100 dark:border-slate-700">
                  {['Business', 'Category', 'Contact', 'Rating', 'Status', 'Actions'].map(h => (
                    <th key={h} className="text-left text-xs font-semibold text-slate-500 dark:text-slate-400 px-4 py-3">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 dark:divide-slate-700/50">
                {paginated.length === 0 ? (
                  <tr><td colSpan={6} className="text-center py-12 text-slate-400">No businesses found</td></tr>
                ) : paginated.map(b => (
                  <tr key={b.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <img src={b.image} alt={b.name} className="w-10 h-10 rounded-xl object-cover flex-shrink-0" />
                        <div>
                          <p className="font-semibold text-slate-900 dark:text-white text-sm">{b.name}</p>
                          <p className="text-xs text-slate-400 truncate max-w-[140px]">{b.address}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3"><span className="badge bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">{b.category}</span></td>
                    <td className="px-4 py-3 text-xs text-slate-500 dark:text-slate-400">{b.phone}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        <span className="text-amber-400">★</span>
                        <span className="text-sm font-semibold text-slate-800 dark:text-white">{b.rating || '—'}</span>
                        <span className="text-xs text-slate-400">({b.reviewCount})</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      {b.verified
                        ? <span className="badge bg-accent-100 dark:bg-accent-900/30 text-accent-700 dark:text-accent-400 flex items-center gap-1 w-fit"><CheckCircle className="w-3 h-3" /> Verified</span>
                        : <span className="badge bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400">Pending</span>}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        <button onClick={() => openEdit(b)} title="Edit" className="p-1.5 hover:bg-primary-50 dark:hover:bg-primary-900/20 rounded-lg text-slate-400 hover:text-primary-600 transition-colors">
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button onClick={() => toggleVerify(b.id)} title={b.verified ? 'Unverify' : 'Verify'} className={`p-1.5 rounded-lg transition-colors ${b.verified ? 'text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600' : 'text-accent-500 hover:bg-accent-50 dark:hover:bg-accent-900/20 hover:text-accent-700'}`}>
                          {b.verified ? <XCircle className="w-3.5 h-3.5" /> : <CheckCircle className="w-3.5 h-3.5" />}
                        </button>
                        <button onClick={() => setDeleteId(b.id)} title="Delete" className="p-1.5 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg text-slate-400 hover:text-red-500 transition-colors">
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between px-4 py-3 border-t border-slate-100 dark:border-slate-700">
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Showing {(page - 1) * PER_PAGE + 1}–{Math.min(page * PER_PAGE, filtered.length)} of {filtered.length}
              </p>
              <div className="flex items-center gap-1">
                <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors">
                  <ChevronLeft className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                  <button key={p} onClick={() => setPage(p)} className={`w-8 h-8 rounded-lg text-sm font-semibold transition-colors ${page === p ? 'bg-primary-500 text-white' : 'hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-400'}`}>{p}</button>
                ))}
                <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages} className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors">
                  <ChevronRight className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto animate-slide-up">
            <div className="flex items-center justify-between p-6 border-b border-slate-100 dark:border-slate-700 sticky top-0 bg-white dark:bg-slate-800 z-10">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">{editingBiz ? 'Edit Business' : 'Add New Business'}</h2>
              <button onClick={() => setShowModal(false)} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-xl transition-colors">
                <X className="w-5 h-5 text-slate-500" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5 block">Business Name *</label>
                <input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} className="input-field" placeholder="Enter business name" required />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5 block">Category</label>
                  <select value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))} className="input-field">
                    {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5 block">Hours</label>
                  <input value={form.hours} onChange={e => setForm(f => ({ ...f, hours: e.target.value }))} className="input-field" placeholder="Mon-Fri 9am-5pm" />
                </div>
              </div>
              <div>
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5 block">Address *</label>
                <input value={form.address} onChange={e => setForm(f => ({ ...f, address: e.target.value }))} className="input-field" placeholder="Street, City" required />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5 block">Phone</label>
                  <input value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} className="input-field" placeholder="+1 555-0000" />
                </div>
                <div>
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5 block">Email</label>
                  <input type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} className="input-field" placeholder="contact@biz.com" />
                </div>
              </div>
              <div>
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5 block">Description</label>
                <textarea value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} rows={2} className="input-field resize-none" placeholder="Brief description..." />
              </div>
              <div>
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5 block">Tags (comma separated)</label>
                <input value={form.tags} onChange={e => setForm(f => ({ ...f, tags: e.target.value }))} className="input-field" placeholder="Coffee, WiFi, Takeaway" />
              </div>
              <div className="flex items-center gap-3">
                <input type="checkbox" id="verified-check" checked={form.verified} onChange={e => setForm(f => ({ ...f, verified: e.target.checked }))} className="w-4 h-4 accent-primary-500" />
                <label htmlFor="verified-check" className="text-sm font-medium text-slate-700 dark:text-slate-300">Mark as Verified</label>
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowModal(false)} className="flex-1 border-2 border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-300 font-semibold py-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">Cancel</button>
                <button type="submit" className="flex-1 btn-primary flex items-center justify-center gap-2">
                  <Save className="w-4 h-4" /> {editingBiz ? 'Update' : 'Add Business'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <ConfirmDialog open={!!deleteId} onClose={() => setDeleteId(null)} onConfirm={() => { deleteId && deleteBiz(deleteId); setDeleteId(null); }} title="Remove Business?" message="This business will be permanently removed from the platform." confirmLabel="Remove" variant="danger" />
    </div>
  );
}
