

## Plan: Add O Level 4024 Question-to-Syllabus Mapping

### What needs to happen
Every O Level 4024 past paper question needs a `SyllabusRef` entry in `src/lib/questionTopicMap.ts`, mapping it to the correct topic/subtopic from `src/lib/olevelSyllabusData.ts`. This enables the syllabus badge (e.g. "1.1 Types of Number • Number") to appear in the question workspace header, and powers the topic mastery analytics.

### Scope
16 paper files with ~300+ total questions across:
- **Paper 1**: 4024/11 and /12 (May/June 2024, Oct/Nov 2024, 2025 sessions)
- **Paper 2**: 4024/21 and /22 (same sessions)
- **Paper 13, /23** (May/June 2025)

### Changes

**File: `src/lib/questionTopicMap.ts`**

Add ~300 new entries mapping each `pp_4024_*` question ID to its O Level syllabus reference. Each entry uses the O Level topic structure (topics 1–9 from `olevelSyllabusData.ts`), for example:

```ts
'pp_4024_s24_11_q1': { topicId: 4, topicTitle: 'Geometry', subtopicCode: '4.5', subtopicTitle: 'Symmetry' },
'pp_4024_s24_11_q2': { topicId: 1, topicTitle: 'Number', subtopicCode: '1.6', subtopicTitle: 'The Four Operations' },
```

Topic assignment is determined by analyzing each question's title and content against the 4024 syllabus subtopics.

### No other file changes needed
The existing rendering in `PastPaperWorkspace.tsx` and analytics in `useStudentProgress.ts` already consume `questionTopicMap` generically — once entries are added, the badges and topic mastery will work automatically for O Level papers.

