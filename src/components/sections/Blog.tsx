import React from 'react';
import { siteConfig } from '../../config/site.config';

interface BlogProps { limit?: number }

export const Blog: React.FC<BlogProps> = ({ limit }) => {
  const posts = limit ? siteConfig.blog.posts.slice(0, limit) : siteConfig.blog.posts;
  return (
    <section id="blog" className="section">
      <div className="container">
        <h2 className="font-montserrat text-3xl md:text-4xl font-semibold text-center">Novedades y Actualizaciones</h2>
        <p className="text-textLight text-center mt-3">Mantente informado sobre cambios normativos y tendencias del sector</p>
        <div className="mt-10 grid md:grid-cols-3 gap-8">
          {posts.map((p) => (
            <article key={p.id} className="bg-white dark:bg-white/5 rounded-xl shadow-card dark:shadow-cardHover overflow-hidden border border-transparent dark:border-white/10">
              <div className="h-40 bg-gradient-to-br from-accent1 to-accent2 dark:from-[#1F2C33] dark:to-[#0F1C21]" />
              <div className="p-6">
                <span className="inline-block text-xs px-2 py-1 rounded bg-accent2 dark:bg-white/10 text-primary dark:text-accent1 font-medium">
                  {p.category}
                </span>
                <h3 className="mt-3 font-montserrat text-lg font-semibold text-text dark:text-white">{p.title}</h3>
                <p className="text-textLight dark:text-textLight text-sm mt-2 line-clamp-2">{p.excerpt}</p>
                <div className="mt-3 text-xs text-textLight dark:text-textLight">{p.date}</div>
                <a href={p.href ?? '#'} className="mt-4 inline-block text-secondary dark:text-accent1 hover:text-primary dark:hover:text-white text-sm font-medium">
                  Leer más →
                </a>
              </div>
            </article>
          ))}
        </div>
        <div className="text-center mt-10">
          <a href="#" className="text-secondary hover:text-primary font-medium">
            Ver todas las novedades →
          </a>
        </div>
      </div>
    </section>
  );
};
