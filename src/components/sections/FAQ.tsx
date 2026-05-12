'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, HelpCircle } from 'lucide-react';

const FAQS = [
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

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-32 bg-primary-dark/50 relative">
      <div className="container relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
           <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full glass-accent border-accent/30 mb-6"
           >
              <HelpCircle size={16} className="text-accent" />
              <span className="text-xs font-black uppercase tracking-widest text-accent">Knowledge Base</span>
           </motion.div>
           <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-5xl md:text-6xl font-black text-white mb-8 tracking-tighter"
           >
              Frequently Asked <span className="text-gradient">Questions</span>
           </motion.h2>
        </div>

        <div className="max-w-4xl mx-auto space-y-4">
          {FAQS.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className={`glass rounded-[2rem] border-white/5 overflow-hidden transition-all duration-500 ${activeIndex === index ? 'border-accent/30 bg-white/[0.03]' : 'hover:border-white/20'}`}
            >
              <button
                onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                className="w-full p-8 text-left flex items-center justify-between group"
              >
                <span className={`text-xl font-bold transition-colors ${activeIndex === index ? 'text-accent' : 'text-white/80 group-hover:text-white'}`}>
                  {faq.question}
                </span>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 ${activeIndex === index ? 'bg-accent text-primary-dark rotate-180' : 'bg-white/5 text-white/40'}`}>
                  {activeIndex === index ? <Minus size={20} /> : <Plus size={20} />}
                </div>
              </button>
              
              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                  >
                    <div className="px-8 pb-8 text-lg text-white/50 leading-relaxed">
                      <div className="pt-4 border-t border-white/5">
                        {faq.answer}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
