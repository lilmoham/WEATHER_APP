import React, { useState, useRef, useEffect } from 'react';
import './SearchBar.css';

const SearchBar = ({ onSearch, onCitySelect, isLoading, searchResults = [] }) => {
  const [query, setQuery] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const searchRef = useRef(null);
  const debounceRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    setSelectedIndex(-1);

    // Clear previous debounce
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    // Debounce search
    debounceRef.current = setTimeout(() => {
      if (value.trim().length > 2) {
        onSearch(value);
        setShowResults(true);
      } else {
        setShowResults(false);
      }
    }, 300);
  };

  const handleKeyDown = (e) => {
    if (!showResults || searchResults.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < searchResults.length - 1 ? prev + 1 : 0
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev > 0 ? prev - 1 : searchResults.length - 1
        );
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0) {
          handleCitySelect(searchResults[selectedIndex]);
        }
        break;
      case 'Escape':
        setShowResults(false);
        setSelectedIndex(-1);
        break;
      default:
        break;
    }
  };

  const handleCitySelect = (city) => {
    setQuery(city.displayName);
    setShowResults(false);
    setSelectedIndex(-1);
    onCitySelect(city);
  };

  const clearSearch = () => {
    setQuery('');
    setShowResults(false);
    setSelectedIndex(-1);
  };

  return (
    <div className="search-container" ref={searchRef}>
      <div className="search-box">
        <div className="search-input-wrapper">
          <input
            type="text"
            className="search-input"
            placeholder="Search for a city..."
            value={query}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onFocus={() => query.length > 2 && setShowResults(true)}
          />
          {query && (
            <button className="clear-search" onClick={clearSearch}>
              ×
            </button>
          )}
          {isLoading && (
            <div className="search-loading">
              <div className="search-spinner"></div>
            </div>
          )}
        </div>
        
        {showResults && searchResults.length > 0 && (
          <div className="search-results">
            {searchResults.map((city, index) => (
              <button
                key={`${city.coordinates.lat}-${city.coordinates.lon}`}
                className={`search-result-item ${
                  index === selectedIndex ? 'selected' : ''
                }`}
                onClick={() => handleCitySelect(city)}
                onMouseEnter={() => setSelectedIndex(index)}
              >
                <div className="city-name">{city.name}</div>
                <div className="city-details">
                  {city.state && `${city.state}, `}{city.country}
                </div>
              </button>
            ))}
          </div>
        )}
        
        {showResults && query.length > 2 && searchResults.length === 0 && !isLoading && (
          <div className="search-results">
            <div className="no-results">No cities found</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
