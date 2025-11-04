import type { VercelRequest, VercelResponse } from '@vercel/node';
import connectDB from '../../src/lib/mongoose.js';
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
  qrCode: String
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
    
    const { ticketId } = req.query;
    
    if (!ticketId || typeof ticketId !== 'string') {
      return res.status(400).json({
        success: false,
        error: 'Ticket ID is required'
      });
    }

    // Try to find by QR code or by ID
    const registration = await Registration.findOne({
      $or: [
        { qrCode: ticketId },
        { _id: ticketId }
      ]
    }).lean();

    if (!registration) {
      return res.status(404).json({
        success: false,
        error: 'Ticket not found'
      });
    }

    return res.status(200).json({
      success: true,
      data: {
        status: registration.attended ? 'attended' : 'confirmed',
        attendee: registration
      }
    });

  } catch (error) {
    console.error('Ticket status error:', error);
    return res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
}