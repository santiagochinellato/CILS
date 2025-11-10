import React from 'react';
import { siteConfig } from '../../config/site.config';
import { motion } from 'framer-motion';
import { Icon } from '../ui/Icon';

export const Hero: React.FC = () => {
  const hero = siteConfig.hero;
  return (
    <section id="hero" className="pt-32 section bg-gradient-to-br from-secondary to-accent2 text-white">
      <div className="container z-index-10">
        <div className=" grid md:grid-cols-2 gap-10 items-center pt-8">
          <div>
            <span className="inline-block px-3 py-1 rounded-full bg-white/20 text-sm">{hero.badge}</span>
            <h1 className="mt-4 font-montserrat font-bold text-4xl md:text-5xl leading-tight">
              {hero.title}
            </h1>
            <p className="mt-4 text-white/90 text-lg">{hero.subtitle}</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a className="bg-white text-secondary font-semibold px-6 py-3 rounded-md" href={hero.ctaPrimary.href}>{hero.ctaPrimary.label}</a>
              <a className="border border-white/70 text-white hover:bg-white/10 px-6 py-3 rounded-md" href={hero.ctaSecondary.href}>{hero.ctaSecondary.label}</a>
            </div>
            <p className="mt-6 text-white/80">{hero.trust}</p>
          </div>
          <div className="relative h-64 md:h-80 rounded-xl bg-white/10 border border-white/20 overflow-hidden">
            <img 
              src="/images/homeWall.jpg" 
              alt="Equipo Estudio CILS" 
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        </div>
                    {/* <motion.div
              className="absolute top-30 left-2 z-index-0"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 6, repeat: Infinity }}
            >
              <Icon name="circle" size={48} context="accent" />
            </motion.div>
            <motion.div
              className="absolute top-20 left-20"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 5, repeat: Infinity }}
            >
              <Icon name="pieChart" size={40} context="service" />
            </motion.div>
            <motion.div
              className="absolute top-1/2 right-20 -translate-x-1/2"
              animate={{ scale: [1, 1.15, 1] }}
              transition={{ duration: 8, repeat: Infinity }}
            >
              <Icon name="barChart3" size={60} context="stat" />
            </motion.div> */}
      </div>
    </section>
  );
};
