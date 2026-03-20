

# Fix Submit Feedback for Equation-Solve Questions + Partial Marking

## Problem

When submitting Q4 (and any question using `equationSolveParts`), `checkAnswersInternal` checks `answers['answer']` — but students fill equation boxes like `answer_s2_c`. Since `answers['answer']` is never populated, feedback is `null` and no correct/incorrect status is shown.

Additionally, the marking system currently only tracks correct/incorrect per part, with no partial mark scoring based on the marking scheme criteria.

## Plan

### 1. Fix `checkAnswersInternal` for equation-solve parts
In `src/components/PastPaperWorkspace.tsx`, update `checkAnswersInternal` so that when a part is in `equationSolveParts`:
- Get the stages from `equationStagesMap[partKey]` or `equationStages`
- Extract all box keys and check each against `question.answer` (prefixed with `partKey_`)
- The final box determines correct/incorrect for the part
- Intermediate boxes determine partial marks

### 2. Add marks scoring logic
Create a scoring function that:
- For each part, counts how many stage boxes match the correct answer
- Maps this against `markingCriteria` rules (M1, A1, B1)
- Calculates earned marks vs total marks
- Shows a summary like "2/3 marks" after submission

### 3. Update post-submission display
After submission, show per-part:
- Marks earned (e.g., "1/2 marks")
- Which steps were correct (green) and incorrect (red)
- Marking criteria explanation for partial marks
- Correct answers for wrong boxes

### 4. Apply across all 2023 ON paper questions
Ensure the logic works for all question types in `pastPaper4024_11_2023ON.ts`:
- Standard `multi-part` with direct answer fields
- `equationSolveParts` with box scaffolding
- `fractionDivisionParts`
- Prime factor and LCM ladders

### Technical Details

**`checkAnswersInternal` changes:**
```
// For equation-solve parts, check the last box of last stage
if (eqParts?.includes(part.key)) {
  const stages = stagesMap?.[part.key] || equationStages;
  const lastStage = stages[stages.length - 1];
  const lastBox = lastStage.elements.filter(el => el.type === 'box').pop();
  const answerKey = `${part.key}_${lastBox.key}`;
  const userAnswer = answers[answerKey];
  const correctAnswer = question.answer[answerKey];
  // Check match and also count intermediate correct boxes for partial marks
}
```

**Marks display in post-submission summary:**
- Add a marks counter that sums earned marks per part
- Show "X/Y marks" in the submission summary card
- For partial marks, show which criteria were met (e.g., "M1 earned for method")

### Files to modify
- `src/components/PastPaperWorkspace.tsx` — fix `checkAnswersInternal`, update submission display, add marks scoring
- `src/components/workspace/EquationSolveWorkspace.tsx` — ensure post-submit shows per-box correct/incorrect highlighting

