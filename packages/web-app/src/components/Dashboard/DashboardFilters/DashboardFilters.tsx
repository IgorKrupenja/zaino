import deepEqual from 'fast-deep-equal/react';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DropdownIcon from '../../../images/icons/drop-down.svg';
import {
  itemFiltersInitialState,
  ItemSortOption,
  resetItemFilters,
  setItemCategoryFilter,
  setItemLabelsFilter,
  setItemTextFilter,
  sortItemsBy,
} from '../../../state/slices/itemsFilters';
import { LabelSortOption } from '../../../state/slices/labelsFilters';
import { RootState } from '../../../state/store';
import { Input } from '../../Controls/Input';
import { Button } from '../../misc/Button';
import { CloseButton } from '../../misc/CloseButton';
import { FilterReset } from '../../misc/FilterReset';
import { CategorySelect } from '../../Selects/CategorySelect';
import { LabelSelect } from '../../Selects/LabelSelect';
import { SortSelect } from '../../Selects/SortSelect';
import './style.scss';

export const DashboardFilters = () => {
  const dispatch = useDispatch();
  // better name?
  const selectedFilters = useSelector((state: RootState) => state.itemsFilters);
  const [filters, setFilters] = useState(selectedFilters);
  const [isFiltering, setIsFiltering] = useState(false);

  useEffect(() => {
    setIsFiltering(!deepEqual(filters, itemFiltersInitialState));
  }, [filters]);

  // update filters if changed externally by clicking on label/category inside ItemDetails
  // or in in FilterReset
  useEffect(() => setFilters(selectedFilters), [selectedFilters]);

  const firstUpdate = useRef(true);
  // useEffect to prevent UI freezes when typing in name filter
  useEffect(() => {
    // this is needed to prevent setItemsTextFilter running uselessly when component mounts
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    const textFilterTimeout = setTimeout(() => dispatch(setItemTextFilter(filters.text)), 200);
    return () => clearTimeout(textFilterTimeout);
  }, [filters.text, dispatch]);

  const handleCategoryChange = (category: string) => {
    if (category === filters.category) {
      // reset category filter if user clicks on a category that is already selected
      setFilters({ ...filters, category: undefined });
      setTimeout(() => dispatch(setItemCategoryFilter(undefined)), 1);
    } else {
      // set category filter normally
      setFilters({ ...filters, category });
      setTimeout(() => dispatch(setItemCategoryFilter(category)), 1);
    }
  };

  const handleSortChange = (value: string) => {
    const sortBy = value as ItemSortOption;
    setFilters({ ...filters, sortBy });
    // setTimeout to prevent UI freezing on slow PCs
    setTimeout(() => dispatch(sortItemsBy(sortBy)), 15);
  };

  return (
    <section className="dashboard-filters">
      {/* Name */}
      <Input
        onChange={e => {
          e.persist();
          setFilters({ ...filters, text: e.target.value });
        }}
        value={filters.text}
      />
      {/* Category */}
      <CategorySelect
        selectedCategoryName={filters.category}
        headerText="Filter by category"
        onChange={handleCategoryChange}
      >
        <Button className="button--white">
          Categories
          <DropdownIcon className="button--white__icon" />
        </Button>
      </CategorySelect>
      {/* Labels */}
      <LabelSelect
        labelIds={filters.labels}
        headerText="Filter by label"
        // setTimeout to prevent UI freezing on slow PCs
        onChange={labelIds => setTimeout(() => dispatch(setItemLabelsFilter(labelIds)), 15)}
      >
        <Button className="button--white">
          Labels
          <DropdownIcon className="button--white__icon" />
        </Button>
      </LabelSelect>
      {/* Sort */}
      <SortSelect
        sortOptions={ItemSortOption}
        onChange={handleSortChange}
        selectedOption={filters.sortBy}
        hiddenOption={LabelSortOption.lastSortOrder}
      />
      {/* Clear filters */}
      {isFiltering && (
        <FilterReset onClick={() => dispatch(resetItemFilters())}>
          <CloseButton />
          Clear search, filters and sort
        </FilterReset>
      )}
    </section>
  );
};
