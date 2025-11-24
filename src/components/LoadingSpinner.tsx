import React from 'react';
import './LoadingSpinner.css';

interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large';
  fullScreen?: boolean;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'medium', 
  fullScreen = false 
}) => {
  const spinnerClass = `spinner spinner-${size}`;
  const containerClass = fullScreen ? 'spinner-fullscreen' : 'spinner-container';

  return (
    <div className={containerClass}>
      <div className={spinnerClass}></div>
    </div>
  );
};

