// NewsAPI queries & RSS sources
export const NEWSAPI_QUERIES = [
  // IMPOSITIVO / TRIBUTARIO
  {
    q: 'impuesto OR impuestos OR reforma tributaria OR impositiva OR fiscal OR AFIP OR ganancias OR IVA OR monotributo',
    sources: 'ambito.com,cronista.com,infobae.com,lanacion.com.ar,iprofesional.com,perfil.com,clarin.com,pagina12.com.ar',
    language: 'es',
    sortBy: 'publishedAt',
    pageSize: 50
  },

  // CONTABLE / BALANCES / NIA / IASB
  {
    q: 'contable OR contabilidad OR estados contables OR balance OR auditoría OR auditoria OR IFRS OR IASB OR NIA',
    sources: 'ambito.com,cronista.com,infobae.com,lanacion.com.ar,iprofesional.com,perfil.com,clarin.com,pagina12.com.ar',
    language: 'es',
    sortBy: 'publishedAt',
    pageSize: 50
  },

  // LABORAL / DERECHO LABORAL
  {
    q: 'laboral OR empleo OR sueldos OR salario OR indemnizacion OR indemnización OR reforma laboral OR convenio OR ART OR sindical OR cargas sociales',
    sources: 'ambito.com,cronista.com,infobae.com,lanacion.com.ar,iprofesional.com,perfil.com,clarin.com,pagina12.com.ar',
    language: 'es',
    sortBy: 'publishedAt',
    pageSize: 50
  },

  // SOCIETARIO / IGJ / SOCIEDADES
  {
    q: 'societaria OR sociedades OR ley general de sociedades OR IGJ OR estatuto OR directorio OR accionistas OR SAS OR SA OR SRL',
    sources: 'ambito.com,cronista.com,infobae.com,lanacion.com.ar,iprofesional.com,perfil.com,clarin.com,pagina12.com.ar',
    language: 'es',
    sortBy: 'publishedAt',
    pageSize: 50
  },

  // ECONOMÍA GENERAL RELEVANTE
  {
    q: 'economía OR economico OR dólar OR inflación OR PBI OR exportaciones OR industria OR consumo OR mercado financiero',
    sources: 'ambito.com,cronista.com,infobae.com,lanacion.com.ar,iprofesional.com,perfil.com,clarin.com,pagina12.com.ar',
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
