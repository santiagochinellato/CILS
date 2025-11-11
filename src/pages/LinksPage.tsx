import React, { useEffect } from 'react';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { FloatingActions } from '../components/layout/FloatingActions';
import { LinksSection } from '../components/sections/Links';
import { pagesConfig } from '../config/site.config';
import { applySeo } from '../utils/seo';

export const LinksPage: React.FC = () => {
  useEffect(() => {
    applySeo({
      ...pagesConfig.seo,
      title: pagesConfig.seo.title + ' | Links útiles',
      description: 'Accesos rápidos a herramientas fiscales y de validación para agilizar gestiones.'
    });
  }, []);
  return (
    <>
      <Header />
      <main id="main" className="pt-24">
        <LinksSection />
      </main>
      <Footer />
      <FloatingActions />
    </>
  );
};

export default LinksPage;
