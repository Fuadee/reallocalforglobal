import React from 'react';
import './FilterBar.css';

function TagFilters({ tags, selectedTags, onToggle }) {
  if (!tags.length) {
    return null;
  }

  return (
    <div className="filter-row" aria-label="Tag filters">
      <div className="filter-row-title">Tags</div>
      <div className="filter-row-scroll">
        {tags.map((tag) => {
          const active = selectedTags.includes(tag);
          return (
            <button
              key={tag}
              type="button"
              className={`filter-chip filter-chip--outline ${active ? 'filter-chip--active' : ''}`}
              onClick={() => onToggle(tag)}
            >
              {tag}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default TagFilters;
