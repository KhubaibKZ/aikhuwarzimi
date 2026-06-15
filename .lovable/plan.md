## Goal

Change the fraction primitive so that "+ Fraction" inserts only a horizontal fraction bar with two empty stacks (numerator stack above, denominator stack below). Users then add boxes/text/symbols into either stack, allowing fractions like the second screenshot (a single numerator box over `box + box` in the denominator).

This also fixes the current bug where the "Box → num/den" action is unreliable — boxes will become normal items inside a stack, not special num/denW fields.

## Data model changes (`src/components/editor/canvasTypes.ts`)

Replace the current fraction shape:

```ts
{ kind: 'fraction', num?: string, den?: string, numW?, numH?, denW?, denH? }
```

with a stack-based shape:

```ts
{ kind: 'fraction', num: StepItem[], den: StepItem[] }
```

- `newItem.fraction()` returns `{ num: [], den: [] }` (empty bar by default).
- `StepItem` recursion is allowed one level (no nested fractions inside fractions for now — keep simple).

## Rendering (`src/components/editor/SolutionCanvas.tsx`)

Rewrite the `fraction` branch in `StepItemView`:

```text
[ num items rendered inline, centered ]
─────────────────────────────────────── (bar; width = max(numW, denW, 40))
[ den items rendered inline, centered ]
```

- Each stack is a flex row of `StepItemView`-style mini items (text, box, symbol-as-text). Reuse the existing item renderers by extracting them into a small `renderItems(items, onChange)` helper that both the top-level step and the fraction stacks share.
- Stacks accept the same per-item resize handles already implemented.
- Empty stack shows a single placeholder slot (a small dashed outline) so the user can click it to focus and then use the toolbar to add a box/text into that stack.

## Focus + toolbar behavior

Replace `focusedFrac = { fractionId, part }` with a more general `focusTarget`:

```ts
type FocusTarget =
  | { kind: 'step', stepId: string }
  | { kind: 'fraction', fractionId: string, part: 'num' | 'den' };
```

- Clicking any input inside a fraction stack sets `focusTarget` to that stack.
- The Add buttons in the step toolbar route inserts to the focused target:
  - `+ Text`, `+ Box`, `+ Fraction` (disallow nested fraction — gray it out when target is a fraction stack), `Σ Symbols` all insert into the focused stack instead of the step's top-level items.
- Label of Add Box button updates dynamically: `+ Box → num`, `+ Box → den`, or `+ Box` for the step.

## Migration

Existing saved canvases use string `num`/`den`. Add a small normalizer at load time inside `SolutionCanvas`:

```ts
if (typeof item.num === 'string') {
  item.num = item.num ? [{ id: rid(), kind: 'text', text: item.num }] : [];
}
// same for den
```

This keeps already-edited 4024/11 and 4024/21 ON 2023 papers working.

## Files touched

- `src/components/editor/canvasTypes.ts` — type + factory update, normalizer helper.
- `src/components/editor/SolutionCanvas.tsx` — fraction renderer, focus target, toolbar routing, item-render helper extraction.

No backend or other workspace files change.
