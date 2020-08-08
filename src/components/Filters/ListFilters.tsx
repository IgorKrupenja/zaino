import React, { ChangeEvent, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/store';
import { setTextFilter, sortBy, setCategoryFilter } from '../../slices/filters';
import { SortOption, Category } from '../../types/types';
import LabelFilterSelect from './LabelFilterSelect';

const ListFilters = () => {
  const [filters, setFilters] = useState(useSelector((state: RootState) => state.filters));
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
    const option = e.target.value as SortOption;
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
        <select className="select" name="sortBy" value={filters.sortBy} onChange={onSortChange}>
          {Object.values(SortOption).map(value => (
            <option value={value} key={value}>
              {value}
            </option>
          ))}
        </select>
      </label>
      <label>
        Labels
        <LabelFilterSelect />
      </label>
    </section>
  );
};

export default ListFilters;
