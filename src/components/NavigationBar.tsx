import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Calendar, Users, Ticket, User, LogIn, Info, Phone, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import kaisanLogo from '@/assets/kaisan-logo.png';

const NavigationBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path: string) => location.pathname === path;

  const handleRegisterClick = () => {
    // If we're not on the home page, navigate to home first
    if (location.pathname !== '/') {
      navigate('/');
    }
    // Dispatch a custom event to trigger the registration modal on the home page
    setTimeout(() => {
      window.dispatchEvent(new CustomEvent('openRegistrationModal'));
    }, 100);
  };

  const navItems = [
    { name: 'Home', href: '/', icon: Calendar },
    { name: 'About', href: '/about', icon: Info },
    { name: 'Register', href: '#', icon: Users, onClick: handleRegisterClick },
    { name: 'My E-Pass', href: '/ticket-access', icon: Ticket },
  ];

  return (
    <>
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-background/95 backdrop-blur-md border-b border-border/50 shadow-lg' 
          : 'bg-background/80 backdrop-blur-md border-b border-border/30'
      }`}>
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3 group">
              <img 
                src={kaisanLogo} 
                alt="Kaisan Associates" 
                className="h-12 object-contain transition-transform duration-300 group-hover:scale-105"
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  item.onClick ? (
                    <button
                      key={item.name}
                      onClick={item.onClick}
                      className={`flex items-center space-x-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                        isActive(item.href)
                          ? 'text-primary bg-primary/10 shadow-sm'
                          : 'text-foreground hover:text-primary hover:bg-primary/5'
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      <span>{item.name}</span>
                    </button>
                  ) : (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={`flex items-center space-x-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                        isActive(item.href)
                          ? 'text-primary bg-primary/10 shadow-sm'
                          : 'text-foreground hover:text-primary hover:bg-primary/5'
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      <span>{item.name}</span>
                    </Link>
                  )
                );
              })}
              
              {/* Contact Buttons */}
              <div className="flex items-center space-x-1 ml-4 pl-4 border-l border-border/50">
                <a href="tel:+918589990060" className="flex items-center space-x-2 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-primary hover:bg-primary/5 transition-all duration-200">
                  <Phone className="h-4 w-4" />
                  <span className="hidden xl:inline">+91 858 999 00 60</span>
                </a>
                <a href="mailto:info@kaisanassociates.com" className="flex items-center space-x-2 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-primary hover:bg-primary/5 transition-all duration-200">
                  <Mail className="h-4 w-4" />
                  <span className="hidden xl:inline">Email</span>
                </a>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden">
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="relative h-10 w-10 rounded-lg hover:bg-primary/10 transition-all duration-200"
                  >
                    <div className={`transform transition-all duration-300 ${isOpen ? 'rotate-180' : ''}`}>
                      {isOpen ? (
                        <X className="h-5 w-5 text-primary" />
                      ) : (
                        <Menu className="h-5 w-5 text-foreground" />
                      )}
                    </div>
                  </Button>
                </SheetTrigger>
                <SheetContent 
                  side="right" 
                  className="w-80 bg-background/95 backdrop-blur-xl border-l border-border/50 p-0"
                >
                  <div className="flex flex-col h-full">
                    {/* Mobile Header */}
                    <div className="p-6 border-b border-border/50">
                      <div className="flex items-center space-x-3">
                        <img src={kaisanLogo} alt="Kaisan Associates" className="h-10 object-contain" />
                      </div>
                    </div>

                    {/* Mobile Navigation */}
                    <div className="flex-1 py-6 overflow-y-auto">
                      <div className="space-y-2 px-4">
                        {navItems.map((item) => {
                          const Icon = item.icon;
                          return (
                            item.onClick ? (
                              <button
                                key={item.name}
                                onClick={() => {
                                  item.onClick();
                                  setIsOpen(false);
                                }}
                                className={`flex items-center space-x-4 w-full px-4 py-4 rounded-xl text-lg font-medium transition-all duration-200 active:scale-95 text-left ${
                                  isActive(item.href)
                                    ? 'text-primary bg-primary/10 shadow-sm border border-primary/20'
                                    : 'text-muted-foreground hover:text-primary hover:bg-primary/5'
                                }`}
                              >
                                <Icon className="h-6 w-6" />
                                <span>{item.name}</span>
                                {isActive(item.href) && (
                                  <div className="ml-auto w-3 h-3 bg-primary rounded-full"></div>
                                )}
                              </button>
                            ) : (
                              <Link
                                key={item.name}
                                to={item.href}
                                onClick={() => setIsOpen(false)}
                                className={`flex items-center space-x-4 w-full px-4 py-4 rounded-xl text-lg font-medium transition-all duration-200 active:scale-95 ${
                                  isActive(item.href)
                                    ? 'text-primary bg-primary/10 shadow-sm border border-primary/20'
                                    : 'text-muted-foreground hover:text-primary hover:bg-primary/5'
                                }`}
                              >
                                <Icon className="h-6 w-6" />
                                <span>{item.name}</span>
                                {isActive(item.href) && (
                                  <div className="ml-auto w-3 h-3 bg-primary rounded-full"></div>
                                )}
                              </Link>
                            )
                          );
                        })}
                      </div>

                      {/* Mobile Contact */}
                      <div className="mt-8 px-4">
                        <h3 className="text-base font-semibold text-muted-foreground mb-4 px-4">Contact Us</h3>
                        <div className="space-y-3">
                          <a 
                            href="tel:+918589990060" 
                            className="flex items-center space-x-4 w-full px-4 py-4 rounded-xl text-base text-muted-foreground hover:text-primary hover:bg-primary/5 transition-all duration-200 active:scale-95"
                            onClick={() => setIsOpen(false)}
                          >
                            <Phone className="h-5 w-5" />
                            <span>+91 858 999 00 60</span>
                          </a>
                          <a 
                            href="mailto:info@kaisanassociates.com" 
                            className="flex items-center space-x-4 w-full px-4 py-4 rounded-xl text-base text-muted-foreground hover:text-primary hover:bg-primary/5 transition-all duration-200 active:scale-95"
                            onClick={() => setIsOpen(false)}
                          >
                            <Mail className="h-5 w-5" />
                            <span>info@kaisanassociates.com</span>
                          </a>
                        </div>
                      </div>
                    </div>

                    {/* Mobile Footer */}
                    <div className="p-6 border-t border-border/50">
                      <p className="text-xs text-muted-foreground text-center">
                        © 2025 Kaisan Associates. All rights reserved.
                      </p>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </nav>

      {/* Spacer to prevent content jumping */}
      <div className="h-20" />
    </>
  );
};

export default NavigationBar;