import { useEffect, useState, useCallback, useRef } from 'react';
import { X, ArrowRight, MousePointerClick } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface TourStep {
  selector: string;
  /** Optional separate selector used only for advancing the step. */
  advanceSelector?: string;
  title: string;
  body: string;
  /** Where to place the callout relative to the target. Defaults to auto. */
  placement?: 'top' | 'bottom' | 'left' | 'right';
  /** How the user should progress this step. Defaults to click. */
  interaction?: 'click' | 'input' | 'appear';
}

interface GuidedTourProps {
  steps: TourStep[];
  active: boolean;
  onFinish: () => void;
}

interface Rect { top: number; left: number; width: number; height: number; }
type Placement = NonNullable<TourStep['placement']>;

export function GuidedTour({ steps, active, onFinish }: GuidedTourProps) {
  const [index, setIndex] = useState(0);
  const [rect, setRect] = useState<Rect | null>(null);
  const lastScrolledStepRef = useRef<string | null>(null);
  const rectRef = useRef<Rect | null>(null);
  const clearRectTimeoutRef = useRef<number | null>(null);
  const advanceTimeoutRef = useRef<number | null>(null);

  const step = steps[index];

  const goToNextStep = useCallback(() => {
    if (index >= steps.length - 1) {
      onFinish();
    } else {
      setIndex((i) => i + 1);
    }
  }, [index, onFinish, steps.length]);

  // Reset to first step whenever the tour (re)starts.
  useEffect(() => {
    if (active) {
      setIndex(0);
      setRect(null);
      rectRef.current = null;
      lastScrolledStepRef.current = null;
    }
  }, [active]);

  // Track the target element's position (it may mount later when a modal opens).
  useEffect(() => {
    if (!active || !step) return;

    let retryTimeout = 0;

    const isSameRect = (next: Rect | null, current: Rect | null) => {
      if (!next || !current) return next === current;
      return (
        Math.abs(next.top - current.top) < 1 &&
        Math.abs(next.left - current.left) < 1 &&
        Math.abs(next.width - current.width) < 1 &&
        Math.abs(next.height - current.height) < 1
      );
    };

    const measure = () => {
      const el = document.querySelector(step.selector) as HTMLElement | null;
      if (el) {
        if (clearRectTimeoutRef.current) {
          clearTimeout(clearRectTimeoutRef.current);
          clearRectTimeoutRef.current = null;
        }
        if (lastScrolledStepRef.current !== step.selector) {
          el.scrollIntoView({ block: 'center', behavior: 'smooth' });
          lastScrolledStepRef.current = step.selector;
        }
        const r = el.getBoundingClientRect();
        const nextRect = { top: r.top, left: r.left, width: r.width, height: r.height };
        rectRef.current = nextRect;
        setRect((current) => (isSameRect(nextRect, current) ? current : nextRect));
      } else {
        if (!clearRectTimeoutRef.current && rectRef.current) {
          clearRectTimeoutRef.current = window.setTimeout(() => {
            rectRef.current = null;
            setRect(null);
            clearRectTimeoutRef.current = null;
          }, 500) as unknown as number;
        }
        retryTimeout = window.setTimeout(measure, 120) as unknown as number;
      }
    };

    measure();
    const el = document.querySelector(step.selector) as HTMLElement | null;
    const observer = el ? new ResizeObserver(measure) : null;
    if (el && observer) observer.observe(el);

    window.addEventListener('resize', measure);
    window.addEventListener('scroll', measure, true);

    return () => {
      clearTimeout(retryTimeout);
      if (clearRectTimeoutRef.current) {
        clearTimeout(clearRectTimeoutRef.current);
        clearRectTimeoutRef.current = null;
      }
      observer?.disconnect();
      window.removeEventListener('resize', measure);
      window.removeEventListener('scroll', measure, true);
    };
  }, [active, step]);

  useEffect(() => {
    if (!active || !step) return;

    let timeout = 0;
    let fallbackInterval = 0;
    let cleanupListener: (() => void) | null = null;

    const attachListener = () => {
      const interactionSelector = step.advanceSelector ?? step.selector;
      const el = document.querySelector(interactionSelector) as HTMLElement | null;
      if (!el) {
        timeout = window.setTimeout(attachListener, 200) as unknown as number;
        return;
      }

      let advanced = false;
      const nextStep = steps[index + 1];
      const baselineInteractionPresent = !!document.querySelector(interactionSelector);
      const baselineNextPresent = !!nextStep?.selector && !!document.querySelector(nextStep.selector);

      const handleAdvance = () => {
        if (advanced) return;
        advanced = true;
        if (fallbackInterval) {
          clearInterval(fallbackInterval);
          fallbackInterval = 0;
        }
        advanceTimeoutRef.current = window.setTimeout(
          goToNextStep,
          step.interaction === 'input' ? 150 : 220,
        ) as unknown as number;
      };

      if (step.interaction !== 'appear') {
        // Safety net: only auto-advance when the NEXT step's target genuinely
        // appears (and was not already present). This avoids premature jumps
        // caused by the current element briefly re-rendering. Require two
        // consecutive positive readings to debounce flicker.
        let nextSeenStreak = 0;
        if (nextStep?.selector && !baselineNextPresent) {
          fallbackInterval = window.setInterval(() => {
            if (advanced) return;
            const nextNowPresent = !!document.querySelector(nextStep.selector);
            nextSeenStreak = nextNowPresent ? nextSeenStreak + 1 : 0;
            if (nextSeenStreak >= 2) {
              handleAdvance();
            }
          }, 180) as unknown as number;
        }
      }

      if (el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement) {
        el.focus();
        el.select?.();
      }

      if (step.interaction === 'appear') {
        // Terminal "review this" step — give the user time to read, then finish.
        timeout = window.setTimeout(handleAdvance, 2200) as unknown as number;
        cleanupListener = null;
        return;
      }


      if (step.interaction === 'input') {
        const handleInputAdvance = (event: Event) => {
          const target = event.target as HTMLElement | null;
          if (target?.closest(interactionSelector)) {
            handleAdvance();
          }
        };

        document.addEventListener('input', handleInputAdvance, true);
        document.addEventListener('change', handleInputAdvance, true);
        cleanupListener = () => {
          document.removeEventListener('input', handleInputAdvance, true);
          document.removeEventListener('change', handleInputAdvance, true);
        };
      } else {
        const handleClickAdvance = (event: MouseEvent) => {
          const target = event.target as HTMLElement | null;
          if (target?.closest(interactionSelector)) {
            handleAdvance();
          }
        };

        document.addEventListener('click', handleClickAdvance, true);
        cleanupListener = () => {
          document.removeEventListener('click', handleClickAdvance, true);
        };
      }
    };

    attachListener();

    return () => {
      clearTimeout(timeout);
      if (fallbackInterval) {
        clearInterval(fallbackInterval);
      }
      if (advanceTimeoutRef.current) {
        clearTimeout(advanceTimeoutRef.current);
        advanceTimeoutRef.current = null;
      }
      cleanupListener?.();
    };
  }, [active, goToNextStep, index, step, steps]);


  if (!active || !step) return null;

  const pad = 10;
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
  let placement: Placement | undefined = step.placement;
  if (!placement && spotlight) {
    placement = spotlight.top + spotlight.height + 200 < vh ? 'bottom' : 'top';
  }

  const calloutWidth = Math.min(340, vw - 24);
  const calloutHeight = 160;
  const gap = 18;
  let calloutStyle: React.CSSProperties = {
    width: calloutWidth,
    left: vw / 2 - calloutWidth / 2,
    top: vh / 2 - 80,
  };
  if (spotlight) {
    const cx = spotlight.left + spotlight.width / 2;
    let left = cx - calloutWidth / 2;
    left = Math.max(12, Math.min(left, vw - calloutWidth - 12));
    const topSpot = Math.max(12, spotlight.top - gap - calloutHeight);
    const bottomSpot = Math.min(vh - calloutHeight - 12, spotlight.top + spotlight.height + gap);
    const rightSpot = Math.min(spotlight.left + spotlight.width + gap, vw - calloutWidth - 12);
    const leftSpot = Math.max(12, spotlight.left - calloutWidth - gap);
    const alignedTop = Math.max(12, Math.min(spotlight.top, vh - calloutHeight - 12));

    if (placement === 'bottom') {
      calloutStyle = { width: calloutWidth, left, top: bottomSpot };
    } else if (placement === 'top') {
      calloutStyle = { width: calloutWidth, left, top: topSpot };
    } else if (placement === 'right') {
      calloutStyle = { width: calloutWidth, left: rightSpot, top: alignedTop };
    } else if (placement === 'left') {
      calloutStyle = { width: calloutWidth, left: leftSpot, top: alignedTop };
    }
  }

  const getArrowStyle = (currentPlacement: Placement | undefined): React.CSSProperties | null => {
    if (!spotlight) return null;
    const centerX = spotlight.left + spotlight.width / 2 - 16;
    const centerY = spotlight.top + spotlight.height / 2 - 16;

    if (currentPlacement === 'top') {
      return { top: spotlight.top + spotlight.height + 4, left: centerX };
    }
    if (currentPlacement === 'bottom') {
      return { top: spotlight.top - 38, left: centerX };
    }
    if (currentPlacement === 'left') {
      return { top: centerY, left: spotlight.left + spotlight.width + 4 };
    }
    if (currentPlacement === 'right') {
      return { top: centerY, left: spotlight.left - 38 };
    }
    return { top: spotlight.top - 38, left: centerX };
  };

  const getArrowClassName = (currentPlacement: Placement | undefined) => {
    if (currentPlacement === 'top') return '-rotate-90';
    if (currentPlacement === 'bottom') return 'rotate-90';
    if (currentPlacement === 'left') return 'rotate-180';
    return 'rotate-0';
  };

  const arrowStyle = getArrowStyle(placement);

  return (
    <div className="fixed inset-0 z-[300] pointer-events-none">
      {/* Dimmed backdrop with a cut-out spotlight */}
      <div
        className="absolute inset-0"
        style={{
          boxShadow: spotlight
            ? `0 0 0 9999px hsl(var(--background) / 0.82)`
            : `inset 0 0 0 9999px hsl(var(--background) / 0.82)`,
          ...(spotlight
            ? {
                top: spotlight.top,
                left: spotlight.left,
                width: spotlight.width,
                height: spotlight.height,
                borderRadius: 14,
              }
            : { top: 0, left: 0, right: 0, bottom: 0 }),
          position: 'absolute',
        }}
      />

      {/* Highlighted target area */}
      {spotlight ? (
        <div
          className="absolute rounded-xl border-2 border-primary pointer-events-none"
          style={{ top: spotlight.top, left: spotlight.left, width: spotlight.width, height: spotlight.height }}
          aria-hidden="true"
        />
      ) : null}

      {/* Bouncing arrow pointing at the target */}
      {spotlight && arrowStyle && (
        <div
          className="absolute text-primary drop-shadow-lg pointer-events-none"
          style={arrowStyle}
        >
          <ArrowRight
            className={cn('h-8 w-8 animate-bounce', getArrowClassName(placement))}
          />
        </div>
      )}

      {/* Callout card — informational only, no Next button */}
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
        <div className="mt-3 flex items-center gap-2 text-[11px] font-medium text-primary">
          <MousePointerClick className="h-3.5 w-3.5" />
          <span>
            {step.interaction === 'input'
              ? 'Type in the highlighted box to continue'
              : step.interaction === 'appear'
                ? 'Review the highlighted feedback'
                : 'Click the highlighted area to continue'}
          </span>
        </div>
      </div>
    </div>
  );
}

