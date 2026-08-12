import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Code2, 
  Database, 
  Globe, 
  Flame, 
  Cpu, 
  Palette, 
  GitBranch, 
  Layers, 
  Terminal, 
  Smartphone,
  Server
} from 'lucide-react';
import type { Skill } from '../../data/portfolio';
import './ui.css';

interface SkillBadgeProps {
  skill: Skill;
  index?: number;
}

// Tech-specific vector icon & brand color mapping for 100% guaranteed rendering
const getTechIcon = (name: string) => {
  const lower = name.toLowerCase();
  if (lower.includes('javascript')) {
    return <Code2 size={20} color="#F7DF1E" />;
  }
  if (lower.includes('php')) {
    return <Server size={20} color="#777BB4" />;
  }
  if (lower.includes('react native')) {
    return <Smartphone size={20} color="#61DAFB" />;
  }
  if (lower.includes('react')) {
    return <Code2 size={20} color="#61DAFB" />;
  }
  if (lower.includes('flutter')) {
    return <Smartphone size={20} color="#02569B" />;
  }
  if (lower.includes('html')) {
    return <Globe size={20} color="#E34F26" />;
  }
  if (lower.includes('python') || lower.includes('flask')) {
    return <Terminal size={20} color="#3776AB" />;
  }
  if (lower.includes('sql') || lower.includes('mysql')) {
    return <Database size={20} color="#4479A1" />;
  }
  if (lower.includes('ai') || lower.includes('llm')) {
    return <Flame size={20} color="#4DA8DA" />;
  }
  if (lower.includes('oop')) {
    return <Layers size={20} color="#ED8B00" />;
  }
  if (lower.includes('git')) {
    return <GitBranch size={20} color="#F05032" />;
  }
  if (lower.includes('iot') || lower.includes('esp32')) {
    return <Cpu size={20} color="#00979D" />;
  }
  if (lower.includes('figma')) {
    return <Palette size={20} color="#F24E1E" />;
  }
  return <Code2 size={20} color="#4DA8DA" />;
};

export const SkillBadge: React.FC<SkillBadgeProps> = ({ skill, index = 0 }) => {
  const [imgError, setImgError] = useState(false);

  return (
    <motion.div
      className="skill-badge"
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay: index * 0.04 }}
    >
      <div className="skill-badge__header">
        <div className="skill-badge__icon-box">
          {skill.icon && !imgError ? (
            <img
              src={skill.icon}
              alt={skill.name}
              className="skill-badge__icon-img"
              onError={() => setImgError(true)}
            />
          ) : (
            getTechIcon(skill.name)
          )}
        </div>
        <span className="skill-badge__name">{skill.name}</span>
      </div>
      <div className="skill-badge__progress-track">
        <motion.div
          className="skill-badge__progress-fill"
          initial={{ width: 0 }}
          whileInView={{ width: `${skill.level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.15 + index * 0.04 }}
        />
      </div>
    </motion.div>
  );
};
