import React, { useEffect, useState } from 'react';
import { useStickyHeader } from '../../hooks/useStickyHeader';
import { cn } from '../../utils/cn';
import { siteConfig } from '../../config/site.config';
import { Link } from 'react-router-dom';
import { initTheme, toggleTheme } from '../../utils/theme';
import LogoCILS from '../LogoCILS';

const navItems = siteConfig.nav;

export const Header: React.FC = () => {
  const isSticky = useStickyHeader(60);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  useEffect(() => {
    setTheme(initTheme());
  }, []);
  return (
    <header
      className={cn(
        'fixed top-0 left-0 w-full z-[1000] transition-all duration-300',
        'h-20 flex items-center',
        isSticky ? 'bg-white/90 dark:bg-[#0F1C21]/90 shadow backdrop-blur-md' : 'bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto px-6 w-full flex items-center justify-between">
        <Link to="/" className="font-montserrat font-bold text-xl text-primary dark:text-white flex items-center gap-4">
          <LogoCILS
            variant={isSticky ? (theme === 'dark' ? 'white' : 'color') : 'white'}
            width={138}
            height={45}
            className="block"
            animated={true}
          />
          <span className="sr-only">Estudio CILS</span>
        </Link>
        <nav className="hidden md:flex gap-8 font-inter text-sm">
          {navItems.map((item) => (
            <Link
              key={item.href}
              to={item.href.startsWith('#') ? '/' : item.href}
              className="text-text dark:text-white/80 hover:text-primary dark:hover:text-accent1 transition-colors relative after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:bg-secondary after:w-0 hover:after:w-full after:transition-all"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="hidden md:flex items-center gap-3">
          <Link
            to="/contacto"
            className="bg-secondary hover:bg-primary text-white font-montserrat font-semibold px-5 py-3 rounded-md shadow transition-all"
          >
            Agendar Consulta
          </Link>
          <button
            aria-label="Alternar modo oscuro"
            onClick={() => setTheme(toggleTheme())}
            className="w-10 h-10 rounded-md border border-primary/30 dark:border-white/20 text-primary dark:text-white grid place-items-center hover:bg-black/5 dark:hover:bg-white/5"
            title={theme === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>
        </div>
        <button
          aria-label="Abrir menú"
          className="md:hidden w-10 h-10 rounded-md border border-primary text-primary dark:border-white/20 dark:text-white flex flex-col justify-center items-center gap-1"
        >
          <span className="w-5 h-[2px] bg-current" />
          <span className="w-5 h-[2px] bg-current" />
          <span className="w-5 h-[2px] bg-current" />
        </button>
      </div>
    </header>
  );
};
