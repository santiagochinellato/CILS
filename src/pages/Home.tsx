import React, { useEffect } from 'react';
import { Header } from '../components/layout/Header';
import { Hero } from '../components/sections/Hero';
import { StatsBar } from '../components/sections/StatsBar';
import { About } from '../components/sections/About';
import { Services } from '../components/sections/Services';
import { Clients } from '../components/sections/Clients';
import { Testimonials } from '../components/sections/Testimonials';
import { Blog } from '../components/sections/Blog';
import { Contact } from '../components/sections/Contact';
import { Footer } from '../components/layout/Footer';
import { FloatingActions } from '../components/layout/FloatingActions';
import { homeConfig } from '../config/site.config';
import { applySeo } from '../utils/seo';

export const Home: React.FC = () => {
  useEffect(() => {
    applySeo(homeConfig.seo);
  }, []);
  return (
    <>
      <Header />
      <main id="main">
        <Hero />
        <About />
        <StatsBar />
        <Clients />
        <Testimonials />
  <Blog limit={3} />
        {/* <Contact /> */}
      </main>
      <Footer />
      <FloatingActions />
    </>
  );
};
