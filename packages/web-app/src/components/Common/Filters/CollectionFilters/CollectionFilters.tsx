import deepEqual from 'fast-deep-equal/react';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  collectionFiltersInitialState,
  CollectionSortOption,
} from '../../../../state/collectionSettings';
import { RootState } from '../../../../state/store';
import { Input } from '../../Controls/Input';
import { FilterReset } from '../FilterReset';
import { SortSelect } from '../../Selects/SortSelect';
import { FiltersWrapper } from '../FiltersWrapper';
import { Row } from '../../Wrappers/Row';
import { ActionCreatorWithoutPayload, ActionCreatorWithPayload } from '@reduxjs/toolkit';

type CollectionFiltersProps = {
  textFilterPlaceholder: string;
  setTextFilter: ActionCreatorWithPayload<string, string>;
  sort: ActionCreatorWithPayload<CollectionSortOption, string>;
  resetFilters: ActionCreatorWithoutPayload<string>;
};

export const CollectionFilters = ({
  sort,
  setTextFilter,
  resetFilters,
  textFilterPlaceholder,
}: CollectionFiltersProps) => {
  const dispatch = useDispatch();
  const selectedFilters = useSelector((state: RootState) => state.categoriesFilters);
  const [filters, setFilters] = useState(selectedFilters);
  const [isFiltering, setIsFiltering] = useState(false);

  useEffect(() => {
    setIsFiltering(
      !deepEqual(filters, collectionFiltersInitialState) &&
        // also hide filter reset if sorting by last sort order
        // see comments in categories slice for saveSortOrder
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
    // this is needed to prevent setCategoryTextFilter running uselessly when component mounts
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    // setTimeout prevents UI freezes when typing
    const textFilterTimeout = setTimeout(() => dispatch(setTextFilter(filters.text)), 200);
    return () => clearTimeout(textFilterTimeout);
  }, [filters.text, dispatch, setTextFilter]);

  const handleSortChange = (value: string) => {
    const sortBy = value as CollectionSortOption;
    setFilters({ ...filters, sortBy });
    // setTimeout to prevent UI freezing on slow PCs
    setTimeout(() => dispatch(sort(sortBy)), 1);
  };

  return (
    <FiltersWrapper>
      <Row className="row-wrapper--full-width">
        <Input
          className="input--grow input--search"
          placeholder={textFilterPlaceholder}
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
      <FilterReset isFiltering={isFiltering} onClick={() => dispatch(resetFilters())}>
        Clear search and sort
      </FilterReset>
    </FiltersWrapper>
  );
};
