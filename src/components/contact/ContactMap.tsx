import React, { useState } from 'react';
import { useSiteConfig } from '../../config/site.config';

interface ContactMapProps {
  className?: string;
}

export const ContactMap: React.FC<ContactMapProps> = ({ className }) => {
  const siteConfig = useSiteConfig();
  const { contact: c } = siteConfig;
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const gmapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(c.address)}`;
  const embedUrl = `https://www.google.com/maps?q=${encodeURIComponent(c.address)}&output=embed`;

  const handleLoadMap = () => {
    setIsMapLoaded(true);
  };

  return (
    <div className={className}>
      <div className="relative rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 shadow-card group">
        {!isMapLoaded ? (
          // Facade: Muestra un botón antes de cargar el mapa
          <div className="relative w-full h-[260px] md:h-[300px] bg-gradient-to-br from-primary/10 to-accent1/10 dark:from-primary/20 dark:to-accent1/20 flex items-center justify-center">
            <button
              onClick={handleLoadMap}
              className="px-6 py-3 bg-primary hover:bg-primary/90 text-white rounded-lg font-medium shadow-lg transition-all hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              aria-label={`Cargar mapa de ${c.address}`}
            >
              <svg className="inline-block w-5 h-5 mr-2 -mt-1" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/>
              </svg>
              Ver mapa de ubicación
            </button>
            <div className="absolute bottom-3 left-3 right-3">
              <p className="text-xs text-center text-gray-600 dark:text-gray-400">
                {c.address}
              </p>
            </div>
          </div>
        ) : (
          // Mapa cargado
          <>
            <iframe
              title={`Mapa de ${c.address}`}
              src={embedUrl}
              loading="lazy"
              className="w-full h-[260px] md:h-[300px] pointer-events-none"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <a
              href={gmapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Abrir ubicación ${c.address} en Google Maps`}
              className="absolute inset-0"
            >
              <span className="sr-only">Abrir en Google Maps</span>
            </a>
            <div className="pointer-events-none absolute bottom-3 right-3">
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <span className="inline-block px-3 py-1 rounded bg-black/70 text-white text-xs font-medium">Abrir en Google Maps</span>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};