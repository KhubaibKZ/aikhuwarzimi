import { igcseMathsSyllabus, SubTopic, MainTopic } from '@/lib/syllabusData';
import { questionDatabase } from '@/lib/questionData';
import { pastPapers, PastPaperSection } from '@/lib/pastPaperData';
import { useProgress } from '@/context/ProgressContext';
import { ChevronDown, ChevronRight, Lock, Unlock, CheckCircle2, BookOpen, Calculator, FileText, GraduationCap, ClipboardList, Hash, RotateCcw } from 'lucide-react';
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

interface TableOfContentsProps {
  onSubTopicSelect: (topicId: number, subtopic: SubTopic) => void;
  onPastPaperSelect?: (paperId: string, section: PastPaperSection) => void;
}

export function TableOfContents({ onSubTopicSelect, onPastPaperSelect }: TableOfContentsProps) {
  const [expandedTopic, setExpandedTopic] = useState<number | null>(null);
  const [expandedSubtopic, setExpandedSubtopic] = useState<string | null>(null);
  const [expandedPaper, setExpandedPaper] = useState<string | null>(null);
  const [resettingPaper, setResettingPaper] = useState<string | null>(null);
  const { isCompleted } = useProgress();
  const { user } = useAuth();
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
    <Tabs defaultValue="syllabus" className="w-full">
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
        <h2 className="mb-4 text-xl font-bold text-foreground">IGCSE Mathematics (0580)</h2>
        
        {igcseMathsSyllabus.topics.map((topic, index) => {
          const topicProgress = getTopicProgress(topic);
          const hasUnlockedSubtopics = topic.subtopics.some(s => !s.locked);
          
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
                onClick={() => setExpandedTopic(expandedTopic === topic.id ? null : topic.id)}
                className="flex w-full items-center justify-between p-4 text-left transition-colors hover:bg-muted/50"
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
      </TabsContent>

      <TabsContent value="pastpapers" className="space-y-3">
        <h2 className="mb-4 text-xl font-bold text-foreground">Past Papers</h2>
        
        {pastPapers.map((paper, index) => (
          <div
            key={paper.id}
            className={cn(
              "rounded-xl border border-border bg-card overflow-hidden transition-all duration-300 animate-slide-up",
              paper.locked && "opacity-60"
            )}
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <button
              onClick={() => !paper.locked && setExpandedPaper(expandedPaper === paper.id ? null : paper.id)}
              className={cn(
                "flex w-full items-center justify-between p-4 text-left transition-colors",
                paper.locked ? "cursor-not-allowed" : "hover:bg-muted/50"
              )}
              disabled={paper.locked}
            >
              <div className="flex items-center gap-3">
                <div className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-lg",
                  paper.locked ? "bg-muted text-muted-foreground" : "bg-primary text-primary-foreground"
                )}>
                  {paper.locked ? <Lock className="h-5 w-5" /> : <GraduationCap className="h-5 w-5" />}
                </div>
                <div>
                  <h3 className={cn(
                    "font-semibold",
                    paper.locked ? "text-muted-foreground" : "text-foreground"
                  )}>{paper.code}</h3>
                  <p className="text-xs text-muted-foreground">
                    {paper.session} {paper.year} • {paper.totalMarks} marks • {paper.duration}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                {paper.locked ? (
                  <span className="rounded-full bg-muted px-2 py-1 text-xs text-muted-foreground font-medium">
                    Coming Soon
                  </span>
                ) : (
                  <>
                    <span className="rounded-full bg-primary/10 px-2 py-1 text-xs text-primary font-medium">
                      {paper.sections.length} questions
                    </span>
                    {expandedPaper === paper.id 
                      ? <ChevronDown className="h-5 w-5 text-muted-foreground" />
                      : <ChevronRight className="h-5 w-5 text-muted-foreground" />
                    }
                  </>
                )}
              </div>
            </button>

            {!paper.locked && expandedPaper === paper.id && (
              <div className="border-t border-border bg-muted/30 p-2 max-h-96 overflow-y-auto">
                {paper.sections.map((section) => {
                  const completed = isQuestionSubmitted(section.questionId) || isCompleted(section.questionId);
                  
                  return (
                    <button
                      key={section.id}
                      onClick={() => onPastPaperSelect?.(paper.id, section)}
                      className="flex w-full items-center gap-3 rounded-lg p-3 text-left transition-all hover:bg-card hover:shadow-sm"
                    >
                      <div className={cn(
                        "flex h-8 w-8 items-center justify-center rounded-lg",
                        completed ? "bg-success/10 text-success" : "bg-secondary text-secondary-foreground"
                      )}>
                        {completed ? <CheckCircle2 className="h-4 w-4" /> : <FileText className="h-4 w-4" />}
                      </div>
                      <div className="flex-1">
                        <span className={cn(
                          "text-sm font-medium",
                          completed ? "text-success" : "text-foreground"
                        )}>
                          {section.title}
                        </span>
                        {completed && (
                          <p className="text-[10px] text-success">Recorded</p>
                        )}
                      </div>
                      {completed ? (
                        <Badge variant="outline" className="text-[10px] border-success/30 text-success bg-success/5">Recorded</Badge>
                      ) : (
                        <ChevronRight className="h-4 w-4 text-muted-foreground" />
                      )}
                    </button>
                  );
                })}

                {/* Paper-level Reset Button */}
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
        ))}
      </TabsContent>
    </Tabs>
  );
}
