export interface Project {
  id: string;
  titleKey: string;
  descriptionKey: string;
  category: ProjectCategory;
  tags: string[];
  image: string;
  problemKey: string;
  solutionKey: string;
  codeSnippet?: string;
  codeLanguage?: string;
  githubUrl?: string;
  liveUrl?: string;
  demoType?: 'nlp' | 'vision' | 'dashboard' | 'none';
}

export type ProjectCategory = 'all' | 'nlp' | 'cv' | 'dataviz' | 'mlops';

export interface BlogPost {
  id: string;
  titleKey: string;
  excerptKey: string;
  date: string;
  readingTime: number;
  tags: string[];
  contentKey?: string;
}

export interface SkillCategory {
  id: string;
  titleKey: string;
  icon: string;
  skills: string[];
}

export interface ChatMessage {
  id: string;
  type: 'user' | 'bot';
  text: string;
  timestamp: Date;
}

export interface NavLink {
  labelKey: string;
  href: string;
}
