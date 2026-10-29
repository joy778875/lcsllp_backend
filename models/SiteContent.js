import mongoose from 'mongoose';

const siteContentSchema = new mongoose.Schema(
  {
    header: {
      logoText: { type: String, default: 'Labradorite Motto' },
      logoSubtext: { type: String, default: 'Strategic Solutions & Advisory' },
      logoUrl: { type: String, default: '' },
      contactNumber: { type: String, default: '+91-9866865141' },
      contactPhone2: { type: String, default: '+91-9667710141' },
      whatsapp: { type: String, default: '+91 9667710141' },
      contactEmail: { type: String, default: 'director@lcsllp.online' },
      contactEmail2: { type: String, default: 'director@lcsllp.online' },
      marqueeItems: [
        { type: String }
      ],
      navItems: [
        {
          label: { type: String, required: true },
          path: { type: String, required: true },
        },
      ],
    },
    footer: {
      address: {
        type: String,
        default: 'FLAT NO 701 Block K Homes 121, Noida Sector 121 PLOT NO GH 01, Noida, Gautam Buddha Nagar, Uttar Pradesh - 201307',
      },
      email: { type: String, default: 'director@lcsllp.online' },
      email2: { type: String, default: 'director@lcsllp.online' },
      phone: { type: String, default: '+91-9866865141' },
      phone2: { type: String, default: '+91-9667710141' },
      whatsapp: { type: String, default: '+91 9667710141' },
      socialLinks: {
        linkedin: { type: String, default: 'https://linkedin.com' },
        twitter: { type: String, default: 'https://twitter.com' },
        facebook: { type: String, default: 'https://facebook.com' },
        instagram: { type: String, default: 'https://instagram.com' },
        youtube: { type: String, default: 'https://youtube.com' },
      },
      copyrightText: {
        type: String,
        default: '© 2026 Labradorite Consultancy & Services LLP. All rights reserved.',
      },
      aboutSummary: {
        type: String,
        default:
          'A specialized Defence Acquisition & Technology consultancy team founded around the professional experience of Indian Air Force veterans. Sharing knowledge, experience, and building trust to drive better defence business.',
      },
      companyDetails: {
        name: { type: String, default: 'LABRADORITE CONSULTANCY AND SERVICES LLP' },
        registrationDate: { type: String, default: '19 Jan 2024' },
        llpin: { type: String, default: 'ACF-0228' },
        pan: { type: String, default: 'AALFL3126B' },
        tan: { type: String, default: 'MRTL02978D' },
        gst: { type: String, default: '09AALFL3126B1ZL' },
      },
      backgroundImage: {
        type: String,
        default: '/images/iaf-fighter-jets-tarmac.jpg',
      },
    },
    about: {
      heroTag: { type: String, default: 'BUILT ON EXPERIENCE. DRIVEN BY INTEGRITY.' },
      headline: { type: String, default: "Indian Air Force Veteran & Professional Expertise for India's Defence Ecosystem." },
      story1: {
        type: String,
        default: 'We are a team brought together by an Indian Housewife and independent Entrepreneur to form an Acquisition & Technology Consultancy team of Indian Air Force Veterans, harnessing years of professional experience, dedication, and integrity towards the vision of Aatmanirbhar Bharat.',
      },
      story2: {
        type: String,
        default: 'We share professional acumen and deep domain knowledge to bring together Startups, MSMEs, Indian defence entities, and foreign technology companies to build long-term, high-value business in the Indian defence sector.',
      },
      clientBeliefQuote: {
        type: String,
        default: 'Our Belief is sharing professional knowledge, experience and building trust builds better business.',
      },
      labradoriteMetaphor1: {
        type: String,
        default: 'Labradorite is a magic and intuition. It helps to connect allowing greater clarity and understanding.',
      },
      labradoriteMetaphor2: {
        type: String,
        default: 'Labradorite is a platform for transformation, helping to shed light on the areas that need work. If you are simply looking for someone who will guide you to reach your highest potential, Labradorite is an excellent choice.',
      },
      objectiveSections: [
        {
          heading: { type: String },
          content: { type: String },
        },
      ],
      closingStatement: {
        type: String,
        default: 'We as Defence consultants carry on the business of providing Defence Acquisition and Technology consultancy services to Defence Acquisition entities and companies in or outside India to successfully start your defence acquisition business and grow.',
      },
      image: {
        type: String,
        default: '/images/service-pmg.jpg',
      },
    },
    coreValues: [
      {
        number: { type: String },
        title: { type: String },
        statement: { type: String },
      },
    ],
    home: {
      philosophyEyebrow: { type: String, default: 'Brand Philosophy & Mission' },
      philosophyHeading: { type: String, default: 'Transformation through insight & military integrity.' },
      philosophyQuote: { type: String, default: 'Our Belief is sharing professional knowledge, experience and building trust builds better business.' },
      philosophyText: {
        type: String,
        default: 'Labradorite serves as a platform for transformation in Indian aerospace and defence. Founded around the operational experience of Indian Air Force veterans, we illuminate strategic pathways across complex procedural and indigenisation landscapes.',
      },
      philosophyImage: { type: String, default: '/images/iaf-fighter-jets-tarmac.jpg' },
    },
    cta: {
      eyebrow: { type: String, default: 'DIRECT STRATEGIC ENGAGEMENT' },
      title: { type: String, default: 'Ready to elevate your defence acquisition strategy?' },
      description: {
        type: String,
        default: 'Connect directly with our Indian Air Force veteran advisory board to navigate DAP 2020 frameworks, indigenisation programs, and strategic partnerships.',
      },
      primaryButtonText: { type: String, default: 'Schedule Strategic Consultation' },
      primaryButtonLink: { type: String, default: '/contact' },
      secondaryButtonText: { type: String, default: 'Call Directorate: +91-9866865141' },
      secondaryButtonPhone: { type: String, default: '+91-9866865141' },
      backgroundImage: { type: String, default: '/images/iaf-fighter-jets-hero.jpg' },
    },
    sectionVisibility: {
      showHero: { type: Boolean, default: true },
      showTrustStrip: { type: Boolean, default: true },
      showServices: { type: Boolean, default: true },
      showPhilosophy: { type: Boolean, default: true },
      showFaqs: { type: Boolean, default: true },
      showCta: { type: Boolean, default: true },
    },
    faqs: [
      {
        q: { type: String, required: true },
        a: { type: String, required: true },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.models.SiteContent || mongoose.model('SiteContent', siteContentSchema);
