import React from 'react';
import './FilterButtons.css';

const CATEGORIES = [
  { key: 'all', label: 'All' },
  { key: 'beach', label: 'Beach' },
  { key: 'island', label: 'Island' },
  { key: 'snorkel', label: 'Snorkel' },
  { key: 'sunset', label: 'Sunset' },
];

function FilterButtons({ selectedCategory, onSelect }) {
  return React.createElement(
    'div',
    { className: 'filter-buttons-layer', 'aria-label': 'Filter map points by category' },
    React.createElement(
      'div',
      { className: 'filter-buttons-shell' },
      CATEGORIES.map((category) =>
        React.createElement(
          'button',
          {
            key: category.key,
            type: 'button',
            className: `filter-button ${selectedCategory === category.key ? 'filter-button--active' : ''}`,
            onClick: () => onSelect?.(category.key),
          },
          category.label,
        ),
      ),
    ),
  );
}

export default FilterButtons;
export { CATEGORIES };
