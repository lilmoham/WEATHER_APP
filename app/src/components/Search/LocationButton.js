import React from 'react';
import './LocationButton.css';

const LocationButton = ({ onClick, isLoading, hasLocation, error }) => {
  const getButtonText = () => {
    if (isLoading) return 'Getting location...';
    if (error) return 'Try again';
    if (hasLocation) return 'Update location';
    return 'Use my location';
  };

  const getButtonIcon = () => {
    if (isLoading) return '⟳';
    if (error) return '⚠️';
    return '📍';
  };

  return (
    <button
      className={`location-button ${isLoading ? 'loading' : ''} ${error ? 'error' : ''}`}
      onClick={onClick}
      disabled={isLoading}
      title={error || 'Get current location weather'}
    >
      <span className="location-icon">{getButtonIcon()}</span>
      <span className="location-text">{getButtonText()}</span>
    </button>
  );
};

export default LocationButton;
