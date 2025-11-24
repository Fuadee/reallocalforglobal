import React, { useEffect } from 'react';
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
  useEffect(() => {
    if (!containerRef?.current) return undefined;

    const stopPropagation = (event) => {
      event.stopPropagation();
    };

    const node = containerRef.current;
    const events = ['touchstart', 'touchmove', 'touchend', 'pointerdown', 'pointerup', 'click'];

    events.forEach((eventName) => node.addEventListener(eventName, stopPropagation));

    return () => {
      events.forEach((eventName) => node.removeEventListener(eventName, stopPropagation));
    };
  }, [containerRef]);

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
