import { useRef, useState } from 'react';
import { ExternalLink, Mail, MessageCircle, MapPin } from 'lucide-react';
import { AdminLoginModal } from '../ui/AdminLoginModal';
import { SOCIAL_LINKS } from '../../utils/constants';
import { useLanguage } from '../../context/LanguageContext';
import './Footer.css';

const MAPS_URL = 'https://www.google.com/maps/place/Universitas+Sebelas+Maret+Kampus+Madiun/@-7.5690101,111.6596908,14.82z/data=!4m6!3m5!1s0x2e79c7fb537600d9:0xf40ced1820291696!8m2!3d-7.5564841!4d111.6597007!16s%2Fg%2F11gf5yhj6z';
const EMBED_MAP_URL = 'https://maps.google.com/maps?q=-7.5564841,111.6597007&z=15&output=embed';

export const Footer = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const clickCount = useRef(0);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const { t } = useLanguage();

  const handleAdminTrigger = () => {
    clickCount.current += 1;

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      clickCount.current = 0;
    }, 2000);

    if (clickCount.current >= 5) {
      setIsModalOpen(true);
      clickCount.current = 0;
    }
  };

  return (
    <footer className="footer">
      <div className="footer__container container">
        {/* Main Footer Grid */}
        <div className="footer__grid">
          {/* Brand Info */}
          <div className="footer__brand">
            <a href="#home" className="footer__logo">
              IES<span className="footer__logo-dot">.</span>
            </a>
            <p className="footer__tagline">{t.footer.tagline}</p>

            <div className="footer__social-section">
              <h4 className="footer__heading" style={{ marginBottom: '0.75rem' }}>{t.footer.connect}</h4>
              <div className="footer__social-links">
                <a href={SOCIAL_LINKS.github} target="_blank" rel="noopener noreferrer" className="footer__social-link" aria-label="GitHub">
                  <ExternalLink size={20} />
                </a>
                <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noopener noreferrer" className="footer__social-link" aria-label="LinkedIn">
                  <MessageCircle size={20} />
                </a>
                <a href={SOCIAL_LINKS.email} className="footer__social-link" aria-label="Email">
                  <Mail size={20} />
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="footer__heading">{t.footer.quickLinks}</h4>
            <div className="footer__links">
              <a href="#home" className="footer__link">{t.nav.home}</a>
              <a href="#about" className="footer__link">{t.nav.about}</a>
              <a href="#skills" className="footer__link">{t.nav.skills}</a>
              <a href="#projects" className="footer__link">{t.nav.projects}</a>
              <a href="#experience" className="footer__link">{t.nav.experience}</a>
              <a href="#contact" className="footer__link">{t.nav.contact}</a>
            </div>
          </div>

          {/* Embedded Campus Map Widget */}
          <div className="footer__map-column">
            <h4 className="footer__heading">
              <MapPin size={16} className="text-accent" style={{ display: 'inline', marginRight: '6px' }} />
              {t.footer.campusTitle}
            </h4>

            <div className="footer__map-card glass">
              <div className="footer__map-iframe-container">
                <iframe
                  title="Universitas Sebelas Maret Kampus Madiun Map"
                  src={EMBED_MAP_URL}
                  width="100%"
                  height="160"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="footer__map-iframe"
                />
              </div>

              <div className="footer__map-info">
                <p className="footer__map-name">{t.footer.campusName}</p>
                <p className="footer__map-address">{t.footer.campusAddress}</p>
                <a
                  href={MAPS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer__map-btn"
                >
                  <ExternalLink size={14} />
                  {t.footer.openMaps}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="footer__bottom">
          <p className="footer__copyright" onClick={handleAdminTrigger}>
            © {new Date().getFullYear()} Ilham Eka Saputra. {t.footer.rights}
          </p>
        </div>
      </div>

      <AdminLoginModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </footer>
  );
};
