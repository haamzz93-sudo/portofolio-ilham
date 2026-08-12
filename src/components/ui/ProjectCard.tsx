import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Code2 } from 'lucide-react';
import type { Project } from '../../data/portfolio';
import { useLanguage } from '../../context/LanguageContext';
import './ui.css';

interface ProjectCardProps {
  project: Project;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const { t } = useLanguage();

  return (
    <motion.div
      className={`project-card ${project.featured ? 'project-card--featured' : ''}`}
      whileHover={{ scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      {project.image && (
        <div className="project-card__image-container">
          <img src={project.image} alt={project.title} className="project-card__image" />
        </div>
      )}

      <div className="project-card__content">
        <h3 className="project-card__title">{project.title}</h3>
        <p className="project-card__description">{project.description}</p>

        <div className="project-card__tags">
          {project.tags.map(tag => (
            <span key={tag} className="project-card__tag">{tag}</span>
          ))}
        </div>

        <div className="project-card__footer">
          {project.liveUrl && (
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="project-card__link">
              <ExternalLink size={16} /> {t.projects.liveDemo}
            </a>
          )}
          {project.githubUrl && (
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="project-card__link">
              <Code2 size={16} /> {t.projects.sourceCode}
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};