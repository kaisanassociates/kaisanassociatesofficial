import type { VercelRequest, VercelResponse } from '@vercel/node';
import connectDB from '../src/lib/db.js';
import ContactMessage from '../src/lib/models/ContactMessage.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    if (req.method !== 'POST') {
      return res.status(405).json({ success: false, error: 'Method Not Allowed' });
    }

    await connectDB();

    const { name, email, phone, company, subject, message } = req.body || {};
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ success: false, error: 'Missing required fields' });
    }

    const created = await ContactMessage.create({ name, email, phone, company, subject, message });
    return res.status(201).json({ success: true, data: created });
  } catch (error: any) {
    console.error('Contact API error', error);
    return res.status(500).json({ success: false, error: error.message || 'Server Error' });
  }
}
