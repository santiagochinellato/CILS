import siteSettings from './siteSettings';
import navigation from './navigation';
import hero from './hero';
import about from './about';
import stat from './stat';
import service from './service';
import client from './client';
import testimonial from './testimonial';
import teamMember from './teamMember';
import team from './team';
import link from './link';
import cta from './objects/cta';
import contactInfo from './objects/contactInfo';
import footerConfig from './objects/footerConfig';
import seoMetadata from './objects/seoMetadata';
import floatingActions from './objects/floatingActions';

export const schemaTypes = [
  // Documentos principales
  siteSettings,
  service,
  client,
  testimonial,
  teamMember,
  link,
  
  // Objetos anidados
  navigation,
  hero,
  about,
  stat,
  team,
  cta,
  contactInfo,
  footerConfig,
  seoMetadata,
  floatingActions,
];

