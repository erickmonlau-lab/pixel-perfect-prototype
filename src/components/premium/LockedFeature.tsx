import * as React from 'react';
import { Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { UpgradeModal } from './UpgradeModal';
import { cn } from '@/lib/utils';

export interface LockedFeatureProps {
  children: React.ReactNode;
  isLocked?: boolean;
  featureName?: string;
  description?: string;
  className?: string;
}

export function LockedFeature({
  children,
  isLocked = true,
  featureName = 'Función Premium',
  description = 'Desbloquea el acceso ilimitado a esta capacidad con BreadPDF Premium.',
  className,
}: LockedFeatureProps) {
  const [modalOpen, setModalOpen] = React.useState(false);

  if (!isLocked) {
    return <>{children}</>;
  }

  return (
    <div className={cn('relative rounded-xl overflow-hidden', className)}>
      <div className="filter blur-[2px] pointer-events-none select-none opacity-60">
        {children}
      </div>
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center p-4 bg-background/70 backdrop-blur-[2px] text-center border border-dashed border-border/80 rounded-xl">
        <div className="h-9 w-9 rounded-full bg-brand-pdf/10 text-brand-pdf flex items-center justify-center mb-2 shadow-xs">
          <Lock className="h-4 w-4" />
        </div>
        <h4 className="text-sm font-semibold text-foreground mb-1">{featureName}</h4>
        <p className="text-xs text-muted-foreground max-w-xs mb-3">{description}</p>
        <Button
          size="sm"
          onClick={() => setModalOpen(true)}
          className="bg-brand-pdf text-white hover:bg-brand-pdf-dark text-xs font-semibold h-8 px-3 shadow-xs"
        >
          Desbloquear Premium
        </Button>
      </div>

      <UpgradeModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        featureName={featureName}
        featureDescription={description}
      />
    </div>
  );
}
