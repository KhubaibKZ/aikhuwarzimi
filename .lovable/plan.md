## Paper Editor — build plan

A new top-level **Editor** tab where you pick any paper and any question, then edit it on a canvas-style surface that mirrors the dashboard's question + solution layout. Saved edits persist in Lovable Cloud and override the hardcoded paper for every viewer.

### What you'll get

**New route:** `/editor` (link in Header, admin-only via `has_role`).

**Layout** (mirrors dashboard workspace):
```text
┌───────────────────────┬─────────────────────────────────────┐
│ Paper dropdown        │ ┌──── Question canvas ───────────┐  │
│ Question list         │ │ [editable title]               │  │
│  • Q1 ✎               │ │ [editable question text]       │  │
│  • Q2 ✎ (edited)      │ │ [diagram preview / replace img]│  │
│  • Q3                 │ ├──── Solution steps ────────────┤  │
│  ...                  │ │ Step 1: [+ box] [- box] [text] │  │
│                       │ │ Step 2: ...    [↑] [↓] [🗑]    │  │
│ [+ Add step]          │ │ [+ Add step]                   │  │
│ [Discard] [Save]      │ │ Answer key per box             │  │
│                       │ │ Hints [+ add] · Check-work ☑   │  │
│                       │ └────────────────────────────────┘  │
└───────────────────────┴─────────────────────────────────────┘
```

### Editable fields (per question)
- `title`, `question` text, `marks`
- `parts[]` — label, key, marks (add / remove / reorder)
- `equationStagesMap` per part — add / remove / reorder steps, each step's elements (text vs. box, box width, box `key`)
- `answer` map — correct value per box (supports `|` alternatives, tolerances)
- `hints[]` — add / edit / remove
- per-part check-work toggle
- diagram **image override** — upload an image that replaces the hand-coded SVG diagram in both editor and dashboard

### What's intentionally out of scope (with reason)
- **Free-form vector editing of existing SVG diagrams.** Diagrams like `ScatterDiagram2023ON`, `VennDiagram3Set2023ON`, etc. are hand-coded React components with interactive logic (drag points, clickable axes). A generic canvas cannot edit those. The realistic lever is an **image override**: upload a static replacement that renders instead of the SVG component. Interactivity is lost on overridden diagrams — that's the trade-off.
- Editing custom workspace components (LCM ladder, prime-factor ladder, Venn drag-and-drop). Same reason — they're bespoke React.

### How overrides plug into the dashboard
1. On app load, `pastPaperData.ts` lookups are wrapped by a `useQuestionOverrides()` hook that merges DB overrides on top of the hardcoded question object.
2. `PastPaperWorkspace` reads from the merged object — no changes needed in question-rendering code.
3. Diagram renderer checks for an `imageOverrideUrl`; if present, renders `<img>` instead of the SVG component.

### Backend (Lovable Cloud)

**Table `question_overrides`** (admin-writable, world-readable):
- `paper_id text`, `question_id text` — composite PK
- `override jsonb` — partial `PastPaperQuestion` merged onto the original
- `diagram_image_url text` (optional)
- `updated_by uuid`, `updated_at timestamptz`

RLS: anyone can `SELECT`; only `has_role(auth.uid(),'admin')` can `INSERT/UPDATE/DELETE`.

**Storage bucket `question-diagrams`** (public) for uploaded diagram images.

### Files

New:
- `src/pages/PaperEditor.tsx` — page shell + paper/question selectors
- `src/components/editor/QuestionEditorCanvas.tsx` — the editable canvas
- `src/components/editor/StepEditor.tsx` — step + elements editor
- `src/components/editor/PartsEditor.tsx`, `HintsEditor.tsx`, `DiagramUploader.tsx`
- `src/hooks/useQuestionOverrides.ts` — fetch + cache, expose `getMerged(question)`
- `src/lib/mergeQuestionOverride.ts` — deep-merge utility
- migration for `question_overrides` + storage bucket

Touched:
- `src/App.tsx` — add `/editor` route
- `src/components/Header.tsx` — Editor nav link (admin-only)
- `src/lib/pastPaperData.ts` — export `getPastPaperQuestionMerged` that consumes overrides
- `src/components/PastPaperWorkspace.tsx` — read merged question
- diagram renderer — honour `imageOverrideUrl`

### Phasing
1. **Phase 1 (this PR):** route, admin gating, paper/question pickers, edit title/question/marks/parts/steps/answers/hints/check-work toggle, save to DB, dashboard reads overrides. Live for every question type that uses `equationStagesMap`.
2. **Phase 2:** diagram image upload + override rendering.
3. **Phase 3:** revert-to-original button, edit history, bulk export of overrides as TS code (to fold back into source).

Confirm and I'll start with Phase 1 end-to-end (DB migration → hook → page → dashboard wiring), then immediately do Phase 2 in the same loop.