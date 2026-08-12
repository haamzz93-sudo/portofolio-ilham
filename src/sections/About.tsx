import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Download, MapPin, GraduationCap } from 'lucide-react';
import { SectionHeading } from '../components/ui/SectionHeading';
import { IdCard3D } from '../components/ui/IdCard3D';
import { useLanguage } from '../context/LanguageContext';
import { getPortfolioData, fetchPortfolioData } from '../data/portfolio';
import type { PortfolioData } from '../data/portfolio';
import './About.css';

export const About = () => {
  const { t } = useLanguage();
  const [data, setData] = useState<PortfolioData>(getPortfolioData());

  useEffect(() => {
    const updateData = async () => {
      const latest = await fetchPortfolioData();
      setData(latest);
    };
    updateData();

    window.addEventListener('portfolio_data_updated', updateData);
    return () => window.removeEventListener('portfolio_data_updated', updateData);
  }, []);

  return (
    <section id="about" className="section section--alt">
      <div className="container">
        <SectionHeading title={t.about.title} subtitle={t.about.subtitle} />

        <div className="about__grid">
          {/* 3D Interactive Flippable ID Card Column */}
          <motion.div
            className="about__photo-wrapper"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
          >
            <IdCard3D imageSrc={data.idPhotoUrl || '/id-photo.png'} />
          </motion.div>

          {/* About Text Content */}
          <motion.div
            className="about__content"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p className="about__bio">{data.bio || t.about.bio}</p>

            <div className="about__info">
              <div className="about__info-item">
                <MapPin size={18} className="text-accent" />
                <span>{t.about.location}</span>
              </div>
              <div className="about__info-item">
                <GraduationCap size={18} className="text-accent" />
                <span>{t.about.university}</span>
              </div>
            </div>

            {/* Quick Stats Highlights */}
            <div className="about__stats-row" style={{ display: 'flex', gap: '1.25rem', margin: '0.5rem 0 1rem 0' }}>
              <div className="stat-card" style={{ padding: '0.75rem 1.25rem', background: 'rgba(77,168,218,0.08)', border: '1px solid rgba(77,168,218,0.25)', borderRadius: '10px' }}>
                <span style={{ fontSize: '1.35rem', fontWeight: '800', color: 'var(--accent)', display: 'block', lineHeight: 1.2 }}>Sem 5</span>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: '600' }}>Active Student @ UNS</span>
              </div>
              <div className="stat-card" style={{ padding: '0.75rem 1.25rem', background: 'rgba(77,168,218,0.08)', border: '1px solid rgba(77,168,218,0.25)', borderRadius: '10px' }}>
                <span style={{ fontSize: '1.35rem', fontWeight: '800', color: 'var(--accent)', display: 'block', lineHeight: 1.2 }}>3+</span>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: '600' }}>Featured AI & IoT Projects</span>
              </div>
            </div>

            <a
              href={data.cvUrl || '/CV_Ilham_Eka_Saputra_V3924005.pdf'}
              target="_blank"
              rel="noopener noreferrer"
              download="CV_Ilham_Eka_Saputra_V3924005.pdf"
              className="btn btn--glass"
            >
              <Download size={18} />
              {t.about.downloadCv}
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
