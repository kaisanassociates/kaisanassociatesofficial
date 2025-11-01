import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Scan, CheckCircle, Camera, Keyboard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Html5Qrcode } from "html5-qrcode";
import kaisanLogo from "@/assets/kaisan-logo.png";

const Staff = () => {
  const [staffKey, setStaffKey] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [qrCode, setQrCode] = useState("");
  const [isScanning, setIsScanning] = useState(false);
  const [lastScanned, setLastScanned] = useState<any>(null);
  const [scanMode, setScanMode] = useState<'camera' | 'manual'>('manual');
  const [isCameraActive, setIsCameraActive] = useState(false);
  const html5QrCodeRef = useRef<Html5Qrcode | null>(null);

  useEffect(() => {
    return () => {
      // Cleanup camera on unmount
      if (html5QrCodeRef.current && isCameraActive) {
        html5QrCodeRef.current.stop().catch(console.error);
      }
    };
  }, [isCameraActive]);

  const handleLogin = () => {
    if (!staffKey.trim()) {
      toast.error("Please enter staff key");
      return;
    }
    setIsAuthenticated(true);
    toast.success("Staff access granted");
  };

  const startCamera = async () => {
    try {
      const html5QrCode = new Html5Qrcode("qr-reader");
      html5QrCodeRef.current = html5QrCode;
      
      await html5QrCode.start(
        { facingMode: "environment" },
        {
          fps: 10,
          qrbox: { width: 250, height: 250 }
        },
        (decodedText) => {
          setQrCode(decodedText);
          stopCamera();
          handleScan(decodedText);
        },
        () => {
          // ignore errors during scanning
        }
      );
      
      setIsCameraActive(true);
      setScanMode('camera');
      toast.success("Camera started");
    } catch (err) {
      console.error("Error starting camera:", err);
      toast.error("Failed to start camera. Please check permissions.");
    }
  };

  const stopCamera = async () => {
    if (html5QrCodeRef.current && isCameraActive) {
      try {
        await html5QrCodeRef.current.stop();
        setIsCameraActive(false);
        toast.info("Camera stopped");
      } catch (err) {
        console.error("Error stopping camera:", err);
      }
    }
  };

  const toggleScanMode = () => {
    if (scanMode === 'manual') {
      startCamera();
    } else {
      stopCamera();
      setScanMode('manual');
    }
  };

  const handleScan = async (scannedCode?: string) => {
    const codeToScan = scannedCode || qrCode;
    
    if (!codeToScan.trim()) {
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
      const attendee = getResult.data.find((a: any) => a.qrCode === codeToScan.trim());
      
      if (!attendee) {
        toast.error("Invalid QR code - Attendee not found");
        setIsScanning(false);
        setQrCode("");
        return;
      }
      
      // Get the attendee ID - handle MongoDB ObjectId format
      let attendeeId = attendee._id || attendee.id;
      
      // If _id is an object with $oid, extract it
      if (typeof attendeeId === 'object' && attendeeId.$oid) {
        attendeeId = attendeeId.$oid;
      }
      
      if (!attendeeId) {
        toast.error("Invalid attendee data - ID missing");
        console.error('Attendee object:', attendee);
        setIsScanning(false);
        setQrCode("");
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
          <div className="glass-panel p-6 md:p-8">
            <div className="text-center mb-6">
              <Scan className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-4 text-primary" />
              <h2 className="text-2xl md:text-3xl font-bold mb-2">Scan Attendee QR Code</h2>
              <p className="text-muted-foreground text-sm md:text-base">
                {scanMode === 'camera' ? 'Point camera at QR code' : 'Enter or scan the QR code from attendee e-pass'}
              </p>
            </div>

            {/* Mode Toggle */}
            <div className="flex gap-2 mb-6">
              <Button
                onClick={toggleScanMode}
                variant={scanMode === 'camera' ? 'default' : 'outline'}
                className="flex-1 h-12"
              >
                <Camera className="w-4 h-4 mr-2" />
                Camera Scan
              </Button>
              <Button
                onClick={() => {
                  if (scanMode === 'camera') {
                    stopCamera();
                    setScanMode('manual');
                  }
                }}
                variant={scanMode === 'manual' ? 'default' : 'outline'}
                className="flex-1 h-12"
              >
                <Keyboard className="w-4 h-4 mr-2" />
                Manual Entry
              </Button>
            </div>

            {/* Camera View */}
            {scanMode === 'camera' && (
              <div className="mb-6">
                <div 
                  id="qr-reader" 
                  className="w-full rounded-lg overflow-hidden border-2 border-primary/20"
                />
              </div>
            )}

            {/* Manual Input */}
            {scanMode === 'manual' && (
              <div className="space-y-4">
                <Input
                  placeholder="Enter QR code..."
                  value={qrCode}
                  onChange={(e) => setQrCode(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleScan()}
                  className="text-base md:text-lg h-12 md:h-14"
                  autoFocus
                />
                <Button 
                  onClick={() => handleScan()} 
                  className="w-full h-12 md:h-14 text-base font-semibold" 
                  size="lg" 
                  disabled={isScanning}
                >
                  {isScanning ? "Scanning..." : "Mark Attendance"}
                </Button>
              </div>
            )}
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
