'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'py-4' : 'py-8'}`}>
      <div className="container mx-auto px-6">
        <div className={`flex items-center justify-between px-8 py-4 rounded-full transition-all duration-500 ${isScrolled ? 'bg-primary-dark shadow-2xl shadow-accent/20 border-accent/30' : 'glass bg-opacity-20'}`}>
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative w-10 h-10 transition-transform duration-300 group-hover:scale-110">
              <Image src="/logo.png" alt="Secure Watch 24 Logo" fill className="object-contain" />
            </div>
            <span className="text-xl font-black tracking-tight text-white hidden sm:block">
              SECURE<span className="text-accent underline decoration-accent/30 underline-offset-4">WATCH 24</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-10">
            <NavLink href="#services">Services</NavLink>
            <NavLink href="#industries">Industries</NavLink>
            <NavLink href="#pricing">Pricing</NavLink>
            <Link 
              href="#contact" 
              className="px-8 py-3 bg-accent text-primary-dark font-black rounded-full hover:bg-white hover:scale-105 transition-all duration-300 shadow-xl shadow-accent/20"
            >
              Get Protected
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button className="md:hidden text-white p-2 hover:bg-white/10 rounded-full transition-colors" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="md:hidden absolute top-full left-6 right-6 mt-4 glass rounded-[2.5rem] p-8 flex flex-col space-y-6 shadow-2xl border-accent/20"
          >
            <NavLink href="#services" onClick={() => setIsMobileMenuOpen(false)}>Services</NavLink>
            <NavLink href="#industries" onClick={() => setIsMobileMenuOpen(false)}>Industries</NavLink>
            <NavLink href="#pricing" onClick={() => setIsMobileMenuOpen(false)}>Pricing</NavLink>
            <Link 
              href="#contact" 
              className="px-6 py-4 bg-accent text-primary-dark font-black rounded-full text-center text-lg active:scale-95 transition-transform"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Get Protected
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const NavLink = ({ href, children, className = '', onClick }: { href: string, children: React.ReactNode, className?: string, onClick?: () => void }) => (
  <Link 
    href={href} 
    onClick={onClick}
    className={`text-sm font-bold text-white/70 hover:text-accent transition-all duration-300 relative group ${className}`}
  >
    {children}
    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full"></span>
  </Link>
);

export default Navbar;
