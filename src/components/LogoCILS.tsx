// Logo exportado como componente React para importación directa
import React from 'react';

interface LogoCILSProps {
  variant?: 'color' | 'white';
  width?: number;
  height?: number;
  className?: string;
  animated?: boolean;
}

const LogoCILS: React.FC<LogoCILSProps> = ({ variant = 'color', width = 160, className = '', animated = false }) => (
  <img
    src={variant === 'white' ? '/images/cilsLogoWhite.png' : '/images/cilsLogo.png'}
    alt="Logo Estudio CILS"
    width={'200px'}
    height={'100%'}
    style={{ aspectRatio: '275 / 90', objectFit: 'contain' }}
    className={className + (animated ? ' logo-cils-anim' : '')}
    loading="lazy"
  />
);

export default LogoCILS;
