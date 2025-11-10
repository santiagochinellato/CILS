import React from 'react';
import { siteConfig } from '../../config/site.config';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  const { footer } = siteConfig;
  return (
    <footer className="bg-primary text-white mt-16">
      <div className="container py-12 grid md:grid-cols-4 gap-8">
        <div>
          <div className="font-montserrat font-bold text-xl">Estudio CILS</div>
          <p className="text-sm text-accent2 mt-2">{footer.about.text}</p>
        </div>
        <div>
          <div className="font-semibold mb-3">Servicios</div>
          <ul className="space-y-2 text-sm text-accent2">
            {footer.services.map((s)=> (
              <li key={s.label}><Link to={s.href.startsWith('#') ? '/servicios' : s.href}>{s.label}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <div className="font-semibold mb-3">Empresa</div>
          <ul className="space-y-2 text-sm text-accent2">
            {footer.company.map((i)=> (
              <li key={i.label}><Link to={
                i.label.toLowerCase().includes('quién') ? '/nosotros' :
                i.label.toLowerCase().includes('equipo') ? '/equipo' :
                i.label.toLowerCase().includes('clientes') ? '/clientes' :
                i.label.toLowerCase().includes('blog') ? '/blog' :
                i.label.toLowerCase().includes('contacto') ? '/contacto' : '/'
              }>{i.label}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          {footer.newsletter && (
            <>
              <div className="font-semibold mb-3">{footer.newsletter.headline}</div>
              <div className="flex gap-2">
                <input className="rounded px-3 py-2 text-text w-full" placeholder="Email" />
                <button className="bg-secondary hover:bg-white hover:text-secondary text-white px-4 rounded">Suscribirse</button>
              </div>
              <div className="text-xs text-accent2 mt-2">{footer.newsletter.legal}</div>
            </>
          )}
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container py-4 text-sm flex flex-col md:flex-row gap-2 md:gap-0 md:items-center md:justify-between text-accent2">
          <div>{footer.bottom.left}</div>
          <div>{footer.bottom.center}</div>
          <div>{footer.bottom.right}</div>
        </div>
      </div>
    </footer>
  );
};
