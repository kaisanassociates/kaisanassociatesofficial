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
    
    const { attendeeId } = req.query;
    const { action } = req.body;
    
    if (!attendeeId || typeof attendeeId !== 'string') {
      return res.status(400).json({
        success: false,
        error: 'Attendee ID is required'
      });
    }

    // Get admin token from request headers for authentication
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({
        success: false,
        error: 'Authentication required'
      });
    }

    // In a real implementation, verify the admin token
    // For now, we'll accept any token for development

    const registration = await Registration.findById(attendeeId);
    
    if (!registration) {
      return res.status(404).json({
        success: false,
        error: 'Attendee not found'
      });
    }

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