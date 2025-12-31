import { useState } from 'react';
import { Header } from '@/components/Header';
import { ProgressSidebar } from '@/components/ProgressSidebar';
import { TableOfContents } from '@/components/TableOfContents';
import { ChapterContent } from '@/components/ChapterContent';
import { ProgressProvider } from '@/context/ProgressContext';
import { chapters, ChapterSection } from '@/lib/questionData';

type ViewState = 
  | { type: 'toc' }
  | { type: 'content'; chapterId: number; sectionIndex: number };

function Dashboard() {
  const [view, setView] = useState<ViewState>({ type: 'toc' });

  const handleSectionSelect = (chapterId: number, section: ChapterSection) => {
    const chapter = chapters.find(c => c.id === chapterId);
    if (chapter) {
      const sectionIndex = chapter.sections.findIndex(s => s.id === section.id);
      setView({ type: 'content', chapterId, sectionIndex });
    }
  };

  const handleBackToToc = () => {
    setView({ type: 'toc' });
  };

  const handleNavigate = (direction: 'prev' | 'next') => {
    if (view.type !== 'content') return;
    
    const chapter = chapters.find(c => c.id === view.chapterId);
    if (!chapter) return;

    const newIndex = direction === 'prev' 
      ? view.sectionIndex - 1 
      : view.sectionIndex + 1;

    if (newIndex >= 0 && newIndex < chapter.sections.length) {
      setView({ type: 'content', chapterId: view.chapterId, sectionIndex: newIndex });
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

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container px-4 py-8 md:px-6">
        <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
          {/* Main Content Area */}
          <div>
            {view.type === 'toc' ? (
              <TableOfContents onSectionSelect={handleSectionSelect} />
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
      </main>
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
