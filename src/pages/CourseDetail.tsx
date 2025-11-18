import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
  Phone,
  Download,
  FileText,
  GraduationCap,
  MapPin,
  Loader2
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { RegistrationForm } from "@/components/RegistrationForm";
import apiService from "@/lib/api";

// Map icon names to components
const iconMap: Record<string, any> = {
  Calendar, Users, Award, BookOpen, Trophy, Star, CheckCircle2, Clock, MapPin, GraduationCap
};

const CourseDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);

  useEffect(() => {
    loadCourse();
  }, [slug]);

  async function loadCourse() {
    setLoading(true);
    const res = await apiService.getCourses();
    if (res.success && res.data) {
      const found = res.data.find((c: any) => c.slug === slug);
      if (found) {
        setCourse(found);
      } else {
        // navigate("/courses"); // Redirect if not found
      }
    }
    setLoading(false);
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="w-8 h-8 animate-spin text-dubai-navy" />
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <h1 className="text-2xl font-bold text-dubai-navy mb-4">Course Not Found</h1>
        <Link to="/courses">
          <Button>Back to Courses</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 font-sans selection:bg-dubai-gold/30">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-dubai-navy overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/pattern-bg.jpg')] opacity-5 mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-dubai-navy/90"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl">
            <Link to="/courses" className="inline-flex items-center text-dubai-gold hover:text-white mb-6 transition-colors">
              <ArrowRight className="w-4 h-4 mr-2 rotate-180" /> Back to Programs
            </Link>
            <Badge variant="outline" className="mb-6 text-dubai-gold border-dubai-gold/30 px-4 py-1 tracking-widest uppercase text-xs font-semibold">
              {course.category || "Professional Program"}
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight leading-tight">
              {course.title}
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl leading-relaxed font-light">
              {course.shortDescription}
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 relative z-20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column */}
            <div className="lg:col-span-8 space-y-8">
              <Card className="border-0 shadow-xl bg-white rounded-3xl overflow-hidden">
                {course.heroImage && (
                  <div className="relative h-[400px]">
                    <img src={course.heroImage} alt={course.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-dubai-navy/60 to-transparent" />
                  </div>
                )}
                
                <CardContent className="p-8 md:p-12 space-y-12">
                  {/* Full Description */}
                  <div className="prose max-w-none text-gray-600 leading-relaxed text-lg">
                    <div dangerouslySetInnerHTML={{ __html: course.fullDescription || course.description }} />
                  </div>

                  {/* Features */}
                  {course.features && course.features.length > 0 && (
                    <div className="grid sm:grid-cols-2 gap-6">
                      {course.features.map((f: any, i: number) => {
                        const Icon = iconMap[f.icon] || Star;
                        return (
                          <div key={i} className="flex gap-4 p-4 rounded-2xl bg-gray-50/50 border border-gray-100 hover:border-dubai-gold/30 transition-colors">
                            <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center text-dubai-navy shrink-0">
                              <Icon className="w-6 h-6" />
                            </div>
                            <div>
                              <h4 className="font-bold text-dubai-navy">{f.title}</h4>
                              <p className="text-sm text-gray-500">{f.description}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* Modules */}
                  {course.modules && course.modules.length > 0 && (
                    <div>
                      <h3 className="text-2xl font-bold text-dubai-navy mb-6">Curriculum Modules</h3>
                      <div className="space-y-4">
                        {course.modules.map((m: any, i: number) => (
                          <div key={i} className="border border-gray-100 rounded-xl p-5 hover:border-dubai-gold/30 transition-colors bg-gray-50/50">
                            {typeof m === 'string' ? (
                              <div className="flex items-center gap-3">
                                <CheckCircle2 className="w-5 h-5 text-dubai-gold shrink-0" />
                                <span className="text-gray-700 font-medium">{m}</span>
                              </div>
                            ) : (
                              <div>
                                <div className="flex justify-between items-start mb-2">
                                  <h4 className="font-bold text-dubai-navy text-lg">{m.title}</h4>
                                  {m.duration && (
                                    <Badge variant="secondary" className="bg-white text-gray-500 border-gray-200">
                                      {m.duration}
                                    </Badge>
                                  )}
                                </div>
                                {m.content && m.content.length > 0 && (
                                  <ul className="space-y-2 mt-3">
                                    {m.content.map((topic: string, idx: number) => (
                                      <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                                        <div className="w-1.5 h-1.5 rounded-full bg-dubai-gold mt-1.5 shrink-0" />
                                        {topic}
                                      </li>
                                    ))}
                                  </ul>
                                )}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Mentors */}
                  {course.mentors && course.mentors.length > 0 && (
                    <div>
                      <h3 className="text-2xl font-bold text-dubai-navy mb-8">Expert Mentors</h3>
                      <div className="grid md:grid-cols-3 gap-6">
                        {course.mentors.map((m: any, i: number) => (
                          <div key={i} className="text-center group">
                            <div className="w-20 h-20 mx-auto rounded-full mb-4 overflow-hidden border-2 border-gray-100 group-hover:border-dubai-gold transition-colors">
                              {m.image ? (
                                <img src={m.image} alt={m.name} className="w-full h-full object-cover" />
                              ) : (
                                <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400 font-bold text-xl">
                                  {m.initials || m.name?.[0]}
                                </div>
                              )}
                            </div>
                            <h4 className="font-bold text-dubai-navy text-sm">{m.name}</h4>
                            <p className="text-xs text-gray-500 mt-1">{m.role}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Right Sidebar */}
            <div className="lg:col-span-4 space-y-6 sticky top-24">
              <Card className="border-0 shadow-lg bg-white rounded-3xl overflow-hidden">
                <div className="bg-dubai-navy p-6 text-center">
                  <p className="text-dubai-gold text-xs font-bold uppercase tracking-widest mb-1">Start Date</p>
                  <p className="text-2xl font-bold text-white">{course.startDate || "TBA"}</p>
                </div>
                <CardContent className="p-6 space-y-6">
                  <div className="space-y-4 text-sm">
                    <div className="flex justify-between py-2 border-b border-gray-50">
                      <span className="text-gray-500">Duration</span>
                      <span className="font-semibold text-dubai-navy">{course.duration}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-50">
                      <span className="text-gray-500">Format</span>
                      <span className="font-semibold text-dubai-navy">{course.format}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-50">
                      <span className="text-gray-500">Location</span>
                      <span className="font-semibold text-dubai-navy">{course.location}</span>
                    </div>
                    {course.price > 0 && (
                      <div className="flex justify-between py-2 border-b border-gray-50">
                        <span className="text-gray-500">Price</span>
                        <span className="font-semibold text-dubai-navy">${course.price}</span>
                      </div>
                    )}
                  </div>
                  <Button onClick={() => setIsRegistrationOpen(true)} className="w-full bg-dubai-gold text-dubai-navy hover:bg-yellow-500 font-bold h-12 rounded-xl">
                    Enroll Now
                  </Button>
                  <p className="text-xs text-center text-gray-400">Limited seats available</p>
                </CardContent>
              </Card>

              {course.brochureLink && (
                <Card className="border-0 shadow-md bg-white rounded-2xl overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group">
                  <CardContent className="p-5 flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-dubai-navy group-hover:bg-dubai-navy group-hover:text-white transition-colors">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-dubai-navy text-sm">Program Brochure</h4>
                      <a href={course.brochureLink} target="_blank" rel="noreferrer">
                        <Button variant="link" className="p-0 h-auto text-dubai-gold text-xs font-semibold hover:text-yellow-600">
                          Download PDF
                        </Button>
                      </a>
                    </div>
                  </CardContent>
                </Card>
              )}

              <Card className="border-0 shadow-md bg-gray-50 rounded-2xl overflow-hidden">
                <CardContent className="p-6 text-center">
                  <h4 className="font-bold text-dubai-navy mb-2">Questions?</h4>
                  <p className="text-sm text-gray-500 mb-4">Speak with our admissions team.</p>
                  <Link to="/contact">
                    <Button variant="outline" className="w-full border-gray-200 hover:bg-white hover:text-dubai-navy">Contact Us</Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Dialog open={isRegistrationOpen} onOpenChange={setIsRegistrationOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Program Registration</DialogTitle>
            <DialogDescription>
              Secure your spot in {course.title}.
            </DialogDescription>
          </DialogHeader>
          <RegistrationForm 
            defaultProgram={course.title} 
            onSuccess={() => setIsRegistrationOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CourseDetail;
