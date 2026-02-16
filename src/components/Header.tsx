import { BookOpen, TrendingUp, Moon, Sun, ArrowLeft, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCourse } from '@/lib/courseData';

interface HeaderProps {
  currentCourseId?: string;
  onBackToCourses?: () => void;
}

export function Header({ currentCourseId, onBackToCourses }: HeaderProps) {
  const navigate = useNavigate();
  const [isDark, setIsDark] = useState(false);
  const currentCourse = currentCourseId ? getCourse(currentCourseId) : null;

  useEffect(() => {
    const isDarkMode = document.documentElement.classList.contains('dark');
    setIsDark(isDarkMode);
  }, []);

  const toggleTheme = () => {
    document.documentElement.classList.toggle('dark');
    setIsDark(!isDark);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate('/')}
            className="h-9 w-9 rounded-lg mr-1"
          >
            <Home className="h-4 w-4" />
          </Button>
          {currentCourse && onBackToCourses && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onBackToCourses}
              className="h-9 w-9 rounded-lg mr-1"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
          )}
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-glow">
            <BookOpen className="h-5 w-5" />
          </div>
          <div className="flex flex-col">
            <h1 className="text-lg font-bold text-foreground">AI KHUWARIZMI</h1>
            <p className="text-xs text-muted-foreground">
              {currentCourse ? currentCourse.title : 'Your Mathematics Learning Companion'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="h-9 w-9 rounded-lg"
          >
            {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>

          <Button variant="outline" size="sm" className="hidden gap-2 sm:flex">
            <TrendingUp className="h-4 w-4" />
            Progress
          </Button>

          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground shadow-soft">
            KZ
          </div>
        </div>
      </div>
    </header>
  );
}
