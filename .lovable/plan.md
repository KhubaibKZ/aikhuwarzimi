

# Plan: Add Step-by-Step Workspaces for 4024/11/O/N/2023

## What This Is
The existing paper `pastPaper4024_11_2023ON.ts` has all 24 questions defined but uses basic `multi-part` and `short` types with simple answer fields. The uploaded solved PDF shows detailed step-by-step solutions with "box" scaffolding patterns drawn alongside each solution. The task is to convert each question to use the `equationStages` / `equationStagesMap` system so students fill in boxes for intermediate steps, matching the scaffolding shown in the handwritten solution.

## Questions and Their Workspace Structures (from the PDF)

**Q1** (a) 6+4÷2=8, (b) 40×0.3=12 — Simple 1-mark each, keep as `multi-part` with basic fields.

**Q2** Ordering: 0.1, 3/25, 13%, 1/5 — Keep as `multi-part` with 4 ordering fields.

**Q3** (a) -12+20=8°C, (b) -4 to 10=14°C — Simple, keep as `multi-part`.

**Q4** Kasia apples — Add `equationStages`: □×□=□ cents, □cents=$/□ → Answer $7.80

**Q5** Bar chart — Keep as `multi-part` (a) range, (b) fraction.

**Q6** Parallel lines angles — Add `equationStagesMap`: (a) x=□-□, x=□; (b) y=□-□, y=□

**Q7** Estimation 53.7/(2.61+7.48) — Add `equationStages`: □/(□+□), □/□, answer=□

**Q8** (a) 78/10=□/□=7.8cm; (b) 3×(□)²=□ → 30000cm²

**Q10** (a) □-(□+□+□+□)=□; (b) □×(□-□)/□=□

**Q11** (a) =)□+□ =)□; (b) =)□/□×□^□ =)□

**Q13** Fraction division: □/□÷□/□, □/□×□/□ = 24/25

**Q14** (a) Prime factor ladder for 36; (b) LCM stages: 36=□×□×□×□, 48=□×□×□×□×□, LCM=□ minutes, □h+□min, Add=□h+□min → 11:54

**Q15** Circle theorems: (a) □+□+□=180, □=□; (b) 180-□-□=□, □+□=□; (c) □/□=□

**Q17** Proportion: □α√□, □=□√□, □=□×□, K=□/□, y=□√□/□ → 5/2

**Q19** Speed-time: (a) a=□/□, a=□; (b) □=□×□×□+□(T-□), T=□

**Q20** Matrices: (a) |A|=□×□-□×□, |A|=□-□, |A|=□, AdjA=(□,□;□,□), A⁻¹; (b) (□,□;□,□)(□,□;□,□)=AB

**Q21** (a) simple answer; (b) simple answer; (c) □(□-□)/((□+□)(□-□)) = □/(□+□)

**Q22** Functions: (a) f(-8)=□/4+3, f(-8)=□; (b) □=□x-□; (c) multi-step equation

**Q23** Vectors: (b) OX=□+□, OX=□+□(□-□), OX=□-□+□, OX=□+□; (c) YX=□+□, YX=□+□(□-□), YX=□+□-□

**Q24** Algebraic fractions: □(□-□)-□(□+□)/(□+□)(□-□)=□, expand, simplify, solve

## Technical Approach

### File to modify:
- `src/lib/pastPaper4024_11_2023ON.ts` — Rewrite all 24 questions with proper `equationSolveParts`, `equationStages`, and `equationStagesMap` configurations following the exact patterns from `pastPaper4024_12_2025.ts`.

### For each question:
1. Keep `type: 'multi-part'` (or appropriate type)
2. Add `equationSolveParts` listing which part keys use the box workspace
3. Add `equationStages` or `equationStagesMap` with labeled steps containing `box` and `text` elements
4. Update `answer` to include all stage box answers (e.g., `answer_s1_a: '20'`)
5. Correct any wrong answers (Q1b is 40×0.3=12, Q2 ordering, Q9b=0.17, Q13 is division not multiplication, Q22a f(-8)=1, Q22c p=-20/7)

### Marks allocation per marking scheme:
- Each step's marks will match the marking scheme points visible in the PDF
- Intermediate calculation steps get 0 marks (scaffolding only), final answers get the actual marks

### Special workspace types to use:
- **Q14(a)**: Use existing `prime-factor` type for 36
- **Q14(b)**: Multi-step equation solve for LCM calculation
- **Q13**: Use `fractionDivisionParts` for the fraction operation

### No changes needed to:
- `PastPaperWorkspace.tsx` — existing rendering handles all these types
- `workspace/` components — all patterns already supported
- Database or routing

