import { useState, useEffect, useCallback } from 'react';
import weatherAPI from '../services/weatherAPI';
import { APP_CONFIG } from '../constants/apiConfig';

export const useWeather = () => {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [units, setUnits] = useState(APP_CONFIG.defaultUnits);
  const [lastUpdated, setLastUpdated] = useState(null);

  const fetchWeatherByCoords = useCallback(async (lat, lon) => {
    setLoading(true);
    setError(null);

    try {
      const [weatherData, forecastData] = await Promise.all([
        weatherAPI.getCurrentWeather(lat, lon, units),
        weatherAPI.getForecast(lat, lon, units)
      ]);

      setCurrentWeather(weatherAPI.formatWeatherData(weatherData));
      setForecast(weatherAPI.formatForecastData(forecastData));
      setLastUpdated(new Date());
    } catch (err) {
      setError(err.message);
      console.error('Weather fetch error:', err);
    } finally {
      setLoading(false);
    }
  }, [units]);

  const fetchWeatherByCity = useCallback(async (city) => {
    setLoading(true);
    setError(null);

    try {
      const [weatherData, forecastData] = await Promise.all([
        weatherAPI.getWeatherByCity(city, units),
        weatherAPI.getForecastByCity(city, units)
      ]);

      setCurrentWeather(weatherAPI.formatWeatherData(weatherData));
      setForecast(weatherAPI.formatForecastData(forecastData));
      setLastUpdated(new Date());
    } catch (err) {
      setError(err.message);
      console.error('Weather fetch error:', err);
    } finally {
      setLoading(false);
    }
  }, [units]);

  const searchCities = useCallback(async (query) => {
    if (!query.trim()) return [];
    
    try {
      const cities = await weatherAPI.searchCities(query);
      return cities.map(city => ({
        name: city.name,
        country: city.country,
        state: city.state,
        coordinates: {
          lat: city.lat,
          lon: city.lon
        },
        displayName: `${city.name}${city.state ? `, ${city.state}` : ''}, ${city.country}`
      }));
    } catch (err) {
      console.error('City search error:', err);
      return [];
    }
  }, []);

  const refreshWeather = useCallback(() => {
    if (currentWeather) {
      const { lat, lon } = currentWeather.coordinates;
      fetchWeatherByCoords(lat, lon);
    }
  }, [currentWeather, fetchWeatherByCoords]);

  const toggleUnits = useCallback(async () => {
    const newUnits = units === 'metric' ? 'imperial' : 'metric';
    setUnits(newUnits);
    
    // Refresh data with new units
    if (currentWeather) {
      setLoading(true);
      setError(null);

      try {
        const { lat, lon } = currentWeather.coordinates;
        const [weatherData, forecastData] = await Promise.all([
          weatherAPI.getCurrentWeather(lat, lon, newUnits),
          weatherAPI.getForecast(lat, lon, newUnits)
        ]);

        setCurrentWeather(weatherAPI.formatWeatherData(weatherData));
        setForecast(weatherAPI.formatForecastData(forecastData));
        setLastUpdated(new Date());
      } catch (err) {
        setError(err.message);
        console.error('Weather fetch error:', err);
      } finally {
        setLoading(false);
      }
    }
  }, [units, currentWeather]);

  // Auto-refresh weather data
  useEffect(() => {
    if (!currentWeather) return;

    const interval = setInterval(refreshWeather, APP_CONFIG.refreshInterval);
    return () => clearInterval(interval);
  }, [currentWeather, refreshWeather]);

  return {
    currentWeather,
    forecast,
    loading,
    error,
    units,
    lastUpdated,
    fetchWeatherByCoords,
    fetchWeatherByCity,
    searchCities,
    refreshWeather,
    toggleUnits,
    clearError: () => setError(null)
  };
};
