import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.join(__dirname, '..', 'data');
const STORE_FILE = path.join(DATA_DIR, 'store.json');

const initialSeedData = {
  siteContent: {
    header: {
      logoText: 'Labradorite Motto',
      logoSubtext: 'Strategic Solutions & Advisory',
      logoUrl: '',
      contactNumber: '+91-9866865141',
      contactPhone2: '+91-9667710141',
      whatsapp: '+91 9667710141',
      contactEmail: 'director@lcsllp.online',
      contactEmail2: 'director@lcsllp.online',
      marqueeItems: [
        'INDIAN AIR FORCE VETERAN-LED',
        'DEFENCE ACQUISITION & TECHNOLOGY CONSULTANCY',
        'DAP 2020 & DPM ADVISORY',
        'MRO & SUSTENANCE',
        'SUPPLY CHAIN RESILIENCE',
        'AATMANIRBHAR BHARAT ALIGNED',
        'NOIDA & NEW DELHI',
        'STRATEGIC LIFECYCLE ADVISORY',
      ],
      navItems: [
        { label: 'Home', path: '/' },
        { label: 'About', path: '/about' },
        { label: 'Services', path: '/services' },
        { label: 'Insights', path: '/insights' },
        { label: 'Our Team', path: '/team' },
        { label: 'Contact', path: '/contact' },
      ],
    },
    footer: {
      address:
        'FLAT NO 701 Block K Homes 121, Noida Sector 121 PLOT NO GH 01, Noida, Gautam Buddha Nagar, Uttar Pradesh - 201307',
      email: 'director@lcsllp.online',
      email2: 'director@lcsllp.online',
      phone: '+91-9866865141',
      phone2: '+91-9667710141',
      whatsapp: '+91 9667710141',
      socialLinks: {
        linkedin: 'https://linkedin.com',
        twitter: 'https://twitter.com',
        facebook: 'https://facebook.com',
        instagram: 'https://instagram.com',
        youtube: 'https://youtube.com',
      },
      copyrightText: '© 2026 Labradorite Consultancy & Services LLP. All rights reserved.',
      aboutSummary:
        'A specialized Defence Acquisition & Technology consultancy team founded around the professional experience of Indian Air Force veterans. Sharing knowledge, experience, and building trust to drive better defence business.',
      companyDetails: {
        name: 'LABRADORITE CONSULTANCY AND SERVICES LLP',
        registrationDate: '19 Jan 2024',
        llpin: 'ACF-0228',
        pan: 'AALFL3126B',
        tan: 'MRTL02978D',
        gst: '09AALFL3126B1ZL',
      },
      backgroundImage: '/images/iaf-fighter-jets-tarmac.jpg',
    },
    about: {
      heroTag: 'BUILT ON EXPERIENCE. DRIVEN BY INTEGRITY.',
      headline: "Indian Air Force Veteran & Professional Expertise for India's Defence Ecosystem.",
      story1:
        'We are a team brought together by an Indian Housewife and independent Entrepreneur to form an Acquisition & Technology Consultancy team of Indian Air Force Veterans, harnessing years of professional experience, dedication, and integrity towards the vision of Aatmanirbhar Bharat.',
      story2:
        'We share professional acumen and deep domain knowledge to bring together Startups, MSMEs, Indian defence entities, and foreign technology companies to build long-term, high-value business in the Indian defence sector.',
      clientBeliefQuote:
        'Our Belief is sharing professional knowledge, experience and building trust builds better business.',
      labradoriteMetaphor1:
        'Labradorite is a magic and intuition. It helps to connect allowing greater clarity and understanding.',
      labradoriteMetaphor2:
        'Labradorite is a platform for transformation, helping to shed light on the areas that need work. If you are simply looking for someone who will guide you to reach your highest potential, Labradorite is an excellent choice.',
      objectiveSections: [
        {
          heading: 'Aatmanirbhar Bharat Alignment',
          content: 'Aligning domestic defense initiatives with national indigenisation goals and Make in India frameworks.',
        },
        {
          heading: 'Modernization Roadmap',
          content: 'Translating Ministry of Defence long-term perspective plans into actionable capability milestones.',
        },
        {
          heading: 'Indigenous Ecosystem Advisory',
          content: 'Structuring collaboration across DRDO programs, defence corridors, and private tier manufacturers.',
        },
        {
          heading: 'Policy & Space Integration',
          content: 'Navigating DAP 2020 compliance, offset fulfillment, and cross-sector aerospace & space synergies.',
        },
        {
          heading: 'Strategic Technology Partnerships',
          content: 'Facilitating structured Transfer of Technology (TOT) and joint ventures between Indian entities and global OEMs.',
        },
        {
          heading: 'MRO & Sustenance Hubs',
          content: 'Developing sustainable domestic maintenance, repair, and overhaul capabilities within defence corridors.',
        },
      ],
      closingStatement:
        'We as Defence consultants carry on the business of providing Defence Acquisition and Technology consultancy services to Defence Acquisition entities and companies in or outside India to successfully start your defence acquisition business and grow.',
      image: '/images/service-pmg.jpg',
    },
    coreValues: [
      {
        number: '01',
        title: 'RELATIONSHIP',
        statement:
          'We believe in building engaged relationships with our clients, partners, employees, and community. The success of our business shall be rooted in the long-term relationships and deep customer loyalty we forge over the years.',
      },
      {
        number: '02',
        title: 'COMMITMENT',
        statement:
          'We honor our commitments to clients, to each other and to the company. We take ownership of our work and hold ourselves accountable for results.',
      },
      {
        number: '03',
        title: 'ETHOS',
        statement:
          'We work with the highest degree of work ethos, professionalism, integrity, and dedication for our client’s aspirations.',
      },
      {
        number: '04',
        title: 'TEAMING',
        statement:
          'We recognize that human resource is the strength to drive success. We work together, both as a company and with our clients, to share knowledge, foster innovative ideas, resolve impediments, and deliver quality results.',
      },
    ],
    home: {
      philosophyEyebrow: 'Brand Philosophy & Mission',
      philosophyHeading: 'Transformation through insight & military integrity.',
      philosophyQuote:
        'Our Belief is sharing professional knowledge, experience and building trust builds better business.',
      philosophyText:
        'Labradorite serves as a platform for transformation in Indian aerospace and defence. Founded around the operational experience of Indian Air Force veterans, we illuminate strategic pathways across complex procedural and indigenisation landscapes.',
      philosophyImage: '/images/iaf-fighter-jets-tarmac.jpg',
    },
    cta: {
      eyebrow: 'DIRECT STRATEGIC ENGAGEMENT',
      title: 'Ready to elevate your defence acquisition strategy?',
      description:
        'Connect directly with our Indian Air Force veteran advisory board to navigate DAP 2020 frameworks, indigenisation programs, and strategic partnerships.',
      primaryButtonText: 'Schedule Strategic Consultation',
      primaryButtonLink: '/contact',
      secondaryButtonText: 'Call Directorate: +91-9866865141',
      secondaryButtonPhone: '+91-9866865141',
      backgroundImage: '/images/iaf-fighter-jets-hero.jpg',
    },
    sectionVisibility: {
      showHero: true,
      showTrustStrip: true,
      showServices: true,
      showPhilosophy: true,
      showFaqs: true,
      showCta: true,
    },
    faqs: [
      {
        q: 'Who leads the consultancy at Labradorite?',
        a: 'The advisory is led by Air Commodore Arvind Srivastava, an Indian Air Force veteran with 30+ years of military aeronautical engineering service, and former Deputy Director General Technical (Air) in Defence Capital Acquisition at the Ministry of Defence.',
      },
      {
        q: 'What areas of defence and aerospace do you specialise in?',
        a: 'Our core competencies include Defence Capital Acquisitions under DAP 2020 (IDDM, Make, D&D categories), Aircraft MRO setup & base modernization, regulatory airworthiness approvals (DGCA/DGAQA/CEMILAC), and aerospace supply chain indigenisation.',
      },
      {
        q: 'How does Labradorite support defence offsets and ToT?',
        a: 'We assist foreign OEMs and Indian entities in structuring offset programs, navigating offset banking, and orchestrating Transfer of Technology (ToT) absorption compliant with MoD guidelines.',
      },
      {
        q: 'Can startups and MSMEs engage with your advisory?',
        a: 'Yes. We guide aerospace startups and MSMEs through iDEX challenges, Make-II/Make-III schemes, MoD vendor registration, and technical pitch alignment against military Service Qualitative Requirements (SQRs).',
      },
      {
        q: 'What is the engagement model for advisory services?',
        a: 'We engage through structured feasibility assessments, long-term project-management retainers, and milestone-linked consultation agreements based on operational scope.',
      },
    ],
  },
  banners: [
    {
      _id: 'banner_1',
      eyebrow: 'Aatmanirbhar Bharat · IAF Veteran-Led Advisory',
      title: 'Building better business through knowledge, experience & trust.',
      subtitle:
        'Defence Acquisition and Technology consultancy for Indian and global aerospace entities, grounded in DAP 2020 guidelines and military integrity.',
      imageUrl: '/images/iaf-fighter-jets-hero.jpg',
      link: '/services',
      order: 1,
      active: true,
      badgeText: 'IAF Fighter Jets Formation',
    },
  ],
  team: [
    {
      _id: 'team_1',
      name: 'Arvind',
      designation: 'Founder & Director',
      bio: 'Founder & Director leading strategic business development, defence acquisition consultancy, and institutional partnerships across the Indian A&D ecosystem.',
      photo: '/images/team-arvind.jpg',
      socialLink: 'https://linkedin.com',
      verified: true,
      order: 1,
    },
    {
      _id: 'team_2',
      name: 'Neelu',
      designation: 'Co-Founder & Executive Director',
      bio: 'Co-founding leadership driving operational vision, governance, and business administration at Labradorite Consultancy & Services LLP.',
      photo: '/images/team-neelu.jpg',
      socialLink: 'https://linkedin.com',
      verified: true,
      order: 2,
    },
    {
      _id: 'team_3',
      name: 'AVM Tyagi',
      designation: 'Senior Director & Defence Advisor',
      bio: 'Indian Air Force Veteran providing executive-level guidance on aerospace technology, DAP 2020 frameworks, and strategic acquisition roadmaps.',
      photo: '/images/team-tyagi.jpg',
      socialLink: 'https://linkedin.com',
      verified: true,
      order: 3,
    },
    {
      _id: 'team_4',
      name: 'Kane',
      designation: 'Director - Defence Technology',
      bio: 'Consultancy partner and director focused on technology evaluation, indigenisation alignment, and process execution.',
      photo: '/images/team-kane.jpg',
      socialLink: 'https://linkedin.com',
      verified: true,
      order: 4,
    },
    {
      _id: 'team_5',
      name: 'Karu',
      designation: 'Director - Operations & Projects',
      bio: 'Operational management consultant facilitating PMG liaison, tracking project execution, and client engagement.',
      photo: '/images/team-karu.jpg',
      socialLink: 'https://linkedin.com',
      verified: true,
      order: 5,
    },
  ],
  services: [
    {
      _id: 'srv_1',
      slug: 'technology-consultancy',
      title: 'Technology Consultancy',
      featuredStatement: 'If you have the technology, we have the strategy plan to sell that and find a buyer.',
      shortDesc:
        'Market opportunity mapping, EOI/RFI/RFP response structuring, and iDEX & Make program advisory under DAP 2020.',
      fullDesc:
        'The DAP 2020 defence policy framework is based on the cornerstone of indigenous manufacturing and establishment of defence corridors. We assist by identifying strategic opportunities and structuring precise technology proposals for EOI/RFI/RFP response through iDEX, Make programs, and capital acquisition channels.',
      image: '/images/service-avionics.jpg',
      tags: ['DAP 2020', 'iDEX / Make', 'RFI & RFP'],
      iconName: 'Cpu',
      order: 1,
      active: true,
    },
    {
      _id: 'srv_2',
      slug: 'mro-sustenance',
      title: 'MRO & Sustenance',
      featuredStatement: 'Developing indigenous ecosystem, TOT, and establishing the right Indian operational front.',
      shortDesc:
        'Depot maintenance planning, Transfer of Technology (TOT), and domestic operational front establishment.',
      fullDesc:
        'If you have the technology, we have the strategic plan focused upon the development of indigenous ecosystems and MRO/sustenance capabilities. We assist in structuring Transfer of Technology (TOT) agreements and finding the right Indian operational partner to set up state-of-the-art facilities and scale business.',
      image: '/images/service-mro.jpg',
      tags: ['TOT Structuring', 'Depot MRO', 'Lifecycle Support'],
      iconName: 'Wrench',
      order: 2,
      active: true,
    },
    {
      _id: 'srv_3',
      slug: 'leasing-consultancy',
      title: 'Leasing Consultancy',
      featuredStatement: 'High-technology asset leasing under DAP 2020: An economical path to operational readiness.',
      shortDesc:
        'Structured operational and capital leasing contracts for defence equipment under DAP 2020 provisions.',
      fullDesc:
        'Leasing of High-Technology Assets is a viable, economical solution to explore technology, assess capabilities, and attain high training standards without large initial capital outlay. Leasing prevents equipment obsolescence, enables faster acquisition, reduces administrative costs, and provides structured lessor benefits.',
      image: '/images/service-leasing.jpg',
      tags: ['DAP 2020 Leasing', 'Capital Protection', 'Fast Deployment'],
      iconName: 'Key',
      order: 3,
      active: true,
    },
    {
      _id: 'srv_4',
      slug: 'project-management',
      title: 'Project Management',
      featuredStatement: 'Tailored framework analysis aligning technical execution with customer indigenisation plans.',
      shortDesc:
        'PMG technical liaison, milestone progress tracking, risk mitigation, and on-time defence delivery.',
      fullDesc:
        'Analysis of project management frameworks by highly skilled consultants aligned with industry best practices and tailored to Customer Indigenisation plans. We provide technical consultancy in close liaison with the PMG to iron out impediments, track project milestones, manage scope changes, and ensure on-time, within-budget delivery.',
      image: '/images/service-pmg.jpg',
      tags: ['PMG Liaison', 'Milestone Audits', 'Risk Mitigation'],
      iconName: 'Kanban',
      order: 4,
      active: true,
    },
    {
      _id: 'srv_5',
      slug: 'supply-chain-support',
      title: 'Supply Chain Support',
      featuredStatement: 'Optimizing defense supply chain resilience, vendor localization, and tier-integration.',
      shortDesc:
        'Tier-1/Tier-2 vendor discovery, domestic component localization, and resilient aerospace logistics.',
      fullDesc:
        'Our Supply Chain Support consultancy assists defence contractors, OEMs, and Tier-1/Tier-2 suppliers in establishing resilient domestic supply networks. We provide strategic evaluation of component sourcing, quality compliance, offset fulfillment, and vendor localization tailored to Indian aerospace and defence requirements.',
      image: '/images/service-supply-chain.jpg',
      tags: ['Vendor Discovery', 'Tier-2 Integration', 'Localization'],
      iconName: 'Truck',
      order: 5,
      active: true,
    },
    {
      _id: 'srv_6',
      slug: 'miscellaneous-services',
      title: 'Miscellaneous Services',
      featuredStatement: 'Bridging information asymmetry across the Indian Aerospace & Defence ecosystem.',
      shortDesc:
        'Specialized HR setup, strategic partner identification, and defence business model transformation.',
      fullDesc:
        'We aid on key business challenges, such as identifying and setting up experienced HR frameworks, accessing new customer segments, innovating business models, transforming product development, and improving customer support services. We bridge information asymmetry to provide exhaustive coverage of the Indian Aerospace & Defence ecosystem.',
      image: '/images/aerospace-interconnects.jpg',
      tags: ['Defence HR', 'Ecosystem Networking', 'Model Innovation'],
      iconName: 'Layers',
      order: 6,
      active: true,
    },
  ],
  blogs: [
    {
      _id: 'blog_1',
      slug: 'navigating-dap-2020-make-in-india-defence-contracts',
      title: 'Navigating DAP 2020: Strategic Imperatives for Make in India Defence Contracts',
      category: 'Procurement Policy',
      author: 'AVM Tyagi (Retd.)',
      date: '24 Feb 2026',
      readTime: '6 min read',
      summary:
        'A comprehensive guide to Defence Acquisition Procedure (DAP) 2020, focusing on indigenous content calculation, trial methodologies, and capital category selection.',
      content:
        'The Defence Acquisition Procedure (DAP) 2020 represents a decisive paradigm shift towards empowering the indigenous aerospace and defence manufacturing industry. Under the strategic vision of Aatmanirbhar Bharat, capital acquisitions now prioritize Buy (Indian - IDDM), Buy (Indian), and Make categories with stringent indigenous content requirements.\n\nKey Strategic Takeaways for Vendors:\n1. Indigenous Content Calculation: DAP 2020 enforces verification through statutory auditor certifications and detailed bills of materials.\n2. Field Evaluation Trials: Trials now follow rigorous non-negotiable compliance parameters with no second chances for baseline failure.\n3. Offset Banking & Multipliers: Capital contracts exceeding thresholds mandate high-technology transfers with attractive investment multipliers.\n\nWorking closely with veteran defence consultants ensures that RFI and RFP bids avoid common compliance pitfalls and accelerate through technical evaluation committees.',
      image: '/images/iaf-fighter-jets-hero.jpg',
      tags: ['DAP 2020', 'Make in India', 'IDDM', 'Procurement'],
      active: true,
      order: 1,
    },
    {
      _id: 'blog_2',
      slug: 'mro-ecosystem-aerospace-defence-corridors',
      title: 'Establishing Resilient MRO Hubs Across Indian Defence Industrial Corridors',
      category: 'MRO & Sustenance',
      author: 'Arvind Sharma',
      date: '18 Feb 2026',
      readTime: '5 min read',
      summary:
        'Examining the development of domestic Maintenance, Repair & Overhaul capabilities in Tamil Nadu and Uttar Pradesh Defence Industrial Corridors.',
      content:
        'India’s aerospace and defence fleet sustenance requires transitioning from overseas depot overhauls to self-sustaining domestic maintenance hubs. The two dedicated Defence Industrial Corridors (UP & Tamil Nadu) provide unprecedented tax incentives, land allocations, and specialized testing facilities.\n\nCrucial Elements for Successful MRO Alliances:\n- Transfer of Technology (TOT): Structuring phased transfer of depot-level diagnostics and line replaceable units (LRUs).\n- Tri-Service Compatibility: Designing maintenance infrastructure that supports common airframe and avionics architectures.\n- Private-Public Partnerships: Synergizing with HAL and base repair depots (BRDs) to scale operational availability.\n\nOur consultancy actively bridges Tier-1 aerospace innovators with vetted local infrastructure providers to build enduring MRO capability.',
      image: '/images/service-mro.jpg',
      tags: ['MRO', 'Defence Corridors', 'TOT', 'Aviation Maintenance'],
      active: true,
      order: 2,
    },
    {
      _id: 'blog_3',
      slug: 'idex-primes-msme-catalyst-modernization',
      title: 'iDEX & Innovations for Defence Excellence: The MSME Catalyst',
      category: 'Startups & MSME',
      author: 'Kane & Strategic Cell',
      date: '10 Feb 2026',
      readTime: '4 min read',
      summary:
        'How startups and MSMEs are disrupting Indian defence technology through iDEX challenge grants and SPARK schemes.',
      content:
        'Innovations for Defence Excellence (iDEX) is transforming how the Indian Armed Forces source cutting-edge technologies—from AI-driven tactical surveillance to advanced composite materials. However, small businesses frequently struggle with military-grade testing protocols and compliance documentation.\n\nBridging the Prototype-to-Production Chasm:\n1. Milestone Tracking: Structured project management prevents delay in grant disbursals.\n2. User Trials Preparation: Simulating high-altitude, desert, and extreme environmental testing conditions before formal military trials.\n3. Scaled Capital Procurement: Leveraging successful iDEX prototypes into long-term procurement contracts under DAP Make II provisions.',
      image: '/images/service-pmg.jpg',
      tags: ['iDEX', 'MSME', 'Startups', 'Defence Innovation'],
      active: true,
      order: 3,
    },
    {
      _id: 'blog_4',
      slug: 'high-tech-asset-leasing-in-aerospace',
      title: 'Operational Flexibility: High-Technology Asset Leasing Under DAP 2020',
      category: 'Leasing Strategy',
      author: 'Labradorite Financial Advisory',
      date: '02 Feb 2026',
      readTime: '5 min read',
      summary:
        'Analyzing the strategic advantages of equipment leasing over outright capital purchases for rapid operational deployment.',
      content:
        'Leasing introduced under DAP 2020 allows the Ministry of Defence and armed services to access critical mission assets without heavy upfront capital expenditure. From maritime reconnaissance platforms to flight simulators, leasing mitigates technological obsolescence risks and slashes acquisition lead times.\n\nFinancial & Operational Advantages:\n- Budget Predictability: Fixed operational expenditure models rather than variable lifecycle maintenance burdens.\n- Rapid Fleet Ingestion: Immediate deployment capability for urgent tactical training and surveillance missions.\n- Lessor Guarantees: Structured performance benchmarks ensuring high platform availability rates round the clock.',
      image: '/images/service-leasing.jpg',
      tags: ['Leasing', 'DAP 2020', 'Capital Optimization', 'Simulators'],
      active: true,
      order: 4,
    },
  ],
  maps: [
    {
      _id: 'map_1',
      label: 'Corporate Office - Noida / Delhi NCR',
      address:
        'FLAT NO 701 Block K Homes 121, Noida Sector 121 PLOT NO GH 01, Noida, Gautam Buddha Nagar, Uttar Pradesh - 201307',
      latitude: 28.5961,
      longitude: 77.3888,
      embedUrl:
        'https://maps.google.com/maps?q=Noida%20Sector%20121&t=&z=13&ie=UTF8&iwloc=&output=embed',
      isPrimary: true,
    },
  ],
  enquiries: [
    {
      _id: 'enq_1',
      name: 'Defence Dynamics India',
      company: 'Defence Dynamics Pvt Ltd',
      email: 'consult@defencedynamics.in',
      phone: '+91 98111 22334',
      subject: 'Technology Consultancy - DAP 2020 Partnership',
      message:
        'Looking for expert veteran advisory to structure EOI/RFI proposal for Indian Air Force procurement.',
      status: 'new',
      createdAt: new Date().toISOString(),
    },
  ],
  notifications: [
    {
      _id: 'notif_1',
      title: '✨ Welcome to Labradorite Motto',
      message:
        'Indian Air Force Veteran & Professional Expertise for India’s Defence Ecosystem. Now taking consults for DAP 2020 & Indigenisation.',
      active: true,
      style: 'festive',
      createdAt: new Date().toISOString(),
    },
  ],
};

