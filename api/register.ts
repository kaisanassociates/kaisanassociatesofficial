import type { VercelRequest, VercelResponse } from '@vercel/node';
import connectDB from '../src/lib/db.js';
import Registration from '../src/lib/models/Registration.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    if (req.method !== 'POST') {
      return res.status(405).json({ success: false, error: 'Method Not Allowed' });
    }

    await connectDB();

    const { name, email, phone, organization, ticketType } = req.body || {};
    if (!name || !email) {
      return res.status(400).json({ success: false, error: 'Name and email are required' });
    }

    const created = await Registration.create({ name, email, phone, organization, ticketType });
    return res.status(201).json({ success: true, data: created });
  } catch (error: any) {
    console.error('Register API error', error);
    return res.status(500).json({ success: false, error: error.message || 'Server Error' });
  }
}
