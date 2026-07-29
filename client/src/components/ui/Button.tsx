import React, { ButtonHTMLAttributes, forwardRef } from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { ButtonVariant, ButtonSize } from '../../types';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  magnetic?: boolean;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: 'bg-auroraBlue text-white hover:bg-blue-600 shadow-auroraGlow border border-blue-400/30',
  secondary: 'bg-slate-800 text-slate-100 hover:bg-slate-700 border border-white/10',
  ghost: 'bg-transparent text-slate-300 hover:text-white hover:bg-white/10',
  glass: 'glass-panel text-white hover:bg-white/15 border border-white/20 shadow-lg',
  gradient: 'bg-gradient-to-r from-auroraBlue via-royalPurple to-tealAccent text-white shadow-auroraGlow hover:opacity-95',
  danger: 'bg-rose-600 text-white hover:bg-rose-700 shadow-lg border border-rose-400/30',
  outline: 'bg-transparent text-slate-200 border border-white/20 hover:border-auroraBlue hover:text-white',
  icon: 'p-2.5 rounded-xl glass-panel text-slate-300 hover:text-white hover:border-white/30',
  loading: 'bg-auroraBlue/60 text-white cursor-not-allowed border border-blue-400/20',
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-xs rounded-xl font-mono gap-1.5',
  md: 'px-5 py-2.5 text-sm rounded-xl font-mono gap-2',
  lg: 'px-7 py-3.5 text-base rounded-2xl font-mono gap-2.5 font-semibold',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      leftIcon,
      rightIcon,
      magnetic = true,
      className,
      disabled,
      ...props
    },
    ref
  ) => {
    const isActuallyLoading = isLoading || variant === 'loading';
    const computedVariant = isActuallyLoading ? 'loading' : variant;

    const baseClasses = twMerge(
      clsx(
        'inline-flex items-center justify-center font-mono font-medium transition-all duration-200 select-none outline-none focus-visible:ring-2 focus-visible:ring-auroraBlue/80 active:scale-95',
        variantStyles[computedVariant],
        sizeStyles[size],
        disabled || isActuallyLoading ? 'opacity-60 pointer-events-none' : '',
        className
      )
    );

    const MotionComponent = magnetic ? motion.button : 'button';

    return (
      <MotionComponent
        ref={ref as any}
        {...(magnetic && !(disabled || isActuallyLoading) ? { whileHover: { scale: 1.04 }, whileTap: { scale: 0.96 } } : {})}
        className={baseClasses}
        disabled={disabled || isActuallyLoading}
        {...(props as any)}
      >
        {isActuallyLoading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin shrink-0" />
            <span>Processing...</span>
          </>
        ) : (
          <>
            {leftIcon && <span className="shrink-0">{leftIcon}</span>}
            <span>{children}</span>
            {rightIcon && <span className="shrink-0">{rightIcon}</span>}
          </>
        )}
      </MotionComponent>
    );
  }
);

Button.displayName = 'Button';
