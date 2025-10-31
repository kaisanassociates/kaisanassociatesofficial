import { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '@/lib/mongoose';

export interface RegistrationData {
  name: string;
  email: string;
  phone: string;
  organization?: string;
  ticketType: 'standard' | 'premium' | 'vip';
  paymentStatus: 'pending' | 'confirmed' | 'cancelled';
  registrationDate: string;
  id?: string;
  // Extended fields for detailed registration
  fullName?: string;
  contactNumber?: string;
  business?: string;
  sectors?: string[];
  sector?: string[];
  designation?: string;
  experience?: string;
  achievements?: string;
  futurePlan?: string;
  dateOfBirth?: string;
  linkedinProfile?: string;
  otherSector?: string;
  address?: string;
  city?: string;
  state?: string;
  pincode?: string;
  country?: string;
  website?: string;
  gstin?: string;
  pan?: string;
  referralCode?: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export async function handleRegistration(req: NextApiRequest, res: NextApiResponse<ApiResponse>) {
  if (req.method !== 'POST') {
    return res.status(405).json({ 
      success: false, 
      error: 'Method not allowed' 
    });
  }

  try {
    await connectDB();
    
    const body = req.body;
    const { name, email, phone, ticketType } = body;
    
    // Use extended fields if provided, otherwise fall back to basic ones
    const finalName = body.fullName || name;
    const finalPhone = body.contactNumber || phone;
    const finalOrganization = body.business || body.organization || '';
    
    // Validate required fields
    if (!finalName || !email || !finalPhone) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields'
      });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid email format'
      });
    }

    // Build registration data with extended fields
    const registrationData: RegistrationData = {
      name: finalName,
      email,
      phone: finalPhone,
      organization: finalOrganization,
      ticketType: ticketType || 'standard',
      paymentStatus: 'pending',
      registrationDate: new Date().toISOString(),
      // Extended fields
      fullName: body.fullName,
      contactNumber: body.contactNumber,
      business: body.business,
      sectors: body.sectors || body.sector,
      designation: body.designation,
      experience: body.experience,
      achievements: body.achievements,
      futurePlan: body.futurePlan,
      dateOfBirth: body.dateOfBirth,
      linkedinProfile: body.linkedinProfile,
      otherSector: body.otherSector,
      address: body.address,
      city: body.city,
      state: body.state,
      pincode: body.pincode,
      country: body.country,
      website: body.website,
      gstin: body.gstin,
      pan: body.pan,
      referralCode: body.referralCode
    };

    // Simulate successful registration
    return res.status(201).json({
      success: true,
      message: 'Registration successful! Welcome to Kaisan Network.',
      data: registrationData
    });

  } catch (error) {
    console.error('Registration error:', error);
    return res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
}

export async function handleGetRegistrations(req: NextApiRequest, res: NextApiResponse<ApiResponse>) {
  if (req.method !== 'GET') {
    return res.status(405).json({ 
      success: false, 
      error: 'Method not allowed' 
    });
  }

  try {
    await connectDB();
    
    // Here you would typically fetch registrations from database
    // with proper authentication and authorization
    
    const registrations: RegistrationData[] = [];
    
    return res.status(200).json({
      success: true,
      data: registrations,
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