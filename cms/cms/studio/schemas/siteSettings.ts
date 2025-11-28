import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'siteSettings',
  title: 'Configuración del Sitio',
  type: 'document',
  fields: [
    defineField({
      name: 'navigation',
      title: 'Navegación',
      type: 'array',
      of: [{ type: 'navigationItem' }],
    }),
    defineField({
      name: 'hero',
      title: 'Hero Section',
      type: 'hero',
    }),
    defineField({
      name: 'stats',
      title: 'Estadísticas',
      type: 'array',
      of: [{ type: 'stat' }],
    }),
    defineField({
      name: 'about',
      title: 'Sección About',
      type: 'about',
    }),
    defineField({
      name: 'services',
      title: 'Servicios',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'service' }] }],
    }),
    defineField({
      name: 'clients',
      title: 'Clientes',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'client' }] }],
    }),
    defineField({
      name: 'testimonials',
      title: 'Testimonios',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'testimonial' }] }],
    }),
    defineField({
      name: 'team',
      title: 'Equipo',
      type: 'team',
    }),
    defineField({
      name: 'contact',
      title: 'Información de Contacto',
      type: 'contactInfo',
    }),
    defineField({
      name: 'footer',
      title: 'Footer',
      type: 'footerConfig',
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seoMetadata',
    }),
    defineField({
      name: 'floating',
      title: 'Acciones Flotantes',
      type: 'floatingActions',
    }),
    defineField({
      name: 'links',
      title: 'Links Externos',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'link' }] }],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Configuración del Sitio',
      };
    },
  },
});

