import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Calendar, Building2 } from 'lucide-react';
import type { Experience } from '../../data/portfolio';
import './ui.css';

interface TimelineItemProps {
  experience: Experience;
  index: number;
  isLeft: boolean;
}

export const TimelineItem: React.FC<TimelineItemProps> = ({ experience, index, isLeft }) => {
  return (
    <motion.div 
      className={`timeline-item timeline-item--${isLeft ? 'left' : 'right'}`}
      initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
    >
      <div className="timeline-item__connector">
        <div className="timeline-item__pulse" />
      </div>
      <div className="timeline-item__content glass">
        <div className="timeline-item__header">
          <div className="timeline-item__icon-box">
            <Briefcase size={18} className="text-accent" />
          </div>
          <div>
            <h3 className="timeline-item__company">
              <Building2 size={15} style={{ display: 'inline', marginRight: '6px' }} className="text-accent" />
              {experience.company}
            </h3>
            <div className="timeline-item__role">{experience.role}</div>
          </div>
        </div>

        <div className="timeline-item__date-badge">
          <Calendar size={13} />
          <span>{experience.startDate} — {experience.endDate}</span>
        </div>

        <p className="timeline-item__description">{experience.description}</p>
      </div>
    </motion.div>
  );
};
