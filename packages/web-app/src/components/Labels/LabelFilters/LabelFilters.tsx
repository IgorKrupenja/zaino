import deepEqual from 'fast-deep-equal/react';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  labelFiltersInitialState,
  LabelSortOption,
  resetLabelFilters,
  setLabelTextFilter,
  sortLabelsBy,
} from '../../../state/slices/labelsFilters';
import { RootState } from '../../../state/store';
import { Input } from '../../Controls/Input';
import { FilterReset } from '../../Misc/FilterReset';
import { SortSelect } from '../../Selects/SortSelect';
import { FiltersWrapper } from '../../Wrappers/FiltersWrapper';
import { RowWrapper } from '../../Wrappers/RowWrapper';

export const LabelFilters = () => {
  const dispatch = useDispatch();
  const selectedFilters = useSelector((state: RootState) => state.labelsFilters);
  const [filters, setFilters] = useState(selectedFilters);
  const [isFiltering, setIsFiltering] = useState(false);

  useEffect(() => {
    setIsFiltering(
      !deepEqual(filters, labelFiltersInitialState) &&
        // also hide filter reset if sorting by last sort order
        // see comments in labels slice for saveSortOrder
        !deepEqual(filters, { ...labelFiltersInitialState, sortBy: LabelSortOption.lastSortOrder })
    );
  }, [filters]);

  // set filters if changed externally in FilterReset
  useEffect(() => setFilters(selectedFilters), [selectedFilters]);

  const firstUpdate = useRef(true);
  useEffect(() => {
    // this is needed to prevent setItemsTextFilter running uselessly when component mounts
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    // setTimeout prevents UI freezes when typing
    const textFilterTimeout = setTimeout(() => dispatch(setLabelTextFilter(filters.text)), 200);
    return () => clearTimeout(textFilterTimeout);
  }, [filters.text, dispatch]);

  const handleSortChange = (value: string) => {
    const sortBy = value as LabelSortOption;
    setFilters({ ...filters, sortBy });
    // setTimeout to prevent UI freezing on slow PCs
    setTimeout(() => dispatch(sortLabelsBy(sortBy)), 1);
  };

  return (
    <FiltersWrapper>
      <RowWrapper className="row-wrapper--full-width">
        <Input
          className="input--grow input--search"
          placeholder="Search labels"
          onChange={e => {
            e.persist();
            setFilters({ ...filters, text: e.target.value });
          }}
          value={filters.text}
        />
        <SortSelect
          sortOptions={LabelSortOption}
          selectedOption={filters.sortBy}
          hiddenOption={LabelSortOption.lastSortOrder}
          onChange={handleSortChange}
        />
      </RowWrapper>
      <FilterReset isFiltering={isFiltering} onClick={() => dispatch(resetLabelFilters())}>
        Clear search and sort
      </FilterReset>
    </FiltersWrapper>
  );
};
