import React from 'react';
import { motion } from 'framer-motion';
import './ui.css';

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({ title, subtitle, align = 'center' }) => {
  return (
    <motion.div 
      className={`section-heading section-heading--${align}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="section-heading__title">{title}</h2>
      <div className="section-heading__line" />
      {subtitle && <p className="section-heading__subtitle">{subtitle}</p>}
    </motion.div>
  );
};