

## Audit Summary: Past Paper Question Features

After thoroughly reviewing the codebase, here is what **already works** and what **needs fixing**:

### Already Working (All Questions)
1. **Scaffolding steps with StepWorkspace** — All question types (`short`, `calculation`, `multi-part`, `angle-steps`, `formula-fraction`, `prime-factor`, `lcm-ladder`) route through `StepWorkspace` or equivalent specialized components with numbered step fields.
2. **Check Work per step** — Every step has a `BookOpen` button that calls `handleCheckWorkForPart()`, sending the student's answer to the AI tutor for targeted feedback.
3. **General Hint button** — Every question has a global "Hint" button that uses the `hints[]` array from the question data.
4. **Keyboard** — All questions get a keyboard via `getKeyboardConfig()`, but O Level questions fall back to generic `arithmetic`.

### Gaps Found

**Gap 1: No custom keyboards for O Level 4024 questions (~400+ questions across 20 files)**
All O Level questions fall back to the generic `arithmetic` keyboard (`0-9, +, −, ×, ÷, =, ., (, ), ⌫, Clear`). This means geometry questions don't get `°`, algebra questions don't get `x, y`, fraction questions don't get `/`, etc.

**Gap 2: No interactive diagrams for O Level 4024 questions**
IGCSE 0580 questions have ~30+ interactive SVG diagrams (coordinate grids, Venn diagrams, cuboids, etc.) mapped in `PastPaperWorkspace.tsx`. O Level questions have zero diagram mappings, even for geometry, graph, and shape questions.

### Implementation Plan

#### Phase 1: Add keyboard configs for O Level questions by topic category
Rather than 400+ individual keyboard entries, add **topic-based keyboard presets** and a smarter fallback system in `keyboardConfigs.ts`:

- Add new generic presets: `'fraction'`, `'indices'`, `'trigonometry'`, `'standardForm'`, `'inequality'`, `'ratio'`, `'bearings'`, `'vectors'`, `'probability'`, `'speed-distance-time'`
- Update `getKeyboardConfig()` to detect question content (title/type) and auto-select the right keyboard when no exact match exists
- This covers all O Level questions without needing 400 individual entries

#### Phase 2: Add diagram mappings for O Level geometry questions
Scan O Level question data for geometry/graph questions and add diagram rendering blocks in `PastPaperWorkspace.tsx` using existing diagram components (trapezium, Venn diagram, coordinate grid, etc.) where the question text describes a geometric figure.

### Scope Note
Phase 1 (smart keyboard selection) can be done in one implementation pass. Phase 2 (diagrams) requires identifying which specific O Level questions need diagrams — this is best done paper-by-paper during your Q/A review.

Shall I proceed with Phase 1 first — the smart keyboard auto-detection system?

