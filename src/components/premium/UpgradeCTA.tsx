import * as React from 'react';
import { ArrowRight } from 'lucide-react';
import { PremiumCrownIcon } from '@/components/site/PremiumCrownIcon';
import { Button } from '@/components/ui/button';
import { useI18n } from '@/lib/i18n/context';
import { cn } from '@/lib/utils';

export interface UpgradeCTAProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'card' | 'banner';
}

export function UpgradeCTA({ className, variant = 'card', ...props }: UpgradeCTAProps) {
  const { lang } = useI18n();

  const copy = {
    es: {
      title: '¿Trabajas habitualmente con documentos PDF?',
      sub: 'Conoce BreadPDF Premium: sin anuncios, procesamiento por lotes y más velocidad.',
      cta: 'Ver BreadPDF Premium',
    },
    ca: {
      title: 'Treballes sovint amb documents PDF?',
      sub: 'Coneix BreadPDF Premium: sense anuncis, processament per lots i més velocitat.',
      cta: 'Veure BreadPDF Premium',
    },
    en: {
      title: 'Work frequently with PDF documents?',
      sub: 'Discover BreadPDF Premium: ad-free, batch multi-processing and higher speed.',
      cta: 'Explore BreadPDF Premium',
    },
  }[lang] || {
    title: '¿Trabajas habitualmente con documentos PDF?',
    sub: 'Conoce BreadPDF Premium: sin anuncios, procesamiento por lotes y más velocidad.',
    cta: 'Ver BreadPDF Premium',
  };

  return (
    <div
      className={cn(
        'rounded-2xl border border-brand-pdf/20 bg-gradient-to-r from-brand-pdf/[0.04] to-brand-pdf/[0.08] p-5 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs',
        className
      )}
      {...props}
    >
      <div className="flex items-start sm:items-center gap-3.5 text-left">
        <div className="h-10 w-10 rounded-xl bg-brand-pdf/10 text-brand-pdf flex items-center justify-center shrink-0 ring-4 ring-brand-pdf/5">
          <PremiumCrownIcon className="h-5 w-5" />
        </div>
        <div>
          <h4 className="text-sm font-bold text-foreground">{copy.title}</h4>
          <p className="text-xs text-muted-foreground mt-0.5">{copy.sub}</p>
        </div>
      </div>

      <Button
        asChild
        size="sm"
        className="bg-brand-pdf text-white hover:bg-brand-pdf-dark font-semibold text-xs shrink-0 shadow-xs"
      >
        <a href={`/${lang}/premium`}>
          <span>{copy.cta}</span>
          <ArrowRight className="h-3.5 w-3.5 ml-1.5" />
        </a>
      </Button>
    </div>
  );
}
