ALTER TABLE public.student_paper_progress 
ADD COLUMN submitted_answers jsonb DEFAULT '{}'::jsonb;

ALTER TABLE public.student_paper_progress
ADD COLUMN submitted_feedback jsonb DEFAULT '{}'::jsonb;