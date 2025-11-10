import React, { useEffect } from 'react';
import { Header } from '../components/layout/Header';
import { About } from '../components/sections/About';
import { Team } from '../components/sections/Team';
import { Footer } from '../components/layout/Footer';
import { FloatingActions } from '../components/layout/FloatingActions';
import { pagesConfig } from '../config/site.config';
import { applySeo } from '../utils/seo';

export const AboutPage: React.FC = () => {
  useEffect(() => {
    applySeo({
      ...pagesConfig.seo,
      title: pagesConfig.seo.title + ' | Quiénes Somos',
      description: 'Equipo profesional dinámico y actualizado. Conócenos, nuestra misión, visión y compromiso.'
    });
  }, []);
  return (
    <>
      <Header />
      <main id="main" className="pt-24">
        <About />
        <Team />
      </main>
      <Footer />
      <FloatingActions />
    </>
  );
};
