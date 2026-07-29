import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface BadgeProps {
  children: React.ReactNode;
  variant?: 'blue' | 'purple' | 'teal' | 'glass';
  className?: string;
  icon?: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'glass',
  className,
  icon
}) => {
  const variantStyles = {
    blue: 'bg-blue-500/10 text-blue-300 border-blue-500/30',
    purple: 'bg-purple-500/10 text-purple-300 border-purple-500/30',
    teal: 'bg-teal-500/10 text-teal-300 border-teal-500/30',
    glass: 'glass-pill text-slate-200 border-white/15'
  };

  return (
    <span
      className={twMerge(
        clsx(
          'inline-flex items-center gap-1.5 px-3 py-1 rounded-full font-mono text-xs border backdrop-blur-md font-medium select-none',
          variantStyles[variant],
          className
        )
      )}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
    </span>
  );
};
