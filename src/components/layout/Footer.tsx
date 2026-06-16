import { useTranslation } from 'react-i18next';
import { FiGithub, FiLinkedin } from 'react-icons/fi';
import { SiKaggle, SiHuggingface } from 'react-icons/si';
import './Footer.css';

export const Footer = () => {
  const { t } = useTranslation('common');
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container footer__inner">
        <p className="footer__text">
          {t('builtWith')} — <span>{year}</span>. {t('allRights')}.
        </p>

        <div className="footer__links">
          <a href="https://github.com/Edouard21" target="_blank" rel="noopener noreferrer" className="footer__link" aria-label="GitHub">
            <FiGithub />
          </a>
          <a href="https://www.linkedin.com/in/edouard-lesieur-2ab109236/" target="_blank" rel="noopener noreferrer" className="footer__link" aria-label="LinkedIn">
            <FiLinkedin />
          </a>
          <a href="https://kaggle.com" target="_blank" rel="noopener noreferrer" className="footer__link" aria-label="Kaggle">
            <SiKaggle />
          </a>
          <a href="https://huggingface.co/Edouard77" target="_blank" rel="noopener noreferrer" className="footer__link" aria-label="Hugging Face">
            <SiHuggingface />
          </a>
        </div>
      </div>
    </footer>
  );
};
