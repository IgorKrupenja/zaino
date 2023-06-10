import deepEqual from 'fast-deep-equal/react';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { CollectionSortOption, ItemSortOption } from '../../../state/enums';
import {
  itemFiltersInitialState,
  resetItemFilters,
  setItemCategoryFilter,
  setItemLabelsFilter,
  setItemTextFilter,
  sortItemsBy,
} from '../../../state/slices/itemFiltersSlice';
import { RootState } from '../../../state/store';
import { Row } from '../../common/containers/Row';
import { Button } from '../../common/controls/Button';
import { Input } from '../../common/controls/Input';
import { FilterReset } from '../../common/filters/FilterReset';
import { FiltersWrapper } from '../../common/filters/FiltersWrapper';
import { DropdownIcon } from '../../common/icons/DropdownIcon';
import { CategorySelect } from '../../common/selects/CategorySelect';
import { LabelSelect } from '../../common/selects/LabelSelect';
import { SortSelect } from '../../common/selects/SortSelect';

export const ItemFilters = () => {
  const dispatch = useDispatch();
  // better name?
  const selectedFilters = useSelector((state: RootState) => state.itemFilters);
  const [filters, setFilters] = useState(selectedFilters);
  const [isFiltering, setIsFiltering] = useState(false);

  useEffect(() => {
    setIsFiltering(!deepEqual(filters, itemFiltersInitialState));
  }, [filters]);

  // Update filters if changed externally e.g. by clicking on label/category inside ItemDetails
  useEffect(() => setFilters(selectedFilters), [selectedFilters]);

  // TODO: Simple boolean?
  const firstUpdate = useRef(true);
  // useEffect to prevent UI freezes when typing in name filter
  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }

    const textFilterTimeout = setTimeout(() => dispatch(setItemTextFilter(filters.text)), 200);
    return () => clearTimeout(textFilterTimeout);
  }, [filters.text, dispatch]);

  const handleCategoryChange = (selectedCategoryId: string) => {
    const categoryId = selectedCategoryId === filters.categoryId ? undefined : selectedCategoryId;
    setFilters({ ...filters, categoryId: categoryId });
    setTimeout(() => dispatch(setItemCategoryFilter(categoryId)), 1);
  };

  const handleSortChange = (value: string) => {
    const sortBy = value as ItemSortOption;
    setFilters({ ...filters, sortBy });
    // setTimeout to prevent UI freezing on slow PCs
    setTimeout(() => dispatch(sortItemsBy(sortBy)), 15);
  };

  return (
    <FiltersWrapper>
      <Row variant="full-width">
        <Input
          onChange={(e) => {
            e.persist();
            setFilters({ ...filters, text: e.target.value });
          }}
          placeholder="Search items"
          value={filters.text}
          variant="search"
        />

        <CategorySelect
          headerText="Filter by category"
          onChange={handleCategoryChange}
          selectedCategoryId={filters.categoryId}
        >
          <Button variant="transparent">
            Categories
            <DropdownIcon />
          </Button>
        </CategorySelect>

        <LabelSelect
          headerText="Filter by label"
          labelIds={filters.labels}
          // setTimeout to prevent UI freezing on slow PCs
          onChange={(labelIds) => setTimeout(() => dispatch(setItemLabelsFilter(labelIds)), 15)}
        >
          <Button variant="transparent">
            Labels
            <DropdownIcon />
          </Button>
        </LabelSelect>

        <SortSelect
          hiddenOption={CollectionSortOption.lastSortOrder}
          onChange={handleSortChange}
          selectedOption={filters.sortBy}
          sortOptions={ItemSortOption}
        />
      </Row>

      <FilterReset isFiltering={isFiltering} onClick={() => dispatch(resetItemFilters())}>
        Clear search, filters and sort
      </FilterReset>
    </FiltersWrapper>
  );
};
