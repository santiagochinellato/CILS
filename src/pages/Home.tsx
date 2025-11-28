import React, { useEffect, lazy, Suspense } from 'react';
import { Header } from '../components/layout/Header';
import { Hero } from '../components/sections/Hero';
import { StatsBar } from '../components/sections/StatsBar';
import { About } from '../components/sections/About';
import { Services } from '../components/sections/Services';
import { Footer } from '../components/layout/Footer';
import { FloatingActions } from '../components/layout/FloatingActions';
import { homeConfig } from '../config/site.config';
import { applySeo } from '../utils/seo';

// Lazy load sections below the fold
const Clients = lazy(() =>
  import('../components/sections/Clients').then((m) => ({ default: m.Clients }))
);
const Testimonials = lazy(() =>
  import('../components/sections/Testimonials').then((m) => ({ default: m.Testimonials }))
);
const Novedades = lazy(() =>
  import('../components/sections/Novedades').then((m) => ({ default: m.Novedades }))
);
// const Contact = lazy(() => import('../components/sections/Contact').then(m => ({ default: m.Contact })));

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
        <Suspense fallback={<div className="h-32" />}>
          <Clients />
        </Suspense>
        {/* <Services /> */}
        {/* <Suspense fallback={<div className="h-32" />}>
          <Testimonials />
        </Suspense> */}
        <Suspense fallback={<div className="h-32" />}>
          <Novedades limit={3} />
        </Suspense>
        {/* <Suspense fallback={<div className="h-32" />}>
          <Contact />
        </Suspense> */}
      </main>
      <Footer />
      <FloatingActions />
    </>
  );
};
