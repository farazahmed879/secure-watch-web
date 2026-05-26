'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Linkedin, Quote, Shield, Award, CheckCircle2 } from 'lucide-react';
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
      {/* Premium background radial glows */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[140px] pointer-events-none -z-10 animate-pulse-slow"></div>
      <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none -z-10" style={{ animationDelay: '2s' }}></div>

      <div className="container relative z-10">
        <div className="relative glass p-8 md:p-16 lg:p-24 rounded-3xl border border-white/5 overflow-hidden shadow-2xl">
          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-tr from-primary-dark/80 via-transparent to-accent/5 pointer-events-none -z-10"></div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            {/* Left side: CEO Photo with premium framing */}
            <div className="lg:col-span-5 flex justify-center w-full">
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="relative w-full max-w-[380px] aspect-[3/4] rounded-2xl overflow-hidden group shadow-2xl border border-white/10"
              >
                {/* Accent border frame overlay */}
                <div className="absolute inset-0 border-2 border-accent/20 rounded-2xl z-20 pointer-events-none transition-colors duration-500 group-hover:border-accent/40"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-primary-dark via-transparent to-transparent opacity-85 group-hover:opacity-70 transition-opacity duration-500 z-10"></div>

                {data?.imageUrl ? (
                  <Image 
                    src={data.imageUrl} 
                    alt={ceoName} 
                    fill 
                    className="object-cover transition-transform duration-700 group-hover:scale-105" 
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-primary-light to-primary-dark flex flex-col items-center justify-center space-y-4">
                    <div className="w-20 h-20 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center">
                      <Shield className="text-accent" size={36} />
                    </div>
                    <span className="text-white/20 font-black tracking-widest text-[10px] uppercase">Secure Watch 24</span>
                  </div>
                )}

                {/* Name & Title Overlay */}
                <div className="absolute bottom-0 left-0 w-full p-8 z-20">
                  <div className="glass-accent inline-flex items-center space-x-2 px-4 py-1.5 rounded-full border-accent/30 mb-3">
                    <Award size={14} className="text-accent" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-accent">FOUNDER MESSAGE</span>
                  </div>
                  <h3 className="text-2xl font-black text-white leading-none tracking-tight">{ceoName}</h3>
                  <p className="text-white/50 text-xs font-bold mt-1 uppercase tracking-wider">{ceoRole}</p>
                </div>
              </motion.div>
            </div>

            {/* Right side: Editorial Quote and LinkedIn */}
            <div className="lg:col-span-7 space-y-8">
              <motion.div
                initial={{ opacity: 0, x: 35 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="space-y-6"
              >
                {/* Quote Header Indicator */}
                <div className="flex items-center space-x-3">
                  <span className="h-[2px] w-8 bg-accent rounded-full"></span>
                  <span className="text-accent font-black tracking-[0.25em] text-xs uppercase">{badge}</span>
                </div>

                {/* Elegant quotes */}
                <div className="relative">
                  <Quote size={120} className="text-accent/5 absolute -top-16 -left-10 pointer-events-none" />
                  <p className="text-2xl md:text-3xl lg:text-4xl font-bold text-white/95 leading-relaxed tracking-tight italic font-serif">
                    "{quote}"
                  </p>
                </div>

                {/* Divider Line */}
                <div className="h-[1px] w-full bg-gradient-to-r from-white/10 to-transparent my-6"></div>

                {/* Signature and Core message detail */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                  <div>
                    <h5 className="text-white font-black text-lg tracking-tight uppercase">{title}</h5>
                    <p className="text-white/40 text-xs font-bold uppercase tracking-widest mt-1 flex items-center gap-1.5">
                      <CheckCircle2 size={12} className="text-accent" />
                      {signatureText}
                    </p>
                  </div>

                  <a 
                    href="https://linkedin.com/in/muzaffarali1493" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-3 text-white/70 hover:text-white bg-white/5 hover:bg-accent/15 border border-white/10 hover:border-accent/40 px-6 py-3.5 rounded-2xl transition-all duration-300 transform hover:-translate-y-0.5 shadow-xl hover:shadow-accent/5 cursor-pointer"
                  >
                    <Linkedin size={18} className="text-accent" />
                    <span className="text-xs font-black uppercase tracking-widest">Connect on LinkedIn</span>
                  </a>
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
