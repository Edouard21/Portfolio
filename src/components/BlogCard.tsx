import { useTranslation } from 'react-i18next';
import { Tag } from './ui/Tag';
import type { BlogPost } from '../types';
import './BlogCard.css';

interface BlogCardProps {
  post: BlogPost;
  index: number;
}

export const BlogCard: React.FC<BlogCardProps> = ({ post, index }) => {
  const { t, i18n } = useTranslation('blog');
  const lang = i18n.language?.substring(0, 2) || 'fr';

  const formattedDate = new Date(post.date).toLocaleDateString(
    lang === 'fr' ? 'fr-FR' : 'en-US',
    { year: 'numeric', month: 'short', day: 'numeric' }
  );

  return (
    <article className={`blog-card reveal reveal-delay-${(index % 4) + 1}`} id={`blog-${post.id}`}>
      <span className="blog-card__date">{formattedDate}</span>

      <div className="blog-card__content">
        <h3 className="blog-card__title">{t(post.titleKey)}</h3>
        <p className="blog-card__excerpt">{t(post.excerptKey)}</p>

        <div className="blog-card__meta">
          <span className="blog-card__reading-time">{post.readingTime} min read</span>
          <div className="blog-card__tags">
            {post.tags.map((tag) => (
              <Tag key={tag} variant="neutral">{tag}</Tag>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
};
