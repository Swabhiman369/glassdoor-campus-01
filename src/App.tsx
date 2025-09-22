import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import DashboardHomePage from "./pages/DashboardHomePage";
import CoursesPage from "./pages/CoursesPage";
import SwipsPage from "./pages/SwipsPage";

import TestsPage from "./pages/TestsPage";
import ProfilePage from "./pages/ProfilePage";
import AITeacherSession from "./components/AITeacherSession";
import DocumentationPage from "./pages/DocumentationPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <div className="dark"> {/* Force dark mode for glassy theme */}
        <Toaster />
        <Sonner />
        <BrowserRouter>
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/dashboard" element={<DashboardHomePage />} />
              <Route path="/courses" element={<CoursesPage />} />
              <Route path="/swips" element={<SwipsPage />} />
              <Route path="/tests" element={<TestsPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/ai-teacher" element={<AITeacherSession />} />
              <Route path="/documentation" element={<DocumentationPage />} />
              <Route path="/wishlist" element={<CoursesPage wishlistView />} />
              <Route path="/my-courses" element={<CoursesPage enrolledView />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
      </div>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
