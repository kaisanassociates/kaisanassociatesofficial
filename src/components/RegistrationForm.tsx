import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { X, Check, Loader2, AlertCircle, ChevronLeft } from "lucide-react";
import { toast } from "sonner";
import { apiService } from "@/lib/api";

const formSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters").max(100).trim(),
  contactNumber: z.string()
    .min(10, "Enter a valid contact number (10+ digits)")
    .max(20, "Contact number too long")
    .regex(/^[\+]?[\d\s\-\(\)]+$/, "Enter a valid phone number")
    .trim(),
  email: z.string()
    .email("Enter a valid email address")
    .max(255)
    .regex(/^[\w\.-]+@[\w\.-]+\.[a-zA-Z]{2,}$/, "Enter a valid email format")
    .trim(),
  gender: z.enum(["Male", "Female", "Other"], {
    required_error: "Please select your gender",
  }),
  linkedinProfile: z.string()
    .max(500, "LinkedIn URL too long")
    .optional()
    .or(z.literal("")),
  designation: z.string().min(2, "Designation is required").max(100).trim(),
  business: z.string().min(2, "Business/Organization is required").max(200).trim(),
  otherSector: z.string().max(100).optional(),
  experience: z.string()
    .min(1, "Experience is required")
    .max(50)
    .trim(),
  achievements: z.string().max(1000, "Achievements too long (max 1000 characters)").optional(),
  futurePlan: z.string()
    .max(1000, "Future plan too long (max 1000 characters)")
    .optional()
    .or(z.literal("")),
  dateOfBirth: z.string()
    .min(1, "Date of birth is required")
    .refine((date) => {
      const birthDate = new Date(date);
      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear();
      return age >= 18 && age <= 100;
    }, "Age must be between 18 and 100 years"),
});

type FormData = z.infer<typeof formSchema>;

const sectors = [
  "Educator",
  "Entrepreneur",
  "Business",
  "Start Up",
  "Employed",
  "Seeking Employment",
  "Other",
];

