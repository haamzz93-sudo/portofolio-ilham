const fs = require('fs');
const path = require('path');

const basePath = "C:\\Users\\User\\Downloads\\portofolio ilham\\src";

const files = {
  "data/portfolio.ts": `export interface Project {
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

export interface PortfolioData {
  projects: Project[];
  skills: Skill[];
  experiences: Experience[];
  bio: string;
  tagline: string;
  stats: { label: string; value: string }[];
}

const DEFAULT_DATA: PortfolioData = {
  projects: [
    {
      id: '1',
      title: 'Web Portfolio',
      description: 'Personal portfolio built with React, TypeScript, and Framer Motion featuring a dark glassmorphism design.',
      image: '',
      tags: ['React', 'TypeScript', 'Framer Motion', 'Vanilla CSS'],
      liveUrl: '#',
      githubUrl: '#',
      featured: true,
      category: 'web'
    }
  ],
  skills: [
    { id: '1', name: 'React', category: 'frontend', level: 90 },
    { id: '2', name: 'TypeScript', category: 'frontend', level: 85 }
  ],
  experiences: [
    {
      id: '1',
      company: 'Tech Solutions Inc.',
      role: 'Frontend Developer',
      startDate: '2023',
      endDate: 'Present',
      description: 'Developed and maintained responsive web applications.'
    }
  ],
  bio: "Hello! I'm Ilham Eka Saputra, a passionate software developer.",
  tagline: "Crafting digital experiences with modern web technologies.",
  stats: [
    { label: 'Years Experience', value: '2+' },
    { label: 'Projects Completed', value: '10+' }
  ]
};

export function getPortfolioData(): PortfolioData {
  try {
    const saved = localStorage.getItem('portfolio_data');
    if (saved) {
      return { ...DEFAULT_DATA, ...JSON.parse(saved) };
    }
  } catch (e) {
    console.error('Error loading portfolio data:', e);
  }
  return DEFAULT_DATA;
}

export function savePortfolioData(data: PortfolioData): void {
  try {
    localStorage.setItem('portfolio_data', JSON.stringify(data));
  } catch (e) {
    console.error('Error saving portfolio data:', e);
  }
}
`,
  "components/ui/ui.css": `:root {
  --bg-primary: #0A0A0A;
  --bg-secondary: #141414;
  --bg-glass: rgba(20, 20, 20, 0.6);
  --text-primary: #FFFFFF;
  --text-secondary: #A0A0A0;
  --text-muted: #666666;
  --accent: #4DA8DA;
  --accent-hover: #6BC0F0;
  --accent-glow: rgba(77, 168, 218, 0.3);
  --border: #2A2A2A;
}

/* Base Styles */
body {
  background-color: var(--bg-primary);
  color: var(--text-primary);
  font-family: 'Inter', sans-serif;
  margin: 0;
  padding: 0;
}

h1, h2, h3, h4, h5, h6 {
  font-family: 'Space Grotesk', sans-serif;
}

/* Section Heading */
.section-heading { margin-bottom: 3rem; }
.section-heading--left { text-align: left; }
.section-heading--center { text-align: center; }
.section-heading__title { color: var(--text-primary); font-size: 2.5rem; margin: 0 0 0.5rem 0; font-weight: 700; }
.section-heading__subtitle { color: var(--text-secondary); font-size: 1.1rem; margin-top: 1rem; }
.section-heading__line { width: 40px; height: 3px; background-color: var(--accent); margin-top: 0.5rem; border-radius: 2px; }
.section-heading--center .section-heading__line { margin-left: auto; margin-right: auto; }

/* Project Card */
.project-card { background-color: var(--bg-secondary); border: 1px solid var(--border); border-radius: 12px; overflow: hidden; display: flex; flex-direction: column; transition: all 0.3s ease; position: relative; backdrop-filter: blur(10px); }
.project-card:hover { transform: translateY(-8px); border-color: var(--accent); box-shadow: 0 10px 30px var(--accent-glow); }
.project-card--featured { grid-column: span 2; }
.project-card__image-container { height: 200px; width: 100%; background: linear-gradient(135deg, var(--bg-secondary) 0%, var(--border) 100%); overflow: hidden; }
.project-card__image { width: 100%; height: 100%; object-fit: cover; }
.project-card__content { padding: 1.5rem; display: flex; flex-direction: column; flex-grow: 1; }
.project-card__title { font-size: 1.5rem; margin: 0 0 0.75rem 0; }
.project-card__description { color: var(--text-secondary); font-size: 0.95rem; line-height: 1.5; margin-bottom: 1.5rem; flex-grow: 1; }
.project-card__tags { display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 1.5rem; }
.project-card__tag { font-size: 0.75rem; padding: 0.25rem 0.75rem; border: 1px solid var(--accent); color: var(--accent); border-radius: 99px; background: rgba(77, 168, 218, 0.1); }
.project-card__footer { display: flex; gap: 1rem; }
.project-card__link { display: flex; align-items: center; gap: 0.5rem; color: var(--text-primary); text-decoration: none; font-size: 0.875rem; transition: color 0.2s; }
.project-card__link:hover { color: var(--accent); }

/* Spline Skeleton */
.spline-skeleton { width: 100%; height: 100%; background: var(--bg-secondary); animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite; border-radius: 12px; }
@keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: .5; } }
`,
  "components/ui/SectionHeading.tsx": `import React from 'react';
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
      className={\`section-heading section-heading--\${align}\`}
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
};`,
  "components/ui/SplineScene.tsx": `import React, { Suspense, useEffect, useState } from 'react';
import './ui.css';

const Spline = React.lazy(() => import('@splinetool/react-spline'));

interface SplineSceneProps {
  sceneUrl: string;
  className?: string;
  fallback?: React.ReactNode;
}

export const SplineScene: React.FC<SplineSceneProps> = ({ sceneUrl, className = '', fallback }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (isMobile || hasError) {
    return <div className={\`spline-wrapper \${className}\`}>{fallback}</div>;
  }

  return (
    <div className={\`spline-wrapper \${className}\`} style={{ width: '100%', height: '100%', position: 'relative' }}>
      <Suspense fallback={<div className="spline-skeleton" />}>
        <Spline 
          scene={sceneUrl} 
          onError={() => setHasError(true)}
        />
      </Suspense>
    </div>
  );
};`,
  "components/ui/ProjectCard.tsx": `import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import { Project } from '../../data/portfolio';
import './ui.css';

interface ProjectCardProps {
  project: Project;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <motion.div 
      className={\`project-card \${project.featured ? 'project-card--featured' : ''}\`}
      whileHover={{ scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      <div className="project-card__image-container">
        {project.image ? (
          <img src={project.image} alt={project.title} className="project-card__image" />
        ) : (
          <div className="project-card__image" style={{ background: 'linear-gradient(135deg, var(--bg-secondary), var(--border))' }} />
        )}
      </div>
      
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
              <ExternalLink size={16} /> Live Demo
            </a>
          )}
          {project.githubUrl && (
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="project-card__link">
              <Github size={16} /> Source Code
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};`,
  "hooks/useAdminAuth.ts": `import { useState, useEffect } from 'react';

const ADMIN_PASSWORD = 'password123';
const MAX_ATTEMPTS = 5;
const LOCKOUT_DURATION = 60000; // 1 minute

export const useAdminAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('admin_auth') === 'true';
  });
  const [attempts, setAttempts] = useState(0);
  const [lockoutUntil, setLockoutUntil] = useState<number | null>(null);
  const [lockoutTimeRemaining, setLockoutTimeRemaining] = useState(0);

  useEffect(() => {
    if (lockoutUntil) {
      const interval = setInterval(() => {
        const remaining = Math.ceil((lockoutUntil - Date.now()) / 1000);
        if (remaining <= 0) {
          setLockoutUntil(null);
          setAttempts(0);
          clearInterval(interval);
        } else {
          setLockoutTimeRemaining(remaining);
        }
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [lockoutUntil]);

  const login = (password: string) => {
    if (lockoutUntil) return false;

    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      localStorage.setItem('admin_auth', 'true');
      setAttempts(0);
      return true;
    } else {
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);
      if (newAttempts >= MAX_ATTEMPTS) {
        setLockoutUntil(Date.now() + LOCKOUT_DURATION);
      }
      return false;
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('admin_auth');
  };

  return { isAuthenticated, login, logout, isLockedOut: !!lockoutUntil, lockoutTimeRemaining };
};`,
  "components/layout/Navbar.css": `.navbar { position: fixed; top: 0; left: 0; width: 100%; z-index: 1000; transition: all 0.3s ease; padding: 1.5rem 0; background: transparent; }
.navbar.scrolled { background: var(--bg-glass); backdrop-filter: blur(12px); padding: 1rem 0; border-bottom: 1px solid var(--border); }
.navbar__container { max-width: 1200px; margin: 0 auto; padding: 0 2rem; display: flex; justify-content: space-between; align-items: center; }
.navbar__logo { font-family: 'Space Grotesk', sans-serif; font-size: 1.5rem; font-weight: 700; color: var(--text-primary); text-decoration: none; display: flex; align-items: baseline; }
.navbar__logo-dot { color: var(--accent); font-size: 2rem; line-height: 0; margin-left: 2px; }
.navbar__links { display: flex; gap: 2rem; }
.navbar__link { color: var(--text-secondary); text-decoration: none; font-size: 0.95rem; font-weight: 500; transition: color 0.2s; }
.navbar__link:hover, .navbar__link.active { color: var(--accent); }
.navbar__mobile-toggle { display: none; background: none; border: none; color: var(--text-primary); cursor: pointer; }
.navbar__mobile-drawer { position: fixed; top: 0; right: 0; height: 100vh; width: 250px; background: var(--bg-secondary); border-left: 1px solid var(--border); padding: 2rem; display: flex; flex-direction: column; gap: 2rem; transform: translateX(100%); transition: transform 0.3s ease; z-index: 1001; }
.navbar__mobile-drawer.open { transform: translateX(0); }
.navbar__mobile-close { align-self: flex-end; background: none; border: none; color: var(--text-primary); cursor: pointer; }
.navbar__mobile-links { display: flex; flex-direction: column; gap: 1.5rem; }
@media (max-width: 768px) { .navbar__links { display: none; } .navbar__mobile-toggle { display: block; } }`,
  "components/layout/Navbar.tsx": `import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import './Navbar.css';

const NAV_ITEMS = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
];

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => { setIsScrolled(window.scrollY > 50); };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) { setActiveSection(entry.target.id); }
        });
      },
      { threshold: 0.5 }
    );
    document.querySelectorAll('section[id]').forEach((section) => { observer.observe(section); });
    return () => observer.disconnect();
  }, []);

  const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMobileOpen(false);
    const target = document.querySelector(href);
    if (target) { target.scrollIntoView({ behavior: 'smooth' }); }
  };

  return (
    <>
      <nav className={\`navbar \${isScrolled ? 'scrolled' : ''}\`}>
        <div className="navbar__container">
          <a href="#home" className="navbar__logo" onClick={(e) => scrollTo(e, '#home')}>
            IES<span className="navbar__logo-dot">.</span>
          </a>
          <div className="navbar__links">
            {NAV_ITEMS.map((item) => (
              <a key={item.label} href={item.href} className={\`navbar__link \${activeSection === item.href.substring(1) ? 'active' : ''}\`} onClick={(e) => scrollTo(e, item.href)}>
                {item.label}
              </a>
            ))}
          </div>
          <button className="navbar__mobile-toggle" onClick={() => setIsMobileOpen(true)}><Menu size={24} /></button>
        </div>
      </nav>
      <div className={\`navbar__mobile-drawer \${isMobileOpen ? 'open' : ''}\`}>
        <button className="navbar__mobile-close" onClick={() => setIsMobileOpen(false)}><X size={24} /></button>
        <div className="navbar__mobile-links">
          {NAV_ITEMS.map((item) => (
            <a key={item.label} href={item.href} className={\`navbar__link \${activeSection === item.href.substring(1) ? 'active' : ''}\`} onClick={(e) => scrollTo(e, item.href)}>
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </>
  );
};`,
  "components/layout/Footer.css": `.footer { background-color: var(--bg-secondary); border-top: 1px solid var(--border); padding: 4rem 2rem 2rem; margin-top: 4rem; }
.footer__container { max-width: 1200px; margin: 0 auto; }
.footer__grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 3rem; margin-bottom: 3rem; }
.footer__brand .navbar__logo { margin-bottom: 1rem; }
.footer__tagline { color: var(--text-secondary); line-height: 1.6; }
.footer__heading { font-family: 'Space Grotesk', sans-serif; font-size: 1.2rem; color: var(--text-primary); margin-bottom: 1.5rem; }
.footer__links { display: flex; flex-direction: column; gap: 1rem; }
.footer__link { color: var(--text-secondary); text-decoration: none; transition: color 0.2s; }
.footer__link:hover { color: var(--accent); }
.footer__bottom { text-align: center; padding-top: 2rem; border-top: 1px solid var(--border); }
.footer__copyright { color: var(--text-muted); font-size: 0.9rem; cursor: default; user-select: none; }`
};

for (const [relPath, content] of Object.entries(files)) {
  const fullPath = path.join(basePath, relPath);
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  fs.writeFileSync(fullPath, content, 'utf8');
  console.log('Created:', fullPath);
}
