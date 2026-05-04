
-- Audit reports for per-question 5-point inspection
CREATE TYPE public.audit_check_type AS ENUM (
  'question_fidelity',
  'diagram_fidelity',
  'workspace_scaffolding',
  'check_work_coverage',
  'submit_validation'
);

CREATE TYPE public.audit_status AS ENUM ('pending', 'pass', 'warning', 'fail');

CREATE TABLE public.audit_reports (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  paper_id text NOT NULL,
  question_id text NOT NULL,
  check_type public.audit_check_type NOT NULL,
  status public.audit_status NOT NULL DEFAULT 'pending',
  source text NOT NULL DEFAULT 'deterministic',
  notes text,
  findings jsonb DEFAULT '{}'::jsonb,
  audited_by uuid,
  audited_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (paper_id, question_id, check_type, source)
);

CREATE INDEX idx_audit_reports_paper ON public.audit_reports (paper_id);
CREATE INDEX idx_audit_reports_q ON public.audit_reports (paper_id, question_id);

ALTER TABLE public.audit_reports ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can read audit reports"
  ON public.audit_reports FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can insert audit reports"
  ON public.audit_reports FOR INSERT
  TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update audit reports"
  ON public.audit_reports FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete audit reports"
  ON public.audit_reports FOR DELETE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::app_role));
