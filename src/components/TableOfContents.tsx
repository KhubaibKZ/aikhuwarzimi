import { igcseMathsSyllabus, SubTopic, MainTopic, SyllabusData } from '@/lib/syllabusData';
import { olevelMathsSyllabus } from '@/lib/olevelSyllabusData';
import { questionDatabase } from '@/lib/questionData';
import { pastPapers, PastPaperSection, PaperCategory } from '@/lib/pastPaperData';
import { useProgress } from '@/context/ProgressContext';
import { ChevronDown, ChevronRight, Lock, Unlock, CheckCircle2, BookOpen, Calculator, FileText, GraduationCap, ClipboardList, Hash, RotateCcw, Calendar, Lightbulb, CheckSquare } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';
import { useStudentProgress } from '@/hooks/useStudentProgress';
import { useStudentAssignments } from '@/hooks/useStudentAssignments';
import { useAdminRole } from '@/hooks/useAdminRole';

interface TableOfContentsProps {
  courseId: string;
  onSubTopicSelect: (topicId: number, subtopic: SubTopic) => void;
  onPastPaperSelect?: (paperId: string, section: PastPaperSection) => void;
  onTabChange?: (tab: 'syllabus' | 'pastpapers') => void;
}

export function TableOfContents({ courseId, onSubTopicSelect, onPastPaperSelect, onTabChange }: TableOfContentsProps) {
  const [expandedTopic, setExpandedTopic] = useState<number | null>(null);
  const [expandedSubtopic, setExpandedSubtopic] = useState<string | null>(null);
  const [expandedPaper, setExpandedPaper] = useState<string | null>(null);
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [expandedYear, setExpandedYear] = useState<string | null>(null);
  const [resettingPaper, setResettingPaper] = useState<string | null>(null);
  const [expandedSession, setExpandedSession] = useState<string | null>(null);
  const { isCompleted } = useProgress();
  const { user } = useAuth();
  const { isAdmin } = useAdminRole();
  const { isChapterAssigned, isPaperAssigned, getPaperQuota } = useStudentAssignments();
  const queryClient = useQueryClient();
  const { toast } = useToast();
  
  // Use DB-backed progress data for submitted question tracking
  const { data: progressData } = useStudentProgress();
  const submittedQuestionIds = new Set(
    (progressData?.rows || []).map((r: any) => r.question_id)
  );
  const isQuestionSubmitted = (questionId: string) => submittedQuestionIds.has(questionId);

  const handleResetPaper = async (paperId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!user) {
      toast({ title: "Not logged in", description: "Please log in to reset progress.", variant: "destructive" });
      return;
    }
    setResettingPaper(paperId);
    try {
      await supabase
        .from('student_paper_progress')
        .delete()
        .eq('user_id', user.id)
        .eq('paper_id', paperId);
      queryClient.invalidateQueries({ queryKey: ['student-progress'] });
      toast({ title: "Paper Reset", description: "All progress for this paper has been cleared." });
    } catch (err) {
      toast({ title: "Error", description: "Failed to reset paper progress.", variant: "destructive" });
    } finally {
      setResettingPaper(null);
    }
  };

  // Calculate completion percentage for a subtopic
  const getSubtopicProgress = (subtopic: SubTopic) => {
    if (subtopic.questionIds.length === 0) return 0;
    const completed = subtopic.questionIds.filter(id => isCompleted(id)).length;
    return Math.round((completed / subtopic.questionIds.length) * 100);
  };

  // Check if all questions in subtopic are completed
  const isSubtopicComplete = (subtopic: SubTopic) => {
    if (subtopic.questionIds.length === 0) return false;
    return subtopic.questionIds.every(id => isCompleted(id));
  };

  // Calculate topic progress
  const getTopicProgress = (topic: MainTopic) => {
    const allQuestions = topic.subtopics.flatMap(s => s.questionIds);
    if (allQuestions.length === 0) return 0;
    const completed = allQuestions.filter(id => isCompleted(id)).length;
    return Math.round((completed / allQuestions.length) * 100);
  };

  return (
    <Tabs defaultValue="syllabus" className="w-full" onValueChange={(v) => onTabChange?.(v as 'syllabus' | 'pastpapers')}>
      <TabsList className="grid w-full grid-cols-2 mb-4">
        <TabsTrigger value="syllabus" className="flex items-center gap-2">
          <BookOpen className="h-4 w-4" />
          Syllabus
        </TabsTrigger>
        <TabsTrigger value="pastpapers" className="flex items-center gap-2">
          <ClipboardList className="h-4 w-4" />
          Past Papers
        </TabsTrigger>
      </TabsList>

      <TabsContent value="syllabus" className="space-y-3">
        {(() => {
          const syllabus = courseId === 'olevel-4024' ? olevelMathsSyllabus : igcseMathsSyllabus;
          return (
            <>
              <h2 className="mb-4 text-xl font-bold text-foreground">{syllabus.courseName}</h2>
              {syllabus.topics.map((topic, index) => {
          const topicProgress = getTopicProgress(topic);
          const chapterAssigned = isChapterAssigned(courseId, String(topic.id));
          const hasUnlockedSubtopics = chapterAssigned && topic.subtopics.some(s => !s.locked);
          
          return (
            <div
              key={topic.id}
              className={cn(
                "rounded-xl border border-border bg-card overflow-hidden transition-all duration-300 animate-slide-up"
              )}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              {/* Main Topic Header */}
              <button
                onClick={() => chapterAssigned && setExpandedTopic(expandedTopic === topic.id ? null : topic.id)}
                className={cn("flex w-full items-center justify-between p-4 text-left transition-colors", chapterAssigned ? "hover:bg-muted/50" : "opacity-60 cursor-not-allowed")}
              >
                <div className="flex items-center gap-3">
                  <div className={cn(
                    "flex h-10 w-10 items-center justify-center rounded-lg text-sm font-bold",
                    hasUnlockedSubtopics 
                      ? "bg-primary text-primary-foreground" 
                      : "bg-muted text-muted-foreground"
                  )}>
                    {topic.id}
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{topic.title}</h3>
                    <p className="text-xs text-muted-foreground">
                      {topic.subtopics.length} subtopics • {topicProgress}% complete
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  {topicProgress === 100 ? (
                    <span className="flex items-center gap-1 rounded-full bg-success/10 px-2 py-1 text-xs text-success">
                      <CheckCircle2 className="h-3 w-3" />
                      Complete
                    </span>
                  ) : topicProgress > 0 ? (
                    <span className="flex items-center gap-1 rounded-full bg-primary/10 px-2 py-1 text-xs text-primary">
                      {topicProgress}%
                    </span>
                  ) : null}
                  
                  {expandedTopic === topic.id 
                    ? <ChevronDown className="h-5 w-5 text-muted-foreground" />
                    : <ChevronRight className="h-5 w-5 text-muted-foreground" />
                  }
                </div>
              </button>

              {/* Subtopics List */}
              {expandedTopic === topic.id && (
                <div className="border-t border-border bg-muted/30 p-2">
                  {topic.subtopics.map((subtopic) => {
                    const progress = getSubtopicProgress(subtopic);
                    const complete = isSubtopicComplete(subtopic);
                    const isExpanded = expandedSubtopic === subtopic.id;
                    
                    return (
                      <div key={subtopic.id} className="mb-1">
                        {/* Subtopic Header */}
                        <button
                          onClick={() => {
                            if (!subtopic.locked) {
                              setExpandedSubtopic(isExpanded ? null : subtopic.id);
                            }
                          }}
                          disabled={subtopic.locked}
                          className={cn(
                            "flex w-full items-center gap-3 rounded-lg p-3 text-left transition-all",
                            subtopic.locked 
                              ? "opacity-50 cursor-not-allowed" 
                              : "hover:bg-card hover:shadow-sm"
                          )}
                        >
                          <div className={cn(
                            "flex h-8 w-8 items-center justify-center rounded-lg text-xs font-medium",
                            complete ? "bg-success/10 text-success" : 
                            subtopic.locked ? "bg-muted text-muted-foreground" :
                            "bg-secondary text-secondary-foreground"
                          )}>
                            {subtopic.locked ? <Lock className="h-3 w-3" /> : 
                             complete ? <CheckCircle2 className="h-4 w-4" /> : 
                             <span>{subtopic.code}</span>}
                          </div>
                          <div className="flex-1">
                            <span className={cn(
                              "text-sm font-medium",
                              complete ? "text-success" : 
                              subtopic.locked ? "text-muted-foreground" : 
                              "text-foreground"
                            )}>
                              {subtopic.code} {subtopic.title}
                            </span>
                            {!subtopic.locked && subtopic.questionIds.length > 0 && (
                              <p className="text-xs text-muted-foreground mt-0.5">
                                {subtopic.questionIds.length} questions • {progress}% complete
                              </p>
                            )}
                            {subtopic.locked && (
                              <p className="text-xs text-muted-foreground mt-0.5">
                                Coming soon
                              </p>
                            )}
                          </div>
                          {!subtopic.locked && subtopic.questionIds.length > 0 && (
                            isExpanded 
                              ? <ChevronDown className="h-4 w-4 text-muted-foreground" />
                              : <ChevronRight className="h-4 w-4 text-muted-foreground" />
                          )}
                        </button>

                        {/* Questions within Subtopic */}
                        {isExpanded && !subtopic.locked && subtopic.questionIds.length > 0 && (
                          <div className="ml-11 pl-3 border-l-2 border-border space-y-1 mt-1 mb-2">
                            {subtopic.questionIds.map((questionId) => {
                              const question = questionDatabase[questionId];
                              if (!question) return null;
                              const questionComplete = isCompleted(questionId);
                              
                              return (
                                <button
                                  key={questionId}
                                  onClick={() => onSubTopicSelect(topic.id, subtopic)}
                                  className="flex w-full items-center gap-2 rounded-lg p-2 text-left transition-all hover:bg-card hover:shadow-sm"
                                >
                                  <div className={cn(
                                    "flex h-6 w-6 items-center justify-center rounded",
                                    questionComplete ? "bg-success/10 text-success" : "bg-secondary/50 text-secondary-foreground"
                                  )}>
                                    {questionComplete ? <CheckCircle2 className="h-3 w-3" /> : <Calculator className="h-3 w-3" />}
                                  </div>
                                  <span className={cn(
                                    "text-xs font-medium",
                                    questionComplete ? "text-success" : "text-foreground"
                                  )}>
                                    {question.title}
                                  </span>
                                </button>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
            </>
          );
        })()}
      </TabsContent>

      <TabsContent value="pastpapers" className="space-y-5">
        <h2 className="mb-4 text-xl font-bold text-foreground">Past Papers</h2>
        
        {(() => {
          const categories: PaperCategory[] = courseId === 'olevel-4024'
            ? ['Paper 1', 'Paper 2']
            : ['Paper 01 (CORE)', 'Paper 02 (EXTENDED)', 'Paper 03 (CORE)', 'Paper 04 (EXTENDED)'];
          const coursePapers = pastPapers.filter(p => p.courseId === courseId);
          
          if (coursePapers.length === 0) {
            return (
              <div className="text-center py-12 text-muted-foreground">
                <ClipboardList className="h-12 w-12 mx-auto mb-3 opacity-40" />
                <p className="font-medium">No papers added yet</p>
                <p className="text-sm mt-1">Papers will appear here once they are uploaded and processed.</p>
              </div>
            );
          }
          
          return categories.map((category) => {
            const categoryPapers = coursePapers.filter(p => p.category === category);
            if (categoryPapers.length === 0) return null;

            // Group by year descending
            const years = [...new Set(categoryPapers.map(p => p.year))].sort((a, b) => b - a);
            const isCatExpanded = expandedCategory === category;
          
          return (
            <div key={category} className="rounded-xl border border-border bg-card overflow-hidden">
              {/* Level 1: Category */}
              <button
                onClick={() => setExpandedCategory(isCatExpanded ? null : category)}
                className="flex w-full items-center justify-between p-4 text-left transition-colors hover:bg-muted/50"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                    <BookOpen className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{category}</h3>
                    <p className="text-xs text-muted-foreground">
                      {categoryPapers.length} paper{categoryPapers.length !== 1 ? 's' : ''} • {years.length} year{years.length !== 1 ? 's' : ''}
                    </p>
                  </div>
                </div>
                {isCatExpanded 
                  ? <ChevronDown className="h-5 w-5 text-muted-foreground" />
                  : <ChevronRight className="h-5 w-5 text-muted-foreground" />
                }
              </button>

              {isCatExpanded && (
                <div className="border-t border-border bg-muted/30 p-2 space-y-1">
                  {years.map((year) => {
                    const yearPapers = categoryPapers.filter(p => p.year === year);
                    const yearKey = `${category}-${year}`;
                    const isYearExpanded = expandedYear === yearKey;

                    // Group by session
                    const sessions = [...new Set(yearPapers.map(p => p.session))];

                    return (
                      <div key={yearKey} className="rounded-lg overflow-hidden">
                        {/* Level 2: Year */}
                        <button
                          onClick={() => setExpandedYear(isYearExpanded ? null : yearKey)}
                          className="flex w-full items-center justify-between p-3 text-left transition-colors hover:bg-card rounded-lg"
                        >
                          <div className="flex items-center gap-3">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-secondary text-secondary-foreground">
                              <Calendar className="h-4 w-4" />
                            </div>
                            <div>
                              <span className="text-sm font-semibold text-foreground">{year}</span>
                            </div>
                          </div>
                          {isYearExpanded 
                            ? <ChevronDown className="h-4 w-4 text-muted-foreground" />
                            : <ChevronRight className="h-4 w-4 text-muted-foreground" />
                          }
                        </button>

                        {isYearExpanded && (
                          <div className="ml-5 pl-3 border-l-2 border-border space-y-1 mt-1 mb-2">
                            {sessions.map((session) => {
                              const sessionPapers = yearPapers.filter(p => p.session === session);
                              const sessionKey = `${yearKey}-${session}`;
                              const isSessionExpanded = expandedSession === sessionKey;

                              return (
                                <div key={session}>
                                  <button
                                    onClick={() => setExpandedSession(isSessionExpanded ? null : sessionKey)}
                                    className="flex w-full items-center justify-between p-2 text-left transition-colors hover:bg-card rounded-lg"
                                  >
                                    <div className="flex items-center gap-2">
                                      {isSessionExpanded ? <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" /> : <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" />}
                                      <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{session}</span>
                                    </div>
                                    <span className="text-[10px] text-muted-foreground">{sessionPapers.length} paper{sessionPapers.length !== 1 ? 's' : ''}</span>
                                  </button>
                                  {isSessionExpanded && sessionPapers.map((paper) => {
                                    const paperAssigned = isPaperAssigned(paper.id);
                                    const paperLocked = paper.locked || !paperAssigned;
                                    const quota = getPaperQuota(paper.id);
                                    return (
                                    <div key={paper.id} className={cn("rounded-lg overflow-hidden", paperLocked && "opacity-60")}>
                                      {/* Level 3: Individual Paper */}
                                      <button
                                        onClick={() => !paperLocked && setExpandedPaper(expandedPaper === paper.id ? null : paper.id)}
                                        className={cn(
                                          "flex w-full items-center justify-between p-3 text-left transition-colors rounded-lg",
                                          paperLocked ? "cursor-not-allowed" : "hover:bg-card hover:shadow-sm"
                                        )}
                                        disabled={paperLocked}
                                      >
                                        <div className="flex items-center gap-3">
                                          <div className={cn(
                                            "flex h-8 w-8 items-center justify-center rounded-lg",
                                            paperLocked ? "bg-muted text-muted-foreground" : "bg-primary/10 text-primary"
                                          )}>
                                            {paperLocked ? <Lock className="h-4 w-4" /> : <GraduationCap className="h-4 w-4" />}
                                          </div>
                                          <div>
                                            <span className={cn(
                                              "text-sm font-medium",
                                              paperLocked ? "text-muted-foreground" : "text-foreground"
                                            )}>{paper.code}</span>
                                            <p className="text-xs text-muted-foreground">
                                              {paper.totalMarks} marks • {paper.duration}
                                            </p>
                                            {quota && !paperLocked && (
                                              <div className="flex items-center gap-2 mt-0.5">
                                                <span className="text-[10px] text-muted-foreground flex items-center gap-0.5">
                                                  <Lightbulb className="h-2.5 w-2.5" /> {quota.hints} hints
                                                </span>
                                                <span className="text-[10px] text-muted-foreground flex items-center gap-0.5">
                                                  <CheckSquare className="h-2.5 w-2.5" /> {quota.checkwork} checks
                                                </span>
                                              </div>
                                            )}
                                          </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                          {paperLocked ? (
                                            <span className="rounded-full bg-muted px-2 py-1 text-xs text-muted-foreground font-medium">{paper.locked ? 'Coming Soon' : 'Not Assigned'}</span>
                                          ) : (
                                            <>
                                              <span className="rounded-full bg-primary/10 px-2 py-1 text-xs text-primary font-medium">
                                                {paper.sections.length} Qs
                                              </span>
                                              {expandedPaper === paper.id 
                                                ? <ChevronDown className="h-4 w-4 text-muted-foreground" />
                                                : <ChevronRight className="h-4 w-4 text-muted-foreground" />
                                              }
                                            </>
                                          )}
                                        </div>
                                      </button>

                                      {/* Questions list */}
                                      {!paperLocked && expandedPaper === paper.id && (
                                        <div className="ml-5 pl-3 border-l-2 border-border space-y-1 mt-1 mb-2">
                                          {paper.sections.map((section) => {
                                            const completed = isQuestionSubmitted(section.questionId) || isCompleted(section.questionId);
                                            return (
                                              <button
                                                key={section.id}
                                                onClick={() => onPastPaperSelect?.(paper.id, section)}
                                                className="flex w-full items-center gap-3 rounded-lg p-2.5 text-left transition-all hover:bg-card hover:shadow-sm"
                                              >
                                                <div className={cn(
                                                  "flex h-7 w-7 items-center justify-center rounded-lg",
                                                  completed ? "bg-success/10 text-success" : "bg-secondary text-secondary-foreground"
                                                )}>
                                                  {completed ? <CheckCircle2 className="h-3.5 w-3.5" /> : <FileText className="h-3.5 w-3.5" />}
                                                </div>
                                                <div className="flex-1">
                                                  <span className={cn("text-xs font-medium", completed ? "text-success" : "text-foreground")}>
                                                    {section.title}
                                                  </span>
                                                  {completed && <p className="text-[10px] text-success">Recorded</p>}
                                                </div>
                                                {completed ? (
                                                  <Badge variant="outline" className="text-[10px] border-success/30 text-success bg-success/5">Recorded</Badge>
                                                ) : (
                                                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                                                )}
                                              </button>
                                            );
                                          })}
                                          <div className="border-t border-border mt-2 pt-2 px-1">
                                            <Button
                                              variant="ghost"
                                              size="sm"
                                              onClick={(e) => handleResetPaper(paper.id, e)}
                                              disabled={resettingPaper === paper.id}
                                              className="w-full text-destructive hover:text-destructive hover:bg-destructive/10"
                                            >
                                              <RotateCcw className={cn("h-4 w-4 mr-2", resettingPaper === paper.id && "animate-spin")} />
                                              {resettingPaper === paper.id ? 'Resetting...' : 'Reset Paper Progress'}
                                            </Button>
                                          </div>
                                        </div>
                                      )}
                                    </div>
                                  )})}
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        });
        })()}
      </TabsContent>
    </Tabs>
  );
}
