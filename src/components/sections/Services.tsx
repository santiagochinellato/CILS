import React from 'react';
import { siteConfig } from '../../config/site.config';
import { ServiceCard } from '../../components/ServiceCard';
import { iconForService } from '../../components/ui/icons';

const services = siteConfig.services;

export const Services: React.FC = () => {
  return (
    <section id="services" className="section">
      <div className="container">
        <h2 className="font-montserrat text-3xl md:text-4xl font-semibold text-center">
          Nuestros Servicios Profesionales
        </h2>
        <p className="text-textLight dark:text-white/70 text-center mt-3">Cuatro pilares fundamentales para el éxito de tu empresa</p>
        <div className="mt-10 grid sm:grid-cols-2 gap-6">
          {services.map((s) => (
            <ServiceCard
              key={s.title}
              icon={iconForService(s.title)}
              title={s.title}
              description={s.description}
              features={s.features}
              href={s.href}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
