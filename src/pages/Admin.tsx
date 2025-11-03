import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Search, Trash2, CheckCircle, XCircle, DollarSign, Eye, Edit, FileDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import kaisanLogo from "@/assets/kaisan-logo.png";
import * as XLSX from "xlsx";

const Admin = () => {
  const [attendees, setAttendees] = useState<any[]>([]);
  const [filteredAttendees, setFilteredAttendees] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [adminKey, setAdminKey] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedAttendee, setSelectedAttendee] = useState<any>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editedAttendee, setEditedAttendee] = useState<any>(null);

  const handleLogin = async () => {
    if (!adminKey.trim()) {
      toast.error("Please enter admin key");
      return;
    }
    setIsLoading(true);
    try {
      // Simple admin authentication - in production, use proper auth
      if (adminKey === "admin123") {
        // Fetch real registrations
        const response = await fetch('/api/registrations', {
          headers: {
            'Authorization': `Bearer ${adminKey}`
          }
        });
        const result = await response.json();
        
        if (result.success) {
          setAttendees(result.data);
          setFilteredAttendees(result.data);
          setIsAuthenticated(true);
          toast.success("Admin access granted");
        } else {
          throw new Error('Failed to fetch registrations');
        }
      } else {
        throw new Error('Invalid admin key');
      }
    } catch (error) {
      toast.error("Invalid admin key");
    } finally {
      setIsLoading(false)
    }
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    const filtered = attendees.filter(
      (a) =>
        a.name.toLowerCase().includes(query.toLowerCase()) ||
        a.email.toLowerCase().includes(query.toLowerCase()) ||
        a.phone.includes(query)
    );
    setFilteredAttendees(filtered);
  };

  const handleToggleAttendance = async (id: string) => {
    try {
      const response = await fetch(`/api/attendees/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${adminKey}`
        },
        body: JSON.stringify({ action: 'toggle_attendance' })
      });
      
      const result = await response.json();
      
      if (result.success) {
        const updated = attendees.map((a) => 
          a._id === id ? { ...a, attended: !a.attended } : a
        );
        setAttendees(updated);
        setFilteredAttendees(updated);
        toast.success(`Attendance ${result.data.attended ? 'marked' : 'unmarked'} successfully`);
      } else {
        throw new Error(result.error || 'Failed to update attendance');
      }
    } catch (error) {
      toast.error("Failed to update attendance");
    }
  };

  const handleConfirmPayment = async (id: string) => {
    try {
      const response = await fetch(`/api/attendees/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${adminKey}`
        },
        body: JSON.stringify({ paymentStatus: 'confirmed' })
      });
      
      const result = await response.json();
      
      if (result.success) {
        const updated = attendees.map((a) => 
          a._id === id ? { ...a, paymentStatus: 'confirmed' } : a
        );
        setAttendees(updated);
        setFilteredAttendees(updated);
        toast.success('Payment confirmed successfully');
      } else {
        throw new Error(result.error || 'Failed to confirm payment');
      }
    } catch (error) {
      toast.error("Failed to confirm payment");
    }
  };

  // Export filtered attendees to CSV (Excel-compatible)
  const handleExportCSV = () => {
    const rows = filteredAttendees.length ? filteredAttendees : attendees;
    if (!rows.length) {
      toast.error("No records to export");
      return;
    }

    const headers = [
      'NAME','EMAIL','PHONE','BUSINESS','DESIGNATION','SECTORS','PAYMENT STATUS','ATTENDED','REGISTRATION DATE','CHECK-IN TIME','QR CODE'
    ];

    const esc = (val: any) => {
      if (val === null || val === undefined) return '';
      const s = String(val).replace(/"/g, '""');
      return `"${s}"`;
    };

    const csvLines = [headers.join(',')];
    for (const a of rows) {
      const line = [
        esc(a.fullName || a.name),
        esc(a.email),
        esc(a.contactNumber || a.phone),
        esc(a.business || a.organization || ''),
        esc(a.designation || ''),
        esc(Array.isArray(a.sectors) ? a.sectors.join('; ') : ''),
        esc(a.paymentStatus || 'pending'),
        esc(a.attended ? 'YES' : 'NO'),
        esc(a.registrationDate ? new Date(a.registrationDate).toLocaleString() : ''),
        esc(a.checkInTime ? new Date(a.checkInTime).toLocaleString() : ''),
        esc(a.qrCode || '')
      ].join(',');
      csvLines.push(line);
    }

    const csvContent = csvLines.join('\r\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    const ts = new Date().toISOString().replace(/[:T]/g,'-').slice(0,16);
    a.href = url;
    a.download = `influencia-registrations-${ts}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success('Export generated');
  };

  const handleExportExcel = () => {
    const headers = [
      "Name",
      "Email",
      "Phone",
      "Business",
      "Designation",
      "Sectors",
      "Payment Status",
      "Attended",
      "Registration Date",
      "Check-in Time",
      "QR Code",
    ];

    const data = attendees.map((attendee) => [
      attendee.fullName || attendee.name,
      attendee.email,
      attendee.contactNumber || attendee.phone,
      attendee.business || attendee.organization,
      attendee.designation,
      attendee.sectors?.join(", "),
      attendee.paymentStatus.toUpperCase(),
      attendee.attended ? "Yes" : "No",
      new Date(attendee.registrationDate).toLocaleDateString(),
      attendee.checkInTime ? new Date(attendee.checkInTime).toLocaleString() : "N/A",
      attendee.qrCode,
    ]);

    const worksheet = XLSX.utils.aoa_to_sheet([headers, ...data]);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Registrations");

    // Set column widths
    worksheet["!cols"] = headers.map(() => ({ wch: 20 }));

    // Generate and download the Excel file
    const filename = `influencia-registrations-${new Date()
      .toISOString()
      .slice(0, 16)
      .replace("T", "-")
      .replace(":", "-")}.xlsx`;
    XLSX.writeFile(workbook, filename);
  };

  const handleViewAttendee = (attendee: any) => {
    setSelectedAttendee(attendee);
    setEditedAttendee({ ...attendee });
    setIsEditMode(false);
    setIsViewDialogOpen(true);
  };

  const handleEditAttendee = () => {
    setIsEditMode(true);
  };

  const handleSaveEdit = async () => {
    if (!editedAttendee) return;
    
    setIsLoading(true);
    try {
      console.log('Saving attendee:', editedAttendee);
      
      const updateData = {
        name: editedAttendee.fullName || editedAttendee.name,
        fullName: editedAttendee.fullName,
        email: editedAttendee.email,
        phone: editedAttendee.contactNumber || editedAttendee.phone,
        contactNumber: editedAttendee.contactNumber,
        business: editedAttendee.business,
        organization: editedAttendee.organization,
        designation: editedAttendee.designation,
        dateOfBirth: editedAttendee.dateOfBirth,
        sectors: editedAttendee.sectors,
        experience: editedAttendee.experience,
        achievements: editedAttendee.achievements,
        futurePlan: editedAttendee.futurePlan
      };
      
      console.log('Update data:', updateData);
      
      const response = await fetch(`/api/attendees/${editedAttendee._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${adminKey}`
        },
        body: JSON.stringify(updateData)
      });
      
      console.log('Response status:', response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error response:', errorText);
        throw new Error(`HTTP ${response.status}: ${errorText}`);
      }
      
      const result = await response.json();
      console.log('Result:', result);
      
      if (result.success) {
        const updated = attendees.map((a) => 
          a._id === editedAttendee._id ? result.data : a
        );
        setAttendees(updated);
        setFilteredAttendees(updated);
        setSelectedAttendee(result.data);
        setIsEditMode(false);
        toast.success('Attendee updated successfully');
      } else {
        throw new Error(result.error || 'Failed to update attendee');
      }
    } catch (error: any) {
      console.error('Update error:', error);
      toast.error(error.message || "Failed to update attendee");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this attendee?")) return;
    try {
      const response = await fetch(`/api/attendees/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${adminKey}`
        },
        body: JSON.stringify({ action: 'delete' })
      });
      
      const result = await response.json();
      
      if (result.success) {
        const updated = attendees.filter((a) => a._id !== id);
        setAttendees(updated);
        setFilteredAttendees(updated);
        toast.success("Attendee deleted successfully");
      } else {
        throw new Error(result.error || 'Failed to delete attendee');
      }
    } catch (error) {
      toast.error("Failed to delete attendee");
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
            <h1 className="text-3xl md:text-4xl font-bold gradient-text mb-2">Admin Panel</h1>
            <p className="text-muted-foreground">Enter admin key to access</p>
          </div>
          <Input
            type="password"
            placeholder="Enter admin key"
            value={adminKey}
            onChange={(e) => setAdminKey(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            className="mb-4 h-12"
          />
          <Button onClick={handleLogin} className="w-full h-12 font-semibold" disabled={isLoading}>
            {isLoading ? "Authenticating..." : "Login"}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <main className="container mx-auto px-4 py-8">
        <Link to="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Link>

        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold gradient-text mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage event registrations</p>
        </div>

        <div className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="glass-panel p-6">
              <h3 className="text-sm text-muted-foreground mb-2">Total Registrations</h3>
              <p className="text-3xl font-bold">{attendees.length}</p>
            </div>
            <div className="glass-panel p-6">
              <h3 className="text-sm text-muted-foreground mb-2">Attended</h3>
              <p className="text-3xl font-bold text-green-500">
                {attendees.filter((a) => a.attended).length}
              </p>
            </div>
            <div className="glass-panel p-6">
              <h3 className="text-sm text-muted-foreground mb-2">Pending</h3>
              <p className="text-3xl font-bold text-yellow-500">
                {attendees.filter((a) => !a.attended).length}
              </p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row md:items-center gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Search by name, email, or phone..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button onClick={handleExportCSV} variant="outline" className="h-12 md:h-10 rounded-full">
              <FileDown className="w-4 h-4 mr-2" />
              Export to CSV
            </Button>
            <Button onClick={handleExportExcel} variant="outline" className="h-12 md:h-10 rounded-full">
              <FileDown className="w-4 h-4 mr-2" />
              Export to Excel
            </Button>
          </div>
        </div>

        <div className="glass-panel overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted/50 border-b border-border">
                <tr>
                  <th className="px-4 py-4 text-left text-sm font-semibold">Name</th>
                  <th className="px-4 py-4 text-left text-sm font-semibold hidden md:table-cell">Email</th>
                  <th className="px-4 py-4 text-left text-sm font-semibold hidden lg:table-cell">Phone</th>
                  <th className="px-4 py-4 text-left text-sm font-semibold">Payment</th>
                  <th className="px-4 py-4 text-left text-sm font-semibold">Attendance</th>
                  <th className="px-4 py-4 text-left text-sm font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredAttendees.map((attendee) => (
                  <tr key={attendee._id} className="hover:bg-muted/30 transition-colors">
                    <td className="px-4 py-4">
                      <div>
                        <p className="font-medium">{attendee.name}</p>
                        <p className="text-xs text-muted-foreground md:hidden">{attendee.email}</p>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-sm text-muted-foreground hidden md:table-cell">{attendee.email}</td>
                    <td className="px-4 py-4 text-sm text-muted-foreground hidden lg:table-cell">{attendee.phone}</td>
                    <td className="px-4 py-4">
                      {attendee.paymentStatus === 'confirmed' ? (
                        <span className="inline-flex items-center gap-1 text-green-500 text-sm">
                          <DollarSign className="w-4 h-4" />
                          Confirmed
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-yellow-500 text-sm">
                          <DollarSign className="w-4 h-4" />
                          Pending
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-4">
                      {attendee.attended ? (
                        <span className="inline-flex items-center gap-1 text-green-500 text-sm">
                          <CheckCircle className="w-4 h-4" />
                          Attended
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-yellow-500 text-sm">
                          <XCircle className="w-4 h-4" />
                          Pending
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleViewAttendee(attendee)}
                          className="h-9 w-9 rounded-full"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        {attendee.paymentStatus !== 'confirmed' && (
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => handleConfirmPayment(attendee._id)}
                            className="h-9 w-9 rounded-full"
                            title="Confirm Payment"
                          >
                            <DollarSign className="w-4 h-4" />
                          </Button>
                        )}
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleToggleAttendance(attendee._id)}
                          className="h-9 w-9 rounded-full"
                          title={attendee.attended ? "Unmark Attendance" : "Mark Attendance"}
                        >
                          {attendee.attended ? <XCircle className="w-4 h-4" /> : <CheckCircle className="w-4 h-4" />}
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleDelete(attendee._id)}
                          className="h-9 w-9 rounded-full text-destructive hover:bg-destructive/10"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* View/Edit Attendee Dialog */}
        <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center justify-between">
                <span>{isEditMode ? 'Edit' : 'View'} Attendee Details</span>
                {!isEditMode && (
                  <Button variant="outline" size="sm" onClick={handleEditAttendee}>
                    <Edit className="w-4 h-4 mr-2" />
                    Edit
                  </Button>
                )}
              </DialogTitle>
              <DialogDescription>
                {isEditMode ? 'Update attendee information below' : 'Complete registration details'}
              </DialogDescription>
            </DialogHeader>

            {selectedAttendee && editedAttendee && (
              <div className="space-y-6 py-4">
                {/* Personal Information */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>Full Name</Label>
                      {isEditMode ? (
                        <Input
                          value={editedAttendee.fullName || editedAttendee.name || ''}
                          onChange={(e) => setEditedAttendee({...editedAttendee, fullName: e.target.value})}
                          className="mt-1"
                        />
                      ) : (
                        <p className="mt-1 text-sm">{selectedAttendee.fullName || selectedAttendee.name}</p>
                      )}
                    </div>
                    <div>
                      <Label>Email</Label>
                      {isEditMode ? (
                        <Input
                          type="email"
                          value={editedAttendee.email || ''}
                          onChange={(e) => setEditedAttendee({...editedAttendee, email: e.target.value})}
                          className="mt-1"
                        />
                      ) : (
                        <p className="mt-1 text-sm">{selectedAttendee.email}</p>
                      )}
                    </div>
                    <div>
                      <Label>Contact Number</Label>
                      {isEditMode ? (
                        <Input
                          value={editedAttendee.contactNumber || editedAttendee.phone || ''}
                          onChange={(e) => setEditedAttendee({...editedAttendee, contactNumber: e.target.value})}
                          className="mt-1"
                        />
                      ) : (
                        <p className="mt-1 text-sm">{selectedAttendee.contactNumber || selectedAttendee.phone}</p>
                      )}
                    </div>
                    <div>
                      <Label>Date of Birth</Label>
                      {isEditMode ? (
                        <Input
                          type="date"
                          value={editedAttendee.dateOfBirth || ''}
                          onChange={(e) => setEditedAttendee({...editedAttendee, dateOfBirth: e.target.value})}
                          className="mt-1"
                        />
                      ) : (
                        <p className="mt-1 text-sm">{selectedAttendee.dateOfBirth || 'N/A'}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Professional Information */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Professional Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>Business/Organization</Label>
                      {isEditMode ? (
                        <Input
                          value={editedAttendee.business || editedAttendee.organization || ''}
                          onChange={(e) => setEditedAttendee({...editedAttendee, business: e.target.value})}
                          className="mt-1"
                        />
                      ) : (
                        <p className="mt-1 text-sm">{selectedAttendee.business || selectedAttendee.organization || 'N/A'}</p>
                      )}
                    </div>
                    <div>
                      <Label>Designation</Label>
                      {isEditMode ? (
                        <Input
                          value={editedAttendee.designation || ''}
                          onChange={(e) => setEditedAttendee({...editedAttendee, designation: e.target.value})}
                          className="mt-1"
                        />
                      ) : (
                        <p className="mt-1 text-sm">{selectedAttendee.designation || 'N/A'}</p>
                      )}
                    </div>
                    <div className="md:col-span-2">
                      <Label>Sectors</Label>
                      <p className="mt-1 text-sm">
                        {selectedAttendee.sectors?.join(', ') || 'N/A'}
                      </p>
                    </div>
                    <div className="md:col-span-2">
                      <Label>Experience</Label>
                      {isEditMode ? (
                        <Input
                          value={editedAttendee.experience || ''}
                          onChange={(e) => setEditedAttendee({...editedAttendee, experience: e.target.value})}
                          className="mt-1"
                        />
                      ) : (
                        <p className="mt-1 text-sm">{selectedAttendee.experience || 'N/A'}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Additional Information */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Additional Information</h3>
                  <div className="space-y-4">
                    <div>
                      <Label>Achievements</Label>
                      <p className="mt-1 text-sm whitespace-pre-wrap">{selectedAttendee.achievements || 'N/A'}</p>
                    </div>
                    <div>
                      <Label>Future Plans</Label>
                      <p className="mt-1 text-sm whitespace-pre-wrap">{selectedAttendee.futurePlan || 'N/A'}</p>
                    </div>
                  </div>
                </div>

                {/* Registration Details */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Registration Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>QR Code</Label>
                      <p className="mt-1 text-sm font-mono">{selectedAttendee.qrCode}</p>
                    </div>
                    <div>
                      <Label>Registration Date</Label>
                      <p className="mt-1 text-sm">
                        {selectedAttendee.registrationDate ? new Date(selectedAttendee.registrationDate).toLocaleString() : 'N/A'}
                      </p>
                    </div>
                    <div>
                      <Label>Payment Status</Label>
                      <p className={`mt-1 text-sm font-semibold ${
                        selectedAttendee.paymentStatus === 'confirmed' ? 'text-green-500' : 'text-yellow-500'
                      }`}>
                        {selectedAttendee.paymentStatus || 'pending'}
                      </p>
                    </div>
                    <div>
                      <Label>Attendance Status</Label>
                      <p className={`mt-1 text-sm font-semibold ${
                        selectedAttendee.attended ? 'text-green-500' : 'text-yellow-500'
                      }`}>
                        {selectedAttendee.attended ? 'Attended' : 'Not Attended'}
                      </p>
                    </div>
                    {selectedAttendee.checkInTime && (
                      <div>
                        <Label>Check-in Time</Label>
                        <p className="mt-1 text-sm">
                          {new Date(selectedAttendee.checkInTime).toLocaleString()}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                {isEditMode && (
                  <div className="flex gap-2 justify-end pt-4 border-t">
                    <Button 
                      variant="outline" 
                      onClick={() => {
                        setIsEditMode(false);
                        setEditedAttendee({...selectedAttendee});
                      }}
                      disabled={isLoading}
                    >
                      Cancel
                    </Button>
                    <Button 
                      onClick={handleSaveEdit}
                      disabled={isLoading}
                    >
                      {isLoading ? 'Saving...' : 'Save Changes'}
                    </Button>
                  </div>
                )}
              </div>
            )}
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
};

export default Admin;
