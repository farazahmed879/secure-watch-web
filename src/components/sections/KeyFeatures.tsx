'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ShieldAlert, Zap, Bell, Users, Laptop, Activity, Lock, Globe } from 'lucide-react';

const FEATURES = [
  {
    icon: <Activity className="text-accent" size={32} />,
    title: '24/7 Live Monitoring',
    description: 'Uninterrupted surveillance of your property by our professional team.'
  },
  {
    icon: <ShieldAlert className="text-accent" size={32} />,
    title: 'Real-Time Threat Detection',
    description: 'Advanced algorithms and human expertise to identify suspicious activity instantly.'
  },
  {
    icon: <Bell className="text-accent" size={32} />,
    title: 'Instant Alerts',
    description: 'Get notified immediately via app, email, or SMS the moment an incident occurs.'
  },
  {
    icon: <Users className="text-accent" size={32} />,
    title: 'Professional Security Team',
    description: 'Trained experts dedicated to your safety and rapid incident response.'
  }
];

const KeyFeatures = () => {
  return (
    <section className="py-24 bg-primary-dark/50">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {FEATURES.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="glass p-8 rounded-[2.5rem] border-white/5 hover:border-accent/30 transition-all duration-500 group card-hover"
            >
              <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center mb-6 group-hover:bg-accent group-hover:text-primary-dark transition-all duration-500 group-hover:-rotate-6">
                {feature.icon}
              </div>
              <h3 className="text-xl font-black text-white mb-4 group-hover:text-accent transition-colors">{feature.title}</h3>
              <p className="text-white/40 text-sm leading-relaxed group-hover:text-white/60 transition-colors">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default KeyFeatures;
