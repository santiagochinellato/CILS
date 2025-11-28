import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'seoMetadata',
  title: 'Metadata SEO',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Título',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Descripción',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'keywords',
      title: 'Palabras Clave',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'canonical',
      title: 'URL Canónica',
      type: 'url',
    }),
    defineField({
      name: 'jsonLd',
      title: 'JSON-LD (Structured Data)',
      type: 'object',
      description: 'Datos estructurados para SEO',
      options: {
        collapsible: true,
        collapsed: true,
      },
      fields: [
        defineField({
          name: 'context',
          title: '@context',
          type: 'string',
          description: 'Contexto JSON-LD (ej: https://schema.org)',
          initialValue: 'https://schema.org',
        }),
        defineField({
          name: 'type',
          title: '@type',
          type: 'string',
          description: 'Tipo de entidad (ej: ProfessionalService, Organization)',
          initialValue: 'ProfessionalService',
        }),
        defineField({
          name: 'name',
          title: 'Nombre',
          type: 'string',
        }),
        defineField({
          name: 'address',
          title: 'Dirección',
          type: 'object',
          fields: [
            { name: 'type', type: 'string', title: 'Tipo', initialValue: 'PostalAddress' },
            { name: 'streetAddress', type: 'string', title: 'Calle' },
            { name: 'addressLocality', type: 'string', title: 'Localidad' },
            { name: 'addressRegion', type: 'string', title: 'Región' },
            { name: 'addressCountry', type: 'string', title: 'País' },
          ],
        }),
        defineField({
          name: 'telephone',
          title: 'Teléfono',
          type: 'string',
        }),
        defineField({
          name: 'email',
          title: 'Email',
          type: 'string',
        }),
      ],
    }),
  ],
});

