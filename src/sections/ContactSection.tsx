import { useState, type FormEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { FiSend } from 'react-icons/fi';
import { SectionHeading } from '../components/ui/SectionHeading';
import { useScrollReveal } from '../hooks/useScrollReveal';
import './ContactSection.css';

export const ContactSection = () => {
  const { t } = useTranslation('contact');
  const revealRef = useScrollReveal();

  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !company.trim() || !message.trim()) {
      setStatus('error');
      return;
    }
    
    // Construit l'URL mailto avec les informations du formulaire
    const subject = encodeURIComponent(`Contact depuis le Portfolio - ${name}`);
    const body = encodeURIComponent(`Nom: ${name}\nEntreprise: ${company}\n\nMessage:\n${message}`);
    const myEmail = "edouardlesieur21@gmail.com";
    
    // Ouvre le client mail de l'utilisateur
    window.location.href = `mailto:${myEmail}?subject=${subject}&body=${body}`;
    
    setStatus('success');
    setName('');
    setCompany('');
    setMessage('');
  };

  return (
    <section className="contact-section" id="contact" ref={revealRef}>
      <div className="container">
        <SectionHeading
          label="Contact"
          title={t('sectionTitle')}
          subtitle={t('sectionSubtitle')}
        />

        <div className="reveal">
          <form className="contact-terminal" onSubmit={handleSubmit} id="contact-form">
            <div className="contact-terminal__bar">
              <span className="contact-terminal__dot contact-terminal__dot--red" />
              <span className="contact-terminal__dot contact-terminal__dot--yellow" />
              <span className="contact-terminal__dot contact-terminal__dot--green" />
              <span className="contact-terminal__title">edouard@portfolio ~ contact</span>
            </div>

            <div className="contact-terminal__body">
              <div className="contact-terminal__line contact-terminal__line--accent">
                {t('terminalWelcome')}
              </div>
              <div className="contact-terminal__line">
                {t('terminalHelp')}
              </div>

              <div className="contact-terminal__input-row">
                <span className="contact-terminal__label">
                  <span className="contact-terminal__prompt">{'>'}</span> {t('nameLabel')}:
                </span>
                <input
                  className="contact-terminal__input"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={t('namePlaceholder')}
                  id="contact-name"
                />
              </div>

              <div className="contact-terminal__input-row">
                <span className="contact-terminal__label">
                  <span className="contact-terminal__prompt">{'>'}</span> {t('companyLabel')}:
                </span>
                <input
                  className="contact-terminal__input"
                  type="text"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder={t('companyPlaceholder')}
                  id="contact-company"
                />
              </div>

              <div className="contact-terminal__textarea-row">
                <span className="contact-terminal__label">
                  <span className="contact-terminal__prompt">{'>'}</span> {t('messageLabel')}:
                </span>
                <textarea
                  className="contact-terminal__textarea"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={t('messagePlaceholder')}
                  id="contact-message"
                />
              </div>

              <button
                className="contact-terminal__submit"
                type="submit"
                disabled={status === 'sending'}
                id="contact-submit"
              >
                <FiSend />
                {status === 'sending' ? t('sending') : `$ ${t('submit')}`}
              </button>

              {status === 'success' && (
                <div className="contact-terminal__result contact-terminal__result--success">
                  <div>{t('successStatus')}</div>
                  <div>{t('successMessage')}</div>
                </div>
              )}

              {status === 'error' && (
                <div className="contact-terminal__result contact-terminal__result--error">
                  {t('errorRequired')}
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};
