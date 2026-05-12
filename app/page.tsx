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
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <AboutUs />
      <KeyFeatures />
      <Services />
      <Industries />
      <Pricing />
      <Collaboration />
      <FAQ />
      <CEOSection />
      <Footer />
    </main>
  );
}
