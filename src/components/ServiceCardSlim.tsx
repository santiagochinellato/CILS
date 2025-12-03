import React from 'react';
import { Icon } from './ui/Icon';
import type { IconName } from './ui/icons';
import { Link } from 'react-router-dom';

interface ServiceCardSlimProps {
  icon: IconName;
  title: string;
  description: string;
  href?: string;
}

export const ServiceCardSlim: React.FC<ServiceCardSlimProps> = ({ icon, title, description, href = '/servicios' }) => {
  return (
    <div className="bg-white dark:bg-[#1F2C33] p-5 rounded-xl shadow-card hover:-translate-y-1 hover:shadow-cardHover transition-all duration-300">
      <div className="mb-4 flex gap-1 items-center justify-start">
        <Icon name={icon} size={36} context="service" />
      <h3 className="text-lg font-semibold text-[#106973] dark:text-white">{title}</h3>

      </div>
      <p className="text-textLight dark:text-white/70 text-sm">{description}</p>
      <Link to={href} className="mt-4 inline-block text-[#307C86] dark:text-[#7AC3B1] font-medium hover:underline">
        Conocer más →
      </Link>
    </div>
  );
};
