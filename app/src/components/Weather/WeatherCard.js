import React from 'react';
import { WEATHER_ICONS } from '../../constants/weatherIcons';
import { formatTemperature } from '../../utils/temperatureConverter';
import { formatTime, getDayOfWeek } from '../../utils/dateHelpers';
import Card from '../UI/Card';
import './WeatherCard.css';

const WeatherCard = ({ 
  weatherData, 
  units = 'metric', 
  showDetails = true,
  variant = 'current',
  className = ''
}) => {
  const {
    weather,
    temperature,
    datetime,
    humidity,
    wind,
    pressure,
    city,
    country
  } = weatherData;

  const renderCurrentWeather = () => (
    <div className="current-weather-content">
      <div className="weather-header">
        <div className="location-info">
          <h1 className="location-name">{city}, {country}</h1>
          <p className="weather-description">{weather.description}</p>
        </div>
        <div className="weather-icon-large">
          {WEATHER_ICONS[weather.icon] || '☀️'}
        </div>
      </div>
      
      <div className="temperature-section">
        <div className="main-temperature">
          {formatTemperature(temperature.current, units, false)}
          <span className="temp-unit">°{units === 'metric' ? 'C' : 'F'}</span>
        </div>
        <div className="temperature-details">
          <span className="feels-like">
            Feels like {formatTemperature(temperature.feelsLike, units)}
          </span>
          <span className="temp-range">
            {formatTemperature(temperature.min, units)} / {formatTemperature(temperature.max, units)}
          </span>
        </div>
      </div>

      {showDetails && (
        <div className="weather-metrics">
          <div className="metric-item">
            <span className="metric-icon">💧</span>
            <div className="metric-info">
              <span className="metric-label">Humidity</span>
              <span className="metric-value">{humidity}%</span>
            </div>
          </div>
          <div className="metric-item">
            <span className="metric-icon">💨</span>
            <div className="metric-info">
              <span className="metric-label">Wind</span>
              <span className="metric-value">
                {Math.round(wind.speed)} {units === 'metric' ? 'm/s' : 'mph'}
              </span>
            </div>
          </div>
          <div className="metric-item">
            <span className="metric-icon">📊</span>
            <div className="metric-info">
              <span className="metric-label">Pressure</span>
              <span className="metric-value">{pressure} hPa</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const renderForecastItem = () => (
    <div className="forecast-weather-content">
      <div className="forecast-time">
        <span className="day">{getDayOfWeek(datetime.current)}</span>
        <span className="time">{formatTime(datetime.current)}</span>
      </div>
      <div className="forecast-icon">
        {WEATHER_ICONS[weather.icon] || '☀️'}
      </div>
      <div className="forecast-temp">
        <span className="temp-high">{formatTemperature(temperature.max, units, false)}°</span>
        <span className="temp-low">{formatTemperature(temperature.min, units, false)}°</span>
      </div>
      <div className="forecast-desc">{weather.description}</div>
    </div>
  );

  return (
    <Card className={`weather-card weather-card-${variant} ${className}`}>
      {variant === 'current' ? renderCurrentWeather() : renderForecastItem()}
    </Card>
  );
};

export default WeatherCard;
