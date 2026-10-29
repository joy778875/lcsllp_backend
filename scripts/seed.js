import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import connectDB from '../config/db.js';
import Admin from '../models/Admin.js';
import SiteContent from '../models/SiteContent.js';
import Banner from '../models/Banner.js';
import TeamMember from '../models/TeamMember.js';
import MapLocation from '../models/MapLocation.js';
import Notification from '../models/Notification.js';

dotenv.config();

const seedData = async () => {
  try {
    console.log('Connecting to MongoDB for seeding...');
    await connectDB();

    // 1. Seed Admin
    const adminEmail = (process.env.ADMIN_EMAIL || 'admin@arvindllc.com').toLowerCase();
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';

    await Admin.deleteMany({});
    const hashedPassword = await bcrypt.hash(adminPassword, 10);
    await Admin.create({
      email: adminEmail,
      password: hashedPassword,
      name: 'Super Admin',
    });
    console.log(`✅ Admin account seeded: ${adminEmail} (password: ${adminPassword})`);

    // 2. Seed SiteContent
    await SiteContent.deleteMany({});
    await SiteContent.create({
      header: {
        logoText: 'Labradorite Motto',
        logoSubtext: 'Strategic Solutions & Advisory',
        contactNumber: '+91 98765 43210',
        contactEmail: 'info@labradoritemotto.com',
        navItems: [
          { label: 'Home', path: '/' },
          { label: 'Services', path: '/services' },
          { label: 'Team', path: '/team' },
          { label: 'Contact', path: '/contact' },
        ],
      },
      footer: {
        address: 'Strategic Towers, Level 5, Barakhamba Road, Connaught Place, New Delhi - 110001',
        email: 'contact@labradoritemotto.com',
        phone: '+91 11 2345 6789',
        socialLinks: {
          linkedin: 'https://linkedin.com',
          twitter: 'https://twitter.com',
          facebook: 'https://facebook.com',
          instagram: 'https://instagram.com',
        },
        copyrightText: '© 2026 Labradorite Motto LLC. All Rights Reserved.',
        aboutSummary:
          'Empowering government entities, enterprise clients, and startups through high-impact strategic consulting, defense indigenisation, and technology systems.',
      },
    });
    console.log('✅ Site Content (Header & Footer) seeded');

    // 3. Seed Banners
    await Banner.deleteMany({});
    await Banner.insertMany([
      {
        title: 'Empowering Strategic Defense & Technological Excellence',
        subtitle: 'End-to-End Consultancy, Defense Indigenisation & High-Tech System Integration',
        imageUrl:
          'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1600&auto=format&fit=crop',
        link: '/services',
        order: 1,
        active: true,
      },
      {
        title: 'Pioneering Industry Indigenisation & Capital Acquisition',
        subtitle: 'Bridging Foreign Original Equipment Manufacturers (OEMs) with Indian Defense Ecosystems',
        imageUrl:
          'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1600&auto=format&fit=crop',
        link: '/verticals',
        order: 2,
        active: true,
      },
    ]);
    console.log('✅ Hero Banners seeded');

    // 4. Seed Team Members
    await TeamMember.deleteMany({});
    await TeamMember.insertMany([
      {
        name: 'Arvind Sharma',
        designation: 'Managing Director & Principal Strategic Advisor',
        photo:
          'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=400&auto=format&fit=crop',
        bio: 'Over 25 years of leadership in capital acquisitions, defense procurement advisory, and technology policy.',
        socialLink: 'https://linkedin.com',
        order: 1,
      },
      {
        name: 'Vikramaditya Roy',
        designation: 'Head of Defense Indigenisation & Technology',
        photo:
          'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=400&auto=format&fit=crop',
        bio: 'Specialist in technology transfer, offset execution, and strategic government partnerships.',
        socialLink: 'https://linkedin.com',
        order: 2,
      },
    ]);
    console.log('✅ Team Members seeded');

    // 5. Seed Map Locations
    await MapLocation.deleteMany({});
    await MapLocation.create({
      label: 'Corporate Headquarters - New Delhi',
      address: 'Strategic Towers, Level 5, Barakhamba Road, Connaught Place, New Delhi - 110001',
      latitude: 28.6289,
      longitude: 77.2219,
      embedUrl:
        'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3501.996174780512!2d77.219711315082!3d28.62998698241944!2m3!1f0!1f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd36a32d1e23%3A0x62ef075a3df63158!2sConnaught%20Place%2C%20New%20Delhi%2C%20Delhi!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin',
      isPrimary: true,
    });
    console.log('✅ Map Locations seeded');

    // 6. Seed Announcement Popup Notification
    await Notification.deleteMany({});
    await Notification.create({
      title: '✨ Welcome to Labradorite Motto',
      message: 'Explore our latest strategic consultancy insights & defense indigenisation capabilities for 2026.',
      active: true,
      style: 'festive',
    });
    console.log('✅ Active Announcement Notification seeded');

    console.log('🎉 Seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding data:', error);
    process.exit(1);
  }
};

seedData();
