// OpenWeatherMap API service
// You'll need to get your API key from https://openweathermap.org/api
const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY || 'your_api_key_here';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

// Debug: Check if API key is properly loaded
console.log('Environment check:', {
  hasApiKey: !!import.meta.env.VITE_OPENWEATHER_API_KEY,
  apiKeyLength: import.meta.env.VITE_OPENWEATHER_API_KEY?.length || 0,
  fallbackUsed: !import.meta.env.VITE_OPENWEATHER_API_KEY
});

// Weather icon mapping for better visual representation
export const WEATHER_ICONS = {
  '01d': '☀️', // clear sky day
  '01n': '🌙', // clear sky night
  '02d': '⛅', // few clouds day
  '02n': '☁️', // few clouds night
  '03d': '☁️', // scattered clouds
  '03n': '☁️', // scattered clouds
  '04d': '☁️', // broken clouds
  '04n': '☁️', // broken clouds
  '09d': '🌧️', // shower rain
  '09n': '🌧️', // shower rain
  '10d': '🌦️', // rain day
  '10n': '🌧️', // rain night
  '11d': '⛈️', // thunderstorm
  '11n': '⛈️', // thunderstorm
  '13d': '❄️', // snow
  '13n': '❄️', // snow
  '50d': '🌫️', // mist
  '50n': '🌫️', // mist
};

// Get weather icon based on weather condition
export const getWeatherIcon = (iconCode) => {
  return WEATHER_ICONS[iconCode] || '🌤️';
};

// Convert temperature from Kelvin to Celsius
export const kelvinToCelsius = (kelvin) => {
  return Math.round(kelvin - 273.15);
};

// Convert temperature from Kelvin to Fahrenheit
export const kelvinToFahrenheit = (kelvin) => {
  return Math.round((kelvin - 273.15) * 9/5 + 32);
};

// Convert wind speed from m/s to km/h
export const msToKmh = (ms) => {
  return Math.round(ms * 3.6);
};

// Convert wind speed from m/s to mph
export const msToMph = (ms) => {
  return Math.round(ms * 2.237);
};

// Get current weather data for a city
export const getCurrentWeather = async (city, units = 'metric') => {
  try {
    // Debug: Log the API key status
    console.log('API Key status:', API_KEY ? 'Present' : 'Missing');
    console.log('API Key length:', API_KEY ? API_KEY.length : 0);
    
    const url = `${BASE_URL}/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=${units}`;
    console.log('API URL:', url.replace(API_KEY, '***'));
    
    const response = await fetch(url);

    if (!response.ok) {
      console.error('API Response Status:', response.status);
      console.error('API Response:', await response.text());
      
      if (response.status === 404) {
        throw new Error('City not found. Please check the spelling and try again.');
      } else if (response.status === 401) {
        throw new Error('Invalid API key. Please check your configuration.');
      } else if (response.status === 429) {
        throw new Error('API rate limit exceeded. Please try again later.');
      } else {
        throw new Error(`Weather service error: ${response.status}`);
      }
    }

    const data = await response.json();
    
    return {
      id: data.id,
      city: data.name,
      country: data.sys.country,
      temperature: Math.round(data.main.temp),
      feelsLike: Math.round(data.main.feels_like),
      humidity: data.main.humidity,
      pressure: data.main.pressure,
      windSpeed: Math.round(data.wind.speed * 3.6), // Convert to km/h
      windDirection: data.wind.deg,
      visibility: Math.round(data.visibility / 1000), // Convert to km
      uvIndex: data.uvi || 'N/A',
      description: data.weather[0].description,
      icon: data.weather[0].icon,
      main: data.weather[0].main,
      timestamp: new Date().toISOString(),
      sunrise: new Date(data.sys.sunrise * 1000).toLocaleTimeString(),
      sunset: new Date(data.sys.sunset * 1000).toLocaleTimeString(),
    };
  } catch (error) {
    console.error('Error fetching current weather:', error);
    throw error;
  }
};

