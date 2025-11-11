import React from 'react';
import { cn } from '../utils/cn';

interface SectionHeaderProps {
  badge?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({ 
  badge, 
  title, 
  subtitle, 
  align = 'left',
  className 
}) => {
  const alignClasses = align === 'center' ? 'items-center text-center' : 'items-start text-left';
  
  return (
    <div className={cn('flex flex-col', alignClasses, className)}>
      {badge && (
        <span className="inline-block px-3 py-1 rounded bg-accent2 text-primary text-sm font-medium w-fit">
          {badge}
        </span>
      )}
      <h2 className="mt-4 font-montserrat text-3xl md:text-4xl font-semibold">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-textLight dark:text-white/70 max-w-2xl">
          {subtitle}
        </p>
      )}
    </div>
  );
};
