## Goal
Make every Book-icon check in editor preview evaluate the student’s current step and its logical connection to earlier work, color only the relevant boxes, and provide specific adaptive guidance without revealing an answer.

## Implementation plan

1. **Create one deterministic step-analysis engine**
   - Extract the parsing and grading logic from `SolutionCanvas.tsx` into a pure, testable module.
   - Parse each step into mathematical sides while retaining which input box contributed each value.
   - Support the editor’s common forms: arithmetic, brackets, fractions, percentages, roots, powers, equivalent decimals/fractions, tolerances, and answer-key alternatives.
   - Return a structured result per box and step: `correct`, `incorrect`, `empty`, or `unverified`, plus an error category and non-answer diagnostic context.

2. **Evaluate evidence in a strict order**
   - Check each filled box independently against its authored expected value/equivalent alternatives.
   - Check the mathematical relationship inside the current line.
   - Check continuity only against the immediately relevant preceding validated step and the question’s stated data—not against an undifferentiated pool of every earlier number.
   - Recognize a valid intermediate result without requiring it to equal the final answer.
   - Track the original error separately from valid error-carried working so the same misconception is not penalized repeatedly.
   - Never mark a box green unless its value is positively verified, and never mark unrelated boxes red. Ambiguous/unparseable fields remain neutral rather than receiving a false judgment.

3. **Make box coloring fully deterministic**
   - Remove AI authority over red/green states; AI output will not be allowed to overwrite local mathematical evidence.
   - If only the result is wrong, only the result box is red while verified operands stay green.
   - If an operand, sign, percentage notation, or fraction component is wrong, mark only the box(es) responsible.
   - Clear stale states whenever a student edits a field and recompute all relevant statuses on every click.

4. **Use AI only for adaptive pedagogy**
   - Send the backend a structured, deterministic diagnosis containing the current step, ordered prior steps, question context, error category, affected box roles, attempt number, and prior feedback—but never expose expected answers in the student-facing response.
   - Require exactly two short student-friendly sentences: identify the specific issue, then give a Socratic next-check without an answer or exact next calculation.
   - On repeated clicks, vary the guidance and progressively name the relevant rule or method more directly while still withholding the solution.
   - Add safe local feedback for unavailable or malformed AI responses, based on the deterministic diagnosis rather than a generic or potentially contradictory message.

5. **Provide the full question context**
   - Pass the active editor question, hints, and marking criteria into `SolutionCanvas`, including the first section where no embedded question block currently exists.
   - Keep each question section isolated so prior work from another question cannot influence its validation.

6. **Add regression tests for known failures and core maths patterns**
   - Verify cases such as a correct percentage step, omitted/misused percentage notation, a wrong result with correct operands, and a subtraction derived from the previous step where an unrelated value such as `20000` must be rejected.
   - Cover equivalent fractions/decimals, commutative multiplication, negative values, roots/powers, multiple equals signs, blanks, malformed expressions, intermediate answers, and propagated errors.
   - Test that only responsible boxes change color and that feedback never contains the expected/final numerical answer.

## Primary files
- `src/components/editor/SolutionCanvas.tsx`
- New pure validation module and focused tests under `src/components/editor/`
- `src/pages/PaperEditor.tsx`
- `supabase/functions/ai-tutor/index.ts`

## Acceptance criteria
- Every Check Work click re-evaluates the current student work from fresh input.
- Correct boxes are green, incorrect boxes are red, and unrelated/uncertain boxes are not falsely colored.
- Step continuity uses the correct prior dependency and does not accept arbitrary earlier numbers.
- Feedback identifies the actual mistake and gives a changing, student-friendly hint without supplying the answer.
- Deterministic grading remains correct even if the AI request fails.