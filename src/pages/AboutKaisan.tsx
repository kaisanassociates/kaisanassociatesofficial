import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, Sparkles, Award, Users, CheckCircle2 } from 'lucide-react';

const AboutPage = () => {
  return (
    <div className="bg-dubai-sand">
      {/* Hero Section */}
      <section className="relative py-32 bg-dubai-navy overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-cover bg-center opacity-15" style={{ backgroundImage: "url('/images/dubai-skyline.jpg')" }} />
          <div className="absolute inset-0 bg-gradient-to-b from-dubai-navy via-transparent to-dubai-navy" />
        </div>
        <div className="absolute inset-0 gradient-mesh opacity-20" />
        <div className="container mx-auto px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center text-white">
            <span className="inline-block px-5 py-2 rounded-full bg-dubai-gold/20 text-dubai-gold font-bold text-xs uppercase tracking-widest mb-6 backdrop-blur-sm border border-dubai-gold/30">About Kaisan Associates</span>
            <h1 className="text-6xl md:text-7xl font-bold mb-6 tracking-tight">Transforming Leaders,<br /><span className="text-dubai-gold">Empowering Organizations</span></h1>
            <p className="text-xl text-gray-300 leading-relaxed max-w-2xl mx-auto">Dubai's premier consultancy for transformative leadership development, organizational excellence, and human capital transformation.</p>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/images/pattern-bg.jpg')] opacity-5" />
        <div className="container mx-auto px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
            <div className="order-2 lg:order-1">
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-dubai-gold to-yellow-600 rounded-3xl opacity-20 blur-lg" />
                <div className="relative bg-white p-8 rounded-3xl shadow-xl border border-gray-100">
                  <div className="w-16 h-16 bg-dubai-navy rounded-2xl flex items-center justify-center mb-6">
                    <Sparkles className="w-8 h-8 text-dubai-gold" />
                  </div>
                  <h2 className="text-4xl font-bold text-dubai-navy mb-6">Our Mission</h2>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    Our mission is to empower organizations and leaders to reach their fullest potential through
                    tailored leadership development, research-backed learning solutions, and strategic advisory services
                    that deliver measurable results and sustainable growth.
                  </p>
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <div className="relative h-[400px] rounded-3xl overflow-hidden shadow-2xl group">
                <img 
                  src="/images/dr-rashid-speaking.jpg" 
                  alt="Dr. Rashid Gazzali speaking at an event" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dubai-navy via-dubai-navy/50 to-transparent" />
                <div className="absolute bottom-8 left-8 right-8 text-white">
                  <p className="text-3xl font-bold mb-2">Empowering Growth</p>
                  <p className="text-dubai-gold text-lg font-semibold">15+ Years of Excellence</p>
                  <p className="text-gray-300 text-sm mt-2">7000+ Professionals Trained Globally</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="relative h-[400px] rounded-3xl overflow-hidden shadow-2xl group">
                <img 
                  src="/images/executive-business-management-brochure.jpg" 
                  alt="Executive Business Management Programme" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dubai-navy via-dubai-navy/60 to-transparent" />
                <div className="absolute bottom-8 left-8 right-8 text-white">
                  <p className="text-3xl font-bold mb-2">Global Impact</p>
                  <p className="text-dubai-gold text-lg font-semibold">Shaping Tomorrow's Leaders</p>
                  <p className="text-gray-300 text-sm mt-2">World-Class Training Programs</p>
                </div>
              </div>
            </div>
            <div>
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-dubai-navy to-slate-800 rounded-3xl opacity-10 blur-lg" />
                <div className="relative bg-white p-8 rounded-3xl shadow-xl border border-gray-100">
                  <div className="w-16 h-16 bg-dubai-gold rounded-2xl flex items-center justify-center mb-6">
                    <ArrowRight className="w-8 h-8 text-dubai-navy" />
                  </div>
                  <h2 className="text-4xl font-bold text-dubai-navy mb-6">Our Vision</h2>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    Our vision is to be the trusted global partner in human capital transformation, shaping future-ready
                    organizations and leaders who create lasting, positive impact across industries and communities.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-dubai-sand relative">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 rounded-full bg-dubai-navy/5 text-dubai-navy font-semibold text-sm mb-4">
              CORE PRINCIPLES
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-dubai-navy mb-6">Our Values</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              The guiding principles that define who we are and how we serve our partners
            </p>
          </div>
            
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: 'Integrity', description: 'We uphold the highest standards of ethical behavior in every interaction.', icon: Sparkles },
              { title: 'Excellence', description: 'We relentlessly strive for perfection in our delivery and outcomes.', icon: Award },
              { title: 'Innovation', description: 'We embrace new ideas and creative solutions to solve complex challenges.', icon: Sparkles },
              { title: 'Collaboration', description: 'We believe in the power of partnership to achieve shared success.', icon: Users }
            ].map((value, index) => (
              <div key={index} className="group bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                <div className="w-14 h-14 rounded-2xl bg-dubai-sand flex items-center justify-center mb-6 group-hover:bg-dubai-gold transition-colors duration-300">
                  <value.icon className="w-7 h-7 text-dubai-navy group-hover:text-white transition-colors duration-300" />
                </div>
                <h4 className="text-xl font-bold text-dubai-navy mb-3">{value.title}</h4>
                <p className="text-gray-600 leading-relaxed text-sm">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-dubai-navy mb-6">Why Choose Kaisan Associates</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                We bring a unique blend of expertise, innovation, and dedication to every engagement
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: 'Proven Track Record', description: 'Over 7,000 professionals trained and countless organizations transformed through our programs.' },
              { title: 'Expert Leadership', description: 'Led by internationally recognized experts with decades of combined experience in organizational development.' },
              { title: 'Customized Approach', description: 'Every solution is tailored to your specific needs, challenges, and organizational culture.' },
              { title: 'Global Perspective', description: 'Incorporating best practices and insights from international markets and industries.' },
              { title: 'Research-Driven', description: 'Our methodologies are backed by the latest research in human psychology and organizational behavior.' },
              { title: 'Lasting Impact', description: 'We focus on sustainable change that delivers long-term value and measurable results.' }
            ].map((reason, index) => (
                <div key={index} className="flex flex-col p-8 rounded-3xl bg-gray-50 hover:bg-white border border-transparent hover:border-dubai-gold/20 shadow-sm hover:shadow-xl transition-all duration-300 group">
                    <div className="w-12 h-12 rounded-full bg-dubai-navy/5 flex items-center justify-center mb-6 group-hover:bg-dubai-gold group-hover:text-white transition-colors duration-300">
                      <CheckCircle2 className="w-6 h-6 text-dubai-navy group-hover:text-white" />
                    </div>
                    <h4 className="text-xl font-bold text-dubai-navy mb-3">{reason.title}</h4>
                    <p className="text-gray-600 leading-relaxed text-sm">{reason.description}</p>
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