import mongoose from 'mongoose';

const teamMemberSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    designation: { type: String, required: true },
    photo: { type: String, default: '' },
    bio: { type: String, default: '' },
    socialLink: { type: String, default: '' },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.models.TeamMember ||
  mongoose.model('TeamMember', teamMemberSchema);
