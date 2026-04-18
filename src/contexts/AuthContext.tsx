import { createContext, useContext, useEffect, useState, useCallback, ReactNode } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';
import { AuthUser, UserRole } from '@/types';

interface AuthContextType {
  user: AuthUser | null;
  supabaseUser: User | null;
  loading: boolean;
  login: (email: string, password: string, role?: UserRole) => AuthUser | null;
  loginWithSupabase: (email: string, password: string) => Promise<AuthUser | null>;
  register: (name: string, email: string, password: string, role: UserRole) => AuthUser;
  registerWithSupabase: (name: string, email: string, password: string, role: UserRole) => Promise<void>;
  sendOtp: (email: string) => Promise<void>;
  verifyOtpAndSignIn: (email: string, token: string, password: string, name: string, role: UserRole) => Promise<AuthUser>;
  logout: () => void;
  updateUser: (updates: Partial<AuthUser>) => void;
  getDashboardPath: (role?: UserRole) => string;
}

const AuthContext = createContext<AuthContextType | null>(null);

// Demo accounts for quick testing
const DEMO_ACCOUNTS: Record<string, { role: UserRole; name: string }> = {
  'user@skysiti.com': { role: 'user', name: 'Alex Johnson' },
  'business@skysiti.com': { role: 'business', name: 'Sarah Mitchell' },
  'organizer@skysiti.com': { role: 'organizer', name: 'Marcus Chen' },
  'admin@skysiti.com': { role: 'admin', name: 'Diana Prince' },
};

const STORAGE_KEY = 'skysiti_auth';
const generateId = () => Math.random().toString(36).substr(2, 9);

function mapSupabaseUser(user: User, extraRole?: UserRole, extraName?: string): AuthUser {
  const meta = user.user_metadata || {};
  const role = meta.role || extraRole || 'user';
  const name = meta.username || meta.full_name || extraName || user.email!.split('@')[0];
  return {
    id: user.id,
    name,
    email: user.email!,
    role: role as UserRole,
    avatar: meta.avatar_url || meta.picture || `https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&random=${user.id}`,
    location: meta.location || 'SkySiti',
    joinedAt: user.created_at || new Date().toISOString(),
  };
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try { return JSON.parse(stored); } catch { return null; }
    }
    return null;
  });
  const [supabaseUser, setSupabaseUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (mounted && session?.user) {
        const mapped = mapSupabaseUser(session.user);
        setSupabaseUser(session.user);
        setUser(mapped);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(mapped));
      }
      if (mounted) setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (!mounted) return;
      if (event === 'SIGNED_IN' && session?.user) {
        const mapped = mapSupabaseUser(session.user);
        setSupabaseUser(session.user);
        setUser(mapped);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(mapped));
        setLoading(false);
      } else if (event === 'SIGNED_OUT') {
        setSupabaseUser(null);
        setUser(null);
        localStorage.removeItem(STORAGE_KEY);
        setLoading(false);
      } else if (event === 'TOKEN_REFRESHED' && session?.user) {
        setSupabaseUser(session.user);
      }
    });

    return () => { mounted = false; subscription.unsubscribe(); };
  }, []);

  // Mock login for demo accounts (no real backend needed for demos)
  const login = useCallback((email: string, _password: string, role?: UserRole): AuthUser | null => {
    const demo = DEMO_ACCOUNTS[email];
    const userRole = role || demo?.role || 'user';
    const userName = demo?.name || email.split('@')[0];
    const authUser: AuthUser = {
      id: generateId(),
      name: userName,
      email,
      role: userRole,
      avatar: `https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop`,
      location: 'Downtown, SkySiti',
      joinedAt: new Date().toISOString(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(authUser));
    setUser(authUser);
    return authUser;
  }, []);

  // Real Supabase login
  const loginWithSupabase = useCallback(async (email: string, password: string): Promise<AuthUser | null> => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    if (!data.user) return null;
    const mapped = mapSupabaseUser(data.user);
    setUser(mapped);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(mapped));
    return mapped;
  }, []);

  // Mock register for demo
  const register = useCallback((name: string, email: string, _password: string, role: UserRole = 'user'): AuthUser => {
    const authUser: AuthUser = {
      id: generateId(),
      name,
      email,
      role,
      avatar: `https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop`,
      location: 'SkySiti',
      joinedAt: new Date().toISOString(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(authUser));
    setUser(authUser);
    return authUser;
  }, []);

  // Real Supabase OTP send
  const sendOtp = useCallback(async (email: string) => {
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { shouldCreateUser: true },
    });
    if (error) throw error;
  }, []);

  // Real Supabase OTP verify + set password
  const verifyOtpAndSignIn = useCallback(async (
    email: string,
    token: string,
    password: string,
    name: string,
    role: UserRole
  ): Promise<AuthUser> => {
    const { error: verifyError } = await supabase.auth.verifyOtp({ email, token, type: 'email' });
    if (verifyError) throw verifyError;

    const { data: updateData, error: updateError } = await supabase.auth.updateUser({
      password,
      data: { username: name, role },
    });
    if (updateError) throw updateError;

    const mapped = mapSupabaseUser(updateData.user!, role, name);
    setUser(mapped);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(mapped));
    return mapped;
  }, []);

  // Real Supabase register (OTP flow)
  const registerWithSupabase = useCallback(async (name: string, email: string, password: string, role: UserRole) => {
    await sendOtp(email);
  }, [sendOtp]);

  const logout = useCallback(async () => {
    await supabase.auth.signOut();
    localStorage.removeItem(STORAGE_KEY);
    setUser(null);
    setSupabaseUser(null);
  }, []);

  const updateUser = useCallback((updates: Partial<AuthUser>) => {
    setUser(prev => {
      if (!prev) return null;
      const updated = { ...prev, ...updates };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  const getDashboardPath = useCallback((role?: UserRole) => {
    const r = role || user?.role;
    switch (r) {
      case 'business': return '/dashboard/business';
      case 'organizer': return '/dashboard/organizer';
      case 'admin': return '/dashboard/admin';
      default: return '/dashboard/user';
    }
  }, [user?.role]);

  return (
    <AuthContext.Provider value={{
      user, supabaseUser, loading,
      login, loginWithSupabase,
      register, registerWithSupabase, sendOtp, verifyOtpAndSignIn,
      logout, updateUser, getDashboardPath,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
