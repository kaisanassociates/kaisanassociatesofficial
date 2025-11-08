import type { VercelRequest, VercelResponse } from '@vercel/node';
import connectDB from '../src/lib/mongoose.js';
import mongoose from 'mongoose';

const volunteerSchema = new mongoose.Schema({
  fullName: String,
  age: Number,
  gender: { type: String, enum: ['Male','Female','Other'] },
  whatsappNumber: String,
  place: String,
  organization: String,
  isNilgiriStudent: Boolean,
  previousExperience: String,
  skills: String,
  contribution: String,
  preferredAreas: [String],
  preferredAreasOther: String,
  availableOnDec13: Boolean,
  availability: { type: String, enum: ['Full-time','Not available','Part-time'] },
  availabilityTime: String,
  motivation: String,
  agreesToConduct: Boolean,
  signature: String,
  date: String,
  status: { type: String, default: 'new' },
  deleted: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

const Volunteer = mongoose.models.Volunteer || mongoose.model('Volunteer', volunteerSchema);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.status(200).end();

  if (req.method !== 'GET') return res.status(405).json({ success:false, error:'Method not allowed' });

  try {
    const auth = req.headers['authorization'];
    if (auth !== 'Bearer admin123') {
      return res.status(401).json({ success:false, error:'Unauthorized' });
    }

    await connectDB();
    const docs = await Volunteer.find({ deleted: { $ne: true } }).sort({ createdAt: -1 }).lean();
    return res.status(200).json({ success:true, data: docs });
  } catch (e:any) {
    console.error('List volunteers error:', e);
    return res.status(500).json({ success:false, error:'Internal server error' });
  }
}
