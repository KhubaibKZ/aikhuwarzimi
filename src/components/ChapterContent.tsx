import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChapterSection, chapters, getQuestion, QuestionData } from '@/lib/questionData';
import { WorkspaceModal } from './WorkspaceModal';
import { useProgress } from '@/context/ProgressContext';
import { ArrowLeft, List, ArrowRight, Play, BookOpen, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ChapterContentProps {
  chapterId: number;
  section: ChapterSection;
  onBack: () => void;
  onTableOfContents: () => void;
  onNavigate: (direction: 'prev' | 'next') => void;
  hasPrev: boolean;
  hasNext: boolean;
}

export function ChapterContent({
  chapterId,
  section,
  onBack,
  onTableOfContents,
  onNavigate,
  hasPrev,
  hasNext
}: ChapterContentProps) {
  const [workspaceOpen, setWorkspaceOpen] = useState(false);
  const { isCompleted } = useProgress();
  
  const chapter = chapters.find(c => c.id === chapterId);
  const question = section.questionId ? getQuestion(section.questionId) : null;
  const completed = section.questionId ? isCompleted(section.questionId) : false;

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <span>Chapter {chapterId}</span>
        <span>/</span>
        <span className="text-foreground font-medium">{section.title}</span>
      </div>

      {/* Content Card */}
      <div className="rounded-xl border border-border bg-card p-6 shadow-soft">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-2">{section.title}</h2>
            <p className="text-muted-foreground">
              {chapter?.title}
            </p>
          </div>
          {completed && (
            <span className="flex items-center gap-1.5 rounded-full bg-success/10 px-3 py-1.5 text-sm font-medium text-success">
              <CheckCircle2 className="h-4 w-4" />
              Completed
            </span>
          )}
        </div>

        {section.type === 'overview' && (
          <div className="prose prose-slate dark:prose-invert max-w-none">
            <div className="rounded-xl bg-secondary/50 p-6 border border-border">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                  <BookOpen className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-3">Learning Objectives</h3>
                  <p className="text-muted-foreground whitespace-pre-line leading-relaxed">
                    {section.content}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {(section.type === 'example' || section.type === 'exercise') && question && (
          <div className="space-y-6">
            <div className="rounded-xl bg-secondary/50 p-6 border border-border">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                Question Preview
              </h3>
              <p className="text-foreground whitespace-pre-line math-input">
                {question.question}
              </p>
            </div>

            <Button
              size="lg"
              onClick={() => setWorkspaceOpen(true)}
              className={cn(
                "w-full gap-3 h-14 text-lg font-semibold shadow-lg transition-all",
                completed 
                  ? "bg-success hover:bg-success/90" 
                  : "gradient-primary hover:shadow-glow"
              )}
            >
              <Play className="h-5 w-5" />
              {completed 
                ? 'Review Your Work' 
                : section.type === 'example' 
                  ? 'Practice This Example' 
                  : 'Start Exercise'
              }
            </Button>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between pt-4">
        <Button
          variant="outline"
          onClick={() => onNavigate('prev')}
          disabled={!hasPrev}
          className="gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>

        <Button
          variant="ghost"
          onClick={onTableOfContents}
          className="gap-2"
        >
          <List className="h-4 w-4" />
          Table of Contents
        </Button>

        <Button
          variant="outline"
          onClick={() => onNavigate('next')}
          disabled={!hasNext}
          className="gap-2"
        >
          Next
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>

      {/* Workspace Modal */}
      {question && (
        <WorkspaceModal
          isOpen={workspaceOpen}
          onClose={() => setWorkspaceOpen(false)}
          question={question}
          sectionType={section.type as 'example' | 'exercise'}
        />
      )}
    </div>
  );
}
