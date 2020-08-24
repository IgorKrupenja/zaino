import React, { ChangeEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CategoryName } from '../../constants/categories';
import {
  ItemSortOption,
  setItemsCategoryFilter,
  setItemsLabelsFilter,
  setItemsTextFilter,
  sortItemsBy,
} from '../../state/slices/itemsFilters';
import { RootState } from '../../state/store';
import FilterTextInput from '../common/FilterTextInput';
import LabelSelect, { LabelOption } from '../common/LabelSelect';
import SortBySelect from '../common/SortBySelect';

const DashboardFilters = () => {
  const dispatch = useDispatch();
  const [filters, setFilters] = useState(useSelector((state: RootState) => state.itemsFilters));

  const allCategoryText = 'All';

  const handleCategoryChange = (e: ChangeEvent<HTMLSelectElement>) => {
    e.persist();
    // set filter to undefined to show all items if All option is chosen
    const category =
      e.target.value === allCategoryText ? undefined : (e.target.value as CategoryName);
    setFilters({ ...filters, category });
    dispatch(setItemsCategoryFilter(category));
  };

  return (
    <section className="list-filters">
      <FilterTextInput
        onTextChange={text => {
          setFilters({ ...filters, text });
          dispatch(setItemsTextFilter(text));
        }}
        text={filters.text}
      />
      {/* todo Category select */}
      <label>
        Category
        <select name="category" value={filters.category} onChange={handleCategoryChange}>
          <option value={allCategoryText}>{allCategoryText}</option>
          {Object.values(CategoryName).map(value => (
            <option key={value}>{value}</option>
          ))}
        </select>
      </label>
      <SortBySelect
        options={ItemSortOption}
        onSortChange={value => {
          const sortBy = value as ItemSortOption;
          setFilters({ ...filters, sortBy });
          dispatch(sortItemsBy(sortBy));
        }}
        sortBy={filters.sortBy}
      />
      <LabelSelect
        labelIds={filters.labels}
        onChange={newValues => {
          // set labels filter based on new values received from LabelSelect
          dispatch(
            setItemsLabelsFilter(
              newValues ? newValues.map((label: LabelOption) => label.value) : []
            )
          );
        }}
        isClearable
      />
    </section>
  );
};

export default DashboardFilters;
