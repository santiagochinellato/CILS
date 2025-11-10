import React from 'react';
import { Icon } from './ui/Icon';
import type { IconName } from './ui/icons';

interface FeatureItemProps {
  icon: IconName;
  text: string;
}

export const FeatureItem: React.FC<FeatureItemProps> = ({ icon, text }) => {
  return (
    <div className="flex items-center gap-3">
      <Icon name={icon} size={28} context="accent" />
      <p className="text-[#2D3748] dark:text-white/90 text-sm md:text-base leading-relaxed">{text}</p>
    </div>
  );
};
