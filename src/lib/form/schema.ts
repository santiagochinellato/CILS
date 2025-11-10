import { z } from 'zod';

export const contactSchema = z.object({
  name: z.string().min(3, 'Nombre demasiado corto'),
  email: z.string().email('Email inválido'),
  phone: z.string().optional(),
  company: z.string().optional(),
  service: z.string().min(3, 'Seleccione un servicio'),
  message: z.string().min(10, 'Mensaje demasiado breve'),
  privacy: z.boolean().refine(v => v, 'Debes aceptar la política de privacidad')
});

export type ContactFormData = z.infer<typeof contactSchema>;
