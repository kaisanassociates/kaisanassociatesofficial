import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowRight, 
  Clock, 
  Loader2,
  AlertCircle
} from "lucide-react";
import { Link } from "react-router-dom";
import apiService from "@/lib/api";

const Courses = () => {
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCourses();
  }, []);

  async function loadCourses() {
    setLoading(true);
    const res = await apiService.getCourses();
    if (res.success && res.data) {
      setCourses(res.data);
    }
    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-gray-50 font-sans selection:bg-dubai-gold/30">
      {/* Hero Section */}
      <section className="relative py-32 bg-dubai-navy overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/pattern-bg.jpg')] opacity-5 mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-dubai-navy/90"></div>
        
        <div className="container mx-auto px-6 relative z-10 text-center">
          <Badge variant="outline" className="mb-6 text-dubai-gold border-dubai-gold/30 px-4 py-1 tracking-widest uppercase text-xs font-semibold">
            World-Class Education
          </Badge>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight leading-tight">
            Our <span className="text-dubai-gold">Programs</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed font-light">
            Explore our range of programs designed to elevate your career and personal growth.
          </p>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="py-20 -mt-20 relative z-20">
        <div className="container mx-auto px-6">
          {loading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="w-10 h-10 animate-spin text-white" />
            </div>
          ) : courses.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {courses.map((course) => (
                <Link to={`/courses/${course.slug}`} key={course._id} className="group">
                  <Card className="h-full border-0 shadow-xl bg-white rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                    <div className="relative h-64 overflow-hidden">
                      {course.heroImage ? (
                        <img 
                          src={course.heroImage} 
                          alt={course.title} 
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400">
                          No Image
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-dubai-navy/80 to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                      <div className="absolute bottom-4 left-4 right-4">
                        <Badge className="bg-white/20 backdrop-blur-md text-white border-0 mb-2 hover:bg-white/30">
                          {course.category || "Program"}
                        </Badge>
                      </div>
                    </div>
                    <CardContent className="p-8">
                      <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                        <Clock className="w-4 h-4 text-dubai-gold" />
                        {course.duration || "Duration TBA"}
                      </div>
                      <h3 className="text-2xl font-bold text-dubai-navy mb-3 group-hover:text-dubai-gold transition-colors">
                        {course.title}
                      </h3>
                      <p className="text-gray-600 line-clamp-3 mb-6">
                        {course.shortDescription || course.description}
                      </p>
                      <div className="flex items-center text-dubai-gold font-bold text-sm uppercase tracking-wide group-hover:translate-x-2 transition-transform">
                        View Details <ArrowRight className="w-4 h-4 ml-2" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white rounded-3xl shadow-xl">
              <AlertCircle className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-600">No programs available at the moment.</h3>
              <p className="text-gray-500 mt-2">Please check back later or contact us for more information.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Courses;
