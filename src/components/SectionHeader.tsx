'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface SectionHeaderProps {
  title: string;
  subtitle: string;
}

const SectionHeader = ({ title, subtitle }: SectionHeaderProps) => {
  return (
    <div className="text-center mb-16">
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-3xl md:text-5xl font-bold mb-4"
      >
        {title}
      </motion.h2>
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-text-secondary max-w-2xl mx-auto"
      >
        {subtitle}
      </motion.p>
      <motion.div 
        initial={{ width: 0 }}
        whileInView={{ width: '80px' }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.4 }}
        className="h-1 bg-accent mx-auto mt-6 rounded-full"
      />
    </div>
  );
};

export default SectionHeader;
