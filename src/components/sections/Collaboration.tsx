'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Handshake, MapPin, Phone, ShieldCheck, CheckCircle2, Globe, Shield } from 'lucide-react';

const Collaboration = () => {
  return (
    <section className="py-32 bg-primary-dark relative overflow-hidden">
      <div className="container relative z-10">
        <div className="glass p-12 md:p-20 rounded-[4rem] border-white/5 relative overflow-hidden mb-20">
          {/* Decorative background for the card */}
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-accent/5 to-transparent -z-10"></div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="inline-flex items-center space-x-2 px-4 py-2 rounded-full glass-accent mb-8 border-accent/20"
              >
                <Handshake size={20} className="text-accent" />
                <span className="text-xs font-black uppercase tracking-widest text-accent">Global Partnership</span>
              </motion.div>
              
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tighter leading-tight"
              >
                International <span className="text-gradient">Partnership</span>
              </motion.h2>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-xl text-white/60 mb-12 leading-relaxed"
              >
                Secure Watch 24 Services is proudly partnered with <span className="text-white font-bold text-2xl">Alpha Crime Control LLC</span>, a security company based in <span className="text-accent underline decoration-accent/20 underline-offset-4">Houston, Texas, USA</span>. 
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="space-y-4"
              >
                <h4 className="text-white font-black uppercase tracking-widest text-xs mb-4">Benefits of Partnership</h4>
                {[
                  'International Security Standards',
                  'Improved Monitoring Capabilities',
                  'Faster Response Coordination',
                  'Global-Level Service Quality',
                  'Enhanced Operational Standards'
                ].map((benefit, i) => (
                  <div key={i} className="flex items-center space-x-3 text-white/50">
                    <CheckCircle2 size={18} className="text-accent" />
                    <span className="font-semibold">{benefit}</span>
                  </div>
                ))}
              </motion.div>
            </div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-video glass rounded-[3rem] border-accent/20 flex flex-col items-center justify-center p-12 text-center group overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-50"></div>
                
                <div className="relative z-10">
                  <div className="w-24 h-24 bg-accent rounded-3xl flex items-center justify-center mb-8 mx-auto shadow-2xl shadow-accent/40 group-hover:scale-110 transition-transform duration-500">
                    <ShieldCheck size={48} className="text-primary-dark" />
                  </div>
                  <h3 className="text-2xl font-black text-white mb-4">International Standards</h3>
                  <p className="text-white/50 leading-relaxed max-w-sm">
                    Aligning with worldwide security protocols to ensure global-level service quality.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Registrations & Certifications */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
           <motion.div
             initial={{ opacity: 0, x: -20 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             className="glass p-10 rounded-[3rem] border-white/5 flex items-center justify-between group hover:border-accent/30 transition-all"
           >
              <div>
                 <h4 className="text-white/40 text-xs font-black uppercase tracking-widest mb-2">Member of</h4>
                 <h3 className="text-2xl font-black text-white group-hover:text-accent transition-colors">PSEB</h3>
                 <p className="text-white/40 text-sm italic">Pakistan Software Export Board</p>
              </div>
              <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center text-white/20 group-hover:bg-accent group-hover:text-primary-dark transition-all">
                 <Globe size={32} />
              </div>
           </motion.div>

           <motion.div
             initial={{ opacity: 0, x: 20 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             className="glass p-10 rounded-[3rem] border-white/5 flex items-center justify-between group hover:border-accent/30 transition-all"
           >
              <div>
                 <h4 className="text-white/40 text-xs font-black uppercase tracking-widest mb-2">Registered with</h4>
                 <h3 className="text-2xl font-black text-white group-hover:text-accent transition-colors">SECP</h3>
                 <p className="text-white/40 text-sm italic">Securities and Exchange Commission of Pakistan</p>
              </div>
              <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center text-white/20 group-hover:bg-accent group-hover:text-primary-dark transition-all">
                 <Shield size={32} />
              </div>
           </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
           <p className="text-xl font-black text-white/30 uppercase tracking-[0.5em]">Trusted Locally. Connected Globally.</p>
        </motion.div>
      </div>
    </section>
  );
};

export default Collaboration;
