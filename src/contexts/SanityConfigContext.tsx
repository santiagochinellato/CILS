import React, { createContext, useContext, ReactNode } from 'react';
import { useSanityConfig } from '../hooks/useSanityConfig';
import type { SiteConfig } from '../config/types';
import corporateCils from '../config/templates/corporate.cils';

interface SanityConfigContextType {
  config: SiteConfig;
  loading: boolean;
  error: Error | null;
}

const SanityConfigContext = createContext<SanityConfigContextType>({
  config: corporateCils,
  loading: true,
  error: null,
});

export const useSanityConfigContext = () => useContext(SanityConfigContext);

interface SanityConfigProviderProps {
  children: ReactNode;
}

export const SanityConfigProvider: React.FC<SanityConfigProviderProps> = ({ children }) => {
  const { config, loading, error } = useSanityConfig();

  return (
    <SanityConfigContext.Provider value={{ config: config || corporateCils, loading, error }}>
      {children}
    </SanityConfigContext.Provider>
  );
};

