import type { VercelRequest, VercelResponse } from '@vercel/node';
import { readFileSync } from 'fs';
import { join } from 'path';

export default function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Leer novedades desde el archivo en el repo
    const novedadesPath = join(process.cwd(), 'backend', 'data', 'novedades.json');
    const data = JSON.parse(readFileSync(novedadesPath, 'utf-8'));

    // Filtros desde query params
    const { tag, region, limit } = req.query;
    let filtered = [...data];

    if (tag && typeof tag === 'string') {
      filtered = filtered.filter(n => n.tags?.includes(tag));
    }

    if (region && typeof region === 'string') {
      filtered = filtered.filter(n => n.region === region);
    }

    if (limit && typeof limit === 'string') {
      const limitNum = parseInt(limit, 10);
      if (!isNaN(limitNum) && limitNum > 0) {
        filtered = filtered.slice(0, limitNum);
      }
    }

    // Cache de 5 minutos
    res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate');
    res.status(200).json(filtered);
  } catch (error) {
    console.error('Error reading novedades:', error);
    res.status(500).json({ error: 'Failed to load novedades' });
  }
}
