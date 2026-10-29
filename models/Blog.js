import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Blog title is required'],
      trim: true,
    },
    slug: {
      type: String,
      required: [true, 'Slug is required'],
      unique: true,
      trim: true,
      lowercase: true,
    },
    category: {
      type: String,
      default: 'Defence Policy',
      trim: true,
    },
    author: {
      type: String,
      default: 'Labradorite Strategic Advisory',
      trim: true,
    },
    date: {
      type: String,
      default: () => new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
    },
    readTime: {
      type: String,
      default: '5 min read',
    },
    summary: {
      type: String,
      required: [true, 'Blog summary is required'],
    },
    content: {
      type: String,
      required: [true, 'Blog full content is required'],
    },
    image: {
      type: String,
      default: '/images/iaf-fighter-jets-hero.jpg',
    },
    tags: [
      {
        type: String,
      },
    ],
    active: {
      type: Boolean,
      default: true,
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Blog || mongoose.model('Blog', blogSchema);
