/**
 * Script para subir imágenes a Sanity y asociarlas con documentos
 * 
 * Uso:
 * npx tsx scripts/upload-images-to-sanity.ts
 * 
 * Opciones:
 * --logos: Solo subir logos de clientes
 * --all: Subir todas las imágenes (logos, favicons, etc.)
 */

import { createClient } from '@sanity/client';
import * as dotenv from 'dotenv';
import * as path from 'path';
import * as fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

// Cargar variables de entorno
dotenv.config({ path: path.join(projectRoot, '.env.local') });
dotenv.config({ path: path.join(projectRoot, '.env') });

const UPLOAD_LOGOS = process.argv.includes('--logos') || !process.argv.includes('--all');
const UPLOAD_ALL = process.argv.includes('--all');

const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID || '81u4pzxo',
  dataset: process.env.SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

// Mapeo de nombres de archivos a nombres de clientes
const clientLogoMap: Record<string, string> = {
  'invap.png': 'INVAP',
  'invapIng.png': 'INVAP Ingeniería',
  'biotis.png': 'Biotis',
  'carelhue.png': 'Carelhue',
  'elcasco.png': 'El Casco',
  'girasoles.png': 'Girasoles',
  'goye.png': 'Goye',
  'hayland.png': 'Hayland',
  'interpracsys.png': 'Interpracsys',
  'morales.png': 'Morales',
  'onelli.png': 'Onelli',
  'pasteur.png': 'Pasteur',
  'pintArg.png': 'PintArg',
  'romag.png': 'Romag',
  'rx.png': 'RX',
  '911.png': 'Emergencias 911',
  'delsur.png': 'Delsur', // Cliente adicional encontrado
  'images (1).png': 'Biotis', // Posible duplicado - se omitirá si ya existe
  'Proyecto nuevo.png': null, // Se omitirá - nombre no válido
};

async function uploadImageToSanity(imagePath: string): Promise<string | null> {
  try {
    const imageBuffer = fs.readFileSync(imagePath);
    const filename = path.basename(imagePath);
    
    console.log(`  📤 Subiendo: ${filename}...`);
    
    const asset = await client.assets.upload('image', imageBuffer, {
      filename: filename,
    });
    
    console.log(`  ✅ Subido: ${filename} (ID: ${asset._id})`);
    return asset._id;
  } catch (error: any) {
    console.error(`  ❌ Error subiendo ${path.basename(imagePath)}:`, error.message);
    return null;
  }
}

async function updateClientWithLogo(clientName: string, imageAssetId: string) {
  try {
    // Buscar el cliente por nombre
    const clients = await client.fetch(`*[_type == "client" && name == $name]`, {
      name: clientName,
    });
    
    if (clients.length === 0) {
      console.log(`  ⚠️  Cliente "${clientName}" no encontrado en Sanity`);
      return false;
    }
    
    const clientDoc = clients[0];
    
    // Actualizar el cliente con la imagen
    await client
      .patch(clientDoc._id)
      .set({
        logo: {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: imageAssetId,
          },
        },
      })
      .commit();
    
    console.log(`  ✅ Logo asociado a "${clientName}"`);
    return true;
  } catch (error: any) {
    console.error(`  ❌ Error asociando logo a "${clientName}":`, error.message);
    return false;
  }
}

async function uploadClientLogos() {
  console.log('\n📦 Subiendo logos de clientes...\n');
  
  const logosDir = path.join(projectRoot, 'public', 'images', 'logosClientes');
  
  if (!fs.existsSync(logosDir)) {
    console.error(`❌ Directorio no encontrado: ${logosDir}`);
    return;
  }
  
  const files = fs.readdirSync(logosDir);
  const imageFiles = files.filter(f => 
    /\.(png|jpg|jpeg|gif|webp)$/i.test(f)
  );
  
  console.log(`Encontradas ${imageFiles.length} imágenes\n`);
  
  let uploaded = 0;
  let associated = 0;
  
  for (const file of imageFiles) {
    const filePath = path.join(logosDir, file);
    const clientName = clientLogoMap[file];
    
    // Omitir archivos sin mapeo válido
    if (clientName === null || clientName === undefined) {
      console.log(`\n⏭️  Omitiendo: ${file} (sin cliente asociado)`);
      continue;
    }
    
    console.log(`\n📄 Procesando: ${file}`);
    console.log(`   Cliente: ${clientName}`);
    
    // Subir imagen
    const assetId = await uploadImageToSanity(filePath);
    
    if (assetId) {
      uploaded++;
      
      // Asociar con cliente
      const success = await updateClientWithLogo(clientName, assetId);
      if (success) {
        associated++;
      } else {
        console.log(`  ⚠️  Logo subido pero cliente "${clientName}" no encontrado en Sanity`);
        console.log(`     Puedes asociarlo manualmente en Sanity Studio usando el asset ID: ${assetId}`);
      }
    }
  }
  
  console.log(`\n✅ Resumen:`);
  console.log(`   📤 Imágenes subidas: ${uploaded}/${imageFiles.length}`);
  console.log(`   🔗 Logos asociados: ${associated}/${imageFiles.length}`);
}

async function uploadSiteLogos() {
  console.log('\n📦 Subiendo logos del sitio...\n');
  
  const imagesDir = path.join(projectRoot, 'public', 'images');
  const siteLogos = [
    { file: 'cilsLogo.png', name: 'Logo CILS' },
    { file: 'cilsLogoWhite.png', name: 'Logo CILS Blanco' },
    { file: 'favicon-w16.png', name: 'Favicon 16x16' },
    { file: 'favicon-w32.png', name: 'Favicon 32x32' },
  ];
  
  for (const logo of siteLogos) {
    const filePath = path.join(imagesDir, logo.file);
    
    if (!fs.existsSync(filePath)) {
      console.log(`  ⏭️  ${logo.file} no encontrado, omitiendo...`);
      continue;
    }
    
    console.log(`\n📄 Procesando: ${logo.file}`);
    await uploadImageToSanity(filePath);
    // Nota: Estos logos no se asocian automáticamente a documentos
    // Puedes asociarlos manualmente en Sanity Studio si es necesario
  }
}

async function main() {
  try {
    console.log('🚀 Iniciando subida de imágenes a Sanity...\n');
    
    if (!process.env.SANITY_API_TOKEN) {
      console.error('❌ Error: SANITY_API_TOKEN no está configurado');
      process.exit(1);
    }
    
    // Verificar conexión
    console.log('🔌 Verificando conexión con Sanity...');
    try {
      await client.fetch('*[_type == "client"][0]');
      console.log('✅ Conexión exitosa\n');
    } catch (error: any) {
      console.error('❌ Error de conexión:', error.message);
      process.exit(1);
    }
    
    if (UPLOAD_LOGOS || UPLOAD_ALL) {
      await uploadClientLogos();
    }
    
    if (UPLOAD_ALL) {
      await uploadSiteLogos();
    }
    
    console.log('\n✅ Proceso completado!');
    console.log('\n📝 Próximos pasos:');
    console.log('   1. Revisa los clientes en Sanity Studio');
    console.log('   2. Verifica que los logos se muestren correctamente');
    console.log('   3. Si algún logo no se asoció, hazlo manualmente en Sanity Studio');
    
  } catch (error: any) {
    console.error('\n❌ Error durante la subida:', error.message);
    if (error.stack) {
      console.error('\nStack trace:', error.stack);
    }
    process.exit(1);
  }
}

main();

