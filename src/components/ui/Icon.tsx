import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { icons, IconName } from './icons';
import { iconColor } from './iconColor';

export type IconContext = 'default' | 'service' | 'stat' | 'contact' | 'footer' | 'accent';

export interface IconProps {
  name: IconName;
  size?: number;
  context?: IconContext;
  className?: string;
  hover?: boolean;
  strokeWidth?: number;
}

export const Icon = memo<IconProps>(({
  name,
  size = 24,
  context = 'default',
  className,
  hover = false,
  strokeWidth = 2
}) => {
  const LucideIcon = icons[name];
  const colorMap: Record<IconContext, string> = {
    default: iconColor.primary,
    service: iconColor.accent,
    stat: iconColor.primary,
    contact: iconColor.primary,
    footer: '#FFFFFF',
    accent: iconColor.accentLight
  };
  const color = colorMap[context];
  
  if (hover) {
    return (
      <motion.div
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.25 }}
        className={className}
      >
        <LucideIcon size={size} color={color} strokeWidth={strokeWidth} />
      </motion.div>
    );
  }
  
  return (
    <div className={className}>
      <LucideIcon size={size} color={color} strokeWidth={strokeWidth} />
    </div>
  );
});

Icon.displayName = 'Icon';
