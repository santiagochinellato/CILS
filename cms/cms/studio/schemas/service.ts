import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'service',
  title: 'Servicio',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Título',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'icon',
      title: 'Icono',
      type: 'string',
      description: 'Nombre del icono (contable, impositivo, laboral, etc.)',
      options: {
        list: [
          { title: 'Contable', value: 'contable' },
          { title: 'Impositivo', value: 'impositivo' },
          { title: 'Laboral', value: 'laboral' },
          { title: 'Societaria', value: 'societaria' },
          { title: 'Otros', value: 'otros' },
        ],
      },
    }),
    defineField({
      name: 'description',
      title: 'Descripción',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'features',
      title: 'Características',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'href',
      title: 'Link',
      type: 'string',
      initialValue: '#contact',
    }),
    defineField({
      name: 'order',
      title: 'Orden',
      type: 'number',
      description: 'Orden de aparición (menor = primero)',
      initialValue: 0,
    }),
  ],
  orderings: [
    {
      title: 'Orden',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'icon',
    },
  },
});

