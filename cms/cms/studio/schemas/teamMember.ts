import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'teamMember',
  title: 'Miembro del Equipo',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Nombre',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'role',
      title: 'Rol',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'titles',
      title: 'Títulos',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Ej: ["Contador Público Nacional", "Especialista en Tributación"]',
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: (Rule) => Rule.email(),
    }),
    defineField({
      name: 'linkedin',
      title: 'LinkedIn',
      type: 'url',
    }),
    defineField({
      name: 'area',
      title: 'Área',
      type: 'string',
      description: 'Ej: "Contable", "Impuestos", "Laboral"',
    }),
    defineField({
      name: 'image',
      title: 'Imagen',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'category',
      title: 'Categoría',
      type: 'string',
      options: {
        list: [
          { title: 'Fundador', value: 'fundador' },
          { title: 'Liderazgo', value: 'liderazgo' },
          { title: 'Staff', value: 'staff' },
          { title: 'Pasante', value: 'pasante' },
        ],
      },
    }),
    defineField({
      name: 'order',
      title: 'Orden',
      type: 'number',
      description: 'Orden de aparición dentro de su categoría',
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
      title: 'name',
      subtitle: 'role',
      media: 'image',
    },
  },
});

