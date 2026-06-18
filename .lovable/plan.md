# Editor: Multiple Question Blocks + Solution Keyboard

Two focused additions to the in-workspace editor (left "Question" pane and right "Solution" canvas).

## 1. Multiple Question Blocks (left pane)

Today the question area shows **one** editable question text + one optional uploaded SVG. We'll let admins append additional question blocks — each block is an independent unit with its own text, math/symbols toolbar, and SVG upload.

**Data model** (stored on the question override, same path as `diagramSvgMarkup`):
```
extraQuestionBlocks: Array<{
  id: string;
  text: string;            // contentEditable, supports [[num/den]] + symbols
  svgMarkup?: string;      // optional uploaded SVG
}>
```
Backward compatible — absent on existing questions, treated as `[]`.

**UI in `PastPaperWorkspace.tsx` (edit mode only):**
- The existing default question text + SVG upload stays exactly as-is (block #1, always present).
- Below it, render each `extraQuestionBlocks[i]` as a card containing:
  - `InlineMathToolbar` (same symbols + `[[num/den]]` + Upload/Remove SVG buttons it already exposes)
  - `InlineEditableText multiline` bound to that block's `text`
  - The block's `svgMarkup` rendered with `themeSvgMarkup(...)` (same path used for `diagramSvgMarkup`)
  - A small header row with ↑ / ↓ / 🗑 controls
- An "**+ Add question block**" button at the bottom of the question section.

**Preview / student mode** (non-edit): render each extra block as a read-only `<QuestionText>` followed by its SVG, stacked under the main question — so students see the additional prompts and diagrams in order.

## 2. Keyboard option in the Solution canvas toolbar

`SolutionCanvas.tsx` already imports `HorizontalKeyboard` and uses it inside individual `StepCard`s. We'll surface it at the **canvas level** so it's available regardless of which field is focused.

**Changes in `SolutionCanvas.tsx`:**
- Add a new top-toolbar button next to *Part Heading / Step / Text / Symbols*:
  - `<Button>` with the `Keyboard` icon (already imported) labelled "Keyboard", toggles a `kbOpen` state.
- When open, render `<HorizontalKeyboard onKey={insertAtCursor} onClose={() => setKbOpen(false)} />` docked above the bottom Hint/Submit bar.
- `insertAtCursor` already exists and routes keys to the last-focused input/textarea (covers heading, text, step boxes, fraction numerators/denominators).
- Also expose this same toolbar button in `previewMode` so students get the keyboard while filling answers — that's the user-facing half of the request.

## Files touched

- `src/components/editor/canvasTypes.ts` — no change (question blocks live on the question override, not the solution canvas).
- `src/lib/questionOverrides.ts` — extend the override shape to allow `extraQuestionBlocks`.
- `src/components/PastPaperWorkspace.tsx` — render extra blocks (edit + preview), wire add/remove/reorder via `onEditField('extraQuestionBlocks', …)`.
- `src/pages/PaperEditor.tsx` — pass through the new field on save (it already uses a generic `onEditField` mechanism, so likely only a type tweak).
- `src/components/editor/SolutionCanvas.tsx` — add canvas-level Keyboard toggle button + docked `HorizontalKeyboard` panel; available in both edit and preview modes.

## Out of scope

- No changes to validation, scoring, or the StepCard-level mini-keyboard (kept as-is).
- No schema/DB migration — overrides are JSONB and already accept arbitrary fields.
