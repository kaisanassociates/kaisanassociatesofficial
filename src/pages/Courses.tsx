import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowRight, 
  Calendar, 
  Users, 
  Award, 
  BookOpen, 
  Trophy, 
  Star,
  CheckCircle2,
  Clock,
  MapPin,
  GraduationCap
} from "lucide-react";
import { Link } from "react-router-dom";

const Courses = () => {
  const [activeTab, setActiveTab] = useState("executive");

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-dubai-sand to-white">
      {/* Hero Section */}
      <section className="relative py-32 bg-gradient-to-br from-dubai-navy via-slate-900 to-dubai-navy overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-10"
          style={{ backgroundImage: "url('/images/pattern-bg.jpg')" }}
        />
        <div className="absolute inset-0 gradient-mesh opacity-30" />
        
        <div className="container mx-auto px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6 bg-dubai-gold text-dubai-navy hover:bg-yellow-500 text-sm font-bold px-6 py-2">
              SIGNATURE PROGRAMS
            </Badge>
            
            <h1 className="text-6xl md:text-7xl font-bold text-white mb-6 animate-fade-in-up">
              Transform Your Future
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 leading-relaxed animate-fade-in-up animation-delay-200">
              Choose from three world-class programs designed to elevate your career, 
              leadership skills, and personal excellence
            </p>
          </div>
        </div>

        {/* Decorative element */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
      </section>

      {/* Programs Tabs */}
      <section className="py-20 -mt-16 relative z-10">
        <div className="container mx-auto px-6 lg:px-8">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="max-w-7xl mx-auto">
            <TabsList className="grid w-full grid-cols-1 md:grid-cols-3 gap-4 bg-transparent h-auto p-0">
              <TabsTrigger 
                value="executive"
                className="data-[state=active]:bg-dubai-navy data-[state=active]:text-white bg-white shadow-lg hover:shadow-xl transition-all duration-300 p-6 rounded-2xl h-auto border-2 data-[state=active]:border-dubai-gold border-transparent"
              >
                <div className="text-left w-full">
                  <div className="text-sm font-semibold mb-1 text-dubai-gold">KiSE Programme</div>
                  <div className="text-lg font-bold">Executive Business Management</div>
                </div>
              </TabsTrigger>
              
              <TabsTrigger 
                value="influencia"
                className="data-[state=active]:bg-dubai-navy data-[state=active]:text-white bg-white shadow-lg hover:shadow-xl transition-all duration-300 p-6 rounded-2xl h-auto border-2 data-[state=active]:border-dubai-gold border-transparent"
              >
                <div className="text-left w-full">
                  <div className="text-sm font-semibold mb-1 text-dubai-gold">Workshop</div>
                  <div className="text-lg font-bold">Influencia Edition 2</div>
                </div>
              </TabsTrigger>
              
              <TabsTrigger 
                value="prp"
                className="data-[state=active]:bg-dubai-navy data-[state=active]:text-white bg-white shadow-lg hover:shadow-xl transition-all duration-300 p-6 rounded-2xl h-auto border-2 data-[state=active]:border-dubai-gold border-transparent"
              >
                <div className="text-left w-full">
                  <div className="text-sm font-semibold mb-1 text-dubai-gold">Professional Development</div>
                  <div className="text-lg font-bold">PRP Training</div>
                </div>
              </TabsTrigger>
            </TabsList>

            {/* Executive Business Management Programme */}
            <TabsContent value="executive" className="mt-12 animate-fade-in-up">
              <div className="grid lg:grid-cols-3 gap-8">
                {/* Main content */}
                <div className="lg:col-span-2 space-y-8">
                  <Card className="glass-card border-0 shadow-2xl overflow-hidden">
                    {/* Premium header with brochure image */}
                    <div className="relative h-96 overflow-hidden bg-gradient-to-br from-dubai-sand/30 to-white">
                      <img
                        src="/images/executive-business-management-brochure.jpg"
                        alt="Executive Business Management Programme"
                        className="w-full h-full object-contain p-4"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                    </div>
                    <div className="bg-gradient-to-br from-dubai-navy via-slate-900 to-dubai-navy p-8 text-white relative overflow-hidden">
                      <div className="absolute inset-0 gradient-mesh opacity-20" />
                      <div className="relative z-10">
                        <Badge className="bg-dubai-gold text-dubai-navy mb-4">12-Month Program</Badge>
                        <h2 className="text-5xl font-bold mb-2">KAISAN's KiSE Executive Business Management Programme</h2>
                        <p className="text-2xl font-light text-dubai-gold">
                          "Invest in Yourself, Invest in Your Future, Become an Expert"
                        </p>
                      </div>
                    </div>
                    
                    <CardContent className="p-8 space-y-8">
                      {/* Overview */}
                      <div>
                        <h3 className="text-2xl font-bold text-dubai-navy mb-4 flex items-center gap-2">
                          <BookOpen className="w-6 h-6 text-dubai-gold" />
                          Program Overview
                        </h3>
                        <p className="text-gray-600 leading-relaxed text-lg">
                          A comprehensive 12-month hybrid program providing senior professionals and entrepreneurs 
                          with cutting-edge business management strategies and leadership acumen. Led by Dr. Rashid 
                          Gazzali with 15+ years of experience as a global business coach.
                        </p>
                      </div>

                      {/* Key Features */}
                      <div className="grid md:grid-cols-2 gap-6">
                        {[
                          {
                            icon: Calendar,
                            title: "Quarterly Workshops",
                            description: "2-day intensive offline sessions covering core business modules"
                          },
                          {
                            icon: Users,
                            title: "Weekly Support",
                            description: "1-hour virtual sessions with Dr. Gazzali and senior coaches"
                          },
                          {
                            icon: Award,
                            title: "One-on-One Mentorship",
                            description: "Personalized quarterly counseling sessions"
                          },
                          {
                            icon: Trophy,
                            title: "Capstone Project",
                            description: "Solve real-world business challenges"
                          }
                        ].map((feature, index) => (
                          <div key={index} className="flex gap-4 p-4 rounded-xl bg-dubai-sand/30 hover:bg-dubai-sand/50 transition-colors">
                            <div className="flex-shrink-0">
                              <div className="w-12 h-12 rounded-lg bg-dubai-gold flex items-center justify-center">
                                <feature.icon className="w-6 h-6 text-white" />
                              </div>
                            </div>
                            <div>
                              <h4 className="font-bold text-dubai-navy mb-1">{feature.title}</h4>
                              <p className="text-sm text-gray-600">{feature.description}</p>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Content Modules */}
                      <div>
                        <h3 className="text-2xl font-bold text-dubai-navy mb-4 flex items-center gap-2">
                          <GraduationCap className="w-6 h-6 text-dubai-gold" />
                          Content Modules
                        </h3>
                        <div className="grid md:grid-cols-2 gap-4">
                          {[
                            "Financial Management",
                            "Marketing Management",
                            "Human Resource Management",
                            "Operations Management",
                            "Strategic Management",
                            "Accounting for Managers",
                            "Managerial Economics",
                            "Leadership Development"
                          ].map((module, index) => (
                            <div key={index} className="flex items-center gap-3 p-3 rounded-lg hover:bg-dubai-sand/30 transition-colors">
                              <CheckCircle2 className="w-5 h-5 text-dubai-gold flex-shrink-0" />
                              <span className="text-gray-700">{module}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Expert Mentors */}
                      <div className="bg-gradient-to-br from-dubai-navy to-slate-900 rounded-2xl p-8 text-white">
                        <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                          <Star className="w-6 h-6 text-dubai-gold" />
                          Expert Mentors
                        </h3>
                        <div className="space-y-4">
                          <div className="border-l-4 border-dubai-gold pl-4">
                            <h4 className="font-bold text-lg text-dubai-gold mb-1">Dr. Rashid Gazzali</h4>
                            <p className="text-sm text-gray-300">
                              Programme Director | Life Coach | International Trainer & Consultant<br />
                              Managing Director, Nilgiri College of Arts & Science (NAAC A++)
                            </p>
                          </div>
                          <div className="border-l-4 border-dubai-gold pl-4">
                            <h4 className="font-bold text-lg text-dubai-gold mb-1">Prof. Arvinder S. Chawla</h4>
                            <p className="text-sm text-gray-300">
                              Former Vice Chancellor of Lamrin Tech Skills University & RIMT University
                            </p>
                          </div>
                          <div className="border-l-4 border-dubai-gold pl-4">
                            <h4 className="font-bold text-lg text-dubai-gold mb-1">Dr. Saji Gopinath</h4>
                            <p className="text-sm text-gray-300">
                              Former Vice Chancellor of Kerala University of Digital Sciences
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Additional Benefits */}
                      <div>
                        <h3 className="text-2xl font-bold text-dubai-navy mb-4">Additional Benefits</h3>
                        <div className="space-y-3">
                          {[
                            "Campus Immersion (3 days at Nilgiri College)",
                            "Industry Guest Lectures",
                            "Exclusive Networking Events",
                            "Accredited Certification",
                            "Resource Access (e-library, templates, tools)",
                            "Lifetime Alumni Membership"
                          ].map((benefit, index) => (
                            <div key={index} className="flex items-center gap-3">
                              <div className="w-2 h-2 rounded-full bg-dubai-gold" />
                              <span className="text-gray-700">{benefit}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                  <Card className="glass-card border-0 shadow-xl sticky top-24">
                    <CardContent className="pt-6">
                      <div className="space-y-6">
                        <div>
                          <div className="text-sm text-gray-500 mb-1">Duration</div>
                          <div className="flex items-center gap-2 text-dubai-navy font-semibold">
                            <Clock className="w-5 h-5 text-dubai-gold" />
                            <span>12 Months</span>
                          </div>
                        </div>
                        
                        <div>
                          <div className="text-sm text-gray-500 mb-1">Format</div>
                          <Badge className="bg-dubai-gold/10 text-dubai-gold hover:bg-dubai-gold/20">
                            Hybrid (Online + Offline)
                          </Badge>
                        </div>

                        <div>
                          <div className="text-sm text-gray-500 mb-1">Ideal For</div>
                          <div className="space-y-2 text-sm text-gray-700">
                            <div>• Mid to senior-level professionals</div>
                            <div>• Entrepreneurs scaling businesses</div>
                            <div>• Aspiring leaders</div>
                          </div>
                        </div>

                        <div className="pt-6 border-t">
                          <Link to="/contact">
                            <Button className="w-full btn-premium bg-dubai-gold text-dubai-navy hover:bg-yellow-500 shadow-gold-glow group">
                              Enroll Now
                              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Button>
                          </Link>
                          <p className="text-xs text-center text-gray-500 mt-3">
                            Limited seats available
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            {/* Influencia Edition 2 */}
            <TabsContent value="influencia" className="mt-12 animate-fade-in-up">
              <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                  <Card className="glass-card border-0 shadow-2xl overflow-hidden">
                    {/* Premium header with image */}
                    <div className="relative h-80 overflow-hidden bg-gradient-to-br from-dubai-sand/30 to-white">
                      <img
                        src="/images/influencia-poster.jpg"
                        alt="Influencia Edition 2"
                        className="w-full h-full object-contain p-4"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                    </div>
                    <div className="bg-gradient-to-br from-dubai-navy via-slate-900 to-dubai-navy p-8 text-white relative overflow-hidden">
                      <div className="absolute inset-0 gradient-mesh opacity-20" />
                      <div className="relative z-10">
                        <Badge className="bg-dubai-gold text-dubai-navy mb-4">7-Hour Intensive Workshop</Badge>
                        <h2 className="text-5xl font-bold mb-2">Influencia</h2>
                        <p className="text-3xl font-light text-dubai-gold mb-4">Edition 2</p>
                        <p className="text-xl text-gray-300">
                          Programming Workshop to Elevate Personal Life, Maintain Relationships, 
                          and Achieve Professional Excellence
                        </p>
                      </div>
                    </div>

                    <CardContent className="p-8 space-y-8">
                      {/* Key highlights */}
                      <div>
                        <h3 className="text-2xl font-bold text-dubai-navy mb-6">Workshop Highlights</h3>
                        <div className="grid md:grid-cols-3 gap-6">
                          <div className="text-center p-6 rounded-xl bg-gradient-to-br from-dubai-gold/10 to-yellow-500/10">
                            <div className="text-4xl font-bold text-dubai-gold mb-2">7</div>
                            <div className="text-sm text-gray-600">Hours of Intensive Programming</div>
                          </div>
                          <div className="text-center p-6 rounded-xl bg-gradient-to-br from-dubai-navy/10 to-slate-900/10">
                            <div className="text-4xl font-bold text-dubai-navy mb-2">250</div>
                            <div className="text-sm text-gray-600">Change Makers</div>
                          </div>
                          <div className="text-center p-6 rounded-xl bg-gradient-to-br from-dubai-gold/10 to-yellow-500/10">
                            <div className="text-4xl font-bold text-dubai-gold mb-2">3</div>
                            <div className="text-sm text-gray-600">Core Pillars</div>
                          </div>
                        </div>
                      </div>

                      {/* Three pillars */}
                      <div>
                        <h3 className="text-2xl font-bold text-dubai-navy mb-6">Three Pillars of Transformation</h3>
                        <div className="space-y-6">
                          {[
                            {
                              title: "Elevate Personal Life",
                              description: "Master self-awareness, emotional intelligence, and personal growth strategies to create lasting positive change in your daily life.",
                              color: "from-blue-500 to-cyan-500"
                            },
                            {
                              title: "Maintain Relationships",
                              description: "Develop communication skills, conflict resolution techniques, and relationship-building frameworks for meaningful connections.",
                              color: "from-purple-500 to-pink-500"
                            },
                            {
                              title: "Achieve Professional Excellence",
                              description: "Unlock career advancement strategies, leadership principles, and performance optimization methods for sustained success.",
                              color: "from-amber-500 to-orange-500"
                            }
                          ].map((pillar, index) => (
                            <div key={index} className="relative group">
                              <div className="absolute -inset-0.5 bg-gradient-to-r opacity-0 group-hover:opacity-100 blur rounded-2xl transition-opacity duration-300" style={{ background: `linear-gradient(to right, var(--tw-gradient-stops))`, ['--tw-gradient-stops' as any]: pillar.color }} />
                              <div className="relative p-6 bg-white rounded-2xl border border-gray-200">
                                <div className="flex items-start gap-4">
                                  <div className="flex-shrink-0">
                                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${pillar.color} flex items-center justify-center text-white font-bold text-xl`}>
                                      {index + 1}
                                    </div>
                                  </div>
                                  <div>
                                    <h4 className="text-xl font-bold text-dubai-navy mb-2">{pillar.title}</h4>
                                    <p className="text-gray-600 leading-relaxed">{pillar.description}</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* What you'll gain */}
                      <div className="bg-dubai-sand/50 rounded-2xl p-8">
                        <h3 className="text-2xl font-bold text-dubai-navy mb-6">What You'll Gain</h3>
                        <div className="grid md:grid-cols-2 gap-4">
                          {[
                            "Clarity in personal and professional goals",
                            "Enhanced emotional intelligence",
                            "Powerful communication frameworks",
                            "Stress management techniques",
                            "Leadership mindset development",
                            "Work-life balance strategies",
                            "Networking with like-minded individuals",
                            "Actionable implementation plans"
                          ].map((gain, index) => (
                            <div key={index} className="flex items-start gap-3">
                              <CheckCircle2 className="w-5 h-5 text-dubai-gold flex-shrink-0 mt-0.5" />
                              <span className="text-gray-700">{gain}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Call to action box */}
                      <div className="bg-gradient-to-br from-dubai-navy to-slate-900 rounded-2xl p-8 text-white text-center">
                        <h3 className="text-3xl font-bold mb-4">Ready to Influence Your Future?</h3>
                        <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                          Join 250 change makers in this transformative 7-hour journey. Limited seats available.
                        </p>
                        <Link to="/">
                          <Button size="lg" className="btn-premium bg-dubai-gold text-dubai-navy hover:bg-yellow-500 shadow-gold-glow">
                            Register for Influencia
                            <ArrowRight className="ml-2 w-5 h-5" />
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                  <Card className="glass-card border-0 shadow-xl sticky top-24">
                    <CardContent className="pt-6">
                      <div className="space-y-6">
                        <div>
                          <div className="text-sm text-gray-500 mb-1">Duration</div>
                          <div className="flex items-center gap-2 text-dubai-navy font-semibold">
                            <Clock className="w-5 h-5 text-dubai-gold" />
                            <span>7 Hours</span>
                          </div>
                        </div>
                        
                        <div>
                          <div className="text-sm text-gray-500 mb-1">Format</div>
                          <Badge className="bg-dubai-gold/10 text-dubai-gold hover:bg-dubai-gold/20">
                            In-Person Workshop
                          </Badge>
                        </div>

                        <div>
                          <div className="text-sm text-gray-500 mb-1">Capacity</div>
                          <div className="flex items-center gap-2 text-dubai-navy font-semibold">
                            <Users className="w-5 h-5 text-dubai-gold" />
                            <span>250 Participants</span>
                          </div>
                        </div>

                        <div>
                          <div className="text-sm text-gray-500 mb-1">Location</div>
                          <div className="flex items-start gap-2 text-dubai-navy font-semibold">
                            <MapPin className="w-5 h-5 text-dubai-gold flex-shrink-0" />
                            <span className="text-sm">Dubai, UAE</span>
                          </div>
                        </div>

                        <div className="pt-6 border-t">
                          <Link to="/">
                            <Button className="w-full btn-premium bg-dubai-gold text-dubai-navy hover:bg-yellow-500 shadow-gold-glow group mb-3">
                              Register Now
                              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Button>
                          </Link>
                          <Link to="/contact">
                            <Button variant="outline" className="w-full">
                              Learn More
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            {/* PRP Training */}
            <TabsContent value="prp" className="mt-12 animate-fade-in-up">
              <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                  <Card className="glass-card border-0 shadow-2xl overflow-hidden">
                    {/* PRP Brochure Image */}
                    <div className="relative h-64 overflow-hidden bg-gradient-to-br from-dubai-sand/30 to-white">
                      <img
                        src="/images/PRP_BROUCHURE.jpeg"
                        alt="PRP Training Programme"
                        className="w-full h-full object-contain p-4"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-white/80 via-transparent to-transparent pointer-events-none" />
                    </div>
                    <CardHeader>
                      <Badge className="bg-dubai-gold text-dubai-navy mb-4 w-fit">Professional Development</Badge>
                      <CardTitle className="text-4xl font-bold text-dubai-navy mb-2">
                        PRP Training Programme
                      </CardTitle>
                      <CardDescription className="text-xl text-gray-600">
                        Comprehensive Professional Development for Career Advancement
                      </CardDescription>
                    </CardHeader>
                    
                    <CardContent className="space-y-8">
                      <div>
                        <h3 className="text-2xl font-bold text-dubai-navy mb-4">About the Programme</h3>
                        <p className="text-gray-600 leading-relaxed text-lg">
                          The PRP (Professional Readiness Programme) Training is designed to equip professionals 
                          with essential skills, industry knowledge, and practical expertise needed to excel in 
                          today's competitive business environment. This comprehensive program focuses on bridging 
                          the gap between academic knowledge and real-world application.
                        </p>
                      </div>

                      {/* Key focus areas */}
                      <div>
                        <h3 className="text-2xl font-bold text-dubai-navy mb-6">Key Focus Areas</h3>
                        <div className="grid md:grid-cols-2 gap-6">
                          {[
                            {
                              icon: GraduationCap,
                              title: "Skill Enhancement",
                              description: "Master critical professional skills including communication, presentation, and technical competencies"
                            },
                            {
                              icon: Trophy,
                              title: "Industry Recognition",
                              description: "Earn certifications and credentials recognized by leading organizations"
                            },
                            {
                              icon: Users,
                              title: "Networking Opportunities",
                              description: "Connect with industry experts and build valuable professional relationships"
                            },
                            {
                              icon: BookOpen,
                              title: "Practical Application",
                              description: "Work on real projects and case studies to apply learned concepts"
                            }
                          ].map((area, index) => (
                            <div key={index} className="p-6 rounded-xl border border-gray-200 hover:border-dubai-gold hover:shadow-lg transition-all duration-300">
                              <div className="w-12 h-12 rounded-lg bg-dubai-gold/10 flex items-center justify-center mb-4">
                                <area.icon className="w-6 h-6 text-dubai-gold" />
                              </div>
                              <h4 className="font-bold text-dubai-navy mb-2">{area.title}</h4>
                              <p className="text-sm text-gray-600">{area.description}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Programme structure */}
                      <div className="bg-gradient-to-br from-dubai-sand/50 to-transparent rounded-2xl p-8">
                        <h3 className="text-2xl font-bold text-dubai-navy mb-6">Programme Structure</h3>
                        <div className="space-y-4">
                          {[
                            {
                              phase: "Phase 1",
                              title: "Foundation Building",
                              duration: "4 weeks",
                              description: "Core professional skills and fundamental concepts"
                            },
                            {
                              phase: "Phase 2",
                              title: "Specialized Training",
                              duration: "6 weeks",
                              description: "Industry-specific knowledge and advanced techniques"
                            },
                            {
                              phase: "Phase 3",
                              title: "Practical Implementation",
                              duration: "4 weeks",
                              description: "Real-world projects and case study analysis"
                            },
                            {
                              phase: "Phase 4",
                              title: "Assessment & Certification",
                              duration: "2 weeks",
                              description: "Final evaluation and credential awarding"
                            }
                          ].map((phase, index) => (
                            <div key={index} className="flex items-start gap-4 p-4 bg-white rounded-xl">
                              <div className="flex-shrink-0">
                                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-dubai-gold to-yellow-600 flex items-center justify-center">
                                  <span className="text-white font-bold text-sm">{phase.phase}</span>
                                </div>
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center justify-between mb-1">
                                  <h4 className="font-bold text-dubai-navy">{phase.title}</h4>
                                  <Badge variant="outline" className="text-xs">{phase.duration}</Badge>
                                </div>
                                <p className="text-sm text-gray-600">{phase.description}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Who should attend */}
                      <div>
                        <h3 className="text-2xl font-bold text-dubai-navy mb-4">Who Should Attend</h3>
                        <div className="grid md:grid-cols-2 gap-4">
                          {[
                            "Recent graduates entering the workforce",
                            "Early-career professionals seeking advancement",
                            "Career changers looking to upskill",
                            "Professionals returning to work after a break",
                            "Individuals seeking industry certifications",
                            "Team leaders and supervisors"
                          ].map((audience, index) => (
                            <div key={index} className="flex items-start gap-3">
                              <div className="w-2 h-2 rounded-full bg-dubai-gold mt-2 flex-shrink-0" />
                              <span className="text-gray-700">{audience}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Benefits */}
                      <div className="bg-gradient-to-br from-dubai-navy to-slate-900 rounded-2xl p-8 text-white">
                        <h3 className="text-2xl font-bold mb-6">Programme Benefits</h3>
                        <div className="space-y-3">
                          {[
                            "Industry-recognized certification upon completion",
                            "Access to exclusive job placement assistance",
                            "Lifetime access to learning resources",
                            "Mentorship from industry professionals",
                            "Portfolio development support",
                            "Continuing education opportunities"
                          ].map((benefit, index) => (
                            <div key={index} className="flex items-center gap-3">
                              <CheckCircle2 className="w-5 h-5 text-dubai-gold flex-shrink-0" />
                              <span className="text-gray-200">{benefit}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                  <Card className="glass-card border-0 shadow-xl sticky top-24">
                    <CardContent className="pt-6">
                      <div className="space-y-6">
                        <div>
                          <div className="text-sm text-gray-500 mb-1">Duration</div>
                          <div className="flex items-center gap-2 text-dubai-navy font-semibold">
                            <Clock className="w-5 h-5 text-dubai-gold" />
                            <span>16 Weeks</span>
                          </div>
                        </div>
                        
                        <div>
                          <div className="text-sm text-gray-500 mb-1">Format</div>
                          <Badge className="bg-dubai-gold/10 text-dubai-gold hover:bg-dubai-gold/20">
                            Hybrid Learning
                          </Badge>
                        </div>

                        <div>
                          <div className="text-sm text-gray-500 mb-1">Certification</div>
                          <div className="flex items-center gap-2 text-dubai-navy font-semibold text-sm">
                            <Award className="w-5 h-5 text-dubai-gold" />
                            <span>Industry Recognized</span>
                          </div>
                        </div>

                        <div>
                          <div className="text-sm text-gray-500 mb-1">Level</div>
                          <Badge variant="outline">Entry to Mid-Level</Badge>
                        </div>

                        <div className="pt-6 border-t">
                          <Link to="/contact">
                            <Button className="w-full btn-premium bg-dubai-gold text-dubai-navy hover:bg-yellow-500 shadow-gold-glow group mb-3">
                              Enroll Now
                              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Button>
                          </Link>
                          <Button variant="outline" className="w-full">
                            Download Brochure
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Contact card */}
                  <Card className="glass-card border-0 shadow-xl">
                    <CardContent className="pt-6">
                      <h4 className="font-bold text-dubai-navy mb-4">Need More Information?</h4>
                      <p className="text-sm text-gray-600 mb-4">
                        Our program advisors are here to help you choose the right path.
                      </p>
                      <Link to="/contact">
                        <Button variant="outline" className="w-full">
                          Contact Us
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-dubai-navy via-slate-900 to-dubai-navy relative overflow-hidden">
        <div className="absolute inset-0 gradient-mesh opacity-20" />
        
        <div className="container mx-auto px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Start Your Transformation Today
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Choose the program that aligns with your goals and take the first step towards excellence
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <Button size="lg" className="btn-premium bg-dubai-gold text-dubai-navy hover:bg-yellow-500 shadow-gold-glow">
                  Schedule a Consultation
                </Button>
              </Link>
              <Link to="/about">
                <Button size="lg" className="btn-premium bg-white text-dubai-navy hover:bg-gray-100 border-2 border-white shadow-lg">
                  Learn More About Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Courses;
