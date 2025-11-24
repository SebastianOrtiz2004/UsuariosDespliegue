import React, { useEffect } from 'react';
import './SuccessAlert.css';

interface SuccessAlertProps {
  message: string;
  onClose?: () => void;
  autoClose?: number;
}

export const SuccessAlert: React.FC<SuccessAlertProps> = ({ 
  message, 
  onClose, 
  autoClose = 3000 
}) => {
  useEffect(() => {
    if (autoClose && onClose) {
      const timer = setTimeout(onClose, autoClose);
      return () => clearTimeout(timer);
    }
  }, [autoClose, onClose]);

  return (
    <div className="success-alert" role="alert">
      <div className="success-alert-content">
        <strong>✓</strong>
        <p>{message}</p>
      </div>
      {onClose && (
        <button className="success-alert-close" onClick={onClose} aria-label="Cerrar">
          ×
        </button>
      )}
    </div>
  );
};

