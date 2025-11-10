import React from 'react';
import { siteConfig } from '../../config/site.config';
import { ClientCarousel } from '../ClientCarousel';

export const Clients: React.FC = () => {
  const clients = siteConfig.clients;
  return (
    <section id="clients" className="section">
      <div className="container">
        <h3 className="font-montserrat text-3xl md:text-4xl font-semibold text-center mb-8">
          Empresas que confían en nosotros
        </h3>
        <ClientCarousel />
      </div>
    </section>
  );
};
