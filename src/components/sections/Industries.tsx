'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Home, Building2, Store, Warehouse, Construction, Briefcase, ChevronRight, Shield, Zap } from 'lucide-react';

const INDUSTRIES = [
  { icon: <Briefcase size={28} />, name: 'Corporate Offices', description: 'High-rise & executive facilities' },
  { icon: <Store size={28} />, name: 'Retail Stores', description: 'Shops & shopping centers' },
  { icon: <Warehouse size={28} />, name: 'Industrial Facilities', description: 'Factories & manufacturing plants' },
  { icon: <Building2 size={28} />, name: 'Educational Institutions', description: 'Schools, colleges & universities' },
  { icon: <Shield size={28} />, name: 'Healthcare Facilities', description: 'Hospitals & medical centers' },
  { icon: <Home size={28} />, name: 'Residential Communities', description: 'Gated communities & luxury homes' },
  { icon: <Zap size={28} />, name: 'Gas Stations', description: '24/7 fuel station monitoring' },
  { icon: <Store size={28} />, name: 'Restaurants', description: 'Dining & hospitality security' },
  { icon: <Building2 size={28} />, name: 'Hotels', description: 'Guest safety & asset protection' },
  { icon: <Warehouse size={28} />, name: 'Warehouses & Logistics', description: 'Supply chain & storage security' },
  { icon: <Construction size={28} />, name: 'Parking Lots', description: 'Vehicle safety & surveillance' },
  { icon: <Construction size={28} />, name: 'Construction Sites', description: 'Equipment & perimeter security' }
];

const Industries = () => {
  return (
    <section id="industries" className="py-32 bg-primary-dark/80 relative">
      <div className="container relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
           <div className="max-w-xl">
              <motion.div
                 initial={{ opacity: 0, x: -20 }}
                 whileInView={{ opacity: 1, x: 0 }}
                 viewport={{ once: true }}
                 className="flex items-center space-x-3 text-accent mb-6"
              >
                 <div className="w-12 h-0.5 bg-accent"></div>
                 <span className="text-sm font-black uppercase tracking-[0.3em]">Industries We Serve</span>
              </motion.div>
              <motion.h2
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 className="text-5xl md:text-6xl font-black text-white tracking-tighter"
              >
                 Smart Surveillance <span className="text-accent underline decoration-accent/20 underline-offset-8">Solutions</span>
              </motion.h2>
           </div>
           <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-lg text-white/50 max-w-sm italic leading-relaxed"
           >
              We provide smart surveillance and monitoring solutions tailored to the unique needs of multiple industries to ensure safety, theft prevention, operational monitoring, and complete security.
           </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {INDUSTRIES.map((industry, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="glass p-8 rounded-[2rem] flex items-center space-x-6 group hover:bg-white/5 transition-all duration-500 border-white/5 hover:border-accent/40 cursor-pointer"
            >
              <div className="w-16 h-16 rounded-2xl bg-primary-light flex items-center justify-center text-white/40 group-hover:text-accent group-hover:scale-110 transition-all duration-500 group-hover:shadow-[0_0_30px_rgba(34,211,238,0.2)]">
                {industry.icon}
              </div>
              <div className="flex-grow">
                 <h4 className="text-lg font-black text-white group-hover:text-accent transition-colors">{industry.name}</h4>
                 <p className="text-sm text-white/40 group-hover:text-white/60 transition-colors">{industry.description}</p>
              </div>
              <ChevronRight size={20} className="text-white/10 group-hover:text-accent group-hover:translate-x-1 transition-all" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Industries;
