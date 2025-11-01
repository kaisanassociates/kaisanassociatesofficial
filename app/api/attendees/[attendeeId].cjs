const mongoose = require('mongoose');
const connectDB = require('../lib/mongoose.cjs');

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

module.exports = async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    // Check for admin authorization
    const authHeader = req.headers.authorization;
    if (!authHeader || authHeader !== 'Bearer admin123') {
      return res.status(401).json({
        success: false,
        error: 'Unauthorized: Invalid admin credentials'
      });
    }

    await connectDB();
    
    // Try to get attendeeId from both query and params (for Express compatibility)
    const attendeeId = req.query.attendeeId || req.params?.attendeeId;
    
    console.log('========================================');
    console.log('Attendee handler - Method:', req.method);
    console.log('Attendee handler - URL:', req.url);
    console.log('Attendee handler - Query:', req.query);
    console.log('Attendee handler - Params:', req.params);
    console.log('Attendee handler - Body:', req.body);
    console.log('Attendee handler - attendeeId (extracted):', attendeeId);
    console.log('========================================');
    
    if (!attendeeId) {
      console.error('❌ Missing attendeeId!');
      console.error('Query:', JSON.stringify(req.query, null, 2));
      console.error('Params:', JSON.stringify(req.params, null, 2));
      console.error('Body:', JSON.stringify(req.body, null, 2));
      return res.status(400).json({
        success: false,
        error: 'Attendee ID is required'
      });
    }

    if (req.method === 'PUT') {
      // Update attendee status (check-in, payment, etc.)
      const { 
        attended, checkInTime, deleted, paymentStatus,
        name, fullName, email, phone, contactNumber,
        business, organization, designation, dateOfBirth,
        sectors, experience, achievements, futurePlan
      } = req.body;
      
      const updateData = {};
      if (attended !== undefined) updateData.attended = attended;
      if (checkInTime) updateData.checkInTime = new Date(checkInTime);
      if (deleted !== undefined) updateData.deleted = deleted;
      if (paymentStatus) updateData.paymentStatus = paymentStatus;
      
      // Personal and professional fields
      if (name) updateData.name = name;
      if (fullName) updateData.fullName = fullName;
      if (email) updateData.email = email;
      if (phone) updateData.phone = phone;
      if (contactNumber) updateData.contactNumber = contactNumber;
      if (business) updateData.business = business;
      if (organization) updateData.organization = organization;
      if (designation) updateData.designation = designation;
      if (dateOfBirth) updateData.dateOfBirth = dateOfBirth;
      if (sectors) updateData.sectors = sectors;
      if (experience) updateData.experience = experience;
      if (achievements) updateData.achievements = achievements;
      if (futurePlan) updateData.futurePlan = futurePlan;
      
      const updatedRegistration = await Registration.findByIdAndUpdate(
        attendeeId,
        updateData,
        { new: true }
      );
      
      if (!updatedRegistration) {
        return res.status(404).json({
          success: false,
          error: 'Attendee not found'
        });
      }
      
      return res.status(200).json({
        success: true,
        message: 'Attendee updated successfully',
        data: updatedRegistration
      });
      
    } else if (req.method === 'DELETE') {
      // Delete attendee
      const deletedRegistration = await Registration.findByIdAndDelete(attendeeId);
      
      if (!deletedRegistration) {
        return res.status(404).json({
          success: false,
          error: 'Attendee not found'
        });
      }
      
      return res.status(200).json({
        success: true,
        message: 'Attendee deleted successfully'
      });
      
    } else {
      return res.status(405).json({
        success: false,
        error: 'Method not allowed'
      });
    }

  } catch (error) {
    console.error('Attendee operation error:', error);
    return res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
}