import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Scan, CheckCircle, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { apiService } from "@/lib/api";
import kaisanLogo from "@/assets/kaisan-logo.png";

const Staff = () => {
  const [staffKey, setStaffKey] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [qrCode, setQrCode] = useState("");
  const [isScanning, setIsScanning] = useState(false);
  const [lastScanned, setLastScanned] = useState<any>(null);
  const { toast } = useToast();

  const handleLogin = () => {
    if (!staffKey.trim()) {
      toast({
        title: "Error",
        description: "Please enter staff key",
        variant: "destructive",
      });
      return;
    }
    setIsAuthenticated(true);
    toast({
      title: "Success",
      description: "Staff access granted",
    });
  };

  const handleScan = async () => {
    if (!qrCode.trim()) {
      toast({
        title: "Error",
        description: "Please enter QR code",
        variant: "destructive",
      });
      return;
    }

    setIsScanning(true);
    try {
      // Simulate attendance marking
      // In production, you would call the API
      const mockAttendee = {
        _id: "mock-id-" + Date.now(),
        name: "John Doe",
        email: "john@example.com",
        phone: "+1234567890",
        designation: "Business Owner",
        business: "Tech Solutions",
        attended: true
      };
      setLastScanned(mockAttendee);
      setQrCode("");
      toast({
        title: "Success!",
        description: `${mockAttendee.name} marked as attended`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Invalid QR code or already scanned",
        variant: "destructive",
      });
    } finally {
      setIsScanning(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center p-4">
        <div className="w-full max-w-md glass-panel p-8 animate-fade-in">
          <Link to="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
          <div className="text-center mb-8">
            <img src={kaisanLogo} alt="Kaisan Associates" className="h-16 mx-auto mb-4 object-contain" />
            <h1 className="text-3xl font-bold gradient-text">Staff Scanner</h1>
            <p className="text-muted-foreground mt-2">Enter staff key to access</p>
          </div>
          <Input
            type="password"
            placeholder="Enter staff key"
            value={staffKey}
            onChange={(e) => setStaffKey(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            className="mb-4"
          />
          <Button onClick={handleLogin} className="w-full">
            Login
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          <div className="glass-panel p-8 text-center">
            <Scan className="w-16 h-16 mx-auto mb-6 text-primary" />
            <h2 className="text-2xl font-bold mb-4">Scan Attendee QR Code</h2>
            <p className="text-muted-foreground mb-8">
              Enter or scan the QR code from the attendee's e-pass
            </p>

            <div className="space-y-4">
              <Input
                placeholder="Enter QR code or scan..."
                value={qrCode}
                onChange={(e) => setQrCode(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleScan()}
                className="text-lg"
                autoFocus
              />
              <Button onClick={handleScan} className="w-full" size="lg" disabled={isScanning}>
                {isScanning ? "Scanning..." : "Mark Attendance"}
              </Button>
            </div>
          </div>

          {lastScanned && (
            <div className="mt-8 glass-panel p-6 animate-scale-in">
              <div className="flex items-center gap-4 mb-4">
                <CheckCircle className="w-8 h-8 text-green-500" />
                <div>
                  <h3 className="text-xl font-bold">{lastScanned.fullName}</h3>
                  <p className="text-sm text-muted-foreground">{lastScanned.email}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Designation</p>
                  <p className="font-medium">{lastScanned.designation}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Business</p>
                  <p className="font-medium">{lastScanned.business}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Contact</p>
                  <p className="font-medium">{lastScanned.contactNumber}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Status</p>
                  <p className="font-medium text-green-500">Checked In</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Staff;
