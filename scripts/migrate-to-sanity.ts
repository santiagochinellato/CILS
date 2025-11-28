/**
 * Script de migración automática de datos desde corporate.cils.ts a Sanity CMS
 * 
 * Uso:
 * 1. Asegúrate de tener las variables de entorno configuradas (ver ENV_SETUP.md)
 * 2. Ejecuta: npx tsx scripts/migrate-to-sanity.ts
 * 
 * Opciones:
 * --force: Fuerza la actualización de documentos existentes
 * --dry-run: Solo muestra lo que se haría sin hacer cambios
 */

import { createClient } from '@sanity/client';
import * as dotenv from 'dotenv';
import * as path from 'path';
import { fileURLToPath } from 'url';
import corporateCils from '../src/config/templates/corporate.cils.js';

// Cargar .env.local primero, luego .env como fallback
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

// Intentar cargar .env.local primero
dotenv.config({ path: path.join(projectRoot, '.env.local') });
// Luego cargar .env como fallback
dotenv.config({ path: path.join(projectRoot, '.env') });

const FORCE_UPDATE = process.argv.includes('--force');
const DRY_RUN = process.argv.includes('--dry-run');

const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID || '81u4pzxo',
  dataset: process.env.SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

// Contadores
let stats = {
  created: 0,
  updated: 0,
  skipped: 0,
  errors: 0,
};

async function migrateServices() {
  console.log('\n📦 Migrando servicios...');
  const existingServices = await client.fetch('*[_type == "service"]');
  
  for (let i = 0; i < corporateCils.services.length; i++) {
    const service = corporateCils.services[i];
    const exists = existingServices.find((s: any) => s.title === service.title);
    
    try {
      if (exists) {
        if (FORCE_UPDATE || DRY_RUN) {
          console.log(`  ${DRY_RUN ? '🔍' : '🔄'}  Servicio "${service.title}" - ${DRY_RUN ? 'Se actualizaría' : 'Actualizando'}...`);
          if (!DRY_RUN) {
            await client
              .patch(exists._id)
              .set({
                icon: service.icon,
                description: service.description,
                features: service.features || [],
                href: service.href || '#contact',
                order: i,
              })
              .commit();
            stats.updated++;
          }
        } else {
          console.log(`  ⏭️  Servicio "${service.title}" ya existe (usa --force para actualizar)`);
          stats.skipped++;
        }
      } else {
        console.log(`  ✅ Servicio "${service.title}" - ${DRY_RUN ? 'Se crearía' : 'Creando'}...`);
        if (!DRY_RUN) {
          await client.create({
            _type: 'service',
            icon: service.icon,
            title: service.title,
            description: service.description,
            features: service.features || [],
            href: service.href || '#contact',
            order: i,
          });
          stats.created++;
        }
      }
    } catch (error: any) {
      console.error(`  ❌ Error con servicio "${service.title}":`, error.message);
      stats.errors++;
    }
  }
}

async function migrateClients() {
  console.log('\n📦 Migrando clientes...');
  const existingClients = await client.fetch('*[_type == "client"]');
  
  for (let i = 0; i < corporateCils.clients.length; i++) {
    const clientData = corporateCils.clients[i];
    const exists = existingClients.find((c: any) => c.name === clientData.name);
    
    try {
      if (exists) {
        if (FORCE_UPDATE || DRY_RUN) {
          console.log(`  ${DRY_RUN ? '🔍' : '🔄'}  Cliente "${clientData.name}" - ${DRY_RUN ? 'Se actualizaría' : 'Actualizando'}...`);
          if (!DRY_RUN) {
            await client
              .patch(exists._id)
              .set({
                href: clientData.href || '#',
                featured: clientData.featured || false,
                order: i,
              })
              .commit();
            stats.updated++;
          }
        } else {
          console.log(`  ⏭️  Cliente "${clientData.name}" ya existe (usa --force para actualizar)`);
          stats.skipped++;
        }
      } else {
        console.log(`  ✅ Cliente "${clientData.name}" - ${DRY_RUN ? 'Se crearía' : 'Creando'}...`);
        if (!DRY_RUN) {
          await client.create({
            _type: 'client',
            name: clientData.name,
            href: clientData.href || '#',
            featured: clientData.featured || false,
            order: i,
            // Logo se debe subir manualmente en Sanity Studio
          });
          stats.created++;
        }
      }
    } catch (error: any) {
      console.error(`  ❌ Error con cliente "${clientData.name}":`, error.message);
      stats.errors++;
    }
  }
}

