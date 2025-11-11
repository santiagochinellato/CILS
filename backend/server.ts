import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { loadExisting } from './storage/fileStore';
import { refreshNovedades } from './jobs/refresh';
import cron from 'node-cron';

dotenv.config();

const app = express();
app.use(cors());

app.get('/api/novedades', (req, res) => {
  try {
    const { tag, region, limit } = req.query as Record<string, string>;
    const all = loadExisting();
    let filtered = all;
    if (tag) filtered = filtered.filter(n => n.tags.includes(tag.toLowerCase()));
    if (region) filtered = filtered.filter(n => n.region === region);
    const lim = limit ? parseInt(limit, 10) : 20;
    res.json(filtered.slice(0, lim));
  } catch (error) {
    console.error('[API] Error en /api/novedades:', error);
    res.status(500).json({ error: 'Error al cargar novedades', details: String(error) });
  }
});

app.get('/api/novedades/meta', (req, res) => {
  try {
    const all = loadExisting();
    const tags: Record<string, number> = {};
    const regions: Record<string, number> = {};
    for (const n of all) {
      n.tags.forEach(t => { tags[t] = (tags[t] || 0) + 1; });
      if (n.region) regions[n.region] = (regions[n.region] || 0) + 1;
    }
    res.json({ total: all.length, tags, regions });
  } catch (error) {
    console.error('[API] Error en /api/novedades/meta:', error);
    res.status(500).json({ error: 'Error al cargar metadatos', details: String(error) });
  }
});

app.post('/api/novedades/refresh', async (req, res) => {
  try {
    const result = await refreshNovedades();
    res.json(result);
  } catch (error) {
    console.error('[API] Error en /api/novedades/refresh:', error);
    res.status(500).json({ error: 'Error al refrescar novedades', details: String(error) });
  }
});

// Cron: cada día a las 06:00 local. Ajustar a 1 y 15 si se desea exacto.
cron.schedule('0 6 * * *', async () => {
  console.log('[CRON] Actualizando novedades...');
  try {
    const r = await refreshNovedades();
    console.log('[CRON] Completado', r);
  } catch (e) {
    console.error('[CRON] Error', e);
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Backend novedades escuchando en puerto ${PORT}`);
});
