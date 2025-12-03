import React, { useEffect } from 'react';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { FloatingActions } from '../components/layout/FloatingActions';
import { Novedades } from '../components/sections/Novedades';
import { pagesConfig } from '../config/site.config';
import { applySeo } from '../utils/seo';

export const NovedadesPage: React.FC = () => {
  useEffect(() => {
    applySeo({
      ...pagesConfig.seo,
      title: pagesConfig.seo.title + ' | Novedades',
      description: 'Agregador de noticias y novedades relevantes para empresas en la región Patagonia.'
    });
  }, []);
  return (
    <>
      <Header />
      <main id="main" className="pt-24 min-h-[calc(100vh-400px)]">
        <Novedades limit={18} />
      </main>
      <Footer />
      <FloatingActions />
    </>
  );
};
