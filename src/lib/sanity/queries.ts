import groq from 'groq';

// Query principal para obtener toda la configuración del sitio
export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0] {
    "DEBUG_total_settings": count(*[_type == "siteSettings"]),
    navigation[] {
      label,
      href
    },
    hero {
      badge,
      title,
      subtitle,
      ctaPrimary {
        label,
        href
      },
      ctaSecondary {
        label,
        href
      },
      trust
    },
    stats[] {
      value,
      label
    },
    about {
      badge,
      title,
      paragraphs,
      features,
      pillars,
      tabs[] {
        title,
        content
      }
    },
    "services": services[]-> {
      icon,
      title,
      description,
      features,
      href,
      order
    } | order(order asc),
    "clients": clients[]-> {
      name,
      "logo": logo.asset->url,
      href,
      featured,
      order
    } | order(order asc),
    "testimonials": testimonials[]-> {
      company,
      text,
      author,
      rating,
      order
    } | order(order asc),
    team {
      intro {
        heading,
        text,
        why
      },
      "staff": staff[]-> {
        name,
        role,
        titles,
        email,
        linkedin,
        area,
        "image": image.asset->url,
        category,
        order
      } | order(order asc)
    },
    contact {
      headline,
      text,
      address,
      phones,
      whatsapp,
      email,
      hours,
      quick[] {
        label,
        href,
        color,
        icon
      }
    },
    footer {
      about {
        text,
        socials[] {
          label,
          href
        }
      },
      services[] {
        label,
        href
      },
      company[] {
        label,
        href
      },
      newsletter {
        headline,
        legal
      },
      bottom {
        left,
        center,
        right
      }
    },
    seo {
      title,
      description,
      keywords,
      canonical,
      jsonLd {
        context,
        type,
        name,
        address {
          type,
          streetAddress,
          addressLocality,
          addressRegion,
          addressCountry
        },
        telephone,
        email
      }
    },
    floating {
      whatsapp {
        href
      },
      scrollTop {
        enabled
      }
    },
    "links": links[]-> {
      title,
      href,
      description,
      icon,
      order
    } | order(order asc)
  }
`;

