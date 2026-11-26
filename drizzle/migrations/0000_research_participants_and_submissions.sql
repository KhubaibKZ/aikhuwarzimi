CREATE TABLE public.research_participants (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 name text NOT NULL,
 token_hash text NOT NULL UNIQUE,
 created_at timestamptz NOT NULL DEFAULT now(),
 last_active_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT (id, name, created_at, last_active_at) ON public.research_participants TO authenticated;
GRANT ALL ON public.research_participants TO service_role;
ALTER TABLE public.research_participants ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins read research participants" ON public.research_participants FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE TABLE public.research_submissions (
 id uuid PRIMARY KEY,
 participant_id uuid NOT NULL REFERENCES public.research_participants(id) ON DELETE CASCADE,
 paper_id text NOT NULL,
 question_id text NOT NULL,
 payload jsonb NOT NULL,
 submitted_at timestamptz NOT NULL DEFAULT now(),
 reset_at timestamptz
);
GRANT SELECT ON public.research_submissions TO authenticated;
GRANT ALL ON public.research_submissions TO service_role;
ALTER TABLE public.research_submissions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins read research submissions" ON public.research_submissions FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE INDEX research_submissions_participant ON public.research_submissions(participant_id, submitted_at);
CREATE UNIQUE INDEX research_one_current_submission ON public.research_submissions(participant_id, question_id) WHERE reset_at IS NULL;
CREATE FUNCTION public.research_identity(p_token text) RETURNS uuid LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE v_id uuid;
BEGIN
 IF p_token IS NULL OR p_token !~ '^[a-f0-9]{64}$' THEN RAISE EXCEPTION 'Invalid participant access'; END IF;
 SELECT id INTO v_id FROM public.research_participants WHERE token_hash = encode(sha256(convert_to(p_token, 'UTF8')), 'hex');
 IF v_id IS NULL THEN RAISE EXCEPTION 'Participant not found'; END IF;
 RETURN v_id;
END; $$;
REVOKE ALL ON FUNCTION public.research_identity(text) FROM PUBLIC, anon, authenticated;
CREATE FUNCTION public.research_join(p_name text, p_token text) RETURNS jsonb LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE v_id uuid; v_hash text;
BEGIN
 IF p_name IS NULL OR length(trim(p_name)) NOT BETWEEN 1 AND 60 OR p_token IS NULL OR p_token !~ '^[a-f0-9]{64}$' THEN RAISE EXCEPTION 'Enter a name between 1 and 60 characters'; END IF;
 v_hash := encode(sha256(convert_to(p_token, 'UTF8')), 'hex');
 INSERT INTO public.research_participants(name, token_hash) VALUES(trim(p_name), v_hash) ON CONFLICT(token_hash) DO NOTHING;
 SELECT id INTO v_id FROM public.research_participants WHERE token_hash = v_hash;
 RETURN jsonb_build_object('id', v_id);
END; $$;
CREATE FUNCTION public.research_resume(p_token text) RETURNS jsonb LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE v_id uuid; v_result jsonb;
BEGIN
 v_id := public.research_identity(p_token);
 UPDATE public.research_participants SET last_active_at = now() WHERE id = v_id;
 SELECT jsonb_build_object('id', p.id, 'name', p.name, 'submissions', COALESCE((SELECT jsonb_agg(jsonb_build_object('id', s.id, 'paper_id', s.paper_id, 'question_id', s.question_id, 'payload', s.payload, 'submitted_at', s.submitted_at, 'reset_at', s.reset_at) ORDER BY s.submitted_at) FROM public.research_submissions s WHERE s.participant_id = v_id), '[]'::jsonb)) INTO v_result FROM public.research_participants p WHERE p.id = v_id;
 RETURN v_result;
END; $$;
CREATE FUNCTION public.research_submit(p_token text, p_attempt_id uuid, p_payload jsonb) RETURNS void LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE v_id uuid; v_paper text; v_question text;
BEGIN
 v_id := public.research_identity(p_token);
 v_paper := p_payload->>'paperId'; v_question := p_payload->>'questionId';
 IF v_paper IS DISTINCT FROM 'test_linear_inequalities_pre' OR v_question IS NULL OR v_question !~ '^test_lin_ineq_pre_q[1-9]$' OR jsonb_typeof(p_payload->'submittedAnswers') IS DISTINCT FROM 'object' OR octet_length(p_payload::text) > 200000 THEN RAISE EXCEPTION 'Invalid practice submission'; END IF;
 IF EXISTS (SELECT 1 FROM public.research_submissions WHERE id = p_attempt_id AND participant_id = v_id) THEN RETURN; END IF;
 INSERT INTO public.research_submissions(id, participant_id, paper_id, question_id, payload) VALUES(p_attempt_id, v_id, v_paper, v_question, p_payload);
 UPDATE public.research_participants SET last_active_at = now() WHERE id = v_id;
END; $$;
CREATE FUNCTION public.research_reset(p_token text, p_question_id text) RETURNS void LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE v_id uuid;
BEGIN
 v_id := public.research_identity(p_token);
 UPDATE public.research_submissions SET reset_at = now() WHERE participant_id = v_id AND question_id = p_question_id AND reset_at IS NULL;
END; $$;
REVOKE ALL ON FUNCTION public.research_join(text,text), public.research_resume(text), public.research_submit(text,uuid,jsonb), public.research_reset(text,text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.research_join(text,text), public.research_resume(text), public.research_submit(text,uuid,jsonb), public.research_reset(text,text) TO anon, authenticated, service_role;