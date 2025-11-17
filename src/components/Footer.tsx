import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { 
  MapPin, 
  Phone, 
  Mail, 
  Linkedin, 
  Twitter, 
  Facebook,
  Instagram,
  Sparkles,
  ArrowRight
} from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-dubai-navy via-slate-900 to-dubai-navy text-white relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 gradient-mesh opacity-10" />
      
      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        {/* Main footer content */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <Link to="/" className="inline-block mb-6">
              <img src="/images/kaisan-logo.png" alt="Kaisan Associates" className="h-16 w-auto object-contain" />
            </Link>
            <p className="text-gray-300 leading-relaxed mb-6">
              Dubai's premier consultancy for transformative leadership, organizational growth, 
              and human potential development.
            </p>
            <div className="flex gap-3">
              {[
                { icon: Linkedin, href: "#", label: "LinkedIn" },
                { icon: Twitter, href: "#", label: "Twitter" },
                { icon: Facebook, href: "#", label: "Facebook" },
                { icon: Instagram, href: "#", label: "Instagram" }
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-10 h-10 rounded-lg bg-white/10 hover:bg-dubai-gold flex items-center justify-center transition-all duration-300 hover:scale-110 group"
                >
                  <social.icon className="w-5 h-5 text-gray-300 group-hover:text-white transition-colors" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-dubai-gold">Quick Links</h3>
            <ul className="space-y-3">
              {[
                { name: "Home", path: "/home" },
                { name: "About Us", path: "/about" },
                { name: "Our Courses", path: "/courses" },
                { name: "Contact", path: "/contact" },
              ].map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.path}
                    className="text-gray-300 hover:text-dubai-gold transition-colors inline-flex items-center gap-2 group"
                  >
                    <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 -ml-6 group-hover:ml-0 transition-all duration-300" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Programs */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-dubai-gold">Our Programs</h3>
            <ul className="space-y-3">
              {[
                { name: "Executive Business Management", path: "/courses/executive-program" },
                { name: "Influencia Edition 2", path: "/courses/influencia" },
                { name: "PRP Training", path: "/courses/prp-training" },
              ].map((program, index) => (
                <li key={index}>
                  <Link
                    to={program.path}
                    className="text-gray-300 hover:text-dubai-gold transition-colors inline-flex items-center gap-2 group"
                  >
                    <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 -ml-6 group-hover:ml-0 transition-all duration-300" />
                    {program.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-dubai-gold">Get in Touch</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-dubai-gold flex-shrink-0 mt-0.5" />
                <div className="text-gray-300 text-sm">
                  19th Floor, Conrad Business Tower<br />
                  Sheikh Zayed Road, Dubai, UAE
                </div>
              </li>
              <li>
                <a
                  href="tel:+971506099326"
                  className="flex items-center gap-3 text-gray-300 hover:text-dubai-gold transition-colors group"
                >
                  <Phone className="w-5 h-5 text-dubai-gold flex-shrink-0" />
                  <span className="text-sm">+971 50 60 99 326</span>
                </a>
              </li>
              <li>
                <a
                  href="tel:+97143827700"
                  className="flex items-center gap-3 text-gray-300 hover:text-dubai-gold transition-colors group"
                >
                  <Phone className="w-5 h-5 text-dubai-gold flex-shrink-0" />
                  <span className="text-sm">+971 43 827 700</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@kaisanassociates.com"
                  className="flex items-center gap-3 text-gray-300 hover:text-dubai-gold transition-colors group"
                >
                  <Mail className="w-5 h-5 text-dubai-gold flex-shrink-0" />
                  <span className="text-sm">info@kaisanassociates.com</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="bg-white/10" />

        {/* Newsletter Section */}
        <div className="py-12">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-2xl font-bold mb-4">Stay Updated</h3>
            <p className="text-gray-300 mb-6">
              Subscribe to receive the latest insights, program updates, and exclusive offers
            </p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-dubai-gold focus:bg-white/15 transition-all h-12"
                required
              />
              <Button type="submit" className="btn-premium bg-dubai-gold text-dubai-navy hover:bg-yellow-500 px-8 whitespace-nowrap shadow-gold-glow h-12">
                Subscribe
              </Button>
            </form>
          </div>
        </div>

        <Separator className="bg-white/10" />

        {/* Bottom Bar */}
        <div className="py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
            <div>
              © {currentYear} Kaisan Associates. All rights reserved.
            </div>
            <div className="flex gap-6">
              <Link to="/privacy-policy" className="hover:text-dubai-gold transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="hover:text-dubai-gold transition-colors">
                Terms of Service
              </Link>
              <Link to="/sitemap" className="hover:text-dubai-gold transition-colors">
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
