import Navbar from '../src/components/Navbar';
import Hero from '../src/components/sections/Hero';
import Services from '../src/components/sections/Services';
import Industries from '../src/components/sections/Industries';
import Pricing from '../src/components/sections/Pricing';
import Collaboration from '../src/components/sections/Collaboration';
import Footer from '../src/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <Services />
      <Industries />
      <Collaboration />
      <Pricing />
      <Footer />
    </main>
  );
}
