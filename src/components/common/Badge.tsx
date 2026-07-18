import type { ReactNode } from 'react';

interface BadgeProps {
    children: ReactNode;
    tone?: 'default' | 'success' | 'warning';
}

export function Badge({ children, tone = 'default' }: BadgeProps) {
    const tones: Record<string, string> = {
        default: 'bg-slate-100 text-slate-700',
        success: 'bg-emerald-100 text-emerald-700',
        warning: 'bg-amber-100 text-amber-700',
    };

    return (
        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${tones[tone]}`}>
      {children}
    </span>
    );
}
