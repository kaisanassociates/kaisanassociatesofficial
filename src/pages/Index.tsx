import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Phone, Mail, Calendar, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import Hero from "@/components/Hero";
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
      <section className="py-32 bg-gradient-to-b from-background to-primary/5 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        </div>

        <div className="container relative z-10 px-6 mx-auto">
          <div className="max-w-4xl mx-auto text-center space-y-16">
            <div className="space-y-6 animate-fade-in-up">
              <h2 className="text-5xl md:text-6xl font-bold text-foreground">
                Ready to <span className="text-primary">Transform?</span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Take the first step towards personal excellence and professional growth
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
              <div className="p-8 rounded-2xl bg-white/80 dark:bg-white/5 backdrop-blur-xl border border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-lg group">
                <Phone className="w-8 h-8 text-primary mx-auto mb-4 group-hover:scale-110 transition-transform" />
                <p className="text-sm text-muted-foreground mb-2 font-medium">Call Us</p>
                <a href="tel:+918589990060" className="text-lg font-semibold text-foreground hover:text-primary transition-colors">
                  +91 858 999 00 60
                </a>
              </div>

              <div className="p-8 rounded-2xl bg-white/80 dark:bg-white/5 backdrop-blur-xl border border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-lg group">
                <Mail className="w-8 h-8 text-primary mx-auto mb-4 group-hover:scale-110 transition-transform" />
                <p className="text-sm text-muted-foreground mb-2 font-medium">Email Us</p>
                <a href="mailto:info@kaisanassociates.com" className="text-lg font-semibold text-foreground hover:text-primary transition-colors break-all">
                  info@kaisanassociates.com
                </a>
              </div>

              <div className="p-8 rounded-2xl bg-white/80 dark:bg-white/5 backdrop-blur-xl border border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-lg group">
                <Calendar className="w-8 h-8 text-primary mx-auto mb-4 group-hover:scale-110 transition-transform" />
                <p className="text-sm text-muted-foreground mb-2 font-medium">Date</p>
                <p className="text-lg font-semibold text-foreground">
                  Saturday, 13 Dec 2025
                </p>
              </div>
            </div>

            <div className="animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
              <button
                onClick={() => setIsFormOpen(true)}
                className="px-12 py-7 text-lg font-semibold text-white bg-primary hover:bg-primary/90 rounded-full shadow-2xl hover:shadow-primary/50 transition-all duration-500 hover:scale-105 group"
              >
                Register Your Seat Now
                <span className="ml-2 group-hover:translate-x-1 transition-transform inline-block">→</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 bg-background border-t border-border/50">
        <div className="container px-6 mx-auto">
          <div className="flex flex-col items-center gap-6">
            <img src={kaisanLogo} alt="Kaisan Associates" className="h-12 opacity-80" />
            <p className="text-center text-muted-foreground">
              © 2025 Kaisan Associates. All rights reserved.
            </p>
            <p className="text-center text-sm text-muted-foreground max-w-2xl leading-relaxed">
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
