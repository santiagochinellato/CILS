import React, { useEffect, useState, useCallback } from 'react';
import { useStickyHeader } from '../../hooks/useStickyHeader';
import { useTheme } from '../../hooks/useTheme';
import { cn } from '../../utils/cn';
import { useSiteConfig } from '../../config/site.config';
import { Link, useLocation } from 'react-router-dom';
import LogoCILS from '../LogoCILS';
import { Icon } from '../ui/Icon';

export const Header: React.FC = () => {
  const siteConfig = useSiteConfig();
  const navItems = siteConfig.nav;
  const isSticky = useStickyHeader(60);
  const { theme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';
  
  // Cerrar menú en cambio de ruta
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);
  // Bloquear scroll al abrir menú
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [menuOpen]);
  // Cerrar con ESC
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setMenuOpen(false);
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);
  // Determinar si el header está transparente en la home
  const isTransparentHome = isHome && !isSticky;
  // Clases de color para los links del menú
  const navLinkClass = cn(
    isTransparentHome
      ? 'text-white hover:text-accent1'
      : 'text-text dark:text-white/80 hover:text-primary dark:hover:text-accent1',
    'transition-colors relative after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:bg-secondary after:w-0 hover:after:w-full after:transition-all'
  );
  // Clases de color para el botón hamburguesa
  const burgerClass = cn(
    'lg:hidden w-10 h-10 rounded-md border flex flex-col justify-center items-center gap-1 transition-colors',
    isTransparentHome
      ? 'border-white text-white'
      : 'border-primary text-primary dark:border-white/20 dark:text-white'
  );
  // Clases de color para los links del menú móvil
  const mobileNavLinkClass = cn(
    isTransparentHome
      ? 'text-white'
      : 'text-text dark:text-white/80',
    'text-base font-medium py-1'
  );
  return (
    <header
      className={cn(
        'fixed top-0 left-0 w-full z-[1000] transition-all duration-300',
        'h-20 flex items-center',
        isSticky ? 'bg-white/90 dark:bg-[#0F1C21]/90 shadow backdrop-blur-md' : 'bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto px-6 w-full flex items-center justify-between">
        <Link to="/" className={cn('font-montserrat font-bold text-xl flex items-center gap-4', isTransparentHome ? 'text-white' : 'text-primary dark:text-white')}>
          <LogoCILS
            variant={isHome ? (isSticky ? (theme === 'dark' ? 'white' : 'color') : 'white') : 'color'}
            width={138}
            height={45}
            className="block"
            animated={true}
          />
        </Link>
        <nav className="hidden lg:flex items-center gap-8 font-inter text-sm">
          {navItems.map((item) => {
            const to = item.href.startsWith('#') ? '/' : item.href;
            return (
              <Link
                key={item.href}
                to={to}
                className={navLinkClass}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
  <div className="hidden lg:flex items-center gap-3">
          <Link
            to="/contacto"
            className="bg-secondary hover:bg-primary text-white font-montserrat font-semibold px-4 py-2 rounded-md shadow transition-all"
          >
            Agendar Consulta
          </Link>
          <a
            href="https://estudiocils.com.ar/es/wp-login.php?redirect_to=https%3A%2F%2Festudiocils.com.ar%2Fes%2Fwp-admin%2F&reauth=1"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-text hover:bg-primary text-white font-montserrat font-semibold px-4 py-2 rounded-md shadow transition-all inline-flex items-center gap-2"
          >
            <Icon name="user" size={18} context="footer" /> Log in
          </a>
          {/* <button
            aria-label="Alternar modo oscuro"
            onClick={() => setTheme(toggleTheme())}
            className="w-10 h-10 rounded-md border border-primary/30 dark:border-white/20 text-primary dark:text-white grid place-items-center hover:bg-black/5 dark:hover:bg-white/5"
            title={theme === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </button> */}
        </div>
        <button
          aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen(o => !o)}
          className={burgerClass}
        >
          <span className={cn('w-5 h-[2px] bg-current transition-transform', menuOpen && 'translate-y-[6px] rotate-45')} />
          <span className={cn('w-5 h-[2px] bg-current transition-opacity', menuOpen && 'opacity-0')} />
          <span className={cn('w-5 h-[2px] bg-current transition-transform', menuOpen && '-translate-y-[6px] -rotate-45')} />
        </button>
      </div>
      {/* Panel móvil */}
      <div
        id="mobile-menu"
        className={cn(
          'lg:hidden fixed inset-0 z-[900] transition-opacity',
          menuOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        )}
        aria-hidden={!menuOpen}
        aria-modal={menuOpen ? true : undefined}
        role={menuOpen ? 'dialog' : undefined}
        inert={!menuOpen ? '' : undefined}
      >
        <div
          className="absolute inset-0"
          onClick={() => setMenuOpen(false)}
        />
        <nav className={cn(
          'absolute top-20 left-0 right-0 shadow-xl border p-6 flex flex-col gap-4 h-100',
          isTransparentHome
            ? 'bg-white/10 border-white/20'
            : 'bg-white dark:bg-[#0F1C21] border-gray-200 dark:border-white/10'
        )} tabIndex={menuOpen ? 0 : -1}>
          {navItems.map(item => {
            const to = item.href.startsWith('#') ? '/' : item.href;
            return (
              <Link
                key={item.href}
                to={to}
                className={mobileNavLinkClass}
              >
                {item.label}
              </Link>
            );
          })}
          <div className={cn('h-px my-2', isTransparentHome ? 'bg-white/30' : 'bg-gray-200 dark:bg-white/10')} />
          <Link
            to="/contacto"
            className="bg-secondary hover:bg-primary text-white font-semibold px-4 py-2 rounded-md shadow text-center"
          >
            Agendar Consulta
          </Link>
          <a
            href="https://estudiocils.com.ar/es/wp-login.php?redirect_to=https%3A%2F%2Festudiocils.com.ar%2Fes%2Fwp-admin%2F&reauth=1"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-text hover:bg-primary text-white font-semibold px-4 py-2 rounded-md shadow text-center inline-flex items-center justify-center gap-2"
          >
            <Icon name="user" size={18} context="footer" /> Log in
          </a>
        </nav>
      </div>
    </header>
  );
};
