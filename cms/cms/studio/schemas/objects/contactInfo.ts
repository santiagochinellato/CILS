import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'contactInfo',
  title: 'Información de Contacto',
  type: 'object',
  fields: [
    defineField({
      name: 'headline',
      title: 'Título',
      type: 'string',
    }),
    defineField({
      name: 'text',
      title: 'Texto',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'address',
      title: 'Dirección',
      type: 'string',
    }),
    defineField({
      name: 'phones',
      title: 'Teléfonos',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'whatsapp',
      title: 'WhatsApp',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: (Rule) => Rule.email(),
    }),
    defineField({
      name: 'hours',
      title: 'Horarios',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'quick',
      title: 'Links Rápidos',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'label', type: 'string', title: 'Etiqueta' },
            { name: 'href', type: 'string', title: 'URL' },
            { name: 'color', type: 'string', title: 'Color' },
            { name: 'icon', type: 'string', title: 'Icono' },
          ],
        },
      ],
    }),
  ],
});

