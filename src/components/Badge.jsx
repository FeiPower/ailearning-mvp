import React from 'react';
import './Badge.css';

const Badge = ({ 
  variant = 'default',
  size = 'md',
  children,
  className = '',
  ...props
}) => {
  const classes = `badge badge-${variant} badge-${size} ${className}`;
  
  return (
    <span className={classes} {...props}>
      {children}
    </span>
  );
};

export default Badge;

