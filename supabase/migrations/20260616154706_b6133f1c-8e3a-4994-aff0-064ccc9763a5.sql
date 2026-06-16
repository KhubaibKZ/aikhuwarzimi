
-- Revoke public/anon execute on SECURITY DEFINER functions that shouldn't be callable anonymously.
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, app_role) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, app_role) TO authenticated, service_role;

REVOKE EXECUTE ON FUNCTION public.decrement_hint(uuid, text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.decrement_hint(uuid, text) TO authenticated, service_role;

REVOKE EXECUTE ON FUNCTION public.decrement_checkwork(uuid, text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.decrement_checkwork(uuid, text) TO authenticated, service_role;

REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.handle_new_user() TO service_role;

REVOKE EXECUTE ON FUNCTION public.update_question_overrides_updated_at() FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.update_question_overrides_updated_at() TO service_role;
-- update_demo_session intentionally remains callable by anon (demo sessions are unauthenticated by design).
