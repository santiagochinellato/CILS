import type { VercelRequest, VercelResponse } from '@vercel/node';
import { readFileSync } from 'fs';
import { join } from 'path';

interface Novedad {
  tags?: string[];
  region?: string | null;
}

export default function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const novedadesPath = join(process.cwd(), 'backend', 'data', 'novedades.json');
    const data: Novedad[] = JSON.parse(readFileSync(novedadesPath, 'utf-8'));

    // Calcular metadata
    const tags = new Map<string, number>();
    const regions = new Map<string, number>();

    data.forEach(novedad => {
      novedad.tags?.forEach(tag => {
        tags.set(tag, (tags.get(tag) || 0) + 1);
      });

      if (novedad.region) {
        regions.set(novedad.region, (regions.get(novedad.region) || 0) + 1);
      }
    });

    const meta = {
      total: data.length,
      tags: Object.fromEntries(tags),
      regions: Object.fromEntries(regions),
    };

    res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate');
    res.status(200).json(meta);
  } catch (error) {
    console.error('Error reading novedades:', error);
    res.status(500).json({ error: 'Failed to load metadata' });
  }
}
