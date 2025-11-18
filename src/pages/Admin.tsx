import { useEffect, useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import apiService from '@/lib/api';
import { Plus, Trash2, Pencil, RefreshCw } from 'lucide-react';
import { CourseEditor, CourseData } from '@/components/CourseEditor';

export default function Admin() {
  const [tab, setTab] = useState('registrations');

  // Registrations
  const [registrations, setRegistrations] = useState<any[]>([]);
  const [rQuery, setRQuery] = useState('');

  // Contacts
  const [contacts, setContacts] = useState<any[]>([]);
  const [cQuery, setCQuery] = useState('');

  // Courses
  const [courses, setCourses] = useState<CourseData[]>([]);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState<CourseData | null>(null);

  useEffect(() => {
    loadRegistrations();
    loadContacts();
    loadCourses();
  }, []);

  async function loadRegistrations() {
    const res = await apiService.getRegistrations();
    if (res.success) setRegistrations(res.data || []);
  }

  async function loadContacts() {
    const res = await apiService.getContacts();
    if (res.success) setContacts(res.data || []);
  }

  async function loadCourses() {
    const res = await apiService.getCourses();
    if (res.success) setCourses(res.data || []);
  }

  const handleSaveCourse = async (data: CourseData) => {
    let res;
    if (data._id) {
      res = await apiService.updateCourse(data._id, data);
    } else {
      res = await apiService.createCourse(data);
    }

    if (res.success) {
      await loadCourses();
      setIsEditorOpen(false);
      setEditingCourse(null);
    }
  };

  const handleDeleteCourse = async (id: string) => {
    if (confirm('Are you sure you want to delete this course?')) {
      const res = await apiService.deleteCourse(id);
      if (res.success) {
        setCourses(courses.filter(c => c._id !== id));
      }
    }
  };

  const openNewCourseEditor = () => {
    setEditingCourse(null);
    setIsEditorOpen(true);
  };

  const openEditCourseEditor = (course: CourseData) => {
    setEditingCourse(course);
    setIsEditorOpen(true);
  };

  const filteredRegistrations = useMemo(() => {
    if (!rQuery) return registrations;
    const q = rQuery.toLowerCase();
    return registrations.filter((r) =>
      [r.name, r.email, r.phone, r.organization].some((v: string) => v?.toLowerCase().includes(q))
    );
  }, [registrations, rQuery]);

  const filteredContacts = useMemo(() => {
    if (!cQuery) return contacts;
    const q = cQuery.toLowerCase();
    return contacts.filter((m) => [m.name, m.email, m.subject].some((v: string) => v?.toLowerCase().includes(q)));
  }, [contacts, cQuery]);

  return (
    <div className="min-h-screen bg-gray-50 py-10 font-sans">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <Badge className="bg-dubai-gold text-dubai-navy mb-2">ADMIN PORTAL</Badge>
            <h1 className="text-3xl font-bold text-dubai-navy">Dashboard</h1>
          </div>
          <Button variant="outline" onClick={() => window.location.reload()}>
            <RefreshCw className="w-4 h-4 mr-2" /> Refresh
          </Button>
        </div>

        <Card className="border-0 shadow-xl bg-white">
          <CardContent className="p-6">
            <Tabs value={tab} onValueChange={setTab}>
              <TabsList className="grid grid-cols-3 w-full mb-8 bg-gray-100 p-1 rounded-xl">
                <TabsTrigger value="registrations" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">Registrations</TabsTrigger>
                <TabsTrigger value="contacts" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">Messages</TabsTrigger>
                <TabsTrigger value="courses" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">Courses Management</TabsTrigger>
              </TabsList>

              {/* Registrations Tab */}
              <TabsContent value="registrations">
                <div className="flex items-center justify-between mb-6">
                  <Input 
                    value={rQuery} 
                    onChange={(e) => setRQuery(e.target.value)} 
                    placeholder="Search registrations..." 
                    className="max-w-sm" 
                  />
                  <Badge variant="secondary">{filteredRegistrations.length} Records</Badge>
                </div>
                <div className="rounded-xl border overflow-hidden">
                  <Table>
                    <TableHeader className="bg-gray-50">
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Contact</TableHead>
                        <TableHead>Organization</TableHead>
                        <TableHead>Date</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredRegistrations.map((r) => (
                        <TableRow key={r._id}>
                          <TableCell className="font-medium">{r.name}</TableCell>
                          <TableCell>
                            <div className="text-sm">{r.email}</div>
                            <div className="text-xs text-gray-500">{r.phone}</div>
                          </TableCell>
                          <TableCell>{r.organization || '-'}</TableCell>
                          <TableCell className="text-gray-500 text-sm">{new Date(r.createdAt).toLocaleDateString()}</TableCell>
                        </TableRow>
                      ))}
                      {filteredRegistrations.length === 0 && (
                        <TableRow>
                          <TableCell colSpan={4} className="text-center py-8 text-gray-500">No registrations found.</TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>

              {/* Contacts Tab */}
              <TabsContent value="contacts">
                <div className="flex items-center justify-between mb-6">
                  <Input 
                    value={cQuery} 
                    onChange={(e) => setCQuery(e.target.value)} 
                    placeholder="Search messages..." 
                    className="max-w-sm" 
                  />
                </div>
                <div className="rounded-xl border overflow-hidden">
                  <Table>
                    <TableHeader className="bg-gray-50">
                      <TableRow>
                        <TableHead>Sender</TableHead>
                        <TableHead>Subject</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredContacts.map((m) => (
                        <TableRow key={m._id}>
                          <TableCell>
                            <div className="font-medium">{m.name}</div>
                            <div className="text-xs text-gray-500">{m.email}</div>
                          </TableCell>
                          <TableCell className="max-w-md truncate">{m.subject}</TableCell>
                          <TableCell className="text-gray-500 text-sm">{new Date(m.createdAt).toLocaleDateString()}</TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-700 hover:bg-red-50" onClick={() => deleteContact(m._id)}>
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                      {filteredContacts.length === 0 && (
                        <TableRow>
                          <TableCell colSpan={4} className="text-center py-8 text-gray-500">No messages found.</TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>

              {/* Courses Tab */}
              <TabsContent value="courses">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-bold text-gray-700">All Programs</h3>
                  <Button onClick={openNewCourseEditor} className="bg-dubai-navy text-white hover:bg-dubai-navy/90">
                    <Plus className="w-4 h-4 mr-2" /> Add New Course
                  </Button>
                </div>

                <div className="grid gap-4">
                  {courses.map((course) => (
                    <div key={course._id} className="flex items-center justify-between p-4 bg-white border rounded-xl shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-lg bg-gray-100 overflow-hidden">
                          {course.heroImage ? (
                            <img src={course.heroImage} alt="" className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">Img</div>
                          )}
                        </div>
                        <div>
                          <h4 className="font-bold text-dubai-navy">{course.title}</h4>
                          <div className="flex items-center gap-2 text-sm text-gray-500">
                            <Badge variant="outline" className="text-xs">{course.category}</Badge>
                            <span>{course.duration}</span>
                            <span className="text-gray-300">•</span>
                            <span className={course.status === 'published' ? 'text-green-600 font-medium' : 'text-amber-600 font-medium'}>
                              {course.status === 'published' ? 'Published' : 'Draft'}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" onClick={() => openEditCourseEditor(course)}>
                          <Pencil className="w-4 h-4 mr-2" /> Edit
                        </Button>
                        <Button variant="ghost" size="icon" className="text-red-500 hover:bg-red-50" onClick={() => handleDeleteCourse(course._id!)}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                  
                  {courses.length === 0 && (
                    <div className="text-center py-12 bg-gray-50 rounded-xl border border-dashed">
                      <p className="text-gray-500">No courses available. Create your first one!</p>
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Course Editor Sheet */}
        <Sheet open={isEditorOpen} onOpenChange={setIsEditorOpen}>
          <SheetContent side="right" className="w-full sm:max-w-2xl p-0 overflow-hidden">
            <CourseEditor 
              initialData={editingCourse} 
              onSave={handleSaveCourse} 
              onCancel={() => setIsEditorOpen(false)} 
            />
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}
