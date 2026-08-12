import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionHeading } from '../components/ui/SectionHeading';
import { SkillBadge } from '../components/ui/SkillBadge';
import { IconCloud } from '../components/ui/interactive-icon-cloud';
import { getPortfolioData } from '../data/portfolio';
import { useLanguage } from '../context/LanguageContext';
import './Skills.css';

const iconSlugs = [
  "typescript",
  "javascript",
  "react",
  "html5",
  "css3",
  "nodedotjs",
  "express",
  "nextdotjs",
  "postgresql",
  "mongodb",
  "git",
  "github",
  "figma",
  "python",
  "android",
  "docker",
  "prisma",
  "vercel"
];

export const Skills = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const data = getPortfolioData();
  const { t } = useLanguage();

  const categories = [
    { key: 'all', label: t.skills.all },
    { key: 'frontend', label: t.skills.frontend },
    { key: 'backend', label: t.skills.backend },
    { key: 'tools', label: t.skills.tools },
  ];

  const filteredSkills =
    activeCategory === 'all'
      ? data.skills
      : data.skills.filter((s) => s.category === activeCategory);

  const marqueeItems = [...data.skills, ...data.skills];

  return (
    <section id="skills" className="section">
      <div className="container">
        <SectionHeading title={t.skills.title} subtitle={t.skills.subtitle} />

        {/* 3D Interactive Tech Icon Globe Cloud */}
        <div className="skills-cloud-container my-8 flex items-center justify-center overflow-hidden rounded-2xl border border-border bg-tertiary/20 p-8 glass">
          <div className="w-full max-w-md">
            <IconCloud iconSlugs={iconSlugs} />
          </div>
        </div>

        {/* Running Marquee Animation Banner */}
        <div className="skills-marquee">
          <div className="skills-marquee__track">
            {marqueeItems.map((skill, index) => (
              <div key={`${skill.id}-${index}`} className="skills-marquee__item">
                {skill.icon && (
                  <img
                    src={skill.icon}
                    alt={skill.name}
                    className="skills-marquee__icon"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                )}
                <span className="skills-marquee__name">{skill.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Filter buttons */}
        <div className="skills__filters">
          {categories.map((cat) => (
            <button
              key={cat.key}
              className={`skills__filter-btn ${activeCategory === cat.key ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat.key)}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Skills grid */}
        <motion.div className="skills__grid" layout>
          <AnimatePresence mode="popLayout">
            {filteredSkills.map((skill, index) => (
              <motion.div
                key={skill.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3, delay: index * 0.04 }}
              >
                <SkillBadge skill={skill} index={index} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};
