
REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.decrement_hint(uuid, text) FROM PUBLIC, anon;
REVOKE EXECUTE ON FUNCTION public.decrement_checkwork(uuid, text) FROM PUBLIC, anon;
