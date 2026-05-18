'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '../src/components/Navbar';
import Hero from '../src/components/sections/Hero';
import AboutUs from '../src/components/sections/AboutUs';
import KeyFeatures from '../src/components/sections/KeyFeatures';
import Services from '../src/components/sections/Services';
import Industries from '../src/components/sections/Industries';
import Pricing from '../src/components/sections/Pricing';
import Collaboration from '../src/components/sections/Collaboration';
import FAQ from '../src/components/sections/FAQ';
import CEOSection from '../src/components/sections/CEOSection';
import Footer from '../src/components/Footer';

export default function Home() {
  const [sectionsData, setSectionsData] = useState<any>(null);

  useEffect(() => {
    const fetchDynamicData = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/sections');
        if (res.ok) {
          const data = await res.json();
          setSectionsData(data);
          console.log('⚡ Dynamic data successfully synchronized from MongoDB!');
        } else {
          console.warn('⚠️ Server returned error. Using pre-coded static fallbacks.');
        }
      } catch (error) {
        console.warn('ℹ️ Express backend is offline. Site is running on static fallback mode.');
      }
    };

    fetchDynamicData();
  }, []);

  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero data={sectionsData?.hero} />
      <AboutUs data={sectionsData?.about_us} />
      <KeyFeatures data={sectionsData?.key_features} />
      <Services data={sectionsData?.services} />
      <Industries data={sectionsData?.industries} />
      <Pricing data={sectionsData?.pricing} />
      <Collaboration data={sectionsData?.collaboration} />
      <FAQ data={sectionsData?.faq} />
      <CEOSection data={sectionsData?.ceo_section} />
      <Footer />
    </main>
  );
}
