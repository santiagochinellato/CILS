import type { SiteConfig } from '../types';

const corporateCils: SiteConfig = {
  nav: [
    { label: 'Inicio', href: '/' },
    { label: 'Nosotros', href: '/nosotros' },
    { label: 'Equipo', href: '/equipo' },
    { label: 'Servicios', href: '/servicios' },
    { label: 'Clientes', href: '/clientes' },
    { label: 'Blog', href: '/blog' },
    { label: 'Contacto', href: '/contacto' }
  ],
  hero: {
    badge: ' Más de 10 años en Bariloche y región',
    title: 'Tu socio estratégico en gestión contable, impositiva, laboral y societaria',
    subtitle: 'Soluciones integrales para el crecimiento sostenible de tu empresa en la Patagonia Andina',
  ctaPrimary: { label: 'Solicitar Asesoramiento', href: '/contacto' },
  ctaSecondary: { label: 'Conocer Servicios', href: '/servicios' },
    trust: 'INVAP y +100 empresas confían en nosotros'
  },
  stats: [
    { value: '10+', label: 'Años de experiencia' },
    { value: '100+', label: 'Empresas confían en nosotros' },
    { value: '4', label: 'Áreas especializadas' },
    { value: '24/7', label: 'Soporte disponible' }
  ],
  about: {
    badge: 'Quiénes Somos',
    title: 'Equipo profesional dinámico y actualizado',
    paragraphs: [
      'Somos un equipo especializado con más de una década de experiencia en Bariloche y la región. Nuestro enfoque es el asesoramiento integral, ajustado a las necesidades específicas de cada cliente.',
      'Priorizamos la calidad y la actualización profesional continua. Cumplimos plazos en todo contexto económico financiero, posicionándonos como referentes en la Patagonia Andina.'
    ],
    features: [
      '✓ Altos estándares de calidad en cada servicio',
      '✓ Sinergia entre áreas para resultados superiores',
      '✓ Confiabilidad y transparencia en cada asesoramiento'
    ],
    pillars: ['Contable', 'Impositiva', 'Laboral', 'Societaria'],
    tabs: [
      {
        title: 'Nuestra Misión',
        content:
          'Contribuir diariamente a la buena gestión y al desarrollo eficiente y profesionalizado de las empresas locales que confían en nuestro asesoramiento.'
      },
      {
        title: 'Nuestra Visión',
        content:
          'Posicionarnos como referente a nivel de la Patagonia Andina, generando confianza en empresas del medio para descentralizar respecto de grandes ciudades cuestiones de complejidad profesional.'
      },
      {
        title: 'Nuestro Compromiso',
        content:
          'Acompañar y contribuir al crecimiento sostenido y de largo plazo de nuestros clientes a través de aportes ideados bajo un proceso de mejora continua.'
      },
      {
        title: 'Enfoque de Calidad',
        content:
          'Abordaje integral con el aporte de cada una de las áreas del estudio para lograr una sinergia que permita obtener un resultado de calidad superior.'
      }
    ]
  },
  services: [
    {
      icon: 'contable',
      title: 'Contable',
      description:
        'Cumplimiento de disposiciones legales, informes de gestión y presentación del estado económico-financiero de tu empresa.',
      features: [
        'Estados contables completos',
        'Informes de gestión estratégica',
        'Análisis financiero detallado',
        'Auditoría interna'
      ],
      href: '#contact'
    },
    {
      icon: 'impositivo',
      title: 'Impositiva',
      description:
        'Gestión eficiente de obligaciones fiscales a nivel municipal, provincial, nacional e internacional.',
      features: [
        'Planificación tributaria',
        'Declaraciones juradas',
        'Asesoramiento fiscal integral',
        'Optimización impositiva'
      ],
      href: '#contact'
    },
    {
      icon: 'laboral',
      title: 'Laboral',
      description:
        'Administración integral de recursos humanos y cumplimiento de normativas laborales vigentes.',
      features: [
        'Liquidación de sueldos',
        'Cumplimiento normativo',
        'Asesoría en relaciones laborales',
        'Gestión de RRHH'
      ],
      href: '#contact'
    },
    {
      icon: 'societaria',
      title: 'Societaria',
      description:
        'Planificación jurídica estratégica, constitución de sociedades y reformas estatutarias.',
      features: [
        'Constitución de sociedades',
        'Reformas estatutarias',
        'Planificación estratégica',
        'Asesoramiento legal corporativo'
      ],
      href: '#contact'
    }
  ],
  clients: [
    { name: 'INVAP', featured: true, href: 'https://www.invap.com.ar/', logo: '/images/logosClientes/invap.png' },
    { name: 'INVAP Ingeniería', href: '#', logo: '/images/logosClientes/invapIng.png' },
    { name: 'Biotis', href: '#', logo: '/images/logosClientes/biotis.png' },
    { name: 'Carelhue', href: '#', logo: '/images/logosClientes/carelhue.png' },
    { name: 'El Casco', href: '#', logo: '/images/logosClientes/elcasco.png' },
    { name: 'Girasoles', href: '#', logo: '/images/logosClientes/girasoles.png' },
    { name: 'Goye', href: '#', logo: '/images/logosClientes/goye.png' },
    { name: 'Hayland', href: '#', logo: '/images/logosClientes/hayland.png' },
    { name: 'Interpracsys', href: '#', logo: '/images/logosClientes/interpracsys.png' },
    { name: 'Morales', href: '#', logo: '/images/logosClientes/morales.png' },
    { name: 'Onelli', href: '#', logo: '/images/logosClientes/onelli.png' },
    { name: 'Pasteur', href: '#', logo: '/images/logosClientes/pasteur.png' },
    { name: 'PintArg', href: '#', logo: '/images/logosClientes/pintArg.png' },
    { name: 'Romag', href: '#', logo: '/images/logosClientes/romag.png' },
    { name: 'RX', href: '#', logo: '/images/logosClientes/rx.png' },
    { name: 'Emergencias 911', href: '#', logo: '/images/logosClientes/911.png' }
  ],
  testimonials: [
    {
      company: 'INVAP',
      text:
        'Profesionalismo y compromiso en cada asesoramiento. Un socio estratégico fundamental para nuestro crecimiento sostenido.',
      author: 'Empresa reconocida internacionalmente',
      rating: 5
    },
    {
      company: 'Empresa Regional',
      text:
        'Más de 10 años confiando en su expertise. Calidad, cumplimiento y actualización garantizados en cada servicio.',
      author: 'Cliente corporativo - Sector industrial',
      rating: 5
    }
  ],
  blog: {
    posts: [
      {
        id: 1,
        category: 'Laboral',
        title: 'Nueva doble indemnización por despidos en 2023',
        date: '15 de marzo, 2023',
        excerpt:
          'Cambios normativos relevantes en materia laboral que impactan en el cálculo de indemnizaciones...'
      },
      {
        id: 2,
        category: 'Impositivo',
        title: 'Claves para una planificación tributaria eficiente 2025',
        date: '02 de abril, 2025',
        excerpt: 'Estrategias de planificación fiscal para reducir contingencias y optimizar la carga impositiva anual.'
      },
      {
        id: 3,
        category: 'Contable',
        title: 'Estados contables: errores frecuentes que debes evitar',
        date: '18 de mayo, 2025',
        excerpt: 'Revisión de los desaciertos más comunes en la preparación de estados contables y cómo mitigarlos.'
      },
      {
        id: 4,
        category: 'Societario',
        title: 'Reformas estatutarias: cuándo conviene actualizarlas',
        date: '07 de junio, 2025',
        excerpt: 'Situaciones típicas que justifican una modificación estatutaria y buenas prácticas para implementarla.'
      }
    ],
    filters: ['Todos', 'Contable', 'Impositivo', 'Laboral', 'Societario']
  },
  contact: {
    headline: 'Hablemos de tu proyecto',
    text:
      'Agenda una consulta gratuita y descubre cómo podemos ayudar a tu empresa a crecer de manera eficiente y profesional.',
    address: 'Morales 639, Bariloche, Río Negro, Argentina',
    phones: ['+54 294 4459796', '+54 294 4427365', '+54 294 4240591'],
    email: 'info@estudiocils.com.ar',
    hours: ['Lunes a Viernes: 9:00 - 18:00 hs', 'Sábados: 9:00 - 13:00 hs'],
    quick: [
      { label: 'WhatsApp', href: 'https://wa.me/5492944459796', color: '#25D366', icon: 'whatsapp' },
      { label: 'LinkedIn', href: '#', color: '#0A66C2', icon: 'linkedin' },
      { label: 'Email', href: 'mailto:info@estudiocils.com.ar', color: '#6B7280', icon: 'email' }
    ]
  },
  team: {
    intro: {
      heading: 'Quiénes somos',
      text: [
        'Somos un equipo de trabajo dinámico con más de 10 años de trayectoria en la ciudad de Bariloche y la región, compuesto por profesionales especializados y permanentemente actualizados.',
        'Brindamos soluciones integrales ajustadas a las necesidades de nuestros clientes, cumpliendo los plazos y en forma oportuna, necesario en todo contexto económico financiero de permanente cambio.',
        'Nuestro estudio se orienta, aplicando altos estándares de calidad, a la prestación de servicios profesionales en cuatro importantes áreas vinculadas al funcionamiento económico financiero de toda empresa: CONTABLE, IMPOSITIVA, LABORAL y SOCIETARIA, siendo las mismas los cuatro pilares de nuestra organización.'
      ],
      why: [
        'Cada una de las personas que formamos parte de nuestro equipo de trabajo nos esforzamos día a día para acompañar a cada uno de nuestros clientes en el cumplimiento eficiente de sus obligaciones fiscales, legales y reglamentarias y responder a sus necesidades de crecimiento constante.',
        'El abordaje de los servicios contratados por el cliente se realiza siempre desde un enfoque integral con el aporte de cada unas de las áreas del estudio para lograr de esa manera una sinergia tal que permita obtener un resultado integral con la mayor calidad.'
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
  footer: {
    about: {
      text:
        'Más de 10 años brindando soluciones integrales en gestión contable, impositiva, laboral y societaria.',
      socials: [
        { label: 'LinkedIn', href: '#' },
        { label: 'Facebook', href: '#' },
        { label: 'Instagram', href: '#' }
      ]
    },
    services: [
      { label: 'Contable', href: '/servicios' },
      { label: 'Impositiva', href: '/servicios' },
      { label: 'Laboral', href: '/servicios' },
      { label: 'Societaria', href: '/servicios' }
    ],
    company: [
      { label: 'Quiénes somos', href: '/nosotros' },
      { label: 'Nuestro equipo', href: '/nosotros' },
      { label: 'Clientes', href: '/clientes' },
      { label: 'Blog', href: '/blog' },
      { label: 'Contacto', href: '/contacto' }
    ],
    newsletter: {
      headline: 'Recibe novedades',
      legal: 'Enviamos actualizaciones mensuales sobre cambios normativos.'
    },
    bottom: {
      left: '© 2024 Estudio CILS. Todos los derechos reservados.',
      center: 'Política de Privacidad | Términos y Condiciones',
      right: 'Diseñado con ❤️ en Bariloche'
    }
  },
  floating: {
    whatsapp: { href: 'https://wa.me/5492944459796' },
    scrollTop: { enabled: true }
  },
  seo: {
    title:
      'Estudio CILS | Servicios Contables en Bariloche | +10 años de experiencia',
    description:
      'Estudio contable en Bariloche con +10 años de experiencia. Servicios integrales de gestión contable, impositiva, laboral y societaria. Empresas como INVAP confían en nosotros.',
    keywords: [
      'estudio contable bariloche',
      'contador bariloche',
      'gestión impositiva',
      'asesoría laboral patagonia',
      'servicios contables'
    ],
    canonical: 'https://estudiocils.com.ar/',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'ProfessionalService',
      name: 'Estudio CILS',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Morales 639',
        addressLocality: 'San Carlos de Bariloche',
        addressRegion: 'Río Negro',
        addressCountry: 'AR'
      },
      telephone: '+54 294 4459796',
      email: 'info@estudiocils.com.ar'
    }
  }
};

export default corporateCils;
