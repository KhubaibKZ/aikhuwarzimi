import { useEffect, useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { X, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface TourStep {
  selector: string;
  title: string;
  body: string;
  /** Where to place the callout relative to the target. Defaults to auto. */
  placement?: 'top' | 'bottom' | 'left' | 'right';
}

interface GuidedTourProps {
  steps: TourStep[];
  active: boolean;
  onFinish: () => void;
}

interface Rect { top: number; left: number; width: number; height: number; }

export function GuidedTour({ steps, active, onFinish }: GuidedTourProps) {
  const [index, setIndex] = useState(0);
  const [rect, setRect] = useState<Rect | null>(null);

  const step = steps[index];

  // Reset to first step whenever the tour (re)starts.
  useEffect(() => {
    if (active) setIndex(0);
  }, [active]);

  // Track the target element's position (it may mount later when a modal opens).
  useEffect(() => {
    if (!active || !step) return;
    let raf = 0;
    const measure = () => {
      const el = document.querySelector(step.selector) as HTMLElement | null;
      if (el) {
        const r = el.getBoundingClientRect();
        setRect({ top: r.top, left: r.left, width: r.width, height: r.height });
        el.scrollIntoView({ block: 'center', behavior: 'smooth' });
      } else {
        setRect(null);
      }
      raf = window.setTimeout(measure, 350) as unknown as number;
    };
    measure();
    window.addEventListener('resize', measure);
    window.addEventListener('scroll', measure, true);
    return () => {
      clearTimeout(raf);
      window.removeEventListener('resize', measure);
      window.removeEventListener('scroll', measure, true);
    };
  }, [active, step]);

  const next = useCallback(() => {
    if (index >= steps.length - 1) {
      onFinish();
    } else {
      setRect(null);
      setIndex((i) => i + 1);
    }
  }, [index, steps.length, onFinish]);

  if (!active || !step) return null;

  const pad = 8;
  const spotlight = rect
    ? {
        top: rect.top - pad,
        left: rect.left - pad,
        width: rect.width + pad * 2,
        height: rect.height + pad * 2,
      }
    : null;

  // Decide callout placement.
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  let placement = step.placement;
  if (!placement && spotlight) {
    placement = spotlight.top + spotlight.height + 180 < vh ? 'bottom' : 'top';
  }

  const calloutWidth = Math.min(320, vw - 24);
  let calloutStyle: React.CSSProperties = {
    width: calloutWidth,
    left: vw / 2 - calloutWidth / 2,
    top: vh / 2 - 80,
  };
  if (spotlight) {
    const cx = spotlight.left + spotlight.width / 2;
    let left = cx - calloutWidth / 2;
    left = Math.max(12, Math.min(left, vw - calloutWidth - 12));
    if (placement === 'bottom') {
      calloutStyle = { width: calloutWidth, left, top: spotlight.top + spotlight.height + 16 };
    } else if (placement === 'top') {
      calloutStyle = { width: calloutWidth, left, top: Math.max(12, spotlight.top - 16 - 150) };
    } else if (placement === 'right') {
      calloutStyle = { width: calloutWidth, left: Math.min(spotlight.left + spotlight.width + 16, vw - calloutWidth - 12), top: spotlight.top };
    } else if (placement === 'left') {
      calloutStyle = { width: calloutWidth, left: Math.max(12, spotlight.left - calloutWidth - 16), top: spotlight.top };
    }
  }

  return (
    <div className="fixed inset-0 z-[300] pointer-events-none">
      {/* Dimmed backdrop with a cut-out spotlight */}
      <div
        className="absolute inset-0 transition-all duration-300"
        style={{
          boxShadow: spotlight
            ? `0 0 0 9999px hsl(var(--background) / 0.78)`
            : `inset 0 0 0 9999px hsl(var(--background) / 0.78)`,
          ...(spotlight
            ? {
                top: spotlight.top,
                left: spotlight.left,
                width: spotlight.width,
                height: spotlight.height,
                borderRadius: 12,
              }
            : { top: 0, left: 0, right: 0, bottom: 0 }),
          position: 'absolute',
        }}
      />

      {/* Animated ring around the target */}
      {spotlight && (
        <div
          className="absolute rounded-xl border-2 border-primary animate-pulse"
          style={{ top: spotlight.top, left: spotlight.left, width: spotlight.width, height: spotlight.height }}
        />
      )}

      {/* Bouncing arrow pointing at the target */}
      {spotlight && (
        <div
          className="absolute text-primary drop-shadow-lg"
          style={
            placement === 'top'
              ? { top: spotlight.top + spotlight.height + 2, left: spotlight.left + spotlight.width / 2 - 14 }
              : { top: spotlight.top - 34, left: spotlight.left + spotlight.width / 2 - 14 }
          }
        >
          <ArrowRight
            className={cn('h-7 w-7 animate-bounce', placement === 'top' ? '-rotate-90' : 'rotate-90')}
          />
        </div>
      )}

      {/* Callout card */}
      <div
        className="absolute pointer-events-auto rounded-xl border border-primary/40 bg-card shadow-2xl p-4 animate-scale-in"
        style={calloutStyle}
      >
        <button
          onClick={onFinish}
          className="absolute top-2 right-2 text-muted-foreground hover:text-foreground"
          aria-label="Skip tour"
        >
          <X className="h-4 w-4" />
        </button>
        <p className="text-[11px] font-semibold uppercase tracking-wider text-primary mb-1">
          Step {index + 1} of {steps.length}
        </p>
        <h4 className="text-sm font-bold text-foreground mb-1">{step.title}</h4>
        <p className="text-xs text-muted-foreground leading-relaxed">{step.body}</p>
        <div className="flex items-center justify-between mt-3">
          <button onClick={onFinish} className="text-xs text-muted-foreground hover:text-foreground">
            Skip
          </button>
          <Button size="sm" className="gap-1" onClick={next}>
            {index >= steps.length - 1 ? 'Finish' : 'Next'}
            {index < steps.length - 1 && <ArrowRight className="h-3.5 w-3.5" />}
          </Button>
        </div>
      </div>
    </div>
  );
}
