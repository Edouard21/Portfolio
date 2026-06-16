import { useTranslation } from 'react-i18next';
import { SectionHeading } from '../components/ui/SectionHeading';
import { Tag } from '../components/ui/Tag';
import { useScrollReveal } from '../hooks/useScrollReveal';
import './AboutSection.css';

const SKILL_KEYS = ['ai', 'data', 'dev', 'cloud'] as const;

export const AboutSection = () => {
  const { t } = useTranslation('about');
  const revealRef = useScrollReveal();

  return (
    <section className="about" id="about" ref={revealRef}>
      <div className="container">
        <SectionHeading
          label="About"
          title={t('sectionTitle')}
        />

        <div className="about__grid">
          <div className="reveal">
            <p className="about__bio">{t('bio')}</p>
          </div>

          <div className="about__skills reveal reveal-delay-2">
            <span className="about__skills-title">{'// '}{t('skillsTitle')}</span>

            {SKILL_KEYS.map((key) => {
              const items = t(`skills.${key}.items`, { returnObjects: true }) as string[];
              return (
                <div className="skill-category" key={key}>
                  <h3 className="skill-category__title">
                    {t(`skills.${key}.title`)}
                  </h3>
                  <div className="skill-category__tags">
                    {Array.isArray(items) && items.map((skill) => (
                      <Tag key={skill}>{skill}</Tag>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
