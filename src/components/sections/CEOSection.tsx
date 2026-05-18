'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Linkedin, Quote } from 'lucide-react';
import Image from 'next/image';

const CEOSection = ({ data }: { data?: any }) => {
  const badge = data?.badge || 'A Message From Our Leader';
  const title = data?.title || 'Integrity. Vigilance. Trust.';
  const quote = data?.quote || 'Secure Watch 24 Services is committed to delivering reliable security monitoring solutions that help businesses and individuals stay protected 24/7.';
  const ceoName = data?.ceoName || 'Mr. Muzaffar Ali';
  const ceoRole = data?.ceoRole || 'Founder & CEO';
  const signatureText = data?.signatureText || 'Core Leadership Principles';

  return (
    <section className="py-32 bg-primary-dark relative overflow-hidden">
      <div className="container relative z-10">
        <div className="glass p-12 md:p-20 rounded-[4rem] border-white/5 relative overflow-hidden">
          {/* Decorative background */}
          <div className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-r from-accent/10 to-transparent -z-10"></div>
          
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 items-center">
            {/* CEO Image Container */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="lg:col-span-2 relative aspect-[4/5] rounded-[3rem] overflow-hidden group"
            >
              <div className="absolute inset-0 bg-accent/20 group-hover:bg-transparent transition-colors duration-500 z-10"></div>
              <div className="flex items-center justify-center h-full bg-primary-light/50">
                 <span className="text-white/20 font-black text-8xl">MA</span>
              </div>
              <div className="absolute bottom-0 left-0 w-full p-8 z-20 bg-gradient-to-t from-primary-dark via-primary-dark/50 to-transparent">
                 <h3 className="text-3xl font-black text-white">{ceoName}</h3>
                 <p className="text-accent font-black uppercase tracking-widest text-xs">{ceoRole}</p>
              </div>
            </motion.div>
 
            {/* Content */}
            <div className="lg:col-span-3">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative"
              >
                <Quote size={80} className="text-accent/10 absolute -top-12 -left-8 -z-10" />
                
                <h4 className="text-white/40 text-xs font-black uppercase tracking-widest mb-6">{badge}</h4>
                <h2 className="text-4xl md:text-5xl font-black text-white mb-10 tracking-tighter leading-tight italic">
                  "{quote}"
                </h2>
 
                <div className="flex flex-col sm:flex-row items-center gap-8 pt-8 border-t border-white/5">
                   <a 
                     href="https://linkedin.com/in/muzaffarali1493" 
                     target="_blank" 
                     rel="noopener noreferrer"
                     className="flex items-center space-x-3 text-white/50 hover:text-[#0077b5] transition-colors group"
                   >
                      <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-[#0077b5]/10 transition-all">
                         <Linkedin size={24} />
                      </div>
                      <span className="font-bold">Connect on LinkedIn</span>
                   </a>
                   
                   <div className="hidden sm:block w-px h-12 bg-white/5"></div>
                   
                   <div className="text-center sm:text-left">
                      <p className="text-white font-black text-lg">{title}</p>
                      <p className="text-white/30 text-xs uppercase tracking-widest font-bold">{signatureText}</p>
                   </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CEOSection;
