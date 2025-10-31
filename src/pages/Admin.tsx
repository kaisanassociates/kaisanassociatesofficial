import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Search, Trash2, CheckCircle, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { apiService } from "@/lib/api";
import kaisanLogo from "@/assets/kaisan-logo.png";

const Admin = () => {
  const [attendees, setAttendees] = useState<any[]>([]);
  const [filteredAttendees, setFilteredAttendees] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [adminKey, setAdminKey] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleLogin = async () => {
    if (!adminKey.trim()) {
      toast({
        title: "Error",
        description: "Please enter admin key",
        variant: "destructive",
      });
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
          toast({
            title: "Success",
            description: "Admin access granted",
          });
        } else {
          throw new Error('Failed to fetch registrations');
        }
      } else {
        throw new Error('Invalid admin key');
      }
    } catch (error) {
      toast({
        title: "Authentication failed",
        description: "Invalid admin key",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
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
        // Update local state
        const updated = attendees.map((a) => 
          a._id === id ? { ...a, attended: !a.attended } : a
        );
        setAttendees(updated);
        setFilteredAttendees(updated);
        toast({
          title: "Success",
          description: `Attendance ${result.data.attended ? 'marked' : 'unmarked'} successfully`,
        });
      } else {
        throw new Error(result.error || 'Failed to update attendance');
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update attendance",
        variant: "destructive",
      });
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
        toast({
          title: "Success",
          description: "Attendee deleted successfully",
        });
      } else {
        throw new Error(result.error || 'Failed to delete attendee');
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete attendee",
        variant: "destructive",
      });
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
            <h1 className="text-3xl font-bold gradient-text">Admin Panel</h1>
            <p className="text-muted-foreground mt-2">Enter admin key to access</p>
          </div>
          <Input
            type="password"
            placeholder="Enter admin key"
            value={adminKey}
            onChange={(e) => setAdminKey(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            className="mb-4"
          />
          <Button onClick={handleLogin} className="w-full" disabled={isLoading}>
            {isLoading ? "Authenticating..." : "Login"}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-8">
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

          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search by name, email, or phone..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <div className="glass-panel overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted/50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Name</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Email</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Phone</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Status</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredAttendees.map((attendee) => (
                  <tr key={attendee._id} className="hover:bg-muted/30 transition-colors">
                    <td className="px-4 py-3">{attendee.name}</td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">{attendee.email}</td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">{attendee.phone}</td>
                    <td className="px-4 py-3">
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
                          variant="ghost"
                          size="sm"
                          onClick={() => handleToggleAttendance(attendee._id)}
                          className={attendee.attended ? "text-yellow-500 hover:text-yellow-600" : "text-green-500 hover:text-green-600"}
                        >
                          {attendee.attended ? <XCircle className="w-4 h-4" /> : <CheckCircle className="w-4 h-4" />}
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(attendee._id)}
                          className="text-destructive hover:text-destructive"
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
      </main>
    </div>
  );
};

export default Admin;
