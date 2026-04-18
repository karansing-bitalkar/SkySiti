import { Link } from 'react-router-dom';
import { Star, MapPin, CheckCircle, Clock } from 'lucide-react';
import { Business } from '@/types';

interface BusinessCardProps { business: Business; linkTo?: string; }

export default function BusinessCard({ business, linkTo }: BusinessCardProps) {
  const content = (
    <div className="card overflow-hidden group cursor-pointer">
      <div className="relative h-44 overflow-hidden">
        <img src={business.image} alt={business.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
        <div className="absolute top-3 left-3 flex gap-2">
          <span className="badge bg-white/90 text-slate-700">{business.category}</span>
          {business.verified && (
            <span className="badge bg-primary-500/90 text-white"><CheckCircle className="w-3 h-3" /> Verified</span>
          )}
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-bold text-slate-900 text-lg leading-tight">{business.name}</h3>
        <p className="text-slate-500 text-sm mt-1 line-clamp-2">{business.description}</p>
        <div className="flex items-center gap-3 mt-3">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
            <span className="text-sm font-semibold text-slate-800">{business.rating}</span>
            <span className="text-xs text-slate-400">({business.reviewCount})</span>
          </div>
          <div className="flex items-center gap-1 text-slate-500 text-xs">
            <MapPin className="w-3.5 h-3.5" /> {business.address.split(',')[0]}
          </div>
        </div>
        <div className="flex items-center gap-1 mt-2 text-xs text-slate-400">
          <Clock className="w-3.5 h-3.5" /> {business.hours}
        </div>
        <div className="flex gap-1.5 mt-3 flex-wrap">
          {business.tags.slice(0, 3).map(tag => (
            <span key={tag} className="badge bg-slate-100 text-slate-600">{tag}</span>
          ))}
        </div>
      </div>
    </div>
  );

  if (linkTo) return <Link to={linkTo}>{content}</Link>;
  return content;
}
