import React from 'react';
import './SearchWidget.css';

const SearchWidget = () => {
  return (
    <div className="search-widget">
      <div className="search-tabs">
        <button className="tab-button active">✈️ Flights</button>
        {/* Add other tabs if needed, e.g., <button className="tab-button">🏨 Hotels</button> */}
      </div>
      <div className="search-inputs">
        <div className="input-group">
          <label>Origin</label>
          <input type="text" placeholder="New York" />
        </div>
        <div className="input-group">
          <label>Destination</label>
          <input type="text" placeholder="British Islands" />
        </div>
        <div className="input-group">
          <label>Departure</label>
          <input type="text" placeholder="15.24.2025" />
        </div>
        <div className="input-group">
          <label>Return</label>
          <input type="text" placeholder="15.24.2025" />
        </div>
        <button className="search-icon-button">
          <span className="search-icon">🔍</span>
        </button>
      </div>
    </div>
  );
};

export default SearchWidget;