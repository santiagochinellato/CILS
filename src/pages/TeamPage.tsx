import React, { useEffect } from 'react';
import { Header } from '../components/layout/Header';
import { Team } from '../components/sections/Team';
import { Footer } from '../components/layout/Footer';
import { FloatingActions } from '../components/layout/FloatingActions';
import { pagesConfig } from '../config/site.config';
import { applySeo } from '../utils/seo';

export const TeamPage: React.FC = () => {
  useEffect(() => {
    applySeo({
      ...pagesConfig.seo,
      title: pagesConfig.seo.title + ' | Equipo',
      description: 'Conoce al equipo de Estudio CILS: socios, asociados y áreas de especialidad.'
    });
  }, []);
  return (
    <>
      <Header />
      <main id="main" className="pt-24">
        <section className="section"><div className="container"><h1 className="font-montserrat text-3xl md:text-4xl font-semibold text-center">Equipo</h1></div></section>
        <Team />
      </main>
      <Footer />
      <FloatingActions />
    </>
  );
};
