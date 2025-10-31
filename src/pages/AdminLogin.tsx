import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, LogIn, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import kaisanLogo from "@/assets/kaisan-logo.png";

const AdminLogin = () => {
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Simple admin authentication (in production, this should be proper API call)
      if (credentials.username === "admin" && credentials.password === "admin123") {
        localStorage.setItem("adminToken", "mock-admin-token");
        localStorage.setItem("userRole", "admin");
        
        toast({
          title: "Login successful!",
          description: "Welcome to the admin dashboard",
        });
        
        setTimeout(() => navigate("/admin"), 1000);
      } else {
        throw new Error("Invalid credentials");
      }
    } catch (error) {
      toast({
        title: "Login failed",
        description: "Invalid username or password",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center p-4">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "2s" }} />
      </div>

      <div className="w-full max-w-md relative z-10">
        <div className="glass-panel p-8 animate-fade-in">
          <Link to="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>

          <div className="text-center mb-8">
            <img src={kaisanLogo} alt="Kaisan Associates" className="h-16 mx-auto mb-4 object-contain" />
            <div className="flex items-center justify-center mb-2">
              <Shield className="w-8 h-8 text-primary mr-2" />
              <h1 className="text-3xl font-bold gradient-text">Admin Login</h1>
            </div>
            <p className="text-muted-foreground">Secure access for administrators</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="username" className="text-sm font-medium">
                Username
              </label>
              <Input
                id="username"
                type="text"
                placeholder="Enter your username"
                value={credentials.username}
                onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium">
                Password
              </label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={credentials.password}
                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                required
              />
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                "Logging in..."
              ) : (
                <>
                  <LogIn className="w-4 h-4 mr-2" />
                  Login as Admin
                </>
              )}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              Demo credentials: username: <span className="font-mono text-primary">admin</span>, password: <span className="font-mono text-primary">admin123</span>
            </p>
          </div>

          <div className="mt-8 pt-6 border-t border-border/50">
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-2">Looking for your e-pass?</p>
              <Link to="/ticket-access" className="text-primary hover:underline text-sm font-medium">
                Access your e-pass here →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;