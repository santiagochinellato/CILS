import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Icon } from '../ui/Icon';
import { useSiteConfig } from '../../config/site.config';

interface AccordionItemProps {
  title: string;
  content: string;
  isOpen: boolean;
  onToggle: () => void;
}

const AccordionItem: React.FC<AccordionItemProps> = ({ title, content, isOpen, onToggle }) => {
  return (
    <div className="border-b border-gray-200 dark:border-gray-700">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-5 text-left hover:text-primary transition-colors"
      >
        <h3 className="font-montserrat text-lg md:text-xl font-semibold pr-4">{title}</h3>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="flex-shrink-0"
        >
          <Icon name="chevronDown" size={24} />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="pb-5 text-textLight leading-relaxed">
              {content}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const AboutMore: React.FC = () => {
  const siteConfig = useSiteConfig();
  const team = siteConfig.team;
  const about = siteConfig.about;
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  if (!team) return null;

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="about-more" className="section">
      <div className="container">
        <div className="max-w-4xl mx-auto">
          {/* Heading */}
          <div className="text-start mb-5">
            <span className="inline-block px-3 py-1 rounded bg-accent2 text-primary text-sm font-medium">
        Conoce sobre
            </span>
            <h2 className="mt-4 font-montserrat text-3xl md:text-4xl font-semibold">
        {team.intro.heading}
            </h2>
          </div>

          {/* Párrafos introductorios */}
          <div className="space-y-4 mb-12">
            {team.intro.text.map((paragraph, index) => (
              <p key={index} className="text-textLight text-justify leading-relaxed ">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Accordions */}
          <div className="bg-white dark:bg-[#1F2C33] rounded-xl p-6 md:p-8 shadow-card">
            {about.tabs.map((tab, index) => (
              <AccordionItem
                key={index}
                title={tab.title}
                content={tab.content}
                isOpen={openIndex === index}
                onToggle={() => handleToggle(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
