import React from 'react';
import { formatTemperature } from '../../utils/temperatureConverter';
import { getDayOfWeek, getRelativeDay } from '../../utils/dateHelpers';
import { WEATHER_ICONS } from '../../constants/weatherIcons';
import Card from '../UI/Card';
import './WeatherForecast.css';

const WeatherForecast = ({ forecast, units = 'metric', type = 'daily' }) => {
  if (!forecast || !forecast.forecast) {
    return (
      <Card className="forecast-card">
        <div className="forecast-header">
          <h3>Weather Forecast</h3>
        </div>
        <div className="no-forecast">No forecast data available</div>
      </Card>
    );
  }

  const groupForecastByDay = (forecastList) => {
    const grouped = {};
    
    forecastList.forEach(item => {
      const date = new Date(item.datetime * 1000);
      const dateKey = date.toDateString();
      
      if (!grouped[dateKey]) {
        grouped[dateKey] = {
          date: dateKey,
          timestamp: item.datetime,
          items: []
        };
      }
      
      grouped[dateKey].items.push(item);
    });

    return Object.values(grouped).slice(0, 5).map(day => {
      const items = day.items;
      const temps = items.map(item => item.temperature.current);
      const conditions = items.map(item => item.weather.main);
      
      // Find most common condition
      const conditionCount = {};
      conditions.forEach(condition => {
        conditionCount[condition] = (conditionCount[condition] || 0) + 1;
      });
      const mainCondition = Object.keys(conditionCount).reduce((a, b) => 
        conditionCount[a] > conditionCount[b] ? a : b
      );
      
      // Find corresponding icon
      const iconItem = items.find(item => item.weather.main === mainCondition);
      
      return {
        date: day.date,
        timestamp: day.timestamp,
        minTemp: Math.min(...temps),
        maxTemp: Math.max(...temps),
        condition: mainCondition,
        description: iconItem?.weather.description || '',
        icon: iconItem?.weather.icon || '01d',
        humidity: Math.round(items.reduce((sum, item) => sum + item.humidity, 0) / items.length),
        windSpeed: Math.round(items.reduce((sum, item) => sum + item.wind.speed, 0) / items.length)
      };
    });
  };

  const getHourlyForecast = (forecastList) => {
    return forecastList.slice(0, 24).filter((_, index) => index % 3 === 0);
  };

  const dailyForecast = groupForecastByDay(forecast.forecast);
  const hourlyForecast = getHourlyForecast(forecast.forecast);

  const renderDailyForecast = () => (
    <div className="daily-forecast">
      {dailyForecast.map((day, index) => (
        <div key={day.date} className="daily-forecast-item">
          <div className="day-info">
            <span className="day-name">
              {index === 0 ? 'Today' : getRelativeDay(day.timestamp)}
            </span>
            <span className="day-date">
              {getDayOfWeek(day.timestamp)}
            </span>
          </div>
          
          <div className="day-weather">
            <div className="day-icon">
              {WEATHER_ICONS[day.icon] || '☀️'}
            </div>
            <div className="day-condition">{day.description}</div>
          </div>
          
          <div className="day-temps">
            <span className="temp-high">
              {formatTemperature(day.maxTemp, units, false)}°
            </span>
            <span className="temp-low">
              {formatTemperature(day.minTemp, units, false)}°
            </span>
          </div>
          
          <div className="day-details">
            <div className="detail-item">
              <span className="detail-icon">💧</span>
              <span className="detail-value">{day.humidity}%</span>
            </div>
            <div className="detail-item">
              <span className="detail-icon">💨</span>
              <span className="detail-value">
                {day.windSpeed}{units === 'metric' ? 'm/s' : 'mph'}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderHourlyForecast = () => (
    <div className="hourly-forecast">
      {hourlyForecast.map((hour, index) => {
        const date = new Date(hour.datetime * 1000);
        const time = date.toLocaleTimeString('en-US', { 
          hour: '2-digit', 
          minute: '2-digit',
          hour12: true 
        });
        
        return (
          <div key={index} className="hourly-forecast-item">
            <div className="hour-time">
              {index === 0 ? 'Now' : time}
            </div>
            <div className="hour-icon">
              {WEATHER_ICONS[hour.weather.icon] || '☀️'}
            </div>
            <div className="hour-temp">
              {formatTemperature(hour.temperature.current, units, false)}°
            </div>
            <div className="hour-condition">
              {hour.weather.description}
            </div>
          </div>
        );
      })}
    </div>
  );

  return (
    <Card className="forecast-card">
      <div className="forecast-header">
        <h3>{type === 'daily' ? '5-Day Forecast' : '24-Hour Forecast'}</h3>
        <div className="forecast-location">
          {forecast.city.name}, {forecast.city.country}
        </div>
      </div>
      
      <div className="forecast-content">
        {type === 'daily' ? renderDailyForecast() : renderHourlyForecast()}
      </div>
    </Card>
  );
};

export default WeatherForecast;
