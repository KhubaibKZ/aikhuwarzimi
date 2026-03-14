
-- 1. Create app_role enum
CREATE TYPE public.app_role AS ENUM ('admin', 'student');

-- 2. Create profiles table
CREATE TABLE public.profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text,
  full_name text,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- 3. Create user_roles table
CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  UNIQUE (user_id, role)
);
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- 4. Create student_assignments table
CREATE TABLE public.student_assignments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id uuid NOT NULL,
  course_id text NOT NULL,
  assigned_by uuid,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (student_id, course_id)
);
ALTER TABLE public.student_assignments ENABLE ROW LEVEL SECURITY;

-- 5. Create student_chapter_assign table
CREATE TABLE public.student_chapter_assign (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id uuid NOT NULL,
  course_id text NOT NULL,
  chapter_id text NOT NULL,
  assigned_by uuid,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (student_id, course_id, chapter_id)
);
ALTER TABLE public.student_chapter_assign ENABLE ROW LEVEL SECURITY;

-- 6. Create student_paper_assignments table
CREATE TABLE public.student_paper_assignments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id uuid NOT NULL,
  paper_id text NOT NULL,
  hint_count integer NOT NULL DEFAULT 3,
  checkwork_count integer NOT NULL DEFAULT 3,
  assigned_by uuid,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (student_id, paper_id)
);
ALTER TABLE public.student_paper_assignments ENABLE ROW LEVEL SECURITY;

-- 7. Security definer function for role checking
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- 8. Trigger to auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (NEW.id, NEW.email, COALESCE(NEW.raw_user_meta_data->>'full_name', ''));
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 9. RPC to decrement hint count
CREATE OR REPLACE FUNCTION public.decrement_hint(p_student_id uuid, p_paper_id text)
RETURNS integer
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  remaining integer;
BEGIN
  UPDATE public.student_paper_assignments
  SET hint_count = hint_count - 1
  WHERE student_id = p_student_id AND paper_id = p_paper_id AND hint_count > 0
  RETURNING hint_count INTO remaining;
  IF remaining IS NULL THEN
    RETURN -1;
  END IF;
  RETURN remaining;
END;
$$;

-- 10. RPC to decrement checkwork count
CREATE OR REPLACE FUNCTION public.decrement_checkwork(p_student_id uuid, p_paper_id text)
RETURNS integer
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  remaining integer;
BEGIN
  UPDATE public.student_paper_assignments
  SET checkwork_count = checkwork_count - 1
  WHERE student_id = p_student_id AND paper_id = p_paper_id AND checkwork_count > 0
  RETURNING checkwork_count INTO remaining;
  IF remaining IS NULL THEN
    RETURN -1;
  END IF;
  RETURN remaining;
END;
$$;

-- 11. RLS Policies

-- profiles: users read own, admins read all
CREATE POLICY "Users can read own profile" ON public.profiles
  FOR SELECT TO authenticated
  USING (id = auth.uid());

CREATE POLICY "Admins can read all profiles" ON public.profiles
  FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE TO authenticated
  USING (id = auth.uid());

-- user_roles: users read own, admins read all
CREATE POLICY "Users can read own role" ON public.user_roles
  FOR SELECT TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Admins can read all roles" ON public.user_roles
  FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can manage roles" ON public.user_roles
  FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- student_assignments: students read own, admins full CRUD
CREATE POLICY "Students read own assignments" ON public.student_assignments
  FOR SELECT TO authenticated
  USING (student_id = auth.uid());

CREATE POLICY "Admins manage assignments" ON public.student_assignments
  FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- student_chapter_assign: students read own, admins full CRUD
CREATE POLICY "Students read own chapter assignments" ON public.student_chapter_assign
  FOR SELECT TO authenticated
  USING (student_id = auth.uid());

CREATE POLICY "Admins manage chapter assignments" ON public.student_chapter_assign
  FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- student_paper_assignments: students read own, admins full CRUD
CREATE POLICY "Students read own paper assignments" ON public.student_paper_assignments
  FOR SELECT TO authenticated
  USING (student_id = auth.uid());

CREATE POLICY "Admins manage paper assignments" ON public.student_paper_assignments
  FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));
