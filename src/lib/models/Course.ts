import mongoose, { Schema, model, models } from 'mongoose';

const FeatureSchema = new Schema({
  icon: { type: String }, // Lucide icon name
  title: { type: String },
  description: { type: String }
});

const MentorSchema = new Schema({
  name: { type: String },
  role: { type: String },
  image: { type: String },
  bio: { type: String },
  initials: { type: String }
});

const ModuleSchema = new Schema({
  title: { type: String },
  duration: { type: String },
  content: [String]
});

const CourseSchema = new Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    category: { type: String },
    level: { type: String },
    shortDescription: { type: String },
    fullDescription: { type: String },
    heroImage: { type: String },
    duration: { type: String },
    format: { type: String },
    location: { type: String },
    startDate: { type: String },
    price: { type: Number, default: 0 },
    status: { type: String, enum: ['draft', 'published', 'archived'], default: 'draft' },
    features: [FeatureSchema],
    modules: [ModuleSchema],
    mentors: [MentorSchema],
    gallery: [String],
    benefits: [String],
    targetAudience: [String],
    brochureLink: { type: String }
  },
  { timestamps: true }
);

export type CourseDoc = mongoose.InferSchemaType<typeof CourseSchema> & { _id: string };

export default models.Course || model('Course', CourseSchema);
