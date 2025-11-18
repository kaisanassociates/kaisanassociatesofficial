import mongoose, { Schema, model, models } from 'mongoose';

const RegistrationSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    organization: { type: String },
    ticketType: { type: String, default: 'standard' },
  },
  { timestamps: true }
);

export type RegistrationDoc = mongoose.InferSchemaType<typeof RegistrationSchema> & { _id: string };

export default models.Registration || model('Registration', RegistrationSchema);
