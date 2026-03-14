import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useAdminRole } from '@/hooks/useAdminRole';
import { useNavigate } from 'react-router-dom';
import { courses } from '@/lib/courseData';
import { pastPapers } from '@/lib/pastPaperData';
import { igcseMathsSyllabus } from '@/lib/syllabusData';
import { olevelMathsSyllabus } from '@/lib/olevelSyllabusData';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { ArrowLeft, Users, BookOpen, FileText, Search, Settings, Save, Loader2, Moon, Sun, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Profile {
  id: string;
  email: string;
  full_name: string;
  created_at: string;
}

interface StudentAssignment {
  course_id: string;
}
interface StudentChapterAssignment {
  course_id: string;
  chapter_id: string;
}
interface StudentPaperAssignment {
  paper_id: string;
  hint_count: number;
  checkwork_count: number;
}

export default function AdminPanel() {
  const { user, loading: authLoading } = useAuth();
  const { isAdmin, loading: roleLoading } = useAdminRole();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isDark, setIsDark] = useState(() => document.documentElement.classList.contains('dark'));

  const [students, setStudents] = useState<Profile[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loadingStudents, setLoadingStudents] = useState(true);

  // Student management modal
  const [selectedStudent, setSelectedStudent] = useState<Profile | null>(null);
  const [saving, setSaving] = useState(false);

  // Assignments state for selected student
  const [assignedCourses, setAssignedCourses] = useState<Set<string>>(new Set());
  const [assignedChapters, setAssignedChapters] = useState<Set<string>>(new Set());
  const [assignedPapers, setAssignedPapers] = useState<Map<string, { hints: number; checkwork: number }>>(new Map());

  // Default quota values for new paper assignments
  const [defaultHints, setDefaultHints] = useState(3);
  const [defaultCheckwork, setDefaultCheckwork] = useState(3);

  useEffect(() => {
    if (isAdmin) loadStudents();
  }, [isAdmin]);

  const loadStudents = async () => {
    setLoadingStudents(true);
    const { data } = await supabase.from('profiles').select('*').order('created_at', { ascending: false });
    setStudents(data || []);
    setLoadingStudents(false);
  };

  const loadStudentAssignments = async (studentId: string) => {
    const [courseRes, chapterRes, paperRes] = await Promise.all([
      supabase.from('student_assignments').select('course_id').eq('student_id', studentId),
      supabase.from('student_chapter_assign').select('course_id, chapter_id').eq('student_id', studentId),
      supabase.from('student_paper_assignments').select('paper_id, hint_count, checkwork_count').eq('student_id', studentId),
    ]);

    setAssignedCourses(new Set((courseRes.data || []).map(r => r.course_id)));
    setAssignedChapters(new Set((chapterRes.data || []).map(r => `${r.course_id}::${r.chapter_id}`)));
    const paperMap = new Map<string, { hints: number; checkwork: number }>();
    (paperRes.data || []).forEach(r => paperMap.set(r.paper_id, { hints: r.hint_count, checkwork: r.checkwork_count }));
    setAssignedPapers(paperMap);
  };

  const openStudentModal = async (student: Profile) => {
    setSelectedStudent(student);
    await loadStudentAssignments(student.id);
  };

  const toggleCourse = (courseId: string) => {
    setAssignedCourses(prev => {
      const next = new Set(prev);
      if (next.has(courseId)) next.delete(courseId);
      else next.add(courseId);
      return next;
    });
  };

  const toggleChapter = (courseId: string, chapterId: string) => {
    const key = `${courseId}::${chapterId}`;
    setAssignedChapters(prev => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  const togglePaper = (paperId: string) => {
    setAssignedPapers(prev => {
      const next = new Map(prev);
      if (next.has(paperId)) next.delete(paperId);
      else next.set(paperId, { hints: defaultHints, checkwork: defaultCheckwork });
      return next;
    });
  };

  const updatePaperQuota = (paperId: string, field: 'hints' | 'checkwork', value: number) => {
    setAssignedPapers(prev => {
      const next = new Map(prev);
      const current = next.get(paperId) || { hints: defaultHints, checkwork: defaultCheckwork };
      next.set(paperId, { ...current, [field]: value });
      return next;
    });
  };

  const saveAssignments = async () => {
    if (!selectedStudent || !user) return;
    setSaving(true);

    try {
      const studentId = selectedStudent.id;

      // Delete existing and re-insert courses
      await supabase.from('student_assignments').delete().eq('student_id', studentId);
      if (assignedCourses.size > 0) {
        await supabase.from('student_assignments').insert(
          [...assignedCourses].map(course_id => ({ student_id: studentId, course_id, assigned_by: user.id }))
        );
      }

      // Delete existing and re-insert chapters
      await supabase.from('student_chapter_assign').delete().eq('student_id', studentId);
      if (assignedChapters.size > 0) {
        await supabase.from('student_chapter_assign').insert(
          [...assignedChapters].map(key => {
            const [course_id, chapter_id] = key.split('::');
            return { student_id: studentId, course_id, chapter_id, assigned_by: user.id };
          })
        );
      }

      // Delete existing and re-insert papers
      await supabase.from('student_paper_assignments').delete().eq('student_id', studentId);
      if (assignedPapers.size > 0) {
        await supabase.from('student_paper_assignments').insert(
          [...assignedPapers.entries()].map(([paper_id, quota]) => ({
            student_id: studentId,
            paper_id,
            hint_count: quota.hints,
            checkwork_count: quota.checkwork,
            assigned_by: user.id,
          }))
        );
      }

      toast({ title: 'Saved', description: `Assignments updated for ${selectedStudent.email}` });
    } catch (err) {
      toast({ title: 'Error', description: 'Failed to save assignments', variant: 'destructive' });
    } finally {
      setSaving(false);
    }
  };

  const toggleTheme = () => {
    document.documentElement.classList.toggle('dark');
    setIsDark(!isDark);
  };

  const deleteStudent = async (studentId: string) => {
    try {
      const { data: sessionData } = await supabase.auth.getSession();
      const token = sessionData?.session?.access_token;
      if (!token) {
        toast({ title: 'Error', description: 'You must be logged in as admin to delete accounts', variant: 'destructive' });
        return;
      }
      const res = await supabase.functions.invoke('delete-user', {
        body: { user_id: studentId },
      });
      if (res.error || res.data?.error) {
        toast({ title: 'Error', description: res.data?.error || res.error?.message || 'Failed to delete', variant: 'destructive' });
        return;
      }
      toast({ title: 'Deleted', description: 'Student account removed.' });
      setStudents(prev => prev.filter(s => s.id !== studentId));
      if (selectedStudent?.id === studentId) setSelectedStudent(null);
    } catch (err) {
      toast({ title: 'Error', description: 'Failed to delete account', variant: 'destructive' });
    }
  };

  if (authLoading || roleLoading) {
    return <div className="min-h-screen bg-background flex items-center justify-center"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>;
  }

  const filteredStudents = students.filter(s =>
    s.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.full_name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getSyllabus = (courseId: string) =>
    courseId === 'olevel-4024' ? olevelMathsSyllabus : igcseMathsSyllabus;

  const getCoursePapers = (courseId: string) =>
    pastPapers.filter(p => p.courseId === courseId && !p.locked);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border bg-card/95 backdrop-blur">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={() => navigate('/dashboard')} className="h-9 w-9 rounded-lg">
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-glow">
              <Settings className="h-5 w-5" />
            </div>
            <div className="flex flex-col">
              <h1 className="text-lg font-bold text-foreground">Admin Panel</h1>
              <p className="text-xs text-muted-foreground">Manage Students & Assignments</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={toggleTheme} className="h-9 w-9 rounded-lg">
              {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
            <Badge variant="secondary" className="hidden sm:flex">
              <Users className="h-3 w-3 mr-1" />
              {students.length} students
            </Badge>
          </div>
        </div>
      </header>

      <main className="container px-4 py-8 md:px-6 max-w-5xl">
        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search students by email or name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Students Table */}
        {loadingStudents ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : (
          <div className="rounded-xl border border-border bg-card">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student</TableHead>
                  <TableHead className="hidden sm:table-cell">Joined</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStudents.map(student => (
                  <TableRow key={student.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium text-foreground text-sm">{student.full_name || 'No name'}</p>
                        <p className="text-xs text-muted-foreground">{student.email}</p>
                      </div>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell text-xs text-muted-foreground">
                      {new Date(student.created_at).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button size="sm" variant="outline" onClick={() => openStudentModal(student)}>
                        Manage
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
                {filteredStudents.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={3} className="text-center py-8 text-muted-foreground">No students found</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        )}
      </main>

      {/* Student Management Modal */}
      <Dialog open={!!selectedStudent} onOpenChange={(open) => !open && setSelectedStudent(null)}>
        <DialogContent className="max-w-3xl max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              {selectedStudent?.full_name || selectedStudent?.email}
            </DialogTitle>
          </DialogHeader>

          <Tabs defaultValue="courses" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-4">
              <TabsTrigger value="courses" className="flex items-center gap-1">
                <BookOpen className="h-3 w-3" />
                Courses
              </TabsTrigger>
              <TabsTrigger value="chapters" className="flex items-center gap-1">
                <BookOpen className="h-3 w-3" />
                Chapters
              </TabsTrigger>
              <TabsTrigger value="papers" className="flex items-center gap-1">
                <FileText className="h-3 w-3" />
                Papers
              </TabsTrigger>
            </TabsList>

            {/* Courses Tab */}
            <TabsContent value="courses" className="space-y-3">
              {courses.map(course => (
                <label key={course.id} className="flex items-center gap-3 p-3 rounded-lg border border-border hover:bg-muted/50 cursor-pointer">
                  <Checkbox
                    checked={assignedCourses.has(course.id)}
                    onCheckedChange={() => toggleCourse(course.id)}
                  />
                  <div>
                    <p className="text-sm font-medium text-foreground">{course.title}</p>
                    <p className="text-xs text-muted-foreground">{course.code}</p>
                  </div>
                </label>
              ))}
            </TabsContent>

            {/* Chapters Tab */}
            <TabsContent value="chapters" className="space-y-4">
              {courses.filter(c => assignedCourses.has(c.id)).map(course => {
                const syllabus = getSyllabus(course.id);
                return (
                  <div key={course.id} className="space-y-2">
                    <h4 className="text-sm font-semibold text-foreground">{course.title}</h4>
                    <div className="space-y-1 ml-2">
                      {syllabus.topics.map(topic => {
                        const chapterKey = `${course.id}::${String(topic.id)}`;
                        return (
                          <label key={topic.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 cursor-pointer">
                            <Checkbox
                              checked={assignedChapters.has(chapterKey)}
                              onCheckedChange={() => toggleChapter(course.id, String(topic.id))}
                            />
                            <span className="text-sm text-foreground">{topic.id}. {topic.title}</span>
                          </label>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
              {assignedCourses.size === 0 && (
                <p className="text-sm text-muted-foreground text-center py-4">Assign courses first to see chapters</p>
              )}
            </TabsContent>

            {/* Papers Tab */}
            <TabsContent value="papers" className="space-y-4">
              <div className="flex items-center gap-4 p-3 rounded-lg bg-muted/50 mb-3">
                <span className="text-xs text-muted-foreground font-medium">Default quotas for new papers:</span>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">Hints:</span>
                  <Input type="number" value={defaultHints} onChange={e => setDefaultHints(Number(e.target.value))} className="w-16 h-7 text-xs" min={0} />
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">Checkwork:</span>
                  <Input type="number" value={defaultCheckwork} onChange={e => setDefaultCheckwork(Number(e.target.value))} className="w-16 h-7 text-xs" min={0} />
                </div>
              </div>

              {courses.filter(c => assignedCourses.has(c.id)).map(course => {
                const papers = getCoursePapers(course.id);
                return (
                  <div key={course.id} className="space-y-2">
                    <h4 className="text-sm font-semibold text-foreground">{course.title}</h4>
                    <div className="space-y-1 ml-2">
                      {papers.map(paper => {
                        const isAssigned = assignedPapers.has(paper.id);
                        const quota = assignedPapers.get(paper.id);
                        return (
                          <div key={paper.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50">
                            <Checkbox
                              checked={isAssigned}
                              onCheckedChange={() => togglePaper(paper.id)}
                            />
                            <span className="text-sm text-foreground flex-1">{paper.code} ({paper.session} {paper.year})</span>
                            {isAssigned && (
                              <div className="flex items-center gap-2">
                                <div className="flex items-center gap-1">
                                  <span className="text-[10px] text-muted-foreground">H:</span>
                                  <Input
                                    type="number"
                                    value={quota?.hints ?? defaultHints}
                                    onChange={e => updatePaperQuota(paper.id, 'hints', Number(e.target.value))}
                                    className="w-14 h-6 text-xs"
                                    min={0}
                                  />
                                </div>
                                <div className="flex items-center gap-1">
                                  <span className="text-[10px] text-muted-foreground">C:</span>
                                  <Input
                                    type="number"
                                    value={quota?.checkwork ?? defaultCheckwork}
                                    onChange={e => updatePaperQuota(paper.id, 'checkwork', Number(e.target.value))}
                                    className="w-14 h-6 text-xs"
                                    min={0}
                                  />
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
              {assignedCourses.size === 0 && (
                <p className="text-sm text-muted-foreground text-center py-4">Assign courses first to see papers</p>
              )}
            </TabsContent>
          </Tabs>

          <div className="flex justify-end pt-4 border-t border-border">
            <Button onClick={saveAssignments} disabled={saving}>
              {saving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Save className="h-4 w-4 mr-2" />}
              Save Assignments
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
