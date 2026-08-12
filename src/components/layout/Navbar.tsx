import React, { useState, useEffect } from 'react';
import { Menu, X, Globe, Sun, Moon } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useTheme } from '../../context/ThemeContext';
import './Navbar.css';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { lang, toggleLang, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();

  const navItems = [
    { label: t.nav.home, href: '#home' },
    { label: t.nav.about, href: '#about' },
    { label: t.nav.skills, href: '#skills' },
    { label: 'Hobbies', href: '#hobbies' },
    { label: t.nav.projects, href: '#projects' },
    { label: t.nav.experience, href: '#experience' },
    { label: t.nav.contact, href: '#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.5 }
    );
    document.querySelectorAll('section[id]').forEach((section) => {
      observer.observe(section);
    });
    return () => observer.disconnect();
  }, []);

  const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMobileOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
        <div className="navbar__container">
          <a href="#home" className="navbar__logo" onClick={(e) => scrollTo(e, '#home')}>
            IES<span className="navbar__logo-dot">.</span>
          </a>

          <div className="navbar__right">
            <div className="navbar__links">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className={`navbar__link ${activeSection === item.href.substring(1) ? 'active' : ''}`}
                  onClick={(e) => scrollTo(e, item.href)}
                >
                  {item.label}
                </a>
              ))}
            </div>

            {/* Theme Switcher */}
            <button
              className="theme-toggle-btn"
              onClick={toggleTheme}
              title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            {/* Language Switcher */}
            <button className="lang-toggle-btn" onClick={toggleLang} title="Switch Language">
              <Globe size={16} />
              <span className={lang === 'en' ? 'active-lang' : ''}>EN</span>
              <span className="lang-divider">|</span>
              <span className={lang === 'id' ? 'active-lang' : ''}>ID</span>
            </button>

            <button className="navbar__mobile-toggle" onClick={() => setIsMobileOpen(true)}>
              <Menu size={24} />
            </button>
          </div>
        </div>
      </nav>

      <div className={`navbar__mobile-drawer ${isMobileOpen ? 'open' : ''}`}>
        <button className="navbar__mobile-close" onClick={() => setIsMobileOpen(false)}>
          <X size={24} />
        </button>
        <div className="navbar__mobile-links">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`navbar__link ${activeSection === item.href.substring(1) ? 'active' : ''}`}
              onClick={(e) => scrollTo(e, item.href)}
            >
              {item.label}
            </a>
          ))}

          <div className="navbar__mobile-controls">
            <button className="theme-toggle-btn theme-toggle-btn--mobile" onClick={toggleTheme}>
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
              <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
            </button>

            <button className="lang-toggle-btn lang-toggle-btn--mobile" onClick={toggleLang}>
              <Globe size={16} />
              <span className={lang === 'en' ? 'active-lang' : ''}>English</span>
              <span className="lang-divider">|</span>
              <span className={lang === 'id' ? 'active-lang' : ''}>Bahasa Indonesia</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};