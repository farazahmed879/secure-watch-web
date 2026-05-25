'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Monitor, FileSearch, Users, Clock, Shield, Globe, Zap, Camera, Lock, Target, Activity, Bell } from 'lucide-react';

const SERVICES = [
  {
    icon: <Clock size={32} />,
    title: '24/7 Live Monitoring',
    description: 'Our trained operators monitor live camera feeds and instantly respond to suspicious activities.'
  },
  {
    icon: <Monitor size={32} />,
    title: 'High-Definition Support',
    description: 'Full compatibility with modern HD and 4K camera systems for maximum clarity and detail.'
  },
  {
    icon: <Zap size={32} />,
    title: 'Real-Time Alerts',
    description: 'Instant notifications sent to your mobile device or security staff the moment a threat is detected.'
  },
  {
    icon: <FileSearch size={32} />,
    title: 'Suspicious Activity Detection',
    description: 'Advanced monitoring to identify patterns of interest before incidents escalate into security breaches.'
  },
  {
    icon: <Users size={32} />,
    title: 'Trained Operators',
    description: 'Professional security personnel specifically trained in remote surveillance and tactical response.'
  },
  {
    icon: <Globe size={32} />,
    title: 'Emergency Coordination',
    description: 'Immediate escalation to local authorities and emergency services during critical security incidents.'
  }
];

const Services = ({ data }: { data?: any }) => {
  const badge = data?.badge || 'Our Services';
  const title = data?.title || 'Advanced';
  const titleAccent = data?.titleAccent || 'CCTV Monitoring';
  const description = data?.description || 'Our advanced CCTV monitoring services provide 24/7 surveillance using modern technology and trained operators to detect threats, monitor activity, and respond instantly.';

  const servicesList = data?.servicesList || [
    {
      title: '24/7 Live Monitoring',
      description: 'Our trained operators monitor live camera feeds and instantly respond to suspicious activities.',
      badge: 'Popular'
    },
    {
      title: 'High-Definition Support',
      description: 'Full compatibility with modern HD and 4K camera systems for maximum clarity and detail.',
      badge: 'Advanced'
    },
    {
      title: 'Real-Time Alerts',
      description: 'Instant notifications sent to your mobile device or security staff the moment a threat is detected.',
      badge: 'Critical'
    },
    {
      title: 'Suspicious Activity Detection',
      description: 'Advanced monitoring to identify patterns of interest before incidents escalate into security breaches.',
      badge: 'Standard'
    },
    {
      title: 'Trained Operators',
      description: 'Professional security personnel specifically trained in remote surveillance and tactical response.',
      badge: 'Expert'
    },
    {
      title: 'Emergency Coordination',
      description: 'Immediate escalation to local authorities and emergency services during critical security incidents.',
      badge: 'Core'
    }
  ];

  const getServiceIcon = (service: any, idx: number) => {
    const iconName = service.icon?.toLowerCase();
    switch (iconName) {
      case 'clock': return <Clock size={32} key="clock" />;
      case 'monitor': return <Monitor size={32} key="monitor" />;
      case 'zap': return <Zap size={32} key="zap" />;
      case 'filesearch': return <FileSearch size={32} key="search" />;
      case 'users': return <Users size={32} key="users" />;
      case 'globe': return <Globe size={32} key="globe" />;
      case 'shield': return <Shield size={32} key="shield" />;
      case 'camera': return <Camera size={32} key="camera" />;
      case 'lock': return <Lock size={32} key="lock" />;
      case 'target': return <Target size={32} key="target" />;
      case 'activity': return <Activity size={32} key="activity" />;
      case 'bell': return <Bell size={32} key="bell" />;
      default:
        const fallbackIcons = [
          <Clock size={32} key="clock" />,
          <Monitor size={32} key="monitor" />,
          <Zap size={32} key="zap" />,
          <FileSearch size={32} key="search" />,
          <Users size={32} key="users" />,
          <Globe size={32} key="globe" />
        ];
        return fallbackIcons[idx % fallbackIcons.length];
    }
  };

  const getGridCols = (count: number) => {
    if (count <= 1) return 'grid-cols-1';
    if (count === 2) return 'grid-cols-1 md:grid-cols-2';
    return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3';
  };

  return (
    <section id="services" className="py-32 bg-primary-dark relative overflow-hidden">
      {/* Background patterns */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent"></div>
      
      <div className="container relative z-10">
        <div className="max-w-3xl mb-20">
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
              className="text-5xl md:text-6xl font-black text-white mb-8 tracking-tighter"
           >
              {title} <span className="text-accent">{titleAccent}</span>
           </motion.h2>
           <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-xl text-white/50 leading-relaxed"
           >
              {description}
           </motion.p>
        </div>

        <div className={`grid ${getGridCols(servicesList.length)} gap-8`}>
          {servicesList.map((service: any, index: number) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[2.5rem] blur-2xl -z-10"></div>
              
              <div className="glass p-10 rounded-[2.5rem] border-white/5 group-hover:border-accent/30 transition-all duration-500 h-full flex flex-col items-start card-hover">
                <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center mb-8 text-accent group-hover:bg-accent group-hover:text-primary-dark transition-all duration-500 group-hover:-rotate-6">
                  {getServiceIcon(service, index)}
                </div>
                <div className="flex justify-between items-center w-full mb-4">
                  <h3 className="text-2xl font-black text-white group-hover:text-accent transition-colors">{service.title}</h3>
                  {service.badge && (
                    <span className="text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full bg-accent/10 text-accent border border-accent/20">
                      {service.badge}
                    </span>
                  )}
                </div>
                <p className="text-white/50 leading-relaxed group-hover:text-white/80 transition-colors">{service.description}</p>
                
                <div className="mt-8 pt-8 border-t border-white/5 w-full flex items-center justify-between opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                   <span className="text-xs font-black uppercase tracking-widest text-accent">Learn More</span>
                   <Shield size={16} className="text-accent" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
