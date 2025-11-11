import React from 'react';
import { siteConfig } from '../../config/site.config';
import { Icon } from '../ui/Icon';
import { cn } from '../../utils/cn';

// Paleta de variantes util para dar variedad visual
const colorVariants = [
  'bg-primary text-white',
  'bg-secondary text-white',
  'bg-accent1 text-white',
  'bg-accent2 text-white',
  'bg-white text-text dark:bg-[#1F2C21] dark:text-white border border-gray-200 dark:border-white/10'
];

export const LinksSection: React.FC = () => {
  const links = siteConfig.links ?? [];
  if (!links.length) return null;
  return (
    <section className="section" id="links">
      <div className="container">
        <header className="mb-10 max-w-2xl">
                                        <span className="inline-block px-3 py-1 rounded bg-accent2 text-primary text-sm font-medium">
       Aquí encontrarás
            </span>
          <h1 className="mt-4 font-montserrat text-3xl md:text-4xl font-semibold">Herramientas y accesos útiles</h1>
          <p className="mt-4 text-textLight">Accesos directos a recursos externos frecuentes para validar información fiscal, societaria y operativa.</p>
        </header>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {links.map((l, i) => {
            const variant = colorVariants[i % colorVariants.length];
            return (
              <a
                key={l.href}
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                className={cn('group rounded-xl p-5 shadow-card flex flex-col gap-4 transition transform hover:-translate-y-1 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-accent1', variant)}
                aria-label={`${l.title} - abrir en nueva pestaña`}
              >
                <div className="flex items-center gap-3">
                  <Icon name={l.icon as any} size={26} context={variant.startsWith('bg-white') ? 'default' : 'footer'} />
                  <h2 className="text-lg font-semibold font-montserrat flex-1 leading-snug">{l.title}</h2>
                  <Icon name="arrowRight" size={18} context={variant.startsWith('bg-white') ? 'default' : 'footer'} className="opacity-70 group-hover:translate-x-1 transition-transform" />
                </div>
                <p className={cn('text-sm leading-relaxed', variant.startsWith('bg-white') ? 'text-textLight dark:text-white/70' : 'text-white/90')}>{l.description}</p>
                <span className={cn('inline-flex items-center gap-1 text-xs font-medium mt-auto', variant.startsWith('bg-white') ? 'text-primary dark:text-accent1' : 'text-white/90')}>
                  Abrir recurso externo
                </span>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
};
