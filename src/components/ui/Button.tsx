import React from 'react';
import './Button.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  href?: string;
  download?: boolean | string;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  href,
  download,
  className = '',
  ...props
}) => {
  const classes = `btn btn-${variant} ${size !== 'md' ? `btn-${size}` : ''} ${className}`.trim();

  if (href) {
    return (
      <a
        href={href}
        className={classes}
        download={download}
        target={download ? undefined : '_blank'}
        rel={download ? undefined : 'noopener noreferrer'}
      >
        {icon && <span className="btn-icon">{icon}</span>}
        {children}
      </a>
    );
  }

  return (
    <button className={classes} {...props}>
      {icon && <span className="btn-icon">{icon}</span>}
      {children}
    </button>
  );
};
