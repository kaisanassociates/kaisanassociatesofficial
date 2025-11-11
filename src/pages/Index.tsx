import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Phone, Mail, Calendar, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import Hero from "@/components/Hero";
import PastEdition from "@/components/PastEdition";
import RegistrationForm from "@/components/RegistrationForm";
import kaisanLogo from "@/assets/kaisan-logo.png";

const Index = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    const handleOpenRegistration = () => {
      setIsFormOpen(true);
    };

    window.addEventListener('openRegistrationModal', handleOpenRegistration);
    
    return () => {
      window.removeEventListener('openRegistrationModal', handleOpenRegistration);
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
    <Hero onRegisterClick={() => setIsFormOpen(true)} />
      
      {/* Contact Section */}
      <section className="py-20 md:py-32 bg-gradient-to-b from-background to-primary/5 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        </div>

        <div className="container relative z-10 px-4 sm:px-6 mx-auto">
          <div className="max-w-6xl mx-auto space-y-12 md:space-y-16">
            <div className="space-y-4 md:space-y-6 animate-fade-in-up text-center">
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground">
                Ready to <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">Transform?</span>
              </h2>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                Take the first step towards personal excellence and professional growth
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
              <div className="p-6 md:p-8 rounded-2xl bg-white/80 dark:bg-white/5 backdrop-blur-xl border border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group">
                <Phone className="w-8 h-8 text-primary mx-auto mb-4 group-hover:scale-110 transition-transform" />
                <p className="text-sm text-muted-foreground mb-2 font-medium text-center">Call Us</p>
                <a href="tel:+918589990060" className="text-base md:text-lg font-semibold text-foreground hover:text-primary transition-colors block text-center">
                  +91 858 999 00 60
                </a>
              </div>

              <div className="p-6 md:p-8 rounded-2xl bg-white/80 dark:bg-white/5 backdrop-blur-xl border border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group">
                <Mail className="w-8 h-8 text-primary mx-auto mb-4 group-hover:scale-110 transition-transform" />
                <p className="text-sm text-muted-foreground mb-2 font-medium text-center">Email Us</p>
                <a href="mailto:info@kaisanassociates.com" className="text-base md:text-lg font-semibold text-foreground hover:text-primary transition-colors block text-center break-words">
                  info@kaisanassociates.com
                </a>
              </div>

              <div className="p-6 md:p-8 rounded-2xl bg-white/80 dark:bg-white/5 backdrop-blur-xl border border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group sm:col-span-2 lg:col-span-1">
                <Calendar className="w-8 h-8 text-primary mx-auto mb-4 group-hover:scale-110 transition-transform" />
                <p className="text-sm text-muted-foreground mb-2 font-medium text-center">Event Date</p>
                <p className="text-base md:text-lg font-semibold text-foreground text-center">
                  Saturday, 20 Dec 2025
                </p>
              </div>
            </div>

            <div className="text-center animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
              <button
                onClick={() => setIsFormOpen(true)}
                className="px-8 sm:px-12 py-5 sm:py-7 text-base sm:text-lg font-semibold text-white bg-primary hover:bg-primary/90 rounded-full shadow-2xl hover:shadow-primary/50 transition-all duration-500 hover:scale-105 group"
              >
                Register Your Seat Now
                <span className="ml-2 group-hover:translate-x-1 transition-transform inline-block">→</span>
              </button>
            </div>
          </div>
        </div>
      </section>

  {/* Past Edition — single placement below CTA */}
  <PastEdition id="past-edition" variant="default" />

      {/* Footer */}
      <footer className="py-12 md:py-16 bg-background border-t border-border/50">
        <div className="container px-4 sm:px-6 mx-auto">
          <div className="flex flex-col items-center gap-4 md:gap-6 max-w-4xl mx-auto">
            <img src={kaisanLogo} alt="Kaisan Associates" className="h-10 md:h-12 opacity-80" />
            <p className="text-center text-sm md:text-base text-muted-foreground">
              © 2025 Kaisan Associates. All rights reserved.
            </p>
            <p className="text-center text-xs md:text-sm text-muted-foreground max-w-2xl leading-relaxed px-4">
              Empowering individuals and organizations to achieve excellence through transformative workshops and training programs.
            </p>
          </div>
        </div>
      </footer>

      {/* Registration Form Modal */}
      <RegistrationForm isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} />
    </div>
  );
};

export default Index;
