

# Admin Panel for AI Khuwarizmi

## Overview

Build an admin panel that lets administrators manage students, assign courses/chapters/papers, and control hint/checkwork quotas per paper per student. Students see all content as locked unless assigned, and see their remaining hint/checkwork counts per paper.

## Database Schema (New Tables)

```text
┌─────────────────────────┐     ┌──────────────────────────────┐
│ user_roles              │     │ student_assignments          │
├─────────────────────────┤     ├──────────────────────────────┤
│ id          uuid PK     │     │ id             uuid PK       │
│ user_id     uuid (FK)   │     │ student_id     uuid          │
│ role        app_role    │     │ course_id      text          │
│ unique(user_id, role)   │     │ assigned_by    uuid          │
└─────────────────────────┘     │ created_at     timestamptz   │
                                │ unique(student_id, course_id)│
app_role enum:                  └──────────────────────────────┘
  'admin', 'student'
                                ┌──────────────────────────────┐
┌─────────────────────────┐     │ student_paper_assignments    │
│ student_chapter_assign  │     ├──────────────────────────────┤
├─────────────────────────┤     │ id             uuid PK       │
│ id          uuid PK     │     │ student_id     uuid          │
│ student_id  uuid        │     │ paper_id       text          │
│ course_id   text        │     │ hint_count     int default 3 │
│ chapter_id  text        │     │ checkwork_count int default 3│
│ assigned_by uuid        │     │ assigned_by    uuid          │
│ created_at  timestamptz │     │ created_at     timestamptz   │
│ unique(student_id,      │     │ unique(student_id, paper_id) │
│   course_id, chapter_id)│     └──────────────────────────────┘
└─────────────────────────┘

┌─────────────────────────┐
│ profiles                │
├─────────────────────────┤
│ id          uuid PK     │
│ email       text        │
│ full_name   text        │
│ created_at  timestamptz │
└─────────────────────────┘
```

**RLS Policies:**
- `user_roles`: Admins can read all; users can read own role
- `profiles`: Auto-created on signup via trigger; users read own, admins read all
- `student_assignments`, `student_chapter_assign`, `student_paper_assignments`: Admins full CRUD; students read own

**Security definer function:** `has_role(user_id, role)` to avoid recursive RLS.

## New Pages & Components

### 1. Admin Panel Page (`/admin`)
- **Route guard**: Check `has_role(auth.uid(), 'admin')` — redirect non-admins
- **Student List**: Table of all registered students (from profiles), showing email, name, signup date
- **Per-Student Management** (expandable or modal):
  - **Assign Courses**: Checkboxes for available courses (0580, 4024)
  - **Assign Chapters**: Tree-select of syllabus topics/subtopics per assigned course
  - **Assign Papers**: Multi-select of past papers per assigned course, with editable hint_count and checkwork_count fields per paper
  - **Bulk assign**: Select multiple students, assign same courses/papers

### 2. Student Dashboard Updates
- **Locking logic**: In `CourseSelection`, `TableOfContents`, and paper lists, check `student_assignments`, `student_chapter_assign`, and `student_paper_assignments` tables. Show lock icon + "Not assigned" for unassigned content
- **Hint/Checkwork display**: In `PastPaperWorkspace` header, show remaining hints and checkwork counts (fetched from `student_paper_assignments`, decremented on use)
- **Hint/Checkwork enforcement**: Disable hint/check buttons when count reaches 0

## Implementation Steps

1. **Database migrations**: Create enum, tables, trigger for profiles, security definer function, RLS policies
2. **Auth hook update**: Add role checking via `has_role` RPC
3. **Admin page**: New `/admin` route with student management UI
4. **Student hooks**: `useStudentAssignments` hook to fetch assigned courses/chapters/papers
5. **Lock enforcement**: Update `CourseSelection`, `TableOfContents`, `PastPaperWorkspace` to check assignments
6. **Hint/Checkwork tracking**: Update `PastPaperWorkspace` to fetch quotas, display counts, enforce limits, decrement on use
7. **Admin route in App.tsx**: Add protected admin route

## Key Technical Decisions
- Admin users must be manually set in the database initially (first admin seeded via migration or manual insert)
- Profiles table auto-populated via database trigger on `auth.users` insert
- Hint/checkwork counts are per-paper per-student, decremented in the database via RPC to prevent race conditions
- All locking is server-enforced via RLS, not just UI-level

