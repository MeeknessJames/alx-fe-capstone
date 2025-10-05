import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { getCurrentWeather, getWeatherForecast, getWeatherByCoords } from '../services/weatherService';

// Initial state
const initialState = {
  currentWeather: null,
  forecast: [],
  loading: false,
  error: null,
  unit: 'metric', // 'metric' or 'imperial'
  theme: 'light', // 'light' or 'dark'
  recentSearches: [],
  lastUpdate: null,
  autoUpdate: true,
  updateInterval: 5, // minutes
};

// Action types
const ActionTypes = {
  SET_LOADING: 'SET_LOADING',
  SET_CURRENT_WEATHER: 'SET_CURRENT_WEATHER',
  SET_FORECAST: 'SET_FORECAST',
  SET_ERROR: 'SET_ERROR',
  SET_UNIT: 'SET_UNIT',
  SET_THEME: 'SET_THEME',
  ADD_RECENT_SEARCH: 'ADD_RECENT_SEARCH',
  CLEAR_RECENT_SEARCHES: 'CLEAR_RECENT_SEARCHES',
  SET_LAST_UPDATE: 'SET_LAST_UPDATE',
  SET_AUTO_UPDATE: 'SET_AUTO_UPDATE',
  SET_UPDATE_INTERVAL: 'SET_UPDATE_INTERVAL',
  CLEAR_ERROR: 'CLEAR_ERROR',
};

