import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { FiDownload } from 'react-icons/fi';
import { Button } from '../ui/Button';
import { LanguageSwitch } from '../LanguageSwitch';
import './Header.css';

export const Header = () => {
  const { t } = useTranslation('common');
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: t('nav.projects'), href: '#projects' },
    { label: t('nav.experience'), href: '#experience' },
    { label: t('nav.about'), href: '#about' },
    { label: t('nav.contact'), href: '#contact' },
  ];

  const handleNavClick = () => setMobileOpen(false);

  return (
    <header className={`header ${scrolled ? 'header--scrolled' : ''}`} id="header">
      <div className="header__inner">
        <a href="#" className="header__logo">
          E. Lesieur <span>|</span> AI & Data Engineer
        </a>

        <nav className="header__nav">
          <div className="header__links">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className="header__link">
                {link.label}
              </a>
            ))}
          </div>

          <div className="header__actions">
            <LanguageSwitch />
            <Button
              variant="secondary"
              size="sm"
              icon={<FiDownload />}
              href="/cv-edouard-lesieur.pdf"
              download="CV-Edouard-Lesieur.pdf"
            >
              {t('downloadCV')}
            </Button>
            <button
              className={`header__mobile-toggle ${mobileOpen ? 'header__mobile-toggle--open' : ''}`}
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile overlay */}
      <div className={`header__mobile-nav ${mobileOpen ? 'header__mobile-nav--open' : ''}`}>
        {navLinks.map((link) => (
          <a key={link.href} href={link.href} className="header__link" onClick={handleNavClick}>
            {link.label}
          </a>
        ))}
        <Button
          variant="secondary"
          icon={<FiDownload />}
          href="/cv-edouard-lesieur.pdf"
          download="CV-Edouard-Lesieur.pdf"
        >
          {t('downloadCV')}
        </Button>
      </div>
    </header>
  );
};
