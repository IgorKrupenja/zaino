import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  LabelSortOption,
  setLabelsTextFilter,
  sortLabelsBy,
} from '../../state/slices/labelsFilters';
import { RootState } from '../../state/store';
import FilterTextInput from '../common/FilterTextInput';
import SortSelect, { SortSelectOption } from '../common/SortSelect';

const LabelFilters = () => {
  const dispatch = useDispatch();
  const [filters, setFilters] = useState(useSelector((state: RootState) => state.labelsFilters));

  const handleSortChange = (value: SortSelectOption) => {
    const sortOption = value.label as LabelSortOption;
    setFilters({ ...filters, sortBy: sortOption });
    dispatch(sortLabelsBy(sortOption));
  };

  return (
    <section className="label-filters">
      <FilterTextInput
        onTextChange={text => {
          setFilters({ ...filters, text });
          dispatch(setLabelsTextFilter(text));
        }}
        text={filters.text}
      />
      <SortSelect onChange={handleSortChange} sortBy={filters.sortBy} />
    </section>
  );
};

export default LabelFilters;
