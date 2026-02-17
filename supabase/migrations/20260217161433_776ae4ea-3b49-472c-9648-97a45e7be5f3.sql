
-- Create student_paper_progress table to track real submission data
CREATE TABLE public.student_paper_progress (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  paper_id TEXT NOT NULL,
  question_id TEXT NOT NULL,
  is_correct BOOLEAN NOT NULL DEFAULT false,
  accuracy_score NUMERIC(5,2) DEFAULT 0,
  speed_score NUMERIC(5,2) DEFAULT 0,
  ai_usage_count INTEGER DEFAULT 0,
  time_spent_seconds INTEGER DEFAULT 0,
  total_steps INTEGER DEFAULT 1,
  completed_steps INTEGER DEFAULT 0,
  submitted_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, paper_id, question_id)
);

-- Enable RLS
ALTER TABLE public.student_paper_progress ENABLE ROW LEVEL SECURITY;

-- Users can only see their own progress
CREATE POLICY "Users can view own progress"
  ON public.student_paper_progress FOR SELECT
  USING (auth.uid() = user_id);

-- Users can insert their own progress
CREATE POLICY "Users can insert own progress"
  ON public.student_paper_progress FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Users can update their own progress
CREATE POLICY "Users can update own progress"
  ON public.student_paper_progress FOR UPDATE
  USING (auth.uid() = user_id);

-- Users can delete their own progress
CREATE POLICY "Users can delete own progress"
  ON public.student_paper_progress FOR DELETE
  USING (auth.uid() = user_id);
