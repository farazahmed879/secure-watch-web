'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShieldCheck, Layout, User, LogOut, Save, RefreshCw, Eye,
  Plus, Trash2, Check, AlertCircle, HelpCircle,
  Activity, ArrowRight, Zap, Target, Camera, Lock,
  FileText, Briefcase, Award, Settings, CheckSquare,
  Sun, Moon, ChevronLeft, ChevronRight, Menu, X
} from 'lucide-react';
import { apiFetch, getAuthToken, removeAuthToken } from '../../../src/utils/api';
import { AdminInput, AdminTextarea, SectionFields, SectionHeader, AdminCard, AdminSelect, AdminButton, DeleteButton, ListItemRow, FeatureListRow, AdminImageUpload } from './components';

type SectionName = 'hero' | 'about_us' | 'key_features' | 'services' | 'industries' | 'pricing' | 'collaboration' | 'faq' | 'ceo_section' | 'footer';

const SECTION_METADATA: { name: SectionName; label: string; icon: any }[] = [
  { name: 'hero', label: 'Hero Banner', icon: Activity },
  { name: 'about_us', label: 'About Us', icon: User },
  { name: 'key_features', label: 'Key Features', icon: Target },
  { name: 'services', label: 'Services', icon: ShieldCheck },
  { name: 'industries', label: 'Industries We Protect', icon: Briefcase },
  { name: 'pricing', label: 'Pricing Plans', icon: Award },
  { name: 'collaboration', label: 'Collaboration', icon: Settings },
  { name: 'faq', label: 'FAQ', icon: HelpCircle },
  { name: 'ceo_section', label: 'CEO Message', icon: FileText },
  { name: 'footer', label: 'Footer Settings', icon: Layout }
];

const DEFAULT_VALUES: Record<SectionName, any> = {
  hero: {
    badge: 'Security That Never Sleeps',
    title: 'Advanced CCTV Monitoring',
    titleAccent: 'Real-Time Protection',
    h3Text: '24/7 professional CCTV monitoring and smart surveillance solutions.',
    description: 'Secure Watch 24 Services provides reliable remote monitoring, instant alerts, and advanced surveillance solutions designed to protect properties, people, and businesses around the clock.',
    btnPrimaryText: 'Get Started',
    btnPrimaryLink: '/contact',
    btnOutlineText: 'Contact Us',
    btnOutlineLink: '/contact',
    btnDemoText: 'Request a Demo',
    btnDemoLink: '/contact',
    stats: [
      { number: '10+', label: 'Happy Clients' },
      { number: '24/7', label: 'Monitoring' },
      { number: '15+', label: 'Countries' },
      { number: '99.9%', label: 'Uptime' }
    ]
  },
  about_us: {
    badge: 'ABOUT SECURE WATCH 24 SERVICES',
    title: 'Pioneering Next-Gen',
    titleAccent: 'Surveillance',
    description: 'We are a dedicated team of security experts providing high-performance monitoring and smart detection systems to keep you safe.',
    points: [
      'State-of-the-Art Operations Command Center',
      'Advanced Predictive AI Detection Systems',
      'Dedicated Certified Incident Teams',
      'Seamless Multi-Platform Smart Connectivity'
    ],
    stats: [
      { number: '10+', label: 'Clients Worldwide' },
      { number: '99.9%', label: 'SLA Reliability' },
      { number: '150+', label: 'Managed Terminals' }
    ]
  },
  key_features: {
    badge: 'KEY CAPABILITIES',
    title: 'Engineered For Absolute',
    titleAccent: 'Vigilance',
    description: 'Discover the advanced features that make our security command systems stand out from traditional methods.',
    features: [
      { title: 'Zero Latency Stream', description: 'Real-time telemetry and video compression guarantees immediate command feedback.' },
      { title: 'Smart Threat Logic', description: 'Advanced behavioral models detect anomalies and auto-flag risk factors.' },
      { title: 'Command Integration', description: 'Consolidate multiple feeds, maps, and reports into a singular workspace.' }
    ]
  },
  services: {
    badge: 'WHAT WE DELIVER',
    title: 'Customizable Security',
    titleAccent: 'Provisions',
    description: 'Select from our range of critical services designed to provide bulletproof business continuity.',
    servicesList: [
      { title: 'CCTV Live Monitor', description: 'Continuous operator inspection of live cameras with instant incident response.', icon: 'Camera' },
      { title: 'AI Anomaly Analysis', description: 'Machine learning modules continuously parse feeds to highlight anomalies.', icon: 'Zap' },
      { title: 'Incident Response', description: 'Coordinated escalation triggers to alert local security forces instantly.', icon: 'ShieldCheck' }
    ]
  },
  industries: {
    badge: 'GLOBAL PROTECTION',
    title: 'Shielding Critical Focus',
    titleAccent: 'Sectors',
    description: 'We deploy specialized defense tactics across numerous commercial, public, and private domains.',
    industriesList: [
      { title: 'Corporate Offices', description: 'Secure corporate spaces, parking structures, and access points.' },
      { title: 'Commercial Retail', description: 'Minimize inventory shrink, track customer metrics, and secure premises.' },
      { title: 'Logistics Command', description: 'Track asset status, vehicle entries, and high-value cargo.' }
    ]
  },
  pricing: {
    badge: 'TRANSPARENT VALUE',
    title: 'Flexible Plans For Every',
    titleAccent: 'Operation',
    description: 'Choose a billing scope that matches your asset volume, operator count, and SLA needs.',
    plans: [
      { title: 'Startup Tier', price: '$299', description: 'Ideal for small offices or retail branches.', features: ['Up to 5 Camera Feeds', 'Standard SLA Response', 'Daily Activity Log'], highlight: false },
      { title: 'Corporate Command', price: '$899', description: 'Best for large corporate and logistics centers.', features: ['Up to 25 Camera Feeds', 'Priority SLA Response', 'Advanced Smart Threat Detection', 'Weekly Threat Reports'], highlight: true }
    ]
  },
  collaboration: {
    badge: 'Global Partnership',
    title: 'International',
    titleAccent: 'Partnership',
    description: 'Secure Watch 24 Services is proudly partnered with Alpha Crime Control LLC, a security company based in Houston, Texas, USA.',
    points: [
      'International Security Standards',
      'Improved Monitoring Capabilities',
      'Faster Response Coordination',
      'Global-Level Service Quality',
      'Enhanced Operational Standards'
    ],
    usaAddress: '7447 Harwin Drive, Houston, TX, USA',
    usaPhone: '+1 (281) 702-9418'
  },
  faq: {
    badge: 'COMMON RESOLUTIONS',
    title: 'Frequently Answered',
    titleAccent: 'Queries',
    description: 'Get immediate clarification on system setup, hardware compatibility, and deployment times.',
    faqsList: [
      { question: 'What is the setup time for a standard system?', answer: 'Most cloud integrations can be deployed within 48 hours once hardware is mounted.' },
      { question: 'Does the AI system support legacy cameras?', answer: 'Yes! Our gateway devices can convert existing RTSP analog feeds into smart streams.' }
    ]
  },
  ceo_section: {
    badge: 'A Message From Our Leader',
    title: 'Integrity. Vigilance. Trust.',
    quote: 'Secure Watch 24 Services is committed to delivering reliable security monitoring solutions that help businesses and individuals stay protected 24/7.',
    ceoName: 'Mr. Muzaffar Ali',
    ceoRole: 'Founder & CEO',
    signatureText: 'Core Leadership Principles',
    imageUrl: ''
  },
  footer: {
    description: 'Secure Watch 24 Services is committed to delivering reliable security monitoring solutions that help businesses and individuals stay protected 24/7.',
    badge: 'Always Watching. Always Protecting.',
    badge2: 'Your Security, Our Priority.',
    socialLinks: [
      { platform: 'facebook', url: '#' },
      { platform: 'twitter', url: '#' },
      { platform: 'linkedin', url: 'https://linkedin.com/in/muzaffarali1493' }
    ],
    quickLinks: [
      { label: 'About Us', url: '#about' },
      { label: 'Services', url: '#services' },
      { label: 'Industries', url: '#industries' },
      { label: 'Pricing Plans', url: '#pricing' },
      { label: 'FAQs', url: '#faq' }
    ],
    phone1: '+92 309 8344704',
    phone2: '+92 344 2553858',
    email1: 'contact@sw24services.com',
    email2: 'securewatch24services@gmail.com',
    website: 'www.sw24services.com',
    websiteUrl: 'http://www.sw24services.com',
    address: 'Office No D-35, 2nd Floor,\nShahrah-e-Faisal,\nKarachi, Pakistan',
    hours: '24/7 — Monday to Sunday',
    copyright: '© 2026 SECURE WATCH. MISSION CRITICAL PROTECTION.',
    credit: 'Created by Alpha Crime Control Partnership',
    statusLabel: 'Status: Online',
    statusUrl: '#',
    systemLogLabel: 'System Log',
    systemLogUrl: '#'
  }
};

