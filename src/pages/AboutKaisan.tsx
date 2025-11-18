import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, Sparkles } from 'lucide-react';

const AboutPage = () => {
  return (
    <div className="bg-dubai-sand">
      {/* Hero Section */}
      <section className="relative py-28 bg-gradient-to-br from-dubai-navy via-slate-900 to-dubai-navy overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center opacity-10" style={{ backgroundImage: "url('/images/about-us.jpg')" }} />
        <div className="container mx-auto px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center text-white">
            <span className="inline-block px-4 py-1 rounded-full bg-dubai-gold/20 text-dubai-gold font-semibold mb-4">ABOUT KAISAN</span>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">About Us</h1>
            <p className="text-xl text-gray-300 leading-relaxed">Kaisan Associates is a leading provider of organizational development and talent management solutions.</p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-5xl font-bold text-dubai-navy mb-6">Our Mission</h2>
            <p className="text-xl text-gray-700 leading-relaxed">
              Our mission is to empower organizations and leaders to reach their fullest potential through
              tailored leadership development, research-backed learning solutions, and strategic advisory services
              that deliver measurable results and sustainable growth.
            </p>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-20 bg-dubai-sand">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-5xl font-bold text-dubai-navy mb-6">Our Vision</h2>
            <p className="text-xl text-gray-700 leading-relaxed">
              Our vision is to be the trusted global partner in human capital transformation, shaping future-ready
              organizations and leaders who create lasting, positive impact across industries and communities.
            </p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-5xl font-bold text-dubai-navy mb-4 text-center">Our Values</h2>
            <p className="text-xl text-gray-600 text-center mb-12">
              The principles that guide our work
            </p>
            
            <div className="grid md:grid-cols-2 gap-8">
            {[{ title: 'Integrity', description: 'We uphold the highest standards of ethical behavior.' },
              { title: 'Excellence', description: 'We strive for excellence in all our work.' },
              { title: 'Innovation', description: 'We are committed to continuous improvement and innovation.' },
              { title: 'Collaboration', description: 'We believe in working together to achieve common goals.' }].map((value, index) => (
                <div key={index} className="flex gap-4 p-6 rounded-2xl bg-dubai-sand/30 hover:bg-dubai-sand/50 shadow-lg hover:shadow-xl transition-all">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-xl bg-dubai-gold flex items-center justify-center">
                      <Sparkles className="w-6 h-6 text-dubai-navy" />
                    </div>
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-dubai-navy mb-2">{value.title}</h4>
                    <p className="text-gray-700 leading-relaxed">{value.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-dubai-sand">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-5xl font-bold text-dubai-navy mb-4 text-center">Why Choose Kaisan Associates</h2>
            <p className="text-xl text-gray-600 text-center mb-12">
              What sets us apart in the industry
            </p>

            <div className="grid md:grid-cols-2 gap-8">
            {[{ title: 'Proven Track Record', description: 'Over 7,000 professionals trained and countless organizations transformed through our programs.' },
              { title: 'Expert Leadership', description: 'Led by internationally recognized experts with decades of combined experience in organizational development.' },
              { title: 'Customized Approach', description: 'Every solution is tailored to your specific needs, challenges, and organizational culture.' },
              { title: 'Global Perspective', description: 'Incorporating best practices and insights from international markets and industries.' },
              { title: 'Research-Driven', description: 'Our methodologies are backed by the latest research in human psychology and organizational behavior.' },
              { title: 'Lasting Impact', description: 'We focus on sustainable change that delivers long-term value and measurable results.' }].map((reason, index) => (
                <div key={index} className="flex gap-4 p-6 rounded-2xl bg-white/80 hover:bg-white shadow-lg hover:shadow-xl transition-all">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-xl bg-dubai-gold flex items-center justify-center">
                        <Sparkles className="w-6 h-6 text-dubai-navy" />
                      </div>
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-dubai-navy mb-2">{reason.title}</h4>
                      <p className="text-gray-700 leading-relaxed">{reason.description}</p>
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