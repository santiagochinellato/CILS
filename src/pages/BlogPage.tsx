import React, { useEffect } from 'react';
import { Header } from '../components/layout/Header';
import { Blog } from '../components/sections/Blog';
import { Footer } from '../components/layout/Footer';
import { FloatingActions } from '../components/layout/FloatingActions';
import { pagesConfig } from '../config/site.config';
import { applySeo } from '../utils/seo';

export const BlogPage: React.FC = () => {
  useEffect(() => {
    applySeo({
      ...pagesConfig.seo,
      title: pagesConfig.seo.title + ' | Blog',
      description: 'Novedades y artículos sobre contabilidad, impuestos, laboral y societario.'
    });
  }, []);
  return (
    <>
      <Header />
      <main id="main" className="pt-24">
        <section className="section">
          <div className="container">
            <Blog />
          </div>
        </section>
      </main>
      <Footer />
      <FloatingActions />
    </>
  );
};
