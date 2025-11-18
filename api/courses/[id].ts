import type { VercelRequest, VercelResponse } from '@vercel/node';
import connectDB from '../../src/lib/db';
import Course from '../../src/lib/models/Course';

function createSlug(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')     // Replace spaces with -
    .replace(/[^\w\-]+/g, '') // Remove all non-word chars
    .replace(/\-\-+/g, '-');  // Replace multiple - with single -
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    await connectDB();
    const { id } = req.query as { id: string };

    if (!id) return res.status(400).json({ success: false, error: 'Missing id' });

    if (req.method === 'PUT') {
      const { title, ...rest } = req.body || {};
      const update: any = { ...rest };
      if (title) {
        update.title = title;
        update.slug = createSlug(title);
      }
      const saved = await Course.findByIdAndUpdate(id, update, { new: true });
      return res.status(200).json({ success: true, data: saved });
    }

    if (req.method === 'DELETE') {
      await Course.findByIdAndDelete(id);
      return res.status(200).json({ success: true });
    }

    return res.status(405).json({ success: false, error: 'Method Not Allowed' });
  } catch (error: any) {
    console.error('Course by id API error', error);
    return res.status(500).json({ success: false, error: error.message || 'Server Error' });
  }
}
