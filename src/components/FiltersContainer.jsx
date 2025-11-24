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
  sortOption,
  onChangeSort,
}) {
  return (
    <div className="filters-container" aria-label="Krabi map filters">
      <div className="filters-surface">
        <GroupFilters groups={groups} selectedGroup={selectedGroup} onSelect={onSelectGroup} />
        <ScoreFilter sortOption={sortOption} onChangeSort={onChangeSort} />
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
