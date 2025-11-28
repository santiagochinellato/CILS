import React from 'react';
import { useSiteConfig } from '../../config/site.config';
import { ClientCarousel } from '../ClientCarousel';
import { SectionHeader } from '../SectionHeader';

export const Clients: React.FC = () => {
  const siteConfig = useSiteConfig();
  const clients = siteConfig.clients;
  return (
    <section id="clients" className="section">
      <div className="container flex justify-center flex-col items-center md:items-start">
        <SectionHeader 
          badge="Somos parte de un gran equipo" 
          title="Empresas que confían en nosotros"
          className="mb-8"
        />
        <ClientCarousel />
      </div>
    </section>
  );
};
