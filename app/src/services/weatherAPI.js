import { API_CONFIG } from '../constants/apiConfig';

class WeatherAPI {
  constructor() {
    this.baseURL = API_CONFIG.baseURL;
    this.geocodingURL = API_CONFIG.geocodingURL;
    this.apiKey = API_CONFIG.key;
  }

  async makeRequest(url) {
    try {
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('API request failed:', error);
      throw new Error(`Failed to fetch weather data: ${error.message}`);
    }
  }

  async getCurrentWeather(lat, lon, units = 'metric') {
    const url = `${this.baseURL}weather?lat=${lat}&lon=${lon}&appid=${this.apiKey}&units=${units}`;
    return await this.makeRequest(url);
  }

  async getWeatherByCity(city, units = 'metric') {
    const url = `${this.baseURL}weather?q=${encodeURIComponent(city)}&appid=${this.apiKey}&units=${units}`;
    return await this.makeRequest(url);
  }

  async getForecast(lat, lon, units = 'metric') {
    const url = `${this.baseURL}forecast?lat=${lat}&lon=${lon}&appid=${this.apiKey}&units=${units}`;
    return await this.makeRequest(url);
  }

  async getForecastByCity(city, units = 'metric') {
    const url = `${this.baseURL}forecast?q=${encodeURIComponent(city)}&appid=${this.apiKey}&units=${units}`;
    return await this.makeRequest(url);
  }

  async searchCities(query, limit = 5) {
    const url = `${this.geocodingURL}direct?q=${encodeURIComponent(query)}&limit=${limit}&appid=${this.apiKey}`;
    return await this.makeRequest(url);
  }

  async getCityByCoords(lat, lon, limit = 1) {
    const url = `${this.geocodingURL}reverse?lat=${lat}&lon=${lon}&limit=${limit}&appid=${this.apiKey}`;
    return await this.makeRequest(url);
  }

  formatWeatherData(data) {
    return {
      id: data.id,
      city: data.name,
      country: data.sys.country,
      coordinates: {
        lat: data.coord.lat,
        lon: data.coord.lon
      },
      weather: {
        main: data.weather[0].main,
        description: data.weather[0].description,
        icon: data.weather[0].icon
      },
      temperature: {
        current: data.main.temp,
        feelsLike: data.main.feels_like,
        min: data.main.temp_min,
        max: data.main.temp_max
      },
      humidity: data.main.humidity,
      pressure: data.main.pressure,
      visibility: data.visibility,
      wind: {
        speed: data.wind.speed,
        direction: data.wind.deg,
        gust: data.wind.gust
      },
      clouds: data.clouds.all,
      datetime: {
        current: data.dt,
        sunrise: data.sys.sunrise,
        sunset: data.sys.sunset,
        timezone: data.timezone
      }
    };
  }

  formatForecastData(data) {
    return {
      city: {
        name: data.city.name,
        country: data.city.country,
        coordinates: {
          lat: data.city.coord.lat,
          lon: data.city.coord.lon
        },
        timezone: data.city.timezone,
        sunrise: data.city.sunrise,
        sunset: data.city.sunset
      },
      forecast: data.list.map(item => ({
        datetime: item.dt,
        weather: {
          main: item.weather[0].main,
          description: item.weather[0].description,
          icon: item.weather[0].icon
        },
        temperature: {
          current: item.main.temp,
          feelsLike: item.main.feels_like,
          min: item.main.temp_min,
          max: item.main.temp_max
        },
        humidity: item.main.humidity,
        pressure: item.main.pressure,
        wind: {
          speed: item.wind.speed,
          direction: item.wind.deg,
          gust: item.wind.gust
        },
        clouds: item.clouds.all,
        precipitation: item.rain ? item.rain['3h'] || 0 : 0,
        snow: item.snow ? item.snow['3h'] || 0 : 0
      }))
    };
  }
}

const weatherAPI = new WeatherAPI();
export default weatherAPI;
