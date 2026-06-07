
-- 1) Add per-session secret token for demo ownership
ALTER TABLE public.usage_sessions
  ADD COLUMN IF NOT EXISTS session_token text;

-- 2) Drop the overly-permissive anon UPDATE policy
DROP POLICY IF EXISTS "Demo visitors update session" ON public.usage_sessions;

-- 3) Tighten anon INSERT to require a session_token so updates can be ownership-checked
DROP POLICY IF EXISTS "Demo visitors insert session" ON public.usage_sessions;
CREATE POLICY "Demo visitors insert session"
  ON public.usage_sessions
  FOR INSERT
  TO anon
  WITH CHECK (
    account_type = 'demo'
    AND user_id IS NULL
    AND session_token IS NOT NULL
    AND length(session_token) >= 16
  );

-- 4) Add SELECT policy so authenticated students can read their own sessions
CREATE POLICY "Students read own sessions"
  ON public.usage_sessions
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

-- 5) Security-definer RPC for demo heartbeat updates, gated by the secret token
CREATE OR REPLACE FUNCTION public.update_demo_session(
  _id uuid,
  _token text,
  _duration_seconds integer
) RETURNS void
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  UPDATE public.usage_sessions
  SET duration_seconds = GREATEST(duration_seconds, _duration_seconds),
      last_active_at  = now()
  WHERE id = _id
    AND account_type = 'demo'
    AND session_token IS NOT NULL
    AND session_token = _token;
$$;

REVOKE ALL ON FUNCTION public.update_demo_session(uuid, text, integer) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.update_demo_session(uuid, text, integer) TO anon, authenticated;
