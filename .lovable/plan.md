## Goal
For paper **4024/21 Oct/Nov 2023 only** (`pp_4024_on23_21`), replace the right-hand solution panel in the editor with a **blank Solution Canvas** the admin builds from scratch. Other papers keep the current editor exactly as it is.

## What the admin sees

When a Q from this paper is opened in `/editor`:
- Left pane: question text + diagram (unchanged).
- Right pane: empty canvas with a top toolbar:
  - `+ Part Heading`  `+ Step`  `+ Text`  `+ Solution Box ▾ (S / M / L)`  `+ Fraction`  `Σ Symbols`
- Canvas starts empty. Every inserted item becomes a **block** stacked top-to-bottom (free order, drag-to-reorder via ↑/↓ buttons, delete via 🗑).

### Block types
1. **Part Heading** — single editable line, large/bold (e.g. "(a)", "(b)(i)"). Free-placed like any other block.
2. **Step** — bordered card containing:
   - Inline editable content (mix of text + inserted solution boxes / fractions / symbols).
   - A **Check Work** icon button in the card header (no-op stub for now; same icon used in workspace).
   - Inside-step toolbar: `+ Text`  `+ Box S/M/L`  `+ Fraction`  `Σ`.
3. **Text block** — free editable text (outside a step).
4. **Solution Box** — fillable input in 3 widths (S ≈ 4ch, M ≈ 8ch, L ≈ 16ch). Authoring-time only; stores width + placeholder/expected value field.
5. **Fraction** — stacked numerator / denominator, each a small fillable box.
6. **Symbol insert** — opens a popover with the existing math keyboard set (× ÷ √ π ² ³ ° ± ≈ ≤ ≥ ≠ ∞ ½ ¼ ¾ etc.); clicking inserts the character at the caret of the currently focused text/box.

## Data model

New optional field on `PastPaperQuestion` (only populated for this paper's questions):

```ts
type CanvasBlock =
  | { id: string; kind: 'heading'; text: string }
  | { id: string; kind: 'text'; text: string }
  | { id: string; kind: 'step'; items: StepItem[] }
type StepItem =
  | { id: string; kind: 'text'; text: string }
  | { id: string; kind: 'box'; size: 'sm'|'md'|'lg'; value?: string }
  | { id: string; kind: 'fraction'; num?: string; den?: string }
solutionCanvas?: { blocks: CanvasBlock[] }
```

Persisted via the existing `question_overrides` path (`solutionCanvas` added to the keys array in `PaperEditor.save`). No DB migration — `override` column is JSONB.

## Files to add / change

- **New** `src/components/editor/SolutionCanvas.tsx` — the builder UI (toolbar, block list, per-block editors, symbol popover reusing keys from `MathKeyboard`).
- **New** `src/components/editor/canvasTypes.ts` — `CanvasBlock` / `StepItem` types + `createBlock` helpers.
- **Edit** `src/lib/pastPaperData.ts` — add optional `solutionCanvas?: SolutionCanvas` to `PastPaperQuestion`.
- **Edit** `src/pages/PaperEditor.tsx`:
  - When the selected question's paper is `pp_4024_on23_21`, render `<SolutionCanvas value={draft.solutionCanvas} onChange={…}/>` in place of the existing `<PastPaperWorkspace … editMode/>` right-side solution area (keep the left question/diagram panel + header actions).
  - Add `'solutionCanvas'` to the `keys` array in `save()` so it's diffed and persisted to `question_overrides`.
  - All other papers: zero behaviour change.

## Out of scope (explicit)
- Not rendered to students yet. Canvas is admin-authored only; student workspace for this paper is unchanged.
- Check Work button is a visual stub (no AI call wiring this round).
- No drag-and-drop; reorder via ↑/↓ buttons only.
- No image/diagram blocks inside the canvas (existing diagram upload stays as-is on the left).
