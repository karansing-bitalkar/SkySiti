import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Phone, Mail, Globe, Clock, Star, CheckCircle, MessageSquare, Heart, Share2 } from 'lucide-react';
import { MOCK_BUSINESSES, MOCK_REVIEWS } from '@/constants';
import StarRating from '@/components/ui/StarRating';
import { toast } from 'sonner';

export default function PlaceDetails() {
  const { id } = useParams<{ id: string }>();
  const business = MOCK_BUSINESSES.find(b => b.id === id) || MOCK_BUSINESSES[0];
  const reviews = MOCK_REVIEWS.filter(r => r.businessId === business.id);

  return (
    <div>
      <div className="sticky top-0 bg-white border-b border-slate-100 z-20 px-6 py-4 flex items-center gap-4">
        <Link to="/dashboard/user/search" className="p-2 hover:bg-slate-100 rounded-xl transition-colors">
          <ArrowLeft className="w-5 h-5 text-slate-600" />
        </Link>
        <h1 className="font-bold text-slate-900 text-lg">{business.name}</h1>
        <div className="ml-auto flex gap-2">
          <button onClick={() => toast.success('Added to favourites!')} className="p-2 hover:bg-red-50 text-slate-500 hover:text-red-500 rounded-xl transition-colors"><Heart className="w-5 h-5" /></button>
          <button onClick={() => toast.success('Link copied!')} className="p-2 hover:bg-primary-50 text-slate-500 hover:text-primary-600 rounded-xl transition-colors"><Share2 className="w-5 h-5" /></button>
        </div>
      </div>

      <div className="p-6 max-w-4xl space-y-6">
        {/* Hero */}
        <div className="relative rounded-3xl overflow-hidden h-64">
          <img src={business.image} alt={business.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-4 left-4 flex gap-2">
            <span className="badge bg-white/90 text-slate-800">{business.category}</span>
            {business.verified && <span className="badge bg-accent-500 text-white"><CheckCircle className="w-3 h-3" /> Verified</span>}
          </div>
          <div className="absolute bottom-4 right-4">
            <div className="flex items-center gap-1 bg-white/90 px-3 py-1.5 rounded-xl">
              <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
              <span className="font-bold text-slate-900">{business.rating}</span>
              <span className="text-slate-500 text-xs">({business.reviewCount})</span>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main */}
          <div className="lg:col-span-2 space-y-6">
            <div className="card p-6">
              <h2 className="text-2xl font-bold text-slate-900 mb-1">{business.name}</h2>
              <p className="text-primary-600 font-medium">{business.category}</p>
              <p className="text-slate-600 mt-3 leading-relaxed">{business.description}</p>
              <div className="flex gap-2 flex-wrap mt-4">
                {business.tags.map(t => <span key={t} className="badge bg-primary-100 text-primary-700">{t}</span>)}
              </div>
            </div>

            {/* Reviews */}
            <div className="card p-6">
              <h3 className="font-bold text-slate-900 text-lg mb-4">Reviews ({reviews.length || 3})</h3>
              {(reviews.length > 0 ? reviews : [
                { id: 'r1', userName: 'Sarah M.', rating: 5, comment: 'Absolutely love this place! Always my go-to.', date: '2026-04-10', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=40&h=40&fit=crop' },
                { id: 'r2', userName: 'Tom K.', rating: 4, comment: 'Great experience overall, staff were very friendly.', date: '2026-04-08', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop' },
                { id: 'r3', userName: 'Priya L.', rating: 5, comment: 'Highly recommend. Can\'t wait to come back!', date: '2026-04-05', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop' },
              ] as any[]).map(r => (
                <div key={r.id} className="flex gap-4 p-4 bg-slate-50 rounded-2xl mb-3">
                  <img src={r.avatar} alt={r.userName} className="w-10 h-10 rounded-xl object-cover" />
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-semibold text-slate-900 text-sm">{r.userName}</p>
                      <StarRating rating={r.rating} />
                    </div>
                    <p className="text-slate-600 text-sm">{r.comment}</p>
                    <p className="text-xs text-slate-400 mt-1">{r.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar Info */}
          <div className="space-y-4">
            <div className="card p-5">
              <h3 className="font-bold text-slate-900 mb-4">Contact & Info</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-primary-500 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-slate-600">{business.address}</p>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-primary-500 flex-shrink-0" />
                  <a href={`tel:${business.phone}`} className="text-sm text-primary-600 hover:underline">{business.phone}</a>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-primary-500 flex-shrink-0" />
                  <a href={`mailto:${business.email}`} className="text-sm text-primary-600 hover:underline">{business.email}</a>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-primary-500 flex-shrink-0" />
                  <p className="text-sm text-slate-600">{business.hours}</p>
                </div>
              </div>
            </div>

            <button onClick={() => toast.success('Table booking sent!')} className="btn-primary w-full py-3">Book a Table</button>
            <Link to="/dashboard/user/chat" className="flex items-center justify-center gap-2 w-full border-2 border-primary-500 text-primary-600 font-semibold py-3 rounded-xl hover:bg-primary-50 transition-colors">
              <MessageSquare className="w-4 h-4" /> Send Inquiry
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
