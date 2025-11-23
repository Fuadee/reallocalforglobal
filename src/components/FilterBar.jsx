import React from 'react';
import './FilterBar.css';

const FILTERS = [
  { key: 'all', label: 'All' },
  { key: 'beach', label: 'Beach' },
  { key: 'island', label: 'Island' },
  { key: 'snorkel', label: 'Snorkel' },
  { key: 'sunset', label: 'Sunset' },
];

function FilterBar({ activeType = 'all', onChange }) {
  const handleClick = (type) => {
    if (typeof onChange === 'function') {
      onChange(type);
    }
  };

  return (
    <div className="filter-bar">
      <div className="filter-bar-inner">
        {FILTERS.map((filter) => (
          <button
            key={filter.key}
            type="button"
            data-type={filter.key}
            className={`filter-button ${activeType === filter.key ? 'active' : ''}`}
            onClick={() => handleClick(filter.key)}
          >
            {filter.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default FilterBar;
