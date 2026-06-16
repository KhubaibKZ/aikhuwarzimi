# 4024/21 O/N 2023 — interactive diagrams & MS marking

The paper already has 10 questions, per-part workspaces, hints, and answers (`src/lib/pastPaper4024_21_2023ON.ts`). The work is to add interactive diagrams where the QP has one, and tighten validation so submitted answers are scored exactly as the MS specifies.

## Pass 1 (this turn) — Q6 interactive function graph

Q6 needs a plot of `y = 2x + 60/x − 4` for `1 ≤ x ≤ 8`, then "use the graph" to read `x` when `y = 24`.

- New component `src/components/diagrams/FunctionGraphPlotter.tsx`:
  - Scale-accurate axes matching the QP grid (x: 0–8, y: 0–30, 2 cm per unit feel).
  - Click-to-place plot points; component snaps to nearest grid intersection.
  - "Show smooth curve" toggle once all 8 table points are placed.
  - Draggable horizontal ruler at `y = 24`; readout shows the two `x` intercepts.
  - Emits `{ points: [...], readings: [x1, x2] }` to the workspace.
- Wire into Q6 part (d) (draw graph) and part (e) (dimensions) via the existing `diagramScored` path used by Q7/Q18.
- Validation per MS: part (d) awards up to 3 marks (B1 table value, B1 plotting, B1 smooth curve through points); part (e) accepts `x ≈ 3` AND `x ≈ 10` (i.e. the two dimensions of the rectangle, 3 cm × 10 cm) within ±0.2 tolerance, matching MS.

## Pass 2 — remaining interactive diagrams (Q2, Q9, Q10)

- **Q2 transformation grid**: 12×12 coordinate grid, triangle A pre-drawn, click-to-place reflected image vertices, snap to grid; validates against the reflected coordinates from MS.
- **Q9 prism + cuboid**: static labelled SVGs (no interaction needed) so students see the figure while answering.
- **Q10 circle**: static SVG of the two-diameter circle and the chord-AB shaded figure.

## Pass 3 — MS-aligned validation sweep

Re-read MS row-by-row and update `pp_4024_on23_21_q*` entries so:
- Every accepted alternative form is in the `answer` (e.g. `1/4` ↔ `0.25`, `(0,-5/4)` ↔ `(0,-1.25)`).
- Multi-value parts (Q7c quadratic roots: `-1.07, 1.40`) use the existing multi-value validator.
- Method-mark hints (M1/A1) flow through the AI tutor "marking-aware feedback" path so partial credit shows correct breakdown.

## Pass 4 — editor parity

Confirm the new `FunctionGraphPlotter` and other diagrams render in the PaperEditor preview mode (already fixed last turn to use real workspace in Preview), and that the SVG-upload override path still works as a fallback.

## Technical notes

- New files: `src/components/diagrams/FunctionGraphPlotter.tsx`, plus a small registry entry where `PastPaperWorkspace` matches question id → diagram component.
- Hook into the existing `diagramScored: true` part pattern (already used by Q7/Q18) so scoring/persistence "just works".
- No schema changes; everything is client-side rendering + validation.
- After each pass I'll Playwright-screenshot the relevant question to confirm the diagram looks right against the QP.

## What I need from you

Confirm Pass 1 (Q6 graph) is the right starting point, or redirect me to a different pass first.
