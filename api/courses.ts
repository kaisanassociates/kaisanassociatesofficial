import type { VercelRequest, VercelResponse } from '@vercel/node';
import connectDB from '../src/lib/db.js';
import Course from '../src/lib/models/Course.js';

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

    if (req.method === 'GET') {
      const items = await Course.find().sort({ createdAt: -1 }).lean();
      return res.status(200).json({ success: true, data: items });
    }

    if (req.method === 'POST') {
      const { title, ...rest } = req.body || {};
      if (!title) return res.status(400).json({ success: false, error: 'Title is required' });
      const slug = createSlug(title);
      
      // Check for duplicate slug
      const existing = await Course.findOne({ slug });
      if (existing) {
        return res.status(400).json({ success: false, error: 'Course with this title already exists' });
      }

      const created = await Course.create({ title, slug, ...rest });
      return res.status(201).json({ success: true, data: created });
    }

    return res.status(405).json({ success: false, error: 'Method Not Allowed' });
  } catch (error: any) {
    console.error('Courses API error', error);
    return res.status(500).json({ success: false, error: error.message || 'Server Error' });
  }
}
