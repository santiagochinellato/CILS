import React, { useEffect } from 'react';
import { Header } from '../components/layout/Header';
import { Clients } from '../components/sections/Clients';
import { Footer } from '../components/layout/Footer';
import { FloatingActions } from '../components/layout/FloatingActions';
import { pagesConfig } from '../config/site.config';
import { applySeo } from '../utils/seo';
import { Testimonials } from '../components/sections/Testimonials';

export const ClientsPage: React.FC = () => {
  useEffect(() => {
    applySeo({
      ...pagesConfig.seo,
      title: pagesConfig.seo.title + ' | Clientes',
      description: 'Empresas que confían en Estudio CILS: casos y alianzas destacadas.'
    });
  }, []);
  return (
    <>
      <Header />
      <main id="main" className="pt-24">
        <section className="section"><div className="container"><h1 className="font-montserrat text-3xl md:text-4xl font-semibold text-center">Clientes</h1></div></section>
        <Clients />
        <section className="section"><div className="container"><h2 className="font-montserrat text-2xl md:text-3xl font-semibold text-center">Testimonios</h2></div></section>
        <Testimonials />
      </main>
      <Footer />
      <FloatingActions />
    </>
  );
};
