
CREATE TABLE public.question_overrides (
  paper_id text NOT NULL,
  question_id text NOT NULL,
  override jsonb NOT NULL DEFAULT '{}'::jsonb,
  diagram_image_url text,
  updated_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (paper_id, question_id)
);

GRANT SELECT ON public.question_overrides TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.question_overrides TO authenticated;
GRANT ALL ON public.question_overrides TO service_role;

ALTER TABLE public.question_overrides ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read question overrides"
  ON public.question_overrides FOR SELECT
  USING (true);

CREATE POLICY "Admins can insert question overrides"
  ON public.question_overrides FOR INSERT
  TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update question overrides"
  ON public.question_overrides FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete question overrides"
  ON public.question_overrides FOR DELETE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE OR REPLACE FUNCTION public.update_question_overrides_updated_at()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER question_overrides_set_updated_at
BEFORE UPDATE ON public.question_overrides
FOR EACH ROW EXECUTE FUNCTION public.update_question_overrides_updated_at();
