

## Plan: Reorganize Past Papers into Paper → Year → Session Hierarchy

### Current structure
Papers are grouped flat: **Category (Paper 1/2)** → list of individual papers. All papers under a category appear in a single list.

### New structure (3-level collapsible tree)
```text
├── Paper 1
│   ├── 2025
│   │   ├── May/June (4024/12, 4024/13)
│   │   └── Oct/Nov (4024/11, 4024/12)
│   └── 2024
│       ├── May/June (4024/11, 4024/12)
├── Paper 2
│   ├── 2025
│   │   ├── May/June (4024/22, 4024/23)
│   │   └── Oct/Nov (4024/21, 4024/22)
│   └── 2024
│       ├── May/June (4024/21, 4024/22)
```

Same pattern applies to IGCSE (Paper 01 CORE, Paper 02 EXTENDED, etc.).

### Changes required

**File: `src/components/TableOfContents.tsx`** — Past Papers tab only

1. Add two new state variables: `expandedCategory` (string | null) and `expandedYear` (number | null) for the folder tree.
2. Replace the current flat rendering logic (lines 266–403) with a 3-level nested structure:
   - **Level 1 — Paper category**: Collapsible header (e.g. "Paper 1"). Click to expand/collapse years.
   - **Level 2 — Year**: Group papers by `paper.year`, sorted descending (newest first). Collapsible.
   - **Level 3 — Session**: Group papers by `paper.session` within each year. Each session shows its variant papers. Clicking a paper expands it to show individual questions (existing behavior).
3. Keep the existing paper-expand and question-list rendering intact — just nest it under the new hierarchy.

No data model changes needed — `year` and `session` fields already exist on every `PastPaper` object.

### Technical details
- Group using: `categories → filter by category → group by year → group by session`
- Icons: `BookOpen` for category, `Calendar` for year, `GraduationCap` for session/paper
- All levels collapse independently; expanding a new sibling collapses the previous one
- Reset Paper Progress button stays at the individual paper level

