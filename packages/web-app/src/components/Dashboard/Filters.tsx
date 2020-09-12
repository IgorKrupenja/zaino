import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  ItemSortOption,
  setItemsCategoryFilter,
  setItemsLabelsFilter,
  setItemsTextFilter,
  sortItemsBy,
} from '../../state/slices/itemsFilters';
import { LabelSortOption } from '../../state/slices/labelsFilters';
import { RootState } from '../../state/store';
import FilterInput from '../Inputs/FilterInput';
import { CategorySelect } from '../Selects/CategorySelect/';
import { LabelSelect } from '../Selects/LabelSelect';
import { SortSelect } from '../Selects/SortSelect/';

const Filters = () => {
  const dispatch = useDispatch();
  // better name?
  const selectedFilters = useSelector((state: RootState) => state.itemsFilters);
  const [filters, setFilters] = useState(selectedFilters);

  // set filters if changed externally by clicking on label/category inside ItemDetails
  useEffect(() => setFilters(selectedFilters), [selectedFilters]);

  useEffect(() => {
    // setTimeout prevents UI freezes when typing
    const textFilterTimeout = setTimeout(() => dispatch(setItemsTextFilter(filters.text)), 200);
    return () => clearTimeout(textFilterTimeout);
  }, [filters.text, dispatch]);

  return (
    <section className="dashboard-filters">
      {/* name */}
      <FilterInput onTextChange={text => setFilters({ ...filters, text })} text={filters.text} />
      {/* categories */}
      <CategorySelect
        selectedCategoryName={filters.category}
        headerText="Filter by category"
        onChange={category => {
          if (category === filters.category) {
            // reset category filter if user clicks on a category that is already selected
            setFilters({ ...filters, category: undefined });
            dispatch(setItemsCategoryFilter(undefined));
          } else {
            // set category filter normally
            setFilters({ ...filters, category });
            dispatch(setItemsCategoryFilter(category));
          }
        }}
      />
      {/* sort */}
      <SortSelect
        sortOptions={ItemSortOption}
        onChange={value => {
          const sortBy = value as ItemSortOption;
          setFilters({ ...filters, sortBy });
          // setTimeout to prevent UI freezing on slow PCs
          setTimeout(() => dispatch(sortItemsBy(sortBy)), 1);
        }}
        selectedOption={filters.sortBy}
        hiddenOption={LabelSortOption.lastSortOrder}
      />
      {/* label */}
      <LabelSelect
        labelIds={filters.labels}
        headerText="Filter by label"
        // setTimeout to prevent UI freezing on slow PCs
        onChange={labelIds => setTimeout(() => dispatch(setItemsLabelsFilter(labelIds)), 1)}
      />
    </section>
  );
};

export default Filters;
