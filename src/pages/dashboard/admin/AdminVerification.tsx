import { useState } from 'react';
import { ShieldCheck, CheckCircle, XCircle, Eye, Building2, Clock } from 'lucide-react';
import DashboardTopbar from '@/layouts/DashboardTopbar';
import { toast } from 'sonner';

const PENDING = [
  { id: '1', name: 'Bloom Spa & Wellness', category: 'Spa', submitted: '2026-04-16', owner: 'Lisa Park', docs: 3, image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=60&h=60&fit=crop' },
  { id: '2', name: 'Downtown Yoga Studio', category: 'Wellness', submitted: '2026-04-17', owner: 'Nina Patel', docs: 2, image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=60&h=60&fit=crop' },
  { id: '3', name: 'Harbor Fresh Market', category: 'Shopping', submitted: '2026-04-17', owner: 'Mike Chang', docs: 4, image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=60&h=60&fit=crop' },
  { id: '4', name: 'The Jazz Lounge', category: 'Entertainment', submitted: '2026-04-18', owner: 'Marcus Brown', docs: 2, image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=60&h=60&fit=crop' },
];

export default function AdminVerification() {
  const [pending, setPending] = useState(PENDING);

  const approve = (id: string) => { setPending(prev => prev.filter(p => p.id !== id)); toast.success('Business verified and approved!'); };
  const reject = (id: string) => { setPending(prev => prev.filter(p => p.id !== id)); toast.error('Listing rejected and notified.'); };

  return (
    <div className="dark:bg-slate-950 min-h-screen">
      <DashboardTopbar title="Listing Verification" />
      <div className="p-6 max-w-5xl">
        <div className="flex items-center gap-3 mb-6 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-2xl p-4">
          <ShieldCheck className="w-5 h-5 text-amber-500 flex-shrink-0" />
          <p className="text-sm text-amber-700 dark:text-amber-400 font-medium">{pending.length} listings awaiting verification review</p>
        </div>

        {pending.length === 0 ? (
          <div className="text-center py-20">
            <CheckCircle className="w-12 h-12 text-accent-400 mx-auto mb-3" />
            <p className="text-slate-600 dark:text-slate-400 font-semibold">All caught up!</p>
            <p className="text-slate-400 dark:text-slate-500 text-sm">No pending verifications</p>
          </div>
        ) : (
          <div className="space-y-4">
            {pending.map(p => (
              <div key={p.id} className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm p-5">
                <div className="flex items-start gap-4">
                  <img src={p.image} alt={p.name} className="w-14 h-14 rounded-2xl object-cover flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4 flex-wrap">
                      <div>
                        <h3 className="font-bold text-slate-900 dark:text-white">{p.name}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="badge bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
                            <Building2 className="w-3 h-3" /> {p.category}
                          </span>
                          <span className="badge bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400">
                            <Clock className="w-3 h-3" /> Pending
                          </span>
                        </div>
                        <div className="text-xs text-slate-400 dark:text-slate-500 mt-2 space-y-0.5">
                          <p>Owner: <span className="text-slate-600 dark:text-slate-300 font-medium">{p.owner}</span></p>
                          <p>Submitted: <span className="text-slate-600 dark:text-slate-300">{p.submitted}</span></p>
                          <p>Documents: <span className="text-slate-600 dark:text-slate-300">{p.docs} files attached</span></p>
                        </div>
                      </div>
                      <div className="flex gap-2 flex-shrink-0 flex-wrap">
                        <button onClick={() => toast.success('Opening document preview...')} className="flex items-center gap-1.5 px-3 py-2 border border-slate-200 dark:border-slate-600 rounded-xl text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                          <Eye className="w-4 h-4" /> Review
                        </button>
                        <button onClick={() => approve(p.id)} className="flex items-center gap-1.5 px-4 py-2 bg-accent-500 text-white rounded-xl text-sm font-medium hover:bg-accent-600 transition-colors">
                          <CheckCircle className="w-4 h-4" /> Approve
                        </button>
                        <button onClick={() => reject(p.id)} className="flex items-center gap-1.5 px-4 py-2 bg-red-500 text-white rounded-xl text-sm font-medium hover:bg-red-600 transition-colors">
                          <XCircle className="w-4 h-4" /> Reject
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
