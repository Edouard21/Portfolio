import { useTranslation } from 'react-i18next';
import { FiCode, FiArrowRight } from 'react-icons/fi';
import { Tag } from './ui/Tag';
import { Button } from './ui/Button';
import type { Project } from '../types';
import './ProjectCard.css';

interface ProjectCardProps {
  project: Project;
  onOpen: (project: Project) => void;
  index: number;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onOpen, index }) => {
  const { t } = useTranslation(['projects', 'common']);

  return (
    <article
      className={`project-card reveal reveal-delay-${(index % 4) + 1}`}
      onClick={() => onOpen(project)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onOpen(project)}
      id={`project-${project.id}`}
    >
      <div className="project-card__image">
        {project.image ? (
          <img src={project.image} alt={t(project.titleKey)} className="project-card__img" />
        ) : (
          <div className="project-card__image-placeholder">
            <FiCode className="project-card__image-icon" />
            <span>{project.category.toUpperCase()}</span>
          </div>
        )}
      </div>

      <div className="project-card__body">
        <h3 className="project-card__title">{t(project.titleKey)}</h3>
        <p className="project-card__description">{t(project.descriptionKey)}</p>

        <div className="project-card__tags">
          {project.tags.slice(0, 4).map((tag) => (
            <Tag key={tag} variant="neutral">{tag}</Tag>
          ))}
          {project.tags.length > 4 && (
            <Tag variant="neutral">+{project.tags.length - 4}</Tag>
          )}
        </div>

        <div className="project-card__footer">
          <Button variant="ghost" size="sm" icon={<FiArrowRight />}>
            {t('common:details')}
          </Button>
        </div>
      </div>
    </article>
  );
};