// Reducer function
const weatherReducer = (state, action) => {
  switch (action.type) {
    case ActionTypes.SET_LOADING:
      return {
        ...state,
        loading: action.payload,
        error: action.payload ? null : state.error,
      };

    case ActionTypes.SET_CURRENT_WEATHER:
      return {
        ...state,
        currentWeather: action.payload,
        loading: false,
        error: null,
        lastUpdate: new Date().toISOString(),
      };

    case ActionTypes.SET_FORECAST:
      return {
        ...state,
        forecast: action.payload,
        loading: false,
        error: null,
      };

    case ActionTypes.SET_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    case ActionTypes.SET_UNIT:
      return {
        ...state,
        unit: action.payload,
      };

    case ActionTypes.SET_THEME:
      return {
        ...state,
        theme: action.payload,
      };

    case ActionTypes.ADD_RECENT_SEARCH:
      const newSearch = action.payload;
      const existingSearches = state.recentSearches.filter(
        search => search.city.toLowerCase() !== newSearch.city.toLowerCase()
      );
      return {
        ...state,
        recentSearches: [newSearch, ...existingSearches].slice(0, 5), // Keep only 5 recent searches
      };

    case ActionTypes.CLEAR_RECENT_SEARCHES:
      return {
        ...state,
        recentSearches: [],
      };

    case ActionTypes.SET_LAST_UPDATE:
      return {
        ...state,
        lastUpdate: action.payload,
      };

    case ActionTypes.SET_AUTO_UPDATE:
      return {
        ...state,
        autoUpdate: action.payload,
      };

    case ActionTypes.SET_UPDATE_INTERVAL:
      return {
        ...state,
        updateInterval: action.payload,
      };

    case ActionTypes.CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

// Create context
const WeatherContext = createContext();

// Provider component
export const WeatherProvider = ({ children }) => {
  const [state, dispatch] = useReducer(weatherReducer, initialState);

  // Load saved preferences from localStorage on mount
  useEffect(() => {
    const savedUnit = localStorage.getItem('weather-unit');
    const savedTheme = localStorage.getItem('weather-theme');
    const savedRecentSearches = localStorage.getItem('weather-recent-searches');
    const savedAutoUpdate = localStorage.getItem('weather-auto-update');
    const savedUpdateInterval = localStorage.getItem('weather-update-interval');

    if (savedUnit) {
      dispatch({ type: ActionTypes.SET_UNIT, payload: savedUnit });
    }
    if (savedTheme) {
      dispatch({ type: ActionTypes.SET_THEME, payload: savedTheme });
    }
    if (savedRecentSearches) {
      try {
        const searches = JSON.parse(savedRecentSearches);
        searches.forEach(search => {
          dispatch({ type: ActionTypes.ADD_RECENT_SEARCH, payload: search });
        });
      } catch (error) {
        console.error('Error parsing recent searches:', error);
      }
    }
    if (savedAutoUpdate !== null) {
      dispatch({ type: ActionTypes.SET_AUTO_UPDATE, payload: savedAutoUpdate === 'true' });
    }
    if (savedUpdateInterval) {
      dispatch({ type: ActionTypes.SET_UPDATE_INTERVAL, payload: parseInt(savedUpdateInterval) });
    }
  }, []);

  // Save preferences to localStorage when they change
  useEffect(() => {
    localStorage.setItem('weather-unit', state.unit);
  }, [state.unit]);

  useEffect(() => {
    localStorage.setItem('weather-theme', state.theme);
  }, [state.theme]);

  useEffect(() => {
    localStorage.setItem('weather-recent-searches', JSON.stringify(state.recentSearches));
  }, [state.recentSearches]);

  useEffect(() => {
    localStorage.setItem('weather-auto-update', state.autoUpdate.toString());
  }, [state.autoUpdate]);

  useEffect(() => {
    localStorage.setItem('weather-update-interval', state.updateInterval.toString());
  }, [state.updateInterval]);

  // Auto-update weather data
  useEffect(() => {
    if (!state.autoUpdate || !state.currentWeather) return;

    const interval = setInterval(() => {
      if (state.currentWeather) {
        fetchWeatherByCity(state.currentWeather.city);
      }
    }, state.updateInterval * 60 * 1000); // Convert minutes to milliseconds

    return () => clearInterval(interval);
  }, [state.autoUpdate, state.updateInterval, state.currentWeather]);

  // Action creators
  const fetchWeatherByCity = async (city) => {
    dispatch({ type: ActionTypes.SET_LOADING, payload: true });
    
    try {
      const [currentWeather, forecast] = await Promise.all([
        getCurrentWeather(city, state.unit),
        getWeatherForecast(city, state.unit),
      ]);

      dispatch({ type: ActionTypes.SET_CURRENT_WEATHER, payload: currentWeather });
      dispatch({ type: ActionTypes.SET_FORECAST, payload: forecast });
      
      // Add to recent searches
      dispatch({
        type: ActionTypes.ADD_RECENT_SEARCH,
        payload: {
          city: currentWeather.city,
          country: currentWeather.country,
          timestamp: new Date().toISOString(),
        },
      });
    } catch (error) {
      dispatch({ type: ActionTypes.SET_ERROR, payload: error.message });
    }
  };

  const fetchWeatherByLocation = async () => {
    dispatch({ type: ActionTypes.SET_LOADING, payload: true });
    
    try {
      if (!navigator.geolocation) {
        throw new Error('Geolocation is not supported by this browser.');
      }

      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 300000, // 5 minutes
        });
      });

      const { latitude, longitude } = position.coords;
      const currentWeather = await getWeatherByCoords(latitude, longitude, state.unit);
      const forecast = await getWeatherForecast(`${currentWeather.city},${currentWeather.country}`, state.unit);

      dispatch({ type: ActionTypes.SET_CURRENT_WEATHER, payload: currentWeather });
      dispatch({ type: ActionTypes.SET_FORECAST, payload: forecast });
      
      // Add to recent searches
      dispatch({
        type: ActionTypes.ADD_RECENT_SEARCH,
        payload: {
          city: currentWeather.city,
          country: currentWeather.country,
          timestamp: new Date().toISOString(),
        },
      });
    } catch (error) {
      dispatch({ type: ActionTypes.SET_ERROR, payload: error.message });
    }
  };

  const setUnit = (unit) => {
    dispatch({ type: ActionTypes.SET_UNIT, payload: unit });
    
    // Refetch current weather with new unit if we have a current city
    if (state.currentWeather) {
      fetchWeatherByCity(state.currentWeather.city);
    }
  };

  const setTheme = (theme) => {
    dispatch({ type: ActionTypes.SET_THEME, payload: theme });
  };

  const clearError = () => {
    dispatch({ type: ActionTypes.CLEAR_ERROR });
  };

  const clearRecentSearches = () => {
    dispatch({ type: ActionTypes.CLEAR_RECENT_SEARCHES });
  };

  const setAutoUpdate = (autoUpdate) => {
    dispatch({ type: ActionTypes.SET_AUTO_UPDATE, payload: autoUpdate });
  };

  const setUpdateInterval = (interval) => {
    dispatch({ type: ActionTypes.SET_UPDATE_INTERVAL, payload: interval });
  };

  const refreshWeather = () => {
    if (state.currentWeather) {
      fetchWeatherByCity(state.currentWeather.city);
    }
  };

  const value = {
    ...state,
    fetchWeatherByCity,
    fetchWeatherByLocation,
    setUnit,
    setTheme,
    clearError,
    clearRecentSearches,
    setAutoUpdate,
    setUpdateInterval,
    refreshWeather,
  };

  return (
    <WeatherContext.Provider value={value}>
      {children}
    </WeatherContext.Provider>
  );
};

// Custom hook to use the context
export const useWeather = () => {
  const context = useContext(WeatherContext);
  if (!context) {
    throw new Error('useWeather must be used within a WeatherProvider');
  }
  return context;
};
