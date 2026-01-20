import { courses, Course } from '@/lib/courseData';
import { Lock, Calculator, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CourseSelectionProps {
  onSelectCourse: (courseId: string) => void;
}

export function CourseSelection({ onSelectCourse }: CourseSelectionProps) {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-foreground mb-2">Select Your Course</h2>
        <p className="text-muted-foreground">Choose a mathematics course to begin your learning journey</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {courses.map((course, index) => (
          <button
            key={course.id}
            onClick={() => !course.locked && onSelectCourse(course.id)}
            disabled={course.locked}
            className={cn(
              "relative rounded-xl border-2 bg-card p-6 text-left transition-all duration-300 animate-slide-up",
              course.locked 
                ? "opacity-60 cursor-not-allowed border-border" 
                : "border-primary/20 hover:border-primary hover:shadow-lg hover:shadow-primary/10 cursor-pointer"
            )}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            {course.locked && (
              <div className="absolute top-4 right-4">
                <span className="flex items-center gap-1 rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground font-medium">
                  <Lock className="h-3 w-3" />
                  Coming Soon
                </span>
              </div>
            )}

            <div className={cn(
              "flex h-14 w-14 items-center justify-center rounded-xl mb-4",
              course.locked ? "bg-muted text-muted-foreground" : "bg-primary text-primary-foreground shadow-glow"
            )}>
              {course.locked ? <Lock className="h-7 w-7" /> : <Calculator className="h-7 w-7" />}
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className={cn(
                  "text-xs font-medium px-2 py-0.5 rounded",
                  course.locked ? "bg-muted text-muted-foreground" : "bg-primary/10 text-primary"
                )}>
                  {course.code}
                </span>
              </div>
              <h3 className={cn(
                "text-xl font-bold",
                course.locked ? "text-muted-foreground" : "text-foreground"
              )}>
                {course.title}
              </h3>
              <p className="text-sm text-muted-foreground">{course.description}</p>
            </div>

            {!course.locked && (
              <div className="mt-4 flex items-center text-primary text-sm font-medium">
                Start Learning
                <ChevronRight className="h-4 w-4 ml-1" />
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
