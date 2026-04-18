"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, ArrowRight, Zap, Target, Camera, Activity, Wifi } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const HERO_IMAGES = [
  '/monitor-1.png',
  '/monitor-2.png',
  '/monitor-3.png',
];

const Hero = () => {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center pt-12 lg:pt-20 overflow-hidden bg-primary-dark">
      {/* Dynamic Background Carousel */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentImage}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 0.8, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <Image 
              src={HERO_IMAGES[currentImage]} 
              alt="Security background" 
              fill 
              className="object-cover mix-blend-overlay"
              priority
            />
          </motion.div>
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-b from-primary-dark via-primary-dark/60 to-primary-dark"></div>
        <div className="absolute inset-0 bg-mesh opacity-30"></div>
        
        {/* Slide Indicators - Moved to right side to avoid overlap */}
        <div className="absolute right-8 md:right-12 top-1/2 -translate-y-1/2 flex flex-col space-y-4 z-20">
          {HERO_IMAGES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentImage(idx)}
              className={`w-1 md:w-1.5 transition-all duration-500 rounded-full ${
                idx === currentImage ? 'h-16 bg-accent' : 'h-8 bg-white/20 hover:bg-white/40'
              }`}
            />
          ))}
        </div>
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
              className="inline-flex items-center space-x-2 px-6 py-1 rounded-full glass-accent mt-4 lg:mt-2 mb-4 border-accent/30"
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
              className="text-5xl md:text-7xl font-black mb-2 leading-[1.1] tracking-tighter"
            >
              Securing Your<br />
              <span className="text-gradient">World 24 Hours a Day</span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg md:text-xl text-white/80 max-w-2xl mb-4 leading-relaxed"
            >
              Secure Watch is a professional security monitoring company specializing in 24/7 CCTV surveillance and remote security management. We deliver reliable, real-time monitoring solutions designed to protect properties, assets, and people with maximum efficiency and vigilance.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row items-center gap-6 sm:gap-8 justify-center lg:justify-start"
            >
              <Link 
                href="/contact"
                className="btn-primary flex items-center group w-full sm:w-auto justify-center"
              >
                Get Protected Today
                <ShieldCheck className="ml-3 group-hover:rotate-12 transition-transform" size={24} />
              </Link>
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
              className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-12 w-full max-w-4xl border-t border-white/10 pt-6"
            >
              <StatItem number="10+" label="Happy Clients" />
              <StatItem number="24/7" label="Monitoring" />
              <StatItem number="15+" label="Countries" />
              <StatItem number="99.9%" label="Uptime" />
            </motion.div>
          </div>

          {/* Right side card removed per user request */}
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
