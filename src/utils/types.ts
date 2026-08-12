import type { PortfolioData } from './portfolio';

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured?: boolean;
  category: 'web' | 'mobile' | 'other';
}

export interface Skill {
  id: string;
  name: string;
  category: 'frontend' | 'backend' | 'tools';
  level: number;
  icon?: string;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface PortfolioDataType {
  projects: Project[];
  skills: Skill[];
  experiences: Experience[];
  bio: string;
  tagline: string;
  stats: { label: string; value: string }[];
}
