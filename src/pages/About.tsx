import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import AboutInfluencia from "@/components/AboutInfluencia";
import kaisanLogo from "@/assets/kaisan-logo.png";

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <main className="pt-8 pb-16">
        <AboutInfluencia />
      </main>

      <footer className="bg-card/50 backdrop-blur-sm border-t border-border py-8 mt-20">
        <div className="container mx-auto px-4 text-center">
          <img src={kaisanLogo} alt="Kaisan Associates" className="h-16 mx-auto mb-4 object-contain" />
          <p className="text-muted-foreground">
            © {new Date().getFullYear()} Kaisan Associates. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default About;
