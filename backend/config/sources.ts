// NewsAPI queries & RSS sources
// Nota: NewsAPI plan gratuito puede tener limitaciones con el parámetro domains
// El filtrado de fuentes se hace en la normalización via blacklist y taxonomy

export const NEWSAPI_QUERIES = [
  // IMPOSITIVO / TRIBUTARIO
  {
    q: '(impuesto OR impuestos OR AFIP OR ganancias OR IVA OR monotributo OR "reforma tributaria") AND argentina',
    language: 'es',
    sortBy: 'publishedAt',
    pageSize: 50
  },

  // CONTABLE / BALANCES
  {
    q: '(contable OR contabilidad OR balance OR auditoría OR IFRS) AND argentina',
    language: 'es',
    sortBy: 'publishedAt',
    pageSize: 50
  },

  // LABORAL / DERECHO LABORAL
  {
    q: '(laboral OR empleo OR salario OR indemnización OR "reforma laboral" OR convenio OR sindical) AND argentina',
    language: 'es',
    sortBy: 'publishedAt',
    pageSize: 50
  },

  // SOCIETARIO / IGJ / SOCIEDADES
  {
    q: '(societaria OR sociedades OR IGJ OR estatuto OR accionistas OR SRL OR SA) AND argentina',
    language: 'es',
    sortBy: 'publishedAt',
    pageSize: 50
  },

  // ECONOMÍA GENERAL
  {
    q: '(economía OR dólar OR inflación OR PBI OR industria) AND argentina',
    language: 'es',
    sortBy: 'publishedAt',
    pageSize: 50
  }
];

export const EXTRA_SOURCES = [
  'ambito.com',
  'cronista.com',
  'infobae.com',
  'lanacion.com.ar',
  'iprofesional.com',
  'perfil.com',
  'clarin.com',
  'pagina12.com.ar'
];

export interface RssSource { name: string; url: string; region?: string; }

export const RSS_SOURCES: RssSource[] = [
  // Temporalmente deshabilitado iProfesional por problemas de DNS
  // { name: 'iProfesional Economía', url: 'https://rss.atom.iprofesional.com/economia' },

  // Alternativas (comentadas hasta verificar URLs correctas)
  // { name: 'Ámbito Financiero', url: 'https://www.ambito.com/contenidos/rss-economia.xml' },
  // { name: 'El Cronista', url: 'https://www.cronista.com/rss/economia/' },
  // { name: 'Infobae Economía', url: 'https://www.infobae.com/feeds/rss/' }
];
