import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';

export function useStudentAssignments() {
  const { user } = useAuth();

  const courses = useQuery({
    queryKey: ['student-assignments', user?.id],
    enabled: !!user,
    queryFn: async () => {
      const { data } = await supabase
        .from('student_assignments')
        .select('course_id')
        .eq('student_id', user!.id);
      return (data || []).map(r => r.course_id);
    },
  });

  const chapters = useQuery({
    queryKey: ['student-chapter-assignments', user?.id],
    enabled: !!user,
    queryFn: async () => {
      const { data } = await supabase
        .from('student_chapter_assign')
        .select('course_id, chapter_id')
        .eq('student_id', user!.id);
      return data || [];
    },
  });

  const papers = useQuery({
    queryKey: ['student-paper-assignments', user?.id],
    enabled: !!user,
    queryFn: async () => {
      const { data } = await supabase
        .from('student_paper_assignments')
        .select('paper_id, hint_count, checkwork_count')
        .eq('student_id', user!.id);
      return data || [];
    },
  });

  const isCourseAssigned = (courseId: string) => {
    if (!courses.data) return false;
    return courses.data.includes(courseId);
  };

  const isChapterAssigned = (courseId: string, chapterId: string) => {
    if (!chapters.data) return false;
    return chapters.data.some(c => c.course_id === courseId && c.chapter_id === chapterId);
  };

  const isPaperAssigned = (paperId: string) => {
    if (!papers.data) return false;
    return papers.data.some(p => p.paper_id === paperId);
  };

  const getPaperQuota = (paperId: string) => {
    const p = papers.data?.find(r => r.paper_id === paperId);
    return p ? { hints: p.hint_count, checkwork: p.checkwork_count } : null;
  };

  return {
    assignedCourses: courses.data || [],
    isCourseAssigned,
    isChapterAssigned,
    isPaperAssigned,
    getPaperQuota,
    papers: papers.data || [],
    loading: courses.isLoading || chapters.isLoading || papers.isLoading,
    refetch: () => {
      courses.refetch();
      chapters.refetch();
      papers.refetch();
    },
  };
}
