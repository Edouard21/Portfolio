import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { SectionHeading } from '../components/ui/SectionHeading';
import { ProjectCard } from '../components/ProjectCard';
import { ProjectModal } from '../components/ProjectModal';
import { projects } from '../data/projects';
import { useScrollReveal } from '../hooks/useScrollReveal';
import type { Project, ProjectCategory } from '../types';
import './ProjectsSection.css';

const FILTERS: { key: string; value: ProjectCategory }[] = [
  { key: 'filterAll', value: 'all' },
  { key: 'filterNLP', value: 'nlp' },
  { key: 'filterCV', value: 'cv' },
  { key: 'filterDataViz', value: 'dataviz' },
  { key: 'filterMLOps', value: 'mlops' },
];

export const ProjectsSection = () => {
  const { t } = useTranslation(['projects', 'common']);
  const [activeFilter, setActiveFilter] = useState<ProjectCategory>('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const revealRef = useScrollReveal([activeFilter]);

  const filteredProjects = activeFilter === 'all'
    ? projects
    : projects.filter((p) => p.category === activeFilter);

  return (
    <section className="projects" id="projects" ref={revealRef}>
      <div className="container">
        <SectionHeading
          label="Projects"
          title={t('projects:sectionTitle')}
          subtitle={t('projects:sectionSubtitle')}
        />

        <div className="projects__filters reveal">
          {FILTERS.map((filter) => (
            <button
              key={filter.value}
              className={`projects__filter-btn ${activeFilter === filter.value ? 'projects__filter-btn--active' : ''}`}
              onClick={() => setActiveFilter(filter.value)}
            >
              {t(`common:${filter.key}`)}
            </button>
          ))}
        </div>

        <div className="projects__grid">
          {filteredProjects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              onOpen={setSelectedProject}
              index={index}
            />
          ))}
        </div>

        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </div>
    </section>
  );
};
