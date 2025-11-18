import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import apiService from "@/lib/api";

interface RegistrationFormProps {
  defaultProgram?: string;
  onSuccess?: () => void;
}

export const RegistrationForm = ({ defaultProgram = "executive", onSuccess }: RegistrationFormProps) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    contactNumber: "",
    business: "", // Organization
    ticketType: defaultProgram,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, ticketType: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await apiService.registerAttendee(formData);

      if (response.success) {
        toast({
          title: "Registration Successful!",
          description: "Thank you for registering. We will contact you shortly.",
          variant: "default",
        });
        setFormData({
          fullName: "",
          email: "",
          contactNumber: "",
          business: "",
          ticketType: defaultProgram,
        });
        if (onSuccess) onSuccess();
      } else {
        toast({
          title: "Registration Failed",
          description: response.error || "Something went wrong. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Network Error",
        description: "Please check your connection and try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="fullName" className="text-dubai-navy font-semibold">
            Full Name <span className="text-red-500">*</span>
          </Label>
          <Input
            id="fullName"
            name="fullName"
            placeholder="Enter your full name"
            value={formData.fullName}
            onChange={handleChange}
            required
            className="h-12 bg-gray-50 border-gray-200 focus:border-dubai-gold focus:ring-dubai-gold transition-all"
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
            className="h-12 bg-gray-50 border-gray-200 focus:border-dubai-gold focus:ring-dubai-gold transition-all"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="contactNumber" className="text-dubai-navy font-semibold">
            Phone Number <span className="text-red-500">*</span>
          </Label>
          <Input
            id="contactNumber"
            name="contactNumber"
            type="tel"
            placeholder="+971 50 123 4567"
            value={formData.contactNumber}
            onChange={handleChange}
            required
            className="h-12 bg-gray-50 border-gray-200 focus:border-dubai-gold focus:ring-dubai-gold transition-all"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="business" className="text-dubai-navy font-semibold">
            Organization / Company
          </Label>
          <Input
            id="business"
            name="business"
            placeholder="Your organization name"
            value={formData.business}
            onChange={handleChange}
            className="h-12 bg-gray-50 border-gray-200 focus:border-dubai-gold focus:ring-dubai-gold transition-all"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="ticketType" className="text-dubai-navy font-semibold">
            Program of Interest <span className="text-red-500">*</span>
          </Label>
          <Select value={formData.ticketType} onValueChange={handleSelectChange}>
            <SelectTrigger className="h-12 bg-gray-50 border-gray-200 focus:border-dubai-gold focus:ring-dubai-gold">
              <SelectValue placeholder="Select a program" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="executive">Executive Business Management</SelectItem>
              <SelectItem value="influencia">Influencia Edition 2</SelectItem>
              <SelectItem value="prp">PRP Training</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full h-12 text-lg font-bold bg-dubai-gold text-dubai-navy hover:bg-yellow-500 shadow-lg transition-all duration-300"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            Processing...
          </>
        ) : (
          "Submit Registration"
        )}
      </Button>

      <p className="text-xs text-center text-gray-500 mt-4">
        By registering, you agree to our terms and conditions.
      </p>
    </form>
  );
};

export default RegistrationForm;
