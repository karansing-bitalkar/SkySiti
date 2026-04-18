import { Tag, Clock, Copy } from 'lucide-react';
import { Offer } from '@/types';
import { toast } from 'sonner';

interface OfferCardProps { offer: Offer; }

export default function OfferCard({ offer }: OfferCardProps) {
  const copyCode = () => {
    if (offer.code) {
      navigator.clipboard.writeText(offer.code);
      toast.success(`Code "${offer.code}" copied!`);
    }
  };

  return (
    <div className="card overflow-hidden group">
      <div className="relative h-36 overflow-hidden">
        <img src={offer.image} alt={offer.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-3 left-3">
          <span className="text-3xl font-display font-black text-white">{offer.discount} OFF</span>
        </div>
        <div className="absolute top-3 right-3">
          <span className="badge bg-secondary-500 text-white">{offer.category}</span>
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-bold text-slate-900 text-base leading-tight">{offer.title}</h3>
        <p className="text-sm text-primary-600 font-medium mt-0.5">{offer.businessName}</p>
        <p className="text-slate-500 text-sm mt-1 line-clamp-2">{offer.description}</p>
        <div className="flex items-center gap-1 mt-2 text-xs text-slate-400">
          <Clock className="w-3.5 h-3.5" /> Valid until {offer.validUntil}
        </div>
        {offer.code && (
          <button
            onClick={copyCode}
            className="mt-3 flex items-center justify-between w-full bg-dashed border-2 border-dashed border-primary-200 rounded-xl px-3 py-2 hover:border-primary-400 hover:bg-primary-50 transition-all group/code"
          >
            <div className="flex items-center gap-2">
              <Tag className="w-4 h-4 text-primary-500" />
              <span className="text-sm font-bold text-primary-600 tracking-wider">{offer.code}</span>
            </div>
            <Copy className="w-3.5 h-3.5 text-primary-400 group-hover/code:text-primary-600 transition-colors" />
          </button>
        )}
      </div>
    </div>
  );
}
