import React from 'react';
import './SectionHeading.css';

interface SectionHeadingProps {
  label: string;
  title: string;
  subtitle?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({ label, title, subtitle }) => {
  return (
    <div className="section-heading reveal">
      <span className="section-heading__label">{label}</span>
      <h2 className="section-heading__title">{title}</h2>
      {subtitle && <p className="section-heading__subtitle">{subtitle}</p>}
    </div>
  );
};
