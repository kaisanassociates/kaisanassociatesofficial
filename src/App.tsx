import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import KaisanNavigationBar from "@/components/KaisanNavigationBar";
import Footer from "@/components/Footer";

// Kaisan Associates pages
import Home from "./pages/Home";
import Courses from "./pages/Courses";
import AboutKaisan from "./pages/AboutKaisan";
import ContactPage from "./pages/ContactPage";
import NotFound from "./pages/NotFound";
import Admin from "./pages/Admin";

import CourseDetail from "./pages/CourseDetail";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter
          future={{
            v7_startTransition: true,
            v7_relativeSplatPath: true,
          }}>
          <div className="min-h-screen bg-white scroll-smooth">
            <KaisanNavigationBar />
            <main className="min-h-screen">
              <Routes>
                {/* Kaisan Associates Main Site */}
                <Route path="/" element={<Home />} />
                <Route path="/home" element={<Home />} />
                <Route path="/courses" element={<Courses />} />
                <Route path="/courses/:slug" element={<CourseDetail />} />
                <Route path="/about" element={<AboutKaisan />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/admin" element={<Admin />} />
                
                {/* Catch-all route */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
