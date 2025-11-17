import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Target, 
  Eye, 
  Heart, 
  Award, 
  Users, 
  TrendingUp,
  Briefcase,
  GraduationCap,
  Sparkles,
  ArrowRight,
  Building2,
  Globe,
  Star
} from "lucide-react";
import { Link } from "react-router-dom";

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-dubai-sand to-white">
      {/* Hero Section */}
      <section className="relative py-32 bg-gradient-to-br from-dubai-navy via-slate-900 to-dubai-navy overflow-hidden">
        <div className="absolute inset-0 gradient-mesh opacity-30" />
        
        <div className="container mx-auto px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6 bg-dubai-gold text-dubai-navy hover:bg-yellow-500 text-sm font-bold px-6 py-2 animate-fade-in">
              ABOUT KAISAN ASSOCIATES
            </Badge>
            
            <h1 className="text-6xl md:text-7xl font-bold text-white mb-6 animate-fade-in-up">
              Transforming Organizations,
              <span className="text-gradient-gold block mt-2">Empowering People</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 leading-relaxed animate-fade-in-up animation-delay-200">
              Dubai's premier consultancy for human resource development and organizational excellence
            </p>
          </div>
        </div>
      </section>

      {/* Company Overview */}
      <section className="py-20 -mt-16 relative z-10">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <Card className="glass-card border-0 shadow-2xl p-8 md:p-12">
              <div className="grid md:grid-cols-3 gap-8 mb-12">
                {[
                  { icon: Building2, label: "Established", value: "Dubai, UAE" },
                  { icon: Users, label: "Professionals Trained", value: "7,000+" },
                  { icon: Globe, label: "Global Reach", value: "International" }
                ].map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="w-16 h-16 bg-dubai-gold rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <stat.icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="text-sm text-gray-500 mb-1">{stat.label}</div>
                    <div className="text-2xl font-bold text-dubai-navy">{stat.value}</div>
                  </div>
                ))}
              </div>

              <div className="prose prose-lg max-w-none">
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  <span className="font-bold text-dubai-navy">Kaisan for Human Resource Consultancies</span> is a leading 
                  Dubai-based firm specializing in personalized solutions for human resource development and organizational growth. 
                  Under the visionary leadership of <span className="font-semibold text-dubai-gold">Dr. Rashid Gazzali</span>, 
                  our consultancy provides a comprehensive range of services tailored to meet the unique needs of individuals and organizations.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  We pride ourselves on delivering research-driven, innovative solutions that foster excellence, inclusivity, 
                  and continuous learning. Our commitment is to transform potential into performance and aspirations into achievements.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-dubai-navy mb-4">Our Foundation</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Guided by purpose, driven by excellence
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {[
              {
                icon: Target,
                title: "Mission",
                description: "To empower individuals and organizations to achieve their full potential through innovative, research-driven solutions that foster excellence, inclusivity, and continuous learning.",
                gradient: "from-blue-500 to-cyan-500"
              },
              {
                icon: Eye,
                title: "Vision",
                description: "To be the most trusted and transformative human resource consultancy in the region, recognized for creating lasting impact and sustainable growth.",
                gradient: "from-purple-500 to-pink-500"
              },
              {
                icon: Heart,
                title: "Values",
                description: "Excellence, Integrity, Innovation, Inclusivity, Collaboration, and Continuous Learning form the cornerstone of everything we do.",
                gradient: "from-amber-500 to-orange-500"
              }
            ].map((item, index) => (
              <Card key={index} className="group relative overflow-hidden border-0 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                <div className={`absolute -inset-0.5 bg-gradient-to-r ${item.gradient} opacity-0 group-hover:opacity-100 blur rounded-2xl transition-opacity duration-300`} />
                <CardContent className="relative p-8 bg-white rounded-2xl">
                  <div className={`w-16 h-16 bg-gradient-to-r ${item.gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <item.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-dubai-navy mb-4">{item.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership - Dr. Rashid Gazzali */}
      <section className="py-20 bg-gradient-to-br from-dubai-navy via-slate-900 to-dubai-navy relative overflow-hidden">
        <div className="absolute inset-0 gradient-mesh opacity-20" />
        
        <div className="container mx-auto px-6 lg:px-8 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <Badge className="mb-4 bg-dubai-gold text-dubai-navy">LEADERSHIP</Badge>
              <h2 className="text-5xl font-bold text-white mb-4">Meet Our Visionary Leader</h2>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Image */}
              <div className="relative">
                <div className="aspect-square rounded-3xl bg-gradient-to-br from-dubai-gold to-yellow-600 p-1">
                  <div className="w-full h-full rounded-3xl overflow-hidden">
                    <img
                      src="/images/dr-rashid-speaking.jpg"
                      alt="Dr. Rashid Gazzali"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="absolute -bottom-6 -right-6 w-40 h-40 bg-dubai-gold/30 rounded-full blur-3xl" />
                <div className="absolute -top-6 -left-6 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl" />
              </div>

              {/* Content */}
              <div className="text-white">
                <h3 className="text-4xl font-bold mb-4 text-dubai-gold">Dr. Rashid Gazzali</h3>
                <p className="text-xl text-gray-300 mb-6">
                  Founder & Managing Director
                </p>
                
                <div className="space-y-4 mb-8">
                  <p className="text-gray-200 leading-relaxed">
                    With over <span className="text-dubai-gold font-semibold">15 years of experience</span> as a 
                    global business coach, Dr. Rashid Gazzali has transformed thousands of lives and organizations 
                    across the world. His unique approach combines academic rigor with practical wisdom.
                  </p>
                  <p className="text-gray-200 leading-relaxed">
                    Recognized internationally for his contributions to leadership development and organizational 
                    transformation, Dr. Gazzali has been featured in numerous business magazines and honored by 
                    the US ministry as a "Life Changing" leader.
                  </p>
                </div>

                {/* Roles & Credentials */}
                <div className="grid md:grid-cols-2 gap-4 mb-8">
                  {[
                    { icon: Briefcase, label: "CMD, Kaisan HR Consultancy" },
                    { icon: GraduationCap, label: "Managing Director, Nilgiri College (NAAC A++)" },
                    { icon: Star, label: "Executive Director, Sign Institute" },
                    { icon: Award, label: "Doctorate from Switzerland" }
                  ].map((role, index) => (
                    <div key={index} className="flex items-start gap-3 p-4 rounded-xl bg-white/10 backdrop-blur-sm">
                      <role.icon className="w-5 h-5 text-dubai-gold flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-200">{role.label}</span>
                    </div>
                  ))}
                </div>

                {/* Expertise areas */}
                <div className="flex flex-wrap gap-2">
                  {[
                    "Life Coach",
                    "International Trainer",
                    "Business Consultant",
                    "Educationist",
                    "Leadership Expert",
                    "Organizational Development"
                  ].map((expertise, index) => (
                    <Badge key={index} variant="outline" className="border-dubai-gold/30 text-dubai-gold bg-dubai-gold/10">
                      {expertise}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Expert Team Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-dubai-gold/10 text-dubai-gold">EXPERT TEAM</Badge>
            <h2 className="text-5xl font-bold text-dubai-navy mb-4">Our Distinguished Mentors</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Learn from industry leaders with decades of combined experience
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                name: "Dr. Rashid Gazzali",
                role: "Managing Director & Programme Director",
                image: "/images/dr-rashid-formal.jpeg",
                credentials: ["Life Coach", "International Trainer", "Business Consultant"],
                description: "15+ years as global business coach, transforming organizations worldwide"
              },
              {
                name: "Prof. Arvinder S. Chawla",
                role: "Senior Mentor",
                image: "/images/prof-arvinder.jpg",
                credentials: ["Former Vice Chancellor", "Academic Leader", "Education Expert"],
                description: "Former VC of Lamrin Tech Skills University & RIMT University"
              },
              {
                name: "Dr. Saji Gopinath",
                role: "Senior Mentor",
                image: "/images/dr-saji.jpg",
                credentials: ["Former Vice Chancellor", "Digital Innovation Expert", "Educator"],
                description: "Former VC of Kerala University of Digital Sciences"
              }
            ].map((mentor, index) => (
              <Card key={index} className="group glass-card border-0 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden">
                <div className="relative h-80 overflow-hidden">
                  <img
                    src={mentor.image}
                    alt={mentor.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="text-2xl font-bold mb-1">{mentor.name}</h3>
                    <p className="text-sm text-dubai-gold font-semibold">{mentor.role}</p>
                  </div>
                </div>
                <CardContent className="p-6">
                  <p className="text-gray-600 text-sm mb-4 leading-relaxed">{mentor.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {mentor.credentials.map((cred, i) => (
                      <Badge key={i} variant="outline" className="text-xs border-dubai-gold/30 text-dubai-gold bg-dubai-gold/5">
                        {cred}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Services Portfolio */}
      <section className="py-20 bg-dubai-sand/50">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-dubai-gold/10 text-dubai-gold">OUR SERVICES</Badge>
            <h2 className="text-5xl font-bold text-dubai-navy mb-4">Comprehensive Solutions</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Tailored services to meet your unique organizational and personal development needs
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {[
              {
                icon: Users,
                title: "Talent Development",
                description: "Customized training programs, workshops, and coaching sessions designed for individuals and teams to enhance skills and performance.",
                features: ["Leadership Training", "Team Building", "Skill Workshops"]
              },
              {
                icon: TrendingUp,
                title: "Organizational Development",
                description: "Strategic planning, change management, and process improvement solutions to drive organizational excellence.",
                features: ["Strategic Planning", "Change Management", "Process Optimization"]
              },
              {
                icon: Briefcase,
                title: "HR Advisory",
                description: "Expert guidance on HR policies, procedures, and best practices to build high-performing organizations.",
                features: ["Policy Development", "Compliance", "Best Practices"]
              },
              {
                icon: Award,
                title: "Leadership Development",
                description: "Executive coaching, mentoring, and leadership training programs for current and aspiring leaders.",
                features: ["Executive Coaching", "Mentorship", "Leadership Programs"]
              },
              {
                icon: GraduationCap,
                title: "Assessment Centers",
                description: "Comprehensive evaluation and development programs for employee assessment and growth.",
                features: ["Talent Assessment", "Development Plans", "Performance Reviews"]
              },
              {
                icon: Sparkles,
                title: "Custom Solutions",
                description: "Bespoke consultancy services designed to address your specific organizational challenges.",
                features: ["Tailored Programs", "Industry-Specific", "Flexible Delivery"]
              }
            ].map((service, index) => (
              <Card key={index} className="group glass-card border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                <CardContent className="p-8">
                  <div className="w-14 h-14 bg-gradient-to-br from-dubai-gold to-yellow-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <service.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-dubai-navy mb-3">{service.title}</h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">{service.description}</p>
                  <div className="space-y-2">
                    {service.features.map((feature, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm text-gray-500">
                        <div className="w-1.5 h-1.5 rounded-full bg-dubai-gold" />
                        {feature}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-bold text-dubai-navy mb-4">Why Choose Kaisan Associates</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                What sets us apart in the industry
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  title: "Proven Track Record",
                  description: "Over 7,000 professionals trained and countless organizations transformed through our programs."
                },
                {
                  title: "Expert Leadership",
                  description: "Led by internationally recognized experts with decades of combined experience in organizational development."
                },
                {
                  title: "Customized Approach",
                  description: "Every solution is tailored to your specific needs, challenges, and organizational culture."
                },
                {
                  title: "Global Perspective",
                  description: "Incorporating best practices and insights from international markets and industries."
                },
                {
                  title: "Research-Driven",
                  description: "Our methodologies are backed by the latest research in human psychology and organizational behavior."
                },
                {
                  title: "Lasting Impact",
                  description: "We focus on sustainable change that delivers long-term value and measurable results."
                }
              ].map((reason, index) => (
                <div key={index} className="flex gap-4 p-6 rounded-2xl bg-gradient-to-br from-dubai-sand/30 to-transparent hover:from-dubai-sand/50 transition-colors">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-xl bg-dubai-gold flex items-center justify-center">
                      <Sparkles className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-dubai-navy mb-2">{reason.title}</h4>
                    <p className="text-gray-600 leading-relaxed">{reason.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-dubai-navy via-slate-900 to-dubai-navy relative overflow-hidden">
        <div className="absolute inset-0 gradient-mesh opacity-20" />
        
        <div className="container mx-auto px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-5xl font-bold text-white mb-6">
              Let's Build Your Future Together
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Partner with Kaisan Associates to unlock your organization's full potential 
              and achieve unprecedented growth.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <Button size="lg" className="btn-premium bg-dubai-gold text-dubai-navy hover:bg-yellow-500 shadow-gold-glow group">
                  Get Started Today
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/courses">
                <Button size="lg" className="btn-premium bg-white text-dubai-navy hover:bg-gray-100 border-2 border-white shadow-lg">
                  Explore Our Programs
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
