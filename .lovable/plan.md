
# Simplified Paper Editor

Strip `/editor` down to two papers and make editing happen *inside* the normal question workspace — no separate forms.

## Scope

**Papers shown:** only `4024/21 Oct-Nov 2023` and `4024/22 Oct-Nov 2023` (from `pastPaper4024_21_2023ON.ts` and `pastPaper4024_22_2023ON.ts`).

**Removed from `/editor`:**
- Year / session / variant pickers
- The separate "Edit fields" slide-out sheet and tab system
- The two-pane (preview + form) layout

## New flow

1. **Landing on `/editor`** → same dashboard-style interface used in `PaperOverview` (question list / sections), but scoped to just the two 2023 ON Paper 2 variants (shown as two cards or a single toggle).
2. **Click a question** → opens the normal `PastPaperWorkspace` modal exactly like the student sees it.
3. **Edit-in-place mode** is always on inside `/editor`:
   - Every text node (question stem, part labels, marks, hint text, final-answer placeholder) becomes `contentEditable` on click, with a subtle dashed outline on hover.
   - Solution-space boxes (input fields, step boxes, fraction num/den slots) get a small toolbar on focus: **＋ add box**, **✕ remove**, **↑/↓ reorder**, and the math keyboard from `SmartKeyboard` for typing the *expected/seed* value.
   - Diagrams/images get a hover overlay with **Replace image** / **Remove**.
4. **Mark scheme button** in the workspace header → opens a side drawer showing the existing `answer` map + `hints` from the question definition (read-only, this is what's already used internally as the marking scheme). Editable from the same drawer.
5. **Save** (top-right) writes the diff to `question_overrides` via existing `useOverridesSync` / `questionOverrides.ts` — already wired, no schema change. **Revert** removes the override.

## Technical notes

- `src/pages/PaperEditor.tsx`: replace current implementation. Reuse `PaperOverview` filtered to `paperId in ['4024_21_2023ON','4024_22_2023ON']`, render `PastPaperWorkspace` in an `editMode` prop.
- `src/components/PastPaperWorkspace.tsx`: add optional `editMode?: boolean` prop. When true:
  - Wrap each rendered text span in an `<EditableText>` helper (new small component) bound to a local draft state.
  - Wrap input/step containers in an `<EditableBoxGroup>` exposing add/remove/reorder.
  - Render a "Mark scheme" button in the existing header bar next to timer.
- New `src/components/editor/EditableText.tsx`, `EditableBoxGroup.tsx`, `MarkSchemeDrawer.tsx` (~60 lines each).
- Persistence flow unchanged: draft state → on Save → merge into override row → `upsert` to `question_overrides`.
- Delete the old tab/sheet UI code paths from `PaperEditor.tsx`.

## Out of scope
- No new tables, no auth changes.
- Other papers stay untouched (the student-facing pages still render every paper).
- No new diagram editor — image replace only.
