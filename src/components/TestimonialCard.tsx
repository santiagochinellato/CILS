import React, { memo } from 'react';

interface TestimonialCardProps {
  company: string;
  text: string;
  author: string;
  rating: number;
}

export const TestimonialCard = memo<TestimonialCardProps>(({ company, text, author, rating }) => {
  return (
    <article className="bg-white dark:bg-[#1F2C33] rounded-xl p-6 shadow-card hover:shadow-cardHover transition-shadow">
      <h3 className="text-primary dark:text-accent1 font-semibold text-lg">{company}</h3>
      <blockquote className="mt-3 text-textLight dark:text-white/70 leading-relaxed">
        "{text}"
      </blockquote>
      <footer className="mt-4">
        <p className="text-sm text-textLight dark:text-white/60">{author}</p>
        <div className="mt-2 flex items-center gap-1" role="img" aria-label={`Calificación: ${rating} de 5 estrellas`}>
          {Array.from({ length: 5 }, (_, i) => (
            <span key={i} className={i < rating ? 'text-yellow-500' : 'text-gray-300'}>
              ⭐
            </span>
          ))}
        </div>
      </footer>
    </article>
  );
});

TestimonialCard.displayName = 'TestimonialCard';
