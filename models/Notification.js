import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    message: { type: String, required: true, trim: true },
    active: { type: Boolean, default: true },
    style: {
      type: String,
      enum: ['festive', 'info', 'alert'],
      default: 'festive',
    },
    startDate: { type: Date, default: null },
    endDate: { type: Date, default: null },
  },
  { timestamps: true }
);

export default mongoose.models.Notification ||
  mongoose.model('Notification', notificationSchema);
