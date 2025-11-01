import type { VercelRequest, VercelResponse } from '@vercel/node';
import connectDB from '../../src/lib/mongoose';
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
  deleted: { type: Boolean, default: false },
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

  if (req.method !== 'PUT') {
    return res.status(405).json({ 
      success: false, 
      error: 'Method not allowed' 
    });
  }

  try {
    await connectDB();
    
    // Try to get attendeeId from both query and params (for compatibility)
    const attendeeId = (req.query.attendeeId || (req as any).params?.attendeeId) as string;
    const { 
      action, attended, checkInTime, deleted, paymentStatus,
      name, fullName, email, phone, contactNumber,
      business, organization, designation, dateOfBirth,
      sectors, experience, achievements, futurePlan
    } = req.body;
    
    if (!attendeeId || typeof attendeeId !== 'string') {
      return res.status(400).json({
        success: false,
        error: 'Attendee ID is required'
      });
    }

    // Get admin token from request headers for authentication
    const authHeader = req.headers.authorization;
    if (!authHeader || authHeader !== 'Bearer admin123') {
      return res.status(401).json({
        success: false,
        error: 'Unauthorized: Invalid admin credentials'
      });
    }

    const registration = await Registration.findById(attendeeId);
    
    if (!registration) {
      return res.status(404).json({
        success: false,
        error: 'Attendee not found'
      });
    }

    // Handle different update operations
    if (action === 'toggle_attendance') {
      registration.attended = !registration.attended;
      if (registration.attended) {
        registration.checkInTime = new Date();
      } else {
        registration.checkInTime = undefined;
      }
    } else if (action === 'delete') {
      await Registration.findByIdAndDelete(attendeeId);
      return res.status(200).json({
        success: true,
        message: 'Attendee deleted successfully'
      });
    } else {
      // Direct field updates
      if (attended !== undefined) registration.attended = attended;
      if (checkInTime) registration.checkInTime = new Date(checkInTime);
      if (deleted !== undefined) registration.deleted = deleted;
      if (paymentStatus) registration.paymentStatus = paymentStatus;
      
      // Personal and professional fields
      if (name) registration.name = name;
      if (fullName) registration.fullName = fullName;
      if (email) registration.email = email;
      if (phone) registration.phone = phone;
      if (contactNumber) registration.contactNumber = contactNumber;
      if (business) registration.business = business;
      if (organization) registration.organization = organization;
      if (designation) registration.designation = designation;
      if (dateOfBirth) registration.dateOfBirth = dateOfBirth;
      if (sectors) registration.sectors = sectors;
      if (experience) registration.experience = experience;
      if (achievements) registration.achievements = achievements;
      if (futurePlan) registration.futurePlan = futurePlan;
    }

    await registration.save();

    return res.status(200).json({
      success: true,
      message: 'Attendee updated successfully',
      data: registration
    });
        message: 'Attendee deleted successfully'
      });
    } else {
      return res.status(400).json({
        success: false,
        error: 'Invalid action'
      });
    }

    await registration.save();

    return res.status(200).json({
      success: true,
      message: 'Attendee updated successfully',
      data: registration
    });

  } catch (error) {
    console.error('Update attendee error:', error);
    return res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
}