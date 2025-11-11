import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import VolunteerRegistrationForm from '@/components/VolunteerRegistrationForm';
import VolunteerSuccessSplash from '@/components/VolunteerSuccessSplash';

const Volunteer = () => {
  const [showSuccess, setShowSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSuccess = (data: any) => {
    // Show success splash screen
    setShowSuccess(true);
    
    // Show toast notification
    toast.success("You've been registered as a volunteer! We will contact you soon.", {
      duration: 4000,
    });
  };

  const handleSplashComplete = () => {
    // Navigate to home after splash completes
    navigate('/');
  };

  if (showSuccess) {
    return <VolunteerSuccessSplash onComplete={handleSplashComplete} duration={3000} />;
  }

  return (
    <div className="min-h-[80vh] bg-background">
      <div className="container mx-auto">
        <VolunteerRegistrationForm onSuccess={handleSuccess} />
      </div>
    </div>
  );
};

export default Volunteer;
