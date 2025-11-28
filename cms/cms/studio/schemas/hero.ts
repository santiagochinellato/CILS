import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'hero',
  title: 'Hero Section',
  type: 'object',
  fields: [
    defineField({
      name: 'badge',
      title: 'Badge',
      type: 'string',
      description: 'Texto del badge destacado',
    }),
    defineField({
      name: 'title',
      title: 'Título Principal',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtítulo',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'ctaPrimary',
      title: 'CTA Principal',
      type: 'cta',
    }),
    defineField({
      name: 'ctaSecondary',
      title: 'CTA Secundario',
      type: 'cta',
    }),
    defineField({
      name: 'trust',
      title: 'Texto de Confianza',
      type: 'string',
      description: 'Ej: "INVAP y +100 empresas confían en nosotros"',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'badge',
    },
  },
});

