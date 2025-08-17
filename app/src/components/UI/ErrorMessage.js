import React from 'react';
import './ErrorMessage.css';

const ErrorMessage = ({ error, onRetry, onDismiss }) => {
  if (!error) return null;

  const handleDismiss = () => {
    if (onDismiss) {
      try {
        onDismiss();
      } catch (err) {
        console.error('Error dismissing error message:', err);
      }
    }
  };

  const handleRetry = () => {
    if (onRetry) {
      try {
        onRetry();
      } catch (err) {
        console.error('Error retrying operation:', err);
      }
    }
  };

  return (
    <div className="error-message">
      <div className="error-icon">⚠️</div>
      <div className="error-content">
        <h3 className="error-title">Something went wrong</h3>
        <p className="error-text">{error}</p>
        <div className="error-actions">
          {onRetry && (
            <button className="error-button retry" onClick={handleRetry}>
              Try Again
            </button>
          )}
          <button className="error-button dismiss" onClick={handleDismiss}>
            Dismiss
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorMessage;
