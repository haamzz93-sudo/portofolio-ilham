import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionHeading } from '../components/ui/SectionHeading';
import { ProjectCard } from '../components/ui/ProjectCard';
import { getPortfolioData } from '../data/portfolio';
import { useLanguage } from '../context/LanguageContext';
import './Projects.css';

export const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const data = getPortfolioData();
  const { t } = useLanguage();

  const filters = [
    { key: 'all', label: t.projects.all },
    { key: 'web', label: t.projects.web },
    { key: 'mobile', label: t.projects.mobile },
    { key: 'other', label: t.projects.other },
  ];

  const filteredProjects =
    activeFilter === 'all'
      ? data.projects
      : data.projects.filter((p) => p.category === activeFilter);

  return (
    <section id="projects" className="section section--alt">
      <div className="container">
        <SectionHeading title={t.projects.title} subtitle={t.projects.subtitle} />

        <div className="projects__filters">
          {filters.map((f) => (
            <button
              key={f.key}
              className={`skills__filter-btn ${activeFilter === f.key ? 'active' : ''}`}
              onClick={() => setActiveFilter(f.key)}
            >
              {f.label}
            </button>
          ))}
        </div>

        <motion.div className="projects__grid" layout>
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className={project.featured ? 'projects__featured' : ''}
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};
