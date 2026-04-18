'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Handshake, MapPin, Phone, ShieldCheck } from 'lucide-react';

const Collaboration = () => {
  return (
    <section className="py-32 bg-primary-dark relative overflow-hidden">
      <div className="container relative z-10">
        <div className="glass p-12 md:p-20 rounded-[4rem] border-white/5 relative overflow-hidden">
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
                International <span className="text-gradient">Collaboration</span>
              </motion.h2>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-xl text-white/60 mb-12 leading-relaxed"
              >
                Secure Watch is proudly linked with <span className="text-white font-bold text-2xl">Alpha Crime Control</span>, an established security firm in <span className="text-accent underline decoration-accent/20 underline-offset-4">Houston, USA</span>. 
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="space-y-6"
              >
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                    <MapPin className="text-accent" size={24} />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-lg mb-1">USA Headquarters</h4>
                    <p className="text-white/40 italic">7447 Harwin Drive, Houston, TX, USA</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                    <Phone className="text-accent" size={24} />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-lg mb-1">Direct Contact</h4>
                    <p className="text-white/40 italic">+1 (281) 702-9418</p>
                  </div>
                </div>
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
                    This collaboration strengthens our operational standards and service reliability by aligning with worldwide security protocols.
                  </p>
                </div>
                
                {/* Visual Accent */}
                <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-accent/10 rounded-full blur-3xl"></div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Collaboration;
