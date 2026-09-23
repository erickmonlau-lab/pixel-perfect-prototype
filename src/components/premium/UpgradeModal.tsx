import * as React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Check, ArrowRight } from 'lucide-react';
import { PremiumCrownIcon } from '@/components/site/PremiumCrownIcon';
import { useI18n } from '@/lib/i18n/context';
import { trackMonetizationEvent } from '@/lib/monetization/analytics';

export interface UpgradeModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  featureName?: string;
  featureDescription?: string;
}

export function UpgradeModal({
  open,
  onOpenChange,
  featureName = 'Función avanzada',
  featureDescription = 'Esta función forma parte de BreadPDF Premium y está pensada para flujos de trabajo intensivos.',
}: UpgradeModalProps) {
  const { lang } = useI18n();

  React.useEffect(() => {
    if (open) {
      trackMonetizationEvent({
        type: 'feature_locked',
        feature: featureName,
        locale: lang,
      });
    }
  }, [open, featureName, lang]);

  const handleUpgradeClick = () => {
    trackMonetizationEvent({
      type: 'upgrade_click',
      feature: featureName,
      source: 'upgrade_modal',
      locale: lang,
    });
    onOpenChange(false);
    window.location.href = `/${lang}/premium#pricing`;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md p-6 overflow-hidden border-border bg-background shadow-2xl">
        <div className="flex flex-col items-center text-center pt-2 pb-1">
          <div className="h-12 w-12 rounded-full bg-brand-pdf/10 text-brand-pdf flex items-center justify-center mb-4 ring-8 ring-brand-pdf/5">
            <PremiumCrownIcon className="h-6 w-6" />
          </div>
          <DialogHeader className="space-y-2 text-center sm:text-center">
            <DialogTitle className="text-xl font-bold tracking-tight text-foreground">
              {featureName}
            </DialogTitle>
            <DialogDescription className="text-sm text-muted-foreground max-w-xs mx-auto">
              {featureDescription}
            </DialogDescription>
          </DialogHeader>
        </div>

        <div className="my-4 rounded-xl border border-border/80 bg-muted/40 p-4 space-y-2.5 text-xs text-foreground/90 font-medium">
          <div className="flex items-center gap-2">
            <Check className="h-4 w-4 text-brand-pdf shrink-0" />
            <span>Experiencia profesional sin anuncios</span>
          </div>
          <div className="flex items-center gap-2">
            <Check className="h-4 w-4 text-brand-pdf shrink-0" />
            <span>Procesamiento simultáneo y por lotes</span>
          </div>
          <div className="flex items-center gap-2">
            <Check className="h-4 w-4 text-brand-pdf shrink-0" />
            <span>Máxima prioridad y rendimiento en navegador</span>
          </div>
        </div>

        <div className="flex flex-col gap-2 pt-2">
          <Button
            onClick={handleUpgradeClick}
            className="w-full bg-brand-pdf text-white hover:bg-brand-pdf-dark font-semibold py-2.5 flex items-center justify-center gap-2 shadow-sm"
          >
            <span>Mejorar a Premium</span>
            <ArrowRight className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            onClick={() => onOpenChange(false)}
            className="w-full text-xs text-muted-foreground hover:text-foreground font-normal"
          >
            Continuar con la versión gratuita
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
