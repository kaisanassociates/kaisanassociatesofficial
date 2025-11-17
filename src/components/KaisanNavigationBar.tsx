import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const KaisanNavigationBar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCoursesDropdownOpen, setIsCoursesDropdownOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsCoursesDropdownOpen(false);
  }, [location]);

  const navLinks = [
    { name: "Home", path: "/home" },
    { 
      name: "Courses", 
      path: "/courses",
      dropdown: [
        { name: "Executive Business Management", path: "/courses/executive-program" },
        { name: "Influencia Edition 2", path: "/courses/influencia" },
        { name: "PRP Training", path: "/courses/prp-training" },
      ]
    },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  const isActivePath = (path: string) => {
    if (path === "/home" && location.pathname === "/") return true;
    return location.pathname === path || location.pathname.startsWith(path);
  };

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 left-0 right-0 z-50 bg-white shadow-md py-4 transition-all duration-300",
          isScrolled ? "border-b border-gray-200" : ""
        )}
      >
        <div className="container mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center">
              <img src="/images/kaisan-logo.png" alt="Kaisan Associates" className="h-12 w-auto object-contain" />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <div key={link.name} className="relative group">
                  {link.dropdown ? (
                    <div
                      onMouseEnter={() => setIsCoursesDropdownOpen(true)}
                      onMouseLeave={() => setIsCoursesDropdownOpen(false)}
                    >
                      <Link
                        to={link.path}
                        className="flex items-center gap-1 font-semibold text-dubai-navy hover:text-dubai-gold transition-colors duration-200 py-2"
                      >
                        {link.name}
                        <ChevronDown className={cn(
                          "w-4 h-4 transition-transform duration-200",
                          isCoursesDropdownOpen && "rotate-180"
                        )} />
                      </Link>
                      <div className={cn(
                        "absolute top-full left-1/2 -translate-x-1/2 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden transition-all duration-200 origin-top",
                        isCoursesDropdownOpen
                          ? "opacity-100 scale-100 pointer-events-auto"
                          : "opacity-0 scale-95 pointer-events-none"
                      )}>
                        {link.dropdown.map((item, index) => (
                          <Link
                            key={index}
                            to={item.path}
                            className="block px-6 py-4 text-dubai-navy hover:bg-dubai-sand/30 hover:text-dubai-gold transition-colors border-b border-gray-100 last:border-0"
                          >
                            <div className="font-semibold text-sm">{item.name}</div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <Link
                      to={link.path}
                      className="font-semibold text-dubai-navy hover:text-dubai-gold transition-colors duration-200"
                    >
                      {link.name}
                    </Link>
                  )}
                </div>
              ))}
            </div>

            {/* CTA Button & Mobile Menu Toggle */}
            <div className="flex items-center gap-4">
              <Link to="/contact" className="hidden md:block">
                <Button className="bg-dubai-gold text-dubai-navy hover:bg-yellow-500 shadow-md font-semibold">
                  Get Started
                </Button>
              </Link>

              {/* Mobile menu button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 rounded-xl text-dubai-navy hover:bg-dubai-sand"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={cn(
            "lg:hidden absolute top-full left-0 right-0 bg-white border-t border-gray-200 shadow-md transition-all duration-300 overflow-hidden",
            isMobileMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
          )}
        >
          <div className="container mx-auto px-6 py-6 space-y-4">
            {navLinks.map((link) => (
              <div key={link.name}>
                {link.dropdown ? (
                  <div>
                    <button
                      onClick={() => setIsCoursesDropdownOpen(!isCoursesDropdownOpen)}
                      className="w-full flex items-center justify-between py-3 px-4 rounded-xl text-dubai-navy font-semibold hover:bg-dubai-sand/30"
                    >
                      {link.name}
                      <ChevronDown className="w-5 h-5 transition-transform" />
                    </button>
                    {isCoursesDropdownOpen && (
                      <div className="ml-4 mt-2 space-y-2">
                        {link.dropdown.map((item, index) => (
                          <Link
                            key={index}
                            to={item.path}
                            className="block py-2 px-4 rounded-lg text-gray-600 hover:bg-dubai-sand/30 hover:text-dubai-gold"
                          >
                            {item.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    to={link.path}
                    className="block py-3 px-4 rounded-xl font-semibold text-dubai-navy hover:bg-dubai-sand/30"
                  >
                    {link.name}
                  </Link>
                )}
              </div>
            ))}
            <Link to="/contact" className="block pt-4">
              <Button className="w-full bg-dubai-gold text-dubai-navy hover:bg-yellow-500 font-semibold">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Spacer to prevent content from going under fixed nav */}
      <div className="h-20" />
    </>
  );
};

export default KaisanNavigationBar;