export default function AdminDashboard() {
  const router = useRouter();
  const [activeSection, setActiveSection] = useState<SectionName>('hero');
  const [sectionsData, setSectionsData] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [darkMode, setDarkMode] = useState(true);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('admin-theme');
    if (savedTheme === 'light') setDarkMode(false);
  }, []);

  const toggleTheme = () => {
    setDarkMode(prev => {
      const next = !prev;
      localStorage.setItem('admin-theme', next ? 'dark' : 'light');
      return next;
    });
  };

  // Authentication check & Fetch all sections
  useEffect(() => {
    const token = getAuthToken();
    if (!token) {
      router.push('/admin');
      return;
    }

    const fetchAllData = async () => {
      try {
        setLoading(true);
        const data = await apiFetch('/sections');
        
        // Merge fetched data with default static fallbacks so that everything is prefilled
        const mergedData: Record<string, any> = {};
        (Object.keys(DEFAULT_VALUES) as SectionName[]).forEach((key) => {
          mergedData[key] = {
            ...DEFAULT_VALUES[key],
            ...(data[key] || {})
          };
        });

        setSectionsData(mergedData);
      } catch (err: any) {
        setErrorMsg('Failed to load database content. Server may be offline.');
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, [router]);

  const handleLogout = () => {
    removeAuthToken();
    router.push('/admin');
  };

  const updateField = (section: SectionName, field: string, value: any) => {
    setSectionsData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    setSuccessMsg('');
    setErrorMsg('');

    try {
      const dataToSave = sectionsData[activeSection];
      await apiFetch(`/sections/${activeSection}`, {
        method: 'PUT',
        body: JSON.stringify({ data: dataToSave }),
      });
      setSuccessMsg('Section updated successfully in MongoDB database!');
      setTimeout(() => setSuccessMsg(''), 5000);
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to update section.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-primary-dark flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-10 h-10 border-4 border-accent border-t-transparent rounded-full animate-spin"></div>
          <span className="text-white/60 font-bold uppercase tracking-widest text-xs">Synchronizing Database...</span>
        </div>
      </div>
    );
  }

  const currentData = sectionsData[activeSection] || {};

  return (
    <div data-admin-theme={darkMode ? 'dark' : 'light'} className="admin-panel h-screen flex font-sans overflow-hidden transition-colors duration-300" style={{ backgroundColor: 'var(--admin-bg)', color: 'var(--admin-text)' }}>
      {/* 1. LEFT SIDEBAR (DESKTOP) */}
      <aside 
        className={`hidden lg:flex flex-col justify-between shrink-0 py-5 border-r overflow-y-auto transition-all duration-500 ease-in-out ${
          isSidebarCollapsed ? 'w-20 px-3' : 'w-60 px-4'
        }`}
        style={{ backgroundColor: 'var(--admin-sidebar)', borderColor: 'var(--admin-border)' }}
      >
        <div>
          {/* Brand & Collapse trigger */}
          <div className={`flex items-center justify-between mb-8 ${isSidebarCollapsed ? 'flex-col space-y-4' : ''}`}>
            <div className="flex items-center overflow-hidden">
              <div className="w-8 h-8 rounded-lg bg-accent/20 border border-accent/30 flex items-center justify-center text-accent shrink-0">
                <ShieldCheck size={16} />
              </div>
              <motion.div
                animate={{
                  width: isSidebarCollapsed ? 0 : 'auto',
                  opacity: isSidebarCollapsed ? 0 : 1,
                  marginLeft: isSidebarCollapsed ? 0 : 10
                }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="overflow-hidden whitespace-nowrap text-left"
              >
                <h2 className="font-black text-sm tracking-tight">Secure Watch</h2>
                <p className="text-[9px] font-black uppercase tracking-wider text-accent">Admin Console</p>
              </motion.div>
            </div>
            <button 
              onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
              className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white/40 hover:text-white transition-colors cursor-pointer shrink-0"
              title={isSidebarCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
            >
              {isSidebarCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1">
            {SECTION_METADATA.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.name;
              return (
                <button
                  key={item.name}
                  onClick={() => {
                    setActiveSection(item.name);
                    setSuccessMsg('');
                    setErrorMsg('');
                  }}
                  className={`w-full flex items-center rounded-xl font-semibold text-xs transition-all duration-300 ${
                    isSidebarCollapsed ? 'justify-center p-2.5' : 'px-3 py-2.5'
                  } ${
                    isActive
                      ? 'bg-accent text-primary-dark shadow-md shadow-accent/15'
                      : 'hover:bg-[var(--admin-nav-hover)]'
                  }`}
                  style={!isActive ? { color: 'var(--admin-nav-text)' } : {}}
                  title={isSidebarCollapsed ? item.label : undefined}
                >
                  <Icon size={15} className="shrink-0" />
                  <motion.span
                    animate={{
                      width: isSidebarCollapsed ? 0 : 'auto',
                      opacity: isSidebarCollapsed ? 0 : 1,
                      marginLeft: isSidebarCollapsed ? 0 : 12
                    }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="overflow-hidden whitespace-nowrap"
                  >
                    {item.label}
                  </motion.span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Footer Actions */}
        <div className="space-y-2 pt-4" style={{ borderTop: '1px solid var(--admin-border)' }}>
          <AdminButton 
            variant="ghost" 
            onClick={toggleTheme} 
            className={isSidebarCollapsed ? '!p-2.5 flex justify-center mx-auto !w-full !space-x-0' : ''} 
            style={{ backgroundColor: 'var(--admin-input)', color: 'var(--admin-text-muted)' }}
            title={isSidebarCollapsed ? (darkMode ? 'Light Mode' : 'Dark Mode') : undefined}
          >
            {darkMode ? <Sun size={14} className="shrink-0" /> : <Moon size={14} className="shrink-0" />}
            <motion.span
              animate={{
                width: isSidebarCollapsed ? 0 : 'auto',
                opacity: isSidebarCollapsed ? 0 : 1,
                marginLeft: isSidebarCollapsed ? 0 : 8
              }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="overflow-hidden whitespace-nowrap"
            >
              {darkMode ? 'Light Mode' : 'Dark Mode'}
            </motion.span>
          </AdminButton>
          <AdminButton 
            variant="ghost" 
            onClick={() => router.push('/')} 
            className={isSidebarCollapsed ? '!p-2.5 flex justify-center mx-auto !w-full !space-x-0' : ''} 
            style={{ backgroundColor: 'var(--admin-input)', color: 'var(--admin-text-muted)' }}
            title={isSidebarCollapsed ? 'Public Site' : undefined}
          >
            <Eye size={14} className="shrink-0" />
            <motion.span
              animate={{
                width: isSidebarCollapsed ? 0 : 'auto',
                opacity: isSidebarCollapsed ? 0 : 1,
                marginLeft: isSidebarCollapsed ? 0 : 8
              }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="overflow-hidden whitespace-nowrap"
            >
              Public Site
            </motion.span>
          </AdminButton>
          <AdminButton 
            variant="danger" 
            onClick={handleLogout}
            className={isSidebarCollapsed ? '!p-2.5 flex justify-center mx-auto !w-full !space-x-0' : ''}
            title={isSidebarCollapsed ? 'Sign Out' : undefined}
          >
            <LogOut size={14} className="shrink-0" />
            <motion.span
              animate={{
                width: isSidebarCollapsed ? 0 : 'auto',
                opacity: isSidebarCollapsed ? 0 : 1,
                marginLeft: isSidebarCollapsed ? 0 : 8
              }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="overflow-hidden whitespace-nowrap"
            >
              Sign Out
            </motion.span>
          </AdminButton>
        </div>
      </aside>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileOpen(false)}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
            />
            
            {/* Drawer Sidebar */}
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 bottom-0 left-0 z-50 w-60 border-r flex flex-col justify-between px-4 py-5 overflow-y-auto lg:hidden"
              style={{ backgroundColor: 'var(--admin-bg)', borderColor: 'var(--admin-border)' }}
            >
              <div>
                {/* Brand & Close button */}
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center space-x-2.5">
                    <div className="w-8 h-8 rounded-lg bg-accent/20 border border-accent/30 flex items-center justify-center text-accent">
                      <ShieldCheck size={16} />
                    </div>
                    <div>
                      <h2 className="font-black text-sm tracking-tight text-white">Secure Watch</h2>
                      <p className="text-[9px] font-black uppercase tracking-wider text-accent">Admin Console</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setIsMobileOpen(false)}
                    className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-colors cursor-pointer"
                  >
                    <X size={18} />
                  </button>
                </div>

                {/* Navigation Links */}
                <nav className="space-y-1">
                  {SECTION_METADATA.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeSection === item.name;
                    return (
                      <button
                        key={item.name}
                        onClick={() => {
                          setActiveSection(item.name);
                          setIsMobileOpen(false);
                          setSuccessMsg('');
                          setErrorMsg('');
                        }}
                        className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl font-semibold text-xs transition-all duration-300 ${
                          isActive
                            ? 'bg-accent text-primary-dark shadow-md shadow-accent/15'
                            : 'hover:bg-[var(--admin-nav-hover)]'
                        }`}
                        style={!isActive ? { color: 'var(--admin-nav-text)' } : {}}
                      >
                        <Icon size={15} />
                        <span>{item.label}</span>
                      </button>
                    );
                  })}
                </nav>
              </div>

              {/* Footer Actions */}
              <div className="space-y-2 pt-4" style={{ borderTop: '1px solid var(--admin-border)' }}>
                <AdminButton variant="ghost" onClick={toggleTheme} style={{ backgroundColor: 'var(--admin-input)', color: 'var(--admin-text-muted)' }}>
                  {darkMode ? <Sun size={14} /> : <Moon size={14} />}
                  <span>{darkMode ? 'Light Mode' : 'Dark Mode'}</span>
                </AdminButton>
                <AdminButton variant="ghost" onClick={() => { router.push('/'); setIsMobileOpen(false); }} style={{ backgroundColor: 'var(--admin-input)', color: 'var(--admin-text-muted)' }}>
                  <Eye size={14} />
                  <span>Public Site</span>
                </AdminButton>
                <AdminButton variant="danger" onClick={handleLogout}>
                  <LogOut size={14} />
                  <span>Sign Out</span>
                </AdminButton>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* 2. MAIN WORKING PANEL */}
      <main className="flex-grow px-4 md:px-8 py-6 flex flex-col justify-between h-full overflow-y-auto">
        <div>
          {/* Mobile Navigation Header */}
          <div className="flex lg:hidden items-center justify-between pb-4 mb-6 border-b" style={{ borderColor: 'var(--admin-border)' }}>
            <div className="flex items-center space-x-2.5">
              <button 
                onClick={() => setIsMobileOpen(true)}
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-white transition-colors cursor-pointer"
              >
                <Menu size={20} />
              </button>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-lg bg-accent/20 border border-accent/30 flex items-center justify-center text-accent">
                  <ShieldCheck size={16} />
                </div>
                <span className="font-bold text-sm tracking-tight text-white">Secure Watch</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <button onClick={toggleTheme} className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-white transition-colors cursor-pointer">
                {darkMode ? <Sun size={14} /> : <Moon size={14} />}
              </button>
              <button onClick={handleLogout} className="p-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/10 transition-colors cursor-pointer">
                <LogOut size={14} />
              </button>
            </div>
          </div>
          {/* Header */}
          <header className="flex justify-between items-center mb-6">
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-accent">Active Workspace</span>
              <h1 className="text-2xl font-black tracking-tight mt-1 capitalize">{activeSection.replace('_', ' ')} Settings</h1>
            </div>

            {/* Quick Actions */}
            <div className="flex space-x-4">
              <AdminButton variant="primary" onClick={handleSave} disabled={saving} className="group">
                {/* Shine sweep effect */}
                <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/25 to-transparent pointer-events-none" />
                {saving ? (
                  <RefreshCw size={15} className="animate-spin relative z-10" />
                ) : (
                  <Save size={15} className="relative z-10" />
                )}
                <span className="relative z-10">{saving ? 'Saving...' : 'Save Changes'}</span>
              </AdminButton>
            </div>
          </header>

          {/* Toast Feeds */}
          <AnimatePresence>
            {successMsg && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mb-4 flex items-center space-x-2 p-3 rounded-xl bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-semibold"
              >
                <Check size={18} />
                <span>{successMsg}</span>
              </motion.div>
            )}
            {errorMsg && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mb-4 flex items-center space-x-2 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-semibold"
              >
                <AlertCircle size={18} />
                <span>{errorMsg}</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Dynamic Forms Workspace */}
          <div className="glass p-6 rounded-2xl space-y-5 shadow-xl transition-colors duration-300" style={{ borderColor: 'var(--admin-border)', backgroundColor: 'var(--admin-surface)' }}>
            <h3 className="text-sm font-bold pb-3 mb-4 uppercase tracking-wider" style={{ borderBottom: '1px solid var(--admin-border)', color: 'var(--admin-text-secondary)' }}>Content Parameters</h3>
            
            {/* ═══ HERO ═══ */}
            {activeSection === 'hero' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <AdminInput label="Section Badge" value={currentData.badge || ''} onChange={(v) => updateField('hero', 'badge', v)} />
                <AdminInput label="H3 Subheading" value={currentData.h3Text || ''} onChange={(v) => updateField('hero', 'h3Text', v)} />
                <AdminInput label="Title Main" value={currentData.title || ''} onChange={(v) => updateField('hero', 'title', v)} />
                <AdminInput label="Title Accent (Gradient)" value={currentData.titleAccent || ''} onChange={(v) => updateField('hero', 'titleAccent', v)} />
                <AdminTextarea label="Description Paragraph" value={currentData.description || ''} onChange={(v) => updateField('hero', 'description', v)} rows={4} className="md:col-span-2" />
                <AdminInput label="Primary Button Text" value={currentData.btnPrimaryText || ''} onChange={(v) => updateField('hero', 'btnPrimaryText', v)} />
                <AdminInput label="Primary Button Link" value={currentData.btnPrimaryLink || ''} onChange={(v) => updateField('hero', 'btnPrimaryLink', v)} />
                <AdminInput label="Outline Button Text" value={currentData.btnOutlineText || ''} onChange={(v) => updateField('hero', 'btnOutlineText', v)} />
                <AdminInput label="Outline Button Link" value={currentData.btnOutlineLink || ''} onChange={(v) => updateField('hero', 'btnOutlineLink', v)} />
                <div className="md:col-span-2 mt-4">
                  <SectionHeader title="Hero Stat Badges" count={(currentData.stats || []).length} addLabel="Add Stat" onAdd={() => updateField('hero', 'stats', [...(currentData.stats || []), { number: '', label: '' }])} />
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {(currentData.stats || []).map((stat: any, i: number) => (
                      <motion.div key={i} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white/5 p-3 rounded-xl border border-white/5 relative group/stat">
                        <div className="flex justify-between items-start mb-2">
                          <label className="block text-[10px] font-black uppercase tracking-widest text-white/30">Value</label>
                          <DeleteButton onClick={() => { const a = [...currentData.stats]; a.splice(i, 1); updateField('hero', 'stats', a); }} groupName="stat" size={10} />
                        </div>
                        <input type="text" value={stat.number || ''} onChange={(e) => { const a = [...currentData.stats]; a[i] = { ...a[i], number: e.target.value }; updateField('hero', 'stats', a); }} className="w-full bg-black/20 border border-white/10 rounded-lg p-2 text-white text-sm focus:outline-none mb-3" />
                        <label className="block text-[10px] font-black uppercase tracking-widest text-white/30 mb-2">Label</label>
                        <input type="text" value={stat.label || ''} onChange={(e) => { const a = [...currentData.stats]; a[i] = { ...a[i], label: e.target.value }; updateField('hero', 'stats', a); }} className="w-full bg-black/20 border border-white/10 rounded-lg p-2 text-white text-xs focus:outline-none" />
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* ═══ ABOUT US ═══ */}
            {activeSection === 'about_us' && (
              <div className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  <AdminInput label="Section Badge" value={currentData.badge || ''} onChange={(v) => updateField('about_us', 'badge', v)} />
                  <AdminInput label="Title Main" value={currentData.title || ''} onChange={(v) => updateField('about_us', 'title', v)} />
                  <AdminInput label="Title Accent" value={currentData.titleAccent || ''} onChange={(v) => updateField('about_us', 'titleAccent', v)} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <AdminTextarea label="Paragraph One" value={(currentData.paragraphs && currentData.paragraphs[0]) || ''} onChange={(v) => { const p = [...(currentData.paragraphs || [])]; p[0] = v; updateField('about_us', 'paragraphs', p); }} />
                  <AdminTextarea label="Paragraph Two" value={(currentData.paragraphs && currentData.paragraphs[1]) || ''} onChange={(v) => { const p = [...(currentData.paragraphs || [])]; p[1] = v; updateField('about_us', 'paragraphs', p); }} />
                </div>
                <div className="bg-white/3 rounded-xl p-4 border border-white/5">
                  <h4 className="text-sm font-bold uppercase tracking-wider text-accent mb-4">Mission Statement</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <AdminInput label="Mission Title" value={(currentData.mission && currentData.mission.title) || ''} variant="deep" onChange={(v) => updateField('about_us', 'mission', { ...(currentData.mission || {}), title: v })} />
                    <AdminInput label="Mission Description" value={(currentData.mission && currentData.mission.text) || ''} variant="deep" onChange={(v) => updateField('about_us', 'mission', { ...(currentData.mission || {}), text: v })} className="md:col-span-2" />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <SectionHeader title="Why Choose Us Points" count={(currentData.whyChooseUs || []).length} addLabel="Add" size="compact" onAdd={() => updateField('about_us', 'whyChooseUs', [...(currentData.whyChooseUs || []), ''])} />
                    <div className="space-y-3">
                      {(currentData.whyChooseUs || []).map((point: string, i: number) => (
                        <ListItemRow key={i} value={point} index={i} onChange={(v) => { const a = [...currentData.whyChooseUs]; a[i] = v; updateField('about_us', 'whyChooseUs', a); }} onDelete={() => { const a = [...currentData.whyChooseUs]; a.splice(i, 1); updateField('about_us', 'whyChooseUs', a); }} />
                      ))}
                    </div>
                  </div>
                  <div>
                    <SectionHeader title="Side Stats" count={(currentData.subStats || []).length} addLabel="Add" size="compact" onAdd={() => updateField('about_us', 'subStats', [...(currentData.subStats || []), { value: '', label: '' }])} />
                    <div className="grid grid-cols-2 gap-6">
                      {(currentData.subStats || []).map((stat: any, i: number) => (
                        <motion.div key={i} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white/5 p-3 rounded-xl border border-white/5 relative group/stat">
                          <div className="flex justify-between items-start mb-2">
                            <label className="block text-[10px] font-black uppercase tracking-widest text-white/30">Stat Value</label>
                            <DeleteButton onClick={() => { const a = [...currentData.subStats]; a.splice(i, 1); updateField('about_us', 'subStats', a); }} groupName="stat" size={10} />
                          </div>
                          <input type="text" value={stat.value || ''} onChange={(e) => { const a = [...currentData.subStats]; a[i] = { ...a[i], value: e.target.value }; updateField('about_us', 'subStats', a); }} className="w-full bg-black/20 border border-white/10 rounded-lg p-2 text-white text-sm focus:outline-none mb-3" />
                          <label className="block text-[10px] font-black uppercase tracking-widest text-white/30 mb-2">Label</label>
                          <input type="text" value={stat.label || ''} onChange={(e) => { const a = [...currentData.subStats]; a[i] = { ...a[i], label: e.target.value }; updateField('about_us', 'subStats', a); }} className="w-full bg-black/20 border border-white/10 rounded-lg p-2 text-white text-xs focus:outline-none" />
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ═══ KEY FEATURES ═══ */}
            {activeSection === 'key_features' && (
              <div className="space-y-5">
                <SectionFields section="key_features" data={currentData} updateField={updateField} />
                <div>
                  <SectionHeader title="Features" count={(currentData.features || []).length} addLabel="Add Feature" onAdd={() => updateField('key_features', 'features', [...(currentData.features || []), { title: '', description: '', icon: 'Zap' }])} />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {(currentData.features || []).map((feat: any, i: number) => (
                      <AdminCard key={i} label="Feature" index={i} onDelete={() => { const a = [...currentData.features]; a.splice(i, 1); updateField('key_features', 'features', a); }}>
                        <AdminSelect label="Icon" value={feat.icon || 'Zap'} onChange={(v) => { const a = [...currentData.features]; a[i] = { ...a[i], icon: v }; updateField('key_features', 'features', a); }} options={['Activity','ShieldAlert','Bell','Users','Laptop','Lock','Globe','Zap','Camera','Target']} />
                        <AdminInput label="Title" value={feat.title || ''} variant="deep" onChange={(v) => { const a = [...currentData.features]; a[i] = { ...a[i], title: v }; updateField('key_features', 'features', a); }} />
                        <AdminTextarea label="Description" value={feat.description || ''} variant="deep" onChange={(v) => { const a = [...currentData.features]; a[i] = { ...a[i], description: v }; updateField('key_features', 'features', a); }} />
                      </AdminCard>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* ═══ SERVICES ═══ */}
            {activeSection === 'services' && (
              <div className="space-y-5">
                <SectionFields section="services" data={currentData} updateField={updateField} />
                <div>
                  <SectionHeader title="Service Offerings" count={(currentData.servicesList || []).length} addLabel="Add Service" onAdd={() => updateField('services', 'servicesList', [...(currentData.servicesList || []), { title: '', description: '', badge: '', icon: 'Clock' }])} />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {(currentData.servicesList || []).map((srv: any, i: number) => (
                      <AdminCard key={i} label="Service" index={i} onDelete={() => { const a = [...currentData.servicesList]; a.splice(i, 1); updateField('services', 'servicesList', a); }}>
                        <AdminSelect label="Icon" value={srv.icon || 'Clock'} onChange={(v) => { const a = [...currentData.servicesList]; a[i] = { ...a[i], icon: v }; updateField('services', 'servicesList', a); }} options={['Clock','Monitor','Zap','FileSearch','Users','Globe','Shield','Camera','Lock','Target','Activity','Bell']} />
                        <AdminInput label="Service Title" value={srv.title || ''} variant="deep" onChange={(v) => { const a = [...currentData.servicesList]; a[i] = { ...a[i], title: v }; updateField('services', 'servicesList', a); }} />
                        <AdminTextarea label="Service Description" value={srv.description || ''} variant="deep" onChange={(v) => { const a = [...currentData.servicesList]; a[i] = { ...a[i], description: v }; updateField('services', 'servicesList', a); }} />
                      </AdminCard>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* ═══ INDUSTRIES ═══ */}
            {activeSection === 'industries' && (
              <div className="space-y-5">
                <SectionFields section="industries" data={currentData} updateField={updateField} />
                <div>
                  <SectionHeader title="Industries" count={(currentData.industriesList || []).length} unit="Categories" addLabel="Add Industry" onAdd={() => updateField('industries', 'industriesList', [...(currentData.industriesList || []), { name: '', description: '', icon: 'Briefcase' }])} />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {(currentData.industriesList || []).map((ind: any, i: number) => (
                      <AdminCard key={i} label="Industry" index={i} onDelete={() => { const a = [...currentData.industriesList]; a.splice(i, 1); updateField('industries', 'industriesList', a); }}>
                        <AdminSelect label="Icon" value={ind.icon || 'Briefcase'} onChange={(v) => { const a = [...currentData.industriesList]; a[i] = { ...a[i], icon: v }; updateField('industries', 'industriesList', a); }} options={['Briefcase','Store','Warehouse','Building2','Shield','Home','Zap','Construction','ShieldAlert']} />
                        <AdminInput label="Sector Name" value={ind.name || ''} variant="deep" onChange={(v) => { const a = [...currentData.industriesList]; a[i] = { ...a[i], name: v }; updateField('industries', 'industriesList', a); }} />
                        <AdminTextarea label="Coverage Details" value={ind.description || ''} variant="deep" onChange={(v) => { const a = [...currentData.industriesList]; a[i] = { ...a[i], description: v }; updateField('industries', 'industriesList', a); }} />
                      </AdminCard>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* ═══ PRICING ═══ */}
            {activeSection === 'pricing' && (
              <div className="space-y-5">
                <SectionFields section="pricing" data={currentData} updateField={updateField} />
                <div>
                  <SectionHeader title="Investment Packages" count={(currentData.plans || []).length} addLabel="Add Plan" onAdd={() => updateField('pricing', 'plans', [...(currentData.plans || []), { title: '', price: '', description: '', features: [''], highlight: false }])} />
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                    {(currentData.plans || []).map((plan: any, i: number) => (
                      <div key={i} className={`p-5 rounded-xl border ${plan.highlight ? 'bg-accent/5 border-accent' : 'bg-white/3 border-white/5'} space-y-4`}>
                        <div className="flex justify-between items-center border-b border-white/5 pb-4">
                          <span className="text-md font-bold">{plan.title}</span>
                          <div className="flex items-center space-x-2">
                            <AdminButton variant="pill" onClick={() => { const a = [...currentData.plans]; a.forEach((p: any, idx: number) => { p.highlight = idx === i ? !p.highlight : false; }); updateField('pricing', 'plans', a); }} className={plan.highlight ? 'bg-accent text-primary-dark shadow-md shadow-accent/20' : 'bg-white/5 text-white/40 hover:bg-white/10'}>
                              {plan.highlight ? '★ Recommended' : 'Set Recommended'}
                            </AdminButton>
                            <DeleteButton onClick={() => { const a = [...currentData.plans]; a.splice(i, 1); updateField('pricing', 'plans', a); }} groupName="card" size={11} />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-6">
                          <AdminInput label="Plan Title" value={plan.title || ''} variant="deep" onChange={(v) => { const a = [...currentData.plans]; a[i] = { ...a[i], title: v }; updateField('pricing', 'plans', a); }} />
                          <AdminInput label="Price Value" value={plan.price || ''} variant="deep" onChange={(v) => { const a = [...currentData.plans]; a[i] = { ...a[i], price: v }; updateField('pricing', 'plans', a); }} />
                        </div>
                        <AdminTextarea label="Brief Description" value={plan.description || ''} variant="deep" rows={2} onChange={(v) => { const a = [...currentData.plans]; a[i] = { ...a[i], description: v }; updateField('pricing', 'plans', a); }} />
                        <div>
                          <div className="flex justify-between items-center mb-3">
                            <label className="block text-[10px] font-black uppercase tracking-widest text-white/30">Included Features</label>
                            <AdminButton variant="accentSmall" onClick={() => { const a = [...currentData.plans]; a[i] = { ...a[i], features: [...(a[i].features || []), ''] }; updateField('pricing', 'plans', a); }}>
                              <Plus size={10} /><span>Add</span>
                            </AdminButton>
                          </div>
                          <div className="space-y-2">
                            {(plan.features || []).map((feature: string, fi: number) => (
                              <FeatureListRow key={fi} value={feature} onChange={(v) => { const a = [...currentData.plans]; const f = [...a[i].features]; f[fi] = v; a[i] = { ...a[i], features: f }; updateField('pricing', 'plans', a); }} onDelete={() => { const a = [...currentData.plans]; const f = [...a[i].features]; f.splice(fi, 1); a[i] = { ...a[i], features: f }; updateField('pricing', 'plans', a); }} groupName={`feat-${i}-${fi}`} />
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* ═══ COLLABORATION ═══ */}
            {activeSection === 'collaboration' && (
              <div className="space-y-5">
                <SectionFields section="collaboration" data={currentData} updateField={updateField} descriptionAsTextarea />
                
                <div className="bg-white/3 rounded-xl p-4 border border-white/5 space-y-4">
                  <h4 className="text-sm font-bold uppercase tracking-wider text-accent">USA Partner Contact Details</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <AdminInput label="USA Headquarters Address" value={currentData.usaAddress || ''} variant="deep" onChange={(v) => updateField('collaboration', 'usaAddress', v)} />
                    <AdminInput label="USA Direct Phone/Hotline" value={currentData.usaPhone || ''} variant="deep" onChange={(v) => updateField('collaboration', 'usaPhone', v)} />
                  </div>
                </div>

                <div>
                  <SectionHeader title="Operations Guidelines" count={(currentData.points || []).length} addLabel="Add Point" onAdd={() => updateField('collaboration', 'points', [...(currentData.points || []), ''])} />
                  <div className="space-y-4">
                    {(currentData.points || []).map((pt: string, i: number) => (
                      <ListItemRow key={i} value={pt} index={i} onChange={(v) => { const a = [...currentData.points]; a[i] = v; updateField('collaboration', 'points', a); }} onDelete={() => { const a = [...currentData.points]; a.splice(i, 1); updateField('collaboration', 'points', a); }} />
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* ═══ FAQ ═══ */}
            {activeSection === 'faq' && (
              <div className="space-y-5">
                <SectionFields section="faq" data={currentData} updateField={updateField} />
                <div>
                  <SectionHeader title="FAQ Q&A List" count={(currentData.faqsList || []).length} addLabel="Add FAQ" onAdd={() => updateField('faq', 'faqsList', [...(currentData.faqsList || []), { question: '', answer: '' }])} />
                  <div className="space-y-6">
                    {(currentData.faqsList || []).map((faq: any, i: number) => (
                      <AdminCard key={i} label="Question" index={i} onDelete={() => { const a = [...currentData.faqsList]; a.splice(i, 1); updateField('faq', 'faqsList', a); }}>
                        <AdminInput label="Question Text" value={faq.question || ''} variant="deep" onChange={(v) => { const a = [...currentData.faqsList]; a[i] = { ...a[i], question: v }; updateField('faq', 'faqsList', a); }} />
                        <AdminTextarea label="Answer Explanation" value={faq.answer || ''} variant="deep" onChange={(v) => { const a = [...currentData.faqsList]; a[i] = { ...a[i], answer: v }; updateField('faq', 'faqsList', a); }} />
                      </AdminCard>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* ═══ CEO MESSAGE ═══ */}
            {activeSection === 'ceo_section' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <AdminInput label="Section Badge" value={currentData.badge || ''} onChange={(v) => updateField('ceo_section', 'badge', v)} />
                <AdminInput label="Header Title" value={currentData.title || ''} onChange={(v) => updateField('ceo_section', 'title', v)} />
                <AdminTextarea label="CEO Quote (Message block)" value={currentData.quote || ''} onChange={(v) => updateField('ceo_section', 'quote', v)} rows={4} className="md:col-span-2" />
                <AdminInput label="CEO Full Name" value={currentData.ceoName || ''} onChange={(v) => updateField('ceo_section', 'ceoName', v)} />
                <AdminInput label="CEO Role / Title" value={currentData.ceoRole || ''} onChange={(v) => updateField('ceo_section', 'ceoRole', v)} />
                <AdminInput label="Signature Text" value={currentData.signatureText || ''} onChange={(v) => updateField('ceo_section', 'signatureText', v)} className="md:col-span-2" />
                <AdminImageUpload label="CEO Image File" value={currentData.imageUrl || ''} onChange={(v) => updateField('ceo_section', 'imageUrl', v)} className="md:col-span-2" />
              </div>
            )}

            {/* ═══ FOOTER SETTINGS ═══ */}
            {activeSection === 'footer' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <AdminTextarea label="Brand Description" value={currentData.description || ''} onChange={(v) => updateField('footer', 'description', v)} rows={3} />
                  <div className="space-y-4">
                    <AdminInput label="Badge One" value={currentData.badge || ''} onChange={(v) => updateField('footer', 'badge', v)} />
                    <AdminInput label="Badge Two" value={currentData.badge2 || ''} onChange={(v) => updateField('footer', 'badge2', v)} />
                  </div>
                </div>

                <div className="bg-white/3 rounded-xl p-4 border border-white/5 space-y-4">
                  <h4 className="text-sm font-bold uppercase tracking-wider text-accent">Contact Details</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    <AdminInput label="Phone 1" value={currentData.phone1 || ''} variant="deep" onChange={(v) => updateField('footer', 'phone1', v)} />
                    <AdminInput label="Phone 2" value={currentData.phone2 || ''} variant="deep" onChange={(v) => updateField('footer', 'phone2', v)} />
                    <AdminInput label="Email 1" value={currentData.email1 || ''} variant="deep" onChange={(v) => updateField('footer', 'email1', v)} />
                    <AdminInput label="Email 2" value={currentData.email2 || ''} variant="deep" onChange={(v) => updateField('footer', 'email2', v)} />
                    <AdminInput label="Website Label" value={currentData.website || ''} variant="deep" onChange={(v) => updateField('footer', 'website', v)} />
                    <AdminInput label="Website URL" value={currentData.websiteUrl || ''} variant="deep" onChange={(v) => updateField('footer', 'websiteUrl', v)} />
                  </div>
                </div>

                <div className="bg-white/3 rounded-xl p-4 border border-white/5 space-y-4">
                  <h4 className="text-sm font-bold uppercase tracking-wider text-accent">Headquarters</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    <AdminTextarea label="Address" value={currentData.address || ''} variant="deep" onChange={(v) => updateField('footer', 'address', v)} rows={3} className="md:col-span-2" />
                    <AdminInput label="Working Hours" value={currentData.hours || ''} variant="deep" onChange={(v) => updateField('footer', 'hours', v)} />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* Quick Links Section */}
                  <div>
                    <SectionHeader title="Quick Links" count={(currentData.quickLinks || []).length} addLabel="Add Link" size="compact" onAdd={() => updateField('footer', 'quickLinks', [...(currentData.quickLinks || []), { label: '', url: '' }])} />
                    <div className="space-y-3">
                      {(currentData.quickLinks || []).map((link: any, i: number) => (
                        <div key={i} className="flex items-center space-x-3 bg-white/3 p-3 rounded-xl border border-white/5 group/link">
                          <AdminInput label="Label" value={link.label || ''} variant="deep" onChange={(v) => { const a = [...currentData.quickLinks]; a[i] = { ...a[i], label: v }; updateField('footer', 'quickLinks', a); }} className="flex-1" />
                          <AdminInput label="URL" value={link.url || ''} variant="deep" onChange={(v) => { const a = [...currentData.quickLinks]; a[i] = { ...a[i], url: v }; updateField('footer', 'quickLinks', a); }} className="flex-1" />
                          <div className="self-end pb-2">
                            <DeleteButton onClick={() => { const a = [...currentData.quickLinks]; a.splice(i, 1); updateField('footer', 'quickLinks', a); }} groupName="link" size={11} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Social Links Section */}
                  <div>
                    <SectionHeader title="Social Links" count={(currentData.socialLinks || []).length} addLabel="Add Social" size="compact" onAdd={() => updateField('footer', 'socialLinks', [...(currentData.socialLinks || []), { platform: 'facebook', url: '' }])} />
                    <div className="space-y-3">
                      {(currentData.socialLinks || []).map((social: any, i: number) => (
                        <div key={i} className="flex items-center space-x-3 bg-white/3 p-3 rounded-xl border border-white/5 group/social">
                          <AdminSelect label="Platform" value={social.platform || 'facebook'} onChange={(v) => { const a = [...currentData.socialLinks]; a[i] = { ...a[i], platform: v }; updateField('footer', 'socialLinks', a); }} options={['facebook', 'twitter', 'linkedin']} className="w-1/3" />
                          <AdminInput label="URL" value={social.url || ''} variant="deep" onChange={(v) => { const a = [...currentData.socialLinks]; a[i] = { ...a[i], url: v }; updateField('footer', 'socialLinks', a); }} className="flex-grow" />
                          <div className="self-end pb-2">
                            <DeleteButton onClick={() => { const a = [...currentData.socialLinks]; a.splice(i, 1); updateField('footer', 'socialLinks', a); }} groupName="social" size={11} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="bg-white/3 rounded-xl p-4 border border-white/5 space-y-4">
                  <h4 className="text-sm font-bold uppercase tracking-wider text-accent">Bottom Bar Info</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <AdminInput label="Copyright Text" value={currentData.copyright || ''} variant="deep" onChange={(v) => updateField('footer', 'copyright', v)} />
                    <AdminInput label="Credit Text" value={currentData.credit || ''} variant="deep" onChange={(v) => updateField('footer', 'credit', v)} />
                    <AdminInput label="Status Text" value={currentData.statusLabel || ''} variant="deep" onChange={(v) => updateField('footer', 'statusLabel', v)} />
                    <AdminInput label="Status Link" value={currentData.statusUrl || ''} variant="deep" onChange={(v) => updateField('footer', 'statusUrl', v)} />
                    <AdminInput label="System Log Text" value={currentData.systemLogLabel || ''} variant="deep" onChange={(v) => updateField('footer', 'systemLogLabel', v)} />
                    <AdminInput label="System Log Link" value={currentData.systemLogUrl || ''} variant="deep" onChange={(v) => updateField('footer', 'systemLogUrl', v)} />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer info */}
        <footer className="mt-6 pt-4 text-center text-[10px]" style={{ borderTop: '1px solid var(--admin-border)', color: 'var(--admin-text-faint)' }}>
          <span>Secure Watch 24 Services Admin Console • Connected via Prisma Client to MongoDB Cluster</span>
        </footer>
      </main>
    </div>
  );
}
