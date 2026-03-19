

# Workflow Plan: Updating Past Papers from Uploaded Documents

## What You're Asking

You want to establish a systematic process where:
1. You upload **question papers** + **marking schemes** + **solved versions with steps** for each year/session
2. I update the workspace data files with accurate equationStages/box scaffolding matching the solved steps
3. Marking scheme points are mapped to specific steps so students earn marks at the right places
4. Interactive SVG diagrams are created for all geometric/visual questions in the papers

## How This Will Work (Per Paper You Upload)

### Step 1 — Parse & Cross-Reference
- Read the question paper to get exact question text, numbers, and diagram descriptions
- Read the marking scheme to identify mark allocation per step (M1, A1, B1 etc.)
- Read the solved version to extract the step-by-step working pattern

### Step 2 — Update the Data File
For each question in `src/lib/pastPaper4024_XX_YYYY.ts`:
- **Question text**: Verify it matches the paper exactly
- **equationStages**: Build box layouts that mirror the solved steps (one stage per logical working step)
- **answer object**: Populate all intermediate values from the solved version
- **marks on parts**: Align with the marking scheme (M1 for method steps, A1 for final answers)
- **hints**: Derive from marking scheme guidance notes

### Step 3 — Create Interactive Diagrams
For any question with a geometric figure, graph, or visual element:
- Create a new SVG component in `src/components/diagrams/`
- Export it from `src/components/diagrams/index.ts`
- Import and render it in `PastPaperWorkspace.tsx` keyed to the question ID
- Match dimensions, labels, and angles from the original paper diagram

### Step 4 — Update Topic Mapping
- Update `src/lib/questionTopicMap.ts` with correct syllabus references for each question

## What I Need From You

For each paper, upload these three documents:
1. **Question Paper** (the actual exam PDF)
2. **Marking Scheme** (official mark scheme PDF)
3. **Solved Version** (handwritten or typed step-by-step solutions)

You can upload them together or one at a time — I'll process each set and update the corresponding data file with full scaffolding, correct answers, and diagrams.

## Technical Details

- Each paper file follows the naming pattern: `src/lib/pastPaper4024_XX_YYYY[ON].ts`
- Box scaffolding uses `equationStages` (single-part) or `equationStagesMap` (multi-part) with `EquationStageElement[]`
- Diagrams go in `src/components/diagrams/` as standalone SVG components
- Mark allocation from the scheme maps to `parts[].marks` and stage-level validation
- The AI tutor feedback (edge function) already handles concise error-first guidance per step

## Ready When You Are

Go ahead and upload the first set of documents (question paper + marking scheme + solved version) for any paper, and I'll update it completely.

