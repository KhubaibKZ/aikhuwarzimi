import { chapters, ChapterSection } from '@/lib/questionData';
import { pastPapers, PastPaperSection } from '@/lib/pastPaperData';
import { useProgress } from '@/context/ProgressContext';
import { ChevronDown, ChevronRight, Lock, Unlock, CheckCircle2, BookOpen, Calculator, FileText, GraduationCap, ClipboardList } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface TableOfContentsProps {
  onSectionSelect: (chapterId: number, section: ChapterSection) => void;
  onPastPaperSelect?: (paperId: string, section: PastPaperSection) => void;
}

export function TableOfContents({ onSectionSelect, onPastPaperSelect }: TableOfContentsProps) {
  const [expandedChapter, setExpandedChapter] = useState<number | null>(1);
  const [expandedPaper, setExpandedPaper] = useState<string | null>(pastPapers[0]?.id || null);
  const { isCompleted } = useProgress();

  const getSectionIcon = (type: ChapterSection['type']) => {
    switch (type) {
      case 'overview':
        return BookOpen;
      case 'example':
        return Calculator;
      case 'exercise':
        return FileText;
    }
  };

  return (
    <Tabs defaultValue="chapters" className="w-full">
      <TabsList className="grid w-full grid-cols-2 mb-4">
        <TabsTrigger value="chapters" className="flex items-center gap-2">
          <BookOpen className="h-4 w-4" />
          Chapters
        </TabsTrigger>
        <TabsTrigger value="pastpapers" className="flex items-center gap-2">
          <ClipboardList className="h-4 w-4" />
          Past Papers
        </TabsTrigger>
      </TabsList>

      <TabsContent value="chapters" className="space-y-3">
        <h2 className="mb-4 text-xl font-bold text-foreground">Chapters</h2>
        
        {chapters.map((chapter, index) => (
          <div
            key={chapter.id}
            className={cn(
              "rounded-xl border border-border bg-card overflow-hidden transition-all duration-300 animate-slide-up",
              chapter.locked && "opacity-60"
            )}
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <button
              onClick={() => !chapter.locked && setExpandedChapter(expandedChapter === chapter.id ? null : chapter.id)}
              disabled={chapter.locked}
              className={cn(
                "flex w-full items-center justify-between p-4 text-left transition-colors",
                !chapter.locked && "hover:bg-muted/50",
                chapter.locked && "cursor-not-allowed"
              )}
            >
              <div className="flex items-center gap-3">
                <div className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-lg text-sm font-bold",
                  chapter.locked 
                    ? "bg-muted text-muted-foreground" 
                    : "bg-primary text-primary-foreground"
                )}>
                  {chapter.id}
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{chapter.title}</h3>
                  <p className="text-xs text-muted-foreground">
                    {chapter.locked ? 'Complete previous chapters to unlock' : `${chapter.sections.length} sections`}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                {chapter.locked ? (
                  <span className="flex items-center gap-1 rounded-full bg-muted px-2 py-1 text-xs text-muted-foreground">
                    <Lock className="h-3 w-3" />
                    Locked
                  </span>
                ) : (
                  <span className="flex items-center gap-1 rounded-full bg-success/10 px-2 py-1 text-xs text-success">
                    <Unlock className="h-3 w-3" />
                    Unlocked
                  </span>
                )}
                
                {!chapter.locked && (
                  expandedChapter === chapter.id 
                    ? <ChevronDown className="h-5 w-5 text-muted-foreground" />
                    : <ChevronRight className="h-5 w-5 text-muted-foreground" />
                )}
              </div>
            </button>

            {expandedChapter === chapter.id && !chapter.locked && (
              <div className="border-t border-border bg-muted/30 p-2">
                {chapter.sections.map((section) => {
                  const Icon = getSectionIcon(section.type);
                  const completed = section.questionId && isCompleted(section.questionId);
                  
                  return (
                    <button
                      key={section.id}
                      onClick={() => onSectionSelect(chapter.id, section)}
                      className="flex w-full items-center gap-3 rounded-lg p-3 text-left transition-all hover:bg-card hover:shadow-sm"
                    >
                      <div className={cn(
                        "flex h-8 w-8 items-center justify-center rounded-lg",
                        completed ? "bg-success/10 text-success" : "bg-secondary text-secondary-foreground"
                      )}>
                        {completed ? <CheckCircle2 className="h-4 w-4" /> : <Icon className="h-4 w-4" />}
                      </div>
                      <div className="flex-1">
                        <span className={cn(
                          "text-sm font-medium",
                          completed ? "text-success" : "text-foreground"
                        )}>
                          {section.title}
                        </span>
                      </div>
                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        ))}
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
                  const completed = isCompleted(section.questionId);
                  
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
                      </div>
                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        ))}
      </TabsContent>
    </Tabs>
  );
}
