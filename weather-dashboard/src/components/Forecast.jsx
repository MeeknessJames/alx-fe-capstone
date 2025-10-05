import React, { useState } from 'react';
import { 
  ChevronDown, 
  ChevronUp, 
  Droplets, 
  Wind, 
  Thermometer,
  Calendar
} from 'lucide-react';
import { getWeatherIcon } from '../services/weatherService';
import { useWeather } from '../contexts/WeatherContext';

const Forecast = () => {
  const [expandedDay, setExpandedDay] = useState(null);
  const { forecast, unit } = useWeather();

  if (!forecast || forecast.length === 0) {
    return null;
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return 'Tomorrow';
    } else {
      return date.toLocaleDateString('en-US', { 
        weekday: 'short',
        month: 'short',
        day: 'numeric'
      });
    }
  };

  const getTemperatureUnit = () => {
    return unit === 'metric' ? '°C' : '°F';
  };

  const getWindUnit = () => {
    return unit === 'metric' ? 'km/h' : 'mph';
  };

  const toggleExpanded = (index) => {
    setExpandedDay(expandedDay === index ? null : index);
  };

  return (
    <div className="weather-card p-6">
      <div className="flex items-center mb-6">
        <Calendar className="h-6 w-6 text-slate-600 dark:text-slate-400 mr-3" />
        <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200">7-Day Forecast</h2>
      </div>

      <div className="space-y-3">
        {forecast.map((day, index) => (
          <div key={index} className="neomorphic-card overflow-hidden">
            {/* Day Header */}
            <button
              onClick={() => toggleExpanded(index)}
              className="w-full p-4 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-700 transition-all duration-200"
            >
              <div className="flex items-center space-x-4">
                <div className="text-2xl">{getWeatherIcon(day.icon)}</div>
                <div className="text-left">
                  <h3 className="text-slate-800 dark:text-slate-200 font-semibold text-lg">
                    {formatDate(day.date)}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 capitalize">{day.description}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <div className="flex items-center space-x-2">
                    <span className="text-slate-800 dark:text-slate-200 text-xl font-bold">
                      {day.maxTemp}{getTemperatureUnit()}
                    </span>
                    <span className="text-slate-500 dark:text-slate-500">
                      {day.minTemp}{getTemperatureUnit()}
                    </span>
                  </div>
                </div>
                {expandedDay === index ? (
                  <ChevronUp className="h-5 w-5 text-slate-500 dark:text-slate-400" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-slate-500 dark:text-slate-400" />
                )}
              </div>
            </button>

            {/* Expanded Details */}
            {expandedDay === index && (
              <div className="px-4 pb-4 border-t border-slate-200 dark:border-slate-700">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                  {/* Humidity */}
                  <div className="text-center">
                    <Droplets className="h-5 w-5 text-blue-500 mx-auto mb-1" />
                    <p className="text-slate-600 dark:text-slate-400 text-sm">Humidity</p>
                    <p className="text-slate-800 dark:text-slate-200 font-semibold">{day.humidity}%</p>
                  </div>

                  {/* Wind Speed */}
                  <div className="text-center">
                    <Wind className="h-5 w-5 text-green-500 mx-auto mb-1" />
                    <p className="text-slate-600 dark:text-slate-400 text-sm">Wind</p>
                    <p className="text-slate-800 dark:text-slate-200 font-semibold">{day.windSpeed} {getWindUnit()}</p>
                  </div>

                  {/* High Temp */}
                  <div className="text-center">
                    <Thermometer className="h-5 w-5 text-red-500 mx-auto mb-1" />
                    <p className="text-slate-600 dark:text-slate-400 text-sm">High</p>
                    <p className="text-slate-800 dark:text-slate-200 font-semibold">{day.maxTemp}{getTemperatureUnit()}</p>
                  </div>

                  {/* Low Temp */}
                  <div className="text-center">
                    <Thermometer className="h-5 w-5 text-blue-500 mx-auto mb-1" />
                    <p className="text-slate-600 dark:text-slate-400 text-sm">Low</p>
                    <p className="text-slate-800 dark:text-slate-200 font-semibold">{day.minTemp}{getTemperatureUnit()}</p>
                  </div>
                </div>

                {/* Hourly Forecast */}
                {day.hourly && day.hourly.length > 0 && (
                  <div className="mt-4">
                    <h4 className="text-slate-800 dark:text-slate-200 font-medium mb-3">Hourly Forecast</h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
                      {day.hourly.slice(0, 12).map((hour, hourIndex) => (
                        <div
                          key={hourIndex}
                          className="bg-slate-50 dark:bg-slate-700 rounded-lg p-3 text-center"
                        >
                          <p className="text-slate-600 dark:text-slate-400 text-sm mb-1">{hour.time}</p>
                          <div className="text-lg mb-1">{getWeatherIcon(hour.icon)}</div>
                          <p className="text-slate-800 dark:text-slate-200 font-semibold text-sm">
                            {hour.temperature}{getTemperatureUnit()}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Forecast;
