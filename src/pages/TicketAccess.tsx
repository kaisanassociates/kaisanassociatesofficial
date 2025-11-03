import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ArrowLeft, LogIn, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { toast } from "sonner";
import kaisanLogo from "@/assets/kaisan-logo.png";

const formSchema = z.object({
  email: z.string().email("Please enter a valid email address").trim(),
  dateOfBirth: z.string().min(1, "Date of birth is required"),
});

type FormValues = z.infer<typeof formSchema>;

const TicketAccess = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      dateOfBirth: "",
    },
  });

  const onSubmit = async (values: FormValues) => {
    setIsLoading(true);
    try {
      // Fetch registrations with admin credentials to verify ticket access
      const response = await fetch('/api/registrations', {
        headers: {
          'Authorization': 'Bearer admin123'
        }
      });
      const result = await response.json();
      
      if (!result.success) {
        throw new Error('Failed to fetch registrations');
      }
      
      // Find matching attendee by email and DOB
      const attendees = result.data || [];
      
      // Normalize the date from the form (input type="date" returns YYYY-MM-DD)
      const normalizedFormDate = values.dateOfBirth;
      
      const matchingAttendee = attendees.find((attendee: any) => {
        // Normalize stored date (handle both string and date formats)
        let storedDate = attendee.dateOfBirth;
        if (storedDate) {
          // If it's already in YYYY-MM-DD format, use it
          // If it's a full date string, extract just the date part
          storedDate = storedDate.split('T')[0];
        }
        
        return attendee.email.toLowerCase() === values.email.toLowerCase() &&
               storedDate === normalizedFormDate;
      });
      
      if (!matchingAttendee) {
        toast.error("No registration found with these credentials");
        return;
      }
      
      localStorage.setItem("attendee", JSON.stringify(matchingAttendee));
      toast.success("Access granted! Redirecting...");
      setTimeout(() => navigate("/ticket"), 1000);
    } catch (error) {
      toast.error("Unable to access e-pass. Please check your credentials.");
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
        <div className="glass-panel p-8 md:p-10 animate-fade-in">
          <Link to="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>

          <div className="text-center mb-8">
            <img src={kaisanLogo} alt="Kaisan Associates" className="h-16 mx-auto mb-6 object-contain" />
            <h1 className="text-3xl md:text-4xl font-bold mb-2 gradient-text">Access Your E-Pass</h1>
            <p className="text-muted-foreground">Enter your registration details</p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base">Email Address</FormLabel>
                    <FormControl>
                      <Input 
                        type="email"
                        placeholder="your.email@example.com" 
                        className="h-12 text-base"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="dateOfBirth"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base">Date of Birth</FormLabel>
                    <FormControl>
                      <Input 
                        type="date" 
                        className="h-12 text-base"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button 
                type="submit" 
                className="w-full h-12 text-base font-semibold" 
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Accessing...
                  </>
                ) : (
                  <>
                    <LogIn className="w-5 h-5 mr-2" />
                    Access E-Pass
                  </>
                )}
              </Button>
            </form>
          </Form>

          <div className="mt-6 pt-6 border-t border-border">
            <p className="text-center text-sm text-muted-foreground">
              Don't have a ticket?{" "}
              <Link to="/" className="text-primary hover:underline font-medium">
                Register now
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketAccess;