import "./FilterButtons.css";

function FilterButtons({ onFilter }) {
  return (
    <div className="filter-buttons-wrapper">
      <button className="filter-button" onClick={() => onFilter?.("all")}>All</button>
      <button className="filter-button" onClick={() => onFilter?.("beach")}>Beach</button>
      <button className="filter-button" onClick={() => onFilter?.("island")}>Island</button>
      <button className="filter-button" onClick={() => onFilter?.("snorkel")}>Snorkel</button>
      <button className="filter-button" onClick={() => onFilter?.("sunset")}>Sunset</button>
    </div>
  );
}

export default FilterButtons;
