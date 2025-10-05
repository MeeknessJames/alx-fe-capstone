import React from 'react';
import { 
  Droplets, 
  Wind, 
  Eye, 
  Gauge, 
  Sunrise, 
  Sunset, 
  Thermometer,
  RefreshCw,
  MapPin
} from 'lucide-react';
import { getWeatherIcon, getWindDirection, getWeatherBackground } from '../services/weatherService';
import { useWeather } from '../contexts/WeatherContext';

const WeatherCard = () => {
  const { currentWeather, loading, refreshWeather, lastUpdate } = useWeather();

  if (!currentWeather) {
    return (
      <div className="weather-card p-8 text-center">
        <div className="text-white/70">
          <MapPin className="h-16 w-16 mx-auto mb-4 opacity-50" />
          <h2 className="text-2xl font-semibold mb-2">Welcome to Weather Dashboard</h2>
          <p>Search for a city to see the current weather conditions</p>
        </div>
      </div>
    );
  }

  const {
    city,
    country,
    temperature,
    feelsLike,
    humidity,
    pressure,
    windSpeed,
    windDirection,
    visibility,
    description,
    icon,
    main,
    sunrise,
    sunset,
  } = currentWeather;

  const weatherIcon = getWeatherIcon(icon);
  const windDirectionText = getWindDirection(windDirection);
  const backgroundClass = getWeatherBackground(main);

  const formatLastUpdate = (timestamp) => {
    if (!timestamp) return '';
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="weather-card p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-200 mb-2">
            {city}, {country}
          </h1>
          <p className="text-slate-600 dark:text-slate-400 capitalize text-lg">{description}</p>
        </div>
        <button
          onClick={refreshWeather}
          disabled={loading}
          className="p-3 rounded-full weather-button disabled:opacity-50"
          title="Refresh weather data"
        >
          <RefreshCw className={`h-5 w-5 text-slate-600 dark:text-slate-400 ${loading ? 'animate-spin' : ''}`} />
        </button>
      </div>

      {/* Main Temperature */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center mb-6">
          <span className="text-8xl mr-6">{weatherIcon}</span>
          <div>
            <div className="temperature-display">{temperature}°</div>
            <p className="text-slate-600 dark:text-slate-400 text-lg">
              Feels like {feelsLike}°
            </p>
          </div>
        </div>
        {lastUpdate && (
          <p className="text-slate-500 dark:text-slate-500 text-sm">
            Last updated: {formatLastUpdate(lastUpdate)}
          </p>
        )}
      </div>

      {/* Weather Details Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {/* Humidity */}
        <div className="neomorphic-card text-center">
          <Droplets className="h-6 w-6 text-blue-500 mx-auto mb-2" />
          <p className="text-slate-600 dark:text-slate-400 text-sm mb-1">Humidity</p>
          <p className="text-slate-800 dark:text-slate-200 text-xl font-semibold">{humidity}%</p>
        </div>

        {/* Wind */}
        <div className="neomorphic-card text-center">
          <Wind className="h-6 w-6 text-green-500 mx-auto mb-2" />
          <p className="text-slate-600 dark:text-slate-400 text-sm mb-1">Wind</p>
          <p className="text-slate-800 dark:text-slate-200 text-xl font-semibold">{windSpeed} km/h</p>
          <p className="text-slate-500 dark:text-slate-500 text-xs">{windDirectionText}</p>
        </div>

        {/* Visibility */}
        <div className="neomorphic-card text-center">
          <Eye className="h-6 w-6 text-purple-500 mx-auto mb-2" />
          <p className="text-slate-600 dark:text-slate-400 text-sm mb-1">Visibility</p>
          <p className="text-slate-800 dark:text-slate-200 text-xl font-semibold">{visibility} km</p>
        </div>

        {/* Pressure */}
        <div className="neomorphic-card text-center">
          <Gauge className="h-6 w-6 text-orange-500 mx-auto mb-2" />
          <p className="text-slate-600 dark:text-slate-400 text-sm mb-1">Pressure</p>
          <p className="text-slate-800 dark:text-slate-200 text-xl font-semibold">{pressure} hPa</p>
        </div>
      </div>

      {/* Sunrise/Sunset */}
      <div className="grid grid-cols-2 gap-4">
        <div className="neomorphic-card text-center">
          <Sunrise className="h-6 w-6 text-yellow-500 mx-auto mb-2" />
          <p className="text-slate-600 dark:text-slate-400 text-sm mb-1">Sunrise</p>
          <p className="text-slate-800 dark:text-slate-200 text-lg font-semibold">{sunrise}</p>
        </div>
        <div className="neomorphic-card text-center">
          <Sunset className="h-6 w-6 text-red-500 mx-auto mb-2" />
          <p className="text-slate-600 dark:text-slate-400 text-sm mb-1">Sunset</p>
          <p className="text-slate-800 dark:text-slate-200 text-lg font-semibold">{sunset}</p>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
