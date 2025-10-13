import React, { useEffect } from 'react';
import { WeatherProvider, useWeather } from './contexts/WeatherContext';
import SearchBar from './components/SearchBar';
import WeatherCard from './components/WeatherCard';
import Forecast from './components/Forecast';
import ErrorMessage from './components/ErrorMessage';
import Settings from './components/Settings';
import { Cloud, Sun } from 'lucide-react';

function AppContent() {
  const { theme } = useWeather();

  useEffect(() => {
    // Apply theme to body
    if (theme === 'dark') {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [theme]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <header className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Sun className="h-12 w-12 text-blue-600 dark:text-blue-400 mr-3" />
            <h1 className="text-4xl md:text-6xl font-bold text-slate-800 dark:text-slate-200">
              Weather Dashboard
            </h1>
            <Cloud className="h-12 w-12 text-slate-600 dark:text-slate-400 ml-3" />
          </div>
          <p className="text-slate-600 dark:text-slate-400 text-lg md:text-xl max-w-2xl mx-auto">
            Get real-time weather information and forecasts for any city worldwide
          </p>
        </header>

        {/* Search Bar */}
        <div className="mb-8">
          <SearchBar />
        </div>

        {/* Error Message */}
        <div className="mb-8">
          <ErrorMessage />
        </div>

        {/* Weather Card */}
        <div className="mb-8">
          <WeatherCard />
        </div>

        {/* Forecast */}
        <div className="mb-8">
          <Forecast />
        </div>

        {/* Footer */}
        <footer className="text-center text-slate-500 dark:text-slate-400 mt-12">
          <p className="mb-2">
            Neomorphic weather dashboard By Meekness James
          </p>
          <p className="text-sm">
            Weather data provided by OpenWeatherMap API
          </p>
        </footer>
      </div>

      {/* Settings */}
      <Settings />
    </div>
  );
}

function App() {
  return (
    <WeatherProvider>
      <AppContent />
    </WeatherProvider>
  );
}

export default App;
