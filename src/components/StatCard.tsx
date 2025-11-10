import React from 'react';
import { motion } from 'framer-motion';
import { Icon } from './ui/Icon';
import type { IconName } from './ui/icons';

interface StatCardProps {
  icon: IconName;
  value: string;
  label: string;
  index?: number;
}

export const StatCard: React.FC<StatCardProps> = ({ icon, value, label, index = 0 }) => {
  return (
    <motion.div 
      className="flex flex-col gap-1 text-center p-6 bg-white dark:bg-[#1F2C33] rounded-xl shadow hover:shadow-cardHover transition-shadow"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ scale: 1.05 }}
    >
      <div className='flex justify-center items-center gap-2'>
        <motion.div
          initial={{ rotate: 0 }}
          whileHover={{ rotate: 360 }}
          transition={{ duration: 0.6 }}
        >
          <Icon name={icon} size={40} context="stat" />
        </motion.div>
        <p className="text-4xl font-bold text-[#106973] dark:text-white">{value}</p>
      </div>
      <p className="text-[#718096] dark:text-white/70 mt-1 text-md">{label}</p>
    </motion.div>
  );
};
