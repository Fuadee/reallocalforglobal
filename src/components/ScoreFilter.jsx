import React from 'react';
import './FilterBar.css';

const OPTIONS = [
  { key: 'star-5', label: '★★★★★' },
  { key: 'star-4', label: '★★★★☆' },
  { key: 'star-3', label: '★★★☆☆' },
  { key: 'star-2', label: '★★☆☆☆' },
  { key: 'star-1', label: '★☆☆☆☆' },
];

function ScoreFilter({ sortOption, onChangeSort }) {
  return (
    <div className="filter-row" aria-label="Score filters">
      <div className="filter-row-title">Score</div>
      <div className="filter-row-scroll filter-row-scroll--tight">
        {OPTIONS.map((option) => (
          <button
            key={option.key}
            type="button"
            className={`filter-chip filter-chip--outline filter-chip--micro ${
              sortOption === option.key ? 'filter-chip--active' : ''
            }`}
            onClick={() => onChangeSort(option.key)}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default ScoreFilter;
