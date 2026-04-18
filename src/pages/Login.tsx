import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MapPin, Mail, Lock, Eye, EyeOff, ArrowLeft, Zap, KeyRound } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { DEMO_ACCOUNTS } from '@/constants';
import { toast } from 'sonner';
import { UserRole } from '@/types';

const demoAccounts = [
  { label: 'User Demo', key: 'user' as const, color: 'bg-primary-500' },
  { label: 'Business Demo', key: 'business' as const, color: 'bg-secondary-500' },
  { label: 'Organizer Demo', key: 'organizer' as const, color: 'bg-accent-600' },
  { label: 'Admin Demo', key: 'admin' as const, color: 'bg-red-500' },
];

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState<'demo' | 'real'>('demo');
  const { login, loginWithSupabase, getDashboardPath } = useAuth();
  const navigate = useNavigate();

  const fillDemo = (key: keyof typeof DEMO_ACCOUNTS) => {
    const acc = DEMO_ACCOUNTS[key];
    setEmail(acc.email);
    setPassword(acc.password);
    toast.success(`Demo credentials filled — click Sign In`);
  };

  const handleDemoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) { toast.error('Please enter your credentials'); return; }
    setLoading(true);
    setTimeout(() => {
      const user = login(email, password);
      if (user) {
        toast.success(`Welcome back, ${user.name.split(' ')[0]}!`);
        navigate(getDashboardPath(user.role));
      } else {
        toast.error('Invalid credentials. Try a demo account above.');
      }
      setLoading(false);
    }, 500);
  };

  const handleRealSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) { toast.error('Please enter your credentials'); return; }
    setLoading(true);
    try {
      const user = await loginWithSupabase(email, password);
      if (user) {
        toast.success(`Welcome back, ${user.name.split(' ')[0]}!`);
        navigate(getDashboardPath(user.role));
      }
    } catch (err: any) {
      toast.error(err.message || 'Invalid credentials');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-primary-950 to-secondary-950 flex">
      {/* Left Branding */}
      <div className="hidden lg:flex lg:flex-1 items-center justify-center p-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-20" />
        <div className="relative text-center">
          <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-primary-500/40">
            <MapPin className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-4xl font-display font-black text-white mb-4">Welcome Back!</h2>
          <p className="text-slate-300 text-lg max-w-sm leading-relaxed">
            Your city is waiting. Discover new places, grab deals, and connect with your community.
          </p>
          <div className="mt-12 grid grid-cols-2 gap-4 max-w-xs mx-auto">
            {[['50K+', 'Users'], ['24', 'Cities'], ['12K+', 'Businesses'], ['850+', 'Events/mo']].map(([v, l]) => (
              <div key={l} className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 text-center border border-white/10">
                <p className="text-2xl font-black text-white">{v}</p>
                <p className="text-slate-400 text-xs mt-0.5">{l}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Form */}
      <div className="flex-1 lg:max-w-md flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <Link to="/" className="flex items-center gap-2 text-slate-400 hover:text-white text-sm mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>

          <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-2xl">
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
                  <MapPin className="w-4 h-4 text-white" />
                </div>
                <span className="font-display font-bold text-gradient text-xl">SkySiti</span>
              </div>
              <h1 className="text-2xl font-display font-black text-slate-900 dark:text-white">Sign In</h1>
              <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Try a demo account or sign in with real credentials</p>
            </div>

            {/* Mode Toggle */}
            <div className="flex bg-slate-100 dark:bg-slate-700 rounded-xl p-1 mb-6">
              <button onClick={() => setMode('demo')} className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-sm font-semibold transition-all ${mode === 'demo' ? 'bg-white dark:bg-slate-600 text-primary-600 dark:text-primary-400 shadow-sm' : 'text-slate-500 dark:text-slate-400'}`}>
                <Zap className="w-3.5 h-3.5" /> Demo Mode
              </button>
              <button onClick={() => setMode('real')} className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-sm font-semibold transition-all ${mode === 'real' ? 'bg-white dark:bg-slate-600 text-primary-600 dark:text-primary-400 shadow-sm' : 'text-slate-500 dark:text-slate-400'}`}>
                <KeyRound className="w-3.5 h-3.5" /> Real Account
              </button>
            </div>

            {mode === 'demo' && (
              <div className="mb-6">
                <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-3 flex items-center gap-1.5"><Zap className="w-3.5 h-3.5" /> Quick Demo Access</p>
                <div className="grid grid-cols-2 gap-2">
                  {demoAccounts.map(d => (
                    <button key={d.key} onClick={() => fillDemo(d.key)} className={`${d.color} text-white text-xs font-semibold px-3 py-2.5 rounded-xl hover:opacity-90 transition-opacity`}>
                      {d.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {mode === 'real' && (
              <div className="mb-5 bg-primary-50 dark:bg-primary-900/20 rounded-xl p-3 text-xs text-primary-700 dark:text-primary-300">
                Sign in with your registered email & password. New user? Register below to create an account with OTP verification.
              </div>
            )}

            <form onSubmit={mode === 'demo' ? handleDemoSubmit : handleRealSubmit} className="space-y-4">
              <div>
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5 block">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="input-field pl-10" placeholder="your@email.com" autoComplete="email" />
                </div>
              </div>
              <div>
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5 block">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input type={showPw ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} className="input-field pl-10 pr-10" placeholder="••••••••" autoComplete="current-password" />
                  <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors">
                    {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
              <button type="submit" disabled={loading} className="btn-primary w-full py-3.5 text-base flex items-center justify-center gap-2">
                {loading && <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />}
                {loading ? 'Signing in...' : 'Sign In'}
              </button>
            </form>

            <p className="text-center text-sm text-slate-500 dark:text-slate-400 mt-6">
              Don't have an account?{' '}
              <Link to="/register" className="text-primary-600 font-semibold hover:text-primary-700">Create one free</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
