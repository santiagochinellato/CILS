import { NovedadItem } from '../types';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const DATA_PATH = path.resolve(__dirname, '..', 'data', 'novedades.json');

export function loadExisting(): NovedadItem[] {
  try {
    if (!fs.existsSync(DATA_PATH)) return [];
    const raw = fs.readFileSync(DATA_PATH, 'utf8');
    const json = JSON.parse(raw);
    if (Array.isArray(json)) return json as NovedadItem[];
    return [];
  } catch (e) {
    console.error('Load novedades error', e);
    return [];
  }
}

export function saveAll(items: NovedadItem[]) {
  try {
    fs.writeFileSync(DATA_PATH, JSON.stringify(items, null, 2), 'utf8');
  } catch (e) {
    console.error('Save novedades error', e);
  }
}
