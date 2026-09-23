import * as React from 'react';
import { PremiumCrownIcon } from '@/components/site/PremiumCrownIcon';
import { cn } from '@/lib/utils';

export interface PremiumBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  size?: 'sm' | 'md';
  text?: string;
}

export function PremiumBadge({
  className,
  size = 'md',
  text = 'Premium',
  ...props
}: PremiumBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 font-bold rounded-full select-none shadow-xs border transition-colors',
        'bg-brand-pdf/10 text-brand-pdf border-brand-pdf/20',
        size === 'sm'
          ? 'text-[11px] px-2 py-0.5'
          : 'text-xs px-2.5 py-1',
        className
      )}
      {...props}
    >
      <PremiumCrownIcon className={cn(size === 'sm' ? 'size-3' : 'size-3.5', 'text-brand-pdf shrink-0')} />
      <span>{text}</span>
    </span>
  );
}
