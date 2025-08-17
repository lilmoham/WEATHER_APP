export const WEATHER_ICONS = {
  "01d": "☀️", // clear sky day
  "01n": "🌙", // clear sky night
  "02d": "⛅", // few clouds day
  "02n": "☁️", // few clouds night
  "03d": "☁️", // scattered clouds day
  "03n": "☁️", // scattered clouds night
  "04d": "☁️", // broken clouds day
  "04n": "☁️", // broken clouds night
  "09d": "🌧️", // shower rain day
  "09n": "🌧️", // shower rain night
  "10d": "🌦️", // rain day
  "10n": "🌧️", // rain night
  "11d": "⛈️", // thunderstorm day
  "11n": "⛈️", // thunderstorm night
  "13d": "❄️", // snow day
  "13n": "❄️", // snow night
  "50d": "🌫️", // mist day
  "50n": "🌫️"  // mist night
};

export const WEATHER_BACKGROUNDS = {
  clear: {
    day: "linear-gradient(135deg, #74b9ff 0%, #0984e3 100%)",
    night: "linear-gradient(135deg, #2d3436 0%, #636e72 100%)"
  },
  clouds: {
    day: "linear-gradient(135deg, #ddd6fe 0%, #8b5cf6 100%)",
    night: "linear-gradient(135deg, #4c1d95 0%, #7c3aed 100%)"
  },
  rain: {
    day: "linear-gradient(135deg, #74b9ff 0%, #0984e3 100%)",
    night: "linear-gradient(135deg, #2d3436 0%, #636e72 100%)"
  },
  thunderstorm: {
    day: "linear-gradient(135deg, #636e72 0%, #2d3436 100%)",
    night: "linear-gradient(135deg, #2d3436 0%, #000000 100%)"
  },
  snow: {
    day: "linear-gradient(135deg, #ffffff 0%, #ddd6fe 100%)",
    night: "linear-gradient(135deg, #a7f3d0 0%, #6ee7b7 100%)"
  },
  mist: {
    day: "linear-gradient(135deg, #e5e7eb 0%, #9ca3af 100%)",
    night: "linear-gradient(135deg, #374151 0%, #1f2937 100%)"
  }
};

export const WEATHER_CONDITIONS = {
  "clear sky": "clear",
  "few clouds": "clouds",
  "scattered clouds": "clouds",
  "broken clouds": "clouds",
  "overcast clouds": "clouds",
  "shower rain": "rain",
  "rain": "rain",
  "light rain": "rain",
  "moderate rain": "rain",
  "heavy intensity rain": "rain",
  "thunderstorm": "thunderstorm",
  "snow": "snow",
  "mist": "mist",
  "smoke": "mist",
  "haze": "mist",
  "dust": "mist",
  "fog": "mist",
  "sand": "mist",
  "ash": "mist",
  "squall": "mist",
  "tornado": "thunderstorm"
};
