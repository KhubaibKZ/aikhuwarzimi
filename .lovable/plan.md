## Goal

Bring `4024/12 Oct/Nov 2023` up to the same quality bar as `4024/11 Oct/Nov 2023`: exact official wording, fillable "spaces-to-fill" scaffolding, scale-accurate interactive SVG diagrams, topic-aware smart keyboard, granular Check Work + marking-aware Hints — all driven by the uploaded QP and Mark Scheme.

## Reference vs. current state

- File: `src/lib/pastPaper4024_12_2023ON.ts` (24 Qs already exist, but wording is paraphrased, several diagrams are missing/text-only, and many parts lack stage-by-stage scaffolding).
- Diagrams file: `src/components/diagrams/Paper4024_12_2023ON_Diagrams.tsx` exists with 9 SVGs (Q2, Q6, Q7, Q14, Q17, Q18, Q21, Q23, Q24) but most are NOT wired into `PastPaperWorkspace.tsx` (only Q2 / a couple are referenced — needs `EXTERNAL_DIAGRAM_QUESTIONS` entries in `src/lib/auditEngineRegistry.ts`, and per-question branches in `PastPaperWorkspace.tsx`).

## Per-question updates (driven by QP + MS)

| Q | What to fix |
|---|---|
| Q1 | Wording verbatim; keep 3-stage scaffold; validate 0.015 / 3000 / 14. |
| Q2 | Wire `RectangleSquares_4024_12_2023ON`; answer `5/21`. |
| Q3 | (a) halfway between 3⁄5 and 68% → 0.64; (b) 4.074; (c) ³√64 = 4. Fraction-aware keyboard for (a). |
| Q4 | Range = 13 °C; median scaffold `(−1+T)/2 = 1 → T = 3`. |
| Q5 | Ratio 5:9, Ria −Anna = $8 → total $28; show 4-step scaffold. |
| Q6 | Wire `ParallelLines_4024_12_2023ON`; x = 73, y = 107 with `y = 180 − 73` scaffold. |
| Q7 | Wire `TransformGrid_4024_12_2023ON`; (a) "Rotation, 90° clockwise, centre (0,0)" with multi-field validation; (b) S.F = √(27/3) = 3 enlargement, centre (5,5). |
| Q8 | (a) 4.93 × 10⁻³; (b) 8 × 10⁷ with standard-form keyboard preset. |
| Q9 | Prime-factor ladder UI for 180 → 2×2×3×3×5; (b) k = 5. |
| Q10 | 1-s.f. estimation scaffold → √(1000×4/10) = √400 = 20. |
| Q11 | 3-line inequality scaffold `7m ≤ 21 → m ≤ 3`. |
| Q12 | Simultaneous-equations multi-stage workspace (elimination): x = 4, y = −3⁄2. |
| Q13 | Mean scaffold: 12×8 = 96, 9×5 = 45, diff = 51. |
| Q14 | Wire `TriangleConstruct_4024_12_2023ON` + digital protractor; accept 47–51° for ∠ABC; construction/shading parts marked manually with hint guidance. |
| Q15 | (a) a=32, third=24, fourth=20 with `a+d`/`a+4d` scaffold; (b) nth term `2n² + 1` via second-difference scaffold. |
| Q16 | (a) T = 6; (b) P = T² + 4 with rearrangement scaffold. |
| Q17 | Wire `CumulativeFrequency_4024_12_2023ON`; (a) draw curve, (b) IQR ≈ 3.8 cm with tolerance, (c) H = 7.2 (read from curve where CF = 52). *Note: MS gives H ≈ 7 to 7.4 — confirm value when wiring tolerance.* |
| Q18 | Wire `SpeedTime_4024_12_2023ON`; (a) 0.3 m/s²; (b) Cyclist B further by 20 m with area-of-trapezium scaffold. |
| Q19 | Algebraic-fraction scaffold → (9x + 2)/16. |
| Q20 | (a) (c − 3)(2d + e); (b) 3(v + 3t)(v − 3t) — both with grouping scaffolds + commutative validation. |
| Q21 | Wire `TwoSectors_4024_12_2023ON`; (a) show x = 20 via arc-ratio scaffold; (b) y = 6 from area = 2π. |
| Q22 | Matrix equation — verify wording vs. MS, keep current scaffold. |
| Q23 | Wire `VennHSG_4024_12_2023ON`; (a) interactive fill; (b) n(S ∩ (H ∪ G)') = value from MS. |
| Q24 | Wire `TriangleOAB_4024_12_2023ON`; vector keyboard preset; (a)(i) AP = 2b − a; (a)(ii) OB = (3a + 10b)/2; (b) QP parallel to OB → (3⁄5)a + 2b. |

## Cross-cutting work

1. **Wording pass** — replace every `question` string with the exact QP wording (apostrophes, NOT TO SCALE notes, "Show that…", etc.).
2. **Scaffolding pass** — for every multi-step question, add `equationStagesMap` with empty `box` keys mirroring the MS working (spaces-to-fill preference).
3. **Diagrams wiring** —
   - Add Q6, Q7, Q14, Q17, Q18, Q21, Q23, Q24 IDs to `EXTERNAL_DIAGRAM_QUESTIONS` in `src/lib/auditEngineRegistry.ts`.
   - Add per-id branches in `PastPaperWorkspace.tsx` that render the matching `Paper4024_12_2023ON_Diagrams` component (mirroring how 4024/11 is wired).
   - Verify scale matches QP screenshots (cumulative-frequency axes 0–12 cm × 0–80; speed-time axes 0–20 s × 0–8 m/s; etc.).
4. **Keyboard presets** — extend `keyboardTopicPresets4024` so each Q12 question loads the right layout (vectors for Q24, standard-form for Q8, fractions for Q3/Q19, inequality for Q11, geometry for Q6/Q7/Q14/Q21).
5. **Check Work + Hints** — granular per-stage validation (already supported by `multi-field-validation`); marking-aware hint text aligned with MS method marks (M1/A1).
6. **Topic mapping** — update `src/lib/questionTopicMap.ts` so each 4024/12 ON23 question maps to its O Level 4024 syllabus topic (for the Topic Mastery analytics matrix).
7. **Audit** — run `scripts/auditWorkspace.ts` against `pp_4024_on23_12_*` and fix any flagged issues.

## Files to change

- `src/lib/pastPaper4024_12_2023ON.ts` (full rewrite of question bodies, scaffolds, answers, hints)
- `src/components/diagrams/Paper4024_12_2023ON_Diagrams.tsx` (minor scale tweaks if QP comparison shows drift)
- `src/components/PastPaperWorkspace.tsx` (wire all 4024/12 ON23 interactive diagrams + protractor for Q14)
- `src/lib/auditEngineRegistry.ts` (add external-diagram IDs)
- `src/lib/keyboardConfigs.ts` (topic presets for new Q IDs)
- `src/lib/questionTopicMap.ts` (syllabus mapping for analytics)

## Out of scope

- Backend/RLS, analytics schema, auth — no DB changes needed.
- Other papers — only `4024/12 Oct/Nov 2023`.

## Open question

For Q17(c) the MS gives a reading range for H; I'll use the official MS tolerance window (e.g. `H ∈ [7.0, 7.4]`) once I re-check the MS PDF during build. If you have a preferred exact accepted value, tell me now.
