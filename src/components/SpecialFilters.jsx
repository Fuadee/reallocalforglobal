import React from 'react';
import './FilterBar.css';

function SpecialFilters({ specialTags, selectedTags, onToggleTag }) {
  return (
    <div className="filter-row" aria-label="Special filters">
      <div className="filter-row-title">Special</div>
      <div className="filter-row-scroll">
        {specialTags.map((tag) => {
          const active = selectedTags.includes(tag);
          return (
            <button
              key={tag}
              type="button"
              className={`filter-chip filter-chip--outline filter-chip--micro ${active ? 'filter-chip--active' : ''}`}
              onClick={() => onToggleTag(tag)}
            >
              {tag}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default SpecialFilters;
