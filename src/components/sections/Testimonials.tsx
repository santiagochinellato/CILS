import React from 'react';
import { siteConfig } from '../../config/site.config';
import { SectionHeader } from '../SectionHeader';
import { TestimonialCard } from '../TestimonialCard';

export const Testimonials: React.FC = () => {
  const testimonials = siteConfig.testimonials;
  return (
    <section className="section">
      <div className="container flex justify-center flex-col items-center md:items-start">
        <SectionHeader 
          badge="Tu opinión nos importa" 
          title="Opiniones de nuestros clientes"
          className="mb-8"
        />
        <div className="grid md:grid-cols-2 gap-6">
          {testimonials.map((t) => <TestimonialCard key={t.company} {...t} />)}
        </div>
      </div>
    </section>
  );
};
