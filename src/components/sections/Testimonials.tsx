import React from 'react';
import { siteConfig } from '../../config/site.config';

export const Testimonials: React.FC = () => {
  const testimonials = siteConfig.testimonials;
  return (
    <section className="section">
      <div className="container">
        <h2 className="font-montserrat text-3xl md:text-4xl font-semibold text-center mb-8">Opiniones</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {testimonials.map((t) => (
            <div key={t.company} className="bg-white rounded-xl p-6 shadow-card">
              <div className="text-primary font-semibold">{t.company}</div>
              <p className="mt-2 text-textLight">“{t.text}”</p>
              <div className="mt-3 text-sm text-textLight">{t.author}</div>
              <div className="mt-2" aria-label={`Rating ${t.rating} de 5`}>
                {'⭐'.repeat(t.rating)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
