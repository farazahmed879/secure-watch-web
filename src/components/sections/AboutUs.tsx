'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Target, CheckCircle2, Users, Eye, Zap, Lock, Globe, Headphones, Rocket } from 'lucide-react';

const WHY_CHOOSE_US = [
  { icon: <Eye size={20} />, text: '24/7 Live CCTV Monitoring' },
  { icon: <Zap size={20} />, text: 'Real-Time Threat Detection' },
  { icon: <Lock size={20} />, text: 'Instant Alerts & Notifications' },
  { icon: <Users size={20} />, text: 'Professional Security Team' },
  { icon: <Shield size={20} />, text: 'Advanced Surveillance Technology' },
  { icon: <Rocket size={20} />, text: 'Rapid Incident Response' },
  { icon: <Lock size={20} />, text: 'Secure Data Handling & Privacy' },
  { icon: <Globe size={20} />, text: 'International Monitoring Standards' },
];

const AboutUs = ({ data }: { data?: any }) => {
  const badge = data?.badge || 'Who We Are';
  const title = data?.title || 'Professional Security';
  const titleAccent = data?.titleAccent || 'Solutions Provider';
  
  const paragraphs = data?.paragraphs || [
    'Secure Watch 24 Services specializing in CCTV monitoring and advanced surveillance systems. We deliver reliable, real-time protection for businesses, homes, and critical assets using modern technology and expert monitoring.',
    'Our team combines advanced security systems with trained professionals to ensure maximum safety, fast response, and complete peace of mind.'
  ];

  const missionTitle = data?.mission?.title || 'Our Mission';
  const missionText = data?.mission?.text || 'To protect what matters most through technology, dedication, and trust.';

  const whyChooseUsTitle = data?.whyChooseUsTitle || 'Why Choose Us';
  const whyChooseUsPoints = data?.whyChooseUs || [
    '24/7 Live CCTV Monitoring',
    'Real-Time Threat Detection',
    'Instant Alerts & Notifications',
    'Professional Security Team',
    'Advanced Surveillance Technology',
    'Rapid Incident Response',
    'Secure Data Handling & Privacy',
    'International Monitoring Standards'
  ];

  const subStats = data?.subStats || [
    { value: '24/7', label: 'Uninterrupted Support' },
    { value: '100%', label: 'Secure Handling' }
  ];

  return (
    <section id="about" className="py-32 bg-primary-dark relative overflow-hidden">
      <div className="container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          {/* Text Content */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center space-x-3 text-accent mb-6"
            >
              <div className="w-12 h-0.5 bg-accent"></div>
              <span className="text-sm font-black uppercase tracking-[0.3em]">{badge}</span>
            </motion.div>
            
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tighter leading-tight"
            >
              {title} <span className="text-gradient">{titleAccent}</span>
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="space-y-6 text-xl text-white/60 leading-relaxed mb-12"
            >
              {paragraphs.map((p: string, idx: number) => (
                <p key={idx}>{p}</p>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="glass-accent p-8 rounded-2xl border-accent/20 mb-12"
            >
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center text-accent">
                  <Target size={24} />
                </div>
                <h3 className="text-2xl font-black text-white">{missionTitle}</h3>
              </div>
              <p className="text-white/70 text-lg italic">
                "{missionText}"
              </p>
            </motion.div>
          </div>

          {/* Why Choose Us Grid */}
          <div className="relative">
            <div className="absolute inset-0 bg-accent/5 rounded-3xl blur-3xl -z-10"></div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="glass p-10 md:p-12 rounded-3xl border-white/5"
            >
              <h3 className="text-3xl font-black text-white mb-10 tracking-tight">{whyChooseUsTitle}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {whyChooseUsPoints.map((item: string, index: number) => {
                  // Reuse the original visual icons mapping by index
                  const originalItem = WHY_CHOOSE_US[index] || { icon: <CheckCircle2 size={20} /> };
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.05 }}
                      className="flex items-center space-x-4 group"
                    >
                      <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-primary-dark transition-all duration-300">
                        {originalItem.icon}
                      </div>
                      <span className="text-white/60 font-semibold text-sm group-hover:text-white transition-colors">
                        {item}
                      </span>
                    </motion.div>
                  );
                })}
              </div>

              {/* Decorative Stats or Badges */}
              <div className="mt-12 pt-12 border-t border-white/5 grid grid-cols-2 gap-8">
                {subStats.map((item: any, idx: number) => (
                  <div key={idx}>
                    <div className="text-3xl font-black text-accent mb-1">{item.value}</div>
                    <div className="text-[10px] uppercase tracking-widest text-white/30 font-bold">{item.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
