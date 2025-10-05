import React, { useState } from 'react';
import { 
  Settings as SettingsIcon, 
  X, 
  Sun, 
  Moon, 
  Thermometer, 
  RefreshCw,
  Clock,
  ToggleLeft,
  ToggleRight
} from 'lucide-react';
import { useWeather } from '../contexts/WeatherContext';

const Settings = () => {
  const [isOpen, setIsOpen] = useState(false);
  const {
    unit,
    setUnit,
    theme,
    setTheme,
    autoUpdate,
    setAutoUpdate,
    updateInterval,
    setUpdateInterval,
  } = useWeather();

  const handleThemeToggle = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const handleUnitChange = (newUnit) => {
    setUnit(newUnit);
  };

  const handleAutoUpdateToggle = () => {
    setAutoUpdate(!autoUpdate);
  };

  const handleIntervalChange = (newInterval) => {
    setUpdateInterval(parseInt(newInterval));
  };

  return (
    <>
      {/* Settings Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="settings-button z-40"
        title="Settings"
      >
        <SettingsIcon className="h-6 w-6 text-slate-600 dark:text-slate-400" />
      </button>

      {/* Settings Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="weather-card max-w-md w-full max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-700">
              <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200 flex items-center">
                <SettingsIcon className="h-6 w-6 mr-3" />
                Settings
              </h2>
              <button
                onClick={() => setIsOpen(false)}
                className="text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors duration-200"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Settings Content */}
            <div className="p-6 space-y-6">
              {/* Theme Setting */}
              <div>
                <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-4 flex items-center">
                  {theme === 'light' ? <Sun className="h-5 w-5 mr-2" /> : <Moon className="h-5 w-5 mr-2" />}
                  Theme
                </h3>
                <div className="flex items-center justify-between">
                  <span className="text-slate-600 dark:text-slate-400">Dark Mode</span>
                  <button
                    onClick={handleThemeToggle}
                    className="flex items-center"
                  >
                    {theme === 'dark' ? (
                      <ToggleRight className="h-6 w-6 text-blue-500" />
                    ) : (
                      <ToggleLeft className="h-6 w-6 text-slate-400" />
                    )}
                  </button>
                </div>
              </div>

              {/* Temperature Unit */}
              <div>
                <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-4 flex items-center">
                  <Thermometer className="h-5 w-5 mr-2" />
                  Temperature Unit
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => handleUnitChange('metric')}
                    className={`p-3 rounded-2xl border transition-all duration-200 ${
                      unit === 'metric'
                        ? 'bg-blue-500 border-blue-500 text-white'
                        : 'neomorphic-card text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700'
                    }`}
                  >
                    <div className="text-center">
                      <div className="text-lg font-semibold">°C</div>
                      <div className="text-sm opacity-80">Celsius</div>
                    </div>
                  </button>
                  <button
                    onClick={() => handleUnitChange('imperial')}
                    className={`p-3 rounded-2xl border transition-all duration-200 ${
                      unit === 'imperial'
                        ? 'bg-blue-500 border-blue-500 text-white'
                        : 'neomorphic-card text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700'
                    }`}
                  >
                    <div className="text-center">
                      <div className="text-lg font-semibold">°F</div>
                      <div className="text-sm opacity-80">Fahrenheit</div>
                    </div>
                  </button>
                </div>
              </div>

              {/* Auto Update */}
              <div>
                <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-4 flex items-center">
                  <RefreshCw className="h-5 w-5 mr-2" />
                  Auto Update
                </h3>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-slate-600 dark:text-slate-400 block">Automatic Updates</span>
                    <span className="text-slate-500 dark:text-slate-500 text-sm">
                      Refresh weather data automatically
                    </span>
                  </div>
                  <button
                    onClick={handleAutoUpdateToggle}
                    className="flex items-center"
                  >
                    {autoUpdate ? (
                      <ToggleRight className="h-6 w-6 text-blue-500" />
                    ) : (
                      <ToggleLeft className="h-6 w-6 text-slate-400" />
                    )}
                  </button>
                </div>
              </div>

              {/* Update Interval */}
              {autoUpdate && (
                <div>
                  <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-4 flex items-center">
                    <Clock className="h-5 w-5 mr-2" />
                    Update Interval
                  </h3>
                  <div className="grid grid-cols-3 gap-2">
                    {[5, 10, 15].map((interval) => (
                      <button
                        key={interval}
                        onClick={() => handleIntervalChange(interval)}
                        className={`p-3 rounded-2xl border transition-all duration-200 ${
                          updateInterval === interval
                            ? 'bg-blue-500 border-blue-500 text-white'
                            : 'neomorphic-card text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700'
                        }`}
                      >
                        <div className="text-center">
                          <div className="font-semibold">{interval}m</div>
                        </div>
                      </button>
                    ))}
                  </div>
                  <p className="text-slate-500 dark:text-slate-500 text-sm mt-2">
                    Weather data will update every {updateInterval} minutes
                  </p>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-slate-200 dark:border-slate-700">
              <button
                onClick={() => setIsOpen(false)}
                className="w-full weather-button-primary"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Settings;
