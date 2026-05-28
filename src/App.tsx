import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider, useAuth } from "@/hooks/useAuth";
import { useUsageTracker } from "@/hooks/useUsageTracker";
import Index from "./pages/Index";
import Landing from "./pages/Landing";
import Demo from "./pages/Demo";
import StudentAnalytics from "./pages/StudentAnalytics";
import AdminPanel from "./pages/AdminPanel";

import StudentDashboard from "./pages/StudentDashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Logs a usage session for any logged-in (student) account.
const StudentSessionTracker = () => {
  const { user } = useAuth();
  useUsageTracker({
    enabled: !!user,
    accountType: 'student',
    userId: user?.id ?? null,
    displayName: (user?.user_metadata?.full_name as string) || user?.email || null,
    email: user?.email ?? null,
  });
  return null;
};


const AppRoutes = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/dashboard" element={<Index />} />
      <Route path="/student-demo-analytics" element={<StudentAnalytics />} />
      <Route path="/student/analytics" element={<StudentAnalytics studentMode />} />
      <Route path="/admin" element={<AdminPanel />} />
      <Route path="/demo" element={<Demo />} />
      
      <Route path="/student" element={<StudentDashboard />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <StudentSessionTracker />
        <AppRoutes />
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;


export default App;
