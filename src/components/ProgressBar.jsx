import React from 'react';
import './ProgressBar.css';

const ProgressBar = ({ 
  value = 0,
  max = 100,
  size = 'md',
  variant = 'primary',
  showLabel = false,
  className = '',
  ...props
}) => {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
  
  return (
    <div className={`progress-container ${className}`} {...props}>
      <div className={`progress progress-${size}`}>
        <div 
          className={`progress-bar progress-${variant}`}
          style={{ width: `${percentage}%` }}
          role="progressbar"
          aria-valuenow={value}
          aria-valuemin="0"
          aria-valuemax={max}
        >
          {showLabel && <span className="progress-label">{Math.round(percentage)}%</span>}
        </div>
      </div>
      {showLabel && (
        <span className="progress-text">{Math.round(percentage)}%</span>
      )}
    </div>
  );
};

export default ProgressBar;

