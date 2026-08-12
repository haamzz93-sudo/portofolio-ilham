import { motion } from 'framer-motion';
import { ChevronDown, Mail, ExternalLink, Code2 } from 'lucide-react';
import { FloatingPathsBackground } from '../components/ui/floating-paths';
import { InteractiveHoverButton } from '../components/ui/interactive-hover-button';
import { LiquidButton } from '../components/ui/liquid-glass-button';
import { SOCIAL_LINKS } from '../utils/constants';
import { useLanguage } from '../context/LanguageContext';
import './Hero.css';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: 'spring' as const, stiffness: 80, damping: 20 },
  },
};

export const Hero = () => {
  const { t } = useLanguage();

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="hero hero--dev-x">
      {/* Animated Moving Vectors Background Layer */}
      <FloatingPathsBackground position={1} />

      {/* Subtle Ambient Gradient Overlay Layer */}
      <div className="hero__overlay" />

      {/* Foreground Hero Content Layer */}
      <motion.div
        className="hero__devx-container"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Left Column: Heading & Primary Action */}
        <motion.div className="hero__left" variants={itemVariants}>
          <div className="hero__accent-bar" />
          <h1 className="hero__main-title">
            I'm <span className="hero__title--accent">Ilham</span>, a
            <br />
            <span className="hero__title--gradient">Web Developer</span>
          </h1>
          <p className="hero__description">{t.hero.taglineText}</p>

          <div className="flex flex-wrap items-center gap-4 mt-6">
            <InteractiveHoverButton
              text={t.hero.viewWork}
              onClick={() => scrollTo('projects')}
            />
            <LiquidButton onClick={() => scrollTo('contact')}>
              {t.hero.getInTouch}
            </LiquidButton>
          </div>
        </motion.div>

        {/* Center Column: User's Character Avatar Illustration */}
        <div className="hero__center-portrait-wrapper">
          <motion.div
            className="hero__center-portrait"
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <img
              src="/character.png"
              alt="Ilham Eka Saputra Avatar Character"
              className="hero__portrait-img"
            />
            <div className="hero__portrait-glow" />
          </motion.div>
        </div>

        {/* Right Column: About, My Work, Social Links */}
        <motion.div className="hero__right" variants={itemVariants}>
          {/* About Me Block */}
          <div className="hero__info-block">
            <h2 className="hero__info-heading">{t.hero.aboutHeading}</h2>
            <p className="hero__info-text">{t.hero.aboutSummary}</p>
            <button className="hero__info-link" onClick={() => scrollTo('about')}>
              {t.hero.learnMore}
            </button>
          </div>

          <div className="hero__divider" />

          {/* My Work Block */}
          <div className="hero__info-block">
            <h2 className="hero__info-heading">{t.hero.workHeading}</h2>
            <p className="hero__info-text">{t.hero.workSummary}</p>
            <button className="hero__info-link" onClick={() => scrollTo('projects')}>
              {t.hero.browsePortfolio}
            </button>
          </div>

          <div className="hero__divider" />

          {/* Social Links Row */}
          <div className="hero__social-block">
            <h2 className="hero__info-heading">{t.hero.followMe}</h2>
            <div className="hero__social-icons">
              <a
                href={SOCIAL_LINKS.github}
                target="_blank"
                rel="noopener noreferrer"
                className="hero__social-icon"
                aria-label="GitHub"
              >
                <Code2 size={18} />
              </a>
              <a
                href={SOCIAL_LINKS.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="hero__social-icon"
                aria-label="LinkedIn"
              >
                <ExternalLink size={18} />
              </a>
              <a href={SOCIAL_LINKS.email} className="hero__social-icon" aria-label="Email">
                <Mail size={18} />
              </a>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Bouncing Scroll Down Indicator (Centered at Bottom) */}
      <div className="hero__scroll-wrapper relative z-10">
        <motion.div
          className="hero__scroll-indicator"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 12, 0] }}
          transition={{ delay: 2.2, duration: 2, repeat: Infinity }}
          onClick={() => scrollTo('about')}
        >
          <span>{t.hero.scrollDown}</span>
          <ChevronDown size={20} />
        </motion.div>
      </div>
    </section>
  );
};
