CREATE TABLE public.usage_sessions (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid,
  display_name text,
  email text,
  account_type text NOT NULL DEFAULT 'student',
  started_at timestamp with time zone NOT NULL DEFAULT now(),
  last_active_at timestamp with time zone NOT NULL DEFAULT now(),
  duration_seconds integer NOT NULL DEFAULT 0,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE ON public.usage_sessions TO anon;
GRANT SELECT, INSERT, UPDATE ON public.usage_sessions TO authenticated;
GRANT ALL ON public.usage_sessions TO service_role;

ALTER TABLE public.usage_sessions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can read all usage sessions"
ON public.usage_sessions FOR SELECT TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Students insert own session"
ON public.usage_sessions FOR INSERT TO authenticated
WITH CHECK (user_id = auth.uid() AND account_type = 'student');

CREATE POLICY "Students update own session"
ON public.usage_sessions FOR UPDATE TO authenticated
USING (user_id = auth.uid());

CREATE POLICY "Demo visitors insert session"
ON public.usage_sessions FOR INSERT TO anon
WITH CHECK (account_type = 'demo' AND user_id IS NULL);

CREATE POLICY "Demo visitors update session"
ON public.usage_sessions FOR UPDATE TO anon
USING (account_type = 'demo');

CREATE INDEX idx_usage_sessions_started_at ON public.usage_sessions (started_at DESC);