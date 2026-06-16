import type { BlogPost } from '../types';

export const blogPosts: BlogPost[] = [
  {
    id: 'optimize-classification',
    titleKey: 'blog:post1.title',
    excerptKey: 'blog:post1.excerpt',
    date: '2025-03-15',
    readingTime: 8,
    tags: ['NLP', 'Optimization', 'PyTorch'],
  },
  {
    id: 'data-pipeline',
    titleKey: 'blog:post2.title',
    excerptKey: 'blog:post2.excerpt',
    date: '2025-01-22',
    readingTime: 12,
    tags: ['Data Engineering', 'Airflow', 'Architecture'],
  },
  {
    id: 'llms-production',
    titleKey: 'blog:post3.title',
    excerptKey: 'blog:post3.excerpt',
    date: '2024-11-08',
    readingTime: 10,
    tags: ['LLM', 'RAG', 'Production'],
  },
  {
    id: 'notebook-to-prod',
    titleKey: 'blog:post4.title',
    excerptKey: 'blog:post4.excerpt',
    date: '2024-09-14',
    readingTime: 7,
    tags: ['MLOps', 'CI/CD', 'Best Practices'],
  },
];
