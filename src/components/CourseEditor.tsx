import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Trash2, X, Save, Loader2 } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

// Define the full Course type based on the Mongoose schema
export type CourseData = {
  _id?: string;
  title: string;
  slug?: string;
  category: string;
  level: string;
  duration: string;
  format: string;
  location: string;
  startDate?: string;
  price: number;
  shortDescription: string;
  fullDescription: string;
  heroImage: string;
  brochureLink?: string;
  features: { icon: string; title: string; description: string }[];
  modules: { title: string; duration: string; content: string[] }[];
  mentors: { name: string; role: string; image: string; bio: string }[];
  gallery: string[];
  benefits: string[];
  targetAudience: string[];
  status: "draft" | "published" | "archived";
};

const defaultCourse: CourseData = {
  title: "",
  category: "",
  level: "Beginner",
  duration: "",
  format: "Online",
  location: "",
  price: 0,
  shortDescription: "",
  fullDescription: "",
  heroImage: "",
  features: [],
  modules: [],
  mentors: [],
  gallery: [],
  benefits: [],
  targetAudience: [],
  status: "draft",
};

interface CourseEditorProps {
  initialData?: CourseData | null;
  onSave: (data: CourseData) => Promise<void>;
  onCancel: () => void;
}

export function CourseEditor({ initialData, onSave, onCancel }: CourseEditorProps) {
  const [formData, setFormData] = useState<CourseData>(defaultCourse);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState("basic");

  useEffect(() => {
    if (initialData) {
      setFormData({ ...defaultCourse, ...initialData });
    } else {
      setFormData(defaultCourse);
    }
  }, [initialData]);

  const handleChange = (field: keyof CourseData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleArrayChange = (
    field: "features" | "modules" | "mentors",
    index: number,
    subField: string,
    value: any
  ) => {
    setFormData((prev) => {
      const newArray = [...prev[field]] as any[];
      newArray[index] = { ...newArray[index], [subField]: value };
      return { ...prev, [field]: newArray };
    });
  };

  const handleSimpleArrayChange = (
    field: "gallery" | "benefits" | "targetAudience",
    index: number,
    value: string
  ) => {
    setFormData((prev) => {
      const newArray = [...prev[field]];
      newArray[index] = value;
      return { ...prev, [field]: newArray };
    });
  };

  const addArrayItem = (field: keyof CourseData, item: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: [...(prev[field] as any[]), item],
    }));
  };

  const removeArrayItem = (field: keyof CourseData, index: number) => {
    setFormData((prev) => ({
      ...prev,
      [field]: (prev[field] as any[]).filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async () => {
    try {
      setSaving(true);
      await onSave(formData);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="h-full flex flex-col bg-white">
      <div className="flex items-center justify-between p-4 border-b">
        <h2 className="text-xl font-bold">
          {initialData ? "Edit Course" : "Create New Course"}
        </h2>
        <div className="flex gap-2">
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={saving}>
            {saving && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
            Save Course
          </Button>
        </div>
      </div>

      <ScrollArea className="flex-1 p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid grid-cols-5 w-full">
            <TabsTrigger value="basic">Basic Info</TabsTrigger>
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
            <TabsTrigger value="people">People</TabsTrigger>
            <TabsTrigger value="media">Media & Extra</TabsTrigger>
          </TabsList>

          {/* Basic Info Tab */}
          <TabsContent value="basic" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Core Information</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <Label>Course Title</Label>
                  <Input
                    value={formData.title}
                    onChange={(e) => handleChange("title", e.target.value)}
                    placeholder="e.g. Executive Business Management"
                  />
                </div>
                <div>
                  <Label>Slug (URL)</Label>
                  <Input
                    value={formData.slug || ""}
                    onChange={(e) => handleChange("slug", e.target.value)}
                    placeholder="auto-generated-if-empty"
                  />
                </div>
                <div>
                  <Label>Category</Label>
                  <Input
                    value={formData.category}
                    onChange={(e) => handleChange("category", e.target.value)}
                    placeholder="e.g. Business, Tech, Design"
                  />
                </div>
                <div>
                  <Label>Level</Label>
                  <Select
                    value={formData.level}
                    onValueChange={(v) => handleChange("level", v)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Beginner">Beginner</SelectItem>
                      <SelectItem value="Intermediate">Intermediate</SelectItem>
                      <SelectItem value="Advanced">Advanced</SelectItem>
                      <SelectItem value="Executive">Executive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Status</Label>
                  <Select
                    value={formData.status}
                    onValueChange={(v) => handleChange("status", v)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="published">Published</SelectItem>
                      <SelectItem value="archived">Archived</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Price (USD)</Label>
                  <Input
                    type="number"
                    value={formData.price}
                    onChange={(e) => handleChange("price", Number(e.target.value))}
                  />
                </div>
                <div>
                  <Label>Start Date</Label>
                  <Input
                    type="date"
                    value={formData.startDate ? new Date(formData.startDate).toISOString().split('T')[0] : ""}
                    onChange={(e) => handleChange("startDate", e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Details Tab */}
          <TabsContent value="details" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Logistics & Description</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label>Duration</Label>
                    <Input
                      value={formData.duration}
                      onChange={(e) => handleChange("duration", e.target.value)}
                      placeholder="e.g. 12 Weeks"
                    />
                  </div>
                  <div>
                    <Label>Format</Label>
                    <Select
                      value={formData.format}
                      onValueChange={(v) => handleChange("format", v)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Online">Online</SelectItem>
                        <SelectItem value="Offline">Offline</SelectItem>
                        <SelectItem value="Hybrid">Hybrid</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Location</Label>
                    <Input
                      value={formData.location}
                      onChange={(e) => handleChange("location", e.target.value)}
                      placeholder="e.g. Dubai, UAE or Zoom"
                    />
                  </div>
                </div>
                <div>
                  <Label>Short Description (Card View)</Label>
                  <Textarea
                    value={formData.shortDescription}
                    onChange={(e) => handleChange("shortDescription", e.target.value)}
                    rows={3}
                  />
                </div>
                <div>
                  <Label>Full Description (Detail Page)</Label>
                  <Textarea
                    value={formData.fullDescription}
                    onChange={(e) => handleChange("fullDescription", e.target.value)}
                    rows={6}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Key Features</CardTitle>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() =>
                      addArrayItem("features", { icon: "Star", title: "", description: "" })
                    }
                  >
                    <Plus className="w-4 h-4 mr-2" /> Add Feature
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {formData.features.map((feature, idx) => (
                  <div key={idx} className="flex gap-4 items-start border p-4 rounded-lg">
                    <div className="grid gap-2 flex-1">
                      <Input
                        placeholder="Icon Name (e.g. Star, Users)"
                        value={feature.icon}
                        onChange={(e) =>
                          handleArrayChange("features", idx, "icon", e.target.value)
                        }
                      />
                      <Input
                        placeholder="Feature Title"
                        value={feature.title}
                        onChange={(e) =>
                          handleArrayChange("features", idx, "title", e.target.value)
                        }
                      />
                      <Textarea
                        placeholder="Feature Description"
                        value={feature.description}
                        onChange={(e) =>
                          handleArrayChange("features", idx, "description", e.target.value)
                        }
                      />
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeArrayItem("features", idx)}
                    >
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Curriculum Tab */}
          <TabsContent value="curriculum" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Modules</CardTitle>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() =>
                      addArrayItem("modules", { title: "", duration: "", content: [] })
                    }
                  >
                    <Plus className="w-4 h-4 mr-2" /> Add Module
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {formData.modules.map((module, idx) => (
                  <div key={idx} className="border p-4 rounded-lg space-y-3">
                    <div className="flex justify-between items-start">
                      <h4 className="font-bold">Module {idx + 1}</h4>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeArrayItem("modules", idx)}
                      >
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </Button>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <Input
                        placeholder="Module Title"
                        value={module.title}
                        onChange={(e) =>
                          handleArrayChange("modules", idx, "title", e.target.value)
                        }
                      />
                      <Input
                        placeholder="Duration (e.g. 2 Weeks)"
                        value={module.duration}
                        onChange={(e) =>
                          handleArrayChange("modules", idx, "duration", e.target.value)
                        }
                      />
                    </div>
                    <div>
                      <Label>Topics (comma separated)</Label>
                      <Textarea
                        placeholder="Topic 1, Topic 2, Topic 3"
                        value={module.content.join(", ")}
                        onChange={(e) =>
                          handleArrayChange(
                            "modules",
                            idx,
                            "content",
                            e.target.value.split(",").map((s) => s.trim())
                          )
                        }
                      />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* People Tab */}
          <TabsContent value="people" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Mentors & Instructors</CardTitle>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() =>
                      addArrayItem("mentors", { name: "", role: "", image: "", bio: "" })
                    }
                  >
                    <Plus className="w-4 h-4 mr-2" /> Add Mentor
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {formData.mentors.map((mentor, idx) => (
                  <div key={idx} className="border p-4 rounded-lg flex gap-4">
                    <div className="grid gap-2 flex-1">
                      <div className="grid grid-cols-2 gap-2">
                        <Input
                          placeholder="Name"
                          value={mentor.name}
                          onChange={(e) =>
                            handleArrayChange("mentors", idx, "name", e.target.value)
                          }
                        />
                        <Input
                          placeholder="Role"
                          value={mentor.role}
                          onChange={(e) =>
                            handleArrayChange("mentors", idx, "role", e.target.value)
                          }
                        />
                      </div>
                      <Input
                        placeholder="Image URL"
                        value={mentor.image}
                        onChange={(e) =>
                          handleArrayChange("mentors", idx, "image", e.target.value)
                        }
                      />
                      <Textarea
                        placeholder="Bio"
                        value={mentor.bio}
                        onChange={(e) =>
                          handleArrayChange("mentors", idx, "bio", e.target.value)
                        }
                      />
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeArrayItem("mentors", idx)}
                    >
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Media & Extra Tab */}
          <TabsContent value="media" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Media & Links</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Hero Image URL</Label>
                  <Input
                    value={formData.heroImage}
                    onChange={(e) => handleChange("heroImage", e.target.value)}
                    placeholder="https://..."
                  />
                </div>
                <div>
                  <Label>Brochure PDF Link</Label>
                  <Input
                    value={formData.brochureLink || ""}
                    onChange={(e) => handleChange("brochureLink", e.target.value)}
                    placeholder="https://..."
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Target Audience</CardTitle>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => addArrayItem("targetAudience", "")}
                  >
                    <Plus className="w-4 h-4 mr-2" /> Add Item
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                {formData.targetAudience.map((item, idx) => (
                  <div key={idx} className="flex gap-2">
                    <Input
                      value={item}
                      onChange={(e) =>
                        handleSimpleArrayChange("targetAudience", idx, e.target.value)
                      }
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeArrayItem("targetAudience", idx)}
                    >
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Benefits</CardTitle>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => addArrayItem("benefits", "")}
                  >
                    <Plus className="w-4 h-4 mr-2" /> Add Item
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                {formData.benefits.map((item, idx) => (
                  <div key={idx} className="flex gap-2">
                    <Input
                      value={item}
                      onChange={(e) =>
                        handleSimpleArrayChange("benefits", idx, e.target.value)
                      }
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeArrayItem("benefits", idx)}
                    >
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </ScrollArea>
    </div>
  );
}
