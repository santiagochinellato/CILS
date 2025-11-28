import axios from 'axios';
import type { ContactFormData } from './schema';

export type SendResult = { ok: true } | { ok: false; error: string };

export async function sendContactForm(data: ContactFormData): Promise<SendResult> {
  // Endpoint del formulario PHP
  const endpoint = '/es/contact.php';

  try {
    const response = await axios.post(endpoint, data, { 
      headers: { 'Content-Type': 'application/json' } 
    });
    
    // Verificar respuesta del servidor
    if (response.data && response.data.success) {
      return { ok: true };
    } else {
      return { ok: false, error: response.data?.message || 'Error desconocido' };
    }
  } catch (e: any) {
    const msg = e?.response?.data?.message || e?.message || 'Error enviando formulario';
    return { ok: false, error: msg };
  }
}
