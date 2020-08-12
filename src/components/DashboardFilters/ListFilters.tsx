import React, { ChangeEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ValueType } from 'react-select';
import {
  setCategoryFilter,
  setLabelsFilter,
  setTextFilter,
  sortBy,
} from '../../slices/filtersItems';
import { RootState } from '../../store/store';
import { Category, ItemSortOption } from '../../types/items';
import { LabelOption } from '../../types/labels';
import LabelSelect from '../common/LabelSelect';

const ListFilters = () => {
  const [filters, setFilters] = useState(useSelector((state: RootState) => state.itemsFilters));
  const dispatch = useDispatch();

  const allCategoryText = 'All';

  const onTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.persist();
    const text = e.target.value;
    setFilters({ ...filters, text });
    dispatch(setTextFilter(text));
  };
  const onCategoryChange = (e: ChangeEvent<HTMLSelectElement>) => {
    e.persist();
    // set filter to undefined to show all items if All option is chosen
    const category = e.target.value === allCategoryText ? undefined : (e.target.value as Category);
    setFilters({ ...filters, category });
    dispatch(setCategoryFilter(category));
  };
  const onSortChange = (e: ChangeEvent<HTMLSelectElement>) => {
    e.persist();
    const option = e.target.value as ItemSortOption;
    setFilters({ ...filters, sortBy: option });
    dispatch(sortBy(option));
  };

  return (
    <section className="list-filters">
      <label>
        Items
        <input
          type="text"
          placeholder="Search"
          className="text-input"
          value={filters.text}
          onChange={onTextChange}
        />
      </label>
      <label>
        Category
        <select name="category" value={filters.category} onChange={onCategoryChange}>
          <option value={allCategoryText}>{allCategoryText}</option>
          {Object.values(Category).map(value => (
            <option key={value}>{value}</option>
          ))}
        </select>
      </label>
      <label>
        Sort by
        <select name="sortBy" value={filters.sortBy} onChange={onSortChange}>
          {Object.values(ItemSortOption).map(value => (
            <option value={value} key={value}>
              {value}
            </option>
          ))}
        </select>
      </label>
      <LabelSelect
        onChange={(newValues: ValueType<LabelOption>) => {
          // set labels filter based on new values received from LabelSelect
          dispatch(
            setLabelsFilter(newValues ? newValues.map((label: LabelOption) => label.value) : [])
          );
        }}
        isClearable
      />
    </section>
  );
};

export default ListFilters;
