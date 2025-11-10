import React from 'react';
import { motion } from 'framer-motion';
import { icons, IconName } from './icons';
import { iconColor } from './iconColor';

type IconContext = 'default' | 'service' | 'stat' | 'contact' | 'footer' | 'accent';

interface IconProps {
  name: IconName;
  size?: number;
  context?: IconContext;
  className?: string;
  hover?: boolean;
  strokeWidth?: number;
}

export const Icon: React.FC<IconProps> = ({
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
  const Wrapper: any = hover ? motion.div : 'div';
  return (
    <Wrapper
      whileHover={hover ? { scale: 1.05 } : undefined}
      transition={{ duration: 0.25 }}
      className={className}
    >
      <LucideIcon size={size} color={color} strokeWidth={strokeWidth} />
    </Wrapper>
  );
};
