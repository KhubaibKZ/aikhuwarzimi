import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  BookOpen, Brain, Target, Zap, CheckCircle,
  ChevronRight, Play, Moon, Sun, X, ArrowRight, Star,
  GraduationCap, BarChart3, FileText, Menu
} from 'lucide-react';
import alKhwarizmiImg from '@/assets/al-khwarizmi.jpg';

// Floating math symbols for decoration
const mathSymbols = [
  { symbol: '∫', className: 'top-[15%] left-[8%] text-4xl animate-float-slow' },
  { symbol: 'π', className: 'top-[25%] right-[12%] text-5xl animate-float-medium' },
  { symbol: '∑', className: 'top-[60%] left-[5%] text-3xl animate-float-fast' },
  { symbol: '√', className: 'bottom-[20%] right-[8%] text-4xl animate-float-slow' },
  { symbol: 'Δ', className: 'top-[40%] right-[5%] text-3xl animate-float-medium' },
  { symbol: '∞', className: 'bottom-[35%] left-[12%] text-5xl animate-float-fast' },
  { symbol: 'θ', className: 'top-[10%] right-[25%] text-3xl animate-float-slow' },
  { symbol: 'λ', className: 'bottom-[15%] left-[20%] text-4xl animate-float-medium' },
  { symbol: 'φ', className: 'top-[50%] left-[15%] text-3xl animate-float-fast hidden md:block' },
  { symbol: 'α', className: 'bottom-[40%] right-[18%] text-4xl animate-float-slow hidden md:block' },
];

