import React, { useEffect } from 'react';
import { Header } from '../components/layout/Header';
import { Services } from '../components/sections/Services';
import { Footer } from '../components/layout/Footer';
import { FloatingActions } from '../components/layout/FloatingActions';
import { pagesConfig } from '../config/site.config';
import { applySeo } from '../utils/seo';

export const ServicesPage: React.FC = () => {
  useEffect(() => {
    applySeo({
      ...pagesConfig.seo,
      title: pagesConfig.seo.title + ' | Servicios',
      description: 'Servicios profesionales: Contable, Impositiva, Laboral, Societaria.'
    });
  }, []);
  return (
    <>
      <Header />
      <main id="main" className="pt-24">
        <section className="section"><div className="container">
            
        <Services />
            </div>
            </section>
      </main>
      <Footer />
      <FloatingActions />
    </>
  );
};
