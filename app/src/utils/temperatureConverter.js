export const celsiusToFahrenheit = (celsius) => {
  return Math.round((celsius * 9/5) + 32);
};

export const fahrenheitToCelsius = (fahrenheit) => {
  return Math.round((fahrenheit - 32) * 5/9);
};

export const kelvinToCelsius = (kelvin) => {
  return Math.round(kelvin - 273.15);
};

export const kelvinToFahrenheit = (kelvin) => {
  return celsiusToFahrenheit(kelvinToCelsius(kelvin));
};

export const formatTemperature = (temp, unit = 'metric', showUnit = true) => {
  const temperature = Math.round(temp);
  if (!showUnit) return temperature;
  
  const symbol = unit === 'metric' ? '°C' : '°F';
  return `${temperature}${symbol}`;
};

export const getTemperatureRange = (min, max, unit = 'metric') => {
  const minTemp = Math.round(min);
  const maxTemp = Math.round(max);
  const symbol = unit === 'metric' ? '°C' : '°F';
  
  return `${minTemp}${symbol} / ${maxTemp}${symbol}`;
};

export const getFeelsLikeText = (actual, feelsLike, unit = 'metric') => {
  const diff = Math.abs(actual - feelsLike);
  
  if (diff < 2) return 'Feels about the same';
  
  const comparison = feelsLike > actual ? 'warmer' : 'cooler';
  return `Feels ${Math.round(diff)}° ${comparison}`;
};