function ensureStoreFile() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(STORE_FILE)) {
    fs.writeFileSync(STORE_FILE, JSON.stringify(initialSeedData, null, 2), 'utf-8');
  } else {
    // Merge any missing top-level keys into existing store.json
    try {
      const raw = fs.readFileSync(STORE_FILE, 'utf-8');
      const existing = JSON.parse(raw);
      let modified = false;

      // Ensure blogs exist
      if (!existing.blogs || existing.blogs.length === 0) {
        existing.blogs = initialSeedData.blogs;
        modified = true;
      }
      // Ensure siteContent sections exist
      if (!existing.siteContent) {
        existing.siteContent = initialSeedData.siteContent;
        modified = true;
      } else {
        if (!existing.siteContent.about) {
          existing.siteContent.about = initialSeedData.siteContent.about;
          modified = true;
        }
        if (!existing.siteContent.coreValues) {
          existing.siteContent.coreValues = initialSeedData.siteContent.coreValues;
          modified = true;
        }
        if (!existing.siteContent.home) {
          existing.siteContent.home = initialSeedData.siteContent.home;
          modified = true;
        }
        if (!existing.siteContent.cta) {
          existing.siteContent.cta = initialSeedData.siteContent.cta;
          modified = true;
        }
      }

      if (modified) {
        fs.writeFileSync(STORE_FILE, JSON.stringify(existing, null, 2), 'utf-8');
      }
    } catch (e) {
      console.warn('Error verifying store.json schema migration:', e.message);
    }
  }
}

export function getStore() {
  try {
    ensureStoreFile();
    const raw = fs.readFileSync(STORE_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    console.error('Error reading store.json, returning seed fallback:', err.message);
    return initialSeedData;
  }
}

export function saveStore(data) {
  try {
    ensureStoreFile();
    fs.writeFileSync(STORE_FILE, JSON.stringify(data, null, 2), 'utf-8');
    return true;
  } catch (err) {
    console.error('Error saving store.json:', err.message);
    return false;
  }
}

export default {
  getStore,
  saveStore,
};
