'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShieldCheck, Layout, User, LogOut, Save, RefreshCw, Eye,
  Plus, Trash2, Check, AlertCircle, HelpCircle,
  Activity, ArrowRight, Zap, Target, Camera, Lock,
  FileText, Briefcase, Award, Settings, CheckSquare
} from 'lucide-react';
import { apiFetch, getAuthToken, removeAuthToken } from '../../../src/utils/api';

type SectionName = 'hero' | 'about_us' | 'key_features' | 'services' | 'industries' | 'pricing' | 'collaboration' | 'faq' | 'ceo_section';

const SECTION_METADATA: { name: SectionName; label: string; icon: any }[] = [
  { name: 'hero', label: 'Hero Banner', icon: Activity },
  { name: 'about_us', label: 'About Us', icon: User },
  { name: 'key_features', label: 'Key Features', icon: Target },
  { name: 'services', label: 'Services', icon: ShieldCheck },
  { name: 'industries', label: 'Industries We Protect', icon: Briefcase },
  { name: 'pricing', label: 'Pricing Plans', icon: Award },
  { name: 'collaboration', label: 'Collaboration', icon: Settings },
  { name: 'faq', label: 'FAQ', icon: HelpCircle },
  { name: 'ceo_section', label: 'CEO Message', icon: FileText }
];

