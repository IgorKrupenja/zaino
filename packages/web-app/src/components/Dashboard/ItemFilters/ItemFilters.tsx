import deepEqual from 'fast-deep-equal/react';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  itemFiltersInitialState,
  ItemSortOption,
  resetItemFilters,
  setItemCategoryFilter,
  setItemLabelsFilter,
  setItemTextFilter,
  sortItemsBy,
} from '../../../state/slices/itemsFilters';
import { CollectionSortOption } from '../../../state/collectionSettings';
import { RootState } from '../../../state/store';
import { Button } from '../../Common/Controls/Button';
import { Input } from '../../Common/Controls/Input';
import { DropdownIcon } from '../../Common/Icons/DropdownIcon';
import { FilterReset } from '../../Common/Filters/FilterReset';
import { CategorySelect } from '../../Common/Selects/CategorySelect';
import { LabelSelect } from '../../Common/Selects/LabelSelect';
import { SortSelect } from '../../Common/Selects/SortSelect';
import { FiltersWrapper } from '../../Common/Filters/FiltersWrapper';
import { Row } from '../../Common/Wrappers/Row';

export const ItemFilters = () => {
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

  const handleCategoryChange = (categoryId: string) => {
    if (categoryId === filters.category) {
      // reset category filter if user clicks on a category that is already selected
      setFilters({ ...filters, category: undefined });
      setTimeout(() => dispatch(setItemCategoryFilter(undefined)), 1);
    } else {
      // set category filter normally
      setFilters({ ...filters, category: categoryId });
      setTimeout(() => dispatch(setItemCategoryFilter(categoryId)), 1);
    }
  };

  const handleSortChange = (value: string) => {
    const sortBy = value as ItemSortOption;
    setFilters({ ...filters, sortBy });
    // setTimeout to prevent UI freezing on slow PCs
    setTimeout(() => dispatch(sortItemsBy(sortBy)), 15);
  };

  return (
    <FiltersWrapper>
      <Row className="row-wrapper--full-width">
        {/* Name */}
        <Input
          className="input--grow input--search"
          placeholder="Search items"
          onChange={e => {
            e.persist();
            setFilters({ ...filters, text: e.target.value });
          }}
          value={filters.text}
        />
        {/* Category */}
        <CategorySelect
          selectedCategoryId={filters.category}
          headerText="Filter by category"
          onChange={handleCategoryChange}
        >
          <Button className="button--white">
            Categories
            <DropdownIcon />
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
            <DropdownIcon />
          </Button>
        </LabelSelect>
        {/* Sort */}
        <SortSelect
          sortOptions={ItemSortOption}
          onChange={handleSortChange}
          selectedOption={filters.sortBy}
          hiddenOption={CollectionSortOption.lastSortOrder}
        />
      </Row>
      {/* Clear filters */}
      <FilterReset isFiltering={isFiltering} onClick={() => dispatch(resetItemFilters())}>
        Clear search, filters and sort
      </FilterReset>
    </FiltersWrapper>
  );
};
