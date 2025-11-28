import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'stat',
  title: 'Estadística',
  type: 'object',
  fields: [
    defineField({
      name: 'value',
      title: 'Valor',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description: 'Ej: "10+", "100+", "24/7"',
    }),
    defineField({
      name: 'label',
      title: 'Etiqueta',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description: 'Ej: "Años de experiencia"',
    }),
  ],
  preview: {
    select: {
      title: 'value',
      subtitle: 'label',
    },
  },
});