export default function Landing() {
  const navigate = useNavigate();
  const [isDark, setIsDark] = useState(() => document.documentElement.classList.contains('dark'));
  const [showLogin, setShowLogin] = useState(false);
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
      <nav className="fixed top-0 z-50 w-full border-b border-border/40 bg-background/70 backdrop-blur-xl">
        <div className="container flex h-14 md:h-16 items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 md:h-10 md:w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-glow">
              <span className="font-serif text-lg md:text-xl font-bold italic">خ</span>
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-sm md:text-base font-bold tracking-wide">AI Khuwarizmi</span>
              <span className="text-[10px] text-muted-foreground hidden sm:block">The Father of Algebra</span>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#legacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors font-medium">Legacy</a>
            <a href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors font-medium">Features</a>
            <a href="#how-it-works" className="text-sm text-muted-foreground hover:text-foreground transition-colors font-medium">Method</a>
            <a href="#courses" className="text-sm text-muted-foreground hover:text-foreground transition-colors font-medium">Courses</a>
          </div>
          <div className="flex items-center gap-2 md:gap-3">
            <Button variant="ghost" size="icon" onClick={toggleTheme} className="h-8 w-8 md:h-9 md:w-9 rounded-lg">
              {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
            <Button variant="ghost" size="sm" onClick={() => setShowLogin(true)} className="hidden sm:inline-flex font-medium">
              Log in
            </Button>
            <Button size="sm" onClick={handleGetStarted} className="shadow-glow hidden sm:inline-flex">
              Begin Journey <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden h-8 w-8">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-border/50 bg-background/95 backdrop-blur-xl px-4 py-3 space-y-2">
            <a href="#legacy" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-sm text-muted-foreground">Legacy</a>
            <a href="#features" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-sm text-muted-foreground">Features</a>
            <a href="#how-it-works" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-sm text-muted-foreground">Method</a>
            <a href="#courses" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-sm text-muted-foreground">Courses</a>
            <div className="flex gap-2 pt-2 border-t border-border/30">
              <Button variant="outline" size="sm" onClick={() => { setShowLogin(true); setMobileMenuOpen(false); }} className="flex-1">Log in</Button>
              <Button size="sm" onClick={() => { handleGetStarted(); setMobileMenuOpen(false); }} className="flex-1 shadow-glow">Begin Journey</Button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section — Scholarly & Grand */}
      <section className="relative pt-24 pb-16 md:pt-36 md:pb-28 overflow-hidden">
        {/* Deep gradient background */}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
        <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] dark:opacity-[0.06]"
          style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%239C92AC\' fill-opacity=\'0.4\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }} />
        
        {/* Glow orbs */}
        <div className="absolute top-20 left-1/4 w-72 md:w-96 h-72 md:h-96 rounded-full bg-primary/15 blur-[120px]" />
        <div className="absolute bottom-0 right-1/3 w-56 md:w-72 h-56 md:h-72 rounded-full bg-primary/10 blur-[100px]" />

        {/* Floating math symbols */}
        {mathSymbols.map((s, i) => (
          <span key={i} className={`absolute font-mono text-primary/20 dark:text-primary/15 pointer-events-none select-none ${s.className}`}>
            {s.symbol}
          </span>
        ))}

        <div className="container relative px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center space-y-6 md:space-y-8">
            {/* Arabic script badge */}
            <div className="inline-flex items-center gap-2.5 rounded-full border border-primary/30 bg-primary/5 px-5 py-2 text-sm">
              <span className="font-arabic text-base text-primary">الخوارزمي</span>
              <span className="w-px h-4 bg-primary/30" />
              <span className="text-primary font-medium">The Father of Algebra</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.05]">
              <span className="block gold-shimmer">Al-Khuwarizmi</span>
              <span className="block text-foreground text-2xl sm:text-3xl md:text-4xl lg:text-5xl mt-2 md:mt-4 font-sans font-light tracking-wide">
                Your AI Mathematics Tutor
              </span>
            </h1>

            <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed px-2 font-light">
              In the tradition of the great scholar who gave the world <em className="text-foreground font-medium">algebra</em> and <em className="text-foreground font-medium">algorithms</em> — 
              master IGCSE & O Level Mathematics with AI-guided wisdom, interactive past papers, and step-by-step enlightenment.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center px-4 sm:px-0">
              <Button size="lg" onClick={handleGetStarted} className="text-base px-8 shadow-glow w-full sm:w-auto group">
                Begin Your Journey
                <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button size="lg" variant="outline" className="text-base px-8 group w-full sm:w-auto border-primary/30 hover:bg-primary/5">
                <Play className="h-4 w-4 mr-2 group-hover:text-primary transition-colors" />
                Watch Demo
              </Button>
            </div>

            {/* Elegant divider with math equation */}
            <div className="flex items-center justify-center gap-4 pt-4">
              <div className="h-px w-12 bg-gradient-to-r from-transparent to-primary/30" />
              <span className="font-mono text-xs text-muted-foreground/60">x² + bx + c = 0</span>
              <div className="h-px w-12 bg-gradient-to-l from-transparent to-primary/30" />
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-xs sm:text-sm text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <CheckCircle className="h-3.5 w-3.5 text-primary" />
                Free to start
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle className="h-3.5 w-3.5 text-primary" />
                Real past papers
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle className="h-3.5 w-3.5 text-primary" />
                AI-powered guidance
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Al-Khwarizmi Legacy Section */}
      <section id="legacy" className="py-16 md:py-24 bg-muted/20 relative overflow-hidden">
        {/* Decorative geometric border */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

        <div className="container px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center max-w-5xl mx-auto">
            {/* Portrait */}
            <div className="relative mx-auto md:mx-0 w-64 sm:w-72 md:w-full max-w-sm">
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/20 to-primary/5 rotate-3 scale-105" />
              <div className="relative rounded-3xl overflow-hidden border-2 border-primary/20 shadow-2xl">
                <img
                  src={alKhwarizmiImg}
                  alt="Al-Khwarizmi — Father of Algebra"
                  className="w-full h-auto object-cover"
                />
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-background/90 to-transparent p-4 md:p-6">
                  <p className="font-arabic text-lg md:text-xl text-primary text-center">محمد بن موسى الخوارزمي</p>
                </div>
              </div>
            </div>

            {/* Story */}
            <div className="space-y-5 md:space-y-6 text-center md:text-left">
              <div>
                <span className="text-xs uppercase tracking-[0.2em] text-primary font-semibold">The Legacy</span>
                <h2 className="font-serif text-3xl md:text-4xl font-bold mt-2 leading-tight">
                  Built on the Shoulders of <span className="text-primary">a Giant</span>
                </h2>
              </div>

              <blockquote className="border-l-2 border-primary/40 pl-4 md:pl-6 italic text-muted-foreground text-sm md:text-base leading-relaxed">
                "When I considered what people generally want in calculating, I found that it always is a number."
                <footer className="mt-2 not-italic text-xs text-primary font-semibold">— Al-Khwarizmi, c. 820 CE</footer>
              </blockquote>

              <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                <strong className="text-foreground">Muhammad ibn Musa al-Khwarizmi</strong> (c. 780–850 CE) 
                revolutionized mathematics. His book <em>"al-Kitāb al-Mukhtaṣar"</em> gave us the word 
                <strong className="text-primary"> "algebra"</strong>, and his name gave us the word 
                <strong className="text-primary"> "algorithm"</strong>. This app carries forward his mission — 
                making mathematics accessible and methodical for every student.
              </p>

              <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                {['Algebra', 'Algorithms', 'Hindu-Arabic Numerals', 'Astronomy'].map((tag) => (
                  <span key={tag} className="px-3 py-1 text-xs rounded-full border border-primary/20 bg-primary/5 text-primary font-medium">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12 md:mb-16 space-y-3">
            <span className="text-xs uppercase tracking-[0.2em] text-primary font-semibold">Capabilities</span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold">
              A Complete System of <span className="text-primary">Mathematical Learning</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto text-sm md:text-base">
              Every tool you need to master Cambridge IGCSE and O Level Mathematics, united in one elegant workspace.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {[
              { icon: Brain, title: 'AI Tutor', desc: 'Personalized hints and explanations that understand exactly where you struggle.' },
              { icon: FileText, title: 'Past Papers', desc: 'Real Cambridge past papers with interactive workspaces, diagrams, and instant marking.' },
              { icon: Target, title: 'Step-by-Step', desc: 'Every question broken into clear methodical steps — understand the method, not just the answer.' },
              { icon: BarChart3, title: 'Progress Tracking', desc: 'Visual analytics across all topics. Know your strengths and where to focus next.' },
              { icon: GraduationCap, title: 'Full Syllabus', desc: 'Complete IGCSE (0580) and O Level (4024) syllabi with structured learning paths.' },
              { icon: Zap, title: 'Interactive Diagrams', desc: 'Dynamic graphs, geometry tools, Venn diagrams, and coordinate grids in your workspace.' },
            ].map((feature, i) => (
              <div
                key={i}
                className="group relative rounded-2xl border border-border/60 bg-card/50 p-5 md:p-6 hover:border-primary/40 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 backdrop-blur-sm"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 mb-4 group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-semibold mb-1.5 text-base">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-16 md:py-24 bg-muted/20 relative">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12 md:mb-16 space-y-3">
            <span className="text-xs uppercase tracking-[0.2em] text-primary font-semibold">The Method</span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold">Three Steps to Mastery</h2>
            <p className="text-muted-foreground max-w-xl mx-auto text-sm md:text-base">
              A methodical approach worthy of Al-Khwarizmi himself
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 md:gap-8 max-w-4xl mx-auto">
            {[
              { step: 'I', title: 'Choose Your Path', desc: 'Select IGCSE 0580 or O Level 4024 and access the complete structured syllabus.' },
              { step: 'II', title: 'Learn & Practice', desc: 'Study topics with guided lessons, then master them with real Cambridge past papers.' },
              { step: 'III', title: 'Seek Guidance', desc: 'When stuck, the AI tutor provides hints and step-by-step wisdom to light your way.' },
            ].map((item, i) => (
              <div key={i} className="text-center space-y-4 group">
                <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-primary-foreground font-serif text-2xl font-bold shadow-glow group-hover:scale-110 transition-transform">
                  {item.step}
                </div>
                <h3 className="text-lg md:text-xl font-semibold">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Courses Preview */}
      <section id="courses" className="py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12 md:mb-16 space-y-3">
            <span className="text-xs uppercase tracking-[0.2em] text-primary font-semibold">Curriculum</span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold">Available Courses</h2>
            <p className="text-muted-foreground max-w-xl mx-auto text-sm">Cambridge qualifications, mastered methodically</p>
          </div>

          <div className="grid sm:grid-cols-2 gap-5 md:gap-6 max-w-3xl mx-auto">
            {[
              { code: '0580', title: 'IGCSE Mathematics', desc: 'Extended curriculum — algebra, geometry, statistics, trigonometry and more.', available: true },
              { code: '4024', title: 'O Level Mathematics', desc: 'Comprehensive O Level syllabus with structured learning and past paper practice.', available: false },
            ].map((course, i) => (
              <div key={i} className="relative rounded-2xl border-2 border-primary/15 bg-card/50 backdrop-blur-sm p-6 md:p-8 hover:border-primary/40 transition-all duration-300">
                <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-full bg-primary/10 text-primary">{course.code}</span>
                <h3 className="font-serif text-xl md:text-2xl font-bold mt-3">{course.title}</h3>
                <p className="text-sm text-muted-foreground mt-2 mb-5">{course.desc}</p>
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

      {/* Testimonial */}
      <section className="py-16 md:py-24 bg-muted/20 relative">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
        <div className="container px-4 md:px-6 text-center max-w-3xl mx-auto space-y-6">
          <div className="flex justify-center gap-1">
            {[1, 2, 3, 4, 5].map((i) => <Star key={i} className="h-4 w-4 md:h-5 md:w-5 fill-primary text-primary" />)}
          </div>
          <blockquote className="font-serif text-lg md:text-2xl font-medium italic leading-relaxed">
            "Al-Khuwarizmi helped me understand topics I'd been struggling with for months. 
            The step-by-step approach and past paper practice made a real difference in my grades."
          </blockquote>
          <p className="text-sm text-muted-foreground">— IGCSE Mathematics Student</p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="relative rounded-3xl bg-gradient-to-br from-primary to-primary/60 p-8 md:p-16 text-center overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.1),transparent)]" />
            {/* Decorative math symbols in CTA */}
            <span className="absolute top-6 left-8 text-4xl text-primary-foreground/10 font-mono hidden md:block">∫</span>
            <span className="absolute bottom-8 right-12 text-5xl text-primary-foreground/10 font-mono hidden md:block">∑</span>
            <span className="absolute top-12 right-20 text-3xl text-primary-foreground/10 font-mono hidden md:block">π</span>

            <div className="relative space-y-5">
              <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-primary-foreground leading-tight">
                Ready to follow in the footsteps<br className="hidden sm:block" /> of the great scholars?
              </h2>
              <p className="text-primary-foreground/80 max-w-xl mx-auto text-sm md:text-base">
                Join students who are already transforming their mathematical understanding with AI-powered learning.
              </p>
              <Button size="lg" variant="secondary" onClick={handleGetStarted} className="text-base px-8">
                Begin Your Journey
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 py-8 md:py-12">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <span className="font-serif text-sm font-bold italic">خ</span>
              </div>
              <span className="font-serif font-semibold tracking-wide">Al-Khuwarizmi</span>
            </div>
            <p className="text-xs text-muted-foreground text-center md:text-left">
              © 2025 AI Khuwarizmi · In the tradition of methodical learning · الخوارزمي
            </p>
          </div>
        </div>
      </footer>

      {/* Login Modal */}
      {showLogin && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background/80 backdrop-blur-sm p-4" onClick={() => setShowLogin(false)}>
          <div className="relative w-full max-w-md rounded-2xl border border-border bg-card p-6 md:p-8 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <Button variant="ghost" size="icon" className="absolute top-3 right-3" onClick={() => setShowLogin(false)}>
              <X className="h-4 w-4" />
            </Button>

            <div className="text-center mb-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-glow mx-auto mb-4">
                <span className="font-serif text-xl font-bold italic">خ</span>
              </div>
              <h2 className="font-serif text-2xl font-bold">Welcome Back</h2>
              <p className="text-sm text-muted-foreground mt-1">Continue your journey of knowledge</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Email</label>
                <Input type="email" placeholder="scholar@example.com" value={loginForm.email}
                  onChange={(e) => setLoginForm((f) => ({ ...f, email: e.target.value }))} />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Password</label>
                <Input type="password" placeholder="••••••••" value={loginForm.password}
                  onChange={(e) => setLoginForm((f) => ({ ...f, password: e.target.value }))} />
              </div>
              <Button type="submit" className="w-full shadow-glow">
                Enter <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </form>

            <p className="text-center text-sm text-muted-foreground mt-4">
              New student?{' '}
              <button className="text-primary hover:underline font-medium" onClick={handleGetStarted}>
                Begin free
              </button>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
