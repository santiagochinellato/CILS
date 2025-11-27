import type { SiteConfig } from '../types';

// Ejemplo de landing minimal reducida (menos secciones, foco directo en CTA).
const landingMinimal: SiteConfig = {
  nav: [
    { label: 'Inicio', href: '/' },
    { label: 'Equipo', href: '/equipo' },
    { label: 'Servicios', href: '/servicios' },
    { label: 'Contacto', href: '/contacto' }
  ],
  hero: {
    badge: '+10 años asesorando empresas',
    title: 'Gestión contable e impositiva con foco estratégico',
    subtitle: 'Optimiza tus decisiones financieras con un equipo multidisciplinario de confianza.',
  ctaPrimary: { label: 'Agendar Consulta', href: '/contacto' },
  ctaSecondary: { label: 'Ver Servicios', href: '/servicios' },
    trust: '+100 empresas nos eligen'
  },
  stats: [
    { value: '10+', label: 'Años' },
    { value: '100+', label: 'Empresas' },
    { value: '4', label: 'Pilares' },
    { value: '24/7', label: 'Soporte' }
  ],
  about: {
    badge: 'Quiénes Somos',
    title: 'Equipo experto, enfoque claro',
    paragraphs: [
      'Más de una década impulsando la eficiencia de organizaciones en la Patagonia.',
      'Transparencia, rigor técnico y compromiso de largo plazo.'
    ],
    features: [
      '✓ Enfoque estratégico',
      '✓ Integración de áreas',
      '✓ Confianza y ética'
    ],
    pillars: ['Contable', 'Impositiva', 'Laboral', 'Societaria'],
    tabs: []
  },
  services: [
    {
      icon: 'contable',
      title: 'Contable',
      description: 'Estados contables e informes para decisiones de gestión.',
      features: ['Estados completos', 'Informes gestión', 'Análisis financiero'],
      href: '/contacto'
    },
    {
      icon: 'impositivo',
      title: 'Impositiva',
      description: 'Planificación y cumplimiento fiscal multijurisdiccional.',
      features: ['Planificación', 'Declaraciones', 'Optimización'],
      href: '/contacto'
    }
  ],
  clients: [],
  testimonials: [],
  blog: { posts: [], filters: [] },
  contact: {
    headline: 'Hablemos',
    text: 'Agenda una consulta y empecemos a profesionalizar tu gestión.',
    address: 'Morales 639, Bariloche, Río Negro, Argentina',
    whatsapp: ['+54 9 294 4459796'],
    phones: ['+54 294 4459796'],
    email: 'info@estudiocils.com.ar',
    hours: ['Lunes a Viernes 9:00 - 18:00'],
    quick: [{ label: 'WhatsApp', href: 'https://wa.me/5492944459796', color: '#25D366', icon: 'whatsapp' }]
  },
  footer: {
    about: {
      text: 'Soluciones profesionales contables e impositivas orientadas a resultados.',
      socials: []
    },
    services: [
      { label: 'Contable', href: '/servicios' },
      { label: 'Impositiva', href: '/servicios' }
    ],
    company: [
      { label: 'Inicio', href: '/' },
      { label: 'Contacto', href: '/contacto' }
    ],
    newsletter: undefined,
    bottom: {
      left: '© 2024 Estudio CILS.',
      center: 'Privacidad | Términos',
      right: 'Patagonia Andina'
    }
  },
  floating: {
    whatsapp: { href: 'https://wa.me/5492944459796' },
    scrollTop: { enabled: true }
  },
  team: {
    intro: {
      heading: 'Nuestro Equipo',
      text: [
        'Equipo dinámico con más de 10 años de experiencia en la región, enfocado en soluciones prácticas y oportunas.',
        'Cuatro pilares profesionales: Contable, Impositiva, Laboral y Societaria.'
      ],
      why: [
        'Acompañamos el crecimiento eficiente de tu empresa.',
        'Sinergia entre áreas para resultados superiores.'
      ]
    },
    staff: [
      {
        name: 'Nieves Rodriguez',
        role: 'Socia / Fundadora',
        titles: ['Contadora Pública Nacional', 'Especialista en Tributación'],
        email: 'nievesrodriguez@estudiocils.com.ar',
        linkedin: '#',
        area: 'Impuestos'
      },
      {
        name: 'Javier Chinellato',
        role: 'Socio Gerente / Fundador',
        titles: ['Contador Público Nacional', 'Especialista en Tributación'],
        email: 'javierchinellato@estudiocils.com.ar',
        linkedin: '#',
        area: 'Dirección / Impuestos'
      },
      {
        name: 'Lorena Jauregui',
        role: 'Asociada Área Laboral',
        titles: ['Contadora Pública Nacional'],
        email: 'laboral@estudiocils.com.ar',
        area: 'Laboral'
      },
      {
        name: 'María Teresa Vizgarra',
        role: 'Asociada Área Contable',
        titles: ['Contadora Pública Nacional'],
        email: 'maritevizgarra@estudiocils.com.ar',
        linkedin: '#',
        area: 'Contable'
      },
      {
        name: 'Luciano Lobo',
        role: 'Asociado Área Impuestos',
        titles: ['Contador Público Nacional'],
        email: 'impuestos@estudiocils.com.ar',
        area: 'Impuestos'
      },
      {
        name: 'Oscar Arriagada',
        role: 'Administración / Impuestos',
        email: 'administracion@estudiocils.com.ar',
        area: 'Administración'
      },
      {
        name: 'Natalia Zuber',
        role: 'Administración / Contabilidad',
        email: 'administracion@estudiocils.com.ar',
        area: 'Administración'
      },
      {
        name: 'Salustiano Pastrana',
        role: 'Pasante Área Administración',
        email: 'administracion@estudiocils.com.ar',
        area: 'Administración'
      }
    ]
  },
  seo: {
    title: 'Estudio CILS | Landing Consultoría Contable',
    description: 'Landing minimal de Estudio CILS para agendar una consulta profesional contable e impositiva.',
    keywords: ['consultoría contable', 'impositiva', 'Bariloche'],
    canonical: 'https://estudiocils.com.ar/',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'ProfessionalService',
      name: 'Estudio CILS',
      telephone: '+54 294 4459796'
    }
  }
};

export default landingMinimal;
