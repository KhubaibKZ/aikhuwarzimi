import { useEffect, useMemo, useRef, useState } from 'react';
import { themeSvgMarkup } from '@/lib/svgTheme';

/**
 * Renders an uploaded SVG with full interactivity support.
 *
 * - If the SVG contains <script> tags or on* event handlers, it is rendered
 *   inside a sandboxed iframe so the embedded scripts actually execute.
 *   (React's dangerouslySetInnerHTML does NOT run <script>, and inline
 *   <script> nodes inserted via innerHTML are inert per the HTML spec.)
 * - Otherwise it is rendered inline (themed to inherit currentColor).
 *
 * Sizing is standardized: the SVG's intrinsic viewBox aspect ratio is
 * honored, width fills the container up to `maxWidth`, height adjusts
 * automatically — so uploads never look oversized or squished.
 */

interface Props {
  markup: string;
  /** Max rendered width in px. Default 640. */
  maxWidth?: number;
  /** Max rendered height in px. Default 480. */
  maxHeight?: number;
  className?: string;
}

function parseViewBox(markup: string): { w: number; h: number } | null {
  const vb = markup.match(/viewBox=["']\s*([\d.\-]+)\s+([\d.\-]+)\s+([\d.\-]+)\s+([\d.\-]+)\s*["']/i);
  if (vb) {
    const w = parseFloat(vb[3]);
    const h = parseFloat(vb[4]);
    if (w > 0 && h > 0) return { w, h };
  }
  const wm = markup.match(/<svg\b[^>]*\bwidth=["']([\d.]+)/i);
  const hm = markup.match(/<svg\b[^>]*\bheight=["']([\d.]+)/i);
  if (wm && hm) {
    const w = parseFloat(wm[1]);
    const h = parseFloat(hm[1]);
    if (w > 0 && h > 0) return { w, h };
  }
  return null;
}

function isInteractive(markup: string): boolean {
  return /<script\b/i.test(markup) || /\son[a-z]+\s*=/i.test(markup);
}

function normalizeRootSvg(markup: string): string {
  // Ensure root <svg> stretches to fill the iframe / container and keeps aspect.
  return markup.replace(/<svg\b([^>]*)>/i, (_m, attrs) => {
    let a = attrs as string;
    a = a.replace(/\swidth=["'][^"']*["']/i, '');
    a = a.replace(/\sheight=["'][^"']*["']/i, '');
    if (!/preserveAspectRatio=/i.test(a)) a += ' preserveAspectRatio="xMidYMid meet"';
    return `<svg${a} width="100%" height="100%">`;
  });
}

function forcePitchBlackSvgBackground(markup: string): string {
  const dims = parseViewBox(markup);
  const isBackgroundSizedRect = (attrs: string) => {
    const attr = (name: string) => attrs.match(new RegExp(`\\b${name}=["']([^"']+)["']`, 'i'))?.[1] ?? '';
    const width = attr('width');
    const height = attr('height');
    if (width.trim() === '100%' && height.trim() === '100%') return true;
    if (!dims) return false;
    const w = parseFloat(width);
    const h = parseFloat(height);
    return Number.isFinite(w) && Number.isFinite(h) && w >= dims.w * 0.8 && h >= dims.h * 0.8;
  };

  const withBlackBackgroundRects = markup.replace(/<rect\b([^>]*)>/gi, (match, attrs) => {
    if (!isBackgroundSizedRect(attrs)) return match;
    let next = attrs as string;
    if (/\bfill=["'][^"']*["']/i.test(next)) {
      next = next.replace(/\bfill=["'][^"']*["']/i, 'fill="#000000"');
    } else {
      next += ' fill="#000000"';
    }
    if (/\bstyle=["'][^"']*["']/i.test(next)) {
      next = next.replace(/\bstyle=["']([^"']*)["']/i, (_m, style) => {
        const cleaned = String(style).replace(/(?:^|;)\s*fill\s*:[^;]+;?/i, ';');
        return `style="${cleaned};fill:#000000"`;
      });
    }
    return `<rect${next}>`;
  });

  return withBlackBackgroundRects.replace(/<svg\b([^>]*)>/i, (_m, attrs) => {
    let next = attrs as string;
    if (/\bstyle=["'][^"']*["']/i.test(next)) {
      next = next.replace(/\bstyle=["']([^"']*)["']/i, (_styleMatch, style) => `style="${style};background:#000000"`);
    } else {
      next += ' style="background:#000000"';
    }
    return `<svg${next}>`;
  });
}

export function InteractiveSvg({ markup, maxWidth = 560, maxHeight = 420, className }: Props) {
  const interactive = useMemo(() => isInteractive(markup), [markup]);
  const dims = useMemo(() => parseViewBox(markup), [markup]);
  const blackBackdropMarkup = useMemo(() => forcePitchBlackSvgBackground(markup), [markup]);
  const themedBlackBackdropMarkup = useMemo(() => forcePitchBlackSvgBackground(themeSvgMarkup(markup)), [markup]);

  // Compute display box honoring aspect ratio.
  const aspect = dims ? dims.w / dims.h : 4 / 3;
  let dispW = maxWidth;
  let dispH = dispW / aspect;
  if (dispH > maxHeight) {
    dispH = maxHeight;
    dispW = dispH * aspect;
  }

  if (interactive) {
    return (
      <InteractiveSvgFrame
        markup={blackBackdropMarkup}
        width={dispW}
        height={dispH}
        className={`w-full ${className ?? ''}`}
      />
    );
  }

  // Non-interactive: theme & inline on pitch-black backdrop.
  return (
    <div
      className={`flex justify-center text-foreground w-full ${className ?? ''}`}
    >
      <div
        style={{ width: dispW, height: dispH, maxWidth: '100%' }}
        className="[&>svg]:w-full [&>svg]:h-full"
        dangerouslySetInnerHTML={{ __html: normalizeRootSvg(themedBlackBackdropMarkup) }}
      />
    </div>
  );
}

function InteractiveSvgFrame({
  markup,
  width,
  height,
  className,
}: {
  markup: string;
  width: number;
  height: number;
  className?: string;
}) {
  const ref = useRef<HTMLIFrameElement>(null);
  const [ready, setReady] = useState(false);

  const srcDoc = useMemo(() => {
    const normalized = normalizeRootSvg(markup);
    return `<!doctype html>
<html><head><meta charset="utf-8"/>
<style>
  html,body{margin:0;padding:0;width:100%;height:100%;background:#000000;color:inherit;overflow:hidden;}
  body{display:flex;align-items:center;justify-content:center;font-family:inherit;}
  svg{display:block;max-width:100%;max-height:100%;background:#000000;}
</style></head>
<body>${normalized}</body></html>`;
  }, [markup]);

  useEffect(() => {
    setReady(false);
  }, [srcDoc]);

  return (
    <div className={`flex justify-center ${className ?? ''}`} style={{ width: '100%' }}>
      <iframe
        ref={ref}
        title="Interactive diagram"
        srcDoc={srcDoc}
        onLoad={() => setReady(true)}
        sandbox="allow-scripts allow-same-origin"
        style={{
          width: '100%',
          maxWidth: width,
          aspectRatio: `${width} / ${height}`,
          border: 0,
          background: '#000000',
          display: 'block',
          opacity: ready ? 1 : 0,
          transition: 'opacity 120ms',
        }}
      />
    </div>
  );
}

export default InteractiveSvg;
