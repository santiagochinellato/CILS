import React from 'react';
import { useNovedades } from '../../hooks/useNovedades';
// En Vite, los assets en public no se importan desde JS; usamos la URL pública
const logoWhite = '/images/cilsLogoWhite.webp';
interface Props {
  limit?: number;
  tag?: string;
  region?: string;
}

export const Novedades: React.FC<Props> = ({ limit = 8, tag, region }) => {
  const { data, loading, error } = useNovedades({ limit, tag, region });

  return (
    <section id="novedades" className="section">
      <div className="container">
                            <span className="inline-block px-3 py-1 rounded bg-accent2 text-primary text-sm font-medium">
       Mantente informado con nuestras
            </span>
        <h2 className="mt-4 font-montserrat text-start text-3xl md:text-4xl font-semibold text-center">Novedades y Actualizaciones</h2>
        <p className="text-textLight text-justify mt-5">Mantente informado sobre cambios normativos y tendencias del sector</p>
        
        {loading && (
          <div className="mt-10 grid md:grid-cols-3 gap-8">
            {[...Array(limit || 6)].map((_, index) => (
              <div key={index} className="block bg-white dark:bg-white/5 rounded-xl shadow-card overflow-hidden border border-transparent dark:border-white/10">
                <div className="h-40 bg-muted/30 animate-pulse" />
                <div className="p-6">
                  <div className="flex gap-1 mb-3">
                    <div className="w-16 h-5 bg-muted/50 rounded animate-pulse" />
                    <div className="w-12 h-5 bg-muted/30 rounded animate-pulse" />
                  </div>
                  <div className="w-full h-6 bg-muted/50 rounded animate-pulse mb-2" />
                  <div className="w-3/4 h-4 bg-muted/30 rounded animate-pulse mb-3" />
                  <div className="w-20 h-4 bg-muted/30 rounded animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        )}
        {!loading && data && data.length > 0 && (
          <div className="mt-10 grid md:grid-cols-3 gap-8">
            {data.map((item, index) => (
              <a
                key={item.id}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-white dark:bg-white/5 rounded-xl shadow-card dark:shadow-cardHover overflow-hidden border border-transparent dark:border-white/10 hover:shadow-cardHover dark:hover:shadow-xl transition-shadow"
              >
                {/* Imagen o gradiente placeholder */}
                {item.image ? (
                  <div className="h-40 overflow-hidden bg-muted/30 flex-shrink-0">
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="w-full h-full object-cover" 
                      loading={index < 3 ? "eager" : "lazy"}
                      width={362}
                      height={160}
                      style={{ aspectRatio: '362/160' }}
                      fetchPriority={index === 0 ? "high" : undefined}
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        target.parentElement!.innerHTML = `
                          <div class="h-40 bg-gradient-to-br from-accent1 to-accent2 dark:from-[#1F2C33] dark:to-[#0F1C21] flex justify-center items-center">
                            <img src="${logoWhite}" style="aspect-ratio: 275/90; object-fit: contain;" width="200" height="auto" />
                          </div>
                        `;
                      }}
                    />
                  </div>
                ) : (
                  <div className="h-40 bg-gradient-to-br from-accent1 to-accent2 dark:from-[#1F2C33] dark:to-[#0F1C21] flex justify-center items-center flex-shrink-0">
                    <img 
                      src={logoWhite} 
                      alt="CILS Logo" 
                      style={{ aspectRatio: '275/90', objectFit: 'contain' }} 
                      width={200} 
                      height={73}
                    />
                  </div>
                )}
                
                <div className="p-6">
                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 mb-3">
                    {item.tags.slice(0, 2).map((t) => (
                      <span 
                        key={t} 
                        className="inline-block text-xs px-2 py-1 rounded bg-accent2 dark:bg-white/10 text-primary dark:text-accent1 font-medium"
                      >
                        {t}
                      </span>
                    ))}
                    {item.region && (
                      <span className="inline-block text-xs px-2 py-1 rounded bg-secondary/10 dark:bg-white/5 text-secondary dark:text-accent2 font-medium">
                        {item.region}
                      </span>
                    )}
                  </div>
                  
                  <h3 className="mt-3 font-montserrat text-lg font-semibold text-text dark:text-white line-clamp-2">
                    {item.title}
                  </h3>
                  
                  {/* <p className="text-textLight dark:text-textLight text-sm mt-2 line-clamp-2">
                    {item.summary || 'Sin descripción disponible.'}
                  </p> */}
                  
                  <div className="mt-3 flex flex-col items-start justify-between text-xs text-textLight dark:text-textLight">
                    <span>{new Date(item.publishedAt).toLocaleDateString('es-AR')}</span>
                    <span className="font-medium">{item.source}</span>
                  </div>
                  
                  <div className="mt-4 text-secondary dark:text-accent1 hover:text-primary dark:hover:text-white text-sm font-medium">
                    Leer más →
                  </div>
                </div>
              </a>
            ))}
          </div>
        )}
        
        {!loading && (!data || data.length === 0) && (
          <div className="mt-10">
            <div className="bg-white dark:bg-white/5 rounded-xl shadow-card p-8 text-center border border-transparent dark:border-white/10">
              <div className="w-16 h-16 mx-auto mb-4 bg-accent1/20 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-accent1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
              </div>
              <p className="text-textLight dark:text-textLight mb-4">
                {error ? 'No se pueden cargar las novedades en este momento.' : 'No hay novedades disponibles por ahora.'}
              </p>
              <p className="text-xs text-textLight/70 dark:text-textLight/70">
                Vuelve pronto para ver las últimas actualizaciones.
              </p>
            </div>
          </div>
        )}
        
        <div className="text-center mt-10">
          <a href="/novedades" className="text-secondary hover:text-primary font-medium">
            Ver todas las novedades →
          </a>
        </div>
      </div>
    </section>
  );
};
