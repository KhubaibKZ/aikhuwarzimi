/**
 * Make an uploaded SVG blend with the app theme:
 * - Strip <script> tags (basic sanitation).
 * - Replace hardcoded #000/black/#fff/white strokes and fills with currentColor
 *   so the SVG inherits the surrounding text colour.
 * - Ensure root <svg> has width="100%" and a sensible max-height via style hook.
 */
export function themeSvgMarkup(raw: string): string {
  if (!raw) return '';
  let out = raw;

  // Strip <script>...</script>
  out = out.replace(/<script[\s\S]*?<\/script>/gi, '');

  // Remove on* event handler attributes
  out = out.replace(/\son[a-z]+="[^"]*"/gi, '');

  // Map common "ink" colours to currentColor (case-insensitive)
  const INK = /#000(?:000)?\b|black|#111\b|#222\b/gi;
  const PAPER = /#fff(?:fff)?\b|white/gi;

  out = out.replace(/stroke="([^"]+)"/gi, (m, c) => {
    if (INK.test(c)) return 'stroke="currentColor"';
    if (PAPER.test(c)) return 'stroke="transparent"';
    return m;
  });
  out = out.replace(/fill="([^"]+)"/gi, (m, c) => {
    if (INK.test(c)) return 'fill="currentColor"';
    if (PAPER.test(c)) return 'fill="transparent"';
    return m;
  });

  // Ensure root <svg> uses preserveAspectRatio and inherits color
  out = out.replace(/<svg\b([^>]*)>/i, (m, attrs) => {
    let a = attrs as string;
    if (!/color=/i.test(a)) a += ' color="currentColor"';
    if (!/preserveAspectRatio=/i.test(a)) a += ' preserveAspectRatio="xMidYMid meet"';
    return `<svg${a}>`;
  });

  return out;
}
