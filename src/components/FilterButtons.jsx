import "./FilterBar.css";

function FilterButtons({ onFilter, selectedCategory = "all" }) {
  return (
    <div className="filter-bar">
      <button
        className={`filter-btn${selectedCategory === "all" ? " active" : ""}`}
        onClick={() => onFilter?.("all")}
      >
        All
      </button>
      <button
        className={`filter-btn${selectedCategory === "beach" ? " active" : ""}`}
        onClick={() => onFilter?.("beach")}
      >
        Beach
      </button>
      <button
        className={`filter-btn${selectedCategory === "island" ? " active" : ""}`}
        onClick={() => onFilter?.("island")}
      >
        Island
      </button>
      <button
        className={`filter-btn${selectedCategory === "snorkel" ? " active" : ""}`}
        onClick={() => onFilter?.("snorkel")}
      >
        Snorkel
      </button>
      <button
        className={`filter-btn${selectedCategory === "sunset" ? " active" : ""}`}
        onClick={() => onFilter?.("sunset")}
      >
        Sunset
      </button>
    </div>
  );
}

export default FilterButtons;
