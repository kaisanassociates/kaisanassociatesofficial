import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Scan, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import kaisanLogo from "@/assets/kaisan-logo.png";

const Staff = () => {
  const [staffKey, setStaffKey] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [qrCode, setQrCode] = useState("");
  const [isScanning, setIsScanning] = useState(false);
  const [lastScanned, setLastScanned] = useState<any>(null);

  const handleLogin = () => {
    if (!staffKey.trim()) {
      toast.error("Please enter staff key");
      return;
    }
    setIsAuthenticated(true);
    toast.success("Staff access granted");
  };

  const handleScan = async () => {
    if (!qrCode.trim()) {
      toast.error("Please enter QR code");
      return;
    }

    setIsScanning(true);
    try {
      // First, get all registrations to find matching QR code
      const getResponse = await fetch('/api/registrations', {
        headers: {
          'Authorization': 'Bearer admin123'
        }
      });
      
      const getResult = await getResponse.json();
      
      if (!getResult.success) {
        throw new Error('Failed to fetch registrations');
      }
      
      // Find attendee by QR code
      const attendee = getResult.data.find((a: any) => a.qrCode === qrCode.trim());
      
      if (!attendee) {
        toast.error("Invalid QR code - Attendee not found");
        setIsScanning(false);
        return;
      }
      
      // Get the attendee ID (try both _id and id fields)
      const attendeeId = attendee._id || attendee.id;
      
      if (!attendeeId) {
        toast.error("Invalid attendee data - ID missing");
        console.error('Attendee object:', attendee);
        setIsScanning(false);
        return;
      }
      
      if (attendee.attended) {
        toast.warning(`${attendee.name || attendee.fullName} already checked in!`);
        setLastScanned(attendee);
        setQrCode("");
        setIsScanning(false);
        return;
      }
      
      // Mark attendance
      const updateResponse = await fetch(`/api/attendees/${attendeeId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer admin123'
        },
        body: JSON.stringify({ 
          action: 'toggle_attendance',
          attended: true,
          checkInTime: new Date().toISOString()
        })
      });
      
      const updateResult = await updateResponse.json();
      
      if (!updateResult.success) {
        throw new Error(updateResult.error || 'Failed to mark attendance');
      }
      
      setLastScanned(updateResult.data);
      setQrCode("");
      toast.success(`✓ ${updateResult.data.name || updateResult.data.fullName} checked in successfully!`);
    } catch (error: any) {
      console.error('Scan error:', error);
      toast.error(error.message || "Error scanning QR code");
    } finally {
      setIsScanning(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center p-4">
        <div className="w-full max-w-md glass-panel p-8 md:p-10 animate-fade-in">
          <Link to="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
          <div className="text-center mb-8">
            <img src={kaisanLogo} alt="Kaisan Associates" className="h-16 mx-auto mb-6 object-contain" />
            <h1 className="text-3xl md:text-4xl font-bold gradient-text mb-2">Staff Scanner</h1>
            <p className="text-muted-foreground">Enter staff key to access</p>
          </div>
          <Input
            type="password"
            placeholder="Enter staff key"
            value={staffKey}
            onChange={(e) => setStaffKey(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            className="mb-4 h-12"
          />
          <Button onClick={handleLogin} className="w-full h-12 font-semibold">
            Login
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <main className="container mx-auto px-4 py-8 md:py-12">
        <Link to="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Link>

        <div className="max-w-2xl mx-auto">
          <div className="glass-panel p-6 md:p-8 text-center">
            <Scan className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-6 text-primary" />
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Scan Attendee QR Code</h2>
            <p className="text-muted-foreground mb-8 text-sm md:text-base">
              Enter or scan the QR code from the attendee's e-pass
            </p>

            <div className="space-y-4">
              <Input
                placeholder="Enter QR code or scan..."
                value={qrCode}
                onChange={(e) => setQrCode(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleScan()}
                className="text-base md:text-lg h-12 md:h-14"
                autoFocus
              />
              <Button onClick={handleScan} className="w-full h-12 md:h-14 text-base font-semibold" size="lg" disabled={isScanning}>
                {isScanning ? "Scanning..." : "Mark Attendance"}
              </Button>
            </div>
          </div>

          {lastScanned && (
            <div className="mt-8 glass-panel p-6 md:p-8 animate-scale-in">
              <div className="flex items-center gap-4 mb-6">
                <CheckCircle className="w-8 h-8 md:w-10 md:h-10 text-green-500 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <h3 className="text-xl md:text-2xl font-bold truncate">{lastScanned.fullName || lastScanned.name}</h3>
                  <p className="text-sm text-muted-foreground truncate">{lastScanned.email}</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm md:text-base">
                <div>
                  <p className="text-muted-foreground">Designation</p>
                  <p className="font-medium">{lastScanned.designation || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Business</p>
                  <p className="font-medium">{lastScanned.business || lastScanned.organization || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Contact</p>
                  <p className="font-medium">{lastScanned.contactNumber || lastScanned.phone}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Status</p>
                  <p className="font-medium text-green-500">✓ Checked In</p>
                </div>
                {lastScanned.checkInTime && (
                  <div className="md:col-span-2">
                    <p className="text-muted-foreground">Check-in Time</p>
                    <p className="font-medium">{new Date(lastScanned.checkInTime).toLocaleString()}</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Staff;
