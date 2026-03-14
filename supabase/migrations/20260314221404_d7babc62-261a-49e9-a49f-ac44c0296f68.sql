DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_type t
    JOIN pg_namespace n ON n.oid = t.typnamespace
    WHERE t.typname = 'workspace_mode' AND n.nspname = 'public'
  ) THEN
    CREATE TYPE public.workspace_mode AS ENUM ('general', 'student');
  END IF;
END
$$;

ALTER TABLE public.student_paper_progress
ADD COLUMN IF NOT EXISTS workspace_mode public.workspace_mode NOT NULL DEFAULT 'general';

DO $$
DECLARE
  r record;
BEGIN
  FOR r IN
    SELECT conname
    FROM pg_constraint
    WHERE conrelid = 'public.student_paper_progress'::regclass
      AND contype = 'u'
      AND pg_get_constraintdef(oid) = 'UNIQUE (user_id, paper_id, question_id)'
  LOOP
    EXECUTE format('ALTER TABLE public.student_paper_progress DROP CONSTRAINT %I', r.conname);
  END LOOP;
END
$$;

DO $$
DECLARE
  r record;
BEGIN
  FOR r IN
    SELECT indexname
    FROM pg_indexes
    WHERE schemaname = 'public'
      AND tablename = 'student_paper_progress'
      AND indexdef LIKE '%UNIQUE%'
      AND indexdef LIKE '%(user_id, paper_id, question_id)%'
  LOOP
    EXECUTE format('DROP INDEX IF EXISTS public.%I', r.indexname);
  END LOOP;
END
$$;

ALTER TABLE public.student_paper_progress
ADD CONSTRAINT student_paper_progress_user_paper_question_mode_key
UNIQUE (user_id, paper_id, question_id, workspace_mode);

CREATE INDEX IF NOT EXISTS idx_student_paper_progress_user_mode_submitted_at
ON public.student_paper_progress (user_id, workspace_mode, submitted_at);