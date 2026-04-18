import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  current: number;
  total: number;
  onPage: (p: number) => void;
}

export default function Pagination({ current, total, onPage }: PaginationProps) {
  if (total <= 1) return null;
  const pages = Array.from({ length: total }, (_, i) => i + 1);
  return (
    <div className="flex items-center justify-center gap-2 mt-6">
      <button onClick={() => onPage(current - 1)} disabled={current === 1} className="p-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors">
        <ChevronLeft className="w-4 h-4" />
      </button>
      {pages.map(p => (
        <button key={p} onClick={() => onPage(p)} className={`w-9 h-9 rounded-lg text-sm font-medium transition-colors ${p === current ? 'bg-primary-500 text-white' : 'border border-slate-200 text-slate-600 hover:bg-slate-50'}`}>
          {p}
        </button>
      ))}
      <button onClick={() => onPage(current + 1)} disabled={current === total} className="p-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors">
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
}
