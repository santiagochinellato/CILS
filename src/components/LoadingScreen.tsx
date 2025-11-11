import React, { useEffect, useState } from 'react';
import LogoCILS from './LogoCILS';

export const LoadingScreen: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Ocultar pantalla de carga cuando el contenido esté listo
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (!isLoading) return null;

  return (
    <div 
      className="fixed inset-0 z-[9999] bg-white dark:bg-[#0F1C21] flex items-center justify-center transition-opacity duration-500"
      style={{ opacity: isLoading ? 1 : 0 }}
    >
      <div className="text-center">
        {/* Logo con animación */}
        <div className="animate-pulse">
          <LogoCILS variant="color" width={220} animated={true} />
        </div>
        
        {/* Spinner opcional */}
        <div className="mt-8 flex justify-center">
          <div className="w-12 h-12 border-4 border-accent2 border-t-primary rounded-full animate-spin"></div>
        </div>
        
        {/* Texto opcional */}
        <p className="mt-6 text-textLight font-inter text-sm">Cargando...</p>
      </div>
    </div>
  );
};
