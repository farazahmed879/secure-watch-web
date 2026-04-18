'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Monitor, FileSearch, Users, Clock, Shield, Globe, Zap } from 'lucide-react';

const SERVICES = [
  {
    icon: <Users size={32} />,
    title: 'Professional Monitoring Team',
    description: 'Our expert security personnel are trained for high-vigilance monitoring, ensuring professional-grade security for your assets.'
  },
  {
    icon: <Clock size={32} />,
    title: 'Rapid Response Time',
    description: 'Instant detection and immediate action to mitigate security risks the moment they are identified by our systems.'
  },
  {
    icon: <FileSearch size={32} />,
    title: 'Accurate Incident Reporting',
    description: 'Meticulous and detailed reports of every detected security event, providing full transparency and accountability.'
  },
  {
    icon: <Monitor size={32} />,
    title: 'Customizable Monitoring Plans',
    description: 'Security solutions tailored specifically to your project requirements and unique facility challenges.'
  },
  {
    icon: <Globe size={32} />,
    title: 'Global Remote Capability',
    description: 'Professional surveillance management across borders and time zones, leveraging our international infrastructure.'
  },
  {
    icon: <Zap size={32} />,
    title: 'Cost-Effective Solutions',
    description: 'Save up to 70% compared to traditional on-ground security personnel while maintaining higher vigilance levels.'
  }
];

const Services = () => {
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
              <span className="text-sm font-black uppercase tracking-[0.3em]">Our Specialization</span>
           </motion.div>
           <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-5xl md:text-6xl font-black text-white mb-8 tracking-tighter"
           >
              Comprehensive <span className="text-accent">Security</span> Ecosystem
           </motion.h2>
           <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-xl text-white/50 leading-relaxed"
           >
              Advanced surveillance solutions designed for maximum mitigation of risks and rapid response to complex security challenges.
           </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES.map((service, index) => (
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
                  {service.icon}
                </div>
                <h3 className="text-2xl font-black mb-4 text-white group-hover:text-accent transition-colors">{service.title}</h3>
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
