import React from 'react';
import { siteConfig } from '../../config/site.config';
import { Icon } from '../ui/Icon';

interface ContactInfoProps {
  className?: string;
}

export const ContactInfo: React.FC<ContactInfoProps> = ({ className }) => {
  const c = siteConfig.contact;
  return (
    <div className={className} aria-labelledby="contact-info-heading">
      <h3 id="contact-info-heading" className="sr-only">Información de contacto</h3>
      <div className="space-y-5">
        <InfoBlock icon="direccion" label="Dirección">
          <p className="text-text dark:text-white">{c.address}</p>
        </InfoBlock>
        <InfoBlock icon="telefono" label="Teléfonos">
          <ul className="space-y-1">
            {c.phones.map(phone => (
              <li key={phone}>
                <a href={`tel:${phone.replace(/\s/g,'')}`} className="text-text dark:text-white hover:text-primary transition-colors">
                  {phone}
                </a>
              </li>
            ))}
          </ul>
        </InfoBlock>
        <InfoBlock icon="email" label="Email">
          <a href={`mailto:${c.email}`} className="text-text dark:text-white hover:text-primary transition-colors">{c.email}</a>
        </InfoBlock>
        <InfoBlock icon="reloj" label="Horarios">
          <ul className="space-y-1">
            {c.hours.map(hour => (
              <li key={hour} className="text-text dark:text-white text-sm">{hour}</li>
            ))}
          </ul>
        </InfoBlock>
      </div>
    </div>
  );
};

interface InfoBlockProps {
  icon: Parameters<typeof Icon>[0]['name'];
  label: string;
  children: React.ReactNode;
}

const InfoBlock: React.FC<InfoBlockProps> = ({ icon, label, children }) => (
  <div className="flex items-start gap-3">
    <div className="mt-1 flex-shrink-0" aria-hidden="true">
      <Icon name={icon} size={20} />
    </div>
    <div>
      <p className="font-semibold text-sm text-textLight mb-1">{label}</p>
      {children}
    </div>
  </div>
);