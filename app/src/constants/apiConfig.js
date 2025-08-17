export const API_CONFIG = {
  key: process.env.REACT_APP_WEATHER_API_KEY || "your-api-key-here", // API key from environment variables
  baseURL: "https://api.openweathermap.org/data/2.5/",
  geocodingURL: "https://api.openweathermap.org/geo/1.0/",
  endpoints: {
    current: "weather",
    forecast: "forecast",
    oneCall: "onecall",
    direct: "direct",
    reverse: "reverse"
  },
  units: {
    metric: "metric",
    imperial: "imperial",
    standard: "standard"
  }
};

export const APP_CONFIG = {
  defaultUnits: "metric",
  refreshInterval: 600000, // 10 minutes
  maxSearchHistory: 5,
  debounceDelay: 300
};
