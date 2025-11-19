import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Quote, Star } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const testimonials = [
  {
    name: "Dr. Rashid Gazzali",
    role: "Founder & Lead Trainer, Kaisan Associates",
    content: "Our mission is to transform leaders into visionaries, and organizations into powerhouses of innovation and excellence. Every program we create is designed to unlock human potential.",
    rating: 5,
    image: "/images/dr-rashid-formal.jpeg"
  },
  {
    name: "Prof. Arvinder S. Chawla",
    role: "Former Vice Chancellor, Academic Partner",
    content: "The KiSE Executive Programme represents the pinnacle of business education, blending academic rigor with practical application to create truly transformative learning experiences.",
    rating: 5,
    image: "/images/prof-arvinder.jpg"
  },
  {
    name: "Dr. Saji Gopinath",
    role: "Former Vice Chancellor, Senior Mentor",
    content: "Kaisan Associates' approach to professional development is both innovative and impactful. Their programs bridge the gap between theoretical knowledge and real-world success.",
    rating: 5,
    image: "/images/dr-saji.jpg"
  }
];

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-24 bg-gradient-to-b from-white to-dubai-sand relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full opacity-30 pointer-events-none">
        <div className="absolute top-10 left-10 w-64 h-64 bg-dubai-gold/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-64 h-64 bg-dubai-navy/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <span className="inline-block px-5 py-2 rounded-full bg-dubai-gold/10 text-dubai-gold font-bold text-xs uppercase tracking-widest mb-6 border border-dubai-gold/20">
            Leadership Voices
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-dubai-navy mb-4">
            Meet Our Expert Team
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Insights from the visionaries shaping the future of organizational excellence
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative h-[400px] md:h-[300px]">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-all duration-700 ease-in-out transform ${
                  index === activeIndex
                    ? "opacity-100 translate-x-0 scale-100"
                    : "opacity-0 translate-x-8 scale-95 pointer-events-none"
                }`}
              >
                <Card className="glass-card border-0 shadow-2xl h-full flex flex-col justify-center">
                  <CardContent className="p-8 md:p-12 text-center">
                    <Quote className="w-12 h-12 text-dubai-gold/20 mx-auto mb-6" />
                    <p className="text-xl md:text-2xl text-gray-700 italic mb-8 leading-relaxed">
                      "{testimonial.content}"
                    </p>
                    
                    <div className="flex flex-col items-center">
                      <Avatar className="w-16 h-16 border-4 border-white shadow-lg mb-4">
                        <AvatarImage src={testimonial.image} alt={testimonial.name} />
                        <AvatarFallback className="bg-dubai-navy text-white text-xl">
                          {testimonial.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      
                      <h4 className="text-lg font-bold text-dubai-navy">{testimonial.name}</h4>
                      <p className="text-sm text-dubai-gold font-medium mb-2">{testimonial.role}</p>
                      
                      <div className="flex gap-1">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-dubai-gold text-dubai-gold" />
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>

          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === activeIndex ? "bg-dubai-gold w-8" : "bg-gray-300 hover:bg-dubai-gold/50"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
