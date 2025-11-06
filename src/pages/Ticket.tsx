import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { QRCodeSVG } from "qrcode.react";
import { Download, ArrowLeft, Calendar, MapPin, Mail, Phone, User, Building, CheckCircle, Clock, DollarSign, ShieldCheck, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Attendee } from "@/lib/api";
import kaisanLogo from "@/assets/kaisan-logo.png";
import { toast } from "sonner";

const Ticket = () => {
  const [attendee, setAttendee] = useState<Attendee | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem("attendee");
    if (!stored) {
      navigate("/ticket-access");
      return;
    }
    const parsedAttendee = JSON.parse(stored);
    // Map fields explicitly to match Attendee type
    const capitalizedAttendee: Attendee = {
      fullName: parsedAttendee.fullName?.toUpperCase() || "",
      email: parsedAttendee.email?.toUpperCase() || "",
      contactNumber: parsedAttendee.contactNumber?.toUpperCase() || "",
      business: parsedAttendee.business?.toUpperCase() || "",
      designation: parsedAttendee.designation?.toUpperCase() || "",
      qrCode: parsedAttendee.qrCode?.toUpperCase() || "",
      registrationDate: parsedAttendee.registrationDate || new Date().toISOString(),
  paymentStatus: (parsedAttendee.paymentStatus ?? "pending"),
      attended: parsedAttendee.attended || false,
      checkInTime: parsedAttendee.checkInTime || null,
      dateOfBirth: parsedAttendee.dateOfBirth || "N/A", // Default value added
    };
    setAttendee(capitalizedAttendee);
  }, [navigate]);

  if (!attendee) return null;

  const handleDownload = () => {
    // 1) Extract QR SVG as a data URL so it prints reliably
  const qrSvgEl = document.querySelector('#qr-svg') as SVGElement | null;
    let qrDataUrl = '';
    if (qrSvgEl) {
      try {
        const svgMarkup = new XMLSerializer().serializeToString(qrSvgEl);
        qrDataUrl = 'data:image/svg+xml;utf8,' + encodeURIComponent(svgMarkup);
      } catch (e) {
        // Fallback: leave empty, the print will still work but without embedded QR image
        qrDataUrl = '';
      }
    }

    // 2) Build a pristine, single-page, A4 HTML document for printing
    const html = `<!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8" />
          <title>E-PASS | INFLUENCIA</title>
          <style>
            @page { size: A4 portrait; margin: 12mm; }
            * { box-sizing: border-box; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
            html, body { height: 100%; }
            body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: #fff; color: #000; margin: 0;
                   display: flex; align-items: center; justify-content: center;
                   /* Center within printable area (A4 height 297mm minus 12mm top + 12mm bottom margins) */
                   min-height: calc(297mm - 24mm); }
            .ticket { width: 100%; max-width: 180mm; margin: 0 auto; border: 3px solid #000; border-radius: 10px; overflow: hidden; }
            .header { background: linear-gradient(135deg, #e8eefb 0%, #ffffff 60%); padding: 16px 18px; display: flex; align-items: center; justify-content: space-between; }
            .brand { display: flex; align-items: center; gap: 12px; }
            .brand img { height: 40px; }
            .title { text-align: right; }
            .title h1 { margin: 0; font-size: 22px; font-weight: 900; letter-spacing: 2px; text-transform: uppercase; }
            .title p { margin: 2px 0 0; font-size: 10px; opacity: 0.7; text-transform: uppercase; }
            .status { margin-top: 6px; display: inline-flex; align-items: center; gap: 6px; padding: 6px 10px; border-radius: 999px; font-size: 10px; font-weight: 700; text-transform: uppercase; }
            .status.confirmed { background: rgba(59,130,246,.2); color: #1d4ed8; border: 1px solid rgba(59,130,246,.3); }
            .status.pending { background: rgba(234,179,8,.2); color: #a16207; border: 1px solid rgba(234,179,8,.3); }
            .status.checked { background: rgba(34,197,94,.2); color: #15803d; border: 1px solid rgba(34,197,94,.3); }
            .body { padding: 18px; }
            .grid { display: grid; grid-template-columns: 1.4fr 1fr; gap: 14px; }
            .section-title { font-size: 10px; font-weight: 800; text-transform: uppercase; color: #666; letter-spacing: .06em; margin-bottom: 6px; }
            .name { font-size: 22px; font-weight: 900; text-transform: uppercase; margin: 0 0 6px; }
            .role { font-size: 12px; color: #333; text-transform: uppercase; margin: 0; }
            .org { font-size: 11px; color: #777; text-transform: uppercase; margin: 2px 0 10px; }
            .details { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
            .card { background: linear-gradient(135deg, #f7fafc 0%, #eef2f7 100%); border: 1px solid #e5e7eb; border-left: 4px solid #3b82f6; padding: 10px; border-radius: 8px; }
            .label { font-size: 9px; color: #6b7280; text-transform: uppercase; margin-bottom: 2px; }
            .value { font-size: 12px; font-weight: 700; text-transform: uppercase; }
            .qrbox { display:flex; flex-direction:column; align-items:center; justify-content:center; background: linear-gradient(180deg, #ffffff, #f1f5f9); border:1px solid #e5e7eb; border-radius: 10px; padding: 12px; }
            .qrimg { background:#fff; padding:10px; border:2px solid #e5e7eb; border-radius: 10px; box-shadow: 0 6px 20px rgba(0,0,0,.12); }
            .qrimg img { width: 160px; height: 160px; display:block; }
            .qrnote { font-size: 10px; margin-top: 8px; text-transform: uppercase; color:#111; font-weight:700; }
            .qid { font-size: 9px; margin-top: 4px; font-family: 'Courier New', monospace; background:#f3f4f6; padding: 4px 6px; border-radius: 4px; }
            .statusbar { display:grid; grid-template-columns: repeat(3,1fr); gap: 10px; background: linear-gradient(180deg,#fff,#f8fafc); border:1px solid #e5e7eb; border-radius:10px; padding: 12px; margin-top: 12px; }
            .sitem { text-align:center; }
            .slabel { font-size: 9px; color:#6b7280; text-transform: uppercase; margin-bottom:2px; }
            .svalue { font-size: 12px; font-weight: 800; text-transform: uppercase; }
            .svalue.ok { color:#16a34a; }
            .svalue.wait { color:#a16207; }
            .instructions { margin-top: 14px; background: #fdeef2; border:1px solid #f5d0dc; border-radius: 10px; padding: 14px; }
            .instructions h3 { margin:0 0 8px; font-size: 12px; text-transform: uppercase; }
            .instructions ul { margin:0; padding-left: 16px; }
            .instructions li { font-size: 10px; text-transform: uppercase; color:#374151; margin: 4px 0; }
            .footer { text-align:center; font-size: 9px; color:#111; padding: 10px 12px; border-top:1px solid #e5e7eb; text-transform: uppercase; }
          </style>
        </head>
        <body>
          <div class="ticket">
            <div class="header">
              <div class="brand">
                <img src="${(document.querySelector('img[alt="KAISAN ASSOCIATES"]') as HTMLImageElement)?.src || ''}" alt="KAISAN" />
              </div>
              <div class="title">
                <h1>INFLUENCIA</h1>
                <p>EDITION 2.0 • 2025</p>
                <div class="status ${attendee.attended ? 'checked' : (attendee.paymentStatus === 'confirmed' ? 'confirmed' : 'pending')}">
                  ${attendee.attended ? 'CHECKED IN' : (attendee.paymentStatus === 'confirmed' ? 'CONFIRMED' : 'PENDING')}
                </div>
                <div style="font-size:9px;opacity:.7;margin-top:4px;">E-PASS #${attendee.qrCode.slice(-8)}</div>
              </div>
            </div>
            <div class="body">
              <div class="grid">
                <div>
                  <div class="section-title">Attendee Information</div>
                  <div class="name">${attendee.fullName}</div>
                  <div class="role">${attendee.designation || 'ATTENDEE'}</div>
                  <div class="org">${attendee.business}</div>
                  <div class="details">
                    <div class="card"><div class="label">Email</div><div class="value">${attendee.email}</div></div>
                    <div class="card"><div class="label">Phone</div><div class="value">${attendee.contactNumber}</div></div>
                    <div class="card"><div class="label">Event Date</div><div class="value">13 DECEMBER 2025</div></div>
                    <div class="card"><div class="label">Venue</div><div class="value">NILGIRI COLLEGE OF ARTS AND SCIENCE</div></div>
                  </div>
                </div>
                <div class="qrbox">
                  <div class="qrimg">${qrDataUrl ? `<img src="${qrDataUrl}" alt="QR"/>` : ''}</div>
                  <div class="qrnote">Scan for Entry</div>
                  <div class="qid">${attendee.qrCode}</div>
                </div>
              </div>
              <div class="statusbar">
                <div class="sitem"><div class="slabel">Registered</div><div class="svalue">${new Date(attendee.registrationDate).toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric'}).toUpperCase()}</div></div>
                <div class="sitem"><div class="slabel">Payment</div><div class="svalue ${attendee.paymentStatus==='confirmed'?'ok':'wait'}">${attendee.paymentStatus==='confirmed'?'✓ CONFIRMED':'⏳ PENDING'}</div></div>
                <div class="sitem"><div class="slabel">Checked In</div><div class="svalue ${attendee.attended?'ok':'wait'}">${attendee.attended ? (attendee.checkInTime ? new Date(attendee.checkInTime).toLocaleString('en-US',{month:'short',day:'numeric',hour:'2-digit',minute:'2-digit'}).toUpperCase() : '✓ CHECKED IN'): 'AWAITING'}</div></div>
              </div>
              <div class="instructions">
                <h3>Important Instructions</h3>
                <ul>
                  <li>This e-pass is valid for one person only and non-transferable</li>
                  <li>Please carry a valid photo ID along with this e-pass</li>
                  <li>Entry will be allowed only after QR code verification</li>
                  <li>Please arrive 30 minutes before the event starts</li>
                </ul>
              </div>
            </div>
            <div class="footer">© 2025 KAISAN ASSOCIATES. ALL RIGHTS RESERVED. | FOR SUPPORT: INFO@KAISANASSOCIATES.COM</div>
          </div>
        </body>
      </html>`;

    // 3) Open a pop-up window and print the pristine document
    const win = window.open('', '_blank', 'width=900,height=1000');
    if (win) {
      win.document.open();
      win.document.write(html);
      win.document.close();
      setTimeout(() => {
        win.focus();
        win.print();
        setTimeout(() => win.close(), 800);
      }, 300);
    }
  };

  const handleNeedHelp = () => {
    const phoneNumber = "+918589990060";
    const message = encodeURIComponent("Hello, I need assistance with my registration.");
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappURL, "_blank");
  };

  const handlePayNow = () => {
    const phoneNumber = "+918589990060";
    const message = encodeURIComponent("Hello, I would like to complete my payment for the event.");
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappURL, "_blank");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 py-6 sm:py-8 md:py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        <Link to="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-6 transition-colors print:hidden">
          <ArrowLeft className="w-4 h-4 mr-2" />
          BACK TO HOME
        </Link>

        <div id="epass-container" className="glass-panel overflow-hidden animate-scale-in">
          <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 border-b-2 border-primary/20 p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6">
              <div className="flex items-center gap-4">
                <img src={kaisanLogo} alt="KAISAN ASSOCIATES" className="h-14 sm:h-16 md:h-20 object-contain" />
                <div className="border-l-2 border-primary/30 pl-4">
                  <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold gradient-text tracking-tight uppercase break-words">INFLUENCIA</h1>
                  <p className="text-xs sm:text-sm md:text-base text-muted-foreground font-medium uppercase">EDITION 2.0 • 2025</p>
                </div>
              </div>
              <div className="text-center sm:text-right">
                <div className={`inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-semibold uppercase ${
                  attendee.attended 
                    ? 'bg-green-500/20 text-green-700 border border-green-500/30' 
                    : attendee.paymentStatus === 'confirmed'
                    ? 'bg-blue-500/20 text-blue-700 border border-blue-500/30'
                    : 'bg-yellow-500/20 text-yellow-700 border border-yellow-500/30'
                }`}>
                  {attendee.attended ? (
                    <><CheckCircle className="w-4 h-4" /> CHECKED IN</>
                  ) : attendee.paymentStatus === 'confirmed' ? (
                    <><CheckCircle className="w-4 h-4" /> CONFIRMED</>
                  ) : (
                    <><Clock className="w-4 h-4" /> PENDING</>
                  )}
                </div>
                <p className="text-xs text-muted-foreground mt-2 uppercase">E-PASS #{attendee.qrCode.slice(-8).toUpperCase()}</p>
              </div>
            </div>
          </div>

          <div className="p-4 sm:p-6 md:p-8 lg:p-10">
            {/* Payment encouragement card (shows only when payment is pending) */}
            {attendee.paymentStatus !== 'confirmed' && (
              <div className="mb-6 md:mb-8 rounded-xl border border-yellow-300/60 bg-yellow-50 p-4 sm:p-5 shadow-sm">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 rounded-full bg-yellow-200 p-2 text-yellow-700">
                      <DollarSign className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold uppercase text-yellow-800">Payment Pending — Complete to Confirm Your Seat</h3>
                      <p className="text-xs text-yellow-700/90 mt-1">
                        Finish your payment now to unlock fast entry, priority seating, and bonus resources.
                      </p>
                      <ul className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-x-4 gap-y-2 text-[11px] text-yellow-800/90">
                        <li className="inline-flex items-center gap-2"><ShieldCheck className="w-3.5 h-3.5" /> Guaranteed seat</li>
                        <li className="inline-flex items-center gap-2"><Zap className="w-3.5 h-3.5" /> Fast-track entry</li>
                        <li className="inline-flex items-center gap-2"><CheckCircle className="w-3.5 h-3.5" /> Bonus resources</li>
                      </ul>
                    </div>
                  </div>
                  <div className="flex-shrink-0 mt-4 md:mt-0">
                    <div className="flex flex-col sm:flex-row items-center gap-3">
                      <Button onClick={handlePayNow} className="w-full sm:w-auto h-11 px-6 font-semibold uppercase bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white rounded-full text-sm">
                        <DollarSign className="w-4 h-4 mr-2" /> Pay Now
                      </Button>
                      <Button onClick={handleNeedHelp} variant="outline" className="w-full sm:w-auto h-11 px-4 rounded-full uppercase text-sm">
                        Need Help
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div className="grid lg:grid-cols-[1.6fr,1fr] gap-8 md:gap-10">
              <div className="space-y-6 md:space-y-8">
                <div className="space-y-2">
                  <p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">ATTENDEE INFORMATION</p>
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground leading-tight uppercase">{attendee.fullName}</h2>
                  <div className="flex items-center gap-2 text-base md:text-lg text-primary font-medium uppercase">
                    <Building className="w-5 h-5" />
                    <span>{attendee.designation || 'ATTENDEE'}</span>
                  </div>
                  <p className="text-sm md:text-base text-muted-foreground uppercase">{attendee.business}</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-start gap-3 p-3 sm:p-4 rounded-lg bg-muted/30 border border-border/50">
                    <Mail className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <div className="min-w-0">
                      <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">EMAIL</p>
                      <p className="text-sm font-medium break-all uppercase">{attendee.email}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 sm:p-4 rounded-lg bg-muted/30 border border-border/50">
                    <Phone className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <div className="min-w-0">
                      <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">PHONE</p>
                      <p className="text-sm font-medium uppercase">{attendee.contactNumber}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 sm:p-4 rounded-lg bg-muted/30 border border-border/50">
                    <Calendar className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <div className="min-w-0">
                      <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">EVENT DATE</p>
                      <p className="text-sm font-medium uppercase">13 DECEMBER 2025</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 sm:p-4 rounded-lg bg-muted/30 border border-border/50">
                    <MapPin className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <div className="min-w-0">
                      <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">VENUE</p>
                      <p className="text-sm font-medium uppercase">NILGIRI COLLEGE OF ARTS AND SCIENCE</p>
                    </div>
                  </div>
                </div>

                <div className="border-l-4 border-primary pl-4 py-2 space-y-2">
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-xs sm:text-sm text-muted-foreground uppercase">REGISTERED</span>
                    <span className="text-xs sm:text-sm font-semibold uppercase text-right">{new Date(attendee.registrationDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).toUpperCase()}</span>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-xs sm:text-sm text-muted-foreground uppercase">PAYMENT</span>
                    <span className={`text-xs sm:text-sm font-semibold uppercase ${
                      attendee.paymentStatus === 'confirmed' ? 'text-green-600' : 'text-yellow-600'
                    }`}>
                      {attendee.paymentStatus === 'confirmed' ? '✓ CONFIRMED' : '⏳ PENDING'}
                    </span>
                  </div>
                  {attendee.attended && attendee.checkInTime && (
                    <div className="flex items-center justify-between gap-4">
                      <span className="text-xs sm:text-sm text-muted-foreground uppercase">CHECKED IN</span>
                      <span className="text-xs sm:text-sm font-semibold text-green-600 uppercase text-right">
                        {new Date(attendee.checkInTime).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }).toUpperCase()}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex flex-col items-center justify-center row-start-1 lg:row-auto">
                <div className="relative w-full max-w-[280px] sm:max-w-[320px]">
                  <div className="absolute inset-0 bg-primary/10 blur-2xl rounded-full"></div>
                  <div className="relative bg-white p-4 sm:p-6 rounded-2xl shadow-2xl border-4 border-primary/20">
                    <QRCodeSVG
                      id="qr-svg"
                      value={attendee.qrCode}
                      width="100%"
                      height="100%"
                      level="H"
                      includeMargin={true}
                      fgColor="#000000"
                      bgColor="#ffffff"
                    />
                  </div>
                </div>
                <div className="mt-6 text-center space-y-2">
                  <p className="text-sm font-semibold text-foreground uppercase">SCAN FOR ENTRY</p>
                  <p className="text-xs text-muted-foreground max-w-xs uppercase">
                    PRESENT THIS QR CODE AT THE VENUE ENTRANCE FOR INSTANT VERIFICATION
                  </p>
                  <div className="inline-block px-3 py-1 bg-muted rounded text-xs font-mono text-muted-foreground mt-2 uppercase">
                    {attendee.qrCode}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 md:mt-10 pt-8 border-t border-border">
              <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 sm:p-6">
                <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2 uppercase">
                  <User className="w-4 h-4" />
                  IMPORTANT INSTRUCTIONS
                </h3>
                <ul className="text-xs text-muted-foreground space-y-2 list-disc list-inside uppercase">
                  <li>THIS E-PASS IS VALID FOR ONE PERSON ONLY AND NON-TRANSFERABLE</li>
                  <li>PLEASE CARRY A VALID PHOTO ID ALONG WITH THIS E-PASS</li>
                  <li>ENTRY WILL BE ALLOWED ONLY AFTER QR CODE VERIFICATION</li>
                  <li>PLEASE ARRIVE 30 MINUTES BEFORE THE EVENT STARTS</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-muted/30 border-t border-border px-4 sm:px-8 py-4 sm:py-6 text-center">
            <p className="text-xs text-muted-foreground uppercase">
              © 2025 KAISAN ASSOCIATES. ALL RIGHTS RESERVED. | FOR SUPPORT: INFO@KAISANASSOCIATES.COM
            </p>
          </div>

          <div className="p-4 sm:p-6 text-center print:hidden border-t border-border">
            <Button onClick={handleDownload} size="lg" className="w-full sm:w-auto h-auto px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base uppercase">
              <Download className="w-5 h-5 mr-2" />
              DOWNLOAD / PRINT E-PASS
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ticket;
