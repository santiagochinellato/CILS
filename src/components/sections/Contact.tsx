import React, { useState } from 'react';
import { siteConfig } from '../../config/site.config';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { contactSchema, type ContactFormData } from '../../lib/form/schema';
import { sendContactForm } from '../../lib/form/send';

export const Contact: React.FC = () => {
  const c = siteConfig.contact;
  return (
    <section id="contact" className="section">
      <div className="container grid md:grid-cols-2 gap-10">
        <div>
          <h2 className="font-montserrat text-3xl md:text-4xl font-semibold">{c.headline}</h2>
          <p className="text-textLight mt-3">{c.text}</p>
          <ul className="mt-6 space-y-2">
            <li>📍 {c.address}</li>
            <li>📞 {c.phones.join(' | ')}</li>
            <li>📧 {c.email}</li>
          </ul>
          <div className="mt-4 text-sm text-textLight">{c.hours.join(' · ')}</div>
        </div>
        <Form />
      </div>
    </section>
  );
};

const Form: React.FC = () => {
  const [status, setStatus] = useState<'idle'|'sending'|'success'|'error'>('idle');
  const [error, setError] = useState<string | null>(null);
  const { register, handleSubmit, formState: { errors }, reset } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: '', email: '', phone: '', company: '', service: '', message: '', privacy: false }
  });

  async function onSubmit(values: ContactFormData) {
    setStatus('sending');
    setError(null);
    const res = await sendContactForm(values);
    if (res.ok) {
      setStatus('success');
      reset();
      setTimeout(()=> setStatus('idle'), 4000);
    } else {
      setStatus('error');
      setError(res.error);
    }
  }

  return (
    <form aria-describedby="form-status" onSubmit={handleSubmit(onSubmit)} className="bg-white dark:bg-[#1F2C33] rounded-xl p-6 shadow-card grid grid-cols-1 gap-4">
      <div>
        <input aria-invalid={!!errors.name} {...register('name')} className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent1" placeholder="Nombre completo*" />
        {errors.name && <p className="text-xs text-red-600 mt-1" role="alert">{errors.name.message}</p>}
      </div>
      <div>
        <input aria-invalid={!!errors.email} type="email" {...register('email')} className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent1" placeholder="Email*" />
        {errors.email && <p className="text-xs text-red-600 mt-1" role="alert">{errors.email.message}</p>}
      </div>
      <input {...register('phone')} className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent1" placeholder="Teléfono" />
      <input {...register('company')} className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent1" placeholder="Empresa/Organización" />
      <div>
        <select aria-invalid={!!errors.service} {...register('service')} className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent1">
          <option value="">Servicio de interés*</option>
          <option value="Contable">Contable</option>
          <option value="Impositivo">Impositivo</option>
          <option value="Laboral">Laboral</option>
          <option value="Societario">Societario</option>
          <option value="Consulta">Consulta general</option>
        </select>
        {errors.service && <p className="text-xs text-red-600 mt-1" role="alert">{errors.service.message}</p>}
      </div>
      <div>
        <textarea aria-invalid={!!errors.message} rows={4} {...register('message')} className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent1" placeholder="Mensaje*" />
        {errors.message && <p className="text-xs text-red-600 mt-1" role="alert">{errors.message.message}</p>}
      </div>
      <label className="text-sm flex gap-2 items-start">
        <input type="checkbox" aria-invalid={!!errors.privacy} {...register('privacy')} />
        <span>Acepto la política de privacidad</span>
      </label>
      {errors.privacy && <p className="text-xs text-red-600" role="alert">{errors.privacy.message}</p>}
      <button disabled={status==='sending'} className="bg-secondary hover:bg-primary disabled:opacity-60 text-white font-semibold px-5 py-3 rounded-md">
        {status==='sending' ? 'Enviando…' : 'Enviar consulta'}
      </button>
      <div id="form-status" className="text-xs text-textLight" aria-live="polite">
        {status==='idle' && 'Te responderemos en menos de 24 horas'}
        {status==='success' && <span className="text-green-600">¡Enviado correctamente! Gracias por tu consulta.</span>}
        {status==='error' && <span className="text-red-600">{error ?? 'Error inesperado. Intenta nuevamente.'}</span>}
      </div>
    </form>
  );
};
