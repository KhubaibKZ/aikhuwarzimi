import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { SubTopic } from '@/lib/syllabusData';
import { questionDatabase, getQuestion, QuestionData } from '@/lib/questionData';
import { WorkspaceModal } from './WorkspaceModal';
import { useProgress } from '@/context/ProgressContext';
import { ArrowLeft, List, Play, BookOpen, CheckCircle2, Calculator, FileText } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SubTopicContentProps {
  topicId: number;
  topicTitle: string;
  subtopic: SubTopic;
  onTableOfContents: () => void;
}

export function SubTopicContent({
  topicId,
  topicTitle,
  subtopic,
  onTableOfContents
}: SubTopicContentProps) {
  const [workspaceOpen, setWorkspaceOpen] = useState(false);
  const [activeQuestion, setActiveQuestion] = useState<QuestionData | null>(null);
  const { isCompleted } = useProgress();
  
  const questions = subtopic.questionIds
    .map(id => questionDatabase[id])
    .filter((q): q is QuestionData => q !== undefined);

  const completedCount = questions.filter(q => isCompleted(q.id)).length;
  const allComplete = questions.length > 0 && completedCount === questions.length;

  const handleOpenQuestion = (question: QuestionData) => {
    setActiveQuestion(question);
    setWorkspaceOpen(true);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <span>Topic {topicId}: {topicTitle}</span>
        <span>/</span>
        <span className="text-foreground font-medium">{subtopic.code} {subtopic.title}</span>
      </div>

      {/* Content Card */}
      <div className="rounded-xl border border-border bg-card p-6 shadow-soft">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-2">
              {subtopic.code} {subtopic.title}
            </h2>
            <p className="text-muted-foreground">
              {topicTitle}
            </p>
          </div>
          {allComplete && (
            <span className="flex items-center gap-1.5 rounded-full bg-success/10 px-3 py-1.5 text-sm font-medium text-success">
              <CheckCircle2 className="h-4 w-4" />
              Completed
            </span>
          )}
        </div>

        {/* Description */}
        <div className="rounded-xl bg-secondary/50 p-6 border border-border mb-6">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <BookOpen className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-3">What you'll learn</h3>
              <p className="text-muted-foreground leading-relaxed">
                {subtopic.description}
              </p>
            </div>
          </div>
        </div>

        {/* Questions List */}
        {questions.length > 0 ? (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-foreground">
                Practice Questions
              </h3>
              <span className="text-sm text-muted-foreground">
                {completedCount} of {questions.length} completed
              </span>
            </div>
            
            <div className="space-y-3">
              {questions.map((question) => {
                const completed = isCompleted(question.id);
                const isExample = question.id.includes('example');
                
                return (
                  <div
                    key={question.id}
                    className={cn(
                      "rounded-xl border p-4 transition-all",
                      completed 
                        ? "border-success/30 bg-success/5" 
                        : "border-border bg-card hover:border-primary/30 hover:shadow-sm"
                    )}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-3 flex-1">
                        <div className={cn(
                          "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg",
                          completed 
                            ? "bg-success/10 text-success" 
                            : isExample 
                              ? "bg-primary/10 text-primary"
                              : "bg-secondary text-secondary-foreground"
                        )}>
                          {completed ? (
                            <CheckCircle2 className="h-5 w-5" />
                          ) : isExample ? (
                            <Calculator className="h-5 w-5" />
                          ) : (
                            <FileText className="h-5 w-5" />
                          )}
                        </div>
                        <div className="flex-1">
                          <h4 className={cn(
                            "font-medium",
                            completed ? "text-success" : "text-foreground"
                          )}>
                            {question.title}
                          </h4>
                          <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                            {question.question.substring(0, 100)}...
                          </p>
                        </div>
                      </div>
                      <Button
                        variant={completed ? "outline" : "default"}
                        size="sm"
                        onClick={() => handleOpenQuestion(question)}
                        className="shrink-0"
                      >
                        <Play className="h-4 w-4 mr-1" />
                        {completed ? 'Review' : 'Start'}
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted mx-auto mb-4">
              <BookOpen className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Content Coming Soon
            </h3>
            <p className="text-muted-foreground">
              We're working on adding practice questions for this topic.
            </p>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-center pt-4">
        <Button
          variant="outline"
          onClick={onTableOfContents}
          className="gap-2"
        >
          <List className="h-4 w-4" />
          Back to Syllabus
        </Button>
      </div>

      {/* Workspace Modal */}
      {activeQuestion && (
        <WorkspaceModal
          isOpen={workspaceOpen}
          onClose={() => {
            setWorkspaceOpen(false);
            setActiveQuestion(null);
          }}
          question={activeQuestion}
          sectionType="example"
        />
      )}
    </div>
  );
}
