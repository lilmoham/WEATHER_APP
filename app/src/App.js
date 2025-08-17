import React, { useState, useEffect } from 'react';
import { useWeather } from './hooks/useWeather';
import { useGeolocation } from './hooks/useGeolocation';
import SearchBar from './components/Search/SearchBar';
import LocationButton from './components/Search/LocationButton';
import LoadingSpinner from './components/UI/LoadingSpinner';
import ErrorMessage from './components/UI/ErrorMessage';
import WeatherCard from './components/Weather/WeatherCard';
import WeatherForecast from './components/Weather/WeatherForecast';
import WeatherDetails from './components/Weather/WeatherDetails';
import { WEATHER_BACKGROUNDS, WEATHER_CONDITIONS } from './constants/weatherIcons';
import './App.css';

function App() {
  const [searchResults, setSearchResults] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [forecastType, setForecastType] = useState('daily');
  
  const {
    currentWeather,
    forecast,
    loading: weatherLoading,
    error: weatherError,
    units,
    fetchWeatherByCoords,
    searchCities,
    refreshWeather,
    toggleUnits,
    clearError
  } = useWeather();

  const {
    location,
    loading: locationLoading,
    error: locationError,
    getCurrentLocation,
    clearError: clearLocationError
  } = useGeolocation();

  // Fetch weather when location is available
  useEffect(() => {
    if (location && !currentWeather) {
      fetchWeatherByCoords(location.latitude, location.longitude);
    }
  }, [location, currentWeather, fetchWeatherByCoords]);

  const handleSearch = async (query) => {
    setSearchLoading(true);
    try {
      const cities = await searchCities(query);
      setSearchResults(cities);
    } catch (error) {
      console.error('Search failed:', error);
      setSearchResults([]);
    } finally {
      setSearchLoading(false);
    }
  };

  const handleCitySelect = (city) => {
    fetchWeatherByCoords(city.coordinates.lat, city.coordinates.lon);
    setSearchResults([]);
  };

  const handleLocationClick = () => {
    getCurrentLocation();
  };

  const handleErrorDismiss = () => {
    if (weatherError) {
      clearError();
    }
    if (locationError) {
      clearLocationError();
    }
  };

  const handleErrorRetry = () => {
    if (weatherError) {
      refreshWeather();
    } else if (locationError) {
      getCurrentLocation();
    }
  };

  const getBackgroundStyle = () => {
    if (!currentWeather) return {};
    
    const condition = WEATHER_CONDITIONS[currentWeather.weather.description.toLowerCase()] || 'clear';
    const isDay = currentWeather.datetime.current >= currentWeather.datetime.sunrise && 
                  currentWeather.datetime.current <= currentWeather.datetime.sunset;
    
    const timeOfDay = isDay ? 'day' : 'night';
    const background = WEATHER_BACKGROUNDS[condition][timeOfDay];
    
    return {
      background
    };
  };

  return (
    <div className="app" style={getBackgroundStyle()}>
      <main className="main-content">
        {/* Header with Search and Controls */}
        <header className="app-header">
          <div className="search-section">
            <SearchBar
              onSearch={handleSearch}
              onCitySelect={handleCitySelect}
              isLoading={searchLoading}
              searchResults={searchResults}
            />
            <div className="header-controls">
              <LocationButton
                onClick={handleLocationClick}
                isLoading={locationLoading}
                hasLocation={!!location}
                error={locationError}
              />
              {currentWeather && (
                <button 
                  className="units-toggle-btn"
                  onClick={toggleUnits}
                  title="Toggle temperature units"
                >
                  °{units === 'metric' ? 'F' : 'C'}
                </button>
              )}
              {currentWeather && (
                <button 
                  className="refresh-btn"
                  onClick={refreshWeather}
                  disabled={weatherLoading}
                  title="Refresh weather data"
                >
                  {weatherLoading ? '⟳' : '🔄'}
                </button>
              )}
            </div>
          </div>
        </header>

        {/* Error Display */}
        {(weatherError || locationError) && (
          <ErrorMessage
            error={weatherError || locationError}
            onRetry={handleErrorRetry}
            onDismiss={handleErrorDismiss}
          />
        )}

        {/* Loading State */}
        {(weatherLoading && !currentWeather) && (
          <LoadingSpinner size="large" message="Loading weather data..." />
        )}

        {/* Weather Content */}
        {currentWeather && (
          <div className="weather-content">
            {/* Main Weather Display */}
            <section className="current-weather-section">
              <WeatherCard 
                weatherData={currentWeather}
                units={units}
                variant="current"
                showDetails={true}
              />
            </section>

            {/* Forecast Section */}
            <section className="forecast-section">
              <div className="forecast-controls">
                <button 
                  className={`forecast-toggle ${forecastType === 'daily' ? 'active' : ''}`}
                  onClick={() => setForecastType('daily')}
                >
                  5-Day Forecast
                </button>
                <button 
                  className={`forecast-toggle ${forecastType === 'hourly' ? 'active' : ''}`}
                  onClick={() => setForecastType('hourly')}
                >
                  24-Hour Forecast
                </button>
              </div>
              
              {forecast && (
                <WeatherForecast 
                  forecast={forecast}
                  units={units}
                  type={forecastType}
                />
              )}
            </section>

            {/* Weather Details Section */}
            <section className="details-section">
              <WeatherDetails 
                weatherData={currentWeather}
                units={units}
              />
            </section>
          </div>
        )}

        {/* Welcome Message for First Time Users */}
        {!currentWeather && !weatherLoading && !weatherError && !locationError && (
          <div className="welcome-section">
            <div className="welcome-content">
              <h1 className="welcome-title">Weather App</h1>
              <p className="welcome-subtitle">
                Get accurate weather information for any location
              </p>
              <div className="welcome-actions">
                <p className="welcome-text">
                  Search for a city above or use your current location to get started
                </p>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
