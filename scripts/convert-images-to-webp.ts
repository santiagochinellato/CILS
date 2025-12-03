import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const IMAGES_DIR = path.resolve(process.cwd(), 'public', 'images');
const CLIENT_LOGOS_DIR = path.join(IMAGES_DIR, 'logosClientes');
const TEAM_DIR = path.join(IMAGES_DIR, 'equipo');

async function convertFile(inputPath: string, outputPath: string) {
  const ext = path.extname(inputPath).toLowerCase();
  const pipeline = sharp(inputPath).toFormat('webp', { quality: 82 });
  if (ext === '.jpg' || ext === '.jpeg') {
    // For photographic images keep quality slightly higher
    pipeline.webp({ quality: 85 });
  }
  await pipeline.toFile(outputPath);
  const inStats = fs.statSync(inputPath);
  const outStats = fs.statSync(outputPath);
  const saving = inStats.size - outStats.size;
  const savingMB = saving > 1024 * 1024 ? `${(saving / 1024 / 1024).toFixed(1)}MB` : `${Math.round(saving/1024)}KB`;
  console.log(`→ ${path.basename(inputPath)} → ${path.basename(outputPath)} (${Math.round(outStats.size/1024)}KB, ahorro ${savingMB})`);
}

function listTargets(dir: string): string[] {
  return fs
    .readdirSync(dir)
    .filter((f) => f.match(/\.(png|jpg|jpeg)$/i))
    .map((f) => path.join(dir, f));
}

async function main() {
  const targets = [
    ...listTargets(IMAGES_DIR),
    ...listTargets(CLIENT_LOGOS_DIR),
    ...(fs.existsSync(TEAM_DIR) ? listTargets(TEAM_DIR) : []),
  ];
  if (!targets.length) {
    console.log('No se encontraron imágenes PNG/JPG para convertir.');
    return;
  }
  for (const input of targets) {
    const out = input.replace(/\.(png|jpg|jpeg)$/i, '.webp');
    try {
      await convertFile(input, out);
    } catch (e) {
      console.error('Error convirtiendo', input, e);
    }
  }
  console.log('Conversión a WebP completada.');
}

main();
