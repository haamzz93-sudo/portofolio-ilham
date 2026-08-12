import { motion } from 'framer-motion';
import { Download, MapPin, GraduationCap } from 'lucide-react';
import { SectionHeading } from '../components/ui/SectionHeading';
import { IdCard3D } from '../components/ui/IdCard3D';
import { useLanguage } from '../context/LanguageContext';
import './About.css';

export const About = () => {
  const { t } = useLanguage();

  const stats = [
    { label: t.about.stats.experience, value: '3.68' },
    { label: t.about.stats.projects, value: '10+' },
    { label: t.about.stats.university, value: 'UNS' },
  ];

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
            <IdCard3D imageSrc="/character.png" />
          </motion.div>

          {/* About Text Content */}
          <motion.div
            className="about__content"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p className="about__bio">{t.about.bio}</p>

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

            <a href="/cv-ilham-eka-saputra.txt" download="CV_Ilham_Eka_Saputra.txt" className="btn btn--glass">
              <Download size={18} />
              {t.about.downloadCv}
            </a>
          </motion.div>
        </div>

        {/* Stats Section */}
        <motion.div
          className="about__stats"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {stats.map((stat, i) => (
            <div key={i} className="about__stat-card glass">
              <div className="about__stat-value">{stat.value}</div>
              <div className="about__stat-label">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
