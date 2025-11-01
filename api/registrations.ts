import type { VercelRequest, VercelResponse } from '@vercel/node';
import connectDB from '../src/lib/mongoose';
import mongoose from 'mongoose';

const registrationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  organization: String,
  ticketType: { type: String, enum: ['standard', 'premium', 'vip'], default: 'standard' },
  paymentStatus: { type: String, enum: ['pending', 'confirmed', 'cancelled'], default: 'pending' },
  registrationDate: { type: Date, default: Date.now },
  attended: { type: Boolean, default: false },
  checkInTime: Date,
  // Extended fields
  fullName: String,
  contactNumber: String,
  business: String,
  sectors: [String],
  designation: String,
  experience: String,
  achievements: String,
  futurePlan: String,
  dateOfBirth: String,
  linkedinProfile: String,
  otherSector: String,
  address: String,
  city: String,
  state: String,
  pincode: String,
  country: String,
  website: String,
  gstin: String,
  pan: String,
  referralCode: String,
  qrCode: String,
  deleted: { type: Boolean, default: false }
});

const Registration = mongoose.models.Registration || mongoose.model('Registration', registrationSchema);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ 
      success: false, 
      error: 'Method not allowed' 
    });
  }

  try {
    await connectDB();
    
    // Get admin token from request headers for authentication
    const authHeader = req.headers.authorization;
    if (!authHeader || authHeader !== 'Bearer admin123') {
      return res.status(401).json({
        success: false,
        error: 'Unauthorized: Invalid admin credentials'
      });
    }

    const registrations = await Registration.find({ deleted: { $ne: true } })
      .sort({ registrationDate: -1 })
      .lean();

    // Convert _id to string to ensure proper serialization
    const formattedRegistrations = registrations.map((reg: any) => ({
      ...reg,
      _id: reg._id.toString(),
      id: reg._id.toString()
    }));

    return res.status(200).json({
      success: true,
      data: formattedRegistrations,
      message: 'Registrations retrieved successfully'
    });

  } catch (error) {
    console.error('Get registrations error:', error);
    return res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
}
