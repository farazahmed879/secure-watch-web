'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, HelpCircle, MessageSquare, PhoneCall, Mail } from 'lucide-react';

const FAQ = ({ data }: { data?: any }) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  const badge = data?.badge || 'FAQ';
  const title = data?.title || 'Frequently Asked';
  const titleAccent = data?.titleAccent || 'Questions';

  const faqsList = data?.faqsList || [
    {
      question: 'What does Secure Watch 24 Services do?',
      answer: 'We provide 24/7 CCTV monitoring and remote security solutions to protect properties, assets, and people in real time.'
    },
    {
      question: 'Is your company officially registered?',
      answer: 'Yes, we are registered with SECP (Securities and Exchange Commission of Pakistan) and PSEB (Pakistan Software Export Board).'
    },
    {
      question: 'How does your CCTV monitoring service work?',
      answer: 'Our trained operators monitor live camera feeds and instantly respond to suspicious activities by alerting security staff, informing the client, and escalating to authorities if required.'
    },
    {
      question: 'What happens during a security incident?',
      answer: 'We immediately alert security staff, inform the client, and escalate to authorities if required to ensure rapid incident response.'
    },
    {
      question: 'Do you offer 24/7 monitoring?',
      answer: 'Yes, our services operate 24/7 with uninterrupted surveillance and support, 365 days a year.'
    },
    {
      question: 'Which industries do you serve?',
      answer: 'We serve residential, commercial, retail, warehouse, construction, and corporate sectors, among others.'
    },
    {
      question: 'Can you work with existing CCTV systems?',
      answer: 'Yes, most existing CCTV systems are compatible with our remote monitoring infrastructure.'
    },
    {
      question: 'Do you provide reports?',
      answer: 'Yes, we provide incident reports and routine updates every 30 minutes or as required by the client.'
    }
  ];

  return (
    <section id="faq" className="py-32 bg-primary-dark/50 relative overflow-hidden">
      {/* Decorative Blur glows */}
      <div className="absolute top-1/4 -left-40 w-96 h-96 bg-accent/5 rounded-full blur-[120px] pointer-events-none -z-10 animate-pulse-slow"></div>
      <div className="absolute bottom-1/4 -right-40 w-96 h-96 bg-blue-600/5 rounded-full blur-[120px] pointer-events-none -z-10" style={{ animationDelay: '3s' }}></div>

      <div className="container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* Left Column: Title / CTA */}
          <div className="lg:col-span-4 space-y-8 flex flex-col justify-between">
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full glass-accent border-accent/30"
              >
                <HelpCircle size={16} className="text-accent" />
                <span className="text-xs font-black uppercase tracking-widest text-accent">{badge}</span>
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tighter leading-[1.05]"
              >
                {title} <br />
                <span className="text-gradient">{titleAccent}</span>
              </motion.h2>
              <p className="text-white/40 text-sm font-semibold max-w-sm leading-relaxed">
                Find quick answers to common queries regarding remote camera operations, network connectivity, reporting, and systems integrations.
              </p>
            </div>

            {/* Quick Contact Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="glass p-8 rounded-3xl border border-white/5 space-y-6 bg-gradient-to-br from-white/[0.02] to-transparent shadow-xl"
            >
              <div className="flex items-center space-x-3 text-accent">
                <MessageSquare size={20} />
                <h4 className="font-black text-sm uppercase tracking-wider text-white">Have Custom Questions?</h4>
              </div>
              <p className="text-white/50 text-xs font-semibold leading-relaxed">
                Our support architects are ready to design custom security telemetry configurations for your properties.
              </p>
              <div className="space-y-3 pt-2">
                <a 
                  href="mailto:contact@sw24services.com" 
                  className="flex items-center space-x-3 text-white/70 hover:text-accent text-xs font-bold transition-colors group cursor-pointer"
                >
                  <Mail size={16} className="text-accent shrink-0 transition-transform group-hover:scale-110" />
                  <span>contact@sw24services.com</span>
                </a>
                <a 
                  href="tel:+923098344704" 
                  className="flex items-center space-x-3 text-white/70 hover:text-accent text-xs font-bold transition-colors group cursor-pointer"
                >
                  <PhoneCall size={16} className="text-accent shrink-0 transition-transform group-hover:scale-110" />
                  <span>+92 309 8344704</span>
                </a>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Dynamic accordion items */}
          <div className="lg:col-span-8 space-y-4">
            {faqsList.map((faq: any, index: number) => {
              const displayNum = String(index + 1).padStart(2, '0');
              const isOpen = activeIndex === index;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className={`glass rounded-[2rem] border-white/5 overflow-hidden transition-all duration-500 ${
                    isOpen 
                      ? 'border-accent/40 bg-white/[0.03] shadow-[0_0_50px_-12px_rgba(254,188,24,0.12)]' 
                      : 'hover:border-white/20'
                  }`}
                >
                  <button
                    onClick={() => setActiveIndex(isOpen ? null : index)}
                    className="w-full p-6 md:p-8 text-left flex items-start justify-between gap-4 group cursor-pointer"
                  >
                    <div className="flex items-start space-x-4 md:space-x-6 flex-grow">
                      <span className={`font-mono text-xs font-black tracking-widest pt-1.5 transition-colors ${
                        isOpen ? 'text-accent' : 'text-white/20 group-hover:text-white/40'
                      }`}>
                        {displayNum}
                      </span>
                      <span className={`text-lg md:text-xl font-bold transition-colors ${
                        isOpen ? 'text-accent' : 'text-white/80 group-hover:text-white'
                      }`}>
                        {faq.question}
                      </span>
                    </div>
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-all duration-500 ${
                      isOpen ? 'bg-accent text-primary-dark rotate-180' : 'bg-white/5 text-white/40 group-hover:bg-white/10'
                    }`}>
                      {isOpen ? <Minus size={18} /> : <Plus size={18} />}
                    </div>
                  </button>
                  
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: 'easeInOut' }}
                      >
                        <div className="px-6 md:px-8 pb-6 md:pb-8 text-sm md:text-base text-white/50 leading-relaxed font-semibold">
                          <div className="pt-4 border-t border-white/5 pl-8 md:pl-12">
                            {faq.answer}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
};

export default FAQ;
