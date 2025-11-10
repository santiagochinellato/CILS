import React, { useMemo } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { siteConfig } from '../config/site.config';

// Carrusel infinito horizontal simple duplicando elementos.
export const ClientCarousel: React.FC = () => {
  const clients = siteConfig.clients.filter(c => c.logo);
  // Para bucle continuo duplicamos la lista
  const loopItems = useMemo(() => [...clients, ...clients], [clients]);
  const controls = useAnimation();

  return (
    <div className="relative w-full overflow-hidden">
      <motion.div
        className="flex gap-10 items-center"
        initial={{ x: 0 }}
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
      >
        {loopItems.map((c, i) => (
          <a
            key={c.name + i}
            href={c.href || '#'}
            className="flex-shrink-0 group"
            aria-label={`Cliente: ${c.name}`}
          >
            <div className="w-[150px] h-[90px] flex items-center justify-center p-4 rounded-lg bg-white dark:bg-white/5 border border-white/10 shadow-sm hover:shadow-md transition-shadow">
              <img
                src={c.logo}
                alt={c.name}
                width={150}
                height={90}
                loading="lazy"
                className="max-w-full max-h-full object-contain opacity-80 group-hover:opacity-100 transition-opacity"
                style={{ aspectRatio: '400 / 240' }}
              />
            </div>
          </a>
        ))}
      </motion.div>
      {/* Gradientes laterales para suavizar entrada/salida */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-background dark:from-[#0F1C21] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-background dark:from-[#0F1C21] to-transparent" />
    </div>
  );
};