async function migrateTestimonials() {
  console.log('\n📦 Migrando testimonios...');
  const existingTestimonials = await client.fetch('*[_type == "testimonial"]');
  
  for (let i = 0; i < corporateCils.testimonials.length; i++) {
    const testimonial = corporateCils.testimonials[i];
    const exists = existingTestimonials.find(
      (t: any) => t.company === testimonial.company && t.text === testimonial.text
    );
    
    try {
      if (exists) {
        if (FORCE_UPDATE || DRY_RUN) {
          console.log(`  ${DRY_RUN ? '🔍' : '🔄'}  Testimonio "${testimonial.company}" - ${DRY_RUN ? 'Se actualizaría' : 'Actualizando'}...`);
          if (!DRY_RUN) {
            await client
              .patch(exists._id)
              .set({
                text: testimonial.text,
                author: testimonial.author,
                rating: testimonial.rating || 5,
                order: i,
              })
              .commit();
            stats.updated++;
          }
        } else {
          console.log(`  ⏭️  Testimonio "${testimonial.company}" ya existe (usa --force para actualizar)`);
          stats.skipped++;
        }
      } else {
        console.log(`  ✅ Testimonio "${testimonial.company}" - ${DRY_RUN ? 'Se crearía' : 'Creando'}...`);
        if (!DRY_RUN) {
          await client.create({
            _type: 'testimonial',
            company: testimonial.company,
            text: testimonial.text,
            author: testimonial.author,
            rating: testimonial.rating || 5,
            order: i,
          });
          stats.created++;
        }
      }
    } catch (error: any) {
      console.error(`  ❌ Error con testimonio "${testimonial.company}":`, error.message);
      stats.errors++;
    }
  }
}

async function migrateTeamMembers() {
  console.log('\n📦 Migrando miembros del equipo...');
  const existingMembers = await client.fetch('*[_type == "teamMember"]');
  
  // Determinar categorías automáticamente
  const categorizeMember = (member: any) => {
    const role = member.role?.toLowerCase() || '';
    if (role.includes('fundador') || role.includes('fundadora')) return 'fundador';
    if (role.includes('resp') || role.includes('asociad')) return 'liderazgo';
    if (role.includes('pasante')) return 'pasante';
    return 'staff';
  };
  
  for (let i = 0; i < (corporateCils.team?.staff || []).length; i++) {
    const member = corporateCils.team!.staff[i];
    const exists = existingMembers.find((m: any) => m.name === member.name);
    
    try {
      if (exists) {
        if (FORCE_UPDATE || DRY_RUN) {
          console.log(`  ${DRY_RUN ? '🔍' : '🔄'}  Miembro "${member.name}" - ${DRY_RUN ? 'Se actualizaría' : 'Actualizando'}...`);
          if (!DRY_RUN) {
            await client
              .patch(exists._id)
              .set({
                role: member.role,
                titles: member.titles || [],
                email: member.email || '',
                linkedin: member.linkedin || '',
                area: member.area || '',
                category: categorizeMember(member),
                order: i,
              })
              .commit();
            stats.updated++;
          }
        } else {
          console.log(`  ⏭️  Miembro "${member.name}" ya existe (usa --force para actualizar)`);
          stats.skipped++;
        }
      } else {
        console.log(`  ✅ Miembro "${member.name}" - ${DRY_RUN ? 'Se crearía' : 'Creando'}...`);
        if (!DRY_RUN) {
          await client.create({
            _type: 'teamMember',
            name: member.name,
            role: member.role,
            titles: member.titles || [],
            email: member.email || '',
            linkedin: member.linkedin || '',
            area: member.area || '',
            category: categorizeMember(member),
            order: i,
            // Imagen se debe subir manualmente en Sanity Studio
          });
          stats.created++;
        }
      }
    } catch (error: any) {
      console.error(`  ❌ Error con miembro "${member.name}":`, error.message);
      stats.errors++;
    }
  }
}

