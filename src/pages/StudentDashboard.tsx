import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Header } from '@/components/Header';
import { ProgressSidebar } from '@/components/ProgressSidebar';
import { TableOfContents } from '@/components/TableOfContents';
import { SubTopicContent } from '@/components/SubTopicContent';
import { PastPaperWorkspace } from '@/components/PastPaperWorkspace';
import { CourseSelection } from '@/components/CourseSelection';
import { ProgressProvider } from '@/context/ProgressContext';
import { igcseMathsSyllabus, SubTopic, SyllabusData } from '@/lib/syllabusData';
import { olevelMathsSyllabus } from '@/lib/olevelSyllabusData';
import { PastPaperSection, getPastPaperQuestion } from '@/lib/pastPaperData';
import { Loader2 } from 'lucide-react';

type ViewState =
  | { type: 'courses' }
  | { type: 'toc'; courseId: string }
  | { type: 'subtopic'; courseId: string; topicId: number; subtopicId: string };

function StudentDashboardContent() {
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
    if (view.type !== 'toc' && view.type !== 'subtopic') return;
    const courseId = view.courseId;
    setView({ type: 'subtopic', courseId, topicId, subtopicId: subtopic.id });
  };

  const handlePastPaperSelect = (paperId: string, section: PastPaperSection) => {
    setPastPaperModal({ isOpen: true, questionId: section.questionId });
  };

  const handleBackToToc = () => {
    if (view.type === 'subtopic') {
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
    const topic = syllabus.topics.find(t => t.id === view.topicId);
    const subtopic = topic?.subtopics.find(s => s.id === view.subtopicId);
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
      />

      <main className="container px-4 py-8 md:px-6">
        {view.type === 'courses' ? (
          <CourseSelection onSelectCourse={handleCourseSelect} enforceAssignments={true} />
        ) : (
          <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
            <div>
              {view.type === 'toc' ? (
                <TableOfContents
                  courseId={view.courseId}
                  onSubTopicSelect={handleSubTopicSelect}
                  onPastPaperSelect={handlePastPaperSelect}
                  onTabChange={setActiveTab}
                />
              ) : currentData?.topic && currentData?.subtopic ? (
                <SubTopicContent
                  topicId={currentData.topic.id}
                  topicTitle={currentData.topic.title}
                  subtopic={currentData.subtopic}
                  onTableOfContents={handleBackToToc}
                />
              ) : null}
            </div>

            <div className="hidden lg:block">
              <div className="sticky top-24">
                <ProgressSidebar activeTab={activeTab} courseId={currentCourseId} />
              </div>
            </div>
          </div>
        )}
      </main>

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

export default function StudentDashboard() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return (
    <ProgressProvider>
      <StudentDashboardContent />
    </ProgressProvider>
  );
}
