import React from 'react';
import { siteConfig } from '../../config/site.config';
import { StatCard } from '../../components/StatCard';
import { SectionHeader } from '../../components/SectionHeader';
import { iconForStat } from '../../components/ui/icons';

export const StatsBar: React.FC = () => {
  const items = siteConfig.stats;
  return (
    <section className="section">
      <div className="container flex justify-center flex-col items-center md:items-start">
        <SectionHeader 
          badge="Nuestros resultados" 
          title="Nuestros Números"
          className="mb-8"
        />
        <div className="bg-white dark:bg-[#1F2C33] rounded-xl shadow-card p-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {items.map((i, index) => (
            <StatCard key={i.label} icon={iconForStat(i.label)} value={i.value} label={i.label} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};
