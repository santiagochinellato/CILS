import React from 'react';
import type { NovedadItem } from '../../hooks/useNovedades';
import { motion } from 'framer-motion';

export const NewsCard: React.FC<{ item: NovedadItem }> = ({ item }) => {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-xl bg-background/50 dark:bg-white/5 border border-border/40 backdrop-blur-sm p-4 flex flex-col gap-3 shadow-sm hover:shadow-md transition-shadow"
    >
      {item.image && (
        <div className="aspect-video w-full overflow-hidden rounded-lg bg-muted/30">
          <img src={item.image} alt={item.title} className="w-full h-full object-cover" loading="lazy" />
        </div>
      )}
      <h4 className="font-semibold text-lg leading-tight line-clamp-2">{item.title}</h4>
      <p className="text-sm text-muted-foreground line-clamp-3">{item.summary || 'Sin resumen disponible.'}</p>
      <div className="flex flex-wrap gap-1">
        {item.tags.map((t) => (
          <span key={t} className="text-xs px-2 py-0.5 rounded bg-accent/10 text-accent">
            {t}
          </span>
        ))}
        {item.region && (
          <span className="text-xs px-2 py-0.5 rounded bg-secondary/10 text-secondary">{item.region}</span>
        )}
      </div>
      <div className="flex items-center justify-between mt-auto pt-2">
        <span className="text-xs text-muted-foreground">{new Date(item.publishedAt).toLocaleDateString('es-AR')}</span>
        <a
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-medium text-primary hover:underline"
        >
          Fuente: {item.source}
        </a>
      </div>
    </motion.article>
  );
};
