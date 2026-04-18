import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  current: number;
  total: number;
  onPage: (page: number) => void;
}

export default function Pagination({ current, total, onPage }: PaginationProps) {
  if (total <= 1) return null;

  const pages = Array.from({ length: total }, (_, i) => i + 1);
  // Show at most 5 page numbers
  let visiblePages = pages;
  if (total > 5) {
    const start = Math.max(1, current - 2);
    const end = Math.min(total, start + 4);
    visiblePages = pages.slice(Math.max(0, end - 5), end);
  }

  return (
    <div className="flex items-center justify-center gap-1 mt-8 flex-wrap">
      <button
        onClick={e => { e.preventDefault(); onPage(Math.max(1, current - 1)); }}
        disabled={current === 1}
        className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors bg-white dark:bg-slate-900"
      >
        <ChevronLeft className="w-4 h-4 text-slate-600 dark:text-slate-400" />
      </button>

      {visiblePages[0] > 1 && (
        <>
          <button onClick={e => { e.preventDefault(); onPage(1); }} className="w-9 h-9 rounded-xl text-sm font-semibold transition-colors bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400">1</button>
          {visiblePages[0] > 2 && <span className="text-slate-400 px-1">…</span>}
        </>
      )}

      {visiblePages.map(p => (
        <button
          key={p}
          onClick={e => { e.preventDefault(); onPage(p); }}
          className={`w-9 h-9 rounded-xl text-sm font-semibold transition-all ${
            p === current
              ? 'bg-primary-500 text-white shadow-md shadow-primary-500/20'
              : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400'
          }`}
        >
          {p}
        </button>
      ))}

      {visiblePages[visiblePages.length - 1] < total && (
        <>
          {visiblePages[visiblePages.length - 1] < total - 1 && <span className="text-slate-400 px-1">…</span>}
          <button onClick={e => { e.preventDefault(); onPage(total); }} className="w-9 h-9 rounded-xl text-sm font-semibold transition-colors bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400">{total}</button>
        </>
      )}

      <button
        onClick={e => { e.preventDefault(); onPage(Math.min(total, current + 1)); }}
        disabled={current === total}
        className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors bg-white dark:bg-slate-900"
      >
        <ChevronRight className="w-4 h-4 text-slate-600 dark:text-slate-400" />
      </button>
    </div>
  );
}
