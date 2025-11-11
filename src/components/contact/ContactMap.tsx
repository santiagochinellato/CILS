import React from 'react';
import { siteConfig } from '../../config/site.config';

interface ContactMapProps {
  className?: string;
}

export const ContactMap: React.FC<ContactMapProps> = ({ className }) => {
  const { contact: c } = siteConfig;
  const gmapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(c.address)}`;
  const embedUrl = `https://www.google.com/maps?q=${encodeURIComponent(c.address)}&output=embed`;

  return (
    <div className={className}>
      <div className="relative rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 shadow-card group">
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
      </div>
    </div>
  );
};