// Tipos de contenido para el sistema de templates
export type NavItem = { label: string; href: string };

export type Hero = {
  badge: string;
  title: string;
  subtitle: string;
  ctaPrimary: { label: string; href: string };
  ctaSecondary: { label: string; href: string };
  trust: string;
};

export type Stat = { value: string; label: string };

export type About = {
  badge: string;
  title: string;
  paragraphs: string[];
  features: string[];
  pillars: string[];
  tabs: Array<{ title: string; content: string }>;
};

export type ServiceCard = {
  icon: string; // key de iconos lucide registrados
  title: string;
  description: string;
  features: string[];
  href?: string;
};

export type Client = { name: string; logo?: string; href?: string; featured?: boolean };

export type Testimonial = {
  company: string;
  text: string;
  author: string;
  rating: number;
};

export type BlogPostCard = {
  id: string | number;
  category: string;
  title: string;
  date: string;
  excerpt: string;
  image?: string;
  href?: string;
};

export type ContactInfo = {
  headline: string;
  text: string;
  address: string;
  phones: string[];
  email: string;
  hours: string[];
  quick: Array<{ label: string; href: string; color?: string; icon?: string }>;
};

export type Footer = {
  about: { text: string; socials: Array<{ label: string; href: string }> };
  services: NavItem[];
  company: NavItem[];
  newsletter?: { headline: string; legal: string };
  bottom: { left: string; center: string; right: string };
};

export type SEO = {
  title: string;
  description: string;
  keywords?: string[];
  canonical?: string;
  jsonLd?: Record<string, any>;
};

export type Floating = {
  whatsapp: { href: string };
  scrollTop: { enabled: boolean };
};

export type ExternalLink = {
  title: string;
  href: string;
  description: string;
  icon: string; // referencia a IconName
};

export type SiteConfig = {
  nav: NavItem[];
  hero: Hero;
  stats: Stat[];
  about: About;
  services: ServiceCard[];
  clients: Client[];
  testimonials: Testimonial[];
  blog: { posts: BlogPostCard[]; filters: string[] };
  contact: ContactInfo;
  footer: Footer;
  floating: Floating;
  seo: SEO;
  team?: {
    intro: {
      heading: string;
      text: string[];
      why: string[];
    };
    staff: Array<{
      name: string;
      role: string;
      titles?: string[];
      email: string;
      linkedin?: string;
      area?: string;
      image?: string; // Ruta a la imagen del miembro del equipo
    }>;
  };
  links?: ExternalLink[];
};
