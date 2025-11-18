import type { VercelRequest, VercelResponse } from '@vercel/node';
import connectDB from '../src/lib/db';
import ContactMessage from '../src/lib/models/ContactMessage';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    await connectDB();

    if (req.method === 'GET') {
      const { q } = req.query as { q?: string };
      const filter = q
        ? { $or: [
            { name: { $regex: q, $options: 'i' } },
            { email: { $regex: q, $options: 'i' } },
            { subject: { $regex: q, $options: 'i' } },
          ] }
        : {};
      const items = await ContactMessage.find(filter).sort({ createdAt: -1 }).lean();
      return res.status(200).json({ success: true, data: items });
    }

    if (req.method === 'DELETE') {
      const { id } = req.query as { id?: string };
      if (!id) return res.status(400).json({ success: false, error: 'Missing id' });
      await ContactMessage.findByIdAndDelete(id);
      return res.status(200).json({ success: true });
    }

    return res.status(405).json({ success: false, error: 'Method Not Allowed' });
  } catch (error: any) {
    console.error('Contacts API error', error);
    return res.status(500).json({ success: false, error: error.message || 'Server Error' });
  }
}
