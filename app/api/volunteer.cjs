const mongoose = require('mongoose');
const connectDB = require('./lib/mongoose.cjs');

const volunteerSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  age: { type: Number },
  gender: { type: String, enum: ['Male', 'Female', 'Other'] },
  whatsappNumber: { type: String },
  place: { type: String },
  organization: { type: String },
  isNilgiriStudent: { type: Boolean },
  previousExperience: { type: String },
  skills: { type: String },
  contribution: { type: String },
  preferredAreas: [String],
  preferredAreasOther: { type: String },
  availableOnDec13: { type: Boolean },
  availability: { type: String, enum: ['Full-time', 'Not available', 'Part-time'] },
  availabilityTime: { type: String },
  motivation: { type: String },
  agreesToConduct: { type: Boolean },
  signature: { type: String },
  date: { type: String },
  createdAt: { type: Date, default: Date.now }
});

const Volunteer = mongoose.models.Volunteer || mongoose.model('Volunteer', volunteerSchema);

module.exports = async function handler(req, res) {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.status(200).end();

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  try {
    await connectDB();
    const body = req.body || {};

    const errors = [];
    if (!body.fullName) errors.push('fullName is required');
    if (body.age && isNaN(Number(body.age))) errors.push('age must be a number');
    if (body.gender && !['Male','Female','Other'].includes(body.gender)) errors.push('gender invalid');
    if (body.availability && !['Full-time','Not available','Part-time'].includes(body.availability)) errors.push('availability invalid');
    if (body.agreesToConduct === false) errors.push('You must agree to the conduct policy');
    if (errors.length) return res.status(400).json({ success: false, error: errors.join(', ') });

    const yesNoToBool = (v) => v === true || v === 'Yes' || v === 'yes' || v === 'y';

    const doc = new Volunteer({
      fullName: String(body.fullName).trim(),
      age: body.age ? Number(body.age) : undefined,
      gender: body.gender || undefined,
      whatsappNumber: body.whatsappNumber || body.contactNumber || undefined,
      place: body.place || undefined,
      organization: body.organization || body.institution || undefined,
      isNilgiriStudent: body.isNilgiriStudent != null ? yesNoToBool(body.isNilgiriStudent) : (body.nilgiriStudent ? yesNoToBool(body.nilgiriStudent) : undefined),
      previousExperience: body.previousExperience || undefined,
      skills: body.skills || undefined,
      contribution: body.contribution || undefined,
      preferredAreas: Array.isArray(body.preferredAreas) ? body.preferredAreas : (body.preferredAreas ? [body.preferredAreas] : []),
      preferredAreasOther: body.preferredAreasOther || body.preferredOther || undefined,
      availableOnDec13: body.availableOnDec13 != null ? yesNoToBool(body.availableOnDec13) : undefined,
      availability: body.availability || undefined,
      availabilityTime: body.availabilityTime || (body.availability && body.availability.startsWith('Part-time') ? body.availability.split('Part-time')[1]?.trim() : undefined),
      motivation: body.motivation || undefined,
      agreesToConduct: body.agreesToConduct != null ? yesNoToBool(body.agreesToConduct) : undefined,
      signature: body.signature || undefined,
      date: body.date || undefined,
    });

    await doc.save();

    return res.status(201).json({
      success: true,
      message: 'Volunteer registration submitted successfully',
      data: {
        id: doc._id,
        _id: doc._id,
        fullName: doc.fullName,
        age: doc.age,
        gender: doc.gender,
        whatsappNumber: doc.whatsappNumber,
        place: doc.place,
        organization: doc.organization,
        isNilgiriStudent: doc.isNilgiriStudent,
        previousExperience: doc.previousExperience,
        skills: doc.skills,
        contribution: doc.contribution,
        preferredAreas: doc.preferredAreas,
        preferredAreasOther: doc.preferredAreasOther,
        availableOnDec13: doc.availableOnDec13,
        availability: doc.availability,
        availabilityTime: doc.availabilityTime,
        motivation: doc.motivation,
        agreesToConduct: doc.agreesToConduct,
        signature: doc.signature,
        date: doc.date,
        createdAt: doc.createdAt,
      }
    });
  } catch (error) {
    console.error('Volunteer register error:', error);
    return res.status(500).json({ success: false, error: 'Internal server error' });
  }
};
