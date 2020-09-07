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
import CategorySelect from '../common/CategorySelect';
import FilterTextInput from '../common/FilterTextInput';
import LabelSelect from '../common/LabelSelect';
import SortSelect from '../common/SortSelect';

const DashboardFilters = () => {
  const dispatch = useDispatch();
  // better name?
  const selectedFilters = useSelector((state: RootState) => state.itemsFilters);
  const [filters, setFilters] = useState(selectedFilters);

  // set filters if changed externally by clicking on label/category inside ItemDetails
  useEffect(() => setFilters(selectedFilters), [selectedFilters]);

  return (
    <section className="dashboard-filters">
      {/* name */}
      <FilterTextInput
        onTextChange={text => {
          setFilters({ ...filters, text });
          dispatch(setItemsTextFilter(text));
        }}
        text={filters.text}
      />
      {/* categories */}
      <CategorySelect
        selectedCategoryName={filters.category}
        isClearable={true}
        onChange={category => {
          setFilters({ ...filters, category });
          dispatch(setItemsCategoryFilter(category));
        }}
      />
      {/* sort */}
      <SortSelect
        sortOptions={ItemSortOption}
        onChange={value => {
          const sortBy = value as ItemSortOption;
          setFilters({ ...filters, sortBy });
          dispatch(sortItemsBy(sortBy));
        }}
        selectedOption={filters.sortBy}
        hiddenOption={LabelSortOption.lastSortOrder}
      />
      {/* label */}
      <LabelSelect
        labelIds={filters.labels}
        onChange={labelIds => dispatch(setItemsLabelsFilter(labelIds))}
        isClearable
      />
    </section>
  );
};

export default DashboardFilters;
