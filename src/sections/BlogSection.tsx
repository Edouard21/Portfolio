import { useTranslation } from 'react-i18next';
import { SectionHeading } from '../components/ui/SectionHeading';
import { BlogCard } from '../components/BlogCard';
import { blogPosts } from '../data/blogPosts';
import { useScrollReveal } from '../hooks/useScrollReveal';
import './BlogSection.css';

export const BlogSection = () => {
  const { t } = useTranslation('blog');
  const revealRef = useScrollReveal();

  return (
    <section className="blog-section" id="blog" ref={revealRef}>
      <div className="container">
        <SectionHeading
          label="Blog"
          title={t('sectionTitle')}
          subtitle={t('sectionSubtitle')}
        />

        <div className="blog-section__list">
          {blogPosts.map((post, index) => (
            <BlogCard key={post.id} post={post} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};
