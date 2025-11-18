import type { VercelRequest, VercelResponse } from '@vercel/node';
import connectDB from '../src/lib/db';
import Registration from '../src/lib/models/Registration';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    await connectDB();

    if (req.method === 'GET') {
      const { q } = req.query as { q?: string };
      const filter = q
        ? { $or: [
            { name: { $regex: q, $options: 'i' } },
            { email: { $regex: q, $options: 'i' } },
            { phone: { $regex: q, $options: 'i' } },
          ] }
        : {};
      const items = await Registration.find(filter).sort({ createdAt: -1 }).lean();
      return res.status(200).json({ success: true, data: items });
    }

    return res.status(405).json({ success: false, error: 'Method Not Allowed' });
  } catch (error: any) {
    console.error('Registrations API error', error);
    return res.status(500).json({ success: false, error: error.message || 'Server Error' });
  }
}
