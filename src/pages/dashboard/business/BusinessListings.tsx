import { useState } from 'react';
import { Edit2, Trash2, CheckCircle, XCircle, Plus, Search } from 'lucide-react';
import { MOCK_BUSINESSES } from '@/constants';
import { Business } from '@/types';
import Modal from '@/components/ui/Modal';
import ConfirmDialog from '@/components/ui/ConfirmDialog';
import DashboardTopbar from '@/layouts/DashboardTopbar';
import { toast } from 'sonner';
import { Link } from 'react-router-dom';

export default function BusinessListings() {
  const [businesses, setBusinesses] = useState(MOCK_BUSINESSES.filter(b => b.ownerId === '2'));
  const [editBiz, setEditBiz] = useState<Business | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [q, setQ] = useState('');

  const filtered = businesses.filter(b => !q || b.name.toLowerCase().includes(q.toLowerCase()));

  const saveEdit = (updated: Business) => {
    setBusinesses(prev => prev.map(b => b.id === updated.id ? updated : b));
    setEditBiz(null);
    toast.success('Listing updated successfully!');
  };

  const deleteBiz = (id: string) => {
    setBusinesses(prev => prev.filter(b => b.id !== id));
    toast.success('Listing deleted');
  };

  return (
    <div>
      <DashboardTopbar title="My Listings" />
      <div className="p-6 max-w-5xl">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2 bg-white rounded-2xl border border-slate-200 px-4 py-2.5 shadow-sm flex-1 max-w-xs">
            <Search className="w-4 h-4 text-slate-400" />
            <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search listings..." className="bg-transparent text-sm focus:outline-none text-slate-800 placeholder-slate-400 flex-1" />
          </div>
          <Link to="/dashboard/business/add" className="btn-primary flex items-center gap-2 ml-3">
            <Plus className="w-4 h-4" /> Add New
          </Link>
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-slate-400">No listings found</p>
            <Link to="/dashboard/business/add" className="btn-primary mt-4 inline-flex items-center gap-2"><Plus className="w-4 h-4" /> Add Business</Link>
          </div>
        ) : (
          <div className="space-y-4">
            {filtered.map(b => (
              <div key={b.id} className="card p-5 flex items-center gap-4">
                <img src={b.image} alt={b.name} className="w-16 h-16 rounded-2xl object-cover flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-slate-900">{b.name}</h3>
                    {b.verified ? (
                      <span className="badge bg-accent-100 text-accent-700"><CheckCircle className="w-3 h-3" /> Verified</span>
                    ) : (
                      <span className="badge bg-amber-100 text-amber-700">Pending</span>
                    )}
                  </div>
                  <p className="text-sm text-slate-500 mt-0.5">{b.category} • {b.address}</p>
                  <div className="flex items-center gap-3 mt-1 text-xs text-slate-400">
                    <span>★ {b.rating} ({b.reviewCount} reviews)</span>
                    <span>{b.hours}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <button onClick={() => setEditBiz(b)} className="p-2 text-slate-400 hover:text-primary-600 hover:bg-primary-50 rounded-xl transition-colors"><Edit2 className="w-4 h-4" /></button>
                  <button onClick={() => setDeleteId(b.id)} className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors"><Trash2 className="w-4 h-4" /></button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Edit Modal */}
      <Modal open={!!editBiz} onClose={() => setEditBiz(null)} title="Edit Listing">
        {editBiz && (
          <div className="space-y-4">
            <div>
              <label className="text-sm font-semibold text-slate-700 mb-1.5 block">Business Name</label>
              <input value={editBiz.name} onChange={e => setEditBiz({ ...editBiz, name: e.target.value })} className="input-field" />
            </div>
            <div>
              <label className="text-sm font-semibold text-slate-700 mb-1.5 block">Description</label>
              <textarea value={editBiz.description} onChange={e => setEditBiz({ ...editBiz, description: e.target.value })} rows={3} className="input-field resize-none" />
            </div>
            <div>
              <label className="text-sm font-semibold text-slate-700 mb-1.5 block">Address</label>
              <input value={editBiz.address} onChange={e => setEditBiz({ ...editBiz, address: e.target.value })} className="input-field" />
            </div>
            <div>
              <label className="text-sm font-semibold text-slate-700 mb-1.5 block">Hours</label>
              <input value={editBiz.hours} onChange={e => setEditBiz({ ...editBiz, hours: e.target.value })} className="input-field" />
            </div>
            <div className="flex gap-3 pt-2">
              <button onClick={() => setEditBiz(null)} className="flex-1 border border-slate-200 rounded-xl py-2.5 text-slate-700 font-medium hover:bg-slate-50 transition-colors">Cancel</button>
              <button onClick={() => saveEdit(editBiz)} className="flex-1 btn-primary py-2.5">Save Changes</button>
            </div>
          </div>
        )}
      </Modal>

      <ConfirmDialog open={!!deleteId} onClose={() => setDeleteId(null)} onConfirm={() => deleteId && deleteBiz(deleteId)} title="Delete Listing?" message="This will permanently remove your business listing. This cannot be undone." confirmLabel="Delete" variant="danger" />
    </div>
  );
}
