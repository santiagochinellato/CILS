import React from 'react';
import { siteConfig } from '../../config/site.config';
import { FeatureItem } from '../../components/FeatureItem';
import { icons } from '../../components/ui/icons';
import { ServiceCardSlim } from '../../components/ServiceCardSlim';

export const About: React.FC = () => {
  const about = siteConfig.about;
  return (
    <section id="about" className="section">
      <div className="container grid md:grid-cols-2 gap-10 items-center">
        <div>
          <span className="inline-block px-3 py-1 rounded bg-accent2 text-primary text-sm font-medium">{about.badge}</span>
          <h2 className="mt-4 font-montserrat text-3xl md:text-4xl font-semibold">{about.title}</h2>
          {about.paragraphs.map((p, i) => (
            <p key={i} className={i === 0 ? 'mt-4 text-textLight' : 'mt-3 text-textLight'}>
              {p}
            </p>
          ))}
          <div className="mt-4 space-y-3">
            {about.features.map((f) => {
              const lower = f.toLowerCase();
              let icon: keyof typeof icons = 'badgeCheck';
              if (lower.includes('calidad')) icon = 'calidad';
              else if (lower.includes('sinerg')) icon = 'integral';
              else if (lower.includes('confi') || lower.includes('transpar')) icon = 'etica';
              else if (lower.includes('estánd') || lower.includes('estandar') || lower.includes('alto')) icon = 'excelencia';
              return <FeatureItem key={f} icon={icon} text={f.replace(/^✓\s?/, '')} />;
            })}
          </div>
        </div>
        <div>
          <div className="">
            <div className="grid grid-cols-2 gap-4 dark:bg-[#1F2C33] p-4 rounded-lg">
              {about.pillars.map((p) => {
                // Mapear pilar a icono y descripción corta
                const key = p.toLowerCase();
                let icon: keyof typeof icons = 'badgeCheck';
                let description = '';
                if (key.includes('contable')) {
                  icon = 'contable';
                  description = 'Estados contables e informes para gestión.';
                } else if (key.includes('imposit')) {
                  icon = 'impositivo';
                  description = 'Planificación y cumplimiento fiscal integral.';
                } else if (key.includes('labor')) {
                  icon = 'laboral';
                  description = 'Procesos laborales y liquidación confiable.';
                } else if (key.includes('societ')) {
                  icon = 'societaria';
                  description = 'Estructura legal y reformas societarias.';
                }
                return (
                  <ServiceCardSlim
                    key={p}
                    icon={icon as any}
                    title={p}
                    description={description}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
