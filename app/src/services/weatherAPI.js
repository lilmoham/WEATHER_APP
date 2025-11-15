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
        if (response.status === 429) {
          console.warn('⚠️ API rate limit exceeded. Using demo data...');
          throw new Error('RATE_LIMITED');
        }
        if (response.status === 401) {
          throw new Error('Invalid API key');
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      // Check for API error codes
      if (data.cod && data.cod !== 200 && data.cod !== "200") {
        if (data.cod === 429 || data.cod === "429") {
          console.warn('⚠️ API rate limit exceeded. Using demo data...');
          throw new Error('RATE_LIMITED');
        }
        throw new Error(data.message || 'API error occurred');
      }
      
      return data;
    } catch (error) {
      if (error.message === 'RATE_LIMITED') {
        throw error; // Pass this up to be handled with demo data
      }
      console.error('API request failed:', error);
      throw new Error(`Failed to fetch weather data: ${error.message}`);
    }
  }

  async getWeatherByCity(city, units = 'metric') {
    try {
      const url = `${this.baseURL}weather?q=${encodeURIComponent(city)}&appid=${this.apiKey}&units=${units}`;
      return await this.makeRequest(url);
    } catch (error) {
      if (error.message === 'RATE_LIMITED') {
        return this.getDemoWeather(city, units);
      }
      throw error;
    }
  }

  async getForecastByCity(city, units = 'metric') {
    try {
      const url = `${this.baseURL}forecast?q=${encodeURIComponent(city)}&appid=${this.apiKey}&units=${units}`;
      return await this.makeRequest(url);
    } catch (error) {
      if (error.message === 'RATE_LIMITED') {
        return this.getDemoForecast(city, units);
      }
      throw error;
    }
  }

  async searchCities(query, limit = 5) {
    try {
      const url = `${this.geocodingURL}direct?q=${encodeURIComponent(query)}&limit=${limit}&appid=${this.apiKey}`;
      return await this.makeRequest(url);
    } catch (error) {
      if (error.message === 'RATE_LIMITED') {
        return this.getDemoCities(query, limit);
      }
      throw error;
    }
  }

  async getCurrentWeather(lat, lon, units = 'metric') {
    try {
      const url = `${this.baseURL}weather?lat=${lat}&lon=${lon}&appid=${this.apiKey}&units=${units}`;
      return await this.makeRequest(url);
    } catch (error) {
      if (error.message === 'RATE_LIMITED') {
        return this.getDemoWeather('Current Location', units);
      }
      throw error;
    }
  }

  async getForecast(lat, lon, units = 'metric') {
    try {
      const url = `${this.baseURL}forecast?lat=${lat}&lon=${lon}&appid=${this.apiKey}&units=${units}`;
      return await this.makeRequest(url);
    } catch (error) {
      if (error.message === 'RATE_LIMITED') {
        return this.getDemoForecast('Current Location', units);
      }
      throw error;
    }
  }

  // Demo data methods
  getDemoWeather(city = 'Demo City', units = 'metric') {
    const temp = units === 'metric' ? 22 : 72;
    return {
      coord: { lon: -0.13, lat: 51.51 },
      weather: [{
        id: 800,
        main: "Clear",
        description: "clear sky (demo data)",
        icon: "01d"
      }],
      base: "stations",
      main: {
        temp: temp,
        feels_like: temp + 1,
        temp_min: temp - 3,
        temp_max: temp + 3,
        pressure: 1013,
        humidity: 65
      },
      visibility: 10000,
      wind: {
        speed: 3.5,
        deg: 230,
        gust: 5.0
      },
      clouds: { all: 10 },
      dt: Math.floor(Date.now() / 1000),
      sys: {
        type: 2,
        id: 2019646,
        country: "GB",
        sunrise: Math.floor(Date.now() / 1000) - 21600,
        sunset: Math.floor(Date.now() / 1000) + 21600
      },
      timezone: 0,
      id: 2643743,
      name: city + " (Demo)",
      cod: 200
    };
  }

  getDemoForecast(city = 'Demo City', units = 'metric') {
    const baseTemp = units === 'metric' ? 20 : 68;
    const forecasts = [];
    
    for (let i = 0; i < 40; i++) {
      const time = Math.floor(Date.now() / 1000) + (i * 10800); // 3 hours apart
      const temp = baseTemp + Math.sin(i * 0.5) * 5;
      
      forecasts.push({
        dt: time,
        main: {
          temp: Math.round(temp),
          feels_like: Math.round(temp + 1),
          temp_min: Math.round(temp - 2),
          temp_max: Math.round(temp + 2),
          pressure: 1013,
          humidity: 60 + (i % 20)
        },
        weather: [{
          id: 800,
          main: i % 3 === 0 ? "Clouds" : "Clear",
          description: i % 3 === 0 ? "few clouds (demo)" : "clear sky (demo)",
          icon: i % 3 === 0 ? "02d" : "01d"
        }],
        clouds: { all: i % 3 === 0 ? 20 : 5 },
        wind: {
          speed: 3.0 + (i % 5) * 0.5,
          deg: 200 + (i % 180),
          gust: 5.0
        },
        visibility: 10000,
        pop: 0,
        rain: undefined,
        snow: undefined,
        dt_txt: new Date(time * 1000).toISOString().replace('T', ' ').slice(0, 19)
      });
    }

    return {
      cod: "200",
      message: 0,
      cnt: 40,
      list: forecasts,
      city: {
        id: 2643743,
        name: city + " (Demo)",
        coord: { lat: 51.51, lon: -0.13 },
        country: "GB",
        population: 1000000,
        timezone: 0,
        sunrise: Math.floor(Date.now() / 1000) - 21600,
        sunset: Math.floor(Date.now() / 1000) + 21600
      }
    };
  }

  getDemoCities(query, limit = 5) {
    const cities = [
      { name: "London", country: "GB", state: "England", lat: 51.5074, lon: -0.1278 },
      { name: "New York", country: "US", state: "New York", lat: 40.7128, lon: -74.0060 },
      { name: "Tokyo", country: "JP", state: "", lat: 35.6762, lon: 139.6503 },
      { name: "Paris", country: "FR", state: "", lat: 48.8566, lon: 2.3522 },
      { name: "Sydney", country: "AU", state: "New South Wales", lat: -33.8688, lon: 151.2093 },
      { name: "Berlin", country: "DE", state: "", lat: 52.5200, lon: 13.4050 },
      { name: "Madrid", country: "ES", state: "", lat: 40.4168, lon: -3.7038 },
      { name: "Rome", country: "IT", state: "", lat: 41.9028, lon: 12.4964 }
    ];

    return cities
      .filter(city => city.name.toLowerCase().includes(query.toLowerCase()))
      .slice(0, limit)
      .map(city => ({ ...city, name: city.name + " (Demo)" }));
  }

  async getCityByCoords(lat, lon, limit = 1) {
    try {
      const url = `${this.geocodingURL}reverse?lat=${lat}&lon=${lon}&limit=${limit}&appid=${this.apiKey}`;
      return await this.makeRequest(url);
    } catch (error) {
      if (error.message === 'RATE_LIMITED') {
        return this.getDemoCities('Current Location', limit);
      }
      throw error;
    }
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
