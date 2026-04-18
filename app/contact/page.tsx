"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, MessageSquare, ShieldCheck, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import Navbar from '../../src/components/Navbar';
import Footer from '../../src/components/Footer';

const ContactPage = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would send this to an API
    alert('Thank you for reaching out! Our security team will contact you shortly.');
  };

  return (
    <main className="min-h-screen bg-primary-dark overflow-hidden flex flex-col">
      <Navbar />

      <section className="relative pt-32 pb-20 flex-grow">
        {/* Decorative background elements */}
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-accent/10 rounded-full blur-[120px] -z-10 animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] -z-10 animate-pulse-slow"></div>
        
        <div className="container relative z-10 px-6">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-16"
            >
              <Link href="/" className="inline-flex items-center text-accent hover:text-white transition-colors mb-8 group text-xs font-black uppercase tracking-widest">
                <ArrowLeft size={16} className="mr-2 group-hover:-translate-x-1 transition-transform" />
                Back to Home
              </Link>
              <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tighter">
                Contact Our <span className="text-gradient">Security Experts</span>
              </h1>
              <p className="text-xl text-white/50 max-w-2xl">
                Ready to secure your property? Get in touch for a custom consultation or a free security audit of your facility.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="glass p-8 md:p-12 rounded-[3rem] border-white/5 shadow-2xl"
              >
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest text-white/40 ml-4">Full Name</label>
                      <input 
                        type="text" 
                        required
                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-accent/50 focus:bg-white/10 transition-all"
                        placeholder="John Doe"
                        value={formState.name}
                        onChange={(e) => setFormState({...formState, name: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest text-white/40 ml-4">Email Address</label>
                      <input 
                        type="email" 
                        required
                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-accent/50 focus:bg-white/10 transition-all"
                        placeholder="john@example.com"
                        value={formState.email}
                        onChange={(e) => setFormState({...formState, email: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-white/40 ml-4">Subject</label>
                    <input 
                      type="text" 
                      required
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-accent/50 focus:bg-white/10 transition-all"
                      placeholder="Security Audit / Pricing Inquiry"
                      value={formState.subject}
                      onChange={(e) => setFormState({...formState, subject: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-white/40 ml-4">Message</label>
                    <textarea 
                      required
                      rows={5}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-accent/50 focus:bg-white/10 transition-all resize-none"
                      placeholder="Describe your security requirements..."
                      value={formState.message}
                      onChange={(e) => setFormState({...formState, message: e.target.value})}
                    />
                  </div>
                  <button 
                    type="submit"
                    className="w-full bg-accent text-primary-dark font-black uppercase tracking-[0.2em] py-5 rounded-2xl hover:bg-white transition-all duration-300 flex items-center justify-center group"
                  >
                    Send Message
                    <Send size={18} className="ml-3 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </button>
                </form>
              </motion.div>

              {/* Contact Information & Map Area */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="flex flex-col space-y-8"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <ContactInfoCard 
                    icon={<Phone className="text-accent" />}
                    title="Call Us"
                    value="+1 (281) 702-9418"
                    label="USA Hotline"
                  />
                  <ContactInfoCard 
                    icon={<Mail className="text-accent" />}
                    title="Email Us"
                    value="info@securewatch24.com"
                    label="Support 24/7"
                  />
                </div>
                
                <div className="glass p-8 rounded-[3rem] border-white/5 flex-grow relative overflow-hidden group">
                  <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                  <div className="relative z-10 flex flex-col h-full">
                    <div className="flex items-center space-x-4 mb-8">
                       <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center text-accent">
                          <MapPin size={24} />
                       </div>
                       <div>
                          <h4 className="text-white font-bold">Global Headquarters</h4>
                          <p className="text-xs text-white/40 uppercase font-black tracking-widest">Houston, TX</p>
                       </div>
                    </div>
                    <div className="mb-8">
                       <p className="text-xl text-white/80 leading-relaxed font-semibold">
                          7447 Harwin Drive, Suite 100<br />
                          Houston, Texas, 77036<br />
                          United States of America
                       </p>
                    </div>
                    
                    <div className="mt-auto p-6 rounded-2xl bg-white/5 border border-white/10 flex items-center space-x-4">
                       <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center text-primary-dark">
                          <ShieldCheck size={20} />
                       </div>
                       <div>
                          <p className="text-xs font-black text-white uppercase tracking-widest">Response Time</p>
                          <p className="text-sm text-accent font-bold">Under 30 Minutes</p>
                       </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

const ContactInfoCard = ({ icon, title, value, label }: { icon: React.ReactNode, title: string, value: string, label: string }) => (
  <div className="glass p-6 rounded-[2rem] border-white/5 hover:border-accent/30 transition-all duration-300 group">
    <div className="flex items-center space-x-4 mb-4">
      <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center group-hover:bg-accent/10 transition-colors">
        {icon}
      </div>
      <span className="text-xs font-black uppercase tracking-widest text-white/40">{title}</span>
    </div>
    <p className="text-white font-bold text-lg mb-1">{value}</p>
    <p className="text-[10px] text-accent font-black uppercase tracking-widest">{label}</p>
  </div>
);

export default ContactPage;