async function migrateLinks() {
  console.log('\n📦 Migrando links...');
  const existingLinks = await client.fetch('*[_type == "link"]');
  
  for (let i = 0; i < (corporateCils.links || []).length; i++) {
    const link = corporateCils.links![i];
    const exists = existingLinks.find((l: any) => l.title === link.title);
    
    try {
      if (exists) {
        if (FORCE_UPDATE || DRY_RUN) {
          console.log(`  ${DRY_RUN ? '🔍' : '🔄'}  Link "${link.title}" - ${DRY_RUN ? 'Se actualizaría' : 'Actualizando'}...`);
          if (!DRY_RUN) {
            await client
              .patch(exists._id)
              .set({
                href: link.href,
                description: link.description,
                icon: link.icon,
                order: i,
              })
              .commit();
            stats.updated++;
          }
        } else {
          console.log(`  ⏭️  Link "${link.title}" ya existe (usa --force para actualizar)`);
          stats.skipped++;
        }
      } else {
        console.log(`  ✅ Link "${link.title}" - ${DRY_RUN ? 'Se crearía' : 'Creando'}...`);
        if (!DRY_RUN) {
          await client.create({
            _type: 'link',
            title: link.title,
            href: link.href,
            description: link.description,
            icon: link.icon,
            order: i,
          });
          stats.created++;
        }
      }
    } catch (error: any) {
      console.error(`  ❌ Error con link "${link.title}":`, error.message);
      stats.errors++;
    }
  }
}

// Función para transformar JSON-LD: convertir @context/@type a context/type
function transformJsonLdForSanity(jsonLd: any): any {
  if (!jsonLd || typeof jsonLd !== 'object') {
    return jsonLd;
  }
  
  const transformed: any = { ...jsonLd };
  
  // Transformar @context -> context
  if (transformed['@context']) {
    transformed.context = transformed['@context'];
    delete transformed['@context'];
  }
  
  // Transformar @type -> type
  if (transformed['@type']) {
    transformed.type = transformed['@type'];
    delete transformed['@type'];
  }
  
  // Transformar address.@type -> address.type
  if (transformed.address && transformed.address['@type']) {
    transformed.address = {
      ...transformed.address,
      type: transformed.address['@type'],
    };
    delete transformed.address['@type'];
  }
  
  return transformed;
}

