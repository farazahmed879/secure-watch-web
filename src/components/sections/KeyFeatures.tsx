'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ShieldAlert, Zap, Bell, Users, Laptop, Activity, Lock, Globe, Camera, Target } from 'lucide-react';


const getIcon = (iconName: string, idx: number) => {
  switch (iconName?.toLowerCase()) {
    case 'activity': return <Activity className="text-accent group-hover:text-primary-dark transition-colors" size={32} />;
    case 'shieldalert': return <ShieldAlert className="text-accent group-hover:text-primary-dark transition-colors" size={32} />;
    case 'bell': return <Bell className="text-accent group-hover:text-primary-dark transition-colors" size={32} />;
    case 'users': return <Users className="text-accent group-hover:text-primary-dark transition-colors" size={32} />;
    case 'laptop': return <Laptop className="text-accent group-hover:text-primary-dark transition-colors" size={32} />;
    case 'lock': return <Lock className="text-accent group-hover:text-primary-dark transition-colors" size={32} />;
    case 'globe': return <Globe className="text-accent group-hover:text-primary-dark transition-colors" size={32} />;
    case 'zap': return <Zap className="text-accent group-hover:text-primary-dark transition-colors" size={32} />;
    case 'camera': return <Camera className="text-accent group-hover:text-primary-dark transition-colors" size={32} />;
    case 'target': return <Target className="text-accent group-hover:text-primary-dark transition-colors" size={32} />;
    default:
      // Fallback matching by index to retain original icons
      if (idx === 0) return <Activity className="text-accent group-hover:text-primary-dark transition-colors" size={32} />;
      if (idx === 1) return <ShieldAlert className="text-accent group-hover:text-primary-dark transition-colors" size={32} />;
      if (idx === 2) return <Bell className="text-accent group-hover:text-primary-dark transition-colors" size={32} />;
      return <Users className="text-accent group-hover:text-primary-dark transition-colors" size={32} />;
  }
};

const KeyFeatures = ({ data }: { data?: any }) => {
  const featuresList = data?.features || [
    {
      title: '24/7 Live Monitoring',
      description: 'Uninterrupted surveillance of your property by our professional team.',
      icon: 'Activity'
    },
    {
      title: 'Real-Time Threat Detection',
      description: 'Advanced algorithms and human expertise to identify suspicious activity instantly.',
      icon: 'ShieldAlert'
    },
    {
      title: 'Instant Alerts',
      description: 'Get notified immediately via app, email, or SMS the moment an incident occurs.',
      icon: 'Bell'
    },
    {
      title: 'Professional Security Team',
      description: 'Trained experts dedicated to your safety and rapid incident response.',
      icon: 'Users'
    }
  ];

  const getGridCols = (count: number) => {
    if (count <= 1) return 'grid-cols-1';
    if (count === 2) return 'grid-cols-1 md:grid-cols-2';
    if (count === 3) return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3';
    return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4';
  };

  return (
    <section className="py-24 bg-primary-dark/50">
      <div className="container">
        <div className={`grid ${getGridCols(featuresList.length)} gap-8`}>
          {featuresList.map((feature: any, index: number) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="glass p-8 rounded-[2.5rem] border-white/5 hover:border-accent/30 transition-all duration-500 group card-hover"
            >
              <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center mb-6 group-hover:bg-accent group-hover:text-primary-dark transition-all duration-500 group-hover:-rotate-6">
                {getIcon(feature.icon, index)}
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
