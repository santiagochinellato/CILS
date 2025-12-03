import React, { memo, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useSiteConfig } from '../config/site.config';
import { getSanityImageUrl } from '../lib/sanity/imageHelper';

// Carrusel infinito horizontal simple duplicando elementos.
export const ClientCarousel = memo(() => {
  const siteConfig = useSiteConfig();
  const clients = siteConfig.clients.filter(c => c.logo);
  
  // Función helper para obtener la URL de la imagen optimizada
  const getImageUrl = (logo: string | undefined) => {
    return getSanityImageUrl(logo, {
      width: 160,
      height: 96,
      quality: 80,
      format: 'webp',
      fit: 'max'
    });
  };
  
  // Para bucle continuo duplicamos la lista
  const loopItems = useMemo(() => [...clients, ...clients], [clients]);

  return (
    <div className="relative w-full overflow-hidden">
      <motion.div
        className="flex gap-10 items-center"
        initial={{ x: 0 }}
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
      >
        {loopItems.map((c, i) => (
          <div
            key={`${c.name}-${i}`}
          >
            <div className="w-[150px] h-[90px] flex items-center justify-center p-4 rounded-lg bg-white dark:bg-white/5 border border-white/10 shadow-sm hover:shadow-md transition-shadow">
              <img
                src={getImageUrl(c.logo)}
                alt={c.name}
                width={160}
                height={96}
                loading="lazy"
                className="max-w-full max-h-full object-contain opacity-80 group-hover:opacity-100 transition-opacity"
                style={{ aspectRatio: '160 / 96' }}
              />
            </div>
          </div>
        ))}
      </motion.div>
      {/* Gradientes laterales para suavizar entrada/salida */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-background dark:from-[#0F1C21] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-background dark:from-[#0F1C21] to-transparent" />
    </div>
  );
});

ClientCarousel.displayName = 'ClientCarousel';
