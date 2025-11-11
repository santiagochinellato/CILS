import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { contactSchema, type ContactFormData } from '../../lib/form/schema';
import { sendContactForm } from '../../lib/form/send';

export const ContactForm: React.FC = () => {
  const [status, setStatus] = useState<'idle'|'sending'|'success'|'error'>('idle');
  const [error, setError] = useState<string | null>(null);

  const { register, handleSubmit, formState: { errors, isValid }, reset } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    mode: 'onTouched',
    defaultValues: { name: '', email: '', phone: '', company: '', service: '', message: '', privacy: false }
  });

  async function onSubmit(values: ContactFormData) {
    setStatus('sending');
    setError(null);
    const res = await sendContactForm(values);
    if (res.ok) {
      setStatus('success');
      reset();
      setTimeout(() => setStatus('idle'), 4000);
    } else {
      setStatus('error');
      setError(res.error);
    }
  }

  const busy = status === 'sending';

  return (
    <form aria-describedby="form-status" aria-busy={busy} onSubmit={handleSubmit(onSubmit)} className="bg-white dark:bg-[#1F2C33] rounded-xl p-6 shadow-card grid grid-cols-1 gap-4">
      <Field label="Nombre completo" htmlFor="name" required error={errors.name?.message}>
        <input id="name" aria-invalid={!!errors.name} {...register('name')} className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent1" placeholder="Ingresá tu nombre" />
      </Field>

      <Field label="Email" htmlFor="email" required error={errors.email?.message}>
        <input id="email" type="email" aria-invalid={!!errors.email} {...register('email')} className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent1" placeholder="tu@email.com" />
      </Field>

      <Field label="Teléfono" htmlFor="phone" error={errors.phone?.message}>
        <input id="phone" {...register('phone')} className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent1" placeholder="Opcional" />
      </Field>

      <Field label="Empresa/Organización" htmlFor="company" error={errors.company?.message}>
        <input id="company" {...register('company')} className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent1" placeholder="Opcional" />
      </Field>

      <Field label="Servicio de interés" htmlFor="service" required error={errors.service?.message}>
        <select id="service" aria-invalid={!!errors.service} {...register('service')} className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent1 w-full">
          <option value="">Seleccioná una opción</option>
          <option value="Contable">Contable</option>
          <option value="Impositivo">Impositivo</option>
          <option value="Laboral">Laboral</option>
          <option value="Societario">Societario</option>
          <option value="Consulta">Consulta general</option>
        </select>
      </Field>

      <Field label="Mensaje" htmlFor="message" required error={errors.message?.message}>
        <textarea id="message" rows={4} aria-invalid={!!errors.message} {...register('message')} className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent1" placeholder="Contanos brevemente tu necesidad" />
      </Field>

      <div className="flex items-start gap-2 text-sm">
        <input id="privacy" type="checkbox" aria-invalid={!!errors.privacy} {...register('privacy')} className="mt-1" />
        <label htmlFor="privacy">Acepto la política de privacidad</label>
      </div>
      {errors.privacy && <p className="text-xs text-red-600" role="alert">{errors.privacy.message}</p>}

      <button disabled={busy || !isValid} className="bg-secondary hover:bg-primary disabled:opacity-60 text-white font-semibold px-5 py-3 rounded-md">
        {busy ? 'Enviando…' : 'Enviar consulta'}
      </button>

      <div id="form-status" className="pt-2 text-sm" aria-live="polite">
        {status==='idle' && <p className="text-textLight">Te responderemos en menos de 24 horas</p>}
        {status==='success' && <p className="text-green-600" role="status">¡Enviado correctamente! Gracias por tu consulta.</p>}
        {status==='error' && <p className="text-red-600" role="alert">{error ?? 'Error inesperado. Intenta nuevamente.'}</p>}
      </div>
    </form>
  );
};

interface FieldProps {
  label: string;
  htmlFor: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}

const Field: React.FC<FieldProps> = ({ label, htmlFor, error, required, children }) => (
  <div>
    <label htmlFor={htmlFor} className="block text-sm font-medium text-textLight mb-1">
      {label}{required && <span className="text-red-600"> *</span>}
    </label>
    {children}
    {error && <p className="text-xs text-red-600 mt-1" role="alert">{error}</p>}
  </div>
);