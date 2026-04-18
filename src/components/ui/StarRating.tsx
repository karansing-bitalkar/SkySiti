import { Star } from 'lucide-react';

interface StarRatingProps {
  rating: number;
  max?: number;
  size?: 'sm' | 'md';
  interactive?: boolean;
  onChange?: (r: number) => void;
}

export default function StarRating({ rating, max = 5, size = 'sm', interactive = false, onChange }: StarRatingProps) {
  const sz = size === 'sm' ? 'w-3.5 h-3.5' : 'w-5 h-5';
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: max }).map((_, i) => (
        <Star
          key={i}
          className={`${sz} transition-colors ${i < rating ? 'text-amber-400 fill-amber-400' : 'text-slate-200 fill-slate-200'} ${interactive ? 'cursor-pointer hover:text-amber-300' : ''}`}
          onClick={() => interactive && onChange?.(i + 1)}
        />
      ))}
    </div>
  );
}
