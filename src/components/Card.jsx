import React from 'react';
import './Card.css';

const Card = ({ 
  variant = 'default', 
  padding = 'md',
  hover = false,
  children,
  className = '',
  ...props
}) => {
  const classes = `card card-${variant} card-padding-${padding} ${hover ? 'card-hover' : ''} ${className}`;
  
  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
};

export const CardHeader = ({ children, className = '' }) => (
  <div className={`card-header ${className}`}>{children}</div>
);

export const CardBody = ({ children, className = '' }) => (
  <div className={`card-body ${className}`}>{children}</div>
);

export const CardFooter = ({ children, className = '' }) => (
  <div className={`card-footer ${className}`}>{children}</div>
);

export default Card;

