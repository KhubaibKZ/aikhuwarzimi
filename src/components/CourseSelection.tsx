import { courses, Course } from '@/lib/courseData';
import { Lock, Calculator, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useStudentAssignments } from '@/hooks/useStudentAssignments';
import { useAdminRole } from '@/hooks/useAdminRole';

interface CourseSelectionProps {
  onSelectCourse: (courseId: string) => void;
  enforceAssignments?: boolean;
}

export function CourseSelection({ onSelectCourse, enforceAssignments = false }: CourseSelectionProps) {
  const { isCourseAssigned, loading } = useStudentAssignments();
  const { isAdmin } = useAdminRole();

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-foreground mb-2">Select Your Course</h2>
        <p className="text-muted-foreground">Choose a mathematics course to begin your learning journey</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {courses.map((course, index) => {
          const isAssigned = !enforceAssignments || isCourseAssigned(course.id);
          const isLocked = course.locked || (!isAssigned && !loading);

          return (
            <button
              key={course.id}
              onClick={() => !isLocked && onSelectCourse(course.id)}
              disabled={isLocked}
              className={cn(
                "relative rounded-xl border-2 bg-card p-6 text-left transition-all duration-300 animate-slide-up",
                isLocked 
                  ? "opacity-60 cursor-not-allowed border-border" 
                  : "border-primary/20 hover:border-primary hover:shadow-lg hover:shadow-primary/10 cursor-pointer"
              )}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {isLocked && (
                <div className="absolute top-4 right-4">
                  <span className="flex items-center gap-1 rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground font-medium">
                    <Lock className="h-3 w-3" />
                    {course.locked ? 'Coming Soon' : 'Not Assigned'}
                  </span>
                </div>
              )}

              <div className={cn(
                "flex h-14 w-14 items-center justify-center rounded-xl mb-4",
                isLocked ? "bg-muted text-muted-foreground" : "bg-primary text-primary-foreground shadow-glow"
              )}>
                {isLocked ? <Lock className="h-7 w-7" /> : <Calculator className="h-7 w-7" />}
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className={cn(
                    "text-xs font-medium px-2 py-0.5 rounded",
                    isLocked ? "bg-muted text-muted-foreground" : "bg-primary/10 text-primary"
                  )}>
                    {course.code}
                  </span>
                </div>
                <h3 className={cn(
                  "text-xl font-bold",
                  isLocked ? "text-muted-foreground" : "text-foreground"
                )}>
                  {course.title}
                </h3>
                <p className="text-sm text-muted-foreground">{course.description}</p>
              </div>

              {!isLocked && (
                <div className="mt-4 flex items-center text-primary text-sm font-medium">
                  Start Learning
                  <ChevronRight className="h-4 w-4 ml-1" />
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
