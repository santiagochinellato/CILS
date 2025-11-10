import axios from 'axios';
import type { ContactFormData } from './schema';

export type SendResult = { ok: true } | { ok: false; error: string };

export async function sendContactForm(data: ContactFormData): Promise<SendResult> {
  const endpoint = import.meta.env.VITE_CONTACT_ENDPOINT as string | undefined;
  if (!endpoint) {
    // Simulación inicial: delay y éxito
    await new Promise((r) => setTimeout(r, 600));
    console.info('[contact] (simulado) Datos enviados:', data);
    return { ok: true };
  }

  try {
    await axios.post(endpoint, data, { headers: { 'Content-Type': 'application/json' } });
    return { ok: true };
  } catch (e: any) {
    const msg = e?.response?.data?.message || e?.message || 'Error enviando formulario';
    return { ok: false, error: msg };
  }
}
