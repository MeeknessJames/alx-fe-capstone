import React, { useState, useRef, useEffect } from 'react';
import { Search, MapPin, Clock, X } from 'lucide-react';
import { useWeather } from '../contexts/WeatherContext';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showRecentSearches, setShowRecentSearches] = useState(false);
  const searchRef = useRef(null);
  const recentSearchesRef = useRef(null);

  const {
    fetchWeatherByCity,
    fetchWeatherByLocation,
    recentSearches,
    loading,
    clearRecentSearches,
  } = useWeather();

  // Handle search submission
  const handleSearch = async (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      await fetchWeatherByCity(searchTerm.trim());
      setSearchTerm('');
      setShowRecentSearches(false);
    }
  };

  // Handle recent search click
  const handleRecentSearchClick = async (search) => {
    await fetchWeatherByCity(search.city);
    setShowRecentSearches(false);
  };

  // Handle geolocation
  const handleLocationClick = async () => {
    await fetchWeatherByLocation();
    setShowRecentSearches(false);
  };

  // Close recent searches when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target) &&
        recentSearchesRef.current &&
        !recentSearchesRef.current.contains(event.target)
      ) {
        setShowRecentSearches(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Format timestamp for recent searches
  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) {
      return 'Just now';
    } else if (diffInHours < 24) {
      return `${diffInHours}h ago`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return `${diffInDays}d ago`;
    }
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto" ref={searchRef}>
      {/* Search Form */}
      <form onSubmit={handleSearch} className="relative">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-500 dark:text-slate-400 h-5 w-5" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onFocus={() => setShowRecentSearches(true)}
              placeholder="Search for a city..."
              className="weather-input pl-12 pr-20 text-lg"
              disabled={loading}
            />
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex space-x-2">
              <button
                type="button"
                onClick={handleLocationClick}
                disabled={loading}
                className="p-2 rounded-lg weather-button disabled:opacity-50"
                title="Use current location"
              >
                <MapPin className="h-4 w-4 text-slate-600 dark:text-slate-400" />
              </button>
              <button
                type="submit"
                disabled={loading || !searchTerm.trim()}
                className="search-button"
              >
                {loading ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-slate-600 dark:border-slate-400"></div>
                ) : (
                  'Search'
                )}
              </button>
            </div>
          </div>
      </form>

      {/* Recent Searches Dropdown */}
      {showRecentSearches && recentSearches.length > 0 && (
        <div
          ref={recentSearchesRef}
          className="absolute top-full left-0 right-0 mt-2 weather-card p-4 z-50"
        >
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-slate-800 dark:text-slate-200 font-medium flex items-center">
              <Clock className="h-4 w-4 mr-2" />
              Recent Searches
            </h3>
            <button
              onClick={clearRecentSearches}
              className="text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors duration-200"
              title="Clear all recent searches"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          
          <div className="space-y-2">
            {recentSearches.map((search, index) => (
              <button
                key={index}
                onClick={() => handleRecentSearchClick(search)}
                className="w-full text-left p-3 rounded-lg neomorphic-card hover:bg-slate-50 dark:hover:bg-slate-700 transition-all duration-200 group"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-800 dark:text-slate-200 font-medium">
                      {search.city}
                      {search.country && (
                        <span className="text-slate-600 dark:text-slate-400 ml-1">({search.country})</span>
                      )}
                    </p>
                    <p className="text-slate-500 dark:text-slate-500 text-sm">
                      {formatTimestamp(search.timestamp)}
                    </p>
                  </div>
                  <MapPin className="h-4 w-4 text-slate-400 dark:text-slate-500 group-hover:text-slate-600 dark:group-hover:text-slate-300 transition-colors duration-200" />
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Quick Search Suggestions */}
      {showRecentSearches && recentSearches.length === 0 && (
        <div
          ref={recentSearchesRef}
          className="absolute top-full left-0 right-0 mt-2 weather-card p-4 z-50"
        >
          <div className="text-center text-slate-600 dark:text-slate-400">
            <Clock className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p>No recent searches</p>
            <p className="text-sm mt-1">Search for a city to see it here</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
