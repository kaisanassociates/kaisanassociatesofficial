import { useEffect, useState } from "react";
import { QRCode } from "react-qrcode-logo";
import kaisanLogo from "@/assets/kaisan-logo.png";
import { toast } from "sonner";

const BulkPrintPage = () => {
  const [attendees, setAttendees] = useState<any[]>([]);

  useEffect(() => {
    try {
      const bulkAttendees = sessionStorage.getItem("bulk_attendees");
      if (bulkAttendees) {
        const parsedAttendees = JSON.parse(bulkAttendees);
        setAttendees(parsedAttendees);
        
        // Trigger print dialog after a short delay to allow rendering
        setTimeout(() => {
          window.print();
        }, 1000);

      } else {
        toast.error("No attendee data found for bulk printing.");
      }
    } catch (error) {
      toast.error("Failed to parse attendee data.");
      console.error("Error parsing sessionStorage data:", error);
    }
  }, []);

  if (attendees.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">No Attendees to Print</h1>
          <p className="text-gray-600">No attendee data was found. Please go back to the admin page and select attendees to print.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white">
      {attendees.map((attendee) => (
        <div key={attendee._id} className="w-[210mm] h-[297mm] p-8 page-break">
          <div className="border-4 border-black p-4 h-full flex flex-col items-center justify-between bg-white text-black">
            {/* Header */}
            <div className="text-center w-full">
              <img src={kaisanLogo} alt="Kaisan Logo" className="h-20 mx-auto mb-4" />
              <h1 className="text-5xl font-bold tracking-wider">INFLUENCIA</h1>
              <p className="text-2xl font-semibold">EDITION 2</p>
              <p className="text-lg mt-2">OFFICIAL E-PASS</p>
            </div>

            {/* QR Code and Details */}
            <div className="flex items-center justify-around w-full my-8">
              <div className="w-1/2 pr-4">
                <h2 className="text-3xl font-bold mb-4">{attendee.fullName || attendee.name}</h2>
                <p className="text-xl mb-2"><strong>Email:</strong> {attendee.email}</p>
                <p className="text-xl mb-2"><strong>Phone:</strong> {attendee.contactNumber || attendee.phone}</p>
                <p className="text-xl mb-2"><strong>Business:</strong> {attendee.business || attendee.organization || 'N/A'}</p>
                <p className="text-xl"><strong>Sectors:</strong> {attendee.sectors?.join(', ') || 'N/A'}</p>
              </div>
              <div className="w-1/2 pl-4 flex flex-col items-center justify-center">
                <QRCode
                  value={attendee.qrCode || `INFLUENCIA2025-${attendee._id}`}
                  size={200}
                  logoImage={kaisanLogo}
                  logoWidth={60}
                  logoHeight={60}
                  qrStyle="squares"
                  eyeRadius={10}
                />
                <p className="text-center font-mono mt-4 text-lg">{attendee.qrCode}</p>
              </div>
            </div>

            {/* Footer */}
            <div className="text-center w-full">
              <p className="text-xl font-semibold">20 DECEMBER 2025 | NILGIRI COLLEGE OF ARTS AND SCIENCE</p>
              <p className="text-sm mt-2">This pass admits one person. This pass is non-transferable.</p>
            </div>
          </div>
        </div>
      ))}
      <style>{`
        @media print {
          body * {
            visibility: hidden;
          }
          .page-break {
            page-break-after: always;
          }
          .page-break, .page-break * {
            visibility: visible;
          }
          .page-break {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
          }
        }
        @page {
          size: A4;
          margin: 0;
        }
      `}</style>
    </div>
  );
};

export default BulkPrintPage;
