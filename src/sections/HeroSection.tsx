import { useTranslation } from 'react-i18next';
import { FiArrowRight } from 'react-icons/fi';
import { ParticleBackground } from '../components/ParticleBackground';
import { Button } from '../components/ui/Button';
import { useTypewriter } from '../hooks/useTypewriter';
import './HeroSection.css';

export const HeroSection = () => {
  const { t } = useTranslation(['hero', 'common']);
  const words = t('hero:typing', { returnObjects: true }) as string[];
  const displayText = useTypewriter(Array.isArray(words) ? words : []);

  return (
    <section className="hero" id="hero">
      <ParticleBackground />
      <div className="hero__content">
        <div className="hero__badge">
          <span className="hero__badge-dot" />
          Ingénieur IA & Data
        </div>

        <h1 className="hero__title">
          <span className="hero__title-gradient">{t('hero:title')}</span>
        </h1>

        <span className="hero__typewriter">
          {'> '}{displayText}
          <span className="hero__typewriter-cursor" />
        </span>

        <p className="hero__subtitle">{t('hero:subtitle')}</p>

        <div className="hero__cta">
          <Button variant="primary" size="lg" icon={<FiArrowRight />} onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}>
            {t('common:viewProjects')}
          </Button>
          <Button variant="secondary" size="lg" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
            {t('common:contactMe')}
          </Button>
        </div>
      </div>

      <a href="#projects" className="hero__scroll" aria-label={t('common:scrollDown')}>
        <span>scroll</span>
        <span className="hero__scroll-line" />
      </a>
    </section>
  );
};
