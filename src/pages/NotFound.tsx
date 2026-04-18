import { Link } from 'react-router-dom';
import { MapPin, ArrowLeft, Search, Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-primary-950 to-secondary-950 flex items-center justify-center p-6">
      <div className="text-center max-w-lg">
        <div className="w-24 h-24 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-primary-500/40">
          <MapPin className="w-12 h-12 text-white" />
        </div>
        <h1 className="text-8xl font-display font-black text-white mb-4">404</h1>
        <h2 className="text-2xl font-bold text-slate-200 mb-4">Lost in the City?</h2>
        <p className="text-slate-400 text-lg mb-10">
          Looks like this page took a wrong turn. Let's get you back on track.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Link to="/" className="flex items-center gap-2 bg-primary-500 hover:bg-primary-600 text-white font-bold px-7 py-3.5 rounded-2xl transition-all">
            <Home className="w-5 h-5" /> Back to Home
          </Link>
          <Link to="/explore" className="flex items-center gap-2 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white font-semibold px-7 py-3.5 rounded-2xl border border-white/20 transition-all">
            <Search className="w-5 h-5" /> Explore City
          </Link>
        </div>
      </div>
    </div>
  );
}
