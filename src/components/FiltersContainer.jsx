import React from 'react';
import GroupFilters from './GroupFilters';
import ScoreFilter from './ScoreFilter';
import SpecialFilters from './SpecialFilters';
import './FilterBar.css';

function FiltersContainer({
  groups,
  selectedGroup,
  onSelectGroup,
  specialTags,
  selectedTags,
  onToggleTag,
  selectedStars,
  onToggleStar,
  containerRef,
}) {
  return (
    <div ref={containerRef} className="filters-container" aria-label="Krabi map filters">
      <div className="filters-surface">
        <GroupFilters groups={groups} selectedGroup={selectedGroup} onSelect={onSelectGroup} />
        <ScoreFilter selectedStars={selectedStars} onToggleStar={onToggleStar} />
        <SpecialFilters
          specialTags={specialTags}
          selectedTags={selectedTags}
          onToggleTag={onToggleTag}
        />
      </div>
    </div>
  );
}

export default FiltersContainer;
