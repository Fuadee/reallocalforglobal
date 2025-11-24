import React from 'react';
import './FilterBar.css';

function GroupFilters({ groups, selectedGroup, onSelect }) {
  return (
    <div className="filter-row" aria-label="Group filters">
      <div className="filter-row-title">Groups</div>
      <div className="filter-row-scroll">
        {groups.map((group) => (
          <button
            key={group}
            type="button"
            className={`filter-chip filter-chip--micro ${selectedGroup === group ? 'filter-chip--active' : ''}`}
            onClick={() => onSelect(group)}
          >
            {group}
          </button>
        ))}
      </div>
    </div>
  );
}

export default GroupFilters;
