import { ReactNode } from 'react';

type BadgeVariant = 'primary' | 'secondary' | 'accent' | 'warning' | 'danger' | 'neutral';

interface BadgeProps { children: ReactNode; variant?: BadgeVariant; }

const styles: Record<BadgeVariant, string> = {
  primary: 'bg-primary-100 text-primary-700',
  secondary: 'bg-secondary-100 text-secondary-700',
  accent: 'bg-accent-100 text-accent-700',
  warning: 'bg-amber-100 text-amber-700',
  danger: 'bg-red-100 text-red-600',
  neutral: 'bg-slate-100 text-slate-600',
};

export default function Badge({ children, variant = 'neutral' }: BadgeProps) {
  return <span className={`badge ${styles[variant]}`}>{children}</span>;
}
