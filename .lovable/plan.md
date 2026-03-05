

## Plan: Add Scaffolding Steps to All Past Paper Questions

### Problem
Currently, `parts` in question data only contain the final answer fields (e.g., "(c) 2/9 ÷ 5/6" → answer "4/15"). Students jump straight to the final answer without working through intermediate steps. The marking scheme awards method marks for intermediate working, which we should scaffold.

### Example: Q1 of Paper 4024/12 2025
**Current** (no scaffolding):
```text
parts: [
  { label: '(a) 6 − 2 × (−4)', key: 'a', marks: 1 },
  { label: '(b) 4²', key: 'b', marks: 1 },
  { label: '(c) 2/9 ÷ 5/6', key: 'c', marks: 2 }
]
answer: { a: '14', b: '16', c: '4/15' }
```

**With scaffolding**:
```text
parts: [
  { label: '(a) 2 × (−4) =', key: 'a_s1', marks: 0 },
  { label: '(a) 6 − (−8) =', key: 'a', marks: 1 },
  { label: '(b) 4 × 4 =', key: 'b', marks: 1 },
  { label: '(c) Reciprocal of 5/6', key: 'c_s1', marks: 0 },
  { label: '(c) 2/9 × 6/5 =', key: 'c', marks: 2 }
]
answer: { a_s1: '-8', a: '14', b: '16', c_s1: '6/5', c: '4/15' }
```

### Approach

**No code/component changes needed.** The existing `StepWorkspace` already renders every entry in `parts` as a numbered step with its own input field and "Check Work" button. Adding scaffolding steps is purely a **data layer change** — we expand the `parts` arrays and `answer` objects in each question data file.

### Scaffolding Rules (by topic)
- **Arithmetic**: Show BODMAS steps, intermediate calculations
- **Fractions**: Show reciprocal step, multiplication, then simplification
- **Equations**: Show expansion, rearrangement, then solution
- **Simultaneous equations**: Show substitution/elimination steps
- **Percentages**: Show multiplier identification, then calculation
- **Geometry/angles**: Show each angle found with reason
- **Trigonometry**: Show formula setup, substitution, then answer
- **Factorisation**: Show common factor extraction, then grouping
- **Surds**: Show simplification of each surd before combining
- **Indices**: Show intermediate power/reciprocal steps
- **Quadratics**: Show discriminant, formula setup, then solutions
- **Vectors**: Show vector arithmetic steps
- **Probability**: Show individual probability calculations, then combination
- **Statistics**: Show midpoint × frequency working, then division
- Steps with `marks: 0` are working steps (no exam marks but still checkable)

### Scope & Execution
This affects **40+ data files** with **400+ questions**. I will work through them systematically:

1. **Start with 4024/12 May/June 2025** (the paper you referenced) — all 22 questions get scaffolding
2. Then proceed paper by paper across all O Level 4024 files
3. Then IGCSE 0580 files
4. Each question gets scaffolding steps derived from the marking scheme hints already in the data plus standard mathematical working

### StepWorkspace Minor Enhancement
One small UI tweak: hide the "[0 marks]" badge for scaffolding steps (marks: 0) so students see them as working steps rather than graded fields. This keeps the UI clean.

### What Changes
- **~40 data files** in `src/lib/pastPaper*.ts`: Expanded `parts` arrays with intermediate steps and corresponding `answer` entries
- **1 component file** `src/components/workspace/StepWorkspace.tsx`: Hide mark badge when marks === 0, optionally style working steps differently (lighter background)

