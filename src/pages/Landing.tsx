import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  BookOpen, Brain, Target, TrendingUp, Zap, CheckCircle, 
  ChevronRight, Play, Moon, Sun, X, ArrowRight, Star,
  GraduationCap, BarChart3, FileText
} from 'lucide-react';
import heroBg from '@/assets/hero-bg.jpg';

export default function Landing() {
  const navigate = useNavigate();
  const [isDark, setIsDark] = useState(() => document.documentElement.classList.contains('dark'));
  const [showLogin, setShowLogin] = useState(false);
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });

  const toggleTheme = () => {
    document.documentElement.classList.toggle('dark');
    setIsDark(!isDark);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/dashboard');
  };

  const handleGetStarted = () => {
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Nav */}
      <nav className="fixed top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-xl">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-glow">
              <BookOpen className="h-5 w-5" />
            </div>
            <span className="text-lg font-bold">AI KHUWARIZMI</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Features</a>
            <a href="#how-it-works" className="text-sm text-muted-foreground hover:text-foreground transition-colors">How It Works</a>
            <a href="#courses" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Courses</a>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={toggleTheme} className="h-9 w-9 rounded-lg">
              {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
            <Button variant="ghost" size="sm" onClick={() => setShowLogin(true)}>
              Log in
            </Button>
            <Button size="sm" onClick={handleGetStarted} className="shadow-glow">
              Get Started <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
        <div 
          className="absolute inset-0 opacity-20 dark:opacity-30"
          style={{ backgroundImage: `url(${heroBg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background" />
        <div className="absolute top-20 left-1/4 w-96 h-96 rounded-full bg-primary/20 blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-72 h-72 rounded-full bg-primary/10 blur-[100px]" />
        
        <div className="container relative px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm text-primary font-medium">
              <Zap className="h-3.5 w-3.5" />
              AI-Powered Mathematics Learning
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1]">
              Your Personal
              <span className="block bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
                Math Tutor.
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Master IGCSE & O Level Mathematics with AI-guided lessons, 
              interactive past papers, and step-by-step solutions. 
              Built for students who want to excel.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" onClick={handleGetStarted} className="text-base px-8 shadow-glow">
                Start Learning Free
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
              <Button size="lg" variant="outline" className="text-base px-8 group">
                <Play className="h-4 w-4 mr-2 group-hover:text-primary transition-colors" />
                Watch Demo
              </Button>
            </div>

            <div className="flex items-center justify-center gap-6 pt-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <CheckCircle className="h-4 w-4 text-primary" />
                Free to start
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle className="h-4 w-4 text-primary" />
                Past papers included
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle className="h-4 w-4 text-primary" />
                AI-powered hints
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 md:py-28">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold">
              Unlike any other app.
              <span className="block text-primary mt-1">A complete math learning system.</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Everything you need to prepare for your Cambridge IGCSE and O Level exams in one place.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Brain,
                title: 'AI Tutor',
                desc: 'Get personalized hints and explanations when you\'re stuck. Our AI understands exactly where you need help.',
                color: 'from-primary/20 to-primary/5',
              },
              {
                icon: FileText,
                title: 'Past Paper Practice',
                desc: 'Work through real Cambridge past papers with interactive workspaces, diagrams, and instant marking.',
                color: 'from-primary/20 to-primary/5',
              },
              {
                icon: Target,
                title: 'Step-by-Step Solutions',
                desc: 'Every question broken into clear steps. Understand the method, not just the answer.',
                color: 'from-primary/20 to-primary/5',
              },
              {
                icon: BarChart3,
                title: 'Track Progress',
                desc: 'Visual progress tracking across all topics. Know your strengths and where to focus next.',
                color: 'from-primary/20 to-primary/5',
              },
              {
                icon: GraduationCap,
                title: 'Full Syllabus Coverage',
                desc: 'Complete Cambridge IGCSE (0580) and O Level (4024) syllabi with structured learning paths.',
                color: 'from-primary/20 to-primary/5',
              },
              {
                icon: Zap,
                title: 'Interactive Diagrams',
                desc: 'Dynamic graphs, geometry tools, Venn diagrams, and coordinate grids right in your workspace.',
                color: 'from-primary/20 to-primary/5',
              },
            ].map((feature, i) => (
              <div 
                key={i} 
                className="group relative rounded-2xl border border-border bg-card p-6 hover:border-primary/40 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5"
              >
                <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${feature.color} mb-4`}>
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 md:py-28 bg-muted/30">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold">How It Works</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">Three simple steps to start improving your grades</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { step: '01', title: 'Choose Your Course', desc: 'Select IGCSE 0580 or O Level 4024 and access the full syllabus.' },
              { step: '02', title: 'Learn & Practice', desc: 'Study topics with lessons, then practice with real past papers in interactive workspaces.' },
              { step: '03', title: 'Get AI Help', desc: 'Stuck on a problem? Get instant hints and step-by-step guidance from the AI tutor.' },
            ].map((item, i) => (
              <div key={i} className="text-center space-y-4">
                <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-primary-foreground text-xl font-bold shadow-glow">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Courses Preview */}
      <section id="courses" className="py-20 md:py-28">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold">Available Courses</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">Start with our supported Cambridge qualifications</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {[
              { code: '0580', title: 'IGCSE Mathematics', desc: 'Extended curriculum covering algebra, geometry, statistics, and more.', available: true },
              { code: '4024', title: 'O Level Mathematics', desc: 'Comprehensive O Level syllabus with past paper practice.', available: false },
            ].map((course, i) => (
              <div key={i} className="relative rounded-2xl border-2 border-primary/20 bg-card p-8 hover:border-primary/50 transition-all duration-300">
                <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-primary/10 text-primary">{course.code}</span>
                <h3 className="text-2xl font-bold mt-3">{course.title}</h3>
                <p className="text-sm text-muted-foreground mt-2 mb-6">{course.desc}</p>
                <Button 
                  onClick={course.available ? handleGetStarted : undefined} 
                  disabled={!course.available}
                  className={course.available ? 'shadow-glow' : ''}
                >
                  {course.available ? 'Start Now' : 'Coming Soon'}
                  {course.available && <ArrowRight className="h-4 w-4 ml-2" />}
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial / Social Proof */}
      <section className="py-20 md:py-28 bg-muted/30">
        <div className="container px-4 md:px-6 text-center max-w-3xl mx-auto space-y-6">
          <div className="flex justify-center gap-1">
            {[1,2,3,4,5].map(i => <Star key={i} className="h-5 w-5 fill-primary text-primary" />)}
          </div>
          <blockquote className="text-xl md:text-2xl font-medium italic leading-relaxed">
            "AI Khuwarizmi helped me understand topics I'd been struggling with for months. 
            The step-by-step approach and past paper practice made a real difference in my grades."
          </blockquote>
          <p className="text-muted-foreground">— IGCSE Mathematics Student</p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-28">
        <div className="container px-4 md:px-6">
          <div className="relative rounded-3xl bg-gradient-to-br from-primary to-primary/70 p-12 md:p-16 text-center overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.1),transparent)]" />
            <div className="relative space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground">
                Ready to ace your exams?
              </h2>
              <p className="text-primary-foreground/80 max-w-xl mx-auto">
                Join students who are already improving their math grades with AI-powered learning.
              </p>
              <Button size="lg" variant="secondary" onClick={handleGetStarted} className="text-base px-8">
                Get Started Free
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <BookOpen className="h-4 w-4" />
              </div>
              <span className="font-semibold">AI KHUWARIZMI</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2025 AI Khuwarizmi. Your Mathematics Learning Companion.
            </p>
          </div>
        </div>
      </footer>

      {/* Login Modal */}
      {showLogin && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background/80 backdrop-blur-sm" onClick={() => setShowLogin(false)}>
          <div className="relative w-full max-w-md rounded-2xl border border-border bg-card p-8 shadow-2xl mx-4" onClick={e => e.stopPropagation()}>
            <Button variant="ghost" size="icon" className="absolute top-4 right-4" onClick={() => setShowLogin(false)}>
              <X className="h-4 w-4" />
            </Button>
            
            <div className="text-center mb-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-glow mx-auto mb-4">
                <BookOpen className="h-6 w-6" />
              </div>
              <h2 className="text-2xl font-bold">Welcome Back</h2>
              <p className="text-sm text-muted-foreground mt-1">Sign in to continue learning</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Email</label>
                <Input 
                  type="email" 
                  placeholder="you@example.com" 
                  value={loginForm.email}
                  onChange={e => setLoginForm(f => ({ ...f, email: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Password</label>
                <Input 
                  type="password" 
                  placeholder="••••••••" 
                  value={loginForm.password}
                  onChange={e => setLoginForm(f => ({ ...f, password: e.target.value }))}
                />
              </div>
              <Button type="submit" className="w-full shadow-glow">
                Sign In
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </form>

            <p className="text-center text-sm text-muted-foreground mt-4">
              Don't have an account?{' '}
              <button className="text-primary hover:underline font-medium" onClick={handleGetStarted}>
                Sign up free
              </button>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