interface RegistrationFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const RegistrationForm = ({ isOpen, onClose }: RegistrationFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedSectors, setSelectedSectors] = useState<string[]>([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [showBackConfirm, setShowBackConfirm] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    trigger,
    watch,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormData) => {
    // Validate sectors before submission
    if (selectedSectors.length === 0) {
      toast.error("Please select at least one sector");
      return;
    }

    setIsSubmitting(true);
    
    try {
      const cleanData = {
        fullName: data.fullName,
        email: data.email,
        contactNumber: data.contactNumber,
        gender: data.gender,
        business: data.business,
        sectors: selectedSectors,
        designation: data.designation,
        experience: data.experience,
        achievements: data.achievements || undefined,
        futurePlan: data.futurePlan,
        dateOfBirth: data.dateOfBirth,
        linkedinProfile: data.linkedinProfile || undefined,
        otherSector: data.otherSector || undefined,
      };
      
      const result = await apiService.registerAttendee(cleanData);
      
      if (result.success && result.data) {
        // Merge the submitted data with the server response to ensure all fields are present
        const completeAttendeeData = {
          ...cleanData,
          ...result.data,
          fullName: result.data.fullName || result.data.name || cleanData.fullName,
          contactNumber: result.data.contactNumber || result.data.phone || cleanData.contactNumber,
          business: result.data.business || result.data.organization || cleanData.business,
        };
        
        toast.success("Registration successful! Redirecting to your e-pass...");
        
        // Store complete attendee data and redirect to ticket
        localStorage.setItem("attendee", JSON.stringify(completeAttendeeData));
        
        reset();
        setSelectedSectors([]);
        setCurrentStep(1);
        onClose();
        
        // Navigate to ticket page after a short delay
        setTimeout(() => {
          window.location.href = '/ticket';
        }, 1500);
      } else {
        throw new Error(result.error || "Registration failed");
      }
    } catch (error: any) {
      const errorMessage = error.message || "Registration failed. Please try again.";
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextStep = async () => {
    if (currentStep === 1) {
      const isValid = await trigger(["fullName", "contactNumber", "email", "gender", "dateOfBirth"] as any);
      if (isValid) {
        setCurrentStep(2);
      }
    } else if (currentStep === 2) {
      const isValid = await trigger(["designation", "business", "experience"] as any);
      if (isValid && selectedSectors.length > 0) {
        setCurrentStep(3);
      } else if (selectedSectors.length === 0) {
        toast.error("Please select at least one sector");
      }
    }
  };

  const prevStep = () => {
    if (currentStep === 1) {
      setShowBackConfirm(true);
    } else {
      setCurrentStep(prev => Math.max(prev - 1, 1));
    }
  };

  const handleBackConfirm = () => {
    setShowBackConfirm(false);
    reset();
    setSelectedSectors([]);
    setCurrentStep(1);
  };

  const handleSectorToggle = (sector: string) => {
    setSelectedSectors((prev) =>
      prev.includes(sector)
        ? prev.filter((s) => s !== sector)
        : [...prev, sector]
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white dark:bg-card rounded-3xl shadow-2xl animate-scale-in border border-border/50">
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between p-8 bg-primary border-b border-border/50 backdrop-blur-xl">
          <div>
            <h2 className="text-3xl font-bold text-white">Register for Influencia</h2>
            <p className="text-sm text-white/90 mt-1">Edition 2 - Transform Your Life</p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="rounded-full hover:bg-white/20 text-white"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Form */}
        <form 
          onSubmit={handleSubmit(onSubmit)} 
          onKeyDown={(e) => {
            // Prevent form submission on Enter key press
            if (e.key === 'Enter' && e.target instanceof HTMLInputElement) {
              e.preventDefault();
            }
          }}
          className="p-8 space-y-6"
        >
          {/* Step 1: Personal Information */}
          {currentStep === 1 && (
          <div className="space-y-6 animate-fade-in">
            <h3 className="text-2xl font-bold text-foreground flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-bold text-lg">1</div>
              Personal Information
            </h3>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name *</Label>
                <Input
                  id="fullName"
                  {...register("fullName")}
                  placeholder="Enter your full name"
                  className="bg-background border-border focus:border-primary transition-colors h-12"
                />
                {errors.fullName && (
                  <p className="text-sm text-destructive">{errors.fullName.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="contactNumber">Contact Number *</Label>
                <Input
                  id="contactNumber"
                  {...register("contactNumber")}
                  placeholder="+91 XXXXX XXXXX"
                  className="bg-background border-border focus:border-primary transition-colors h-12"
                />
                {errors.contactNumber && (
                  <p className="text-sm text-destructive">{errors.contactNumber.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  {...register("email")}
                  placeholder="your.email@example.com"
                  className="bg-background border-border focus:border-primary transition-colors h-12"
                />
                {errors.email && (
                  <p className="text-sm text-destructive">{errors.email.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="linkedinProfile">LinkedIn / Website</Label>
                <Input
                  id="linkedinProfile"
                  {...register("linkedinProfile")}
                  placeholder="https://linkedin.com/in/yourprofile"
                  className="bg-background border-border focus:border-primary transition-colors h-12"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="dateOfBirth">Date of Birth *</Label>
                <Input
                  id="dateOfBirth"
                  type="date"
                  {...register("dateOfBirth")}
                  className="bg-background border-border focus:border-primary transition-colors h-12"
                />
                {errors.dateOfBirth && (
                  <p className="text-sm text-destructive">{errors.dateOfBirth.message}</p>
                )}
              </div>
            </div>

            <div className="space-y-3">
              <Label>Gender *</Label>
              <RadioGroup
                onValueChange={(value) => {
                  register("gender").onChange({ target: { value, name: "gender" } });
                }}
                className="flex gap-6"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Male" id="male" />
                  <Label htmlFor="male" className="cursor-pointer font-normal">Male</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Female" id="female" />
                  <Label htmlFor="female" className="cursor-pointer font-normal">Female</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Other" id="other" />
                  <Label htmlFor="other" className="cursor-pointer font-normal">Other</Label>
                </div>
              </RadioGroup>
              {errors.gender && (
                <p className="text-sm text-destructive">{errors.gender.message}</p>
              )}
            </div>
          </div>
          )}
  
          {/* Step 2: Professional Information */}
          {currentStep === 2 && (
          <div className="space-y-6 animate-fade-in">
            <h3 className="text-2xl font-bold text-foreground flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-bold text-lg">2</div>
              Professional Information
            </h3>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="designation">Designation *</Label>
                <Input
                  id="designation"
                  {...register("designation")}
                  placeholder="e.g., CEO, Manager, Entrepreneur"
                  className="bg-background border-border focus:border-primary transition-colors h-12"
                />
                {errors.designation && (
                  <p className="text-sm text-destructive">{errors.designation.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="business">Business / Organization *</Label>
                <Input
                  id="business"
                  {...register("business")}
                  placeholder="Your company or organization name"
                  className="bg-background border-border focus:border-primary transition-colors h-12"
                />
                {errors.business && (
                  <p className="text-sm text-destructive">{errors.business.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="experience">Years of Experience *</Label>
                <Input
                  id="experience"
                  {...register("experience")}
                  placeholder="e.g., 5 years"
                  className="bg-background border-border focus:border-primary transition-colors h-12"
                />
                {errors.experience && (
                  <p className="text-sm text-destructive">{errors.experience.message}</p>
                )}
              </div>
            </div>

            {/* Sectors */}
            <div className="space-y-3">
              <Label>Sector / Industry *</Label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {sectors.map((sector) => (
                  <div
                    key={sector}
                    className={`flex items-center space-x-3 p-4 rounded-xl border-2 transition-all duration-300 ${
                      selectedSectors.includes(sector)
                        ? "bg-primary/10 border-primary shadow-lg"
                        : "bg-background border-border hover:border-primary/50 hover:shadow-md"
                    }`}
                  >
                    <Checkbox
                      checked={selectedSectors.includes(sector)}
                      onCheckedChange={() => handleSectorToggle(sector)}
                    />
                    <label 
                      className="text-sm font-medium cursor-pointer flex-1"
                      onClick={() => handleSectorToggle(sector)}
                    >
                      {sector}
                    </label>
                  </div>
                ))}
              </div>
              {selectedSectors.includes("Other") && (
                <Input
                  {...register("otherSector")}
                  placeholder="Please specify your sector"
                  className="bg-background border-border focus:border-primary transition-colors h-12 animate-fade-in-up"
                />
              )}
            </div>
          </div>
          )}

          {/* Step 3: Additional Information */}
          {currentStep === 3 && (
            <div className="space-y-6 animate-fade-in">
              <h3 className="text-2xl font-bold text-foreground flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-bold text-lg">3</div>
                Additional Information
              </h3>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="achievements">Key Achievements / Milestones</Label>
                  <Textarea
                    id="achievements"
                    {...register("achievements")}
                    placeholder="Share your notable achievements and milestones..."
                    rows={4}
                    className="bg-background border-border focus:border-primary transition-colors resize-none"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="futurePlan">Future Plan for Next 5 Years</Label>
                  <Textarea
                    id="futurePlan"
                    {...register("futurePlan")}
                    placeholder="Describe your vision and goals for the next 5 years..."
                    rows={4}
                    className="bg-background border-border focus:border-primary transition-colors resize-none"
                  />
                  {errors.futurePlan && (
                    <p className="text-sm text-destructive">{errors.futurePlan.message}</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex gap-4 pt-6">
            {currentStep > 1 && (
              <Button
                type="button"
                variant="outline"
                onClick={prevStep}
                className="px-8 py-6 rounded-full font-semibold"
              >
                <ChevronLeft className="w-5 h-5 mr-2" />
                Previous
              </Button>
            )}
            
            {currentStep < 3 ? (
              <Button
                type="button"
                onClick={nextStep}
                className="flex-1 bg-primary hover:bg-primary/90 text-white font-semibold py-6 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                Next Step
                <Check className="w-5 h-5 ml-2" />
              </Button>
            ) : (
              <Button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 bg-primary hover:bg-primary/90 text-white font-semibold py-6 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Check className="w-5 h-5 mr-2" />
                    Complete Registration
                  </>
                )}
              </Button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegistrationForm;
