import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock,
  Send,
  CheckCircle2,
  Building2,
  MessageSquare
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ContactPage = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Message Sent Successfully!",
        description: "We'll get back to you within 24 hours.",
      });
      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        subject: "",
        message: ""
      });
      setIsSubmitting(false);
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-dubai-sand to-white">
      {/* Hero Section */}
      <section className="relative py-32 bg-gradient-to-br from-dubai-navy via-slate-900 to-dubai-navy overflow-hidden">
        <div className="absolute inset-0 gradient-mesh opacity-30" />
        
        <div className="container mx-auto px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6 bg-dubai-gold text-dubai-navy hover:bg-yellow-500 text-sm font-bold px-6 py-2 animate-fade-in">
              GET IN TOUCH
            </Badge>
            
            <h1 className="text-6xl md:text-7xl font-bold text-white mb-6 animate-fade-in-up">
              Let's Start a
              <span className="text-gradient-gold block mt-2">Conversation</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 leading-relaxed animate-fade-in-up animation-delay-200">
              Reach out to explore how Kaisan Associates can transform your organization
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 -mt-16 relative z-10">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-8">
            {/* Contact Information Cards */}
            <div className="space-y-6">
              {/* Office Location */}
              <Card className="glass-card border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-8">
                  <div className="w-14 h-14 bg-gradient-to-br from-dubai-gold to-yellow-600 rounded-xl flex items-center justify-center mb-6">
                    <MapPin className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-dubai-navy mb-4">Visit Our Office</h3>
                  <div className="space-y-2 text-gray-600">
                    <p className="font-semibold text-dubai-navy">Kaisan Associates</p>
                    <p>19th Floor</p>
                    <p>Conrad Business Tower</p>
                    <p>Sheikh Zayed Road</p>
                    <p>Dubai, UAE</p>
                  </div>
                  <Button 
                    variant="outline" 
                    className="w-full mt-6 border-dubai-gold text-dubai-gold hover:bg-dubai-gold hover:text-white"
                    onClick={() => window.open('https://maps.google.com/?q=Conrad+Business+Tower+Dubai', '_blank')}
                  >
                    <MapPin className="w-4 h-4 mr-2" />
                    Get Directions
                  </Button>
                </CardContent>
              </Card>

              {/* Phone Contact */}
              <Card className="glass-card border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-8">
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mb-6">
                    <Phone className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-dubai-navy mb-4">Call Us</h3>
                  <div className="space-y-3">
                    <a 
                      href="tel:+971506099326"
                      className="flex items-center gap-3 text-gray-700 hover:text-dubai-gold transition-colors group"
                    >
                      <Phone className="w-4 h-4 text-dubai-gold" />
                      <span className="group-hover:underline">+971 50 60 99 326</span>
                    </a>
                    <a 
                      href="tel:+97143827700"
                      className="flex items-center gap-3 text-gray-700 hover:text-dubai-gold transition-colors group"
                    >
                      <Phone className="w-4 h-4 text-dubai-gold" />
                      <span className="group-hover:underline">+971 43 827 700</span>
                    </a>
                  </div>
                  <div className="mt-6 pt-6 border-t">
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                      <Clock className="w-4 h-4" />
                      <span>Business Hours</span>
                    </div>
                    <p className="text-sm text-gray-600">
                      Sunday - Thursday: 9:00 AM - 6:00 PM<br />
                      Friday - Saturday: Closed
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Email Contact */}
              <Card className="glass-card border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-8">
                  <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-6">
                    <Mail className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-dubai-navy mb-4">Email Us</h3>
                  <a 
                    href="mailto:info@kaisanassociates.com"
                    className="text-dubai-gold hover:text-yellow-600 transition-colors text-lg font-medium hover:underline"
                  >
                    info@kaisanassociates.com
                  </a>
                  <p className="text-sm text-gray-600 mt-4">
                    We typically respond within 24 hours during business days.
                  </p>
                  <Button 
                    variant="outline" 
                    className="w-full mt-6 border-purple-500 text-purple-600 hover:bg-purple-500 hover:text-white"
                    onClick={() => window.location.href = 'mailto:info@kaisanassociates.com'}
                  >
                    <Mail className="w-4 h-4 mr-2" />
                    Send Email
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card className="glass-card border-0 shadow-2xl">
                <CardContent className="p-8 md:p-12">
                  <div className="mb-8">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 bg-dubai-gold rounded-xl flex items-center justify-center">
                        <MessageSquare className="w-6 h-6 text-white" />
                      </div>
                      <h2 className="text-3xl font-bold text-dubai-navy">Send Us a Message</h2>
                    </div>
                    <p className="text-gray-600">
                      Fill out the form below and our team will get back to you shortly. 
                      All fields marked with an asterisk (*) are required.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-dubai-navy font-semibold">
                          Full Name <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="name"
                          name="name"
                          placeholder="John Doe"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="border-gray-300 focus:border-dubai-gold focus:ring-dubai-gold"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-dubai-navy font-semibold">
                          Email Address <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="john@example.com"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="border-gray-300 focus:border-dubai-gold focus:ring-dubai-gold"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="phone" className="text-dubai-navy font-semibold">
                          Phone Number <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          placeholder="+971 50 123 4567"
                          value={formData.phone}
                          onChange={handleChange}
                          required
                          className="border-gray-300 focus:border-dubai-gold focus:ring-dubai-gold"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="company" className="text-dubai-navy font-semibold">
                          Company/Organization
                        </Label>
                        <Input
                          id="company"
                          name="company"
                          placeholder="Your Company Name"
                          value={formData.company}
                          onChange={handleChange}
                          className="border-gray-300 focus:border-dubai-gold focus:ring-dubai-gold"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="subject" className="text-dubai-navy font-semibold">
                        Subject <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="subject"
                        name="subject"
                        placeholder="How can we help you?"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="border-gray-300 focus:border-dubai-gold focus:ring-dubai-gold"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message" className="text-dubai-navy font-semibold">
                        Message <span className="text-red-500">*</span>
                      </Label>
                      <Textarea
                        id="message"
                        name="message"
                        placeholder="Tell us more about your inquiry..."
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={6}
                        className="border-gray-300 focus:border-dubai-gold focus:ring-dubai-gold resize-none"
                      />
                    </div>

                    <div className="flex items-start gap-3 p-4 bg-dubai-sand/30 rounded-xl">
                      <CheckCircle2 className="w-5 h-5 text-dubai-gold flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-gray-600">
                        By submitting this form, you agree to our privacy policy and consent to 
                        being contacted by our team regarding your inquiry.
                      </p>
                    </div>

                    <Button 
                      type="submit"
                      size="lg"
                      disabled={isSubmitting}
                      className="w-full btn-premium bg-dubai-gold text-dubai-navy hover:bg-yellow-500 shadow-gold-glow group text-lg py-6"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5 mr-2 group-hover:translate-x-1 transition-transform" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-dubai-navy mb-4">Find Us in Dubai</h2>
              <p className="text-xl text-gray-600">
                Located in the heart of Dubai's business district
              </p>
            </div>

            <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-dubai-gold/20">
              <div className="aspect-video bg-gradient-to-br from-dubai-navy/5 to-dubai-gold/5 flex items-center justify-center">
                <div className="text-center p-8">
                  <MapPin className="w-16 h-16 text-dubai-gold mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-dubai-navy mb-2">Conrad Business Tower</h3>
                  <p className="text-gray-600 mb-6">19th Floor, Sheikh Zayed Road, Dubai</p>
                  <Button 
                    className="bg-dubai-gold text-dubai-navy hover:bg-yellow-500"
                    onClick={() => window.open('https://maps.google.com/?q=Conrad+Business+Tower+Dubai', '_blank')}
                  >
                    <MapPin className="w-4 h-4 mr-2" />
                    Open in Google Maps
                  </Button>
                </div>
              </div>
            </div>

            {/* Additional Info */}
            <div className="grid md:grid-cols-3 gap-6 mt-12">
              <div className="text-center p-6 rounded-2xl bg-dubai-sand/30">
                <Building2 className="w-8 h-8 text-dubai-gold mx-auto mb-3" />
                <h4 className="font-bold text-dubai-navy mb-2">Prestigious Location</h4>
                <p className="text-sm text-gray-600">
                  Prime business address in Dubai's financial hub
                </p>
              </div>
              <div className="text-center p-6 rounded-2xl bg-dubai-sand/30">
                <MapPin className="w-8 h-8 text-dubai-gold mx-auto mb-3" />
                <h4 className="font-bold text-dubai-navy mb-2">Easy Access</h4>
                <p className="text-sm text-gray-600">
                  Walking distance from Dubai Metro and major landmarks
                </p>
              </div>
              <div className="text-center p-6 rounded-2xl bg-dubai-sand/30">
                <Clock className="w-8 h-8 text-dubai-gold mx-auto mb-3" />
                <h4 className="font-bold text-dubai-navy mb-2">Flexible Hours</h4>
                <p className="text-sm text-gray-600">
                  Open Sunday to Thursday, appointments available
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ / Quick Info */}
      <section className="py-20 bg-gradient-to-br from-dubai-navy via-slate-900 to-dubai-navy relative overflow-hidden">
        <div className="absolute inset-0 gradient-mesh opacity-20" />
        
        <div className="container mx-auto px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Need Immediate Assistance?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Our team is ready to help you. Choose your preferred method of contact.
            </p>
            
            <div className="grid md:grid-cols-3 gap-4">
              <a href="tel:+971506099326">
                <Button size="lg" className="w-full btn-premium bg-dubai-gold text-dubai-navy hover:bg-yellow-500 shadow-lg">
                  <Phone className="w-5 h-5 mr-2" />
                  Call Now
                </Button>
              </a>
              <a href="mailto:info@kaisanassociates.com">
                <Button size="lg" className="w-full btn-premium bg-white text-dubai-navy hover:bg-gray-100 border-2 border-white shadow-lg">
                  <Mail className="w-5 h-5 mr-2" />
                  Email Us
                </Button>
              </a>
              <Button 
                size="lg" 
                className="w-full btn-premium bg-white text-dubai-navy hover:bg-gray-100 border-2 border-white shadow-lg"
                onClick={() => window.open('https://wa.me/971506099326', '_blank')}
              >
                <MessageSquare className="w-5 h-5 mr-2" />
                WhatsApp
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
