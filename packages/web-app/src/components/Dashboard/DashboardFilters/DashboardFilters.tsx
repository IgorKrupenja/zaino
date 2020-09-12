import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  ItemSortOption,
  setItemsCategoryFilter,
  setItemsLabelsFilter,
  setItemsTextFilter,
  sortItemsBy,
} from '../../../state/slices/itemsFilters';
import { LabelSortOption } from '../../../state/slices/labelsFilters';
import { RootState } from '../../../state/store';
import { Input } from '../../Input';
import { CategorySelect } from '../../Selects/CategorySelect';
import { LabelSelect } from '../../Selects/LabelSelect';
import { SortSelect } from '../../Selects/SortSelect';
import './style.scss';

export const DashboardFilters = () => {
  const dispatch = useDispatch();
  // better name?
  const selectedFilters = useSelector((state: RootState) => state.itemsFilters);
  const [filters, setFilters] = useState(selectedFilters);

  // set filters if changed externally by clicking on label/category inside ItemDetails
  useEffect(() => setFilters(selectedFilters), [selectedFilters]);

  // prevent UI freezes when typing in name filter
  useEffect(() => {
    const textFilterTimeout = setTimeout(() => dispatch(setItemsTextFilter(filters.text)), 200);
    return () => clearTimeout(textFilterTimeout);
  }, [filters.text, dispatch]);

  const handleCategoryChange = (category: string) => {
    if (category === filters.category) {
      // reset category filter if user clicks on a category that is already selected
      setFilters({ ...filters, category: undefined });
      dispatch(setItemsCategoryFilter(undefined));
    } else {
      // set category filter normally
      setFilters({ ...filters, category });
      dispatch(setItemsCategoryFilter(category));
    }
  };

  const handleSortChange = (value: string) => {
    const sortBy = value as ItemSortOption;
    setFilters({ ...filters, sortBy });
    // setTimeout to prevent UI freezing on slow PCs
    setTimeout(() => dispatch(sortItemsBy(sortBy)), 1);
  };

  return (
    <section className="dashboard-filters">
      {/* filter by name */}
      <Input
        onChange={e => {
          e.persist();
          setFilters({ ...filters, text: e.target.value });
        }}
        value={filters.text}
      />
      <CategorySelect
        selectedCategoryName={filters.category}
        headerText="Filter by category"
        onChange={handleCategoryChange}
      />
      <SortSelect
        sortOptions={ItemSortOption}
        onChange={handleSortChange}
        selectedOption={filters.sortBy}
        hiddenOption={LabelSortOption.lastSortOrder}
      />
      <LabelSelect
        labelIds={filters.labels}
        headerText="Filter by label"
        // setTimeout to prevent UI freezing on slow PCs
        onChange={labelIds => setTimeout(() => dispatch(setItemsLabelsFilter(labelIds)), 1)}
      />
    </section>
  );
};
