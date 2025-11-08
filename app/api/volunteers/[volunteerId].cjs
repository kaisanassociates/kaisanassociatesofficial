const mongoose = require('mongoose');
const connectDB = require('../lib/mongoose.cjs');

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

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'PUT, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'PUT') return res.status(405).json({ success:false, error:'Method not allowed' });

  try {
    if (req.headers['authorization'] !== 'Bearer admin123') return res.status(401).json({ success:false, error:'Unauthorized' });
    await connectDB();

    const { volunteerId } = req.query || {};
    const body = req.body || {};

    if (body.action === 'delete') {
      const updated = await Volunteer.findByIdAndUpdate(volunteerId, { $set: { deleted: true } }, { new: true }).lean();
      return res.status(200).json({ success:true, data: updated });
    }

    const allowed = {};
    const fields = ['status','preferredAreas','preferredAreasOther','availability','availabilityTime'];
    for (const f of fields) if (f in body) allowed[f] = body[f];

    const updated = await Volunteer.findByIdAndUpdate(volunteerId, { $set: allowed }, { new: true }).lean();
    return res.status(200).json({ success:true, data: updated });
  } catch (e) {
    console.error('Update volunteer error:', e);
    return res.status(500).json({ success:false, error:'Internal server error' });
  }
};