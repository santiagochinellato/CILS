import React from 'react';
import { siteConfig } from '../../config/site.config';
import { Link } from 'react-router-dom';
import LogoCILS from '../LogoCILS';

export const Footer: React.FC = () => {
  const { footer } = siteConfig;
  return (
    <footer className="bg-primary text-white mt-16 p-4 flex flex-col gap-2" role="contentinfo">
      <div className="container py-12 grid md:grid-cols-3 gap-8 ">
        <section aria-labelledby="footer-about">
          <div id="footer-about" className="flex items-center">
            <LogoCILS variant="white" width={160} height={48} animated={false} className="opacity-90" />
          </div>
          <p className="text-sm text-accent2 mt-2">{footer.about.text}</p>
        </section>
        <nav aria-labelledby="footer-services" className='flex flex-col justify-center items-start md:items-center'>
          <h3 id="footer-services" className="font-semibold mb-3">Servicios</h3>
          <ul className="space-y-2 text-sm text-accent2">
            {footer.services.map((s)=> (
              <li key={s.label}>
                <Link to={s.href.startsWith('#') ? '/servicios' : s.href} className="hover:text-white transition-colors">
                  {s.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <nav aria-labelledby="footer-company" className='flex flex-col justify-center items-start md:items-center'>
          <h3 id="footer-company" className="font-semibold mb-3">Empresa</h3>
          <ul className="space-y-2 text-sm text-accent2">
            {footer.company.map((i)=> (
              <li key={i.label}>
                <Link 
                  to={
                    i.label.toLowerCase().includes('quién') ? '/nosotros' :
                    i.label.toLowerCase().includes('equipo') ? '/equipo' :
                    i.label.toLowerCase().includes('clientes') ? '/clientes' :
                    i.label.toLowerCase().includes('blog') ? '/blog' :
                    i.label.toLowerCase().includes('contacto') ? '/contacto' : '/'
                  }
                  className="hover:text-white transition-colors"
                >
                  {i.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        {/* <section aria-labelledby="footer-newsletter">
          {footer.newsletter && (
            <>
              <h3 id="footer-newsletter" className="font-semibold mb-3">{footer.newsletter.headline}</h3>
              <form className="flex flex-col gap-2" onSubmit={(e) => e.preventDefault()}>
                <label htmlFor="newsletter-email" className="sr-only">Email</label>
                <input 
                  id="newsletter-email"
                  type="email"
                  className="rounded px-3 py-2 text-text w-full focus:outline-none focus:ring-2 focus:ring-accent1" 
                  placeholder="Email"
                  aria-label="Ingrese su email"
                />
                <button 
                  type="submit"
                  className="bg-secondary hover:bg-white hover:text-secondary text-white px-4 py-2 rounded transition-colors focus:outline-none focus:ring-2 focus:ring-white"
                >
                  Suscribirse
                </button>
              </form>
              <div className="text-xs text-accent2 mt-2">{footer.newsletter.legal}</div>
            </>
          )}
        </section> */}
      </div>
      <div className="border-t border-white/10 p-2">
        <div className="container p-4 text-sm flex flex-col md:flex-row gap-2 md:gap-0 md:items-center md:justify-between text-accent2">
          <div>{footer.bottom.left}</div>
          <div>{footer.bottom.center}</div>
          <div dangerouslySetInnerHTML={{ __html: footer.bottom.right }} />
        </div>
      </div>
    </footer>
  );
};
