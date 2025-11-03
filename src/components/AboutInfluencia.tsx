import { useState, useEffect, useRef } from "react";
import { 
  Sparkles, Zap, Users, Trophy, Rocket, Brain, 
  TrendingUp, Star, Award, Target, CheckCircle, 
  ChevronRight, Flame, Crown, ArrowRight, ChevronLeft
} from "lucide-react";
import { Button } from "@/components/ui/button";

// Import Dr. Rashid's image
import drRashidImage from "@/assets/dr-rashid-speaking.jpg";

const AboutInfluencia = () => {
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);
  
  // Carousel timing configuration
  const TRANSITION_MS = 2000; // animation duration per slide
  const AUTO_INTERVAL_MS = 2000; // time between slide switches

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    setIsVisible(true);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const eventImages = [
    { 
      src: "/src/assets/influencia-2024/NCA04318.JPG", 
      caption: "Packed Auditorium",
      subtitle: "500+ Attendees • Edition 1.0"
    },
    { 
      src: "/src/assets/influencia-2024/NCA04492.JPG", 
      caption: "Interactive Sessions",
      subtitle: "Hands-on Workshops"
    },
    { 
      src: "/src/assets/influencia-2024/NCA04625.JPG", 
      caption: "Audience Engagement",
      subtitle: "Active Participation"
    },
    { 
      src: "/src/assets/influencia-2024/NCA04757.JPG", 
      caption: "Dr. Rashid in Action",
      subtitle: "Inspiring Leadership"
    },
    { 
      src: "/src/assets/influencia-2024/NCA04950.JPG", 
      caption: "Transformative Moments",
      subtitle: "Life-Changing Insights"
    },
    { 
      src: "/src/assets/influencia-2024/NCA05233.JPG", 
      caption: "Networking Excellence",
      subtitle: "Building Connections"
    },
    { 
      src: "/src/assets/influencia-2024/NCA05362.JPG", 
      caption: "Success Stories",
      subtitle: "Real Results Shared"
    },
    { 
      src: "/src/assets/influencia-2024/NCA05478.JPG", 
      caption: "Breakthrough Experiences",
      subtitle: "Peak Performance"
    }
  ];

  const resetAutoPlay = () => {
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
    }
    autoPlayRef.current = setInterval(() => {
      if (!isDragging) {
        goToNextSlide();
      }
    }, AUTO_INTERVAL_MS);
  };

  const goToNextSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev + 1) % eventImages.length);
    setTimeout(() => setIsTransitioning(false), TRANSITION_MS);
    resetAutoPlay();
  };

  const goToPrevSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev - 1 + eventImages.length) % eventImages.length);
    setTimeout(() => setIsTransitioning(false), TRANSITION_MS);
    resetAutoPlay();
  };

  const goToSlide = (index: number) => {
    if (isTransitioning || index === currentSlide) return;
    setIsTransitioning(true);
    setCurrentSlide(index);
    setTimeout(() => setIsTransitioning(false), TRANSITION_MS);
    resetAutoPlay();
  };

  // Touch handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
    setIsDragging(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      goToNextSlide();
    }
    if (isRightSwipe) {
      goToPrevSlide();
    }

    setTouchStart(0);
    setTouchEnd(0);
    setIsDragging(false);
  };

  useEffect(() => {
    resetAutoPlay();
    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [currentSlide, isDragging]);

  const transformations = [
    {
      icon: Brain,
      stat: "500+",
      label: "Lives Transformed",
      description: "Join hundreds who've already unlocked their potential"
    },
    {
      icon: Trophy,
      stat: "95%",
      label: "Success Rate",
      description: "Participants achieving breakthrough results"
    },
    {
      icon: Rocket,
      stat: "10X",
      label: "Growth Multiplier",
      description: "Average performance improvement reported"
    }
  ];

  const whyAttend = [
    {
      icon: Flame,
      title: "Ignite Your Potential",
      description: "Discover untapped capabilities and unlock the leader within you through proven psychological frameworks",
      gradient: "from-red-500 to-orange-500"
    },
    {
      icon: Crown,
      title: "Master Influence",
      description: "Learn advanced persuasion techniques used by world-class leaders to inspire and drive change",
      gradient: "from-red-600 to-pink-500"
    },
    {
      icon: TrendingUp,
      title: "Accelerate Success",
      description: "Fast-track your career and personal goals with battle-tested strategies from industry titans",
      gradient: "from-rose-500 to-red-500"
    },
    {
      icon: Users,
      title: "Elite Networking",
      description: "Connect with ambitious achievers, entrepreneurs, and change-makers in an exclusive setting",
      gradient: "from-red-500 to-rose-600"
    }
  ];

  const whatYouGet = [
    "Personalized success roadmap tailored to your goals",
    "Exclusive access to Dr. Rashid Gazzali's private resources",
    "Lifetime membership to Influencia alumni network",
    "Certificate of Excellence recognized industry-wide",
    "90-day post-event mentorship support",
    "Premium workshop materials and digital toolkit"
  ];

  return (
    <section className="relative min-h-screen overflow-hidden bg-white">
      {/* Animated Background */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Red gradient orbs */}
        <div 
          className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-red-500/20 rounded-full blur-3xl animate-pulse"
          style={{ transform: `translateY(${scrollY * 0.3}px)` }}
        />
        <div 
          className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-rose-500/15 rounded-full blur-3xl animate-pulse"
          style={{ transform: `translateY(${-scrollY * 0.2}px)`, animationDelay: "1s" }}
        />
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-red-500/10 to-rose-500/10 rounded-full blur-3xl animate-spin"
          style={{ animationDuration: "30s" }}
        />
        
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(239,68,68,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(239,68,68,0.03)_1px,transparent_1px)] bg-[size:64px_64px]" />
      </div>

      <div className="container relative z-10 px-6 py-24 mx-auto">
        {/* Hero Section */}
        <div className="max-w-7xl mx-auto text-center mb-32 space-y-12">
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-red-50 border-2 border-red-200 rounded-full mb-8 hover:scale-105 transition-transform cursor-default">
              <Sparkles className="w-5 h-5 text-red-600 animate-pulse" />
              <span className="text-sm font-bold text-red-600 tracking-wider">EDITION 2.0 • ELEVATE YOUR EXISTENCE</span>
            </div>
          </div>

          <div 
            className={`space-y-6 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          >
            <h1 className="text-7xl md:text-9xl font-black tracking-tight">
              <span className="block bg-gradient-to-r from-red-600 via-rose-500 to-red-600 bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]">
                INFLUENCIA
              </span>
            </h1>
            
            <div className="relative inline-block">
              <p className="text-3xl md:text-5xl font-bold text-gray-900 tracking-tight">
                THE FUTURE AWAITS
              </p>
              <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent animate-pulse" />
            </div>

            <p className="text-xl md:text-2xl text-red-600 font-semibold tracking-[0.3em]">
              PROGRAMMED 2026
            </p>
          </div>

          <div 
            className={`max-w-4xl mx-auto transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          >
            <p className="text-2xl md:text-3xl leading-relaxed text-gray-700 font-light">
              Transform from <span className="font-bold text-red-600">who you are</span> into{" "}
              <span className="font-bold text-red-600">who you're destined to become</span>. 
              A revolutionary immersive experience engineered to{" "}
              <span className="relative inline-block">
                <span className="relative z-10 font-bold text-gray-900">reprogram your reality</span>
                <span className="absolute bottom-0 left-0 right-0 h-3 bg-red-200 -z-0 -rotate-1" />
              </span>
            </p>
          </div>
        </div>

        {/* Stats Section */}
        <div className="max-w-7xl mx-auto mb-32">
          <div className="grid md:grid-cols-3 gap-8">
            {transformations.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={index}
                  className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-white to-red-50 border-2 border-red-200 p-10 hover:border-red-500 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-red-500/20"
                  style={{ 
                    animationDelay: `${index * 0.2}s`,
                    animation: isVisible ? 'fadeInUp 0.8s ease-out forwards' : 'none'
                  }}
                >
                  {/* Background glow */}
                  <div className="absolute inset-0 bg-gradient-to-br from-red-500/0 to-red-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="relative z-10">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-red-500 to-rose-600 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    
                    <h3 className="text-5xl md:text-6xl font-black text-transparent bg-gradient-to-r from-red-600 to-rose-500 bg-clip-text mb-3">
                      {item.stat}
                    </h3>
                    
                    <p className="text-xl font-bold text-gray-900 mb-2">
                      {item.label}
                    </p>
                    
                    <p className="text-gray-600 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Why Attend Section */}
        <div className="max-w-7xl mx-auto mb-32">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-5xl md:text-7xl font-black text-gray-900">
              Why <span className="text-red-600">This Changes</span> Everything
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              This isn't just another workshop. It's a complete transformation system.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {whyAttend.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={index}
                  className="group relative overflow-hidden rounded-3xl bg-white border-2 border-gray-200 p-10 hover:border-transparent transition-all duration-500 hover:scale-105 hover:shadow-2xl"
                  style={{ 
                    animationDelay: `${index * 0.15}s`,
                    animation: isVisible ? 'fadeInUp 0.8s ease-out forwards' : 'none'
                  }}
                >
                  {/* Animated gradient border */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10`} />
                  <div className="absolute inset-[2px] bg-white rounded-3xl z-0" />
                  
                  <div className="relative z-10">
                    <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${item.gradient} flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 shadow-lg`}>
                      <Icon className="w-10 h-10 text-white" />
                    </div>
                    
                    <h3 className="text-3xl font-black text-gray-900 mb-4 group-hover:text-red-600 transition-colors">
                      {item.title}
                    </h3>
                    
                    <p className="text-lg text-gray-600 leading-relaxed">
                      {item.description}
                    </p>

                    <div className="mt-6 flex items-center gap-2 text-red-600 font-bold group-hover:gap-4 transition-all">
                      <span>Discover More</span>
                      <ChevronRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* What You Get Section */}
        <div className="max-w-5xl mx-auto mb-32">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-red-600 via-rose-600 to-red-700 p-12 md:p-16 shadow-2xl">
            {/* Animated background pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,.2)_50%,transparent_75%,transparent_100%)] bg-[length:250%_250%] animate-shimmer" />
            </div>

            <div className="relative z-10">
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full mb-6">
                  <Star className="w-5 h-5 text-yellow-300 animate-pulse" />
                  <span className="text-sm font-bold text-white tracking-wider">PREMIUM EXPERIENCE</span>
                </div>
                
                <h2 className="text-4xl md:text-6xl font-black text-white mb-4">
                  Your Complete Transformation Package
                </h2>
                <p className="text-xl text-red-100">
                  Everything you need to dominate 2026 and beyond
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {whatYouGet.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-4 bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/20 transition-all duration-300 group"
                    style={{ 
                      animationDelay: `${index * 0.1}s`,
                      animation: isVisible ? 'fadeInUp 0.8s ease-out forwards' : 'none'
                    }}
                  >
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-white flex items-center justify-center group-hover:scale-110 transition-transform">
                      <CheckCircle className="w-5 h-5 text-red-600" />
                    </div>
                    <p className="text-white font-semibold text-lg leading-relaxed">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Previous Events Carousel */}
        <div className="max-w-7xl mx-auto mb-32">
          <div className="text-center mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-red-50 border-2 border-red-200 rounded-full mb-4 hover:scale-105 transition-transform">
              <Trophy className="w-5 h-5 text-red-600 animate-pulse" />
              <span className="text-sm font-bold text-red-600 tracking-wider">PROVEN TRACK RECORD</span>
            </div>
            <h2 className="text-5xl md:text-7xl font-black text-gray-900 leading-tight">
              Experience The <span className="text-red-600">Legacy</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Relive the transformative moments from Influencia Edition 1.0 that changed lives forever
            </p>
          </div>

          {/* Premium Carousel Container */}
          <div 
            className="relative px-4 md:px-16"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* Main Carousel Track */}
            <div className="relative h-[500px] md:h-[700px] overflow-visible">
              {/* Background glow effect */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-[400px] h-[400px] bg-gradient-to-r from-red-500/20 via-rose-500/20 to-red-500/20 rounded-full blur-3xl" />
              </div>

              {/* Slides Container */}
              <div className="relative h-full flex items-center justify-center perspective-1000">
                {eventImages.map((image, index) => {
                  // Calculate position relative to current slide
                  const diff = index - currentSlide;
                  const absoluteDiff = Math.abs(diff);
                  
                  // Determine if slide should be visible
                  const isVisible = absoluteDiff <= 2;
                  
                  // Calculate transforms
                  let translateX = 0;
                  let translateZ = 0;
                  let rotateY = 0;
                  let scale = 1;
                  let opacity = 0;
                  let zIndex = 0;
                  let blur = 0;

                  if (diff === 0) {
                    // Center - active slide
                    translateX = 0;
                    translateZ = 0;
                    rotateY = 0;
                    scale = 1;
                    opacity = 1;
                    zIndex = 50;
                    blur = 0;
                  } else if (diff === 1 || (diff < 0 && diff === -(eventImages.length - 1))) {
                    // Right side
                    translateX = 65;
                    translateZ = -200;
                    rotateY = -25;
                    scale = 0.85;
                    opacity = 0.6;
                    zIndex = 30;
                    blur = 1;
                  } else if (diff === -1 || (diff > 0 && diff === eventImages.length - 1)) {
                    // Left side
                    translateX = -65;
                    translateZ = -200;
                    rotateY = 25;
                    scale = 0.85;
                    opacity = 0.6;
                    zIndex = 30;
                    blur = 1;
                  } else if (diff === 2 || (diff < -1 && diff === -(eventImages.length - 2))) {
                    // Far right
                    translateX = 120;
                    translateZ = -350;
                    rotateY = -35;
                    scale = 0.7;
                    opacity = 0.3;
                    zIndex = 10;
                    blur = 2;
                  } else if (diff === -2 || (diff > 1 && diff === eventImages.length - 2)) {
                    // Far left
                    translateX = -120;
                    translateZ = -350;
                    rotateY = 35;
                    scale = 0.7;
                    opacity = 0.3;
                    zIndex = 10;
                    blur = 2;
                  }

                  return (
                    <div
                      key={index}
                      className="absolute top-1/2 left-1/2 transition-all duration-[2000ms] ease-out cursor-pointer"
                      style={{
                        transform: `translate(-50%, -50%) translateX(${translateX}%) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
                        opacity: isVisible ? opacity : 0,
                        zIndex,
                        filter: `blur(${blur}px)`,
                        pointerEvents: diff === 0 ? 'auto' : 'none',
                        transformStyle: 'preserve-3d'
                      }}
                      onClick={() => {
                        if (diff === 1 || (diff < 0 && diff === -(eventImages.length - 1))) {
                          goToNextSlide();
                        } else if (diff === -1 || (diff > 0 && diff === eventImages.length - 1)) {
                          goToPrevSlide();
                        }
                      }}
                    >
                      {/* Card */}
                      <div className="relative group">
                        {/* Main card container */}
                        <div className="relative w-[300px] h-[400px] md:w-[450px] md:h-[600px] rounded-3xl overflow-hidden bg-white shadow-2xl">
                          {/* Image container with proper aspect ratio preservation */}
                          <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200">
                            <img
                              src={image.src}
                              alt={image.caption}
                              className="w-full h-full object-contain"
                              loading={absoluteDiff <= 1 ? "eager" : "lazy"}
                            />
                          </div>
                          
                          {/* Gradient overlay for text legibility */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none" />
                          
                          {/* Content overlay */}
                          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 space-y-3">
                            {/* Edition badge */}
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-red-600/90 backdrop-blur-sm rounded-full">
                              <Star className="w-3 h-3 md:w-4 md:h-4 fill-white text-white" />
                              <span className="text-xs md:text-sm font-bold text-white">
                                Edition 1.0
                              </span>
                            </div>

                            {/* Caption */}
                            <h3 className="text-2xl md:text-3xl font-black text-white leading-tight">
                              {image.caption}
                            </h3>
                            
                            {/* Subtitle */}
                            <p className="text-sm md:text-base text-gray-300 font-medium">
                              {image.subtitle}
                            </p>

                            {/* Counter */}
                            <div className="flex items-center gap-2 text-red-400 font-bold text-sm">
                              <div className="w-8 h-0.5 bg-red-400" />
                              <span>{String(index + 1).padStart(2, '0')} / {String(eventImages.length).padStart(2, '0')}</span>
                            </div>
                          </div>

                          {/* Shine effect on active card */}
                          {diff === 0 && (
                            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                          )}

                          {/* Border decoration */}
                          <div className="absolute inset-0 border-2 border-white/20 rounded-3xl pointer-events-none" />
                        </div>

                        {/* Active card glow */}
                        {diff === 0 && (
                          <>
                            <div className="absolute -inset-6 bg-gradient-to-r from-red-500/40 via-rose-500/40 to-red-500/40 rounded-3xl blur-3xl -z-10 animate-pulse" />
                            <div className="absolute -inset-3 bg-gradient-to-r from-red-600/30 to-rose-600/30 rounded-3xl blur-2xl -z-10" />
                          </>
                        )}

                        {/* Reflection effect */}
                        {diff === 0 && (
                          <div className="absolute -bottom-8 left-0 right-0 h-24 bg-gradient-to-t from-red-500/10 to-transparent rounded-b-3xl blur-xl -z-20" />
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Navigation Controls */}
            <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex items-center justify-between pointer-events-none z-[60]">
              <button
                onClick={goToPrevSlide}
                disabled={isTransitioning}
                className="pointer-events-auto group relative w-12 h-12 md:w-16 md:h-16 rounded-full bg-white/95 backdrop-blur-sm border-2 border-gray-200 shadow-xl hover:shadow-2xl flex items-center justify-center hover:bg-red-600 hover:border-red-600 transition-all duration-300 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                aria-label="Previous slide"
              >
                <ChevronLeft className="w-6 h-6 md:w-8 md:h-8 text-gray-900 group-hover:text-white transition-colors" />
                
                {/* Button glow */}
                <div className="absolute -inset-2 bg-red-500/0 group-hover:bg-red-500/30 rounded-full blur-xl transition-all duration-300 -z-10" />
              </button>

              <button
                onClick={goToNextSlide}
                disabled={isTransitioning}
                className="pointer-events-auto group relative w-12 h-12 md:w-16 md:h-16 rounded-full bg-white/95 backdrop-blur-sm border-2 border-gray-200 shadow-xl hover:shadow-2xl flex items-center justify-center hover:bg-red-600 hover:border-red-600 transition-all duration-300 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                aria-label="Next slide"
              >
                <ChevronRight className="w-6 h-6 md:w-8 md:h-8 text-gray-900 group-hover:text-white transition-colors" />
                
                {/* Button glow */}
                <div className="absolute -inset-2 bg-red-500/0 group-hover:bg-red-500/30 rounded-full blur-xl transition-all duration-300 -z-10" />
              </button>
            </div>

            {/* Progress Indicators */}
            <div className="relative mt-12 flex items-center justify-center gap-3">
              {eventImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  disabled={isTransitioning}
                  className={`group relative transition-all duration-500 ${
                    index === currentSlide
                      ? 'w-12 h-3'
                      : 'w-3 h-3 hover:w-6'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                >
                  {/* Indicator */}
                  <div className={`w-full h-full rounded-full transition-all duration-500 ${
                    index === currentSlide
                      ? 'bg-gradient-to-r from-red-600 to-rose-600 shadow-lg shadow-red-500/50'
                      : 'bg-gray-300 group-hover:bg-gray-400'
                  }`} />
                  
                  {/* Active indicator glow */}
                  {index === currentSlide && (
                    <div className="absolute -inset-1 bg-red-500/30 rounded-full blur-md -z-10 animate-pulse" />
                  )}
                </button>
              ))}
            </div>

            {/* Image counter display */}
            <div className="mt-6 text-center">
              <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/80 backdrop-blur-sm rounded-full border-2 border-gray-200 shadow-lg">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
                  <span className="text-sm font-bold text-gray-900">VIEWING</span>
                </div>
                <span className="text-2xl font-black text-red-600">
                  {String(currentSlide + 1).padStart(2, '0')}
                </span>
                <span className="text-sm font-medium text-gray-400">/</span>
                <span className="text-lg font-bold text-gray-600">
                  {String(eventImages.length).padStart(2, '0')}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Speaker Section */}
        <div className="max-w-7xl mx-auto mb-32">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-gray-900 to-gray-800 shadow-2xl">
            {/* Spotlight effect */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-gradient-to-b from-red-500/20 to-transparent pointer-events-none" />
            
            <div className="relative z-10 grid md:grid-cols-2 gap-12 p-8 md:p-20">
              {/* Left: Image */}
              <div className="relative flex items-center justify-center">
                <div className="relative group">
                  {/* Animated border */}
                  <div className="absolute -inset-4 bg-gradient-to-r from-red-500 via-rose-500 to-red-500 rounded-3xl blur-2xl opacity-50 group-hover:opacity-75 transition-opacity duration-500 animate-pulse" />
                  
                  {/* Image container */}
                  <div className="relative overflow-hidden rounded-3xl border-4 border-white/20 shadow-2xl">
                    <img
                      src={drRashidImage}
                      alt="Dr. Rashid Gazzali"
                      className="w-full h-auto object-cover aspect-[3/4] group-hover:scale-105 transition-transform duration-700"
                    />
                    
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent pointer-events-none" />
                  </div>

                  {/* Decorative elements */}
                  <div className="absolute -top-6 -right-6 w-24 h-24 bg-red-500/20 rounded-full blur-2xl" />
                  <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-rose-500/20 rounded-full blur-2xl" />
                </div>
              </div>

              {/* Right: Content */}
              <div className="flex flex-col justify-center space-y-8">
                <div className="inline-flex items-center gap-2 px-6 py-3 bg-red-500/20 border border-red-500/50 rounded-full backdrop-blur-sm w-fit">
                  <Award className="w-5 h-5 text-red-400" />
                  <span className="text-sm font-bold text-red-400 tracking-wider">MASTER FACILITATOR</span>
                </div>

                <div>
                  <h3 className="text-4xl md:text-6xl font-black text-white mb-6">
                    Dr. Rashid Gazzali
                  </h3>
                  
                  <div className="flex flex-wrap gap-3 mb-8">
                    <span className="px-4 py-2 bg-white/10 rounded-full text-white text-sm font-semibold backdrop-blur-sm border border-white/10">
                      20+ Years Experience
                    </span>
                    <span className="px-4 py-2 bg-white/10 rounded-full text-white text-sm font-semibold backdrop-blur-sm border border-white/10">
                      Global Speaker
                    </span>
                    <span className="px-4 py-2 bg-white/10 rounded-full text-white text-sm font-semibold backdrop-blur-sm border border-white/10">
                      Leadership Expert
                    </span>
                  </div>

                  <p className="text-xl text-gray-300 leading-relaxed mb-8">
                    Internationally acclaimed transformational coach who has guided CEOs, entrepreneurs, 
                    and emerging leaders across 15+ countries to breakthrough performance and lasting impact.
                  </p>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300 group">
                      <p className="text-3xl md:text-4xl font-black text-red-400 mb-2 group-hover:scale-110 transition-transform">10K+</p>
                      <p className="text-gray-400 text-sm">Professionals Trained</p>
                    </div>
                    <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300 group">
                      <p className="text-3xl md:text-4xl font-black text-red-400 mb-2 group-hover:scale-110 transition-transform">50+</p>
                      <p className="text-gray-400 text-sm">Corporate Workshops</p>
                    </div>
                    <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300 group">
                      <p className="text-3xl md:text-4xl font-black text-red-400 mb-2 group-hover:scale-110 transition-transform">98%</p>
                      <p className="text-gray-400 text-sm">Client Satisfaction</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Final CTA Section */}
        <div className="max-w-5xl mx-auto text-center space-y-8">
          <div className="relative inline-block">
            <Zap className="absolute -top-8 -left-8 w-16 h-16 text-red-500 animate-bounce" />
            <Zap className="absolute -bottom-8 -right-8 w-16 h-16 text-rose-500 animate-bounce" style={{ animationDelay: "0.5s" }} />
            
            <h2 className="text-5xl md:text-7xl font-black text-gray-900 mb-6">
              Your Future Starts <span className="text-red-600">Now</span>
            </h2>
          </div>

          <p className="text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Limited seats available. Join an exclusive cohort of ambitious individuals 
            ready to <span className="font-bold text-red-600">dominate 2026</span>.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-8">
            <Button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              size="lg"
              className="group px-12 py-8 text-xl font-bold bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white rounded-full shadow-2xl hover:shadow-red-500/50 transition-all duration-500 hover:scale-110"
            >
              <span>SECURE YOUR SPOT NOW</span>
              <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-2 transition-transform" />
            </Button>
            
            <div className="text-left">
              <p className="text-sm text-gray-500 line-through">₹4,999</p>
              <p className="text-3xl font-black text-red-600">Early Bird: ₹2,999</p>
            </div>
          </div>

          <div className="pt-8 flex items-center justify-center gap-8 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span>Instant Confirmation</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span>Secure Payment</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span>Money-Back Guarantee</span>
            </div>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes shimmer {
          0% {
            background-position: -250% 0;
          }
          100% {
            background-position: 250% 0;
          }
        }

        @keyframes gradient {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        .animate-shimmer {
          animation: shimmer 3s infinite;
        }

        .animate-gradient {
          animation: gradient 3s ease infinite;
        }

        .perspective-1000 {
          perspective: 1000px;
        }

        /* Smooth scrolling for mobile */
        @media (max-width: 768px) {
          .perspective-1000 {
            perspective: 800px;
          }
        }
      `}} />
    </section>
  );
};

export default AboutInfluencia;
