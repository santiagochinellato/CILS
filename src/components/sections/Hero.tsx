import React from 'react';
import { siteConfig } from '../../config/site.config';
import { Link } from 'react-router-dom';

export const Hero: React.FC = () => {
  const hero = siteConfig.hero;
  return (
    <section id="hero" className="pt-32 section bg-gradient-to-br from-secondary to-accent2 text-white" aria-label="Sección principal">
      <div className="container z-index-10">
        <div className=" grid lg:grid-cols-2 gap-10 items-center pt-16">
          <header className='flex flex-col items-center lg:items-start w-full'>
            <span className="inline-block px-3 py-1 rounded-full bg-white/20 text-sm text-center lg:text-start w-fit" aria-label="Destacado">{hero.badge}</span>
            <h1 className="mt-4 font-montserrat font-bold text-4xl md:text-5xl leading-tight text-center lg:text-start">
              {hero.title}
            </h1>
            <p className="mt-4 text-white/90 text-lg text-center lg:text-start">{hero.subtitle}</p>
            <div className="mt-8 flex flex-wrap gap-4 justify-center lg:justify-start" role="group" aria-label="Acciones principales">
              <Link 
                to={hero.ctaPrimary.href} 
                className="bg-white text-secondary font-semibold px-6 py-3 rounded-md hover:bg-white/90 transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-secondary"
              >
                {hero.ctaPrimary.label}
              </Link>
              <Link 
                to={hero.ctaSecondary.href} 
                className="border-2 border-white/70 text-white hover:bg-white/10 px-6 py-3 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-secondary"
              >
                {hero.ctaSecondary.label}
              </Link>
            </div>
            <p className="mt-6 text-white/80 text-sm">{hero.trust}</p>
          </header>
          <figure className="relative h-64 md:h-80 rounded-xl bg-white/10 border border-white/20 overflow-hidden hidden lg:block">
            <img 
              src="images/homeWall.jpg" 
              alt="Equipo Estudio CILS" 
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </figure>
        </div>
      </div>
    </section>
  );
};
