import { SectionHeading } from '../components/ui/SectionHeading';
import { TimelineItem } from '../components/ui/TimelineItem';
import { getPortfolioData } from '../data/portfolio';
import { useLanguage } from '../context/LanguageContext';
import './Experience.css';

export const Experience = () => {
  const data = getPortfolioData();
  const { t } = useLanguage();

  return (
    <section id="experience" className="section">
      <div className="container container--narrow">
        <SectionHeading title={t.experience.title} subtitle={t.experience.subtitle} />

        <div className="timeline">
          <div className="timeline__line" />
          {data.experiences.map((exp, index) => (
            <TimelineItem
              key={exp.id}
              experience={exp}
              index={index}
              isLeft={index % 2 === 0}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
