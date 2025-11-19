import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Load environment variables
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, '../.env') });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('❌ MONGODB_URI is not defined in .env file');
  process.exit(1);
}

// Define Schema inline to avoid TS compilation issues
const FeatureSchema = new mongoose.Schema({
  icon: String,
  title: String,
  description: String
});

const MentorSchema = new mongoose.Schema({
  name: String,
  role: String,
  image: String,
  bio: String,
  initials: String
});

const ModuleSchema = new mongoose.Schema({
  title: String,
  duration: String,
  content: [String]
});

const CourseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    category: String,
    level: String,
    shortDescription: String,
    fullDescription: String,
    heroImage: String,
    duration: String,
    format: String,
    location: String,
    startDate: String,
    price: { type: Number, default: 0 },
    status: { type: String, enum: ['draft', 'published', 'archived'], default: 'draft' },
    features: [FeatureSchema],
    modules: [ModuleSchema],
    mentors: [MentorSchema],
    gallery: [String],
    benefits: [String],
    targetAudience: [String],
    brochureLink: String
  },
  { timestamps: true }
);

const Course = mongoose.models.Course || mongoose.model('Course', CourseSchema);

const courses = [
  {
    title: "Executive Business Management Programme",
    slug: "executive-business-management",
    category: "Signature Program",
    level: "Executive",
    duration: "12 Months",
    format: "Hybrid",
    location: "Dubai & Online",
    startDate: "2026-01-15",
    price: 5000,
    status: "published",
    shortDescription: "Invest in Yourself, Invest in Your Future, Become an Expert. A comprehensive 12-month hybrid program.",
    fullDescription: "<p>A comprehensive 12-month hybrid program providing senior professionals and entrepreneurs with cutting-edge business management strategies and leadership acumen. Led by Dr. Rashid Gazzali with 15+ years of experience as a global business coach.</p><p>This program is designed to transform your leadership style and business approach through a blend of theoretical knowledge and practical application.</p>",
    heroImage: "/images/executive-business-management-brochure.jpg",
    features: [
      { icon: "Calendar", title: "Quarterly Workshops", description: "2-day intensive offline sessions covering core business modules" },
      { icon: "Users", title: "Weekly Support", description: "1-hour virtual sessions with Dr. Gazzali and senior coaches" },
      { icon: "Award", title: "One-on-One Mentorship", description: "Personalized quarterly counseling sessions" },
      { icon: "Trophy", title: "Capstone Project", description: "Solve real-world business challenges" }
    ],
    modules: [
      { title: "Financial Management", duration: "4 Weeks", content: ["Financial Planning", "Budgeting", "Investment Strategies"] },
      { title: "Marketing Management", duration: "4 Weeks", content: ["Digital Marketing", "Brand Building", "Market Research"] },
      { title: "Human Resource Management", duration: "4 Weeks", content: ["Talent Acquisition", "Performance Management", "Organizational Culture"] },
      { title: "Strategic Management", duration: "4 Weeks", content: ["Business Strategy", "Competitive Analysis", "Growth Scaling"] }
    ],
    mentors: [
      { name: "Dr. Rashid Gazzali", role: "Programme Director", image: "/images/dr-rashid-formal.jpeg", bio: "Life Coach | International Trainer" },
      { name: "Prof. Arvinder S. Chawla", role: "Mentor", initials: "AC", bio: "Former Vice Chancellor, Lamrin Tech Skills University" },
      { name: "Dr. Saji Gopinath", role: "Mentor", initials: "SG", bio: "Former Vice Chancellor, Kerala University of Digital Sciences" }
    ],
    benefits: [
      "Campus Immersion (3 days at Nilgiri College)",
      "Industry Guest Lectures",
      "Exclusive Networking Events",
      "Accredited Certification"
    ],
    targetAudience: [
      "Mid to senior-level professionals",
      "Entrepreneurs scaling businesses",
      "Aspiring leaders"
    ]
  },
  {
    title: "Influencia Edition 2",
    slug: "influencia-edition-2",
    category: "Workshop",
    level: "All Levels",
    duration: "7 Hours",
    format: "In-Person",
    location: "Dubai, UAE",
    startDate: "2025-12-20",
    price: 150,
    status: "published",
    shortDescription: "Programming Workshop to Elevate Personal Life, Maintain Relationships, and Achieve Professional Excellence.",
    fullDescription: "<p>Influencia is a transformative 7-hour intensive workshop designed to help you master self-awareness, emotional intelligence, and personal growth strategies. Join over 250 change-makers in this journey to excellence.</p>",
    heroImage: "/images/influencia-poster.jpg",
    features: [
      { icon: "Clock", title: "7 Hours Intensive", description: "Packed with actionable insights" },
      { icon: "Users", title: "Networking", description: "Connect with 250+ change makers" },
      { icon: "Star", title: "3 Core Pillars", description: "Personal, Relational, Professional" }
    ],
    modules: [
      { title: "Elevate Personal Life", duration: "2 Hours", content: ["Self-awareness", "Emotional Intelligence", "Personal Growth"] },
      { title: "Maintain Relationships", duration: "2 Hours", content: ["Communication Skills", "Conflict Resolution", "Building Connections"] },
      { title: "Achieve Professional Excellence", duration: "3 Hours", content: ["Career Advancement", "Leadership Principles", "Performance Optimization"] }
    ],
    mentors: [
      { name: "Dr. Rashid Gazzali", role: "Lead Trainer", image: "/images/dr-rashid-formal.jpeg", bio: "International Trainer & Life Coach" }
    ],
    benefits: [
      "Clarity in personal and professional goals",
      "Enhanced emotional intelligence",
      "Powerful communication frameworks",
      "Networking with like-minded individuals"
    ],
    targetAudience: [
      "Individuals seeking personal growth",
      "Professionals wanting to improve soft skills",
      "Anyone looking to build better relationships"
    ]
  },
  {
    title: "PRP Training",
    slug: "prp-training",
    category: "Professional Development",
    level: "Entry to Mid-Level",
    duration: "16 Weeks",
    format: "Hybrid Learning",
    location: "Online & Offline",
    startDate: "2025-11-01",
    price: 1200,
    status: "published",
    shortDescription: "Comprehensive Professional Development for Career Advancement. Bridging the gap between academic knowledge and real-world application.",
    fullDescription: "<p>The Professional Readiness Programme (PRP) is designed to bridge the gap between academic knowledge and real-world application. It covers critical professional skills including communication, presentation, and technical competencies.</p>",
    heroImage: "/images/PRP_BROUCHURE.jpeg",
    features: [
      { icon: "GraduationCap", title: "Skill Enhancement", description: "Master critical professional skills" },
      { icon: "Trophy", title: "Industry Recognition", description: "Earn certifications and credentials" },
      { icon: "BookOpen", title: "Practical Application", description: "Work on real projects and case studies" }
    ],
    modules: [
      { title: "Phase 1: Foundation Building", duration: "4 Weeks", content: ["Core Professional Skills", "Workplace Fundamentals"] },
      { title: "Phase 2: Specialized Training", duration: "6 Weeks", content: ["Industry-specific Knowledge", "Advanced Techniques"] },
      { title: "Phase 3: Practical Implementation", duration: "4 Weeks", content: ["Real-world Projects", "Case Studies"] },
      { title: "Phase 4: Assessment & Certification", duration: "2 Weeks", content: ["Final Evaluation", "Portfolio Presentation"] }
    ],
    mentors: [],
    benefits: [
      "Industry-recognized certification",
      "Portfolio development",
      "Career counseling",
      "Job placement assistance"
    ],
    targetAudience: [
      "Recent graduates",
      "Early-career professionals",
      "Career changers"
    ]
  }
];

async function seed() {
  try {
    console.log('🌱 Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected');

    console.log('🧹 Clearing existing courses...');
    await Course.deleteMany({});
    console.log('✅ Cleared');

    console.log('📝 Inserting new courses...');
    const created = await Course.create(courses);
    console.log(`✅ Successfully created ${created.length} courses`);

    console.log('👋 Disconnecting...');
    await mongoose.disconnect();
    console.log('✅ Done');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seed error:', error);
    process.exit(1);
  }
}

seed();