export default function AdminDashboard() {
  const router = useRouter();
  const [activeSection, setActiveSection] = useState<SectionName>('hero');
  const [sectionsData, setSectionsData] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

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
        setSectionsData(data);
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
    <div className="h-screen bg-primary-dark flex text-white font-sans overflow-hidden">
      {/* 1. LEFT SIDEBAR */}
      <aside className="w-60 h-full bg-black/30 border-r border-white/5 flex flex-col justify-between shrink-0 px-4 py-5 overflow-y-auto">
        <div>
          {/* Brand */}
          <div className="flex items-center space-x-2.5 mb-6">
            <div className="w-8 h-8 rounded-lg bg-accent/20 border border-accent/30 flex items-center justify-center text-accent">
              <ShieldCheck size={16} />
            </div>
            <div>
              <h2 className="font-black text-sm tracking-tight">Secure Watch</h2>
              <p className="text-[9px] font-black uppercase tracking-wider text-accent">Admin Console</p>
            </div>
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
                  className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl font-semibold text-xs transition-all duration-300 ${
                    isActive
                      ? 'bg-accent text-primary-dark shadow-md shadow-accent/15'
                      : 'text-white/50 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <Icon size={15} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Footer Actions */}
        <div className="space-y-2 pt-4 border-t border-white/5">
          <button
            onClick={() => router.push('/')}
            className="w-full flex items-center justify-center space-x-2 bg-white/5 hover:bg-white/10 text-white/70 hover:text-white font-bold py-2.5 rounded-lg text-[10px] uppercase tracking-widest transition-all"
          >
            <Eye size={14} />
            <span>Public Site</span>
          </button>
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center space-x-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 font-bold py-2.5 rounded-lg text-[10px] uppercase tracking-widest transition-all border border-red-500/10"
          >
            <LogOut size={14} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* 2. MAIN WORKING PANEL */}
      <main className="flex-grow px-8 py-6 flex flex-col justify-between h-full overflow-y-auto">
        <div>
          {/* Header */}
          <header className="flex justify-between items-center mb-6">
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-accent">Active Workspace</span>
              <h1 className="text-2xl font-black tracking-tight mt-1 capitalize">{activeSection.replace('_', ' ')} Settings</h1>
            </div>

            {/* Quick Actions */}
            <div className="flex space-x-4">
              <motion.button
                onClick={handleSave}
                disabled={saving}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className="group relative flex items-center space-x-2 bg-gradient-to-r from-cyan-400 to-blue-500 text-primary-dark font-black uppercase text-[10px] tracking-[0.15em] py-3 px-6 rounded-xl shadow-[0_6px_24px_rgba(34,211,238,0.25)] hover:shadow-[0_10px_32px_rgba(34,211,238,0.4)] transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed overflow-hidden"
              >
                {/* Shine sweep effect */}
                <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/25 to-transparent pointer-events-none" />
                {saving ? (
                  <RefreshCw size={15} className="animate-spin relative z-10" />
                ) : (
                  <Save size={15} className="relative z-10" />
                )}
                <span className="relative z-10">{saving ? 'Saving...' : 'Save Changes'}</span>
              </motion.button>
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
          <div className="glass p-6 rounded-2xl border-white/5 space-y-5 shadow-xl bg-white/[0.01]">
            <h3 className="text-sm font-bold border-b border-white/5 pb-3 mb-4 uppercase tracking-wider text-white/70">Content Parameters</h3>
            
            {/* HERO FORM BUILDER */}
            {activeSection === 'hero' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-black uppercase tracking-widest text-white/40 mb-2">Section Badge</label>
                  <input
                    type="text"
                    value={currentData.badge || ''}
                    onChange={(e) => updateField('hero', 'badge', e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white text-sm focus:outline-none focus:border-accent/40"
                  />
                </div>
                <div>
                  <label className="block text-xs font-black uppercase tracking-widest text-white/40 mb-2">H3 Subheading</label>
                  <input
                    type="text"
                    value={currentData.h3Text || ''}
                    onChange={(e) => updateField('hero', 'h3Text', e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-accent/40"
                  />
                </div>
                <div>
                  <label className="block text-xs font-black uppercase tracking-widest text-white/40 mb-2">Title Main</label>
                  <input
                    type="text"
                    value={currentData.title || ''}
                    onChange={(e) => updateField('hero', 'title', e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-accent/40"
                  />
                </div>
                <div>
                  <label className="block text-xs font-black uppercase tracking-widest text-white/40 mb-2">Title Accent (Gradient)</label>
                  <input
                    type="text"
                    value={currentData.titleAccent || ''}
                    onChange={(e) => updateField('hero', 'titleAccent', e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-accent/40"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs font-black uppercase tracking-widest text-white/40 mb-2">Description Paragraph</label>
                  <textarea
                    rows={4}
                    value={currentData.description || ''}
                    onChange={(e) => updateField('hero', 'description', e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-accent/40 resize-y"
                  />
                </div>
                
                {/* Hero Button Labels & Links */}
                <div>
                  <label className="block text-xs font-black uppercase tracking-widest text-white/40 mb-2">Primary Button Text</label>
                  <input
                    type="text"
                    value={currentData.btnPrimaryText || ''}
                    onChange={(e) => updateField('hero', 'btnPrimaryText', e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-accent/40"
                  />
                </div>
                <div>
                  <label className="block text-xs font-black uppercase tracking-widest text-white/40 mb-2">Primary Button Link</label>
                  <input
                    type="text"
                    value={currentData.btnPrimaryLink || ''}
                    onChange={(e) => updateField('hero', 'btnPrimaryLink', e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-accent/40"
                  />
                </div>
                <div>
                  <label className="block text-xs font-black uppercase tracking-widest text-white/40 mb-2">Outline Button Text</label>
                  <input
                    type="text"
                    value={currentData.btnOutlineText || ''}
                    onChange={(e) => updateField('hero', 'btnOutlineText', e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-accent/40"
                  />
                </div>
                <div>
                  <label className="block text-xs font-black uppercase tracking-widest text-white/40 mb-2">Outline Button Link</label>
                  <input
                    type="text"
                    value={currentData.btnOutlineLink || ''}
                    onChange={(e) => updateField('hero', 'btnOutlineLink', e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-accent/40"
                  />
                </div>

                {/* Hero Stats Array Editor */}
                <div className="md:col-span-2 mt-4">
                  <h4 className="text-sm font-bold uppercase tracking-wider text-accent mb-4">Hero Stat Badges</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {(currentData.stats || []).map((stat: any, index: number) => (
                      <div key={index} className="bg-white/5 p-3 rounded-xl border border-white/5">
                        <label className="block text-[10px] font-black uppercase tracking-widest text-white/30 mb-2">Value</label>
                        <input
                          type="text"
                          value={stat.number || ''}
                          onChange={(e) => {
                            const newStats = [...currentData.stats];
                            newStats[index] = { ...newStats[index], number: e.target.value };
                            updateField('hero', 'stats', newStats);
                          }}
                          className="w-full bg-black/20 border border-white/10 rounded-lg p-2 text-white text-sm focus:outline-none mb-3"
                        />
                        <label className="block text-[10px] font-black uppercase tracking-widest text-white/30 mb-2">Label</label>
                        <input
                          type="text"
                          value={stat.label || ''}
                          onChange={(e) => {
                            const newStats = [...currentData.stats];
                            newStats[index] = { ...newStats[index], label: e.target.value };
                            updateField('hero', 'stats', newStats);
                          }}
                          className="w-full bg-black/20 border border-white/10 rounded-lg p-2 text-white text-xs focus:outline-none"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* ABOUT US FORM BUILDER */}
            {activeSection === 'about_us' && (
              <div className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  <div>
                    <label className="block text-xs font-black uppercase tracking-widest text-white/40 mb-2">Section Badge</label>
                    <input
                      type="text"
                      value={currentData.badge || ''}
                      onChange={(e) => updateField('about_us', 'badge', e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white text-sm focus:outline-none focus:border-accent/40"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-black uppercase tracking-widest text-white/40 mb-2">Title Main</label>
                    <input
                      type="text"
                      value={currentData.title || ''}
                      onChange={(e) => updateField('about_us', 'title', e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white text-sm focus:outline-none focus:border-accent/40"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-black uppercase tracking-widest text-white/40 mb-2">Title Accent</label>
                    <input
                      type="text"
                      value={currentData.titleAccent || ''}
                      onChange={(e) => updateField('about_us', 'titleAccent', e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white text-sm focus:outline-none focus:border-accent/40"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* Paragraphs */}
                  <div>
                    <label className="block text-xs font-black uppercase tracking-widest text-white/40 mb-2">Paragraph One</label>
                    <textarea
                      rows={3}
                      value={(currentData.paragraphs && currentData.paragraphs[0]) || ''}
                      onChange={(e) => {
                        const newPara = [...(currentData.paragraphs || [])];
                        newPara[0] = e.target.value;
                        updateField('about_us', 'paragraphs', newPara);
                      }}
                      className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white text-sm focus:outline-none focus:border-accent/40"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-black uppercase tracking-widest text-white/40 mb-2">Paragraph Two</label>
                    <textarea
                      rows={3}
                      value={(currentData.paragraphs && currentData.paragraphs[1]) || ''}
                      onChange={(e) => {
                        const newPara = [...(currentData.paragraphs || [])];
                        newPara[1] = e.target.value;
                        updateField('about_us', 'paragraphs', newPara);
                      }}
                      className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white text-sm focus:outline-none focus:border-accent/40"
                    />
                  </div>
                </div>

                {/* Mission Statement */}
                <div className="bg-white/3 rounded-xl p-4 border border-white/5">
                  <h4 className="text-sm font-bold uppercase tracking-wider text-accent mb-4">Mission Statement</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-xs font-black uppercase tracking-widest text-white/40 mb-2">Mission Title</label>
                      <input
                        type="text"
                        value={(currentData.mission && currentData.mission.title) || ''}
                        onChange={(e) => {
                          const newMission = { ...(currentData.mission || {}), title: e.target.value };
                          updateField('about_us', 'mission', newMission);
                        }}
                        className="w-full bg-black/25 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-accent/40"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-xs font-black uppercase tracking-widest text-white/40 mb-2">Mission Description</label>
                      <input
                        type="text"
                        value={(currentData.mission && currentData.mission.text) || ''}
                        onChange={(e) => {
                          const newMission = { ...(currentData.mission || {}), text: e.target.value };
                          updateField('about_us', 'mission', newMission);
                        }}
                        className="w-full bg-black/25 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-accent/40"
                      />
                    </div>
                  </div>
                </div>

                {/* Why Choose Us & SubStats */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="text-sm font-bold uppercase tracking-wider text-accent">Why Choose Us Points</h4>
                    </div>
                    <div className="space-y-3">
                      {(currentData.whyChooseUs || []).map((point: string, index: number) => (
                        <div key={index} className="flex items-center space-x-3">
                          <input
                            type="text"
                            value={point}
                            onChange={(e) => {
                              const newPoints = [...currentData.whyChooseUs];
                              newPoints[index] = e.target.value;
                              updateField('about_us', 'whyChooseUs', newPoints);
                            }}
                            className="flex-grow bg-white/5 border border-white/10 rounded-xl p-3 text-white text-sm focus:outline-none"
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-bold uppercase tracking-wider text-accent mb-4">Side stats</h4>
                    <div className="grid grid-cols-2 gap-6">
                      {(currentData.subStats || []).map((stat: any, index: number) => (
                        <div key={index} className="bg-white/5 p-3 rounded-xl border border-white/5">
                          <label className="block text-[10px] font-black uppercase tracking-widest text-white/30 mb-2">Stat Value</label>
                          <input
                            type="text"
                            value={stat.value || ''}
                            onChange={(e) => {
                              const newStats = [...currentData.subStats];
                              newStats[index] = { ...newStats[index], value: e.target.value };
                              updateField('about_us', 'subStats', newStats);
                            }}
                            className="w-full bg-black/20 border border-white/10 rounded-lg p-2 text-white text-sm focus:outline-none mb-3"
                          />
                          <label className="block text-[10px] font-black uppercase tracking-widest text-white/30 mb-2">Label</label>
                          <input
                            type="text"
                            value={stat.label || ''}
                            onChange={(e) => {
                              const newStats = [...currentData.subStats];
                              newStats[index] = { ...newStats[index], label: e.target.value };
                              updateField('about_us', 'subStats', newStats);
                            }}
                            className="w-full bg-black/20 border border-white/10 rounded-lg p-2 text-white text-xs focus:outline-none"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* KEY FEATURES FORM BUILDER */}
            {activeSection === 'key_features' && (
              <div className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  <div>
                    <label className="block text-xs font-black uppercase tracking-widest text-white/40 mb-2">Section Badge</label>
                    <input
                      type="text"
                      value={currentData.badge || ''}
                      onChange={(e) => updateField('key_features', 'badge', e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white text-sm focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-black uppercase tracking-widest text-white/40 mb-2">Title Main</label>
                    <input
                      type="text"
                      value={currentData.title || ''}
                      onChange={(e) => updateField('key_features', 'title', e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white text-sm focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-black uppercase tracking-widest text-white/40 mb-2">Title Accent</label>
                    <input
                      type="text"
                      value={currentData.titleAccent || ''}
                      onChange={(e) => updateField('key_features', 'titleAccent', e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white text-sm focus:outline-none"
                    />
                  </div>
                  <div className="md:col-span-3">
                    <label className="block text-xs font-black uppercase tracking-widest text-white/40 mb-2">Section Description</label>
                    <input
                      type="text"
                      value={currentData.description || ''}
                      onChange={(e) => updateField('key_features', 'description', e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white text-sm focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-bold uppercase tracking-wider text-accent mb-4">Features (4 Items)</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {(currentData.features || []).map((feat: any, index: number) => (
                      <div key={index} className="bg-white/3 p-4 rounded-xl border border-white/5 space-y-3">
                        <span className="text-xs font-bold text-accent">Feature #{index + 1}</span>
                        <div>
                          <label className="block text-[10px] font-black uppercase tracking-widest text-white/30 mb-2">Title</label>
                          <input
                            type="text"
                            value={feat.title || ''}
                            onChange={(e) => {
                              const newFeat = [...currentData.features];
                              newFeat[index] = { ...newFeat[index], title: e.target.value };
                              updateField('key_features', 'features', newFeat);
                            }}
                            className="w-full bg-black/20 border border-white/10 rounded-xl p-3 text-white text-sm focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-black uppercase tracking-widest text-white/30 mb-2">Description</label>
                          <textarea
                            rows={3}
                            value={feat.description || ''}
                            onChange={(e) => {
                              const newFeat = [...currentData.features];
                              newFeat[index] = { ...newFeat[index], description: e.target.value };
                              updateField('key_features', 'features', newFeat);
                            }}
                            className="w-full bg-black/20 border border-white/10 rounded-xl p-3 text-white text-xs focus:outline-none"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* SERVICES FORM BUILDER */}
            {activeSection === 'services' && (
              <div className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  <div>
                    <label className="block text-xs font-black uppercase tracking-widest text-white/40 mb-2">Section Badge</label>
                    <input
                      type="text"
                      value={currentData.badge || ''}
                      onChange={(e) => updateField('services', 'badge', e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white text-sm focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-black uppercase tracking-widest text-white/40 mb-2">Title Main</label>
                    <input
                      type="text"
                      value={currentData.title || ''}
                      onChange={(e) => updateField('services', 'title', e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white text-sm focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-black uppercase tracking-widest text-white/40 mb-2">Title Accent</label>
                    <input
                      type="text"
                      value={currentData.titleAccent || ''}
                      onChange={(e) => updateField('services', 'titleAccent', e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white text-sm focus:outline-none"
                    />
                  </div>
                  <div className="md:col-span-3">
                    <label className="block text-xs font-black uppercase tracking-widest text-white/40 mb-2">Section Description</label>
                    <input
                      type="text"
                      value={currentData.description || ''}
                      onChange={(e) => updateField('services', 'description', e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white text-sm focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-bold uppercase tracking-wider text-accent mb-4">Service Offerings</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {(currentData.servicesList || []).map((srv: any, index: number) => (
                      <div key={index} className="bg-white/3 p-4 rounded-xl border border-white/5 space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-xs font-bold text-accent">Service #{index + 1}</span>
                          <input
                            type="text"
                            value={srv.badge || ''}
                            placeholder="Badge (e.g. Popular)"
                            onChange={(e) => {
                              const newSrv = [...currentData.servicesList];
                              newSrv[index] = { ...newSrv[index], badge: e.target.value };
                              updateField('services', 'servicesList', newSrv);
                            }}
                            className="bg-accent/10 border border-accent/20 rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-widest text-accent text-center focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-black uppercase tracking-widest text-white/30 mb-2">Service Title</label>
                          <input
                            type="text"
                            value={srv.title || ''}
                            onChange={(e) => {
                              const newSrv = [...currentData.servicesList];
                              newSrv[index] = { ...newSrv[index], title: e.target.value };
                              updateField('services', 'servicesList', newSrv);
                            }}
                            className="w-full bg-black/20 border border-white/10 rounded-xl p-3 text-white text-sm focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-black uppercase tracking-widest text-white/30 mb-2">Service Description</label>
                          <textarea
                            rows={3}
                            value={srv.description || ''}
                            onChange={(e) => {
                              const newSrv = [...currentData.servicesList];
                              newSrv[index] = { ...newSrv[index], description: e.target.value };
                              updateField('services', 'servicesList', newSrv);
                            }}
                            className="w-full bg-black/20 border border-white/10 rounded-xl p-3 text-white text-xs focus:outline-none animate-none"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* INDUSTRIES FORM BUILDER */}
            {activeSection === 'industries' && (
              <div className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  <div>
                    <label className="block text-xs font-black uppercase tracking-widest text-white/40 mb-2">Section Badge</label>
                    <input
                      type="text"
                      value={currentData.badge || ''}
                      onChange={(e) => updateField('industries', 'badge', e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white text-sm focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-black uppercase tracking-widest text-white/40 mb-2">Title Main</label>
                    <input
                      type="text"
                      value={currentData.title || ''}
                      onChange={(e) => updateField('industries', 'title', e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white text-sm focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-black uppercase tracking-widest text-white/40 mb-2">Title Accent</label>
                    <input
                      type="text"
                      value={currentData.titleAccent || ''}
                      onChange={(e) => updateField('industries', 'titleAccent', e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white text-sm focus:outline-none"
                    />
                  </div>
                  <div className="md:col-span-3">
                    <label className="block text-xs font-black uppercase tracking-widest text-white/40 mb-2">Section Description</label>
                    <input
                      type="text"
                      value={currentData.description || ''}
                      onChange={(e) => updateField('industries', 'description', e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white text-sm focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-bold uppercase tracking-wider text-accent mb-4">Industries (4 Categories)</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {(currentData.industriesList || []).map((ind: any, index: number) => (
                      <div key={index} className="bg-white/3 p-4 rounded-xl border border-white/5 space-y-3">
                        <span className="text-xs font-bold text-accent">Industry #{index + 1}</span>
                        <div>
                          <label className="block text-[10px] font-black uppercase tracking-widest text-white/30 mb-2">Sector Name</label>
                          <input
                            type="text"
                            value={ind.name || ''}
                            onChange={(e) => {
                              const newInd = [...currentData.industriesList];
                              newInd[index] = { ...newInd[index], name: e.target.value };
                              updateField('industries', 'industriesList', newInd);
                            }}
                            className="w-full bg-black/20 border border-white/10 rounded-xl p-3 text-white text-sm focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-black uppercase tracking-widest text-white/30 mb-2">Coverage Details</label>
                          <textarea
                            rows={3}
                            value={ind.description || ''}
                            onChange={(e) => {
                              const newInd = [...currentData.industriesList];
                              newInd[index] = { ...newInd[index], description: e.target.value };
                              updateField('industries', 'industriesList', newInd);
                            }}
                            className="w-full bg-black/20 border border-white/10 rounded-xl p-3 text-white text-xs focus:outline-none"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* PRICING FORM BUILDER */}
            {activeSection === 'pricing' && (
              <div className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  <div>
                    <label className="block text-xs font-black uppercase tracking-widest text-white/40 mb-2">Section Badge</label>
                    <input
                      type="text"
                      value={currentData.badge || ''}
                      onChange={(e) => updateField('pricing', 'badge', e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white text-sm focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-black uppercase tracking-widest text-white/40 mb-2">Title Main</label>
                    <input
                      type="text"
                      value={currentData.title || ''}
                      onChange={(e) => updateField('pricing', 'title', e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white text-sm focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-black uppercase tracking-widest text-white/40 mb-2">Title Accent</label>
                    <input
                      type="text"
                      value={currentData.titleAccent || ''}
                      onChange={(e) => updateField('pricing', 'titleAccent', e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white text-sm focus:outline-none"
                    />
                  </div>
                  <div className="md:col-span-3">
                    <label className="block text-xs font-black uppercase tracking-widest text-white/40 mb-2">Section Description</label>
                    <input
                      type="text"
                      value={currentData.description || ''}
                      onChange={(e) => updateField('pricing', 'description', e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white text-sm focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-bold uppercase tracking-wider text-accent mb-6">Investment Packages</h4>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                    {(currentData.plans || []).map((plan: any, index: number) => (
                      <div key={index} className={`p-5 rounded-xl border ${plan.highlight ? 'bg-accent/5 border-accent' : 'bg-white/3 border-white/5'} space-y-4`}>
                        <div className="flex justify-between items-center border-b border-white/5 pb-4">
                          <span className="text-md font-bold">{plan.title}</span>
                          <button
                            type="button"
                            onClick={() => {
                              const newPlans = [...currentData.plans];
                              newPlans.forEach((p, idx) => {
                                p.highlight = idx === index ? !p.highlight : false;
                              });
                              updateField('pricing', 'plans', newPlans);
                            }}
                            className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${
                              plan.highlight
                                ? 'bg-accent text-primary-dark shadow-md shadow-accent/20'
                                : 'bg-white/5 text-white/40 hover:bg-white/10'
                            }`}
                          >
                            {plan.highlight ? '★ Recommended' : 'Set Recommended'}
                          </button>
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                          <div>
                            <label className="block text-[10px] font-black uppercase tracking-widest text-white/30 mb-2">Plan Title</label>
                            <input
                              type="text"
                              value={plan.title || ''}
                              onChange={(e) => {
                                const newPlans = [...currentData.plans];
                                newPlans[index] = { ...newPlans[index], title: e.target.value };
                                updateField('pricing', 'plans', newPlans);
                              }}
                              className="w-full bg-black/20 border border-white/10 rounded-xl p-3 text-white text-sm focus:outline-none"
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] font-black uppercase tracking-widest text-white/30 mb-2">Price Value ($ /mo or 'Custom')</label>
                            <input
                              type="text"
                              value={plan.price || ''}
                              onChange={(e) => {
                                const newPlans = [...currentData.plans];
                                newPlans[index] = { ...newPlans[index], price: e.target.value };
                                updateField('pricing', 'plans', newPlans);
                              }}
                              className="w-full bg-black/20 border border-white/10 rounded-xl p-3 text-white text-sm focus:outline-none"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-[10px] font-black uppercase tracking-widest text-white/30 mb-2">Brief Description</label>
                          <textarea
                            rows={2}
                            value={plan.description || ''}
                            onChange={(e) => {
                              const newPlans = [...currentData.plans];
                              newPlans[index] = { ...newPlans[index], description: e.target.value };
                              updateField('pricing', 'plans', newPlans);
                            }}
                            className="w-full bg-black/20 border border-white/10 rounded-xl p-3 text-white text-xs focus:outline-none"
                          />
                        </div>

                        {/* Pricing Features Sub-list */}
                        <div>
                          <label className="block text-[10px] font-black uppercase tracking-widest text-white/30 mb-3">Included Features List</label>
                          <div className="space-y-2">
                            {(plan.features || []).map((feature: string, fIndex: number) => (
                              <div key={fIndex} className="flex items-center space-x-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-accent"></span>
                                <input
                                  type="text"
                                  value={feature}
                                  onChange={(e) => {
                                    const newPlans = [...currentData.plans];
                                    const newFeats = [...newPlans[index].features];
                                    newFeats[fIndex] = e.target.value;
                                    newPlans[index] = { ...newPlans[index], features: newFeats };
                                    updateField('pricing', 'plans', newPlans);
                                  }}
                                  className="flex-grow bg-black/10 hover:bg-black/20 border border-white/5 rounded-lg p-2 text-white text-xs focus:outline-none"
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* COLLABORATION FORM BUILDER */}
            {activeSection === 'collaboration' && (
              <div className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  <div>
                    <label className="block text-xs font-black uppercase tracking-widest text-white/40 mb-2">Section Badge</label>
                    <input
                      type="text"
                      value={currentData.badge || ''}
                      onChange={(e) => updateField('collaboration', 'badge', e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white text-sm focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-black uppercase tracking-widest text-white/40 mb-2">Title Main</label>
                    <input
                      type="text"
                      value={currentData.title || ''}
                      onChange={(e) => updateField('collaboration', 'title', e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white text-sm focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-black uppercase tracking-widest text-white/40 mb-2">Title Accent</label>
                    <input
                      type="text"
                      value={currentData.titleAccent || ''}
                      onChange={(e) => updateField('collaboration', 'titleAccent', e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white text-sm focus:outline-none"
                    />
                  </div>
                  <div className="md:col-span-3">
                    <label className="block text-xs font-black uppercase tracking-widest text-white/40 mb-2">Section Description</label>
                    <textarea
                      rows={3}
                      value={currentData.description || ''}
                      onChange={(e) => updateField('collaboration', 'description', e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white text-sm focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-bold uppercase tracking-wider text-accent mb-4">Operations Guidelines (4 Points)</h4>
                  <div className="space-y-4">
                    {(currentData.points || []).map((pt: string, index: number) => (
                      <div key={index} className="flex items-center space-x-3 bg-white/3 p-3 rounded-xl border border-white/5">
                        <span className="text-xs font-bold text-accent shrink-0 w-8 text-center">#{index + 1}</span>
                        <input
                          type="text"
                          value={pt}
                          onChange={(e) => {
                            const newPoints = [...currentData.points];
                            newPoints[index] = e.target.value;
                            updateField('collaboration', 'points', newPoints);
                          }}
                          className="flex-grow bg-black/20 border border-white/10 rounded-xl p-3 text-white text-sm focus:outline-none"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* FAQ FORM BUILDER */}
            {activeSection === 'faq' && (
              <div className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  <div>
                    <label className="block text-xs font-black uppercase tracking-widest text-white/40 mb-2">Section Badge</label>
                    <input
                      type="text"
                      value={currentData.badge || ''}
                      onChange={(e) => updateField('faq', 'badge', e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white text-sm focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-black uppercase tracking-widest text-white/40 mb-2">Title Main</label>
                    <input
                      type="text"
                      value={currentData.title || ''}
                      onChange={(e) => updateField('faq', 'title', e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white text-sm focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-black uppercase tracking-widest text-white/40 mb-2">Title Accent</label>
                    <input
                      type="text"
                      value={currentData.titleAccent || ''}
                      onChange={(e) => updateField('faq', 'titleAccent', e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white text-sm focus:outline-none"
                    />
                  </div>
                  <div className="md:col-span-3">
                    <label className="block text-xs font-black uppercase tracking-widest text-white/40 mb-2">Section Description</label>
                    <input
                      type="text"
                      value={currentData.description || ''}
                      onChange={(e) => updateField('faq', 'description', e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white text-sm focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-bold uppercase tracking-wider text-accent mb-6">FAQ Q&A List</h4>
                  <div className="space-y-6">
                    {(currentData.faqsList || []).map((faq: any, index: number) => (
                      <div key={index} className="bg-white/3 p-4 rounded-xl border border-white/5 space-y-3">
                        <span className="text-xs font-bold text-accent">Question #{index + 1}</span>
                        <div>
                          <label className="block text-[10px] font-black uppercase tracking-widest text-white/30 mb-2">Question Text</label>
                          <input
                            type="text"
                            value={faq.question || ''}
                            onChange={(e) => {
                              const newFaq = [...currentData.faqsList];
                              newFaq[index] = { ...newFaq[index], question: e.target.value };
                              updateField('faq', 'faqsList', newFaq);
                            }}
                            className="w-full bg-black/20 border border-white/10 rounded-xl p-3 text-white text-sm focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-black uppercase tracking-widest text-white/30 mb-2">Answer Explanation</label>
                          <textarea
                            rows={3}
                            value={faq.answer || ''}
                            onChange={(e) => {
                              const newFaq = [...currentData.faqsList];
                              newFaq[index] = { ...newFaq[index], answer: e.target.value };
                              updateField('faq', 'faqsList', newFaq);
                            }}
                            className="w-full bg-black/20 border border-white/10 rounded-xl p-3 text-white text-xs focus:outline-none"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* CEO MESSAGE FORM BUILDER */}
            {activeSection === 'ceo_section' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-black uppercase tracking-widest text-white/40 mb-2">Section Badge</label>
                  <input
                    type="text"
                    value={currentData.badge || ''}
                    onChange={(e) => updateField('ceo_section', 'badge', e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white text-sm focus:outline-none focus:border-accent/40"
                  />
                </div>
                <div>
                  <label className="block text-xs font-black uppercase tracking-widest text-white/40 mb-2">Header Title</label>
                  <input
                    type="text"
                    value={currentData.title || ''}
                    onChange={(e) => updateField('ceo_section', 'title', e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white text-sm focus:outline-none focus:border-accent/40"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs font-black uppercase tracking-widest text-white/40 mb-2">CEO Quote (Message block)</label>
                  <textarea
                    rows={4}
                    value={currentData.quote || ''}
                    onChange={(e) => updateField('ceo_section', 'quote', e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-accent/40 resize-y"
                  />
                </div>
                <div>
                  <label className="block text-xs font-black uppercase tracking-widest text-white/40 mb-2">CEO Full Name</label>
                  <input
                    type="text"
                    value={currentData.ceoName || ''}
                    onChange={(e) => updateField('ceo_section', 'ceoName', e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white text-sm focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-black uppercase tracking-widest text-white/40 mb-2">CEO Role / Title</label>
                  <input
                    type="text"
                    value={currentData.ceoRole || ''}
                    onChange={(e) => updateField('ceo_section', 'ceoRole', e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white text-sm focus:outline-none"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs font-black uppercase tracking-widest text-white/40 mb-2">Signature Text</label>
                  <input
                    type="text"
                    value={currentData.signatureText || ''}
                    onChange={(e) => updateField('ceo_section', 'signatureText', e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:outline-none"
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer info */}
        <footer className="mt-6 pt-4 border-t border-white/5 text-center text-[10px] text-white/20">
          <span>Secure Watch 24 Services Admin Console • Connected via Prisma Client to MongoDB Cluster</span>
        </footer>
      </main>
    </div>
  );
}
