
CREATE POLICY "Public read question-diagrams"
ON storage.objects FOR SELECT
USING (bucket_id = 'question-diagrams');

CREATE POLICY "Admins upload question-diagrams"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'question-diagrams' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins update question-diagrams"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'question-diagrams' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins delete question-diagrams"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'question-diagrams' AND public.has_role(auth.uid(), 'admin'));
