import React from 'react';
import { AlertCircle, X, RefreshCw } from 'lucide-react';
import { useWeather } from '../contexts/WeatherContext';

const ErrorMessage = () => {
  const { error, clearError, refreshWeather, currentWeather } = useWeather();

  if (!error) return null;

  const getErrorMessage = (errorMessage) => {
    if (errorMessage.includes('City not found')) {
      return {
        title: 'City Not Found',
        message: 'The city you searched for could not be found. Please check the spelling and try again.',
        icon: '🏙️',
      };
    } else if (errorMessage.includes('API key')) {
      return {
        title: 'API Configuration Error',
        message: 'There\'s an issue with the weather service configuration. Please try again later.',
        icon: '⚙️',
      };
    } else if (errorMessage.includes('rate limit')) {
      return {
        title: 'Service Temporarily Unavailable',
        message: 'Too many requests. Please wait a moment before trying again.',
        icon: '⏳',
      };
    } else if (errorMessage.includes('Geolocation')) {
      return {
        title: 'Location Access Denied',
        message: 'Unable to access your location. Please search for a city manually.',
        icon: '📍',
      };
    } else if (errorMessage.includes('network') || errorMessage.includes('fetch')) {
      return {
        title: 'Connection Error',
        message: 'Unable to connect to the weather service. Please check your internet connection.',
        icon: '🌐',
      };
    } else {
      return {
        title: 'Something Went Wrong',
        message: errorMessage,
        icon: '⚠️',
      };
    }
  };

  const errorInfo = getErrorMessage(error);

  return (
    <div className="weather-card p-6 border-l-4 border-red-500 bg-red-500/10">
      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0">
          <div className="text-3xl">{errorInfo.icon}</div>
        </div>
        
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold text-white flex items-center">
              <AlertCircle className="h-5 w-5 text-red-400 mr-2" />
              {errorInfo.title}
            </h3>
            <button
              onClick={clearError}
              className="text-white/70 hover:text-white transition-colors duration-200"
              title="Dismiss error"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          
          <p className="text-white/80 mb-4">{errorInfo.message}</p>
          
          <div className="flex space-x-3">
            {currentWeather && (
              <button
                onClick={refreshWeather}
                className="flex items-center px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-all duration-200 text-white"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Try Again
              </button>
            )}
            
            <button
              onClick={clearError}
              className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-all duration-200 text-white"
            >
              Dismiss
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorMessage;
