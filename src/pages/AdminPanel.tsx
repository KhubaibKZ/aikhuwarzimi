import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
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
import { ArrowLeft, Users, BookOpen, FileText, Search, Settings, Save, Loader2, Moon, Sun, Trash2, History, Clock } from 'lucide-react';

interface Profile {
  id: string;
  email: string;
  full_name: string;
  created_at: string;
}

interface UsageSession {
  id: string;
  user_id: string | null;
  display_name: string | null;
  email: string | null;
  account_type: string;
  started_at: string;
  last_active_at: string;
  duration_seconds: number;
}

function fmtDuration(secs: number) {
  if (secs < 60) return `${secs}s`;
  const h = Math.floor(secs / 3600);
  const m = Math.floor((secs % 3600) / 60);
  const s = secs % 60;
  if (h > 0) return `${h}h ${m}m`;
  return `${m}m ${s}s`;
}


// Helper to call the admin-api edge function
async function adminApi(action: string, params: Record<string, unknown> = {}) {
  const { data, error } = await supabase.functions.invoke('admin-api', {
    body: { action, ...params },
  });
  if (error) throw error;
  return data;
}

export default function AdminPanel() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isDark, setIsDark] = useState(() => document.documentElement.classList.contains('dark'));

  const [students, setStudents] = useState<Profile[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loadingStudents, setLoadingStudents] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const [selectedStudent, setSelectedStudent] = useState<Profile | null>(null);
  const [saving, setSaving] = useState(false);

  const [assignedCourses, setAssignedCourses] = useState<Set<string>>(new Set());
  const [assignedChapters, setAssignedChapters] = useState<Set<string>>(new Set());
  const [assignedPapers, setAssignedPapers] = useState<Map<string, { hints: number; checkwork: number }>>(new Map());

  const [defaultHints, setDefaultHints] = useState(3);
  const [defaultCheckwork, setDefaultCheckwork] = useState(3);

  const [sessions, setSessions] = useState<UsageSession[]>([]);
  const [loadingSessions, setLoadingSessions] = useState(false);

  useEffect(() => {
    loadStudents();
    loadSessions();
  }, []);

  const loadSessions = async () => {
    setLoadingSessions(true);
    try {
      const { data, error } = await supabase
        .from('usage_sessions')
        .select('*')
        .order('started_at', { ascending: false })
        .limit(500);
      if (error) throw error;
      setSessions((data as UsageSession[]) || []);
    } catch (err) {
      console.error('Failed to load usage sessions:', err);
    } finally {
      setLoadingSessions(false);
    }
  };


  const loadStudents = async () => {
    setLoadingStudents(true);
    try {
      const res = await adminApi('list_students');
      setStudents(res.data || []);
    } catch (err) {
      console.error('Failed to load students:', err);
      toast({ title: 'Error', description: 'Failed to load students', variant: 'destructive' });
    } finally {
      setLoadingStudents(false);
    }
  };

  const loadStudentAssignments = async (studentId: string) => {
    try {
      const res = await adminApi('get_assignments', { student_id: studentId });
      setAssignedCourses(new Set((res.courses || []).map((r: any) => r.course_id)));
      setAssignedChapters(new Set((res.chapters || []).map((r: any) => `${r.course_id}::${r.chapter_id}`)));
      const paperMap = new Map<string, { hints: number; checkwork: number }>();
      (res.papers || []).forEach((r: any) => paperMap.set(r.paper_id, { hints: r.hint_count, checkwork: r.checkwork_count }));
      setAssignedPapers(paperMap);
    } catch (err) {
      console.error('Failed to load assignments:', err);
    }
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
    if (!selectedStudent) return;
    setSaving(true);
    try {
      await adminApi('save_assignments', {
        student_id: selectedStudent.id,
        courses: [...assignedCourses],
        chapters: [...assignedChapters].map(key => {
          const [course_id, chapter_id] = key.split('::');
          return { course_id, chapter_id };
        }),
        papers: [...assignedPapers.entries()].map(([paper_id, quota]) => ({
          paper_id,
          hint_count: quota.hints,
          checkwork_count: quota.checkwork,
        })),
      });
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
    if (deletingId) return;
    setDeletingId(studentId);
    try {
      await adminApi('delete_student', { user_id: studentId });
      toast({ title: 'Deleted', description: 'Student account removed.' });
      setStudents(prev => prev.filter(s => s.id !== studentId));
      if (selectedStudent?.id === studentId) setSelectedStudent(null);
    } catch (err) {
      toast({ title: 'Error', description: 'Failed to delete account', variant: 'destructive' });
    } finally {
      setDeletingId(null);
    }
  };

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
            <Button variant="ghost" size="icon" onClick={() => navigate('/')} className="h-9 w-9 rounded-lg">
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-glow">
              <Settings className="h-5 w-5" />
            </div>
            <div className="flex flex-col">
              <h1 className="text-lg font-bold text-foreground">Super Admin</h1>
              <p className="text-xs text-muted-foreground">Manage Students, Assignments & Usage</p>

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
        <Tabs defaultValue="students" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="students" className="gap-1.5"><Users className="h-3.5 w-3.5" /> Students</TabsTrigger>
            <TabsTrigger value="usage" className="gap-1.5"><History className="h-3.5 w-3.5" /> Usage History</TabsTrigger>
          </TabsList>

          <TabsContent value="students">
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
                      <div className="flex items-center justify-end gap-2">
                        <Button size="sm" variant="outline" onClick={() => openStudentModal(student)}>
                          Manage
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button size="sm" variant="destructive" className="h-8 w-8 p-0">
                              <Trash2 className="h-3.5 w-3.5" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Delete Student Account</AlertDialogTitle>
                              <AlertDialogDescription>
                                This will permanently delete <strong>{student.full_name || student.email}</strong>'s account and all their data.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction onClick={() => deleteStudent(student.id)} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
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
          </TabsContent>

          <TabsContent value="usage">
            <p className="text-xs text-muted-foreground mb-3">
              Sessions for logged-in students and demo visitors — who used the app, when, and for how long.
            </p>
            {loadingSessions ? (
              <div className="flex items-center justify-center py-20">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : (
              <div className="rounded-xl border border-border bg-card">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead className="hidden sm:table-cell">Started</TableHead>
                      <TableHead className="hidden md:table-cell">Last active</TableHead>
                      <TableHead className="text-right">Time spent</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sessions.map(s => (
                      <TableRow key={s.id}>
                        <TableCell>
                          <p className="font-medium text-foreground text-sm">{s.display_name || 'Unknown'}</p>
                          {s.email && <p className="text-xs text-muted-foreground">{s.email}</p>}
                        </TableCell>
                        <TableCell>
                          <Badge variant={s.account_type === 'demo' ? 'secondary' : 'default'} className="text-[10px]">
                            {s.account_type === 'demo' ? 'Demo' : 'Student'}
                          </Badge>
                        </TableCell>
                        <TableCell className="hidden sm:table-cell text-xs text-muted-foreground">
                          {new Date(s.started_at).toLocaleString()}
                        </TableCell>
                        <TableCell className="hidden md:table-cell text-xs text-muted-foreground">
                          {new Date(s.last_active_at).toLocaleString()}
                        </TableCell>
                        <TableCell className="text-right text-xs font-medium text-foreground">
                          <span className="inline-flex items-center gap-1 justify-end">
                            <Clock className="h-3 w-3 text-muted-foreground" />
                            {fmtDuration(s.duration_seconds)}
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}
                    {sessions.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">No usage recorded yet</TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            )}
          </TabsContent>
        </Tabs>
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
