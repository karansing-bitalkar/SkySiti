import { useState } from 'react';
import { Plus, Edit2, Trash2, Tag, Clock } from 'lucide-react';
import { MOCK_OFFERS } from '@/constants';
import { Offer } from '@/types';
import Modal from '@/components/ui/Modal';
import ConfirmDialog from '@/components/ui/ConfirmDialog';
import DashboardTopbar from '@/layouts/DashboardTopbar';
import { toast } from 'sonner';

export default function BusinessOffers() {
  const [offers, setOffers] = useState(MOCK_OFFERS.slice(0, 3));
  const [editOffer, setEditOffer] = useState<Offer | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [showCreate, setShowCreate] = useState(false);
  const [newOffer, setNewOffer] = useState({ title: '', description: '', discount: '', validUntil: '', code: '' });

  const createOffer = () => {
    if (!newOffer.title || !newOffer.discount) { toast.error('Please fill required fields'); return; }
    const created: Offer = { ...newOffer, id: Date.now().toString(), businessName: 'My Business', category: 'Dining', image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=300&fit=crop', businessId: '2' };
    setOffers(prev => [created, ...prev]);
    setShowCreate(false);
    setNewOffer({ title: '', description: '', discount: '', validUntil: '', code: '' });
    toast.success('Offer created successfully!');
  };

  const deleteOffer = (id: string) => { setOffers(prev => prev.filter(o => o.id !== id)); toast.success('Offer deleted'); };
  const saveEdit = (updated: Offer) => { setOffers(prev => prev.map(o => o.id === updated.id ? updated : o)); setEditOffer(null); toast.success('Offer updated!'); };

  return (
    <div>
      <DashboardTopbar title="Manage Offers" />
      <div className="p-6 max-w-4xl">
        <div className="flex justify-end mb-6">
          <button onClick={() => setShowCreate(true)} className="btn-primary flex items-center gap-2"><Plus className="w-4 h-4" /> Create Offer</button>
        </div>

        <div className="space-y-4">
          {offers.map(o => (
            <div key={o.id} className="card p-5 flex items-center gap-4">
              <img src={o.image} alt={o.title} className="w-16 h-16 rounded-2xl object-cover flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-slate-900">{o.title}</h3>
                  <span className="badge bg-secondary-100 text-secondary-700">{o.discount} OFF</span>
                </div>
                <p className="text-sm text-slate-500 mt-0.5 line-clamp-1">{o.description}</p>
                <div className="flex items-center gap-3 mt-1 text-xs text-slate-400">
                  {o.code && <span className="flex items-center gap-1"><Tag className="w-3 h-3" /> {o.code}</span>}
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> Until {o.validUntil}</span>
                </div>
              </div>
              <div className="flex gap-2 flex-shrink-0">
                <button onClick={() => setEditOffer(o)} className="p-2 text-slate-400 hover:text-primary-600 hover:bg-primary-50 rounded-xl transition-colors"><Edit2 className="w-4 h-4" /></button>
                <button onClick={() => setDeleteId(o.id)} className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors"><Trash2 className="w-4 h-4" /></button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Modal open={showCreate} onClose={() => setShowCreate(false)} title="Create New Offer">
        <div className="space-y-4">
          <div><label className="text-sm font-semibold text-slate-700 mb-1.5 block">Offer Title *</label><input value={newOffer.title} onChange={e => setNewOffer(f => ({ ...f, title: e.target.value }))} className="input-field" placeholder="e.g. 30% Off Coffee" /></div>
          <div><label className="text-sm font-semibold text-slate-700 mb-1.5 block">Description</label><textarea value={newOffer.description} onChange={e => setNewOffer(f => ({ ...f, description: e.target.value }))} rows={3} className="input-field resize-none" /></div>
          <div className="grid grid-cols-2 gap-4">
            <div><label className="text-sm font-semibold text-slate-700 mb-1.5 block">Discount *</label><input value={newOffer.discount} onChange={e => setNewOffer(f => ({ ...f, discount: e.target.value }))} className="input-field" placeholder="30%" /></div>
            <div><label className="text-sm font-semibold text-slate-700 mb-1.5 block">Promo Code</label><input value={newOffer.code} onChange={e => setNewOffer(f => ({ ...f, code: e.target.value }))} className="input-field" placeholder="CODE30" /></div>
          </div>
          <div><label className="text-sm font-semibold text-slate-700 mb-1.5 block">Valid Until</label><input type="date" value={newOffer.validUntil} onChange={e => setNewOffer(f => ({ ...f, validUntil: e.target.value }))} className="input-field" /></div>
          <div className="flex gap-3 pt-2">
            <button onClick={() => setShowCreate(false)} className="flex-1 border border-slate-200 rounded-xl py-2.5 font-medium text-slate-700 hover:bg-slate-50">Cancel</button>
            <button onClick={createOffer} className="flex-1 btn-primary py-2.5">Create Offer</button>
          </div>
        </div>
      </Modal>

      <Modal open={!!editOffer} onClose={() => setEditOffer(null)} title="Edit Offer">
        {editOffer && (
          <div className="space-y-4">
            <div><label className="text-sm font-semibold text-slate-700 mb-1.5 block">Title</label><input value={editOffer.title} onChange={e => setEditOffer({ ...editOffer, title: e.target.value })} className="input-field" /></div>
            <div><label className="text-sm font-semibold text-slate-700 mb-1.5 block">Description</label><textarea value={editOffer.description} onChange={e => setEditOffer({ ...editOffer, description: e.target.value })} rows={3} className="input-field resize-none" /></div>
            <div className="grid grid-cols-2 gap-4">
              <div><label className="text-sm font-semibold text-slate-700 mb-1.5 block">Discount</label><input value={editOffer.discount} onChange={e => setEditOffer({ ...editOffer, discount: e.target.value })} className="input-field" /></div>
              <div><label className="text-sm font-semibold text-slate-700 mb-1.5 block">Valid Until</label><input type="date" value={editOffer.validUntil} onChange={e => setEditOffer({ ...editOffer, validUntil: e.target.value })} className="input-field" /></div>
            </div>
            <div className="flex gap-3 pt-2">
              <button onClick={() => setEditOffer(null)} className="flex-1 border border-slate-200 rounded-xl py-2.5 font-medium text-slate-700">Cancel</button>
              <button onClick={() => saveEdit(editOffer)} className="flex-1 btn-primary py-2.5">Save</button>
            </div>
          </div>
        )}
      </Modal>

      <ConfirmDialog open={!!deleteId} onClose={() => setDeleteId(null)} onConfirm={() => deleteId && deleteOffer(deleteId)} title="Delete Offer?" message="This offer will be permanently removed." confirmLabel="Delete" variant="danger" />
    </div>
  );
}
