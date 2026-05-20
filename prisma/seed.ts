import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // 1. Seed Admin User
  const adminUsername = 'admin';
  const rawPassword = '@Admin123';
  const hashedPassword = bcrypt.hashSync(rawPassword, 10);

  const existingAdmin = await prisma.admin.findUnique({
    where: { username: adminUsername },
  });

  if (!existingAdmin) {
    await prisma.admin.create({
      data: {
        username: adminUsername,
        password: hashedPassword,
      },
    });
    console.log(`✅ Admin user seeded successfully!`);
    console.log(`   Username: "${adminUsername}"`);
    console.log(`   Password: "${rawPassword}"`);
  } else {
    console.log('ℹ️ Admin user already exists. Skipping...');
  }

  // 2. Seed Default Section Data
  const defaultSections = [
    {
      name: 'hero',
      data: {
        badge: 'Security That Never Sleeps',
        title: 'Advanced CCTV Monitoring',
        titleAccent: 'Real-Time Protection',
        h3Text: '24/7 professional CCTV monitoring and smart surveillance solutions.',
        description: 'Secure Watch 24 Services provides reliable remote monitoring, instant alerts, and advanced surveillance solutions designed to protect properties, people, and businesses around the clock.',
        btnPrimaryText: 'Get Started',
        btnPrimaryLink: '/contact',
        btnOutlineText: 'Contact Us',
        btnOutlineLink: '/contact',
        btnDemoText: 'Request a Demo',
        btnDemoLink: '/contact',
        stats: [
          { number: '10+', label: 'Happy Clients' },
          { number: '24/7', label: 'Monitoring' },
          { number: '15+', label: 'Countries' },
          { number: '99.9%', label: 'Uptime' }
        ]
      }
    },
    {
      name: 'about_us',
      data: {
        badge: 'Who We Are',
        title: 'Professional Security',
        titleAccent: 'Solutions Provider',
        paragraphs: [
          'Secure Watch 24 Services specializing in CCTV monitoring and advanced surveillance systems. We deliver reliable, real-time protection for businesses, homes, and critical assets using modern technology and expert monitoring.',
          'Our team combines advanced security systems with trained professionals to ensure maximum safety, fast response, and complete peace of mind.'
        ],
        mission: {
          title: 'Our Mission',
          text: 'To protect what matters most through technology, dedication, and trust.'
        },
        whyChooseUsTitle: 'Why Choose Us',
        whyChooseUs: [
          '24/7 Live CCTV Monitoring',
          'Real-Time Threat Detection',
          'Instant Alerts & Notifications',
          'Professional Security Team',
          'Advanced Surveillance Technology',
          'Rapid Incident Response',
          'Secure Data Handling & Privacy',
          'International Monitoring Standards'
        ],
        subStats: [
          { value: '24/7', label: 'Uninterrupted Support' },
          { value: '100%', label: 'Secure Handling' }
        ]
      }
    },
    {
      name: 'key_features',
      data: {
        badge: 'Core Strengths',
        title: 'Advanced',
        titleAccent: 'Capabilities',
        description: 'We deliver cutting-edge CCTV monitoring and surveillance solutions designed for maximum reliability and comprehensive threat detection.',
        features: [
          {
            title: 'AI-Powered Analysis',
            description: 'Our systems integrate artificial intelligence to identify anomalies, recognize faces, and detect suspicious behavior instantly.',
            icon: 'Target'
          },
          {
            title: 'Remote Access & Control',
            description: 'View your camera streams and manage settings in real-time from any device, anywhere in the world.',
            icon: 'Camera'
          },
          {
            title: 'Encrypted Storage',
            description: 'All recordings are stored using highly secure, military-grade encryption to ensure complete privacy and compliance.',
            icon: 'Lock'
          },
          {
            title: 'Instant Notification',
            description: 'Receive instant push notifications and alerts on your mobile device the millisecond any unusual activity is detected.',
            icon: 'Activity'
          }
        ]
      }
    },
    {
      name: 'services',
      data: {
        badge: 'Our Services',
        title: 'Comprehensive',
        titleAccent: 'Protection',
        description: 'We offer a complete suite of professional CCTV monitoring and surveillance services designed to cover all security requirements.',
        servicesList: [
          {
            title: 'Remote CCTV Monitoring',
            description: 'Continuous 24/7 watch over your premises by our professional security team, tracking any unusual activity in real time.',
            badge: 'Popular'
          },
          {
            title: 'Smart Surveillance Systems',
            description: 'Installation and configuration of advanced AI cameras, sensors, and recording equipment suited to your exact layout.',
            badge: 'Advanced'
          },
          {
            title: 'Incident Management',
            description: 'Rapid response and escalation to emergency services or keyholders in the event of an confirmed security breach.',
            badge: 'Critical'
          },
          {
            title: 'Audit & Consultancy',
            description: "Thorough assessment of your property's vulnerable areas and comprehensive strategy to optimize camera placement.",
            badge: 'Standard'
          }
        ]
      }
    },
    {
      name: 'industries',
      data: {
        badge: 'Sectors We Protect',
        title: 'Tailored Security',
        titleAccent: 'Across Industries',
        description: "Every sector faces unique security challenges. We customize our remote monitoring and surveillance systems to fit your industry's exact needs.",
        industriesList: [
          {
            name: 'Commercial & Retail',
            description: 'Prevent inventory loss, monitor customer patterns, and protect employees with proactive visual surveillance.',
            icon: 'ShoppingBag'
          },
          {
            name: 'Residential & Estates',
            description: 'Establish complete virtual perimeters to secure high-value residences and private neighborhoods around the clock.',
            icon: 'Home'
          },
          {
            name: 'Industrial & Logistics',
            description: 'Monitor active cargo bays, restrict unauthorized entry into hazard zones, and safeguard expensive equipment.',
            icon: 'Warehouse'
          },
          {
            name: 'Critical Infrastructure',
            description: 'Deploy high-level, redundant surveillance for water treatment centers, power grids, and central hubs.',
            icon: 'ShieldAlert'
          }
        ]
      }
    },
    {
      name: 'pricing',
      data: {
        badge: 'Investment Plans',
        title: 'Transparent',
        titleAccent: 'Pricing',
        description: 'Choose a plan that scales with your growth and security requirements.',
        plans: [
          {
            title: 'Basic Plan',
            price: '400',
            description: 'Ideal for small spaces with basic monitoring needs.',
            features: [
              'Up to 10 Cameras',
              '24/7 Continuous Live Monitoring',
              'Real-Time Instant Alerts',
              'Hourly Activity Reporting',
              'Suspicious Activity Notifications',
              'Professional Monitoring Team',
              'Secure Data Handling',
              'Rapid Response & Escalation'
            ],
            highlight: false
          },
          {
            title: 'Standard Plan',
            price: '600',
            description: 'Perfect for homes and medium-sized offices.',
            features: [
              'Up to 20 Cameras',
              '24/7 Continuous Live Monitoring',
              'Real-Time Instant Alerts',
              'Hourly Activity Reporting',
              'Suspicious Activity Notifications',
              'Dedicated Monitoring Team',
              'Secure Data Handling',
              'Rapid Response & Escalation'
            ],
            highlight: true
          },
          {
            title: 'Premium Plan',
            price: 'Contact',
            description: 'Tailored for businesses and large-scale areas.',
            features: [
              'Flexible Camera Coverage',
              '24/7 Continuous Live Monitoring',
              'Real-Time Instant Alerts',
              'Hourly Reporting',
              'Dedicated Monitoring Team',
              'Secure Data Handling',
              'Rapid Incident Response',
              'Advanced Monitoring Features'
            ],
            highlight: false
          },
          {
            title: 'Custom Plan',
            price: 'Custom',
            description: 'Flexible solutions tailored to your business requirements.',
            features: [
              'Flexible Camera Coverage',
              'Custom Reporting',
              'Priority Response Handling',
              'Scalable Monitoring Solutions',
              'Custom Pricing Based on Scope',
              'Dedicated Monitoring Team'
            ],
            highlight: false
          }
        ]
      }
    },
    {
      name: 'collaboration',
      data: {
        badge: 'Global Partnership',
        title: 'International',
        titleAccent: 'Partnership',
        description: 'Secure Watch 24 Services is proudly partnered with Alpha Crime Control LLC, a security company based in Houston, Texas, USA.',
        points: [
          'International Security Standards',
          'Improved Monitoring Capabilities',
          'Faster Response Coordination',
          'Global-Level Service Quality',
          'Enhanced Operational Standards'
        ],
        usaAddress: '7447 Harwin Drive, Houston, TX, USA',
        usaPhone: '+1 (281) 702-9418'
      }
    },
    {
      name: 'faq',
      data: {
        badge: 'Common Questions',
        title: 'Frequently Asked',
        titleAccent: 'Questions',
        description: 'Everything you need to know about our remote CCTV monitoring and surveillance services.',
        faqsList: [
          {
            question: 'How does 24/7 remote monitoring work?',
            answer: 'Your onsite cameras securely stream live feeds to our monitoring center. Our expert operators and AI tools monitor the feed, and upon detecting unauthorized activity, immediately trigger emergency protocols.'
          },
          {
            question: 'Can I view my cameras on my own phone?',
            answer: 'Absolutely! We configure remote access clients on your smartphones, tablets, and computers, giving you live access and control over your feeds from anywhere.'
          },
          {
            question: "What happens if there's a power or internet outage?",
            answer: 'Our systems utilize secondary backup power units (UPS) and dual-cellular network backups (5G/LTE routers) to ensure cameras keep recording and sending feeds during a power cut or main line failure.'
          },
          {
            question: 'Do you store recordings, and for how long?',
            answer: 'Yes, recordings are stored securely in high-performance local network video recorders (NVR) and cloud systems. The default retention is 30 days, but custom retention plans up to 1 year are available.'
          }
        ]
      }
    },
    {
      name: 'ceo_section',
      data: {
        badge: 'Message From Our Leadership',
        title: 'Commitment to Peace of Mind',
        quote: 'Security is not just about cameras and software; it is about trust, proactive vigilance, and rapid action. We ensure you can focus on growing your business knowing that we are watching over it.',
        ceoName: 'Faraz Shaikh',
        ceoRole: 'Founder & CEO, Secure Watch 24 Services',
        signatureText: 'Securing Your Future Today'
      }
    }
  ];

  for (const sec of defaultSections) {
    const existingSection = await prisma.section.findUnique({
      where: { name: sec.name },
    });

    if (!existingSection) {
      await prisma.section.create({
        data: {
          name: sec.name,
          data: sec.data,
        },
      });
      console.log(`✅ Dynamic Section "${sec.name}" seeded.`);
    } else {
      console.log(`ℹ️ Dynamic Section "${sec.name}" already exists. Skipping...`);
    }
  }

  console.log('🎉 Database seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
