import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ArrowLeft, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { apiService } from "@/lib/api";
import kaisanLogo from "@/assets/kaisan-logo.png";

const formSchema = z.object({
  fullName: z.string().min(1, "Full name is required").trim(),
  dateOfBirth: z.string().min(1, "Date of birth is required"),
});

type FormValues = z.infer<typeof formSchema>;

const TicketAccess = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      dateOfBirth: "",
    },
  });

  const onSubmit = async (values: FormValues) => {
    setIsLoading(true);
    try {
      // Search for attendee by name and date of birth
      const response = await fetch('/api/registrations');
      const result = await response.json();
      
      if (!result.success) {
        throw new Error('Failed to fetch registrations');
      }
      
      // Find matching attendee
      const attendees = result.data || [];
      const matchingAttendee = attendees.find((attendee: any) => 
        attendee.name.toLowerCase().includes(values.fullName.toLowerCase()) &&
        attendee.dateOfBirth === values.dateOfBirth
      );
      
      if (!matchingAttendee) {
        throw new Error('No matching attendee found');
      }
      
      localStorage.setItem("attendee", JSON.stringify(matchingAttendee));
      toast({
        title: "Login successful!",
        description: "Redirecting to your e-pass...",
      });
      setTimeout(() => navigate("/ticket"), 1000);
    } catch (error) {
      toast({
        title: "Login failed",
        description: "Invalid credentials. Please check your name and date of birth.",
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
            <h1 className="text-3xl font-bold mb-2 gradient-text">View Your E-Pass</h1>
            <p className="text-muted-foreground">Enter your details to access your ticket</p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your full name" {...field} />
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
                    <FormLabel>Date of Birth</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  "Logging in..."
                ) : (
                  <>
                    <LogIn className="w-4 h-4 mr-2" />
                    Access E-Pass
                  </>
                )}
              </Button>
            </form>
          </Form>

          <p className="text-center text-sm text-muted-foreground mt-6">
            Don't have a ticket?{" "}
            <Link to="/" className="text-primary hover:underline">
              Register now
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default TicketAccess;
