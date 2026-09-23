import * as React from 'react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { PremiumCrownIcon } from '@/components/site/PremiumCrownIcon';

interface PremiumTooltipProps {
  children: React.ReactNode;
  content?: string;
}

export function PremiumTooltip({
  children,
  content = 'Función disponible con BreadPDF Premium',
}: PremiumTooltipProps) {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={200}>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent className="flex items-center gap-1.5 bg-neutral-900 text-white font-medium py-1.5 px-3 border border-neutral-800 shadow-md">
          <PremiumCrownIcon className="size-3.5 text-brand-pdf shrink-0" />
          <span>{content}</span>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
