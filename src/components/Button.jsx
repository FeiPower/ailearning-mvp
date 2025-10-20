import React from 'react';
import './Button.css';

const Button = ({ 
  variant = 'primary', 
  size = 'md', 
  isLoading = false, 
  isDisabled = false,
  leftIcon,
  rightIcon,
  children,
  onClick,
  className = '',
  ...props
}) => {
  const classes = `btn btn-${variant} btn-${size} ${isDisabled || isLoading ? 'btn-disabled' : ''} ${className}`;
  
  return (
    <button 
      className={classes}
      onClick={onClick}
      disabled={isDisabled || isLoading}
      {...props}
    >
      {isLoading && <span className="btn-spinner"></span>}
      {!isLoading && leftIcon && <span className="btn-icon-left">{leftIcon}</span>}
      <span className="btn-text">{children}</span>
      {!isLoading && rightIcon && <span className="btn-icon-right">{rightIcon}</span>}
    </button>
  );
};

export default Button;

