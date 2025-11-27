import React from 'react';
import { siteConfig } from '../../config/site.config';
import { ContactInfo } from '../contact/ContactInfo';
import { ContactMap } from '../contact/ContactMap';
import { ContactForm } from '../contact/ContactForm';

export const Contact: React.FC = () => {
  const c = siteConfig.contact;
  return (
    <section id="contact" className="section">
      <div className="container grid md:grid-cols-2 gap-10 align-center">
        <div>
          <span className="inline-block px-3 py-1 rounded bg-accent2 text-primary text-sm font-medium">
            Queremos escucharte
          </span>
          <h2 className="mt-4 font-montserrat text-3xl md:text-4xl font-semibold">{c.headline}</h2>
          <p className="text-textLight mt-5">{c.text}</p>
          <div className="block lg:hidden pt-4">
            <ContactForm />
          </div>
          <ContactInfo className="mt-8" />
          <ContactMap className="mt-8" />
        </div>
        <div className="hidden lg:flex w-full flex flex-col justify-center ">
          <ContactForm />
        </div>
      </div>
    </section>
  );
};
