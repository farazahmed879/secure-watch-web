'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, ArrowRight, Zap, Target, Camera, Activity, Wifi } from 'lucide-react';
import Image from 'next/image';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-32 lg:pt-40 overflow-hidden bg-primary-dark">
      {/* Dynamic Background */}
      <div className="absolute inset-0 z-0">
        <Image 
          src="/hero-bg.png" 
          alt="Security background" 
          fill 
          className="object-cover opacity-40 mix-blend-overlay"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-primary-dark via-primary-dark/80 to-primary-dark"></div>
        <div className="absolute inset-0 bg-mesh opacity-50"></div>
      </div>

      {/* Decorative Glows */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-accent/20 rounded-full blur-[120px] -z-10 animate-pulse-slow"></div>
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] -z-10 animate-pulse-slow" style={{ animationDelay: '2s' }}></div>

      <div className="container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="max-w-3xl">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center space-x-2 px-6 py-2 rounded-full glass-accent mt-12 lg:mt-0 mb-10 border-accent/30"
            >
              <div className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-accent"></span>
              </div>
              <span className="text-xs font-black tracking-[0.2em] text-accent uppercase">Security That Never Sleeps</span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-6xl md:text-8xl font-black mb-8 leading-[1.1] tracking-tighter"
            >
              Securing Your<br />
              <span className="text-gradient">World 24 Hours a Day</span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl md:text-2xl text-white/60 max-w-2xl mb-12 leading-relaxed"
            >
              Secure Watch is a professional security monitoring company specializing in 24/7 CCTV surveillance and remote security management. We deliver reliable, real-time monitoring solutions designed to protect properties, assets, and people with maximum efficiency and vigilance.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row items-center gap-6 sm:gap-8 justify-center lg:justify-start"
            >
              <button className="btn-primary flex items-center group w-full sm:w-auto justify-center">
                Get Protected Today
                <ShieldCheck className="ml-3 group-hover:rotate-12 transition-transform" size={24} />
              </button>
              <button className="btn-outline flex items-center group w-full sm:w-auto justify-center">
                Explore Services
                <ArrowRight className="ml-3 group-hover:translate-x-2 transition-transform" size={24} />
              </button>
            </motion.div>

            {/* Stats Preview */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1 }}
              className="mt-20 grid grid-cols-2 sm:grid-cols-4 gap-12 w-full max-w-4xl border-t border-white/10 pt-12"
            >
              <StatItem number="10+" label="Happy Clients" />
              <StatItem number="24/7" label="Monitoring" />
              <StatItem number="15+" label="Countries" />
              <StatItem number="99.9%" label="Uptime" />
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="hidden lg:block relative"
          >
            <div className="absolute inset-0 bg-accent/20 rounded-[4rem] blur-[80px] -z-10 rotate-12"></div>
            <div className="relative aspect-square glass rounded-[4rem] p-12 border-accent/20 overflow-hidden group">
               <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-transparent"></div>
               <div className="relative h-full w-full flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                     <div className="w-20 h-20 rounded-3xl bg-accent flex items-center justify-center shadow-2xl shadow-accent/40">
                        <Target size={40} className="text-primary-dark" />
                     </div>
                     <div className="px-4 py-2 glass-accent rounded-2xl border-accent/30">
                        <span className="text-accent font-black text-sm uppercase tracking-widest">Active Scan</span>
                     </div>
                  </div>
                  
                  {/* Radar/Central Visual */}
                  <div className="flex-1 flex items-center justify-center relative my-8">
                     <div className="absolute w-48 h-48 border border-accent/20 rounded-full animate-ping opacity-25"></div>
                     <div className="absolute w-32 h-32 border border-accent/40 rounded-full"></div>
                     <div className="relative w-40 h-40">
                        <div className="absolute inset-0 bg-accent/5 rounded-full border border-accent/10"></div>
                        <motion.div 
                          animate={{ rotate: 360 }}
                          transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
                          className="absolute inset-0 border-t-4 border-accent rounded-full opacity-50 shadow-[0_0_15px_rgba(34,211,238,0.5)]"
                        ></motion.div>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                           <Activity className="text-accent animate-pulse" size={48} />
                           <span className="text-[10px] uppercase tracking-tighter text-white font-black mt-2 opacity-50">Secure Zone</span>
                        </div>
                     </div>
                  </div>

                  <div className="space-y-6">
                    <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                       <motion.div 
                        animate={{ x: ['-100%', '300%'] }}
                        transition={{ repeat: Infinity, duration: 3, ease: 'linear' }}
                        className="h-full w-1/4 bg-accent"
                       />
                    </div>
                     <div className="grid grid-cols-3 gap-4">
                        <div className="p-4 glass-accent rounded-2xl border-accent/10 flex flex-col items-center justify-center space-y-2">
                           <Camera size={18} className="text-accent" />
                           <div className="flex flex-col items-center">
                              <span className="text-[8px] text-white/40 uppercase font-bold">Cam 04</span>
                              <span className="text-[10px] text-white font-black uppercase">Live</span>
                           </div>
                        </div>
                        <div className="p-4 glass-accent rounded-2xl border-accent/10 flex flex-col items-center justify-center space-y-2">
                           <Activity size={18} className="text-success" />
                           <div className="flex flex-col items-center">
                              <span className="text-[8px] text-white/40 uppercase font-bold">Risk</span>
                              <span className="text-[10px] text-white font-black uppercase">0%</span>
                           </div>
                        </div>
                        <div className="p-4 glass-accent rounded-2xl border-accent/10 flex flex-col items-center justify-center space-y-2">
                           <Wifi size={18} className="text-accent" />
                           <div className="flex flex-col items-center">
                              <span className="text-[8px] text-white/40 uppercase font-bold">Sync</span>
                              <span className="text-[10px] text-white font-black uppercase">0.4ms</span>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
            
            {/* Floating Elements */}
            <motion.div 
              animate={{ y: [-10, 10, -10] }}
              transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
              className="absolute -top-10 -right-10 glass px-6 py-4 rounded-3xl border-accent/40 shadow-2xl"
            >
              <div className="flex items-center space-x-3">
                 <div className="w-10 h-10 bg-success/20 rounded-full flex items-center justify-center">
                    <Zap className="text-success" size={20} />
                 </div>
                 <div>
                    <div className="text-xs text-white/50 font-bold uppercase tracking-widest">Detection</div>
                    <div className="text-sm font-black text-white">0.02s Response</div>
                 </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const StatItem = ({ number, label }: { number: string, label: string }) => (
  <div className="flex flex-col">
    <span className="text-4xl md:text-5xl font-black text-white mb-2 tabular-nums">{number}</span>
    <span className="text-[10px] uppercase tracking-[0.3em] text-white/40 font-black leading-tight italic">{label}</span>
  </div>
);

export default Hero;
