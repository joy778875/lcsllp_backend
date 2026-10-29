import mongoose from 'mongoose';

const enquirySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, trim: true, default: '' },
    subject: { type: String, trim: true, default: 'General Enquiry' },
    message: { type: String, required: true, trim: true },
    status: {
      type: String,
      enum: ['new', 'read'],
      default: 'new',
    },
  },
  { timestamps: true }
);

export default mongoose.models.Enquiry ||
  mongoose.model('Enquiry', enquirySchema);
