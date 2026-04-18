import { Search, MapPin, SlidersHorizontal } from 'lucide-react';
import { useState } from 'react';

interface SearchBarProps {
  placeholder?: string;
  onSearch?: (q: string, loc: string) => void;
  className?: string;
}

export default function SearchBar({ placeholder = 'Search places, events...', onSearch, className = '' }: SearchBarProps) {
  const [q, setQ] = useState('');
  const [loc, setLoc] = useState('');

  return (
    <div className={`flex flex-col sm:flex-row gap-2 bg-white rounded-2xl shadow-xl p-2 ${className}`}>
      <div className="flex items-center gap-2 flex-1 px-3">
        <Search className="w-5 h-5 text-primary-500 flex-shrink-0" />
        <input
          value={q}
          onChange={e => setQ(e.target.value)}
          placeholder={placeholder}
          className="flex-1 bg-transparent text-slate-800 placeholder-slate-400 text-sm focus:outline-none"
          onKeyDown={e => e.key === 'Enter' && onSearch?.(q, loc)}
        />
      </div>
      <div className="hidden sm:flex items-center gap-2 px-3 border-l border-slate-200">
        <MapPin className="w-4 h-4 text-slate-400" />
        <input
          value={loc}
          onChange={e => setLoc(e.target.value)}
          placeholder="Location"
          className="bg-transparent text-slate-700 text-sm placeholder-slate-400 focus:outline-none w-28"
        />
      </div>
      <button onClick={() => onSearch?.(q, loc)} className="btn-primary text-sm px-6">Search</button>
    </div>
  );
}
