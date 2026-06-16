import { useTranslation } from 'react-i18next';
import './LanguageSwitch.css';

export const LanguageSwitch = () => {
  const { i18n } = useTranslation();
  const currentLang = i18n.language?.substring(0, 2) || 'fr';

  const switchLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  return (
    <div className="lang-switch" role="group" aria-label="Language selector">
      <button
        className={`lang-switch__btn ${currentLang === 'fr' ? 'lang-switch__btn--active' : ''}`}
        onClick={() => switchLanguage('fr')}
        aria-pressed={currentLang === 'fr'}
      >
        FR
      </button>
      <button
        className={`lang-switch__btn ${currentLang === 'en' ? 'lang-switch__btn--active' : ''}`}
        onClick={() => switchLanguage('en')}
        aria-pressed={currentLang === 'en'}
      >
        EN
      </button>
    </div>
  );
};
