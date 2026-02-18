import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { lovable } from '@/integrations/lovable/index';
import { useAuth } from '@/hooks/useAuth';
import alKhwarizmiSilhouette from '@/assets/al-khwarizmi-silhouette.png';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import {
  ChevronRight, Moon, Sun, X, ArrowRight,
  Menu, Loader2 } from 'lucide-react';

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
  const { user, loading: authLoading } = useAuth();
  const { toast } = useToast();
  const [isDark, setIsDark] = useState(() => {
    if (!document.documentElement.classList.contains('dark')) {
      document.documentElement.classList.add('dark');
    }
    return true;
  });
  const [showLogin, setShowLogin] = useState(false);
  const [authTab, setAuthTab] = useState<'login' | 'register'>('register');
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [registerForm, setRegisterForm] = useState({ email: '', password: '', confirmPassword: '' });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);


  const toggleTheme = () => {
    document.documentElement.classList.toggle('dark');
    setIsDark(!isDark);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginForm.email || !loginForm.password) {
      toast({ title: 'Missing fields', description: 'Please enter email and password.', variant: 'destructive' });
      return;
    }
    setSubmitting(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: loginForm.email,
      password: loginForm.password,
    });
    setSubmitting(false);
    if (error) {
      toast({ title: 'Login failed', description: error.message, variant: 'destructive' });
    } else {
      navigate('/dashboard');
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!registerForm.email || !registerForm.password) {
      toast({ title: 'Missing fields', description: 'Please fill in all fields.', variant: 'destructive' });
      return;
    }
    if (registerForm.password !== registerForm.confirmPassword) {
      toast({ title: 'Passwords do not match', description: 'Please make sure both passwords match.', variant: 'destructive' });
      return;
    }
    if (registerForm.password.length < 6) {
      toast({ title: 'Weak password', description: 'Password must be at least 6 characters.', variant: 'destructive' });
      return;
    }
    setSubmitting(true);
    const { error } = await supabase.auth.signUp({
      email: registerForm.email,
      password: registerForm.password,
      options: { emailRedirectTo: window.location.origin },
    });
    setSubmitting(false);
    if (error) {
      toast({ title: 'Registration failed', description: error.message, variant: 'destructive' });
    } else {
      toast({ title: 'Check your email', description: 'We sent you a verification link. Please verify your email before logging in.' });
      setAuthTab('login');
    }
  };

  const handleGoogleSignIn = async () => {
    setSubmitting(true);
    const { error } = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: window.location.origin,
    });
    setSubmitting(false);
    if (error) {
      toast({ title: 'Google Sign-in failed', description: String(error), variant: 'destructive' });
    }
  };

  const handleGetStarted = () => {
    setAuthTab('register');
    setShowLogin(true);
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
              <span className="text-[10px] text-muted-foreground hidden sm:block">Inspired by Father of Algebra</span>
            </div>
          </div>
          <div className="flex items-center gap-2 md:gap-3">
            <Button variant="ghost" size="icon" onClick={toggleTheme} className="h-8 w-8 md:h-9 md:w-9 rounded-lg">
              {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
            <Button variant="ghost" size="sm" onClick={() => {setAuthTab('login');setShowLogin(true);}} className="hidden sm:inline-flex font-medium">
              Log in
            </Button>
            <Button size="sm" onClick={handleGetStarted} className="shadow-glow hidden sm:inline-flex">
              Try it for free <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden h-8 w-8">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
        {mobileMenuOpen &&
        <div className="md:hidden border-t border-border/50 bg-background/95 backdrop-blur-xl px-4 py-3 space-y-2">
            <div className="flex gap-2 pt-2">
              <Button variant="outline" size="sm" onClick={() => {setAuthTab('login');setShowLogin(true);setMobileMenuOpen(false);}} className="flex-1">Log in</Button>
              <Button size="sm" onClick={() => {handleGetStarted();setMobileMenuOpen(false);}} className="flex-1 shadow-glow">Try it for free</Button>
            </div>
          </div>
        }