'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Handshake, MapPin, Phone, ShieldCheck, CheckCircle2, Globe, Shield } from 'lucide-react';

const Collaboration = ({ data }: { data?: any }) => {
  const badge = data?.badge || 'Global Partnership';
  const title = data?.title || 'International';
  const titleAccent = data?.titleAccent || 'Partnership';
  const description = data?.description || 'Secure Watch 24 Services is proudly partnered with Alpha Crime Control LLC, a security company based in Houston, Texas, USA.';
  
  const points = data?.points || [
    'International Security Standards',
    'Improved Monitoring Capabilities',
    'Faster Response Coordination',
    'Global-Level Service Quality',
    'Enhanced Operational Standards'
  ];

  const usaAddress = data?.usaAddress || '7447 Harwin Drive, Houston, TX, USA';
  const usaPhone = data?.usaPhone || '+1 (281) 702-9418';

  return (
    <section className="py-20 bg-primary-dark relative overflow-hidden">
      <div className="container relative z-10">
        <div className="glass p-8 md:p-12 rounded-[2rem] border-white/5 relative overflow-hidden mb-12 hover:border-accent/20 transition-all duration-500">
          {/* Decorative background for the card */}
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-accent/5 to-transparent -z-10"></div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full glass-accent mb-6 border-accent/20"
              >
                <Handshake size={16} className="text-accent" />
                <span className="text-xs font-black uppercase tracking-widest text-accent">{badge}</span>
              </motion.div>
              
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-3xl md:text-5xl font-black text-white mb-6 tracking-tighter leading-tight"
              >
                {title} <span className="text-gradient">{titleAccent}</span>
              </motion.h2>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-lg text-white/60 mb-8 leading-relaxed"
              >
                {description}
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="space-y-3"
              >
                <h4 className="text-white font-black uppercase tracking-widest text-xs mb-3">Benefits of Partnership</h4>
                {points.map((benefit: string, i: number) => (
                  <div key={i} className="flex items-center space-x-3 text-white/50 hover:text-white/80 transition-colors duration-200">
                    <CheckCircle2 size={16} className="text-accent" />
                    <span className="font-semibold text-sm md:text-base">{benefit}</span>
                  </div>
                ))}
              </motion.div>

              {(usaAddress || usaPhone) && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="mt-8 pt-6 border-t border-white/5 grid grid-cols-1 sm:grid-cols-2 gap-4"
                >
                  {usaAddress && (
                    <div className="flex items-start space-x-3 p-4 bg-white/[0.02] border border-white/5 rounded-xl group/contact hover:border-accent/30 hover:bg-white/[0.04] transition-all duration-300">
                      <MapPin className="text-accent shrink-0 mt-1 group-hover/contact:scale-110 transition-transform" size={20} />
                      <div>
                        <h5 className="text-white font-bold text-sm">USA Headquarters</h5>
                        <p className="text-white/40 text-xs italic mt-0.5 leading-relaxed">{usaAddress}</p>
                      </div>
                    </div>
                  )}
                  {usaPhone && (
                    <div className="flex items-start space-x-3 p-4 bg-white/[0.02] border border-white/5 rounded-xl group/contact hover:border-accent/30 hover:bg-white/[0.04] transition-all duration-300">
                      <Phone className="text-accent shrink-0 mt-1 group-hover/contact:scale-110 transition-transform" size={20} />
                      <div>
                        <h5 className="text-white font-bold text-sm">Direct Contact</h5>
                        <p className="text-white/40 text-xs italic mt-0.5 leading-relaxed">{usaPhone}</p>
                      </div>
                    </div>
                  )}
                </motion.div>
              )}
            </div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-video glass rounded-[1.5rem] border-accent/20 flex flex-col items-center justify-center p-8 text-center group overflow-hidden hover:border-accent/40 hover:shadow-[0_0_30px_rgba(34,211,238,0.1)] transition-all duration-500">
                <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-50"></div>
                
                <div className="relative z-10">
                  <div className="w-20 h-20 bg-accent rounded-2xl flex items-center justify-center mb-6 mx-auto shadow-xl shadow-accent/20 group-hover:scale-105 transition-transform duration-500">
                    <ShieldCheck size={40} className="text-primary-dark" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-black text-white mb-3">International Standards</h3>
                  <p className="text-white/50 leading-relaxed text-sm md:text-base max-w-xs mx-auto">
                    Aligning with worldwide security protocols to ensure global-level service quality.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Registrations & Certifications */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           <motion.div
             initial={{ opacity: 0, x: -20 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             className="glass p-6 md:p-8 rounded-[1.5rem] border-white/5 flex items-center justify-between group hover:border-accent/30 hover:shadow-[0_0_25px_rgba(34,211,238,0.05)] transition-all duration-500"
           >
              <div>
                 <h4 className="text-white/40 text-xs font-black uppercase tracking-widest mb-1.5">Member of</h4>
                 <h3 className="text-2xl font-black text-white group-hover:text-accent transition-colors">PSEB</h3>
                 <p className="text-white/40 text-sm italic">Pakistan Software Export Board</p>
              </div>
              <div className="w-14 h-14 rounded-xl bg-white/5 flex items-center justify-center text-white/20 group-hover:bg-accent group-hover:text-primary-dark transition-all">
                 <Globe size={28} />
              </div>
           </motion.div>

           <motion.div
             initial={{ opacity: 0, x: 20 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             className="glass p-6 md:p-8 rounded-[1.5rem] border-white/5 flex items-center justify-between group hover:border-accent/30 hover:shadow-[0_0_25px_rgba(34,211,238,0.05)] transition-all duration-500"
           >
              <div>
                 <h4 className="text-white/40 text-xs font-black uppercase tracking-widest mb-1.5">Registered with</h4>
                 <h3 className="text-2xl font-black text-white group-hover:text-accent transition-colors">SECP</h3>
                 <p className="text-white/40 text-sm italic">Securities and Exchange Commission of Pakistan</p>
              </div>
              <div className="w-14 h-14 rounded-xl bg-white/5 flex items-center justify-center text-white/20 group-hover:bg-accent group-hover:text-primary-dark transition-all">
                 <Shield size={28} />
              </div>
           </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
           <p className="text-base md:text-lg font-black text-white/30 uppercase tracking-[0.5em]">Trusted Locally. Connected Globally.</p>
        </motion.div>
      </div>
    </section>
  );
};

export default Collaboration;
