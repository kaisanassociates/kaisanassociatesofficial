import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavigationBar from "@/components/NavigationBar";
import RouteSplash from "@/components/RouteSplash";
import Index from "./pages/Index";
import About from "./pages/About";
import TicketAccess from "./pages/TicketAccess";
import Ticket from "./pages/Ticket";
import Admin from "./pages/Admin";
import Staff from "./pages/Staff";
import NotFound from "./pages/NotFound";
import Volunteer from "./pages/Volunteer";
import BulkPrintPage from "./pages/BulkPrint";

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
          <div className="min-h-screen bg-gray-50">
            {/* Route transition splash overlay */}
            <RouteSplash />

            <NavigationBar />
            <main>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/about" element={<About />} />
                <Route path="/ticket-access" element={<TicketAccess />} />
                <Route path="/ticket" element={<Ticket />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/staff" element={<Staff />} />
                <Route path="/bulk-print" element={<BulkPrintPage />} />
                <Route path="/volunteer" element={<Volunteer />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
