import { useState } from 'react';
import { Header } from '@/components/Header';
import { ProgressSidebar } from '@/components/ProgressSidebar';
import { TableOfContents } from '@/components/TableOfContents';
import { SubTopicContent } from '@/components/SubTopicContent';
import { PastPaperWorkspace } from '@/components/PastPaperWorkspace';
import { PaperOverview } from '@/components/PaperOverview';
import { CourseSelection } from '@/components/CourseSelection';
import { ProgressProvider } from '@/context/ProgressContext';
import { igcseMathsSyllabus, SubTopic, SyllabusData } from '@/lib/syllabusData';
import { olevelMathsSyllabus } from '@/lib/olevelSyllabusData';
import { PastPaperSection, getPastPaperQuestion } from '@/lib/pastPaperData';

type ViewState =
  | { type: 'courses' }
  | { type: 'toc'; courseId: string }
  | { type: 'subtopic'; courseId: string; topicId: number; subtopicId: string }
  | { type: 'paper'; courseId: string; paperId: string };

function Dashboard() {
  const [view, setView] = useState<ViewState>({ type: 'courses' });
  const [activeTab, setActiveTab] = useState<'syllabus' | 'pastpapers'>('syllabus');
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

  const handleSubTopicSelect = (topicId: number, subtopic: SubTopic) => {
    if (view.type === 'courses') return;
    const courseId = view.courseId;
    setView({ type: 'subtopic', courseId, topicId, subtopicId: subtopic.id });
  };

  const handlePastPaperSelect = (paperId: string, section: PastPaperSection) => {
    setPastPaperModal({ isOpen: true, questionId: section.questionId });
  };

  const handlePaperOpen = (paperId: string) => {
    if (view.type === 'courses') return;
    setView({ type: 'paper', courseId: view.courseId, paperId });
  };

  const handleBackToToc = () => {
    if (view.type === 'subtopic' || view.type === 'paper') {
      setView({ type: 'toc', courseId: view.courseId });
    }
  };

  const getSyllabusForCourse = (cId: string): SyllabusData => {
    if (cId === 'olevel-4024') return olevelMathsSyllabus;
    return igcseMathsSyllabus;
  };

  const getCurrentSubTopic = () => {
    if (view.type !== 'subtopic') return null;
    const syllabus = getSyllabusForCourse(view.courseId);
    const topic = syllabus.topics.find((t) => t.id === view.topicId);
    const subtopic = topic?.subtopics.find((s) => s.id === view.subtopicId);
    return { topic, subtopic };
  };

  const currentData = getCurrentSubTopic();
  const currentPastPaperQuestion = pastPaperModal.questionId
    ? getPastPaperQuestion(pastPaperModal.questionId)
    : null;

  const currentCourseId = view.type !== 'courses' ? view.courseId : undefined;

  return (
    <div className="min-h-screen bg-background">
      <Header
        currentCourseId={currentCourseId}
        onBackToCourses={view.type !== 'courses' ? handleBackToCourses : undefined}
        publicMode={true}
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
                  courseId={view.courseId}
                  onSubTopicSelect={handleSubTopicSelect}
                  onPastPaperSelect={handlePastPaperSelect}
                  onPaperOpen={handlePaperOpen}
                  onTabChange={setActiveTab}
                  studentMode={false}
                />
              ) : view.type === 'paper' ? (
                <PaperOverview paperId={view.paperId} onBack={handleBackToToc} studentMode={false} />
              ) : currentData?.topic && currentData?.subtopic ? (
                <SubTopicContent
                  topicId={currentData.topic.id}
                  topicTitle={currentData.topic.title}
                  subtopic={currentData.subtopic}
                  onTableOfContents={handleBackToToc}
                />
              ) : null}
            </div>

            {/* Sidebar */}
            <div className="hidden lg:block">
              <div className="sticky top-24">
                <ProgressSidebar activeTab={activeTab} courseId={currentCourseId} studentMode={false} />
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Past Paper Modal (sub-topic syllabus link path) */}
      {currentPastPaperQuestion && (
        <PastPaperWorkspace
          question={currentPastPaperQuestion}
          isOpen={pastPaperModal.isOpen}
          onClose={() => setPastPaperModal({ isOpen: false, questionId: null })}
          workspaceMode="general"
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
