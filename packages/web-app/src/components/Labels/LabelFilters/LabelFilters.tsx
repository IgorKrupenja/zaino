import deepEqual from 'fast-deep-equal/react';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  resetLabelFilters,
  setLabelTextFilter,
  sortLabelsBy,
} from '../../../state/slices/labelsFilters';
import {
  collectionFiltersInitialState,
  CollectionSortOption,
} from '../../../state/collectionSettings';
import { RootState } from '../../../state/store';
import { Input } from '../../Common/Controls/Input';
import { FilterReset } from '../../Common/Filters/FilterReset';
import { SortSelect } from '../../Common/Selects/SortSelect';
import { FiltersWrapper } from '../../Common/Filters/FiltersWrapper';
import { Row } from '../../Common/Wrappers/Row';

export const LabelFilters = () => {
  const dispatch = useDispatch();
  const selectedFilters = useSelector((state: RootState) => state.labelsFilters);
  const [filters, setFilters] = useState(selectedFilters);
  const [isFiltering, setIsFiltering] = useState(false);

  useEffect(() => {
    setIsFiltering(
      !deepEqual(filters, collectionFiltersInitialState) &&
        // also hide filter reset if sorting by last sort order
        // see comments in labels slice for saveSortOrder
        !deepEqual(filters, {
          ...collectionFiltersInitialState,
          sortBy: CollectionSortOption.lastSortOrder,
        })
    );
  }, [filters]);

  // set filters if changed externally in FilterReset
  useEffect(() => setFilters(selectedFilters), [selectedFilters]);

  const firstUpdate = useRef(true);
  useEffect(() => {
    // this is needed to prevent setLabelTextFilter running uselessly when component mounts
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    // setTimeout prevents UI freezes when typing
    const textFilterTimeout = setTimeout(() => dispatch(setLabelTextFilter(filters.text)), 200);
    return () => clearTimeout(textFilterTimeout);
  }, [filters.text, dispatch]);

  const handleSortChange = (value: string) => {
    const sortBy = value as CollectionSortOption;
    setFilters({ ...filters, sortBy });
    // setTimeout to prevent UI freezing on slow PCs
    setTimeout(() => dispatch(sortLabelsBy(sortBy)), 1);
  };

  return (
    <FiltersWrapper>
      <Row className="row-wrapper--full-width">
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
          sortOptions={CollectionSortOption}
          selectedOption={filters.sortBy}
          hiddenOption={CollectionSortOption.lastSortOrder}
          onChange={handleSortChange}
        />
      </Row>
      <FilterReset isFiltering={isFiltering} onClick={() => dispatch(resetLabelFilters())}>
        Clear search and sort
      </FilterReset>
    </FiltersWrapper>
  );
};
