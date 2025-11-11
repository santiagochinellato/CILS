import React from 'react';
import { useNovedades } from '../../hooks/useNovedades';
// En Vite, los assets en public no se importan desde JS; usamos la URL pública
const logoWhite = '/images/cilsLogoWhite.png';
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
        
        {loading && <p className="text-sm animate-pulse text-center mt-10">Cargando novedades...</p>}
        {error && <p className="text-sm text-red-600 text-center mt-10">Error al cargar novedades: {error}</p>}
        
        {!loading && data && data.length > 0 && (
          <div className="mt-10 grid md:grid-cols-3 gap-8">
            {data.map((item) => (
              <a
                key={item.id}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-white dark:bg-white/5 rounded-xl shadow-card dark:shadow-cardHover overflow-hidden border border-transparent dark:border-white/10 hover:shadow-cardHover dark:hover:shadow-xl transition-shadow"
              >
                {/* Imagen o gradiente placeholder */}
                {item.image ? (
                  <div className="h-40 overflow-hidden bg-muted/30">
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="w-full h-full object-cover" 
                      loading="lazy"
                    />
                  </div>
                ) : (
                  <div className="h-40 bg-gradient-to-br from-accent1 to-accent2 dark:from-[#1F2C33] dark:to-[#0F1C21] flex justify-center items-center" > <img src={logoWhite}     style={{ aspectRatio: '275 / 90', objectFit: 'contain' }}    width={'200px'}
    height={'100%'} /> </div>
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
        
        {!loading && data && data.length === 0 && (
          <p className="text-sm text-muted-foreground text-center mt-10">No hay novedades disponibles por ahora.</p>
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