async function migrateSiteSettings() {
  console.log('\n📦 Migrando configuración del sitio...');
  
  try {
    // Obtener referencias de documentos
    const services = await client.fetch('*[_type == "service"] | order(order asc)');
    const clients = await client.fetch('*[_type == "client"] | order(order asc)');
    const testimonials = await client.fetch('*[_type == "testimonial"] | order(order asc)');
    const teamMembers = await client.fetch('*[_type == "teamMember"] | order(order asc)');
    const links = await client.fetch('*[_type == "link"] | order(order asc)');

    // Transformar SEO JSON-LD para Sanity
    const seoData = corporateCils.seo ? { ...corporateCils.seo } : {};
    if (seoData.jsonLd) {
      seoData.jsonLd = transformJsonLdForSanity(seoData.jsonLd);
    }

    const siteSettingsData = {
      _id: 'siteSettings',
      _type: 'siteSettings',
      navigation: corporateCils.nav || [],
      hero: corporateCils.hero || {},
      stats: corporateCils.stats || [],
      about: corporateCils.about || {},
      services: services.map((s: any) => ({ _type: 'reference', _ref: s._id })),
      clients: clients.map((c: any) => ({ _type: 'reference', _ref: c._id })),
      testimonials: testimonials.map((t: any) => ({ _type: 'reference', _ref: t._id })),
      team: {
        intro: corporateCils.team?.intro || {},
        staff: teamMembers.map((m: any) => ({ _type: 'reference', _ref: m._id })),
      },
      contact: corporateCils.contact || {},
      footer: corporateCils.footer || {},
      seo: seoData,
      floating: corporateCils.floating || {},
      links: links.map((l: any) => ({ _type: 'reference', _ref: l._id })),
    };

    if (DRY_RUN) {
      console.log('  🔍 Se crearía/actualizaría la configuración del sitio');
      console.log(`     - ${services.length} servicios`);
      console.log(`     - ${clients.length} clientes`);
      console.log(`     - ${testimonials.length} testimonios`);
      console.log(`     - ${teamMembers.length} miembros del equipo`);
      console.log(`     - ${links.length} links`);
    } else {
      await client.createOrReplace(siteSettingsData);
      console.log('  ✅ Configuración del sitio migrada');
      stats.updated++;
    }
  } catch (error: any) {
    console.error('  ❌ Error migrando configuración del sitio:', error.message);
    stats.errors++;
  }
}

function printStats() {
  console.log('\n' + '='.repeat(50));
  console.log('📊 Resumen de Migración:');
  console.log('='.repeat(50));
  console.log(`  ✅ Creados: ${stats.created}`);
  console.log(`  🔄 Actualizados: ${stats.updated}`);
  console.log(`  ⏭️  Omitidos: ${stats.skipped}`);
  if (stats.errors > 0) {
    console.log(`  ❌ Errores: ${stats.errors}`);
  }
  console.log('='.repeat(50));
}

async function main() {
  try {
    console.log('🚀 Iniciando migración automática a Sanity...\n');
    
    if (DRY_RUN) {
      console.log('🔍 MODO DRY-RUN: No se realizarán cambios reales\n');
    }
    
    if (!process.env.SANITY_API_TOKEN) {
      console.error('❌ Error: SANITY_API_TOKEN no está configurado en las variables de entorno');
      console.log('   Por favor, crea un archivo .env.local con el token (ver ENV_SETUP.md)');
      process.exit(1);
    }
    
    // Verificar conexión
    console.log('🔌 Verificando conexión con Sanity...');
    try {
      await client.fetch('*[_type == "service"][0]');
      console.log('✅ Conexión exitosa\n');
    } catch (error: any) {
      console.error('❌ Error de conexión:', error.message);
      process.exit(1);
    }
    
    // Migrar en orden
    await migrateServices();
    await migrateClients();
    await migrateTestimonials();
    await migrateTeamMembers();
    await migrateLinks();
    await migrateSiteSettings();
    
    printStats();
    
    if (!DRY_RUN) {
      console.log('\n✅ Migración completada exitosamente!');
      console.log('\n📝 Próximos pasos:');
      console.log('   1. Abre Sanity Studio: http://localhost:3333/studio');
      console.log('   2. Sube las imágenes de clientes y miembros del equipo');
      console.log('   3. Revisa y ajusta la configuración del sitio');
      console.log('   4. Verifica que todo se vea correcto en el frontend');
    } else {
      console.log('\n💡 Para ejecutar la migración real, ejecuta sin --dry-run');
    }
  } catch (error: any) {
    console.error('\n❌ Error durante la migración:', error.message);
    if (error.stack) {
      console.error('\nStack trace:', error.stack);
    }
    process.exit(1);
  }
}

main();
