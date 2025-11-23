const FILTERS = [
  { key: 'all', label: 'All' },
  { key: 'beach', label: 'Beach' },
  { key: 'island', label: 'Island' },
  { key: 'snorkel', label: 'Snorkel' },
  { key: 'sunset', label: 'Sunset' }
];

function FilterButtons({ selectedFilter, onFilterChange }) {
  return (
    <div className="sticky top-[76px] z-[5000] w-full">
      <div className="pointer-events-auto flex flex-wrap gap-3 rounded-full border border-slate-200 bg-white/95 p-2 shadow-lg shadow-slate-200/70 backdrop-blur">
        {FILTERS.map((filter) => {
          const isActive = selectedFilter === filter.key;
          return (
            <button
              key={filter.key}
              type="button"
              onClick={() => onFilterChange?.(filter.key)}
              className={`pointer-events-auto rounded-full px-4 py-2 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${
                isActive
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-200/80 focus-visible:outline-blue-500'
                  : 'bg-white text-slate-700 ring-1 ring-slate-200 hover:bg-slate-50 focus-visible:outline-blue-500'
              }`}
            >
              {filter.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default FilterButtons;
