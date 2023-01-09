import { ActionCreatorWithoutPayload, ActionCreatorWithPayload } from '@reduxjs/toolkit';
import deepEqual from 'fast-deep-equal/react';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { collectionFiltersInitialState } from '../../../../state/constants';
import { CollectionSortOption } from '../../../../state/enums';
import { RootState } from '../../../../state/store';
import { Row } from '../../containers/Row';
import { Input } from '../../controls/Input';
import { SortSelect } from '../../selects/SortSelect';
import { FilterReset } from '../FilterReset';
import { FiltersWrapper } from '../FiltersWrapper';

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
  const selectedFilters = useSelector((state: RootState) => state.categoryFilters);
  const [filters, setFilters] = useState(selectedFilters);
  const [isFiltering, setIsFiltering] = useState(false);

  useEffect(() => {
    setIsFiltering(
      !deepEqual(filters, collectionFiltersInitialState) &&
        // Hide filter reset if sorting by last sort order
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
          onChange={(e) => {
            e.persist();
            setFilters({ ...filters, text: e.target.value });
          }}
          placeholder={textFilterPlaceholder}
          value={filters.text}
        />
        <SortSelect
          hiddenOption={CollectionSortOption.lastSortOrder}
          onChange={handleSortChange}
          selectedOption={filters.sortBy}
          sortOptions={CollectionSortOption}
        />
      </Row>
      <FilterReset isFiltering={isFiltering} onClick={() => dispatch(resetFilters())}>
        Clear search and sort
      </FilterReset>
    </FiltersWrapper>
  );
};
