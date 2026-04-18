import { useState } from 'react';
import { Star, MessageSquare, Flag, ChevronDown } from 'lucide-react';
import { MOCK_REVIEWS } from '@/constants';
import StarRating from '@/components/ui/StarRating';
import DashboardTopbar from '@/layouts/DashboardTopbar';
import { toast } from 'sonner';

export default function BusinessReviews() {
  const [reviews, setReviews] = useState([...MOCK_REVIEWS, ...MOCK_REVIEWS.map(r => ({ ...r, id: r.id + 'x', userName: 'Jordan K.', rating: 4, comment: 'Good place, would visit again. Staff were very professional.' }))]);
  const [filter, setFilter] = useState<number | null>(null);
  const [replies, setReplies] = useState<Record<string, string>>({});
  const [replyOpen, setReplyOpen] = useState<string | null>(null);

  const avgRating = (reviews.reduce((a, r) => a + r.rating, 0) / reviews.length).toFixed(1);
  const filtered = filter ? reviews.filter(r => r.rating === filter) : reviews;

  const submitReply = (id: string) => {
    if (!replies[id]?.trim()) return;
    toast.success('Reply posted!');
    setReplyOpen(null);
  };

  return (
    <div>
      <DashboardTopbar title="Reviews Management" />
      <div className="p-6 max-w-4xl">
        {/* Summary */}
        <div className="card p-6 mb-6 flex flex-wrap gap-8 items-center">
          <div className="text-center">
            <p className="text-5xl font-display font-black text-slate-900">{avgRating}</p>
            <StarRating rating={+avgRating} size="md" />
            <p className="text-sm text-slate-500 mt-1">{reviews.length} total reviews</p>
          </div>
          <div className="flex-1 space-y-2 min-w-40">
            {[5, 4, 3, 2, 1].map(star => {
              const count = reviews.filter(r => r.rating === star).length;
              const pct = Math.round((count / reviews.length) * 100);
              return (
                <div key={star} className="flex items-center gap-2">
                  <button onClick={() => setFilter(filter === star ? null : star)} className="text-xs text-slate-500 w-8 flex-shrink-0 text-right hover:text-primary-600">{star}★</button>
                  <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-amber-400 rounded-full transition-all" style={{ width: `${pct}%` }} />
                  </div>
                  <span className="text-xs text-slate-400 w-8">{count}</span>
                </div>
              );
            })}
          </div>
          {filter && <button onClick={() => setFilter(null)} className="text-xs text-primary-600 font-medium hover:underline">Clear filter</button>}
        </div>

        <div className="space-y-4">
          {filtered.map(r => (
            <div key={r.id} className="card p-5">
              <div className="flex items-start gap-4">
                <img src={r.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop'} alt={r.userName} className="w-10 h-10 rounded-xl object-cover" />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-slate-900 text-sm">{r.userName}</p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <StarRating rating={r.rating} />
                        <span className="text-xs text-slate-400">{r.date}</span>
                      </div>
                    </div>
                    <button onClick={() => toast.success('Review reported')} className="p-1.5 hover:bg-red-50 rounded-lg text-slate-300 hover:text-red-400 transition-colors">
                      <Flag className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <p className="text-slate-600 text-sm mt-2">{r.comment}</p>

                  {replyOpen === r.id ? (
                    <div className="mt-3 space-y-2">
                      <textarea value={replies[r.id] || ''} onChange={e => setReplies(prev => ({ ...prev, [r.id]: e.target.value }))} rows={3} className="input-field resize-none text-sm" placeholder="Write your reply..." />
                      <div className="flex gap-2">
                        <button onClick={() => setReplyOpen(null)} className="px-4 py-2 text-sm border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50">Cancel</button>
                        <button onClick={() => submitReply(r.id)} className="btn-primary text-sm py-2">Post Reply</button>
                      </div>
                    </div>
                  ) : (
                    <button onClick={() => setReplyOpen(r.id)} className="mt-3 flex items-center gap-1.5 text-xs text-primary-600 font-medium hover:text-primary-700">
                      <MessageSquare className="w-3.5 h-3.5" /> Reply
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
