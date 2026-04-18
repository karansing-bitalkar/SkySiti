import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MapPin, Mail, Lock, User, ArrowLeft, Eye, EyeOff, Building2, CalendarDays, Shield, KeyRound } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { UserRole } from '@/types';
import { toast } from 'sonner';

const roles = [
  { key: 'user' as const, label: 'City Explorer', desc: 'Discover places, events & deals', icon: User, color: 'border-primary-300 text-primary-600 bg-primary-50 dark:border-primary-700 dark:text-primary-400 dark:bg-primary-900/20' },
  { key: 'business' as const, label: 'Business Owner', desc: 'List & manage your business', icon: Building2, color: 'border-secondary-300 text-secondary-600 bg-secondary-50 dark:border-secondary-700 dark:text-secondary-400 dark:bg-secondary-900/20' },
  { key: 'organizer' as const, label: 'Event Organizer', desc: 'Create & manage events', icon: CalendarDays, color: 'border-accent-300 text-accent-700 bg-accent-50 dark:border-accent-700 dark:text-accent-400 dark:bg-accent-900/20' },
];

export default function Register() {
  const [step, setStep] = useState(1);
  const [role, setRole] = useState<UserRole>('user');
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPw: '' });
  const [otp, setOtp] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [useRealAuth, setUseRealAuth] = useState(false);
  const { register, sendOtp, verifyOtpAndSignIn, getDashboardPath } = useAuth();
  const navigate = useNavigate();

  // Demo register (no email verification)
  const handleDemoRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.password) { toast.error('Please fill all fields'); return; }
    if (form.password !== form.confirmPw) { toast.error('Passwords do not match'); return; }
    if (form.password.length < 6) { toast.error('Password must be at least 6 characters'); return; }
    setLoading(true);
    setTimeout(() => {
      const user = register(form.name, form.email, form.password, role);
      toast.success(`Welcome to SkySiti, ${user.name.split(' ')[0]}!`);
      navigate(getDashboardPath(user.role));
      setLoading(false);
    }, 800);
  };

  // Step 1: Send OTP
  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.email) { toast.error('Please enter your email'); return; }
    setLoading(true);
    try {
      await sendOtp(form.email);
      setOtpSent(true);
      setStep(3);
      toast.success('OTP sent! Check your email (4-digit code)');
    } catch (err: any) {
      toast.error(err.message || 'Failed to send OTP');
    }
    setLoading(false);
  };

  // Step 2: Verify OTP + create account
  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otp || otp.length < 4) { toast.error('Please enter the 4-digit OTP'); return; }
    if (!form.password || form.password !== form.confirmPw) { toast.error('Passwords do not match'); return; }
    setLoading(true);
    try {
      const user = await verifyOtpAndSignIn(form.email, otp, form.password, form.name, role);
      toast.success(`Welcome to SkySiti, ${user.name.split(' ')[0]}!`);
      navigate(getDashboardPath(user.role));
    } catch (err: any) {
      toast.error(err.message || 'Invalid OTP or verification failed');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-primary-950 to-secondary-950 flex items-center justify-center p-6">
      <div className="w-full max-w-lg">
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
            <h1 className="text-2xl font-display font-black text-slate-900 dark:text-white">Create Account</h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
              {useRealAuth ? `Step ${step <= 2 ? '1' : '2'} of 2 — ${step <= 2 ? 'Your details' : 'Verify email'}` : `Step ${step} of 2 — ${step === 1 ? 'Choose your role' : 'Your details'}`}
            </p>

            {/* Progress */}
            <div className="flex gap-2 mt-4">
              {[1, 2].map(s => (
                <div key={s} className={`h-1.5 flex-1 rounded-full transition-all ${s <= (useRealAuth ? Math.min(step, 2) : step) ? 'bg-gradient-to-r from-primary-500 to-secondary-500' : 'bg-slate-200 dark:bg-slate-600'}`} />
              ))}
            </div>

            {/* Auth mode toggle */}
            <div className="flex gap-2 mt-4">
              <button onClick={() => setUseRealAuth(false)} className={`flex-1 py-2 rounded-xl text-xs font-semibold transition-all ${!useRealAuth ? 'bg-primary-500 text-white' : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400'}`}>
                Quick Register
              </button>
              <button onClick={() => setUseRealAuth(true)} className={`flex-1 flex items-center justify-center gap-1 py-2 rounded-xl text-xs font-semibold transition-all ${useRealAuth ? 'bg-primary-500 text-white' : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400'}`}>
                <KeyRound className="w-3 h-3" /> Email Verified
              </button>
            </div>
          </div>

          {/* Step 1: Role Selection */}
          {step === 1 && (
            <div>
              <p className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-4">How will you use SkySiti?</p>
              <div className="space-y-3 mb-8">
                {roles.map(r => (
                  <button key={r.key} type="button" onClick={() => setRole(r.key)} className={`w-full flex items-center gap-4 p-4 rounded-2xl border-2 transition-all ${role === r.key ? r.color : 'border-slate-200 dark:border-slate-600 hover:border-slate-300 dark:hover:border-slate-500 bg-white dark:bg-slate-700'}`}>
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${role === r.key ? 'bg-white/30 dark:bg-white/10' : 'bg-slate-100 dark:bg-slate-600'}`}>
                      <r.icon className={`w-5 h-5 ${role === r.key ? 'text-current' : 'text-slate-500 dark:text-slate-400'}`} />
                    </div>
                    <div className="text-left">
                      <p className={`font-bold ${role === r.key ? 'text-current' : 'text-slate-800 dark:text-white'}`}>{r.label}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">{r.desc}</p>
                    </div>
                    {role === r.key && <div className="ml-auto w-5 h-5 rounded-full bg-current opacity-30 flex items-center justify-center"><div className="w-2 h-2 rounded-full bg-current" /></div>}
                  </button>
                ))}
              </div>
              <button onClick={() => setStep(2)} className="btn-primary w-full py-3.5 text-base">Continue →</button>
            </div>
          )}

          {/* Step 2: User Details */}
          {step === 2 && (
            <form onSubmit={useRealAuth ? handleSendOtp : handleDemoRegister} className="space-y-4">
              <div>
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5 block">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} className="input-field pl-10" placeholder="Your full name" />
                </div>
              </div>
              <div>
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5 block">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} className="input-field pl-10" placeholder="your@email.com" />
                </div>
              </div>
              {!useRealAuth && (
                <>
                  <div>
                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5 block">Password</label>
                    <div className="relative">
                      <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input type={showPw ? 'text' : 'password'} value={form.password} onChange={e => setForm(f => ({ ...f, password: e.target.value }))} className="input-field pl-10 pr-10" placeholder="Min 6 characters" />
                      <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                        {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5 block">Confirm Password</label>
                    <div className="relative">
                      <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input type="password" value={form.confirmPw} onChange={e => setForm(f => ({ ...f, confirmPw: e.target.value }))} className="input-field pl-10" placeholder="Repeat password" />
                    </div>
                  </div>
                </>
              )}
              {useRealAuth && (
                <div className="bg-primary-50 dark:bg-primary-900/20 rounded-xl p-3 text-xs text-primary-700 dark:text-primary-300">
                  We'll send a 4-digit OTP to verify your email address.
                </div>
              )}
              <p className="text-xs text-slate-400 dark:text-slate-500 flex items-start gap-1.5">
                <Shield className="w-3.5 h-3.5 mt-0.5 flex-shrink-0 text-accent-500" />
                By creating an account, you agree to our Terms of Service and Privacy Policy.
              </p>
              <div className="flex gap-3 pt-1">
                <button type="button" onClick={() => setStep(1)} className="flex-1 border-2 border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-300 font-semibold py-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                  Back
                </button>
                <button type="submit" disabled={loading} className="flex-1 btn-primary py-3 text-base flex items-center justify-center gap-2">
                  {loading && <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />}
                  {loading ? (useRealAuth ? 'Sending OTP...' : 'Creating...') : (useRealAuth ? 'Send OTP →' : 'Create Account')}
                </button>
              </div>
            </form>
          )}

          {/* Step 3: OTP Verification (real auth only) */}
          {step === 3 && useRealAuth && (
            <form onSubmit={handleVerifyOtp} className="space-y-4">
              <div className="bg-accent-50 dark:bg-accent-900/20 rounded-xl p-4 text-sm text-accent-700 dark:text-accent-400 text-center">
                OTP sent to <strong>{form.email}</strong><br />
                <span className="text-xs text-slate-400">Check your inbox for the 4-digit code</span>
              </div>
              <div>
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5 block">OTP Code (4 digits)</label>
                <input value={otp} onChange={e => setOtp(e.target.value.replace(/\D/g, '').slice(0, 4))} className="input-field text-center text-2xl font-bold tracking-widest" placeholder="0000" maxLength={4} />
              </div>
              <div>
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5 block">Set Password</label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input type={showPw ? 'text' : 'password'} value={form.password} onChange={e => setForm(f => ({ ...f, password: e.target.value }))} className="input-field pl-10 pr-10" placeholder="Min 6 characters" />
                  <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                    {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
              <div>
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5 block">Confirm Password</label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input type="password" value={form.confirmPw} onChange={e => setForm(f => ({ ...f, confirmPw: e.target.value }))} className="input-field pl-10" placeholder="Repeat password" />
                </div>
              </div>
              <div className="flex gap-3">
                <button type="button" onClick={() => setStep(2)} className="flex-1 border-2 border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-300 font-semibold py-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">Back</button>
                <button type="submit" disabled={loading} className="flex-1 btn-primary py-3 flex items-center justify-center gap-2">
                  {loading && <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />}
                  {loading ? 'Verifying...' : 'Verify & Create'}
                </button>
              </div>
            </form>
          )}

          <p className="text-center text-sm text-slate-500 dark:text-slate-400 mt-6">
            Already have an account?{' '}
            <Link to="/login" className="text-primary-600 font-semibold hover:text-primary-700">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
