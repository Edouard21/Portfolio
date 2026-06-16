import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FiX, FiGithub, FiExternalLink } from 'react-icons/fi';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Tag } from './ui/Tag';
import { Button } from './ui/Button';
import type { Project } from '../types';
import './ProjectModal.css';

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  const { t } = useTranslation(['projects', 'common']);
  const [isImageZoomed, setIsImageZoomed] = useState(false);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEsc);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
        <div className="modal__header">
          <h2 className="modal__title" id="modal-title">{t(project.titleKey)}</h2>
          <button className="modal__close" onClick={onClose} aria-label={t('common:close')}>
            <FiX />
          </button>
        </div>

        <div className="modal__body">
          <div className="modal__section">
            <h3 className="modal__section-title">{'// '}{t('common:problem')}</h3>
            <p className="modal__section-text">{t(project.problemKey)}</p>
          </div>

          <div className="modal__section">
            <h3 className="modal__section-title">{'// '}{t('common:solution')}</h3>
            <p className="modal__section-text">{t(project.solutionKey)}</p>
          </div>

          <div className="modal__tags">
            {project.tags.map((tag) => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </div>

          <div className="modal__actions">
            {project.githubUrl && (
              <Button variant="secondary" size="sm" icon={<FiGithub />} href={project.githubUrl}>
                {t('common:sourceCode')}
              </Button>
            )}
            {project.liveUrl && (
              <Button variant="primary" size="sm" icon={<FiExternalLink />} href={project.liveUrl}>
                {t('common:liveDemo')}
              </Button>
            )}
          </div>

          {(project.image || project.codeSnippet) && (
            <div className="modal__section">
              <h3 className="modal__section-title">
                {'// '}{project.image ? t('common:preview', 'Preview') : 'Code'}
              </h3>

              {project.image ? (
                <>
                  <div className="modal__image-container" onClick={() => setIsImageZoomed(true)}>
                    <img src={project.image} alt={t(project.titleKey)} className="modal__image" />
                  </div>
                  {isImageZoomed && (
                    <div className="modal__image-zoomed-overlay" onClick={() => setIsImageZoomed(false)}>
                      <img src={project.image} alt={t(project.titleKey)} className="modal__image-zoomed" />
                    </div>
                  )}
                </>
              ) : (
                <div className="modal__code">
                  <div className="modal__code-header">
                    <span className="modal__code-dot modal__code-dot--red" />
                    <span className="modal__code-dot modal__code-dot--yellow" />
                    <span className="modal__code-dot modal__code-dot--green" />
                  </div>
                  <SyntaxHighlighter
                    language={project.codeLanguage || 'python'}
                    style={vscDarkPlus}
                    showLineNumbers
                    wrapLines
                  >
                    {project.codeSnippet || ''}
                  </SyntaxHighlighter>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
