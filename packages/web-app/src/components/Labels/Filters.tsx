import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  LabelSortOption,
  setLabelsTextFilter,
  sortLabelsBy,
} from '../../state/slices/labelsFilters';
import { RootState } from '../../state/store';
import FilterInput from '../Inputs/FilterInput';
import { SortSelect } from '../Selects/SortSelect/';

const LabelFilters = () => {
  const dispatch = useDispatch();
  const [filters, setFilters] = useState(useSelector((state: RootState) => state.labelsFilters));

  const handleSortChange = (value: string) => {
    const sortBy = value as LabelSortOption;
    setFilters({ ...filters, sortBy });
    dispatch(sortLabelsBy(sortBy));
  };

  return (
    <section className="label-filters">
      <FilterInput
        onTextChange={text => {
          setFilters({ ...filters, text });
          dispatch(setLabelsTextFilter(text));
        }}
        text={filters.text}
      />
      <SortSelect
        sortOptions={LabelSortOption}
        selectedOption={filters.sortBy}
        hiddenOption={LabelSortOption.lastSortOrder}
        onChange={handleSortChange}
      />
    </section>
  );
};

export default LabelFilters;
