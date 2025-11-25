import React from 'react';
import { ApiError } from '@/types';
import './ErrorAlert.css';

interface ErrorAlertProps {
  error: ApiError | null;
  onClose?: () => void;
}

export const ErrorAlert: React.FC<ErrorAlertProps> = ({ error, onClose }) => {
  if (!error) return null;

  // Validar que error.errors sea un objeto válido antes de usar Object.entries
  const hasValidErrors = error.errors && 
    typeof error.errors === 'object' && 
    !Array.isArray(error.errors) &&
    Object.keys(error.errors).length > 0;

  return (
    <div className="error-alert" role="alert">
      <div className="error-alert-content">
        <strong>Error:</strong>
        <p>{error.message || 'Ha ocurrido un error'}</p>
        {hasValidErrors && (
          <ul className="error-list">
            {Object.entries(error.errors).map(([field, messages]) => {
              const messageArray = Array.isArray(messages) ? messages : [String(messages || '')];
              return (
                <li key={field}>
                  <strong>{field}:</strong> {messageArray.join(', ')}
                </li>
              );
            })}
          </ul>
        )}
      </div>
      {onClose && (
        <button className="error-alert-close" onClick={onClose} aria-label="Cerrar">
          ×
        </button>
      )}
    </div>
  );
};

