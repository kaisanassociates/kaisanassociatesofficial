import { useEffect } from "react";
import { CheckCircle } from "lucide-react";

interface VolunteerSuccessSplashProps {
  onComplete?: () => void;
  duration?: number;
}

const VolunteerSuccessSplash = ({ onComplete, duration = 3000 }: VolunteerSuccessSplashProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete?.();
    }, duration);

    return () => clearTimeout(timer);
  }, [onComplete, duration]);

  return (
    <div className="fixed inset-0 z-[1100] flex items-center justify-center bg-gradient-to-br from-green-700 via-green-600 to-emerald-600 animate-fade-in">
      {/* Decorative glows */}
      <div className="absolute -top-24 -left-24 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
      
      {/* Center content */}
      <div className="relative text-center px-4 animate-scale-in">
        <div className="mb-6 flex justify-center">
          <CheckCircle className="w-24 h-24 md:w-32 md:h-32 text-white animate-bounce" />
        </div>
        
        <h1 className="text-4xl md:text-6xl font-black tracking-tight text-white drop-shadow-md mb-4">
          Registration Successful!
        </h1>
        
        <p className="text-lg md:text-2xl text-white/90 font-medium mb-2">
          Thank you for volunteering with INFLUENCIA
        </p>
        
        <p className="text-base md:text-lg text-white/80">
          We will contact you soon with further details
        </p>
        
        {/* Progress indicator */}
        <div className="mt-8 max-w-xs mx-auto">
          <div className="h-1 bg-white/20 rounded-full overflow-hidden">
            <div 
              className="h-full bg-white rounded-full animate-progress"
              style={{ 
                animation: `progress ${duration}ms linear forwards` 
              }}
            />
          </div>
          <p className="text-xs text-white/60 mt-2 uppercase tracking-wider">
            Redirecting to home...
          </p>
        </div>
      </div>

      <style>{`
        @keyframes progress {
          from { width: 0%; }
          to { width: 100%; }
        }
      `}</style>
    </div>
  );
};

export default VolunteerSuccessSplash;
