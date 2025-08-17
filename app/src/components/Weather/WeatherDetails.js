import React from 'react';
import { formatTime } from '../../utils/dateHelpers';
import Card from '../UI/Card';
import './WeatherDetails.css';

const WeatherDetails = ({ weatherData, units = 'metric' }) => {
  if (!weatherData) return null;

  const {
    humidity,
    pressure,
    visibility,
    wind,
    clouds,
    datetime
  } = weatherData;

  const getWindDirection = (degrees) => {
    const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE',
                       'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
    const index = Math.round(degrees / 22.5) % 16;
    return directions[index];
  };

  const getPressureStatus = (pressure) => {
    if (pressure < 1000) return { status: 'Low', color: '#ef4444' };
    if (pressure > 1020) return { status: 'High', color: '#10b981' };
    return { status: 'Normal', color: '#f59e0b' };
  };

  const getHumidityStatus = (humidity) => {
    if (humidity < 30) return { status: 'Low', color: '#ef4444' };
    if (humidity > 70) return { status: 'High', color: '#3b82f6' };
    return { status: 'Comfortable', color: '#10b981' };
  };

  const getVisibilityStatus = (visibility) => {
    const visibilityKm = visibility / 1000;
    if (visibilityKm < 1) return { status: 'Poor', color: '#ef4444' };
    if (visibilityKm < 5) return { status: 'Moderate', color: '#f59e0b' };
    return { status: 'Good', color: '#10b981' };
  };

  const details = [
    {
      id: 'humidity',
      icon: '💧',
      label: 'Humidity',
      value: `${humidity}%`,
      status: getHumidityStatus(humidity),
      description: 'Relative humidity level'
    },
    {
      id: 'pressure',
      icon: '📊',
      label: 'Pressure',
      value: `${pressure} hPa`,
      status: getPressureStatus(pressure),
      description: 'Atmospheric pressure'
    },
    {
      id: 'wind',
      icon: '💨',
      label: 'Wind',
      value: `${Math.round(wind.speed)} ${units === 'metric' ? 'm/s' : 'mph'}`,
      subtitle: wind.direction ? `${getWindDirection(wind.direction)} (${wind.direction}°)` : '',
      description: `Wind speed${wind.gust ? ` with gusts up to ${Math.round(wind.gust)} ${units === 'metric' ? 'm/s' : 'mph'}` : ''}`
    },
    {
      id: 'visibility',
      icon: '👁️',
      label: 'Visibility',
      value: `${Math.round(visibility / 1000)} km`,
      status: getVisibilityStatus(visibility),
      description: 'Visibility distance'
    },
    {
      id: 'clouds',
      icon: '☁️',
      label: 'Cloudiness',
      value: `${clouds}%`,
      description: 'Cloud coverage percentage'
    },
    {
      id: 'sunrise',
      icon: '🌅',
      label: 'Sunrise',
      value: formatTime(datetime.sunrise, datetime.timezone),
      description: 'Time of sunrise'
    },
    {
      id: 'sunset',
      icon: '🌇',
      label: 'Sunset',
      value: formatTime(datetime.sunset, datetime.timezone),
      description: 'Time of sunset'
    }
  ];

  return (
    <div className="weather-details-container">
      <div className="details-header">
        <h3>Weather Details</h3>
        <p>Current conditions and atmospheric data</p>
      </div>
      
      <div className="details-grid">
        {details.map((detail) => (
          <Card key={detail.id} className="detail-card" variant="secondary">
            <div className="detail-content">
              <div className="detail-header">
                <span className="detail-icon">{detail.icon}</span>
                <div className="detail-info">
                  <span className="detail-label">{detail.label}</span>
                  {detail.status && (
                    <span 
                      className="detail-status"
                      style={{ color: detail.status.color }}
                    >
                      {detail.status.status}
                    </span>
                  )}
                </div>
              </div>
              
              <div className="detail-value-section">
                <span className="detail-value">{detail.value}</span>
                {detail.subtitle && (
                  <span className="detail-subtitle">{detail.subtitle}</span>
                )}
              </div>
              
              <p className="detail-description">{detail.description}</p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default WeatherDetails;
