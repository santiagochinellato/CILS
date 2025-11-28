/**
 * Script para identificar y publicar documentos en draft que están referenciados
 * 
 * Uso:
 * npx tsx scripts/fix-draft-references.ts
 */

import { createClient } from '@sanity/client';
import * as dotenv from 'dotenv';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

// Cargar variables de entorno
dotenv.config({ path: path.join(projectRoot, '.env.local') });
dotenv.config({ path: path.join(projectRoot, '.env') });

const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID || '81u4pzxo',
  dataset: process.env.SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

async function findDraftDocuments() {
  console.log('🔍 Buscando documentos en estado draft...\n');
  
  // Buscar todos los documentos en draft
  const draftServices = await client.fetch('*[_type == "service" && _id in path("drafts.**")]');
  const draftClients = await client.fetch('*[_type == "client" && _id in path("drafts.**")]');
  const draftTestimonials = await client.fetch('*[_type == "testimonial" && _id in path("drafts.**")]');
  const draftTeamMembers = await client.fetch('*[_type == "teamMember" && _id in path("drafts.**")]');
  const draftLinks = await client.fetch('*[_type == "link" && _id in path("drafts.**")]');
  
  const allDrafts = [
    ...draftServices.map((d: any) => ({ ...d, type: 'service' })),
    ...draftClients.map((d: any) => ({ ...d, type: 'client' })),
    ...draftTestimonials.map((d: any) => ({ ...d, type: 'testimonial' })),
    ...draftTeamMembers.map((d: any) => ({ ...d, type: 'teamMember' })),
    ...draftLinks.map((d: any) => ({ ...d, type: 'link' })),
  ];
  
  if (allDrafts.length === 0) {
    console.log('✅ No se encontraron documentos en draft\n');
    return [];
  }
  
  console.log(`📋 Encontrados ${allDrafts.length} documentos en draft:\n`);
  allDrafts.forEach((doc: any) => {
    const name = doc.name || doc.title || doc.company || 'Sin nombre';
    console.log(`  - ${doc.type}: "${name}" (ID: ${doc._id})`);
  });
  
  return allDrafts;
}

async function publishDraftDocument(draftId: string) {
  try {
    // Obtener el documento draft
    const draft = await client.getDocument(draftId);
    
    if (!draft) {
      console.log(`  ⚠️  Documento ${draftId} no encontrado`);
      return false;
    }
    
    // Crear el documento publicado (sin el prefijo "drafts.")
    const publishedId = draftId.replace('drafts.', '');
    const publishedData = { ...draft };
    delete publishedData._id;
    delete publishedData._rev;
    
    // Crear o reemplazar el documento publicado
    await client.createOrReplace({
      ...publishedData,
      _id: publishedId,
      _type: draft._type,
    });
    
    // Eliminar el draft
    await client.delete(draftId);
    
    return true;
  } catch (error: any) {
    console.error(`  ❌ Error publicando ${draftId}:`, error.message);
    return false;
  }
}

async function checkSiteSettingsReferences() {
  console.log('\n🔍 Verificando referencias en siteSettings...\n');
  
  const siteSettings = await client.fetch('*[_type == "siteSettings"][0]');
  
  if (!siteSettings) {
    console.log('⚠️  No se encontró siteSettings');
    return;
  }
  
  // Verificar referencias
  const allReferences: string[] = [
    ...(siteSettings.services || []).map((r: any) => r._ref),
    ...(siteSettings.clients || []).map((r: any) => r._ref),
    ...(siteSettings.testimonials || []).map((r: any) => r._ref),
    ...(siteSettings.team?.staff || []).map((r: any) => r._ref),
    ...(siteSettings.links || []).map((r: any) => r._ref),
  ];
  
  const draftReferences = allReferences.filter((ref: string) => ref.startsWith('drafts.'));
  
  if (draftReferences.length > 0) {
    console.log(`⚠️  Encontradas ${draftReferences.length} referencias a documentos draft en siteSettings:\n`);
    draftReferences.forEach((ref: string) => {
      console.log(`  - ${ref}`);
    });
    return draftReferences;
  } else {
    console.log('✅ No hay referencias a documentos draft en siteSettings\n');
    return [];
  }
}

async function fixReferences() {
  console.log('\n🔧 Corrigiendo referencias en siteSettings...\n');
  
  const siteSettings = await client.fetch('*[_type == "siteSettings"][0]');
  
  if (!siteSettings) {
    console.log('⚠️  No se encontró siteSettings');
    return;
  }
  
  // Función para convertir referencias draft a publicadas
  const fixRef = (ref: string) => {
    if (ref && ref.startsWith('drafts.')) {
      return ref.replace('drafts.', '');
    }
    return ref;
  };
  
  // Corregir todas las referencias
  const fixedData: any = {
    ...siteSettings,
    services: (siteSettings.services || []).map((r: any) => ({
      ...r,
      _ref: fixRef(r._ref),
    })),
    clients: (siteSettings.clients || []).map((r: any) => ({
      ...r,
      _ref: fixRef(r._ref),
    })),
    testimonials: (siteSettings.testimonials || []).map((r: any) => ({
      ...r,
      _ref: fixRef(r._ref),
    })),
    team: {
      ...siteSettings.team,
      staff: (siteSettings.team?.staff || []).map((r: any) => ({
        ...r,
        _ref: fixRef(r._ref),
      })),
    },
    links: (siteSettings.links || []).map((r: any) => ({
      ...r,
      _ref: fixRef(r._ref),
    })),
  };
  
  await client.createOrReplace(fixedData);
  console.log('✅ Referencias corregidas en siteSettings\n');
}

async function main() {
  try {
    console.log('🚀 Iniciando corrección de referencias draft...\n');
    
    if (!process.env.SANITY_API_TOKEN) {
      console.error('❌ Error: SANITY_API_TOKEN no está configurado');
      process.exit(1);
    }
    
    // 1. Encontrar documentos draft
    const drafts = await findDraftDocuments();
    
    // 2. Verificar referencias en siteSettings
    const draftRefs = await checkSiteSettingsReferences();
    
    if (drafts.length === 0 && draftRefs.length === 0) {
      console.log('✅ No hay problemas con documentos draft\n');
      return;
    }
    
    // 3. Publicar documentos draft
    if (drafts.length > 0) {
      console.log('\n📤 Publicando documentos draft...\n');
      let published = 0;
      for (const draft of drafts) {
        const name = draft.name || draft.title || draft.company || 'Sin nombre';
        console.log(`Publicando ${draft.type}: "${name}"...`);
        const success = await publishDraftDocument(draft._id);
        if (success) {
          published++;
          console.log(`  ✅ Publicado\n`);
        }
      }
      console.log(`\n✅ ${published}/${drafts.length} documentos publicados\n`);
    }
    
    // 4. Corregir referencias en siteSettings
    if (draftRefs.length > 0) {
      await fixReferences();
    }
    
    console.log('✅ Proceso completado!\n');
    console.log('📝 Próximos pasos:');
    console.log('   1. Intenta publicar siteSettings nuevamente en Sanity Studio');
    console.log('   2. Si el error persiste, recarga Sanity Studio (F5)');
    
  } catch (error: any) {
    console.error('\n❌ Error:', error.message);
    if (error.stack) {
      console.error('\nStack trace:', error.stack);
    }
    process.exit(1);
  }
}

main();

