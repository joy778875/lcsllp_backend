import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema(
  {
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    title: {
      type: String,
      required: [true, 'Service title is required'],
      trim: true,
    },
    featuredStatement: {
      type: String,
      default: '',
    },
    shortDesc: {
      type: String,
      required: [true, 'Short description is required'],
    },
    fullDesc: {
      type: String,
      default: '',
    },
    image: {
      type: String,
      default: '',
    },
    tags: [
      {
        type: String,
      },
    ],
    iconName: {
      type: String,
      default: 'Cpu',
    },
    order: {
      type: Number,
      default: 0,
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Service || mongoose.model('Service', serviceSchema);
