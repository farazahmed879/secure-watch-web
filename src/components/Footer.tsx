'use client';

import React from 'react';
import Image from 'next/image';
import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Shield, ExternalLink } from 'lucide-react';

const Footer = () => {
  return (
    <footer id="contact" className="relative pt-32 pb-16 bg-primary-dark overflow-hidden">
      {/* Top border gradient */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-accent/20 to-transparent"></div>
      
      <div className="container relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
          <div className="space-y-10">
            <div className="flex items-center space-x-3 group">
              <div className="relative w-12 h-12 transition-transform duration-300 group-hover:scale-110">
                <Image src="/logo.png" alt="Secure Watch 24 Logo" fill className="object-contain" />
              </div>
              <span className="text-2xl font-black tracking-tighter text-white">
                SECURE<span className="text-accent underline decoration-accent/20 underline-offset-4">WATCH 24</span>
              </span>
            </div>
            <p className="text-white/40 text-sm leading-relaxed max-w-xs font-semibold italic">
              Our mission is to provide dependable and proactive security monitoring services that ensure our clients feel safe and secure at all times. Professional surveillance with a global reach.
            </p>
            <div className="flex space-x-5">
              <SocialIcon icon={<Facebook size={18} />} />
              <SocialIcon icon={<Twitter size={18} />} />
              <SocialIcon icon={<Linkedin size={18} />} />
            </div>
          </div>

          <div>
            <h4 className="text-white font-black uppercase tracking-[0.2em] text-xs mb-10 decoration-accent decoration-2 underline-offset-8 underline">Governance</h4>
            <ul className="space-y-5 text-sm font-bold text-white/50">
              <li><FooterLink href="#services">Services Portfolio</FooterLink></li>
              <li><FooterLink href="#industries">Global Operations</FooterLink></li>
              <li><FooterLink href="#pricing">Investment Plans</FooterLink></li>
              <li><FooterLink href="#">Privacy & Legal</FooterLink></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-black uppercase tracking-[0.2em] text-xs mb-10 decoration-accent decoration-2 underline-offset-8 underline">Operations</h4>
            <ul className="space-y-5 text-sm font-bold text-white/50">
              <li>Live Tactical Monitoring</li>
              <li>Remote Asset Defense</li>
              <li>Advanced Incident Analytics</li>
              <li>Emergency Response Grid</li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-black uppercase tracking-[0.2em] text-xs mb-10 decoration-accent decoration-2 underline-offset-8 underline">HQ & Partner Access</h4>
            <div className="space-y-6">
              <div className="flex items-start space-x-4 text-sm text-white/50 group">
                <Shield size={20} className="text-accent shrink-0 group-hover:scale-110 transition-transform" />
                <span className="font-bold">Alpha Crime Control HQ<br /><span className="text-[10px] text-white/30 uppercase tracking-widest">Houston, TX Operations</span></span>
              </div>
              <div className="flex items-center space-x-4 text-sm text-white/50 group">
                <MapPin size={20} className="text-accent shrink-0 group-hover:scale-110 transition-transform" />
                <span className="font-bold hover:text-white transition-colors cursor-pointer">7447 Harwin Drive, Houston, TX</span>
              </div>
              <div className="flex items-center space-x-4 text-sm text-white/50 group">
                <Phone size={20} className="text-accent shrink-0 group-hover:scale-110 transition-transform" />
                <span className="font-black text-white">+1 (281) 702-9418</span>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0">
          <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-8">
             <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em]">© {new Date().getFullYear()} SECURE WATCH. MISSION CRITICAL PROTECTION.</p>
             <span className="hidden md:block w-1 h-1 bg-white/10 rounded-full"></span>
             <p className="text-[10px] font-black text-white/40 uppercase tracking-[0.3em]">Created by Alpha Crime Control Partnership</p>
          </div>
          <div className="flex items-center space-x-6">
             <a href="#" className="text-[10px] font-black text-white/30 hover:text-accent transition-colors uppercase tracking-widest">Status: Online</a>
             <a href="#" className="text-[10px] font-black text-white/30 hover:text-accent transition-colors uppercase tracking-widest flex items-center">
                System Log <ExternalLink size={10} className="ml-1" />
             </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

const FooterLink = ({ href, children }: { href: string, children: React.ReactNode }) => (
  <a href={href} className="hover:text-accent transition-all duration-300 flex items-center group">
    <span className="w-0 h-px bg-accent group-hover:w-4 transition-all duration-300 mr-0 group-hover:mr-2"></span>
    {children}
  </a>
);

const SocialIcon = ({ icon }: { icon: React.ReactNode }) => (
  <a href="#" className="w-12 h-12 rounded-2xl glass flex items-center justify-center text-white/50 hover:text-accent hover:border-accent shadow-xl hover:shadow-accent/20 transition-all duration-500 hover:-translate-y-1">
    {icon}
  </a>
);

export default Footer;
