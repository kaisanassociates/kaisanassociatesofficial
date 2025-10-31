import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavigationBar from "@/components/NavigationBar";
import Index from "./pages/Index";
import About from "./pages/About";
import AdminLogin from "./pages/AdminLogin";
import TicketAccess from "./pages/TicketAccess";
import Ticket from "./pages/Ticket";
import Admin from "./pages/Admin";
import Staff from "./pages/Staff";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="min-h-screen bg-gray-50">
          <NavigationBar />
          <main>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/about" element={<About />} />
              <Route path="/login" element={<AdminLogin />} />
              <Route path="/ticket-access" element={<TicketAccess />} />
              <Route path="/ticket" element={<Ticket />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/staff" element={<Staff />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
