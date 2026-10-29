import mongoose from 'mongoose';

const mapLocationSchema = new mongoose.Schema(
  {
    label: { type: String, required: true },
    address: { type: String, required: true },
    latitude: { type: Number, default: 28.6139 },
    longitude: { type: Number, default: 77.2090 },
    embedUrl: { type: String, default: '' },
    isPrimary: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.models.MapLocation ||
  mongoose.model('MapLocation', mapLocationSchema);
