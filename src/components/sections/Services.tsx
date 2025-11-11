import React from 'react';
import { siteConfig } from '../../config/site.config';
import { ServiceCard } from '../../components/ServiceCard';
import { iconForService } from '../../components/ui/icons';

const services = siteConfig.services;

export const Services: React.FC = () => {
  return (
    <section id="services" className="section">
      <div className="container">
                    <span className="inline-block px-3 py-1 rounded bg-accent2 text-primary text-sm font-medium">
        Conoce sobre
            </span>
        <h2 className="mt-4 ont-montserrat text-3xl md:text-4xl font-semibold text-justify">
          Nuestros Servicios Profesionales
        </h2>
        <p className="text-textLight dark:text-white/70 text-justify mt-5">Nuestro estudio se orienta a la prestación de servicios profesionales en cuatro importantes áreas vinculadas al funcionamiento económico financiero de toda empresa: CONTABLE, IMPOSITIVA, LABORAL y SOCIETARIA.</p>
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
