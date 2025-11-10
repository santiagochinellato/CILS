import React, { useEffect } from 'react';
import { Header } from '../components/layout/Header';
import { Contact } from '../components/sections/Contact';
import { Footer } from '../components/layout/Footer';
import { FloatingActions } from '../components/layout/FloatingActions';
import { pagesConfig } from '../config/site.config';
import { applySeo } from '../utils/seo';

export const ContactPage: React.FC = () => {
  useEffect(() => {
    applySeo({
      ...pagesConfig.seo,
      title: pagesConfig.seo.title + ' | Contacto',
      description: 'Agenda una consulta y recibe asesoramiento integral para tu empresa.'
    });
  }, []);
  return (
    <>
      <Header />
      <main id="main" className="pt-24">
        <Contact />
      </main>
      <Footer />
      <FloatingActions />
    </>
  );
};
