import React from 'react';
import './Tag.css';

interface TagProps {
  children: React.ReactNode;
  variant?: 'accent' | 'neutral';
  className?: string;
}

export const Tag: React.FC<TagProps> = ({ children, variant = 'accent', className = '' }) => {
  return (
    <span className={`tag ${variant === 'neutral' ? 'tag-neutral' : ''} ${className}`}>
      {children}
    </span>
  );
};
