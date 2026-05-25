'use client';

import React from 'react';
import Image from 'next/image';
import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Shield, ExternalLink, Globe, Clock } from 'lucide-react';

const Footer = ({ data }: { data?: any }) => {
  const description = data?.description || 'Secure Watch 24 Services is committed to delivering reliable security monitoring solutions that help businesses and individuals stay protected 24/7.';
  const badge = data?.badge || 'Always Watching. Always Protecting.';
  const badge2 = data?.badge2 || 'Your Security, Our Priority.';
  
  const socialLinks = data?.socialLinks || [
    { platform: 'facebook', url: '#' },
    { platform: 'twitter', url: '#' },
    { platform: 'linkedin', url: 'https://linkedin.com/in/muzaffarali1493' }
  ];

  const quickLinks = data?.quickLinks || [
    { label: 'About Us', url: '#about' },
    { label: 'Services', url: '#services' },
    { label: 'Industries', url: '#industries' },
    { label: 'Pricing Plans', url: '#pricing' },
    { label: 'FAQs', url: '#faq' }
  ];

  const phone1 = data?.phone1 || '+92 309 8344704';
  const phone2 = data?.phone2 || '+92 344 2553858';
  const email1 = data?.email1 || 'contact@sw24services.com';
  const email2 = data?.email2 || 'securewatch24services@gmail.com';
  const website = data?.website || 'www.sw24services.com';
  const websiteUrl = data?.websiteUrl || 'http://www.sw24services.com';

  const address = data?.address || 'Office No D-35, 2nd Floor,\nShahrah-e-Faisal,\nKarachi, Pakistan';
  const hours = data?.hours || '24/7 — Monday to Sunday';

  const copyright = data?.copyright || `© ${new Date().getFullYear()} SECURE WATCH. MISSION CRITICAL PROTECTION.`;
  const credit = data?.credit || 'Created by Alpha Crime Control Partnership';
  const statusLabel = data?.statusLabel || 'Status: Online';
  const statusUrl = data?.statusUrl || '#';
  const systemLogLabel = data?.systemLogLabel || 'System Log';
  const systemLogUrl = data?.systemLogUrl || '#';

  const getSocialIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'facebook': return <Facebook size={18} />;
      case 'twitter': return <Twitter size={18} />;
      case 'linkedin': return <Linkedin size={18} />;
      default: return <Facebook size={18} />;
    }
  };

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
              {description}
            </p>
            <div className="space-y-2">
               {badge && <p className="text-xs font-black text-accent uppercase tracking-widest">{badge}</p>}
               {badge2 && <p className="text-xs font-black text-white/30 uppercase tracking-widest">{badge2}</p>}
            </div>
            <div className="flex space-x-5">
              {socialLinks.map((social: any, idx: number) => (
                <SocialIcon key={idx} icon={getSocialIcon(social.platform)} href={social.url} />
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-white font-black uppercase tracking-[0.2em] text-xs mb-10 decoration-accent decoration-2 underline-offset-8 underline">Quick Links</h4>
            <ul className="space-y-5 text-sm font-bold text-white/50">
              {quickLinks.map((link: any, idx: number) => (
                <li key={idx}><FooterLink href={link.url}>{link.label}</FooterLink></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-black uppercase tracking-[0.2em] text-xs mb-10 decoration-accent decoration-2 underline-offset-8 underline">Contact Details</h4>
            <ul className="space-y-6 text-sm font-bold text-white/50">
              {(phone1 || phone2) && (
                <li className="flex items-start space-x-4">
                   <Phone size={20} className="text-accent shrink-0" />
                   <div className="flex flex-col">
                      {phone1 && <span>{phone1}</span>}
                      {phone2 && <span>{phone2}</span>}
                   </div>
                </li>
              )}
              {(email1 || email2) && (
                <li className="flex items-start space-x-4">
                   <Mail size={20} className="text-accent shrink-0" />
                   <div className="flex flex-col">
                      {email1 && <a href={`mailto:${email1}`} className="hover:text-accent">{email1}</a>}
                      {email2 && <a href={`mailto:${email2}`} className="hover:text-accent text-[10px]">{email2}</a>}
                   </div>
                </li>
              )}
              {website && (
                <li className="flex items-start space-x-4">
                   <Globe size={20} className="text-accent shrink-0" />
                   <a href={websiteUrl} className="hover:text-accent">{website}</a>
                </li>
              )}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-black uppercase tracking-[0.2em] text-xs mb-10 decoration-accent decoration-2 underline-offset-8 underline">Headquarters</h4>
            <div className="space-y-6">
              {address && (
                <div className="flex items-start space-x-4 text-sm text-white/50 group">
                  <MapPin size={20} className="text-accent shrink-0 group-hover:scale-110 transition-transform" />
                  <span className="font-bold whitespace-pre-line">{address}</span>
                </div>
              )}
              {hours && (
                <div className="flex items-center space-x-4 text-sm text-white/50 group">
                  <Clock size={20} className="text-accent shrink-0 group-hover:scale-110 transition-transform" />
                  <span className="font-black text-white">{hours}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0">
          <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-8">
             <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em]">{copyright}</p>
             <span className="hidden md:block w-1 h-1 bg-white/10 rounded-full"></span>
             <p className="text-[10px] font-black text-white/40 uppercase tracking-[0.3em]">{credit}</p>
          </div>
          <div className="flex items-center space-x-6">
             {statusLabel && (
               <a href={statusUrl} className="text-[10px] font-black text-white/30 hover:text-accent transition-colors uppercase tracking-widest">{statusLabel}</a>
             )}
             {systemLogLabel && (
               <a href={systemLogUrl} className="text-[10px] font-black text-white/30 hover:text-accent transition-colors uppercase tracking-widest flex items-center">
                  {systemLogLabel} <ExternalLink size={10} className="ml-1" />
               </a>
             )}
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

const SocialIcon = ({ icon, href }: { icon: React.ReactNode, href: string }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-2xl glass flex items-center justify-center text-white/50 hover:text-accent hover:border-accent shadow-xl hover:shadow-accent/20 transition-all duration-500 hover:-translate-y-1">
    {icon}
  </a>
);

export default Footer;
