import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'client',
  title: 'Cliente',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Nombre',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'href',
      title: 'URL del Cliente',
      type: 'url',
    }),
    defineField({
      name: 'featured',
      title: 'Destacado',
      type: 'boolean',
      description: 'Marcar si es un cliente destacado',
      initialValue: false,
    }),
    defineField({
      name: 'order',
      title: 'Orden',
      type: 'number',
      description: 'Orden de aparición',
      initialValue: 0,
    }),
  ],
  orderings: [
    {
      title: 'Orden',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
    {
      title: 'Destacados primero',
      name: 'featuredFirst',
      by: [{ field: 'featured', direction: 'desc' }],
    },
  ],
  preview: {
    select: {
      title: 'name',
      media: 'logo',
      subtitle: 'featured',
    },
    prepare({ title, media, subtitle }) {
      return {
        title,
        media,
        subtitle: subtitle ? '⭐ Destacado' : '',
      };
    },
  },
});

