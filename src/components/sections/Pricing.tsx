'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Check, ShieldCheck, Zap, Globe } from 'lucide-react';
import Link from 'next/link';

const PRICING = [
  {
    title: '1–4 Cameras',
    price: '300',
    icon: <Zap size={24} />,
    description: 'Ideal starting plan for small businesses and residential properties.',
    features: [
      '1–4 CCTV Channels',
      '24/7 Live Human Monitoring',
      'Instant Mobile Notifications',
      'Weekly Status Reports',
      'Remote App Access'
    ],
    highlight: false
  },
  {
    title: '5–10 Cameras',
    price: '500',
    icon: <ShieldCheck size={24} />,
    description: 'Enhanced surveillance for medium-sized facilities and offices.',
    features: [
      '5–10 CCTV Channels',
      'Emergency Contact Escalation',
      '24/7 Dedicated Surveillance',
      'Daily Performance Reports',
      'Multi-user Access Control',
      'On-site Guard Coordination'
    ],
    highlight: true
  },
  {
    title: 'Custom Packages',
    price: 'Custom',
    icon: <Globe size={24} />,
    description: 'Available based on your specific requirements and scope.',
    features: [
      'Unlimited CCTV Channels',
      'Multi-site Centralization',
      'AI Incident Detection',
      'Custom API & Dashboards',
      'Dedicated Account Manager',
      'Rapid Response Protocol'
    ],
    highlight: false
  }
];

const Pricing = () => {
  return (
    <section id="pricing" className="py-32 relative bg-primary-dark overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/5 rounded-full blur-[120px] -z-10"></div>
      
      <div className="container relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
           <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center px-4 py-1.5 rounded-full glass-accent border-accent/30 mb-6"
           >
              <span className="text-xs font-black uppercase tracking-widest text-accent">Investment Plans</span>
           </motion.div>
           <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-5xl md:text-6xl font-black text-white mb-8 tracking-tighter"
           >
              Transparent <span className="text-gradient">Pricing</span>
           </motion.h2>
           <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-xl text-white/50"
           >
              Choose a plan that scales with your growth and security requirements.
           </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {PRICING.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`relative p-10 rounded-[3rem] flex flex-col group transition-all duration-500 card-hover ${
                plan.highlight 
                  ? 'bg-gradient-to-br from-accent/10 to-transparent border-2 border-accent shadow-2xl shadow-accent/20' 
                  : 'glass border-white/5 hover:border-white/20'
              }`}
            >
              {plan.highlight && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-accent text-primary-dark text-[10px] font-black px-6 py-2 rounded-full uppercase tracking-[0.2em] shadow-xl shadow-accent/40">
                  Recommended
                </div>
              )}

              <div className="flex items-center justify-between mb-8">
                 <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${plan.highlight ? 'bg-accent text-primary-dark' : 'bg-white/5 text-white/70'}`}>
                    {plan.icon}
                 </div>
                 <h3 className="text-xl font-bold text-white/90">{plan.title}</h3>
              </div>
              
              <div className="flex items-baseline mb-4">
                {plan.price !== 'Custom' && <span className="text-2xl font-black text-accent mr-1">$</span>}
                <span className="text-6xl font-black text-white tracking-tighter">{plan.price}</span>
                {plan.price !== 'Custom' && <span className="text-white/30 text-sm ml-2 font-bold uppercase tracking-widest">/mo</span>}
              </div>
              
              <p className="text-white/40 text-sm mb-10 min-h-[40px] leading-relaxed italic">{plan.description}</p>

              <div className="space-y-4 mb-12 flex-grow">
                {plan.features.map((feature, fIndex) => (
                  <div key={fIndex} className="flex items-start space-x-3 text-sm text-white/60">
                    <Check size={18} className="text-accent shrink-0 mt-0.5" />
                    <span className="font-semibold">{feature}</span>
                  </div>
                ))}
              </div>

              <Link 
                href="/contact"
                className={`w-full py-5 rounded-[1.5rem] font-black uppercase text-xs tracking-[0.2em] transition-all duration-300 flex items-center justify-center ${
                plan.highlight 
                  ? 'bg-accent text-primary-dark hover:bg-white hover:scale-105 shadow-xl shadow-accent/20' 
                  : 'glass border-white/10 hover:bg-white/10 hover:border-white/30'
              }`}>
                {plan.price === 'Custom' ? 'Initiate Inquiry' : 'Secure Now'}
              </Link>
            </motion.div>
          ))}
        </div>
        
        <motion.div 
           initial={{ opacity: 0 }}
           whileInView={{ opacity: 1 }}
           viewport={{ once: true }}
           className="mt-20 glass p-8 rounded-[2rem] border-white/5 max-w-3xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6"
        >
           <div className="text-center md:text-left">
              <h5 className="text-white font-bold mb-1">Need a specialized setup?</h5>
              <p className="text-sm text-white/40">We offer custom configurations for high-security facilities.</p>
           </div>
           <Link 
             href="/contact"
             className="text-accent font-black uppercase tracking-widest text-xs py-3 px-8 rounded-full border border-accent/30 hover:bg-accent/10 transition-colors"
           >
              Request Audit
           </Link>
        </motion.div>
        
        <motion.p
           initial={{ opacity: 0 }}
           whileInView={{ opacity: 1 }}
           viewport={{ once: true }}
           className="mt-12 text-center text-xs text-white/30 italic max-w-2xl mx-auto"
        >
           * Final pricing may vary depending on the exact number of cameras and scope of monitoring services.
        </motion.p>
      </div>
    </section>
  );
};

export default Pricing;
