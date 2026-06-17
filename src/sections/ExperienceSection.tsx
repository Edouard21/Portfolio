import { useTranslation } from 'react-i18next';
import { SectionHeading } from '../components/ui/SectionHeading';
import { useScrollReveal } from '../hooks/useScrollReveal';
import './ExperienceSection.css';

export const ExperienceSection = () => {
  const { t } = useTranslation('experience');
  const revealRef = useScrollReveal();
  
  const jobs = t('jobs', { returnObjects: true }) as Array<{
    company: string;
    role: string;
    location: string;
    period: string;
    description: string;
    achievements: string[];
  }>;

  return (
    <section className="experience" id="experience" ref={revealRef}>
      <div className="container">
        <SectionHeading
          label="Experience"
          title={t('sectionTitle')}
        />

        <div className="experience__list">
          {Array.isArray(jobs) && jobs.map((job, index) => (
            <div className={`experience-card reveal reveal-delay-${index + 1}`} key={index}>
              <div className="experience-card__header">
                <div>
                  <h3 className="experience-card__role">{job.role}</h3>
                  <h4 className="experience-card__company">{job.company}</h4>
                </div>
                <div className="experience-card__meta">
                  <span className="experience-card__period">{job.period}</span>
                  <span className="experience-card__location">{job.location}</span>
                </div>
              </div>
              
              <div className="experience-card__body">
                <p className="experience-card__description">{job.description}</p>
                <ul className="experience-card__achievements">
                  {job.achievements.map((achievement, idx) => (
                    <li key={idx}>
                      <span className="achievement-bullet">{'//'}</span>
                      <span className="achievement-text">{achievement}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
