// Logo exportado como componente React para importación directa
import React from 'react';

interface LogoCILSProps {
  variant?: 'color' | 'white';
  width?: number;
  height?: number;
  className?: string;
  animated?: boolean;
  priority?: boolean;
}

const LogoCILS: React.FC<LogoCILSProps> = ({ variant = 'color', width = 160, height, className = '', animated = false, priority = false }) => {
  const computedHeight = height ?? Math.round(width * (90 / 275));
  const pngSrc = variant === 'white' ? 'images/cilsLogoWhite.png' : 'images/cilsLogo.png';
  const webpSrc = variant === 'white' ? 'images/cilsLogoWhite.webp' : 'images/cilsLogo.webp';
  return (
    <picture className={className + (animated ? ' logo-cils-anim' : '')}>
      <source srcSet={webpSrc} type="image/webp" />
      <img
        src={pngSrc}
        alt="Logo Estudio CILS"
        width={width}
        height={computedHeight}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        style={{ aspectRatio: '275 / 90', objectFit: 'contain' }}
      />
    </picture>
  );
};

export default LogoCILS;
