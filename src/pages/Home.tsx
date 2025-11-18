import { useEffect, useMemo, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Award, Users, TrendingUp, Sparkles, ChevronDown, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import Testimonials from "@/components/Testimonials";

const Home = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsVisible(true);
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handle = () => setReducedMotion(mq.matches);
    handle();
    mq.addEventListener?.('change', handle);
    return () => mq.removeEventListener?.('change', handle);
  }, []);

  // Generate floating particle positions once to avoid layout thrash
  const particles = useMemo(
    () => Array.from({ length: 20 }, () => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      duration: 5 + Math.random() * 10,
      delay: Math.random() * 5,
    })),
    []
  );

  const scrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth",
    });
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Hero Section with Dubai-inspired luxury */}
      <section 
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-dubai-navy via-slate-900 to-dubai-navy"
      >
        {/* Background image with overlay for readability */}
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-35"
            style={{ backgroundImage: "url('/images/dubai-skyline.jpg')" }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-dubai-navy/40 to-black/50" />
        </div>
        {/* Animated background mesh gradient */}
        <div className={`absolute inset-0 gradient-mesh opacity-40 ${reducedMotion ? '' : 'animate-pulse'}`} />
        
        {/* Dubai skyline silhouette SVG */}
        <div className="absolute bottom-0 left-0 right-0 opacity-10">
          <svg viewBox="0 0 1200 300" className="w-full h-auto">
            <path
              d="M0 300 L0 180 L50 180 L50 120 L80 120 L80 180 L130 180 L130 100 L160 100 L160 180 L210 180 L210 80 L240 80 L240 180 L290 180 L290 140 L320 140 L320 180 L370 180 L370 60 L400 60 L400 180 L450 180 L450 120 L480 120 L480 180 L530 180 L530 90 L560 90 L560 180 L610 180 L610 70 L640 40 L670 70 L670 180 L720 180 L720 130 L750 130 L750 180 L800 180 L800 100 L830 100 L830 180 L880 180 L880 150 L910 150 L910 180 L960 180 L960 110 L990 110 L990 180 L1040 180 L1040 140 L1070 140 L1070 180 L1120 180 L1120 90 L1150 90 L1150 180 L1200 180 L1200 300 Z"
              fill="currentColor"
              className="text-dubai-gold"
            />
          </svg>
        </div>

        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {particles.map((p, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-dubai-gold rounded-full opacity-20"
              style={{
                left: p.left,
                top: p.top,
                animation: reducedMotion ? 'none' : `float-slow ${p.duration}s ease-in-out infinite`,
                animationDelay: `${p.delay}s`,
              }}
            />
          ))}
        </div>

        {/* Hero content */}
        <div className="relative z-10 container mx-auto px-6 lg:px-8">
          <div className="max-w-5xl mx-auto text-center">
            {/* Kaisan logo/badge */}
            <div className={`inline-flex items-center gap-2 px-6 py-3 rounded-full glass-panel mb-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <Sparkles className="w-5 h-5 text-dubai-gold animate-pulse" />
              <span className="text-sm font-semibold text-white tracking-wider">
                EXCELLENCE IN HUMAN RESOURCE DEVELOPMENT
              </span>
            </div>

            {/* Main headline */}
            <h1 className={`text-6xl md:text-7xl lg:text-8xl font-bold mb-6 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <span className="text-white">Empowering</span>
              <br />
              <span className="text-gradient-gold">Excellence</span>
            </h1>

            <p className={`text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              Dubai's premier consultancy for transformative leadership, organizational growth, and human potential development
            </p>

            {/* CTA buttons */}
            <div className={`flex flex-col sm:flex-row gap-4 justify-center items-center transition-all duration-1000 delay-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <Link to="/courses">
                <Button 
                  size="lg" 
                  className="btn-premium bg-dubai-gold text-dubai-navy hover:bg-yellow-500 px-8 py-3 text-lg font-semibold shadow-gold-glow group"
                >
                  Explore Our Programs
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/about">
                <Button 
                  size="lg" 
                  className="btn-premium bg-white text-dubai-navy hover:bg-gray-100 border-2 border-white px-8 py-3 text-lg font-semibold shadow-lg"
                >
                  Learn About Us
                </Button>
              </Link>
            </div>

            {/* Stats row */}
            <div className={`grid grid-cols-3 gap-8 mt-20 max-w-3xl mx-auto transition-all duration-1000 delay-800 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-dubai-gold mb-2">15+</div>
                <div className="text-sm text-gray-400 uppercase tracking-wider">Years Experience</div>
              </div>
              <div className="text-center border-x border-white/20">
                <div className="text-4xl md:text-5xl font-bold text-dubai-gold mb-2">7000+</div>
                <div className="text-sm text-gray-400 uppercase tracking-wider">Professionals Trained</div>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-dubai-gold mb-2">3</div>
                <div className="text-sm text-gray-400 uppercase tracking-wider">Signature Programs</div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <button
          onClick={scrollToContent}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce cursor-pointer group"
          aria-label="Scroll to content"
        >
          <div className="flex flex-col items-center gap-2 text-white/60 group-hover:text-white transition-colors">
            <span className="text-sm uppercase tracking-wider">Discover More</span>
            <ChevronDown className="w-6 h-6" />
          </div>
        </button>
      </section>

      {/* Services Overview Section */}
      <section className="py-32 bg-gradient-to-b from-white to-dubai-sand relative">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="text-center mb-20">
            <span className="inline-block px-4 py-2 rounded-full bg-dubai-gold/10 text-dubai-gold font-semibold text-sm mb-4 animate-fade-in-down">
              OUR EXPERTISE
            </span>
            <h2 className="text-5xl md:text-6xl font-bold text-dubai-navy mb-6 animate-fade-in-up">
              Transformative Solutions
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto animate-fade-in-up">
              Comprehensive services designed to unlock potential and drive organizational excellence
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Users,
                title: "Talent Development",
                description: "Customized training programs and workshops for individuals and teams",
                delay: "delay-100"
              },
              {
                icon: TrendingUp,
                title: "Organizational Growth",
                description: "Strategic planning and change management solutions",
                delay: "delay-200"
              },
              {
                icon: Award,
                title: "Leadership Excellence",
                description: "Executive coaching and mentoring programs",
                delay: "delay-300"
              },
              {
                icon: Sparkles,
                title: "HR Advisory",
                description: "Expert guidance on policies and best practices",
                delay: "delay-400"
              }
            ].map((service, index) => (
              <div
                key={index}
                className={`group glass-card p-8 rounded-2xl hover-lift hover-glow cursor-pointer animate-fade-in-up ${service.delay}`}
              >
                <div className="w-16 h-16 bg-gradient-to-br from-dubai-gold to-yellow-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <service.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-dubai-navy mb-4">
                  {service.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Programs Section */}
      <section className="py-32 bg-dubai-navy relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-dubai-gold/10 to-transparent" />
        
        <div className="container mx-auto px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20">
            <span className="inline-block px-4 py-2 rounded-full bg-dubai-gold/20 text-dubai-gold font-semibold text-sm mb-4">
              SIGNATURE PROGRAMS
            </span>
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Elevate Your Journey
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Three transformative programs designed to accelerate your personal and professional growth
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Card 1 - Executive Business Management */}
            <article className="group relative rounded-3xl overflow-hidden bg-white shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-dubai-gold to-yellow-600" />
              <div className="p-8 relative z-10">
                <div className="flex justify-between items-start mb-6">
                  <span className="inline-block px-3 py-1 rounded-full bg-dubai-gold/10 text-dubai-gold text-xs font-bold tracking-wider">
                    KiSE PROGRAMME
                  </span>
                  <div className="w-10 h-10 rounded-full bg-dubai-navy/5 flex items-center justify-center group-hover:bg-dubai-gold group-hover:text-white transition-colors duration-300">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                </div>
                
                <h3 className="text-2xl font-bold text-dubai-navy mb-4 group-hover:text-dubai-gold transition-colors">
                  Executive Business Management
                </h3>
                <p className="text-gray-600 mb-8 leading-relaxed min-h-[80px]">
                  12-month hybrid program for senior professionals and entrepreneurs seeking transformative growth.
                </p>

                <div className="space-y-4 mb-8">
                  {[
                    "Quarterly Workshops",
                    "Weekly Support",
                    "Campus Immersion"
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 text-sm text-gray-600">
                      <CheckCircle2 className="w-4 h-4 text-dubai-gold flex-shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                <Link to="/courses/executive-program" className="inline-flex items-center justify-center w-full py-3 rounded-xl bg-dubai-navy text-white font-semibold hover:bg-dubai-gold hover:text-dubai-navy transition-all duration-300 group-hover:shadow-lg">
                  <span>Explore Program</span>
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </div>
            </article>

            {/* Card 2 - Influencia Edition 2 */}
            <article className="group relative rounded-3xl overflow-hidden bg-dubai-navy shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-white/10">
              <div className="absolute inset-0 bg-gradient-to-br from-dubai-navy via-slate-900 to-dubai-navy" />
              <div className="absolute inset-0 gradient-mesh opacity-20" />
              
              <div className="p-8 relative z-10">
                <div className="flex justify-between items-start mb-6">
                  <span className="inline-block px-3 py-1 rounded-full bg-dubai-gold text-dubai-navy text-xs font-bold tracking-wider">
                    WORKSHOP
                  </span>
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-dubai-gold group-hover:text-dubai-navy transition-colors duration-300 text-white">
                    <Users className="w-5 h-5" />
                  </div>
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-dubai-gold transition-colors">
                  Influencia Edition 2
                </h3>
                <p className="text-gray-300 mb-8 leading-relaxed min-h-[80px]">
                  7-hour intensive programming for 250 change makers focused on personal and professional excellence.
                </p>

                <div className="space-y-4 mb-8">
                  {[
                    "Personal Excellence",
                    "Professional Growth",
                    "Relationship Mastery"
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 text-sm text-gray-300">
                      <CheckCircle2 className="w-4 h-4 text-dubai-gold flex-shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                <Link to="/courses/influencia" className="inline-flex items-center justify-center w-full py-3 rounded-xl bg-white text-dubai-navy font-semibold hover:bg-dubai-gold hover:text-dubai-navy transition-all duration-300 shadow-lg">
                  <span>Join the Movement</span>
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </div>
            </article>

            {/* Card 3 - PRP Training */}
            <article className="group relative rounded-3xl overflow-hidden bg-white shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-dubai-gold to-yellow-600" />
              <div className="p-8 relative z-10">
                <div className="flex justify-between items-start mb-6">
                  <span className="inline-block px-3 py-1 rounded-full bg-dubai-gold/10 text-dubai-gold text-xs font-bold tracking-wider">
                    DEVELOPMENT
                  </span>
                  <div className="w-10 h-10 rounded-full bg-dubai-navy/5 flex items-center justify-center group-hover:bg-dubai-gold group-hover:text-white transition-colors duration-300">
                    <Award className="w-5 h-5" />
                  </div>
                </div>
                
                <h3 className="text-2xl font-bold text-dubai-navy mb-4 group-hover:text-dubai-gold transition-colors">
                  PRP Training
                </h3>
                <p className="text-gray-600 mb-8 leading-relaxed min-h-[80px]">
                  Comprehensive professional readiness program designed to accelerate career advancement.
                </p>

                <div className="space-y-4 mb-8">
                  {[
                    "Skill Enhancement",
                    "Industry Recognition",
                    "Practical Application"
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 text-sm text-gray-600">
                      <CheckCircle2 className="w-4 h-4 text-dubai-gold flex-shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                <Link to="/courses/prp-training" className="inline-flex items-center justify-center w-full py-3 rounded-xl bg-dubai-navy text-white font-semibold hover:bg-dubai-gold hover:text-dubai-navy transition-all duration-300 group-hover:shadow-lg">
                  <span>Start Training</span>
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* Leadership Section - Dr. Rashid Gazzali */}
      <section className="py-32 bg-gradient-to-b from-dubai-sand to-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-dubai-gold/5 skew-x-12 transform origin-top-right" />
        
        <div className="container mx-auto px-6 lg:px-8 relative z-10">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative group">
              <div className="absolute inset-0 bg-dubai-gold rounded-3xl rotate-6 opacity-20 group-hover:rotate-3 transition-transform duration-500" />
              <div className="aspect-[4/5] rounded-3xl bg-gradient-to-br from-dubai-gold to-yellow-600 p-1 relative overflow-hidden shadow-2xl transform transition-transform duration-500 group-hover:-translate-y-2">
                <div className="w-full h-full rounded-3xl overflow-hidden bg-white">
                  <img
                    src="/images/dr-rashid-formal.jpeg"
                    alt="Dr. Rashid Gazzali"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                {/* Floating badge */}
                <div className="absolute bottom-8 left-8 bg-white/90 backdrop-blur-md p-4 rounded-xl shadow-lg border border-white/50">
                  <p className="text-dubai-navy font-bold text-lg">15+ Years</p>
                  <p className="text-xs text-gray-600 uppercase tracking-wider">Global Experience</p>
                </div>
              </div>
            </div>

            <div>
              <span className="inline-block px-4 py-2 rounded-full bg-dubai-gold/10 text-dubai-gold font-semibold text-sm mb-4">
                VISIONARY LEADERSHIP
              </span>
              <h2 className="text-5xl font-bold text-dubai-navy mb-6 leading-tight">
                Guided by <span className="text-gradient-gold">Excellence</span>
              </h2>
              <p className="text-xl text-gray-600 mb-6 leading-relaxed">
                Under the visionary leadership of <span className="text-dubai-gold font-semibold">Dr. Rashid Gazzali</span>, 
                Kaisan Associates has become Dubai's premier human resource consultancy.
              </p>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                With 15+ years as a global business coach, Dr. Gazzali brings unparalleled expertise in leadership 
                development, organizational transformation, and human potential optimization.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
                {[
                  "International Trainer",
                  "Life Coach",
                  "Managing Director",
                  "Executive Director"
                ].map((title, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-white shadow-sm border border-gray-100 hover:border-dubai-gold/30 transition-colors">
                    <div className="w-8 h-8 rounded-full bg-dubai-gold/10 flex items-center justify-center flex-shrink-0">
                      <Award className="w-4 h-4 text-dubai-gold" />
                    </div>
                    <span className="text-sm font-medium text-dubai-navy">{title}</span>
                  </div>
                ))}
              </div>

              <Link to="/about">
                <Button size="lg" className="btn-premium bg-dubai-navy text-white hover:bg-slate-800 group px-8">
                  Meet Our Team
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Testimonials />

      {/* CTA Section */}
      <section className="py-32 bg-gradient-to-br from-dubai-navy via-slate-900 to-dubai-navy relative overflow-hidden">
        <div className="absolute inset-0 gradient-mesh opacity-30" />
        
        <div className="container mx-auto px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Ready to Transform?
            </h2>
            <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
              Begin your journey towards excellence with Kaisan Associates. 
              Let's unlock your full potential together.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/contact">
                <Button size="lg" className="btn-premium bg-dubai-gold text-dubai-navy hover:bg-yellow-500 px-8 py-3 text-lg font-semibold shadow-gold-glow">
                  Get in Touch
                </Button>
              </Link>
              <Link to="/courses">
                <Button size="lg" className="btn-premium bg-white text-dubai-navy hover:bg-gray-100 border-2 border-white px-8 py-3 text-lg font-semibold shadow-lg">
                  View All Programs
                </Button>
              </Link>
            </div>

            {/* Contact info */}
            <div className="mt-16 pt-16 border-t border-white/20">
              <div className="grid md:grid-cols-3 gap-8 text-left">
                <div>
                  <div className="text-sm text-gray-400 mb-2">Location</div>
                  <div className="text-white font-semibold">
                    Conrad Business Tower<br />
                    Sheikh Zayed Road, Dubai
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-400 mb-2">Phone</div>
                  <div className="text-white font-semibold">
                    +971 50 60 99 326<br />
                    +971 43 827 700
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-400 mb-2">Email</div>
                  <div className="text-white font-semibold">
                    info@kaisanassociates.com
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
