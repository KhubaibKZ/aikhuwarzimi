

## Plan: Add O Level (4024) Past Papers Support

### Overview
Prepare the architecture to support O Level (4024) past papers with the same interactive features as IGCSE (0580) — step-by-step workspaces, interactive diagrams, hints, check work, smart keyboards, and year-wise organization. You will provide the question papers and marking schemes, and I will create each paper's data file and diagrams from those.

### What needs to change

**1. Unlock O Level course**
- In `src/lib/courseData.ts`, set `locked: false` for `olevel-4024`.

**2. Create O Level syllabus data**
- Create `src/lib/olevelSyllabusData.ts` with the 4024 syllabus structure (topics and subtopics), mirroring the structure in `syllabusData.ts`.

**3. Extend past paper data to support both courses**
- Add a `courseId` field to the `PastPaper` interface in `pastPaperData.ts` (e.g., `'igcse-0580'` or `'olevel-4024'`).
- Update the `pastPapers` array so existing papers get `courseId: 'igcse-0580'`.
- Define O Level paper categories (4024 uses Paper 1 and Paper 2, not the same 4-paper structure as 0580).

**4. Create O Level paper data files (per paper you provide)**
- For each paper you upload, I will create a file like `src/lib/pastPaper4024_12_2023.ts` containing:
  - All questions with `id`, `questionNumber`, `title`, `question` text, `marks`, `hints`, `type`, `parts`, `answer` (from mark scheme), and step breakdowns.
  - Interactive SVG diagram components for geometry/graph questions.
  - Question-specific keyboard configurations.

**5. Update TableOfContents to be course-aware**
- Filter `pastPapers` by the currently selected `courseId`.
- Show the correct syllabus (IGCSE or O Level) based on selected course.
- Organize papers year-wise within each category.

**6. Update navigation and routing**
- Pass `courseId` through to `TableOfContents` and `PastPaperWorkspace`.
- Ensure progress tracking works per-course.

### What I need from you
Upload the question paper PDF and marking scheme PDF for each O Level paper you want added. I will then create the full interactive digital version with:
- Step-by-step solution workspace for each question
- Interactive SVG diagrams where needed
- Hints derived from the mark scheme
- Check work with AI tutor integration
- Question-specific smart keyboards

### Paper organization
O Level 4024 papers will be categorized as:
- **Paper 1** (non-calculator, short answers)
- **Paper 2** (calculator allowed, structured questions)

Papers will be listed year-wise (newest first) within each category, matching the IGCSE layout.

### Technical details
- Each paper data file follows the established pattern: exports a `questions4024_XX_YYYY` record and a `sections4024_XX_YYYY` array.
- Diagram components go in `src/components/diagrams/` with descriptive names.
- Keyboard configs added to `src/lib/keyboardConfigs.ts`.
- All existing workspace components (`StepWorkspace`, `QuestionWorkspace`, `FinalAnswerField`, `HorizontalKeyboard`, etc.) are reused directly — no duplication needed.

