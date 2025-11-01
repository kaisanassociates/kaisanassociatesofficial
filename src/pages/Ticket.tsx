import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { QRCodeSVG } from "qrcode.react";
import { Download, ArrowLeft, Calendar, MapPin, Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Attendee } from "@/lib/api";
import kaisanLogo from "@/assets/kaisan-logo.png";

const Ticket = () => {
  const [attendee, setAttendee] = useState<Attendee | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem("attendee");
    if (!stored) {
      navigate("/ticket-access");
      return;
    }
    setAttendee(JSON.parse(stored));
  }, [navigate]);

  if (!attendee) return null;

  const handleDownload = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 py-8 md:py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        <Link to="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Link>

        <div className="glass-panel p-6 md:p-12 animate-scale-in">
          {/* Header */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8 pb-8 border-b border-border">
            <img src={kaisanLogo} alt="Kaisan Associates" className="h-12 md:h-16 object-contain" />
            <div className="text-center md:text-right">
              <h1 className="text-2xl md:text-3xl font-bold gradient-text">INFLUENCIA</h1>
              <p className="text-sm text-muted-foreground">Edition 2 - 2025</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Left Column - Attendee Details */}
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-2">{attendee.fullName}</h2>
                <p className="text-sm md:text-base text-muted-foreground">{attendee.designation}</p>
                <p className="text-sm md:text-base text-muted-foreground">{attendee.business}</p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <Mail className="w-4 h-4 text-primary" />
                  <span>{attendee.email}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Phone className="w-4 h-4 text-primary" />
                  <span>{attendee.contactNumber}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Calendar className="w-4 h-4 text-primary" />
                  <span>March 15, 2025</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <MapPin className="w-4 h-4 text-primary" />
                  <span>Kerala, India</span>
                </div>
              </div>

              <div className="bg-primary/10 backdrop-blur-sm border border-primary/20 rounded-lg p-4">
                <p className="text-sm font-semibold mb-2">Registration Details</p>
                <p className="text-xs text-muted-foreground">
                  Registered: {new Date(attendee.registrationDate).toLocaleDateString()}
                </p>
                <p className="text-xs text-muted-foreground">
                  Payment Status: <span className={
                    attendee.paymentStatus === 'confirmed' ? "text-green-500 font-semibold" : 
                    attendee.paymentStatus === 'cancelled' ? "text-red-500 font-semibold" : 
                    "text-yellow-500 font-semibold"
                  }>
                    {attendee.paymentStatus === 'confirmed' ? "✓ Confirmed" : 
                     attendee.paymentStatus === 'cancelled' ? "✗ Cancelled" : 
                     "⏳ Pending Payment"}
                  </span>
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Attendance: <span className={attendee.attended ? "text-green-500 font-semibold" : "text-gray-500"}>
                    {attendee.attended ? "✓ Checked In" : "Not yet checked in"}
                  </span>
                </p>
                {attendee.attended && attendee.checkInTime && (
                  <p className="text-xs text-muted-foreground mt-1">
                    Check-in: {new Date(attendee.checkInTime).toLocaleString()}
                  </p>
                )}
              </div>
            </div>

            {/* Right Column - QR Code */}
            <div className="flex flex-col items-center justify-center">
              <div className="bg-white p-4 md:p-6 rounded-xl shadow-lg">
                <QRCodeSVG
                  value={attendee.qrCode}
                  size={window.innerWidth < 768 ? 180 : 220}
                  level="H"
                  includeMargin
                />
              </div>
              <p className="text-xs text-muted-foreground mt-4 text-center max-w-xs">
                Show this QR code at the venue entrance for quick check-in
              </p>
              <p className="text-xs text-muted-foreground font-mono mt-2">
                ID: {attendee.qrCode.slice(0, 16)}...
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-8 pt-8 border-t border-border text-center">
            <p className="text-sm text-muted-foreground">
              This e-pass is valid for one person only. Please keep it safe and present it at the venue.
            </p>
          </div>

          {/* Download Button */}
          <div className="mt-6 text-center print:hidden">
            <Button onClick={handleDownload} size="lg" className="w-full md:w-auto">
              <Download className="w-4 h-4 mr-2" />
              Download / Print E-Pass
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ticket;
