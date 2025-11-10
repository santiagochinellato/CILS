import React from 'react';
import { Icon } from './ui/Icon';
import type { IconName } from './ui/icons';

interface ServiceCardProps {
  icon: IconName;
  title: string;
  description: string;
  features?: string[];
  href?: string;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ icon, title, description, features = [], href = '#contact' }) => {
  return (
    <div className="bg-white dark:bg-[#1F2C33] p-8 rounded-2xl shadow-card hover:-translate-y-2 hover:shadow-cardHover transition-all duration-300">
      <div className="mb-6">
        <Icon name={icon} size={48} context="service" hover />
      </div>

      <h3 className="text-2xl font-semibold text-[#106973] dark:text-white mb-3">{title}</h3>

      <p className="text-[#718096] dark:text-white/70 mb-6">{description}</p>

      {features.length > 0 && (
        <ul className="space-y-2">
          {features.map((item, i) => (
            <li key={i} className="flex items-center gap-2 text-[#2D3748] dark:text-white/90">
              <Icon name="badgeCheck" size={18} context="accent" />
              {item}
            </li>
          ))}
        </ul>
      )}

      <a href={href} className="mt-6 inline-block text-[#307C86] dark:text-[#7AC3B1] font-medium hover:underline">
        Más información →
      </a>
    </div>
  );
};
