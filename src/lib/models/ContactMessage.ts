import mongoose, { Schema, model, models } from 'mongoose';

const ContactMessageSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    company: { type: String },
    subject: { type: String, required: true },
    message: { type: String, required: true },
  },
  { timestamps: true }
);

export type ContactMessageDoc = mongoose.InferSchemaType<typeof ContactMessageSchema> & { _id: string };

export default models.ContactMessage || model('ContactMessage', ContactMessageSchema);