// Get 5-day weather forecast for a city
export const getWeatherForecast = async (city, units = 'metric') => {
  try {
    const url = `${BASE_URL}/forecast?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=${units}`;
    console.log('Forecast API URL:', url.replace(API_KEY, '***'));
    
    const response = await fetch(url);

    if (!response.ok) {
      console.error('Forecast API Response Status:', response.status);
      console.error('Forecast API Response:', await response.text());
      
      if (response.status === 404) {
        throw new Error('City not found. Please check the spelling and try again.');
      } else if (response.status === 401) {
        throw new Error('Invalid API key. Please check your configuration.');
      } else if (response.status === 429) {
        throw new Error('API rate limit exceeded. Please try again later.');
      } else {
        throw new Error(`Weather service error: ${response.status}`);
      }
    }

    const data = await response.json();
    
    // Group forecast by day and get daily min/max temperatures
    const dailyForecast = {};
    
    data.list.forEach(item => {
      const date = new Date(item.dt * 1000).toDateString();
      
      if (!dailyForecast[date]) {
        dailyForecast[date] = {
          date: date,
          minTemp: item.main.temp_min,
          maxTemp: item.main.temp_max,
          description: item.weather[0].description,
          icon: item.weather[0].icon,
          main: item.weather[0].main,
          humidity: item.main.humidity,
          windSpeed: Math.round(item.wind.speed * 3.6),
          hourly: []
        };
      }
      
      dailyForecast[date].minTemp = Math.min(dailyForecast[date].minTemp, item.main.temp_min);
      dailyForecast[date].maxTemp = Math.max(dailyForecast[date].maxTemp, item.main.temp_max);
      
      dailyForecast[date].hourly.push({
        time: new Date(item.dt * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        temperature: Math.round(item.main.temp),
        description: item.weather[0].description,
        icon: item.weather[0].icon,
        humidity: item.main.humidity,
        windSpeed: Math.round(item.wind.speed * 3.6),
      });
    });

    // Convert to array and round temperatures
    return Object.values(dailyForecast).map(day => ({
      ...day,
      minTemp: Math.round(day.minTemp),
      maxTemp: Math.round(day.maxTemp),
    }));
  } catch (error) {
    console.error('Error fetching weather forecast:', error);
    throw error;
  }
};

// Get weather by coordinates (for geolocation)
export const getWeatherByCoords = async (lat, lon, units = 'metric') => {
  try {
    const response = await fetch(
      `${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=${units}`
    );

    if (!response.ok) {
      throw new Error(`Weather service error: ${response.status}`);
    }

    const data = await response.json();
    
    return {
      id: data.id,
      city: data.name,
      country: data.sys.country,
      temperature: Math.round(data.main.temp),
      feelsLike: Math.round(data.main.feels_like),
      humidity: data.main.humidity,
      pressure: data.main.pressure,
      windSpeed: Math.round(data.wind.speed * 3.6),
      windDirection: data.wind.deg,
      visibility: Math.round(data.visibility / 1000),
      uvIndex: data.uvi || 'N/A',
      description: data.weather[0].description,
      icon: data.weather[0].icon,
      main: data.weather[0].main,
      timestamp: new Date().toISOString(),
      sunrise: new Date(data.sys.sunrise * 1000).toLocaleTimeString(),
      sunset: new Date(data.sys.sunset * 1000).toLocaleTimeString(),
    };
  } catch (error) {
    console.error('Error fetching weather by coordinates:', error);
    throw error;
  }
};

// Get UV index for a location
export const getUVIndex = async (lat, lon) => {
  try {
    const response = await fetch(
      `${BASE_URL}/uvi?lat=${lat}&lon=${lon}&appid=${API_KEY}`
    );

    if (!response.ok) {
      throw new Error(`UV service error: ${response.status}`);
    }

    const data = await response.json();
    return data.value;
  } catch (error) {
    console.error('Error fetching UV index:', error);
    return 'N/A';
  }
};

// Utility function to get wind direction from degrees
export const getWindDirection = (degrees) => {
  const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
  const index = Math.round(degrees / 22.5) % 16;
  return directions[index];
};

// Utility function to get weather background based on weather condition
export const getWeatherBackground = (weatherMain) => {
  const backgrounds = {
    'Clear': 'from-yellow-400 via-orange-500 to-red-500',
    'Clouds': 'from-gray-400 via-gray-500 to-gray-600',
    'Rain': 'from-blue-400 via-blue-500 to-blue-600',
    'Drizzle': 'from-blue-300 via-blue-400 to-blue-500',
    'Thunderstorm': 'from-purple-500 via-purple-600 to-purple-700',
    'Snow': 'from-blue-100 via-blue-200 to-blue-300',
    'Mist': 'from-gray-300 via-gray-400 to-gray-500',
    'Fog': 'from-gray-300 via-gray-400 to-gray-500',
    'Haze': 'from-yellow-200 via-yellow-300 to-yellow-400',
  };
  
  return backgrounds[weatherMain] || 'from-blue-400 via-blue-500 to-blue-600';
};
