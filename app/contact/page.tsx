"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  ShieldCheck,
  ArrowLeft,
  AlertCircle,
  Check,
} from "lucide-react";
import Link from "next/link";
import Navbar from "../../src/components/Navbar";
import Footer from "../../src/components/Footer";
import { apiFetch } from "../../src/utils/api";
import { SectionsData } from "../../src/types/sections";

const ContactPage = () => {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [sectionsData, setSectionsData] = useState<SectionsData | null>(null);

  console.log("sectionsData", sectionsData);

  useEffect(() => {
    const fetchDynamicData = async () => {
      try {
        const data = await apiFetch("/sections");
        setSectionsData(data);
      } catch (error) {
        console.warn(
          "ℹ️ Dynamic sections fetch offline. Site is running on static fallback mode.",
          error,
        );
      }
    };

    fetchDynamicData();
  }, []);

  const phone1 = sectionsData?.footer?.phone1 || "+92 309 8344704";
  const phone2 = sectionsData?.footer?.phone2 || "+92 344 2553858";
  const email1 = sectionsData?.footer?.email1 || "contact@sw24services.com";
  const email2 =
    sectionsData?.footer?.email2 || "securewatch24services@gmail.com";
  const address =
    sectionsData?.footer?.address ||
    "Office No D-35, 2nd Floor,\nShahrah-e-Faisal,\nKarachi, Pakistan";
  const usaAddress =
    sectionsData?.collaboration?.usaAddress ||
    "7447 Harwin Drive, Houston, TX, USA";
  const usaPhone = sectionsData?.collaboration?.usaPhone || "+1 (281) 702-9418";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMsg("");
    setErrorMsg("");

    try {
      const response = await apiFetch("/contact", {
        method: "POST",
        body: JSON.stringify(formState),
      });

      setSuccessMsg(
        response.message ||
          "Thank you for reaching out! Our security team will contact you shortly.",
      );
      setFormState({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (err: unknown) {
      setErrorMsg(
        err instanceof Error
          ? err.message
          : "Failed to send your message. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-primary-dark overflow-hidden flex flex-col">
      <Navbar />

      <section className="relative pt-24 md:pt-32 pb-12 md:pb-20 flex-grow">
        {/* Decorative background elements */}
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-accent/10 rounded-full blur-[120px] -z-10 animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] -z-10 animate-pulse-slow"></div>

        <div className="container relative z-10 px-6">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-10 md:mb-16"
            >
              <Link
                href="/"
                className="inline-flex items-center text-accent hover:text-white transition-colors mb-6 group text-xs font-black uppercase tracking-widest"
              >
                <ArrowLeft
                  size={16}
                  className="mr-2 group-hover:-translate-x-1 transition-transform"
                />
                Back to Home
              </Link>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-6 tracking-tighter">
                Contact Our{" "}
                <span className="text-gradient">Security Experts</span>
              </h1>
              <p className="text-lg md:text-xl text-white/50 max-w-2xl">
                Ready to secure your property? Get in touch for a custom
                consultation or a free security audit of your facility.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16">
              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="glass p-6 md:p-10 rounded-3xl border-white/5 shadow-2xl card-hover relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-3xl"></div>
                <AnimatePresence mode="wait">
                  {successMsg && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="flex items-start space-x-3 p-4 rounded-2xl bg-green-500/10 border border-green-500/20 text-green-400 text-sm mb-6"
                    >
                      <Check size={18} className="shrink-0 mt-0.5" />
                      <span>{successMsg}</span>
                    </motion.div>
                  )}
                  {errorMsg && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="flex items-start space-x-3 p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm mb-6"
                    >
                      <AlertCircle size={18} className="shrink-0 mt-0.5" />
                      <span>{errorMsg}</span>
                    </motion.div>
                  )}
                </AnimatePresence>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest text-white/40 ml-4">
                        Full Name
                      </label>
                      <input
                        type="text"
                        required
                        disabled={loading}
                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-accent/50 focus:bg-white/10 transition-all disabled:opacity-50"
                        placeholder="John Doe"
                        value={formState.name}
                        onChange={(e) =>
                          setFormState({ ...formState, name: e.target.value })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest text-white/40 ml-4">
                        Email Address
                      </label>
                      <input
                        type="email"
                        required
                        disabled={loading}
                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-accent/50 focus:bg-white/10 transition-all disabled:opacity-50"
                        placeholder="john@example.com"
                        value={formState.email}
                        onChange={(e) =>
                          setFormState({ ...formState, email: e.target.value })
                        }
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-white/40 ml-4">
                      Subject
                    </label>
                    <input
                      type="text"
                      required
                      disabled={loading}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-accent/50 focus:bg-white/10 transition-all disabled:opacity-50"
                      placeholder="Security Audit / Pricing Inquiry"
                      value={formState.subject}
                      onChange={(e) =>
                        setFormState({ ...formState, subject: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-white/40 ml-4">
                      Message
                    </label>
                    <textarea
                      required
                      rows={5}
                      disabled={loading}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-accent/50 focus:bg-white/10 transition-all resize-none disabled:opacity-50"
                      placeholder="Describe your security requirements..."
                      value={formState.message}
                      onChange={(e) =>
                        setFormState({ ...formState, message: e.target.value })
                      }
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-accent text-primary-dark font-black uppercase tracking-[0.2em] py-5 rounded-2xl hover:bg-white transition-all duration-300 flex items-center justify-center group disabled:opacity-55 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <div className="w-5 h-5 border-2 border-primary-dark border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      <>
                        Send Message
                        <Send
                          size={18}
                          className="ml-3 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
                        />
                      </>
                    )}
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
                    icon={<Phone size={20} />}
                    title="Call Us"
                    value={phone1}
                    value2={phone2}
                    label="Support 24/7"
                    type="phone"
                  />
                  <ContactInfoCard
                    icon={<Mail size={20} />}
                    title="Email Us"
                    value={email1}
                    value2={email2}
                    label="Support 24/7"
                    type="email"
                  />
                </div>

                <div className="glass p-6 md:p-10 rounded-3xl border-white/5 flex-grow relative overflow-hidden group flex flex-col justify-between card-hover">
                  <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-3xl"></div>

                  <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 h-full">
                    {/* Global Headquarters */}
                    <div className="flex flex-col justify-between h-full">
                      <div>
                        <div className="flex items-center space-x-4 mb-6">
                          <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-primary-dark transition-all duration-500 group-hover:-rotate-6 shrink-0">
                            <MapPin size={24} />
                          </div>
                          <div>
                            <h4 className="text-white font-bold group-hover:text-accent transition-colors">
                              Global Headquarters
                            </h4>
                            <p className="text-xs text-white/40 uppercase font-black tracking-widest">
                              Karachi, PK
                            </p>
                          </div>
                        </div>
                        <div className="mb-6">
                          <p className="text-base text-white/80 leading-relaxed font-semibold whitespace-pre-line group-hover:text-white transition-colors">
                            {address}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* USA Partner Office */}
                    <div className="flex flex-col justify-between h-full border-t md:border-t-0 md:border-l border-white/5 pt-8 md:pt-0 md:pl-8">
                      <div>
                        <div className="flex items-center space-x-4 mb-6">
                          <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-primary-dark transition-all duration-500 group-hover:-rotate-6 shrink-0">
                            <MapPin size={24} />
                          </div>
                          <div>
                            <h4 className="text-white font-bold group-hover:text-accent transition-colors">
                              USA Partner Office
                            </h4>
                            <p className="text-xs text-white/40 uppercase font-black tracking-widest">
                              Houston, TX
                            </p>
                          </div>
                        </div>
                        <div className="mb-6">
                          <p className="text-base text-white/80 leading-relaxed font-semibold whitespace-pre-line group-hover:text-white transition-colors">
                            {usaAddress}
                          </p>
                          {usaPhone && (
                            <p className="text-xs text-accent font-bold mt-2">
                              Hotline: {usaPhone}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Response Time and Security Check */}
                  <div className="relative z-10 mt-8 p-6 rounded-2xl bg-white/5 border border-white/10 flex items-center space-x-4 group-hover:border-accent/30 transition-colors">
                    <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center text-primary-dark shrink-0">
                      <ShieldCheck size={20} />
                    </div>
                    <div>
                      <p className="text-xs font-black text-white uppercase tracking-widest">
                        Response Time
                      </p>
                      <p className="text-sm text-accent font-bold">
                        Under 30 Minutes
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <Footer data={sectionsData?.footer} />
    </main>
  );
};

const ContactInfoCard = ({
  icon,
  title,
  value,
  value2,
  label,
  type,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
  value2?: string;
  label: string;
  type?: "email" | "phone";
}) => {
  const renderValue = (val: string) => {
    if (type === "email") {
      return (
        <a
          href={`mailto:${val}`}
          className="text-white font-bold text-sm md:text-base mb-0.5 group-hover:text-accent transition-colors block hover:underline break-all"
        >
          {val}
        </a>
      );
    }
    if (type === "phone") {
      const cleanPhone = val.replace(/[^+\d]/g, "");
      return (
        <a
          href={`tel:${cleanPhone}`}
          className="text-white font-bold text-sm md:text-base mb-0.5 group-hover:text-accent transition-colors block hover:underline break-all"
        >
          {val}
        </a>
      );
    }
    return (
      <p className="text-white font-bold text-sm md:text-base mb-0.5 group-hover:text-accent transition-colors break-all">
        {val}
      </p>
    );
  };

  return (
    <div className="glass p-6 rounded-3xl border-white/5 transition-all duration-500 group relative overflow-hidden card-hover">
      {/* Glow blur background */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl pointer-events-none"></div>

      <div className="relative z-10 flex flex-col h-full">
        <div className="flex items-center space-x-4 mb-6">
          <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-primary-dark transition-all duration-500 group-hover:-rotate-6 shrink-0">
            {icon}
          </div>
          <span className="text-xs font-black uppercase tracking-widest text-white/40">
            {title}
          </span>
        </div>
        <div className="mb-4">
          {renderValue(value)}
          {value2 && renderValue(value2)}
        </div>
        <p className="text-[10px] text-accent font-black uppercase tracking-widest mt-auto">
          {label}
        </p>
      </div>
    </div>
  );
};

export default ContactPage;
