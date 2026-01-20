import { useState } from 'react';
import { Header } from '@/components/Header';
import { ProgressSidebar } from '@/components/ProgressSidebar';
import { TableOfContents } from '@/components/TableOfContents';
import { ChapterContent } from '@/components/ChapterContent';
import { PastPaperWorkspace } from '@/components/PastPaperWorkspace';
import { CourseSelection } from '@/components/CourseSelection';
import { ProgressProvider } from '@/context/ProgressContext';
import { chapters, ChapterSection } from '@/lib/questionData';
import { PastPaperSection, getPastPaperQuestion } from '@/lib/pastPaperData';

type ViewState = 
  | { type: 'courses' }
  | { type: 'toc'; courseId: string }
  | { type: 'content'; courseId: string; chapterId: number; sectionIndex: number };

function Dashboard() {
  const [view, setView] = useState<ViewState>({ type: 'courses' });
  const [pastPaperModal, setPastPaperModal] = useState<{
    isOpen: boolean;
    questionId: string | null;
  }>({ isOpen: false, questionId: null });

  const handleCourseSelect = (courseId: string) => {
    setView({ type: 'toc', courseId });
  };

  const handleBackToCourses = () => {
    setView({ type: 'courses' });
  };

  const handleSectionSelect = (chapterId: number, section: ChapterSection) => {
    if (view.type !== 'toc' && view.type !== 'content') return;
    const courseId = view.type === 'toc' ? view.courseId : view.courseId;
    const chapter = chapters.find(c => c.id === chapterId);
    if (chapter) {
      const sectionIndex = chapter.sections.findIndex(s => s.id === section.id);
      setView({ type: 'content', courseId, chapterId, sectionIndex });
    }
  };

  const handlePastPaperSelect = (paperId: string, section: PastPaperSection) => {
    setPastPaperModal({ isOpen: true, questionId: section.questionId });
  };

  const handleBackToToc = () => {
    if (view.type === 'content') {
      setView({ type: 'toc', courseId: view.courseId });
    }
  };

  const handleNavigate = (direction: 'prev' | 'next') => {
    if (view.type !== 'content') return;
    
    const chapter = chapters.find(c => c.id === view.chapterId);
    if (!chapter) return;

    const newIndex = direction === 'prev' 
      ? view.sectionIndex - 1 
      : view.sectionIndex + 1;

    if (newIndex >= 0 && newIndex < chapter.sections.length) {
      setView({ type: 'content', courseId: view.courseId, chapterId: view.chapterId, sectionIndex: newIndex });
    }
  };

  const getCurrentSection = () => {
    if (view.type !== 'content') return null;
    const chapter = chapters.find(c => c.id === view.chapterId);
    return chapter?.sections[view.sectionIndex] || null;
  };

  const getNavState = () => {
    if (view.type !== 'content') return { hasPrev: false, hasNext: false };
    const chapter = chapters.find(c => c.id === view.chapterId);
    if (!chapter) return { hasPrev: false, hasNext: false };
    
    return {
      hasPrev: view.sectionIndex > 0,
      hasNext: view.sectionIndex < chapter.sections.length - 1
    };
  };

  const currentSection = getCurrentSection();
  const navState = getNavState();
  const currentPastPaperQuestion = pastPaperModal.questionId 
    ? getPastPaperQuestion(pastPaperModal.questionId) 
    : null;

  const currentCourseId = view.type !== 'courses' ? view.courseId : undefined;

  return (
    <div className="min-h-screen bg-background">
      <Header 
        currentCourseId={currentCourseId} 
        onBackToCourses={view.type !== 'courses' ? handleBackToCourses : undefined} 
      />
      
      <main className="container px-4 py-8 md:px-6">
        {view.type === 'courses' ? (
          <CourseSelection onSelectCourse={handleCourseSelect} />
        ) : (
          <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
            {/* Main Content Area */}
            <div>
              {view.type === 'toc' ? (
                <TableOfContents 
                  onSectionSelect={handleSectionSelect}
                  onPastPaperSelect={handlePastPaperSelect}
                />
              ) : currentSection ? (
                <ChapterContent
                  chapterId={view.chapterId}
                  section={currentSection}
                  onBack={() => handleNavigate('prev')}
                  onTableOfContents={handleBackToToc}
                  onNavigate={handleNavigate}
                  hasPrev={navState.hasPrev}
                  hasNext={navState.hasNext}
                />
              ) : null}
            </div>

            {/* Sidebar */}
            <div className="hidden lg:block">
              <div className="sticky top-24">
                <ProgressSidebar />
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Past Paper Modal */}
      {currentPastPaperQuestion && (
        <PastPaperWorkspace
          question={currentPastPaperQuestion}
          isOpen={pastPaperModal.isOpen}
          onClose={() => setPastPaperModal({ isOpen: false, questionId: null })}
        />
      )}
    </div>
  );
}

const Index = () => {
  return (
    <ProgressProvider>
      <Dashboard />
    </ProgressProvider>
  );
};

export default Index;
